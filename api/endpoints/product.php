<?php
/**
 * Products API Endpoints
 * TST Technologies API
 */

require_once '../config/database.php';
require_once '../config/response.php';

class ProductAPI {
    private $db;
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
        $this->db = $this->conn;
        
        if ($this->conn === null) {
            ApiResponse::serverError('Database connection failed');
        }
    }
    
    /**
     * Get all products (with optional filters)
     */
    public function getAllProducts($filters = []) {
        try {
            $query = "SELECT p.*, pt.name as product_type_name, pt.category_id, c.name as category_name 
                      FROM products p
                      JOIN product_types pt ON p.product_type_id = pt.id
                      JOIN categories c ON pt.category_id = c.id
                      WHERE p.is_active = 1";
            
            $params = [];
            
            // Apply filters
            if (isset($filters['category']) && !empty($filters['category'])) {
                $query .= " AND c.id = :category";
                $params[':category'] = $filters['category'];
            }
            
            if (isset($filters['product_type']) && !empty($filters['product_type'])) {
                $query .= " AND pt.id = :product_type";
                $params[':product_type'] = $filters['product_type'];
            }
            
            if (isset($filters['featured']) && $filters['featured'] === 'true') {
                $query .= " AND p.is_featured = 1";
            }
            
            if (isset($filters['search']) && !empty($filters['search'])) {
                $query .= " AND (p.name LIKE :search OR p.short_description LIKE :search)";
                $params[':search'] = '%' . $filters['search'] . '%';
            }
            
            // Sorting
            $sortBy = isset($filters['sort']) ? $filters['sort'] : 'display_order';
            $sortOrder = isset($filters['order']) ? $filters['order'] : 'ASC';
            
            $allowedSorts = ['display_order', 'name', 'rating', 'created_at'];
            $sortBy = in_array($sortBy, $allowedSorts) ? $sortBy : 'display_order';
            $sortOrder = strtoupper($sortOrder) === 'DESC' ? 'DESC' : 'ASC';
            
            $query .= " ORDER BY p.$sortBy $sortOrder";
            
            // Pagination
            $page = isset($filters['page']) ? max(1, (int)$filters['page']) : 1;
            $limit = isset($filters['limit']) ? min(100, max(1, (int)$filters['limit'])) : 20;
            $offset = ($page - 1) * $limit;
            
            $query .= " LIMIT :limit OFFSET :offset";
            
            $stmt = $this->db->prepare($query);
            
            // Bind parameters
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            
            $stmt->execute();
            
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get features and badges for each product
            foreach ($products as &$product) {
                $product['features'] = $this->getProductFeatures($product['id']);
                $product['badges'] = $this->getProductBadges($product['id']);
            }
            
            // Get total count for pagination
            $countQuery = "SELECT COUNT(*) as total FROM products p
                           JOIN product_types pt ON p.product_type_id = pt.id
                           JOIN categories c ON pt.category_id = c.id
                           WHERE p.is_active = 1";
            
            if (isset($params[':category'])) {
                $countQuery .= " AND c.id = :category";
            }
            if (isset($params[':product_type'])) {
                $countQuery .= " AND pt.id = :product_type";
            }
            if (isset($filters['featured']) && $filters['featured'] === 'true') {
                $countQuery .= " AND p.is_featured = 1";
            }
            if (isset($params[':search'])) {
                $countQuery .= " AND (p.name LIKE :search OR p.short_description LIKE :search)";
            }
            
            $countStmt = $this->db->prepare($countQuery);
            foreach ($params as $key => $value) {
                if ($key !== ':limit' && $key !== ':offset') {
                    $countStmt->bindValue($key, $value);
                }
            }
            $countStmt->execute();
            $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
            
            $response = [
                'products' => $products,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => (int)$totalCount,
                    'totalPages' => ceil($totalCount / $limit)
                ]
            ];
            
            ApiResponse::success($response, 'Products retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getAllProducts: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve products');
        }
    }
    
    /**
     * Get product by ID or slug
     */
    public function getProductByIdOrSlug($identifier) {
        try {
            // Check if identifier is numeric (ID) or string (slug)
            $isNumeric = is_numeric($identifier);
            
            $query = "SELECT p.*, pt.name as product_type_name, pt.category_id, c.name as category_name 
                      FROM products p
                      JOIN product_types pt ON p.product_type_id = pt.id
                      JOIN categories c ON pt.category_id = c.id
                      WHERE p.is_active = 1 AND ";
            
            if ($isNumeric) {
                $query .= "p.id = :identifier";
            } else {
                $query .= "p.slug = :identifier";
            }
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':identifier', $identifier);
            $stmt->execute();
            
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$product) {
                ApiResponse::notFound('Product not found');
            }
            
            // Get additional data
            $product['features'] = $this->getProductFeatures($product['id']);
            $product['badges'] = $this->getProductBadges($product['id']);
            $product['specifications'] = $this->getProductSpecifications($product['id']);
            
            ApiResponse::success($product, 'Product retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getProductByIdOrSlug: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve product');
        }
    }
    
    /**
     * Get products by product type
     */
    public function getProductsByType($productTypeId) {
        $filters = ['product_type' => $productTypeId];
        
        // Merge with query parameters
        $filters = array_merge($filters, $_GET);
        
        $this->getAllProducts($filters);
    }
    
    /**
     * Get products by category
     */
    public function getProductsByCategory($categoryId) {
        $filters = ['category' => $categoryId];
        
        // Merge with query parameters
        $filters = array_merge($filters, $_GET);
        
        $this->getAllProducts($filters);
    }
    
    /**
     * Get featured products
     */
    public function getFeaturedProducts() {
        $filters = ['featured' => 'true', 'limit' => 10];
        $this->getAllProducts($filters);
    }
    
    /**
     * Get product features
     */
    private function getProductFeatures($productId) {
        try {
            $query = "SELECT feature_text, icon 
                      FROM product_features 
                      WHERE product_id = :product_id 
                      ORDER BY display_order ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':product_id', $productId);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch (Exception $e) {
            error_log("Error in getProductFeatures: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Get product badges
     */
    private function getProductBadges($productId) {
        try {
            $query = "SELECT badge_text, badge_color 
                      FROM product_badges 
                      WHERE product_id = :product_id 
                      ORDER BY display_order ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':product_id', $productId);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch (Exception $e) {
            error_log("Error in getProductBadges: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Get product specifications
     */
    private function getProductSpecifications($productId) {
        try {
            $query = "SELECT spec_key, spec_value, spec_group 
                      FROM product_specifications 
                      WHERE product_id = :product_id 
                      ORDER BY spec_group ASC, display_order ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':product_id', $productId);
            $stmt->execute();
            
            $specs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Group by spec_group
            $grouped = [];
            foreach ($specs as $spec) {
                $group = $spec['spec_group'];
                if (!isset($grouped[$group])) {
                    $grouped[$group] = [];
                }
                $grouped[$group][] = [
                    'key' => $spec['spec_key'],
                    'value' => $spec['spec_value']
                ];
            }
            
            return $grouped;
            
        } catch (Exception $e) {
            error_log("Error in getProductSpecifications: " . $e->getMessage());
            return [];
        }
    }
}

// Handle CORS
CorsHandler::handle();

// Route requests
$method = $_SERVER['REQUEST_METHOD'];
$api = new ProductAPI();

if ($method === 'GET') {
    // Parse URL path
    $path = isset($_GET['path']) ? $_GET['path'] : '';
    
    if (empty($path)) {
        // GET /api/products - Get all products
        $api->getAllProducts($_GET);
    } else {
        $parts = explode('/', trim($path, '/'));
        
        if ($parts[0] === 'featured') {
            // GET /api/products/featured - Get featured products
            $api->getFeaturedProducts();
        } elseif ($parts[0] === 'category' && isset($parts[1])) {
            // GET /api/products/category/{categoryId} - Get products by category
            $api->getProductsByCategory($parts[1]);
        } elseif ($parts[0] === 'type' && isset($parts[1])) {
            // GET /api/products/type/{typeId} - Get products by type
            $api->getProductsByType($parts[1]);
        } elseif (count($parts) === 1) {
            // GET /api/products/{id or slug} - Get product by ID or slug
            $api->getProductByIdOrSlug($parts[0]);
        } else {
            ApiResponse::notFound('Invalid endpoint');
        }
    }
} else {
    ApiResponse::error('Method not allowed', 405);
}
?>
<?php
/**
 * Category API Endpoints
 * TST Technologies API
 */

require_once '../config/database.php';
require_once '../config/response.php';

class CategoryAPI {
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
     * Get all categories with their product types
     */
    public function getAllCategories() {
        try {
            $query = "SELECT id, name, description, icon, display_order 
                      FROM categories 
                      WHERE is_active = 1 
                      ORDER BY display_order ASC, name ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            
            $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get product types for each category
            foreach ($categories as &$category) {
                $category['productTypes'] = $this->getProductTypesByCategory($category['id']);
            }
            
            ApiResponse::success($categories, 'Categories retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getAllCategories: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve categories');
        }
    }
    
    /**
     * Get product types by category ID
     */
    private function getProductTypesByCategory($categoryId) {
        try {
            $query = "SELECT id, name, description, icon, display_order 
                      FROM product_types 
                      WHERE category_id = :category_id AND is_active = 1 
                      ORDER BY display_order ASC, name ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':category_id', $categoryId);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch (Exception $e) {
            error_log("Error in getProductTypesByCategory: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Get single category by ID
     */
    public function getCategoryById($id) {
        try {
            $query = "SELECT id, name, description, icon, display_order 
                      FROM categories 
                      WHERE id = :id AND is_active = 1";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            $category = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$category) {
                ApiResponse::notFound('Category not found');
            }
            
            $category['productTypes'] = $this->getProductTypesByCategory($category['id']);
            
            ApiResponse::success($category, 'Category retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getCategoryById: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve category');
        }
    }
    
    /**
     * Get product type by ID
     */
    public function getProductTypeById($id) {
        try {
            $query = "SELECT pt.*, c.name as category_name 
                      FROM product_types pt 
                      JOIN categories c ON pt.category_id = c.id 
                      WHERE pt.id = :id AND pt.is_active = 1";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            $productType = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$productType) {
                ApiResponse::notFound('Product type not found');
            }
            
            ApiResponse::success($productType, 'Product type retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getProductTypeById: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve product type');
        }
    }
}

// Handle CORS
CorsHandler::handle();

// Route requests
$method = $_SERVER['REQUEST_METHOD'];
$api = new CategoryAPI();

if ($method === 'GET') {
    // Parse URL path
    $path = isset($_GET['path']) ? $_GET['path'] : '';
    
    if (empty($path)) {
        // GET /api/categories - Get all categories
        $api->getAllCategories();
    } else {
        $parts = explode('/', trim($path, '/'));
        
        if (count($parts) === 1) {
            // GET /api/categories/{id} - Get category by ID
            $api->getCategoryById($parts[0]);
        } elseif (count($parts) === 3 && $parts[1] === 'product-types') {
            // GET /api/categories/{categoryId}/product-types/{typeId}
            $api->getProductTypeById($parts[2]);
        } else {
            ApiResponse::notFound('Invalid endpoint');
        }
    }
} else {
    ApiResponse::error('Method not allowed', 405);
}
?>
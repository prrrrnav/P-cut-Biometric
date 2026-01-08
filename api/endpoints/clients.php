<?php
/**
 * Clients and Testimonials API Endpoints
 * TST Technologies API
 */

require_once '../config/database.php';
require_once '../config/response.php';

class ClientTestimonialAPI {
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
     * Get all client segments with clients
     */
    public function getAllClientSegments() {
        try {
            $query = "SELECT id, title, icon, display_order 
                      FROM client_segments 
                      WHERE is_active = 1 
                      ORDER BY display_order ASC, title ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            
            $segments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get clients for each segment
            foreach ($segments as &$segment) {
                $segment['clients'] = $this->getClientsBySegment($segment['id']);
            }
            
            ApiResponse::success($segments, 'Client segments retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getAllClientSegments: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve client segments');
        }
    }
    
    /**
     * Get clients by segment
     */
    private function getClientsBySegment($segmentId) {
        try {
            $query = "SELECT client_name, logo_url 
                      FROM clients 
                      WHERE segment_id = :segment_id AND is_active = 1 
                      ORDER BY display_order ASC, client_name ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':segment_id', $segmentId);
            $stmt->execute();
            
            $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Return just client names as array
            return array_column($clients, 'client_name');
            
        } catch (Exception $e) {
            error_log("Error in getClientsBySegment: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Get all testimonials
     */
    public function getAllTestimonials($limit = 10) {
        try {
            $limit = min(50, max(1, (int)$limit));
            
            $query = "SELECT client_name, company, position, testimonial_text, rating, avatar_url 
                      FROM testimonials 
                      WHERE is_active = 1 
                      ORDER BY display_order ASC, created_at DESC 
                      LIMIT :limit";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            
            $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            ApiResponse::success($testimonials, 'Testimonials retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getAllTestimonials: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve testimonials');
        }
    }
    
    /**
     * Get featured testimonials (highest rated)
     */
    public function getFeaturedTestimonials($limit = 4) {
        try {
            $limit = min(20, max(1, (int)$limit));
            
            $query = "SELECT client_name, company, position, testimonial_text, rating, avatar_url 
                      FROM testimonials 
                      WHERE is_active = 1 
                      ORDER BY rating DESC, display_order ASC 
                      LIMIT :limit";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            
            $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            ApiResponse::success($testimonials, 'Featured testimonials retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getFeaturedTestimonials: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve testimonials');
        }
    }
    
    /**
     * Get client count statistics
     */
    public function getClientStats() {
        try {
            // Get total clients
            $totalQuery = "SELECT COUNT(*) as total FROM clients WHERE is_active = 1";
            $totalStmt = $this->db->prepare($totalQuery);
            $totalStmt->execute();
            $totalClients = $totalStmt->fetch(PDO::FETCH_ASSOC)['total'];
            
            // Get clients by segment
            $segmentQuery = "SELECT cs.title, COUNT(c.id) as count 
                             FROM client_segments cs 
                             LEFT JOIN clients c ON cs.id = c.segment_id AND c.is_active = 1 
                             WHERE cs.is_active = 1 
                             GROUP BY cs.id, cs.title";
            
            $segmentStmt = $this->db->prepare($segmentQuery);
            $segmentStmt->execute();
            $bySegment = $segmentStmt->fetchAll(PDO::FETCH_ASSOC);
            
            $stats = [
                'total_clients' => (int)$totalClients,
                'by_segment' => $bySegment
            ];
            
            ApiResponse::success($stats, 'Client statistics retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getClientStats: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve client statistics');
        }
    }
}

// Handle CORS
CorsHandler::handle();

// Route requests
$method = $_SERVER['REQUEST_METHOD'];
$api = new ClientTestimonialAPI();

if ($method === 'GET') {
    // Parse URL path
    $path = isset($_GET['path']) ? $_GET['path'] : '';
    
    if (empty($path)) {
        ApiResponse::notFound('Invalid endpoint');
    } else {
        $parts = explode('/', trim($path, '/'));
        
        if ($parts[0] === 'clients') {
            if (count($parts) === 1) {
                // GET /api/clients - Get all client segments with clients
                $api->getAllClientSegments();
            } elseif (count($parts) === 2 && $parts[1] === 'stats') {
                // GET /api/clients/stats - Get client statistics
                $api->getClientStats();
            }
        } elseif ($parts[0] === 'testimonials') {
            if (count($parts) === 1) {
                // GET /api/testimonials?limit=10 - Get all testimonials
                $limit = isset($_GET['limit']) ? $_GET['limit'] : 10;
                $api->getAllTestimonials($limit);
            } elseif (count($parts) === 2 && $parts[1] === 'featured') {
                // GET /api/testimonials/featured?limit=4 - Get featured testimonials
                $limit = isset($_GET['limit']) ? $_GET['limit'] : 4;
                $api->getFeaturedTestimonials($limit);
            }
        } else {
            ApiResponse::notFound('Invalid endpoint');
        }
    }
} else {
    ApiResponse::error('Method not allowed', 405);
}
?>
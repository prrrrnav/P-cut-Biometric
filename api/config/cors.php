<?php
/**
 * CORS Configuration
 * Handles Cross-Origin Resource Sharing
 */

class CorsConfig {
    
    public static function handle() {
        // Allowed origins
        $allowedOrigins = [
            'https://bisque-ferret-748084.hostingersite.com',
            'http://localhost:5173',  // Vite dev server
            'http://localhost:3000',  // Alternative dev server
        ];
        
        // Get the origin of the request
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        
        // Check if origin is allowed
        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
        } else {
            header("Access-Control-Allow-Origin: *"); // For development
        }
        
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); // Cache for 1 day
        
        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            }
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }
            
            http_response_code(204);
            exit(0);
        }
        
        // Set common headers
        header('Content-Type: application/json; charset=UTF-8');
    }
}

// Auto-execute CORS handling
CorsConfig::handle();
?>
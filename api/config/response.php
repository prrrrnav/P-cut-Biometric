<?php
/**
 * Base API Response Handler
 * TST Technologies API
 */

class ApiResponse {
    
    /**
     * Send success response
     */
    public static function success($data = null, $message = 'Success', $statusCode = 200) {
        http_response_code($statusCode);
        
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    
    /**
     * Send error response
     */
    public static function error($message = 'Error occurred', $statusCode = 400, $errors = null) {
        http_response_code($statusCode);
        
        $response = [
            'success' => false,
            'message' => $message,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        if ($errors !== null) {
            $response['errors'] = $errors;
        }
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    
    /**
     * Send not found response
     */
    public static function notFound($message = 'Resource not found') {
        self::error($message, 404);
    }
    
    /**
     * Send validation error response
     */
    public static function validationError($errors, $message = 'Validation failed') {
        self::error($message, 422, $errors);
    }
    
    /**
     * Send unauthorized response
     */
    public static function unauthorized($message = 'Unauthorized access') {
        self::error($message, 401);
    }
    
    /**
     * Send server error response
     */
    public static function serverError($message = 'Internal server error') {
        self::error($message, 500);
    }
}

/**
 * Handle CORS
 */
class CorsHandler {
    
    public static function handle() {
        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400'); // cache for 1 day
        }
        
        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            }
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }
            
            exit(0);
        }
        
        // Set common headers
        header('Content-Type: application/json; charset=UTF-8');
    }
}

/**
 * Input Validator
 */
class Validator {
    
    /**
     * Validate required fields
     */
    public static function required($data, $fields) {
        $errors = [];
        
        foreach ($fields as $field) {
            if (!isset($data[$field]) || trim($data[$field]) === '') {
                $errors[$field] = ucfirst($field) . ' is required';
            }
        }
        
        return $errors;
    }
    
    /**
     * Validate email
     */
    public static function email($email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return 'Invalid email format';
        }
        return null;
    }
    
    /**
     * Validate phone
     */
    public static function phone($phone) {
        // Basic phone validation (adjust regex as needed)
        if (!preg_match('/^[0-9+\-\s()]{10,20}$/', $phone)) {
            return 'Invalid phone format';
        }
        return null;
    }
    
    /**
     * Sanitize string
     */
    public static function sanitizeString($str) {
        return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
    }
    
    /**
     * Sanitize email
     */
    public static function sanitizeEmail($email) {
        return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
    }
}

/**
 * API Logger
 */
class ApiLogger {
    private $db;
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Log API request
     */
    public function log($endpoint, $method, $requestData = null, $responseCode = 200, $responseTime = 0) {
        try {
            $query = "INSERT INTO api_logs (endpoint, method, ip_address, user_agent, request_data, response_code, response_time) 
                      VALUES (:endpoint, :method, :ip, :user_agent, :request_data, :response_code, :response_time)";
            
            $stmt = $this->db->prepare($query);
            
            $stmt->bindParam(':endpoint', $endpoint);
            $stmt->bindParam(':method', $method);
            $stmt->bindParam(':ip', $_SERVER['REMOTE_ADDR']);
            $stmt->bindParam(':user_agent', $_SERVER['HTTP_USER_AGENT']);
            $stmt->bindParam(':request_data', json_encode($requestData));
            $stmt->bindParam(':response_code', $responseCode);
            $stmt->bindParam(':response_time', $responseTime);
            
            $stmt->execute();
        } catch (Exception $e) {
            // Silent fail for logging
            error_log("Logging Error: " . $e->getMessage());
        }
    }
}
?>
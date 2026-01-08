<?php
/**
 * TST Technologies API Router
 * Main entry point for all API requests
 * 
 * API Endpoints:
 * - GET  /api/categories - Get all categories
 * - GET  /api/categories/{id} - Get category by ID
 * - GET  /api/products - Get all products
 * - GET  /api/products/featured - Get featured products
 * - GET  /api/products/category/{id} - Get products by category
 * - GET  /api/products/type/{id} - Get products by type
 * - GET  /api/products/{id or slug} - Get product by ID or slug
 * - POST /api/contact - Submit contact form
 * - GET  /api/contact - Get contact submissions (admin)
 * - GET  /api/clients - Get all client segments
 * - GET  /api/clients/stats - Get client statistics
 * - GET  /api/testimonials - Get all testimonials
 * - GET  /api/testimonials/featured - Get featured testimonials
 * - GET  /api/settings - Get all settings
 * - GET  /api/settings/{key} - Get setting by key
 */

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 in production
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');

// Include config files
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/response.php';

// Handle CORS for all requests
CorsHandler::handle();

// Get request method and URI
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Parse the request URI
$parsedUrl = parse_url($requestUri);
$path = isset($parsedUrl['path']) ? $parsedUrl['path'] : '/';

// Remove /api/ prefix and get the endpoint
$path = preg_replace('#^/api/?#', '', $path);
$pathParts = array_filter(explode('/', $path));

// Get the main endpoint (first part of path)
$endpoint = isset($pathParts[0]) ? array_shift($pathParts) : '';

// Remove the endpoint from pathParts and rejoin for sub-paths
$subPath = implode('/', $pathParts);

// Set path in $_GET for endpoint files to use
$_GET['path'] = $subPath;

// Track request start time for logging
$startTime = microtime(true);

// Route to appropriate endpoint
try {
    switch ($endpoint) {
        case '':
            // Root endpoint - API information
            ApiResponse::success([
                'name' => 'TST Technologies API',
                'version' => '1.0',
                'endpoints' => [
                    'categories' => '/api/categories',
                    'products' => '/api/products',
                    'contact' => '/api/contact',
                    'clients' => '/api/clients',
                    'testimonials' => '/api/testimonials',
                    'settings' => '/api/settings'
                ],
                'documentation' => '/api/docs'
            ], 'Welcome to TST Technologies API');
            break;
            
        case 'categories':
            require_once __DIR__ . '/endpoints/categories.php';
            break;
            
        case 'products':
            require_once __DIR__ . '/endpoints/products.php';
            break;
            
        case 'contact':
            require_once __DIR__ . '/endpoints/contact.php';
            break;
            
        case 'clients':
        case 'testimonials':
            require_once __DIR__ . '/endpoints/clients.php';
            break;
            
        case 'settings':
            require_once __DIR__ . '/endpoints/settings.php';
            break;
            
        case 'docs':
            // API Documentation
            showDocumentation();
            break;
            
        case 'health':
            // Health check endpoint
            healthCheck();
            break;
            
        default:
            ApiResponse::notFound('Endpoint not found');
            break;
    }
    
    // Log successful request
    $endTime = microtime(true);
    $responseTime = round(($endTime - $startTime) * 1000); // milliseconds
    
    // Optional: Log to database
    // $database = new Database();
    // $logger = new ApiLogger($database->getConnection());
    // $logger->log($path, $requestMethod, $_REQUEST, 200, $responseTime);
    
} catch (Exception $e) {
    error_log("Router Error: " . $e->getMessage());
    ApiResponse::serverError('An error occurred while processing your request');
}

/**
 * Show API documentation
 */
function showDocumentation() {
    $docs = [
        'api_name' => 'TST Technologies API',
        'version' => '1.0',
        'base_url' => 'https://yourdomain.com/api',
        'endpoints' => [
            'Categories' => [
                [
                    'method' => 'GET',
                    'path' => '/categories',
                    'description' => 'Get all categories with product types',
                    'parameters' => 'None'
                ],
                [
                    'method' => 'GET',
                    'path' => '/categories/{id}',
                    'description' => 'Get category by ID',
                    'parameters' => 'id (string) - Category ID'
                ]
            ],
            'Products' => [
                [
                    'method' => 'GET',
                    'path' => '/products',
                    'description' => 'Get all products',
                    'parameters' => 'page, limit, category, product_type, featured, search, sort, order'
                ],
                [
                    'method' => 'GET',
                    'path' => '/products/featured',
                    'description' => 'Get featured products',
                    'parameters' => 'None'
                ],
                [
                    'method' => 'GET',
                    'path' => '/products/category/{id}',
                    'description' => 'Get products by category',
                    'parameters' => 'id (string) - Category ID, plus all product filters'
                ],
                [
                    'method' => 'GET',
                    'path' => '/products/type/{id}',
                    'description' => 'Get products by type',
                    'parameters' => 'id (string) - Product type ID, plus all product filters'
                ],
                [
                    'method' => 'GET',
                    'path' => '/products/{id or slug}',
                    'description' => 'Get product details',
                    'parameters' => 'id (number) or slug (string)'
                ]
            ],
            'Contact' => [
                [
                    'method' => 'POST',
                    'path' => '/contact',
                    'description' => 'Submit contact form',
                    'body' => [
                        'name' => 'string (required)',
                        'email' => 'string (required)',
                        'phone' => 'string (required)',
                        'company' => 'string (optional)',
                        'interest' => 'string (optional)',
                        'message' => 'string (required)'
                    ]
                ],
                [
                    'method' => 'GET',
                    'path' => '/contact',
                    'description' => 'Get contact submissions (admin only)',
                    'parameters' => 'page, limit, status, from_date, to_date'
                ]
            ],
            'Clients' => [
                [
                    'method' => 'GET',
                    'path' => '/clients',
                    'description' => 'Get all client segments with clients',
                    'parameters' => 'None'
                ],
                [
                    'method' => 'GET',
                    'path' => '/clients/stats',
                    'description' => 'Get client statistics',
                    'parameters' => 'None'
                ]
            ],
            'Testimonials' => [
                [
                    'method' => 'GET',
                    'path' => '/testimonials',
                    'description' => 'Get all testimonials',
                    'parameters' => 'limit (default: 10)'
                ],
                [
                    'method' => 'GET',
                    'path' => '/testimonials/featured',
                    'description' => 'Get featured testimonials',
                    'parameters' => 'limit (default: 4)'
                ]
            ],
            'Settings' => [
                [
                    'method' => 'GET',
                    'path' => '/settings',
                    'description' => 'Get all site settings',
                    'parameters' => 'None'
                ],
                [
                    'method' => 'GET',
                    'path' => '/settings/{key}',
                    'description' => 'Get setting by key',
                    'parameters' => 'key (string) - Setting key'
                ]
            ]
        ],
        'response_format' => [
            'success' => [
                'success' => true,
                'message' => 'Success message',
                'data' => 'Response data',
                'timestamp' => 'ISO 8601 timestamp'
            ],
            'error' => [
                'success' => false,
                'message' => 'Error message',
                'timestamp' => 'ISO 8601 timestamp'
            ]
        ]
    ];
    
    ApiResponse::success($docs, 'API Documentation');
}

/**
 * Health check endpoint
 */
function healthCheck() {
    try {
        $database = new Database();
        $conn = $database->getConnection();
        
        if ($conn === null) {
            ApiResponse::error('Database connection failed', 503);
        }
        
        // Test database query
        $stmt = $conn->prepare("SELECT 1");
        $stmt->execute();
        
        ApiResponse::success([
            'status' => 'healthy',
            'database' => 'connected',
            'timestamp' => date('Y-m-d H:i:s')
        ], 'API is healthy');
        
    } catch (Exception $e) {
        ApiResponse::error('Health check failed', 503);
    }
}
?>
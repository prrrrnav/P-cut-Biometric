<?php
/**
 * Environment Configuration
 */

// Detect environment
define('ENVIRONMENT', 'production'); // Change to 'development' for local testing

// Environment-specific settings
if (ENVIRONMENT === 'production') {
    // Production settings
    define('BASE_URL', 'https://bisque-ferret-748084.hostingersite.com');
    define('API_URL', BASE_URL . '/api');
    
    // Error reporting (hide errors in production)
    error_reporting(0);
    ini_set('display_errors', 0);
    
} else {
    // Development settings
    define('BASE_URL', 'http://localhost:8000');
    define('API_URL', BASE_URL);
    
    // Error reporting (show errors in development)
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// Timezone
date_default_timezone_set('Asia/Kolkata');

// CORS settings
define('ALLOW_ORIGIN', '*'); // Change to your domain in production for security
?>
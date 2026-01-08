<?php
require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/response.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    ApiResponse::success(
        [
            'service' => 'Biometric API',
            'status' => 'UP',
            'environment' => 'production',
            'domain' => 'bisque-ferret-748084.hostingersite.com'
        ],
        'Backend is running successfully'
    );
} else {
    ApiResponse::error('Method not allowed', 405);
}
?>
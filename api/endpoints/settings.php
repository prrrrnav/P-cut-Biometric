<?php
/**
 * Settings API Endpoint
 * TST Technologies API
 */

require_once '../config/database.php';
require_once '../config/response.php';

class SettingsAPI {
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
     * Get all settings
     */
    public function getAllSettings() {
        try {
            $query = "SELECT setting_key, setting_value, setting_type 
                      FROM site_settings 
                      ORDER BY setting_key ASC";
            
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            
            $settings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Format settings as key-value pairs
            $formatted = [];
            foreach ($settings as $setting) {
                $key = $setting['setting_key'];
                $value = $setting['setting_value'];
                $type = $setting['setting_type'];
                
                // Type casting
                if ($type === 'number') {
                    $value = is_numeric($value) ? (float)$value : $value;
                } elseif ($type === 'boolean') {
                    $value = ($value === 'true' || $value === '1');
                } elseif ($type === 'json') {
                    $value = json_decode($value, true);
                }
                
                $formatted[$key] = $value;
            }
            
            ApiResponse::success($formatted, 'Settings retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getAllSettings: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve settings');
        }
    }
    
    /**
     * Get setting by key
     */
    public function getSettingByKey($key) {
        try {
            $query = "SELECT setting_value, setting_type 
                      FROM site_settings 
                      WHERE setting_key = :key";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':key', $key);
            $stmt->execute();
            
            $setting = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$setting) {
                ApiResponse::notFound('Setting not found');
            }
            
            $value = $setting['setting_value'];
            $type = $setting['setting_type'];
            
            // Type casting
            if ($type === 'number') {
                $value = is_numeric($value) ? (float)$value : $value;
            } elseif ($type === 'boolean') {
                $value = ($value === 'true' || $value === '1');
            } elseif ($type === 'json') {
                $value = json_decode($value, true);
            }
            
            ApiResponse::success(['key' => $key, 'value' => $value], 'Setting retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getSettingByKey: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve setting');
        }
    }
    
    /**
     * Update setting (admin only - add authentication)
     */
    public function updateSetting($key, $value, $type = 'string') {
        try {
            // Validate type
            $validTypes = ['string', 'number', 'boolean', 'json', 'html'];
            if (!in_array($type, $validTypes)) {
                ApiResponse::error('Invalid setting type');
            }
            
            // Convert value to string for storage
            if ($type === 'boolean') {
                $value = $value ? 'true' : 'false';
            } elseif ($type === 'json') {
                $value = json_encode($value);
            } elseif ($type === 'number') {
                $value = (string)$value;
            }
            
            // Upsert setting
            $query = "INSERT INTO site_settings (setting_key, setting_value, setting_type) 
                      VALUES (:key, :value, :type) 
                      ON DUPLICATE KEY UPDATE 
                      setting_value = :value2, 
                      setting_type = :type2";
            
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':key', $key);
            $stmt->bindParam(':value', $value);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':value2', $value);
            $stmt->bindParam(':type2', $type);
            
            if ($stmt->execute()) {
                ApiResponse::success(
                    ['key' => $key, 'value' => $value, 'type' => $type],
                    'Setting updated successfully'
                );
            } else {
                ApiResponse::serverError('Failed to update setting');
            }
            
        } catch (Exception $e) {
            error_log("Error in updateSetting: " . $e->getMessage());
            ApiResponse::serverError('Failed to update setting');
        }
    }
}

// Handle CORS
CorsHandler::handle();

// Route requests
$method = $_SERVER['REQUEST_METHOD'];
$api = new SettingsAPI();

if ($method === 'GET') {
    // Parse URL path
    $path = isset($_GET['path']) ? $_GET['path'] : '';
    
    if (empty($path)) {
        // GET /api/settings - Get all settings
        $api->getAllSettings();
    } else {
        // GET /api/settings/{key} - Get setting by key
        $api->getSettingByKey($path);
    }
    
} elseif ($method === 'PUT' || $method === 'POST') {
    // PUT/POST /api/settings/{key} - Update setting (admin only - add auth)
    // You should add authentication here before allowing updates
    
    $path = isset($_GET['path']) ? $_GET['path'] : '';
    if (empty($path)) {
        ApiResponse::error('Setting key is required');
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['value'])) {
        ApiResponse::error('Setting value is required');
    }
    
    $type = isset($data['type']) ? $data['type'] : 'string';
    $api->updateSetting($path, $data['value'], $type);
    
} else {
    ApiResponse::error('Method not allowed', 405);
}
?>
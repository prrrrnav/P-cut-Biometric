<?php
/**
 * Database Configuration
 * TST Technologies API - Hostinger Production
 */

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $charset;
    public $conn;
    
    public function __construct() {
        // Detect environment
        $isLocal = ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_ADDR'] === '127.0.0.1');
        
        if ($isLocal) {
            // Local Development Settings
            $this->host = 'localhost';
            $this->db_name = 'u445430414_tst_technology';
            $this->username = 'root';
            $this->password = 'Accister1208#';
        } else {
            // Hostinger Production Settings
            $this->host = 'localhost';
            $this->db_name = 'u445430414_tst_technology'; // Your database name
            $this->username = 'u445430414_tst_user'; // Replace with actual Hostinger username
            $this->password = 'Accister1208#'; // Your database password
        }
        
        $this->charset = 'utf8mb4';
    }
    
    /**
     * Get database connection
     */
    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
                PDO::ATTR_PERSISTENT => false // Don't use persistent connections on shared hosting
            ];
            
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch(PDOException $e) {
            // Log error securely
            error_log("Database Connection Error: " . $e->getMessage());
            
            // For development, show error
            if ($_SERVER['SERVER_NAME'] === 'localhost') {
                throw new Exception("Database connection failed: " . $e->getMessage());
            }
            
            // For production, return null silently
            return null;
        }
        
        return $this->conn;
    }
    
    /**
     * Test database connection
     */
    public function testConnection() {
        $conn = $this->getConnection();
        
        if ($conn) {
            return [
                'success' => true,
                'message' => 'Database connected successfully',
                'database' => $this->db_name,
                'host' => $this->host
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Database connection failed'
            ];
        }
    }
    
    /**
     * Close database connection
     */
    public function closeConnection() {
        $this->conn = null;
    }
}
?>
```

---

## **Step-by-Step: Create Database on Hostinger**

### 1. Log in to Hostinger Panel
Go to: https://hpanel.hostinger.com

### 2. Navigate to Databases
- Click on your hosting account
- Go to **"Databases"** → **"MySQL Databases"**

### 3. Create New Database

You have two options:

#### Option A: Use Existing Database (If Already Created)
If you already created `u445430414_tst_technology`, just note:
- Database name: `u445430414_tst_technology`
- Database username: (something like `u445430414_tst_user` or similar)
- Database password: Your password

#### Option B: Create New Database
1. Click **"Create New Database"**
2. Fill in:
   - **Database name**: `tst_technology` (Hostinger will add prefix like `u445430414_`)
   - **Database user**: `tst_user` (Hostinger will add prefix)
   - **Password**: Use a strong password (or keep your current one)
3. Click **"Create"**

### 4. Note Your Credentials
Hostinger will show you the complete credentials:
```
Database name: u445430414_tst_technology
Database user: u445430414_tst_user (or similar)
Database host: localhost
Database password: Accister1208# (your password)
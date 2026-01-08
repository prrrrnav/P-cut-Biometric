<?php
/**
 * Contact Form API Endpoint
 * TST Technologies API
 */

require_once '../config/database.php';
require_once '../config/response.php';

class ContactAPI {
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
     * Submit contact form
     */
    public function submitContactForm($data) {
        try {
            // Validate required fields
            $required = ['name', 'email', 'phone', 'message'];
            $errors = Validator::required($data, $required);
            
            // Validate email
            if (isset($data['email'])) {
                $emailError = Validator::email($data['email']);
                if ($emailError) {
                    $errors['email'] = $emailError;
                }
            }
            
            // Validate phone
            if (isset($data['phone'])) {
                $phoneError = Validator::phone($data['phone']);
                if ($phoneError) {
                    $errors['phone'] = $phoneError;
                }
            }
            
            if (!empty($errors)) {
                ApiResponse::validationError($errors);
            }
            
            // Sanitize inputs
            $name = Validator::sanitizeString($data['name']);
            $email = Validator::sanitizeEmail($data['email']);
            $phone = Validator::sanitizeString($data['phone']);
            $company = isset($data['company']) ? Validator::sanitizeString($data['company']) : '';
            $interest = isset($data['interest']) ? Validator::sanitizeString($data['interest']) : '';
            $message = Validator::sanitizeString($data['message']);
            
            // Get IP and User Agent
            $ipAddress = $_SERVER['REMOTE_ADDR'];
            $userAgent = $_SERVER['HTTP_USER_AGENT'];
            
            // Insert into database
            $query = "INSERT INTO contact_submissions 
                      (name, email, phone, company, interest, message, ip_address, user_agent) 
                      VALUES (:name, :email, :phone, :company, :interest, :message, :ip_address, :user_agent)";
            
            $stmt = $this->db->prepare($query);
            
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':company', $company);
            $stmt->bindParam(':interest', $interest);
            $stmt->bindParam(':message', $message);
            $stmt->bindParam(':ip_address', $ipAddress);
            $stmt->bindParam(':user_agent', $userAgent);
            
            if ($stmt->execute()) {
                $submissionId = $this->db->lastInsertId();
                
                // Send email notification (optional)
                $this->sendEmailNotification($name, $email, $phone, $company, $interest, $message);
                
                ApiResponse::success(
                    ['submission_id' => $submissionId],
                    'Thank you for your inquiry! Our team will contact you within 24 hours.',
                    201
                );
            } else {
                ApiResponse::serverError('Failed to submit contact form');
            }
            
        } catch (Exception $e) {
            error_log("Error in submitContactForm: " . $e->getMessage());
            ApiResponse::serverError('Failed to submit contact form');
        }
    }
    
    /**
     * Send email notification (optional)
     */
    private function sendEmailNotification($name, $email, $phone, $company, $interest, $message) {
        // You can implement email sending here using PHPMailer or mail() function
        // For WordPress hosting, you can use wp_mail() if WordPress is available
        
        try {
            $to = 'info@tsttechnologies.com'; // Your company email
            $subject = 'New Contact Form Submission - TST Technologies';
            
            $emailBody = "New contact form submission:\n\n";
            $emailBody .= "Name: $name\n";
            $emailBody .= "Email: $email\n";
            $emailBody .= "Phone: $phone\n";
            $emailBody .= "Company: $company\n";
            $emailBody .= "Interest: $interest\n";
            $emailBody .= "Message:\n$message\n";
            
            $headers = "From: noreply@tsttechnologies.com\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
            
            // Uncomment to send email
            // mail($to, $subject, $emailBody, $headers);
            
        } catch (Exception $e) {
            error_log("Email sending error: " . $e->getMessage());
        }
    }
    
    /**
     * Get all contact submissions (admin only - add authentication)
     */
    public function getAllSubmissions($filters = []) {
        try {
            $query = "SELECT * FROM contact_submissions WHERE 1=1";
            
            $params = [];
            
            // Apply filters
            if (isset($filters['status']) && !empty($filters['status'])) {
                $query .= " AND status = :status";
                $params[':status'] = $filters['status'];
            }
            
            if (isset($filters['from_date']) && !empty($filters['from_date'])) {
                $query .= " AND DATE(created_at) >= :from_date";
                $params[':from_date'] = $filters['from_date'];
            }
            
            if (isset($filters['to_date']) && !empty($filters['to_date'])) {
                $query .= " AND DATE(created_at) <= :to_date";
                $params[':to_date'] = $filters['to_date'];
            }
            
            $query .= " ORDER BY created_at DESC";
            
            // Pagination
            $page = isset($filters['page']) ? max(1, (int)$filters['page']) : 1;
            $limit = isset($filters['limit']) ? min(100, max(1, (int)$filters['limit'])) : 20;
            $offset = ($page - 1) * $limit;
            
            $query .= " LIMIT :limit OFFSET :offset";
            
            $stmt = $this->db->prepare($query);
            
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            
            $stmt->execute();
            
            $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get total count
            $countQuery = "SELECT COUNT(*) as total FROM contact_submissions WHERE 1=1";
            foreach ($params as $key => $value) {
                if ($key === ':status') {
                    $countQuery .= " AND status = :status";
                } elseif ($key === ':from_date') {
                    $countQuery .= " AND DATE(created_at) >= :from_date";
                } elseif ($key === ':to_date') {
                    $countQuery .= " AND DATE(created_at) <= :to_date";
                }
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
                'submissions' => $submissions,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => (int)$totalCount,
                    'totalPages' => ceil($totalCount / $limit)
                ]
            ];
            
            ApiResponse::success($response, 'Submissions retrieved successfully');
            
        } catch (Exception $e) {
            error_log("Error in getAllSubmissions: " . $e->getMessage());
            ApiResponse::serverError('Failed to retrieve submissions');
        }
    }
}

// Handle CORS
CorsHandler::handle();

// Route requests
$method = $_SERVER['REQUEST_METHOD'];
$api = new ContactAPI();

if ($method === 'POST') {
    // POST /api/contact - Submit contact form
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        ApiResponse::error('Invalid JSON data');
    }
    
    $api->submitContactForm($data);
    
} elseif ($method === 'GET') {
    // GET /api/contact - Get all submissions (admin only - add auth)
    // You should add authentication here before allowing access
    $api->getAllSubmissions($_GET);
    
} else {
    ApiResponse::error('Method not allowed', 405);
}
?>
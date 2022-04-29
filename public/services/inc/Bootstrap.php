<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
// include main configuration file
require_once PROJECT_ROOT_PATH . "/inc/Config.php";
require_once PROJECT_ROOT_PATH . "/inc/PHPMailer.php";
 
// include the base controller file
require_once PROJECT_ROOT_PATH . "/controller/api/BaseController.php";
 
// include the use model file
require_once PROJECT_ROOT_PATH . "/model/ConfigModel.php";
require_once PROJECT_ROOT_PATH . "/model/ContactUsModel.php";
require_once PROJECT_ROOT_PATH . "/model/LeadReportModel.php";
require_once PROJECT_ROOT_PATH . "/model/RecycleModel.php";

function cors() {
    
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
}

function send_unauthorized()
{
    header("HTTP/1.1 401 Unauthorized");
    session_destroy();
    exit;
}

function validate_session() 
{
    session_start();

    if ( ! isset( $_SESSION['user'] ) ) {
             send_unauthorized();
        }
}

?>
<?php

session_start();

if ( ! isset( $_SESSION['user'] ) )
{
    send_unauthorized();
}

    class ContactUsController extends BaseController {

        public function getWebsiteContacts() {

            // echo $_SESSION['user']."<br>";

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            
            if (strtoupper($requestMethod) == 'GET') {

                try {

                    $configModel = new ContactUsModel();
                    
                    if(isset($_GET['startDate'])) {
                        $startDate = htmlspecialchars( $_GET["startDate"] );
                    } else {
                        $startDate = date('Y-m-01');
                    }

                    if(isset($_GET['endDate'])) {

                        $endDate = htmlspecialchars( $_GET["endDate"] );
                        
                    } else {

                        date_default_timezone_set('Asia/Kolkata');

                        $endDate = date('Y-m-d H:i:s');
                    }

                    if(isset($startDate) && isset($endDate)) {
                       
                        $responseData = $configModel->getWebsiteContacts($startDate, $endDate);

                        // $responseData = json_encode($configData);
                        // $responseData = $configData;
                    }

                    // $limit = htmlspecialchars( $_GET["limit"] );
                    // $offset = htmlspecialchars( $_GET["offset"] );
                    // if (isset($limit) && !empty($limit) && isset($offset) && !empty($offset)) {
                    //     $configData = $configModel->getContactDetailsOffset($limit, $offset);
                    //     $responseData = json_encode($configData);
                    // }

                } catch (Error $e) {
                    $strErrorDesc = $e->getMessage().' Something went wrong!'; 
                }
            }
            else {
                $strErrorDesc = 'Method not supported';
            }

            if (!$strErrorDesc) {
                $this->sendSuccess($responseData);
            } else {
                $this->sendError($strErrorDesc);
            }
        }

        public function insertWebsiteContacts() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            
            if (strtoupper($requestMethod) == 'POST') {
                try {

                    $configModel = new ContactUsModel();
                    
                    if(isset($_POST['name'])) {
                        $name = htmlspecialchars( $_POST["name"] );
                    } 

                    if(isset($_POST['email'])) {
                        $email = htmlspecialchars( $_POST["email"] );
                    } 
                    if(isset($_POST['phone'])) {
                        $phone = htmlspecialchars( $_POST["phone"] );
                    } 

                    if(isset($_POST['message'])) {
                        $message = htmlspecialchars( $_POST["message"] );
                    } 
                    if(isset($_POST['subject'])) {
                        $subject = htmlspecialchars( $_POST["subject"] );
                    } 

                    if(isset($name) && isset($email)) {
                       
                        $responseData = $configModel->insertWebsiteContacts($name, $email, $phone, $message, $subject);

                        // $responseData = $configData;
                        // $responseData = json_encode($configData);

                    }

                    

                } catch (Error $e) {
                    $strErrorDesc = $e->getMessage().' Something went wrong!'; 
                }
            }
            else {
                $strErrorDesc = 'Method not supported';
            }

            if (!$strErrorDesc) {
                $this->sendSuccess($responseData);
            } else {
                $this->sendError($strErrorDesc);
            }
        }

        public function updateWebsiteContacts() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            
            if (strtoupper($requestMethod) == 'POST') {
                try {

                    $configModel = new ContactUsModel();
                    
                    if(isset($_POST['id'])) {
                        $id = htmlspecialchars( $_POST["id"] );
                    } 

                    if(isset($_POST['remarks'])) {
                        $remarks = htmlspecialchars( $_POST["remarks"] );
                    } 
                    if(isset($_POST['assignTo'])) {
                        $assignTo = htmlspecialchars( $_POST["assignTo"] );
                    } 

                    if(isset($id)) {
                       
                        $responseData = $configModel->updateWebsiteContacts($id, $remarks, $assignTo);

                    }

                } catch (Error $e) {
                    $strErrorDesc = $e->getMessage().' Something went wrong!'; 
                }
            }
            else {
                $strErrorDesc = 'Method not supported';
            }

            if (!$strErrorDesc) {
                $this->sendSuccess($responseData);
            } else {
                $this->sendError($strErrorDesc);
            }
        }

        public function deleteWebsiteContacts() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            
            if (strtoupper($requestMethod) == 'POST') {

                try {
                    $contactModel = new ContactUsModel();
                    
                    $deleteIDList = json_decode($_POST['idList']);;
                    
                    if (isset($deleteIDList)) { 
                        $responseData = $contactModel->deleteWebsiteContacts($deleteIDList);
                        
                        // $responseData = json_encode($configData);
                        // $responseData = $configData;
                    }

                } catch (Error $e) {
                    $strErrorDesc = $e->getMessage().' Something went wrong!'; 
                }
            }
            else {
                $strErrorDesc = 'Method not supported';
            }

            if (!$strErrorDesc) {
                $this->sendSuccess($responseData);
            } else {
                $this->sendError($strErrorDesc);
            }
        }

    }
?>
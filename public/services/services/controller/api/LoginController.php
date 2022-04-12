<?php
    
    // session_start();
    // session_destroy();

    class LoginController extends BaseController {

        public function checkAuthorize() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];

            if (strtoupper($requestMethod) == 'POST') {
                
                try { 
                       $user = htmlspecialchars($_POST["username"]);
                       $pass  = htmlspecialchars($_POST["password"]); 
                       
                       if ( $user == PORTAL_USERNAME && $pass == PORTAL_USERNAME_PASS)
                        {
                            
                            // session_start();
                            $_SESSION['user'] = $user;
                            $responseData = array('message' => 'Logged In-2');
                        } 
                        
                        else {
                            send_unauthorized();
                        }
                      
                   
                } catch (Error $e) {
                    $strErrorDesc = $e->getMessage().' Something went wrong!';
                    
                }
            }
            else {
                $strErrorDesc = 'Method not supported';
            }

            if (!$strErrorDesc) {
                $this->sendSuccess($responseData, true);
            } else {
                $this->sendError($strErrorDesc);
            }
        }


        public function logout() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];

            if (strtoupper($requestMethod) == 'GET') {
                
                try { 
                    // $responseData = json_encode(array('message' => 'Logged Out !!'), true);
                    $responseData = array('message' => 'Logged Out !!');
                   
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
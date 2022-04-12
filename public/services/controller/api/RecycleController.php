<?php

    class RecycleController extends BaseController {

        public function getRecycleData($module) {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            
            if (strtoupper($requestMethod) == 'GET') {
                try {

                    $configModel = new RecycleModel();
                    
                    if(isset($_GET['startDate'])) {
                        $startDate = htmlspecialchars( $_GET["startDate"] );
                    } else {
                        $startDate = date('Y-m-01 00:00:00');
                    }

                    if(isset($_GET['endDate'])) {

                        $endDate = htmlspecialchars( $_GET["endDate"] );
                        
                    } else {

                        date_default_timezone_set('Asia/Kolkata');

                        $endDate = date('Y-m-d H:i:s');
                    }

                    if(isset($startDate) && isset($endDate)) {
                       
                        $responseData = $configModel->getRecycleData($module, $startDate, $endDate);

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

        public function restoreRecycleData($module) {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            
            if (strtoupper($requestMethod) == 'POST') {

                try {

                    $contactModel = new RecycleModel();
                    
                    $deleteIDList = json_decode($_POST['idList']);;
                    
                    if (isset($deleteIDList)) { 

                        $responseData = $contactModel->restoreRecycleData($module, $deleteIDList);
                        
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

        public function deleteRecycleData($module) {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            
            if (strtoupper($requestMethod) == 'POST') {

                try {

                    $contactModel = new RecycleModel();
                    
                    $deleteIDList = json_decode($_POST['idList']);;
                    
                    if (isset($deleteIDList)) { 

                        $responseData = $contactModel->deleteRecycleData($module, $deleteIDList);
                        
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
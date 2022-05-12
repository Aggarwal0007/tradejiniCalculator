<?php
    class SymbolStoreController extends BaseController {


        public function getSymbolStoreVersionDetails()
        {
           
            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
    
            if (strtoupper($requestMethod) == 'GET') {

                try {
                    $spanCalcModel = new SymbolStoreModel();
                    
                    if (isset($_GET['version'])) {
                        $version = $_GET['version'];
                    }
    
                    if (isset($version)) {
                        $responsexc = $spanCalcModel->getSymbolStoreVersionDetails($version);
                        $responseData = json_decode($responsexc);
                    }

                } catch (Error $e) {
                    $strErrorDesc = $e->getMessage() . ' Something went wrong!';
                }
            } else {
                $strErrorDesc = 'Method not supported';
            }
    
            if (!$strErrorDesc) {
                $this->sendSuccess($responseData);
            } else {
                $this->sendError($strErrorDesc);
            }
        }
    }

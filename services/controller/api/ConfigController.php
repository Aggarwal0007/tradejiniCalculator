<?php
    class ConfigController extends BaseController {

        public function getConfig() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            $arrQueryStringParams = $this->getQueryStringParams();

            if (strtoupper($requestMethod) == 'GET') {
                try {
                    $configModel = new ConfigModel();
                       
                    if (isset($arrQueryStringParams) && $arrQueryStringParams) {
                        $selectedConfig = $arrQueryStringParams;
                    }
     
                    $configData = $configModel->getAppConfig($selectedConfig);
                    foreach ($configData as $key => $value) {
                        $resData = $value['value'];
                    }

                    $responseData = json_decode($resData);
            

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
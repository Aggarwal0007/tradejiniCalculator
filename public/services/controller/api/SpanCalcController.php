<?php
    class SpanCalcController extends BaseController {

        public function getSpanCalcResults()
        {

            $strErrorDesc = '';
            $requestMethod = $_SERVER["REQUEST_METHOD"];
    
            if (strtoupper($requestMethod) == 'POST') {
    
                try {
    
                    $spanCalcModel = new SpanCalcModel();
    
                    if (isset($_POST['actid'])) {
                        $actid = htmlspecialchars($_POST["actid"]);
                    }

                    if (isset($_POST['pos'])) {
                        $pos = $_POST["pos"];
                    }
    
                    if (isset($actid) && isset($pos)) {
                        $responsexc = $spanCalcModel->getSpanCalcResults(json_encode($actid), $pos);
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
?>
<?php

class LeadReportController extends BaseController
{

    public function getLeadReports()
    {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {
            try {

                $configModel = new LeadReportModel();

                if (isset($_GET['startDate'])) {
                    $startDate = htmlspecialchars($_GET["startDate"]);
                } else {
                    $startDate = date('Y-m-01');
                }

                if (isset($_GET['endDate'])) {

                    $endDate = htmlspecialchars($_GET["endDate"]);
                } else {

                    date_default_timezone_set('Asia/Kolkata');

                    $endDate = date('Y-m-d H:i:s');
                }

                if (isset($startDate) && isset($endDate)) {

                    $responseData = $configModel->getLeadReports($startDate, $endDate);
                    for ($i = 0; $i < count($responseData); $i++) {
                        if (($responseData[$i]['status'] == 1) || ($responseData[$i]['assignto'] != null)) {

                            $responseData[$i]['status'] = 1;
                            // echo $responseData[$i]['status'];
                        }
                    }
                    // $responseData = json_encode($configData);
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

    public function insertLeadReports()
    {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {

                $configModel = new LeadReportModel();

                if (isset($_POST['name'])) {
                    $name = htmlspecialchars($_POST["name"]);
                }

                if (isset($_POST['email'])) {
                    $email = htmlspecialchars($_POST["email"]);
                }
                if (isset($_POST['contactno'])) {
                    $contactno = htmlspecialchars($_POST["contactno"]);
                }

                if (isset($_POST['city'])) {
                    $city = htmlspecialchars($_POST["city"]);
                }
                if (isset($_POST['partner_id'])) {
                    $partner_id = htmlspecialchars($_POST["partner_id"]);
                }

                if (isset($name) && isset($email)) {

                    $responseData = $configModel->insertLeadReports($name, $email, $contactno, $city, $partner_id);

                    if ($responseData['message'] == "Inserted Successfully!!") {

                        $data = <<<DATA
                                {
                                    "LeadName": "$name",
                                    "MobileNo": "$contactno",
                                    "EmailId": "$email",
                                    "Refferedby": "$partner_id",
                                    "callback": ""
                                }
                                DATA;

                        $resp = callCurlAPI(CRM_URL, $data, "POST");

                        // echo print_r($resp);
                    }

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

    public function deleteLeadReports()
    {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {

            try {
                $contactModel = new LeadReportModel();

                $deleteIDList = json_decode($_POST['idList']);;

                if (isset($deleteIDList)) {
                    $responseData = $contactModel->deleteLeadReports($deleteIDList);

                    // $responseData = $configData;
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

    public function updateLeadReports()
    {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {

                $leadReportModel = new LeadReportModel();

                if (isset($_POST['id'])) {
                    $id = htmlspecialchars($_POST["id"]);
                }

                if (isset($_POST['remarks'])) {
                    $remarks = htmlspecialchars($_POST["remarks"]);
                }
                if (isset($_POST['assignTo'])) {
                    $assignTo = htmlspecialchars($_POST["assignTo"]);
                }

                if (isset($id)) {

                    $responseData = $leadReportModel->updateLeadReports($id, $remarks, $assignTo);
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

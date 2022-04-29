<?php

class RecycleController extends BaseController
{

    public function getRecycleData($module)
    {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {
            try {

                $configModel = new RecycleModel();

                if (isset($_GET['pageNo'])) {
                    $pageNo = htmlspecialchars($_GET["pageNo"]);
                } else {
                    $pageNo = 1;
                }

                $limit = 10;
                $offset = ($pageNo - 1) * 10;
                $responseData = $configModel->getRecycleData($module, $limit, $offset);

            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong!';
            }
        } else {
            $strErrorDesc = 'Method not supported';
        }

        if (!$strErrorDesc) {
            $this->sendSuccess($responseData, true);
        } else {
            $this->sendError($strErrorDesc);
        }
    }

    public function restoreRecycleData($module)
    {

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

    public function deleteRecycleData($module)
    {

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

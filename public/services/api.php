<?php

    require __DIR__ . "/inc/Bootstrap.php";

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    $uri = explode( '/', $uri );

    cors();
 
    if($uri[8] === "config") {

        require PROJECT_ROOT_PATH . "/controller/api/ConfigController.php";
        $objFeedController = new ConfigController();
        $strMethodName = $uri[9] . 'Config';
        $objFeedController->{$strMethodName}();
    }

    else if($uri[8] === "contact") {

        require PROJECT_ROOT_PATH . "/controller/api/ContactUsController.php";
        $objFeedController = new ContactUsController();
        $strMethodName = $uri[9] . 'WebsiteContacts';
        $objFeedController->{$strMethodName}();
    } 

    else if($uri[8] === "leadReport") {

        require PROJECT_ROOT_PATH . "/controller/api/LeadReportController.php";
        $objFeedController = new LeadReportController();
        $strMethodName = $uri[9] . 'LeadReports';
        $objFeedController->{$strMethodName}();
    } 

    else if($uri[8] === "recycle") {

        require PROJECT_ROOT_PATH . "/controller/api/RecycleController.php";
        $objFeedController = new RecycleController();
        $strMethodName = $uri[10] . 'RecycleData';
        $objFeedController->{$strMethodName}($uri[9]);
    } 


    else if($uri[8] === "portal_login") {
        
        require PROJECT_ROOT_PATH . "/controller/api/LoginController.php";
        $objFeedController = new LoginController();
        $strMethodName = "checkAuthorize";
        $objFeedController->{$strMethodName}();
    }

    else if($uri[8] === "portal_logout") {

        session_start();
        session_destroy();
        require PROJECT_ROOT_PATH . "/controller/api/LoginController.php";
        $objFeedController = new LoginController();
        $strMethodName = "logout";
        $objFeedController->{$strMethodName}();
    }
    
    else {

        header("HTTP/1.1 404 Not Found");
        exit();
    }

?>

<?php

    require __DIR__ . "/inc/Bootstrap.php";
    cors();

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    $uri = explode( '/', $uri );
    
    $key = array_search('api.php', $uri);

    $module = $uri[$key+1];
    $method = $uri[$key+2];
    $sub = $uri[$key+3];

    if($module === "config") {

        require PROJECT_ROOT_PATH . "/controller/api/ConfigController.php";
        $objFeedController = new ConfigController();
        $strMethodName = $method . 'Config';
        $objFeedController->{$strMethodName}();
    }

    else if($module === "contact") {

        require PROJECT_ROOT_PATH . "/controller/api/ContactUsController.php";
        $objFeedController = new ContactUsController();
        $strMethodName = $method . 'WebsiteContacts';
        $objFeedController->{$strMethodName}();
    } 

    else if($module === "leadReport") {

        require PROJECT_ROOT_PATH . "/controller/api/LeadReportController.php";
        $objFeedController = new LeadReportController();
        $strMethodName = $method . 'LeadReports';
        $objFeedController->{$strMethodName}();
    } 

    else if($module === "recycle") {

        require PROJECT_ROOT_PATH . "/controller/api/RecycleController.php";
        $objFeedController = new RecycleController();
        $strMethodName = $sub . 'RecycleData';
        $objFeedController->{$strMethodName}($method);
    } 


    else if($module === "portal_login") {

        session_start();

        require PROJECT_ROOT_PATH . "/controller/api/LoginController.php";
        $objFeedController = new LoginController();
        $strMethodName = "checkAuthorize";
        $objFeedController->{$strMethodName}();
    }

    else if($module === "portal_logout") {

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

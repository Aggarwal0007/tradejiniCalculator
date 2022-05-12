<?php

function callCurlAPI($url, $data, $method)
{

    $headers = array(
        "Accept: application/json",
        "Content-Type: application/json",
    );
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);

    if($method == "POST") {
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    
    $resp = curl_exec($curl);
    curl_close($curl);
    return $resp;

    //for debug only!
    // curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    // curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

}


function curlGETAPI() {

    $url = "https://nxtrade-dev-api.iouring.in/mkt-data/scrips/symbol-store?version=0";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    
    $headers = array(
       "Accept: application/json",
    );
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    //for debug only!
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    
    $resp = curl_exec($curl);
echo $resp;
die;
    // echo "test me";
    // echo print_r($resp);
    // die;
    curl_close($curl);
    // var_dump($resp);
    


}
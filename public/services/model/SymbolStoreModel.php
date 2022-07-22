<?php

require_once PROJECT_ROOT_PATH . "/model/SearchDataBase.php";

class SymbolStoreModel extends SearchDataBase
{

  public function getSymbolStoreVersionDetails($version)
  {

    $res = $this->select("SELECT VERSION FROM CACHE_DATA where NAME= ?", ["s", "scripcache"]);
    $currentVersion =  $res[0]["VERSION"];

    if ($version  < $currentVersion) {

      $resContent = $this->select("SELECT DATA FROM CACHE_DATA where NAME= ?", ["s", "scripcache"]);
      $resContentArr = $resContent[0]["DATA"];
      $resContentArr = str_replace('\n', "|", $resContentArr);
      $resData = json_decode($resContentArr);
      
      $isUpdated = true;
  
    } else {
      
      $isUpdated = false;
      $resData = [];
    }

    $respData = array(
      "version" => $currentVersion,
      "updated" => $isUpdated,
      "data" => $resData
    );

    $resp = json_encode($respData);

    return $resp;
  }
}

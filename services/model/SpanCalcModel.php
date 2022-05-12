<?php

  require_once PROJECT_ROOT_PATH . "/model/Database.php";

  class SpanCalcModel extends Database {

      public function getSpanCalcResults($actid, $pos) {
        
        $url = SPAN_CALC_URL;
        $data = <<<DATA
        jData={
            "actid": $actid,
            "pos": $pos
          }
        DATA;
        
        $resp = callCurlAPI($url, $data, "POST");
        return $resp;

      }
  }

?>
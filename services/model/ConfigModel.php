<?php

  require_once PROJECT_ROOT_PATH . "/model/Database.php";

  class ConfigModel extends Database {

      public function getAppConfig($key_params) {
                
        return $this->select("SELECT value FROM APP_CONFIG WHERE K = ?", ["s", $key_params]);

      }
  }

?>
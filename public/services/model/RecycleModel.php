<?php

require_once PROJECT_ROOT_PATH . "/model/Database.php";

class RecycleModel extends Database
{

  public function getRecycleData($module, $limit, $offset)
  {

    $tableName = $this->getDbName($module);

    $rowsSelected = $this->select("SELECT * FROM $tableName LIMIT ? OFFSET ?", ["ii", $limit, $offset]);
    $rowsCount = $this->select("SELECT COUNT(*) FROM $tableName");

    // array_push($rowsSelected, array("count" => $rowsCount[0]['COUNT(*)'] ));
    // echo print_r($rowsSelected);
    // die;
    $result = array($rowsSelected, $rowsCount);
    return $result;
  }

  public function restoreRecycleData($module, $restoreIDs)
  {

    $tableName = $this->getDbName($module);

    if ($tableName === "website_contact_deleted") {
      $tbName = "website_contact";
    } else {
      $tbName = "leadform";
    }

    $params_annotation = str_repeat("i", count($restoreIDs));

    $inSeparation = trim(str_repeat('?,', count($restoreIDs)), ',');
    if ($tableName === "website_contact_deleted") {
      $st = "INSERT INTO $tbName (id, name, phone, email, subject, message, status, date, remarks, assignto)
          SELECT id, name, phone, email, subject, message, status, date, remarks, assignto FROM $tableName WHERE id IN ($inSeparation)";
    } else {
      $st = "INSERT INTO $tbName (id, name, contactno, email, city, date, status, partner_id, remarks, assignto)
          SELECT id, name, contactno, email, city, date, status, partner_id, remarks, assignto FROM $tableName WHERE id IN ($inSeparation)";
    }


    $this->insert($st, [$params_annotation, ...$restoreIDs]);

    return $this->delete("DELETE FROM $tableName WHERE id IN ($inSeparation)", [$params_annotation, ...$restoreIDs]);
  }

  public function deleteRecycleData($module, $deleteIDs)
  {

    $tableName = $this->getDbName($module);

    $params_annotation = str_repeat("i", count($deleteIDs));

    $inSeparation = trim(str_repeat('?,', count($deleteIDs)), ',');

    return $this->delete("DELETE FROM $tableName WHERE id IN ($inSeparation)", [$params_annotation, ...$deleteIDs]);
  }

  private function getDbName($module)
  {

    if ($module === "contact")
      $db = "website_contact_deleted";

    if ($module === "leadReport")
      $db = "leadform_deleted";

    return $db;
  }
}

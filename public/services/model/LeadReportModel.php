<?php

  require_once PROJECT_ROOT_PATH . "/model/Database.php";

  class LeadReportModel extends Database {

      public function getLeadReports($startDate, $endDate) {
          
         return $this->select("SELECT * FROM leadform WHERE date BETWEEN ? AND ?", ["ss", $startDate, $endDate]);

      }

      public function insertLeadReports($name, $email, $phone, $city, $partner_id) {

        date_default_timezone_set('Asia/Kolkata');

        $date = date('Y-m-d H:i:s');
        
        return $this->insert("INSERT INTO leadform (name, contactno, email, city, partner_id, date ) VALUES (?,?,?,?,?,?)", ["ssssss", $name, $phone, $email, $city, $partner_id, $date ]);

     }

      public function deleteLeadReports($deleteIDs) {
        
        $params_annotation = str_repeat("i", count($deleteIDs));
       
        $inSeparation = trim(str_repeat('?,', count($deleteIDs)), ',');
      
        $st = "INSERT INTO leadform_deleted (id, name, contactno, email, city, date, status, partner_id, remarks, assignto)
              SELECT id, name, contactno, email, city, date, status, partner_id, remarks, assignto FROM leadform WHERE id IN ($inSeparation)";
      
         $this->insert($st, [$params_annotation, ...$deleteIDs]);

         return $this->delete("DELETE FROM leadform WHERE id IN ($inSeparation)", [$params_annotation, ...$deleteIDs]);
         
      }

      public function updateLeadReports($id, $remarks, $assignTo) {
      
        return $this->update("UPDATE leadform SET remarks = ?, assignto = ? WHERE id = ? LIMIT 1", ["ssi", $remarks,  $assignTo, $id]);
  
     }

  }

?>
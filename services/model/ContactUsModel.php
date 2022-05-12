<?php

  require_once PROJECT_ROOT_PATH . "/model/Database.php";

  class ContactUsModel extends Database {

      public function getWebsiteContacts($startDate, $endDate) {
          
         return $this->select("SELECT * FROM website_contact WHERE date BETWEEN ? AND ?", ["ss", $startDate, $endDate]);

      }

      public function deleteWebsiteContacts($deleteIDs) {
        
        $params_annotation = str_repeat("i", count($deleteIDs));
       
        $inSeparation = trim(str_repeat('?,', count($deleteIDs)), ',');

       $st = "INSERT INTO website_contact_deleted (id, name, phone, email, subject, message, status, date, remarks, assignto)
              SELECT id, name, phone, email, subject, message, status, date, remarks, assignto FROM website_contact WHERE id IN ($inSeparation)";
      
         $this->insert($st, [$params_annotation, ...$deleteIDs]);
         return $this->delete("DELETE FROM website_contact WHERE id IN ($inSeparation)", [$params_annotation, ...$deleteIDs]);
         
      }

      public function insertWebsiteContacts($name, $email, $phone, $message, $subject, $remarks, $assignTo) {

        date_default_timezone_set('Asia/Kolkata');

        $date = date('Y-m-d H:i:s');
        
        return $this->insert("INSERT INTO website_contact (name, phone, email, subject, message, date, remarks, assignto ) VALUES (?,?,?,?,?,?,?,?)", ["ssssssss", $name, $phone, $email, $subject, $message, $date, $remarks, $assignTo ]);

     }

     public function updateWebsiteContacts($id, $remarks, $assignTo) {
 
      return $this->update("UPDATE website_contact SET remarks = ?, assignto = ? WHERE id = ? LIMIT 1", ["ssi", $remarks,  $assignTo, $id]);

      
   }

  }

?>
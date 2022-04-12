<?php

    class Database {

        protected $connection = null;

        public function __construct() {

            try {

                $this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);

                if ( mysqli_connect_errno()) {
                    throw new Exception("Could not connect to database.");   
                }

            }
            catch (Exception $e) {
                throw new Exception($e -> getMessage());
            }
        }

        public function select($query = "" , $params = []) {

            try {

                $stmt = $this->executeStatement( $query , $params );

                $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);    

                $stmt->close();
    
                return $result;

            } 
            catch(Exception $e) {
                throw New Exception( $e->getMessage() );
            }

            return false;
    }

    public function delete($query = "" , $params = []) {

        try {

            $stmt = $this->executeStatement( $query , $params );
        
            $result = null;

            if($stmt -> affected_rows > 0) {

                $result = array('message' => 'Deleted Successfully!!');

            } else {

                $result = array('message' => 'Id(s) not exists.');
                
            }

            $stmt->close();
 
            return $result;

        } 
        catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }

        return false;
    }

    public function insert($query = "" , $params = []) {
       
        try {

            $stmt = $this->executeStatement( $query , $params );
            
            $result = null;

            if($stmt -> affected_rows > 0) {

                // $result = json_encode(array('message' => 'Inserted Successfully!!'), true);
                $result = array('message' => 'Inserted Successfully!!');

            } else {

                $result = array('message' => 'Unable to insert.');

            }

            $stmt->close();
 
            return $result;

        } 
        catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }

        return false;
    }

    public function update($query = "" , $params = []) {
       
        try {

            $stmt = $this->executeStatement( $query , $params );
            
            $result = null;

            if($stmt -> affected_rows > 0) {

                $result = array('message' => 'Updated Successfully!!');

            } else {

                $result = array('message' => 'Unable to update.');

            }

            $stmt->close();
 
            return $result;

        } 
        catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }

        return false;
    }

    private function executeStatement($query = "" , $params = []) {

        try {
            
            $stmt = $this->connection->prepare( $query );

            if($stmt === false) {

                throw New Exception("Unable to do prepared statement: " . $query);
            }
            
            if( $params ) {
                $stmt->bind_param(...$params);
            }

            $stmt->execute();
 
            return $stmt;

        } catch(Exception $e) {
            throw New Exception( $e->getMessage() );
        }   
    }

    }
?>

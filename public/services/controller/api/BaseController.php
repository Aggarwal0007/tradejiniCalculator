<?php 
   class BaseController {

     /**
     * __call magic method.
     */

    public function __call($name, $arguments) {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }

    /**
     * Get URI elements.
     * 
     * @return array
     */

    protected function getUriSegments() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
 
        return $uri;
    }

    /**
     * Get querystring params.
     * 
     * @return array
     */
    protected function getQueryStringParams() {
          $key = htmlspecialchars( $_GET["key"] );
          return $key;
        // return parse_str($_SERVER['QUERY_STRING'], $query);
    }

    /**
     * Send API output.
     *
     * @param mixed  $data
     * @param string $httpHeader
     */
    protected function sendOutput($data, $httpHeaders=array()) {
 
        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
 
        echo $data;
        exit;
    }

    protected function sendSuccess($data) {
       $convertedData = json_encode($data);
       $httpHeaders = array('Content-Type: application/json', 'HTTP/1.1 200 OK');
       $res = stripslashes(json_encode(array('status' => "ok", "d" => json_decode($convertedData))));
       $this->sendOutput($res, $httpHeaders);
    }

    protected function sendError($data) {

        $httpHeaders = array('Content-Type: application/json', 'HTTP/1.1 Internal Server Error');
        $res = stripslashes( json_encode(array('status' => "error", 'msg' => json_decode($data))));
 
        $this->sendOutput($res, $httpHeaders);
    }

   }

?>
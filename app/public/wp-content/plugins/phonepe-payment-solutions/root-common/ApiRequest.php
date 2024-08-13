<?php

if (!class_exists('PPEC_ApiRequest')) {
  class PPEC_ApiRequest {
    private $url;
    private $headers;
    private $data;

    public function __construct($url, $headers = [], $data = []) {
      $this->url = $url;
      $this->headers = $headers;
      $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function get_url() {
      return $this->url;
    }

    /**
     * @return array|mixed
     */
    public function get_headers() {
      return $this->headers;
    }

    /**
     * @return array|mixed
     */
    public function get_data() {
      return $this->data;
    }
  }
}

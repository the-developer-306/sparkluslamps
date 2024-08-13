<?php
if (!class_exists('PPEC_HttpClient')) {
  class PPEC_HttpClient {
    public static function post(PPEC_ApiRequest $apiRequest) {
      $args = array(
        'headers'     => $apiRequest->get_headers(),
        'body'        => $apiRequest->get_data()
      );

      $response = wp_remote_post($apiRequest->get_url(), $args);
      $http_code = wp_remote_retrieve_response_code($response);
      $body = wp_remote_retrieve_body($response);

      return new PPEC_ApiResponse($http_code, $body);
    }

    public static function get(PPEC_ApiRequest $apiRequest) {
      $args = array(
        'headers'     => $apiRequest->get_headers(),
      );

      $response = wp_remote_get($apiRequest->get_url(), $args);
      $http_code = wp_remote_retrieve_response_code($response);
      $body = wp_remote_retrieve_body($response);

      return new PPEC_ApiResponse($http_code, $body);
    }
  }
}

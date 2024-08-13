<?php

/**
 * PPEX_PG_V1_Pay_Response
 */
if (!class_exists('PPEX_PG_V1_Pay_Response')) {
  class PPEX_PG_V1_Pay_Response {
    private $merchant_id;
    private $merchant_transaction_id;
    private $instrument_type;
    private $redirect_url;
    private $redirect_method;
    private $success;
    private $code;
    private $message;
    private $data;

    function __construct($ppex_api_response) {
      $this->merchant_id = $ppex_api_response->get_data()['merchantId'];
      $this->merchant_transaction_id =   $ppex_api_response->get_data()['merchantTransactionId'];
      $this->instrument_type = $ppex_api_response->get_data()['instrumentResponse']['type'];
      $this->redirect_url =   $ppex_api_response->get_data()['instrumentResponse']['redirectInfo']['url'];
      $this->redirect_method =  $ppex_api_response->get_data()['instrumentResponse']['redirectInfo']['method'];
      $this->success = $ppex_api_response->get_success();
      $this->code = $ppex_api_response->get_code();
      $this->message = $ppex_api_response->get_message();
      $this->data = $ppex_api_response->get_data();
    }

    function get_merchant_id() {
      return $this->merchant_id;
    }
    function get_merchant_transaction_id() {
      return $this->merchant_transaction_id;
    }
    function get_instrument_type() {
      return $this->instrument_type;
    }
    function get_redirect_url() {
      return $this->redirect_url;
    }
    function get_redirect_method() {
      return $this->redirect_method;
    }
    function get_success() {
      return $this->success;
    }
    function get_code() {
      return $this->code;
    }
    function get_message() {
      return $this->message;
    }
    function get_data(){
      return $this->data;
    }
  }
}

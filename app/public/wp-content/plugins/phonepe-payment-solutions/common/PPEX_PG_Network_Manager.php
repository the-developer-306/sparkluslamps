<?php

/**
 * PPEX_PG_Network_Manager 
 */
if (class_exists('PPEX_PG_Network_Manager')) return;
class PPEX_PG_Network_Manager {

  private $http_client;

  public function __construct($http_client) {
    $this->http_client = $http_client;
  }

  public function pg_v1_pay($pg_v1_pay_request) {
    $base_url_for = PPEX_Utils::get_base_url($pg_v1_pay_request->get_plugin_context()->get_environment());
    $json_encoded_payload = json_encode($pg_v1_pay_request->to_array());
    $base64_encoded_payload = base64_encode($json_encoded_payload);

    $x_verify = PPEX_Utils::generate_checksum(
      $base64_encoded_payload,
      $pg_v1_pay_request->get_merchant_context()->get_salt_key(),
      $pg_v1_pay_request->get_merchant_context()->get_salt_index(),
      PPEX_PG_Constants::PG_V1_PAY_ENDPOINT
    );

    $headers = self::build_pg_headers($x_verify, $pg_v1_pay_request->get_merchant_context(), $pg_v1_pay_request->get_plugin_context(), PPEX_PG_Constants::WOOCOMMERCE);

    $payload  = json_encode(array("request" => $base64_encoded_payload));
    $ppex_api_request = new PPEX_Api_Request($headers, $base_url_for . PPEX_PG_Constants::PG_V1_PAY_ENDPOINT, $payload);
    $ppex_api_response = $this->http_client::post($ppex_api_request);
    if ($ppex_api_response->get_http_code() != 200)
      ppLogError("pg_v1_pay Request Failed Response Code: " . $ppex_api_response->get_http_code() .
        " Code: " . $ppex_api_response->get_code() . "Message: " . $ppex_api_response->get_message());
    $pg_v1_pay_response = new PPEX_PG_V1_Pay_Response($ppex_api_response);

    return $pg_v1_pay_response;
  }


  public static function build_pg_headers($x_verify, $merchant_context, $plugin_context, $x_source_platform) {
    return array(
      'Content-Type' => PPEX_PG_Constants::APPLICATION_JSON,
      'X-VERIFY' => $x_verify,
      'X-MERCHANT-DOMAIN' => $merchant_context->get_merchant_domain(),
      'X-MERCHANT-ID' => $merchant_context->get_merchant_id(),
      'X-SOURCE' => PPEX_PG_Constants::PLUGIN_SOURCE_HEADER,
      'X-SOURCE-PLATFORM' => $x_source_platform,
      'X-SOURCE-PLATFORM-VERSION' => $plugin_context->get_x_source_platform_version(),
      'X-SOURCE-VERSION' => $plugin_context->get_x_source_version(),
      'X-SOURCE-CLIENT-BROWSER-FINGERPRINT' => isset($_COOKIE['browserFingerprint']) ? $_COOKIE['browserFingerprint'] : null,
      'X-SOURCE-SERVER-IP' => gethostbyname($_SERVER['SERVER_ADDR']),
      'X-SOURCE-CLIENT-IP' => $_SERVER['REMOTE_ADDR']
    );
  }

  /**
   * Checks the status of the txn with PhonePe
   *
   * @param $x_verify 
   * @param $merchant_id 
   * @param $unique_merchant_transaction_id
   * @param $environment
   * @return PPEX_Api_Response
   */

  public function pg_status_check($x_verify, $merchant_id, $unique_merchant_transaction_id, $environment) {
    $url = self::build_pg_status_check_url($merchant_id, $unique_merchant_transaction_id, $environment);

    $headers  =  array(
      'Content-Type' => PPEX_PG_Constants::APPLICATION_JSON,
      'X-MERCHANT-ID' => $merchant_id,
      'X-VERIFY' => $x_verify
    );

    $ppex_api_request = new PPEX_Api_Request($headers, $url);
    $ppex_api_response = $this->http_client::get($ppex_api_request);
    if ($ppex_api_response->get_http_code() != 200) {
      ppLogError("pg_status_check Request Failed Response Code: " . $ppex_api_response->get_http_code() .
        " Code: " . $ppex_api_response->get_code() . "Message: " . $ppex_api_response->get_message());
    }

    return $ppex_api_response;
  }

  public static function build_pg_status_check_url($merchant_id, $unique_merchant_transaction_id, $environment) {
    $url = PPEX_Utils::get_base_url($environment) . PPEX_PG_Constants::PG_V1_STATUS_ENDPOINT . $merchant_id . "/" . $unique_merchant_transaction_id;
    return $url;
  }

  public function check_status($x_verify, $merchant_id, $unique_merchant_transaction_id, $amount_in_paisa,  $merchant_context, $plugin_context) {
    $retry_counter = 0;
    $time_passed = 0;
    $backoff = 0;

    do {
      $ppex_api_response = $this->pg_status_check($x_verify, $merchant_id, $unique_merchant_transaction_id, $plugin_context->get_environment());
      $retry_counter++;
      sleep($backoff);
      $time_passed += $backoff + 1;
      $backoff = $backoff * 2 + 1;
      $code = $ppex_api_response->get_code();

      $ppex_event = new PPEX_Event();
      $ppex_event->set_event_type(PPEX_Constants::PLUGIN_STATUS_CHECK);
      $ppex_event->set_merchant_id($merchant_id);
      $ppex_event->set_merchant_transaction_id($unique_merchant_transaction_id);
      $ppex_event->set_amount_in_paisa($amount_in_paisa);
      $ppex_event->set_code($code);
      $ppex_event->set_grouping_key($merchant_id . ':' . $unique_merchant_transaction_id);

      $this->post_event($ppex_event, $merchant_context, $plugin_context);

      //End   

    } while (($code == PPEX_Constants::PENDING || $code == PPEX_Constants::SERVER_ERROR) && ($retry_counter < PPEX_Constants::MAX_RETRY_COUNT));

    return $ppex_api_response;
  }

  /**
   * POST an event
   * 
   * @param PPEX_Event $event
   * @param PPEX_Merchant_Context $merchant_context
   * @param PPEX_Plugin_Context $plugin_context
   * @return void
   */

  public function post_event($ppex_event, $merchant_context, $plugin_context) {

    $ppex_event->set_platform($plugin_context->get_x_source_platform());
    $ppex_event->set_platform_version($plugin_context->get_x_source_platform_version());
    $ppex_event->set_plugin_version($plugin_context->get_x_source_version());
    $ppex_event->set_flow_type(PPEX_PG_Constants::FLOW_TYPE);
    $ppex_event->set_user_operating_system(filter_var($_SERVER['HTTP_USER_AGENT'], FILTER_SANITIZE_STRING));

    $base_url_for = PPEX_Utils::get_base_url($plugin_context->get_environment());

    $json_data = json_encode($ppex_event->to_array());
    $encoded_payload = base64_encode($json_data);
    $event_payload = json_encode(array('request' => $encoded_payload));
    $x_verify   = PPEX_Utils::generate_checksum($encoded_payload, $merchant_context->get_salt_key(), $merchant_context->get_salt_index(), PPEX_PG_Constants::INGEST_EVENT_ENDPOINT);

    $headers   =  self::build_pg_headers($x_verify, $merchant_context, $plugin_context, PPEX_PG_Constants::WOOCOMMERCE);

    $ppex_api_request = new PPEX_Api_Request($headers, $base_url_for . PPEX_PG_Constants::INGEST_EVENT_ENDPOINT, $event_payload);
    $ppex_api_response = $this->http_client::post($ppex_api_request);

    if ($ppex_api_response->get_http_code() != 200)
      ppLogError("Failed to ingest event: ResponseCode: "  . $ppex_api_response->get_http_code() .
        " Code: " . $ppex_api_response->get_code() . "Message: " . $ppex_api_response->get_message());

    return $ppex_api_response;
  }

  /**
   * verify checksum of payload recieved in callback
   */

  public function handle_callback($payload, $headers, $merchant_key, $key_index) {
    $data = base64_decode($payload);
    $data = json_decode($data, true);

    $generated_checksum = PPEX_Utils::generate_checksum_for_callback($payload, $merchant_key, $key_index);

    if ($headers != $generated_checksum) {
      ppLogError("Invalid callback checksum for payload:" . $data);
      return "Invalid Checksum";
    }

    $ppex_pg_callback = PPEX_PG_Callback::get_instance_from($data);
    return $ppex_pg_callback;
  }
}

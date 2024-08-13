<?php

/**
 * PPEX_WC_PG_Client
 */
class PPEX_WC_PG_Client implements PPEX_PG_Interface {

  private $merchant_context;
  private $plugin_context;
  private $network_manager;

  public function __construct($merchant_context, $plugin_context) {
    $this->merchant_context =  $merchant_context;
    $this->plugin_context = $plugin_context;
    $this->network_manager = new PPEX_PG_Network_Manager(new PPEX_WC_Http_Client());

    add_filter('script_loader_tag', array($this, 'defer_js_scripts'), 10, 3);
    add_action('wp_enqueue_scripts', array($this, 'enqueue_fingerprint_js'), 10);
  }

  private function get_redirect_url_for_order($merchant_transaction_id) {
    $query = [
      'merchant_transaction_id' => $merchant_transaction_id
    ];
    return add_query_arg($query,  WC()->api_request_url('phonepe'));
  }

  public function init_txn($wc_order_id) {
    if (version_compare(WOOCOMMERCE_VERSION, '2.0.0', '>=')) {
      $order = new WC_Order($wc_order_id);
    } else {
      $order = new woocommerce_order($wc_order_id);
    }

    $order->set_payment_method_title(PPEX_PG_Constants::PHONEPE_PG_ID);
    $order->set_payment_method(PPEX_PG_Constants::PHONEPE_PG_TITLE);

    $amount_in_rupees = sanitize_text_field($order->get_total());
    $amount_in_paisa = sanitize_text_field(PPEX_Utils::convert_to_paisa($amount_in_rupees));

    $merchant_transaction_id = PPEX_Utils::make_merchant_transaction_id_unique_for_repeated_requests($wc_order_id);

    $order->set_transaction_id($merchant_transaction_id);
    $order->save();

    $merchant_user_id = get_current_user_id();

    $redirect_url = $this->get_redirect_url_for_order($merchant_transaction_id);
    ppLogInfo('redirect url: ' . $redirect_url);
    $callback_url = site_url() . '/index.php/wp-json/wp-phonepe/v1/callback';
    $payment_instrument = new PPEX_PG_Payment_Instrument("PAY_PAGE");

    $ppex_event = new PPEX_Event();
    $ppex_event->set_event_type(PPEX_Constants::PAY_BUTTON_CLICKED_ON_MERCHANT_CHECKOUT);
    $ppex_event->set_merchant_id($this->merchant_context->get_merchant_id());
    $ppex_event->set_merchant_transaction_id($merchant_transaction_id);
    $ppex_event->set_amount_in_paisa($amount_in_paisa);
    $ppex_event->set_grouping_key($this->merchant_context->get_merchant_id() . ':' . $merchant_transaction_id);
    $this->network_manager->post_event($ppex_event, $this->merchant_context, $this->plugin_context);

    $pg_v1_pay_request = new PPEX_PG_V1_Pay_Request(
      $merchant_transaction_id,
      $amount_in_paisa,
      $merchant_user_id,
      $redirect_url,
      $callback_url,
      $payment_instrument,
      $this->merchant_context,
      $this->plugin_context
    );

    $ppex_event->set_event_type(PPEX_Constants::PAYMENT_REQUEST_TRIGGERED_FROM_PLUGIN);
    $this->network_manager->post_event($ppex_event, $this->merchant_context, $this->plugin_context);

    return $this->network_manager->pg_v1_pay($pg_v1_pay_request);
  }

  public function enqueue_fingerprint_js() {
    wp_register_script('minified_fingerprint_js', plugins_url('/js/fp.min.js', __FILE__), null, null);
    wp_enqueue_script('minified_fingerprint_js');

    wp_register_script('fingerprint_js', plugins_url('/js/fingerprint.js', __FILE__), null, null);
    wp_enqueue_script('fingerprint_js');
  }



  public function render_payment_ui($wc_order_id) {
    if (version_compare(WOOCOMMERCE_VERSION, '2.0.0', '>=')) {
      $order = new WC_Order($wc_order_id);
    } else {
      $order = new woocommerce_order($wc_order_id);
    }

    $pg_v1_pay_response = $this->init_txn($wc_order_id);
    $ppex_event = new PPEX_Event();
    $amount_in_rupees = sanitize_text_field($order->get_total());
    $amount_in_paisa = sanitize_text_field(PPEX_Utils::convert_to_paisa($amount_in_rupees));
    $ppex_event->set_amount_in_paisa($amount_in_paisa);
    $ppex_event->set_event_type(PPEX_Constants::PAYMENT_RESPONSE_RECEIVED_AT_PLUGIN);
    $ppex_event->set_merchant_id($this->merchant_context->get_merchant_id());
    $ppex_event->set_grouping_key($this->merchant_context->get_merchant_id() . ':' . $pg_v1_pay_response->get_merchant_transaction_id());
    $ppex_event->set_code($pg_v1_pay_response->get_code());
    $ppex_event->set_merchant_transaction_id($pg_v1_pay_response->get_merchant_transaction_id());
    $this->network_manager->post_event($ppex_event, $this->merchant_context, $this->plugin_context);

    // sucess scenario notification
    global $woocommerce;
    $this->msg['message'] = '';
    $this->msg['class'] = '';

    if ($pg_v1_pay_response->get_success() == false) {
      switch($pg_v1_pay_response->get_code()){
        case PPEX_PG_Constants::INTERNAL_SECURITY_BLOCK_1:
          if($pg_v1_pay_response->get_data()['Transacting_URL'] != null && $pg_v1_pay_response->get_data()['Onboarding_URL'] != null){
            $transactingUrlString = $pg_v1_pay_response->get_data()['Transacting_URL'];
            $onboardingUrlData = $pg_v1_pay_response->get_data()['Onboarding_URL'];

            if(is_array($onboardingUrlData)){
              // If it's an array, join the URLs with commas to create a single string
              $onboardingUrlString = implode(', ', $onboardingUrlData);
            }else{
              // If it's a single URL, assign it to the onboardingUrlString
              $onboardingUrlString = $onboardingUrlData;
            }
            $order->add_order_note("PhonePe Payment Solutions:  Payment Request Failed" . " \n error message: " . $pg_v1_pay_response->get_message() . "\n Transacting URL: " . $transactingUrlString . "\n Onboarding URL: " . $onboardingUrlString);
          }
          break;

        case PPEX_PG_Constants::INTERNAL_SECURITY_BLOCK_2:
          if($pg_v1_pay_response->get_data()['Transacting_IP_Address'] != null && $pg_v1_pay_response->get_data()['Onboarding_IP_Address'] != null){
            $transactingIPString = $pg_v1_pay_response->get_data()['Transacting_IP_Address'];
            $onboardingIPData = $pg_v1_pay_response->get_data()['Onboarding_IP_Address'];

            if(is_array($onboardingIPData)){
              $onboardingIPString = implode(', ', $onboardingIPData);
            }else{
              $onboardingIPString = $onboardingIPData;
            }
            $order->add_order_note("PhonePe Payment Solutions: Payment Request Failed " . "\n error message: " . $pg_v1_pay_response->get_message() . "\n Transacting IP Address: " . $transactingIPString . " \n Onboarding IP Address: " . $onboardingIPString);
          }

          break;

        case PPEX_PG_Constants::INTERNAL_SECURITY_BLOCK_4:
          if($pg_v1_pay_response->get_data()['Transacting_Package_Name'] != null && $pg_v1_pay_response->get_data()['Onboarding_Package_Name'] != null){
            $transactingPackageString = $pg_v1_pay_response->get_data()['Transacting_Package_Name'];
            $onboardingPackageData = $pg_v1_pay_response->get_data()['Onboarding_Package_Name'];

            if(is_array($onboardingPackageData)){
              $onboardingPackageString = implode(', ', $onboardingPackageData);
            }else{
              $onboardingPackageString = $onboardingPackageData;
            }
            $order->add_order_note("PhonePe Payment Solutions: Payment Request Failed " . "\n Error Message: " . $pg_v1_pay_response->get_message() . "\n Transacting Package Name: " . $transactingPackageString . " \n Onboarding Package Name: " . $onboardingPackageString);
          }
          break;
        
        default:  $order->add_order_note("PhonePe Payment Solutions: Payment Request Failed " . "\n error message: " . $pg_v1_pay_response->get_message()); 
        break;
      }
      if ($pg_v1_pay_response->get_code() != null) {
        $msg = 'Transaction could not be initiated because of ' . $pg_v1_pay_response->get_code() . '. Please try again.';
      } else {
        $msg = 'Transaction could not be initiated because of Network issue. Please check network connectivity.';
      }

      $this->status_update_for_order(PPEX_Constants::FAILED, $wc_order_id, $pg_v1_pay_response->get_merchant_transaction_id(), $msg);

      // Redirection after phonepe payments response.
      if ('' == $this->redirect_page_id || 0 == $this->redirect_page_id) {
        if ('success' == $this->msg['class']) {
          $redirect_url = $order->get_checkout_order_received_url();
        } else {
          $redirect_url = $order->get_view_order_url();
        }
      } else {
        $redirect_url = get_permalink($this->redirect_page_id);
      }

      $redirect_url = add_query_arg(
        array(
          'phonepe_response' => urlencode($this->msg['message']),
          'type' => $this->msg['class']
        ),
        $redirect_url
      );

      wp_redirect($redirect_url);
      exit;
    } else {
      $redirect_pay_url = $pg_v1_pay_response->get_redirect_url();
      $checkout_url = get_option('woocommerce_checkout_page_id');

      $img_src = 'https://imgstatic.phonepe.com/images/online-merchant-assets/plugins/woocommerce/64/64/loader.gif';
      $callback_url = esc_url_raw($this->get_redirect_url_for_order($pg_v1_pay_response->get_merchant_transaction_id()));

      if (!is_checkout_pay_page()) return;
      ppLogInfo('enqueue script called');

      $environment = $this->plugin_context->get_environment();
      $checkout_url = get_option('woocommerce_checkout_page_id');

      wp_register_script('ppex_callback_script', plugin_dir_url(__FILE__) . '/js/callback.js', array('ppex_pg_script'), null, null);
      wp_localize_script('ppex_callback_script', 'ppex_data', array(
        'img_src' => $img_src,
        'site_url' => esc_url(site_url()),
        'defult_callback_url' => $callback_url,
        'checkout_url' => esc_url(get_the_permalink($checkout_url)) . '/' . $wc_order_id . '/?phonepe_response=Your+payment+is+cancelled.&type=error',
        'payment_method_name' => esc_html(PPEX_PG_Constants::PAYMENT_METHOD_NAME),
        'redirect_pay_url' => esc_url($redirect_pay_url),
        'paypage_loading_mode' => $this->plugin_context->get_paypage_loading_mode()
      ));

      ppLogInfo($environment);

      if ($environment == PPEX_Constants::PRODUCTION) {
        $pg_script_source = PPEX_Constants::PROD_SCRIPT;
      } else if ($environment == PPEX_Constants::STAGE) {
        $pg_script_source = PPEX_Constants::STAGE_SCRIPT;
      } else {
        $pg_script_source = PPEX_Constants::UAT_SCRIPT;
      }

      wp_register_script('ppex_pg_script', $pg_script_source, null, null);
      wp_enqueue_script('ppex_pg_script');
      wp_enqueue_script('ppex_callback_script');

      $amount_in_rupees = sanitize_text_field($order->get_total());
      $amount_in_paisa = sanitize_text_field(PPEX_Utils::convert_to_paisa($amount_in_rupees));
      $ppex_event->set_event_type(PPEX_Constants::PLUGIN_HAS_LAUNCHED_PAY_PAGE);
      $ppex_event->set_amount_in_paisa($amount_in_paisa);
      $this->network_manager->post_event($ppex_event, $this->merchant_context, $this->plugin_context);
    }
  }

  public function handle_callback_response($ppex_pg_callback) {
    $merchant_transaction_id = $ppex_pg_callback->get_merchant_transaction_id();
    $wc_order_id = PPEX_Utils::get_merchant_transaction_id_from_unique_transaction_id($merchant_transaction_id);
    $order = wc_get_order($wc_order_id);
    $amount = sanitize_text_field($order->get_total());
    $amount_in_paisa = sanitize_text_field($amount * 100);
    $amount_returned_in_paisa = $ppex_pg_callback->get_amount_in_paisa();

    $ppex_event = new PPEX_Event();
    $ppex_event->set_event_type(PPEX_Constants::CALLBACK_RECIEVED_AT_PLUGIN);
    $ppex_event->set_merchant_id($this->merchant_context->get_merchant_id());
    $ppex_event->set_merchant_transaction_id($merchant_transaction_id);
    $ppex_event->set_amount_in_paisa($amount_in_paisa);
    $ppex_event->set_grouping_key($ppex_pg_callback->get_merchant_id() . ':' . $ppex_pg_callback->get_merchant_transaction_id());
    $ppex_event->set_code($ppex_pg_callback->get_pay_response_code());
    $this->network_manager->post_event($ppex_event, $this->merchant_context, $this->plugin_context);

    if ($order && $order->get_status() == 'processing') {
      return "Payment is Successful";
    }

    if ($amount_returned_in_paisa < 0) {
      return  "Order amount cannot be negative";
    }
    if ($amount_in_paisa != $amount_returned_in_paisa) {
      $msg = "Amount mismatch!";
      $this->status_update_for_order(PPEX_Constants::FAILED, $wc_order_id, $merchant_transaction_id, $msg);
      return "Amount mismatch!";
    }

    $this->status_update_for_order($ppex_pg_callback->get_pay_response_code(), $wc_order_id, $merchant_transaction_id);
  }


  public function check_phonepe_response($merchant_transaction_id) {
    ppLogInfo('mtid: ' . $merchant_transaction_id);
    $wc_order_id = PPEX_Utils::get_merchant_transaction_id_from_unique_transaction_id($merchant_transaction_id);
    ppLogInfo('wc_order_id: ' . $wc_order_id);

    if (version_compare(WOOCOMMERCE_VERSION, '2.0.0', '>=')) {
      $order = new WC_Order($wc_order_id);
    } else {
      $order = new woocommerce_order($wc_order_id);
    }

    $merchant_id  = $this->merchant_context->get_merchant_id();
    $merchant_transaction_id       = (string)$merchant_transaction_id;
    $salt_key     = $this->merchant_context->get_salt_key();
    $salt_index   = $this->merchant_context->get_salt_index();
    $x_verify     = self::calculate_status_checksum($merchant_id, $merchant_transaction_id, $salt_key, $salt_index);
    $amount_in_rupees = sanitize_text_field($order->get_total());
    $amount_in_paisa = sanitize_text_field(PPEX_Utils::convert_to_paisa($amount_in_rupees));

    $amount_returned = 0;
    $ppex_api_response = $this->network_manager->check_status($x_verify, $merchant_id, $merchant_transaction_id, $amount_in_paisa, $this->merchant_context, $this->plugin_context);
    $code = $ppex_api_response->get_code();
    if ($code != PPEX_Constants::TXN_NOT_FOUND) {
      $amount_returned = $ppex_api_response->get_data()['amount'];
    } else {
      ppLogInfo("Transaction not found for merchant_transaction_id " . $merchant_transaction_id);
      wp_redirect(site_url());
      exit;
    }

    $order->set_payment_method_title(PPEX_PG_Constants::PAYMENT_METHOD_NAME);
    $order->set_payment_method(PPEX_PG_Constants::PAYMENT_METHOD_NAME);  //admin panel


    if ($code == PPEX_Constants::SUCCESS && $amount_in_paisa == $amount_returned) {
      $this->status_update_for_order($code, $wc_order_id, $merchant_transaction_id);
      $redirect_url = $order->get_checkout_order_received_url();
      ppLogInfo('success url: ' . $redirect_url);
    } else {
      if ($amount_in_paisa != $amount_returned) {
        $msg .= "Amount mismatch!";
      } else if (isset($code) && $code == PPEX_Constants::DECLINED) {
        $msg = 'Your payment has failed.';
      } else {
        $msg .= ' Please contact seller if money has been deducted.';
      }
      $this->status_update_for_order(PPEX_Constants::FAILED, $wc_order_id, $merchant_transaction_id, $msg);
      $redirect_url = wc_get_checkout_url();
      ppLogInfo('failure url: ' . $redirect_url);
    }

    $redirect_url = add_query_arg(
      array(
        'phonepe_response' => urlencode($this->msg['message']),
        'type' => $this->msg['class']
      ),
      $redirect_url
    );

    wp_redirect($redirect_url);

    $ppex_event = new PPEX_Event();
    $ppex_event->set_event_type(PPEX_Constants::PLUGIN_HAS_GIVEN_CONTROL_BACK_TO_MERCHANT);
    $ppex_event->set_merchant_id($this->merchant_context->get_merchant_id());
    $ppex_event->set_merchant_transaction_id($merchant_transaction_id);
    $ppex_event->set_amount_in_paisa($amount_in_paisa);
    $ppex_event->set_grouping_key($merchant_id . ':' . $merchant_transaction_id);
    $this->network_manager->post_event($ppex_event, $this->merchant_context, $this->plugin_context);

    exit;
  }

  public function check_pending_status() {
    $merchant_id = $this->merchant_context->get_merchant_id();
    $salt_key = $this->merchant_context->get_salt_key();
    $salt_index = $this->merchant_context->get_salt_index();

    global $wpdb;

    $pending_orders_query = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}posts where post_type = %s and post_status = %s;", 'shop_order', 'wc-pending'));

    foreach ($pending_orders_query as $order) {
      $wc_order_id = $order->ID;
      $order = wc_get_order($order->ID);
      $merchant_transaction_id = $order->get_transaction_id();
      if ($order->get_payment_method() != PPEX_PG_Constants::PAYMENT_METHOD_NAME) {
        continue;
      }
      $x_verify    = self::calculate_status_checksum($merchant_id, $merchant_transaction_id, $salt_key, $salt_index);
      $ppex_api_response  = $this->network_manager->pg_status_check($x_verify, $merchant_id, $merchant_transaction_id, $this->plugin_context->get_environment());

      $code = $ppex_api_response->get_code();

      $this->status_update_for_order($code, $wc_order_id, $merchant_transaction_id);
    }
  }

  public function status_update_for_order($code, $wc_order_id, $merchant_transaction_id, $msg = "") {
    global $woocommerce;

    $order = wc_get_order($wc_order_id);

    if ($order == false) return;

    // order marked completed will not be modified by status check or callback
    if ($order->status == 'completed') {
      return;
    }

    if ($code == PPEX_Constants::SUCCESS) {
      $this->msg['message'] = "Your payment is successful.";
      $this->msg['class'] = 'success';
      $order->payment_complete($merchant_transaction_id);
      $order->add_order_note("PhonePe Payment Solutions: Your payment is successful - merchant transaction id: " . $merchant_transaction_id);
      if ($woocommerce->cart) $woocommerce->cart->empty_cart();
      return;
    } else if ($code == PPEX_Constants::FAILED || $code == PPEX_Constants::ERROR) {
      $this->msg['class'] = 'error';
      $this->msg['message'] = $msg;
      $order->update_status('failed');
      $order->add_order_note("PhonePe Payment Solutions: Payment Transaction Failed" . ' - merchant transaction id: ' . $merchant_transaction_id);
    } else {
      $order->update_status('wc-pending', 'Pending');
    }
  }

  static public function calculate_status_checksum($merchantId, $txnid, $key, $index) {
    $string_to_be_hashed = PPEX_PG_Constants::PG_V1_STATUS_ENDPOINT . $merchantId . "/" . $txnid . $key;
    $hashed_string = PPEX_Utils::generate_hashed_string($string_to_be_hashed, $index);
    return $hashed_string;
  }

  public function defer_js_scripts($tag, $handle, $src) {
    $defer = array(
      'ppex_pg_script',
      'ppex_callback_script'
    );

    if (in_array($handle, $defer)) {
      return '<script src="' . $src . '" defer="defer" type="text/javascript"></script>' . "\n";
    }

    return $tag;
  }
}

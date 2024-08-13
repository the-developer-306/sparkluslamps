<?php

/**
 * PPEX_PG_V1_Pay_Request
 */
if (!class_exists('PPEX_PG_V1_Pay_Request')) {
  class PPEX_PG_V1_Pay_Request {
    private $merchant_id;
    private $merchant_transaction_id;
    private $amount;
    private $merchant_user_id;
    private $redirect_url;
    private $callback_url;
    private $payment_instrument;
    private $merchant_context;
    private $plugin_context;

    function __construct($merchant_transaction_id, $amount, $merchant_user_id, $redirect_url, $callback_url, $payment_instrument, $merchant_context, $plugin_context) {
      $this->merchant_id = $merchant_context->get_merchant_id();
      $this->merchant_transaction_id = $merchant_transaction_id;
      $this->amount = $amount;
      $this->merchant_user_id = $merchant_user_id;
      $this->redirect_url = $redirect_url;
      $this->callback_url = $callback_url;
      $this->payment_instrument = $payment_instrument;
      $this->merchant_context = $merchant_context;
      $this->plugin_context = $plugin_context;
    }

    function to_array() {
      return array(
        "merchantId" => $this->merchant_id,
        "merchantTransactionId" => $this->merchant_transaction_id,
        "amount" => $this->amount,
        "merchantUserId" => $this->merchant_user_id,
        "redirectUrl" => $this->redirect_url,
        "callbackUrl" => $this->callback_url,
        "paymentInstrument" => $this->payment_instrument->to_json()
      );
    }

    public function get_merchant_context() {
      return $this->merchant_context;
    }

    public function get_plugin_context() {
      return $this->plugin_context;
    }

    public function get_amount() {
      return $this->amount;
    }
  }
}

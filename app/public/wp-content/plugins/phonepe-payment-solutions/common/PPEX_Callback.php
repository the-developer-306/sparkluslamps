<?php

/**
 * PPEX_Callback
 */
if(!class_exists('PPEX_Callback')){
class PPEX_Callback {
    private $merchant_id;
    private $merchant_transaction_id;
    private $transaction_id;
    private $amount_in_paisa;
    private $payment_state;
    private $pay_response_code;
    private $payment_instrument_type;
    private $utr;

    function __construct($merchant_id, $merchant_transaction_id, $transaction_id, $amount_in_paisa, $payment_state, $pay_response_code, $payment_instrument_type, $utr) {
        $this->merchant_id = $merchant_id;
        $this->merchant_transaction_id = $merchant_transaction_id;
        $this->transaction_id = $transaction_id;
        $this->amount_in_paisa = $amount_in_paisa;
        $this->payment_state = $payment_state;
        $this->pay_response_code = $pay_response_code;
        $this->payment_instrument_type = $payment_instrument_type;
        $this->utr = $utr;
    }

    public function get_merchant_id() {
        return $this->merchant_id;
    }

    public function get_merchant_transaction_id() {
        return $this->merchant_transaction_id;
    }

    public function get_transaction_id() {
        return $this->transaction_id;
    }

    public function get_amount_in_paisa() {
        return $this->amount_in_paisa;
    }

    public function get_payment_state() {
        return $this->payment_state;
    }

    public function get_pay_response_code() {
        return $this->pay_response_code;
    }

    public function get_payment_instrument_type() {
        return $this->payment_instrument_type;
    }

    public function get_utr() {
        return $this->utr;
    }

    public static function get_instance_from($json_callback_payload){
    return new PPEX_Callback(
      $json_callback_payload['data']['merchantId'],
      $json_callback_payload['data']['merchantTransactionId'],
      $json_callback_payload['data']['transactionId'],
      $json_callback_payload['data']['amount'],
      $json_callback_payload['state'],
      $json_callback_payload['code'],
      $json_callback_payload['data']['paymentInstrument']['type'],
      $json_callback_payload['data']['paymentInstrument']['utr']
        );
    }
}
}
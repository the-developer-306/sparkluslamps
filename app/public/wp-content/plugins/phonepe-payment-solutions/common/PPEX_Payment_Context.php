<?php

/**
 *  PPEX_Payment_Context
 */
if(!class_exists('PPEX_Payment_Context')){
class PPEX_Payment_Context {
    private $order;
    private $response_code;
    private $amount_in_paisa;
    private $amount_returned;
    private $transaction_url;
    private $transaction_id;

    function __construct($order, $response_code, $amount_in_paisa, $amount_returned, $transaction_url, $transaction_id) {
        $this->order = $order;
        $this->response_code = $response_code;
        $this->amount_in_paisa = $amount_in_paisa;
        $this->amount_returned = $amount_returned;
        $this->transaction_url = $transaction_url;
        $this->transaction_id = $transaction_id;
    }


    public function get_order() {
        return $this->order;
    }


    public function get_response_code() {
        return $this->response_code;
    }


    public function get_amount_in_paisa() {
        return $this->amount_in_paisa;
    }


    public function get_amount_returned() {
        return $this->amount_returned;
    }


    public function get_transaction_url() {
        return $this->transaction_url;
    }

    public function get_transaction_id() {
        return $this->transaction_id;
    }
}
}
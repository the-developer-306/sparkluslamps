<?php

/**
 * PPEX_PG_Interface
 */
interface PPEX_PG_Interface {
  public function init_txn($wc_order_id); // calling PhonePe for getting redirect url
  public function render_payment_ui($order_id); // displaying iframe 
  public function handle_callback_response($ppex_pg_callback); // handle callback
}

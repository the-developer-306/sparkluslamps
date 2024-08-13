<?php

/**
 * PPEX_Merchant_Context
 */
if (!class_exists('PPEX_Merchant_Context')) {
	class PPEX_Merchant_Context {
		private $merchant_id;
		private $salt_key;
		private $salt_index;
		private $merchant_domain;

		function __construct($merchant_id, $salt_key, $salt_index) {
			$this->merchant_id = $merchant_id;
			$this->salt_key = $salt_key;
			$this->salt_index = $salt_index;
			$this->merchant_domain = esc_url(site_url());
		}

		function get_merchant_id() {
			return $this->merchant_id;
		}

		function get_salt_key() {
			return $this->salt_key;
		}

		function get_salt_index() {
			return $this->salt_index;
		}

		function get_merchant_domain() {
			return $this->merchant_domain;
		}
	}
}

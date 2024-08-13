<?php

/**
 * PPEX_Api_Request
 */
if (!class_exists('PPEX_Api_Request')) {
	class PPEX_Api_Request {

		private $headers;
		private $url;
		private $payload;

		function __construct($headers, $url, $payload = null) {
			$this->headers = $headers;
			$this->url = $url;
			$this->payload = $payload;
		}


		public function get_headers() {
			return $this->headers;
		}

		public function get_url() {
			return $this->url;
		}

		public function get_payload() {
			return $this->payload;
		}
	}
}

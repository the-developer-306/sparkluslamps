<?php

/**
 * PPEX_Api_Response
 */
if (!class_exists('PPEX_Api_Response')) {
	class PPEX_Api_Response {

		private $http_code;
		private $success;
		private $code;
		private $data;
		private $message;

		function __construct($http_code, $success, $code, $data, $message) {
			$this->http_code = $http_code;
			$this->success = $success;
			$this->code = $code;
			$this->data = $data;
			$this->message = $message;
		}

		public function get_http_code() {
			return $this->http_code;
		}

		public function get_success() {
			return $this->success;
		}

		/**
		 * @return $code
		 */
		public function get_code() {
			return $this->code;
		}

		public function get_data() {
			return $this->data;
		}

		public function get_message() {
			return $this->message;
		}

		public function to_array() {
			return array(
				'http_code' => $this->http_code,
				'success' => $this->get_success(),
				'code' => $this->get_code(),
				'data' => $this->get_data(),
				'message' => $this->get_message(),
			);
		}
	}
}

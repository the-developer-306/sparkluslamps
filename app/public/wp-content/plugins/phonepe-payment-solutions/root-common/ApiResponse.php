<?php

if (!class_exists('PPEC_ApiResponse')) {
	class PPEC_ApiResponse {
		private $http_code;
		private $data;

		public function __construct($http_code, $data = []) {
			$this->http_code = $http_code;
			$this->data = $data;
		}

		/**
		 * @return mixed
		 */
		public function get_http_code() {
			return $this->http_code;
		}

		/**
		 * @return array|mixed
		 */
		public function get_data() {
			return $this->data;
		}
	}
}

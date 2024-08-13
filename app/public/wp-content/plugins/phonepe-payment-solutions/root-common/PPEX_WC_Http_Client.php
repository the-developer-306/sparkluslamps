<?php

/**
 * PPEX_WC_Http_Client
 */
if (!class_exists('PPEX_WC_Http_Client')) {
	class PPEX_WC_Http_Client implements PPEX_Base_Http_Client {

		/**
		 * @param PPEX_Api_Request 
		 * @return PPEX_Api_Response
		 */

		public static function get(PPEX_Api_Request $ppex_api_request) {
			$args = array(
				'headers'     => $ppex_api_request->get_headers(),
			);

			$response = wp_remote_get($ppex_api_request->get_url(), $args);
			$http_code = wp_remote_retrieve_response_code($response);
			$body = json_decode(wp_remote_retrieve_body($response), true);
			if (!isset($body['success'])) {
				$body['success'] = null;
			}

			if (!isset($body['code'])) {
				$body['code'] = null;
			}

			if (!isset($body['data'])) {
				$body['data'] = null;
			}

			if (!isset($body['message'])) {
				$body['message'] = null;
			}
			$ppex_api_response = new PPEX_Api_Response($http_code, $body['success'], $body['code'], $body['data'], $body['message']);

			return $ppex_api_response;
		}

		/**
		 * @param PPEX_Api_Request 
		 * @return PPEX_Api_Response
		 */

		public static function post(PPEX_Api_Request $ppex_api_request) {
			$args = array(
				'headers'     => $ppex_api_request->get_headers(),
				'body'        => $ppex_api_request->get_payload()
			);

			$response = wp_remote_post($ppex_api_request->get_url(), $args);
			$http_code = wp_remote_retrieve_response_code($response);
			$body = json_decode(wp_remote_retrieve_body($response), true);
			if (!isset($body['success'])) {
				$body['success'] = null;
			}

			if (!isset($body['code'])) {
				$body['code'] = null;
			}

			if (!isset($body['data'])) {
				$body['data'] = null;
			}

			if (!isset($body['message'])) {
				$body['message'] = null;
			}
			$ppex_api_response = new PPEX_Api_Response($http_code, $body['success'], $body['code'], $body['data'], $body['message']);

			return $ppex_api_response;
		}
	}
}

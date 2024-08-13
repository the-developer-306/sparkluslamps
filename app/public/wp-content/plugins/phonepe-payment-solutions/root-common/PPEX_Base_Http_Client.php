<?php


/**
 * PPEX_Base_Http_Client
 */
if (!interface_exists('PPEX_Base_Http_Client')) {
	interface PPEX_Base_Http_Client {
		public static function get(PPEX_Api_Request $ppex_api_request);
		public static function post(PPEX_Api_Request $ppex_api_request);
	}
}

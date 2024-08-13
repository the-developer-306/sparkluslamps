<?php

if (!defined('ABSPATH')) exit;


if (!function_exists('getallheaders')) {
	function getallheaders()
	{
		$headers = array();
		foreach ($_SERVER as $name => $value) {
			if (substr($name, 0, 5) == 'HTTP_') {
				$headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
			}
		}
		return $headers;
	}
}

class TrackingMore_API_Authentication
{

	public function __construct()
	{

		add_filter('trackingmore_api_check_authentication', array($this, 'authenticate'), 0);
	}

	public function authenticate($user)
	{

		if ('/' === getTrackingMoreInstance()->api->server->path)
			return new WP_User(0);

		try {
			$user = $this->perform_authentication();

		} catch (Exception $e) {

			$user = new WP_Error('trackingmore_api_authentication_error', $e->getMessage(), array('status' => $e->getCode()));
		}

		return $user;
	}

	private function perform_authentication()
	{

		$headers = getallheaders();
		$headers = json_decode(json_encode($headers), true);

		$key = 'TRACKINGMORE_WP_KEY';
		$key1 = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', $key))));
		$key2 = 'TRACKINGMORE-WP-KEY';
		$qskey = $_GET['key'];

		if (!empty($headers[$key])) {
			$api_key = $headers[$key];
		} else if (!empty($headers[$key1])){
			$api_key = $headers[$key1];
		} else if (!empty($headers[$key2])){
			$api_key = $headers[$key2];
		} else if (!empty($qskey)) {
			$api_key = $qskey;
		} else {
			throw new Exception(__('TrackingMore\'s WordPress Key is missing', 'trackingmore'), 404);
		}

		$user = $this->get_user_by_api_key($api_key);

		return $user;

	}

	private function get_user_by_api_key($api_key)
	{

		$user_query = new WP_User_Query(
			array(
				'meta_key' => 'trackingmore_wp_api_key',
				'meta_value' => $api_key,
			)
		);

		$users = $user_query->get_results();

		if (empty($users[0]))
			throw new Exception(__('TrackingMore\'s WordPress API Key is invalid', 'trackingmore'), 401);

		return $users[0];


	}

}

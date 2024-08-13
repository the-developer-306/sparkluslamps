<?php
if (!defined('ABSPATH')) exit;

class TrackingMore_API
{

	const VERSION = 1;

	public $server;

	public function __construct()
	{

		add_filter('query_vars', array($this, 'add_query_vars'), 0);

		add_action('init', array($this, 'add_endpoint'), 0);

		add_action('parse_request', array($this, 'handle_api_requests'), 0);
	}

	public function add_query_vars($vars)
	{
		$vars[] = 'trackingmore-api';
		$vars[] = 'trackingmore-api-route';
		return $vars;
	}

	public function add_endpoint()
	{

		add_rewrite_rule('^trackingmore-api\/v' . self::VERSION . '/?$', 'index.php?trackingmore-api-route=/', 'top');
		add_rewrite_rule('^trackingmore-api\/v' . self::VERSION . '(.*)?', 'index.php?trackingmore-api-route=$matches[1]', 'top');

		add_rewrite_endpoint('trackingmore-api', EP_ALL);
	}


	public function handle_api_requests()
	{
		global $wp;

		if (!empty($_GET['trackingmore-api']))
			$wp->query_vars['trackingmore-api'] = $_GET['trackingmore-api'];

		if (!empty($_GET['trackingmore-api-route']))
			$wp->query_vars['trackingmore-api-route'] = $_GET['trackingmore-api-route'];

		if (!empty($wp->query_vars['trackingmore-api-route'])) {

			define('TRACKINGMORE_API_REQUEST', true);

			$this->includes();

			$this->server = new TrackingMore_API_Server($wp->query_vars['trackingmore-api-route']);

			$this->register_resources($this->server);

			$this->server->serve_request();

			exit;
		}

		if (!empty($wp->query_vars['trackingmore-api'])) {

			ob_start();

			$api = strtolower(esc_attr($wp->query_vars['trackingmore-api']));

			if (class_exists($api))
				$api_class = new $api();

			do_action('woocommerce_api_' . $api);

			ob_end_clean();
			die('1');
		}
	}


	private function includes()
	{

		include_once('api/class-trackingmore-api-server.php');
		include_once('api/interface-trackingmore-api-handler.php');
		include_once('api/class-trackingmore-api-json-handler.php');

		include_once('api/class-trackingmore-api-authentication.php');
		$this->authentication = new TrackingMore_API_Authentication();

		include_once('api/class-trackingmore-api-resource.php');

		include_once('api/class-trackingmore-api-orders.php');
	}

	public function register_resources($server)
	{

		$api_classes = apply_filters('trackingmore_api_classes',
			array(
				'TrackingMore_API_Orders',
			)
		);

		foreach ($api_classes as $api_class) {
			$this->$api_class = new $api_class($server);
		}
	}

}

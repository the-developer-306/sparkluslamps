<?php
if (!defined('ABSPATH')) exit;

require_once ABSPATH . 'wp-admin/includes/admin.php';

class TrackingMore_API_Server
{

	const METHOD_GET = 1;
	const METHOD_POST = 2;
	const METHOD_PUT = 4;
	const METHOD_PATCH = 8;
	const METHOD_DELETE = 16;

	const READABLE = 1;
	const CREATABLE = 2;
	const EDITABLE = 14;
	const DELETABLE = 16;
	const ALLMETHODS = 31;

	const ACCEPT_RAW_DATA = 64;

	const ACCEPT_DATA = 128;

	const HIDDEN_ENDPOINT = 256;

	public static $method_map = array(
		'HEAD' => self::METHOD_GET,
		'GET' => self::METHOD_GET,
		'POST' => self::METHOD_POST,
		'PUT' => self::METHOD_PUT,
		'PATCH' => self::METHOD_PATCH,
		'DELETE' => self::METHOD_DELETE,
	);

	public $path = '';

	public $method = 'HEAD';

	public $params = array('GET' => array(), 'POST' => array());

	public $headers = array();

	public $files = array();

	public $handler;


	public function __construct($path)
	{

		if (empty($path)) {
			if (isset($_SERVER['PATH_INFO']))
				$path = $_SERVER['PATH_INFO'];
			else
				$path = '/';
		}

		$this->path = $path;
		$this->method = $_SERVER['REQUEST_METHOD'];
		$this->params['GET'] = $_GET;
		$this->params['POST'] = $_POST;
		$this->headers = $this->get_headers($_SERVER);
		$this->files = $_FILES;

		if (isset($_GET['_method'])) {
			$this->method = strtoupper($_GET['_method']);
		}

		if ($this->is_json_request())
			$handler_class = 'TrackingMore_API_JSON_Handler';

		elseif ($this->is_xml_request())
			$handler_class = 'WC_API_XML_Handler';

		else
			$handler_class = apply_filters('trackingmore_api_default_response_handler', 'TrackingMore_API_JSON_Handler', $this->path, $this);

		$this->handler = new $handler_class();
	}

	public function check_authentication()
	{

		$user = apply_filters('trackingmore_api_check_authentication', null, $this);

		if (is_a($user, 'WP_User'))
			wp_set_current_user($user->ID);

		elseif (!is_wp_error($user))
			$user = new WP_Error('trackingmore_api_authentication_error', __('Invalid authentication method', 'trackingmore'), array('code' => 500));

		return $user;
	}

	protected function error_to_array($error)
	{
		$errors = array();
		foreach ((array)$error->errors as $code => $messages) {
			foreach ((array)$messages as $message) {
				$errors[] = array('code' => $code, 'message' => $message);
			}
		}
		return array('errors' => $errors);
	}

	public function serve_request()
	{

		do_action('trackingmore_api_server_before_serve', $this);

		$this->header('Content-Type', $this->handler->get_content_type(), true);

		if (!apply_filters('trackingmore_api_enabled', true, $this) || ('no' === get_option('trackingmore_api_enabled'))) {

			$this->send_status(404);

			echo $this->handler->generate_response(array('errors' => array('code' => 'trackingmore_api_disabled', 'message' => 'The WooCommerce API is disabled on this site')));

			return;
		}

		$result = $this->check_authentication();

		if (!is_wp_error($result)) {
			$result = $this->dispatch();
		}

		if (is_wp_error($result)) {
			$data = $result->get_error_data();
			if (is_array($data) && isset($data['status'])) {
				$this->send_status($data['status']);
			}

			$result = $this->error_to_array($result);
		}

		$served = apply_filters('trackingmore_api_serve_request', false, $result, $this);

		if (!$served) {

			if ('HEAD' === $this->method)
				return;

			echo $this->handler->generate_response($result);
		}
	}

	public function get_routes()
	{

		$endpoints = array(

			'/' => array(array($this, 'get_index'), self::READABLE),
		);

		$endpoints = apply_filters('trackingmore_api_endpoints', $endpoints);

		foreach ($endpoints as $route => &$handlers) {
			if (count($handlers) <= 2 && isset($handlers[1]) && !is_array($handlers[1])) {
				$handlers = array($handlers);
			}
		}

		return $endpoints;
	}

	public function dispatch()
	{

		switch ($this->method) {

			case 'HEAD':
			case 'GET':
				$method = self::METHOD_GET;
				break;
			default:
				return new WP_Error('trackingmore_api_unsupported_method', __('Unsupported request method', 'trackingmore'), array('status' => 400));
		}

		foreach ($this->get_routes() as $route => $handlers) {
			foreach ($handlers as $handler) {
				$callback = $handler[0];
				$supported = isset($handler[1]) ? $handler[1] : self::METHOD_GET;

				if (!($supported & $method))
					continue;

				$match = preg_match('@^' . $route . '$@i', urldecode($this->path), $args);

				if (!$match)
					continue;

				if (!is_callable($callback))
					return new WP_Error('trackingmore_api_invalid_handler', __('The handler for the route is invalid', 'trackingmore'), array('status' => 500));

				$args = array_merge($args, $this->params['GET']);
				if ($method & self::METHOD_POST) {
					$args = array_merge($args, $this->params['POST']);
				}
				if ($supported & self::ACCEPT_DATA) {
					$data = $this->handler->parse_body($this->get_raw_data());
					$args = array_merge($args, array('data' => $data));
				} elseif ($supported & self::ACCEPT_RAW_DATA) {
					$data = $this->get_raw_data();
					$args = array_merge($args, array('data' => $data));
				}

				$args['_method'] = $method;
				$args['_route'] = $route;
				$args['_path'] = $this->path;
				$args['_headers'] = $this->headers;
				$args['_files'] = $this->files;

				$args = apply_filters('trackingmore_api_dispatch_args', $args, $callback);

				if (is_wp_error($args)) {
					return $args;
				}

				$params = $this->sort_callback_params($callback, $args);
				if (is_wp_error($params))
					return $params;

				return call_user_func_array($callback, $params);
			}
		}

		return new WP_Error('trackingmore_api_no_route', __('No route was found matching the URL and request method', 'trackingmore'), array('status' => 404));
	}

	protected function sort_callback_params($callback, $provided)
	{
		if (is_array($callback))
			$ref_func = new ReflectionMethod($callback[0], $callback[1]);
		else
			$ref_func = new ReflectionFunction($callback);

		$wanted = $ref_func->getParameters();
		$ordered_parameters = array();

		foreach ($wanted as $param) {
			if (isset($provided[$param->getName()])) {

				$ordered_parameters[] = is_array($provided[$param->getName()]) ? array_map('urldecode', $provided[$param->getName()]) : urldecode($provided[$param->getName()]);
			} elseif ($param->isDefaultValueAvailable()) {
				$ordered_parameters[] = $param->getDefaultValue();
			} else {
				return new WP_Error('trackingmore_api_missing_callback_param', sprintf(__('Missing parameter %s', 'trackingmore'), $param->getName()), array('status' => 400));
			}
		}
		return $ordered_parameters;
	}

	public function get_index()
	{

		$available = array('store' => array(
			'name' => get_option('blogname'),
			'description' => get_option('blogdescription'),
			'URL' => get_option('siteurl'),
			'wc_version' => WC()->version,
			'routes' => array(),
			'meta' => array(
				'timezone' => wc_timezone_string(),
				'currency' => get_trackingmore_currency(),
				'currency_format' => get_trackingmore_currency_symbol(),
				'tax_included' => ('yes' === get_option('trackingmore_prices_include_tax')),
				'weight_unit' => get_option('trackingmore_weight_unit'),
				'dimension_unit' => get_option('trackingmore_dimension_unit'),
				'ssl_enabled' => ('yes' === get_option('trackingmore_force_ssl_checkout')),
				'permalinks_enabled' => ('' !== get_option('permalink_structure')),
				'links' => array(
					'help' => 'https://trackingmore.uservoice.com/knowledgebase',
				),
			),
		));

		foreach ($this->get_routes() as $route => $callbacks) {
			$data = array();

			$route = preg_replace('#\(\?P(<\w+?>).*?\)#', '$1', $route);
			$methods = array();
			foreach (self::$method_map as $name => $bitmask) {
				foreach ($callbacks as $callback) {
					if ($callback[1] & self::HIDDEN_ENDPOINT)
						continue 3;

					if ($callback[1] & $bitmask)
						$data['supports'][] = $name;

					if ($callback[1] & self::ACCEPT_DATA)
						$data['accepts_data'] = true;

					if (strpos($route, '<') === false) {
						$data['meta'] = array(
							'self' => get_trackingmore_api_url($route),
						);
					}
				}
			}
			$available['store']['routes'][$route] = apply_filters('trackingmore_api_endpoints_description', $data);
		}
		return apply_filters('trackingmore_api_index', $available);
	}

	public function send_status($code)
	{
		status_header($code);
	}

	public function header($key, $value, $replace = true)
	{
		header(sprintf('%s: %s', $key, $value), $replace);
	}

	public function link_header($rel, $link, $other = array())
	{

		$header = sprintf('<%s>; rel="%s"', $link, esc_attr($rel));

		foreach ($other as $key => $value) {

			if ('title' == $key) {

				$value = '"' . $value . '"';
			}

			$header .= '; ' . $key . '=' . $value;
		}

		$this->header('Link', $header, false);
	}

	public function add_pagination_headers($query)
	{

		if (is_a($query, 'WP_User_Query')) {

			$page = $query->page;
			$single = count($query->get_results()) > 1;
			$total = $query->get_total();
			$total_pages = $query->total_pages;

		} else {

			$page = $query->get('paged');
			$single = $query->is_single();
			$total = $query->found_posts;
			$total_pages = $query->max_num_pages;
		}

		if (!$page)
			$page = 1;

		$next_page = absint($page) + 1;

		if (!$single) {

			if ($page > 1) {
				$this->link_header('first', $this->get_paginated_url(1));
				$this->link_header('prev', $this->get_paginated_url($page - 1));
			}

			if ($next_page <= $total_pages) {
				$this->link_header('next', $this->get_paginated_url($next_page));
			}

			if ($page != $total_pages)
				$this->link_header('last', $this->get_paginated_url($total_pages));
		}

		$this->header('X-WC-Total', $total);
		$this->header('X-WC-TotalPages', $total_pages);

		do_action('trackingmore_api_pagination_headers', $this, $query);
	}

	private function get_paginated_url($page)
	{

		$request = remove_query_arg('page');

		$request = urldecode(add_query_arg('page', $page, $request));

		$host = parse_url(get_home_url(), PHP_URL_HOST);

		return set_url_scheme("http://{$host}{$request}");
	}

	public function get_raw_data()
	{
		return file_get_contents('php://input');
	}

	public function parse_datetime($datetime)
	{

		if (strpos($datetime, '.') !== false) {
			$datetime = preg_replace('/\.\d+/', '', $datetime);
		}

		$datetime = preg_replace('/[+-]\d+:+\d+$/', '+00:00', $datetime);

		try {

			$datetime = new DateTime($datetime, new DateTimeZone('UTC'));

		} catch (Exception $e) {

			$datetime = new DateTime('@0');

		}

		return $datetime->format('Y-m-d H:i:s');
	}

	public function format_datetime($timestamp, $convert_to_utc = false)
	{

		if ($convert_to_utc) {
			$timezone = new DateTimeZone(wc_timezone_string());
		} else {
			$timezone = new DateTimeZone('UTC');
		}

		try {

			if (is_numeric($timestamp)) {
				$date = new DateTime("@{$timestamp}");
			} else {
				$date = new DateTime($timestamp, $timezone);
			}

			if ($convert_to_utc) {
				$date->modify(-1 * $date->getOffset() . ' seconds');
			}

		} catch (Exception $e) {

			$date = new DateTime('@0');
		}

		return $date->format('Y-m-d\TH:i:s\Z');
	}

	public function get_headers($server)
	{
		$headers = array();
		$additional = array('CONTENT_LENGTH' => true, 'CONTENT_MD5' => true, 'CONTENT_TYPE' => true);

		foreach ($server as $key => $value) {
			if (strpos($key, 'HTTP_') === 0) {
				$headers[substr($key, 5)] = $value;
			} elseif (isset($additional[$key])) {
				$headers[$key] = $value;
			}
		}

		return $headers;
	}

	private function is_json_request()
	{

		if (false !== stripos($this->path, '.json'))
			return true;

		if (isset($this->headers['ACCEPT']) && 'application/json' == $this->headers['ACCEPT'])
			return true;

		return false;
	}

	private function is_xml_request()
	{

		if (false !== stripos($this->path, '.xml'))
			return true;

		if (isset($this->headers['ACCEPT']) && ('application/xml' == $this->headers['ACCEPT'] || 'text/xml' == $this->headers['ACCEPT']))
			return true;

		return false;
	}
}

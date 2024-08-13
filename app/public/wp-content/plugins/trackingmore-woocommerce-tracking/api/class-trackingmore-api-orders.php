<?php
if (!defined('ABSPATH')) exit;

class TrackingMore_API_Orders extends TrackingMore_API_Resource
{

	protected $base = '/orders';

	public function register_routes($routes)
	{

		$routes[$this->base] = array(
			array(array($this, 'get_orders'), TrackingMore_API_Server::READABLE),
		);

		$routes[$this->base . '/count'] = array(
			array(array($this, 'get_orders_count'), TrackingMore_API_Server::READABLE),
		);

		$routes[$this->base . '/(?P<id>\d+)'] = array(
			array(array($this, 'get_order'), TrackingMore_API_Server::READABLE),
			array(array($this, 'edit_order'), TrackingMore_API_Server::EDITABLE | TrackingMore_API_Server::ACCEPT_DATA),
		);

		$routes[$this->base . '/(?P<id>\d+)/notes'] = array(
			array(array($this, 'get_order_notes'), TrackingMore_API_Server::READABLE),
		);

		$routes[$this->base . '/ping'] = array(
			array(array($this, 'ping'), TrackingMore_API_Server::READABLE),
		);

		return $routes;
	}

	public function get_orders($fields = null, $filter = array(), $status = null, $page = 1)
	{

		if (!empty($status))
			$filter['status'] = $status;

		$filter['page'] = $page;

		$query = $this->query_orders($filter);

		$orders = array();

		foreach ($query->posts as $order_id) {

			if (!$this->is_readable($order_id))
				continue;

			$orders[] = current($this->get_order($order_id, $fields));
		}

		$this->server->add_pagination_headers($query);

		return array('orders' => $orders);
	}


	public function get_order($id, $fields = null)
	{

		$id = $this->validate_request($id, 'shop_order', 'read');

		if (is_wp_error($id))
			return $id;

		$order = new WC_Order($id);

		$order_post = get_post($id);

		$order_data = array(
			'id' => $order->get_id(),
			'order_number' => $order->get_order_number(),
			'created_at' => $this->server->format_datetime($order_post->post_date_gmt),
			'updated_at' => $this->server->format_datetime($order_post->post_modified_gmt),
            'billing_address' => $order->get_address('billing'),
            'shipping_address' => $order->get_address('shipping'),
            'note' => $order->get_customer_note(),
			'line_items' => array(),
		);

		foreach ($order->get_items() as $item_id => $item) {


			$order_data['line_items'][] = array(
				'id' => $item_id,
				'quantity' => (int)$item['qty'],
				'name' => $item['name'],
			);
		}


		$options = get_option('trackingmore_option_name');
		$plugin = $options['plugin'];
		if ($plugin == 'trackingmore') {


			$order_data['trackingmore']['woocommerce']['trackings'][] = array(
				'tracking_provider' => get_post_meta($order->get_id(), '_trackingmore_tracking_provider', true),
				'tracking_number' => get_post_meta($order->get_id(), '_trackingmore_tracking_number', true),
				'tracking_ship_date' => get_post_meta($order->get_id(), '_trackingmore_tracking_shipdate', true),
				'tracking_postal_code' => get_post_meta($order->get_id(), '_trackingmore_tracking_postal', true),
				'tracking_account_number' => get_post_meta($order->get_id(), '_trackingmore_tracking_account', true),
                'tracking_key' => get_post_meta($order->get_id(), '_trackingmore_tracking_key', true),
                'tracking_destination_country' => get_post_meta($order->get_id(), '_trackingmore_tracking_destination_country', true),
                'tracking_origin_country' => get_post_meta($order->get_id(), '_trackingmore_tracking_origin_country', true),
			);
		}
		if (empty($tn)) {
			$tn = get_post_meta($order->get_id(), '_tracking_number', true);
			if ($tn == NULL) {
				if (is_array(get_post_meta($order->get_id(), '_wc_shipment_tracking_items', true))) {
					$trackingmore_get_post_meta_number = get_post_meta($order->get_id(), '_wc_shipment_tracking_items', true)[0]['tracking_number'];
				}else{
					$trackingmore_get_post_meta_number = '';
				}
				if (is_array(get_post_meta($order->get_id(), '_wc_shipment_tracking_items', true))) {
					$trackingmore_get_post_meta_provider = get_post_meta($order->get_id(), '_wc_shipment_tracking_items', true)[0]['custom_tracking_provider'];
				}else{
					$trackingmore_get_post_meta_provider = '';
				}
				$order_data['trackingmore']['woocommerce']['trackings'][] = array(
					'tracking_number' => $trackingmore_get_post_meta_number,
					'tracking_provider' => $trackingmore_get_post_meta_provider,
				);
			} else {
				$order_data['trackingmore']['woocommerce']['trackings'][] = array(
					'tracking_number' => $tn,
				);
			}
		}
		return array('order' => apply_filters('trackingmore_api_order_response', $order_data, $order, $fields, $this->server));
	}

	public function get_orders_count($status = null, $filter = array())
	{

		if (!empty($status))
			$filter['status'] = $status;

		$query = $this->query_orders($filter);

		if (!current_user_can('read_private_shop_orders'))
			return new WP_Error('trackingmore_api_user_cannot_read_orders_count', __('You do not have permission to read the orders count', 'trackingmore'), array('status' => 401));

		return array('count' => (int)$query->found_posts);
	}

	public function edit_order($id, $data)
	{

		$id = $this->validate_request($id, 'shop_order', 'edit');

		if (is_wp_error($id))
			return $id;

		$order = new WC_Order($id);

		if (!empty($data['status'])) {

			$order->update_status($data['status'], isset($data['note']) ? $data['note'] : '');
		}

		return $this->get_order($id);
	}

	public function delete_order($id, $force = false)
	{

		$id = $this->validate_request($id, 'shop_order', 'delete');

		return $this->delete($id, 'order', ('true' === $force));
	}

	public function get_order_notes($id, $fields = null)
	{
		$id = $this->validate_request($id, 'shop_order', 'read');

		if (is_wp_error($id))
			return $id;

		$args = array(
			'post_id' => $id,
			'approve' => 'approve',
			'type' => 'order_note'
		);

		remove_filter('comments_clauses', array('WC_Comments', 'exclude_order_comments'), 10, 1);

		$notes = get_comments($args);

		add_filter('comments_clauses', array('WC_Comments', 'exclude_order_comments'), 10, 1);

		$order_notes = array();

		foreach ($notes as $note) {

			$order_notes[] = array(
				'id' => $note->comment_ID,
				'created_at' => $this->server->format_datetime($note->comment_date_gmt),
				'note' => $note->comment_content,
				'customer_note' => get_comment_meta($note->comment_ID, 'is_customer_note', true) ? true : false,
			);
		}

		return array('order_notes' => apply_filters('trackingmore_api_order_notes_response', $order_notes, $id, $fields, $notes, $this->server));
	}

	private function query_orders($args)
	{

		function trackingmore_wpbo_get_woo_version_number()
		{
			if (!function_exists('get_plugins'))
				require_once(ABSPATH . 'wp-admin/includes/plugin.php');

			$plugin_folder = get_plugins('/' . 'woocommerce');
			$plugin_file = 'woocommerce.php';

			if (isset($plugin_folder[$plugin_file]['Version'])) {
				return $plugin_folder[$plugin_file]['Version'];

			} else {
				return NULL;
			}
		}

		$woo_version = trackingmore_wpbo_get_woo_version_number();

		if ($woo_version >= 2.2) {
			$query_args = array(
				'fields' => 'ids',
				'post_type' => 'shop_order',
				'post_status' => array_keys(wc_get_order_statuses())
			);
		} else {
			$query_args = array(
				'fields' => 'ids',
				'post_type' => 'shop_order',
				'post_status' => 'publish',
			);
		}

		// if (!empty($args['status'])) {

		// 	$statuses = explode(',', $args['status']);

		// 	$query_args['tax_query'] = array(
		// 		array(
		// 			'taxonomy' => 'shop_order_status',
		// 			'field' => 'slug',
		// 			'terms' => $statuses,
		// 		),
		// 	);

		// 	unset($args['status']);
		// }

		$query_args = $this->merge_query_args($query_args, $args);

        return new WP_Query($query_args);
	}

	private function get_order_subtotal($order)
	{

		$subtotal = 0;
		foreach ($order->get_items() as $item) {

			$subtotal += (isset($item['line_subtotal'])) ? $item['line_subtotal'] : 0;
		}

		return $subtotal;
	}

	public function ping()
	{
		return "pong";
	}

}

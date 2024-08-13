<?php
if (!defined('ABSPATH')) exit;
class TrackingMore_API_Resource
{

	protected $server;

	protected $base;

	public function __construct(TrackingMore_API_Server $server)
	{

		$this->server = $server;

		add_filter('trackingmore_api_endpoints', array($this, 'register_routes'));

		foreach (array('order', 'coupon', 'customer', 'product', 'report') as $resource) {

			add_filter("trackingmore_api_{$resource}_response", array($this, 'maybe_add_meta'), 15, 2);
			add_filter("trackingmore_api_{$resource}_response", array($this, 'filter_response_fields'), 20, 3);
		}
	}

	protected function validate_request($id, $type, $context)
	{

		if ('shop_order' === $type || 'shop_coupon' === $type)
			$resource_name = str_replace('shop_', '', $type);
		else
			$resource_name = $type;

		$id = absint($id);

		if (empty($id))
			return new WP_Error("trackingmore_api_invalid_{$resource_name}_id", sprintf(__('Invalid %s ID', 'trackingmore'), $type), array('status' => 404));

		if ('customer' !== $type) {

			$post = get_post($id);

			$post_type = ('product_variation' === $post->post_type) ? 'product' : $post->post_type;

			if ($type !== $post_type)
				return new WP_Error("trackingmore_api_invalid_{$resource_name}", sprintf(__('Invalid %s', 'trackingmore'), $resource_name), array('status' => 404));

			switch ($context) {

				case 'read':
					if (!$this->is_readable($post))
						return new WP_Error("trackingmore_api_user_cannot_read_{$resource_name}", sprintf(__('You do not have permission to read this %s', 'trackingmore'), $resource_name), array('status' => 401));
					break;

				case 'edit':
					if (!$this->is_editable($post))
						return new WP_Error("trackingmore_api_user_cannot_edit_{$resource_name}", sprintf(__('You do not have permission to edit this %s', 'trackingmore'), $resource_name), array('status' => 401));
					break;

				case 'delete':
					if (!$this->is_deletable($post))
						return new WP_Error("trackingmore_api_user_cannot_delete_{$resource_name}", sprintf(__('You do not have permission to delete this %s', 'trackingmore'), $resource_name), array('status' => 401));
					break;
			}
		}

		return $id;
	}

	protected function merge_query_args($base_args, $request_args)
	{

		$args = array();

		if (!empty($request_args['created_at_min']) || !empty($request_args['created_at_max']) || !empty($request_args['updated_at_min']) || !empty($request_args['updated_at_max'])) {

			$args['date_query'] = array();

			if (!empty($request_args['created_at_min']))
				$args['date_query'][] = array('column' => 'post_date_gmt', 'after' => $this->server->parse_datetime($request_args['created_at_min']), 'inclusive' => true);

			if (!empty($request_args['created_at_max']))
				$args['date_query'][] = array('column' => 'post_date_gmt', 'before' => $this->server->parse_datetime($request_args['created_at_max']), 'inclusive' => true);

			if (!empty($request_args['updated_at_min']))
				$args['date_query'][] = array('column' => 'post_modified_gmt', 'after' => $this->server->parse_datetime($request_args['updated_at_min']), 'inclusive' => true);

			if (!empty($request_args['updated_at_max']))
				$args['date_query'][] = array('column' => 'post_modified_gmt', 'before' => $this->server->parse_datetime($request_args['updated_at_max']), 'inclusive' => true);
		}

		if (!empty($request_args['q']))
			$args['s'] = $request_args['q'];

		if (!empty($request_args['limit']))
			$args['posts_per_page'] = $request_args['limit'];

		if (!empty($request_args['offset']))
			$args['offset'] = $request_args['offset'];

		$args['paged'] = (isset($request_args['page'])) ? absint($request_args['page']) : 1;

		isset($request_args['status']) ? $base_args['post_status'] = array($request_args['status']) : '';

        if (!empty($request_args['orderby']))
            $args['orderby'] = $request_args['orderby'];
        if (!empty($request_args['order']))
            $args['order'] = $request_args['order'];

        return array_merge($base_args, $args);
	}

	public function maybe_add_meta($data, $resource)
	{

		if (isset($this->server->params['GET']['filter']['meta']) && 'true' === $this->server->params['GET']['filter']['meta'] && is_object($resource)) {

			if (preg_grep('/[a-z]+_meta/', array_keys($data)))
				return $data;

			switch (get_class($resource)) {

				case 'WC_Order':
					$meta_name = 'order_meta';
					break;

				case 'WC_Coupon':
					$meta_name = 'coupon_meta';
					break;

				case 'WP_User':
					$meta_name = 'customer_meta';
					break;

				default:
					$meta_name = 'product_meta';
					break;
			}

			if (is_a($resource, 'WP_User')) {

				$meta = (array)get_user_meta($resource->ID);

			} elseif (is_a($resource, 'WC_Product_Variation')) {

				$meta = (array)get_post_meta($resource->get_variation_id());

			} else {

				$meta = (array)get_post_meta($resource->id);
			}

			foreach ($meta as $meta_key => $meta_value) {

				if (!is_protected_meta($meta_key)) {
					$data[$meta_name][$meta_key] = maybe_unserialize($meta_value[0]);
				}
			}

		}

		return $data;
	}

	public function filter_response_fields($data, $resource, $fields)
	{

		if (!is_array($data) || empty($fields))
			return $data;

		$fields = explode(',', $fields);
		$sub_fields = array();

		foreach ($fields as $field) {

			if (false !== strpos($field, '.')) {

				list($name, $value) = explode('.', $field);

				$sub_fields[$name] = $value;
			}
		}

		foreach ($data as $data_field => $data_value) {

			if (is_array($data_value) && in_array($data_field, array_keys($sub_fields))) {

				foreach ($data_value as $sub_field => $sub_field_value) {

					if (!in_array($sub_field, $sub_fields)) {
						unset($data[$data_field][$sub_field]);
					}
				}

			} else {

				if (!in_array($data_field, $fields)) {
					unset($data[$data_field]);
				}
			}
		}

		return $data;
	}

	protected function delete($id, $type, $force = false)
	{

		if ('shop_order' === $type || 'shop_coupon' === $type)
			$resource_name = str_replace('shop_', '', $type);
		else
			$resource_name = $type;

		if ('customer' === $type) {

			$result = wp_delete_user($id);

			if ($result)
				return array('message' => __('Permanently deleted customer', 'trackingmore'));
			else
				return new WP_Error('trackingmore_api_cannot_delete_customer', __('The customer cannot be deleted', 'trackingmore'), array('status' => 500));

		} else {


			$result = ($force) ? wp_delete_post($id, true) : wp_trash_post($id);

			if (!$result)
				return new WP_Error("trackingmore_api_cannot_delete_{$resource_name}", sprintf(__('This %s cannot be deleted', 'trackingmore'), $resource_name), array('status' => 500));

			if ($force) {
				return array('message' => sprintf(__('Permanently deleted %s', 'trackingmore'), $resource_name));

			} else {

				$this->server->send_status('202');

				return array('message' => sprintf(__('Deleted %s', 'trackingmore'), $resource_name));
			}
		}
	}


	protected function is_readable($post)
	{

		return $this->check_permission($post, 'read');
	}

	protected function is_editable($post)
	{

		return $this->check_permission($post, 'edit');

	}

	protected function is_deletable($post)
	{

		return $this->check_permission($post, 'delete');
	}

	private function check_permission($post, $context)
	{

		if (!is_a($post, 'WP_Post'))
			$post = get_post($post);

		if (is_null($post))
			return false;

		$post_type = get_post_type_object($post->post_type);

		if ('read' === $context)
			return current_user_can($post_type->cap->read_private_posts, $post->ID);

		elseif ('edit' === $context)
			return current_user_can($post_type->cap->edit_post, $post->ID);

		elseif ('delete' === $context)
			return current_user_can($post_type->cap->delete_post, $post->ID);

		else
			return false;
	}

}

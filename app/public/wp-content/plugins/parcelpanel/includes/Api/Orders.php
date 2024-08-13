<?php

namespace ParcelPanel\Api;

use DateTime;
use DateTimeZone;
use ParcelPanel\Action\TrackingNumber;
use ParcelPanel\Action\UserTrackPage;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

class Orders
{
    use Singleton;

    /**
     * 获取所有订单
     */
    function get_orders(\WP_REST_Request $request)
    {
        $day  = absint($request['day'] ?? 0);
        $page = max(absint($request['page'] ?? 1), 1);
        $all  = '1' == ($request['all'] ?? '0');
        $limit  = absint($request['limit'] ?? 0);

        // if ($day < 1 || 90 < $day) {
        if ($day < 1) {
            $day = 30;
        }
        if ($limit < 1 || 5000 < $limit) {
            $limit = 200;
        }

        $check_create_time = time() - $day * 86400;

        $sync_status        = false;
        $tracking_order_ids = [];
        if (!$all) {
            $sync_status        = 0;
            $tracking_order_ids = $this->get_not_synced_tracking_ids($page, $limit);
        }

        // 查询id集合
        $query_args = (new ParcelPanelFunction)->parcelpanel_get_shop_order_query_args([], $day, $sync_status, $limit);

        $query_args['paged'] = $page;

        $wp_query = new \WP_Query($query_args);

        $order_ids = array_unique(array_merge($tracking_order_ids, $wp_query->posts), SORT_NUMERIC);

        // wc orders list
        $order_ids_wc = [];
        $wc_query = wc_get_orders($query_args);
        foreach ($wc_query as $v) {
            $order_ids_wc[] = $v->get_id();
        }
        $order_ids = array_unique(array_merge($order_ids, $order_ids_wc), SORT_NUMERIC);

        $orders = [];

        $current_post_num = 0;

        $order_tracking_data = $this->get_tracking_data_by_order_id($order_ids);


        foreach ($order_ids as $order_id) {
            $data = $this->get_order($order_id);

            if (empty($data)) {
                continue;
            }

            $data['tracking'] = $order_tracking_data[$order_id];

            $orders[] = $data;

            ++$current_post_num;
            if ($current_post_num >= $limit) {
                break;
            }
        }

        $courier_code_list = (array)get_option(\ParcelPanel\OptionName\SELECTED_COURIER, []);

        return [
            'orders'            => $orders,
            'courier_code_list' => $courier_code_list,
            'order_count'       => $wp_query->post_count,
            'tracking_count'    => count($tracking_order_ids),
        ];
    }

    public function get_not_synced_tracking_ids($page = 1, $limit = 200): array
    {
        global $wpdb;

        $TABLE_TRACKING       = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        $offset = ($page - 1) * $limit;

        // @codingStandardsIgnoreStart
        $res = array_map('intval', $wpdb->get_col(
            $wpdb->prepare(
                "SELECT
                DISTINCT ppti.order_id
                FROM {$TABLE_TRACKING_ITEMS} as ppti
                join {$TABLE_TRACKING} as ppt on ppt.id = ppti.tracking_id
                where tracking_id>0 and ppt.sync_times<>-1 and ppt.tracking_number<>''
                ORDER BY ppti.order_id
                LIMIT %d OFFSET %d",
                $limit,
                $offset
            )
        ));
        // @codingStandardsIgnoreEnd

        return $res;
    }

    /**
     * Get the order for the given ID
     *
     * @param int  $id the order ID
     *
     * @return array
     * @since 2.1
     */
    public function get_order($id): array
    {
        $order = wc_get_order($id);
        if (empty($order)) {
            return [];
        }

        return self::get_formatted_item_data($order);
    }

    /**
     * @param int|int[] $order_id
     *
     * @return array
     */
    public static function get_tracking_data_by_order_id($order_id)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        $order_ids = (array)$order_id;
        if (empty($order_ids)) {
            return [];
        }

        $order_tracking_data = array_fill_keys($order_ids, []);

        // @codingStandardsIgnoreStart
        $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($order_ids, '%d');
        $tracking_list = (array)$wpdb->get_results(
            $wpdb->prepare(
                "SELECT
                ppti.order_id,ppti.order_item_id,ppti.quantity,ppti.tracking_id,tracking_number,courier_code,sync_times,fulfilled_at
                FROM {$TABLE_TRACKING} AS ppt
                INNER JOIN {$TABLE_TRACKING_ITEMS} AS ppti ON ppt.id=ppti.tracking_id
                WHERE ppti.order_id IN ({$placeholder_str})",
                $order_ids
            )
        );
        // @codingStandardsIgnoreEnd

        $tracking_uniq_ids = [];

        $productM = [];

        foreach ($tracking_list as $val) {
            $_order_id = intval($val->order_id ?? '');
            $_tracking_id = intval($val->tracking_id ?? '');
            $_order_item_id = intval($val->order_item_id ?? '');
            $_quantity = intval($val->quantity ?? '');
            $tracking_number = $val->tracking_number ?? '';
            $sync_times = intval($val->sync_times ?? '');
            $courier_code = $val->courier_code ?? '';
            $fulfilled_at_t = $val->fulfilled_at ? $val->fulfilled_at : 0;
            $fulfilled_at = $fulfilled_at_t ? date_i18n(\DateTimeInterface::ATOM, $fulfilled_at_t) : '';

            if (empty($tracking_number)) {
                continue;
            }

            if (!empty($_order_item_id)) {

                // @codingStandardsIgnoreStart
                $order_itemmeta_table = $wpdb->prefix . 'woocommerce_order_itemmeta';
                // $_order_item_id :  _qty _product_id _variation_id

                $tracking_items = (array)$wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT *
                        FROM {$order_itemmeta_table}
                        WHERE order_item_id = %d",
                        $_order_item_id
                    )
                );
                // @codingStandardsIgnoreEnd
                $pro = [];
                $pro['_qty'] = $_quantity;
                foreach ($tracking_items as $v) {
                    $_meta_key = $v->meta_key ?? '';
                    $_meta_value = $v->meta_value ?? '';
                    if (in_array($_meta_key, ['_product_id', '_variation_id'])) {
                        $pro[$_meta_key] = $_meta_value;
                    }
                }
                $productM[$_tracking_id][] = $pro;
            }

            if (array_key_exists($_tracking_id, $tracking_uniq_ids)) {
                continue;
            }
            $tracking_uniq_ids[$_tracking_id] = true;

            $order_tracking_data[$_order_id][] = [
                'tracking_id' => $_tracking_id,
                'tracking_number' => $tracking_number,
                'courier_code' => $courier_code,
                'fulfilled_time' => $fulfilled_at_t,
                'fulfilled_at' => $fulfilled_at,
                'sync_times' => $sync_times,
            ];
        }

        // 获取产品信息
        $order_tracking_data_new = [];
        foreach ($order_tracking_data as $k => $v) {
            foreach ($v as $kk => $vv) {
                $tracking_id = $vv['tracking_id'] ?? '';
                if (!empty($productM[$tracking_id]) && !empty($tracking_id)) {
                    $v[$kk]['products'] = $productM[$tracking_id];
                }
            }
            $order_tracking_data_new[$k] = $v;
        }

        return $order_tracking_data_new;
    }


    /**
     * Add common request arguments to argument list before WP_Query is run
     *
     * @param array $base_args    required arguments for the query (e.g. `post_type`, etc)
     * @param array $request_args arguments provided in the request
     *
     * @return array
     */
    protected function merge_query_args($base_args, $request_args)
    {
        $args = [];

        // resources created after specified date
        if (!empty($request_args['day'])) {
            $args['date_query'][] = [
                'column'    => 'post_date',
                'after'     => "{$request_args['day']} day ago",
                'inclusive' => true,
            ];
        }

        // resources per response
        if (!empty($request_args['limit'])) {
            $args['posts_per_page'] = $request_args['limit'];
        }

        // resource offset
        if (!empty($request_args['offset'])) {
            $args['offset'] = $request_args['offset'];
        }

        // resource page
        $args['paged'] = absint($request_args['page'] ?? 1);

        // order
        if (!empty($request_args['orderby'])) {
            $args['orderby'] = $request_args['orderby'];
        }
        if (!empty($request_args['order'])) {
            $args['order'] = $request_args['order'];
        }

        return array_merge($base_args, $args);
    }

    function synced(\WP_REST_Request $request)
    {
        global $wpdb;

        $req_data = (array)$request['data'] ?? [];

        $TABLE_TRACKING = Table::$tracking;

        $order_successes = (array)$req_data['order_ids']['successes'] ?? [];
        $order_exists    = (array)$req_data['order_ids']['exists'] ?? [];
        $order_fails     = (array)$req_data['order_ids']['fails'] ?? [];
        $order_successes = array_merge($order_successes, $order_exists);

        $tracking_success = (array)$req_data['tracking_numbers']['success'] ?? [];
        $tracking_exists  = (array)$req_data['tracking_numbers']['exists'] ?? [];
        $tracking_success = array_merge($tracking_success, $tracking_exists);

        // wc_orders_meta table
        $table_name = $wpdb->prefix . 'wc_orders_meta';

        foreach ($order_successes as $id) {
            $post = get_post($id);
            if (!empty($post)) {
                update_post_meta($id, '_parcelpanel_sync_status', 1);
                try {
                    // up wp_wc_order_meta data
                    $this->up_wc_order_meta($wpdb, $table_name, $id, '_parcelpanel_sync_status', 1);
                } catch (\Exception $e) {
                }
            }
        }

        foreach ($order_fails as $id) {
            $post = get_post($id);
            if (!empty($post)) {
                update_post_meta($id, '_parcelpanel_sync_status', -1);
                try {
                    // up wp_wc_order_meta data
                    $this->up_wc_order_meta($wpdb, $table_name, $id, '_parcelpanel_sync_status', -1);
                } catch (\Exception $e) {
                }
            }
        }

        if (!empty($tracking_success)) {
            // @codingStandardsIgnoreStart
            $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_success);
            $res = $wpdb->query(
                $wpdb->prepare(
                    "UPDATE {$TABLE_TRACKING} SET sync_times=-1 WHERE tracking_number IN ({$placeholder_str})",
                    $tracking_success
                )
            );
            // @codingStandardsIgnoreEnd
            if ($res) {
                TrackingNumber::schedule_tracking_courier_sync_action();
            }
        }

        $this->fill_items_ignore_exists($order_successes);

        // 记录首次同步完成时间
        empty(get_option(\ParcelPanel\OptionName\FIRST_SYNCED_AT)) && update_option(\ParcelPanel\OptionName\FIRST_SYNCED_AT, time(), false);

        return rest_ensure_response(['code' => RestApi::CODE_SUCCESS]);
    }

    // up wp_wc_order_meta data
    static function up_wc_order_meta($wpdb, $table_name, $order_id, $meta_key, $new_meta_value)
    {
        // @codingStandardsIgnoreStart
        // check table is exist 
        $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'") === $table_name;

        if ($table_exists) {
            // echo "Table exists!";
        } else {
            return;
        }
        // check order is exists
        $existing_record = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE order_id = %d AND meta_key = %s",
                $order_id,
                $meta_key
            )
        );

        if ($existing_record) {
            // update
            $wpdb->update(
                $table_name,
                array('meta_value' => $new_meta_value),
                array('order_id' => $order_id, 'meta_key' => $meta_key)
            );
        } else {
            // create
            $wpdb->insert(
                $table_name,
                array('order_id' => $order_id, 'meta_key' => $meta_key, 'meta_value' => $new_meta_value)
            );
        }
        // @codingStandardsIgnoreEnd
    }

    /**
     * Expands an order item to get its data.
     *
     * @param \WC_Order_item $item Order item data.
     *
     * @return array
     */
    static function get_order_item_data($item)
    {
        $data           = $item->get_data();
        $format_decimal = ['subtotal', 'subtotal_tax', 'total', 'total_tax', 'tax_total', 'shipping_tax_total'];

        // Format decimal values.
        foreach ($format_decimal as $key) {
            if (isset($data[$key])) {
                $data[$key] = wc_format_decimal($data[$key], 2);
            }
        }

        // Add SKU and PRICE to products.
        if (is_callable([$item, 'get_product'])) {
            $data['sku']   = $item->get_product() ? $item->get_product()->get_sku() : null;
            $data['price'] = $item->get_quantity() ? $item->get_total() / $item->get_quantity() : 0;
        }

        // Add parent_name if the product is a variation.
        if (is_callable([$item, 'get_product'])) {
            $product = $item->get_product();

            if (is_callable([$product, 'get_parent_data'])) {
                $data['parent_name'] = $product->get_title();
            } else {
                $data['parent_name'] = null;
            }
        }

        // Format taxes.
        if (!empty($data['taxes']['total'])) {
            $taxes = [];

            foreach ($data['taxes']['total'] as $tax_rate_id => $tax) {
                $taxes[] = [
                    'id'       => $tax_rate_id,
                    'total'    => $tax,
                    'subtotal' => isset($data['taxes']['subtotal'][$tax_rate_id]) ? $data['taxes']['subtotal'][$tax_rate_id] : '',
                ];
            }
            $data['taxes'] = $taxes;
        } elseif (isset($data['taxes'])) {
            $data['taxes'] = [];
        }

        // Remove names for coupons, taxes and shipping.
        if (isset($data['code']) || isset($data['rate_code']) || isset($data['method_title'])) {
            unset($data['name']);
        }

        // Remove props we don't want to expose.
        unset($data['order_id']);
        unset($data['type']);

        // Expand meta_data to include user-friendly values.
        $formatted_meta_data = $item->get_formatted_meta_data(null, true);
        $data['meta_data'] = array_map(
            [self::class, 'merge_meta_item_with_formatted_meta_display_attributes'],
            $data['meta_data'],
            array_fill(0, count($data['meta_data']), $formatted_meta_data)
        );

        return $data;
    }

    /**
     * Merge the `$formatted_meta_data` `display_key` and `display_value` attribute values into the corresponding
     * {@link WC_Meta_Data}. Returns the merged array.
     *
     * @param \WC_Meta_Data $meta_item           An object from {@link WC_Order_Item::get_meta_data()}.
     * @param array         $formatted_meta_data An object result from {@link WC_Order_Item::get_formatted_meta_data}.
     *                                           The keys are the IDs of {@link WC_Meta_Data}.
     *
     * @return array
     */
    static function merge_meta_item_with_formatted_meta_display_attributes($meta_item, $formatted_meta_data)
    {
        $result = [
            'id'            => $meta_item->id,
            'key'           => $meta_item->key,
            'value'         => $meta_item->value,
            'display_key'   => $meta_item->key,   // Default to original key, in case a formatted key is not available.
            'display_value' => $meta_item->value, // Default to original value, in case a formatted value is not available.
        ];

        if (array_key_exists($meta_item->id, $formatted_meta_data)) {
            $formatted_meta_item = $formatted_meta_data[$meta_item->id];

            $result['display_key']   = wc_clean($formatted_meta_item->display_key);
            $result['display_value'] = wc_clean($formatted_meta_item->display_value);
        }

        return $result;
    }

    /**
     * Get formatted item data.
     *
     * @param \WC_Order $order WC_Data instance.
     *
     * @return array
     * @see   \WC_REST_Orders_V2_Controller::get_formatted_item_data()
     *
     * @since 3.0.0
     */
    static function get_formatted_item_data($order)
    {
        $extra_fields   = ['meta_data', 'line_items', 'tax_lines', 'shipping_lines', 'fee_lines', 'coupon_lines', 'refunds'];
        $format_decimal = ['discount_total', 'discount_tax', 'shipping_total', 'shipping_tax', 'shipping_total', 'shipping_tax', 'cart_tax', 'total', 'total_tax'];
        $format_date    = ['date_created', 'date_modified', 'date_completed', 'date_paid'];
        // These fields are dependent on other fields.
        $dependent_fields = [
            'date_created_gmt'   => 'date_created',
            'date_modified_gmt'  => 'date_modified',
            'date_completed_gmt' => 'date_completed',
            'date_paid_gmt'      => 'date_paid',
        ];

        $format_line_items = ['line_items', 'tax_lines', 'shipping_lines', 'fee_lines', 'coupon_lines'];

        $fields = [
            'id',
            'parent_id',
            'number',
            'order_key',
            'created_via',
            'version',
            'status',
            'currency',
            'date_created',
            'date_created_gmt',
            'date_modified',
            'date_modified_gmt',
            'discount_total',
            'discount_tax',
            'shipping_total',
            'shipping_tax',
            'cart_tax',
            'total',
            'total_tax',
            'prices_include_tax',
            'customer_id',
            'customer_ip_address',
            'customer_user_agent',
            'customer_note',
            'billing',
            'shipping',
            'payment_method',
            'payment_method_title',
            'transaction_id',
            'date_paid',
            'date_paid_gmt',
            'date_completed',
            'date_completed_gmt',
            'cart_hash',
            'meta_data',
            'line_items',
            'tax_lines',
            'shipping_lines',
            'fee_lines',
            'coupon_lines',
            'refunds',
        ];


        foreach ($dependent_fields as $field_key => $dependency) {
            if (in_array($field_key, $fields) && !in_array($dependency, $fields)) {
                $fields[] = $dependency;
            }
        }

        $extra_fields   = array_intersect($extra_fields, $fields);
        $format_decimal = array_intersect($format_decimal, $fields);
        $format_date    = array_intersect($format_date, $fields);

        $format_line_items = array_intersect($format_line_items, $fields);

        $data = $order->get_base_data();

        // Add extra data as necessary.
        foreach ($extra_fields as $field) {
            switch ($field) {
                case 'meta_data':
                    $data['meta_data'] = $order->get_meta_data();
                    break;
                case 'line_items':
                    $data['line_items'] = $order->get_items('line_item');
                    break;
                case 'tax_lines':
                    $data['tax_lines'] = $order->get_items('tax');
                    break;
                case 'shipping_lines':
                    $data['shipping_lines'] = $order->get_items('shipping');
                    break;
                case 'fee_lines':
                    $data['fee_lines'] = $order->get_items('fee');
                    break;
                case 'coupon_lines':
                    $data['coupon_lines'] = $order->get_items('coupon');
                    break;
                case 'refunds':
                    $data['refunds'] = [];

                    if (method_exists($order, 'get_refunds')) {
                        foreach ($order->get_refunds() as $refund) {
                            $data['refunds'][] = [
                                'id'     => $refund->get_id(),
                                'reason' => $refund->get_reason() ? $refund->get_reason() : '',
                                'total'  => '-' . wc_format_decimal($refund->get_amount(), 2),
                            ];
                        }
                    }

                    break;
            }
        }

        // Format decimal values.
        foreach ($format_decimal as $key) {
            $data[$key] = wc_format_decimal($data[$key], 2);
        }

        // Format date values.
        foreach ($format_date as $key) {
            $datetime              = $data[$key];
            $data[$key]          = wc_rest_prepare_date_response($datetime, false);
            $data[$key . '_gmt'] = wc_rest_prepare_date_response($datetime);
        }

        // Format the order status.
        $data['status'] = 'wc-' === substr($data['status'], 0, 3) ? substr($data['status'], 3) : $data['status'];

        // Format line items.
        foreach ($format_line_items as $key) {
            $data[$key] = array_values(array_map([self::class, 'get_order_item_data'], $data[$key]));
        }

        $data['order_id']     = $data['id'];
        $data['order_number'] = $data['number'];

        // $data = array_intersect_key( $data, array_flip( $fields ) );

        // get pro images & link
        if (!empty($data['line_items'])) {
            try {
                $line_items_pro = [];
                foreach ($order->get_items() as $item) {
                    /* @var \WC_Product $product */
                    $product = $item->get_product();

                    $pro_now_id = $product->get_id();
                    $parent_id = !empty($product->get_parent_id()) ? $product->get_parent_id() : 0;
                    $link_pro = $parent_id ? $parent_id : $pro_now_id;

                    $virtual = $product->get_virtual();

                    $permalink = get_permalink($pro_now_id);

                    $link = UserTrackPage::instance()->getProductGetParam($permalink, $link_pro);

                    $image = wp_get_attachment_url($product->get_image_id()) ?: '';
                    $line_items_pro[$pro_now_id] = [
                        'parent_id' => $parent_id,
                        'image_url' => $image,
                        'link' => $link,
                        'virtual' => $virtual,
                    ];

                    if ($pro_now_id != $link_pro) {
                        $line_items_pro[$link_pro] = [
                            'parent_id' => $parent_id,
                            'image_url' => $image,
                            'link' => $link,
                            'virtual' => $virtual,
                        ];
                    }
                }

                $line_items = $data['line_items'];
                foreach ($line_items as &$item) {
                    $product_id = $item['product_id'];
                    if (!empty($line_items_pro[$product_id])) {
                        $item['image_url'] = $line_items_pro[$product_id]['image_url'];
                        $item['link'] = $line_items_pro[$product_id]['link'];
                        $item['parent_id'] = $line_items_pro[$product_id]['parent_id'];
                        $item['virtual'] = $line_items_pro[$product_id]['virtual'];
                    }
                }
                $data['line_items'] = $line_items;
            } catch (\Error $e) {
            }
        }
        return $data;
    }


    /**
     * Add missing items
     *
     * @param array $order_ids
     *
     * @return void
     */
    private static function fill_items_ignore_exists(array $order_ids)
    {
        global $wpdb;

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        if (empty($order_ids)) {
            return;
        }
        // @codingStandardsIgnoreStart
        $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($order_ids, '%d');
        $shipment_order_ids = $wpdb->get_col(
            $wpdb->prepare(
                "SELECT order_id FROM {$TABLE_TRACKING_ITEMS} WHERE order_id IN ({$placeholder_str})",
                $order_ids
            )
        );
        foreach (array_diff($order_ids, $shipment_order_ids) as $id) {
            $wpdb->insert($TABLE_TRACKING_ITEMS, ['order_id' => $id]);
        }
        // @codingStandardsIgnoreEnd
    }
}

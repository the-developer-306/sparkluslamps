<?php

namespace ParcelPanel\Action;

use ParcelPanel\Api\Api;
use ParcelPanel\Api\Orders;
use ParcelPanel\Exceptions\ShipmentNotFoundException;
use ParcelPanel\Libs\ArrUtils;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

class ShopOrder
{
    use Singleton;

    public const SYNC_STATUS_NO_SYNC = 0;
    public const SYNC_STATUS_NO_QUOTA = -1;

    private static $is_update = false;

    private static $tracking_id;

    private $tracking_data;

    /** @var int is editing tracking_id */
    private $original_tracking_id;

    /** @var array Saved order id list */
    private $update_order_ids_cache = [];

    // is do order
    private $processed_order_ids = [];

    public function get_admin_wc_meta_boxes_params(): array
    {
        $enable_shipped_status = AdminSettings::get_status_shipped_field();
        $shipped = AdminSettings::get_status_pp_shipped_field();
        $partial_shipped = AdminSettings::get_status_pp_partial_shipped_field();
        $delivered = AdminSettings::get_status_pp_delivered_field();

        $completed_status_label = _x('Completed', 'Order status', 'woocommerce');
        $shipped_status_label = __('Shipped', 'parcelpanel');
        $partially_shipped_status_label = __('Partially Shipped', 'parcelpanel');
        $completed_shipped = __('Shipped (equals \'Completed\')', 'parcelpanel');
        $do_not_change = __('Don\'t change', 'parcelpanel');
        $delivered_text = __('Delivered', 'parcelpanel');

        $show_completed = '';
        $show_shipped = "display: none";
        $completed_text = $enable_shipped_status ? $completed_shipped : $completed_status_label;
        $completed_status = "completed";
        $shipped_status = "shipped";

        if ($shipped) {
            $show_completed = "display: none";
            $show_shipped = "";
        }

        // hidden other ship status
        $hiddenCheckStatus = "";
        if (!$partial_shipped) {
            $hiddenCheckStatus = "display: none";
        }
        $threeShow = "justify-content: space-between;";
        if ($hiddenCheckStatus) {
            $threeShow = "column-gap: 40px;";
        }

        $partial_shipped_status = 'partial-shipped';
        // now status default
        $shipment_status_default = get_option(\ParcelPanel\OptionName\SHIPMENT_STATUS_DEFAULT);
        $no_check = '';
        $partially_shipped_check = '';
        $completed_check = '';
        $shipped_check = '';
        if ($shipment_status_default == 'completed' && !$shipped) {
            $completed_check = 'checked="checked"';
        } else if ($shipment_status_default == 'shipped' && $shipped) {
            $shipped_check = 'checked="checked"';
        } else if ($shipment_status_default == $partial_shipped_status && $partial_shipped) {
            $partially_shipped_check = 'checked="checked"';
        } else {
            $no_check = 'checked="checked"';
        }

        return [
            'i18n_delete_tracking' => __('This can\'t be undone!', 'parcelpanel'),
            'i18n' => [
                'courier' => __('Carrier (optional)', 'parcelpanel'),
                'tracking_number' => __('Tracking number', 'parcelpanel'),
                'mark_order_as' => __('Mark order as (optional)', 'parcelpanel'),
                'date_shipped' => __('Date shipped (optional)', 'parcelpanel'),
                'add_tracking' => __('Add tracking', 'parcelpanel'),
                'edit_tracking' => __('Edit tracking', 'parcelpanel'),
                'rename_to_shipped' => __('Rename "Completed" to "Shipped"', 'parcelpanel'),
                'revert_to_completed' => __('Revert "Shipped" to "Completed"', 'parcelpanel'),
                // 'add' => __('Add', 'parcelpanel'),
                'add' => __('Confirm', 'parcelpanel'),
                'save' => __('Confirm', 'parcelpanel'),
                'cancel' => __('Cancel', 'parcelpanel'),
                'auto_matching' => __('Automatic Matching', 'parcelpanel'),
                'tracking_number_tip' => __('Required fields can\'t be empty.', 'parcelpanel'),
                'order_status' => [
                    'completed' => $completed_status_label,
                    'shipped' => $shipped_status_label,
                    'partially_shipped' => $partially_shipped_status_label,
                ],
                // show edit order status
                'show_add_status' => [
                    'delivered_type' => $delivered,
                    'shipped_type' => $shipped,
                    'partial_shipped_type' => $partial_shipped,
                ],
                'order_status_new' => [
                    'do_not_change' => $do_not_change,
                    'no_check' => $no_check,
                    'do_not_change_status' => "", // no change order status
                    'delivered_text' => $delivered_text,
                    'partially_shipped' => $partially_shipped_status_label,
                    'partially_shipped_check' => $partially_shipped_check,
                    'partially_shipped_status' => $partial_shipped_status, // order status
                    'completed_text' => $completed_text,
                    'shipped_text' => $shipped_status_label,
                    'completed_check' => $completed_check,
                    'shipped_check' => $shipped_check,
                    'completed_status' => $completed_status, // order status
                    'shipped_status' => $shipped_status, // order status
                    'show_completed' => $show_completed, // show completed
                    'show_shipped' => $show_shipped, // show shipped
                ],
                'sku' => __('SKU:', 'parcelpanel'),
                'items_has_fulfilled' => __('All items have been fulfilled', 'parcelpanel'),
                'tracking_number_eg' => __('e.g. 12121212', 'parcelpanel'),
                'order_status_options' => __('Update order status options (optional)', 'parcelpanel'),
                'hiddenCheckStatus' => $hiddenCheckStatus,
                'threeShow' => $threeShow,
            ],
            'mark_order_as_select_list' => [
                ['id' => 'completed', 'text' => $enable_shipped_status ? $shipped_status_label : $completed_status_label],
                ['id' => 'partial-shipped', 'text' => $partially_shipped_status_label],
            ],
            'options' => [
                'status_shipped' => $enable_shipped_status,
            ],
            'get_shipment_item_nonce' => wp_create_nonce('pp-get-shipment-item'),
            'save_shipment_item_nonce' => wp_create_nonce('pp-save-shipment-item'),
            'delete_shipment_item_nonce' => wp_create_nonce('pp-delete-shipment-item'),
            'save_shipped_label_nonce' => wp_create_nonce('pp-save-shipped-label'),
            'today' => date_i18n(__('Y-m-d', 'parcelpanel'), time()),
        ];
    }

    /**
     * show meta box（meta box）
     * https://developer.wordpress.org/plugins/metadata/custom-meta-boxes/
     *
     * @author: Chuwen
     * @date  : 2021/7/21 17:28
     */
    function meta_box_tracking()
    {
        global $post;

        $shipment_items = self::get_shipment_items($post->ID, true);

        echo '<ul id="pp-tk-tracking-items"></ul>';

        echo '<button class="components-button pp-button is-primary" id="pp-tk-btn-show-form" type="button">' . esc_html__('Add tracking number', 'parcelpanel') . '</button>';

        echo '<script>var parcelpanel_admin_wc_meta_boxes_shipments=' . wp_json_encode(['shipments' => $shipment_items]) . ';</script>';
    }

    // compatible with HPOS
    function meta_box_tracking_HPOS($order)
    {
        $shipment_items = self::get_shipment_items($order->get_id(), true);

        echo '<ul id="pp-tk-tracking-items"></ul>';

        echo '<button class="components-button pp-button is-primary" id="pp-tk-btn-show-form" type="button">' . esc_html__('Add tracking number', 'parcelpanel') . '</button>';

        echo '<script>var parcelpanel_admin_wc_meta_boxes_shipments=' . wp_json_encode(['shipments' => $shipment_items]) . ';</script>';
    }

    /**
     * Returns a HTML node for a tracking item for the admin meta box
     */
    static function display_html_tracking_item_for_meta_box($order_id, $item, $errors = [])
    {
        $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses();

        $order = wc_get_order($order_id);
        $order_number = $order->get_order_number();
        $email = $order->get_billing_email();

        $tracking_by_order = (new ParcelPanelFunction)->parcelpanel_get_track_page_url(false, "#{$order_number}", $email);
        $tracking_by_num = (new ParcelPanelFunction)->parcelpanel_get_track_page_url_by_tracking_number($item->tracking_number);

        $tracking_page_settings = \ParcelPanel\Models\TrackingSettings::instance()->get_settings();
        $display_option = $tracking_page_settings['display_option'];
        $b_od_nb_a_em = !empty($display_option['b_od_nb_a_em']) ? $display_option['b_od_nb_a_em'] : false; // track by order
        $b_tk_nb = !empty($display_option['b_tk_nb']) ? $display_option['b_tk_nb'] : false; // track by number
        $tracking_url = $tracking_by_order;
        if ($b_tk_nb && !empty($item->tracking_number)) {
            $tracking_url = $tracking_by_num;
        }

        $fulfilled_formatted_date = date_i18n(get_option('date_format'), $item->fulfilled_at);
        $fulfilled_date = date_i18n('Y-m-d', $item->fulfilled_at);

        $courier_info = (new ParcelPanelFunction)->parcelpanel_get_courier_info($item->courier_code);

        $courier_name = $courier_info->name ?? '';

        $last_event = $item->last_event;

        $shipment_status_label = (new ParcelPanelFunction)->parcelpanel_get_shipment_status($item->shipment_status);
        $shipment_status_text = $shipment_statuses[$shipment_status_label]['text'];

        echo '<li class="tracking-item" data-fulfilled-date="' . esc_attr($fulfilled_date) . '" data-tracking-id="' . esc_attr($item->id) . '" id="pp-tracking-item-' . esc_attr($item->id) . '">';

        foreach ($errors as $error) {
            echo esc_html(self::get_notice_html($error));
        }

        // translators: %1$d is param.
        echo '<div style="display:flex;margin-bottom:8px;justify-content:space-between;"><div>' . sprintf(esc_html__('Shipment %1$d', 'parcelpanel'), 1) . '</div><div><a class="edit-tracking">';
        esc_html_e('Edit', 'woocommerce');
        echo '</a><a class="delete-tracking">';
        esc_html_e('Delete', 'woocommerce');
        echo '</a></div></div>';

        echo '<div class="tracking-content"><div class="tracking-number"><strong class="courier" data-value="' . esc_attr($item->courier_code) . '">' . esc_html($courier_name) . '</strong> - ';

        if ($tracking_url) {
            echo '<a class="number" href="' . esc_url($tracking_url) . '" target="_blank" title="' . esc_attr__('Tracking order', 'parcelpanel') . '">' . esc_html($item->tracking_number) . '</a>';
        } else {
            echo '<span class="number">' . esc_html($item->tracking_number) . '</span>';
        }


        echo '</div><div class="tracking-status"><span class="pp-tracking-icon icon-' . esc_attr($shipment_status_label) . '">' . esc_html($shipment_status_text) . '</span></div><div class="tracking-info">';
        echo esc_html($last_event) . '</div></div><p class="meta"><span class="fulfilled_on">';
        // translators: %s is param.
        echo esc_html(sprintf(__('Shipped on %s', 'parcelpanel'), $fulfilled_formatted_date));

        echo '</span></p>';

        echo '</li>';
    }

    private static function format_shipment($item)
    {
        $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses();

        $order = wc_get_order($item->order_id);
        $order_number = $order->get_order_number();
        $email = $order->get_billing_email();

        $tracking_by_num = (new ParcelPanelFunction)->parcelpanel_get_track_page_url_by_tracking_number($item->tracking_number);
        if (!empty($item->order_id)) {
            $tracking_by_order = (new ParcelPanelFunction)->parcelpanel_get_track_page_url(false, "#{$order_number}", $email);

            $tracking_page_settings = \ParcelPanel\Models\TrackingSettings::instance()->get_settings();
            $display_option = $tracking_page_settings['display_option'];
            $b_od_nb_a_em = !empty($display_option['b_od_nb_a_em']) ? $display_option['b_od_nb_a_em'] : false; // track by order
            $b_tk_nb = !empty($display_option['b_tk_nb']) ? $display_option['b_tk_nb'] : false; // track by number
            $tracking_url = $tracking_by_order;
            if ($b_tk_nb && !empty($item->tracking_number)) {
                $tracking_url = $tracking_by_num;
            }
        } else {
            $tracking_url = $tracking_by_num;
        }


        $fulfilled_formatted_date = date_i18n(get_option('date_format'), $item->fulfilled_at, true);
        $fulfilled_date = date_i18n('Y-m-d', $item->fulfilled_at);

        // translators: %s is param.
        $shipped_on_text = sprintf(__('Shipped on %s', 'parcelpanel'), $fulfilled_formatted_date);

        $courier_info = (new ParcelPanelFunction)->parcelpanel_get_courier_info($item->courier_code);

        $courier_name = $courier_info->name ?? '';

        $last_event = $item->last_event;

        $shipment_status_label = (new ParcelPanelFunction)->parcelpanel_get_shipment_status($item->shipment_status);
        $shipment_status_text = $shipment_statuses[$shipment_status_label]['text'];

        $item->id = (int)$item->id;
        $item->tracking_id = (int)$item->tracking_id;
        $item->shipment_status = (int)$item->shipment_status;
        $item->order_item_id = (int)$item->order_item_id;
        $item->quantity = (int)$item->quantity;
        $item->order_id = (int)$item->order_id;
        $item->courier_name = $courier_name;
        $item->shipment_status_label = $shipment_status_label;
        $item->shipment_status_text = $shipment_status_text;
        $item->last_event = $last_event;
        $item->tracking_url = $tracking_url;
        $item->fulfilled_date = $fulfilled_date;
        $item->fulfilled_formatted_date = $fulfilled_formatted_date;
        $item->shipped_on_text = $shipped_on_text;
    }

    /**
     * Gets all tracking items from the post meta array for an order
     *
     * @param int $order_id Order ID
     * @param bool $formatted Whether or not to resolve the final tracking link
     *                        and provider in the returned tracking item.
     *                        Default to false.
     *
     * @return array List of tracking items
     */
    static function get_tracking_items(int $order_id, bool $formatted = false): array
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // no repeated tracking_id
        $key = 'ppwc_tracking_' . $order_id;
        $tracking_items = (new ParcelPanelFunction)->catch_data_all($key);
        if ($tracking_items === false) {
            // @codingStandardsIgnoreStart
            $tracking_items = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT
                    ppt.id,
                    ppti.order_id,
                    ppti.order_item_id,
                    ppti.quantity,
                    ppti.tracking_id,
                    ppt.tracking_number,
                    ppt.courier_code,
                    ppti.shipment_status,
                    ppt.last_event,
                    ppt.original_country,
                    ppt.destination_country,
                    ppt.origin_info,
                    ppt.destination_info,
                    ppt.transit_time,
                    ppt.stay_time,
                    ppt.fulfilled_at,
                    ppt.updated_at
                    FROM $TABLE_TRACKING_ITEMS AS ppti
                    LEFT JOIN $TABLE_TRACKING AS ppt ON ppt.id = ppti.tracking_id
                    WHERE ppti.order_id=%d
                    GROUP BY ppti.tracking_id",
                    $order_id
                )
            );
            // @codingStandardsIgnoreEnd
            (new ParcelPanelFunction)->catch_data_all($key, $tracking_items, 2, MINUTE_IN_SECONDS * 10);
        }


        if (is_array($tracking_items)) {

            // if ( $formatted ) {
            //     foreach ( $tracking_items as &$item ) {
            //         $formatted_item = self::get_formatted_tracking_item( $order_id, $item );
            //         $item           = array_merge( $item, $formatted_item );
            //     }
            // }

            return $tracking_items;
        }

        return [];
    }

    /**
     * 获取订单发货数据
     *
     * @param int $order_id
     * @param bool $formatted
     *
     * @return array
     */
    public static function get_shipment_items(int $order_id, bool $formatted = false): array
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        $key = 'ppwc_shipment_' . $order_id;
        $shipment_items = (new ParcelPanelFunction)->catch_data_all($key);
        if ($shipment_items === false) {
            // @codingStandardsIgnoreStart
            $shipment_items = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT
                    ppt.id,
                    ppti.order_id,
                    ppti.order_item_id,
                    ppti.quantity,
                    ppti.tracking_id,
                    ppt.tracking_number,
                    ppt.courier_code,
                    ppti.shipment_status,
                    ppt.last_event,
                    ppt.original_country,
                    ppt.destination_country,
                    ppt.origin_info,
                    ppt.destination_info,
                    ppt.transit_time,
                    ppt.stay_time,
                    ppt.fulfilled_at,
                    ppt.updated_at
                    FROM $TABLE_TRACKING_ITEMS AS ppti
                    JOIN $TABLE_TRACKING AS ppt ON ppt.id = ppti.tracking_id
                    WHERE ppti.order_id=%d
                    ORDER BY ppt.fulfilled_at ASC, ppt.id ASC",
                    $order_id
                )
            );
            // @codingStandardsIgnoreEnd
            (new ParcelPanelFunction)->catch_data_all($key, $shipment_items, 2, MINUTE_IN_SECONDS * 10);
        }


        if (is_array($shipment_items)) {

            if ($formatted) {
                foreach ($shipment_items as $item) {
                    self::format_shipment($item);
                }

                $shipments = [];
                foreach ($shipment_items as $item) {
                    $tracking_id = $item->tracking_id;
                    $order_item_id = $item->order_item_id;

                    if (!$tracking_id) {
                        // Ignore no tracking item
                        continue;
                    }

                    if (!array_key_exists($tracking_id, $shipments)) {
                        $shipments[$tracking_id] = $item;
                        $item->line_items = [];
                    }
                    $_shipment = $shipments[$tracking_id];
                    $_shipment->line_items[] = [
                        'id' => $order_item_id,
                        'quantity' => $item->quantity,
                    ];
                }

                foreach ($shipments as $shipment) {
                    $has_full_shipped = false;
                    $has_0_quantity = false;

                    foreach ($shipment->line_items as $line_item) {
                        // 订单发货级别最高，其次是商品全发货
                        if (empty($line_item['id'])) {
                            $has_full_shipped = true;
                            break;
                        } elseif (empty($line_item['quantity'])) {
                            $has_0_quantity = true;
                            // 因为商品全发货的级别原因，这里不用 break 了
                        }
                    }

                    if ($has_full_shipped) {
                        $shipment->ship_type = 1;  // 按订单发货
                        // $shipment->line_items = [];
                    } elseif ($has_0_quantity) {
                        $shipment->ship_type = 2;  // 商品全发货
                    } else {
                        $shipment->ship_type = 0;  // 商品数发货
                    }
                }

                $shipment_items = array_values($shipments);
            }

            return $shipment_items;
        }

        return [];
    }

    public static function retrieve_shipments_info_by_order_id($order_id)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        $key = 'ppwc_tracking_' . $order_id;
        $tracking_items = (new ParcelPanelFunction)->catch_data_all($key);
        if ($tracking_items === false) {
            // @codingStandardsIgnoreStart
            $tracking_items = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT
                    ppt.id,
                    ppti.order_id,
                    ppti.order_item_id,
                    ppti.quantity,
                    ppti.tracking_id,
                    ppt.tracking_number,
                    ppt.courier_code,
                    ppti.shipment_status,
                    ppt.last_event,
                    ppt.original_country,
                    ppt.destination_country,
                    ppt.origin_info,
                    ppt.destination_info,
                    ppt.transit_time,
                    ppt.stay_time,
                    ppt.fulfilled_at,
                    ppt.updated_at
                    FROM $TABLE_TRACKING_ITEMS AS ppti
                    LEFT JOIN $TABLE_TRACKING AS ppt ON ppt.id = ppti.tracking_id
                    WHERE ppti.order_id=%d
                    GROUP BY ppti.tracking_id",
                    $order_id
                )
            );
            // @codingStandardsIgnoreEnd
            (new ParcelPanelFunction)->catch_data_all($key, $tracking_items, 2, MINUTE_IN_SECONDS * 10);
        }

        if (is_array($tracking_items)) {
            return $tracking_items;
        }

        return [];
    }

    static function get_tracking_item_by_id($id)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;

        return $wpdb->get_row($wpdb->prepare("SELECT * FROM $TABLE_TRACKING WHERE `id` = %d", $id)); // phpcs:ignore
    }


    /**
     * 保存单号
     * 创建订单时触发
     */
    function save_meta_box($post_id, $post)
    {

        $tracking_number = str_replace(' ', '', wc_clean(sanitize_text_field(wp_unslash($_POST['pp_tracking_number'] ?? '')))); // phpcs:ignore

        if (!empty($tracking_number)) {

            $courier_code = wc_clean(sanitize_text_field(wp_unslash($_POST['pp_courier'] ?? ''))); // phpcs:ignore
            $fulfilled_date = wc_clean(sanitize_text_field(wp_unslash($_POST['pp_fulfilled_date'] ?? ''))); // phpcs:ignore

            $fulfilled_date = self::getFulfilledDate($fulfilled_date);

            $fulfilled_at = strtotime($fulfilled_date) ?: time();

            $change_order_to_completed = wc_clean(sanitize_text_field(wp_unslash($_POST['pp_order_completed'] ?? ''))); // phpcs:ignore

            self::save_tracking_item($post_id, $tracking_number, $courier_code, $fulfilled_at);

            if ($change_order_to_completed) {
                self::update_order_status_to_completed($post_id);
            }
        }
    }

    private function getFulfilledDate($time)
    {
        if ($time) {
            $get_time = strtotime($time);
            $check = strtotime(gmdate('Y-m-d'));
            $time = gmdate('Y-m-d', $get_time);
            if ($get_time < $check) {
                $time = $time . ' 23:59:59';
            } else {
                $time = $time . ' ' . gmdate('h:i:s');
            }
        }
        return $time;
    }

    /**
     * Adaptable quantity of goods shipped
     *
     * @param $tracking_id
     * @param $order_line_items_quantity_by_id
     * @param $shipment_line_items
     * @param $tracking_items
     *
     * @return array
     */
    public static function get_items_quantity($tracking_id, $order_line_items_quantity_by_id, $shipment_line_items, $tracking_items)
    {
        // Filter blank data and merge identical items
        $shipment_line_items_quantity_by_id = [];
        // $shipment_line_items 用户输入的 line_items
        foreach ($shipment_line_items as $shipment_line_item) {
            $_id = $shipment_line_item['id'];
            $_quantity = $shipment_line_item['quantity'];
            if (!array_key_exists($_id, $order_line_items_quantity_by_id)) {
                continue;
            }
            if (!array_key_exists($_id, $shipment_line_items_quantity_by_id)) {
                $shipment_line_items_quantity_by_id[$_id] = 0;
            }
            $shipment_line_items_quantity_by_id[$_id] += $_quantity;
        }

        // Quantity of shipped items
        if (!empty($tracking_id)) {
            $tracking_items = array_filter($tracking_items, function ($v) use ($tracking_id) {
                return $v->tracking_id != $tracking_id;
            });
        }
        $has_full_shipped = false;
        $is_full_quantity_item_shipped = [];
        foreach ($tracking_items as $_shipment) {
            if (!$_shipment->tracking_id) {
                continue;
            }
            // if (!$_shipment->order_item_id) {
            //     $has_full_shipped = true;
            //     break;
            // }
            if (!$_shipment->quantity) {
                $is_full_quantity_item_shipped[$_shipment->order_item_id] = true;
            }
        }
        if ($has_full_shipped) {
            return [];
        }

        // get now can shipment pro quantity
        $order_line_items_quantity_by_id = self::items_sub_by_key(
            $order_line_items_quantity_by_id,
            self::get_shipped_items_qty($tracking_items, $order_line_items_quantity_by_id)
        );

        // Adaptive shipping quantity
        foreach ($shipment_line_items_quantity_by_id as $_id => $_quantity) {
            if ($_quantity <= $order_line_items_quantity_by_id[$_id]) {
                /* quantity has */
                continue;
            }
            if ($order_line_items_quantity_by_id[$_id] < 1) {
                /* no pro quantity to shipment  */
                unset($shipment_line_items_quantity_by_id[$_id]);
                continue;
            }
            // adjust to max shipment quantity
            $shipment_line_items_quantity_by_id[$_id] = $order_line_items_quantity_by_id[$_id];
        }

        return array_diff_key($shipment_line_items_quantity_by_id, $is_full_quantity_item_shipped);
    }

    /**
     * Ajax save shipment item
     */
    public function shipment_item_save_ajax()
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        check_ajax_referer('pp-save-shipment-item');

        $post_data = (new ParcelPanelFunction)->parcelpanel_get_post_data();

        // Can only be modified or added
        $order_id = absint($post_data['order_id'] ?? 0);
        $tracking_number = str_replace(' ', '', wc_clean($post_data['tracking_number'] ?? ''));
        $shipment_line_items = (array)($post_data['line_items'] ?? []);

        // Parameter verification
        if ($order_id <= 0) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], 'The order id field is required!', false);
        }
        if (!strlen($tracking_number)) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], 'The tracking number field is required!', false);
        }
        foreach ($shipment_line_items as $i => $shipment_line_item) {
            if (!isset($shipment_line_item['id']) || !isset($shipment_line_item['quantity'])) {
                (new ParcelPanelFunction)->parcelpanel_json_response([], __('Invalid parameters.', 'parcelpanel'), false);
            }
            if (!is_int($shipment_line_item['id']) || $shipment_line_item['id'] <= 0) {
                (new ParcelPanelFunction)->parcelpanel_json_response([], "The line_items.{$i}.id field is invalid!", false);
            }
            if (!is_int($shipment_line_item['quantity']) || $shipment_line_item['quantity'] <= 0) {
                (new ParcelPanelFunction)->parcelpanel_json_response([], "The line_items.{$i}.quantity field is invalid!", false);
            }
        }

        $mark_order_as = wc_clean($post_data['mark_order_as'] ?? '');
        $tracking_id = absint($post_data['tracking_id'] ?? 0);
        $courier_code = wc_clean($post_data['courier_code'] ?? '');
        $fulfilled_date = wc_clean($post_data['fulfilled_date'] ?? null);

        $fulfilled_date = self::getFulfilledDate($fulfilled_date);
        $fulfilled_at = strtotime($fulfilled_date) ?: time();

        if (!empty($tracking_number) && empty($courier_code)) {
            $res_data = API::number_identify($tracking_number);
            $courier_code = ArrUtils::get($res_data, 'courier_code', '');
        }
        // @codingStandardsIgnoreStart
        $tracking_items = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT
                ppt.id,
                ppti.tracking_id,
                ppti.order_id,
                ppti.order_item_id,
                ppti.quantity,
                ppt.tracking_number,
                ppt.courier_code,
                ppti.shipment_status,
                ppt.last_event,
                ppt.original_country,
                ppt.destination_country,
                ppt.origin_info,
                ppt.destination_info,
                ppt.transit_time,
                ppt.stay_time,
                ppt.fulfilled_at,
                ppt.updated_at
                FROM $TABLE_TRACKING_ITEMS AS ppti
                LEFT JOIN $TABLE_TRACKING AS ppt ON ppt.id = ppti.tracking_id
                WHERE ppti.order_id=%d",
                $order_id
            )
        );
        // @codingStandardsIgnoreEnd

        $has_full_shipped = false;

        // get delete tracking_number
        $del_tracking_number = '';

        // Allow adjustment of quantity
        $is_enable_quantity = true;
        $current_tracking_items = [];
        if ($tracking_id) {
            foreach ($tracking_items as $item) {
                if ($item->tracking_id == $tracking_id) {
                    // get delete tracking_number
                    $del_tracking_number = $item->tracking_number ?? '';

                    $current_tracking_items[] = $item;
                    if (!$item->order_item_id) {
                        // $is_enable_quantity = false;
                        break;
                    }
                }
            }
        }

        foreach ($tracking_items as $item) {
            if ($item->tracking_id && empty($item->order_item_id)) {
                $has_full_shipped = true;
                break;
            }
        }

        // When adding the order number, check whether the order is fully shipped.
        if (!$tracking_id && $has_full_shipped) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], 'All items have been fulfilled', false);
        }

        // Get product information of current order
        $order_line_items = $this->get_order_item_data($order_id);
        $order_line_items_quantity_by_id = array_column($order_line_items, 'quantity', 'id');

        if ($is_enable_quantity) {
            // Adaptable quantity that can be shipped
            $shipment_line_items_quantity_by_id = self::get_items_quantity($tracking_id, $order_line_items_quantity_by_id, $shipment_line_items, $tracking_items);

            if (empty($shipment_line_items_quantity_by_id)) {
                (new ParcelPanelFunction)->parcelpanel_json_response([], 'All items have been fulfilled', false);
            }
        } else {
            // When the current order number contains goods shipped from the order, they are merged into one record.
            $shipment_line_items_quantity_by_id = [0 => 0];
        }

        $this->original_tracking_id = $tracking_id;

        // 是否拥有单号编辑权限
        $is_editable_tracking = false;
        try {
            $is_editable_tracking = $this->is_editable_tracking($order_id, $tracking_number);
        } catch (ShipmentNotFoundException $e) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], 'Shipment not found!', false);
        }
        if (!$is_editable_tracking) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], 'Tracking number already exists!', false);
        }

        // Check if the product changes
        $checkProUp = $this->checkProUp($tracking_items, $tracking_id, $shipment_line_items);

        $this->init_tracking_data($tracking_number, $courier_code, $fulfilled_at, $checkProUp, $order_id, $shipment_line_items, $del_tracking_number);
        if (empty($this->tracking_data)) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], 'Tracking number already exists!', false);
        }

        $_original_shipment = null;
        if (!empty($this->original_tracking_id)) {
            // @codingStandardsIgnoreStart
            // When tracking_id is the same, keep the original data
            if ($this->tracking_data->id === $this->original_tracking_id) {
                $_original_shipment = $wpdb->get_row($wpdb->prepare(
                    "SELECT shipment_status,custom_shipment_status,custom_status_time FROM $TABLE_TRACKING_ITEMS WHERE tracking_id=%d",
                    $this->original_tracking_id
                ));
            }
            $wpdb->delete($TABLE_TRACKING_ITEMS, ['order_id' => $order_id, 'tracking_id' => $this->original_tracking_id]);
            // @codingStandardsIgnoreEnd
        }
        foreach ($shipment_line_items_quantity_by_id as $_order_item_id => $_quantity) {
            $item_insert_data = [
                'order_id' => $order_id,
                'order_item_id' => $_order_item_id,
                'quantity' => $_quantity,
                'tracking_id' => $this->tracking_data->id,
                'shipment_status' => $this->tracking_data->shipment_status,
            ];
            if (!empty($_original_shipment)) {
                $item_insert_data['shipment_status'] = $_original_shipment->shipment_status;
                $item_insert_data['custom_status_time'] = $_original_shipment->custom_status_time;
                $item_insert_data['custom_shipment_status'] = $_original_shipment->custom_shipment_status;
            }
            $wpdb->insert($TABLE_TRACKING_ITEMS, $item_insert_data); // phpcs:ignore
        }

        self::adjust_unfulfilled_shipment_items($order_id);

        update_option(\ParcelPanel\OptionName\SHIPMENT_STATUS_DEFAULT, $mark_order_as);
        if ($mark_order_as) {
            self::update_order_status_to($order_id, $mark_order_as, [$this->tracking_data->id]);
        }

        if ($this->original_tracking_id) {
            $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str([$this->original_tracking_id], '%d');
            // @codingStandardsIgnoreStart
            $res = $wpdb->query(
                $wpdb->prepare(
                    "UPDATE {$TABLE_TRACKING} SET `sync_times` = 1 WHERE `id` IN ({$placeholder_str})",
                    [$this->original_tracking_id]
                )
            );
            // @codingStandardsIgnoreEnd
        }

        TrackingNumber::schedule_tracking_sync_action(-1);

        (new ParcelPanelFunction)->parcelpanel_json_response();
    }

    private function checkProUp($tracking_items, $tracking_id = '', $shipment_line_items = []): bool
    {

        // check pro change
        if (!empty($shipment_line_items)) {
            $checkProUp = false;
            $now_pro = [];
            foreach ($shipment_line_items as $v) {
                $id = $v['id'] ?? '';
                $quantity = $v['quantity'] ?? 0;
                if (empty($id)) {
                    continue;
                }
                $now_pro[$tracking_id] = $quantity;
            }
            $old_tracking_pro = [];
            foreach ($tracking_items as $v) {
                $tracking_id_old = $v->tracking_id ?? '';
                $order_item_id = $v->order_item_id ?? '';

                if (empty($tracking_id_old)) {
                    continue;
                }
                $quantity = $v->quantity ?? 0;
                $old_tracking_pro[$tracking_id_old] = $quantity;
            }
            foreach ($now_pro as $k => $v) {
                if (empty($old_tracking_pro[$k]) || $v != $old_tracking_pro[$k]) {
                    $checkProUp = true;
                    break;
                }
            }

            return $checkProUp;
        }

        $check = false;
        $checkF = [];
        $checkS = [];
        foreach ($tracking_items as $v) {
            if ($v->tracking_id) {
                $checkF[] = $v;
            } else {
                $checkS[] = $v;
            }
        }

        foreach ($checkF as $k => $v) {
            $order_item_id = $v->order_item_id ?? '';
            $quantity = $v->quantity ?? '';
            $c_order_item_id = $checkS[$k]->order_item_id ?? '';
            $c_quantity = $checkS[$k]->quantity ?? '';
            if ($order_item_id == $c_order_item_id && $quantity != $c_quantity) {
                $check = true;
                break;
            }
        }

        return $check;
    }

    /**
     * @throws \ParcelPanel\Exceptions\ShipmentNotFoundException
     */
    private function is_editable_tracking($order_id, $tracking_number): bool
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        if (empty($this->original_tracking_id)) {
            // is shipping.
            // @codingStandardsIgnoreStart
            $is_shipped = !!$wpdb->get_var(
                $wpdb->prepare(
                    "SELECT 1 FROM
                    (SELECT id FROM $TABLE_TRACKING WHERE tracking_number=%s) AS ppt
                    JOIN $TABLE_TRACKING_ITEMS AS ppti ON ppt.id=ppti.tracking_id
                    LIMIT 1",
                    $tracking_number,
                )
            );
            // @codingStandardsIgnoreEnd
            if ($is_shipped) {
                return false;
            }
        } else {
            // @codingStandardsIgnoreStart
            $is_valid_shipment = !!$wpdb->get_var(
                $wpdb->prepare(
                    "SELECT 1 FROM
                    $TABLE_TRACKING_ITEMS AS ppti
                    WHERE ppti.order_id=%d AND ppti.tracking_id=%d
                    LIMIT 1",
                    $order_id,
                    $this->original_tracking_id
                )
            );
            // @codingStandardsIgnoreEnd
            if (!$is_valid_shipment) {
                // Editing a non-existent shipment.
                throw new ShipmentNotFoundException();
            }

            // If the order number has been associated, data will be returned. If not, empty data will be returned.
            // @codingStandardsIgnoreStart
            $_tracking_id = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT ppti.tracking_id FROM
                    (SELECT id FROM $TABLE_TRACKING WHERE tracking_number=%s) AS ppt
                    JOIN $TABLE_TRACKING_ITEMS AS ppti ON ppt.id=ppti.tracking_id
                    LIMIT 1",
                    $tracking_number,
                )
            );
            // @codingStandardsIgnoreEnd
            if (!empty($_tracking_id) && $_tracking_id != $this->original_tracking_id) {
                // The current order number has been associated with other shipments.
                return false;
            }
        }

        return true;
    }

    /**
     * Get tracking item list
     */
    public function get_tracking_items_ajax()
    {
        check_ajax_referer('pp-get-shipment-item');

        $order_id = absint($_GET['order_id']);

        $wc_order = wc_get_order($order_id);

        // get order line items
        $order_line_items = $this->get_order_item_data($order_id);

        $shipment_items = self::get_shipment_items($order_id, true);

        $order_items_quantity = array_column($order_line_items, 'quantity', 'id');

        // is ship all product
        $isFullAll = false;

        $_shipments = [];
        foreach ($shipment_items as $shipment) {
            foreach ($shipment->line_items as $item) {
                $_shipment = $_shipments[] = new \stdClass;
                $_shipment->tracking_id = $shipment->tracking_id;
                $_shipment->order_item_id = $item['id'];
                $_shipment->quantity = $item['quantity'];

                if (empty($item['id'])) {
                    $isFullAll = true;
                }
            }
        }

        // 所有数量 - 已发货的数量，得出未发货的数量
        $quantity_by_id = self::items_sub_by_key(
            $order_items_quantity,
            self::get_shipped_items_qty($_shipments, $order_items_quantity)
        );

        foreach ($quantity_by_id as $order_item_id => $quantity) {
            foreach ($order_line_items as &$item) {
                if ($item['id'] === $order_item_id) {
                    $item['remain_quantity'] = $quantity;
                }
            }
        }

        if ($isFullAll) {
            foreach ($shipment_items as &$shipment) {
                if (empty($shipment->order_item_id)) {
                    $shipment->line_items = [];
                    foreach ($order_line_items as $v) {
                        $q = isset($v['remain_quantity']) ? $v['remain_quantity'] : $v['quantity'];
                        if ($q == 0) {
                            continue;
                        }
                        $shipment->line_items[] = [
                            'id' => $v['id'],
                            'quantity' => $q,
                        ];
                    }
                    $shipment->quantity = 1;
                    $shipment->ship_type = 0;
                }
            }
            foreach ($order_line_items as &$item) {
                $item['remain_quantity'] = 0;
            }
        }

        $order_number = '';
        if ($wc_order) {
            $order_number = $wc_order->get_order_number();
        }

        (new ParcelPanelFunction)->parcelpanel_json_response([
            'line_items' => $order_line_items,
            'shipments' => $shipment_items,
            'order_number' => $order_number,
        ]);
    }

    /**
     * Get order item detail
     */
    private function get_order_item_data($order_id)
    {
        $line_items = [];
        $order = wc_get_order($order_id);
        if (empty($order)) {
            return $line_items;
        }
        foreach ($order->get_items() as $item_key => $item) {
            $data = $item->get_data();
            $format_decimal = ['subtotal', 'subtotal_tax', 'total', 'total_tax', 'tax_total', 'shipping_tax_total'];

            // Format decimal values.
            foreach ($format_decimal as $key) {
                if (isset($data[$key])) {
                    $data[$key] = wc_format_decimal($data[$key], wc_get_price_decimals());
                }
            }

            // Add SKU and PRICE to products.
            if (is_callable([$item, 'get_product'])) {
                $data['sku'] = $item->get_product() ? $item->get_product()->get_sku() : null;
                $data['price'] = $item->get_quantity() ? $item->get_total() / $item->get_quantity() : 0;
            }

            // Add parent_name if the product is a variation.
            /** @var \WC_Product $product */
            if (is_callable([$item, 'get_product']) && $product = $item->get_product()) {
                if (is_callable([$product, 'get_parent_data'])) {
                    $data['parent_name'] = $product->get_title();
                } else {
                    $data['parent_name'] = null;
                }

                $image = wp_get_attachment_image_url($product->get_image_id(), 'woocommerce_thumbnail');
                if ($image) {
                    $data['image_url'] = $image;
                }
            }
            $line_items[] = $data;
        }

        return $line_items;
    }

    static function get_notice_html($content): string
    {
        $content = $content; // phpcs:ignore
        return "<script>jQuery.toastr.error(\"{$content}\")</script>";
    }

    public function shipment_item_delete_ajax()
    {
        check_ajax_referer('pp-delete-shipment-item');

        $order_id = absint($_POST['order_id'] ?? '');
        $tracking_id = absint($_POST['tracking_id'] ?? '');

        if ($tracking_id <= 0 || $order_id <= 0) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], __('Invalid parameters.', 'parcelpanel'), false);
        }

        self::delete_tracking_item($tracking_id, $order_id);

        (new ParcelPanelFunction)->parcelpanel_json_response([], __('Deleted successfully', 'parcelpanel'));
    }

    /**
     * 单号入库
     *
     * @param string $tracking_number 运单号码
     * @param string $courier_code 运输商简码
     * @param int $fulfilled_at 时间戳
     *
     * @return bool|\WP_Error
     */
    public function init_tracking_data(string $tracking_number, string $courier_code = '', int $fulfilled_at = 0, bool $checkProUp = false, $order_id = 0, $shipment_line_items = [], $del_tracking_number = '')
    {
        global $wpdb;

        unset($this->tracking_data);

        $TABLE_TRACKING = Table::$tracking;

        // @codingStandardsIgnoreStart
        $tracking_data = $wpdb->get_row($wpdb->prepare(
            "SELECT id,tracking_number,courier_code,shipment_status,sync_times,fulfilled_at,updated_at FROM $TABLE_TRACKING WHERE tracking_number=%s",
            $tracking_number
        ));
        // @codingStandardsIgnoreEnd

        if (empty($tracking_data)) {
            $tracking_item_data = self::get_tracking_item_data($tracking_number, $courier_code, $fulfilled_at);
            $res = $wpdb->insert($TABLE_TRACKING, $tracking_item_data); // phpcs:ignore
            if (false === $res) {
                // 数据库问题，可能是单号重复
                $error = $wpdb->last_error;
                return new \WP_Error('db_error', '', $error);
            }

            $this->tracking_data = $tracking_data = new \stdClass();
            $tracking_data->id = $wpdb->insert_id;
            $tracking_data->tracking_number = $tracking_number;
            $tracking_data->courier_code = $courier_code;
            $tracking_data->shipment_status = 1;
            $tracking_data->sync_times = 0;
            $tracking_data->fulfilled_at = $tracking_item_data['fulfilled_at'];
            $tracking_data->updated_at = $tracking_item_data['updated_at'];

            // add shipment data message
            $order_message = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'shipment_line_items' => $shipment_line_items,
                'courier_code' => $courier_code,
                'fulfilled_at' => $fulfilled_at,
                'del_tracking_number' => $del_tracking_number,
            ];
            Common::instance()->shipmentChange($order_message, 1);
            return true;
        }

        $tracking_data->id = (int)$tracking_data->id;
        $tracking_data->shipment_status = (int)$tracking_data->shipment_status;
        $tracking_data->sync_times = (int)$tracking_data->sync_times;
        $tracking_data->fulfilled_at = (int)$tracking_data->fulfilled_at;
        $tracking_data->updated_at = (int)$tracking_data->updated_at;

        $_update_tracking_data = [];
        if ($tracking_data->courier_code != $courier_code) {
            // 修改了运输商需要重新同步单号
            $_update_tracking_data['courier_code'] = $courier_code;
            $_update_tracking_data['shipment_status'] = 1;
            $_update_tracking_data['last_event'] = null;
            $_update_tracking_data['original_country'] = '';
            $_update_tracking_data['destination_country'] = '';
            $_update_tracking_data['origin_info'] = null;
            $_update_tracking_data['destination_info'] = null;
            $_update_tracking_data['transit_time'] = 0;
            $_update_tracking_data['stay_time'] = 0;
            $_update_tracking_data['sync_times'] = 0;
            $_update_tracking_data['received_times'] = 0;
        }
        if ($tracking_data->fulfilled_at != $fulfilled_at) {
            $_update_tracking_data['fulfilled_at'] = $fulfilled_at;
            $_update_tracking_data['sync_times'] = 0;
        }
        if ($checkProUp) {
            $_update_tracking_data['sync_times'] = 0;
        }
        if (0 < $tracking_data->sync_times) {
            // 重置同步次数
            $_update_tracking_data['sync_times'] = 0;
        }
        if (!empty($_update_tracking_data)) {
            $_update_tracking_data['updated_at'] = time();

            $res = $wpdb->update($TABLE_TRACKING, $_update_tracking_data, ['id' => $tracking_data->id]); // phpcs:ignore

            if (false === $res) {
                $error = $wpdb->last_error;
                return new \WP_Error('db_error', '', $error);
            }

            // update shipment data message
            $order_message = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'shipment_line_items' => $shipment_line_items,
                'courier_code' => $courier_code,
                'fulfilled_at' => $fulfilled_at,
                'del_tracking_number' => $del_tracking_number,
            ];
            Common::instance()->shipmentChange($order_message, 2);
        }

        $this->tracking_data = $tracking_data;

        return true;
    }

    /**
     * Store the order number and synchronize it to the cloud
     *
     * @param int|null $order_id
     * @param null $tracking_number
     * @param string|null $courier_code Leave blank for automatic recognition
     * @param null $fulfilled_at timestamp
     *
     * @return int|\WP_Error|null
     */
    static function save_tracking_item(int $order_id = 0, $tracking_number = null, $courier_code = null, $fulfilled_at = null)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TACKING_ITEMS = Table::$tracking_items;

        $wpdb->hide_errors();

        // transaction processing
        wc_transaction_query();

        // Pay attention to maintenance ShopOrder::$tracking_id
        if (self::$tracking_id) {
            /* Update order number */

            // Check whether the order number is associated with this order
            // @codingStandardsIgnoreStart
            $shipment = $wpdb->get_row($wpdb->prepare("SELECT * FROM $TABLE_TACKING_ITEMS WHERE order_id=%d AND tracking_id=%d LIMIT 1", $order_id, self::$tracking_id));
            // @codingStandardsIgnoreEnd

            if (empty($shipment)) {
                // If the original associated data is canceled, it can be used as a new associated order number.
                self::$tracking_id = null;
                // return new \WP_Error( 'tracking_save_error', __( 'Tracking number not found.', 'parcelpanel' ) );
            } else {

                // Query old data
                $tracking_item = self::get_tracking_item_by_id(self::$tracking_id);

                // If the original order number data cannot be queried, an error will be reported.
                if (empty($tracking_item)) {
                    self::$tracking_id = null;
                    return new \WP_Error('tracking_save_error', __('Tracking data not found.', 'parcelpanel'));
                }

                // The order number in the original data currently being edited
                $_tracking_number = $tracking_item->tracking_number;
            }
        }

        // $_tracking_number is empty, indicating that the first condition has not been entered, and it belongs to adding a new order number.
        // When the old order number is different from the new order number, it is also regarded as adding a new order number.
        if (empty($_tracking_number) || $_tracking_number != $tracking_number) {
            /* Check new order number */

            if (!empty($shipment->order_item_id)) {
                // Modifying the tracking number of "Product Shipping" is not supported.
                return new \WP_Error('tracking_save_error', __('Unsupported operation.', 'parcelpanel'));
            }
            // @codingStandardsIgnoreStart
            $tracking_item = $wpdb->get_row($wpdb->prepare("SELECT * FROM $TABLE_TRACKING WHERE tracking_number=%s", $tracking_number));
            // @codingStandardsIgnoreEnd
            if (!empty($tracking_item)) {

                // Check whether the order number has been associated
                // @codingStandardsIgnoreStart
                $shipment_exists = !!$wpdb->get_var($wpdb->prepare("SELECT 1 FROM $TABLE_TACKING_ITEMS WHERE tracking_id=%d LIMIT 1", $tracking_item->id));
                // @codingStandardsIgnoreEnd

                if ($shipment_exists) {
                    return new \WP_Error('tracking_save_error', __('Tracking number already exists!', 'parcelpanel'));
                }
            }
        }

        if (!empty($tracking_item)) {
            /* Update order number */

            $_tracking_id = $tracking_item->id;
            $_courier_code = $tracking_item->courier_code;
            $_shipment_status = $tracking_item->shipment_status;
            $_fulfilled_at = $tracking_item->fulfilled_at;
            $_sync_times = $tracking_item->sync_times;

            $_update_tracking_data = [];

            if ($_courier_code != $courier_code) {
                // Modified the need for carriers to resynchronize tracking numbers
                $_update_tracking_data['courier_code'] = $courier_code;
                $_update_tracking_data['shipment_status'] = 1;
                $_update_tracking_data['last_event'] = null;
                $_update_tracking_data['original_country'] = '';
                $_update_tracking_data['destination_country'] = '';
                $_update_tracking_data['origin_info'] = null;
                $_update_tracking_data['destination_info'] = null;
                $_update_tracking_data['transit_time'] = 0;
                $_update_tracking_data['stay_time'] = 0;
                $_update_tracking_data['sync_times'] = 0;
                $_update_tracking_data['received_times'] = 0;
            }
            if ($_fulfilled_at != $fulfilled_at) {
                $_update_tracking_data['fulfilled_at'] = $fulfilled_at;
            }
            if (-1 != $_sync_times) {
                // Reset sync count
                $_update_tracking_data['sync_times'] = 0;
            }

            if (!empty($_update_tracking_data)) {
                /* Update order number */

                $_update_tracking_data['updated_at'] = time();

                $res = $wpdb->update($TABLE_TRACKING, $_update_tracking_data, ['id' => $_tracking_id]); // phpcs:ignore

                if (false === $res) {
                    $error = $wpdb->last_error;
                    wc_transaction_query('rollback');
                    return new \WP_Error('db_error', '', $error);
                }

                TrackingNumber::schedule_tracking_sync_action(-1);
            }

            // @codingStandardsIgnoreStart
            if (empty(self::$tracking_id)) {
                /* Already associated with a tracking number */

                $wpdb->insert($TABLE_TACKING_ITEMS, [
                    'order_id' => $order_id,
                    'order_item_id' => 0,
                    'quantity' => 0,
                    'tracking_id' => $_tracking_id,
                    'shipment_status' => $_shipment_status,
                ]);
                // Remove all unshipped data
                $wpdb->delete($TABLE_TACKING_ITEMS, ['order_id' => $order_id, 'tracking_id' => 0]);
            } else {
                /* Change order number: Correct the associated order number */
                $wpdb->update($TABLE_TACKING_ITEMS, ['tracking_id' => $_tracking_id, 'shipment_status' => $_shipment_status, 'custom_status_time' => '{}', 'custom_shipment_status' => 0], ['tracking_id' => self::$tracking_id]);
            }
            // @codingStandardsIgnoreEnd
            self::$tracking_id = $_tracking_id;

            wc_transaction_query('commit');

            if (-1 == $_sync_times && !isset($_update_tracking_data['courier_code'])) {

                $delivery_status = (new ParcelPanelFunction)->parcelpanel_get_shipment_status($_shipment_status);

                if (4 == $_shipment_status) {
                    /* Arrived status */

                    $org_trackinfo = (array)json_decode($tracking_item->origin_info, 1)['trackinfo'] ?? [];
                    $dst_trackinfo = (array)json_decode($tracking_item->destination_info, 1)['trackinfo'] ?? [];
                    $trackinfo = array_merge($org_trackinfo, $dst_trackinfo);

                    // 2 days ago
                    $before_two_day = strtotime('-2 day midnight');

                    foreach ($trackinfo as $item) {

                        $checkpoint_delivery_status = $item['checkpoint_delivery_status'] ?? '';

                        if ('delivered' == $checkpoint_delivery_status) {

                            $checkpoint_time = strtotime($item['checkpoint_date'] ?? '') ?: 0;

                            if ($before_two_day <= $checkpoint_time) {
                                /* within the statute of limitations */

                                WC()->mailer();

                                // send email
                                do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$_tracking_id]);
                            }

                            break;
                        }
                    }
                } else {

                    WC()->mailer();

                    // send email
                    do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$_tracking_id]);
                }
            }

            return true;
        }

        /* Add order number */

        $data = self::get_tracking_item_data($tracking_number, $courier_code, $fulfilled_at);

        if (empty($data)) {
            return null;
        }

        // Write to database
        $res = $wpdb->insert($TABLE_TRACKING, $data); // phpcs:ignore

        if (false === $res) {
            // Database problem, possibly duplicate numbers
            $error = $wpdb->last_error;
            wc_transaction_query('rollback');
            return new \WP_Error('db_error', '', $error);
        }

        $new_tracking_id = $wpdb->insert_id;

        // @codingStandardsIgnoreStart
        if (!empty(self::$tracking_id)) {
            /* Change order number: Correct the associated order number */
            $wpdb->update($TABLE_TACKING_ITEMS, ['tracking_id' => $new_tracking_id, 'shipment_status' => 1, 'custom_status_time' => '{}', 'custom_shipment_status' => 0], ['tracking_id' => self::$tracking_id]);
        } else {
            /* Add order number: add related information */
            $wpdb->insert($TABLE_TACKING_ITEMS, [
                'order_id' => $order_id,
                'order_item_id' => 0,
                'quantity' => 0,
                'tracking_id' => $new_tracking_id,
                'shipment_status' => 1,
            ]);

            // Remove all unshipped data
            $wpdb->delete($TABLE_TACKING_ITEMS, ['order_id' => $order_id, 'tracking_id' => 0]);
        }
        // @codingStandardsIgnoreEnd


        self::$tracking_id = $new_tracking_id;

        TrackingNumber::schedule_tracking_sync_action(-1);

        wc_transaction_query('commit');
        return true;
    }

    /**
     * Get the quantity of shipped items
     *
     * @param \stdClass[] $shipments {tracking_id, order_item_id, quantity}
     * @param array $order_items_quantity
     *
     * @return array
     */
    public static function get_shipped_items_qty(array $shipments, array $order_items_quantity = []): array
    {
        // order_item_id => quantity
        $quantity_by_id = [];

        // Whether order delivery is included
        $has_full_shipped = false;
        // All shipped items
        $is_full_quantity_item_shipped = [];

        foreach ($shipments as $shipment) {
            if (!$shipment->tracking_id) {
                continue;
            }
            if (!$shipment->order_item_id) {
                $has_full_shipped = true;
                break;
            }
            if (!$shipment->quantity) {
                $is_full_quantity_item_shipped[$shipment->order_item_id] = true;
            }
        }
        foreach ($shipments as $shipment) {
            if (empty($shipment->tracking_id)) {
                continue;
            }
            if (!array_key_exists($shipment->order_item_id, $quantity_by_id)) {
                $quantity_by_id[$shipment->order_item_id] = 0;
            }
            $quantity_by_id[$shipment->order_item_id] += $shipment->quantity;
        }

        // if ($has_full_shipped) {
        //     return $order_items_quantity;
        // }

        foreach ($is_full_quantity_item_shipped as $order_item_id => $is_full_quantity) {
            if (!$is_full_quantity || !array_key_exists($order_item_id, $order_items_quantity)) {
                continue;
            }
            // Assign the value to the maximum value of the current order item quantity
            $quantity_by_id[$order_item_id] = $order_items_quantity[$order_item_id];
        }

        return $quantity_by_id;
    }

    /**
     * Get an Unfulfilled element
     *
     * @param $shipments
     *
     * @return \stdClass|null
     */
    public static function find_unfulfilled_shipment($shipments): ?\stdClass
    {
        foreach ($shipments as $shipment) {
            if (empty($shipment->tracking_id)) {
                return $shipment;
            }
        }
        return null;
    }

    /**
     * Get items whose quantity is greater than zero
     *
     * @param $data
     *
     * @return array
     */
    public static function find_gt0_items($data)
    {
        return array_filter($data, function ($v) {
            return 0 < $v;
        });
    }

    public static function get_order_items_quantity($order_id): array
    {
        $wc_order = wc_get_order($order_id);
        $order_items_quantity = [];
        foreach ($wc_order->get_items() as $item) {
            $order_items_quantity[$item->get_id()] = $item->get_quantity();
        }

        return $order_items_quantity;
    }

    /**
     * Subtracts the items2 from the items1 by key.
     *
     * @param array $items1
     * @param array $items2
     *
     * @return array
     */
    public static function items_sub_by_key(array $items1, array $items2): array
    {
        $result = [];
        foreach ($items1 as $key1 => $item1) {
            $result[$key1] = $item1 - ($items2[$key1] ?? 0);
        }
        return $result;
    }

    /**
     * delete shipments
     */
    static function delete_tracking_item($tracking_id = 0, $order_id = 0, $tracking_number = ''): bool
    {
        global $wpdb;

        wc_transaction_query();

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        if ($tracking_id) {

            // @codingStandardsIgnoreStart
            $res = $wpdb->delete($TABLE_TRACKING_ITEMS, ['order_id' => $order_id, 'tracking_id' => $tracking_id]);
            self::adjust_unfulfilled_shipment_items($order_id);
            wc_transaction_query('commit');

            $tracking_item = $wpdb->get_row($wpdb->prepare("SELECT tracking_number,sync_times FROM $TABLE_TRACKING WHERE id=%d", $tracking_id));
            // @codingStandardsIgnoreEnd
            $tracking_number = $tracking_item->tracking_number;
            // $payloads[] = [
            //     'delete' => true,
            //     'order_id' => $order_id,
            //     'tracking_number' => $tracking_number,
            //     'order_number' => 'order_number',
            //     'courier_code' => '',
            //     'fulfilled_at' => '',
            //     'order' => [],
            // ];

            // 个体 Order data
            $order = wc_get_order($order_id);
            $orderData = Orders::get_formatted_item_data($order);
            $order_ids = [$order_id];
            $order_tracking_data = Orders::get_tracking_data_by_order_id($order_ids);
            $orderData['tracking'] = $order_tracking_data[$order_id];
            $payloads[$order_id] = [
                'order' => $orderData,
            ];
            // delete tracking number
            Api::add_tracking($payloads);

            if ($res) {
                // del shipment data message
                $order_message = [
                    'order_id' => $order_id,
                    'tracking_number' => $tracking_number,
                ];
                Common::instance()->shipmentChange($order_message, 3);
            }

            return true;
        }

        if ($tracking_id) {

            $where = ['id' => $tracking_id];
            // @codingStandardsIgnoreStart
            $tracking_item = $wpdb->get_row($wpdb->prepare("SELECT tracking_number,sync_times FROM $TABLE_TRACKING WHERE id=%d", $tracking_id));
            // @codingStandardsIgnoreEnd
            $tracking_number = $tracking_item->tracking_number;
            $_sync_times = $tracking_item->sync_times;
        } elseif ($order_id && $tracking_number) {
            $where = ['order_id' => $order_id, 'tracking_number' => $tracking_number];
        } else {
            return false;
        }

        $result = $wpdb->delete($TABLE_TRACKING, $where); // phpcs:ignore

        if ($result) {
            // del shipment data message
            $order_message = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
            ];
            Common::instance()->shipmentChange($order_message, 3);
        }

        $is_deleted = $result > 0;

        if ($is_deleted && !empty($tracking_number) && (!empty($_sync_times) && -1 == $_sync_times)) {
            $resp = null;
            for ($i = 0; $i < 10; $i++) {
                $resp = Api::delete_tracking($tracking_number);
                if (is_wp_error($resp)) {
                    $api_err_msg = $resp->get_error_message('api_error');
                    if ('Tracking number not found.' == $api_err_msg) {
                        $resp = null;
                        break;
                    }
                    usleep(5e5);
                } else {
                    // parcelpanel_log( 'api delete_tracking success' );
                    break;
                }
            }
            if (is_wp_error($resp)) {
                wc_transaction_query('rollback');
                return false;
            }
        }

        wc_transaction_query('commit');

        return $is_deleted;
    }

    public static function adjust_unfulfilled_shipment_items($order_id)
    {
        global $wpdb;

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;
        // @codingStandardsIgnoreStart
        $_shipments = $wpdb->get_results($wpdb->prepare(
            "SELECT *
            FROM $TABLE_TRACKING_ITEMS
            WHERE order_id=%d",
            $order_id
        ));
        // @codingStandardsIgnoreEnd
        if (empty($_shipments)) {
            // No delivery, initialize item
            $wpdb->insert($TABLE_TRACKING_ITEMS, ['order_id' => $order_id]); // phpcs:ignore
            return;
        }
        $is_adjust_quantity = true;
        $is_full_quantity_item_shipped = [];
        foreach ($_shipments as $_shipment) {
            if (!$_shipment->tracking_id) {
                continue;
            }
            if (!$_shipment->order_item_id) {
                $is_adjust_quantity = false;
                break;
            }
            if (!$_shipment->quantity) {
                $is_full_quantity_item_shipped[$_shipment->order_item_id] = true;
            }
        }

        // Clear 0 order number for shipment
        $wpdb->delete($TABLE_TRACKING_ITEMS, ['order_id' => $order_id, 'tracking_id' => 0]); // phpcs:ignore

        if (!$is_adjust_quantity) {
            return;
        }

        $order_items_quantity = self::get_order_items_quantity($order_id);

        // All Quantities - Quantities shipped, resulting in unshipped quantities
        $quantity_by_id = self::items_sub_by_key(
            $order_items_quantity,
            self::get_shipped_items_qty($_shipments, $order_items_quantity)
        );
        $quantity_by_id = self::find_gt0_items($quantity_by_id);

        $no_tracking_shipment = self::find_unfulfilled_shipment($_shipments);
        $no_tracking_shipment_status = $no_tracking_shipment->shipment_status ?? 1;
        $no_tracking_custom_status_time = $no_tracking_shipment->custom_status_time ?? '';
        $no_tracking_custom_shipment_status = $no_tracking_shipment->custom_shipment_status ?? 0;

        foreach ($quantity_by_id as $id => $quantity) {
            // @codingStandardsIgnoreStart
            $wpdb->insert($TABLE_TRACKING_ITEMS, [
                'order_id' => $order_id,
                'order_item_id' => $id,
                'quantity' => $quantity,
                'shipment_status' => $no_tracking_shipment_status,
                'custom_status_time' => $no_tracking_custom_status_time,
                'custom_shipment_status' => $no_tracking_custom_shipment_status,
            ]);
            // @codingStandardsIgnoreEnd
        }
    }

    /**
     * Generate tracking item formatted data
     */
    static function get_tracking_item_data($tracking_number = null, $courier_code = null, $fulfilled_at = null): array
    {
        $data = [];

        is_null($tracking_number) || $data['tracking_number'] = $tracking_number;
        is_null($courier_code) || $data['courier_code'] = $courier_code;
        is_null($fulfilled_at) || $data['fulfilled_at'] = $fulfilled_at ?: time();
        // is_null( $shipment_status ) || $data[ 'shipment_status' ] = $shipment_status;

        if (!empty($data)) {
            // $data[ 'shipment_status' ] = 1;
            $data['updated_at'] = time();
        }

        return $data;
    }


    /**
     * Updated order status to Completed
     */
    static function update_order_status_to_completed($order_id)
    {
        $order = wc_get_order($order_id);
        $order_status = '';
        if (is_a($order, 'WC_Order')) {
            $order_status = $order->get_status() ?? '';
        }
        if ('completed' != $order_status && !empty($order_status)) {
            // parcelpanel_log( "mark order as completed:{$order_id}" );
            $order->update_status('completed');
        }
    }

    /**
     * Updated order status to partial-shipped
     */
    static function update_order_status_to_partial_shipped($order_id, $parcelpanel_fulfill_workflow = [])
    {
        if (empty($parcelpanel_fulfill_workflow)) {
            $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
        }
        $partially_shipped_type = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;

        if ($partially_shipped_type == 1) {
            $order = wc_get_order($order_id);
            $order_status = '';
            if (is_a($order, 'WC_Order')) {
                $order_status = $order->get_status() ?? '';
            }
            if ('partial-shipped' != $order_status && !empty($order_status)) {
                $order->update_status('partial-shipped');
            }
        }
    }

    /**
     * Updated order status to shipped
     */
    static function update_order_status_to_shipped($order_id, $parcelpanel_fulfill_workflow = [])
    {
        if (empty($parcelpanel_fulfill_workflow)) {
            $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
        }
        $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;

        if ($shipped_type == 1) {
            $order = wc_get_order($order_id);
            $order_status = '';
            if (is_a($order, 'WC_Order')) {
                $order_status = $order->get_status() ?? '';
            }
            if ('shipped' != $order_status && !empty($order_status)) {
                $order->update_status('shipped');
            }
        }
    }

    /**
     * Updated order status to delivered
     */
    static function update_order_status_to_delivered($order_id, $parcelpanel_fulfill_workflow = [])
    {
        if (empty($parcelpanel_fulfill_workflow)) {
            $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
        }
        $delivered_type = $parcelpanel_fulfill_workflow['delivered_type'] ?? 0;

        if ($delivered_type == 1) {
            $order = wc_get_order($order_id);
            $order_status = '';
            if (is_a($order, 'WC_Order')) {
                $order_status = $order->get_status() ?? '';
            }
            if ('delivered' != $order_status && !empty($order_status)) {
                $order->update_status('delivered');
            }
        }
    }

    public static function update_order_status_to($order_id, $status, $tracking_ids = [])
    {
        $order = wc_get_order($order_id);
        if (!$order) {
            return;
        }

        if ($status == 'partial-shipped' && !empty($tracking_ids)) {
            update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), array_values($tracking_ids));
        } else {
            update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), []);
        }

        $previous_order_status = '';
        if (is_a($order, 'WC_Order')) {
            $previous_order_status = $order->get_status() ?? '';
        }

        if ($previous_order_status != $status) {
            $order->update_status($status);
        } elseif ($status == 'partial-shipped') {
            // email trigger
            $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
            $partially_shipped_type = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;
            $partially_shipped_enable_email = $parcelpanel_fulfill_workflow['partially_shipped_enable_email'] ?? 0;

            if ($partially_shipped_type == 1 && $partially_shipped_enable_email) {
                WC()->mailer()->emails['WC_Email_Customer_Partial_Shipped_Order']->trigger($order_id, $order);
            }
        } elseif ($status == 'shipped') {
            // email trigger
            $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
            $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
            $shipped_enable_email = $parcelpanel_fulfill_workflow['shipped_enable_email'] ?? 0;
            if ($shipped_type == 1 && $shipped_enable_email) {
                WC()->mailer()->emails['WC_Email_Customer_Shipped_Order']->trigger($order_id, $order);
            }
        }
    }


    /**
     * Render shipping status dropdown filter list
     */
    function filter_orders_by_shipment_status()
    {
        global $typenow;

        if ('shop_order' === $typenow) {

            $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses(true);

            echo '<select name="_pp_shop_order_shipment_status" id="pp-dropdown_shop_order_shipment_status"><option value="">';
            esc_html_e('Shipment status', 'pancelpanel');
            echo '</option>';

            foreach ($shipment_statuses as $shipment_status) {
                echo '<option value="' . esc_attr($shipment_status['id']) . '" ';
                echo esc_attr(isset($_GET['_pp_shop_order_shipment_status']) ? selected($shipment_status['id'], wc_clean($_GET['_pp_shop_order_shipment_status']), false) : ''); // phpcs:ignore
                echo '>' . esc_html($shipment_status['text']) . '</option>';
            }

            echo '</select>';
        }
    }

    // compatible with HPOS
    function filter_orders_by_shipment_status_HPOS($order_type)
    {
        if ('shop_order' === $order_type) {

            $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses(true);

            echo '<select name="_pp_shop_order_shipment_status" id="pp-dropdown_shop_order_shipment_status"><option value="">';
            esc_html_e('Shipment status', 'pancelpanel');
            echo '</option>';

            foreach ($shipment_statuses as $shipment_status) {
                echo '<option value="' . esc_attr($shipment_status['id']) . '" ';
                echo esc_attr(isset($_GET['_pp_shop_order_shipment_status']) ? selected($shipment_status['id'], wc_clean($_GET['_pp_shop_order_shipment_status']), false) : ''); // phpcs:ignore
                echo '>' . esc_html($shipment_status['text']) . '</option>';
            }

            echo '</select>';
        }
    }

    /**
     * Filter orders by shipping status criteria
     */
    function filter_orders_by_shipment_status_query($args)
    {
        global $typenow, $wpdb;

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // @codingStandardsIgnoreStart
        if ('shop_order' === $typenow && isset($_GET['_pp_shop_order_shipment_status']) && '' != $_GET['_pp_shop_order_shipment_status']) {

            $order_ids = $wpdb->get_col($wpdb->prepare("SELECT order_id FROM $TABLE_TRACKING_ITEMS WHERE `shipment_status` = %d", $_GET['_pp_shop_order_shipment_status']));

            $post__in = $args['post__in'] ?? [];

            /*
             * As post__in will be used to only get sticky posts,
             * we have to support the case where post__in was already
             * specified.
             */
            $args['post__in'] = $post__in ? array_intersect($order_ids, $post__in) : $order_ids;

            /*
             * If we intersected, but there are no post IDs in common,
             * WP_Query won't return "no posts" for post__in = array()
             * so we have to fake it a bit.
             */
            if (!$args['post__in']) {
                $args['post__in'] = [0];
            }
        }
        // @codingStandardsIgnoreEnd

        return $args;
    }

    // compatible with HPOS
    function filter_orders_by_shipment_status_query_HPOS($args)
    {
        global $typenow, $wpdb;

        $screen = get_current_screen();

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // @codingStandardsIgnoreStart
        if ('woocommerce_page_wc-orders' === $screen->base && isset($_GET['_pp_shop_order_shipment_status']) && '' != $_GET['_pp_shop_order_shipment_status']) {

            $order_ids = $wpdb->get_col($wpdb->prepare("SELECT order_id FROM $TABLE_TRACKING_ITEMS WHERE `shipment_status` = %d", $_GET['_pp_shop_order_shipment_status']));

            $post__in = $args['post__in'] ?? [];

            /*
             * As post__in will be used to only get sticky posts,
             * we have to support the case where post__in was already
             * specified.
             */
            $args['post__in'] = $post__in ? array_intersect($order_ids, $post__in) : $order_ids;

            /*
             * If we intersected, but there are no post IDs in common,
             * WP_Query won't return "no posts" for post__in = array()
             * so we have to fake it a bit.
             */
            if (!$args['post__in']) {
                $args['post__in'] = [0];
            }
        }
        // @codingStandardsIgnoreEnd
        return $args;
    }

    /**
     * Add custom column headers to the Orders page
     */
    function add_shop_order_columns_header($columns)
    {
        $columns['pp_tracking_number'] = __('Tracking number', 'parcelpanel');
        $columns['pp_shipment_status'] = __('Shipment status', 'parcelpanel');

        return $columns;
    }

    /**
     * Render the Orders page and customize the contents of the columns
     *
     * @param $column
     *
     * @author Mark
     * @date   2021/7/30 12:28
     */
    function render_shop_order_columns($column)
    {
        global $post;

        $columnsContent = [
            'pp_shipment_status' => [$this, 'get_shipment_status_column_content'],
            'pp_tracking_number' => [$this, 'get_tracking_number_column_content'],
        ];

        isset($columnsContent[$column]) && call_user_func($columnsContent[$column], $post->ID);
    }

    // compatible with HPOS
    function render_woocommerce_page_order_columns($column, $order)
    {
        $columnsContent = [
            'pp_shipment_status' => [$this, 'get_shipment_status_column_content'],
            'pp_tracking_number' => [$this, 'get_tracking_number_column_content'],
        ];

        isset($columnsContent[$column]) && call_user_func($columnsContent[$column], $order->get_id());
    }

    /**
     * shipment_status column content
     *
     * @param $order_id
     *
     * @author Mark
     * @date   2021/7/30 12:26
     */
    function get_shipment_status_column_content($order_id)
    {
        $order = new \WC_Order($order_id);
        $_sync_status = (int)$order->get_meta('_parcelpanel_sync_status');

        $is_no_quota = $_sync_status === self::SYNC_STATUS_NO_QUOTA;

        $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses();

        $tracking_items = self::get_tracking_items($order_id);

        if (!$tracking_items) {
            echo '-';
            return;
        }

        echo '<ul class="pp-shipment-status-list">';

        $track_info_text_max_length = 50;

        foreach ($tracking_items as $key => $tracking_item) {

            if ($is_no_quota) {
                $shipment_status = 'noquota';
                $shipment_text = '0 Quota Available';
            } else {
                $shipment_status = (new ParcelPanelFunction)->parcelpanel_get_shipment_status($tracking_item->shipment_status);
                $shipment_text = $shipment_statuses[$shipment_status]['text'];
            }

            $ellipsis = isset($tracking_item->last_event[$track_info_text_max_length + 1]) ? '…' : '';

            echo '<li>';

            if (!$shipment_status) {
                echo '-</li>';
                continue;
            }

            echo '<span class="pp-tracking-icon icon-default icon-' . esc_attr($shipment_status) . ' pp-shipment-tracking-status">';
            echo esc_html($shipment_text);
            echo "</span>";

            echo '<span class="track-info pp-tips" title="' . esc_html($tracking_item->last_event) . '">';

            if ($tracking_item->last_event) {
                echo esc_html(mb_substr($tracking_item->last_event, 0, $track_info_text_max_length));
                echo esc_html($ellipsis);
            } else {
                echo '-';
            }
            echo '</span>';

            echo '</li>';
        }

        echo '</ul>';
    }

    /**
     * tracking_number column content
     *
     * @param $order_id
     *
     * @author Mark
     * @date   2021/7/30 12:25
     */
    function get_tracking_number_column_content($order_id)
    {
        $tracking_items = self::get_tracking_items($order_id);
        if (!$tracking_items) {
            echo '–';
            return;
        }

        echo '<ul class="pp-tracking-number-list">';

        $order = wc_get_order($order_id);
        $order_number = $order->get_order_number();
        $email = $order->get_billing_email();

        $tracking_by_order = (new ParcelPanelFunction)->parcelpanel_get_track_page_url(false, "#{$order_number}", $email);
        $tracking_page_settings = \ParcelPanel\Models\TrackingSettings::instance()->get_settings();
        $display_option = $tracking_page_settings['display_option'];
        $b_od_nb_a_em = !empty($display_option['b_od_nb_a_em']) ? $display_option['b_od_nb_a_em'] : false; // track by order
        $b_tk_nb = !empty($display_option['b_tk_nb']) ? $display_option['b_tk_nb'] : false; // track by number

        foreach ($tracking_items as $tracking_item) {

            $courier_name = 'Unknown';

            $courier_code = $tracking_item->courier_code;
            $tracking_number = $tracking_item->tracking_number;
            if (!$tracking_number) {
                echo '<li>-</li>';
                continue;
            }

            if ($courier_code) {
                $courier_info = (new ParcelPanelFunction)->parcelpanel_get_courier_info($courier_code);
                $courier_name = $courier_info->name ?? $courier_code;
            }

            // $track_url = (new ParcelPanelFunction)->parcelpanel_get_track_page_url_by_tracking_number($tracking_number);
            $tracking_by_num = (new ParcelPanelFunction)->parcelpanel_get_track_page_url_by_tracking_number($tracking_number);
            $track_url = $tracking_by_order;
            if ($b_tk_nb && !empty($tracking_number)) {
                $track_url = $tracking_by_num;
            }

            echo '<li><div><b>';
            echo esc_html($courier_name) . '</b></div><a href="' . esc_url($track_url) . '" target="_blank">';
            echo esc_html($tracking_number);
            echo '</a></li>';
        }

        echo '</ul>';
    }


    public function new_order($order_id)
    {
        $order = wc_get_order($order_id);

        $order_status = '';
        if ($order) {
            $order_status = $order->get_status() ?? '';
        }
        if (in_array($order_status, ["auto-draft", 'pending', 'on-hold']) || empty($order_status)) {
            return;
        }
        $update_order_ids_cache[] = $order_id;

        $this->sync_order('', $update_order_ids_cache);
    }

    public function wc_update_order($order_id)
    {

        // 检查订单是否已经处理过
        if (in_array($order_id, $this->processed_order_ids)) {
            return;
        }

        $order = wc_get_order($order_id);

        $order_status = '';
        if (is_a($order, 'WC_Order')) {
            $order_status = $order->get_status() ?? '';
        }

        if (in_array($order_status, ["auto-draft", 'pending', 'on-hold']) || empty($order_status)) {
            return;
        }
        // 将订单ID添加到处理过的订单列表中
        $this->processed_order_ids[] = $order_id;

        $update_order_ids_cache[] = $order_id;

        $this->sync_order('', $update_order_ids_cache);
    }


    /**
     * del ShopOrder
     *
     * delete order sync update to pp wc 
     */
    static function delete_shop_order($postId, $post = null)
    {
        global $wpdb;

        if (empty($post->post_type) || 'shop_order' != $post->post_type) {
            return;
        }

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;
        // @codingStandardsIgnoreStart
        $res = $wpdb->query($wpdb->prepare("DELETE FROM $TABLE_TRACKING_ITEMS WHERE order_id=%d", $postId));
        // @codingStandardsIgnoreEnd
        // if ($res) {
        //     // delete orders
        //     Api::delete_orders([$postId]);
        // }
    }

    /**
     * sync orders
     *
     * Process unsynchronized orders that were installed some time earlier
     */
    public function sync_order($day = '', $order_ids = null)
    {
        global $wpdb;

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // Interface exception identification
        $is_api_error = false;

        // Whether the identifier is successful; if there is a successful record, try to resynchronize
        $has_success = false;

        // Insufficient balance indicator
        $is_no_quota = false;

        $after_day = absint($day) ?: 30;

        // Query orders with insufficient quota and unsynchronized status Sort by time in ascending order
        $args = (new ParcelPanelFunction)->parcelpanel_get_shop_order_query_args([], $after_day);

        if (is_wp_error($args)) {
            if (isset($args->errors['no_install'])) {
                return;
            }
        }

        $post__not_in = [];

        $args['post__not_in'] = &$post__not_in; // phpcs:ignore

        $wp_query = new \WP_Query;

        $run_times = $order_ids ? 1 : 50;

        // only send order message
        while ($run_times--) {

            $orders = [];

            if (!$order_ids) {
                $post_ids = $wp_query->query($args);
            } else {
                $post_ids = array_unique($order_ids, SORT_NUMERIC);
            }

            if (!$post_ids) {
                break;
            }

            // cache track id
            $post__not_in = array_merge($post__not_in, $post_ids);

            if (!$is_no_quota) {

                foreach ($post_ids as $id) {
                    $orders[] = Orders::get_formatted_item_data(wc_get_order($id));
                }

                // send order message
                Api::add_orders($post_ids, $orders);

                if ($post_ids) {
                    // @codingStandardsIgnoreStart
                    $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($post_ids, '%d');
                    $shipment_order_ids = $wpdb->get_col($wpdb->prepare("SELECT order_id FROM {$TABLE_TRACKING_ITEMS} WHERE order_id IN ({$placeholder_str})", $post_ids));

                    foreach (array_diff($post_ids, $shipment_order_ids) as $id) {
                        $wpdb->insert($TABLE_TRACKING_ITEMS, ['order_id' => $id]);
                    }
                    // @codingStandardsIgnoreEnd
                }
            }
        }

        if ($is_api_error) {
            // restart
            self::schedule_order_sync_action(5);
            return;
        }

        // Manual synchronization does not perform secondary synchronization
        if ($day) {
            return;
        }

        // Synchronize order number task
        TrackingNumber::schedule_tracking_sync_action(-1);
    }

    // public function order_updated($order_id = null)
    // {
    //     $this->sync_order('', [$order_id]);
    // }

    /**
     * Planned order synchronization task
     */
    static function schedule_order_sync_action(int $delay = 5)
    {
        (new ParcelPanelFunction)->parcelpanel_schedule_single_action('parcelpanel_order_sync', $delay);
    }

    static function schedule_order_updated_action(int $delay = 5, $args = [])
    {
        (new ParcelPanelFunction)->parcelpanel_schedule_single_action('parcelpanel_order_updated', $delay, $args);
    }

    /**
     * Set shipped order status label
     */
    public function save_shipped_label_ajax()
    {
        check_ajax_referer('pp-save-shipped-label');

        $post_data = (new ParcelPanelFunction)->parcelpanel_get_post_data();

        // var_dump($post_data);die;
        if (!isset($post_data['status_shipped'])) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], '', false);
        }

        update_option(\ParcelPanel\OptionName\STATUS_SHIPPED, !empty($post_data['status_shipped']));

        (new ParcelPanelFunction)->parcelpanel_json_response();
    }

    public function admin_order_actions(array $actions, \WC_Order $order): array
    {

        if (!AdminSettings::get_admin_order_actions_add_track_field()) {
            return $actions;
        }

        $ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS = AdminSettings::get_admin_order_actions_add_track_order_status_field();

        $order_status = '';
        if (is_a($order, 'WC_Order')) {
            $order_status = $order->get_status() ?? '';
        }

        if ($order->get_shipping_method() != 'Local pickup' && $order->get_shipping_method() != 'Local Pickup') {
            if (
                in_array($order_status, $ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS, true)
                || in_array("wc-{$order_status}", $ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS, true)
            ) {
                $actions['parcelpanel_add_tracking'] = [
                    'url' => '#' . $order->get_id(),
                    'name' => __('Add Tracking', 'parcelpanel'),
                    'action' => 'parcelpanel_add_tracking',  // keep "view" class for a clean button CSS
                ];
            }
        }

        return $actions;
    }
}

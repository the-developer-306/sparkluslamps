<?php

namespace ParcelPanel\Action;

use ParcelPanel\Api\Api;
use ParcelPanel\Api\Orders;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;

class Common
{
    use Singleton;

    // get common configs
    public static function getCommonSetting()
    {
        $commonSetMessage = Api::userCommonLangList([]);
        if (is_wp_error($commonSetMessage)) {
            return [];
        }
        return $commonSetMessage['data'] ?? [];
    }

    // get AddJsCss configs
    public static function get_add_js_css_setting()
    {
        $data = Api::checkAddJsCss();
        if (is_wp_error($data)) {
            return [];
        }
        return $data['data'] ?? [];
    }

    // get common configs
    public function getNowLang()
    {
        // $data = self::getCommonSetting();
        // $langPP = $data['lang'] ?? '';// pp lang
        $langPP = get_option(\ParcelPanel\OptionName\PP_LANG_NOW);

        $langWP = get_locale();
        $langArr = explode('_', $langWP);
        $langP = $langArr[0] ?? '';

        $resLang = $langWP; // use wp lang
        if ($langWP != $langPP && !empty($langPP)) {
            if ($langP != $langPP) {
                $resLang = $langPP; // use pp lang
            }
        }
        return $resLang;
    }

    // shipment data message change do
    public function shipmentChange($order_message = [], $type = 0)
    {

        $save_in_wp_comments = false; // open save shipment in wp comment
        $save_in_order_meta = true; // open save shipment in wc mate data

        // del shipment data message
        // $order_message = [
        //     'order_id' => $order_id,
        //     'tracking_number' => $tracking_number,
        // ];

        // update&add shipment data message
        // $order_message = [
        //     'order_id' => $order_id,
        //     'tracking_number' => $tracking_number,
        //     'shipment_line_items' => $shipment_line_items, // has some not same
        //     'courier_code' => $courier_code,
        //     'fulfilled_at' => $fulfilled_at,
        //     'del_tracking_number' => $del_tracking_number, // update number del old number message
        // ];

        // update&add "shipment_line_items":[{"id":11,"name":'test',"quantity":2}]
        // update&add csv 
        // update&add api 

        // type 1 add 2 update 3 del
        if (empty($order_message) || empty($type)) {
            return;
        }

        $order_id = $order_message['order_id'] ?? 0;
        $tracking_number = $order_message['tracking_number'] ?? '';
        $del_tracking_number = $order_message['del_tracking_number'] ?? '';

        if (empty($order_id) || empty($tracking_number)) {
            return;
        }

        $courier_code = $order_message['courier_code'] ?? '';
        $fulfilled_at = $order_message['fulfilled_at'] ?? time();
        $shipment_line_items = $order_message['shipment_line_items'] ?? [];

        $order = wc_get_order($order_id);
        $items = $this->get_shipment_pro($shipment_line_items, $order);

        // // to wp_comments
        // if ($save_in_wp_comments) {

        //     $comment_content = '';

        //     // add
        //     if ($type == 1) {
        //         $comment_content = sprintf('Order was shipped with %s and tracking number is: %s and items: %s', $courier_code, $tracking_number, $items);
        //     }

        //     // update
        //     if ($type == 2) {
        //         $comment_content = sprintf('Order update was shipped with %s and tracking number is: %s and items: %s', $courier_code, $tracking_number, $items);
        //     }

        //     // del  Do not design the text the same as the shipping integration, otherwise it will be recreated after deletion.
        //     if ($type == 3) {
        //         $comment_content = sprintf('Order delete number %s', $tracking_number);
        //     }

        //     if (!empty($comment_content)) {
        //         $this->save_wp_comment($order_id, $fulfilled_at, $comment_content);
        //     }

        //     // update tracking_number del old tracking_number
        //     if ($del_tracking_number != $tracking_number && ($type == 1 || $type == 2)) {
        //         $comment_content = sprintf('Order delete number %s', $del_tracking_number);
        //         $this->save_wp_comment($order_id, $fulfilled_at, $comment_content);
        //     }
        // }


        // to order meta
        if ($save_in_order_meta) {
            global $wpdb;

            // wc_orders_meta table
            $table_name = $wpdb->prefix . 'wc_orders_meta';
            $meta_key_name = '_parcelpanel_shipping_numbers';

            $shipping_numbers = $order->get_meta($meta_key_name);
            // $shipping_numbers = $order->get_meta_data(); // get all meta
            $shipping_numbers_arr = !empty($shipping_numbers) ? json_decode($shipping_numbers, true) : [];

            $order_message_new = [
                "order_id" => $order_id,
                "tracking_number" => $tracking_number,
                "courier_code" => $courier_code,
                "fulfilled_at" => $fulfilled_at,
                "items" => $items,
            ];

            // add || update
            if ($type == 1 || $type == 2) {
                $shipping_numbers_arr[$tracking_number] = $order_message_new;
                if ($del_tracking_number != $tracking_number) {
                    unset($shipping_numbers_arr[$del_tracking_number]);
                }
            }

            // del
            if ($type == 3) {
                unset($shipping_numbers_arr[$tracking_number]);
            }

            $shipping_numbers_str = wp_json_encode($shipping_numbers_arr);

            // up wp_order_meta data
            update_post_meta($order_id, $meta_key_name, $shipping_numbers_str);
            try {
                // up wp_wc_order_meta data
                Orders::up_wc_order_meta($wpdb, $table_name, $order_id, $meta_key_name, $shipping_numbers_str);
            } catch (\Exception $e) {
            }
        }
    }

    // save in wp_comment
    private function save_wp_comment($order_id, $fulfilled_at, $comment_content)
    {
        $args = array(
            // "comment_ID" => "779",
            "comment_post_ID" => $order_id,
            "comment_author" => "ParcelPanel",
            // "comment_author_email" => "",
            // "comment_author_url" => "",
            // "comment_author_IP" => "",
            "comment_date" => gmdate('Y-m-d H:i:s', $fulfilled_at),
            "comment_date_gmt" => gmdate('Y-m-d H:i:s', $fulfilled_at),
            "comment_content" => $comment_content,
            // "comment_karma" => "0",
            // "comment_approved" => "1",
            "comment_agent" => "WooCommerce",
            "comment_type" => "order_note",
            // "comment_parent" => "0",
            // "user_id" => "0"
        );

        $comment_id = wp_insert_comment($args);
    }

    // get pro messages
    private function get_shipment_pro($shipment_line_items, $order)
    {

        $pro_list = [];
        $line_item = $order->get_items();
        foreach ($line_item as $item) {
            /* @var \WC_Product $product */
            $item_id = $item->get_id();
            $name = $item->get_name();
            $pro_list[$item_id] = $name;
        }

        $items = '';
        foreach ($shipment_line_items as &$v) {
            $p_id = $v['id'] ?? 0;
            $name = $v['name'] ?? '';
            $quantity = $v['quantity'] ?? 0;

            if ($p_id && empty($name) && !empty($pro_list[$p_id])) {
                $name = $pro_list[$p_id] ?? '';
                $v['name'] = $name;
            }
            if (empty($name) || empty($quantity)) {
                continue;
            }

            if ($items) {
                $items .= ', ' . $name . ' x' . $quantity;
            } else {
                $items .= $name . ' x' . $quantity;
            }
        }
        $items = trim($items);

        return $items;
    }
}

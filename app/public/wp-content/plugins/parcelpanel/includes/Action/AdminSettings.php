<?php

namespace ParcelPanel\Action;

use ParcelPanel\Api\RestApi;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;

class AdminSettings
{
    use Singleton;

    const EMAIL_DEFAULT = [
        'in_transit'       => false,
        'out_for_delivery' => false,
        'delivered'        => false,
        'exception'        => false,
        'failed_attempt'   => false,
    ];

    /**
     * Func getSettings api get settings.
     */
    public static function getSettings(\WP_REST_Request $request)
    {
        $get_option_list = !empty($request['get_list']) ? $request['get_list'] : [];

        $configs = [];
        if (!empty($get_option_list)) {
            foreach ($get_option_list as $v) {
                $configs[$v] = get_option($v) ?? '';
            }
        } else {
            $timezone = get_option('timezone_string');
            $timezone_offset = get_option('gmt_offset');
            $timezone_default = date_default_timezone_get();
            $user_currency = get_woocommerce_currency();
            $configs['time_zone'] = $timezone;
            $configs['timezone_offset'] = $timezone_offset;
            $configs['timezone_default'] = $timezone_default;
            $configs['currency'] = $user_currency;
        }

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => [
                'configs' => $configs,
            ],
        ];

        return rest_ensure_response($resp_data);
    }

    function get_setting_config()
    {

        $email_notification_add_tracking_section = $this->get_email_notification_add_tracking_section_field();
        $tracking_section_order_status = $this->get_tracking_section_order_status_field();
        $orders_page_add_track_button = $this->get_orders_page_add_track_button_field();
        $track_button_order_status = $this->get_track_button_order_status_field();
        $admin_order_actions_add_track = self::get_admin_order_actions_add_track_field();
        $admin_order_actions_add_track_order_status = self::get_admin_order_actions_add_track_order_status_field();
        // 无选项时，自动关闭开关
        if (empty($tracking_section_order_status)) {
            $email_notification_add_tracking_section = false;
            // update_option( \ParcelPanel\OptionName\EMAIL_NOTIFICATION_ADD_TRACKING_SECTION, filter_var( $email_notification_add_tracking_section, FILTER_VALIDATE_BOOLEAN ) );
        }

        // 无选项时，自动关闭开关
        if (empty($track_button_order_status)) {
            $orders_page_add_track_button = false;
            // update_option( \ParcelPanel\OptionName\ORDERS_PAGE_ADD_TRACK_BUTTON, filter_var( $orders_page_add_track_button, FILTER_VALIDATE_BOOLEAN ) );
        }

        // 无选项时，自动关闭开关
        if (empty($admin_order_actions_add_track_order_status)) {
            $admin_order_actions_add_track = false;
            // update_option( \ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK, filter_var( $admin_order_actions_add_track, FILTER_VALIDATE_BOOLEAN ) );
        }

        return [
            'order_status'                            => wc_get_order_statuses(),
            'email_notification_add_tracking_section' => $email_notification_add_tracking_section,
            'tracking_section_order_status'           => $tracking_section_order_status,
            'email_notification'                      => $this->get_email_notification_field(),
            'orders_page_add_track_button'            => $orders_page_add_track_button,
            'track_button_order_status'               => $track_button_order_status,
            'status_shipped' => self::get_status_shipped_field(),
            'admin_order_actions_add_track' => $admin_order_actions_add_track,
            'admin_order_actions_add_track_order_status' => $admin_order_actions_add_track_order_status,
        ];
    }


    public static function get_email_notification_add_tracking_section_field(): bool
    {
        return (int)get_option(\ParcelPanel\OptionName\EMAIL_NOTIFICATION_ADD_TRACKING_SECTION) === 1;
    }

    public static function get_tracking_section_order_status_field(): array
    {
        $IGNORE_ORDER_STATUSES = ['wc-pending', 'wc-on-hold', 'wc-checkout-draft'];
        $list = (array)get_option(\ParcelPanel\OptionName\TRACKING_SECTION_ORDER_STATUS, []);
        return array_values(array_diff($list, $IGNORE_ORDER_STATUSES));
    }

    private function get_email_notification_field(): array
    {
        $rtn = self::EMAIL_DEFAULT;

        foreach ($rtn as $order_status => &$value) {
            $data = get_option("woocommerce_customer_pp_{$order_status}_shipment_settings");
            if ($data) {
                $value = 'yes' == (get_option("woocommerce_customer_pp_{$order_status}_shipment_settings")['enabled'] ?? 'no');
            }
        }

        return $rtn;
    }

    public static function get_orders_page_add_track_button_field(): bool
    {
        return (int)get_option(\ParcelPanel\OptionName\ORDERS_PAGE_ADD_TRACK_BUTTON) === 1;
    }

    public static function get_track_button_order_status_field(): array
    {
        $IGNORE_ORDER_STATUSES = ['wc-pending', 'wc-on-hold'];
        $list = (array)get_option(\ParcelPanel\OptionName\TRACK_BUTTON_ORDER_STATUS, []);
        return array_values(array_diff($list, $IGNORE_ORDER_STATUSES));
    }

    // public static function get_status_shipped_field(): bool
    // {
    //     return (int)get_option(\ParcelPanel\OptionName\STATUS_SHIPPED) === 1;
    // }

    // public static function get_status_shipped_add_field(): bool
    // {
    //     return (int)get_option(\ParcelPanel\OptionName\STATUS_SHIPPED) === 2;
    // }

    public static function get_fulfill_workflow_field(): array
    {
        $parcelpanel_fulfill_workflow = get_option(\ParcelPanel\OptionName\FULFILL_WORKFLOW);

        if (empty($parcelpanel_fulfill_workflow)) {
            $parcelpanel_fulfill_workflow = [
                "partially_shipped_type" => 1,
                "partially_shipped_enable_email" => true,
                "shipped_type" => 2,
                "shipped_enable_email" => false,
                "delivered_type" => 2,
                "delivered_enable_email_del" => false,
                "delivered_enable_email_com" => false
            ];
            $status_shipped = get_option(\ParcelPanel\OptionName\STATUS_SHIPPED);
            if ($status_shipped) {
                $parcelpanel_fulfill_workflow["shipped_type"] = 3;
            }

            // check email open
            $parcelpanel_fulfill_workflow = self::get_wc_email_field($parcelpanel_fulfill_workflow, "woocommerce_customer_partial_shipped_order_settings", "partially_shipped_enable_email");
            $parcelpanel_fulfill_workflow = self::get_wc_email_field($parcelpanel_fulfill_workflow, "woocommerce_customer_shipped_order_settings", "shipped_enable_email");
        } else {
            if (!is_array($parcelpanel_fulfill_workflow)) {
                $parcelpanel_fulfill_workflow = json_decode($parcelpanel_fulfill_workflow, true);
            }
        }

        return $parcelpanel_fulfill_workflow;
    }

    // wc email setting check
    public static function get_wc_email_field($parcelpanel_fulfill_workflow, $option_name, $key)
    {
        $option = get_option($option_name);
        $enabled = $option['enabled'] ?? 'yes'; // default yes
        if ($enabled == 'yes') {
            $parcelpanel_fulfill_workflow[$key] = true;
        } else {
            $parcelpanel_fulfill_workflow[$key] = false;
        }
        return $parcelpanel_fulfill_workflow;
    }

    // rename complete to shipped
    public static function get_status_shipped_field(): bool
    {
        $parcelpanel_fulfill_workflow = self::get_fulfill_workflow_field();
        $pp_shipped = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;

        return (int)$pp_shipped === 3;
    }

    public static function get_status_pp_partial_shipped_field(): bool
    {
        $parcelpanel_fulfill_workflow = self::get_fulfill_workflow_field();
        $pp_partial_shipped = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;

        return (int)$pp_partial_shipped === 1;
    }

    public static function get_status_pp_shipped_field(): bool
    {
        $parcelpanel_fulfill_workflow = self::get_fulfill_workflow_field();
        $pp_shipped = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;

        return (int)$pp_shipped === 1;
    }

    public static function get_status_pp_delivered_field(): bool
    {
        $parcelpanel_fulfill_workflow = self::get_fulfill_workflow_field();
        $delivered_type = $parcelpanel_fulfill_workflow['delivered_type'] ?? 0;

        return (int)$delivered_type === 1;
    }

    public static function get_admin_order_actions_add_track_field(): bool
    {
        return (int)get_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK) === 1;
    }

    public static function get_admin_order_actions_add_track_order_status_field(): array
    {
        $IGNORE_ORDER_STATUSES = ['wc-pending', 'wc-on-hold'];
        $list = (array)get_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS, []);
        return array_values(array_diff($list, $IGNORE_ORDER_STATUSES));
    }
}

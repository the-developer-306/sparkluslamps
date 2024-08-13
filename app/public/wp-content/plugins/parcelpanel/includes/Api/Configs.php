<?php

namespace ParcelPanel\Api;

use ParcelPanel\Action\AdminSettings;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;

class Configs
{
    use Singleton;

    function update(\WP_REST_Request $request)
    {
        $p_settings = $request['update'] ?? false;
        $up_type = $request['type'] ?? 0;

        if (empty($p_settings)) {
            return rest_ensure_response(['code' => RestApi::CODE_BAD_REQUEST]);
        }

        if (!empty($up_type)) {
            if ($up_type == 1) {
                // update track page configs
                self::get_pp_track_page_config();
            } else if ($up_type == 2) {
                // update configs
                self::get_pp_setting_config();
            } else if ($up_type == 3) {
                // update notice
                self::get_pp_notice_config();
            }
        } else {
            // update configs
            self::get_pp_setting_config();

            // update notice
            self::get_pp_notice_config();

            // update track page configs
            self::get_pp_track_page_config();
        }

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => [],
        ];

        return rest_ensure_response($resp_data);
    }

    public static function updateToPP($configs, $type)
    {

        if ($type == 1) {

            $option_name = $configs['option'] ?? '';
            if (empty($option_name)) {
                return;
            }
            $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();

            $option_value = get_option($option_name);
            if ($option_name == "woocommerce_customer_partial_shipped_order_settings") {
                $enabled_partial_shipped = $option_value['enabled'] ?? 'yes';
                if ($enabled_partial_shipped == 'yes') {
                    $parcelpanel_fulfill_workflow['partially_shipped_enable_email'] = true;
                } else {
                    $parcelpanel_fulfill_workflow['partially_shipped_enable_email'] = false;
                }
            }

            if ($option_name == "woocommerce_customer_shipped_order_settings") {
                $enabled_shipped = $option_value['enabled'] ?? 'yes';
                if ($enabled_shipped == 'yes') {
                    $parcelpanel_fulfill_workflow['shipped_enable_email'] = true;
                } else {
                    $parcelpanel_fulfill_workflow['shipped_enable_email'] = false;
                }
            }
            update_option(\ParcelPanel\OptionName\FULFILL_WORKFLOW, $parcelpanel_fulfill_workflow);

            // email config change send data to PP update configs fulfill_workflow
            $data = [
                'config' => [
                    'type' => $type,
                    'name' => \ParcelPanel\OptionName\FULFILL_WORKFLOW,
                    'value' => $parcelpanel_fulfill_workflow,
                ]
            ];
            $res = Api::configs_update_to_pp($data);

        }

        return;
    }

    public static function get_pp_track_page_config(): void
    {
        $tracking_config = Api::userTrackConfigs();
        update_option(\ParcelPanel\OptionName\TRACKING_PAGE_NEW_OPTIONS, $tracking_config);
    }

    /**
     * get shop setting page configs
     */
    public static function get_pp_setting_config(): void
    {
        // 获取 setting page 相关 配置
        $user_setting_configs = Api::userSettingConfigs();
        if (is_wp_error($user_setting_configs)) {
            return;
        }

        $req_data = $user_setting_configs['data'] ?? [];

        // return $req_data;
        if (isset($req_data['tracking_section_order_status'])) {
            $tracking_section_order_status = array_filter(wc_clean((array)($req_data['tracking_section_order_status'])), function ($var) {
                if (!in_array($var, ['wc-checkout-draft', 'wc-pending'])) {
                    return $var;
                }
            });

            $array_keys = array_keys(wc_get_order_statuses());

            $tracking_section_order_status = array_values(array_intersect($array_keys, $tracking_section_order_status));

            update_option(\ParcelPanel\OptionName\TRACKING_SECTION_ORDER_STATUS, $tracking_section_order_status);

            // 无选项时，自动关闭开关
            if (empty($tracking_section_order_status)) {
                update_option(\ParcelPanel\OptionName\EMAIL_NOTIFICATION_ADD_TRACKING_SECTION, filter_var(!empty($tracking_section_order_status), FILTER_VALIDATE_BOOLEAN));
            }
        }

        if (isset($req_data['track_button_order_status'])) {

            $track_button_order_status = array_filter(wc_clean((array)($req_data['track_button_order_status'])));

            $array_keys = array_keys(wc_get_order_statuses());

            $track_button_order_status = array_values(array_intersect($array_keys, $track_button_order_status));

            update_option(\ParcelPanel\OptionName\TRACK_BUTTON_ORDER_STATUS, $track_button_order_status);

            // 无选项时，自动关闭开关
            if (empty($track_button_order_status)) {
                update_option(\ParcelPanel\OptionName\ORDERS_PAGE_ADD_TRACK_BUTTON, filter_var(!empty($track_button_order_status), FILTER_VALIDATE_BOOLEAN));
            }
        }

        if (isset($req_data['admin_order_actions_add_track_order_status'])) {

            $track_button_order_status = array_filter(wc_clean((array)($req_data['admin_order_actions_add_track_order_status'])));

            $array_keys = array_keys(wc_get_order_statuses());

            $track_button_order_status = array_values(array_intersect($array_keys, $track_button_order_status));

            update_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS, $track_button_order_status);

            // 无选项时，自动关闭开关
            if (empty($track_button_order_status)) {
                update_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK, filter_var(!empty($track_button_order_status), FILTER_VALIDATE_BOOLEAN));
            }
        }

        if (isset($req_data['email_notification'])) {
            $order_status = [
                'in_transit',
                'out_for_delivery',
                'delivered',
                'exception',
                'failed_attempt',
            ];
            // foreach ($req_data[ 'email_notification' ] as $k=>$v) {
            //     $option              = get_option( "woocommerce_customer_pp_{$k}_shipment_settings" );
            //     $option[ 'enabled' ] = filter_var( $v, FILTER_VALIDATE_BOOLEAN ) ? 'yes' : 'no';
            //     update_option( "woocommerce_customer_pp_{$k}_shipment_settings", $option );
            // }
            foreach ($order_status as $value) {
                if (isset($req_data['email_notification'][$value])) {
                    $option = get_option("woocommerce_customer_pp_{$value}_shipment_settings");
                    $option['enabled'] = filter_var($req_data['email_notification'][$value], FILTER_VALIDATE_BOOLEAN) ? 'yes' : 'no';
                    update_option("woocommerce_customer_pp_{$value}_shipment_settings", $option);
                }
            }
        }

        if (isset($req_data['email_notification_add_tracking_section'])) {
            update_option(\ParcelPanel\OptionName\EMAIL_NOTIFICATION_ADD_TRACKING_SECTION, filter_var($req_data['email_notification_add_tracking_section'], FILTER_VALIDATE_BOOLEAN));
        }

        if (isset($req_data['orders_page_add_track_button'])) {
            update_option(\ParcelPanel\OptionName\ORDERS_PAGE_ADD_TRACK_BUTTON, filter_var($req_data['orders_page_add_track_button'], FILTER_VALIDATE_BOOLEAN));
        }

        if (isset($req_data['fulfill_workflow'])) {
            update_option(\ParcelPanel\OptionName\FULFILL_WORKFLOW, $req_data['fulfill_workflow']);

            $parcelpanel_fulfill_workflow = $req_data['fulfill_workflow'] ?? [];
            if ($parcelpanel_fulfill_workflow) {
                $pp_shipped = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
                if ($pp_shipped == 3) {
                    update_option(\ParcelPanel\OptionName\STATUS_SHIPPED, filter_var(true, FILTER_VALIDATE_BOOLEAN));
                } else {
                    update_option(\ParcelPanel\OptionName\STATUS_SHIPPED, filter_var(false, FILTER_VALIDATE_BOOLEAN));
                }

                $partially_shipped_type = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;
                $partially_shipped_enable_email = $parcelpanel_fulfill_workflow['partially_shipped_enable_email'] ?? false;
                $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
                $shipped_enable_email = $parcelpanel_fulfill_workflow['shipped_enable_email'] ?? false;

                $option = get_option("woocommerce_customer_partial_shipped_order_settings");
                if ($partially_shipped_type == 1 && $partially_shipped_enable_email) {
                    $option['enabled'] = 'yes';
                } else {
                    $option['enabled'] = 'no';
                }
                update_option("woocommerce_customer_partial_shipped_order_settings", $option);

                $option = get_option("woocommerce_customer_shipped_order_settings");
                if ($shipped_type == 1 && $shipped_enable_email) {
                    $option['enabled'] = 'yes';
                } else {
                    $option['enabled'] = 'no';
                }
                update_option("woocommerce_customer_shipped_order_settings", $option);
            }
        }

        if (isset($req_data['courier_matching'])) {
            update_option(\ParcelPanel\OptionName\SELECTED_COURIER, array_values($req_data['courier_matching']['enabled']), false);
        }

        if (isset($req_data['admin_order_actions_add_track'])) {
            update_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK, filter_var($req_data['admin_order_actions_add_track'], FILTER_VALIDATE_BOOLEAN));
        }
    }

    public static function get_pp_notice_config(): void
    {
        $user_common_configs = Api::userOtherConfigs();
        if (is_wp_error($user_common_configs)) {
            return;
        }

        $req_data = $user_common_configs['data'] ?? [];

        if (isset($req_data['upgradeReminder'])) {
            $upgradeReminder = empty($req_data['upgradeReminder']) ? 0 : time();
            update_option(\ParcelPanel\OptionName\PLAN_QUOTA_REMAIN, $upgradeReminder);
        }

        if (isset($req_data['question'])) {
            $question = empty($req_data['question']) ? 0 : strtotime('tomorrow midnight');
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION, $question);
        }

        if (isset($req_data['questionV391'])) {
            $questionV391 = empty($req_data['questionV391']) ? 0 : strtotime('tomorrow midnight');
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION_TWO, $questionV391);
        }

        if (isset($req_data['npsBtn'])) {
            $npsBtn = !empty($req_data['npsBtn']) ? 0 : strtotime('tomorrow midnight');
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_NPS, $npsBtn);
        }

        if (isset($req_data['wc_app_drop_shipping_aliExpress'])) {
            $k_1001 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1001);
            update_option($k_1001, $req_data['wc_app_drop_shipping_aliExpress']);
        }

        if (isset($req_data['wc_app_drop_shipping_ALD'])) {
            $k_1002 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1002);
            update_option($k_1002, $req_data['wc_app_drop_shipping_ALD']);
        }

        if (isset($req_data['wc_app_drop_shipping_DSer'])) {
            $k_1003 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1003);
            update_option($k_1003, $req_data['wc_app_drop_shipping_DSer']);
        }

        if (isset($req_data['wc_app_drop_shipping_SendCloud'])) {
            $k_1004 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1004);
            update_option($k_1004, $req_data['wc_app_drop_shipping_SendCloud']);
        }

        if (isset($req_data['wc_app_drop_shipping_Shippo'])) {
            $k_1005 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1005);
            update_option($k_1005, $req_data['wc_app_drop_shipping_Shippo']);
        }

        if (isset($req_data['wc_app_drop_shipping_wcShipping'])) {
            $k_1006 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1006);
            update_option($k_1006, $req_data['wc_app_drop_shipping_wcShipping']);
        }

        if (isset($req_data['wc_app_drop_shipping_shipStation'])) {
            $k_1007 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1007);
            update_option($k_1007, $req_data['wc_app_drop_shipping_shipStation']);
        }

        if (isset($req_data['wc_app_drop_shipping_dianxiaomi'])) {
            $k_1008 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1008);
            update_option($k_1008, $req_data['wc_app_drop_shipping_dianxiaomi']);
        }

        if (isset($req_data['wc_app_drop_shipping_pirateship'])) {
            $k_1009 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1009);
            update_option($k_1009, $req_data['wc_app_drop_shipping_pirateship']);
        }

        if (isset($req_data['quota'])) {
            $quota = empty($req_data['quota']) ? 0 : $req_data['quota'];
            update_option(\ParcelPanel\OptionName\PLAN_QUOTA, $quota);
        }
        if (isset($req_data['is_free_plan'])) {
            $is_free_plan = empty($req_data['is_free_plan']) ? 0 : $req_data['is_free_plan'];
            update_option(\ParcelPanel\OptionName\IS_FREE_PLAN, intval($is_free_plan), false);
        }
        if (isset($req_data['is_unlimited_plan'])) {
            $is_unlimited_plan = empty($req_data['is_unlimited_plan']) ? false : $req_data['is_unlimited_plan'];
            update_option(\ParcelPanel\OptionName\IS_UNLIMITED_PLAN, intval(!!$is_unlimited_plan));
        }
    }

    // update plugin to pp
    public static function update_plugin_complete()
    {
        Api::updatePluginComplete();
    }
}

<?php

namespace ParcelPanel\Api\Admin;

use ParcelPanel\Action\AdminSettings;
use ParcelPanel\Api\RestApi;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;
use ParcelPanel\Models\TrackingSettings;
use ParcelPanel\ParcelPanelFunction;

class AdminInfo
{
    use Singleton;

    private static $editable_options = [
        \ParcelPanel\OptionName\REGISTERED_AT,
        \ParcelPanel\OptionName\CONNECTED_AT,
        \ParcelPanel\OptionName\LAST_ATTEMPT_CONNECT_AT,
        \ParcelPanel\OptionName\API_KEY,
        \ParcelPanel\OptionName\API_UID,
        \ParcelPanel\OptionName\API_BID,
        \ParcelPanel\OptionName\CLOSE_QUOTA_NOTICE,
        \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FEEDBACK,
        \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION,
        \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION_TWO,
        \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_PLUGINS_FEEDBACK,
        \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_REMOVE_BRANDING,
        \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_SYNC_ORDERS,
        \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_UPGRADE,
        \ParcelPanel\OptionName\PLAN_QUOTA,
        \ParcelPanel\OptionName\PLAN_QUOTA_REMAIN,
        \ParcelPanel\OptionName\IS_FREE_PLAN,
        \ParcelPanel\OptionName\IS_UNLIMITED_PLAN,
        \ParcelPanel\OptionName\REMOVE_BRANDING,
        \ParcelPanel\OptionName\FIRST_SYNCED_AT,
        \ParcelPanel\OptionName\TRACK_PAGE_ID,
        \ParcelPanel\OptionName\STATUS_SHIPPED,
        \ParcelPanel\OptionName\PP_LANG_NOW,
        \ParcelPanel\OptionName\INTEGRATION_APP_ENABLED,
        \ParcelPanel\OptionName\FULFILL_WORKFLOW,
        \ParcelPanel\OptionName\FULFILL_WORKFLOW_CHECK,
        \ParcelPanel\OptionName\SELECTED_COURIER,
    ];

    function get(\WP_REST_Request $request)
    {
        $p_settings = $request['settings'];

        if (empty($p_settings)) {
            return rest_ensure_response(['code' => RestApi::CODE_BAD_REQUEST]);
        }

        $p_settings = explode(',', $p_settings);

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => [],
        ];

        $MAP = [
            'general' => [$this, 'get_general_info'],
            'tracking-page' => [$this, 'get_tracking_page_settings'],
            'settings' => [$this, 'get_settings_page_settings'],
            'options' => [$this, 'get_options'],
            'user-meta' => [$this, 'get_options_user_meta'],
        ];

        foreach ($p_settings as $name) {

            if (!isset($MAP[$name])) {
                continue;
            }

            $resp_data['data'][$name] = call_user_func($MAP[$name]);
        }

        return rest_ensure_response($resp_data);
    }

    private function get_general_info()
    {
        return [
            'name' => get_option('blogname'),
            'description' => get_option('blogdescription'),
            'url' => get_option('siteurl'),
            'email' => get_option('admin_email'),
            'wc_version' => WC()->version,
            'pp_version' => \ParcelPanel\VERSION,
            'timezone' => wc_timezone_string(),
            'timezone_new' => get_option('timezone_string'),
            'timezone_offset' => get_option('gmt_offset'),
            'timezone_default' => date_default_timezone_get(),
            'currency' => get_woocommerce_currency(),
            'currency_format' => get_woocommerce_currency_symbol(),
            'permalinks' => get_option('permalink_structure'),
            'country_code' => wc_get_base_location()['country'],
            'state_code' => wc_get_base_location()['state'],
            'postcode' => get_option('woocommerce_store_postcode', ''),
            'city' => get_option('woocommerce_store_city', ''),
            'address1' => get_option('woocommerce_store_address', ''),
            'address2' => get_option('woocommerce_store_address_2', ''),
        ];
    }

    private function get_tracking_page_settings()
    {
        $settings = TrackingSettings::instance()->get_settings();

        $settings['trackurl'] = (new ParcelPanelFunction)->parcelpanel_get_track_page_url(true);

        return $settings;
    }

    private function get_settings_page_settings()
    {
        return [
            'setting' => AdminSettings::instance()->get_setting_config(),
            'courier_code_list' => (array)get_option(\ParcelPanel\OptionName\SELECTED_COURIER, []),
        ];
    }

    private function get_options()
    {
        $result = [];

        foreach (self::$editable_options as $option_name) {
            if ($option_name == \ParcelPanel\OptionName\INTEGRATION_APP_ENABLED) {
                $k_1001 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1001);
                $k_1002 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1002);
                $k_1003 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1003);
                $k_1004 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1004);
                $k_1005 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1005);
                $k_1006 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1006);
                $k_1007 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1007);
                $k_1008 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1008);
                $k_1009 = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1009);
                $result[$k_1001] = get_option($k_1001, null);
                $result[$k_1002] = get_option($k_1002, null);
                $result[$k_1003] = get_option($k_1003, null);
                $result[$k_1004] = get_option($k_1004, null);
                $result[$k_1005] = get_option($k_1005, null);
                $result[$k_1006] = get_option($k_1006, null);
                $result[$k_1007] = get_option($k_1007, null);
                $result[$k_1008] = get_option($k_1008, null);
                $result[$k_1009] = get_option($k_1009, null);
            } else {
                $result[$option_name] = get_option($option_name, null);
            }
        }

        return $result;
    }

    private function get_options_user_meta()
    {
        $result = [];

        $options = [
            'parcelpanel_live_chat_enabled_at',
        ];

        foreach ($options as $option_name) {
            $result[$option_name] = get_user_option($option_name);
        }

        return $result;
    }

    function patch_option(\WP_REST_Request $request)
    {
        $params = $request->get_json_params();

        $option_names = array_intersect(self::$editable_options, array_keys($params));

        $result = [];

        foreach ($option_names as $option_name) {
            update_option($option_name, $params[$option_name]);

            $result[$option_name] = get_option($option_name, null);
        }

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => $result,
        ];

        return rest_ensure_response($resp_data);
    }


    public function custom_status(\WP_REST_Request $request)
    {
        $params = $request->get_json_params();

        $data = $params['data'] ?? [];
        $order_ids = $data['order_ids'] ?? [];

        if (empty($order_ids)) {
            $resp_data = [
                'code' => RestApi::CODE_SUCCESS,
                'data' => [],
            ];
            return rest_ensure_response($resp_data);
        }

        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // @codingStandardsIgnoreStart
        $order_List = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($order_ids);
        $tracking_data = (array)$wpdb->get_results(
            $wpdb->prepare(
                "SELECT ppti.id, ppti.order_id, ppti.tracking_id, ppti.custom_shipment_status, ppti.custom_status_time, p.tracking_number
                FROM {$TABLE_TRACKING_ITEMS} AS ppti LEFT JOIN {$TABLE_TRACKING} AS p ON ppti.tracking_id=p.id
                WHERE ppti.order_id in ({$order_List})",
                $order_ids
            )
        );
        // @codingStandardsIgnoreEnd


        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => $tracking_data,
        ];

        return rest_ensure_response($resp_data);
    }
}

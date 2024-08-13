<?php

namespace ParcelPanel\Api;

use ParcelPanel\ParcelPanelFunction;

class Api
{

    const USER_JS_CSS = '/wordpress/store/js-css';
    const USER_LANG = '/wordpress/userinfo/lang';
    const USER_SET_CONFIGS = '/wordpress/settings/configs/get';
    const USER_TRACK_CONFIGS = '/wordpress/track-page/configs-wc';
    const USER_CONFIGS_OTHER = '/wordpress/user/configsUpToWC';
    const USER_TRACKING_DATA = '/wordpress/tracking/info';
    const PLUGIN_UPDATE_NOW = '/wordpress/plugin/update';
    const ORDER_SYNC = '/wordpress/user/sync';
    const USER_API_KEY = '/wordpress/user/api-key';
    const CONFIG_UPDATE = '/wordpress/configs/update';
    const CONFIG_OPTION_UPDATE = '/wordpress/update/options';

    const CHECK_PRIVACY = '/wp/check/privacy';
    const REGISTER_SITE = '/wp/register-site';
    const SITE_DEACTIVATE = '/wp/site/deactivate';
    const SITE_UPGRADE = '/wp/site/upgrade';
    const POPUP_ACTION = '/wp/popup/action';

    const BIND_SITE = '/wp/bind-site';

    const ORDER_DEDUCTION = '/wp/order/deduction';
    const ORDER_DELETE = '/wp/order/delete';
    const NUMBER_IDENTIFY = '/wp/number/identify';

    const TRACKING = '/wp/tracking';

    const TRACKING_COURIERS = '/wp/tracking/couriers';

    const COURIER = '/wp/courier';

    const USER_WC = '/user/wc';

    const GEO = '/wp/geo';

    const FEEDBACK = '/wp/feedback';
    const UNINSTALL_FEEDBACK = '/wp/uninstall/feedback';

    const PRODUCT_CHECKOUT = '/product/checkout';
    const PRODUCT_CLICK = '/product/click';

    public static function get_url($path): string
    {
        $server_api = apply_filters('parcelpanel_server_api_url', 'https://wp.parcelpanel.com/api/v1');

        return $server_api . $path;
    }

    public static function get_api_key()
    {
        return get_option(\ParcelPanel\OptionName\API_KEY, '');
    }

    public static function get_bid()
    {
        return get_option(\ParcelPanel\OptionName\API_BID, 0);
    }

    private static function request($method, $api, $payload = null, $args = [])
    {

        $now_time = time();

        $home_url = home_url();

        $request_url = Api::get_url($api);

        $headers = [
            'Content-Type' => 'application/json',
            'X-WCPP-Source' => $home_url,
            'X-WCPP-Timestamp' => $now_time,
            'PP-Token' => self::get_api_key(),
        ];

        $ip_values = [];
        try {
            $ip_values = (new ParcelPanelFunction)->parcelpanel_get_client_ip();
        } catch (\Error $e) {
        }
        foreach ($ip_values as $field => $value) {
            $field = str_replace('_', '-', $field);
            $headers["X-WCPP-{$field}"] = $value;
        }

        $userAgent = sprintf('ParcelPanel/%s WooCommerce/%s WordPress/%s', \ParcelPanel\VERSION, '', $GLOBALS['wp_version']);
        try {
            $userAgent = sprintf('ParcelPanel/%s WooCommerce/%s WordPress/%s', \ParcelPanel\VERSION, WC()->version, $GLOBALS['wp_version']);
        } catch (\Error $e) {
        }
        $http_args = [
            'method' => $method,
            'timeout' => $args['timeout'] ?? 10,
            'redirection' => 0,
            'httpversion' => '1.1',
            'blocking' => true,
            'user-agent' => $userAgent,
            'sslverify' => false,
            'headers' => $headers,
        ];

        if (!is_null($payload)) {
            $http_args['body'] = trim(wp_json_encode($payload));
        }

        $content = strtolower($method) . "\n" . $request_url . "\n" . $home_url . "\n" . $now_time . "\n" . ($http_args['body'] ?? '');

        // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
        $http_args['headers']['X-WCPP-Signature'] = base64_encode(hash_hmac('sha256', $content, self::get_api_key(), true));

        return self::parse_api_response(wp_remote_request($request_url, $http_args));
    }

    static function get($api, $payload = null, $args = [])
    {
        return self::request('GET', $api, $payload, $args);
    }

    static function post($api, $payload, $args = [])
    {
        return self::request('POST', $api, $payload, $args);
    }

    static function patch($api, $payload, $args = [])
    {
        return self::request('PATCH', $api, $payload, $args);
    }

    static function delete($api, $payload = null, $args = [])
    {
        return self::request('DELETE', $api, $payload, $args);
    }


    public static function parse_api_response($resp)
    {
        if (is_wp_error($resp)) {
            return $resp;
        }

        $body = json_decode(wp_remote_retrieve_body($resp), 1);

        $error = $body['error'] ?? '';

        if (isset($error['message'])) {
            $message = strval(is_array($error['message']) ? current($error['message']) : $error['message']);
            $error_code = intval($error['error_code'] ?? 0);
            return new \WP_Error('api_error', $message, ['error_code' => $error_code]);
        }

        return $body;
    }


    /**
     * request allocation api key
     */
    public static function connect($api_key)
    {
        $payload = ['api_key' => $api_key];

        return self::post(Api::REGISTER_SITE, array_merge($payload, self::getSiteInfo()), ['timeout' => 15]);
    }

    /**
     * Authorization check
     */
    public static function checkPrivacy()
    {
        return self::post(Api::CHECK_PRIVACY, self::getSiteInfo(), ['timeout' => 15]);
    }

    /**
     * Plug-in uninstall event
     */
    public static function deactivate()
    {
        return self::post(Api::SITE_DEACTIVATE, null);
    }

    /**
     * Bind account
     *
     * @param string $authKey authorization key, provided by ParcelPanel, time-limited
     *
     * @return mixed|\WP_Error
     */
    public static function bind(string $authKey = '')
    {
        $payload = [
            'token' => get_option(\ParcelPanel\OptionName\API_KEY),
            'auth_key' => $authKey,
        ];

        return self::post(Api::BIND_SITE, array_merge($payload, self::getSiteInfo()));
    }

    /**
     * version upgrade message
     */
    public static function site_upgrade($action = 'site-info')
    {
        switch ($action) {
            case 'site-info':
                return self::post(Api::SITE_UPGRADE, self::getSiteInfo());
            case 'tracking-page-url':
                return self::post(Api::SITE_UPGRADE, ['action' => 'update-tracking-page-url', 'tracking-page-url' => (new ParcelPanelFunction)->parcelpanel_get_track_page_url()]);
        }

        return [];
    }


    public static function getSiteInfo(): array
    {
        $current_user = wp_get_current_user();
        $user_id = $current_user->ID;
        $email = empty($user_id) ? '' : $current_user->user_email;

        $email_from_name = '';
        $email_from_address = '';
        $timezone = '';
        $timezone_offset = '';
        $timezone_default = '';
        $user_currency = '';
        try {
            $mailer          = WC()->mailer();
            $email_from_name = $mailer->get_from_name();
            $email_from_address = $mailer->get_from_address();
            $timezone = get_option('timezone_string');
            $timezone_offset = get_option('gmt_offset');
            $timezone_default = date_default_timezone_get();
            $user_currency = get_woocommerce_currency();
        } catch (\Error $e) {
        }

        return [
            'user_id' => $user_id,
            'email' => $email,
            'nickname' => $current_user->display_name ?: $current_user->nickname,
            'firstname' => $current_user->user_firstname,
            'lastname' => $current_user->user_lastname,
            'email_from_name' => $email_from_name,
            'email_from_address' => $email_from_address,
            'locale' => $current_user->locale ?: get_locale(),
            'roles' => $current_user->roles,
            'title' => get_bloginfo('title', 'display') ?? '',
            'version' => \ParcelPanel\VERSION ?? '0.0.0',
            'timezone' => $timezone,
            'timezone_offset' => $timezone_offset,
            'timezone_default' => $timezone_default,
            'currency' => $user_currency,
            'urls' => [
                'base' => rest_url('parcelpanel/v1/'),
                'track_page' => (new ParcelPanelFunction)->parcelpanel_get_track_page_url(),
            ],
            'site' => [
                'hash' => '',
                'multisite' => is_multisite(),
                'lang' => get_locale(),
            ],
        ];
    }

    public static function popup_action($data)
    {
        $current_user = wp_get_current_user();
        $user_id = $current_user->ID;

        $data['user_id'] = $user_id;

        return self::post(Api::POPUP_ACTION, $data);
    }

    /**
     * sync order
     */
    public static function sync_orders($day = 90, $sleep = 0)
    {
        $payload = [
            'day' => $day,
            'sleep' => $sleep,
        ];;
        return self::post(Api::ORDER_SYNC, $payload);;
    }

    /**
     * check wp api key right
     */
    public static function check_api_key()
    {
        $payload = [];
        return self::post(Api::USER_API_KEY, $payload);
    }

    /**
     * update pp configs
     */
    public static function configs_update_to_pp($data)
    {
        return self::post(Api::CONFIG_UPDATE, $data);
    }

    /**
     * update wc option configs
     */
    public static function configs_option_update_to_pp($data)
    {
        return self::post(Api::CONFIG_OPTION_UPDATE, $data);
    }

    /**
     * sync order
     */
    public static function add_orders(array $order_ids, array $orders = [])
    {
        $payload = [
            'order_id' => $order_ids,
            'orders' => $orders,
            'no_back' => true,
        ];

        return self::post(Api::ORDER_DEDUCTION, $payload);
    }

    public static function add_tracking($data, $courier_code = [])
    {
        if (empty($courier_code)) {
            $courier_code = (array)get_option(\ParcelPanel\OptionName\SELECTED_COURIER, []);
        }

        $payload = [
            'data' => $data,
            'courier_code' => $courier_code,
            'no_back' => true,
        ];

        return self::post(Api::TRACKING, $payload);
    }

    /**
     * del order
     */
    public static function delete_orders($orderIds)
    {
        $data = [
            'orderIds' => $orderIds,
        ];

        return self::post(Api::ORDER_DELETE, $data);
    }

    /**
     * number identify
     */
    public static function number_identify($tracking_number)
    {
        $data = [
            'tracking_number' => $tracking_number,
        ];

        return self::post(Api::NUMBER_IDENTIFY, $data);
    }


    /**
     * del number
     */
    public static function delete_tracking($tracking_number)
    {
        return self::delete(Api::TRACKING . "/{$tracking_number}");
    }

    /**
     * couriers identification
     */
    public static function tracking_couriers($tracking_number_list)
    {
        $payload = [
            'tracking_numbers' => $tracking_number_list,
        ];

        return self::post(Api::TRACKING_COURIERS, $payload);
    }

    /**
     * couriers list
     */
    public static function couriers()
    {
        return self::get(Api::COURIER);
    }

    /**
     * user common lang
     */
    public static function userCommonLangList($params)
    {
        return self::post(Api::USER_LANG, $params);
    }

    /**
     * Func check js & css add
     */
    public static function checkAddJsCss()
    {
        return self::get(Api::USER_JS_CSS);
    }


    /**
     * user other configs
     */
    public static function userOtherConfigs()
    {
        return self::post(Api::USER_CONFIGS_OTHER, null);
    }

    /**
     * user track configs
     */
    public static function userTrackConfigs()
    {
        return self::post(Api::USER_TRACK_CONFIGS, null);
    }

    /**
     * user tracking message
     */
    public static function userTrackingPageNew($params)
    {
        return self::post(Api::USER_TRACKING_DATA, $params);
    }

    /**
     * user setting configs
     */
    public static function userSettingConfigs()
    {
        return self::post(Api::USER_SET_CONFIGS, null);
    }

    /**
     * Plugin update
     */
    public static function updatePluginComplete()
    {
        return self::post(Api::PLUGIN_UPDATE_NOW, null);
    }

    /**
     * 地理位置信息
     * @deprecated 2.2.0
     */
    public static function geo_info($address, $country_code = '')
    {
        return self::post(Api::GEO, ['q' => $address]);
    }

    /**
     * Feedback
     */
    public static function feedback($data)
    {
        return self::post(Api::FEEDBACK, $data);
    }

    /**
     * Deactivate survey
     */
    public static function uninstall_feedback($data)
    {
        return self::post(Api::UNINSTALL_FEEDBACK, $data);
    }

    /**
     * pro checkout
     */
    public static function product_checkout($data)
    {
        return self::post(Api::PRODUCT_CHECKOUT, $data);
    }

    /**
     * pro click
     */
    public static function product_click($data)
    {
        return self::post(Api::PRODUCT_CLICK, $data);
    }
}

<?php

namespace ParcelPanel\Api;

use ParcelPanel\Action\AdminSettings;
use ParcelPanel\Action\UserTrackPage;
use ParcelPanel\Api\Admin\AdminInfo;
use ParcelPanel\Api\Admin\AdminShipment;
use ParcelPanel\Api\Admin\AdminTrackingPage;
use ParcelPanel\Libs\ApiSign;
use ParcelPanel\ParcelPanelFunction;

class RestApi extends \WP_REST_Controller
{
    protected $namespace = 'parcelpanel/v1';

    private static $error = null;
    private static $auth_method = null;

    const CODE_SUCCESS = 200;
    const CODE_BAD_REQUEST = 400;
    const CODE_FORBIDDEN = 403;
    const CODE_CONNECT_ERROR = 1001;
    const CODE_CONNECT_SESSION_EXPIRED = 1002;

    public function register_routes()
    {
        register_rest_route($this->namespace, '/test', [
            [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'test'],
                'permission_callback' => [$this, 'permission_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/tracking/update', [
            [
                'methods' => 'POST',
                'callback' => [Tracking::instance(), 'update'],
                'permission_callback' => [$this, 'sign_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/tracking/update/new', [
            [
                'methods' => 'POST',
                'callback' => [Tracking::instance(), 'updateNew'],
                'permission_callback' => [$this, 'sign_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/order/synced', [
            [
                'methods' => 'POST',
                'callback' => [Orders::instance(), 'synced'],
                'permission_callback' => [$this, 'sign_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/trackings', [
            [
                'methods' => ['GET', 'POST'],
                'callback' => [Tracking::instance(), 'get_trackings'],
                'permission_callback' => [$this, 'permission_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/orders', [
            [
                'methods' => ['GET', 'POST'],
                'callback' => [Orders::instance(), 'get_orders'],
                'permission_callback' => [$this, 'permission_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/couriers', [
            [
                'methods' => 'POST',
                'callback' => [Courier::instance(), 'update'],
                'permission_callback' => [$this, 'sign_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/admin/info', [
            [
                'methods' => 'GET',
                'callback' => [AdminInfo::instance(), 'get'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/admin/info/option', [
            [
                'methods' => 'PATCH',
                'callback' => [AdminInfo::instance(), 'patch_option'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/tracking/shipment', [
            [
                'methods' => 'PATCH',
                'callback' => [AdminShipment::instance(), 'shipment_tracking'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/admin/get-number-status', [
            [
                'methods' => 'POST',
                'callback' => [AdminInfo::instance(), 'custom_status'],
                'permission_callback' => [$this, 'sign_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/admin/tracking-page', [
            [
                'methods' => 'PATCH',
                'callback' => [AdminTrackingPage::instance(), 'save_settings'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/admin/get-tracking-page', [
            [
                'methods' => 'POST',
                'callback' => [AdminTrackingPage::instance(), 'get_settings'],
                'permission_callback' => [$this, 'sign_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/admin/get-tracking-page-old', [
            [
                'methods' => 'POST',
                'callback' => [AdminTrackingPage::instance(), 'get_settings_old'],
                'permission_callback' => [$this, 'sign_check'],
            ],
        ]);

        register_rest_route($this->namespace, '/configs/update', [
            [
                'methods' => 'POST',
                'callback' => [Configs::instance(), 'update'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/product/message', [
            [
                // 'methods' => ['GET', 'POST'],
                'methods' => 'POST',
                'callback' => [UserTrackPage::instance(), 'product_message'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/product/list', [
            [
                // 'methods' => ['GET', 'POST'],
                'methods' => 'POST',
                'callback' => [UserTrackPage::instance(), 'get_products_message_api'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/tracking/other', [
            [
                'methods' => 'POST',
                'callback' => [UserTrackPage::instance(), 'getTranOther'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/tracking/recommend', [
            [
                'methods' => 'POST',
                'callback' => [UserTrackPage::instance(), 'getTrackingPro'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);

        register_rest_route($this->namespace, '/plugins/settings', [
            [
                'methods' => 'POST',
                'callback' => [AdminSettings::instance(), 'getSettings'],
                'permission_callback' => [$this, 'permission_check_v2'],
            ],
        ]);
    }

    /**
     * verify api
     */
    function test()
    {
        return rest_ensure_response(['code' => self::CODE_SUCCESS]);
    }

    function permission_check(\WP_REST_Request $request)
    {
        // Verify again that the current user has permissions
        if (current_user_can('manage_woocommerce')) {
            return true;
        }

        $req_token = $request->get_header('PP-Token');  // WPCS: CSRF ok, sanitization ok.

        $pp_token = wc_clean(sanitize_text_field(wp_unslash($_GET['pp_token'] ?? ''))); // phpcs:ignore

        if (!$req_token && !empty($pp_token)) {  // WPCS: CSRF ok.
            $req_token = $pp_token;  // WPCS: CSRF ok, sanitization ok.
        }

        if ($req_token) {
            $token = get_option(\ParcelPanel\OptionName\API_KEY);

            if ($req_token === $token) {
                return true;
            }
        }

        return new \WP_Error('parcelpanel_rest_authentication_error', 'No permission', ['status' => rest_authorization_required_code()]);
    }

    /**
     * Token verify v2
     */
    function permission_check_v2(\WP_REST_Request $request)
    {
        $t = (int)$request->get_param('pp_timestamp');
        $sign = $request->get_param('pp_sign');  // WPCS: CSRF ok, sanitization ok.

        if (!$t) {
            $t = (int)$request->get_header('PP-Timestamp');
        }
        if (!$sign) {
            $sign = $request->get_header('PP-Sign');  // WPCS: CSRF ok, sanitization ok.
        }

        if (!$t || !$sign) {
            return new \WP_Error(RestApi::CODE_FORBIDDEN, 'No permission');
        }

        if ($t + 300 < time()) {
            return new \WP_Error(RestApi::CODE_FORBIDDEN, 'Sign expired');
        }

        $token = get_option(\ParcelPanel\OptionName\API_KEY);

        if ($token && $sign == md5("{$t}{$token}")) {
            return true;
        }

        return new \WP_Error(RestApi::CODE_FORBIDDEN, 'No permission');
    }

    /**
     * Verify
     */
    function sign_check(\WP_REST_Request $request)
    {
        $param = (array)($request['data'] ?? []);
        $sign = $request['verify']['sign'] ?? '';

        $token = get_option(\ParcelPanel\OptionName\API_KEY);

        if ($token && ApiSign::verify($sign, $param, $token)) {
            return true;
        }

        return new \WP_Error(RestApi::CODE_FORBIDDEN, 'No permission');
    }


    /**
     * Check if is request to our REST API.
     *
     * @return bool
     */
    private static function is_request_to_rest_api(): bool
    {
        if (empty($_SERVER['REQUEST_URI'])) {  // WPCS: CSRF ok.
            return false;
        }

        $rest_prefix = trailingslashit(rest_get_url_prefix());
        $request_uri = esc_url_raw(wp_unslash($_SERVER['REQUEST_URI']));

        // Check if the request is to the ParcelPanel API endpoints.
        return (strpos($request_uri, $rest_prefix . 'parcelpanel/') !== false);
    }

    /**
     * Authenticate user.
     *
     * @param int|false $user_id User ID if one has been determined, false otherwise.
     *
     * @return int|false
     */
    static function authenticate($user_id)
    {
        // Do not authenticate twice and check if is a request to our endpoint in the WP REST API.
        if ($user_id) {
            return $user_id;
        }

        $headers = json_decode(wp_json_encode((new ParcelPanelFunction())->getallheaders()), 1);
        $api_key = null;

        // @codingStandardsIgnoreStart
        if (!empty($_GET['pp_token'])) {  // WPCS: CSRF ok.
            $api_key = $_GET['pp_token'];  // WPCS: CSRF ok, sanitization ok.
        }
        // @codingStandardsIgnoreEnd

        if (!$api_key && !empty($headers['Pp-Token'])) {
            $api_key = $headers['Pp-Token'];  // WPCS: CSRF ok, sanitization ok.
        }

        if (!$api_key) {
            return false;
        }

        self::$auth_method = 'token_auth';
        // @codingStandardsIgnoreStart
        $user_query = new \WP_User_Query([
            'meta_key' => 'parcelpanel_api_key',
            'meta_value' => (new ParcelPanelFunction)->parcelpanel_api_hash($api_key),
        ]);
        // @codingStandardsIgnoreEnd
        $users = $user_query->get_results();

        if (empty($users[0])) {
            return false;
        }

        return $users[0];
    }

    /**
     * Authenticate the user if authentication wasn't performed during the
     * determine_current_user action.
     *
     * Necessary in cases where wp_get_current_user() is called before WooCommerce is loaded.
     *
     * @see https://github.com/woocommerce/woocommerce/issues/26847
     *
     * @param \WP_Error|null|bool $error Error data.
     *
     * @return \WP_Error|null|bool
     */
    static function authentication_fallback($error)
    {
        if (!empty($error)) {
            // Another plugin has already declared a failure.
            return $error;
        }
        if (empty(self::$error) && empty(self::$auth_method) && 0 === get_current_user_id()) {
            // Authentication hasn't occurred during `determine_current_user`, so check auth.
            $user_id = self::authenticate(false);
            if ($user_id) {
                wp_set_current_user($user_id);
                return true;
            }
        }
        return $error;
    }

    /**
     * Check for authentication error.
     *
     * @param \WP_Error|null|bool $error Error data.
     *
     * @return \WP_Error|null|bool
     */
    static function check_authentication_error($error)
    {
        // Pass through other errors.
        if (!empty($error)) {
            return $error;
        }

        return self::$error;
    }
}

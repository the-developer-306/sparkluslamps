<?php

namespace ParcelPanel;

use MO;
use ParcelPanel\Action\Common;
use ParcelPanel\Action\Lang;
use ParcelPanel\Libs\ArrUtils;
use ParcelPanel\Models\Table;
use ParcelPanel\Models\TrackingSettings;
use stdClass;

final class ParcelPanelFunction
{

    public function getallheaders()
    {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }

    public function parcelpanel_log($message, $level = \WC_Log_Levels::DEBUG)
    {
        // return;
        $logger = wc_get_logger();
        $context = ['source' => 'parcelpanel'];
        $logger->log($level, $message, $context);
    }

    /**
     * PP API - Hash.
     *
     * @param string $data Message to be hashed.
     *
     * @return string
     * @since  1.4.0
     */
    public function parcelpanel_api_hash($data): string
    {
        return hash_hmac('sha256', $data, 'pp-api');
    }

    /**
     * Plan a single task
     */
    public function parcelpanel_schedule_single_action(string $hook, int $delay = 1, $args = [])
    {
        $pending_jobs = as_get_scheduled_actions(['per_page' => 1, 'hook' => $hook, 'group' => 'parcelpanel', 'status' => 'pending']);

        if (empty($pending_jobs)) {
            as_schedule_single_action(time() + $delay, $hook, $args, 'parcelpanel');
            return true;
        }

        return false;
    }

    /**
     * get JSON POST DATA
     */
    public function parcelpanel_get_post_data(): array
    {
        // @codingStandardsIgnoreStart
        if (empty($_POST) && false !== strpos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) {

            $content = file_get_contents('php://input');

            return (array)json_decode($content, 1);
        }
        // @codingStandardsIgnoreEnd

        return $_POST; // phpcs:ignore
    }

    public function parcelpanel_get_prepare_placeholder_str($data, $placeholder = '%s'): string
    {
        return rtrim(str_repeat("{$placeholder},", count($data)), ',');
    }

    /**
     * Determine whether it is a local site
     *
     * @return bool
     */
    public function parcelpanel_is_local_site(): bool
    {
        // Check for localhost and sites using an IP only first.
        $is_local = site_url() && false === strpos(site_url(), '.');

        // Use Core's environment check, if available. Added in 5.5.0 / 5.5.1 (for `local` return value).
        if ('local' === wp_get_environment_type()) {
            $is_local = true;
        }

        // Then check for usual usual domains used by local dev tools.
        $known_local = [
            '#\.local$#i',
            '#\.localhost$#i',
            '#\.test$#i',
            '#\.docksal$#i',      // Docksal.
            '#\.docksal\.site$#i', // Docksal.
            '#\.dev\.cc$#i',       // ServerPress.
            '#\.lndo\.site$#i',    // Lando.
        ];

        if (!$is_local) {
            foreach ($known_local as $url) {
                if (preg_match($url, site_url())) {
                    $is_local = true;
                    break;
                }
            }
        }

        return apply_filters('parcelpanel_is_local_site', $is_local);
    }

    /**
     * check WC is active
     */
    public function parcelpanel_woocommerce_active_check(): bool
    {
        return in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')));
    }

    /**
     * Whether the cloud service is successfully connected
     */
    public function parcelpanel_is_connected(): bool
    {
        $user = wp_get_current_user();

        $api_key = get_option(\ParcelPanel\OptionName\API_KEY);

        return !empty($api_key) && !empty($user->parcelpanel_api_key);
    }

    public function parcelpanel_get_current_user_name()
    {
        $current_user = wp_get_current_user();

        $user_first_name = $current_user->first_name;
        $user_last_name = $current_user->last_name;
        $user_display_name = $current_user->display_name;

        if ($user_first_name || $user_last_name) {
            return "{$user_first_name} {$user_last_name}";
        }

        return $user_display_name;
    }

    public function parcelpanel_update_quota_info($data)
    {
        $quota = intval(ArrUtils::get($data, 'quota', -1));
        $quota_used = intval(ArrUtils::get($data, 'quota_used', -1));
        $is_free_plan = ArrUtils::get($data, 'is_free_plan');
        $is_unlimited_plan = ArrUtils::get($data, 'is_unlimited_plan');

        // If the amount information exists, update it
        if ($quota > -1 && $quota_used > -1) {
            update_option(\ParcelPanel\OptionName\PLAN_QUOTA, $quota);
            update_option(\ParcelPanel\OptionName\PLAN_QUOTA_REMAIN, abs($quota - $quota_used));
        }
        if (!is_null($is_free_plan)) {
            update_option(\ParcelPanel\OptionName\IS_FREE_PLAN, intval($is_free_plan), false);
        }
        if (!is_null($is_unlimited_plan)) {
            update_option(\ParcelPanel\OptionName\IS_UNLIMITED_PLAN, intval(!!$is_unlimited_plan));
        }
    }

    /**
     * Get resource file path
     *
     * @param string $path Resource path relative to assets folder
     * @param false $link Whether to generate a link
     *
     * @return string
     *
     * @author: Chuwen
     * @date  : 2021/7/27 09:55
     */
    public function parcelpanel_get_assets_path(string $path = '', bool $link = true): string
    {
        $path = "/assets/{$path}";

        return $link ? plugins_url($path, \ParcelPanel\PLUGIN_FILE) : \ParcelPanel\PLUGIN_PATH . $path;
    }

    /**
     * Get resource file path
     *
     * @param string $dir
     * @param string $path
     * @param bool $link
     *
     * @return string
     *
     * @author: Lijiahao <jiahao.li@trackingmore.org>
     * @date  : 2023/2/25 10:18
     */
    public function get_dir_path(string $dir = '', string $path = '', bool $link = true): string
    {
        $path = "/{$dir}/{$path}";

        return $link ? plugins_url($path, \ParcelPanel\PLUGIN_FILE) : \ParcelPanel\PLUGIN_PATH . $path;
    }

    /**
     * Get the base path of the PP plug-in
     *
     * @param string $extendPath Paths that need to be added
     *
     * @return string
     *
     * @author: Chuwen
     * @date  : 2021/7/27 09:41
     */
    public function parcelpanel_get_plugin_base_path(string $extendPath = ''): string
    {
        $path = basename(dirname(__FILE__, 2));
        if (!empty($extendPath)) $path .= $extendPath;

        return $path;
    }

    /**
     * Determine whether it is a PP page
     *
     * @return bool
     *
     * @author: Chuwen
     * @date  : 2021/7/26 17:56
     */
    public function is_parcelpanel_plugin_page(): bool
    {
        return ($GLOBALS['parent_file'] ?? '') === \ParcelPanel\PP_MENU_SLAG;
    }

    /**
     * Import the view (actually importing a PHP file)
     *
     * @param string $name file name
     *
     * @author: Chuwen
     * @date  : 2021/7/21 10:42
     */
    public function parcelpanel_include_view(string $name)
    {
        include __DIR__ . "/views/{$name}.php";
    }

    /**
     * Add submenu in PP
     *
     * @param string $page_title
     * @param string $menu_title
     * @param string $capability What permissions can be viewed, the default is manage_options
     * @param string $menu_slug
     * @param callable $function callback
     * @param int $position Menu display position
     *
     * @author: Chuwen
     * @date  : 2021/7/21 10:48
     */
    public function parcelpanel_add_submenu_page($page_title, $menu_title, $capability, $menu_slug, $function = '', $position = null)
    {
        add_submenu_page(
            \ParcelPanel\PP_MENU_SLAG,  // The slag of the parent menu
            $page_title,
            $menu_title,
            $capability,
            $menu_slug,
            $function,
            $position
        );
    }


    /**
     * translate
     */
    public function parcelpanel__($text)
    {
        return $this->parcelpanel_translate($text);
    }

    /**
     * Tracking Settings translate
     */
    public function parcelpanel_translate($text)
    {
        $TRANSLATIONS = \ParcelPanel\Models\TrackingSettings::instance()->tracking_page_translations;

        if (isset($TRANSLATIONS[$text])) {
            $translatedText = $TRANSLATIONS[$text];
        } else {
            $translatedText = translate($text, 'parcelpanel'); // phpcs:ignore
        }

        return $translatedText;
    }


    /**
     * Output canonical response data
     */
    public function parcelpanel_json_response($data = [], $msg = '', $success = true, $other = [])
    {
        $result = [
            'code' => 200,
            'success' => $success,
            'data' => $data,
            'msg' => $msg,
        ];

        $result = array_merge($other, $result);

        wp_send_json($result, null, 320);
    }


    /**
     * Track page url
     */
    public function parcelpanel_get_track_page_url($preview = false, $order_number = '', $email = '', $tracking_number = ''): string
    {
        $track_page_id = get_option(\ParcelPanel\OptionName\TRACK_PAGE_ID);

        $track_page_url = !empty($track_page_id) ? get_page_link($track_page_id) : 'Unknown';

        $separate = strpos($track_page_url, '?') ? '&' : '?';

        if ($preview) {
            return "{$track_page_url}{$separate}nums=1234&preview=parcelpanel";
        }

        if (empty($email) && !empty($tracking_number)) {
            $tracking_number = urlencode($tracking_number);
            return "{$track_page_url}{$separate}nums={$tracking_number}";
        }

        if ($order_number) {
            $token = \ParcelPanel\Action\UserTrackPage::encode_email($email);
            $order_number = urlencode($order_number);
            $token = urlencode($token);
            return "{$track_page_url}{$separate}order={$order_number}&token={$token}";
        }

        if ($tracking_number) {
            $tracking_number = urlencode($tracking_number);
            return "{$track_page_url}{$separate}nums={$tracking_number}";
        }

        return $track_page_url;
    }

    public function parcelpanel_get_track_page_url_by_tracking_number($tracking_number): string
    {
        return $this->parcelpanel_get_track_page_url(null, null, null, $tracking_number);
    }

    /**
     * Admin shipment url
     */
    public function parcelpanel_get_admin_home_url()
    {
        return admin_url('admin.php?page=parcelpanel');
    }

    /**
     * Admin setting url
     */
    public function parcelpanel_get_admin_settings_url()
    {
        return admin_url('admin.php?page=pp-settings');
    }

    /**
     * Admin shipment url
     */
    public function parcelpanel_get_admin_shipments_url()
    {
        return admin_url('admin.php?page=pp-shipments');
    }


    /**
     * Track Your Order text
     */
    public function parcelpanel_text_track_your_order(): string
    {
        $page_id = get_option(\Parcelpanel\OptionName\TRACK_PAGE_ID);

        $page = get_post($page_id);

        $page_title = $page->post_title ?? '';

        return $page_title ?: 'Track Your Order';
    }

    public function parcelpanel_get_shipment_status($id)
    {
        $status = [
            1 => 'pending',
            2 => 'transit',
            3 => 'pickup',
            4 => 'delivered',
            5 => 'expired',
            6 => 'undelivered',
            7 => 'exception',
            8 => 'info_received',
        ];

        return $status[$id] ?? null;
    }

    /**
     * Shipment Status
     *
     * @return array[]
     *
     * @author Mark
     * @date   2021/7/29 15:40
     */
    public function parcelpanel_get_shipment_statuses($sort = false): array
    {
        $rtn = [
            'pending' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('pending'),
                'sort' => 3,
                'id' => 1,
                'color' => '#6D7175',
                'child_status' => [],
            ],

            'transit' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('in_transit'),
                'sort' => 4,
                'id' => 2,
                'color' => '#1E93EB',
            ],

            'pickup' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('out_for_delivery'),
                'sort' => 5,
                'id' => 3,
                'color' => '#FCAF30',
            ],

            'delivered' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('delivered'),
                'sort' => 1,
                'id' => 4,
                'color' => '#1BBE73',
            ],

            'expired' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('expired'),
                'sort' => 2,
                'id' => 5,
                'color' => '#BABEC3',
            ],

            'undelivered' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('failed_attempt'),
                'sort' => 6,
                'id' => 6,
                'color' => '#8109FF',
            ],

            'exception' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('exception'),
                'sort' => 7,
                'id' => 7,
                'color' => '#FD5749',
            ],

            'info_received' => [
                'keywords' => [],
                'text' => $this->parcelpanel__('info_received'),
                'sort' => 0,
                'id' => 8,
                'color' => '#00A0AC',
                'child_status' => [],
            ],
        ];

        // if ($sort) {
        //     uasort( $rtn, 'pp_sort_shipment_statuses' );
        // }

        return $rtn;
    }

    public function parcelpanel_get_courier_list($sort = ''): stdClass
    {
        global $wpdb;

        $TABLE_COURIER = Table::$courier;

        $order_sql = '';

        if ($sort && in_array(strtoupper($sort), ['ASC', 'DESC'])) {
            $order_sql = "ORDER BY sort {$sort}";
        }

        $rows = $wpdb->get_results("SELECT * FROM {$TABLE_COURIER} {$order_sql}"); // phpcs:ignore

        $data = new stdClass();

        foreach ($rows as $row) {
            $data->{$row->code} = $row;
        }

        return $data;
    }

    public function parcelpanel_get_courier_code_from_name($name): string
    {
        global $wpdb;

        if (empty($name)) {
            return '';
        }

        $TABLE_COURIER = Table::$courier;

        return $wpdb->get_var($wpdb->prepare("SELECT code FROM {$TABLE_COURIER} WHERE `name` = %s", $name)) ?: ''; // phpcs:ignore
    }

    public function parcelpanel_get_courier_info($code)
    {
        global $wpdb;

        static $cache;

        $TABLE_COURIER = Table::$courier;

        if (empty($cache[$code])) {

            $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$TABLE_COURIER} WHERE `code` = %s", $code)); // phpcs:ignore

            $cache[$code] = $row;
        }

        return $cache[$code];
    }

    /**
     * Get the original Order ID
     */
    public function parcelpanel_get_formatted_order_id($order_id)
    {
        include_once(ABSPATH . 'wp-admin/includes/plugin.php');

        if (is_plugin_active('custom-order-numbers-for-woocommerce/custom-order-numbers-for-woocommerce.php')) {
            $alg_wc_custom_order_numbers_enabled = get_option('alg_wc_custom_order_numbers_enabled');
            $alg_wc_custom_order_numbers_prefix = get_option('alg_wc_custom_order_numbers_prefix');
            $new_order_id = str_replace($alg_wc_custom_order_numbers_prefix, '', $order_id);

            if ('yes' == $alg_wc_custom_order_numbers_enabled) {
                // @codingStandardsIgnoreStart
                $args = [
                    'post_type' => 'shop_order',
                    'posts_per_page' => '1',
                    'meta_query' => [
                        'relation' => 'OR',
                        [
                            'key' => '_alg_wc_custom_order_number',
                            'value' => $new_order_id,
                        ],
                        [
                            'key' => '_alg_wc_full_custom_order_number',
                            'value' => $order_id,
                        ],
                    ],
                    'post_status' => array_keys(wc_get_order_statuses()),
                ];
                $posts = get_posts($args);
                $my_query = new \WP_Query($args);
                // @codingStandardsIgnoreEnd

                if ($my_query->have_posts()) {
                    while ($my_query->have_posts()) {
                        $my_query->the_post();
                        if (get_the_ID()) {
                            $order_id = get_the_ID();
                        }
                    }
                }
                wp_reset_postdata();
            }
        }

        if (is_plugin_active('woocommerce-sequential-order-numbers/woocommerce-sequential-order-numbers.php')) {

            $s_order_id = wc_sequential_order_numbers()->find_order_by_order_number($order_id);
            if ($s_order_id) {
                $order_id = $s_order_id;
            }
        }

        if (is_plugin_active('woocommerce-sequential-order-numbers-pro/woocommerce-sequential-order-numbers-pro.php')) {

            // @codingStandardsIgnoreStart
            // search for the order by custom order number
            $query_args = [
                'numberposts' => 1,
                'meta_key' => '_order_number_formatted',
                'meta_value' => $order_id,
                'post_type' => 'shop_order',
                'post_status' => 'any',
                'fields' => 'ids',
            ];
            // @codingStandardsIgnoreEnd
            $posts = get_posts($query_args);
            if (!empty($posts)) {
                [$order_id] = $posts;
            }
        }

        if (is_plugin_active('woocommerce-jetpack/woocommerce-jetpack.php')) {

            $wcj_order_numbers_enabled = get_option('wcj_order_numbers_enabled');

            if ('yes' == $wcj_order_numbers_enabled) {
                // Get prefix and suffix options
                $prefix = do_shortcode(get_option('wcj_order_number_prefix', ''));
                $prefix .= date_i18n(get_option('wcj_order_number_date_prefix', ''));
                $suffix = do_shortcode(get_option('wcj_order_number_suffix', ''));
                $suffix .= date_i18n(get_option('wcj_order_number_date_suffix', ''));

                // Ignore suffix and prefix from search input
                $search_no_suffix = preg_replace("/\A{$prefix}/i", '', $order_id);
                $search_no_suffix_and_prefix = preg_replace("/{$suffix}\z/i", '', $search_no_suffix);
                $final_search = $search_no_suffix_and_prefix ?: $order_id;
                // @codingStandardsIgnoreStart
                $query_args = [
                    'numberposts' => 1,
                    'meta_key' => '_wcj_order_number',
                    'meta_value' => $final_search,
                    'post_type' => 'shop_order',
                    'post_status' => 'any',
                    'fields' => 'ids',
                ];
                // @codingStandardsIgnoreEnd
                $posts = get_posts($query_args);
                if (!empty($posts)) {
                    [$order_id] = $posts;
                }
            }
        }

        if (is_plugin_active('wp-lister-amazon/wp-lister-amazon.php')) {
            $wpla_use_amazon_order_number = get_option('wpla_use_amazon_order_number');
            if (1 == $wpla_use_amazon_order_number) {
                // @codingStandardsIgnoreStart
                $query_args = [
                    'numberposts' => 1,
                    'meta_key' => '_wpla_amazon_order_id',
                    'meta_value' => $order_id,
                    'post_type' => 'shop_order',
                    'post_status' => 'any',
                    'fields' => 'ids',
                ];
                // @codingStandardsIgnoreEnd
                $posts = get_posts($query_args);
                if (!empty($posts)) {
                    [$order_id] = $posts;
                }
            }
        }

        if (is_plugin_active('wp-lister/wp-lister.php') || is_plugin_active('wp-lister-for-ebay/wp-lister.php')) {
            // @codingStandardsIgnoreStart
            $args = [
                'post_type' => 'shop_order',
                'posts_per_page' => '1',
                'meta_query' => [
                    'relation' => 'OR',
                    [
                        'key' => '_ebay_extended_order_id',
                        'value' => $order_id,
                    ],
                    [
                        'key' => '_ebay_order_id',
                        'value' => $order_id,
                    ],
                ],
                'post_status' => 'any',
            ];
            // @codingStandardsIgnoreEnd

            $posts = get_posts($args);
            $my_query = new \WP_Query($args);

            if ($my_query->have_posts()) {
                while ($my_query->have_posts()) {
                    $my_query->the_post();
                    if (get_the_ID()) {
                        $order_id = get_the_ID();
                    }
                }
            }
            wp_reset_postdata();
        }

        if (is_plugin_active('yith-woocommerce-sequential-order-number-premium/init.php')) {
            // @codingStandardsIgnoreStart
            $query_args = [
                'numberposts' => 1,
                'meta_key' => '_ywson_custom_number_order_complete',
                'meta_value' => $order_id,
                'post_type' => 'shop_order',
                'post_status' => 'any',
                'fields' => 'ids',
            ];
            // @codingStandardsIgnoreEnd
            $posts = get_posts($query_args);
            if (!empty($posts)) {
                [$order_id] = $posts;
            }
        }

        if (is_plugin_active('wt-woocommerce-sequential-order-numbers/wt-advanced-order-number.php')) {
            // @codingStandardsIgnoreStart
            $query_args = [
                'numberposts' => 1,
                'meta_key' => '_order_number',
                'meta_value' => $order_id,
                'post_type' => 'shop_order',
                'post_status' => 'any',
                'fields' => 'ids',
            ];
            // @codingStandardsIgnoreEnd

            $posts = get_posts($query_args);
            if (!empty($posts)) {
                [$order_id] = $posts;
            }
        }

        return $order_id;
    }

    /**
     * Post ShopOrder query params
     *
     * @param array $query_vars
     * @param int $after_date default: 30 day ago
     * @param int $sync_status 0: Not synchronized successfully, 1: Synchronized successfully, false: No filtering
     *
     * @return array|\WP_Error Exception: Not installed exception
     */
    public function parcelpanel_get_shop_order_query_args($query_vars = [], $after_date = 30, $sync_status = 0, $limit = 100)
    {
        // @codingStandardsIgnoreStart
        $wp_query_args = [
            'fields' => 'ids',
            'post_type' => 'shop_order',
            'post_status' => 'any',
            'orderby' => 'post_date',
            'order' => 'ASC',
            'posts_per_page' => $limit,
        ];

        // $wp_query_args = wp_parse_args( $query_vars, $wp_query_args );

        if (is_numeric($after_date)) {

            // $connected_datetime = pp_get_datetime_base_on_connected_time();
            //
            // if ( empty( $connected_datetime ) ) {
            //     return new \WP_Error( 'no_install' );
            // }
            //
            // $wp_query_args[ 'date_query' ] = [
            //     'column'    => 'post_date_gmt',
            //     'after'     => $connected_datetime->format( 'Y-m-d H:i:s' ),
            //     'inclusive' => true,
            // ];

            $wp_query_args['date_query'] = [
                'column' => 'post_date',
                'after' => "{$after_date} day ago",
                'inclusive' => true,
            ];
        }

        if (0 === $sync_status) {
            $wp_query_args['meta_query'] = [
                'relation' => 'OR',
                [
                    'key' => '_parcelpanel_sync_status',
                    'compare_key' => 'NOT EXISTS',
                ],
                [
                    'key' => '_parcelpanel_sync_status',
                    'value' => '1',
                    'compare' => '!=',
                ],
            ];
        } elseif (1 === $sync_status) {
            $wp_query_args['meta_query'] = [
                [
                    'key' => '_parcelpanel_sync_status',
                    'value' => '1',
                ],
            ];
        }
        // @codingStandardsIgnoreEnd
        return $wp_query_args;
    }


    public function parcelpanel_get_client_ip()
    {
        $fields = [
            'HTTP_CF_CONNECTING_IP',
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR',
        ];

        $result = [];

        foreach ($fields as $field) {
            if (!empty($_SERVER[$field])) {
                $result[$field] = wc_clean($_SERVER[$field]);
            }
        }

        return $result;
    }

    public function parcelpanel_update_setting_action()
    {
        \ParcelPanel\Api\Configs::get_pp_setting_config();
    }

    // Get the corresponding language collection of the user background
    public function getAdminLangList()
    {
        // Get pp and set the current language version (the background page language shall be subject to the PP background language type)
        $langRes = \ParcelPanel\Action\Common::getCommonSetting();
        $lang = $langRes['lang'] ?? '';
        $langList = $langRes['langList'] ?? [];
        update_option(\ParcelPanel\OptionName\PP_LANG_NOW, $lang);
        return Lang::instance()->langToWordpress($langList);
    }

    /**
     * Func check js & css add
     */
    public function get_add_js_css()
    {
        return \ParcelPanel\Action\Common::get_add_js_css_setting();
    }


    /**
     * Func get tags
     *
     * @return array
     */
    public function get_tags()
    {
        $category_names = get_terms(
            array(
                'taxonomy' => 'product_tag',
                'pad_counts' => false,
                'hide_empty' => false,
            )
        );
        return $this->get_tags_data_new($category_names);
    }

    public function getCategory()
    {
        $category_names = get_terms(
            array(
                'taxonomy' => 'product_cat',
                'pad_counts' => false,
                'hide_empty' => false,
                // 'include'  => $category_ids,
                // 'fields'   => 'names',
            )
        );
        $old_cate = $this->getCategoryData($category_names);
        $new_cate = $this->get_category_data_new($category_names);
        return array(
            'old_cate' => $old_cate,
            'new_cate' => $new_cate
        );
    }

    private function getCategoryData($list, $res = [], $pid = 0, $deep = 0)
    {
        foreach ($list as $v) {
            $term_id = $v->term_id ?? 0;
            $name = $v->name ?? '';
            $parent = $v->parent ?? 0;
            if (empty($term_id) || empty($name)) {
                continue;
            }
            if ($parent === $pid) {
                if (empty($parent)) {
                    $deep = 0;
                }
                $str = $deep ? str_repeat(' ', $deep) : '';
                $res[] = [
                    'value' => $term_id,
                    'label' => $str . $name,
                ];
                $deep++;
                // Get the corresponding subset
                $res = $this->getCategoryData($list, $res, $term_id, $deep);
            }
        }
        return $res;
    }

    /**
     * Func get tags data new.
     * @param array $list List.
     * @param array $res Res.
     * @param int $pid Pid.
     * @param int $deep Deep.
     * 
     * @return array Res.
     */
    private function get_tags_data_new($list, $res = [], $pid = 0, $deep = 0)
    {
        foreach ($list as $v) {
            $term_id = $v->term_id ?? 0;
            $name = $v->name ?? '';
            $parent = $v->parent ?? 0;
            if (empty($term_id) || empty($name)) {
                continue;
            }
            if ($parent === $pid) {
                $res[] = [
                    'parent' => $pid,
                    'value' => $term_id,
                    'label' => $name,
                ];
                // Get the corresponding subset.
                $res = $this->get_tags_data_new($list, $res, $term_id, $deep);
            }
        }

        return $res;
    }

    /**
     * Func get category data new.
     * @param array $list List.
     * @param array $category Category.
     *
     * @return array Category new.
     */
    private function get_category_data_new($list, $category = [])
    {
        foreach ($list as $v) {
            $term_id = $v->term_id ?? 0;
            $name = $v->name ?? '';
            $parent = $v->parent ?? 0;
            if (empty($term_id) || empty($name)) {
                continue;
            }
            $category[$parent][$term_id] = [
                'value' => $term_id,
                'label' => $name,
            ];
        }

        $category_new = [];
        $category_new = $category[0] ?? [];
        unset($category[0]);
        $category_new = $this->children_cate($category, $category_new);

        $category_new = $this->cate_array_values($category_new);
        $category_new = array_values($category_new);

        return $category_new;
    }

    /**
     * Func cate array values.
     * @param array $data Data.
     *
     * @return array Data.
     */
    private function cate_array_values($data)
    {
        foreach ($data as &$value) {
            if (isset($value['children'])) {
                $value['children'] = array_values($value['children']);
                $value['children'] = $this->cate_array_values($value['children']);
            }
        }

        return $data;
    }

    /**
     * Func children cate.
     * @param array $category Category.
     * @param array $category_new Category new.
     *
     * @return array Category new.
     */
    private function children_cate($category, $category_new)
    {
        if (!empty($category)) {
            foreach ($category_new as &$v) {
                $v['children'] = [];
                $value = $v['value'];
                if (!empty($category[$value])) {
                    $v['children'] = $category[$value];
                    unset($category[$value]);
                }

                if (!empty($category)) {
                    $v['children'] = $this->children_cate($category, $v['children']);
                }

                if (empty($v['children'])) {
                    unset($v['children']);
                }
            }
        }
        return $category_new;
    }

    /**
     * Func using wp_cache_get() / wp_cache_set() or wp_cache_delete().
     * 
     * @param $key name of cache.
     * @param $data data of cache.
     * @param $type type of cache 1 get 2 set 3 del.
     * @param $expire // DAY_IN_SECONDS HOUR_IN_SECONDS MINUTE_IN_SECONDS.
     *
     * @return array|string|bool res data.
     */
    public function catch_data_all($key, $data = array(), $type = 1, $expire = HOUR_IN_SECONDS)
    {
        $group = 'parcelpanel';
        $res = false;
        if ($type == 1) {
            $res = wp_cache_get($key, $group);
        } else if ($type == 2) {
            $res = wp_cache_set($key, $data, $group, $expire);
        } else if ($type == 3) {
            $res = wp_cache_delete($key, $group);
        }
        return $res;
    }

    // public function get_couriers()
    // {
    //     $cache_key = 'ppwc_cached_couriers';
    //     $couriers = get_transient($cache_key);
    //     if (false === $couriers) {
    //         global $wpdb;
    //         $TABLE_COURIER = Table::$courier;
    //         $key = 'PPWC_COURIER_LIST';
    //         $group = 'parcelpanel';
    //         $couriers = wp_cache_get($key, $group);
    //         if ($couriers === false) {
    //             $couriers = $wpdb->get_results("SELECT * FROM $TABLE_COURIER"); // phpcs:ignore
    //             wp_cache_set($key, $couriers, $group, 3600);
    //         }
    //         wp_cache_delete($key, $group);
    //         set_transient($cache_key, $couriers, DAY_IN_SECONDS); // DAY_IN_SECONDS HOUR_IN_SECONDS MINUTE_IN_SECONDS
    //     }
    //     return $couriers;
    // }

}

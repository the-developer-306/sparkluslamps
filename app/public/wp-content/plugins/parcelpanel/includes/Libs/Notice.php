<?php

namespace ParcelPanel\Libs;

use ParcelPanel\Api\Api;
use ParcelPanel\Api\Configs;
use ParcelPanel\ParcelPanelFunction;

/**
 * some code from ：/wp-content/plugins/woocommerce/includes/admin/class-wc-admin-notices.php
 */
class Notice
{
    // The storage inside is similar to notice_quota_remain
    private static $notices = [];
    private static $core_notices = [
        'notice_quota_remain',
        'feedback_notice',
        'plugins_feedback_notice',
        'free_upgrade_notice',
        'free_sync_orders_notice',
        'remove_pp_branding_notice',
        // 'question_banner_notice',
        'nps_banner_notice',
        'question_2_banner_notice',
    ];

    /**
     * Reminders that need to be issued during initialization
     */
    public static function init()
    {
        // TODO Get pp notice configuration information and set it up
        // Configs::get_pp_notice_config();

        $core_notices = self::$core_notices;
        if (!is_array($core_notices) || empty($core_notices)) return;

        foreach ($core_notices as $notice) {
            self::$notice();
        }
    }

    /**
     * Insufficient balance reminder Banner
     * Write the logic here, whether to display the quota reminder
     */
    public static function notice_quota_remain()
    {
        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\CLOSE_QUOTA_NOTICE, strtotime('tomorrow midnight'));
        }, 'notice_quota_remain');
        if ($hide_notices) return;

        // new
        if (get_option(\ParcelPanel\OptionName\CLOSE_QUOTA_NOTICE)) {
            return;
        }

        $WP_Screen = get_current_screen();

        $true_list = [
            // $WP_Screen->id != 'parcelpanel_page_pp-account' && $WP_Screen->parent_base === 'pp-admin',  // ParcelPanel Page
            // $WP_Screen->id === 'edit-shop_order' && $WP_Screen->parent_base === 'woocommerce',  // WC Orders
            // $WP_Screen->id === 'dashboard' && $WP_Screen->parent_base === 'index',  // Dashboard page
        ];

        // if (in_array(true, $true_list, true)) {
        //     (new ParcelPanelFunction)->parcelpanel_include_view('notices/quota-remain');
        // }
    }

    /**
     * Feedback Notice
     */
    public static function feedback_notice()
    {
        return;

        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FEEDBACK, time());
        }, 'feedback_notice');
        if ($hide_notices) return;

        $WP_Screen = get_current_screen();

        $true_list = [
            // Home Page（close no open）
            // $WP_Screen->id === 'parcelpanel_page_parcelpanel' && $WP_Screen->parent_base === 'pp-admin'
            // && ! get_option( \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FEEDBACK ),

            // Account Page
            // $WP_Screen->id === 'parcelpanel_page_pp-account' && $WP_Screen->parent_base === 'pp-admin',
        ];

        if (in_array(true, $true_list, true)) {
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/feedback-admin');
        }
    }

    /**
     * Question Notice
     */
    public static function question_banner_notice()
    {
        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION, time());
        }, 'question_banner_notice');

        if ($hide_notices) return;

        $WP_Screen = get_current_screen();

        if (get_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION)) {
            return;
        }

        $true_list = [
            // Home Page（close no open）
            // $WP_Screen->id === 'parcelpanel_page_parcelpanel' && $WP_Screen->parent_base === 'pp-admin',
            // $WP_Screen->id === 'edit-product_cat' && $WP_Screen->parent_base === 'edit',  // WC Categories page
            // $WP_Screen->id === 'edit-shop_order' && $WP_Screen->parent_base === 'woocommerce',  // WC Orders
            // $WP_Screen->id === 'dashboard' && $WP_Screen->parent_base === 'index',  // Dashboard page
            // $WP_Screen->id === 'update-core' && $WP_Screen->parent_base === 'index',  // Dashboard update page
        ];

        if (in_array(true, $true_list, true)) {
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/question-2-banner-admin');
        }
    }

    /**
     * Question Notice
     */
    public static function question_2_banner_notice()
    {
        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION_TWO, 0);

            // up in pp when is close
            $data = [
                'config' => [
                    'type' => 1,
                    'name' => \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION_TWO,
                    'value' => 0,
                ]
            ];
            $res = Api::configs_update_to_pp($data);
        }, 'question_2_banner_notice');

        if ($hide_notices) return;

        $WP_Screen = get_current_screen();

        if (!get_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION_TWO)) {
            return;
        }

        $true_list = [
            // Home Page（close no open）
            $WP_Screen->id === 'plugins' && $WP_Screen->parent_base === 'plugins',  // WD plugins install page
            $WP_Screen->id === 'woocommerce_page_wc-admin' && $WP_Screen->parent_base === 'woocommerce',  // WC Home
            $WP_Screen->id === 'woocommerce_page_wc-orders' && $WP_Screen->parent_base === 'woocommerce',  // WC Orders
            $WP_Screen->id === 'dashboard' && $WP_Screen->parent_base === 'index',  // Dashboard page
        ];

        if (in_array(true, $true_list, true)) {
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/question-2-banner-admin');
        }
    }

    /**
     * NPS Notice
     */
    public static function nps_banner_notice()
    {
        return;

        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_NPS, time());
        }, 'nps_banner_notice');

        if ($hide_notices) return;

        $WP_Screen = get_current_screen();

        if (get_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_NPS)) {
            return;
        }
        // var_dump($WP_Screen->id, $WP_Screen->parent_base);
        // die;
        $true_list = [
            // Home Page（close no open）
            // // $WP_Screen->id === 'parcelpanel_page_parcelpanel' && $WP_Screen->parent_base === 'pp-admin',
            // $WP_Screen->id === 'plugins' && $WP_Screen->parent_base === 'plugins',
            // $WP_Screen->id === 'woocommerce_page_wc-admin' && $WP_Screen->parent_base === 'woocommerce',  // WC Home page
            // $WP_Screen->id === 'edit-shop_order' && $WP_Screen->parent_base === 'woocommerce',  // WC Orders
            // $WP_Screen->id === 'dashboard' && $WP_Screen->parent_base === 'index',  // Dashboard page
            // $WP_Screen->id === 'update-core' && $WP_Screen->parent_base === 'index',  // Dashboard update page
        ];

        if (in_array(true, $true_list, true)) {
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/nps-banner-admin');
        }
    }

    /**
     * Feedback Notice
     */
    public static function plugins_feedback_notice()
    {
        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_PLUGINS_FEEDBACK, time());
        }, 'plugins_feedback_notice');
        if ($hide_notices) return;

        $screen = get_current_screen();

        $true_list = [
            // Plugins
            // $screen->id === 'plugins'
            //     && get_option(\ParcelPanel\OptionName\CONNECTED_AT) + 259200 < time()
            //     && !get_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_PLUGINS_FEEDBACK)
        ];

        if (in_array(true, $true_list, true)) {
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/admin-plugins-feedback');
        }
    }

    /**
     * Free upgrade Notice
     */
    static function free_upgrade_notice()
    {
        return;

        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_UPGRADE, time());
        }, 'free_upgrade_notice');
        if ($hide_notices) return;

        $WP_Screen = get_current_screen();

        $is_free_plan = get_option(\ParcelPanel\OptionName\IS_FREE_PLAN);

        $true_list = [
            // Home Page
            // $WP_Screen->id === 'parcelpanel_page_parcelpanel' && $WP_Screen->parent_base === 'pp-admin'
            // && ! get_option( \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_UPGRADE )
            // && ( $is_free_plan === false || ( $is_free_plan === '1' && ! get_option( \ParcelPanel\OptionName\IS_UNLIMITED_PLAN ) ) ),
        ];

        if (in_array(true, $true_list, true)) {
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/free-upgrade-admin');
        }
    }

    /**
     * Free sync orders Notice
     */
    static function free_sync_orders_notice()
    {

        return;

        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_SYNC_ORDERS, time());
        }, 'free_sync_orders_notice');
        if ($hide_notices) return;

        $WP_Screen = get_current_screen();

        $true_list = [
            // Shipments Page
            // $WP_Screen->id === 'parcelpanel_page_pp-shipments' && $WP_Screen->parent_base === 'pp-admin'
            // && ! get_option( \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_SYNC_ORDERS ),
        ];

        if (in_array(true, $true_list, true)) {
            $registered_at = get_option(\ParcelPanel\OptionName\REGISTERED_AT);
            if (empty($registered_at)) {
                return;
            }
            // 注册时间超过一天
            if ($registered_at + 86400 < time()) {
                return;
            }
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/free-sync-orders-admin');
        }
    }

    /**
     * Remove ParcelPanel branding Notice
     */
    static function remove_pp_branding_notice()
    {
        return;

        $hide_notices = self::hide_notices(function () {
            update_option(\ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_REMOVE_BRANDING, time());
        }, 'remove_pp_branding_notice');
        if ($hide_notices) return;

        $WP_Screen = get_current_screen();

        $true_list = [
            // Tracking Page
            // $WP_Screen->id === 'parcelpanel_page_pp-tracking-page' && $WP_Screen->parent_base === 'pp-admin'
            // && ! get_option( \ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_REMOVE_BRANDING )
            // && ! get_option( \ParcelPanel\OptionName\REMOVE_BRANDING ),
        ];

        if (in_array(true, $true_list, true)) {
            (new ParcelPanelFunction)->parcelpanel_include_view('notices/remove-pp-branding-admin');
        }
    }

    #####################################
    ################操作类################
    #####################################

    /**
     * Hide a notice if the GET variable is set.
     *
     * @param callable|null $callback The callback will return the $hide_notice parameter, please be sure to accept it.
     */
    public static function hide_notices($callback = null, $notice = '')
    {
        if (isset($_GET['pp-hide-notice']) && isset($_GET['_pp_notice_nonce']) && isset($_GET['_expired_at'])) { // WPCS: input var ok, CSRF ok.
            if (!wp_verify_nonce(sanitize_key(wp_unslash($_GET['_pp_notice_nonce'])), 'parcelpanel_hide_notices_nonce')) { // WPCS: input var ok, CSRF ok.
                wp_die(esc_html__('Action failed. Please refresh the page and retry.', 'parcelpanel'));
            }

            if ($_GET['_expired_at'] < time()) {
                return false;
            }

            // if (!current_user_can('manage_woocommerce')) {
            //     wp_die(esc_html__('You don&#8217;t have permission to do this.', 'woocommerce'));
            // }

            $hide_notice = sanitize_text_field(wp_unslash($_GET['pp-hide-notice'])); // WPCS: input var ok, CSRF ok.

            if ($notice == $hide_notice && is_callable($callback)) {
                $callback($hide_notice);
                return true;
            }

            self::remove_notice($hide_notice);
        }

        return false;
    }

    /**
     * Remove reminder
     */
    public static function remove_notice(string $hide_notice)
    {
        // TODO future features
    }

    /**
     * storage reminder
     */
    public static function store_notices()
    {
        update_option('parcelpanel_admin_notices', self::get_notices());
    }

    /**
     * Get reminder
     *
     * @return mixed
     */
    public static function get_notices()
    {
        return self::$notices;
    }
}

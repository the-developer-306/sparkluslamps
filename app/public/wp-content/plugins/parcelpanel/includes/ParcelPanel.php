<?php

/**
 * @author Lijiahao
 * @date   2023/2/25 9:33
 */

namespace ParcelPanel;

use ParcelPanel\Action\AdminIntegration;
use ParcelPanel\Action\AdminSettings;
use ParcelPanel\Action\AdminShipments;
use ParcelPanel\Action\Common;
use ParcelPanel\Action\Courier;
use ParcelPanel\Action\Email;
use ParcelPanel\Action\ShopOrder;
use ParcelPanel\Action\TrackingNumber;
use ParcelPanel\Action\Upload;
use ParcelPanel\Action\UserTrackPage;
use ParcelPanel\Api\Api;
use ParcelPanel\Api\Configs;
use ParcelPanel\Api\RestApi;
use ParcelPanel\Api\Orders;
use ParcelPanel\Libs\ArrUtils;
use ParcelPanel\Libs\HooksTracker;
use ParcelPanel\Libs\Notice;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;

/**
 * Class ParcelPanel
 * 与 wordpress controller
 *
 * @package ParcelPanel
 */
final class ParcelPanel
{
    use Singleton;


    /**
     * DB updates and callbacks that need to be run per version.
     *
     * @var array
     */
    private static $db_updates = [
        '2.0.0' => [
            'parcelpanel_update_200_migrate_tracking_data',
            'parcelpanel_update_200_db_version',
        ],
        '2.2.0' => [
            'parcelpanel_update_220_migrate_tracking_data',
            'parcelpanel_update_220_db_version',
        ],
        '2.8.0' => [
            'parcelpanel_update_280_enable_integration',
            'parcelpanel_update_280_db_version',
        ],
        '2.9.0' => [
            'parcelpanel_update_290_add_tracking',
            'parcelpanel_update_290_db_version',
        ],
    ];


    /**
     * Constructor. Some events that will be executed during construction
     */
    private function __construct()
    {
        $this->load_plugin_textdomain();  // Localization initialization
        $this->define_constants();  // Define some commonly used constants
        $this->define_tables();
        $this->init_hooks();  // Initialize hook method
        $this->init_ajax();
        $this->init_shortcode();
        $this->checkoutSavePro(); // product GY (product attribution)
    }

    /**
     * Define some constants
     *
     * @author: Chuwen
     * @date  : 2021/7/20 18:16
     */
    private function define_constants()
    {
        // parent slag 
        define('ParcelPanel\PP_MENU_SLAG', 'pp-admin');

        // template path
        define('ParcelPanel\TEMPLATE_PATH', PLUGIN_PATH . '/templates/');

        // Track Page ID
        define('ParcelPanel\OptionName\TRACK_PAGE_ID', 'parcelpanel_track_page_id');

        // DB Version
        define('ParcelPanel\OptionName\DB_VERSION', 'parcelpanel_db_version');
        // Plugin Version
        define('ParcelPanel\OptionName\PLUGIN_VERSION', 'parcelpanel_plugin_version');

        // Tracking Settings
        define('ParcelPanel\OptionName\TRACKING_PAGE_OPTIONS', 'parcelpanel_tracking_page_options');
        define('ParcelPanel\OptionName\TRACKING_PAGE_NEW_OPTIONS', 'parcelpanel_tracking_page_new_options');
        // Common Carrier Data
        define('ParcelPanel\OptionName\SELECTED_COURIER', 'parcelpanel_selected_courier');

        // Order number import record
        define('ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_IDS', 'parcelpanel_tracking_number_import_record_ids');
        define('ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_DATA', 'parcelpanel_tracking_number_import_record_%s');

        // quota date
        define('ParcelPanel\OptionName\QUOTA_CONFIG', 'parcelpanel_quota_config');

        define('ParcelPanel\OptionName\REGISTERED_AT', 'parcelpanel_registered_at');
        // connect time
        define('ParcelPanel\OptionName\CONNECTED_AT', 'parcelpanel_connected_at');
        define('ParcelPanel\OptionName\LAST_ATTEMPT_CONNECT_AT', 'parcelpanel_last_attempt_connect_at');
        // Authentication Code
        define('ParcelPanel\OptionName\CLIENT_CODE', 'parcelpanel_client_code');
        // API KEY
        define('ParcelPanel\OptionName\API_KEY', 'parcelpanel_api_key');
        // ParcelPanel registered ID
        define('ParcelPanel\OptionName\API_UID', 'parcelpanel_api_uid');
        // Website ID
        define('ParcelPanel\OptionName\API_BID', 'parcelpanel_api_bid');
        define('ParcelPanel\OptionName\REMOVE_BRANDING', 'parcelpanel_remove_branding');

        define('ParcelPanel\OptionName\CLOSE_QUOTA_NOTICE', 'parcelpanel_close_quota_notice');
        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FEEDBACK', 'parcelpanel_admin_notice_ignore_feedback');
        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION', 'parcelpanel_admin_notice_ignore_question');
        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_QUESTION_TWO', 'parcelpanel_admin_notice_ignore_question_tow');

        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_NPS', 'parcelpanel_admin_notice_ignore_nps');
        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_PLUGINS_FEEDBACK', 'parcelpanel_admin_notice_ignore_plugins_feedback');
        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_REMOVE_BRANDING', 'parcelpanel_admin_notice_ignore_remove_branding');
        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_SYNC_ORDERS', 'parcelpanel_admin_notice_ignore_free_sync_orders');
        define('ParcelPanel\OptionName\ADMIN_NOTICE_IGNORE_FREE_UPGRADE', 'parcelpanel_admin_notice_ignore_free_upgrade');

        // plan quota now
        define('ParcelPanel\OptionName\PLAN_QUOTA', 'parcelpanel_plan_quota');
        // plan quota remain
        define('ParcelPanel\OptionName\PLAN_QUOTA_REMAIN', 'parcelpanel_plan_quota_remain');
        // is free plan
        define('ParcelPanel\OptionName\IS_FREE_PLAN', 'parcelpanel_is_free_plan');
        // is unlimited plan
        define('ParcelPanel\OptionName\IS_UNLIMITED_PLAN', 'parcelpanel_is_unlimited_plan');

        // first sync time
        define('ParcelPanel\OptionName\FIRST_SYNCED_AT', 'parcelpanel_first_synced_at');

        // setting configs
        define('ParcelPanel\OptionName\ORDERS_PAGE_ADD_TRACK_BUTTON', 'parcelpanel_orders_page_add_track_button');
        define('ParcelPanel\OptionName\EMAIL_NOTIFICATION_ADD_TRACKING_SECTION', 'parcelpanel_email_notification_add_tracking_section');
        define('ParcelPanel\OptionName\TRACKING_SECTION_ORDER_STATUS', 'parcelpanel_tracking_section_order_status');
        define('ParcelPanel\OptionName\TRACK_BUTTON_ORDER_STATUS', 'parcelpanel_track_button_order_status');
        define('ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK', 'parcelpanel_admin_order_actions_add_track');
        define('ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS', 'parcelpanel_admin_order_actions_add_track_order_status');

        // rename complete to shipped（old config）
        define('ParcelPanel\OptionName\STATUS_SHIPPED', 'parcelpanel_status_shipped');
        // rename complete to shipped 1 check is change
        define('ParcelPanel\OptionName\STATUS_SHIPPED_CHECK', 'parcelpanel_status_shipped_check');

        // default choose status last time in add/update shipment
        define('ParcelPanel\OptionName\SHIPMENT_STATUS_DEFAULT', 'parcelpanel_shipment_status_default');

        // fulfill_workflow config
        define('ParcelPanel\OptionName\FULFILL_WORKFLOW', 'parcelpanel_fulfill_workflow');

        // fulfill_workflow_check config for Display all orders with different statuses when the status is not in the order status collection
        define('ParcelPanel\OptionName\FULFILL_WORKFLOW_CHECK', 'parcelpanel_fulfill_workflow_check');

        // order status has change to delivered once
        define('ParcelPanel\OptionName\CHENGE_DELIVERED', 'parcelpanel_change_delivered_%d');

        // email send only now tracking shipment
        define('ParcelPanel\OptionName\NO_EMAIL_TRACKING', 'parcelpanel_no_email_tracking_%d');

        // APP integration enabled
        define('ParcelPanel\OptionName\INTEGRATION_APP_ENABLED', 'parcelpanel_integration_app_enabled_%d');
    }

    /**
     * define some data
     *
     * @author: Chuwen
     * @date  : 2021/7/20 18:16
     */
    private function define_tables()
    {
        global $wpdb;

        Table::$courier = "{$wpdb->prefix}parcelpanel_courier";
        Table::$tracking = "{$wpdb->prefix}parcelpanel_tracking";
        Table::$tracking_items = "{$wpdb->prefix}parcelpanel_tracking_items";
        Table::$location = "{$wpdb->prefix}parcelpanel_location";
    }

    /**
     * Initialize hook method
     *
     * @author: Chuwen
     * @date  : 2021/7/20 18:17
     */
    private function init_hooks()
    {

        // active plugin
        add_action('activated_plugin', [$this, 'app_activated']);

        // deactivated plugin
        add_action('deactivated_plugin', [$this, 'app_deactivated']);

        // Update plug-in completion action Triggered when the upgrade program is completed
        add_action('upgrader_process_complete', [Configs::class, 'update_plugin_complete']);

        // Uninstall plug-in event
        // register_uninstall_hook(__FILE__, [$this]);

        // Site initialization
        add_action('init', [$this, 'site_init']);

        add_action('admin_notices', [Notice::class, 'init']);

        // add admin menu
        add_action('admin_menu', [$this, 'add_admin_menu']);
        // page=pp-home to page=parcelpanel
        add_action('admin_init', [$this, 'custom_admin_menu_redirects']);

        // register app
        add_action('admin_init', [$this, 'register_app']);
        // page init
        add_action('admin_init', [$this, 'admin_init']);

        // preview email
        add_action('admin_init', [Email::instance(), 'preview_emails_new']);

        add_filter('set_screen_option_parcelpanel_page_pp_shipments_per_page', [$this, 'set_screen_option'], 10, 3);

        add_action('rest_api_init', [$this, 'rest_api_init']);
        add_filter('determine_current_user', [RestApi::class, 'authenticate']);
        add_filter('rest_authentication_errors', [RestApi::class, 'authentication_fallback']);
        add_filter('rest_authentication_errors', [RestApi::class, 'check_authentication_error'], 15);

        // order shipment detail email model
        add_action('woocommerce_email_before_order_table', [Email::instance(), 'order_shipment_info'], 0, 4);
        add_action('parcelpanel_email_order_details', [Email::instance(), 'shipment_email_order_details'], 10, 5);

        // add in footer
        add_action('admin_footer', [$this, 'footer_function']);
        add_action('admin_footer', [$this, 'deactivate_scripts']);

        add_action('post_updated', [$this, 'post_updated_track_page'], 10, 3);

        // in WooCommerce order page add meta box
        add_action('add_meta_boxes', [$this, 'add_meta_boxes']);
        // save shop_order & save meta box
        add_action('woocommerce_process_shop_order_meta', [ShopOrder::instance(), 'save_meta_box'], 0, 2);

        // new order action
        add_action('woocommerce_new_order', [ShopOrder::instance(), 'new_order'], 50);
        add_action('woocommerce_update_order', [ShopOrder::instance(), 'wc_update_order'], 99);
        // delete article action
        add_action('deleted_post', [ShopOrder::class, 'delete_shop_order'], 10, 2);
        // delete order action
        add_action('woocommerce_delete_order', [ShopOrder::class, 'delete_shop_order']);
        // order to trash
        add_action('woocommerce_trash_order', [$this, 'trash_order']);

        // hook for when order status is changed
        add_filter('woocommerce_email_classes', [$this, 'init_custom_emails']);
        add_filter('woocommerce_email_actions', [$this, 'register_custom_email_actions'], 10);

        // order list get by select
        add_action('restrict_manage_posts', [ShopOrder::instance(), 'filter_orders_by_shipment_status'], 20);
        add_filter('request', [ShopOrder::instance(), 'filter_orders_by_shipment_status_query']);

        // order list set col list
        add_filter('manage_edit-shop_order_columns', [ShopOrder::instance(), 'add_shop_order_columns_header'], 20);
        add_action('manage_shop_order_posts_custom_column', [ShopOrder::instance(), 'render_shop_order_columns']);

        // compatible with HPOS
        add_action('woocommerce_order_list_table_restrict_manage_orders', [ShopOrder::instance(), 'filter_orders_by_shipment_status_HPOS'], 20);
        add_filter('woocommerce_order_list_table_prepare_items_query_args', [ShopOrder::instance(), 'filter_orders_by_shipment_status_query_HPOS']);
        // add_filter('woocommerce_shop_order_list_table_prepare_items_query_args', [ShopOrder::instance(), 'filter_orders_by_shipment_status_query_HPOS']);
        add_filter('manage_woocommerce_page_wc-orders_columns', [ShopOrder::instance(), 'add_shop_order_columns_header'], 10);
        add_action('manage_woocommerce_page_wc-orders_custom_column', [ShopOrder::instance(), 'render_woocommerce_page_order_columns'], 10, 2);
        add_filter('woocommerce_register_woocommerce_page_wc-orders_post_statuses', [$this, 'filter_woocommerce_register_shop_order_post_statuses'], 10);
        add_filter('bulk_actions-woocommerce_page_wc-orders', [$this, 'modify_bulk_actions'], 50);
        add_filter('bulk_actions-woocommerce_page_wc-orders', [$this, 'add_bulk_actions_partial_shipped'], 50);
        // compatible with HPOS

        add_filter('woocommerce_admin_order_actions', [ShopOrder::instance(), 'admin_order_actions'], 100, 2);

        // rename order status, rename bulk action, rename filter
        add_filter('wc_order_statuses', [$this, 'wc_renaming_order_status']);
        add_filter('woocommerce_register_shop_order_post_statuses', [$this, 'filter_woocommerce_register_shop_order_post_statuses'], 10);
        add_filter('bulk_actions-edit-shop_order', [$this, 'modify_bulk_actions'], 50);

        // register order status
        add_action('init', [$this, 'register_partial_shipped_order_status']);
        // add status after completed
        add_filter('wc_order_statuses', [$this, 'add_partial_shipped_to_order_statuses']);
        // Custom Statuses in admin reports
        add_filter('woocommerce_reports_order_statuses', [$this, 'include_partial_shipped_order_status_to_reports'], 20);
        // for automate woo to check order is paid
        add_filter('woocommerce_order_is_paid_statuses', [$this, 'partial_shipped_woocommerce_order_is_paid_statuses']);
        add_filter('woocommerce_order_is_download_permitted', [$this, 'add_partial_shipped_to_download_permission'], 10, 2);
        // add bulk action
        add_filter('bulk_actions-edit-shop_order', [$this, 'add_bulk_actions_partial_shipped'], 50);
        // add reorder button
        add_filter('woocommerce_valid_order_statuses_for_order_again', [$this, 'add_reorder_button_partial_shipped'], 50);


        // User order page Action button
        add_filter('woocommerce_my_account_my_orders_actions', [
            UserTrackPage::instance(),
            'add_column_my_account_orders_pp_track_column',
        ], 10, 2);

        // order sync task
        add_action('parcelpanel_tracking_sync', [TrackingNumber::class, 'sync_tracking'], 10, 2);

        // number courier sync task
        add_action('parcelpanel_tracking_courier_sync', [TrackingNumber::class, 'sync_tracking_courier']);

        // courier sync task
        add_action('parcelpanel_update_courier_list', [Courier::instance(), 'update_courier_list']);

        // order sync
        add_action('parcelpanel_order_sync', [ShopOrder::instance(), 'sync_order']);

        $this->init_app_1001_integration();
        $this->init_app_1002_integration();
        $this->init_app_1003_integration();
        $this->init_app_1004_integration();
        $this->init_app_1005_integration();
        $this->init_app_1006_integration();
        $this->init_app_1007_integration();
        $this->init_app_1008_integration();
        $this->init_app_1009_integration();

        $plugin_basename = plugin_basename(\ParcelPanel\PLUGIN_FILE);
        add_filter("plugin_action_links_{$plugin_basename}", [$this, 'plugin_action_links']);

        // wc change order name do
        add_filter("woocommerce_admin_settings_sanitize_option", [$this, 'wc_setting_action'], 10, 3);
        // add_action("woocommerce_update_option", [$this, 'wc_setting_action'], 10, 1);
        // add_action("update_option", [$this, 'wc_setting_action'], 10, 3);

        // partial_shipped_order email  woocommerce-multilingual wpml related integration
        add_filter('wcml_emails_options_to_translate',  [$this, 'test_pp_wcml_emails_options_to_translate']);

        // product GY after payment (product attribution)
        add_action('woocommerce_before_thankyou', [$this, 'checkoutGetPro']);

        $weglotIsActivePlugins = is_plugin_active('weglot/weglot.php'); // weglot is active
        if ($weglotIsActivePlugins) {
            // weglot get data
            add_filter('weglot_get_regex_checkers', [$this, 'custom_weglot_add_regex_checkers']);
        }

        // listen updated_option change
        add_action('updated_option', [$this, 'check_option_change_to_pp'], 10, 3);

        // Hook for updating timezone
        add_action('update_option_timezone_string', [$this, 'timezone_updated'], 10, 2);
        // Hook for updating timezone offset
        add_action('update_option_gmt_offset', [$this, 'timezone_offset_updated'], 10, 2);

        // Hook for updating currency
        add_action('update_option_woocommerce_currency', [$this, 'currency_updated'], 10, 2);

        if (\ParcelPanel\DEBUG) {
            $this->register_debug_hooks();
        }
    }

    // order to trash
    public function trash_order($order_id)
    {
        if ($order_id) {
            $order = wc_get_order($order_id);
            $order_status = '';
            if (is_a($order, 'WC_Order')) {
                $order_status = $order->get_status() ?? '';
            }
            if (in_array($order_status, ['trash'])) {
                // delete orders
                Api::delete_orders([$order_id]);
            }
        }
    }

    // update config to pp
    public function check_option_change_to_pp($option, $old_value, $value)
    {

        $check_option = [
            'woocommerce_customer_shipped_order_settings',
            'woocommerce_customer_partial_shipped_order_settings'
        ];
        if (in_array($option, $check_option)) {

            $configs = [
                'option' => $option,
                'old_value' => $old_value,
                'value' => $value,
            ];
            // send config data to PP
            Configs::updateToPP($configs, 1);
        }
    }

    // weglot add tran
    public function custom_weglot_add_regex_checkers($regex_checkers)
    {
        $regex_checkers[] = new \Weglot\Parser\Check\Regex\RegexChecker('#window.pp_track_weglot = ((.|\s)+?);#', 'JSON', 1, array('translate', 'order_number', 'email', 'or', 'tracking_number', 'track', 'order', 'status', 'shipping_to', 'current_location', 'carrier', 'product', 'not_yet_shipped', 'waiting_updated', 'ordered', 'order_ready', 'pending', 'info_received', 'in_transit', 'out_for_delivery', 'delivered', 'exception', 'failed_attempt', 'expired', 'expected_delivery', 'may_like', 'additional_text_above', 'additional_text_below', 'custom_shipment_status_name_1', 'custom_shipment_status_info_1', 'custom_shipment_status_name_2', 'custom_shipment_status_info_2', 'custom_shipment_status_name_3', 'custom_shipment_status_info_3', 'custom_tracking_info', 'order_not_found', 'enter_your_order', 'enter_your_email', 'enter_your_tracking_number'));
        return $regex_checkers;
    }

    // product GY product get url & storage (product attribution)
    public function checkoutGetPro($orderId)
    {
        // /checkout/order-received/317/?key=wc_order_W3V8aqTIguETO
        // check out Page Record Attribution Product
        $current_url = home_url(add_query_arg(array()));
        $keyOrder = !empty($_GET['key']) ? $_GET['key'] : ''; // phpcs:ignore
        $ajaxUrl = admin_url('admin-ajax.php', 'relative');

        // check key is order_key
        if (!empty($keyOrder) && strpos($keyOrder, 'wc_order_') !== false && strpos($current_url, 'checkout') !== false) {
?>
            <script type="text/javascript">
                let localStorage = window.localStorage;
                let timeStr = new Date().getTime();
                let localKet = "ppWcProCheck";
                let nowLoc = localStorage.getItem(localKet);
                if (nowLoc) {
                    // clear old pro
                    let saveNewStr = '';
                    let nowLocArr = nowLoc.split("|");
                    for (let i = 0; i < nowLocArr.length; i++) {
                        let nowProA = nowLocArr[i] ? nowLocArr[i] : '';
                        let proLocArr = nowProA.split("@");
                        let nowPro = proLocArr[0] ? proLocArr[0] : '';
                        let oldPTime = proLocArr[1] ? proLocArr[1] : 0;
                        let checkTime = timeStr - 0.5 * 3600 * 1000;
                        if (oldPTime > checkTime && nowProA) {
                            saveNewStr += nowProA + '|';
                        }
                    }
                    if (saveNewStr) {
                        jQuery(($) => {
                            const data = {
                                orderId: '<?php echo esc_js($orderId); ?>',
                                orderKey: '<?php echo esc_js($keyOrder); ?>',
                                products: saveNewStr,
                                url: '<?php echo esc_url($current_url); ?>',
                                action: 'pp_product_checkout',
                                _ajax_nonce: '<?php echo esc_js(wp_create_nonce('pp-product-checkout')) ?>',
                            }

                            $.ajax({
                                url: '<?php echo esc_url($ajaxUrl); ?>',
                                type: 'POST',
                                data,
                                beforeSend: function() {},
                                complete: function() {
                                    toDeactivateLink()
                                }
                            })

                            function toDeactivateLink() {
                                // let localStorage = window.localStorage;
                                // let localKet = "ppWcProCheck";
                                // localStorage.removeItem(localKet);
                                // console.log('test order buy');
                            }
                        })
                    }
                }
            </script>
            <?php
        }
    }

    // product GY product set storage (product attribution)
    public function checkoutSavePro()
    {

        // clearStorage add trackPage js
        try {
            // ?ref=parcelpanel&utm_source=parcelpanel&utm_medium=tracking_page&utm_campaign=product&pp_product=14&domain=

            // storage add pro list
            $pageFrom = sanitize_text_field(wp_unslash($_GET['utm_source'] ?? '')); // phpcs:ignore
            $ref = sanitize_text_field(wp_unslash($_GET['ref'] ?? '')); // phpcs:ignore
            // track_page email
            $utm_medium = sanitize_text_field(wp_unslash($_GET['utm_medium'] ?? '')); // phpcs:ignore
            // recommend_product product 
            $utm_campaign = sanitize_text_field(wp_unslash($_GET['utm_campaign'] ?? '')); // phpcs:ignore
            $product = intval(sanitize_text_field(wp_unslash($_GET['pp_product'] ?? ''))); // phpcs:ignore
            $domain = sanitize_text_field(wp_unslash($_GET['domain'] ?? '')); // phpcs:ignore

            $pageFrom = esc_html(esc_js($pageFrom));
            $ref = esc_html(esc_js($ref));
            $utm_medium = esc_html(esc_js($utm_medium));
            $utm_campaign = esc_html(esc_js($utm_campaign));
            $product = esc_html(esc_js($product));
            $domain = esc_html(esc_js($domain));

            $strFrom = $utm_medium . '-' . $utm_campaign;
            if (!empty($pageFrom) && $pageFrom == 'parcelpanel' && !empty($utm_campaign) && !empty($product)) {
                $current_url = home_url(add_query_arg(array()));
                // get domain
                // try {
                Api::product_click([
                    'ref' => $ref,
                    'utm_source' => $pageFrom,
                    'utm_medium' => $utm_medium,
                    'utm_campaign' => $utm_campaign,
                    'strFrom' => $strFrom,
                    'product' => $product,
                    'current_url' => $current_url,
                    'domain' => $domain,
                ]);
            ?>
                <script type="text/javascript">
                    setProStorageID(<?php echo esc_js($product) ?>, '<?php echo esc_js($strFrom) ?>');
                    // go to check checkout
                    function setProStorageID(product_id, type) {
                        let localStorage = window.localStorage;
                        let timeStr = new Date().getTime();
                        let newStr = product_id + '@' + timeStr + '@' + type;
                        let localKet = "ppWcProCheck";
                        let nowLoc = localStorage.getItem(localKet);
                        if (nowLoc) {
                            // clear old pro
                            let checkStr = '';
                            let saveNewStr = '';
                            let nowLocArr = nowLoc.split("|");
                            for (let i = 0; i < nowLocArr.length; i++) {
                                let nowProA = nowLocArr[i] ? nowLocArr[i] : '';
                                let proLocArr = nowProA.split("@");
                                let nowPro = proLocArr[0] ? proLocArr[0] : '';
                                let oldPTime = proLocArr[1] ? proLocArr[1] : 0;
                                let checkTime = timeStr - 0.5 * 3600 * 1000;
                                if (oldPTime > checkTime && nowProA) {
                                    saveNewStr += nowProA + '|';
                                }
                            }
                            localStorage.setItem(localKet, saveNewStr + newStr);
                        } else {
                            localStorage.setItem(localKet, newStr);
                        }
                    }
                </script>
            <?php
            }
        } catch (\Error $e) {
        }
    }

    // product GY send product to pp (product attribution)
    public function pp_product_checkout_ajax()
    {
        check_ajax_referer('pp-product-checkout');

        $orderId = wc_clean($_POST['orderId'] ?? '');
        $orderKey = wc_clean($_POST['orderKey'] ?? '');
        $products = wc_clean($_POST['products'] ?? '');
        $url = wc_clean($_POST['url'] ?? '');
        $baseUrl = rest_url('parcelpanel/v1/');
        $domain = wp_parse_url($baseUrl, PHP_URL_HOST);
        // $reason_info = sanitize_textarea_field($_POST['reason_info'] ?? '');
        try {
            Api::product_checkout([
                'orderId' => $orderId,
                'orderKey' => $orderKey,
                'products' => $products,
                'url' => $url,
                'domain' => $domain,
            ]);
        } catch (\Error $e) {
        }

        die;
    }


    // partial_shipped_order  email  woocommerce-multilingual wpml Related integrations
    public function test_pp_wcml_emails_options_to_translate($v)
    {
        $v[] = 'woocommerce_customer_partial_shipped_order_settings';
        $v[] = 'woocommerce_customer_shipped_order_settings';
        return $v;
    }

    public function wc_setting_action($value, $option, $raw_value)
    {
        // var_dump($option);
        // die;
        $check = $option['id'] ?? '';
        $checkArr = [
            'wt_sequencial_settings_page', // Sequential Order Numbers for WooCommerce   By WebToffee |
            'alg_wc_custom_order_numbers_options', // Custom Order Numbers for WooCommerce
            'wcj_order_numbers_module_options', // Booster for WooCommerce
        ];
        if (in_array($check, $checkArr)) {
            Api::sync_orders(90, 10);
        }
        return $value;
    }

    public $delete_list = [];
    public $add_list = [];

    public function __destruct()
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;
        $exec = false;
        $add_list = array_filter($this->add_list, function ($item) {
            return $item['success'] ?? false;
        });
        $delete_list = array_filter($this->delete_list, function ($item) {
            return $item['success'] ?? false;
        });

        if ($delete_list) {
            $tracking_numbers = array_values(array_column($delete_list, 'tracking_number'));
            // @codingStandardsIgnoreStart
            $placeholder = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_numbers);
            $tracking_id_and_numbers = (array)$wpdb->get_results(
                $wpdb->prepare(
                    "SELECT id,tracking_number FROM {$TABLE_TRACKING} WHERE tracking_number IN ({$placeholder})",
                    $tracking_numbers
                )
            );
            // @codingStandardsIgnoreEnd
            $tracking_number_tracking_id = array_column($tracking_id_and_numbers, 'id', 'tracking_number');
            foreach ($delete_list as $item) {
                if (!isset($tracking_number_tracking_id[$item['tracking_number']])) {
                    continue;
                }
                // @codingStandardsIgnoreStart
                $wpdb->delete($TABLE_TRACKING_ITEMS, [
                    'order_id' => $item['order_id'],
                    'order_item_id' => $item['order_item_id'],
                    'quantity' => 0,
                    'tracking_id' => $tracking_number_tracking_id[$item['tracking_number']],
                ]);
                // @codingStandardsIgnoreEnd

                $exec = true;
            }
        }

        $tracking_numbers = [];

        if (!$add_list) {
            if ($exec) {
                foreach ($delete_list as $item) {
                    ShopOrder::adjust_unfulfilled_shipment_items($item['order_id']);
                }
            }

            return;
        }

        $tracking_numbers = array_values(array_unique(array_column($add_list, 'tracking_number')));
        /* tracking numbers in table */
        /* has new number or update number */
        $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_numbers);

        // @codingStandardsIgnoreStart
        $tracking_data = (array)$wpdb->get_results(
            $wpdb->prepare(
                "SELECT id,tracking_number
                FROM {$TABLE_TRACKING}
                WHERE tracking_number IN ({$placeholder_str})",
                $tracking_numbers
            )
        );
        // @codingStandardsIgnoreEnd

        $is_insert_tracking = false;
        $new_tracking_numbers = array_diff(
            $tracking_numbers,
            array_column($tracking_data, 'tracking_number')
        );
        $now = time();

        // get number courier_code & fulfilled_at
        $check_number = [];
        foreach ($add_list as $v) {
            $c_tracking_number = $v['tracking_number'] ?? '';
            if (empty($c_tracking_number)) {
                continue;
            }
            $check_number[$c_tracking_number] = [
                'courier_code' => $v['courier_code'] ?? '',
                'fulfilled_at' => $v['fulfilled_at'] ?? 0,
            ];
        }

        foreach ($new_tracking_numbers as $_tracking_number) {

            $courier_code = null;
            $fulfilled_at = $now;
            $number_data = $check_number[$_tracking_number] ?? [];
            if (!empty($number_data)) {
                $courier_code = $number_data['courier_code'] ?? $courier_code;
                $fulfilled_at = $number_data['fulfilled_at'] ?? $fulfilled_at;
            }
            $tracking_item_data = ShopOrder::get_tracking_item_data($_tracking_number, $courier_code, $fulfilled_at);

            $res = $wpdb->insert($TABLE_TRACKING, $tracking_item_data); // phpcs:ignore
            if (!is_wp_error($res)) {
                $_tracking_datum = $tracking_data[] = new \stdClass;
                $_tracking_datum->id = $wpdb->insert_id;
                $_tracking_datum->tracking_number = $_tracking_number;

                if ($wpdb->insert_id) {
                    // @codingStandardsIgnoreStart
                    $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str([$wpdb->insert_id], '%d');
                    $wpdb->query(
                        $wpdb->prepare(
                            "UPDATE {$TABLE_TRACKING} SET `sync_times` = 1 WHERE `id` IN ({$placeholder_str})",
                            [$wpdb->insert_id]
                        )
                    );
                    // @codingStandardsIgnoreEnd
                }

                $is_insert_tracking = true;
            }
        }
        if ($is_insert_tracking) {
            TrackingNumber::schedule_tracking_sync_action();
        }
        $tracking_number_tracking_id = array_column($tracking_data, 'id', 'tracking_number');

        // Filter order numbers allowed to be processed
        $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_data, '%d');

        // @codingStandardsIgnoreStart
        $trackings_order_ids = (array)$wpdb->get_results(
            $wpdb->prepare(
                "SELECT order_id,tracking_id
                FROM {$TABLE_TRACKING_ITEMS}
                WHERE tracking_id IN({$placeholder_str})",
                array_column($tracking_data, 'id')
            )
        );
        // @codingStandardsIgnoreEnd
        $tracking_id_order_id = array_column($trackings_order_ids, 'order_id', 'tracking_id');
        foreach ($add_list as $key => &$item) {
            if (!array_key_exists($item['tracking_number'], $tracking_number_tracking_id)) {
                unset($add_list[$key]);
                continue;
            }

            $item['tracking_id'] = $tracking_number_tracking_id[$item['tracking_number']];
        }
        unset($item);
        foreach ($add_list as $key => $item) {
            if (array_key_exists($item['tracking_id'], $tracking_id_order_id) && $tracking_id_order_id[$item['tracking_id']] != $item['order_id']) {
                unset($add_list[$key]);
            }
        }

        $add_list_order_ids_uniq = array_values(array_unique(array_column($add_list, 'order_id')));
        if (empty($add_list_order_ids_uniq)) {
            return;
        }
        $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($add_list_order_ids_uniq, '%d');

        // @codingStandardsIgnoreStart
        $shipments = (array)$wpdb->get_results(
            $wpdb->prepare(
                "SELECT *
                FROM {$TABLE_TRACKING_ITEMS}
                WHERE order_id IN ({$placeholder_str})",
                $add_list_order_ids_uniq
            )
        );
        // @codingStandardsIgnoreEnd

        $order_item_id_list = array_column($shipments, null, 'order_item_id');

        $shipments_by_tracking_id = array_column($shipments, null, 'tracking_id');
        foreach ($add_list as $tracking_datum) {
            $tracking_id = $tracking_datum['tracking_id'] ?? '';
            $order_item_id = $tracking_datum['order_item_id'] ?? '';

            // check quantity
            $now_quantity = 0;
            if (!empty($order_item_id_list[$order_item_id])) {
                $tracking_id_c = $order_item_id_list[$order_item_id]->tracking_id ?? 0;
                if (!$tracking_id_c) {
                    $now_quantity = $order_item_id_list[$order_item_id]->quantity ?? 0;
                }
            }

            $_shipment = null;
            if (array_key_exists($tracking_id, $shipments_by_tracking_id)) {
                $_shipment = $shipments_by_tracking_id[$tracking_id];
            }
            $_shipment_status = $_shipment->shipment_status ?? 1;
            $_custom_status_time = $_shipment->custom_status_time ?? '';
            $_custom_shipment_status = $_shipment->custom_shipment_status ?? 0;
            $quantity = $_shipment->quantity ?? 0;
            $quantity_add = $tracking_datum['quantity'] ?? 0;
            $quantity_order = $tracking_datum['quantity_order'] ?? 0;

            // @codingStandardsIgnoreStart
            $wpdb->insert($TABLE_TRACKING_ITEMS, [
                'order_id' => $tracking_datum['order_id'],
                'order_item_id' => $tracking_datum['order_item_id'],
                'quantity' => !empty($quantity_add) && $quantity_add <= $quantity_order ? $quantity_add : $quantity_order,
                'tracking_id' => $tracking_id,
                'shipment_status' => $_shipment_status,
                'custom_status_time' => $_custom_status_time,
                'custom_shipment_status' => $_custom_shipment_status,
            ]);
            // @codingStandardsIgnoreEnd

            $exec = true;
        }

        if ($exec) {
            foreach ($add_list_order_ids_uniq as $order_id) {
                ShopOrder::adjust_unfulfilled_shipment_items($order_id);
            }
        }
    }

    /**
     * Rename WooCommerce Order Status
     */
    public function wc_renaming_order_status($order_statuses)
    {
        $KEY_WC_COMPLETED = 'wc-completed';
        if (!AdminSettings::get_status_shipped_field()) {
            return $order_statuses;
        }

        if (array_key_exists($KEY_WC_COMPLETED, $order_statuses)) {
            $order_statuses[$KEY_WC_COMPLETED] = esc_html__('Shipped', 'parcelpanel');
        }

        $KEY_WC_SHIPPED = 'wc-shipped';
        // check wc-shipped has order
        $status_shipped_check = get_option(\ParcelPanel\OptionName\STATUS_SHIPPED_CHECK);
        if ($status_shipped_check) {
            $order_statuses[$KEY_WC_SHIPPED] = esc_html__('Shipped 1', 'parcelpanel');
        }

        return $order_statuses;
    }

    /**
     * define the woocommerce_register_shop_order_post_statuses callback
     * rename filter
     * rename from completed to shipped
     */
    public function filter_woocommerce_register_shop_order_post_statuses($array)
    {
        if (!AdminSettings::get_status_shipped_field()) {
            return $array;
        }

        if (isset($array['wc-completed'])) {
            // translators: %s is param.
            $array['wc-completed']['label_count'] = _n_noop(
                'Shipped <span class="count">(%s)</span>',
                'Shipped <span class="count">(%s)</span>',
                'parcelpanel'
            );
        }

        return $array;
    }

    /**
     * rename bulk action
     */
    public function modify_bulk_actions($bulk_actions)
    {
        if (!AdminSettings::get_status_shipped_field()) {
            return $bulk_actions;
        }

        if (isset($bulk_actions['mark_completed'])) {
            $bulk_actions['mark_completed'] = __('Change status to shipped', 'parcelpanel');
        }
        return $bulk_actions;
    }

    /**
     * Register new status : Partially Shipped
     */
    public function register_partial_shipped_order_status()
    {
        register_post_status('wc-partial-shipped', [
            'label' => __('Partially Shipped', 'parcelpanel'),
            'public' => true,
            'show_in_admin_status_list' => true,
            'show_in_admin_all_list' => true,
            'exclude_from_search' => false,
            /* translators: %s: replace with Partially Shipped Count */
            'label_count' => _n_noop(
                'Partially Shipped <span class="count">(%s)</span>',
                'Partially Shipped <span class="count">(%s)</span>',
                'parcelpanel'
            ),
        ]);

        register_post_status('wc-shipped', [
            'label' => __('Shipped', 'parcelpanel'),
            'public' => true,
            'show_in_admin_status_list' => true,
            'show_in_admin_all_list' => true,
            'exclude_from_search' => false,
            /* translators: %s: replace with Shipped Count */
            'label_count' => _n_noop(
                'Shipped <span class="count">(%s)</span>',
                'Shipped <span class="count">(%s)</span>',
                'parcelpanel'
            ),
        ]);

        register_post_status('wc-delivered', [
            'label' => __('Delivered', 'parcelpanel'),
            'public' => true,
            'show_in_admin_status_list' => true,
            'show_in_admin_all_list' => true,
            'exclude_from_search' => false,
            /* translators: %s: replace with Delivered Count */
            'label_count' => _n_noop(
                'Delivered <span class="count">(%s)</span>',
                'Delivered <span class="count">(%s)</span>',
                'parcelpanel'
            ),
        ]);
    }

    /**
     * add status after completed (order update select)
     */
    public function add_partial_shipped_to_order_statuses($order_statuses): array
    {
        $new_order_statuses = [];
        foreach ($order_statuses as $key => $status) {
            if ('wc-completed' === $key) {
                $new_order_statuses['wc-partial-shipped'] = __('Partially Shipped', 'parcelpanel');
                $new_order_statuses['wc-shipped'] = __('Shipped', 'parcelpanel');
            }
            $new_order_statuses[$key] = $status;
            if ('wc-completed' === $key) {
                $new_order_statuses['wc-delivered'] = __('Delivered', 'parcelpanel');
            }
        }

        return $new_order_statuses;
    }

    // use fulfill_workflow_check get status show order list
    public function add_partial_shipped_to_order_statuses_all($order_statuses): array
    {
        // fulfill_workflow_check config
        $parcelpanel_fulfill_workflow = get_option(\ParcelPanel\OptionName\FULFILL_WORKFLOW_CHECK);
        $partially_shipped_type = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;
        $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
        $delivered_type = $parcelpanel_fulfill_workflow['delivered_type'] ?? 0;

        $new_order_statuses = [];
        foreach ($order_statuses as $key => $status) {
            if ('wc-completed' === $key) {
                if ($partially_shipped_type == 1) {
                    $new_order_statuses['wc-partial-shipped'] = __('Partially Shipped', 'parcelpanel');
                }
                if ($shipped_type == 1) {
                    $new_order_statuses['wc-shipped'] = __('Shipped', 'parcelpanel');
                }
            }
            $new_order_statuses[$key] = $status;
            if ('wc-completed' === $key && $delivered_type == 1) {
                $new_order_statuses['wc-delivered'] = __('Delivered', 'parcelpanel');
            }
        }
        return $new_order_statuses;
    }


    /**
     * Adding the partial-shipped order status to the default woocommerce order statuses
     */
    public function include_partial_shipped_order_status_to_reports($statuses)
    {
        if ($statuses) {
            $statuses[] = 'partial-shipped';
            $statuses[] = 'shipped';
            $statuses[] = 'delivered';
        }
        return $statuses;
    }

    /**
     * mark status as a paid.
     */
    public function partial_shipped_woocommerce_order_is_paid_statuses($statuses)
    {
        $statuses[] = 'partial-shipped';
        $statuses[] = 'shipped';
        $statuses[] = 'delivered';
        return $statuses;
    }

    /**
     * Give download permission to partial shipped order status
     */
    public function add_partial_shipped_to_download_permission($data, $order)
    {
        if ($order->has_status('partial-shipped')) {
            return true;
        }
        if ($order->has_status('shipped')) {
            return true;
        }
        if ($order->has_status('delivered')) {
            return true;
        }
        return $data;
    }

    /**
     * add bulk action
     * Change order status to Partially Shipped
     */
    public function add_bulk_actions_partial_shipped($bulk_actions)
    {
        // fulfill_workflow config
        $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
        $partially_shipped_type = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;
        $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
        $delivered_type = $parcelpanel_fulfill_workflow['delivered_type'] ?? 0;

        if ($partially_shipped_type == 1) {
            $label = wc_get_order_status_name('partial-shipped');
            /* translators: %s: search order status label */
            $bulk_actions['mark_partial-shipped'] = sprintf(__('Change status to %s', 'parcelpanel'), $label);
        }

        if ($shipped_type == 1) {
            $label = wc_get_order_status_name('shipped');
            /* translators: %s: search order status label */
            $bulk_actions['mark_shipped'] = sprintf(__('Change status to %s', 'parcelpanel'), $label);
        }

        if ($delivered_type == 1) {
            $label = wc_get_order_status_name('delivered');
            /* translators: %s: search order status label */
            $bulk_actions['mark_delivered'] = sprintf(__('Change status to %s', 'parcelpanel'), $label);
        }

        return $bulk_actions;
    }

    /**
     * add order again button for delivered order status
     */
    public function add_reorder_button_partial_shipped($statuses)
    {
        $statuses[] = 'partial-shipped';
        $statuses[] = 'shipped';
        $statuses[] = 'delivered';
        return $statuses;
    }


    /**
     * Register some hooks for debug mode
     */
    private function register_debug_hooks()
    {
        HooksTracker::init_track_hooks(function () {
            (new ParcelPanelFunction)->parcelpanel_log(wp_json_encode([
                'http_path' => strstr(wc_clean($_SERVER['REQUEST_URI']), '?', true),
                'hooks' => HooksTracker::get_hooks(),
            ], 320));
        });
    }

    public function get_category()
    {
        $cateS = (new ParcelPanelFunction)->getCategory();
        $cateS_old = $cateS['old_cate'] ?? [];
        $cateS_new = $cateS['new_cate'] ?? [];
        (new ParcelPanelFunction)->parcelpanel_json_response($cateS_new, 'Saved successfully');
    }

    public function pp_get_token()
    {
        $api_key = get_option(\ParcelPanel\OptionName\API_KEY);
        (new ParcelPanelFunction)->parcelpanel_json_response(['token' => $api_key], 'Saved successfully');
    }

    /**
     * init Ajax request function
     */
    private function init_ajax()
    {

        add_action('wp_ajax_pp_product_checkout', [$this, 'pp_product_checkout_ajax']);

        // add_action('wp_ajax_pp_get_category', [$this, 'get_category']);
        // add_action('wp_ajax_pp_get_token', [$this, 'pp_get_token']);

        add_action('wp_ajax_pp_feedback_confirm', [$this, 'feedback_ajax']);
        add_action('wp_ajax_pp_deactivate_survey', [$this, 'deactivate_survey_ajax']);

        add_action('wp_ajax_pp_shipment_item_save', [ShopOrder::instance(), 'shipment_item_save_ajax']);
        add_action('wp_ajax_pp_get_tracking_items', [ShopOrder::instance(), 'get_tracking_items_ajax']);
        add_action('wp_ajax_pp_delete_tracking_item', [ShopOrder::instance(), 'shipment_item_delete_ajax']);

        add_action('wp_ajax_pp_check_first_sync', [AdminShipments::instance(), 'check_first_sync_ajax']);

        add_action('wp_ajax_pp_upload_csv', [Upload::instance(), 'csv_handler']);
        add_action('wp_ajax_pp_mapping_items_csv', [TrackingNumber::instance(), 'get_csv_mapping_items_ajax']);
        add_action('wp_ajax_pp_import_csv', [TrackingNumber::instance(), 'csv_importer']);
        add_action('wp_ajax_pp_tracking_number_import_record', [TrackingNumber::instance(), 'get_records_ajax']);
        add_action('wp_ajax_pp_get_current_user', [$this, 'get_current_user']);
        add_action('wp_ajax_pp_get_product_lists', [UserTrackPage::instance(), 'get_products_message']);

        // all can tracking
        add_action('wp_ajax_nopriv_pp_tracking_info', [UserTrackPage::instance(), 'get_track_info_new_ajax']);
        // login can tracking
        add_action('wp_ajax_pp_tracking_info', [UserTrackPage::instance(), 'get_track_info_new_ajax']);

        // connect ParcelPanel server
        add_action('wp_ajax_pp_connect', [$this, 'connect_endpoint_ajax']);
        add_action('wp_ajax_pp_version_upgrade', [$this, 'version_upgrade_ajax']);
        add_action('wp_ajax_pp_popup_action', [$this, 'popup_action_ajax']);

        add_action('wp_ajax_pp_live_chat_connect', [$this, 'live_chat_connect_ajax']);
        add_action('wp_ajax_pp_live_chat_disable', [$this, 'live_chat_disable_ajax']);
    }

    function get_current_user()
    {
        check_ajax_referer('pp-get-current-user');

        $current_user = wp_get_current_user();

        $user_email = $current_user->data->user_email ?? '';
        $check_email = array(
            'support@parcelpanel.org'
        );
        if (in_array($user_email, $check_email)) {
            $res = [
                'current_user' => array()
            ];
        } else {
            $res = [
                'current_user' => $current_user
            ];
        }

        (new ParcelPanelFunction)->parcelpanel_json_response($res);
    }

    // sync old order message
    function wp_ajax_pp_comment_old_order()
    {

        global $wpdb;

        // @codingStandardsIgnoreStart
        if (!empty($_GET['commentGetTable'])) {
            $tables = (array)$wpdb->get_results($wpdb->prepare(
                "SHOW TABLES"
            ));
            var_dump($tables);
            return;
        }

        $commentTable = !empty($_GET['commentTable']) ? $_GET['commentTable'] : "wp_comments";


        if (!empty($_GET['commentLastId'])) {
            if (!empty($_GET['checkId'])) {
                $comment_ID = $_GET['checkId'];
                $shipments = (array)$wpdb->get_results($wpdb->prepare(
                    "SELECT * FROM {$commentTable} WHERE comment_ID = {$comment_ID}"
                ));
            } else {
                $shipments = (array)$wpdb->get_results($wpdb->prepare(
                    "SELECT * FROM {$commentTable} ORDER BY comment_ID DESC LIMIT 1"
                ));
            }


            var_dump($shipments);
            return;
        }

        if (empty($_GET['commentId'])) {
            var_dump('no start commentId');
            return;
        }
        // @codingStandardsIgnoreEnd

        $comment_ID = $_GET['commentId'] ?? 0; // phpcs:ignore
        $comment_Limit = $_GET['limit'] ?? 10; // phpcs:ignore
        $from = $_GET['from'] ?? 0; // phpcs:ignore

        if (empty($from)) {
            var_dump('no app from');
            return;
        }

        // @codingStandardsIgnoreStart
        $shipments = (array)$wpdb->get_results($wpdb->prepare(
            "SELECT * FROM {$commentTable} where comment_ID > {$comment_ID} LIMIT {$comment_Limit}"
        ));
        // @codingStandardsIgnoreEnd

        foreach ($shipments as $comment) {

            if ($from == 1003) {
                if (!AdminIntegration::get_app_integrated($from)) {
                    var_dump($from . ' no open');
                    return;
                }
                $this->init_app_1003_integration_action($comment);
            }

            if (in_array($from, [1004, 1005, 1006])) {
                if (!AdminIntegration::get_app_integrated($from)) {
                    var_dump($from . ' no open');
                    return;
                }
                $this->init_app_integration_action($comment, $from);
            }
        }

        return;
    }

    // test comment add message
    function wp_ajax_pp_test_add_comment()
    {

        $order_id = $_GET['order_id'] ?? ''; // phpcs:ignore
        $comment_content = $_GET['content'] ?? ''; // phpcs:ignore

        if (empty($order_id)) {
            var_dump('order_id is empty');
            return;
        }

        if (empty($comment_content)) {
            var_dump('content is empty');
            return;
        }

        $args = array(
            // params set
            // "comment_ID" => "779",
            "comment_post_ID" => $order_id,
            "comment_author" => "test",
            "comment_author_email" => "test@qq.com",
            "comment_author_url" => "",
            "comment_author_IP" => "",
            "comment_date" => gmdate('Y-m-d H:i:s'),
            "comment_date_gmt" => gmdate('Y-m-d H:i:s'),
            "comment_content" => $comment_content,
            "comment_karma" => "0",
            "comment_approved" => "1",
            "comment_agent" => "WooCommerce",
            "comment_type" => "order_note",
            "comment_parent" => "0",
            "user_id" => "0"
        );
        $comment_id = wp_insert_comment($args);

        var_dump($comment_id);
        return;
    }

    function rest_api_init()
    {
        $rest_api = new RestApi();
        $rest_api->register_routes();
    }

    /**
     * Short label declaration
     */
    function init_shortcode()
    {
        add_shortcode('pp-track-page', [UserTrackPage::instance(), 'track_page_function']);
    }

    private function update_tables()
    {
        global $wpdb;

        $db_version = get_option(\ParcelPanel\OptionName\DB_VERSION);

        if (version_compare($db_version, \ParcelPanel\DB_VERSION, '<')) {
            $collate = $wpdb->get_charset_collate();

            $TABLE_COURIER = Table::$courier;
            $TABLE_TRACKING = Table::$tracking;
            $TABLE_LOCATION = Table::$location;
            $TABLE_TRACKING_ITEMS = Table::$tracking_items;

            $TABLE = <<<SQL
CREATE TABLE {$TABLE_COURIER} (
`code` varchar(191) NOT NULL DEFAULT '',
`name` varchar(191) NOT NULL DEFAULT '',
`country_code` char(4) NOT NULL DEFAULT '',
`tel` varchar(50) NOT NULL DEFAULT '',
`logo` varchar(191) NOT NULL DEFAULT '',
`track_url` varchar(1000) NOT NULL DEFAULT '',
`sort` smallint(6) NOT NULL DEFAULT '9999',
`updated_at` int(10) unsigned NOT NULL DEFAULT '0',
UNIQUE KEY `code` (`code`)
) $collate;
CREATE TABLE {$TABLE_TRACKING} (
`id` int(11) NOT NULL AUTO_INCREMENT,
`order_id` bigint(20),
`tracking_number` varchar(50) NOT NULL DEFAULT '',
`courier_code` varchar(191) NOT NULL DEFAULT '',
`shipment_status` tinyint(3) NOT NULL DEFAULT '1',
`last_event` text,
`original_country` varchar(10) NOT NULL DEFAULT '',
`destination_country` varchar(10) NOT NULL DEFAULT '',
`origin_info` text,
`destination_info` text,
`trackinfo` text,
`transit_time` tinyint(4) DEFAULT '0',
`stay_time` tinyint(4) DEFAULT '0',
`sync_times` tinyint(4) NOT NULL DEFAULT '0',
`received_times` tinyint(4) NOT NULL DEFAULT '0',
`fulfilled_at` int(10) unsigned NOT NULL DEFAULT '0',
`updated_at` int(10) unsigned NOT NULL DEFAULT '0',
PRIMARY KEY (`id`),
UNIQUE KEY `tracking_number` (`tracking_number`),
INDEX `order_id` (`order_id`),
INDEX `shipment_status` (`shipment_status`)
) $collate;
CREATE TABLE {$TABLE_LOCATION} (
`id` char(32) NOT NULL,
`data` text,
`expired_at` int(10) unsigned NOT NULL DEFAULT '0',
`updated_at` int(10) unsigned NOT NULL DEFAULT '0',
UNIQUE KEY `id` (`id`)
) $collate;
CREATE TABLE {$TABLE_TRACKING_ITEMS} (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`order_id` bigint(20) unsigned NOT NULL,
`order_item_id` bigint(20) unsigned NOT NULL DEFAULT '0',
`quantity` smallint(5) unsigned NOT NULL DEFAULT '0',
`tracking_id` int(10) unsigned NOT NULL DEFAULT '0',
`shipment_status` tinyint(1) unsigned NOT NULL DEFAULT '1',
`custom_shipment_status` smallint(5) unsigned NOT NULL DEFAULT '0',
`custom_status_time` varchar(191) NOT NULL DEFAULT '',
PRIMARY KEY (`id`),
KEY `tracking_id` (`tracking_id`),
KEY `order_id` (`order_id`),
KEY `shipment_status` (`shipment_status`)
) $collate;
SQL;

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($TABLE);
        }

        if (version_compare($db_version, '1', '<')) {

            // courier list add
            ParcelPanel::checkCourierList();

            // // initialize default configuration
            // update_option(\ParcelPanel\OptionName\ORDERS_PAGE_ADD_TRACK_BUTTON, 1);
            // update_option(\ParcelPanel\OptionName\EMAIL_NOTIFICATION_ADD_TRACKING_SECTION, 1);
            // update_option(\ParcelPanel\OptionName\TRACK_BUTTON_ORDER_STATUS, ['wc-processing', 'wc-completed', 'wc-partial-shipped', 'wc-checkout-draft', 'wc-failed', 'wc-refunded', 'wc-cancelled']);
            // update_option(\ParcelPanel\OptionName\TRACKING_SECTION_ORDER_STATUS, ['wc-processing', 'wc-completed', 'wc-partial-shipped']);

            // email notifications
            // $email_defaults = AdminSettings::EMAIL_DEFAULT;
            // if ($email_defaults !== false) {
            //     foreach (array_keys($email_defaults) as $order_status) {
            //         $option = get_option("woocommerce_customer_pp_{$order_status}_shipment_settings");
            //         $option['enabled'] = 'yes';
            //         update_option("woocommerce_customer_pp_{$order_status}_shipment_settings", $option);
            //     }
            // }

            update_option(\ParcelPanel\OptionName\DB_VERSION, '1');
        }

        if (version_compare($db_version, '1.2.0', '<')) {

            $TABLE_TRACKING = Table::$tracking;

            $wpdb->query("ALTER TABLE {$TABLE_TRACKING} ADD order_item_id bigint(20) unsigned DEFAULT 0 AFTER order_id"); // phpcs:ignore

            update_option(\ParcelPanel\OptionName\DB_VERSION, '1.2.0');
        }

        foreach (self::$db_updates as $version => $update_callbacks) {
            if (version_compare($db_version, $version, '<')) {
                foreach ($update_callbacks as $update_callback) {
                    $this->run_update_callback($update_callback);
                }
            }
        }
    }

    private function run_update_callback($update_callback)
    {
        include_once dirname(__FILE__) . '/update-functions.php';

        if (is_callable($update_callback)) {
            call_user_func($update_callback);
        }
    }

    #########################
    #########################

    /**
     * Load text field
     *
     * @author: Chuwen
     * @date  : 2021/7/23 14:26
     */
    private function load_plugin_textdomain()
    {

        // pp lang ID
        define('ParcelPanel\OptionName\PP_LANG_NOW', 'parcelpanel_pp_wc_admin_language');
        add_filter('plugin_locale', function ($determined_locale, $domain) {
            if ($domain !== 'parcelpanel') {
                return $determined_locale;
            }
            return Common::instance()->getNowLang();
        }, 10, 2);

        $locale = apply_filters('plugin_locale', get_locale(), 'parcelpanel');

        // Load system text fields
        load_textdomain('parcelpanel', WP_LANG_DIR . '/plugins/parcelpanel-' . $locale . '.mo');

        // Text field to load the plugin
        load_plugin_textdomain('parcelpanel', false, (new ParcelPanelFunction)->parcelpanel_get_plugin_base_path('/l10n/languages'));
    }

    /**
     * Init Admin Page.
     *
     * @return void
     */
    public function ParcelPanel_admin_page()
    {
        require_once plugin_dir_path(plugin_dir_path(__FILE__)) . 'templates/app.php';
    }

    /**
     * add nav in admin
     *
     * @author: Chuwen
     * @date  : 2021/7/21 09:21
     */
    function add_admin_menu()
    {
        add_menu_page(
            __('Home - ParcelPanel', 'parcelpanel'),  // page title
            __('ParcelPanel', 'parcelpanel'),  // nav name
            'manage_woocommerce',  // proxy to meet
            \ParcelPanel\PP_MENU_SLAG,  // menu_slug
            [$this, 'ParcelPanel_admin_page'],  // function   [$this, 'create_admin_page']
            (new ParcelPanelFunction)->get_dir_path('assets', 'imgs/wp-logo.svg?time=' . time()),
            25 // nav site
        );


        // $is_unlimited_plan = get_option(\ParcelPanel\OptionName\IS_UNLIMITED_PLAN);
        // $account_menu_title = $is_unlimited_plan ? 'Account' : '<span class="dashicons dashicons-star-filled" style="font-size:17px"></span> ' . __('100% OFF Offer', 'parcelpanel');
        // $account_menu_title = 'Account';

        $sub_menu_list = [
            // new
            [
                'page_title' => __('Home - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Home', 'parcelpanel'),
                'menu_slug' => 'parcelpanel',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Home - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Home', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/home',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Tracking Page - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Tracking Page', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/tracking-page',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Shipments - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Shipments', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/shipments',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Settings - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Settings', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/settings',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Analytics - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Analytics', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/analytics',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Integration - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Integration', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/integration',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Billing - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Billing', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/billing',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],
            [
                'page_title' => __('Feature request - ParcelPanel', 'parcelpanel'),
                'menu_title' => __('Feature request', 'parcelpanel'),
                'menu_slug' => 'parcelpanel#/feature-request',
                'function' => [$this, 'ParcelPanel_admin_page'],
            ],


            // old (hidden) for 302  (last menu remove by react)
            [
                'page_title' => '',
                'menu_title' => '',
                'menu_slug' => 'pp-home',
                // 'function' => [$this, 'ParcelPanel_admin_page'],
                'function' => '__return_null',
            ],
        ];

        foreach ($sub_menu_list as $item) {
            // add sub nav
            (new ParcelPanelFunction)->parcelpanel_add_submenu_page(
                $item['page_title'],
                $item['menu_title'],
                'manage_woocommerce',  // proxy to meet
                $item['menu_slug'],
                $item['function']
            );
        }

        // remove"ParcelPanel" sub nav if not will show "ParcelPanel" in sub nav
        // this need do after add_pp_menu_page do
        remove_submenu_page(\ParcelPanel\PP_MENU_SLAG, \ParcelPanel\PP_MENU_SLAG);
    }

    // pp-home to parcelpanel
    public function custom_admin_menu_redirects()
    {
        // check permissions
        // if (!current_user_can('manage_woocommerce')) {
        //     wp_die(__('You do not have sufficient permissions to access this page.'));
        // }
        // @codingStandardsIgnoreStart
        if (isset($_GET['page']) && $_GET['page'] === 'pp-home') {
            // 302
            wp_redirect(admin_url('admin.php?page=parcelpanel'));
            exit;
        }
        // @codingStandardsIgnoreEnd
    }

    /**
     * Add action links for the ParcelPanel plugin.
     *
     * @param array $actions Plugin actions.
     *
     * @return array
     */
    public function plugin_action_links($actions): array
    {
        $links = [
            '<a href="https://docs.parcelpanel.com/woocommerce?utm_source=plugin_listing" target="_blank">' . esc_html__('Docs', 'parcelpanel') . '</a>',
            '<a href="https://wordpress.org/support/plugin/parcelpanel/" target="_blank">' . __('Support', 'parcelpanel') . '</a>',
        ];

        return array_merge($links, $actions);
    }

    /**
     * Page init
     *
     * @author: Chuwen
     * @date  : 2021/7/21 09:54
     */
    function admin_init()
    {
        // Register resources
        $this->admin_register_assets();

        // Load resources
        add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts']);
    }

    /**
     * web init
     */
    function site_init()
    {
        // Resource loading
        // $this->site_register_assets();

        // Update config information
        // $this->update_settings();
    }

    function update_settings()
    {
        // Check if we are not already running this routine.
        if ('yes' === get_transient('parcelpanel_update_setting')) {
            return;
        }

        // If we made it till here nothing is running yet, lets set the transient now.
        set_transient('parcelpanel_update_setting', 'yes', MINUTE_IN_SECONDS * 60 * 60 * 24);

        // Update config information later
        (new ParcelPanelFunction)->parcelpanel_update_setting_action();
    }

    function add_id_to_script($tag, $handle, $src)
    {
        if ('parcelpanel-script' === $handle) {
            $tag = str_replace('<script', '<script type="module"', $tag);
        }

        return $tag;
    }

    /**
     * Load the corresponding resources for the corresponding page
     */
    function admin_enqueue_scripts()
    {
        global $post;

        $screen = get_current_screen();
        $screen_id = $screen ? $screen->id : '';

        wp_enqueue_style('parcelpanel-admin');

        if ('parcelpanel_page_parcelpanel' == $screen_id) {
            $add_js_css = (new ParcelPanelFunction)->get_add_js_css();

            $check_js = $add_js_css['js'] ?? array();
            $check_css = $add_js_css['css'] ?? array();

            $url_css = (new ParcelPanelFunction)->get_dir_path('dist', 'index.css');
            $css_version = VERSION;
            if (!empty($check_css) && !empty($check_css['url'])) {
                $url_css = $check_css['url'];
                $css_version = !empty($check_css['version']) ? $check_css['version'] : null;
            }

            // add react admmin css
            wp_enqueue_style(
                'parcelpanel-style',
                $url_css,
                [],
                $css_version
            );

            if (!empty($check_js) && !empty($check_js['url'])) {
                $js_version = !empty($check_js['version']) ? $check_js['version'] : null;
                wp_enqueue_script(
                    'parcelpanel-script',
                    $check_js['url'],
                    array('wp-element'),
                    $js_version,
                    true
                );
            } else {
                wp_enqueue_script(
                    'parcelpanel-script',
                    (new ParcelPanelFunction)->get_dir_path('dist', 'index.js'),
                    array('wp-element'),
                    VERSION,
                    true
                );
            }
            add_filter('script_loader_tag', [$this, 'add_id_to_script'], 10, 3);

            $langMessage = (new ParcelPanelFunction)->getAdminLangList();
            $categoryArr = (new ParcelPanelFunction)->getCategory();
            $categoryMessage = $categoryArr['old_cate'] ?? [];
            $categoryMessageNew = $categoryArr['new_cate'] ?? [];
            $tagsMessage = (new ParcelPanelFunction)->get_tags();
            $timezone = get_option('timezone_string');
            $timezone_offset = get_option('gmt_offset');
            $timezone_default = date_default_timezone_get();

            // Add corresponding language information
            // $preview_email_url = add_query_arg('_wpnonce', wp_create_nonce('pp-preview-mail'), admin_url('?pp_preview_mail=1'));
            $preview_email_url = add_query_arg('_wpnonce', wp_create_nonce('pp-preview-mail-wc'), admin_url('?pp_preview_mail_wc=1'));
            $api_url = 'https://wp-api.parcelpanel.com/api/v1';
            $api_go_url = 'https://pc-go-pro.parcelpanel.com';
            wp_localize_script('parcelpanel-script', 'ppCommonData', [
                'path' => "/wp-content/plugins/parcelpanel/dist",
                'langMessage' => $langMessage,
                'categoryList' => $categoryMessage,
                'categoryListNew' => $categoryMessageNew,
                'tagList' => $tagsMessage,
                'timezone' => $timezone,
                'timezone_offset' => $timezone_offset,
                'timezone_default' => $timezone_default,
                'currency' => get_woocommerce_currency(),
                'token' => get_option(\ParcelPanel\OptionName\API_KEY),
                'preview_email_url' => $preview_email_url,
                'site_url' => site_url(),
                'pp_api_url' => apply_filters('parcelpanel_server_api_url', $api_url) . '/wordpress',
                'pp_api_go_url' => apply_filters('parcelpanel_server_api_go_url', $api_go_url),
                'pp_version' => \ParcelPanel\VERSION,
            ]);

            $pp_param = [
                'import_template_file_link' => (new ParcelPanelFunction)->parcelpanel_get_assets_path('templates/sample-template.csv'),
                'upload_nonce' => wp_create_nonce('pp-upload-csv'),
                'import_nonce' => wp_create_nonce('pp-import-csv-tracking-number'),
                'get_history_nonce' => wp_create_nonce('pp-get-import-tracking-number-records'),
                'export_nonce' => wp_create_nonce('pp-export-csv'),
                'resync_nonce' => wp_create_nonce('pp-resync'),
                'ajax_nonce' => wp_create_nonce('pp-ajax'),
                'shipments_page_link' => (new ParcelPanelFunction)->parcelpanel_get_admin_shipments_url(),
                'pp_bind_account' => wp_create_nonce('pp-bind-account'),
                'pp_update_plan' => wp_create_nonce('pp-get-plan'),
                'pp_get_product_lists' => wp_create_nonce('pp-get-product-lists'),
                'pp_get_current_user' => wp_create_nonce('pp-get-current-user'),
            ];

            wp_localize_script('parcelpanel-script', 'pp_param', $pp_param);
        }

        // if is user admin page
        // Just add a public header
        if ((new ParcelPanelFunction)->is_parcelpanel_plugin_page()) {

            // public css
            wp_enqueue_style('pp-admin');

            // add class in body 
            add_filter('admin_body_class', [__CLASS__, 'add_admin_body_classes']);

            // add Toast plugin
            wp_enqueue_style('pp-toastr');
            wp_enqueue_script('pp-toastr');

            // Load public script
            wp_enqueue_script('pp-common');

            $plugin_version = get_option(\ParcelPanel\OptionName\PLUGIN_VERSION);

            $free_upgrade_opened_at = intval(get_option('parcelpanel_free_upgrade_opened_at')) ?: time();
            $free_upgrade_last_popup_date = get_user_option('parcelpanel_free_upgrade_last_popup_date') ?: '';
            $is_unlimited_plan = get_option(\ParcelPanel\OptionName\IS_UNLIMITED_PLAN);

            wp_localize_script('pp-common', 'parcelpanel_param', [
                'site_status' => [
                    'is_offline_mode' => (new ParcelPanelFunction)->parcelpanel_is_local_site(),
                    'is_connected' => (new ParcelPanelFunction)->parcelpanel_is_connected(),
                    'is_upgraded' => !version_compare($plugin_version, \ParcelPanel\VERSION),
                ],
                'connect_server_nonce' => wp_create_nonce('pp-connect-parcelpanel'),
                'version_upgrade_nonce' => wp_create_nonce('pp-version-upgrade'),
                'popup' => [
                    'server_time' => time(),
                    'opened_at' => $free_upgrade_opened_at,
                    'last_popup_date' => $free_upgrade_last_popup_date,
                    'is_show' => $is_unlimited_plan != '1',
                    'nonce' => wp_create_nonce('pp-popup'),
                ],
                'live_chat' => [
                    'enabled' => !!get_user_option('parcelpanel_live_chat_enabled_at'),
                    'nonce' => wp_create_nonce('pp-load-live-chat'),
                ],
            ]);
        }

        // wc order page
        if ('shop_order' === $screen->post_type) {

            wp_enqueue_style('pp-admin-wc');
            wp_enqueue_script('pp-admin-wc');

            wp_localize_script('pp-admin-wc', 'parcelpanel_admin', [
                'strings' => [
                    'import_tracking_number' => __('Import tracking number', 'parcelpanel'),
                    // translators: %1$s is the date, %2$s is the filename, %3$s is the total number of tracking numbers, %4$s is the number of failed uploads.
                    'import_records' => sprintf(__('%1$s Uploaded %2$s, %3$s tracking numbers, failed to upload %4$s,', 'parcelpanel'), '${date}', '${filename}', '${total}', '${failed}'),
                    'view_details' => __('view details.', 'parcelpanel'),
                    'frequently_used_carriers' => __('FREQUENTLY USED CARRIERS', 'parcelpanel'),
                    'other_carriers' => __('OTHER CARRIERS', 'parcelpanel'),
                ],
                'urls' => [
                    'import_tracking_number' => (new ParcelPanelFunction)->parcelpanel_get_admin_home_url() . '#/import',
                ],
            ]);

            // add Toast plugin
            wp_enqueue_style('pp-toastr');
            wp_enqueue_script('pp-toastr');

            $params = ShopOrder::instance()->get_admin_wc_meta_boxes_params();
            $params['post_id'] = $post->ID ?? '';
            $params['import_type'] = 'shop_order';
            wp_localize_script('pp-admin-wc', 'parcelpanel_admin_wc_meta_boxes', $params);

            $courier_list = array_values(get_object_vars((new ParcelPanelFunction)->parcelpanel_get_courier_list('ASC')));
            // Frequently used carriers
            $selected_courier = (array)get_option(\ParcelPanel\OptionName\SELECTED_COURIER, []);
            $enabledList = [];
            foreach ($selected_courier as $v) {
                $code = $v['express'] ?? '';
                $enabledList[] = $code;
            }

            $courier_list_enabled = [];
            foreach ($courier_list as $k => $v) {
                if (!empty($v->code) && !empty($enabledList) && in_array($v->code, $enabledList)) {
                    // $v->top = true;
                    $courier_list_enabled[$v->code] = $v;
                    unset($courier_list[$k]);
                }
            }
            $courier_list = array_values($courier_list);

            $courier_list_enabled_new = [];
            foreach ($enabledList as $v) {
                if (!empty($courier_list_enabled[$v])) {
                    $courier_list_enabled_new[] = $courier_list_enabled[$v];
                }
            }

            // $courier_list = array_merge($courier_list_enabled, $courier_list);
            wp_localize_script('pp-admin-wc', 'parcelpanel_courier_list', $courier_list);
            wp_localize_script('pp-admin-wc', 'parcelpanel_courier_list_enabled', $courier_list_enabled_new);
        }

        // compatible with HPOS
        if ('woocommerce_page_wc-orders' === $screen->base) {

            wp_enqueue_style('pp-admin-wc');
            wp_enqueue_script('pp-admin-wc');

            wp_localize_script('pp-admin-wc', 'parcelpanel_admin', [
                'strings' => [
                    'import_tracking_number' => __('Import tracking number', 'parcelpanel'),
                    // translators: %1$s is the date, %2$s is the filename, %3$s is the total number of tracking numbers, %4$s is the number of failed uploads.
                    'import_records' => sprintf(__('%1$s Uploaded %2$s, %3$s tracking numbers, failed to upload %4$s,', 'parcelpanel'), '${date}', '${filename}', '${total}', '${failed}'),
                    'view_details' => __('view details.', 'parcelpanel'),
                    'frequently_used_carriers' => __('FREQUENTLY USED CARRIERS', 'parcelpanel'),
                    'other_carriers' => __('OTHER CARRIERS', 'parcelpanel'),
                ],
                'urls' => [
                    'import_tracking_number' => (new ParcelPanelFunction)->parcelpanel_get_admin_home_url() . '#/import',
                ],
            ]);

            // add Toast plugin
            wp_enqueue_style('pp-toastr');
            wp_enqueue_script('pp-toastr');

            $params = ShopOrder::instance()->get_admin_wc_meta_boxes_params();
            $params['post_id'] = $_GET["id"] ?? ''; // phpcs:ignore
            $params['import_type'] = 'shop_order_hpos';
            wp_localize_script('pp-admin-wc', 'parcelpanel_admin_wc_meta_boxes', $params);


            $courier_list = array_values(get_object_vars((new ParcelPanelFunction)->parcelpanel_get_courier_list('ASC')));
            wp_localize_script('pp-admin-wc', 'parcelpanel_courier_list', $courier_list);

            // check change complete to shipped 1
            $status_shipped_check = get_option(\ParcelPanel\OptionName\STATUS_SHIPPED_CHECK);
            $shipped_type = $this->check_order_has('shipped');
            if ($shipped_type == 1 && !$status_shipped_check) {
                update_option(\ParcelPanel\OptionName\STATUS_SHIPPED_CHECK, filter_var(true, FILTER_VALIDATE_BOOLEAN));
            } else if ($shipped_type != 1 && $status_shipped_check) {
                update_option(\ParcelPanel\OptionName\STATUS_SHIPPED_CHECK, filter_var(false, FILTER_VALIDATE_BOOLEAN));
            }

            // show all status orders
            // update_option(\ParcelPanel\OptionName\FULFILL_WORKFLOW_CHECK, [
            //     'partially_shipped_type' => 1,
            //     'shipped_type' => 1,
            //     'delivered_type' => 1,
            // ]);
            // add_filter('wc_order_statuses', [$this, 'add_partial_shipped_to_order_statuses_all']);

            // fulfill_workflow config
            // $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
            // $partially_shipped_type = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;
            // $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
            // $delivered_type = $parcelpanel_fulfill_workflow['delivered_type'] ?? 0;

            // $partially_shipped_type_o = $partially_shipped_type;
            // $shipped_type_o = $shipped_type;
            // $delivered_type_o = $delivered_type;

            // if ($partially_shipped_type != 1) {
            //     $partially_shipped_type = $this->check_order_has('partial-shipped');
            // }
            // if ($shipped_type != 1) {
            //     $shipped_type = $this->check_order_has('shipped');
            // }
            // if ($delivered_type != 1) {
            //     $delivered_type = $this->check_order_has('delivered');
            // }
            // var_dump($partially_shipped_type_o, $partially_shipped_type);
            // var_dump($shipped_type_o, $shipped_type);
            // var_dump($delivered_type_o, $delivered_type);
            // die;
            // if (
            //     ($partially_shipped_type_o != 1 && $partially_shipped_type == 1) ||
            //     ($shipped_type_o != 1 && $shipped_type == 1) ||
            //     ($delivered_type_o != 1 && $delivered_type == 1) ||
            //     ($partially_shipped_type_o == 1 || $shipped_type_o == 1 || $delivered_type_o == 1)
            // ) {
            //     show now status orders
            //     update_option(\ParcelPanel\OptionName\FULFILL_WORKFLOW_CHECK, [
            //         'partially_shipped_type' => $partially_shipped_type,
            //         'shipped_type' => $shipped_type,
            //         'delivered_type' => $delivered_type,
            //     ]);
            //     add_filter('wc_order_statuses', [$this, 'add_partial_shipped_to_order_statuses_all']);
            // }
        }

        if ($screen_id == 'plugins') {
            wp_enqueue_style('pp-admin-plugins');
        }
    }

    // Check if the order exists
    function check_order_has($status)
    {
        $type = 0;
        $orders_partial = wc_get_orders(array(
            'status' => $status,
            'limit'  => 1,  // Only need to check whether it exists, so limit the number of orders returned to 1
        ));
        if (count($orders_partial) > 0) {
            $type = 1;
        }
        return $type;
    }

    /**
     * add Meta Box
     */
    function add_meta_boxes()
    {
        add_meta_box(
            'pp-wc-shop_order-shipment-tracking',
            __('Parcel Panel', 'parcelpanel') . (time() < 1662768000 ? '<span class="parcelpanel-new-badge"></span>' : ''),
            [ShopOrder::instance(), 'meta_box_tracking'],
            'shop_order',
            'side',
            'high'
        );

        // compatible with HPOS
        add_meta_box(
            'pp-wc-shop_order-shipment-tracking',
            __('Parcel Panel', 'parcelpanel') . (time() < 1662768000 ? '<span class="parcelpanel-new-badge"></span>' : ''),
            [ShopOrder::instance(), 'meta_box_tracking_HPOS'],
            'woocommerce_page_wc-orders',
            'side',
            'high'
        );
        try {
            global $wp_meta_boxes;
            // HPOS add tracking box
            $check_box = !empty($wp_meta_boxes["woocommerce_page_wc-orders"]["side"]["high"]) ? $wp_meta_boxes["woocommerce_page_wc-orders"]["side"]["high"] : [];
            if (!empty($check_box['pp-wc-shop_order-shipment-tracking'])) {
                $new_arr['pp-wc-shop_order-shipment-tracking'] = $check_box['pp-wc-shop_order-shipment-tracking'];
                unset($wp_meta_boxes["woocommerce_page_wc-orders"]["side"]["high"]['pp-wc-shop_order-shipment-tracking']);
                $wp_meta_boxes["woocommerce_page_wc-orders"]["side"]["high"] = array_merge($new_arr, $wp_meta_boxes["woocommerce_page_wc-orders"]["side"]["high"]);
            }
        } catch (\Exception $e) {
        }
    }

    /**
     * Init custom email
     *
     * @author Mark
     * @date   2021/8/2 15:20
     */
    function init_custom_emails($emails)
    {
        // fulfill_workflow config
        $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
        $partially_shipped_type = $parcelpanel_fulfill_workflow['partially_shipped_type'] ?? 0;
        $partially_shipped_enable_email = $parcelpanel_fulfill_workflow['partially_shipped_enable_email'] ?? false;
        $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
        $shipped_enable_email = $parcelpanel_fulfill_workflow['shipped_enable_email'] ?? false;

        if ($partially_shipped_type == 1 && $partially_shipped_enable_email) {
            $emails['WC_Email_Customer_Partial_Shipped_Order'] = new Emails\WC_Email_Customer_PP_Partial_Shipped_Order();
        }
        if ($shipped_type == 1 && $shipped_enable_email) {
            $emails['WC_Email_Customer_Shipped_Order'] = new Emails\WC_Email_Customer_PP_Shipped_Order();
        }
        $emails['WC_Email_Customer_PP_In_Transit'] = new Emails\WC_Email_Customer_PP_In_Transit();
        $emails['WC_Email_Customer_PP_Out_For_Delivery'] = new Emails\WC_Email_Customer_PP_Out_For_Delivery();
        $emails['WC_Email_Customer_PP_Delivered'] = new Emails\WC_Email_Customer_PP_Delivered();
        $emails['WC_Email_Customer_PP_Exception'] = new Emails\WC_Email_Customer_PP_Exception();
        $emails['WC_Email_Customer_PP_Failed_Attempt'] = new Emails\WC_Email_Customer_PP_Failed_Attempt();

        return $emails;
    }

    public function register_custom_email_actions($actions)
    {
        return array_merge(
            $actions,
            [
                'woocommerce_order_status_partial-shipped',
                'woocommerce_order_status_shipped',
            ]
        );
    }


    /**
     * App activation
     */
    function app_activated($filename)
    {

        $checkArr = [
            'woocommerce-sequential-order-numbers.php',
            'custom-order-numbers-for-woocommerce.php',
        ];
        $check = explode('/', $filename);
        if (!empty($check[1]) && in_array($check[1], $checkArr)) {
            // var_dump($filename, 111);
            // die;
            Api::sync_orders(90, 10);
        }


        if ('/parcelpanel.php' !== substr($filename, -16)) {
            return;
        }

        // create Track page
        ParcelPanel::create_track_page();

        // courier list add
        ParcelPanel::checkCourierList();

        delete_metadata('user', 0, 'parcelpanel_api_key', '', true);
        Api::check_api_key();

        $from = function () {
            if (strpos($_SERVER['HTTP_REFERER'] ?? '', 'wp-admin/plugins.php') !== false) {
                return 'plugin';  // From an installed plugin Install
            } elseif (strpos($_SERVER['HTTP_REFERER'] ?? '', 'wp-admin/plugin-install.php') !== false) {
                return 'store';  // Install from plugin store
            }

            return 'unknown';
        };

        // 跳转到插件 Home 页面
        wp_safe_redirect(
            admin_url(
                'admin.php?' . http_build_query([
                    'page' => 'parcelpanel',
                    'active' => 'true',
                    'from' => $from(),
                ])
            )
        );
        die;
    }

    // add courier list
    function checkCourierList()
    {
        global $wpdb;
        $TABLE_COURIER = Table::$courier;
        $db_rows = $wpdb->get_results("SELECT count('id') as resCount FROM {$TABLE_COURIER}"); // phpcs:ignore
        $resCount = !empty($db_rows[0]) && !empty($db_rows[0]->resCount) ? $db_rows[0]->resCount : 0;
        if (empty($resCount) || $resCount == '0') {
            // update courier list
            (new ParcelPanelFunction)->parcelpanel_schedule_single_action('parcelpanel_update_courier_list', 5);
        }
    }

    /**
     * App disabled
     */
    function app_deactivated($filename)
    {


        // woocommerce-sequential-order-numbers/woocommerce-sequential-order-numbers.php // Sequential Order Numbers for WooCommerce   By SkyVerge |
        // wt-woocommerce-sequential-order-numbers/wt-advanced-order-number.php // Sequential Order Numbers for WooCommerce   By WebToffee |
        // custom-order-numbers-for-woocommerce/custom-order-numbers-for-woocommerce.php // Custom Order Numbers for WooCommerce
        // woocommerce-jetpack/woocommerce-jetpack.php // Booster for WooCommerce
        // wp-lister-for-amazon/wp-lister-amazon.php
        // wp-lister-for-ebay/wp-lister.php
        $checkArr = [
            'woocommerce-sequential-order-numbers.php',
            'wt-advanced-order-number.php',
            'custom-order-numbers-for-woocommerce.php',
            'woocommerce-jetpack.php',
            'wp-lister-amazon.php',
            'wp-lister.php',
        ];
        $check = explode('/', $filename);
        if (!empty($check[1]) && in_array($check[1], $checkArr)) {
            // var_dump($filename, 111);
            // die;
            Api::sync_orders(90, 10);
        }

        if ('/parcelpanel.php' !== substr($filename, -16)) {
            return;
        }

        Api::deactivate();
    }

    /**
     * Register app
     */
    function register_app()
    {
        if (version_compare(get_option(\ParcelPanel\OptionName\DB_VERSION), \ParcelPanel\DB_VERSION, '<')) {
            // Check if we are not already running this routine.
            if ('yes' === get_transient('parcelpanel_installing')) {
                return;
            }

            // If we made it till here nothing is running yet, lets set the transient now.
            set_transient('parcelpanel_installing', 'yes', MINUTE_IN_SECONDS * 10);

            // create mysql table
            $this->update_tables();

            delete_transient('parcelpanel_installing');
        }


        /* init admin order actions order status */
        if (!is_array(get_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS))) {
            $wc_status = ['wc-processing', 'wc-completed', 'wc-partial-shipped', 'wc-cancelled', 'wc-refunded', 'wc-failed', 'wc-checkout-draft'];
            update_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS, $wc_status);
        }
    }


    /**
     * connect ParcelPanel web ajax
     */
    function connect_endpoint_ajax()
    {
        check_ajax_referer('pp-connect-parcelpanel');

        $last_attempt_connect_at = (int)get_option(\ParcelPanel\OptionName\LAST_ATTEMPT_CONNECT_AT);
        if (time() <= $last_attempt_connect_at + 15) {
            (new ParcelPanelFunction)->parcelpanel_json_response([
                'is_connected' => (new ParcelPanelFunction)->parcelpanel_is_connected(),
            ]);
        }

        update_option(\ParcelPanel\OptionName\LAST_ATTEMPT_CONNECT_AT, time(), false);

        // Whether to authorize
        $check = $this->check_privacy();
        if (is_wp_error($check)) {
            (new ParcelPanelFunction)->parcelpanel_json_response([]);
            // $msg = $check->get_error_message('parcelpanel_connect_error') ?: __('Failed to connect to ParcelPanel.', 'parcelpanel');
            // (new ParcelPanelFunction)->parcelpanel_json_response([], $msg, false);
        }

        // connect ParcelPanel
        $res = $this->connect_endpoint();

        if (is_wp_error($res)) {
            $msg = $res->get_error_message('parcelpanel_connect_error') ?: __('Failed to connect to ParcelPanel.', 'parcelpanel');
            (new ParcelPanelFunction)->parcelpanel_json_response([], $msg, false);
        }

        (new ParcelPanelFunction)->parcelpanel_json_response(['is_connected' => true]);
    }

    private function check_privacy()
    {
        $resp_data = Api::checkPrivacy();

        if (is_wp_error($resp_data)) {
            // API err
            $msg = $resp_data->get_error_message('api_error');

            return new \WP_Error('parcelpanel_connect_error', __('Failed to connect to ParcelPanel.', 'parcelpanel') . ' ' . __($msg, 'parcelpanel')); // phpcs:ignore
        }

        return true;
    }

    /**
     * Connect to server
     */
    private function connect_endpoint()
    {
        if (!current_user_can('manage_woocommerce')) {
            return new \WP_Error('user_auth_error', 'You are not allowed');
        }

        $user = wp_get_current_user();

        $user_api_key = wc_rand_hash();
        $user_api_key_hash = (new ParcelPanelFunction)->parcelpanel_api_hash($user_api_key);
        update_user_meta($user->ID, 'parcelpanel_api_key', $user_api_key_hash);

        $resp_data = Api::connect($user_api_key);

        if (is_wp_error($resp_data)) {
            // API err

            delete_user_meta($user->ID, 'parcelpanel_api_key', $user_api_key_hash);

            $msg = $resp_data->get_error_message('api_error');

            return new \WP_Error('parcelpanel_connect_error', __('Failed to connect to ParcelPanel.', 'parcelpanel') . ' ' . __($msg, 'parcelpanel')); // phpcs:ignore
        }

        $resp_token = strval($resp_data['token'] ?? '');
        $resp_bid = ArrUtils::get($resp_data, 'bid', '0');
        $resp_uid = ArrUtils::get($resp_data, 'uid', '0');

        $resp_registered_at = ArrUtils::get($resp_data, 'registered_at', 0);

        if (empty($resp_token)) {
            // Authentication failed

            delete_user_meta($user->ID, 'parcelpanel_api_key', $user_api_key_hash);

            return new \WP_Error('parcelpanel_connect_error', __('Failed to connect to ParcelPanel.', 'parcelpanel'));
        }

        // Authentication success
        update_option(\ParcelPanel\OptionName\API_KEY, $resp_token);
        // Save the ID of the user registered on ParcelPanel, if not registered it will be 0
        update_option(\ParcelPanel\OptionName\API_UID, $resp_uid);
        update_option(\ParcelPanel\OptionName\API_BID, $resp_bid);

        // update quota
        (new ParcelPanelFunction)->parcelpanel_update_quota_info($resp_data);

        !empty($resp_registered_at) && update_option(\ParcelPanel\OptionName\REGISTERED_AT, $resp_registered_at, false);

        empty(get_option(\ParcelPanel\OptionName\CONNECTED_AT)) && update_option(\ParcelPanel\OptionName\CONNECTED_AT, time(), false);

        update_option(\ParcelPanel\OptionName\PLUGIN_VERSION, \ParcelPanel\VERSION);

        return true;
    }

    /**
     * Plug-in version updated
     */
    function version_upgrade_ajax()
    {
        check_ajax_referer('pp-version-upgrade');

        $resp_data = Api::site_upgrade();

        if (is_wp_error($resp_data)) {
            $api_error_message = $resp_data->get_error_message('api_error');

            $msg = __('Upgrade failed.', 'parcelpanel') . ' ' . __($api_error_message, 'parcelpanel'); // phpcs:ignore

            (new ParcelPanelFunction)->parcelpanel_json_response([], $msg, false);
        }

        update_option(\ParcelPanel\OptionName\PLUGIN_VERSION, \ParcelPanel\VERSION);

        (new ParcelPanelFunction)->parcelpanel_json_response([], 'Upgraded successfully');
    }

    public function popup_action_ajax()
    {
        check_ajax_referer('pp-popup');

        $post_data = (new ParcelPanelFunction)->parcelpanel_get_post_data();
        $action = wc_clean($post_data['action'] ?? '');
        $date = wc_clean($post_data['date'] ?? '');
        if (get_option('parcelpanel_free_upgrade_opened_at') <= 0) {
            update_option('parcelpanel_free_upgrade_opened_at', time());
        }
        if ($action == 'open:1' && $date) {
            update_user_option(get_current_user_id(), 'parcelpanel_free_upgrade_last_popup_date', $date, true);
        }
        $post_data['ua'] = wc_clean($_SERVER['HTTP_USER_AGENT'] ?? '');
        Api::popup_action($post_data);

        die;
    }

    /**
     * Update carrier list
     */
    private function update_couriers(): bool
    {
        $res = Courier::instance()->update_courier_list();

        if (is_wp_error($res)) {

            $msg = [];

            foreach ($res->get_error_codes() as $code) {
                $msg[] = $res->get_error_message($code);
            }

            add_action('admin_notices', function () use ($msg) {
                echo esc_html('<div class="notice notice-error"><p>' . __('Courier providers sync failed.', 'parcelpanel') . ' ' . implode(' ', $msg) . '</p></div>');
            });

            return false;
        }

        return true;
    }


    /**
     * Bind with ParcelPanel account
     */
    function bind_account_ajax()
    {
        check_ajax_referer('pp-bind-account');

        // Bind ParcelPanel account
        $this->bind_account();
    }

    /**
     * Perform account binding operation
     *
     * @param bool $force
     */
    private function bind_account(bool $force = false)
    {
        if (!current_user_can('manage_woocommerce') || (new ParcelPanelFunction)->parcelpanel_is_local_site()) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], __('You are not allowed.', 'parcelpanel'), false);
        }

        $auth_key = !empty($_POST['auth_key']) ? wc_clean($_POST['auth_key']) : ''; // phpcs:ignore
        $auth_key = !empty($auth_key) ? $auth_key : wc_clean($_GET['auth_key']); // phpcs:ignore
        $resp_data = Api::bind($auth_key);

        if (is_wp_error($resp_data)) {
            $msg = $resp_data->get_error_message('api_error');
            (new ParcelPanelFunction)->parcelpanel_json_response([], __('Failed to connect.', 'parcelpanel') . ' ' . __($msg, 'parcelpanel'), false); // phpcs:ignore
        }

        $resp_already = boolval($resp_data['already'] ?? false);
        $resp_key = strval($resp_data['token'] ?? '');
        $resp_uid = strval($resp_data['uid'] ?? '');

        if ($resp_already) {
            if (!empty($resp_uid)) {
                update_option(\ParcelPanel\OptionName\API_UID, $resp_uid);
            }
            (new ParcelPanelFunction)->parcelpanel_json_response([], __('Already bound.', 'parcelpanel'), true, [
                'redirect' => admin_url('admin.php?page=parcelpanel'),
            ]);
        }

        if (empty($resp_key) || empty($resp_uid)) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], __('Failed to connect.', 'parcelpanel'), false);
        }

        // Authentication success
        update_option(\ParcelPanel\OptionName\API_KEY, $resp_key);
        // Save the ID of the user registered on ParcelPanel, if not registered it will be 0
        update_option(\ParcelPanel\OptionName\API_UID, $resp_uid);

        empty($connected_at) && update_option(\ParcelPanel\OptionName\CONNECTED_AT, time(), false);

        (new ParcelPanelFunction)->parcelpanel_json_response([], __('Connected successfully', 'parcelpanel'), true, [
            'redirect' => admin_url('admin.php?page=parcelpanel'),
        ]);
    }

    /**
     * Accept to use live chat
     */
    public function live_chat_connect_ajax()
    {
        check_ajax_referer('pp-load-live-chat');

        update_user_option(get_current_user_id(), 'parcelpanel_live_chat_enabled_at', time(), true);
    }

    public function live_chat_disable_ajax()
    {
        check_ajax_referer('pp-load-live-chat');

        delete_user_meta(get_current_user_id(), 'parcelpanel_live_chat_enabled_at');
    }

    ##############Independent page area##########################

    /**
     * @return string
     *
     * @author: Chuwen
     * @date  : 2021/7/27 10:46
     */
    static function add_admin_body_classes(): string
    {
        return join(' ', [
            'body-parcelpanel-admin',
        ]);
    }

    /**
     * Background registration related resource files
     *
     * @author: Chuwen
     * @date  : 2021/7/27 10:39
     */
    function admin_register_assets()
    {
        wp_register_style('parcelpanel-admin', (new ParcelPanelFunction)->parcelpanel_get_assets_path('css/parcelpanel-admin.css'), [], VERSION);

        // wp_register_style('pp-admin', (new ParcelPanelFunction)->parcelpanel_get_assets_path('css/parcelpanel.css'), ['pp-gutenberg'], VERSION);
        wp_register_style('pp-admin', (new ParcelPanelFunction)->parcelpanel_get_assets_path('css/parcelpanel.css'), [], VERSION);

        wp_register_style('pp-admin-plugins', (new ParcelPanelFunction)->parcelpanel_get_assets_path('css/admin-plugins.css'), ['pp-gutenberg'], VERSION);

        // setting email check enabled
        wp_register_script('pp-email-wc', (new ParcelPanelFunction)->parcelpanel_get_assets_path('js/email-wc.js'), ['jquery'], time()); // phpcs:ignore

        // gutenberg css
        $gutenberg_version = '12.8.0';
        wp_register_style('pp-gutenberg', (new ParcelPanelFunction)->parcelpanel_get_assets_path("plugins/gutenberg@{$gutenberg_version}/style.css"), [], null); // phpcs:ignore

        // PP common JS
        wp_register_script('pp-common', (new ParcelPanelFunction)->parcelpanel_get_assets_path('js/common.min.js'), ['jquery'], VERSION); // phpcs:ignore

        // WooCommerce Admin
        wp_register_style('pp-admin-wc', (new ParcelPanelFunction)->parcelpanel_get_assets_path('css/admin-wc.css'), ['pp-gutenberg'], VERSION);
        // wp_register_script('pp-admin-wc', (new ParcelPanelFunction)->parcelpanel_get_assets_path('js/admin-wc.js'), ['jquery', 'selectWoo'], time());
        wp_register_script('pp-admin-wc', (new ParcelPanelFunction)->parcelpanel_get_assets_path('js/admin-wc.min.js'), ['jquery', 'selectWoo'], VERSION); // phpcs:ignore

        // Toastr
        $toastr_version = '2.0';
        wp_register_style('pp-toastr', (new ParcelPanelFunction)->parcelpanel_get_assets_path("plugins/toastr@{$toastr_version}/toastr.min.css"), [], null); // phpcs:ignore
        wp_register_script('pp-toastr-change', (new ParcelPanelFunction)->parcelpanel_get_assets_path("plugins/toastr@{$toastr_version}/toastrChange.js"), ['jquery'], null); // phpcs:ignore
        wp_register_script('pp-toastr', (new ParcelPanelFunction)->parcelpanel_get_assets_path("plugins/toastr@{$toastr_version}/toastr.min.js"), ['jquery', 'pp-toastr-change'], null); // phpcs:ignore
    }

    /**
     * Register website public resources
     */
    private function site_register_assets()
    {
        // Google translate
        wp_register_script('pp-google-translate', "https://translate.google.com/translate_a/element.js?cb=pp_init_google_translate_element", [], VERSION, true);

        // Swiper
        $swiper_version = '8.3.2';
        wp_register_style('pp-swiper', (new ParcelPanelFunction)->parcelpanel_get_assets_path("plugins/swiper@{$swiper_version}/swiper-bundle.min.css"), [], null); // phpcs:ignore
        wp_register_script('pp-swiper', (new ParcelPanelFunction)->parcelpanel_get_assets_path("plugins/swiper@{$swiper_version}/swiper-bundle.min.js"), [], null); // phpcs:ignore
    }

    /**
     * plugin Track page
     */
    private static function create_track_page()
    {
        global $wpdb;

        $page_title = 'Track Your Order';
        $page_slug = 'parcel-panel';
        $shortcode = '[pp-track-page]';

        $track_page_id = get_option(\ParcelPanel\OptionName\TRACK_PAGE_ID, 0);

        $page_info = get_post($track_page_id);

        if (!empty($page_info)) {
            if (false !== strpos($page_info->post_content, $shortcode)) {
                return;
            }
        }

        // @codingStandardsIgnoreStart
        $page = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = 'page'",
                $page_slug
            )
        );
        // @codingStandardsIgnoreEnd
        if ($page) {
            $page_check = get_post($page);
        }

        $page_id = $page_check->ID ?? 0;

        if (empty($page_id)) {

            $new_page = [
                'post_type' => 'page',
                'post_title' => $page_title,
                'post_name' => $page_slug,
                'post_content' => $shortcode,
                'post_status' => 'publish',
                'post_author' => 1,
            ];

            $page_id = wp_insert_post($new_page);
        }

        if ($track_page_id != $page_id) {
            update_option(\ParcelPanel\OptionName\TRACK_PAGE_ID, $page_id);
        }
    }

    function post_updated_track_page($post_ID, $post_after, $post_before)
    {
        if ('page' != $post_after->post_type || $post_after->post_name == $post_before->post_name) {
            return;
        }

        if (get_option(\ParcelPanel\OptionName\TRACK_PAGE_ID) == $post_ID) {
            Api::site_upgrade('tracking-page-url');
        }
    }

    ##############Independent page area##########################

    /**
     * Change order label style
     */
    public function footer_function()
    {
        if (!is_plugin_active('woocommerce-order-status-manager/woocommerce-order-status-manager.php')) {
            ?>
            <style>
                .order-status.status-partial-shipped {
                    background: #3582C4;
                    color: #fff;
                }

                .order-status.status-shipped {
                    background: #135E96;
                    color: #fff;
                }

                .order-status.status-delivered {
                    background: #00A32A;
                    color: #fff;
                }
            </style>
        <?php
        }
    }

    private function get_uninstall_reasons(): array
    {
        return [
            [
                'id' => 'temporary_deactivation',
                'text' => __('It is a temporary deactivation, I am just debugging an issue.', 'parcelpanel'),
                'type' => '',
                'placeholder' => '',
                'id_num' => 2,
            ],
            [
                'id' => 'no_longer_need',
                'text' => __('I no longer need the plugin.', 'parcelpanel'),
                'type' => 'text',
                'placeholder' => __('Could you tell us a bit more?', 'parcelpanel'),
                'id_num' => 3,
            ],
            [
                'id' => 'is_not_working',
                'text' => __('I couldn\'t get the plugin to work.', 'parcelpanel'),
                'type' => 'text',
                'placeholder' => __('Would you like us to assist you?', 'parcelpanel'),
                'id_num' => 4,
            ],
            [
                'id' => 'did_not_work_as_expected',
                'text' => __('It didn\'t work as expected.', 'parcelpanel'),
                'type' => 'text',
                'placeholder' => __('What did you expect?', 'parcelpanel'),
                'id_num' => 5,
            ],
            [
                'id' => 'not_have_that_feature',
                'text' => __('It\'s missing a specific feature.', 'parcelpanel'),
                'type' => 'text',
                'placeholder' => __('What specific feature?', 'parcelpanel'),
                'id_num' => 6,
            ],
            [
                'id' => 'found_better_plugin',
                'text' => __('I found a better plugin.', 'parcelpanel'),
                'type' => 'text',
                'placeholder' => __('Which plugin?', 'parcelpanel'),
                'id_num' => 7,
            ],
            [
                'id' => 'other',
                'text' => __('Other', 'parcelpanel'),
                'type' => 'text',
                'placeholder' => __('Could you tell us more to let us know how we can improve.', 'parcelpanel'),
                'id_num' => 8,
            ],
        ];
    }

    public function deactivate_scripts()
    {
        global $pagenow;

        if ($pagenow != 'plugins.php') {
            return;
        }

        static $modal = false;

        $data = [
            // 'slug' => 'parcel-panel-order-tracking-for-woocommerce',
            'slug' => 'parcelpanel',
        ];

        if (!$modal) :
            $reasons = $this->get_uninstall_reasons();
        ?>
            <div id="parcelpanel-modal-deactivate-survey" class="components-modal__screen-overlay pp-modal" style="display:none">
                <div role="dialog" tabindex="-1" class="components-modal__frame">
                    <div class="components-modal__content">
                        <div class="components-modal__header">
                            <div class="components-modal__header-heading-container">
                                <h1 class="components-modal__header-heading" style="font-weight: 600 !important;color: #1E1E1E;"><?php esc_html_e('We\'re sorry to see you leave', 'parcelpanel') ?></h1>
                            </div>
                            <button type="button" aria-label="Close dialog" class="components-button has-icon btn-close" style="position:unset;margin-right:-8px">
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="pp-modal-body">
                            <h3 style="margin: 0;font-size: 14px;line-height: 20px;color: #1E1E1E;">
                                <span style="margin-right: 4px;vertical-align: middle;">
                                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.20736 6.38741L2.57355 6.02083H3.09171L7.41671 6.02083L7.41671 1.75L1.58337 1.75L1.58337 7.01206L2.20736 6.38741ZM7.83337 7.27083L3.09171 7.27083L1.46047 8.90379C1.25505 9.10942 0.9393 9.15649 0.682836 9.01971C0.467735 8.90499 0.333374 8.68106 0.333374 8.43727V1.33333C0.333374 0.873096 0.706471 0.5 1.16671 0.5H7.83337C8.29361 0.5 8.66671 0.873096 8.66671 1.33333L8.66671 6.4375C8.66671 6.89774 8.29361 7.27083 7.83337 7.27083ZM11.7927 13.8874L11.4265 13.5208H10.9084L6.58337 13.5208L6.58337 9.25L12.4167 9.25L12.4167 14.5121L11.7927 13.8874ZM6.16671 14.7708H10.9084L12.5396 16.4038C12.745 16.6094 13.0608 16.6565 13.3172 16.5197C13.5323 16.405 13.6667 16.1811 13.6667 15.9373L13.6667 8.83333C13.6667 8.3731 13.2936 8 12.8334 8L6.16671 8C5.70647 8 5.33337 8.3731 5.33337 8.83333L5.33337 13.9375C5.33337 14.3977 5.70647 14.7708 6.16671 14.7708Z" fill="#1E1E1E" />
                                    </svg>
                                </span>
                                <?php esc_html_e('Quick feedback', 'parcelpanel') ?>
                            </h3>
                            <p><?php esc_html_e('May we have a little info about why you are deactivating to see how we can improve?', 'parcelpanel') ?></p>
                            <ul>
                                <?php foreach ($reasons as $reason) : ?>
                                    <li data-type="<?php echo esc_attr($reason['type']); ?>" data-placeholder="<?php echo esc_attr($reason['placeholder']); ?>">
                                        <div><label style="vertical-align: text-top;"><input type="radio" value="<?php echo esc_attr($reason['id']) ?>" name="selected-reason" class="pp-radio components-radio-control__input" style="height:18px;width:18px;border: 1px solid #8c8f94;"><?php echo esc_html($reason['text']) ?>
                                            </label></div>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                            <p style="padding: 16px 0 0;color: #757575;font-size: 12px;line-height: 16px;">
                                <?php esc_html_e('Tip: Please downgrade to free plan before deactivating if you want to cancel your current subscription.', 'parcelpanel') ?>
                            </p>
                        </div>
                        <div class="components-modal__footer">
                            <button type="button" class="components-button pp-button is-secondary btn-skip-deactivate">
                                <span><?php esc_html_e('Skip & Deactivate', 'parcelpanel') ?></span></button>
                            <button style="margin-left: 4px;" type="button" class="components-button pp-button is-primary pp-btn-default" disabled>
                                <span><?php esc_html_e('Submit & Deactivate', 'parcelpanel') ?></span></button>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                #parcelpanel-modal-deactivate-survey ul {
                    margin: 0;
                    padding: 0
                }

                #parcelpanel-modal-deactivate-survey ul li {
                    vertical-align: middle;
                    line-height: 20px;
                    margin: 6px 0 0;
                }

                .pp-modal .reason-input {
                    margin: 8px 0 10px;
                    padding-left: 26px
                }

                .pp-modal .components-placeholder__input {
                    margin: 0;
                    width: 100%;
                    height: 36px;
                    border-radius: 2px
                }

                .pp-btn-default {
                    background: #F0F0F0 !important;
                    color: #757575 !important;
                }

                .pp-modal .components-modal__header {
                    height: 60px;
                    font-size: 16px
                }

                .pp-modal .components-modal__header .components-modal__header-heading {
                    font-size: 16px;
                    line-height: 24px;
                    font-weight: 600;
                }

                .pp-modal .components-modal__content {
                    display: flex;
                    flex-direction: column;
                    margin-top: 60px;
                }
            </style>
            <script type="text/javascript">
                var pp_deactivate = {
                    deactivateLink: '',
                    survey_nonce: '<?php echo esc_js(wp_create_nonce('pp-deactivate-survey')) ?>'
                }

                jQuery(($) => {
                    const $modal = $('#parcelpanel-modal-deactivate-survey')
                    pp_deactivate.$modal = $modal
                    $modal
                        .on('click', '.btn-close', () => {
                            $modal.css({
                                display: 'none'
                            })
                        })
                        .on('click', 'input[type="radio"]', function() {
                            $modal.find('.is-primary').removeAttr('disabled')
                            $modal.find('.is-primary').removeClass('pp-btn-default')
                            const parent = $(this).parents('li:first')
                            $modal.find('.reason-input').remove()
                            const inputType = parent.data('type')
                            if (inputType !== '') {
                                const inputPlaceholder = parent.data('placeholder'),
                                    reasonInputHtml = `<div class="reason-input">${('text' === inputType) ? '<input type="text" class="components-placeholder__input"/>' : '<textarea rows="5" cols="45"></textarea>'}</div>`
                                parent.append($(reasonInputHtml))
                                parent.find('input,textarea').attr('placeholder', inputPlaceholder).focus()
                            }
                        })
                        .on('click', '.btn-skip-deactivate', function() {
                            const $this = $(this)

                            sendSurvey({
                                reason_id: 'skip'
                            }, $this)
                        })
                        .on('click', '.is-primary', function() {
                            const $this = $(this),
                                $radio = $('input[type="radio"]:checked', $modal),
                                $selected_reason = $radio.parents('li:first'),
                                $input = $selected_reason.find('textarea,input[type="text"]'),
                                reason_id = $radio.val(),
                                reason_info = $.trim($input.val())

                            if (!reason_id) return

                            sendSurvey({
                                reason_id,
                                reason_info
                            }, $this)
                        })

                    function sendSurvey({
                        reason_id,
                        reason_info
                    }, $buttonObject) {
                        const data = {
                            reason_id,
                            reason_info,
                            action: 'pp_deactivate_survey',
                            _ajax_nonce: pp_deactivate.survey_nonce,
                        }

                        $.ajax({
                            url: ajaxurl,
                            type: 'POST',
                            data,
                            beforeSend: function() {
                                doBeforeSend($buttonObject)
                            },
                            complete: function() {
                                toDeactivateLink()
                            }
                        })
                    }

                    function doBeforeSend($buttonObject) {
                        $modal.find('.components-modal__footer button').attr('disabled', 'disabled')
                        $buttonObject.addClass('is-busy').attr('disabled', 'disabled')
                        $modal.find('input[type="radio"],.reason-input input,.reason-input textarea').attr('disabled', 'disabled')
                    }

                    function toDeactivateLink() {
                        window.location.href = pp_deactivate.deactivateLink
                    }
                })
            </script>
        <?php
            $modal = true;
        endif;
        ?>
        <script type="text/javascript">
            jQuery(($) => {
                $(document).on('click', 'a#deactivate-<?php echo esc_html($data['slug']) ?>', function(e) {
                    e.preventDefault()
                    pp_deactivate.$modal.css({
                        display: ''
                    })
                    pp_deactivate.deactivateLink = $(this).attr('href')
                })
            })
        </script>
<?php
    }

    public function deactivate_survey_ajax()
    {
        check_ajax_referer('pp-deactivate-survey');

        $current_user = wp_get_current_user();

        $reason_flag = wc_clean($_POST['reason_id'] ?? '');
        $reason_info = sanitize_textarea_field($_POST['reason_info'] ?? '');

        $reasons = array_column($this->get_uninstall_reasons(), null, 'id');
        $reason = $reasons[$reason_flag] ?? [];
        $reason_id = $reason['id_num'] ?? 0;
        $reason_text = $reason['text'] ?? '';
        if ($reason_flag === 'skip') {
            $reason_id = 1;
        }

        $name = (new ParcelPanelFunction)->parcelpanel_get_current_user_name();

        Api::uninstall_feedback([
            'reason_id' => $reason_id,
            'reason' => $reason_text,
            'feedback' => $reason_info,
            'name' => $name,
            'email' => $current_user->user_email,
        ]);

        die;
    }

    static function set_screen_option($new_value, $option, $value)
    {
        if (in_array($option, ['parcelpanel_page_pp_shipments_per_page'])) {
            return absint($value);
        }

        return $new_value;
    }

    function feedback_ajax()
    {
        check_ajax_referer('pp-feedback-confirm');

        $msg = sanitize_textarea_field($_REQUEST['msg']);
        $email = sanitize_email($_REQUEST['email']);
        $rating = absint($_REQUEST['rating']);
        $type = absint($_REQUEST['type']);

        if (empty($msg) || empty($email) || empty($rating)) {
            parcelpanel_json_response([], __('Required fields cannot be empty.', 'parcelpanel'), false);
        }

        $current_user = wp_get_current_user();

        $resp = Api::feedback([
            'first_name' => $current_user->first_name,
            'name_name' => $current_user->last_name,
            'msg' => $msg,
            'email' => $email,
            'rating' => $rating,
            'type' => $type,
        ]);

        if (is_wp_error($resp) || !is_array($resp)) {
            parcelpanel_json_response([], 'Save failed. Server error', false);
        }

        $resp_code = $resp['code'] ?? '';
        $resp_msg = $resp['msg'] ?? '';

        if (200 !== $resp_code) {
            parcelpanel_json_response([], "Save failed. {$resp_msg}", false);
        }

        parcelpanel_json_response([], 'Saved successfully');
    }

    function on_order_item_update(\WC_Order_Item $item)
    {
        include_once(ABSPATH . 'wp-admin/includes/plugin.php');

        if (is_plugin_active('ali2woo/ali2woo.php') || is_plugin_active('ali2woo-lite/ali2woo-lite.php')) {
            $this->on_order_item_update_ali2woo($item);
        }
    }

    private function on_order_item_update_ali2woo(\WC_Order_Item $item)
    {
        global $wpdb;

        if ('line_item' !== $item->get_type()) {
            return;
        }

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        $order_id = $item->get_order_id();
        $order_item_id = $item->get_id();
        $a2w_tracking_data = $item->get_meta('_a2w_tracking_data');

        if (empty($a2w_tracking_data['tracking_codes']) || !is_array($a2w_tracking_data['tracking_codes'])) {
            /* Clear order number or no operation */

            // Remove the order numbers associated with all products
            $this->ali2woo_order_data_reset($order_id, $order_item_id);

            return;
        }


        $tracking_numbers = $a2w_tracking_data['tracking_codes'];
        $tracking_numbers = array_filter($tracking_numbers, function ($b) {
            return strlen($b) >= 4;
        });

        /* tracking numbers in table */
        /* has new number or update number */
        $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_numbers);

        // @codingStandardsIgnoreStart
        $tracking_data = (array)$wpdb->get_results(
            $wpdb->prepare(
                "SELECT id,tracking_number FROM {$TABLE_TRACKING} WHERE tracking_number IN ({$placeholder_str})",
                $tracking_numbers
            )
        );
        // @codingStandardsIgnoreEnd
        $is_insert_tracking = false;
        // Filter out tracking numbers that do not exist in the database
        $new_tracking_numbers = array_diff($tracking_numbers, array_column($tracking_data, 'tracking_number'));
        $now = time();
        foreach ($new_tracking_numbers as $tracking_number) {
            $tracking_item_data = ShopOrder::get_tracking_item_data($tracking_number, null, $now);
            $res = $wpdb->insert($TABLE_TRACKING, $tracking_item_data); // phpcs:ignore
            if (!is_wp_error($res)) {
                $_tracking_datum = $tracking_data[] = new \stdClass;
                $_tracking_datum->id = $wpdb->insert_id;
                $_tracking_datum->tracking_number = $tracking_number;

                $is_insert_tracking = true;
            }
        }
        if ($is_insert_tracking) {
            TrackingNumber::schedule_tracking_sync_action(-1);
        }

        // Filter order numbers allowed to be processed
        $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_data, '%d');

        // @codingStandardsIgnoreStart
        $trackings_order_ids = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT order_id,tracking_id FROM {$TABLE_TRACKING_ITEMS} WHERE tracking_id IN({$placeholder_str})",
                array_column($tracking_data, 'id')
            )
        );
        // @codingStandardsIgnoreEnd
        if (!empty($trackings_order_ids)) {
            foreach ($trackings_order_ids as $_data) {
                if ($_data->order_id == $order_id) {
                    continue;
                }
                foreach ($tracking_data as $key => $value) {
                    if ($value->id == $_data->tracking_id) {
                        unset($tracking_data[$key]);
                        break;
                    }
                }
            }
        }

        // @codingStandardsIgnoreStart
        $shipments = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM {$TABLE_TRACKING_ITEMS} WHERE order_id=%d",
            $order_id
        ));
        // @codingStandardsIgnoreEnd
        if (!empty($tracking_data)) {
            $wpdb->delete($TABLE_TRACKING_ITEMS, ['order_id' => $order_id, 'order_item_id' => $order_item_id, 'quantity' => 0]); // phpcs:ignore

            foreach ($tracking_data as $tracking_datum) {
                $_shipment = null;
                foreach ($shipments as $shipment) {
                    if ($shipment->tracking_id == $tracking_datum->id) {
                        $_shipment = $shipment;
                        break;
                    }
                }
                $_shipment_status = $_shipment->shipment_status ?? 1;
                $_custom_status_time = $_shipment->custom_status_time ?? '';
                $_custom_shipment_status = $_shipment->custom_shipment_status ?? 0;
                // @codingStandardsIgnoreStart
                $wpdb->insert($TABLE_TRACKING_ITEMS, [
                    'order_id' => $order_id,
                    'order_item_id' => $order_item_id,
                    'tracking_id' => $tracking_datum->id,
                    'shipment_status' => $_shipment_status,
                    'custom_status_time' => $_custom_status_time,
                    'custom_shipment_status' => $_custom_shipment_status,
                ]);
                // @codingStandardsIgnoreEnd
            }
        }

        ShopOrder::adjust_unfulfilled_shipment_items($order_id);
    }

    private function ali2woo_order_data_reset($order_id, $order_item_id)
    {
        global $wpdb;

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        $wpdb->delete($TABLE_TRACKING_ITEMS, ['order_id' => $order_id, 'order_item_id' => $order_item_id, 'quantity' => 0]); // phpcs:ignore
        ShopOrder::adjust_unfulfilled_shipment_items($order_id);
    }

    private function init_app_1001_integration()
    {
        include_once(ABSPATH . 'wp-admin/includes/plugin.php');

        if (!AdminIntegration::get_app_integrated(1001)) {
            return;
        }

        add_action('woocommerce_before_order_item_object_save', function (\WC_Order_Item $item) {
            if ($item->get_type() !== 'line_item') return;

            $from = 1001;
            $order_id = $item->get_order_id();
            $order_item_id = $item->get_id();

            $new_tracking_codes = $item->get_meta('_a2w_tracking_data')['tracking_codes'] ?? [];
            $old_tracking_codes = (new \WC_Order_Item_Product($order_item_id))->get_meta('_a2w_tracking_data')['tracking_codes'] ?? [];

            foreach (array_diff($old_tracking_codes, $new_tracking_codes) as $tracking_number) {
                $this->delete_list[] = compact('tracking_number', 'order_id', 'order_item_id', 'from');
            }

            foreach (array_diff($new_tracking_codes, $old_tracking_codes) as $tracking_number) {
                $this->add_list[] = compact('tracking_number', 'order_id', 'order_item_id', 'from');
            }
        });

        add_action('woocommerce_after_order_item_object_save', function (\WC_Order_Item $item) {
            if ($item->get_type() !== 'line_item') return;

            $from = 1001;
            $order_item_id = $item->get_id();

            foreach ($this->delete_list as &$item) {
                if ($item['order_item_id'] === $order_item_id && $item['from'] === $from) {
                    $item['success'] = true;
                }
            }

            foreach ($this->add_list as &$item) {
                if ($item['order_item_id'] === $order_item_id && $item['from'] === $from) {
                    $item['success'] = true;
                }
            }
        });
    }

    private function init_app_1002_integration()
    {
        if (!AdminIntegration::get_app_integrated(1002)) {
            return;
        }

        add_action('added_order_item_meta', function ($mid, $object_id, $meta_key, $_meta_value) {
            if ($meta_key !== '_vi_wot_order_item_tracking_data') {
                return;
            }

            $from = 1002;
            $items = (array)json_decode($_meta_value, true);
            $item = array_pop($items);
            $tracking_number = (string)($item['tracking_number'] ?? '');
            if (!$tracking_number) {
                return;
            }

            $order_id = wc_get_order_id_by_order_item_id($object_id);

            $this->add_list[] = [
                'tracking_number' => $tracking_number,
                'order_id' => $order_id,
                'order_item_id' => $object_id,
                'from' => $from,
                'success' => true,
            ];
        }, 10, 4);

        add_action('update_order_item_meta', function ($meta_id, $object_id, $meta_key, $_meta_value) {
            if ($meta_key !== '_vi_wot_order_item_tracking_data') {
                return;
            }

            $from = 1002;
            $items = (array)json_decode($_meta_value, true);
            $item = array_pop($items);

            $_original_items = (array)json_decode(wc_get_order_item_meta($object_id, $meta_key, true), true);
            $_original_item = array_pop($_original_items);

            $tracking_number = (string)($item['tracking_number'] ?? '');
            $_original_tracking_number = (string)($_original_item['tracking_number'] ?? '');
            if (!$_original_tracking_number || $tracking_number === $_original_tracking_number) {
                return;
            }

            $order_id = wc_get_order_id_by_order_item_id($object_id);

            $this->delete_list[] = [
                'tracking_number' => $_original_tracking_number,
                'order_id' => $order_id,
                'order_item_id' => $object_id,
                'from' => $from,
            ];

            $this->add_list[] = [
                'tracking_number' => $tracking_number,
                'order_id' => $order_id,
                'order_item_id' => $object_id,
                'from' => $from,
            ];
        }, 10, 4);

        add_action('updated_order_item_meta', function ($meta_id, $object_id, $meta_key, $_meta_value) {
            if ($meta_key !== '_vi_wot_order_item_tracking_data') {
                return;
            }

            $from = 1002;

            foreach ($this->delete_list as &$item) {
                if ($item['order_item_id'] === $object_id && $item['from'] === $from) {
                    $item['success'] = true;
                }
            }

            foreach ($this->add_list as &$item) {
                if ($item['order_item_id'] === $object_id && $item['from'] === $from) {
                    $item['success'] = true;
                }
            }
        }, 10, 4);
    }

    private function init_app_1003_integration()
    {

        if (!AdminIntegration::get_app_integrated(1003)) {
            return;
        }

        add_action('wp_insert_comment', function ($id, $comment) {

            /** @var \WP_Comment|null $comment */
            if (!$comment instanceof \WP_Comment) {
                return;
            }

            $this->init_app_1003_integration_action($comment);
        }, 10, 2);
    }
    private function init_app_1003_integration_action($comment)
    {

        // e.g. need \r\n
        // ● Tracking number: 3636363636
        // (for Ali order # 81552654568575)
        // Line item ID: 290
        $from = 1003;
        $comment_type = $comment->comment_type;
        $content = $comment->comment_content;
        $order_id = $comment->comment_post_ID;

        if (!$content || $comment_type !== 'order_note') {
            return;
        }

        $tracking_number_matches = [];
        $res_match_tracking_number = preg_match('/Tracking number: (.*)/', $content, $tracking_number_matches);
        if (!$res_match_tracking_number) {
            return;
        }

        $item_id_matches = [];
        $res_match_item_id = preg_match('/Line item ID: (.*)/', $content, $item_id_matches);
        if (!$res_match_item_id) {
            return;
        }

        $tracking_number = $tracking_number_matches[1];
        $line_item_ids = array_map('intval', explode(',', $item_id_matches[1]));

        foreach ($line_item_ids as $item_id) {
            if (!$item_id) {
                continue;
            }

            $this->add_list[] = [
                'tracking_number' => $tracking_number,
                'order_id' => $order_id,
                'order_item_id' => $item_id,
                'from' => $from,
                'success' => true,
            ];
        }
    }

    // wc_app_drop_shipping_SendCloud
    private function init_app_1004_integration()
    {
        // is active
        $isActivePlugins = is_plugin_active('sendcloud-shipping/sendcloud-shipping.php');
        if (!AdminIntegration::get_app_integrated(1004) || !$isActivePlugins) {
            return;
        }

        add_action('wp_insert_comment', function ($id, $comment) {

            /** @var \WP_Comment|null $comment */
            if (!$comment instanceof \WP_Comment) {
                return;
            }

            $this->init_app_integration_action($comment, 1004);
        }, 10, 2);
    }

    // wc_app_drop_shipping_Shippo
    private function init_app_1005_integration()
    {
        if (!AdminIntegration::get_app_integrated(1005)) {
            return;
        }

        add_action('wp_insert_comment', function ($id, $comment) {

            /** @var \WP_Comment|null $comment */
            if (!$comment instanceof \WP_Comment) {
                return;
            }

            $this->init_app_integration_action($comment, 1005);
        }, 10, 2);
    }

    // wc_app_drop_shipping_wcShipping
    private function init_app_1006_integration()
    {
        // is active
        $isActivePlugins = is_plugin_active('woocommerce-services/woocommerce-services.php');
        if (!AdminIntegration::get_app_integrated(1006) || !$isActivePlugins) {
            return;
        }

        add_action('wp_insert_comment', function ($id, $comment) {

            /** @var \WP_Comment|null $comment */
            if (!$comment instanceof \WP_Comment) {
                return;
            }

            $this->init_app_integration_action($comment, 1006);
        }, 10, 2);
    }

    // wc_app_drop_shipping_shipStation
    private function init_app_1007_integration()
    {
        $isActivePlugins = is_plugin_active('woocommerce-shipstation-integration/woocommerce-shipstation.php');
        if (!AdminIntegration::get_app_integrated(1007) || !$isActivePlugins) {
            return;
        }
        add_action('wp_insert_comment', function ($id, $comment) {

            /** @var \WP_Comment|null $comment */
            if (!$comment instanceof \WP_Comment) {
                return;
            }

            $this->init_app_integration_action($comment, 1007);
        }, 10, 2);
    }

    // wc_app_drop_shipping_dianxiaomi
    private function init_app_1008_integration()
    {
        // $isActivePlugins = is_plugin_active('dianxiaomi/dianxiaomi.php');  || !$isActivePlugins
        if (!AdminIntegration::get_app_integrated(1008)) {
            return;
        }
        add_action('wp_insert_comment', function ($id, $comment) {

            /** @var \WP_Comment|null $comment */
            if (!$comment instanceof \WP_Comment) {
                return;
            }

            $this->init_app_integration_action($comment, 1008);
        }, 10, 2);
    }

    // wc_app_drop_shipping_pirateship
    private function init_app_1009_integration()
    {
        if (!AdminIntegration::get_app_integrated(1009)) {
            return;
        }

        add_action('wp_insert_comment', function ($id, $comment) {

            /** @var \WP_Comment|null $comment */
            if (!$comment instanceof \WP_Comment) {
                return;
            }

            $this->init_app_integration_action($comment, 1009);
        }, 10, 2);
    }

    private function init_app_integration_action($comment, $from)
    {
        $comment_type = $comment->comment_type ?? '';
        $content = $comment->comment_content ?? '';
        $order_id = $comment->comment_post_ID ?? '';
        // fulfill time
        $comment_date_gmt = $comment->comment_date_gmt ?? 0;

        if (!$content || !$order_id || $comment_type !== 'order_note') {
            return;
        }

        if (in_array($from, [1004, 1005, 1008])) {
            // order status change
            if ($content == "Order status changed from Processing to Shipped.") {
                $order = wc_get_order($order_id);
                $status = '';
                if (is_a($order, 'WC_Order')) {
                    $status = $order->get_status() ?? ''; // processing completed
                }
                if ($status == 'processing') {
                    $order->update_status('completed');
                }
                return;
            }
        }

        if (in_array($from, [1009])) {
            // order status change
            if ($content == "Order status changed from Processing to Completed.") {
                $order = wc_get_order($order_id);
                $status = '';
                if (is_a($order, 'WC_Order')) {
                    $status = $order->get_status() ?? ''; // processing completed
                }
                if ($status == 'processing') {
                    $order->update_status('completed');
                }
                return;
            }

            if ($content == "Order status changed from Completed to Processing.") {
                $order = wc_get_order($order_id);
                $status = '';
                if (is_a($order, 'WC_Order')) {
                    $status = $order->get_status() ?? ''; // processing completed
                }
                if ($status == 'completed') {
                    $order->update_status('processing');
                }
                return;
            }

            // del shipment
            if ($content == "Order shipment has been canceled") {
                // del all shipment in order
                $order_tracking_data = Orders::get_tracking_data_by_order_id([$order_id]);
                $tracking = !empty($order_tracking_data[$order_id]) ? $order_tracking_data[$order_id] : [];
                foreach ($tracking as $v) {
                    $tracking_number = $v['tracking_number'] ?? '';
                    $tracking_id = $v['tracking_id'] ?? '';
                    ShopOrder::delete_tracking_item($tracking_id, $order_id, $tracking_number);
                }
                return;
            }
        }

        $tracking_number = '';
        $carrier = '';
        if (in_array($from, [1004])) {
            $tracking_number_matches = [];
            $res_match_tracking_number = preg_match('/this SendCloud shipment is:(.*)and can be traced/', $content, $tracking_number_matches);
            if (!$res_match_tracking_number) {
                return;
            }
            $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';
            $arr = explode(' ', $tracking_number);
            if (count($arr) > 1) {
                return;
            }

            $carrier_matches = [];
            $res_match_carrier = preg_match('/The(.*)tracking number for/', $content, $carrier_matches);
            $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
        }
        if (in_array($from, [1005])) {
            $tracking_number_matches = [];
            $res_match_tracking_number = preg_match('/tracking number(.*)has been created/', $content, $tracking_number_matches);
            if (!$res_match_tracking_number) {
                return;
            }
            $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';
            $arr = explode(' ', $tracking_number);
            if (count($arr) > 1) {
                return;
            }

            $carrier_matches = [];
            $res_match_carrier = preg_match('/(.*)Ground label with/', $content, $carrier_matches);
            $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
        }
        if (in_array($from, [1006])) {
            $tracking_number_matches = [];
            $res_match_tracking_number = preg_match('/tracking number is:(.*)/', $content, $tracking_number_matches);
            if (!$res_match_tracking_number) {
                return;
            }
            $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';
            $arr = explode(' ', $tracking_number);
            if (count($arr) > 1) {
                return;
            }

            // check is 1008
            // $order = wc_get_order($order_id);
            // $dianxiaomi_tracking_number = $order->get_meta('_dianxiaomi_tracking_number');
            // if ($dianxiaomi_tracking_number == $tracking_number) {
            //     return;
            // }

            $carrier_matches = [];
            $res_match_carrier = preg_match('/Order was shipped with(.*)and tracking/', $content, $carrier_matches);
            $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
        }

        if (in_array($from, [1007])) {

            // Order was shipped with USPS and tracking number is: 9449011206216365062164
            // $tracking_number_matches = [];
            // $res_match_tracking_number = preg_match('/tracking number is:(.*)/', $content, $tracking_number_matches);
            // if (!$res_match_tracking_number) {
            //     return;
            // }
            // $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';

            // $carrier_matches = [];
            // $res_match_carrier = preg_match('/Order was shipped with(.*)and tracking/', $content, $carrier_matches);
            // $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';

            // if (empty($tracking_number)) {
            // Striped Cotton Jumper (Striped Cotton Jumper) x 1, Textured strappy dress x 1 shipped via USPS on November 29, 2023 with tracking number 9449011206216365062164.
            $tracking_number_matches = [];
            $res_match_tracking_number = preg_match('/with tracking number (.*)./', $content, $tracking_number_matches);
            if (!$res_match_tracking_number) {
                return;
            }
            $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';
            $arr = explode(' ', $tracking_number);
            if (count($arr) > 1) {
                return;
            }

            $carrier_matches = [];
            $res_match_carrier = preg_match('/shipped via (.*) on (.*) with/', $content, $carrier_matches);
            $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
            $comment_date_gmt = !empty($carrier_matches[2]) ? trim($carrier_matches[2]) : '';

            if (!$comment_date_gmt) {
                return;
            }

            // get pro id from pro name
            $pro = [];
            $res_match_carrier = preg_match('/(.*) shipped via/', $content, $pro);
            $pro = !empty($pro[1]) ? trim($pro[1]) : '';
            $proArr = explode(',', $pro);
            $proRes = [];
            foreach ($proArr as $v) {
                $proS = explode(' x ', $v);

                if (empty($proS[0]) || empty($proS[1])) {
                    continue;
                }

                $name = trim($proS[0]) ?? '';
                $quantity = (int)trim($proS[1]) ?? 0;
                $nameArr = [];
                preg_match('/\((.*)\)/', $name, $nameArr);
                if (count($nameArr) > 1) {
                    $name = !empty($nameArr[1]) ? trim($nameArr[1]) : '';
                }
                if (empty($name) || empty($quantity)) {
                    continue;
                }

                $proRes[$name] = [
                    'quantity' => $quantity,
                ];
            }
            if (!empty($proRes)) {
                $order = wc_get_order($order_id);
                foreach ($order->get_items() as $item_key => $item) {
                    $data = $item->get_data();
                    $line_items[] = $data;
                }

                $order_item_ids = [];
                if (!empty($line_items)) {
                    foreach ($line_items as $v) {
                        $id = $v['id'] ?? '';
                        $name = $v['name'] ?? '';
                        if (!empty($proRes[$name])) {
                            $order_item_ids[] = [
                                'item_id' => $id,
                                'quantity' => $proRes[$name]['quantity'] ?? 0,
                                'quantity_order' => $v['quantity'] ?? 0,
                                'check_item' => true,
                            ];
                        }
                    }
                }
            }
            // }
        }

        if (in_array($from, [1008])) {

            // <span>Your order has been shipped by 4PX. The tracking number is </span><span style="color:#005b9a;font-weight:bold;text-decoration:underline">4PX3000941324255CN</span><span>. Get more information by the right button.</span><a style="text-decoration:none;" href="https://t.17track.net/#nums=4PX3000941324255CN" target="_blank"><span style="cursor:pointer; margin-left: 20px;background: #005b9a;color: #fff;padding: 4px 6px;border-radius: 3px;font-size: 14px;text-align: center;">Track My Order</span></a>

            // Order was shipped with UPS and tracking number is: 1212121212
            $tracking_number_matches = [];
            $res_match_tracking_number = preg_match('/The tracking number is(.*)<\/span><span>/', $content, $tracking_number_matches);
            $no_number = false;
            if (!$res_match_tracking_number) {
                $no_number = true;
            }
            if (!$no_number) {
                $tracking_number_str = !empty($tracking_number_matches[0]) ? trim($tracking_number_matches[0]) : '';
                $res_match_tracking_number = preg_match('/<span(.*)<\/span><span>/', $tracking_number_str, $tracking_number_matches);
                $tracking_number_str = !empty($tracking_number_matches[0]) ? trim($tracking_number_matches[0]) : '';
                $res_match_tracking_number = preg_match('/>(.*)<\/span><span>/', $tracking_number_str, $tracking_number_matches);
                $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';
                $arr = explode(' ', $tracking_number);
                if (count($arr) > 1) {
                    $no_number = true;
                }
                $carrier_matches = [];
                $res_match_carrier = preg_match('/Your order has been shipped by (.*)\. The tracking number is/', $content, $carrier_matches);
                $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
            }

            if (empty($tracking_number)) {
                // Order was shipped with UPS and tracking number is: 1212121212
                $tracking_number_matches = [];
                $res_match_tracking_number = preg_match('/tracking number is:(.*)/', $content, $tracking_number_matches);
                if (!$res_match_tracking_number) {
                    return;
                }
                $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';
                $arr = explode(' ', $tracking_number);
                if (count($arr) > 1) {
                    return;
                }

                // check is 1008
                // $order = wc_get_order($order_id);
                // $dianxiaomi_tracking_number = $order->get_meta('_dianxiaomi_tracking_number');

                // if ($dianxiaomi_tracking_number != $tracking_number) {
                //     return;
                // }

                $carrier_matches = [];
                $res_match_carrier = preg_match('/Order was shipped with(.*)and tracking/', $content, $carrier_matches);
                $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
            }
        }

        if (in_array($from, [1009])) {

            $carrier_matches = [];
            $res_match_carrier = preg_match('/shipped via (.*) on (.*) with/', $content, $carrier_matches);
            $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
            $comment_date_gmt = !empty($carrier_matches[2]) ? trim($carrier_matches[2]) : '';

            if (!$comment_date_gmt && !$carrier) {
                // Order shipped via UPS with tracking number 1ZG1J5730200001010
                $tracking_number_matches = [];
                $res_match_tracking_number = preg_match('/tracking number (.*)/', $content, $tracking_number_matches);
                if (!$res_match_tracking_number) {
                    return;
                }
                $tracking_number = !empty($tracking_number_matches[1]) ? trim($tracking_number_matches[1]) : '';
                $arr = explode(' ', $tracking_number);
                if (count($arr) > 1) {
                    return;
                }

                $carrier_matches = [];
                $res_match_carrier = preg_match('/Order shipped via (.*) with/', $content, $carrier_matches);
                $carrier = !empty($carrier_matches[1]) ? trim($carrier_matches[1]) : '';
            }
        }

        if (!$tracking_number) {
            return;
        }

        // courier to pp wc courier
        $courier_code = $this->getPPwcCourier($carrier, $from, $tracking_number);

        if (!empty($order_item_ids)) {
            foreach ($order_item_ids as $v) {
                $item_id = $v['item_id'] ?? 0;
                $quantity = $v['quantity'] ?? 0;
                $quantity_order = $v['quantity_order'] ?? 0;
                $check_item = $v['check_item'] ?? false;
                $data = [
                    'tracking_number' => $tracking_number,
                    'order_id' => $order_id,
                    'order_item_id' => $item_id,
                    'quantity' => $quantity,
                    'quantity_order' => $quantity_order,
                    'courier_code' => $courier_code,
                    'fulfilled_at' => !empty($comment_date_gmt) ? strtotime($comment_date_gmt) : time(),
                    'from' => $from,
                    'success' => true,
                    'check_item' => $check_item, // check item to delete
                ];
                $this->add_list[] = $data;
            }
        } else {
            $data = [
                'tracking_number' => $tracking_number,
                'order_id' => $order_id,
                'order_item_id' => 0,
                'quantity' => 0,
                'quantity_order' => 0,
                'courier_code' => $courier_code,
                'fulfilled_at' => !empty($comment_date_gmt) ? strtotime($comment_date_gmt) : time(),
                'from' => $from,
                'success' => true,
            ];
            $this->add_list[] = $data;
        }
    }

    private function getPPwcCourier($carrier, $from, $tracking_number = '')
    {
        // Sendcloud https://support.sendcloud.com/hc/en-us/categories/360001511752-Carriers-
        if ($from == 1004) {
            $courierArr = [
                'Bol' => '',
                'InPost' => 'inpost-paczkomaty',
                'Geodis' => 'geodis',
                'DPD Local' => 'dpd-uk',
                'Spring' => 'spring-gds',
                'Amazon' => 'amazon',
                'Yodel' => 'yodel',
                'Poste Delivery Business' => 'poste-italiane',
                'Budbee' => '',
                'Bring' => 'bring',
                'BRT (Bartolini)' => 'bartolini',
                'Bpost' => 'belgium-post',
                'Chronopost' => 'chronopost',
                'Colis Privé' => 'colis-prive',
                'Colissimo' => 'colissimo',
                'Correos' => 'correos-spain',
                'Correos Express' => 'correosexpress',
                'CTT Express' => 'ctt-express',
                'Delivengo' => '',
                'Deutsche Post' => 'deutsche-post',
                'DHL' => 'dhl',
                'DHL Express' => 'dhl',
                'DPD' => 'dpd',
                'Fedex' => 'fedex',
                'Cycloon' => '',
                'GLS' => 'gls',
                'Evri' => 'hermes-uk',
                'Evri C2C' => 'hermes-uk',
                'Hermes AT' => 'hermes',
                'Hermes DE' => 'hermes-de',
                'Lettre Suivie' => '',
                'TNT' => 'tnt',
                'Mondial Relay' => 'mondialrelay',
                'MRW' => 'mrw-spain',
                'NACEX' => '',
                'Parcelforce' => 'parcel-force',
                'PostAT' => '',
                'Poste Italiane' => 'poste-italiane',
                'PostNL' => 'postnl-parcels',
                'Quicargo' => '',
                'Royal Mail' => 'royal-mail',
                'SEUR' => 'international-seur',
                'StoreShippers' => '',
                'Trunkrs' => '',
                'UPS' => 'ups',
                'ViaTim' => '',
            ];
        }

        // Shippo https://goshippo.com/docs/reference#carriers
        if ($from == 1005) {
            $courierArr = [
                'airterra' => '',
                'apc_postal' => 'apc',
                'apg' => '',
                'aramex' => 'aramex',
                'asendia_us' => 'asendia-usa',
                'australia_post' => 'australia-post',
                'axlehire' => 'axlehire',
                'better_trucks' => 'bettertrucks',
                'borderguru' => 'hermes-borderguru',
                'boxberry' => 'boxberry',
                'bring' => 'bring',
                'canada_post' => 'canada-post',
                'cdl' => 'cdl',
                'chronopost' => 'chronopost',
                'collect_plus' => 'collectplus',
                'correios_br' => '',
                'correos_espana' => 'correos-spain',
                'couriersplease' => 'couriers-please',
                'deutsche_post' => 'deutsche-post',
                'dhl_benelux' => 'dhl-benelux',
                'dhl_ecommerce' => 'dhlglobalmail',
                'dhl_express' => 'dhl',
                'dhl_germany_c2c' => 'dhl-germany',
                'dhl_germany' => 'dhl-germany',
                'dpd_germany' => 'dhl-germany',
                'dpd' => 'dpd',
                'dpd_uk' => 'dpd-uk',
                'estafeta' => 'estafeta',
                'fastway_australia' => 'fastway-au',
                'fedex' => 'fedex',
                'globegistics' => 'globegistics',
                'gls_us' => 'gls-us',
                'gophr' => '',
                'gso' => '',
                'hermes_germany_b2c' => 'hermes-de',
                'hermes_uk' => 'hermes-uk',
                'hongkong_post' => '',
                'lasership' => 'lasership',
                'lso' => 'lso',
                'mondial_relay' => 'mondialrelay',
                'newgistics' => 'newgistics',
                'new_zealand_post' => 'new-zealand-post',
                'nippon_express' => 'nippon',
                'ontrac' => 'ontrac',
                'orangeds' => 'orangeds',
                'parcelforce' => 'parcel-force',
                'parcel' => '',
                'passport' => '',
                'pcf' => '',
                'posti' => 'finland-posti',
                'purolator' => 'purolator',
                'royal_mail' => 'royal-mail',
                'rr_donnelley' => 'rrdonnelley',
                'russian_post' => 'russian-post',
                'sendle' => 'sendle',
                'skypostal' => 'sky-postal',
                'stuart' => '',
                'swyft' => '',
                'uds' => '',
                'ups' => 'ups',
                'usps' => 'usps',
                'yodel' => 'yodel',
            ];
        }

        if ($from == 1006) {
            $courierArr = [
                'USPS' => 'usps',
                'DHL' => 'dhl',
            ];
        }

        // https://ship15.shipstation.com/onboard
        if ($from == 1007) {
            $courierArr = [
                "DHL Express UK" => 'dhl-uk',
                "Sendle" => 'sendle',
                "SEKO Omni-Channel Logistics" => '',
                "Amazon Shipping US" => 'amazon',
                "SEKO LTL by ShipStation" => '',
                "IntelliQuick Delivery" => '',
                "Mercado Libre Shipping" => '',
                "Lasership" => 'lasership',
                "GLS US" => 'gls-us',
                "Better Trucks" => 'bettertrucks',
                "Swyft" => '',
                "Purolator International" => 'purolator',
                "parcll" => 'parcll',
                "ECMS Standard Express" => 'ecms',
                "Global-e" => '',
                "Via Delivery" => '',
                "Direct Link" => '',
                "DAI" => '',
                "Pandion" => '',
                "netParcel" => '',
                "International Bridge, Inc" => '',
                "Starlinks" => 'starlinks',
                "Tusk" => '',
                "Skypostal Inc" => '',
                "Evri International" => '',
                "ShipX" => '',
                "Maersk B2C" => 'maersk',
                "GoBolt" => '',
                "UPS" => 'ups',
                'USPS' => 'usps',
                "Stamps.com" => '',
                "FedEx" => 'fedex',
                "DHL Express" => 'dhl',
                "Amazon Buy Shipping" => '',
                "Aramex International" => 'Aramex',
                "OnTrac" => 'ontrac',
                "LSO" => 'lso',
            ];
        }

        // 1008 https://www.dianxiaomi.com/sys/index.htm?go=m405

        if ($from == 1009) {
            $courierArr = [
                'USPS' => 'usps',
                'UPS' => 'ups',
            ];
        }

        $courier_code = $courierArr[$carrier] ?? '';

        if (empty($courier_code) && !empty($tracking_number)) {
            // get auto number
            $res_data = API::number_identify($tracking_number);
            $courier_code = ArrUtils::get($res_data, 'courier_code', '');
        }

        return $courier_code;
    }

    /**
     * Func update option config for pp
     */
    public function update_config_option($event, $old_value, $value)
    {
        $other = array();
        if (in_array($event, array('timezone_updated', 'timezone_offset_updated'))) {
            $timezone = get_option('timezone_string');
            $timezone_offset = get_option('gmt_offset');
            $other['timezone'] = $timezone;
            $other['timezone_offset'] = $timezone_offset;
        }
        $data = [
            'config' => [
                'event' => $event,
                'old_value' => $old_value,
                'new_value' => $value,
                'other' => $other,
            ]
        ];
        Api::configs_option_update_to_pp($data);
    }

    /**
     * Func update timezone updated
     */
    public function timezone_updated($old_value, $value)
    {
        $this->update_config_option('timezone_updated', $old_value, $value);
    }

    /**
     * Func update timezone_offset updated
     */
    public function timezone_offset_updated($old_value, $value)
    {
        $this->update_config_option('timezone_offset_updated', $old_value, $value);
    }

    /**
     * Func update currency updated
     */
    public function currency_updated($old_value, $value)
    {
        $this->update_config_option('currency_updated', $old_value, $value);
    }
}

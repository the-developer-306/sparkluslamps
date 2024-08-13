<?php

/**
 * Plugin Name: Parcel Panel Order Tracking for WooCommerce
 * Plugin URI: https://docs.parcelpanel.com/woocommerce
 * Description: The best order tracking plugin specially designed for WooCommerce, driving customer loyalty and more sales by providing the best post-purchase experience.
 * Version: 4.3.6
 * Author: Parcel Panel
 * Author URI: https://www.parcelpanel.com
 * Developer: Parcel Panel
 * Developer URI: https://www.parcelpanel.com
 * Text Domain: parcelpanel
 * Domain Path: /l10n/languages/
 * License: GPL-2.0
 * Requires PHP: 7.2
 * Requires at least: 5.8
 * WC requires at least: 4.4.0
 * WC tested up to: 7.3
 *
 * @copyright 2018-2023 ParcelPanel
 */

define('ParcelPanel\VERSION', '4.3.6');
define('ParcelPanel\DB_VERSION', '2.9.0');

define('ParcelPanel\PLUGIN_FILE', __FILE__);
define('ParcelPanel\PLUGIN_PATH', untrailingslashit(plugin_dir_path(__FILE__)));

defined('ParcelPanel\DEBUG') || define('ParcelPanel\DEBUG', false);


// 检查是否激活 WooCommerce
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {

    include __DIR__ . '/vendor/autoload.php';

    ParcelPanel\ParcelPanel::instance();
}

// compatible with HPOS
add_action('before_woocommerce_init', function () {
    if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
    }
});

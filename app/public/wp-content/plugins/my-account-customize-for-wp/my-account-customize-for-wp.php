<?php
/**
 *
 * @link              https://coderitsolution.com/
 * @since             1.1.1
 * @package           Cits_Woocommerce_My_Account_Customize
 *
 * @wordpress-plugin
 * Plugin Name:       CITS My Account Customize for WooCommerce
 * Plugin URI:        https://coderitsolution.com/
 * Description:       Customize your WooCommerce 'My Account' page! Easily adjust menu positions and pick from simple, modern, or dark designs. Quick, effective customization at your fingertips.
 * Version:           1.1.1
 * Author:            Coder IT Solution
 * Author URI:        https://coderitsolution.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cits
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}
 
define( 'CITS_CUSTOMIZE_WOOCOMMERCE_MY_ACCOUNT_VERSION', '1.1.1' );
define( 'CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

// Custom function
function cits_custom_woo_my_account_table_func($dataName){
  if ( ! defined( 'ABSPATH' ) ) exit;
  global $wpdb;
  $tableName    = $wpdb->prefix.'cits_custom_woo_my_account';
  $all_data     = $wpdb->get_results($wpdb->prepare("SELECT * FROM $tableName WHERE id = %d", 1), ARRAY_A);
  $single_data = $all_data[0];
  return $single_data[$dataName];
};
 
function cits_customize_woocommerce_my_account_page_activate() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cits-customize-woocommerce-my-account-page-activator.php';
	// Cits_Customize_Woocommerce_My_Account_Page_Activator::activate();
	$activator = new Cits_Customize_Woocommerce_My_Account_Page_Activator;
    $activator->activate();
}
 
function cits_my_account_customize_action_links( $actions, $plugin_file ) { 
    $settings_link = '<a href="' . esc_url( get_admin_url(null, 'admin.php?page=cits_woocommerce_options') ) . '">Settings</a>';
 
    if ( array_key_exists( 'deactivate', $actions ) ) {
        $deactivate_link = $actions['deactivate'];
        unset($actions['deactivate']);
        $actions = array_merge( ['settings' => $settings_link], $actions );
        $actions['deactivate'] = $deactivate_link;
    } else { 
        $actions = array_merge( ['settings' => $settings_link], $actions );
    }
    
    return $actions;
}

// Replace 'my-account-customize' with your plugin's base file name.
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'cits_my_account_customize_action_links', 10, 2 );

// Custom Dashboard Design
function cits_custom_woo_dashboard( $template, $template_name, $template_path ) {
    $selectDesign = cits_custom_woo_my_account_table_func("select_design");
    if ($selectDesign === 'default') {
        if ( 'myaccount/dashboard.php' == $template_name ) {
            $template = CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_PATH . 'templates/dashboard.php';
        }
        return $template;
    };
    if ($selectDesign === 'dark_design' OR $selectDesign === 'simple_design') {
        if ( 'myaccount/dashboard.php' == $template_name ) {
            $template = CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_PATH . 'templates/dashboard-simple.php';
        }
        return $template;
    }

    if ($selectDesign === 'modern_desgin') {
        if ( 'myaccount/dashboard.php' == $template_name ) {
            $template = CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_PATH . 'templates/dashboard-modern.php';
        }
        return $template;
    };

}
add_filter( 'woocommerce_locate_template', 'cits_custom_woo_dashboard', 20, 3 );

function cits_customize_woocommerce_my_account_page_deactivate() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-cits-customize-woocommerce-my-account-page-activator.php';
    $activator = new Cits_Customize_Woocommerce_My_Account_Page_Activator;

    require_once plugin_dir_path( __FILE__ ) . 'includes/class-cits-customize-woocommerce-my-account-page-deactivator.php';
    $deactivator = new Cits_Customize_Woocommerce_My_Account_Page_Deactivator($activator);
    $deactivator->deactivate();
}

register_activation_hook( __FILE__, 'cits_customize_woocommerce_my_account_page_activate' );
register_deactivation_hook( __FILE__, 'cits_customize_woocommerce_my_account_page_deactivate' );

require plugin_dir_path( __FILE__ ) . 'includes/class-cits-customize-woocommerce-my-account-page.php';

function cits_customize_woocommerce_my_account_page_run() {

	$plugin = new Cits_Customize_Woocommerce_My_Account_Page();
	$plugin->run();

}
cits_customize_woocommerce_my_account_page_run();
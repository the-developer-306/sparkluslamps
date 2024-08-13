<?php
/*
    Plugin Name: Customize My Account for WooCommerce
    Plugin URI: https://sysbasics.com
    Description: Customize My account page. Add/Edit/Remove Endpoints.
    Version: 2.3.4
    Author: SysBasics
    Author URI: https://sysbasics.com
    Domain Path: /languages
    Requires at least: 3.3
    Tested up to: 6.5.4
    WC requires at least: 3.0.0
    WC tested up to: 8.9.3
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


if( !defined( 'wcmamtx_PLUGIN_URL' ) )
    define( 'wcmamtx_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

if( !defined( 'wcmamtx_plugin_slug' ) )
    define( 'wcmamtx_plugin_slug', 'customize-my-account-for-woocommerce' );


if( !defined( 'wcmamtx_PLUGIN_name' ) )
    define( 'wcmamtx_PLUGIN_name', esc_html__( 'Customize My Account' ,'customize-my-account-for-woocommerce') );

if( !defined( 'wcmamtx_update_doc_url' ) )
    define( 'wcmamtx_update_doc_url', 'https://www.sysbasics.com/knowledge-base/category/woocommerce-customize-my-account-pro/' );

if( !defined( 'wcmamtx_doc_url' ) )
    define( 'wcmamtx_doc_url', 'https://www.sysbasics.com/knowledge-base/category/woocommerce-customize-my-account-pro/' );

if( !defined( 'pro_url' ) )
    define( 'pro_url', 'https://sysbasics.com/go/customize/' );

$mt_type = 'specific';

add_action( 'before_woocommerce_init', function() {
    if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
    }
} );

load_plugin_textdomain( 'customize-my-account-for-woocommerce', false, basename( dirname(__FILE__) ).'/languages' );


/**
 * Check if elementor or elementor pro is active
 */


    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    
    if ( is_plugin_active( 'elementor/elementor.php' ) || is_plugin_active( 'elementor-pro/elementor-pro.php' )) {
        define( 'wcmamtx_elementor_mode', 'on' );
    } else {
        define( 'wcmamtx_elementor_mode', 'off' );
    }

    if ( is_plugin_active( 'wpml-sticky-links/plugin.php' )) {
        define( 'wcmamtx_wpmlsticky_mode', 'on' );
    } else {
        define( 'wcmamtx_wpmlsticky_mode', 'off' );
    }

    
    if ( is_plugin_active( 'phppoet-checkout-fields/phppoet-checkout-fields.php' ) ) {
        define( 'sysbasics_checkout_mode', 'on' );
    } else {
        define( 'sysbasics_checkout_mode', 'off' );
    }



   /**
    * check weather woocommerce is active or not
    */

   if (is_plugin_active( 'woocommerce/woocommerce.php' ) ) {


      //include the classes
    include dirname( __FILE__ ) . '/include/admin/admin_settings.php';
    include dirname( __FILE__ ) . '/include/frontend/frontend_functions.php';
    include dirname( __FILE__ ) . '/include/wcmamtx_extra_functions.php';



    if  (wcmamtx_elementor_mode == "on") {
       include dirname( __FILE__ ) . '/elementor-addon/elementor-addon.php';
   }



   if (!function_exists('wcmamtx_placeholder_img_src')) {
     function wcmamtx_placeholder_img_src() {
        return ''.wcmamtx_PLUGIN_URL.'assets/images/placeholder.png';
    }

}


} else {

    /**
     * Display Notice if woocommerce is not installed
     */

    function wcmamtx__installation_notice_woocommerce() {
        echo '<div class="updated" style="padding:15px; position:relative;"><a href="http://wordpress.org/plugins/woocommerce/">'.esc_html__('WooCommerce','customize-my-account-for-woocommerce').'</a> '.esc_html__('must be activated before activating Customize My Account For WooCommerce ','customize-my-account-for-woocommerce').' </div>';
    }

    add_action('admin_notices', 'wcmamtx__installation_notice_woocommerce');

    return;

}






register_activation_hook(__FILE__, 'wcmamtx_plugin_activation_hook');

add_action('admin_init', 'wcmamtx_admin_plugin_redirect');

/**
 * Get account menu item classes.
 *
 * @since 1.0.0
 */

if (!function_exists('wcmamtx_plugin_activation_hook')) {

    function wcmamtx_plugin_activation_hook() {

        // Don't forget to exit() because wp_redirect doesn't exit automatically
        add_option('wcmamtx_do_activation_redirect', true);




    }

}


/**
 * Get account menu item classes.
 *
 * @since 1.0.0
 */

if (!function_exists('wcmamtx_admin_plugin_redirect')) {

    function wcmamtx_admin_plugin_redirect() {

        $wcmamtx_act_date_free = get_option('wcmamtx_act_date_free');

        $date_today = date("Ymd");

        if (!isset($wcmamtx_act_date_free) || ($wcmamtx_act_date_free == "")) {
            update_option('wcmamtx_act_date_free',$date_today);
        }

        if (get_option('wcmamtx_do_activation_redirect', false)) {
            delete_option('wcmamtx_do_activation_redirect');
            wp_redirect("admin.php?page=wcmamtx_advanced_settings");
            //wp_redirect() does not exit automatically and should almost always be followed by exit.
            exit;
        }

    }

}






$wcmamtx_endpoint_allowed_to_add = get_option('wcmamtx_endpoint_allowed_to_add');
$wcmamtx_groups_allowed_to_add = get_option('wcmamtx_groups_allowed_to_add');


if (!isset($wcmamtx_endpoint_allowed_to_add) || ($wcmamtx_endpoint_allowed_to_add == "")) {
    update_option('wcmamtx_endpoint_allowed_to_add',02);
}

if (!isset($wcmamtx_groups_allowed_to_add) || ($wcmamtx_groups_allowed_to_add == "")) {
    update_option('wcmamtx_groups_allowed_to_add',02);
}

/**
 * Get woocommerce version 
 */

if (!function_exists('wcmamtx_get_woo_version_number')) {

    function wcmamtx_get_woo_version_number() {
       
       if ( ! function_exists( 'get_plugins' ) )
         require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    
       
       $plugin_folder = get_plugins( '/' . 'woocommerce' );
       $plugin_file = 'woocommerce.php';
    
    
       if ( isset( $plugin_folder[$plugin_file]['Version'] ) ) {
          return $plugin_folder[$plugin_file]['Version'];

       } else {
    
        return NULL;
       }
    }
}


if (!function_exists('wcmamtx_plugin_add_settings_link')) {

    function wcmamtx_plugin_add_settings_link( $links ) {

        $mt_type = wcmamtx_get_version_type();

        $settings_link1 = '<a href="' . admin_url( '/admin.php?page=wcmamtx_advanced_settings' ) . '">' . esc_html__( 'Settings','customize-my-account-for-woocommerce' ) . '</a>';

        array_push( $links, $settings_link1 );


            $settings_link2 = '<a href="'.pro_url.'" style="color:green; font-weight:bold;">' . esc_html__( 'Upgrade to premium version','customize-my-account-for-woocommerce' ) . '</a>';
            array_push( $links, $settings_link2 );
        

        
        return $links;
    }
}

$plugin = plugin_basename( __FILE__ );

add_filter( "plugin_action_links_$plugin", 'wcmamtx_plugin_add_settings_link' );



if (!function_exists('wcmamtx_plugin_row_meta')) {
    function wcmamtx_plugin_row_meta( $links, $file ) {    
        if ( plugin_basename( __FILE__ ) == $file ) {
            $row_meta = array(
                'docs'    => '<a href="' . esc_url( wcmamtx_doc_url ) . '" target="_blank" aria-label="' . esc_attr__( 'Docs', 'customize-my-account-for-woocommerce' ) . '" style="color:green;">' . esc_html__( 'Docs', 'customize-my-account-for-woocommerce' ) . '</a>',
                'support'    => '<a href="' . esc_url( 'https://www.sysbasics.com/customize-my-account-free-plugin-support/' ) . '" target="_blank" aria-label="' . esc_attr__( 'Support', 'customize-my-account-for-woocommerce' ) . '" style="color:green;">' . esc_html__( 'Support', 'customize-my-account-for-woocommerce' ) . '</a>'
            );
            return array_merge( $links, $row_meta );
        }
        return (array) $links;
    }
}

require __DIR__ . '/Appsero/src/Client.php';

/**
 * Initialize the plugin tracker
 *
 * @return void
 */
function Appsero_init_tracker_customize_my_account_for_woocommerce() {

    if ( ! class_exists( 'wcmamtx_Appsero\Client' ) ) {
      require_once __DIR__ . '/Appsero/src/Client.php';
    }

    $client = new wcmamtx_Appsero\Client( '5a4e946c-7285-41e2-a115-d7b48482092c', 'Customize My Account for WooCommerce', __FILE__ );

    // Active insights
    $client->insights()->init();

}

Appsero_init_tracker_customize_my_account_for_woocommerce();

add_filter( 'plugin_row_meta', 'wcmamtx_plugin_row_meta', 10, 2 );


if( !defined( 'wcmamtx_version_type' ) )
    define( 'wcmamtx_version_type', $mt_type );


if (!function_exists('wcmamtx_plugin_path')) {

    function wcmamtx_plugin_path() {
  
       return untrailingslashit( plugin_dir_path( __FILE__ ) );
    }

}


if (!function_exists('wcmamtx_get_version_type')) {

    function wcmamtx_get_version_type() {
        $plugin_path = plugin_dir_path( __FILE__ );

        if ((strpos($plugin_path, 'pro') !== false) && ( wcmamtx_version_type == "specific")) { 
            $dt_type = 'specific';
        } else {
            $dt_type = 'all';
        }
    
        return $dt_type;
    }
}

$mt_type = wcmamtx_get_version_type();


/**
 * Get woocommerce version 
 */

if (!function_exists('wcmamtx_get_plugin_version_number')) {

    function wcmamtx_get_plugin_version_number() {
       
       if ( ! function_exists( 'get_plugins' ) )
         require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    
       
       $plugin_folder = get_plugins( '/' . ''.wcmamtx_plugin_slug.'' );
       $plugin_file = ''.wcmamtx_plugin_slug.'.php';
    
    
       if ( isset( $plugin_folder[$plugin_file]['Version'] ) ) {
          return $plugin_folder[$plugin_file]['Version'];

       } else {
    
        return NULL;
       }
    }
}


?>
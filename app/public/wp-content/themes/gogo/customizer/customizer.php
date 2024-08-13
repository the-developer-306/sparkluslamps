<?php 
/**
 * all customizer setting includeed
 *
 * @param  
 * @return mixed|string
 */
function gogo_customize_register( $wp_customize ){
/**
 * Register Sections & Panels
*/
require GOGO_THEME_DIR . 'customizer/register-panels-and-sections.php';
//site identity
require GOGO_THEME_DIR . 'customizer/site-identity-customizer.php';
//container option 
require GOGO_THEME_DIR . 'customizer/section/layout/container.php';
//header option 
require GOGO_THEME_DIR . 'customizer/section/layout/main-header.php';
require GOGO_THEME_DIR . 'customizer/section/layout/above-header.php';
require GOGO_THEME_DIR . 'customizer/section/layout/bottom-header.php';
require GOGO_THEME_DIR . 'customizer/section/layout/sticky-header.php';
require GOGO_THEME_DIR . 'customizer/section/layout/social-icon.php';
require GOGO_THEME_DIR . 'customizer/section/layout/search.php';
//sidebar option
require GOGO_THEME_DIR . 'customizer/section/layout/sidebar-setting.php';
//blog option
require GOGO_THEME_DIR . 'customizer/section/layout/blog-archive.php';
//blog single option
require GOGO_THEME_DIR . 'customizer/section/layout/blog-single.php';
//Scroll to top option
require GOGO_THEME_DIR . 'customizer/section/layout/scroll-to-top.php';
//footer option
require GOGO_THEME_DIR . 'customizer/section/layout/above-footer.php';
require GOGO_THEME_DIR . 'customizer/section/layout/widget-footer.php';
if (function_exists('gogopro_body_classes')) {
require GOGO_THEME_DIR . 'customizer/section/layout/bottom-footer.php';
}
//Button
require GOGO_THEME_DIR . 'customizer/section/layout/button.php';
//Loader
require GOGO_THEME_DIR . 'customizer/section/layout/loader.php';
//gloabal color and background
require GOGO_THEME_DIR . 'customizer/section/color/gloabal_color_background.php';
//****************/
//Typography
//****************/
require GOGO_THEME_DIR . 'customizer/customizer-font-selector/class/class-gogo-font-selector.php';
require GOGO_THEME_DIR . 'customizer/section/typography/base-typography.php';
//*********************/
//WooCommerce
//*********************/
require GOGO_THEME_DIR . 'inc/woocommerce/register-woocommerce-panels-and-sections.php';
// sale-badges
require GOGO_THEME_DIR . 'inc/woocommerce/customizer/section/layout/general-sale-badges.php';
// cart
require GOGO_THEME_DIR . 'inc/woocommerce/customizer/section/layout/cart.php';

// shop-page
require GOGO_THEME_DIR . 'inc/woocommerce/customizer/section/layout/shop-page.php';
// single-product-page
require GOGO_THEME_DIR . 'inc/woocommerce/customizer/section/layout/single-product.php';
//woo-layout
require GOGO_THEME_DIR . 'inc/woocommerce/customizer/section/layout/woo-layout.php';
}
add_action('customize_register','gogo_customize_register');
function gogo_is_json( $string ){
    return is_string( $string ) && is_array( json_decode( $string, true ) ) ? true : false;
}
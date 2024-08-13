<?php
/**
 * Register WooCommerce customizer panels & sections.
 *
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
//General Section
if ( ! class_exists( 'WooCommerce' ) ) {
    return;
}
$wp_customize->get_panel('woocommerce')->priority = 30;
$gogo_woo_general_section = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-woo-general-section', array(
    'title'    => __('General', 'gogo'),
        'panel'    => 'woocommerce',
        'priority' => 1,
));
$wp_customize->add_section($gogo_woo_general_section);
$gogo_woo_gen_sale = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-woo-gen-sale', array(
    'title'    => __( 'On Sale Badge', 'gogo' ),
     'panel'    => 'woocommerce',
		'section'  => 'gogo-woo-general-section',
		'priority' => 1,
));
$wp_customize->add_section( $gogo_woo_gen_sale );
$gogo_woo_cart = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-woo-cart', array(
    'title'    => __( 'Cart', 'gogo' ),
     'panel'    => 'woocommerce',
        'section'  => 'gogo-woo-general-section',
        'priority' => 2,
));
$wp_customize->add_section( $gogo_woo_cart );
$gogo_woo_shop = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-woo-shop', array(
    'title'    => __( 'Shop Page', 'gogo' ),
     'panel'    => 'woocommerce',
	 'priority' => 2,
));
$wp_customize->add_section( $gogo_woo_shop );
$gogo_woo_single_product = new Gogo_WP_Customize_Section( $wp_customize,'gogo_woo_single_product', array(
    'title'    => __( 'Single Product', 'gogo' ),
    'panel'    => 'woocommerce',
    'priority' => 3,
));
$wp_customize->add_section( $gogo_woo_single_product  );
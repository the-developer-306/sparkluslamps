<?php
/**
 * Cart for Gogo Theme.
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
if ( ! class_exists( 'WooCommerce' ) ){
    return;
}
//cart visibility
$wp_customize->add_setting('gogo_woo_cart_visibility', array(
        'default'        => 'display-all',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_woo_cart_visibility', array(
        'settings'   => 'gogo_woo_cart_visibility',
        'label'      => __('Visibility','gogo'),
        'section'    => 'gogo-woo-cart',
        'type'       => 'select',
        'choices'    => array(
        'display-all'     => __('Display on all devices','gogo'),
        'disable-mobile'  => __('Disable in mobile','gogo'),
        'disable-all'     => __('Disable in all device','gogo'),
        ),
    ));
/**************/
//Cart display
/**************/
$wp_customize->add_setting('gogo_woo_cart_disable', array(
        'default'           => 'icon',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_woo_cart_disable', array(
        'settings'   => 'gogo_woo_cart_disable',
        'label'      => __('Visibility','gogo'),
        'section'    => 'gogo-woo-cart',
        'type'       => 'select',
        'choices'    => array(
        'icon'                     => __('Icon','gogo'),
        'icon+total'                => __('Icon & Total','gogo'),
        'icon+cartcount'           => __('Icon & Cart Count','gogo'),
        'icon+cartcount+total'     => __('Icon & Cart Count & Total','gogo'),
        ),
    ));
// color scheme
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_woo_cart_color_scheme', array(
                'default'           => 'woo-cart-default',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_woo_cart_color_scheme', array(
                    'label'    => esc_html__( 'Choose Dropdown Color Scheme', 'gogo' ),
                    'section'  => 'gogo-woo-cart',
                    'choices'  => array(
                       'woo-cart-default' => array(
                            'url'    => GOGO_COLOR_SCHM_DEF,
                        ),
                        'woo-cart-dark'   => array(
                            'url'    => GOGO_COLOR_SCHM_DRK,
                        ),
                    ),
                )
            )
        );
    }
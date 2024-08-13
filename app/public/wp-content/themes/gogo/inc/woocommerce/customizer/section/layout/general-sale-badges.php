<?php
/**
 * General Sale Badges for Gogo Theme.
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
//choose sale badges style
if ( ! class_exists( 'WooCommerce' ) ) {
    return;
}
$wp_customize->add_setting('gogo_sale_bagde_style', array(
        'default'        => 'circle',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_sale_bagde_style', array(
        'settings' => 'gogo_sale_bagde_style',
        'label'   => __('On Sale Badge Style','gogo'),
        'section' => 'gogo-woo-gen-sale',
        'type'    => 'select',
        'choices'    => array(
        'circle'            => __('Circle','gogo'),
        'square'            => __('Square','gogo'),
        'diamond'           => __('Diamond','gogo'),         
        ),
    ));

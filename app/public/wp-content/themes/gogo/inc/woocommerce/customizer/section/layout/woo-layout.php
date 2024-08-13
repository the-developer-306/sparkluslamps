<?php
/**
 * Woocommerce Page Layout for Gogo Theme.
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
if ( ! class_exists( 'WooCommerce' ) ) {
    return;
}
//container for woocommerce pages
$wp_customize->add_setting('gogo_containerwoopage', array(
        'default'           => 'default',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_containerwoopage', array(
        'settings' => 'gogo_containerwoopage',
        'label'    => __('Container For Woocommerce Page','gogo'),
        'section'  => 'gogo-conatiner',
        'type'     => 'select',
        'choices'  => array(
        'default'                => __('Default','gogo'),
        'boxed'                  => __('Boxed','gogo'),
        'contentbox'             => __('Content Boxed','gogo'),
        'fullwidthcontained'     => __('Full Width/Contained','gogo'),
        'fullwidthstrechched'    => __('Full Width/Stretched','gogo'), 
        ),
    ));
/********************/
// Woo page layout
/********************/
$wp_customize->add_setting('gogo_sidebar_woo_layout', array(
        'default'        => 'default',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
        'priority'   => 0,

    ));
$wp_customize->add_control( 'gogo_sidebar_woo_layout', array(
        'settings' => 'gogo_sidebar_woo_layout',
        'label'    => __('Woocommerce','gogo'),
        'section'  => 'gogo-section-sidebar-group',
        'type'     => 'select',
        'choices'      => array(
        'default'      => __('Default','gogo'),
        'no-sidebar'   => __('No Sidebar','gogo'),
        'left'         => __('Left Sidebar','gogo'),
        'right'        => __('Right Sidebar','gogo'),    
        ),
));
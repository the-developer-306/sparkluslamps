<?php
/**
 * Gloabal Color and Background Options for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since   Gogo 1.0.0
 */
/******************/
//Global Option
/******************/
// theme color
 $wp_customize->add_setting('gogo_theme_clr', array(
        'default'        => '#1ce225',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new WP_Customize_Color_Control($wp_customize,'gogo_theme_clr', array(
        'label'      => __('Theme Color', 'gogo' ),
        'section'    => 'gogo-gloabal-color',
        'settings'   => 'gogo_theme_clr',
        'priority' => 1,
    ) ) 
 );  
// link color
 $wp_customize->add_setting('gogo_link_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new WP_Customize_Color_Control($wp_customize,'gogo_link_clr', array(
        'label'      => __('Link Color', 'gogo' ),
        'section'    => 'gogo-gloabal-color',
        'settings'   => 'gogo_link_clr',
        'priority' => 2,
    ) ) 
 );  
// link color
 $wp_customize->add_setting('gogo_link_hvr_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new WP_Customize_Color_Control($wp_customize,'gogo_link_hvr_clr', array(
        'label'      => __('Link Hover Color', 'gogo' ),
        'section'    => 'gogo-gloabal-color',
        'settings'   => 'gogo_link_hvr_clr',
        'priority' => 3,
    ) ) 
 );  
// text color
 $wp_customize->add_setting('gogo_text_clr', array(
        'default'        => '#808285',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new WP_Customize_Color_Control($wp_customize,'gogo_text_clr', array(
        'label'      => __('Text Color', 'gogo' ),
        'section'    => 'gogo-gloabal-color',
        'settings'   => 'gogo_text_clr',
        'priority' => 4,
    ) ) 
 );
 // title color
 $wp_customize->add_setting('gogo_title_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new WP_Customize_Color_Control($wp_customize,'gogo_title_clr', array(
        'label'      => __('Title Color', 'gogo' ),
        'section'    => 'gogo-gloabal-color',
        'settings'   => 'gogo_title_clr',
        'priority' => 4,
    ) ) 
 );    
// gloabal background option
$wp_customize->get_control( 'background_color' )->section = 'gogo-gloabal-color';
$wp_customize->get_control( 'background_color' )->priority = 6;
$wp_customize->get_control( 'background_image' )->section = 'gogo-gloabal-color';
$wp_customize->get_control( 'background_image' )->priority = 7;
$wp_customize->get_control( 'background_preset' )->section = 'gogo-gloabal-color';
$wp_customize->get_control( 'background_preset' )->priority = 8;
$wp_customize->get_control( 'background_position' )->section = 'gogo-gloabal-color';
$wp_customize->get_control( 'background_position' )->priority = 8;
$wp_customize->get_control( 'background_repeat' )->section = 'gogo-gloabal-color';
$wp_customize->get_control( 'background_repeat' )->priority = 9;
$wp_customize->get_control( 'background_attachment' )->section = 'gogo-gloabal-color';
$wp_customize->get_control( 'background_attachment' )->priority = 10;
$wp_customize->get_control( 'background_size' )->section = 'gogo-gloabal-color';
$wp_customize->get_control( 'background_size' )->priority = 11;
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_gbl_clr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_gbl_clr_doc_learn_more',
            array(
        'section'     => 'gogo-gloabal-color',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#color-background')),
         'priority'   =>50,
)));
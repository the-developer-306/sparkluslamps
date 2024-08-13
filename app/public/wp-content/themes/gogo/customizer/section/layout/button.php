<?php
/**
 * Site Button for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
// Button Text Color
$wp_customize->add_setting('gogo_button_txt_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new WP_Customize_Color_Control($wp_customize,'gogo_button_txt_clr', array(
        'label'      => __('Button Text Color', 'gogo' ),
        'section'    => 'gogo-site-button',
        'settings'   => 'gogo_button_txt_clr',
        'priority' => 1,
    ) ) 
 );  

// Button BG color
 $wp_customize->add_setting('gogo_button_bg_clr', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_button_bg_clr', array(
        'label'      => __('Button Background Color', 'gogo' ),
        'section'    => 'gogo-site-button',
        'settings'   => 'gogo_button_bg_clr',
        'priority'   => 2,
    ) ) 
 ); 
// Button Text Hover Color
$wp_customize->add_setting('gogo_button_txt_hvr_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new WP_Customize_Color_Control($wp_customize,'gogo_button_txt_hvr_clr', array(
        'label'      => __('Button Text Hover Color', 'gogo' ),
        'section'    => 'gogo-site-button',
        'settings'   => 'gogo_button_txt_hvr_clr',
        'priority'   =>3,
    ) ) 
 ); 
 // Button BG hover color
 $wp_customize->add_setting('gogo_button_bg_hvr_clr', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_button_bg_hvr_clr', array(
        'label'      => __('Button Background Hover Color', 'gogo' ),
        'section'    => 'gogo-site-button',
        'settings'   => 'gogo_button_bg_hvr_clr',
        'priority'   => 4,
    ) ) 
 );
/**********************/  
// Button border radius
/**********************/ 
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_button_border_radius', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '30',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_button_border_radius', array(
                    'label'       => esc_html__( 'Button Border Radius', 'gogo' ),
                    'section'     => 'gogo-site-button',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                )
        )
    );
}
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_site_btn_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_site_btn_doc_learn_more',
            array(
        'section'     => 'gogo-site-button',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#site-button')),
         'priority'   =>50,
)));
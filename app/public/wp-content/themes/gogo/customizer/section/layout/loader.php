<?php
/**
 * Site Loader for  Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
//Enable Loader
$wp_customize->add_setting( 'gogo_preloader_enable', array(
                'default'               => false,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_preloader_enable', array(
                'label'                 => esc_html__('Enable Loader', 'gogo'),
                'type'                  => 'checkbox',
                'section'               => 'gogo-pre-loader',
                'settings'              => 'gogo_preloader_enable',
                'priority'   => 1,
            ) ) );
// BG color
 $wp_customize->add_setting('gogo_loader_bg_clr', array(
        'default'           => '#f5f5f5',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_loader_bg_clr', array(
        'label'      => __('Background Color', 'gogo' ),
        'section'    => 'gogo-pre-loader',
        'settings'   => 'gogo_loader_bg_clr',
        'priority'   => 2,
    ) ) 
 ); 
/*******************/ 
// Pre loader Image
/*******************/ 
$wp_customize->add_setting('gogo_preloader_image_upload', array(
        'default'       => GOGO_LOADER,
        'capability'    => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
    ));
$wp_customize->add_control( new WP_Customize_Image_Control($wp_customize, 'gogo_preloader_image_upload', array(
        'label'          => __('Pre Loader Image', 'gogo'),
        'description'    => __('(You can also use GIF image.)', 'gogo'),
        'section'        => 'gogo-pre-loader',
        'settings'       => 'gogo_preloader_image_upload',
 )));
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_loader_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_loader_doc_learn_more',
            array(
        'section'     => 'gogo-pre-loader',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#pre-loader')),
         'priority'   =>50,
)));
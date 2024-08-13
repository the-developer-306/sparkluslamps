<?php
/**
 * Transparent Header for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/************************/
//Header Transparent
/************************/
$wp_customize->add_setting( 'gogo_header_transparent', array(
                'default'               => true,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_header_transparent', array(
                'label'                 => esc_html__('Enable Front Page Header Transparent
', 'gogo'),
                'type'                  => 'checkbox',
                'section'               => 'gogo-transparent-header',
                'settings'              => 'gogo_header_transparent',
            ) ) );
// force disable on special page 
$wp_customize->add_setting( 'gogo_header_transparent_internal', array(
                'default'               => false,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_header_transparent_internal', array(
                'label'                 => esc_html__('Enable Internal Pages Header Transparent', 'gogo'),
                'description'           => esc_html__('(except blog, blog-single, archive, 404, search, product page etc.)', 'gogo'),
                'type'                  => 'checkbox',
                'section'               => 'gogo-transparent-header',
                'settings'              => 'gogo_header_transparent_internal',
            ) ) );

/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_stcky_hdr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_stcky_hdr_doc_learn_more',
            array(
        'section'     => 'gogo-sticky-header',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#sticky-header')),
         'priority'   =>50,
)));

/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_trndprnt_hdr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_trndprnt_hdr_doc_learn_more',
            array(
        'section'     => 'gogo-transparent-header',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#transparent-header')),
         'priority'   =>50,
)));
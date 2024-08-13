<?php
/**
 *Scroll to top option
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/***********************/
//DISABLE SCROLL TO TOP
/***********************/
    $wp_customize->add_setting( 'gogo_scroll_to_top_disable', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_scroll_to_top_disable', array(
                'label'       => esc_html__('Disable Scroll To Top', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-scroll-to-top-section',
                'settings'    => 'gogo_scroll_to_top_disable',
            ) ) );
/********************/
// position left/right
/********************/
$wp_customize->add_setting('gogo_scroll_to_top_option', array(
                'default'               => 'right',
                'sanitize_callback'     => 'gogo_sanitize_select',
            ) );
$wp_customize->add_control( new Gogo_Customizer_Buttonset_Control( $wp_customize,'gogo_scroll_to_top_option', array(
                'label'                 => esc_html__( 'Position', 'gogo' ),
                'section'               => 'gogo-scroll-to-top-section',
                'settings'              => 'gogo_scroll_to_top_option',
                'choices'               => array(
                    'left'   => esc_html__( 'Left', 'gogo' ),
                    'right'  => esc_html__( 'Right', 'gogo' ),
             ),
) ) );

// color option
// icon-color
 $wp_customize->add_setting('gogo_scroll_to_top_icon_clr', array(
        'default'        => '#fff',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_scroll_to_top_icon_clr', array(
        'label'      => __('Icon Color', 'gogo' ),
        'section'    => 'gogo-scroll-to-top-section',
        'settings'   => 'gogo_scroll_to_top_icon_clr',
    ) ) 
 ); 
 // icon-bg-color
 $wp_customize->add_setting('gogo_scroll_to_top_icon_bg_clr', array(
        'default'        => '#1ce225',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_scroll_to_top_icon_bg_clr', array(
        'label'      => __('Icon Background Color', 'gogo' ),
        'section'    => 'gogo-scroll-to-top-section',
        'settings'   => 'gogo_scroll_to_top_icon_bg_clr',
    ) ) 
 );  
//icon background radius
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_scroll_to_top_icon_radius', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '2',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_scroll_to_top_icon_radius', array(
                    'label'       => esc_html__( 'Icon Radius', 'gogo' ),
                    'section'     => 'gogo-scroll-to-top-section',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 1,
                        'max'  => 100,
                        'step' => 1,
                    ),
                )
        )
);
}
// icon-hvr-color
 $wp_customize->add_setting('gogo_scroll_to_top_icon_hvr_clr', array(
        'default'        => '#fff',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_scroll_to_top_icon_hvr_clr', array(
        'label'      => __('Icon Hover Color', 'gogo' ),
        'section'    => 'gogo-scroll-to-top-section',
        'settings'   => 'gogo_scroll_to_top_icon_hvr_clr',
    ) ) 
 );  
// icon-bghvr-color
 $wp_customize->add_setting('gogo_scroll_to_top_icon_bghvr_clr', array(
        'default'        => '#1ce225',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_scroll_to_top_icon_bghvr_clr', array(
        'label'      => __('Icon Background Hover Color', 'gogo' ),
        'section'    => 'gogo-scroll-to-top-section',
        'settings'   => 'gogo_scroll_to_top_icon_bghvr_clr',
    ) ) 
 );  

/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_scrltop_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_scrltop_doc_learn_more',
            array(
        'section'     => 'gogo-scroll-to-top-section',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#scrolltotop-setting')),
         'priority'   =>50,
)));
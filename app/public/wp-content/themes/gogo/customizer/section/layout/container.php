<?php
/**
 * Container Options for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
// Container Width
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_conatiner_width', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1280',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_conatiner_width', array(
                    'label'       => esc_html__( 'Container Width', 'gogo' ),
                    'section'     => 'gogo-conatiner',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 768,
                        'max'  => 1920,
                        'step' => 1,
                    ),
                )
        )
);
}
// default container
$wp_customize->add_setting('gogo_default_container', array(
        'default'           => 'boxed',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_default_container', array(
        'settings' => 'gogo_default_container',
        'label'    => __('Default Container','gogo'),
        'section'  => 'gogo-conatiner',
        'type'     => 'select',
        'choices'  => array(
        'boxed'                  => __('Boxed','gogo'),
        'contentbox'             => __('Content Boxed','gogo'),
        'fullwidthcontained'     => __('Full Width/Contained','gogo'),
        'fullwidthstrechched'    => __('Full Width/Stretched','gogo'), 
        ),
    ));
// site-layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_container_site_layout', array(
                'default'           => 'fullwidth',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_container_site_layout', array(
                    'label'    => esc_html__( 'Layout', 'gogo' ),
                    'section'  => 'gogo-conatiner',
                    'choices'  => array(
                       'fullwidth'   => array(
                            'url' => GOGO_CONTENT_LAYOUT_1,
                        ),
                        'maxwidth'   => array(
                            'url' => GOGO_CONTENT_LAYOUT_2,
                        ),
                    ),
                    'priority'   =>1,
                )
            )
        );
    } 
// Container maxWidth
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_conatiner_maxwidth', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1200',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_conatiner_maxwidth', array(
                    'label'       => esc_html__( 'Max Width', 'gogo' ),
                    'section'     => 'gogo-conatiner',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 768,
                        'max'  => 1920,
                        'step' => 1,
                    ),
                    'priority'   =>2,
                )
        )
);
$wp_customize->add_setting(
            'gogo_conatiner_top_bottom_margin', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '0',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_conatiner_top_bottom_margin', array(
                    'label'       => esc_html__( 'Top/Bottom Margin', 'gogo' ),
                    'section'     => 'gogo-conatiner',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 600,
                        'step' => 1,
                    ),
                    'priority'   =>2,
                )
        )
);
}
//container for pages
$wp_customize->add_setting('gogo_containerpage', array(
        'default'           => 'default',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_containerpage', array(
        'settings' => 'gogo_containerpage',
        'label'    => __('Container For Page','gogo'),
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
//Container for Blog Archives
$wp_customize->add_setting('gogo_containerarchive', array(
        'default'           => 'default',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_containerarchive', array(
        'settings' => 'gogo_containerarchive',
        'label'    => __('Container For Blog / Archives','gogo'),
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
//container for blog single pages
$wp_customize->add_setting('gogo_containerblogpage', array(
        'default'           => 'default',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_containerblogpage', array(
        'settings' => 'gogo_containerblogpage',
        'label'    => __('Container For Blog Single','gogo'),
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
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_container_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_container_doc_learn_more',
            array(
        'section'     => 'gogo-conatiner',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#container-setting')),
         'priority'   =>50,
)));
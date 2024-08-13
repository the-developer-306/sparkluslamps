<?php
/**
 * Footer Options for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/******************/
//Widegt footer
/******************/
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
               $wp_customize->add_setting(
               'gogo_bottom_footer_widget_layout', array(
               'default'           => 'ft-wgt-none',
               'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_bottom_footer_widget_layout', array(
                    'label'    => esc_html__( 'Bottom Footer Layout','gogo'),
                    'section'  => 'gogo-widget-footer',
                    'choices'  => array(
                       'ft-wgt-none'   => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_NONE,
                        ),
                        'ft-wgt-one'   => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_1,
                        ),
                        'ft-wgt-two' => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_2,
                        ),
                        'ft-wgt-three' => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_3,
                        ),
                        'ft-wgt-four' => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_4,
                        ),
                        'ft-wgt-five' => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_5,
                        ),
                        'ft-wgt-six' => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_6,
                        ),
                        'ft-wgt-seven' => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_7,
                        ),
                        'ft-wgt-eight' => array(
                            'url' => GOGO_FOOTER_WIDGET_LAYOUT_8,
                        ),
                    ),
                )
            )
        );
    } 
/******************************/
/* Widget Redirect
/****************************/
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_bottom_footer_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_bottom_footer_widget_redirect', array(
                    'section'      => 'gogo-widget-footer',
                    'button_text'  => esc_html__( 'Go To Widget', 'gogo' ),
                    'button_class' => 'focus-customizer-widget-redirect',  
                )
            )
        );
} 
/************/
//CONTENT WIDTH
/************/ 
$wp_customize->add_setting('gogo_footer_widget_content_width', array(
        'default'        => 'content-width',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_footer_widget_content_width', array(
        'settings' => 'gogo_footer_widget_content_width',
        'label'    => __('Widget Width','gogo'),
        'section'  => 'gogo-widget-footer',
        'type'     => 'select',
        'choices'  => array(
        'content-width'             => __('Content Width','gogo'),
        'full-width'             => __('Full Width','gogo'),  
    ),
));

//choose color layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_bottom_footer_widget_color_scheme', array(
                'default'           => 'ft-wgt-default',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_bottom_footer_widget_color_scheme', array(
                    'label'    => esc_html__( 'Choose Color Scheme', 'gogo' ),
                    'section'  => 'gogo-widget-footer',
                    'choices'  => array(
                       'ft-wgt-default' => array(
                            'url'    => GOGO_COLOR_SCHM_DEF,
                        ),
                        'ft-wgt-dark'   => array(
                            'url'    => GOGO_COLOR_SCHM_DRK,
                        ),
                    ),
                )
            )
        );
    }

/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_wgdt_ftr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_wgdt_ftr_doc_learn_more',
            array(
        'section'     => 'gogo-widget-footer',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#footer-widget')),
         'priority'   =>50,
)));
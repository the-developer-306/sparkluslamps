<?php
/**
 * Footer Options for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/******************/
//Bootm footer
/******************/
//choose col layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
               $wp_customize->add_setting(
               'gogo_bottom_footer_layout', array(
                'default'           => 'ft-btm-one',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_bottom_footer_layout', array(
                    'label'    => esc_html__('Layout','gogo'),
                    'section'  => 'gogo-bottom-footer',
                    'choices'  => array(
                       'ft-btm-none'   => array(
                            'url'      => GOGO_TOP_HEADER_LAYOUT_NONE,
                        ),
                        'ft-btm-one'   => array(
                            'url' => GOGO_FOOTER_ABOVE_LAYOUT_1,
                        ),
                        'ft-btm-two' => array(
                            'url' => GOGO_FOOTER_ABOVE_LAYOUT_2,
                        ),
                        'ft-btm-three' => array(
                            'url' => GOGO_FOOTER_ABOVE_LAYOUT_3,
                        ),
                    ),
                )
            )
        );
    } 
//********************************/
// col1-setting
//*******************************/
$wp_customize->add_setting('gogo_bottom_footer_col1_set', array(
        'default'        => 'text',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_bottom_footer_col1_set', array(
        'settings' => 'gogo_bottom_footer_col1_set',
        'label'    => __('Column 1','gogo'),
        'section'  => 'gogo-bottom-footer',
        'type'     => 'select',
        'choices'  => array(
        'none'             => __('None','gogo'),
        'text'             => __('Text','gogo'),
        'menu'             => __('Menu','gogo'),
        'search'           => __('Search','gogo'),
        'widget'           => __('Widget','gogo'),
        'social'           => __('Social Media','gogo'),   
    ),
));
//col1-text/html
$wp_customize->add_setting('gogo_footer_bottom_col1_texthtml', array(
        'default'           => __('Copyright | Gogo | Powered by Gogo','gogo'),
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_textarea',
        'transport'         => 'postMessage',
        
    ));
$wp_customize->add_control('gogo_footer_bottom_col1_texthtml', array(
        'label'    => __('Text', 'gogo'),
        'section'  => 'gogo-bottom-footer',
        'settings' => 'gogo_footer_bottom_col1_texthtml',
         'type'    => 'textarea',
    ));
// col1 widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_footer_bottom_col1_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize,'gogo_footer_bottom_col1_widget_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__('Go To Widget','gogo'),
                    'button_class' => 'focus-customizer-widget-redirect-col1',  
                )
            )
        );
} 
// col1 menu redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_footer_bottom_col1_menu_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize,'gogo_footer_bottom_col1_menu_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__('Go To Menu','gogo'),
                    'button_class' => 'focus-customizer-menu-redirect-col1',  
                )
            )
        );
} 
// col1 social media redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_footer_bottom_col1_social_media_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_footer_bottom_col1_social_media_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__( 'Go To Social Media', 'gogo' ),
                    'button_class' => 'focus-customizer-social_media-redirect-col1',  
                )
            )
        );
} 
/***************************************/
// col2
/***************************************/
$wp_customize->add_setting('gogo_bottom_footer_col2_set',array(
        'default'        => 'none',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_bottom_footer_col2_set',array(
        'settings' => 'gogo_bottom_footer_col2_set',
        'label'   => __('Column 2','gogo'),
        'section' => 'gogo-bottom-footer',
        'type'    => 'select',
        'choices'    => array(
        'none'             => __('None','gogo'),
        'text'             => __('Text','gogo'),
        'menu'             => __('Menu','gogo'),
        'search'           => __('Search','gogo'),
        'widget'           => __('Widget','gogo'),
        'social'           => __('Social Media','gogo'),     
        ),
    ));
// col2-text/html
$wp_customize->add_setting('gogo_bottom_footer_col2_texthtml', array(
        'default'           => __('Add your content here','gogo'),
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_textarea', 
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control('gogo_bottom_footer_col2_texthtml', array(
        'label'    => __('Text', 'gogo'),
        'section'  => 'gogo-bottom-footer',
        'settings' => 'gogo_bottom_footer_col2_texthtml',
         'type'    => 'textarea',
    ));
// col2 widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_bottom_footer_col2_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize,'gogo_bottom_footer_col2_widget_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__( 'Go To Widget', 'gogo' ),
                    'button_class' => 'focus-customizer-widget-redirect-col2',  
                )
            )
        );
}  
// col2 menu redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_bottom_footer_col2_menu_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize,'gogo_bottom_footer_col2_menu_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__( 'Go To Menu', 'gogo' ),
                    'button_class' => 'focus-customizer-menu-redirect-col2',  
                )
            )
        );
}    
// col2 social media redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_bottom_footer_col2_social_media_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_bottom_footer_col2_social_media_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__( 'Go To Social Media', 'gogo' ),
                    'button_class' => 'focus-customizer-social_media-redirect-col2',  
                )
            )
        );
} 
// col3
$wp_customize->add_setting('gogo_bottom_footer_col3_set', array(
        'default'        => 'none',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control('gogo_bottom_footer_col3_set', array(
        'settings' => 'gogo_bottom_footer_col3_set',
        'label'   => __('Column 3','gogo'),
        'section' => 'gogo-bottom-footer',
        'type'    => 'select',
        'choices' => array(
        'none'             => __('None','gogo'),
        'text'             => __('Text','gogo'),
        'menu'             => __('Menu','gogo'),
        'search'           => __('Search','gogo'),
        'widget'           => __('Widget','gogo'),
        'social'           => __('Social Media','gogo'),   
        ),
    ));
// col3-text/html
$wp_customize->add_setting('gogo_bottom_footer_col3_texthtml', array(
        'default'          => __('Add your content here','gogo'),
        'capability'       => 'edit_theme_options',
        'sanitize_callback'=> 'gogo_sanitize_textarea',  
        'transport'         => 'postMessage', 
    ));
$wp_customize->add_control('gogo_bottom_footer_col3_texthtml', array(
        'label'    => __('Text', 'gogo'),
        'section'  => 'gogo-bottom-footer',
        'settings' => 'gogo_bottom_footer_col3_texthtml',
        'type'     => 'textarea',
    ));
// col3 social media redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_bottom_footer_col3_social_media_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_bottom_footer_col3_social_media_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__( 'Go To Social Media', 'gogo' ),
                    'button_class' => 'focus-customizer-social_media-redirect-col3',  
                )
            )
        );
} 
// col3 widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_bottom_footer_col3_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize,'gogo_bottom_footer_col3_widget_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__( 'Go To Widget', 'gogo' ),
                    'button_class' => 'focus-customizer-widget-redirect-col3',  
                )
            )
        );
}
// col3 widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_bottom_footer_col3_menu_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize,'gogo_bottom_footer_col3_menu_redirect', array(
                    'section'      => 'gogo-bottom-footer',
                    'button_text'  => esc_html__( 'Go To Menu', 'gogo' ),
                    'button_class' => 'focus-customizer-menu-redirect-col3',  
                )
            )
        );
}
/****************************/
// common option
/****************************/
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_btm_ftr_hgt', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '40',
                 'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_btm_ftr_hgt', array(
                    'label'       => esc_html__( 'Height', 'gogo' ),
                    'section'     => 'gogo-bottom-footer',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 30,
                        'max'  => 1000,
                        'step' => 1,
                    ),
                )
           )
    );
}
// above bottom-border
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_btm_ftr_botm_brd', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_btm_ftr_botm_brd', array(
                    'label'       => esc_html__( 'Top Border', 'gogo' ),
                    'section'     => 'gogo-bottom-footer',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 200,
                        'step' => 1,
                    ),
                )
            )
        );
    }
// border-color
 $wp_customize->add_setting('gogo_bottom_frt_brdr_clr', array(
        'default'        => '#eee',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_bottom_frt_brdr_clr', array(
        'label'      => __('Border Color', 'gogo' ),
        'section'    => 'gogo-bottom-footer',
        'settings'   => 'gogo_bottom_frt_brdr_clr',
    ) ) 
 );  
//choose color layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_bottom_footer_color_scheme', array(
                'default'           => 'ft-btm-default',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_bottom_footer_color_scheme', array(
                    'label'    => esc_html__( 'Choose Color Scheme', 'gogo' ),
                    'section'  => 'gogo-bottom-footer',
                    'choices'  => array(
                        'ft-btm-default' => array(
                            'url'    => GOGO_COLOR_SCHM_DEF,
                        ),
                        'ft-btm-dark'=> array(
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
$wp_customize->add_setting('gogo_btm_ftr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_btm_ftr_doc_learn_more',
            array(
        'section'     => 'gogo-bottom-footer',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#below-footer')),
         'priority'   =>50,
)));
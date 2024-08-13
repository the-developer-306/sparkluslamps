<?php
/**
 * Header Options for Gogo Theme.
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
//above header
// choose col layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_above_header_layout', array(
                'default'           => 'abv-none',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_above_header_layout', array(
                    'label'    => esc_html__( 'Layout', 'gogo' ),
                    'section'  => 'gogo-above-header',
                    'choices'  => array(
                       'abv-none'   => array(
                            'url' => GOGO_TOP_HEADER_LAYOUT_NONE,
                        ),
                        'abv-one'   => array(
                            'url' => GOGO_TOP_HEADER_LAYOUT_1,
                        ),
                        'abv-two' => array(
                            'url' => GOGO_TOP_HEADER_LAYOUT_2,
                        ),
                        'abv-three' => array(
                            'url' => GOGO_TOP_HEADER_LAYOUT_3,
                        ),
                    ),
                )
            )
        );
    } 
// col1
$wp_customize->add_setting('gogo_above_header_col1_set', array(
        'default'        => 'text',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_above_header_col1_set', array(
        'settings' => 'gogo_above_header_col1_set',
        'label'    => __('Column 1','gogo'),
        'section'  => 'gogo-above-header',
        'type'     => 'select',
        'choices'  => array(
        'none'     => __('None','gogo'),
        'text'     => __('Text','gogo'),
        'menu'     => __('Menu','gogo'),
        'search'   => __('Search','gogo'),
        'widget'   => __('Widget','gogo'),
        'social'   => __('Social Media','gogo'),
            
        ),
    ));
// col1-text/html
$wp_customize->add_setting('gogo_col1_texthtml', array(
        'default'           => __('Add your content here','gogo'),
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_textarea',
        'transport'         => 'postMessage',
        
    ));
$wp_customize->add_control('gogo_col1_texthtml', array(
        'label'    => __('Text', 'gogo'),
        'section'  => 'gogo-above-header',
        'settings' => 'gogo_col1_texthtml',
         'type'    => 'textarea',
    ));
// col1 widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col1_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col1_widget_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Widget', 'gogo' ),
                    'button_class' => 'focus-customizer-widget-redirect-col1',  
                )
            )
        );
} 
// col1 menu redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col1_menu_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col1_menu_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Menu', 'gogo' ),
                    'button_class' => 'focus-customizer-menu-redirect-col1',  
                )
            )
        );
} 
// col1 social media redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col1_social_media_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col1_social_media_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Social Media', 'gogo' ),
                    'button_class' => 'focus-customizer-social_media-redirect-col1',  
                )
            )
        );
} 
// col2
$wp_customize->add_setting('gogo_above_header_col2_set', array(
        'default'        => 'none',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_above_header_col2_set', array(
        'settings' => 'gogo_above_header_col2_set',
        'label'   => __('Column 2','gogo'),
        'section' => 'gogo-above-header',
        'type'    => 'select',
        'choices'    => array(
        'none'       => __('None','gogo'),
        'text'       => __('Text','gogo'),
        'menu'       => __('Menu','gogo'),
        'search'     => __('Search','gogo'),
        'widget'     => __('Widget','gogo'),
        'social'     => __('Social Media','gogo'),
            
        ),
    ));
// col2-text/html
$wp_customize->add_setting('gogo_col2_texthtml', array(
        'default'           => __('Add your content here','gogo'),
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_textarea',
        'transport'         => 'postMessage',
        
    ));
$wp_customize->add_control('gogo_col2_texthtml', array(
        'label'    => __('Text', 'gogo'),
        'section'  => 'gogo-above-header',
        'settings' => 'gogo_col2_texthtml',
         'type'    => 'textarea',
    ));
// col2 menu redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col2_menu_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col2_menu_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Menu', 'gogo' ),
                    'button_class' => 'focus-customizer-menu-redirect-col2',  
                )
            )
        );
} 
// col2 widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col2_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col2_widget_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Widget', 'gogo' ),
                    'button_class' => 'focus-customizer-widget-redirect-col2',  
                )
            )
        );
}    
// col2 social media redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col2_social_media_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col2_social_media_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Social Media', 'gogo' ),
                    'button_class' => 'focus-customizer-social_media-redirect-col2',  
                )
            )
        );
} 
// col3
$wp_customize->add_setting('gogo_above_header_col3_set', array(
        'default'        => 'none',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_above_header_col3_set', array(
        'settings' => 'gogo_above_header_col3_set',
        'label'   => __('Column 3','gogo'),
        'section' => 'gogo-above-header',
        'type'    => 'select',
        'choices'    => array(
        'none'                 => __('None','gogo'),
        'text'             => __('Text','gogo'),
        'menu'                 => __('Menu','gogo'),
        'search'             => __('Search','gogo'),
        'widget'                 => __('Widget','gogo'),
        'social'             => __('Social Media','gogo'),
            
        ),
    ));

// col3-text/html
$wp_customize->add_setting('gogo_col3_texthtml', array(
        'default'           => __('Add your content here','gogo'),
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_textarea',
        'transport'         => 'postMessage',
        
    ));
$wp_customize->add_control('gogo_col3_texthtml', array(
        'label'    => __('Text', 'gogo'),
        'section'  => 'gogo-above-header',
        'settings' => 'gogo_col3_texthtml',
         'type'    => 'textarea',
    ));
// col3 social media redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col3_social_media_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col3_social_media_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Social Media', 'gogo' ),
                    'button_class' => 'focus-customizer-social_media-redirect-col3',  
                )
            )
        );
} 
// col3 menu redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col3_menu_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col3_menu_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Menu', 'gogo' ),
                    'button_class' => 'focus-customizer-menu-redirect-col3',  
                )
            )
        );
}
// col3 widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_col3_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_col3_widget_redirect', array(
                    'section'      => 'gogo-above-header',
                    'button_text'  => esc_html__( 'Go To Widget', 'gogo' ),
                    'button_class' => 'focus-customizer-widget-redirect-col3',  
                )
            )
        );
}
/****************************/
// common option
/****************************/
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_abv_hdr_hgt', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '40',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_abv_hdr_hgt', array(
                    'label'       => esc_html__( 'Height', 'gogo' ),
                    'section'     => 'gogo-above-header',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 20,
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
            'gogo_abv_hdr_botm_brd', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '0',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_abv_hdr_botm_brd', array(
                    'label'       => esc_html__( 'Bottom Border', 'gogo' ),
                    'section'     => 'gogo-above-header',
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
 $wp_customize->add_setting('gogo_above_brdr_clr', array(
        'default'        => '#eee',
        'capability'     => 'edit_theme_options',
        'transport'         => 'postMessage',
        'sanitize_callback' => 'gogo_sanitize_color'
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_above_brdr_clr', array(
        'label'      => __('Border Color', 'gogo' ),
        'section'    => 'gogo-above-header',
        'settings'   => 'gogo_above_brdr_clr',
    )) 
 );  
/**
 * Option - mobile setting
 */
$wp_customize->add_setting('gogo_above_mobile_set', array(
        'default'           => 'inline',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_above_mobile_set', array(
        'settings' => 'gogo_above_mobile_set',
        'label'    => __('Mobile Header Alignment','gogo'),
        'section'  => 'gogo-above-header',
        'type'     => 'select',
        'choices'    => array(
        'inline'     => __('Inline','gogo'),
        'stack'      => __('Stack','gogo'),          
        ),
    ));
//choose color layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_above_color_scheme', array(
                'default'           => 'abv-default',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_above_color_scheme', array(
                    'label'    => esc_html__( 'Choose Color Scheme', 'gogo' ),
                    'section'  => 'gogo-above-header',
                    'choices'  => array(
                       'abv-default' => array(
                            'url'    => GOGO_COLOR_SCHM_DEF,
                        ),
                        'abv-dark'   => array(
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
$wp_customize->add_setting('gogo_abv_hdr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_abv_hdr_doc_learn_more',
            array(
        'section'     => 'gogo-above-header',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#above-header')),
         'priority'   =>50,
)));
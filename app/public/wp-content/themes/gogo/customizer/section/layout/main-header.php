<?php
/**
 * Header Options for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
// main header
// choose col layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_main_header_layout', array(
                'default'           => 'mhdrleft',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_main_header_layout', array(
                    'label'    => esc_html__( 'Header Layout', 'gogo' ),
                    'section'  => 'gogo-main-header',
                    'choices'  => array(
                       'mhdrleft'   => array(
                            'url' => GOGO_MAINHEADER_LAYOUT_LEFT,
                        ),
                        'mhdrcenter'   => array(
                            'url' => GOGO_MAINHEADER_LAYOUT_CENTER,
                        ),
                        'mhdrright' => array(
                            'url' => GOGO_MAINHEADER_LAYOUT_RIGHT,
                        ),
                        'mhdrleftpan' => array(
                            'url' => GOGO_MAINHEADER_LAYOUT_LEFTPAN,
                        ),
                        'mhdrrightpan' => array(
                            'url' => GOGO_MAINHEADER_LAYOUT_RIGHTPAN,
                        ),
                        
                    ),
                )
            )
        );
} 
// disable menu
$wp_customize->add_setting( 'gogo_main_header_menu_disable', array(
                'default'               => false,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_main_header_menu_disable', array(
                'label'                 => esc_html__('Disable Menu', 'gogo'),
                'type'                  => 'checkbox',
                'section'               => 'gogo-main-header',
                'settings'              => 'gogo_main_header_menu_disable',
            ) ) );
// main header setting
$wp_customize->add_setting('gogo_main_header_set', array(
        'default'        => 'none',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_main_header_set', array(
        'settings' => 'gogo_main_header_set',
        'label'    => __('Last Menu Item','gogo'),
        'section'  => 'gogo-main-header',
        'type'     => 'select',
        'choices'    => array(
        'none'       => __('None','gogo'),
        'text'       => __('Text','gogo'),
        'search'     => __('Search','gogo'),
        'widget'     => __('Widget','gogo'),
        'social'     => __('Social Media','gogo'),
        'button'    => __('Button','gogo'),
        ),
    ));
// text/html
$wp_customize->add_setting('gogo_main_header_texthtml', array(
        'default'           => __('Add your content here','gogo'),
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_textarea',
         'transport'        => 'postMessage',
        
    ));
$wp_customize->add_control('gogo_main_header_texthtml', array(
        'label'    => __('Text', 'gogo'),
        'section'  => 'gogo-main-header',
        'settings' => 'gogo_main_header_texthtml',
         'type'    => 'textarea',
    ));
// widget redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_mian_header_widget_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_mian_header_widget_redirect', array(
                    'section'      => 'gogo-main-header',
                    'button_text'  => esc_html__( 'Go To Widget', 'gogo' ),
                    'button_class' => 'focus-customizer-widget-redirect',  
                )
            )
        );
}    
// social media redirection
if (class_exists('Gogo_Widegt_Redirect')){ 
$wp_customize->add_setting(
            'gogo_mian_header_social_media_redirect', array(
            'sanitize_callback' => 'sanitize_text_field',
     )
);
$wp_customize->add_control(
            new Gogo_Widegt_Redirect(
                $wp_customize, 'gogo_mian_header_social_media_redirect', array(
                    'section'      => 'gogo-main-header',
                    'button_text'  => esc_html__( 'Go To Social Media', 'gogo' ),
                    'button_class' => 'focus-customizer-social-media-redirect',  
                )
            )
        );
}    
// button
$wp_customize->add_setting('gogo_main_header_btn_txt', array(
        'default'           =>'',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_text',
        'transport'         => 'postMessage',
        
    ));
$wp_customize->add_control('gogo_main_header_btn_txt', array(
        'label'    => __('Button Text', 'gogo'),
        'section'  => 'gogo-main-header',
        'settings' => 'gogo_main_header_btn_txt',
         'type'    => 'text',
    ));
$wp_customize->add_setting('gogo_main_header_btn_url', array(
        'default'           =>'',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_text',
        
    ));
$wp_customize->add_control('gogo_main_header_btn_url', array(
        'label'    => __('Button Url', 'gogo'),
        'section'  => 'gogo-main-header',
        'settings' => 'gogo_main_header_btn_url',
         'type'    => 'text',
    ));

// main header bottom-border size
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_main_hdr_botm_brd', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '0',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_main_hdr_botm_brd', array(
                    'label'       => esc_html__( 'Bottom Border Size','gogo' ),
                    'section'     => 'gogo-main-header',
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
$wp_customize->add_setting('gogo_main_brdr_clr', array(
        'default'        => '#eee',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_main_brdr_clr', array(
        'label'      => __('Bottom Border Color', 'gogo' ),
        'section'    => 'gogo-main-header',
        'settings'   => 'gogo_main_brdr_clr',
    ) ) 
 );
// choose full width header
$wp_customize->add_setting( 'gogo_main_header_width_full', array(
                'default'               => false,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_main_header_width_full', array(
                'label'                 => esc_html__('Enable Full Width Header', 'gogo'),
                'type'                  => 'checkbox',
                'section'               => 'gogo-main-header',
                'settings'              => 'gogo_main_header_width_full',
) ) );
/***********************************/  
// mobile menu open
/***********************************/ 
$wp_customize->add_setting('gogo_mobile_menu_open', array(
                'default'               => 'overcenter',
                'sanitize_callback'     => 'gogo_sanitize_select',
            ) );

$wp_customize->add_control( new Gogo_Customizer_Buttonset_Control( $wp_customize, 'gogo_mobile_menu_open', array(
                'label'                 => esc_html__( 'Mobile Menu Open', 'gogo' ),
                'section'               => 'gogo-main-header',
                'settings'              => 'gogo_mobile_menu_open',
                'choices'               => array(
                    'left'              => esc_html__( 'Left', 'gogo' ),
                    'overcenter'        => esc_html__( 'center', 'gogo' ),
                    'right'             => esc_html__( 'Right', 'gogo' ),
                ),
            ) ) );
// text
$wp_customize->add_setting('gogo_main_header_mobile_txt', array(
        'default'           =>'',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_text',
        'transport'         => 'postMessage',
        
    ));
$wp_customize->add_control('gogo_main_header_mobile_txt', array(
        'label'    => __('Menu Label on Small Device', 'gogo'),
        'section'  => 'gogo-main-header',
        'settings' => 'gogo_main_header_mobile_txt',
         'type'    => 'text',
    ));
// menu alignment
$wp_customize->add_setting('gogo_main_header_menu_align', array(
        'default'        => 'inline',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
    $wp_customize->add_control( 'gogo_main_header_menu_align', array(
        'settings'=> 'gogo_main_header_menu_align',
        'label'   => __('Menu Alignment','gogo'),
        'section' => 'gogo-main-header',
        'type'    => 'select',
        'choices' => array(
        'inline'  => __('Inline','gogo'),
        'stack'   => __('Stack','gogo'),  
        ),
    ));
//choose color layout
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_main_color_scheme', array(
                'default'           => 'main-dark',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_main_color_scheme', array(
                    'label'    => esc_html__( 'Choose Color Scheme', 'gogo' ),
                    'section'  => 'gogo-main-header',
                    'choices'  => array(
                       'main-default' => array(
                            'url'     => GOGO_COLOR_SCHM_DEF,
                        ),
                        'main-dark'   => array(
                            'url'     => GOGO_COLOR_SCHM_DRK,
                        ),
                    ),
                )
            )
        );
    } 
$wp_customize->get_control( 'header_image' )->section = 'gogo-main-header';
$wp_customize->get_control( 'header_image' )->priority = 35;

/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_main_hdr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_main_hdr_doc_learn_more',
            array(
        'section'     => 'gogo-main-header',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#main-header')),
         'priority'   =>50,
)));
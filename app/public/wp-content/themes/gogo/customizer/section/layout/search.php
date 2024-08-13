<?php 
/**
 *Search Options for Gogo Theme.
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
//Icon-font-size
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_search_icon_font_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '15',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_search_icon_font_size', array(
                    'label'       => esc_html__( 'Icon Font Size', 'gogo' ),
                    'section'     => 'gogo-search-icon',
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
//Radius
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_search_icon_radius', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '0',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_search_icon_radius', array(
                    'label'       => esc_html__( 'Icon Radius', 'gogo' ),
                    'section'     => 'gogo-search-icon',
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
// iconcolor
$wp_customize->add_setting('gogo_search_icon_clr', array(
        'default'        => '#1ce225',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_search_icon_clr', array(
        'label'      => __('Icon Color', 'gogo' ),
        'section'    => 'gogo-search-icon',
        'settings'   => 'gogo_search_icon_clr',
    ) ) 
 ); 
// brdrcolor
$wp_customize->add_setting('gogo_search_icon_brd_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_search_icon_brd_clr', array(
        'label'      => __('Icon Border Color', 'gogo' ),
        'section'    => 'gogo-search-icon',
        'settings'   => 'gogo_search_icon_brd_clr',
    ) ) 
 ); 
// iconhover
$wp_customize->add_setting('gogo_search_icon_hvr_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_search_icon_hvr_clr', array(
        'label'      => __('Icon Hover Color', 'gogo' ),
        'section'    => 'gogo-search-icon',
        'settings'   => 'gogo_search_icon_hvr_clr',
    ) ) 
 ); 
// bgcolor
$wp_customize->add_setting('gogo_search_icon_bg_clr', array(
        'default'        => '',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_search_icon_bg_clr', array(
        'label'      => __('Icon Background Color', 'gogo' ),
        'section'    => 'gogo-search-icon',
        'settings'   => 'gogo_search_icon_bg_clr',
    ) ) 
 ); 
//****************//
// search box
//****************//
//Icon-font-size
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_search_box_icon_width', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '100',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_search_box_icon_width', array(
                    'label'       => esc_html__( 'Width', 'gogo' ),
                    'section'     => 'gogo-search-box',
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
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_search_box_icon_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '40',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_search_box_icon_height', array(
                    'label'       => esc_html__( 'Height', 'gogo' ),
                    'section'     => 'gogo-search-box',
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
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_search_box_radius', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '0',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_search_box_radius', array(
                    'label'       => esc_html__( 'Border Radius', 'gogo' ),
                    'section'     => 'gogo-search-box',
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

if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_search_box_plc_txt_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '15',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_search_box_plc_txt_size', array(
                    'label'       => esc_html__( 'Placeholder Font Size', 'gogo' ),
                    'section'     => 'gogo-search-box',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 1,
                        'max'  => 100,
                        'step' => 1,
                    ),
                )
           )
    );
$wp_customize->add_setting(
            'gogo_search_box_icon_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '15',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_search_box_icon_size', array(
                    'label'       => esc_html__( 'Icon Size', 'gogo' ),
                    'section'     => 'gogo-search-box',
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
$wp_customize->add_setting('gogo_social_box_bg_clr', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
    ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_social_box_bg_clr', array(
        'label'      => __('Search Box Background Color', 'gogo' ),
        'section'    => 'gogo-search-box',
        'settings'   => 'gogo_social_box_bg_clr',
    ) ) 
 );
$wp_customize->add_setting('gogo_social_box_plc_holdr_clr', array(
        'default'           => '#bbb',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
 ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_social_box_plc_holdr_clr', array(
        'label'      => __('Placeholder Text Color', 'gogo' ),
        'section'    => 'gogo-search-box',
        'settings'   => 'gogo_social_box_plc_holdr_clr',
  )) 
);
$wp_customize->add_setting('gogo_social_box_brdr_clr', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
 ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_social_box_brdr_clr', array(
        'label'      => __('Border Color', 'gogo' ),
        'section'    => 'gogo-search-box',
        'settings'   => 'gogo_social_box_brdr_clr',
  )) 
);

$wp_customize->add_setting('gogo_social_box_icon_clr', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_color',
        'transport'         => 'postMessage',
 ));
$wp_customize->add_control( 
    new Gogo_Customizer_Color_Control($wp_customize,'gogo_social_box_icon_clr', array(
        'label'      => __('Icon Color', 'gogo' ),
        'section'    => 'gogo-search-box',
        'settings'   => 'gogo_social_box_icon_clr',
  )) 
);

/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_search_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_search_doc_learn_more',
            array(
        'section'     => 'gogo-search-icon',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#search-icon')),
         'priority'   =>50,
)));

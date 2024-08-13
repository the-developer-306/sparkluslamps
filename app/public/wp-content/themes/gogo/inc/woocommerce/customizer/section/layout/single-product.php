<?php
/**
 * Single Product for Gogo Theme.
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
if ( ! class_exists( 'WooCommerce' ) ){
    return;
}
/*********************/
//Single Product content width
/*********************/
    $wp_customize->add_setting('gogo_single_product_content_width', array(
        'default'          =>'defualt',
        'capability'       =>'edit_theme_options',
        'sanitize_callback'=>'gogo_sanitize_select',
    ));
    $wp_customize->add_control('gogo_single_product_content_width', array(
        'settings'=> 'gogo_single_product_content_width',
        'label'   => __('Content Width','gogo'),
        'section' => 'gogo_woo_single_product',
        'type'    => 'select',
        'choices' => array(
        'defualt'    => __('Default','gogo'),
        'custom'     => __('Custom','gogo'), 
        ),
    ));
$wp_customize->add_setting('gogo_single_sidebar_disable', array(
                'default'               => false,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize,'gogo_single_sidebar_disable', array(
                'label'         => esc_html__('Force to disable sidebar in single product page.', 'gogo'),
                'type'          => 'checkbox',
                'section'       => 'gogo_woo_single_product',
                'settings'      => 'gogo_single_sidebar_disable',
            ) ) );
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_product_cnt_widht', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1200',
                 'transport'        => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_product_cnt_widht', array(
                    'label'       => esc_html__( 'Enter Width', 'gogo' ),
                    'section'     => 'gogo_woo_single_product',
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
/***********************************/  
//Product Layout Alignment
/***********************************/ 
$wp_customize->add_setting('gogo_single_product_alignment', array(
                'default'               => 'left',
                'sanitize_callback'     => 'gogo_sanitize_select',
            ) );
$wp_customize->add_control( new Gogo_Customizer_Buttonset_Control( $wp_customize, 'gogo_single_product_alignment', array(
                'label'                 => esc_html__( 'Product Content Alignment', 'gogo' ),
                'section'               => 'gogo_woo_single_product',
                'settings'              => 'gogo_single_product_alignment',
                'choices'               => array(
                    'left'              => esc_html__( 'Left', 'gogo' ),
                    'center'            => esc_html__( 'center', 'gogo' ),
                    'right'             => esc_html__( 'Right', 'gogo' ),
                ),
            ) ) );
/***********************************/  
// Single product structure 
/***********************************/  
$wp_customize->add_setting(
        GOGO_THEME_SETTINGS . '[gogo-woo-single-product-structure]', array(
            'default'           => gogo_get_option('gogo-woo-single-product-structure'),
            'type'              => 'option',
            'sanitize_callback' => 'gogo_sanitize_multi_choices',
        )
    );
    $wp_customize->add_control(
        new Gogo_Control_Sortable(
            $wp_customize, GOGO_THEME_SETTINGS . '[gogo-woo-single-product-structure]', array(
                'type'     => 'zta-sortable',
                'section'  => 'gogo_woo_single_product',
                'label'    => __( 'Product Structure', 'gogo' ),
                'choices'  => array(
                        'title'      => __( 'Title', 'gogo' ),
                    'price'      => __( 'Price', 'gogo' ),
                    'ratings'    => __( 'Ratings', 'gogo' ),
                    'add_cart'   => __( 'Add To Cart', 'gogo' ),
                    'short_desc' => __( 'Short Description', 'gogo' ),
                    'meta'       => __( 'Meta', 'gogo' ),
                ),
            )
        )
    );
	
/**********************/
// Display product Tab
/**********************/
// product tab divider
$wp_customize->add_setting('gogo_single_product_tab_display_divide', array(
        'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control( new Gogo_Misc_Control( $wp_customize, 'gogo_single_product_tab_display_divide',
            array(
        'section'     => 'gogo_woo_single_product',
        'type'        => 'custom_message',
        'description' => __('Product Description Tab','gogo' ),
)));
$wp_customize->add_setting('gogo_single_product_tab_display', array(
                'default'               => true,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize,'gogo_single_product_tab_display', array(
                'label'         => esc_html__('Display Product Description Tab', 'gogo'),
                'type'          => 'checkbox',
                'section'       => 'gogo_woo_single_product',
                'settings'      => 'gogo_single_product_tab_display',
            ) ) );

$wp_customize->add_setting('gogo_single_product_tab_layout', array(
                'default'               => 'horizontal',
                'sanitize_callback'     => 'gogo_sanitize_select',
            ) );
$wp_customize->add_control( new Gogo_Customizer_Buttonset_Control( $wp_customize, 'gogo_single_product_tab_layout', array(
                'label'                 => esc_html__( 'Product Tab Layout', 'gogo' ),
                'section'               => 'gogo_woo_single_product',
                'settings'              => 'gogo_single_product_tab_layout',
                'choices'               => array(
                    'horizontal'          => esc_html__( 'Horizontal', 'gogo' ),
                    'vertical'            => esc_html__( 'Vertical', 'gogo' ),
                ),
            ) ) );
/******************************/
// Up Sell Product
/******************************/
$wp_customize->add_setting('gogo_single_upsell_product_divide', array(
        'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control( new Gogo_Misc_Control( $wp_customize, 'gogo_single_upsell_product_divide',
            array(
        'section'     => 'gogo_woo_single_product',
        'type'        => 'custom_message',
        'description' => wp_kses_post('Up Sell Product','gogo' ),
)));
// display upsell
$wp_customize->add_setting('gogo_upsell_product_display', array(
                'default'               => true,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize,'gogo_upsell_product_display', array(
                'label'         => esc_html__('Display up sell product', 'gogo'),
                'type'          => 'checkbox',
                'section'       => 'gogo_woo_single_product',
                'settings'      => 'gogo_upsell_product_display',
            ) ) );
// up sell product column
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_upsale_num_col_shw', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default' => '3',  
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_upsale_num_col_shw', array(
                    'label'       => esc_html__( 'Number Of Column To Show', 'gogo' ),
                    'section'     => 'gogo_woo_single_product',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 1,
                        'max'  => 6,
                        'step' => 1,
                    ),
                    
                )
        )
);
// no.of product to show
$wp_customize->add_setting(
            'gogo_upsale_num_product_shw', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default' => '3',
                
                
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_upsale_num_product_shw', array(
                    'label'       => esc_html__( 'Number Of Product To Show', 'gogo' ),
                    'section'     => 'gogo_woo_single_product',
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
/******************************/
// Related Product
/******************************/
$wp_customize->add_setting('gogo_single_related_product_divide', array(
        'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control( new Gogo_Misc_Control( $wp_customize, 'gogo_single_related_product_divide',
            array(
        'section'     => 'gogo_woo_single_product',
        'type'        => 'custom_message',
        'description' => wp_kses_post('Related Product','gogo' ),
)));
// display upsell
$wp_customize->add_setting('gogo_related_product_display', array(
                'default'               => true,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ) );
$wp_customize->add_control( new WP_Customize_Control( $wp_customize,'gogo_related_product_display', array(
                'label'         => esc_html__('Display Related product', 'gogo'),
                'type'          => 'checkbox',
                'section'       => 'gogo_woo_single_product',
                'settings'      => 'gogo_related_product_display',
            ) ) );
// up sell product column
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_related_num_col_shw', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default' => '3',
                
                
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_related_num_col_shw', array(
                    'label'       => esc_html__( 'Number Of Column To Show', 'gogo' ),
                    'section'     => 'gogo_woo_single_product',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 1,
                        'max'  => 6,
                        'step' => 1,
                    ),
                    
                )
        )
);
// no.of product to show
$wp_customize->add_setting(
            'gogo_related_num_product_shw', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default' => '3',
                
                
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_related_num_product_shw', array(
                    'label'       => esc_html__( 'Number Of Product To Show', 'gogo' ),
                    'section'     => 'gogo_woo_single_product',
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
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_woo_single_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_woo_single_doc_learn_more',
            array(
        'section'     => 'gogo_woo_single_product',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#single-product')),
         'priority'   =>50,
)));
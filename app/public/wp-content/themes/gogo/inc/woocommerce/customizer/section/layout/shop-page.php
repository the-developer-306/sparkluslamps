<?php
/**
 * Shop Page for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
if ( ! class_exists( 'WooCommerce' ) ) {
    return;
}
$wp_customize->get_setting( 'woocommerce_catalog_columns' )->priority = '1';
$wp_customize->get_control( 'woocommerce_catalog_columns' )->section = 'gogo-woo-shop';
$wp_customize->get_setting( 'woocommerce_catalog_rows' )->priority = '1';
$wp_customize->get_control( 'woocommerce_catalog_rows' )->section = 'gogo-woo-shop';
// product animation
$wp_customize->add_setting('gogo_woo_product_animation', array(
        'default'        => 'none',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_woo_product_animation', array(
        'settings'=> 'gogo_woo_product_animation',
        'label'   => __('Product Image Hover Style','gogo'),
        'section' => 'gogo-woo-shop',
        'type'    => 'select',
        'choices'    => array(
        'none'            => __('None','gogo'),
        'zoom'            => __('Zoom','gogo'),
        'swap'            => __('Swap','gogo'),         
        ),
    ));
//product stucture
     $wp_customize->add_setting(
        GOGO_THEME_SETTINGS . '[gogo-product-structure]', array(
            'default'           => gogo_get_option('gogo-product-structure'),
            'type'              => 'option',
            'sanitize_callback' => 'gogo_sanitize_multi_choices',
        )
    );
    $wp_customize->add_control(
        new Gogo_Control_Sortable(
            $wp_customize, GOGO_THEME_SETTINGS . '[gogo-product-structure]', array(
                'type'     => 'zta-sortable',
                'section'  => 'gogo-woo-shop',
                'label'    => __( 'Product Structure', 'gogo' ),
                'choices'  => array(
                        'title'      => __( 'Title', 'gogo' ),
						'price'      => __( 'Price', 'gogo' ),
						'ratings'    => __( 'Ratings', 'gogo' ),
						'add_cart'   => __( 'Add To Cart', 'gogo' ),
						'category'   => __( 'Category', 'gogo' ),
                        'short_desc' => __( 'Short Description', 'gogo' ),
                ),
            )
        )
    );
/***********************************/  
//Product content alignment
/***********************************/ 
$wp_customize->add_setting('gogo_product_content_alignment', array(
                'default'               => 'left',
                'sanitize_callback'     => 'gogo_sanitize_select',
            ) );

$wp_customize->add_control( new Gogo_Customizer_Buttonset_Control( $wp_customize, 'gogo_product_content_alignment', array(
                'label'                 => esc_html__( 'Product Content Alignment', 'gogo' ),
                'section'               => 'gogo-woo-shop',
                'settings'              => 'gogo_product_content_alignment',
                'choices'               => array(
                    'left'              => esc_html__( 'Left', 'gogo' ),
                    'center'            => esc_html__( 'center', 'gogo' ),
                    'right'             => esc_html__( 'Right', 'gogo' ),
                ),
            ) ) );
/****************************/
// Box Shadow
/****************************/
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_shop_product_box_shadow', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '0',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_shop_product_box_shadow', array(
                    'label'       => esc_html__( 'Product Box shadow', 'gogo' ),
                    'section'     => 'gogo-woo-shop',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 5,
                        'step' => 1,
                    ),
                )
        )
);
//**********************/
// Box shadow on hover
//**********************/
$wp_customize->add_setting(
            'gogo_shop_product_box_shadow_on_hover', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '0',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_shop_product_box_shadow_on_hover', array(
                    'label'       => esc_html__( 'Product Box shadow on Hover', 'gogo' ),
                    'section'     => 'gogo-woo-shop',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 5,
                        'step' => 1,
                    ),
                )
        )
);
}
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_woo_shop_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_woo_shop_doc_learn_more',
            array(
        'section'     => 'gogo-woo-shop',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#shop-page')),
         'priority'   =>50,
)));

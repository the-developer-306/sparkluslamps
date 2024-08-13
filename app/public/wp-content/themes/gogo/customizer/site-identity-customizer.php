<?php
/**
 * Register customizer site identity setting.
 *
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/*************************/
/*Site Identity*/
/*************************/
/**
* Option: Retina logo selector
*/
    $wp_customize->add_setting(GOGO_THEME_SETTINGS.'[gogo_header_retina_logo]', array(
            'default'           => gogo_get_option('gogo_header_retina_logo'),
            'type'              => 'option',
            'sanitize_callback' => 'esc_url_raw',
        )
    );
    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize,GOGO_THEME_SETTINGS.'[gogo_header_retina_logo]', array(
                'section'        => 'title_tagline',
                'priority'       => 8,
                'label'          => __( 'Retina Logo', 'gogo' ),
                'library_filter' => array( 'gif', 'jpg', 'jpeg', 'png', 'ico' ),
            )
        )
    );
$wp_customize->get_section('title_tagline')->priority = 3;
   $wp_customize->add_setting('title_disable', array(
        'default'           => 'enable',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field',
    ));
$wp_customize->add_control('title_disable', array(
        'label'    => __('Display Site Title', 'gogo'),
        'section'  => 'title_tagline',
        'settings' => 'title_disable',
         'type'       => 'checkbox',
        'choices'    => array(
            'enable' => 'Display Site Title',
        ),
    ));
$wp_customize->get_section('title_tagline')->priority = 3;
$wp_customize->add_setting('tagline_disable', array(
        'default'           => 'enable',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_text_field',
    ));
$wp_customize->add_control('tagline_disable', array(
        'label'    => __('Display Tagline', 'gogo'),
        'section'  => 'title_tagline',
        'settings' => 'tagline_disable',
         'type'       => 'checkbox',
        'choices'    => array(
            'enable' => 'Display Tagline',
        ),
    )); 
// logo width
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_logo_width', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default' => '225',
                'transport'         => 'postMessage',
                
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_logo_width', array(
                    'label'       => esc_html__( 'Logo Width', 'gogo' ),
                    'section'     => 'title_tagline',
                    'priority'       => 9,
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 50,
                        'max'  => 600,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
);
}

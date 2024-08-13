<?php 
/**
 * Base-Typography for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
if ( class_exists( 'Gogo_Customize_Control_Checkbox_Multiple' ) ){
    $wp_customize->add_setting(
            'gogo_font_subsets', array(
                'default' => array( 'latin' ),
                'sanitize_callback' => 'gogo_checkbox_explode',
            )
        );
    $wp_customize->add_control(
            new Gogo_Customize_Control_Checkbox_Multiple(
                $wp_customize, 'gogo_font_subsets', array(
                    'section' => 'gogo-base-typography-font-subset',
                    'label'   => esc_html__( 'Font Subsets', 'gogo' ),
                    'choices' => array(
                        'latin'     => 'latin',
                        'latin-ext' => 'latin-ext',
                        'cyrillic'  => 'cyrillic',
                        'cyrillic-ext' => 'cyrillic-ext',
                        'greek'        => 'greek',
                        'greek-ext'    => 'greek-ext',
                        'vietnamese'   => 'vietnamese',
                        'arabic'       => 'arabic',
                    ),
                    'priority' => 1,
                )
            )
        );
}
//Body
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_body_font', array(
                
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_body_font', array(
        'label' => esc_html__( 'Font family', 'gogo' ),
                    'section'           => 'gogo-base-typography-body-font',
                    'priority'          => 1,
                    'type'              => 'selector-font',
            )
        )
    );
}
//Text-transform
$wp_customize->add_setting('gogo_body_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_body_text_transform', array(
        'settings' => 'gogo_body_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-body-font',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
/*******************/
// font-size
/*******************/
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_body_font_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '15',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_body_font_size', array(
                    'label'       => esc_html__( 'Font-Size', 'gogo' ),
                    'section'     => 'gogo-base-typography-body-font',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
// font line-height
$wp_customize->add_setting(
            'gogo_body_font_line_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1.6',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize,'gogo_body_font_line_height', array(
                    'label'       => esc_html__( 'Line-Height', 'gogo' ),
                    'section'     => 'gogo-base-typography-body-font',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 10,
                        'step' => 0.1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
// font letter spacing
$wp_customize->add_setting(
                'gogo_body_font_letter_spacing', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_body_font_letter_spacing', array(
                    'label'       => esc_html__( 'Letter-Spacing', 'gogo' ),
                    'section'     => 'gogo-base-typography-body-font',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
}
/*******************/
//Heading Font-Style
/*******************/
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_heading_font', array(
                
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_heading_font', array(
        'label' => esc_html__( 'Title Font', 'gogo' ),
                    'section'           => 'gogo-base-typography-heading',
                    'priority'          => 1,
                    'type'              => 'selector-font',
            )
        )
    );
}

//Text-transform
$wp_customize->add_setting('gogo_heading_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_heading_text_transform', array(
        'settings' => 'gogo_heading_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-heading',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
/**********************/
//Content Font-Style H1
/**********************/
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_h1_font', array(
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_h1_font', array(
            'label' => esc_html__( 'H1', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'              => 'selector-font',
            )
        )
    );
}
//H1 Text-transform
$wp_customize->add_setting('gogo_h1_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_h1_text_transform', array(
        'settings' => 'gogo_h1_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-content',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_h1_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '48',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h1_size', array(
                    'label'       => esc_html__( 'Font-Size', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
$wp_customize->add_setting(
            'gogo_h1_line_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1.2',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize,'gogo_h1_line_height', array(
                    'label'       => esc_html__( 'Line-Height', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 10,
                        'step' => 0.1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );

// font letter spacing
$wp_customize->add_setting(
                'gogo_h1_letter_spacing', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h1_letter_spacing', array(
                    'label'       => esc_html__( 'Letter-Spacing', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
}
/**********************/
//Content Font-Style H2
/**********************/
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_h2_font', array(
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_h2_font', array(
            'label' => esc_html__( 'H2', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    
                    'type'              => 'selector-font',
            )
        )
    );
}

//H1 Text-transform
$wp_customize->add_setting('gogo_h2_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_h2_text_transform', array(
        'settings' => 'gogo_h2_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-content',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_h2_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '44',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h2_size', array(
                    'label'       => esc_html__( 'Font-Size', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
$wp_customize->add_setting(
            'gogo_h2_line_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1.3',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize,'gogo_h2_line_height', array(
                    'label'       => esc_html__( 'Line-Height', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 10,
                        'step' => 0.1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );

// font letter spacing
$wp_customize->add_setting(
                'gogo_h2_letter_spacing', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h2_letter_spacing', array(
                    'label'       => esc_html__( 'Letter-Spacing', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
}
/**********************/
//Content Font-Style H3
/**********************/
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_h3_font', array(
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_h3_font', array(
            'label' => esc_html__( 'H3', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                     'type'              => 'selector-font',
            )
        )
    );
}

//H3 Text-transform
$wp_customize->add_setting('gogo_h3_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_h3_text_transform', array(
        'settings' => 'gogo_h3_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-content',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_h3_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '40',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h3_size', array(
                    'label'       => esc_html__( 'Font-Size', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
$wp_customize->add_setting(
            'gogo_h3_line_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1.4',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize,'gogo_h3_line_height', array(
                    'label'       => esc_html__( 'Line-Height', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 10,
                        'step' => 0.1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );

// font letter spacing
$wp_customize->add_setting(
                'gogo_h3_letter_spacing', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h3_letter_spacing', array(
                    'label'       => esc_html__( 'Letter-Spacing', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
}
/**********************/
//Content Font-Style H4
/**********************/
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_h4_font', array(
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_h4_font', array(
            'label' => esc_html__( 'H4', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'              => 'selector-font',
            )
        )
    );
}

//H4 Text-transform
$wp_customize->add_setting('gogo_h4_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_h4_text_transform', array(
        'settings' => 'gogo_h4_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-content',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_h4_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '36',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h4_size', array(
                    'label'       => esc_html__( 'Font-Size', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
$wp_customize->add_setting(
            'gogo_h4_line_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1.5',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize,'gogo_h4_line_height', array(
                    'label'       => esc_html__( 'Line-Height', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 10,
                        'step' => 0.1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );

// font letter spacing
$wp_customize->add_setting(
                'gogo_h4_letter_spacing', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h4_letter_spacing', array(
                    'label'       => esc_html__( 'Letter-Spacing', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
}
/**********************/
//Content Font-Style H5
/**********************/
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_h5_font', array(
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
         )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_h5_font', array(
            'label' => esc_html__( 'H5', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'selector-font',
            )
        )
    );
}
//H5 Text-transform
$wp_customize->add_setting('gogo_h5_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_h5_text_transform', array(
        'settings' => 'gogo_h5_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-content',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_h5_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '32',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h5_size', array(
                    'label'       => esc_html__( 'Font-Size', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
$wp_customize->add_setting(
            'gogo_h5_line_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1.6',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize,'gogo_h5_line_height', array(
                    'label'       => esc_html__( 'Line-Height', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 10,
                        'step' => 0.1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );

// font letter spacing
$wp_customize->add_setting(
                'gogo_h5_letter_spacing', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h5_letter_spacing', array(
                    'label'       => esc_html__( 'Letter-Spacing', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
}
/**********************/
//Content Font-Style H6
/**********************/
if (class_exists( 'Gogo_Font_Selector')){
        $wp_customize->add_setting(
            'gogo_h6_font', array(
                'capability'        => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );
        $wp_customize->add_control(
            new Gogo_Font_Selector(
                $wp_customize, 'gogo_h6_font', array(
            'label' => esc_html__( 'H6', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'selector-font',
            )
        )
    );
}
//H5 Text-transform
$wp_customize->add_setting('gogo_h6_text_transform', array(
        'default'           => '',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
));
$wp_customize->add_control( 'gogo_h6_text_transform', array(
        'settings' => 'gogo_h6_text_transform',
        'label'    => __('Text Transform','gogo'),
        'section'  => 'gogo-base-typography-content',
        'type'     => 'select',
        'choices'    => array(
        ''           => __( 'Default', 'gogo' ),
        'none'       => __( 'None', 'gogo' ),
        'capitalize' => __( 'Capitalize', 'gogo' ),
        'uppercase'  => __( 'Uppercase', 'gogo' ),
        'lowercase'  => __( 'Lowercase', 'gogo' ),    
        ),
));
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_h6_size', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '30',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h6_size', array(
                    'label'       => esc_html__( 'Font-Size', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
$wp_customize->add_setting(
            'gogo_h6_line_height', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1.7',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize,'gogo_h6_line_height', array(
                    'label'       => esc_html__( 'Line-Height', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 10,
                        'step' => 0.1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );

// font letter spacing
$wp_customize->add_setting(
                'gogo_h6_letter_spacing', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_h6_letter_spacing', array(
                    'label'       => esc_html__( 'Letter-Spacing', 'gogo' ),
                    'section'     => 'gogo-base-typography-content',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 0,
                        'max'  => 100,
                        'step' => 1,
                    ),
                    'media_query' => true,
                    'sum_type'    => true,
                )
        )
    );
}
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_gbl_typo_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_gbl_typo_doc_learn_more',
            array(
        'section'     => 'gogo-base-typography-body-font',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#typography-setting')),
         'priority'   =>50,
)));
<?php
/**
 * Blog Single page option
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/*********************/
//Single post content width
/*********************/
    $wp_customize->add_setting('gogo_single_post_content_width', array(
        'default'          =>'defualt',
        'capability'       =>'edit_theme_options',
        'sanitize_callback'=>'gogo_sanitize_select',
    ));
    $wp_customize->add_control('gogo_single_post_content_width', array(
        'settings'=> 'gogo_single_post_content_width',
        'label'   => __('Single Post Content Width','gogo'),
        'section' => 'gogo-blog-single',
        'type'    => 'select',
        'choices' => array(
        'defualt'    => __('Default','gogo'),
        'custom' => __('Custom','gogo'), 
        ),
    ));
if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_sngle_cnt_widht', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1200',
                 'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_sngle_cnt_widht', array(
                    'label'       => esc_html__( 'Enter Width', 'gogo' ),
                    'section'     => 'gogo-blog-single',
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
//blog single title & meta ordering
     $wp_customize->add_setting(
        GOGO_THEME_SETTINGS . '[gogo-blog-single-structure-meta]', array(
            'default'           => gogo_get_option('gogo-blog-single-structure-meta'),
            'type'              => 'option',
            'sanitize_callback' => 'gogo_sanitize_multi_choices',
        )
    );
    $wp_customize->add_control(
        new Gogo_Control_Sortable(
            $wp_customize, GOGO_THEME_SETTINGS . '[gogo-blog-single-structure-meta]', array(
                'type'     => 'zta-sortable',
                'section'  => 'gogo-blog-single',
                'label'    => __( 'Single Post Structure', 'gogo' ),
                'choices'  => array(
                    'image'  => __( 'Feature Image', 'gogo' ),
                    'title'  => __( 'Post Title & Meta', 'gogo' ),  
                ),
            )
        )
    );
    //single post meta odering
     $wp_customize->add_setting(
        GOGO_THEME_SETTINGS . '[gogo-blog-meta-single]', array(
            'default'           => gogo_get_option('gogo-blog-meta-single'),
            'type'              => 'option',
            'sanitize_callback' => 'gogo_sanitize_multi_choices',
        )
    );
    $wp_customize->add_control(
        new Gogo_Control_Sortable(
            $wp_customize, GOGO_THEME_SETTINGS . '[gogo-blog-meta-single]', array(
                'type'     => 'zta-sortable',
                'section'  => 'gogo-blog-single',
                'label'    => __( 'Single Post Meta', 'gogo' ),
                'choices'  => array(
                    'comments'  => __( 'Comments', 'gogo' ),
                    'category'  => __( 'Category', 'gogo' ),
                    'author'    => __( 'Author', 'gogo' ),
                    'date'      => __( 'Publish Date', 'gogo' ),
                ),
            )
        )
    );   
 //single post meta seprator
    $wp_customize->add_setting('gogo_single_meta_seprator', array(
            'default'           =>'/',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' =>'gogo_sanitize_text',
        )
    );
    $wp_customize->add_control('gogo_single_meta_seprator', array(
            'type'        => 'text',
            'section'     => 'gogo-blog-single',
            'label'       => __( 'Single Post Meta Separator', 'gogo' ),
            'settings' => 'gogo_single_meta_seprator',
            
        )
    );

       // Enable drop cap
    $wp_customize->add_setting( 'gogo_single_drop_cap', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_single_drop_cap', array(
                'label'       => esc_html__('Enable Drop Cap', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-single',
                'settings'    => 'gogo_single_drop_cap',
            ) ) );
// Remove Feature image padding
    $wp_customize->add_setting( 'gogo_single_remove_img_pad', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_single_remove_img_pad', array(
                'label'       => esc_html__('Remove Featured Image Padding', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-single',
                'settings'    => 'gogo_single_remove_img_pad',
            ) ) );
    // DISPALY AUTOR BIO
    $wp_customize->add_setting( 'gogo_single_authr_bio', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_single_authr_bio', array(
                'label'       => esc_html__('Display Author Info', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-single',
                'settings'    => 'gogo_single_authr_bio',
            ) ) );
 // Display Related Post
    $wp_customize->add_setting( 'gogo_single_related_post', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_single_related_post', array(
                'label'       => esc_html__('Display Related Post', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-single',
                'settings'    => 'gogo_single_related_post',
            ) ) );
/***********************************/  
// Related post option tag & category
/***********************************/ 
$wp_customize->add_setting('gogo_single_related_post_option', array(
                'default'               => 'category',
                'sanitize_callback'     => 'gogo_sanitize_select',
            ) );

$wp_customize->add_control( new Gogo_Customizer_Buttonset_Control( $wp_customize,'gogo_single_related_post_option', array(
                'label'                 => esc_html__( 'Related Post ', 'gogo' ),
                'section'               => 'gogo-blog-single',
                'settings'              => 'gogo_single_related_post_option',
                'choices'               => array(
                    'category'   => esc_html__( 'Category', 'gogo' ),
                    'tag'        => esc_html__( 'Tag', 'gogo' ),
             ),
        ) ) );
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_blog_single_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_blog_single_doc_learn_more',
            array(
        'section'     => 'gogo-blog-single',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#single-post')),
         'priority'   =>50,
)));
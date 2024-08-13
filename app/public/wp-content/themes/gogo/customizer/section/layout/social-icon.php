<?php 
/**
 * Social Icon Options for Gogo Theme.
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
$wp_customize->add_setting('social_link_facebook', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('social_link_facebook', array(
        'label'    => __('Facebook URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_facebook',
         'type'       => 'text',
        
        ));

$wp_customize->add_setting('social_link_linkedin', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('social_link_linkedin', array(
        'label'    => __('LinkedIn URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_linkedin',
         'type'       => 'text',
        
        ));
$wp_customize->add_setting('social_link_pintrest', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('social_link_pintrest', array(
        'label'    => __('Pinterest URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_pintrest',
         'type'       => 'text',
        
        ));
$wp_customize->add_setting('social_link_twitter', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        
        ));
        $wp_customize->add_control('social_link_twitter', array(
        'label'    => __('Twitter URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_twitter',
         'type'       => 'text',
        ));
$wp_customize->add_setting('social_link_insta', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        
        ));
        $wp_customize->add_control('social_link_insta', array(
        'label'    => __('Instagram URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_insta',
         'type'       => 'text',
        ));
$wp_customize->add_setting('social_link_tumblr', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        
        ));
        $wp_customize->add_control('social_link_tumblr', array(
        'label'    => __('Tumblr URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_tumblr',
         'type'       => 'text',
        ));
$wp_customize->add_setting('social_link_youtube', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        
        ));
        $wp_customize->add_control('social_link_youtube', array(
        'label'    => __('Youtube URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_youtube',
         'type'       => 'text',
        ));
$wp_customize->add_setting('social_link_stumbleupon', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        
        ));
        $wp_customize->add_control('social_link_stumbleupon', array(
        'label'    => __('Stumbleupon URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_stumbleupon',
        'type'     => 'text',
        ));
        $wp_customize->add_setting('social_link_dribble', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        
        ));
        $wp_customize->add_control('social_link_dribble', array(
        'label'    => __('Dribble URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_dribble',
        'type'     => 'text',
        ));

        $wp_customize->add_setting('social_link_skype', array(
        'default'           => '#',
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('social_link_skpe', array(
        'label'    => __('Skype URL', 'gogo'),
        'section'  => 'gogo-social-icon',
        'settings' => 'social_link_skype',
         'type'       => 'text',
        
        ));
// COLOR OPTION
$wp_customize->add_setting('gogo_divide_social_set', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_divide_social_set',
            array(
        'section'     => 'gogo-social-icon',
        'type'        => 'custom_message',
        'description' => wp_kses_post('Setting','gogo' ),
    )));
//Enable Loader
$wp_customize->add_setting( 'gogo_social_original_color', array(
                'default'               => false,
                'sanitize_callback'     => 'gogo_sanitize_checkbox',
            ));
$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_social_original_color', array(
                'label'       => esc_html__('Show Original Color', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-social-icon',
                'settings'    => 'gogo_social_original_color',
)));
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_social_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_social_doc_learn_more',
            array(
        'section'     => 'gogo-social-icon',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#social-icon')),
         'priority'   =>50,
)));
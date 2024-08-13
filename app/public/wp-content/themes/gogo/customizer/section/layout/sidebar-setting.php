<?php
/**
 *Sidebar Options for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/********************/
// default layout
/********************/
$wp_customize->add_setting('gogo_sidebar_default_layout', array(
        'default'        => 'right',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
    $wp_customize->add_control( 'gogo_sidebar_default_layout', array(
        'settings' => 'gogo_sidebar_default_layout',
        'label'   => __('Default Layout','gogo'),
        'section' => 'gogo-section-sidebar-group',
        'type'    => 'select',
        'choices'    => array(
        'no-sidebar'   => __('No Sidebar','gogo'),
        'left' => __('Left Sidebar','gogo'),
        'right'=> __('Right Sidebar','gogo'),    
        ),
));
/********************/
// page layout
/********************/
$wp_customize->add_setting('gogo_sidebar_page_layout', array(
        'default'        => 'default',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_sidebar_page_layout', array(
        'settings' => 'gogo_sidebar_page_layout',
        'label'   => __('Page Layout','gogo'),
        'section' => 'gogo-section-sidebar-group',
        'type'    => 'select',
        'choices'    => array(
        'default'   => __('Default','gogo'),
        'no-sidebar'   => __('No Sidebar','gogo'),
        'left' => __('Left Sidebar','gogo'),
        'right'=> __('Right Sidebar','gogo'),    
        ),
));
/********************/
// blog page layout
/********************/
$wp_customize->add_setting('gogo_sidebar_blog_layout', array(
        'default'        => 'default',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_sidebar_blog_layout', array(
        'settings' => 'gogo_sidebar_blog_layout',
        'label'   => __('Blog Layout','gogo'),
        'section' => 'gogo-section-sidebar-group',
        'type'    => 'select',
        'choices'    => array(
        'default'   => __('Default','gogo'),
        'no-sidebar'   => __('No Sidebar','gogo'),
        'left' => __('Left Sidebar','gogo'),
        'right'=> __('Right Sidebar','gogo'),    
        ),
));
/********************/
// blog single page layout
/********************/
$wp_customize->add_setting('gogo_sidebar_archive_layout', array(
        'default'        => 'default',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
$wp_customize->add_control( 'gogo_sidebar_archive_layout', array(
        'settings' => 'gogo_sidebar_archive_layout',
        'label'   => __('Blog Post Archives','gogo'),
        'section' => 'gogo-section-sidebar-group',
        'type'    => 'select',
        'choices'    => array(
        'default'   => __('Default','gogo'),
        'no-sidebar'   => __('No Sidebar','gogo'),
        'left' => __('Left Sidebar','gogo'),
        'right'=> __('Right Sidebar','gogo'),    
        ),
));
/*********************/
//Sidebar width
/*********************/
if ( class_exists('Gogo_WP_Customizer_Range_Value_Control')){
$wp_customize->add_setting(
            'gogo_sidebar_width', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '35',
                'transport'         => 'postMessage',
                
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_sidebar_width', array(
                    'label'       => esc_html__( 'Sidebar Width (%)', 'gogo' ),
                    'section'     => 'gogo-section-sidebar-group',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 15,
                        'max'  => 50,
                        'step' => 1,
                    ),
                )
        )
);
}

/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_sdbr_hdr_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_sdbr_hdr_doc_learn_more',
            array(
        'section'     => 'gogo-section-sidebar-group',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#sidebar-setting')),
         'priority'   =>50,
)));
<?php
/**
 * Register customizer panels & sections.
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/*************************/
/*Layout Panel*/
/*************************/
$wp_customize->add_panel( 'gogo-panel-layout', array(
				'priority' => 21,
				'title'    => __( 'Advanced Layout Setting', 'gogo' ),
			) );
//conatiner section
$wp_customize->add_section('gogo-conatiner', array(
        'title'    => __('Container', 'gogo'),
        'panel'    => 'gogo-panel-layout',
        'priority' => 1,
));
$gogo_section_header_group = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-section-header-group', array(
    'title' =>  __( 'Header', 'gogo' ),
    'panel' => 'gogo-panel-layout',
    'priority' => 1,
  ));
$wp_customize->add_section( $gogo_section_header_group );
$gogo_section_sidebar_group = new Gogo_WP_Customize_Section( $wp_customize,'gogo-section-sidebar-group', array(
    'title' =>  __( 'Sidebar', 'gogo' ),
    'panel' => 'gogo-panel-layout',
    'priority' => 2,
  ));
$wp_customize->add_section($gogo_section_sidebar_group);
$gogo_section_blog_group = new Gogo_WP_Customize_Section( $wp_customize,'gogo-section-blog-group', array(
    'title' =>  __( 'Blog', 'gogo' ),
    'panel' => 'gogo-panel-layout',
    'priority' => 2,
  ));
$wp_customize->add_section($gogo_section_blog_group);
$gogo_section_footer_group = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-section-footer-group', array(
    'title' =>  __( 'Footer', 'gogo' ),
    'panel' => 'gogo-panel-layout',
    'priority' => 3,
  ));
$wp_customize->add_section( $gogo_section_footer_group);
// above-header
$gogo_above_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-above-header', array(
    'title'    => __( 'Above Header', 'gogo' ),
    'panel'    => 'gogo-panel-layout',
        'section'  => 'gogo-section-header-group',
        'priority' => 1,
  ));
$wp_customize->add_section( $gogo_above_header );
// main-header
$gogo_main_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-main-header', array(
    'title'    => __( 'Main Header', 'gogo' ),
    'panel'    => 'gogo-panel-layout',
		'section'  => 'gogo-section-header-group',
		'priority' => 5,
  ));
$wp_customize->add_section( $gogo_main_header );
// bottom-header
$gogo_main_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-bottom-header', array(
    'title'    => __( 'Below Header', 'gogo' ),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-header-group',
    'priority' => 5,
  ));
$wp_customize->add_section( $gogo_main_header );
// sticky-header
$gogo_sticky_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-sticky-header', array(
    'title'    => __( 'Sticky Header', 'gogo' ),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-header-group',
    'priority' => 5,
  ));
$wp_customize->add_section($gogo_sticky_header);
// transparent-header
$gogo_transparent_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-transparent-header', array(
    'title'    => __( 'Transparent Header', 'gogo' ),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-header-group',
    'priority' => 6,
  ));
$wp_customize->add_section($gogo_transparent_header);
//**********************//
//blog/archive
//**********************//
$gogo_transparent_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-blog-archive', array(
    'title'    => __( 'Blog/Archive', 'gogo' ),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-blog-group',
    'priority' => 1,
  ));
$wp_customize->add_section( $gogo_transparent_header );
//**********************//
//blog single
//**********************//
$gogo_blog_single = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-blog-single', array(
    'title'    => __( 'Single Post', 'gogo' ),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-blog-group',
    'priority' => 2,
  ));
$wp_customize->add_section( $gogo_blog_single );
//**********************//
//social icon 
//**********************//     
$gogo_social_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-social-icon', array(
    'title'    => __( 'Social Icon', 'gogo' ),
    'priority' => 28,
  ));
$wp_customize->add_section( $gogo_social_header );
//**********************//
//search icon 
//**********************//     
$gogo_search_header = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-search', array(
    'title'    => __( 'Search', 'gogo' ),
    'priority' => 29,
  ));
$wp_customize->add_section( $gogo_search_header );
$gogo_search_icon = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-search-icon', array(
    'title'    => __( 'Search Icon', 'gogo' ),
    'section'  => 'gogo-search',
    'priority' => 1,
  ));
$wp_customize->add_section($gogo_search_icon);
$gogo_search_box = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-search-box', array(
    'title'    => __('Search Box', 'gogo' ),
    'section'  => 'gogo-search',
    'priority' => 2,
  ));
$wp_customize->add_section($gogo_search_box);
//widget footer
$gogo_widget_footer = new Gogo_WP_Customize_Section($wp_customize,'gogo-widget-footer', array(
    'title'    => __('Widget Footer','gogo'),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-footer-group',
    'priority' => 5,
));
$wp_customize->add_section( $gogo_widget_footer);
//Bottom footer
$gogo_bottom_footer = new Gogo_WP_Customize_Section($wp_customize,'gogo-bottom-footer', array(
    'title'    => __('Bottom Footer','gogo'),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-footer-group',
    'priority' => 5,
));
$wp_customize->add_section( $gogo_bottom_footer);
//**************************//
//Footer Area
//**************************//
//above-footer
$gogo_above_footer = new Gogo_WP_Customize_Section( $wp_customize, 'gogo-above-footer',array(
    'title'    => __( 'Above Footer','gogo' ),
    'panel'    => 'gogo-panel-layout',
        'section'  => 'gogo-section-footer-group',
        'priority' => 1,
));
$wp_customize->add_section( $gogo_above_footer);
//widget footer
$gogo_widget_footer = new Gogo_WP_Customize_Section($wp_customize,'gogo-widget-footer', array(
    'title'    => __('Footer Widget','gogo'),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-footer-group',
    'priority' => 5,
));
$wp_customize->add_section( $gogo_widget_footer);
//Bottom footer
$gogo_bottom_footer = new Gogo_WP_Customize_Section($wp_customize,'gogo-bottom-footer', array(
    'title'    => __('Below Footer','gogo'),
    'panel'    => 'gogo-panel-layout',
    'section'  => 'gogo-section-footer-group',
    'priority' => 5,
));
$wp_customize->add_section( $gogo_bottom_footer);
//*****************//
// scroll to top
//*****************//
$wp_customize->add_section('gogo-scroll-to-top-section', array(
        'title'    => __('Scroll To Top', 'gogo'),
        'panel'    => 'gogo-panel-layout',
        'priority' => 5,
));
/****************************/
/*Color and Background Panel*/
/****************************/
// section gloab color and background
$wp_customize->add_section('gogo-gloabal-color', array(
    'title'    => __('Color & Background', 'gogo'),
    'priority' => 22,
));
/*********************/
// Typography
/*********************/
$wp_customize->add_panel( 'gogo-base-typography', array(
        'priority' => 23,
        'title'    => __( 'Typography', 'gogo' ),
) );
/****************************/
/*Site Button*/
/****************************/
$wp_customize->add_section('gogo-site-button', array(
    'title'    => __('Site Button', 'gogo'),
    'priority' => 23,
));
/****************************/
/*Pre-loader*/
/****************************/
$wp_customize->add_section('gogo-pre-loader', array(
    'title'    => __('Pre Loader', 'gogo'),
    'priority' => 24,
));
/*******************/
//Typograpgy
/*******************/
$gogo_base_typography_font_subset = new Gogo_WP_Customize_Section( $wp_customize,'gogo-base-typography-font-subset', array(
    'title'      => __('Font Subset', 'gogo' ), 
    'panel'      => 'gogo-base-typography',
    'priority'   => 1,
  ));
$wp_customize->add_section($gogo_base_typography_font_subset);
$gogo_base_typography_base_typo = new Gogo_WP_Customize_Section( $wp_customize,'gogo-base-typography-base-typo', array(
    'title'      => __('Base Typography', 'gogo' ), 
    'panel'      => 'gogo-base-typography',
    'priority'   => 2,
  ));
$wp_customize->add_section($gogo_base_typography_base_typo);
$gogo_base_typography_body_font = new Gogo_WP_Customize_Section( $wp_customize,'gogo-base-typography-body-font', array(
    'title'      => __('Body', 'gogo' ), 
    'panel'      => 'gogo-base-typography',
    'section'    => 'gogo-base-typography-base-typo',
    'priority'   => 1,
  ));
$wp_customize->add_section($gogo_base_typography_body_font);
$gogo_base_typography_heading = new Gogo_WP_Customize_Section( $wp_customize,'gogo-base-typography-heading', array(
    'title'      => __('Title', 'gogo' ), 
    'panel'      => 'gogo-base-typography',
    'section'    => 'gogo-base-typography-base-typo',
    'priority'   => 2,
  ));
$wp_customize->add_section($gogo_base_typography_heading);
$gogo_base_typography_content = new Gogo_WP_Customize_Section( $wp_customize,'gogo-base-typography-content', array(
    'title'      => __('Content', 'gogo' ), 
    'panel'      => 'gogo-base-typography',
    'section'    => 'gogo-base-typography-base-typo',
    'priority'   => 3,
  ));
$wp_customize->add_section($gogo_base_typography_content);
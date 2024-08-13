<?php 
/**
 * all file includeed
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 * @param  
 * @return mixed|string
 */
 get_template_part('/inc/themes-hooks');
 get_template_part('/inc/class-gogo-theme-options');
 get_template_part('/inc/admin-function');
 get_template_part('/customizer/customizer-constant');
 get_template_part('/inc/header-function');
 get_template_part('/inc/footer-function');
 get_template_part('/inc/blog-function');
 get_template_part('/inc/blog-single-function');
 get_template_part('/inc/default-string');
 //theme-option
get_template_part('lib/th-option/th-option');
get_template_part('lib/th-option/child-notify');

 //pagination
 get_template_part('inc/pagination/pagination');
 get_template_part('inc/pagination/infinite-scroll');
 //customizer
 get_template_part('/customizer/custom-customizer');
 get_template_part('/customizer/customizer');
//custom-style
 get_template_part('/inc/custom-style');
 get_template_part('/inc/sidebar-function');
 get_template_part('/inc/content-function');
//typography
 get_template_part('/customizer/customizer-font-selector/functions');
 get_template_part('/inc/typography-style');
//page meta box
 get_template_part('/lib/page-meta-box/gogo-page-meta-box');
//woocommerce
 get_template_part('/inc/woocommerce/woocommerce-config');
 get_template_part('/inc/woocommerce/woocommerce-ajax');
//GOGO Files Starts
//*************************************************************************
// Gogo Background Image Control
 get_template_part('/customizer/repeater/class-gogo-repeater');
 get_template_part('customizer/gogo-custom-style');
 
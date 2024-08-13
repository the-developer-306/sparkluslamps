<?php /**
 * Theme Hook.
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
/**
 * Main Header
 */
function gogo_main_header(){
	do_action( 'gogo_main_header' );
}
/**
 * top Header
 */
function gogo_top_header(){
	do_action( 'gogo_top_header' );
}
/**
 * bottom Header
 */
function gogo_bottom_header(){
	do_action( 'gogo_bottom_header' );
}
/**
 * above Footer 
 */
function gogo_top_footer(){
	do_action( 'gogo_top_footer' );
}
/**
 * widget Footer 
 */
function gogo_widget_footer(){
	do_action( 'gogo_widget_footer' );
}
/**
 * bottom Footer 
 */
function gogo_bottom_footer(){
	do_action( 'gogo_bottom_footer' );
}

/**
 * Blog post layout before
 */
function gogo_blog_post_before_feature_image(){
	do_action( 'gogo_blog_post_before_feature_image' );
}
/**
 * Blog post layout after
 */
function gogo_blog_post_after_feature_image(){
	do_action( 'gogo_blog_post_after_feature_image' );
}


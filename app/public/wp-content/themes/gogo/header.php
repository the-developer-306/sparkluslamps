<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0 
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>
<!-- layout class call -->
<?php 
$gogo_default_container    = get_theme_mod('gogo_default_container','boxed');
$gogo_main_header_layout   = get_theme_mod('gogo_main_header_layout','mhdrleft');
$gogo_above_header_layout  = get_theme_mod('gogo_above_header_layout','abv-two');
$gogo_bottom_header_layout = get_theme_mod('gogo_bottom_header_layout','abv-two');
// add-pro-feature
$gogo_container_site_layout = get_theme_mod('gogo_container_site_layout','fullwidth');
// page post meta
if ((is_single() || is_page()) || ((class_exists( 'WooCommerce' ))&&(is_woocommerce() || is_checkout() || is_cart() || is_account_page()))
 ){
    if(class_exists( 'WooCommerce' ) && is_shop()){
               $shop_page_id = get_option( 'woocommerce_shop_page_id' );
               $postid=$shop_page_id;	
        }else{
	           $postid=$post->ID;	
             }
              $gogo_transparent_header_dyn = get_post_meta($postid, 'gogo_transparent_header_dyn', true );
              $gogo_disable_main_header_dyn = get_post_meta($postid, 'gogo_disable_main_header_dyn', true );
	          $gogo_disable_above_header_dyn = get_post_meta($postid, 'gogo_disable_above_header_dyn', true );
	          $gogo_disable_bottom_header_dyn = get_post_meta($postid, 'gogo_disable_bottom_header_dyn', true );
	          if(is_search() || is_404()){
              $gogo_sticky_header_dyn ='';
              }else{
              $gogo_sticky_header_dyn = get_post_meta($postid, 'gogo_sticky_header_dyn', true );
              }
     }else{
      $gogo_disable_above_header_dyn='';	
      $gogo_disable_main_header_dyn='';
      $gogo_disable_bottom_header_dyn='';
      $gogo_transparent_header_dyn='';
      $gogo_sticky_header_dyn='';
     }
?>
<!-- layout class call -->
<body <?php body_class(array(esc_attr($gogo_default_container), esc_attr($gogo_main_header_layout), esc_attr($gogo_above_header_layout), esc_attr($gogo_container_site_layout),esc_attr(gogo_front_page_activation_class())));?>>
<?php wp_body_open();?>		
<?php if(get_theme_mod('gogo_scroll_to_top_disable')==false):?>	
<input type="hidden" id="back-to-top" value="on"/>
<?php endif;?>
<?php if(get_theme_mod('gogo_stick_hide_scroll_down')==true):?>	
<input type="hidden" id="header-scroll-down-hide" value="on"/>
<?php endif;?>
<?php gogo_preloader();?>
<div id="page" class="gogo-site">
<header class="<?php echo esc_attr($gogo_main_header_layout);?> <?php if(function_exists('gogo_sticky_above_header_class')){
	echo esc_attr(gogo_sticky_above_header_class($gogo_sticky_header_dyn));
}?> <?php if(function_exists('gogo_sticky_main_header_class')){
	echo esc_attr(gogo_sticky_main_header_class($gogo_sticky_header_dyn));
}?> <?php if(function_exists('gogo_sticky_bottom_header_class')){
	echo esc_attr(gogo_sticky_bottom_header_class($gogo_sticky_header_dyn));
}?> <?php if(function_exists('gogo_stick_animation_class')){ echo esc_attr(gogo_stick_animation_class());} ?> <?php echo esc_attr(gogo_header_transparent_class($gogo_transparent_header_dyn));?>">
<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'gogo' ); ?></a>
	<?php if($gogo_main_header_layout=='mhdrrightpan' || $gogo_main_header_layout=='mhdrleftpan'):?>
		<div class="header-pan-icon">
		<span class="pan-icon">
		</span>
		</div>
		<div class="container">
		<?php gogo_logo();?>
	   </div>
	<?php endif;?>
	<!-- top-header start -->
	<?php 
	gogo_header_abv_post_meta($gogo_disable_above_header_dyn);
	gogo_header_main_post_meta($gogo_disable_main_header_dyn);
	gogo_header_btm_post_meta($gogo_disable_bottom_header_dyn); ?>
	<!-- bottom-header end-->
</header>
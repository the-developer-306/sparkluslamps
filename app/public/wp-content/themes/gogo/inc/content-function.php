<?php
/**
 *Content Function for Gogo Theme
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
if ( ! function_exists( 'gogo_page_content_layout' ) ){
function gogo_page_content_layout($default='', $page_post_meta_set='default'){
    $gogo_containerpage     = get_theme_mod('gogo_containerpage',$default);
    $gogo_containerblogpage = get_theme_mod('gogo_containerblogpage',$default);
    $gogo_containerwoopage  = get_theme_mod('gogo_containerwoopage',$default);
    $layout='';
if($page_post_meta_set=='default' || $page_post_meta_set==''){
    if((class_exists( 'WooCommerce' ))&&(is_woocommerce() || is_checkout() || is_cart() || is_account_page())){
       $layout = $gogo_containerwoopage;
       
    }
    elseif(is_page()){
       $layout = $gogo_containerpage;
      
    }
    elseif(is_single()){
       $layout = $gogo_containerblogpage;
    }
    
    else{
       $layout = '';
    }   
    return apply_filters( 'gogo_page_content_layout', $layout, $default ); 
  }else{
      if(is_page()){
       $layout = $page_post_meta_set;
      }
      elseif(is_single()){
       $layout = $page_post_meta_set;
      } 
      elseif((class_exists( 'WooCommerce' )) && (is_woocommerce() || is_checkout() || is_cart() || is_account_page())){
       $layout = $page_post_meta_set;
      } 
   else{
       $layout = '';
     }
    return apply_filters( 'gogo_page_content_layout',$layout, $default ); 
    }
  }
}
/******************/
// Page Title
/******************/
if ( ! function_exists( 'gogo_page_title_post_meta' ) ){
function gogo_page_title_post_meta($page_post_meta_set){
if($page_post_meta_set!=='on'){?>
<h1 class='entry-title'><?php the_title();?></h1>
 <?php     }
    }
  }

/******************/
// Page Feature image
/******************/
if ( ! function_exists( 'gogo_page_feature_img_post_meta' ) ){
function gogo_page_feature_img_post_meta($page_post_meta_set){
if($page_post_meta_set!=='on'){
      if ((function_exists('has_post_thumbnail')) && (has_post_thumbnail())){
        the_post_thumbnail('post-thumbnails'); 
      }
     }
    }
  }
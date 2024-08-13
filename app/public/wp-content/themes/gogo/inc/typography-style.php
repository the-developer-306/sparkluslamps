<?php 
/**
 * Typography Style for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
function gogo_typography_style(){
$gogo_typography_style='';
//Body 
function gogo_body_font_size_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= 'body{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_body_line_height_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= 'body{
   line-height: ' . $v3 . ';
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_body_letter_spacing_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= 'body{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_body_font_size','gogo_body_font_size_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_body_font_line_height','gogo_body_line_height_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_body_font_letter_spacing','gogo_body_letter_spacing_responsive');
$gogo_body_font = get_theme_mod('gogo_body_font');
$gogo_body_text_transform = get_theme_mod('gogo_body_text_transform');
if(!empty($gogo_body_font)){
gogo_enqueue_google_font($gogo_body_font);
$gogo_typography_style.="body, button, input, select, textarea,#respond.comment-respond #submit, .read-more .zta-button, button, [type='submit'], .woocommerce #respond input#submit, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button, .woocommerce #respond input#submit, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button, .woocommerce #respond input#submit.alt, .woocommerce a.button.alt, .woocommerce button.button.alt, .woocommerce input.button.alt,
  .type-button,
  .thunk-contact-us .leadform-show-form input[type='submit']{ 
   font-family:{$gogo_body_font};
   text-transform:{$gogo_body_text_transform};
  }";
}
$gogo_heading_font           = get_theme_mod('gogo_heading_font');
$gogo_heading_text_transform = get_theme_mod('gogo_heading_text_transform');
if(!empty($gogo_heading_font)){
gogo_enqueue_google_font($gogo_heading_font);
$gogo_typography_style.=".woocommerce .page-title,h4.widget-title,.site-title h1,h2.entry-title,h2.entry-title a,h1.entry-title,h2.comments-title,h3.comment-reply-title,h4.author-header,.gogo-related-post h3,#content.blog-single .gogo-related-post ul li h3 a,h3.widget-title,.woocommerce ul.products li.product .woocommerce-loop-product__title, .woocommerce-page ul.products li.product .woocommerce-loop-product__title,.woocommerce h1.product_title, .woocommerce-Tabs-panel h2, .related.products h2, section.up-sells h2, .cross-sells h2, .cart_totals h2, .woocommerce-billing-fields h3, .woocommerce-account .addresses .title h3,
  h2.short-heading,
  .thunk-service .service-txt h4,.thunk-service .service-txt h3,
  h2.call-to-heading,
  .video-window h4,.type-text-wrap span{ 
   font-family:{$gogo_heading_font};
   text-transform:{$gogo_heading_text_transform};
  }"; 
}
/********************/
//Content typography
/********************/
function gogo_h1_size_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h1{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h1_line_height_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h1{
   line-height: ' . $v3 . ';
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h1_letter_spacing_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h1{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
// h2
function gogo_h2_size_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h2{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h2_line_height_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h2{
   line-height: ' . $v3 . ';
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h2_letter_spacing_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h2{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
// h3
function gogo_h3_size_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h3{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h3_line_height_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h3{
   line-height: ' . $v3 . ';
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h3_letter_spacing_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h3{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
// h4
function gogo_h4_size_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h4{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h4_line_height_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h4{
   line-height: ' . $v3 . ';
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h4_letter_spacing_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h4{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
// h5
function gogo_h5_size_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h5{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h5_line_height_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h5{
   line-height: ' . $v3 . ';
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h5_letter_spacing_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h5{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
// h6
function gogo_h6_size_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h6{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h6_line_height_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h6{
   line-height: ' . $v3 . ';
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_h6_letter_spacing_responsive( $value, $dimension = 'desktop' ){
    $custom_css = '';
    switch ( $dimension ){
    case 'desktop':
      $v3 = $value;
      break;
    case 'tablet':
      $v3 = $value;
      break;
    case 'mobile':
      $v3 = $value;
    break;
    }
   $custom_css .= '.entry-content h6{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h1_size','gogo_h1_size_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h1_line_height','gogo_h1_line_height_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h1_letter_spacing','gogo_h1_letter_spacing_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h2_size','gogo_h2_size_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h2_line_height','gogo_h2_line_height_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h2_letter_spacing','gogo_h2_letter_spacing_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h3_size','gogo_h3_size_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h3_line_height','gogo_h3_line_height_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h3_letter_spacing','gogo_h3_letter_spacing_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h4_size','gogo_h4_size_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h4_line_height','gogo_h4_line_height_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h4_letter_spacing','gogo_h4_letter_spacing_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h5_size','gogo_h5_size_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h5_line_height','gogo_h5_line_height_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h5_letter_spacing','gogo_h5_letter_spacing_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h6_size','gogo_h6_size_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h6_line_height','gogo_h6_line_height_responsive');
$gogo_typography_style.= gogo_responsive_slider_funct('gogo_h6_letter_spacing','gogo_h6_letter_spacing_responsive');
$gogo_h1_font = get_theme_mod('gogo_h1_font');
$gogo_h1_text_transform = get_theme_mod('gogo_h1_text_transform');
if(!empty($gogo_h1_font)){
gogo_enqueue_google_font($gogo_h1_font);
$gogo_typography_style.=".entry-content h1{ 
   font-family:{$gogo_h1_font};
   text-transform:{$gogo_h1_text_transform};
  }";
}
$gogo_h2_font = get_theme_mod('gogo_h2_font');
$gogo_h2_text_transform = get_theme_mod('gogo_h2_text_transform');
if(!empty($gogo_h2_font)){
gogo_enqueue_google_font($gogo_h2_font);
$gogo_typography_style.=".entry-content h2{ 
   font-family:{$gogo_h2_font};
   text-transform:{$gogo_h2_text_transform};
  }";
}
$gogo_h3_font = get_theme_mod('gogo_h3_font');
$gogo_h3_text_transform = get_theme_mod('gogo_h3_text_transform');
if(!empty($gogo_h3_font)){
gogo_enqueue_google_font($gogo_h3_font);
$gogo_typography_style.=".entry-content h3{ 
   font-family:{$gogo_h3_font};
   text-transform:{$gogo_h3_text_transform};
  }";
}
$gogo_h4_font = get_theme_mod('gogo_h4_font');
$gogo_h4_text_transform = get_theme_mod('gogo_h4_text_transform');
if(!empty($gogo_h4_font)){
gogo_enqueue_google_font($gogo_h4_font);
$gogo_typography_style.=".entry-content h4{ 
   font-family:{$gogo_h4_font};
   text-transform:{$gogo_h4_text_transform};
  }";
}
$gogo_h5_font = get_theme_mod('gogo_h5_font');
$gogo_h5_text_transform = get_theme_mod('gogo_h5_text_transform');
if(!empty($gogo_h5_font)){
gogo_enqueue_google_font($gogo_h5_font);
$gogo_typography_style.=".entry-content h5{ 
   font-family:{$gogo_h5_font};
   text-transform:{$gogo_h5_text_transform};
  }";
}
$gogo_h6_font = get_theme_mod('gogo_h6_font');
$gogo_h6_text_transform = get_theme_mod('gogo_h6_text_transform');
if(!empty($gogo_h6_font)){
gogo_enqueue_google_font($gogo_h6_font);
$gogo_typography_style.=".entry-content h6{ 
   font-family:{$gogo_h6_font};
   text-transform:{$gogo_h6_text_transform};
  }";
}
return $gogo_typography_style;
}
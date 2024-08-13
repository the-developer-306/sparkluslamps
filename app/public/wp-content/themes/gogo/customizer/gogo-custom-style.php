<?php
function custom_style(){
	if( shortcode_exists( 'gogo' ) ) {
	$gogo_style="";
$gogo_bodybackground_color = get_theme_mod('background_color','');
$gogo_theme_clr     = get_theme_mod('gogo_theme_clr','#1ce225');
$gogo_link_clr      = get_theme_mod('gogo_link_clr','');
$gogo_link_hvr_clr  = get_theme_mod('gogo_link_hvr_clr','');
$gogo_text_clr 		= get_theme_mod('gogo_text_clr','#808285');
$gogo_title_clr     = get_theme_mod('gogo_title_clr','');
$gogo_button_border_radius   = get_theme_mod('gogo_button_border_radius','30');

//************slider-typewriter styles *************/

	$fancytext_color= get_theme_mod('gogo_typewriter_fancytext_color','#c9a420');	
	$gogo_style.="
		.th-type-cusor{color:{$fancytext_color};}
		";
		$gogo_typewriter_size = get_theme_mod('gogo_typewriter_size');

		$gogo_style.=".thunk-typed-box .type-demo{
			font-size: {$gogo_typewriter_size}px
		}
		";

//************Contact styles *************/
	$contact_background_image = get_theme_mod('contact_background_image_url',HUNK_COMPANION_CONTACT_BACKGROUND);

	$contact_background_image_repeat = get_theme_mod('contact_background_repeat','');
	
	$contact_background_image_attach = get_theme_mod('contact_background_attach','');
	
	$contact_background_image_size = get_theme_mod('contact_background_size','');

	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-contact-us{
	background-image: url('$contact_background_image');
    background-repeat: $contact_background_image_repeat;
    background-attachment: $contact_background_image_attach;
    background-size: $contact_background_image_size;
	}
	";
//************Video_ribbon styles *************/
	$video_ribbon_background_image = get_theme_mod('video_ribbon_background_image_url',HUNK_COMPANION_VIDEO_RIBBON_BG);

	$video_ribbon_background_image_repeat = get_theme_mod('video_ribbon_background_repeat','');
	
	$video_ribbon_background_image_attach = get_theme_mod('video_ribbon_background_attach','');
	
	$video_ribbon_background_image_size = get_theme_mod('video_ribbon_background_size','');
	
	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-video-ribbon{
	background-image: url('$video_ribbon_background_image');
    background-repeat: $video_ribbon_background_image_repeat;
    background-attachment: $video_ribbon_background_image_attach;
    background-size: $video_ribbon_background_image_size;
	}
	";
//************CALL_TO section styles *************/
	$call_to_background_image = get_theme_mod('call_to_background_image_url',HUNK_COMPANION_CALL_TO_BACKGROUND);

	$call_to_background_image_repeat = get_theme_mod('call_to_background_repeat','');
	
	$call_to_background_image_attach = get_theme_mod('call_to_background_attach','');
	
	$call_to_background_image_size = get_theme_mod('call_to_background_size','');

	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-call-to{
	background-image: url('$call_to_background_image');
    background-repeat: $call_to_background_image_repeat;
    background-attachment: $call_to_background_image_attach;
    background-size: $call_to_background_image_size;
	}
	";
//gogo_theme_clr CSS
		$gogo_style.="#cd-vertical-nav a.is-selected .cd-dot,
		#cd-vertical-nav .cd-label,
		.type-button,
		.pricing-post.popular-pricing-post .pricing-post-heading,
		.testimonials .owl-carousel .owl-nav button.owl-prev, 
		.testimonials .owl-carousel .owl-nav button.owl-next,
		.thunk-pricing .type-button:hover .type-button-overlay,
		.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child:before,
		.load-more.lfb-load-more,#move-to-top,.pricing-post-ribbon{
 		 background:{$gogo_theme_clr};
			}";
		$gogo_style.=".pricing-deatails h4,
		.faq-sn, 
		.ac > .ac-q::after,.portfolio-wrapper .button.is-checked,
		.current-menu-ancestor > a span, .current-menu-parent > a span{
			color:{$gogo_theme_clr};
		}.portfolio-wrapper .button:active, .portfolio-wrapper .button:focus, .portfolio-wrapper .button:hover, .portfolio-wrapper .button:visited,.gogo-menu li.on-section a span,.gogo-menu li ul.sub-menu li a span:hover{
			color:{$gogo_theme_clr};
		}";
$gogo_style.=".thunk-service .owl-dots .owl-dot.active,
.thunk-service .owl-dots .owl-dot:focus,
.thunk-service .owl-dots .owl-dot:hover,
.thunk-service .owl-dots .owl-dot:active,
.thunk-pricing .owl-dots .owl-dot.active,
.thunk-pricing .owl-dots .owl-dot:focus,
.thunk-pricing .owl-dots .owl-dot:hover,
.thunk-pricing .owl-dots .owl-dot:active,
.thunk-team .owl-dots .owl-dot.active,
.thunk-team .owl-dots .owl-dot:focus,
.thunk-team .owl-dots .owl-dot:hover,
.thunk-team .owl-dots .owl-dot:active,
.portfolio-slider .owl-dots .owl-dot.active,
.portfolio-slider .owl-dots .owl-dot:focus,
.portfolio-slider .owl-dots .owl-dot:hover,
.portfolio-slider .owl-dots .owl-dot:active,.thunk-blog .owl-dots .owl-dot.active,.thunk-blog .owl-dots .owl-dot:focus,.thunk-blog .owl-dots .owl-dot:hover,.thunk-blog .owl-dots .owl-dot:active{
	background: {$gogo_theme_clr}!important;
	border-color: {$gogo_theme_clr}!important;
} ";

//gogo_link_clr CSS
		$gogo_style.="
		.thunk-post-wrapper .post-category a,
		.thunk-service .service-txt h4,
		.thunk-service .service-txt h3,
		.thunk-team-social i{
			color:{$gogo_link_clr};
		}";
//gogo_link_hvr_clr CSS
		$gogo_style.="
		.thunk-post-wrapper .post-category a:hover,
		.thunk-service .service-txt h4:hover,
		.thunk-service .service-txt h3:hover,
		.thunk-team-social i:hover{
			color:{$gogo_link_hvr_clr};
		}";
//gogo_title_clr
		$gogo_style.="
		.thunk-first .short-heading,
		.thunk-pricing .short-heading,
		.thunk-clients-and-testimonials .short-heading,
		.thunk-contact-us .short-heading,
		.thunk-team .short-heading,
		.thunk-blog .short-heading,
		.thunk-service .short-heading,
		.thunk-faq .short-heading,
		.thunk-woocommerce .short-heading,
		.thunk-portfolio .short-heading,
		.thunk-blog h4,
		.thunk-service .service-txt h4,
		.thunk-service .service-txt h3,
		.video-window h4,
		.call-to-heading{
			color:{$gogo_title_clr};
		}";
//background_color
		$gogo_style.=".border{
		background-color:#{$gogo_bodybackground_color};
		}";

//**********************/
// Site Button Style 
//**********************/   
$gogo_button_txt_clr       = get_theme_mod('gogo_button_txt_clr','');
$gogo_button_txt_hvr_clr   = get_theme_mod('gogo_button_txt_hvr_clr','');
$gogo_button_bg_clr        = get_theme_mod('gogo_button_bg_clr','');
$gogo_button_bg_hvr_clr    = get_theme_mod('gogo_button_bg_hvr_clr','');

//button_txt_clr	
	$gogo_style.=".type-button{
		color:{$gogo_button_txt_clr};
		}";
//gogo_button_bg_clr
	$gogo_style.=".type-button,
	.pricing-deatails a.type-button,
	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child,
	.load-more.lfb-load-more{
		background:{$gogo_button_bg_clr};
		}";
//gogo_button_txt_hvr_clr	
	$gogo_style.=".type-button:hover,
	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child:hover input{
		color:{$gogo_button_txt_hvr_clr};
		}";
//gogo_button_bg_hvr_clr	
	$gogo_style.=".type-button:hover .type-button-overlay,
	.thunk-pricing .type-button:hover .type-button-overlay,
	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child:before,
		.load-more.lfb-load-more:hover{
		background:{$gogo_button_bg_hvr_clr};
		}";
//border-radius for button
		$gogo_style.=".type-button,
		.type-button-overlay,
		.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child{
		border-radius:{$gogo_button_border_radius};
		-webkit-border-radius:{$gogo_button_border_radius};
		-moz-border-radius:{$gogo_button_border_radius};
		-ms-border-radius:{$gogo_button_border_radius};

		}";
//Remove Padding in Homepage Layout
if (get_theme_mod('gogo_remove_padding',true)==false){
	$gogo_style.=".thunk-gogo-frontpage section{
		margin-bottom: 0;
	}
	.page-template-gogo-frontpage header{
		margin-top: 0;
	}
	.page-template-gogo-frontpage footer{
        transform: translateY(0px);
    }";
}
// remove navigation
if (get_theme_mod('gogo_remove_vertical_navigation',true)==false){
$gogo_style.=".thunk-vertival-pagination-wrapper{
		display:none;
	}";	
}
function gogo_typewriter_fontsize_responsive( $value, $dimension = 'desktop' ){
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
   $custom_css .= '.thunk-typed-box .type-demo{
   font-size: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
function gogo_typewriter_lineheight_responsive( $value, $dimension = 'desktop' ){
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
   $custom_css .= '.thunk-typed-box .type-demo{
   line-height: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}

function gogo_typewriter_letterspacing_responsive( $value, $dimension = 'desktop' ){
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
   $custom_css .= '.thunk-typed-box .type-demo{
   letter-spacing: ' . $v3 . 'px;
   }';
   $custom_css = gogo_add_media_query($dimension, $custom_css);
   return $custom_css;
}
$gogo_style.= gogo_responsive_slider_funct('gogo_typewriter_size','gogo_typewriter_fontsize_responsive');
$gogo_style.= gogo_responsive_slider_funct('gogo_typewriter_lineheight','gogo_typewriter_lineheight_responsive');
$gogo_style.= gogo_responsive_slider_funct('gogo_typewriter_letterspacing','gogo_typewriter_letterspacing_responsive');

//pro
if (gogo_pro_activation_class() !=''){

//************Gogopro Custom styles Starts 

//************Introduction styles *************/
//BACKGROUND COLOR
	$introduction_background_color = get_theme_mod('gogo_introduction_background_color','');
//OVERLAY COLOR	
	$introduction_image_overlay_color = get_theme_mod('gogo_introduction_image_color','');
//ID COLOR
	$introduction_sectionid_color = get_theme_mod('gogo_introduction_id_color','#fff');
//SMALL HEADING COLOR
	$introduction_sectionname_color = get_theme_mod('gogo_introduction_name_color','#fff');
//BIG HEADING COLOR
	$introduction_heading_color = get_theme_mod('gogo_introduction_heading_color','#fff');
//BORDER COLOR
	$introduction_divider_color = get_theme_mod('gogo_introduction_border_color','#fff');
//DESCRIPTION COLOR
	$introduction_content_color = get_theme_mod('gogo_introduction_description_color','#fff');
//BACKGROUND IMAGE
	$introduction_background_image = get_theme_mod('introduction_background_image_url','');

	$introduction_background_image_repeat = get_theme_mod('introduction_background_repeat','');
	
	$introduction_background_image_attach = get_theme_mod('introduction_background_attach','');
	
	$introduction_background_image_size = get_theme_mod('blog_background_size','');
	$gogo_style.="
	.thunk-gogo-frontpage .thunk-first{
	background-image: url('$introduction_background_image');
    background-repeat: $introduction_background_image_repeat;
    background-attachment: $introduction_background_image_attach;
    background-size: $introduction_background_image_size;
	}
	.thunk-first:before{
		background:{$introduction_background_color};
	}
	.thunk-intro-image:before{
		background:{$introduction_image_overlay_color};
	}
	.thunk-first .thunk-col-1 span.th-heading-number{
		color:{$introduction_sectionid_color};
	}
	.thunk-first .vertical-text{
		color:{$introduction_sectionname_color};
	}
	.thunk-first .short-heading{
		color:{$introduction_heading_color};
	} 
	.thunk-first .item-divider,
	.thunk-first .vertical-text-border{
		background:{$introduction_divider_color};
		} 
	.thunk-first p.description{
		color:{$introduction_content_color};
	}
	";

//************blog styles *************/
//BACKGROUND COLOR
	$blog_background_color = get_theme_mod('gogo_blog_background_color','');
//ID COLOR
	$blog_sectionid_color = get_theme_mod('gogo_blog_id_color','');
//SMALL HEADING COLOR
	$blog_sectionname_color = get_theme_mod('gogo_blog_name_color','');
//BIG HEADING COLOR
	$blog_heading_color = get_theme_mod('gogo_blog_heading_color','');
//BORDER COLOR
	$blog_divider_color = get_theme_mod('gogo_blog_border_color','');
//DESCRIPTION COLOR
	$blog_content_color = get_theme_mod('gogo_blog_description_color','');
//POST META COLOR
	$blog_meta_color = get_theme_mod('gogo_blog_meta_color','');
//TITLE COLOR
	$blog_title_color = get_theme_mod('gogo_blog_title_color','');

	$blog_background_image = get_theme_mod('blog_background_image_url','');

	$blog_background_image_repeat = get_theme_mod('blog_background_repeat','');
	
	$blog_background_image_attach = get_theme_mod('blog_background_attach','');
	
	$blog_background_image_size = get_theme_mod('blog_background_size','');

	$gogo_style.=" 
	.thunk-blog{
	background-image: url('$blog_background_image');
    background-repeat: $blog_background_image_repeat;
    background-attachment: $blog_background_image_attach;
    background-size: $blog_background_image_size;
	}
	.thunk-blog:before{
		background: $blog_background_color;
	}
	.thunk-blog .thunk-col-1 span.th-heading-number{
		color: $blog_sectionid_color;
	}
	.thunk-blog .vertical-text{
		color: $blog_sectionname_color;
	}
	.thunk-blog .short-heading{
		color: $blog_heading_color;
	} 
	.thunk-blog .item-divider,
	.thunk-blog .vertical-text-border{
		background:{$blog_divider_color};
		} 
	.thunk-blog .description p{
		color: $blog_content_color;
	}
	.thunk-blog .post-date,
	.thunk-blog .post-category a,
	.thunk-blog .post-meta{
		color: $blog_meta_color;
	}
	.thunk-blog .post-title h4,
	.thunk-blog .post-title h3{
		color: $blog_title_color;
	}
	";

//************service styles *************/
//BACKGROUND COLOR
	$service_background_color = get_theme_mod('gogo_service_background_color','');
//ID COLOR
	$service_sectionid_color = get_theme_mod('gogo_service_id_color','');
//SMALL HEADING COLOR
	$service_sectionname_color = get_theme_mod('gogo_service_name_color','');
//BIG HEADING COLOR
	$service_heading_color = get_theme_mod('gogo_service_heading_color','');
//BORDER COLOR
	$service_divider_color = get_theme_mod('gogo_service_border_color','');
//DESCRIPTION COLOR
	$service_content_color = get_theme_mod('gogo_service_description_color','');
//TITLE COLOR
	$service_title_color = get_theme_mod('gogo_service_title_color','');

	$service_background_image = get_theme_mod('service_background_image_url','');

	$service_background_image_repeat = get_theme_mod('servive_background_repeat','');
	
	$service_background_image_attach = get_theme_mod('service_background_attach','');
	
	$service_background_image_size = get_theme_mod('service_background_size','');
	
	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-service{
	background-image: url('$service_background_image');
    background-repeat: $service_background_image_repeat;
    background-attachment: $service_background_image_attach;
    background-size: $service_background_image_size;
	}
	.thunk-service:before{
		background: $service_background_color;
	}
	.thunk-service .thunk-col-1 span.th-heading-number{
		color: $service_sectionid_color;
	}
	.thunk-service .vertical-text{
		color: $service_sectionname_color;
	}
	.thunk-service .short-heading{
		color: $service_heading_color;
	} 
	.thunk-service .item-divider,
	.thunk-service .vertical-text-border{
		background:{$service_divider_color};
		} 
	.thunk-service .service-txt h4,
	.thunk-service .service-txt h3{
		color: $service_title_color;
		}
		.service-img i{
			color: 
		}
	.thunk-service .service-txt p{
		color: $service_content_color;
	}";
//************pricing styles *************/
//BACKGROUND COLOR
	$pricing_background_color = get_theme_mod('gogo_pricing_background_color','');
//ID COLOR
	$pricing_sectionid_color = get_theme_mod('gogo_pricing_id_color','');
//SMALL HEADING COLOR
	$pricing_sectionname_color = get_theme_mod('gogo_pricing_name_color','');
//BIG HEADING COLOR
	$pricing_heading_color = get_theme_mod('gogo_pricing_heading_color','');
//BORDER COLOR
	$pricing_divider_color = get_theme_mod('gogo_pricing_border_color','');
//DESCRIPTION COLOR
	$pricing_content_color = get_theme_mod('gogo_pricing_description_color','');
//TITLE COLOR
	$pricing_title_color = get_theme_mod('gogo_pricing_title_color','');

	$pricing_title_bg_color = get_theme_mod('gogo_pricing_title_bg_color','');

	$pricing_amount_color = get_theme_mod('gogo_pricing_amount_color','');

	$pricing_subtitle_color = get_theme_mod('gogo_pricing_subtitle_color','');

	$pricing_button_bg_color = get_theme_mod('gogo_pricing_button_bg_color','');

	$pricing_buttontext_color = get_theme_mod('gogo_pricing_buttontext_color','');

	$pricing_button_hover_color = get_theme_mod('gogo_pricing_button_hover_color','');

	$pricing_button_hovertext_color = get_theme_mod('gogo_pricing_button_hovertext_color','#fff');


	$pricing_background_image = get_theme_mod('pricing_background_image_url','');

	$pricing_background_image_repeat = get_theme_mod('pricing_background_repeat','');
	
	$pricing_background_image_attach = get_theme_mod('pricing_background_attach','');
	
	$pricing_background_image_size = get_theme_mod('pricing_background_size','');

	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-pricing{
	background-image: url('$pricing_background_image');
    background-repeat: $pricing_background_image_repeat;
    background-attachment: $pricing_background_image_attach;
    background-size: $pricing_background_image_size;
	}
	.thunk-pricing:before{
	background-color: $pricing_background_color;
	}
	.thunk-pricing .thunk-col-1 span.th-heading-number{
		color: $pricing_sectionid_color;
	}
	.thunk-pricing .vertical-text{
		color: $pricing_sectionname_color;
	}
	.thunk-pricing .short-heading,
	.pricing-t-c{
		color: $pricing_heading_color;
	} 
	.thunk-pricing .item-divider,
	.thunk-pricing .vertical-text-border{
		background:{$pricing_divider_color};
		} 
	.pricing-post-heading{
		background: $pricing_title_bg_color;
		color: $pricing_title_color;
	}
	.pricing-deatails p{
		color: $pricing_content_color;
	}
	.pricing-deatails h3{
		color: $pricing_amount_color;
	}
	.pricing-deatails h4{
		color: $pricing_subtitle_color;
	}
	.pricing-deatails a.type-button{
		background-color: $pricing_button_bg_color;
		color: $pricing_buttontext_color;
	}
	
	.pricing-deatails a.type-button:hover .type-button-overlay{
		background-color: $pricing_button_hover_color;
	}
	.pricing-deatails a.type-button:hover{
		color: $pricing_button_hovertext_color;
	}
	";

//************Clients & Testimonials styles *************/
//BACKGROUND COLOR
	$ct_background_color = get_theme_mod('gogo_ct_background_color','');
//ID COLOR
	$ct_sectionid_color = get_theme_mod('gogo_ct_id_color','');
//SMALL HEADING COLOR
	$ct_sectionname_color = get_theme_mod('gogo_ct_name_color','');
//BIG HEADING COLOR
	$ct_heading_color = get_theme_mod('gogo_ct_heading_color','');
//BORDER COLOR
	$ct_divider_color = get_theme_mod('gogo_ct_border_color','');

//TITLE COLOR
	$testimonials_bg_color = get_theme_mod('gogo_testimonials_bg_color','');

	$ct_title_color = get_theme_mod('gogo_testimonials_title_color','');

	$ct_subtitle_color = get_theme_mod('gogo_testimonials_subtitle_color','');

	$ct_description_color = get_theme_mod('gogo_testimonials_description_color','');

	
	$ct_background_image = get_theme_mod('ct_background_image_url','');

	$ct_background_image_repeat = get_theme_mod('ct_background_repeat','');
	
	$ct_background_image_attach = get_theme_mod('ct_background_attach','');
	
	$ct_background_image_size = get_theme_mod('ct_background_size','');

	$gogo_style.="
	.thunk-gogo-frontpage .thunk-clients-and-testimonials{
	background-image: url('$ct_background_image');
    background-repeat: $ct_background_image_repeat;
    background-attachment: $ct_background_image_attach;
    background-size: $ct_background_image_size;
	}
	.thunk-clients-and-testimonials:before{
	background-color: $ct_background_color;
	}
	.thunk-clients-and-testimonials .thunk-col-1 span.th-heading-number{
		color: $ct_sectionid_color;
	}
	.thunk-clients-and-testimonials .vertical-text{
		color: $ct_sectionname_color;
	}
	.thunk-clients-and-testimonials .short-heading{
		color: $ct_heading_color;
	} 
	.thunk-clients-and-testimonials .item-divider,
	.thunk-clients-and-testimonials .vertical-text-border{
		background:{$ct_divider_color};
		} 
	.testimonial-post{
		background: $testimonials_bg_color;
		}
	h3.testimonial-name{
		color: $ct_title_color;
	}
	h5.testimonial-position{
		color: $ct_subtitle_color;
	}
	.tetsimonial-content p{
		color: $ct_description_color;
	}
	";

//************FAQ styles *************/
	$faq_image = get_theme_mod('gogo_faq_image',HUNK_COMPANION_FAQ_IMAGE);

//BACKGROUND COLOR
	$faq_background_color = get_theme_mod('gogo_faq_background_color','');
//ID COLOR
	$faq_sectionid_color = get_theme_mod('gogo_faq_id_color','');
//SMALL HEADING COLOR
	$faq_sectionname_color = get_theme_mod('gogo_faq_name_color','');
//BIG HEADING COLOR
	$faq_heading_color = get_theme_mod('gogo_faq_heading_color','');
//BORDER COLOR
	$faq_divider_color = get_theme_mod('gogo_faq_border_color','');

//TITLE COLOR
	$faq_bg_color = get_theme_mod('gogo_faq_bg_color','');

	$faq_title_color = get_theme_mod('gogo_faq_title_color','');

	$faq_description_color = get_theme_mod('gogo_faq_description_color','');

	$faq_symbol_color = get_theme_mod('gogo_faq_symbol_color','');

	$faq_background_image = get_theme_mod('faq_background_image_url','');

	$faq_background_image_repeat = get_theme_mod('faq_background_repeat','');
	
	$faq_background_image_attach = get_theme_mod('faq_background_attach','');
	
	$faq_background_image_size = get_theme_mod('faq_background_size','');
	
	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-faq{
	background-image: url('$faq_background_image');
    background-repeat: $faq_background_image_repeat;
    background-attachment: $faq_background_image_attach;
    background-size: $faq_background_image_size;
	}
	.faq-image{
	background-image: url($faq_image);
	}
	.thunk-faq:before{
		background-color: $faq_background_color;
	}
	.thunk-faq .thunk-col-1 span.th-heading-number{
		color: $faq_sectionid_color;
	}
	.thunk-faq .vertical-text{
		color: $faq_sectionname_color;
	}
	.thunk-faq .short-heading{
		color: $faq_heading_color;
	} 
	.thunk-faq .item-divider,
	.thunk-faq .vertical-text-border{
		background:{$faq_divider_color};
		} 
	.thunk-accordion .accordion-container .ac > .ac-q{
		background: $faq_bg_color;
		color: $faq_title_color;
	}
	.thunk-accordion .accordion-container .ac > .ac-a p{
		color: $faq_description_color;
	}
	.faq-sn,
	.thunk-accordion .accordion-container .ac > .ac-q::after{
		color: $faq_symbol_color;
	}
				";


//************Contact styles *************/
//BACKGROUND COLOR
	$contact_background_color = get_theme_mod('gogo_contact_background_color','');
//ID COLOR
	$contact_sectionid_color = get_theme_mod('gogo_contact_id_color','');
//SMALL HEADING COLOR
	$contact_sectionname_color = get_theme_mod('gogo_contact_name_color','');
//BIG HEADING COLOR
	$contact_heading_color = get_theme_mod('gogo_contact_heading_color','');
//BORDER COLOR
	$contact_divider_color = get_theme_mod('gogo_contact_border_color','');
//INPUT COLOR
	$contact_input_color = get_theme_mod('gogo_contact_input_color','');
//BUTTON COLOR
	$contact_button_bg_color = get_theme_mod('gogo_contact_button_bg_color','');

	$contact_button_text_color = get_theme_mod('gogo_contact_button_text_color','');
	
	$contact_button_hover_color = get_theme_mod('gogo_contact_button_hover_color','');

	$contact_button_hovertext_color = get_theme_mod('gogo_contact_button_hovertext_color','');

	$contact_icon_color = get_theme_mod('gogo_contact_icon_color','');

	$contact_address_color = get_theme_mod('gogo_contact_address_color','');

	$gogo_style.=" 
	.thunk-contact-us:before{
	background-color: $contact_background_color;
	}
	.thunk-contact-us .thunk-col-1 span.th-heading-number{
		color: $contact_sectionid_color;
	}
	.thunk-contact-us .vertical-text{
		color: $contact_sectionname_color;
	}
	.thunk-contact-us .short-heading{
		color: $contact_heading_color;
	} 
	.thunk-contact-us .item-divider,
	.thunk-contact-us .vertical-text-border{
		background:{$contact_divider_color};
		} 
	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field input{
		color: $contact_input_color;
	}
	.thunk-contact-us .lf-field span:before{
		border-color: $contact_input_color;
	}
	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child{
		background: $contact_button_bg_color;
	}
	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field input,
	.thunk-contact-us .textarea-type .lf-form-textarea{
		color: $contact_button_text_color;
	}
	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child:before{
		background: $contact_button_hover_color;
	}

	.thunk-contact-us .leadform-show-form.leadform-lite .lf-field input:hover{
		color: $contact_button_hovertext_color;
	}

	.thunk-col-2 .address i{
		color: $contact_icon_color;
	}
	.thunk-col-2 .address p{
		color: $contact_address_color;
	}
	";

//************skill styles *************/
//BACKGROUND COLOR
	$skill_background_color = get_theme_mod('gogo_skill_background_color','');
//ID COLOR
	$skill_sectionid_color = get_theme_mod('gogo_skill_id_color','');
//SMALL HEADING COLOR
	$skill_sectionname_color = get_theme_mod('gogo_skill_name_color','');
//BIG HEADING COLOR
	$skill_heading_color = get_theme_mod('gogo_skill_heading_color','');
//BORDER COLOR
	$skill_divider_color = get_theme_mod('gogo_skill_border_color','');
	$skill_text_color = get_theme_mod('gogo_skill_text_color','');

	$skill_background_image = get_theme_mod('skill_background_image_url','');

	$skill_background_image_repeat = get_theme_mod('skill_background_repeat','');
	
	$skill_background_image_attach = get_theme_mod('skill_background_attach','');
	
	$skill_background_image_size = get_theme_mod('skill_background_size','');
	
	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-skill{
	background-image: url('$skill_background_image');
    background-repeat: $skill_background_image_repeat;
    background-attachment: $skill_background_image_attach;
    background-size: $skill_background_image_size;
	}
	.thunk-skill:before{
		background: $skill_background_color;
	}
	.thunk-skill .thunk-col-1 span.th-heading-number{
		color: $skill_sectionid_color;
	}
	.thunk-skill .vertical-text{
		color: $skill_sectionname_color;
	}
	.thunk-skill .short-heading{
		color: $skill_heading_color;
	} 
	.thunk-skill .item-divider,
	.thunk-skill .vertical-text-border{
		background:{$skill_divider_color};
		} 
	.barfiller .tip,
	.barfiller .tip:after{
		color:$skill_text_color;
	}
	";

	//************Team styles *************/
//BACKGROUND COLOR
	$team_background_color = get_theme_mod('gogo_team_background_color','');
//ID COLOR
	$team_sectionid_color = get_theme_mod('gogo_team_id_color','');
//SMALL HEADING COLOR
	$team_sectionname_color = get_theme_mod('gogo_team_name_color','');
//BIG HEADING COLOR
	$team_heading_color = get_theme_mod('gogo_team_heading_color','');
//BORDER COLOR
	$team_divider_color = get_theme_mod('gogo_team_border_color','');
//TITLE COLOR
	$team_title_color = get_theme_mod('gogo_team_title_color','');

	$team_title_bg_color = get_theme_mod('gogo_team_title_bg_color','');

	$team_subtitle_color = get_theme_mod('gogo_team_subtitle_color','');

	$gogo_team_overlaytext_color = get_theme_mod('gogo_team_overlaytext_color','');

	$gogo_team_overlay_color = get_theme_mod('gogo_team_overlay_color','');


	$team_background_image = get_theme_mod('team_background_image_url','');

	$team_background_image_repeat = get_theme_mod('team_background_repeat','');
	
	$team_background_image_attach = get_theme_mod('team_background_attach','');
	
	$team_background_image_size = get_theme_mod('team_background_size','');
	
	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-team{
	background-image: url('$team_background_image');
    background-repeat: $team_background_image_repeat;
    background-attachment: $team_background_image_attach;
    background-size: $team_background_image_size;
	}
	.thunk-team:before{
		background: $team_background_color;
	}
	.thunk-team .thunk-col-1 span.th-heading-number{
		color: $team_sectionid_color;
	}
	.thunk-team .vertical-text{
		color: $team_sectionname_color;
	}
	.thunk-team .short-heading{
		color: $team_heading_color;
	} 
	.thunk-team .item-divider,
	.thunk-team .vertical-text-border{
		background:{$team_divider_color};
		} 
	.thunk-team-heading{
		background: $team_title_bg_color;
	}
	.thunk-team-name{
		color: $team_title_color;
	}
	.thunk-team-position{
		color: $team_subtitle_color;
	}
	.thunk-team-description p,
	.thunk-team-social i{
		color: $gogo_team_overlaytext_color;
	}
	.thunk-team-img-overlay{
		background: $gogo_team_overlay_color;
	}
	";

//************Video_ribbon styles *************/
//BACKGROUND COLOR
	$video_ribbon_background_color = get_theme_mod('gogo_video_ribbon_background_color','');

//HEADING COLOR
	$video_ribbon_heading_color = get_theme_mod('gogo_video_ribbon_heading_color','');

//SUBHEADING COLOR
	$video_ribbon_subheading_color = get_theme_mod('gogo_video_ribbon_subheading_color','');
//BUTTON COLOR
	$video_ribbon_button_color = get_theme_mod('gogo_video_ribbon_button_color','');
////BUTTON HOVER COLOR
	$video_ribbon_button_hover_color = get_theme_mod('gogo_video_ribbon_button__hover_color','');

	$gogo_style.=" 
	.thunk-video-ribbon:before{
		background: $video_ribbon_background_color;
	}
	
	
	.thunk-video-ribbon .video-window h4{
		color: $video_ribbon_heading_color;
	} 

	.thunk-video-ribbon .video-window p{
		color: $video_ribbon_subheading_color;
	}
	.thunk-modal-open{
		color: $video_ribbon_button_color;
	}
	.thunk-modal-open:hover{
		color:$video_ribbon_button_hover_color;
	}
	";


//************portfolio styles *************/
//BACKGROUND COLOR
	$portfolio_background_color = get_theme_mod('gogo_portfolio_background_color','');
//ID COLOR
	$portfolio_sectionid_color = get_theme_mod('gogo_portfolio_id_color','');
//SMALL HEADING COLOR
	$portfolio_sectionname_color = get_theme_mod('gogo_portfolio_name_color','');
//BIG HEADING COLOR
	$portfolio_heading_color = get_theme_mod('gogo_portfolio_heading_color','');
//BORDER COLOR
	$portfolio_divider_color = get_theme_mod('gogo_portfolio_border_color','');

	$portfolio_caption_color = get_theme_mod('gogo_portfolio_caption_color','');

	$portfolio_modal_background_color = get_theme_mod('gogo_portfolio_modal_background_color','');

	$portfolio_title_color = get_theme_mod('gogo_portfolio_title_color','');

	$portfolio_content_color = get_theme_mod('gogo_portfolio_content_color','');

	$portfolio_background_image = get_theme_mod('portfolio_background_image_url','');

	$portfolio_background_image_repeat = get_theme_mod('portfolio_background_repeat','');
	
	$portfolio_background_image_attach = get_theme_mod('portfolio_background_attach','');
	
	$portfolio_background_image_size = get_theme_mod('portfolio_background_size','');
	
	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-portfolio{
	background-image: url('$portfolio_background_image');
    background-repeat: $portfolio_background_image_repeat;
    background-attachment: $portfolio_background_image_attach;
    background-size: $portfolio_background_image_size;
	}
	.thunk-portfolio:before{
		background: $portfolio_background_color;
	}
	.thunk-portfolio .thunk-col-1 span.th-heading-number{
		color: $portfolio_sectionid_color;
	}
	.thunk-portfolio .vertical-text{
		color: $portfolio_sectionname_color;
	}
	.thunk-portfolio .short-heading{
		color: $portfolio_heading_color;
	} 
	.thunk-portfolio .item-divider,
	.thunk-portfolio .vertical-text-border{
		background:{$portfolio_divider_color};
		} 
	.thunk-fig-caption h3, .thunk-fig-caption a{
		color: $portfolio_caption_color;
	}
	.iziModal.th-portfolio{
		background: $portfolio_modal_background_color;
	}
	.th-modal-title{
		color: $portfolio_title_color;
	}
	.th-modal-description p,
	.th-portfolio-back,
	.th-modal-meta h4, .th-modal-meta h4 a{
		color: $portfolio_content_color;
	}
	";

//************social section styles *************/
//BACKGROUND COLOR
	$social_background_color = get_theme_mod('gogo_social_background_color','');

	$social_background_image = get_theme_mod('social_background_image_url','');

	$social_background_image_repeat = get_theme_mod('social_background_repeat','');
	
	$social_background_image_attach = get_theme_mod('social_background_attach','');
	
	$social_background_image_size = get_theme_mod('social_background_size','');


	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-social-section{
	background-image: url('$social_background_image');
    background-repeat: $social_background_image_repeat;
    background-attachment: $social_background_image_attach;
    background-size: $social_background_image_size;
	}
	.thunk-social-section:before{
		background: $social_background_color;
	}
	";
//************Counter section styles *************/
	$counter_background_image = get_theme_mod('counter_background_image_url','');

	$counter_background_image_repeat = get_theme_mod('counter_background_repeat','');
	
	$counter_background_image_attach = get_theme_mod('counter_background_attach','');
	
	$counter_background_image_size = get_theme_mod('counter_background_size','');

	$counter_background_color = get_theme_mod('gogo_counter_background_color','');
	$counter_number_color = get_theme_mod('gogo_counter_number_color','');
	$counter_title_color = get_theme_mod('gogo_counter_title_color','');
	$gogo_style.=" 
	.thunk-gogo-frontpage .thunk-counter-section{
	background-image: url('$counter_background_image');
    background-repeat: $counter_background_image_repeat;
    background-attachment: $counter_background_image_attach;
    background-size: $counter_background_image_size;
	}
	.thunk-counter-section:before{
		background: $counter_background_color;
	}
	.thunk-counter .thunk-scroller{
		color: $counter_number_color;
	}
	.thunk-counter .counter-category{
		color: $counter_title_color;
	}
		";

//************Single Project styles *************/
//BACKGROUND COLOR
	$singleproject_background_color = get_theme_mod('gogo_singleproject_background_color','');
//ID COLOR
	$singleproject_sectionid_color = get_theme_mod('gogo_singleproject_id_color','');
//SMALL HEADING COLOR
	$singleproject_sectionname_color = get_theme_mod('gogo_singleproject_name_color','');
//BIG HEADING COLOR
	$singleproject_heading_color = get_theme_mod('gogo_singleproject_heading_color','');
//BORDER COLOR
	$singleproject_divider_color = get_theme_mod('gogo_singleproject_border_color','');

//Description COLOR
	$singleproject_description_color = get_theme_mod('gogo_singleproject_description_color','');

	$singleproject_background_image = get_theme_mod('singleproject_background_image_url','');

	$singleproject_background_image_repeat = get_theme_mod('singleproject_background_repeat','');
	
	$singleproject_background_image_attach = get_theme_mod('singleproject_background_attach','');
	
	$singleproject_background_image_size = get_theme_mod('singleproject_background_size','');

	$gogo_style.=" 
	.thunk-gogo-frontpage .single-portfolio{
	background-image: url('$singleproject_background_image');
    background-repeat: $singleproject_background_image_repeat;
    background-attachment: $singleproject_background_image_attach;
    background-size: $singleproject_background_image_size;
	}
	.single-portfolio:before{
		background: $singleproject_background_color;
	}
	.single-portfolio .thunk-col-1 span.th-heading-number{
		color: $singleproject_sectionid_color;
	}
	.single-portfolio .vertical-text{
		color: $singleproject_sectionname_color;
	}
	.single-portfolio .short-heading{
		color: $singleproject_heading_color;
	} 
	.single-portfolio .item-divider,
	.single-portfolio .vertical-text-border{
		background:{$singleproject_divider_color};
		} 
	.th-item-description{
		color:{$singleproject_description_color};
	}
		";

//************CALL_TO section styles *************/
//BACKGROUND COLOR
	$call_to_background_color = get_theme_mod('gogo_call_to_background_color','#a8b1bb00');

	$call_to_heading_color = get_theme_mod('gogo_call_to_heading_color','');

	$call_to_button_background_color = get_theme_mod('gogo_call_to_button_background_color','');

	$call_to_buttontext_color = get_theme_mod('gogo_call_to_buttontext_color','');

	$call_to_button_hover_background_color = get_theme_mod('gogo_call_to_button_hover_color','');

	$call_to_button_hovertext_color = get_theme_mod('gogo_call_to_button_hovertext_color','');
	
	$gogo_style.=" 
	.thunk-call-to:before{
		background: $call_to_background_color;
	}
	.call-to-heading{
		color: $call_to_heading_color;
	}
	.thunk-call-to .type-button{
		background: $call_to_button_background_color;
		color: {$call_to_buttontext_color};
	}
	.call-to-button .type-button:hover .type-button-overlay{
		background: {$call_to_button_hover_background_color};
	}
	.call-to-button a:hover{
		color:{$call_to_button_hovertext_color};
	}
	";

	//************slider-typewriter styles *************/

	$background_color = get_theme_mod('gogo_typewriter_background_overlay_color','');
	
	$heading_color= get_theme_mod('gogo_typewriter_heading_color','');
	
	$beforetext_color= get_theme_mod('gogo_typewriter_beforetext_color','');
	
	$fancytext_color= get_theme_mod('gogo_typewriter_fancytext_color','');
	
	$aftertext_color= get_theme_mod('gogo_typewriter_aftertext_color','');
	
	$buttontext_color= get_theme_mod('gogo_typewriter_buttontext_color','');

	$button_background_color= get_theme_mod('gogo_typewriter_button_background_color','');

	$button_hover_color= get_theme_mod('gogo_typewriter_button_hover_color','');

	$buttontext_hover_color= get_theme_mod('gogo_typewriter_buttontext_hover_color','');
	
	$gogo_style.=".slider-typewriter:before{
		background:{$background_color};}
		.thunk-typed-box .type-demo.td-start{color:{$beforetext_color};}
		.thunk-typed-box .type-demo.td-middle{color:{$fancytext_color};}
		.thunk-typed-box .type-demo.td-end{color:{$aftertext_color};}
		.slider-typewriter .type-button{color:{$buttontext_color};
		background:{$button_background_color};}
		.slider-typewriter .type-button:hover .type-button-overlay{background:{$button_hover_color};}
		.slider-typewriter .type-button:hover{color:{$buttontext_hover_color};}
		";
/**************************/
// woocomerce section style
/**************************/
    $gogo_woo_background_color = get_theme_mod('gogo_woo_background_color','');
	$woo_background_image_url = get_theme_mod('woo_background_image_url','');
	$woo_background_repeat = get_theme_mod('woo_background_repeat','');
	$woo_background_position = get_theme_mod('woo_background_position','');
	$woo_background_size = get_theme_mod('woo_background_size','');
    $woo_background_attach = get_theme_mod('woo_background_attach','');

	$gogo_woo_id_color = get_theme_mod('gogo_woo_id_color','');
	$gogo_woo_name_color = get_theme_mod('gogo_woo_name_color','');
	$gogo_woo_heading_color = get_theme_mod('gogo_woo_heading_color','');
	$gogo_woo_border_color = get_theme_mod('gogo_woo_border_color','');
	$gogo_woo_prdt_title_color = get_theme_mod('gogo_woo_prdt_title_color','');
	$gogo_woo_cat_color = get_theme_mod('gogo_woo_cat_color','');
	$gogo_woo_rating_color = get_theme_mod('gogo_woo_rating_color','');
	$gogo_woo_price_color = get_theme_mod('gogo_woo_price_color','');
	$gogo_woo_desc_color = get_theme_mod('gogo_woo_desc_color','');

    $gogo_style.=".thunk-gogo-frontpage section.thunk-woocommerce{
    background-image: url('$woo_background_image_url');
    background-repeat: $woo_background_repeat;
    background-attachment: $woo_background_attach;
    background-size: $woo_background_size;
    background-position:$woo_background_position;
    }
    .thunk-gogo-frontpage section.thunk-woocommerce:before{background:{$gogo_woo_background_color};}
    .thunk-woocommerce .thunk-col-1 span.th-heading-number{color:{$gogo_woo_id_color};}
    .thunk-woocommerce .vertical-text{color:{$gogo_woo_name_color};}
    .thunk-woocommerce .short-heading{color:{$gogo_woo_heading_color};}
    .thunk-woocommerce .vertical-text-border, .thunk-woocommerce .item-divider{background:{$gogo_woo_border_color};}
    .thunk-woocommerce .gogo-woo-product-category{color:{$gogo_woo_cat_color};}
    .thunk-woocommerce .woocommerce ul.products li.product .woocommerce-loop-product__title{color:{$gogo_woo_prdt_title_color};}
    .thunk-woocommerce .woocommerce .star-rating span{color:{$gogo_woo_rating_color};}
    .thunk-woocommerce .woocommerce ul.products li.product .price .amount{color:{$gogo_woo_price_color};}
    .thunk-woocommerce .woocommerce .zta-woo-shop-product-description{color:{$gogo_woo_desc_color};}
    ";
//************Gogopro Custom styles END
	return $gogo_style;
}
else{
	return $gogo_style;
}
}	//if checking for shortcode_exists closing braces
} //custom_style funstion End
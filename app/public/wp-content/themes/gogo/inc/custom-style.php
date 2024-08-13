<?php 
/**
 * Custom Style for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
function gogo_custom_style(){
$gogo_style="";   
$gogo_style.= gogo_responsive_slider_funct( 'gogo_logo_width', 'gogo_logo_width_responsive');
//end logo width 
/**************************/
//gloabal color
/**************************/
$gogo_theme_clr     = get_theme_mod('gogo_theme_clr','#1ce225');
$gogo_link_clr      = get_theme_mod('gogo_link_clr','');
$gogo_link_hvr_clr  = get_theme_mod('gogo_link_hvr_clr','');
$gogo_text_clr      = get_theme_mod('gogo_text_clr','#808285');
$gogo_title_clr     = get_theme_mod('gogo_title_clr','');
$gogo_loader_bg_clr = get_theme_mod('gogo_loader_bg_clr','#f5f5f5');
$gogo_style .= "a:hover,.inifiniteLoader,mark,.single .nav-previous:hover:before,.single .nav-next:hover:after,.page-numbers.current, .page-numbers:hover, .prev.page-numbers:hover, .next.page-numbers:hover,#load-more-posts:hover,article h2.entry-title a:hover,.gogo-menu li a:hover,.main-header .gogo-menu > li > a:hover,.woocommerce nav.woocommerce-pagination ul li a:focus, .woocommerce nav.woocommerce-pagination ul li a:hover, .woocommerce nav.woocommerce-pagination ul li span.current,.gogo-menu li.menu-active > a,.main-header .main-header-bar a:hover,.gogo-menu .content-social .social-icon li a:hover,.mhdrleftpan .content-social .social-icon a:hover, .mhdrrightpan .content-social .social-icon a:hover{color:{$gogo_theme_clr}}
  .page-numbers.current, .page-numbers:hover, .prev.page-numbers:hover, .next.page-numbers:hover, #load-more-posts:hover{border-color:{$gogo_theme_clr}} #respond.comment-respond #submit,.read-more .zta-button, button,[type='submit'],.woocommerce #respond input#submit, 
.woocommerce a.button,
.woocommerce button.button, 
.woocommerce input.button,.woocommerce #respond input#submit, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button, .woocommerce #respond input#submit.alt, .woocommerce a.button.alt, .woocommerce button.button.alt, .woocommerce input.button.alt,.gogo-cart p.buttons a,.wc-proceed-to-checkout .button.alt.wc-forward,.main-header .main-header-bar a.main-header-btn{border-color:{$gogo_theme_clr};background-color:{$gogo_theme_clr}} #move-to-top.animate filling,.gogo-date-meta .posted-on,.mhdrleftpan .header-pan-icon span,.mhdrrightpan .header-pan-icon span{background:{$gogo_theme_clr}}.inifiniteLoader{color:{$gogo_theme_clr}}
  .gogo_overlayloader{background:{$gogo_loader_bg_clr}} .woocommerce ul.products li.product .onsale, .woocommerce span.onsale,.woocommerce .widget_price_filter .ui-slider .ui-slider-range,
.woocommerce .widget_price_filter .ui-slider .ui-slider-handle{background:{$gogo_theme_clr}}
.cart-contents .cart-crl{background:{$gogo_theme_clr}}.cart-crl:before{border-color:{$gogo_theme_clr}}
";
//link-color
$gogo_style .= "a,.single .nav-previous:before,.single .nav-next:after,.gogo-menu li a,.main-header .gogo-menu > li > a{color:{$gogo_link_clr}}";
//link-hover-color
  $gogo_style .= "a:hover,.single .nav-previous:hover:before,.single .nav-next:hover:after,article h2.entry-title a:hover,.gogo-menu li a:hover,.main-header .gogo-menu > li > a:hover,.gogo-menu li.menu-active > a,.main-header .main-header-bar a:hover,.gogo-menu .content-social .social-icon li a:hover,.mhdrleftpan .content-social .social-icon a:hover, .mhdrrightpan .content-social .social-icon a:hover{color:{$gogo_link_hvr_clr}}";
//body-text-color
  $gogo_style .= "body,.gogo-site #content .entry-meta{color:{$gogo_text_clr}}";
//title-color
  $gogo_style .= "article h2.entry-title a,#sidebar-primary h4.widget-title,.woocommerce h1.product_title, .woocommerce-Tabs-panel h2, .related.products h2, section.up-sells h2, .cross-sells h2, .cart_totals h2, .woocommerce-billing-fields h3, .woocommerce-account .addresses .title h3,h1.page-title, h1.entry-title{color:{$gogo_title_clr}}";
//pagination
    $gogo_style .= ".next.page-numbers, .prev.page-numbers,.page-numbers{border: 1px solid {$gogo_theme_clr};
    background:{$gogo_theme_clr};}";
//**********************/
// Site Button Style 
//**********************/   
$gogo_button_txt_clr       = get_theme_mod('gogo_button_txt_clr','');
$gogo_button_txt_hvr_clr   = get_theme_mod('gogo_button_txt_hvr_clr','');
$gogo_button_bg_clr        = get_theme_mod('gogo_button_bg_clr','');
$gogo_button_bg_hvr_clr    = get_theme_mod('gogo_button_bg_hvr_clr','');
$gogo_button_border_radius    = get_theme_mod('gogo_button_border_radius','30');
$gogo_style .=".menu-custom-html > a button,.read-more .zta-button,#respond.comment-respond #submit,button,[type='submit'],.woocommerce #respond input#submit, 
.woocommerce a.button,
.woocommerce button.button, 
.woocommerce input.button,.woocommerce #respond input#submit.alt,
 .woocommerce a.button.alt,
 .woocommerce button.button.alt,
  .woocommerce input.button.alt,.gogo-cart p.buttons a,.wc-proceed-to-checkout .button.alt.wc-forward,.main-header .main-header-bar a.main-header-btn{background:{$gogo_button_bg_clr};
color:{$gogo_button_txt_clr};border-color:{$gogo_button_bg_clr};} 
.menu-custom-html > a button,.read-more .zta-button,#respond.comment-respond #submit,button,[type='submit'],.woocommerce #respond input#submit, 
.woocommerce a.button,
.woocommerce button.button, 
.woocommerce input.button,.woocommerce #respond input#submit.alt,
 .woocommerce a.button.alt,
 .woocommerce button.button.alt,
  .woocommerce input.button.alt,.main-header .main-header-bar a.main-header-btn{border-radius:{$gogo_button_border_radius}px;}
.menu-custom-html > a button:hover,.read-more .zta-button:hover,#respond.comment-respond #submit:hover,button:hover,[type='submit']:hover,.woocommerce #respond input#submit:hover, .woocommerce a.button:hover,.woocommerce button.button:hover, .woocommerce input.button:hover,.woocommerce #respond input#submit.alt:hover,
 .woocommerce a.button.alt:hover,
 .woocommerce button.button.alt:hover,
  .woocommerce input.button.alt:hover,.gogo-cart p.buttons a:hover,.main-header .main-header-bar a.main-header-btn:hover{background:{$gogo_button_bg_hvr_clr};
color:{$gogo_button_txt_hvr_clr}; border-color:{$gogo_button_bg_hvr_clr}}";
// load more 
$gogo_style .=".gogo-load-more #load-more-posts:hover{
  color:{$gogo_theme_clr};
  border-color:{$gogo_theme_clr};
}";
/********************/
// Header transparent 
/*********************/
$gogo_style .=".mhdrleft.gogo-transparent-header .top-header-bar,.mhdrleft.gogo-transparent-header .main-header-bar,.mhdrleft.gogo-transparent-header .bottom-header-bar,.gogo-site .mhdrleft.gogo-transparent-header .main-header-bar:before{
background:transparent;
}
.mhdrright.gogo-transparent-header .top-header-bar,.mhdrright.gogo-transparent-header .main-header-bar,.mhdrright.gogo-transparent-header .bottom-header-bar,.gogo-site .mhdrright.gogo-transparent-header .main-header-bar:before{
background:transparent;
}
.mhdrcenter.gogo-transparent-header .top-header-bar,.mhdrcenter.gogo-transparent-header .main-header-bar,.mhdrcenter.gogo-transparent-header .bottom-header-bar,.gogo-site .mhdrcenter.gogo-transparent-header .main-header-bar:before{
background:transparent;}";
  //header border
    $gogo_main_hdr_botm_brd = get_theme_mod('gogo_main_hdr_botm_brd','0');
    $gogo_main_brdr_clr = get_theme_mod('gogo_main_brdr_clr','#eee');
    $gogo_style .= ".main-header-bar{border-bottom-width:{$gogo_main_hdr_botm_brd}px;}.main-header-bar{border-bottom-color:{$gogo_main_brdr_clr}}";
  //container
    $gogo_conatiner_width  = get_theme_mod('gogo_conatiner_width','1280');
    $gogo_style.="header .container,#container.site-
    container,footer .container,#content #container,#content.site-content.boxed #container,
#content.site-content.contentbox #container,
#content.site-content.fullwidthcontained #container{max-width:{$gogo_conatiner_width}px;}";
    //header fullwidth
    $gogo_main_header_width_full = get_theme_mod('gogo_main_header_width_full',false);
    if($gogo_main_header_width_full==true){
       $gogo_style.="header .container{max-width:100%!important}"; 
    } 
    /**************************/
    // Above Header
    /**************************/
    $gogo_abv_hdr_hgt = get_theme_mod('gogo_abv_hdr_hgt','40');
    $gogo_abv_hdr_botm_brd = get_theme_mod('gogo_abv_hdr_botm_brd','0');
    $gogo_above_brdr_clr = get_theme_mod('gogo_above_brdr_clr','#eee');
    $gogo_style.=".top-header-container{line-height:{$gogo_abv_hdr_hgt}px;}.top-header-bar{border-bottom-width:{$gogo_abv_hdr_botm_brd}px;}.top-header-bar{border-bottom-color:{$gogo_above_brdr_clr}}";
    /**************************/
    // Bottom Header
    /**************************/
    $gogo_bottom_hdr_hgt = get_theme_mod('gogo_bottom_hdr_hgt','40');
    $gogo_bottom_hdr_botm_brd = get_theme_mod('gogo_bottom_hdr_botm_brd','0');
    $gogo_bottom_brdr_clr = get_theme_mod('gogo_bottom_brdr_clr','#eee');
    $gogo_style.=".bottom-header-container{line-height:{$gogo_bottom_hdr_hgt}px;}
   .bottom-header-bar{border-bottom-width:{$gogo_bottom_hdr_botm_brd}px;}.bottom-header-bar{border-bottom-color:{$gogo_bottom_brdr_clr}}";
    // top footer height
    $gogo_abve_ftr_hgt = get_theme_mod('gogo_abve_ftr_hgt','40');
    $gogo_abv_ftr_botm_brd = get_theme_mod('gogo_abv_ftr_botm_brd','1');
    $gogo_above_frt_brdr_clr = get_theme_mod('gogo_above_frt_brdr_clr','#eee');
    $gogo_style.=".top-footer-container{line-height:{$gogo_abve_ftr_hgt}px;}
   .top-footer-bar{border-bottom-width:{$gogo_abv_ftr_botm_brd}px;}.top-footer-bar{border-bottom-color:{$gogo_above_frt_brdr_clr}}";
    // top footer height
    $gogo_btm_ftr_hgt = get_theme_mod('gogo_btm_ftr_hgt','100');
    $gogo_btm_ftr_botm_brd = get_theme_mod('gogo_btm_ftr_botm_brd','1');
    $gogo_bottom_frt_brdr_clr = get_theme_mod('gogo_bottom_frt_brdr_clr','#eee');
    $gogo_style.=".bottom-footer-container{line-height:{$gogo_btm_ftr_hgt}px;}
   .bottom-footer-bar{border-top-width:{$gogo_btm_ftr_botm_brd}px;}.bottom-footer-bar{border-top-color:{$gogo_bottom_frt_brdr_clr}}";
/****************/
// sidebar width
/****************/
    $gogo_sidebar_width = get_theme_mod('gogo_sidebar_width','35');
    $gogo_primary_width = absint( 100 - $gogo_sidebar_width);
    $gogo_style.=".site-content #sidebar-primary{width:{$gogo_sidebar_width}%}";
    $gogo_style.=".site-content #primary{width:{$gogo_primary_width}%}";
    /************************/
    //blog archive/setting
    /************************/
    $gogo_blog_content_width = get_theme_mod('gogo_blog_content_width','defualt');
    if($gogo_blog_content_width=='custom'){
    $gogo_blog_cnt_widht = get_theme_mod('gogo_blog_cnt_widht','1200');
    $gogo_style.=".blog #content #container.site-container,.archive #content #container.site-container{max-width:{$gogo_blog_cnt_widht}px;}";   
    }
    /************************/
   // blog drop cap
   /************************/
 $gogo_blog_dropcap = get_theme_mod('gogo_blog_dropcap');
 if($gogo_blog_dropcap){
  $gogo_style .=".blog article .entry-content p:first-child:first-letter{
                color: {$gogo_theme_clr};
                float: left;
                font-family: Georgia;
                font-size: 75px;
                line-height: 60px;
                padding-top: 4px;
                padding-right: 15px;
                padding-left: 0px;
                text-shadow: 3px 3px 0 rgba(56, 60, 80, 0.12);
              }";
$gogo_body_font = get_theme_mod('gogo_body_font');
if(!empty($gogo_body_font)){
gogo_enqueue_google_font($gogo_body_font);
$gogo_style .=".blog article .entry-content p:first-child:first-letter{
  font-family: {$gogo_body_font};
}";
   }           
  }
  // single post drop cap
 $gogo_single_drop_cap = get_theme_mod('gogo_single_drop_cap');
 if($gogo_single_drop_cap){
  $gogo_style .=".single-post article .entry-content p:first-child:first-letter{
                color:{$gogo_theme_clr};
                float: left;
                font-family: Georgia;
                font-size: 75px;
                line-height: 60px;
                padding-top: 4px;
                padding-right: 15px;
                padding-left: 0px;
                text-shadow: 3px 3px 0 rgba(56, 60, 80, 0.12);
              }";
$gogo_body_font = get_theme_mod('gogo_body_font');
if(!empty($gogo_body_font)){
gogo_enqueue_google_font($gogo_body_font);
$gogo_style .=".single-post article .entry-content p:first-child:first-letter{
  font-family: {$gogo_body_font};
}";
}
  }
if(get_theme_mod('gogo_single_post_content_width')=='custom'):
    $gogo_sngle_cnt_widht = get_theme_mod('gogo_sngle_cnt_widht','1200');
    $gogo_style.="#content.site-content.blog-single.boxed #container,
    .boxed #content.site-content.blog-single #container, #content.site-content.blog-single.contentbox #container,
    .contentbox #content.site-content.blog-single #container, #content.site-content.blog-single.fullwidthcontained #container,
    .fullwidthcontained #content.site-content.blog-single #container{max-width:{$gogo_sngle_cnt_widht}px;}";
endif;
/******************************************/    
// Woocommerce single product content width
/******************************************/
if((class_exists( 'WooCommerce' )) && (get_theme_mod('gogo_single_product_content_width')=='custom')):
    $gogo_product_cnt_widht = get_theme_mod('gogo_product_cnt_widht','1200');
    $gogo_style.=".single-product.woocommerce #content.site-content.product #container{max-width:{$gogo_product_cnt_widht}px;}";
endif;
/************************/    
// scroll to top button
/************************/  
$gogo_scroll_to_top_option = get_theme_mod('gogo_scroll_to_top_option','right');
$gogo_scroll_to_top_icon_radius = get_theme_mod('gogo_scroll_to_top_icon_radius','2');
$gogo_scroll_to_top_icon_clr = get_theme_mod('gogo_scroll_to_top_icon_clr','#fff');
$gogo_scroll_to_top_icon_bg_clr = get_theme_mod('gogo_scroll_to_top_icon_bg_clr','#1ce225');
$gogo_scroll_to_top_icon_hvr_clr = get_theme_mod('gogo_scroll_to_top_icon_hvr_clr','#fff');
$gogo_scroll_to_top_icon_bghvr_clr = get_theme_mod('gogo_scroll_to_top_icon_bghvr_clr','#1ce225');
if($gogo_scroll_to_top_option=='left'){
   $gogo_style.="#move-to-top{left:30px; right:auto;}";  
}
$gogo_style.="#move-to-top{ border-radius:{$gogo_scroll_to_top_icon_radius}px;-moz-border-radius:{$gogo_scroll_to_top_icon_radius}px;-webkit-border-radius:{$gogo_scroll_to_top_icon_radius}px; color:{$gogo_scroll_to_top_icon_clr}; background:{$gogo_scroll_to_top_icon_bg_clr}} #move-to-top:hover{color:{$gogo_scroll_to_top_icon_hvr_clr}; background:{$gogo_scroll_to_top_icon_bghvr_clr};}"; 
/********************/
// Search-Button
/********************/
$gogo_search_icon_font_size = get_theme_mod('gogo_search_icon_font_size','15');
$gogo_search_icon_radius    = get_theme_mod('gogo_search_icon_radius','');
$gogo_search_icon_clr       = get_theme_mod('gogo_search_icon_clr','');
$gogo_search_icon_brd_clr   = get_theme_mod('gogo_search_icon_brd_clr','');
$gogo_search_icon_bg_clr    = get_theme_mod('gogo_search_icon_bg_clr','');
$gogo_search_icon_hvr_clr    = get_theme_mod('gogo_search_icon_hvr_clr','');
$gogo_style.=".searchfrom .search-btn{font-size:{$gogo_search_icon_font_size}px; border-radius:{$gogo_search_icon_radius}px;} .top-header-bar .searchfrom .search-btn,.main-header-bar .searchfrom .search-btn,.bottom-header-bar .searchfrom .search-btn ,.gogo-menu .menu-custom-search .searchfrom a{color:{$gogo_search_icon_clr}; background:{$gogo_search_icon_bg_clr}; border-color:{$gogo_search_icon_brd_clr}}
.top-header-bar .searchfrom .search-btn:hover,.main-header-bar .searchfrom .search-btn:hover,.bottom-header-bar .searchfrom .search-btn:hover{color:{$gogo_search_icon_hvr_clr}}
";
/********************/
// Search-box
/********************/
$gogo_search_box_icon_width  = get_theme_mod('gogo_search_box_icon_width','100');
$gogo_search_box_icon_height = get_theme_mod('gogo_search_box_icon_height','');
$gogo_search_box_radius      = get_theme_mod('gogo_search_box_radius','0');
$gogo_search_box_icon_size   = get_theme_mod('gogo_search_box_icon_size','');
$gogo_social_box_bg_clr      = get_theme_mod('gogo_social_box_bg_clr','');
$gogo_social_box_icon_clr    = get_theme_mod('gogo_social_box_icon_clr','#1ce225');
$gogo_social_box_brdr_clr         = get_theme_mod('gogo_social_box_brdr_clr','');
$gogo_social_box_plc_holdr_clr    = get_theme_mod('gogo_social_box_plc_holdr_clr','#bbb');
$gogo_search_box_plc_txt_size    = get_theme_mod('gogo_search_box_plc_txt_size');
$gogo_style.=".widget-area #searchform .form-content,.searchfrom #searchform .form-content{width:{$gogo_search_box_icon_width}%;} .widget-area #searchform .form-content:before,.searchfrom #searchform .form-content:before{color:{$gogo_social_box_icon_clr}; font-size:{$gogo_search_box_icon_size}px;} .widget-area input#s,.searchfrom #searchform input#s{background-color:{$gogo_social_box_bg_clr}; border-color:{$gogo_social_box_brdr_clr};} .widget-area #searchform input[type=submit],.widget-area input#s,.widget-area #searchform .form-content:before,.searchfrom #searchform .form-content:before,.searchfrom input#s,.searchfrom #searchform input[type=submit]{height:{$gogo_search_box_icon_height}px; line-height:{$gogo_search_box_icon_height}px; border-radius:{$gogo_search_box_radius}px;} .form-content input#s::-webkit-input-placeholder, .form-content input#s{color:{$gogo_social_box_plc_holdr_clr}; font-size:{$gogo_search_box_plc_txt_size}px;}";
/*****************/
//footer widget
/*****************/
$gogo_footer_widget_content_width  = get_theme_mod('gogo_footer_widget_content_width','content-width');
if($gogo_footer_widget_content_width=='full-width'):
$gogo_style.=".footer-wrap .widget-footer-bar .container{max-width:100%;}";
endif;


/************************************************************************/
/****************************Only Lite Feafure**************************/
/************************************************************************/
/********************************/
//Above Header Color Scheme
/********************************/
$gogo_above_color_scheme  = get_theme_mod('gogo_above_color_scheme','abv-default');
if($gogo_above_color_scheme =='abv-dark'):
$gogo_style.=".top-header .top-header-bar,.mhdrleft.gogo-transparent-header.shrink .top-header-bar,.mhdrcenter.gogo-transparent-header.shrink .top-header-bar,.mhdrright.gogo-transparent-header.shrink .top-header-bar{background:#333} 
.top-header .content-html,.top-header .gogo-menu > li > a,.top-header .content-widget,.top-header .top-header-bar .widget-title, .top-header .top-header-bar a{color:#fff}"; 
$gogo_style.=".top-header .top-header-bar a:hover{color:{$gogo_theme_clr}} .top-header .top-header-bar a:hover{color:{$gogo_link_hvr_clr}} .top-header .top-header-bar .gogo-menu li ul.sub-menu li a{color:#9c9c9c;}";
$gogo_style.="@media screen and (max-width: 1024px){
.top-header .top-header-bar .sider.left,.top-header .top-header-bar .sider.right,.top-header .top-header-bar .right .menu-close,.top-header .top-header-bar .left .menu-close{background:#333}
}";
endif;
if($gogo_above_color_scheme =='abv-default'):
$gogo_style.=".top-header .top-header-bar a{color:#9c9c9c} .top-header .top-header-bar a:hover{color:{$gogo_theme_clr}} .top-header .top-header-bar a:hover{color:{$gogo_link_hvr_clr}}.mhdrleft.gogo-transparent-header.shrink .top-header-bar,.mhdrcenter.gogo-transparent-header.shrink .top-header-bar,.mhdrright.gogo-transparent-header.shrink .top-header-bar{background:#fff}";
endif;
/********************************/
//Main Header Color Scheme
/********************************/
$header_url = get_theme_mod('header_image');
$gogo_main_color_scheme  = get_theme_mod('gogo_main_color_scheme','main-dark');
if($gogo_main_color_scheme =='main-dark'):
$gogo_style.=".main-header .main-header-bar,.mhdrleftpan header,.mhdrrightpan header,.mhdrleft.gogo-transparent-header.shrink .main-header-bar,.mhdrcenter.gogo-transparent-header.shrink .main-header-bar,.mhdrright.gogo-transparent-header.shrink .main-header-bar{background-color:#333; background-image:url('$header_url');} .main-header-bar p,.main-header .gogo-menu > li > a, .main-header .menu-custom-html, .main-header .menu-custom-widget,.main-header .widget-title, header.mhdrleftpan p,header.mhdrrightpan p,header.mhdrleftpan .widget-title,header.mhdrrightpan .widget-title,header.mhdrrightpan .content-html,header.mhdrleftpan .content-html,.mhdrrightpan .gogo-menu a,.mhdrleftpan .gogo-menu a,.mhdrleftpan .content-widget,.mhdrrightpan .content-widget,.main-header .main-header-bar a,.gogo-menu .content-social .social-icon li a,.mhdrleftpan .content-social .social-icon a, .mhdrrightpan .content-social .social-icon a,.cart-pan-active header.mhdrleftpan .gogo-cart,.cart-pan-active header.mhdrrightpan .gogo-cart,.gogo-cart,.mhdrrightpan .gogo-menu a, .mhdrleftpan .gogo-menu a,.mhdrrightpan .bottom-header .bottom-header-bar a,.mhdrleftpan .bottom-header .bottom-header-bar a{color:#fff} .gogo-site .main-header-bar:before,header.mhdrrightpan:before,header.mhdrleftpan:before,.mhdrleft.gogo-transparent-header.shrink .main-header-bar:before,.mhdrcenter.gogo-transparent-header.shrink .main-header-bar:before,.mhdrright.gogo-transparent-header.shrink .main-header-bar:before{background:#333;opacity:0.7} .cart-pan-active header.mhdrleftpan .gogo-cart,.cart-pan-active header.mhdrrightpan .gogo-cart,.cart-close .cart-close-btn,.gogo-cart{background:#333;}.gogo-cart p.buttons a.checkout{
background:transparent;
border-color:#fff;
color:#fff;
}"; 
$gogo_style.="@media screen and (max-width: 1024px){
.main-header .sider.left,.main-header .sider.right,.main-header .left .menu-close,.main-header .right .menu-close,.mobile-menu-active .sider.overcenter {background-color: #333;} .main-header .menu-close-btn{color: #bbb;} .main-header .gogo-menu li a{color:#fff}}";
else:
$gogo_style.=".main-header .main-header-bar,.mhdrleftpan header,.mhdrrightpan header,.mhdrleft.gogo-transparent-header.shrink .main-header-bar,.mhdrcenter.gogo-transparent-header.shrink .main-header-bar,.mhdrright.gogo-transparent-header.shrink .main-header-bar{background-color:#fff; background-image:url('$header_url');} .gogo-site .main-header-bar:before,header.mhdrrightpan:before,header.mhdrleftpan:before,.mhdrleft.gogo-transparent-header.shrink .main-header-bar:before,.mhdrcenter.gogo-transparent-header.shrink .main-header-bar:before,.mhdrright.gogo-transparent-header.shrink .main-header-bar:before{background:#fff;opacity:0.7}
.main-header-bar p,.main-header .gogo-menu > li > a, .main-header .menu-custom-html, .main-header .menu-custom-widget,.main-header .widget-title, header.mhdrleftpan p,header.mhdrrightpan p,header.mhdrleftpan .widget-title,header.mhdrrightpan .widget-title,header.mhdrrightpan .content-html,header.mhdrleftpan .content-html,.mhdrrightpan .gogo-menu a,.mhdrleftpan .gogo-menu a,.mhdrleftpan .content-widget,.mhdrrightpan .content-widget,header.mhdrleftpan .top-header .top-header-bar .widget-title,header.mhdrrightpan .top-header .top-header-bar .widget-title,.mhdrrightpan .gogo-menu li a, .mhdrleftpan .gogo-menu li a,.mhdrrightpan .bottom-header .gogo-menu > li > a,.mhdrleftpan .bottom-header .gogo-menu > li > a{color:#555} .main-header .main-header-bar a,.mhdrleftpan .content-social .social-icon a, .mhdrrightpan .content-social .social-icon a,.gogo-menu .content-social .social-icon li a{color:#9c9c9c}
  .main-header .main-header-bar a:hover{color:{$gogo_link_hvr_clr}}.gogo-cart p.buttons a.checkout{
background:transparent;
border-color:#9c9c9c;
color:#9c9c9c;
}";
endif;
/********************************/
//Bottom Header Color Scheme
/********************************/
$gogo_bottom_color_scheme  = get_theme_mod('gogo_bottom_color_scheme','btm-default');
if($gogo_bottom_color_scheme =='btm-dark'):
$gogo_style.=".bottom-header .bottom-header-bar,.mhdrleft.gogo-transparent-header.shrink .bottom-header-bar,.mhdrcenter.gogo-transparent-header.shrink .bottom-header-bar,.mhdrright.gogo-transparent-header.shrink .bottom-header-bar{background:#333} .bottom-header .content-html,.bottom-header .gogo-menu > li > a,.bottom-header .content-widget,.bottom-header .bottom-header-bar .widget-title,.bottom-header .bottom-header-bar a{color:#fff} .bottom-header .bottom-header-bar .gogo-menu li ul.sub-menu li a{color:#9c9c9c}"; 
$gogo_style.=".bottom-header .bottom-header-bar a:hover{color:{$gogo_theme_clr}} .bottom-header .bottom-header-bar a:hover{color:{$gogo_link_hvr_clr}}";
$gogo_style.="@media screen and (max-width: 1024px){
.bottom-header .bottom-header-bar .sider.left,.bottom-header .bottom-header-bar .sider.right,.bottom-header .bottom-header-bar .right .menu-close,.bottom-header .bottom-header-bar .left .menu-close{background:#333}
}";
endif;
if($gogo_bottom_color_scheme =='btm-default'):
$gogo_style.=".bottom-header .bottom-header-bar a{color:#9c9c9c} .bottom-header .bottom-header-bar a:hover{color:{$gogo_theme_clr}} .bottom-header .bottom-header-bar a:hover{color:{$gogo_link_hvr_clr}}.mhdrleft.gogo-transparent-header.shrink .bottom-header-bar,.mhdrcenter.gogo-transparent-header.shrink .bottom-header-bar,.mhdrright.gogo-transparent-header.shrink .bottom-header-bar{background:#fff;}";
endif;
/********************************/
//Above Footer Color Scheme
/********************************/
$gogo_above_footer_color_scheme  = get_theme_mod('gogo_above_footer_color_scheme');
if($gogo_above_footer_color_scheme =='abv-dark'):
$gogo_style.=".top-footer .top-footer-bar{background:#333} .top-footer .content-html,.top-footer .gogo-menu > li > a,.top-footer .content-widget,.top-footer .top-footer-bar .widget-title,.gogo-bottom-menu li a,.top-footer .top-footer-bar a{color:#fff}"; 
$gogo_style.=".top-footer .top-footer-bar a:hover{color:{$gogo_theme_clr}} .top-footer .top-footer-bar a:hover{color:{$gogo_link_hvr_clr}}";
endif;
if($gogo_above_footer_color_scheme =='abv-default'):
$gogo_style.=".top-footer .top-footer-bar a{color:#9c9c9c} .top-footer .top-footer-bar a:hover{color:{$gogo_theme_clr}} .top-footer .top-footer-bar a:hover{color:{$gogo_link_hvr_clr}}";
endif;
/********************************/
//Widget Footer Color Scheme
/********************************/
$gogo_bottom_footer_widget_color_scheme  = get_theme_mod('gogo_bottom_footer_widget_color_scheme');
if($gogo_bottom_footer_widget_color_scheme =='ft-wgt-dark'):
$gogo_style.=".widget-footer .widget-footer-bar{background:#333} .widget-footer .widget-footer-bar .widget-title,.widget-footer .widget-footer-bar ,.widget-footer .widget-footer-bar a{color:#fff}"; 
$gogo_style.=".widget-footer .widget-footer-bar a:hover{color:{$gogo_theme_clr}} .widget-footer .widget-footer-bar a:hover{color:{$gogo_link_hvr_clr}}";
endif;
if($gogo_bottom_footer_widget_color_scheme =='ft-wgt-default'):
$gogo_style.=".widget-footer .widget-footer-bar a{color:#9c9c9c} .widget-footer .widget-footer-bar a:hover{color:{$gogo_theme_clr}} .widget-footer .widget-footer-bar a:hover{color:{$gogo_link_hvr_clr}}";
endif;
/********************************/
//Footer Bottom Color Scheme
/********************************/
$gogo_bottom_footer_color_scheme  = get_theme_mod('gogo_bottom_footer_color_scheme');
if($gogo_bottom_footer_color_scheme =='ft-btm-dark'):
$gogo_style.=".bottom-footer .bottom-footer-bar{background:#333} .bottom-footer .content-html,.bottom-footer .gogo-menu > li > a,.bottom-footer .content-widget,.bottom-footer .bottom-footer-bar .widget-title,.gogo-bottom-menu li a,.bottom-footer .bottom-footer-bar a{color:#fff}"; 
$gogo_style.=".bottom-footer .bottom-footer-bar a:hover{color:{$gogo_theme_clr}} .bottom-footer .bottom-footer-bar a:hover{color:{$gogo_link_hvr_clr}}";
endif; 
if($gogo_bottom_footer_color_scheme =='ft-btm-default'):
$gogo_style.=".bottom-footer .bottom-footer-bar a{color:#9c9c9c} .bottom-footer .bottom-footer-bar a:hover{color:{$gogo_theme_clr}} .bottom-footer .bottom-footer-bar a:hover{color:{$gogo_link_hvr_clr}}";
endif;
/*************************************/
//Woocommerce Add to Cart Color Scheme
/*************************************/
$gogo_woo_cart_color_scheme  = get_theme_mod('gogo_woo_cart_color_scheme');
if($gogo_woo_cart_color_scheme =='woo-cart-dark'):
$gogo_style.=".gogo-cart{background:#333;color:#fff;}
.gogo-cart ul.cart_list li a,.gogo-cart p.total, .widget p.total{
color:#fff;
}";
endif;
/*************************/   
// container (// site-layout)
/*************************/
    $gogo_container_site_layout  = get_theme_mod('gogo_container_site_layout','fullwidth');
    $gogo_conatiner_width        = get_theme_mod('gogo_conatiner_width','1280');
    // max-width
    $gogo_conatiner_maxwidth     = get_theme_mod('gogo_conatiner_maxwidth','1200');
    $gogo_conatiner_top_bottom_margin = get_theme_mod('gogo_conatiner_top_bottom_margin','');
    if($gogo_container_site_layout=='fullwidth'){
    $gogo_style.="header .container,#container.site-
    container,footer .container,#content #container,
    .thunk-gogo-frontpage .container{max-width:{$gogo_conatiner_width}px;}";
    }
    else if($gogo_container_site_layout=='maxwidth'){
    $gogo_style.="#page.gogo-site,header.shrink{max-width:{$gogo_conatiner_maxwidth}px; margin:{$gogo_conatiner_top_bottom_margin}px auto;}.maxwidth #content #container, .maxwidth .container{max-width:{$gogo_conatiner_maxwidth}px;}";
    } 
return $gogo_style;
} 
//start logo width
function gogo_logo_width_responsive( $value, $dimension = 'desktop' ){
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
  $custom_css .= '.gogo-logo img{
    max-width: ' . $v3 . 'px;
  }';
  $custom_css = gogo_add_media_query( $dimension, $custom_css );
  return $custom_css;
}
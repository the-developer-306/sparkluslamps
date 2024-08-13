/**
 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and 
 * then make any necessary changes to the page using jQuery.
 */
(jQuery(function( $){
/**
 * Dynamic Internal/Embedded Style for a Control
 */
function gogo_add_dynamic_css( control, style ){
      control = control.replace( '[', '-' );
      control = control.replace( ']', '' );
      jQuery( 'style#' + control ).remove();

      jQuery( 'head' ).append(
            '<style id="' + control + '">' + style + '</style>'
      );
}
/**
 * Responsive Spacing CSS
 */
function gogo_responsive_spacing( control, selector, type, side ){
    wp.customize( control, function( value ){
        value.bind( function( value ){
            var sidesString = "";
            var spacingType = "padding";
            if ( value.desktop.top || value.desktop.right || value.desktop.bottom || value.desktop.left || value.tablet.top || value.tablet.right || value.tablet.bottom || value.tablet.left || value.mobile.top || value.mobile.right || value.mobile.bottom || value.mobile.left ) {
                if ( typeof side != undefined ) {
                    sidesString = side + "";
                    sidesString = sidesString.replace(/,/g , "-");
                }
                if ( typeof type != undefined ) {
                    spacingType = type + "";
                }
                // Remove <style> first!
                control = control.replace( '[', '-' );
                control = control.replace( ']', '' );
                jQuery( 'style#' + control + '-' + spacingType + '-' + sidesString ).remove();

                var desktopPadding = '',
                    tabletPadding = '',
                    mobilePadding = '';

                var paddingSide = ( typeof side != undefined ) ? side : [ 'top','bottom','right','left' ];

                jQuery.each(paddingSide, function( index, sideValue ){
                    if ( '' != value['desktop'][sideValue] ) {
                        desktopPadding += spacingType + '-' + sideValue +': ' + value['desktop'][sideValue] + value['desktop-unit'] +';';
                    }
                });

                jQuery.each(paddingSide, function( index, sideValue ){
                    if ( '' != value['tablet'][sideValue] ) {
                        tabletPadding += spacingType + '-' + sideValue +': ' + value['tablet'][sideValue] + value['tablet-unit'] +';';
                    }
                });

                jQuery.each(paddingSide, function( index, sideValue ){
                    if ( '' != value['mobile'][sideValue] ) {
                        mobilePadding += spacingType + '-' + sideValue +': ' + value['mobile'][sideValue] + value['mobile-unit'] +';';
                    }
                });

                // Concat and append new <style>.
                jQuery( 'head' ).append(
                    '<style id="' + control + '-' + spacingType + '-' + sidesString + '">'
                    + selector + '  { ' + desktopPadding +' }'
                    + '@media (max-width: 768px) {' + selector + '  { ' + tabletPadding + ' } }'
                    + '@media (max-width: 544px) {' + selector + '  { ' + mobilePadding + ' } }'
                    + '</style>'
                );

            } else {
                wp.customize.preview.send( 'refresh' );
                jQuery( 'style#' + control + '-' + spacingType + '-' + sidesString ).remove();
            }

        } );
    } );
}
/**
 * Apply CSS for the element
 */
function gogo_css( control, css_property, selector, unit ){

    wp.customize( control, function( value ) {
        value.bind( function( new_value ) {

            // Remove <style> first!
            control = control.replace( '[', '-' );
            control = control.replace( ']', '' );

            if ( new_value ){
                /**
                 *  If ( unit == 'url' ) then = url('{VALUE}')
                 *  If ( unit == 'px' ) then = {VALUE}px
                 *  If ( unit == 'em' ) then = {VALUE}em
                 *  If ( unit == 'rem' ) then = {VALUE}rem.
                 */
                if ( 'undefined' != typeof unit) {
                    if ( 'url' === unit ) {
                        new_value = 'url(' + new_value + ')';
                    } else {
                        new_value = new_value + unit;
                    }
                }

                // Remove old.
                jQuery( 'style#' + control ).remove();

                // Concat and append new <style>.
                jQuery( 'head' ).append(
                    '<style id="' + control + '">'
                    + selector + '  { ' + css_property + ': ' + new_value + ' }'
                    + '</style>'
                );

            } else {

                wp.customize.preview.send( 'refresh' );

                // Remove old.
                jQuery( 'style#' + control ).remove();
            }

        } );
    } );
}
/*******************************/
// Range slider live customizer
/*******************************/
function gogoGetCss( arraySizes, settings, to ) {
    'use strict';
    var data, desktopVal, tabletVal, mobileVal,
        className = settings.styleClass, i = 1;

    var val = JSON.parse( to );
    if ( typeof( val ) === 'object' && val !== null ) {
        if ('desktop' in val) {
            desktopVal = val.desktop;
        }
        if ('tablet' in val) {
            tabletVal = val.tablet;
        }
        if ('mobile' in val) {
            mobileVal = val.mobile;
        }
    }

    for ( var key in arraySizes ) {
        // skip loop if the property is from prototype
        if ( ! arraySizes.hasOwnProperty( key )) {
            continue;
        }
        var obj = arraySizes[key];
        var limit = 0;
        var correlation = [1,1,1];
        if ( typeof( val ) === 'object' && val !== null ) {

            if( typeof obj.limit !== 'undefined'){
                limit = obj.limit;
            }

            if( typeof obj.correlation !== 'undefined'){
                correlation = obj.correlation;
            }

            data = {
                desktop: ( parseInt(parseFloat( desktopVal ) / correlation[0]) + obj.values[0]) > limit ? ( parseInt(parseFloat( desktopVal ) / correlation[0]) + obj.values[0] ) : limit,
                tablet: ( parseInt(parseFloat( tabletVal ) / correlation[1]) + obj.values[1] ) > limit ? ( parseInt(parseFloat( tabletVal ) / correlation[1]) + obj.values[1] ) : limit,
                mobile: ( parseInt(parseFloat( mobileVal ) / correlation[2]) + obj.values[2] ) > limit ? ( parseInt(parseFloat( mobileVal ) / correlation[2]) + obj.values[2] ) : limit
            };
        } else {
            if( typeof obj.limit !== 'undefined'){
                limit = obj.limit;
            }

            if( typeof obj.correlation !== 'undefined'){
                correlation = obj.correlation;
            }
            data =( parseInt( parseFloat( to ) / correlation[0] ) ) + obj.values[0] > limit ? ( parseInt( parseFloat( to ) / correlation[0] ) ) + obj.values[0] : limit;
        }
        settings.styleClass = className + '-' + i;
        settings.selectors  = obj.selectors;

        gogoSetCss( settings, data );
        i++;
    }
}
function gogoSetCss( settings, to ){
    'use strict';
    var result     = '';
    var styleClass = jQuery( '.' + settings.styleClass );
    if ( to !== null && typeof to === 'object' ) {
        jQuery.each(
            to, function ( key, value ) {
                var style_to_add;
                if ( settings.selectors === '.container' ) {
                    style_to_add = settings.selectors + '{ ' + settings.cssProperty + ':' + value + settings.propertyUnit + '; max-width: 100%; }';
                } else {
                    style_to_add = settings.selectors + '{ ' + settings.cssProperty + ':' + value + settings.propertyUnit + '}';
                }
                switch ( key ) {
                    case 'desktop':
                        result += style_to_add;
                        break;
                    case 'tablet':
                        result += '@media (max-width: 767px){' + style_to_add + '}';
                        break;
                    case 'mobile':
                        result += '@media (max-width: 544px){' + style_to_add + '}';
                        break;
                }
            }
        );
        if ( styleClass.length > 0 ) {
            styleClass.text( result );
        } else {
            jQuery( 'head' ).append( '<style type="text/css" class="' + settings.styleClass + '">' + result + '</style>' );
        }
    } else {
        jQuery( settings.selectors ).css( settings.cssProperty, to + 'px' );
    }
}
//*****************************/
// Logo
//*****************************/
wp.customize(
    'gogo_logo_width', function (value){
        'use strict';
        value.bind(
            function( to ) {
                var settings = {
                    cssProperty: 'max-width',
                    propertyUnit: 'px',
                    styleClass: 'gogo-logo-width'
                };

                var arraySizes = {
                    size3: { selectors:'.gogo-logo img', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
/**************************************/
// container live preview
/**************************************/
// conatiner full width
wp.customize( 'gogo_conatiner_width', function( setting ){
        setting.bind( function( width ) {
        var  dynamicStyle = 'header .container, #container.site- container, footer .container, #content #container,header .container, #container.site- container, footer .container, #content #container, #content.site-content.boxed #container, #content.site-content.contentbox #container, #content.site-content.fullwidthcontained #container, .thunk-gogo-frontpage .container { max-width: ' + ( parseInt( width ) ) + 'px; } ';
        gogo_add_dynamic_css( 'gogo_conatiner_width', dynamicStyle );
    } );
 } );
gogo_css( 'gogo_blog_cnt_widht','max-width', '.blog #content #container.site-container,.archive #content #container.site-container', 'px');
gogo_css( 'gogo_product_cnt_widht','max-width', '.single-product.woocommerce #content.site-content.product #container', 'px');
gogo_css( 'gogo_sngle_cnt_widht','max-width','#content.site-content.blog-single.boxed #container,.boxed #content.site-content.blog-single #container, #content.site-content.blog-single.contentbox #container,.contentbox #content.site-content.blog-single #container, #content.site-content.blog-single.fullwidthcontained #container,.fullwidthcontained #content.site-content.blog-single #container', 'px');
// conatiner max width // site-layout
    wp.customize( 'gogo_conatiner_maxwidth', function( setting ){
        setting.bind( function( width ) {
        if (  jQuery( 'body' ).hasClass( 'maxwidth' ) ) {
        var  dynamicStyle = '#page.gogo-site,.maxwidth #content #container, .maxwidth .container{ max-width: ' + ( parseInt( width ) ) + 'px; } ';
        gogo_add_dynamic_css( 'gogo_conatiner_maxwidth', dynamicStyle );
        }
    } );
 } );

// conatiner max width // site-layout
    wp.customize( 'gogo_conatiner_top_bottom_margin', function( setting ){
        setting.bind( function( width ) {
        if (  jQuery( 'body' ).hasClass( 'maxwidth' ) ) {
        var  dynamicStyle = '#page.gogo-site { margin: ' + ( parseInt( width ) ) + 'px auto } ';
        gogo_add_dynamic_css( 'gogo_conatiner_top_bottom_margin', dynamicStyle );
        }
    } );
 } );
/**************************************/
// Above Header live preview
/**************************************/
wp.customize('gogo_col1_texthtml', function(value){
         value.bind(function(to) {
             $('.top-header-col1 .content-html,li.menu-item.zta-custom-item').text(to);
         });
     });
 wp.customize('gogo_col2_texthtml', function(value){
         value.bind(function(to) {
             $('.top-header-col2 .content-html').text(to);
         });
     });
 wp.customize('gogo_col3_texthtml', function(value){
         value.bind(function(to) {
             $('.top-header-col3 .content-html').text(to);
         });
     });
gogo_css( 'gogo_abv_hdr_botm_brd','border-bottom-width', '.top-header-bar', 'px' );
gogo_css( 'gogo_above_brdr_clr','border-bottom-color', '.top-header-bar');
gogo_css( 'gogo_abv_hdr_hgt','line-height', '.top-header-container', 'px');
/**************************************/
// Main Header live preview
/**************************************/
wp.customize('gogo_main_header_texthtml', function(value){
         value.bind(function(to) {
             $('.zta-custom-item .menu-custom-html,.menu-custom-html').text(to);
         });
     });
wp.customize('gogo_main_header_mobile_txt', function(value){
         value.bind(function(to) {
             $('.menu-toggle .text span').text(to);
         });
     });
/**
* Border bottom 
*/
gogo_css( 'gogo_main_hdr_botm_brd','border-bottom-width', '.main-header-bar', 'px' );
gogo_css( 'gogo_main_brdr_clr','border-bottom-color', '.main-header-bar');
/**************************************/
// Bottom Header live preview
/**************************************/
 wp.customize('gogo_col1_bottom_texthtml', function(value){
         value.bind(function(to) {
             $('.bottom-header-col1 .content-html').text(to);
         });
     });
 wp.customize('gogo_col2_bottom_texthtml', function(value){
         value.bind(function(to) {
             $('.bottom-header-col2 .content-html').text(to);
         });
     });
 wp.customize('gogo_col3_bottom_texthtml', function(value){
         value.bind(function(to) {
             $('.bottom-header-col3 .content-html').text(to);
         });
     });
gogo_css( 'gogo_bottom_hdr_botm_brd','border-bottom-width', '.bottom-header-bar', 'px' );
gogo_css( 'gogo_bottom_brdr_clr','border-bottom-color', '.bottom-header-bar');
gogo_css( 'gogo_bottom_hdr_hgt','line-height', '.bottom-header-container', 'px');
/****************/
// footer
/****************/
wp.customize('gogo_footer_col1_texthtml', function(value){
         value.bind(function(to) {
             $('.top-footer-col1 .content-html').text(to);
         });
     });
 wp.customize('gogo_above_footer_col2_texthtml', function(value){
         value.bind(function(to) {
             $('.top-footer-col2 .content-html').text(to);
         });
     });
 wp.customize('gogo_above_footer_col3_texthtml', function(value){
         value.bind(function(to) {
             $('.top-footer-col3 .content-html').text(to);
         });
     });
 wp.customize('gogo_footer_bottom_col1_texthtml', function(value){
         value.bind(function(to) {
             $('.bottom-footer-col1 .content-html').text(to);
         });
     });
 wp.customize('gogo_bottom_footer_col2_texthtml', function(value){
         value.bind(function(to) {
             $('.bottom-footer-col2 .content-html').text(to);
         });
     });
 wp.customize('gogo_bottom_footer_col3_texthtml', function(value){
         value.bind(function(to) {
             $('.bottom-footer-col3 .content-html').text(to);
         });
     });
/**************************************/
// Sidebar live preview
/**************************************/
/**
* Primary Sidebar Width Option
*/
    wp.customize( 'gogo_sidebar_width', function( setting ) {
        setting.bind( function( width ) {

            if ( ! jQuery( '.site-container' ).hasClass( 'no-sidebar' ) && width >= 15 && width <= 50 ) {

                var dynamicStyle = '';

                dynamicStyle += '.site-content #primary{ width: ' + ( 100 - parseInt( width ) ) + '% } ';
                dynamicStyle += '.site-content #sidebar-primary{ width: ' + width + '% } ';

                gogo_add_dynamic_css( 'gogo_sidebar_width', dynamicStyle );
            }

        } );
    } );
    /**
     * BLOG PAGE AND ARCHIVE PAGE LIVE PREVIEW
    */
    wp.customize('gogo_blog_read_more_txt', function(value){
         value.bind(function(to) {
             $('.entry-content p.read-more a').text(to);
         });
     });

/***************************/
// Scroll to top live preview
/***************************/
gogo_css( 'gogo_scroll_to_top_icon_radius','border-radius', '#move-to-top', 'px');
gogo_css( 'gogo_scroll_to_top_icon_clr','color', '#move-to-top');
gogo_css( 'gogo_scroll_to_top_icon_bg_clr','background', '#move-to-top');
gogo_css( 'gogo_scroll_to_top_icon_hvr_clr','color', '#move-to-top:hover');
gogo_css( 'gogo_scroll_to_top_icon_bghvr_clr','background', '#move-to-top:hover');
/***************************/
// Footer Live Preview
/***************************/
gogo_css( 'gogo_abv_ftr_botm_brd','border-bottom-width', '.top-footer-bar', 'px' );
gogo_css( 'gogo_above_frt_brdr_clr','border-bottom-color', '.top-footer-bar');
gogo_css( 'gogo_abve_ftr_hgt','line-height', '.top-footer-container', 'px');
gogo_css( 'gogo_btm_ftr_botm_brd','border-top-width', '.bottom-footer-bar', 'px' );
gogo_css( 'gogo_bottom_frt_brdr_clr','border-top-color', '.bottom-footer-bar');
gogo_css( 'gogo_btm_ftr_hgt','line-height','.bottom-footer-container', 'px');
/****************************************/
// color and background
/****************************************/
//gogo_bodyframe_css
gogo_css( 'background_color','background-color','.border');
// gloabal color
gogo_css( 'gogo_link_hvr_clr','color','a:hover,.single .nav-previous:hover:before,.single .nav-next:hover:after,article h2.entry-title a:hover,.gogo-menu li a:hover,.main-header .gogo-menu > li > a:hover,.main-header .main-header-bar a:hover, .gogo-menu .content-social .social-icon li a:hover,.top-header .top-header-bar a:hover,.bottom-header .bottom-header-bar a:hover');
gogo_css( 'gogo_theme_clr','color','.blog article .entry-content p:first-child:first-letter,.blog article .entry-content p:first-child:first-letter,a:hover,.inifiniteLoader,mark,.single .nav-previous:hover:before,.single .nav-next:hover:after,.page-numbers.current, .page-numbers:hover, .prev.page-numbers:hover, .next.page-numbers:hover,.zita-load-more #load-more-posts:hover,.mhdrleftpan .header-pan-icon span,.mhdrrightpan .header-pan-icon span,article h2.entry-title a:hover,.gogo-menu li a:hover,.main-header .gogo-menu > li > a:hover,a:hover,.single .nav-previous:hover:before,.single .nav-next:hover:after,article h2.entry-title a:hover,.gogo-menu li a:hover,.main-header .gogo-menu > li > a:hover,.main-header .main-header-bar a:hover, .gogo-menu .content-social .social-icon li a:hover,.top-header .top-header-bar a:hover,.bottom-header .bottom-header-bar a:hover,.top-footer .top-footer-bar a:hover,.bottom-footer .bottom-footer-bar a:hover,.gogo-menu li ul.sub-menu li a span:hover,.faq-sn, .ac > .ac-q::after');
gogo_css( 'gogo_link_hvr_clr','color','.thunk-first a:hover,.thunk-service .service-txt h4:hover,.thunk-service .service-txt h3:hover,.thunk-post-wrapper .post-category a:hover,.thunk-team-social i:hover');
wp.customize( 'gogo_theme_clr', function( value ){
        value.bind( function( newval ) {
            $('.menu-custom-html > a button,.read-more .zta-button,.woocommerce #respond input#submit, .woocommerce a.button,.woocommerce button.button, .woocommerce input.button,.menu-custom-html > a button, .read-more .zta-button, #respond.comment-respond #submit,.gogo-date-meta .posted-on,.woocommerce ul.products li.product .onsale, .woocommerce span.onsale,.woocommerce .widget_price_filter .ui-slider .ui-slider-range,.woocommerce .widget_price_filter .ui-slider .ui-slider-handle,.cart-contents .cart-crl,.main-header .main-header-bar a.main-header-btn').css('background', newval );
            $('.menu-custom-html > a button, .read-more .zta-button, #respond.comment-respond #submit,.main-header .main-header-bar a.main-header-btn').css('border-color', newval );
            $('.type-button,.pricing-post.popular-pricing-post .pricing-post-heading,.testimonials .owl-carousel .owl-nav button.owl-prev, .testimonials .owl-carousel .owl-nav button.owl-next').css('background', newval );
            $('#cd-vertical-nav a.is-selected .cd-dot,#cd-vertical-nav .cd-label,#move-to-top').css('background-color', newval );
        } );
    } );
gogo_css( 'gogo_link_clr','color','a,.single .nav-previous:before,.single .nav-next:after,.thunk-post-wrapper .post-category a,.thunk-service .service-txt h4,.thunk-service .service-txt h3,.thunk-team-social i');
gogo_css( 'gogo_text_clr','color','body,.gogo-site #content .entry-meta,.thunk-gogo-frontpage .description, .tetsimonial-content p, .video-window p, .thunk-col-2 .address p');
gogo_css( 'gogo_title_clr','color','article h2.entry-title a,#sidebar-primary h4.widget-title,.woocommerce h1.product_title, .woocommerce-Tabs-panel h2, .related.products h2, section.up-sells h2, .cross-sells h2, .cart_totals h2, .woocommerce-billing-fields h3, .woocommerce-account .addresses .title h3,h1.page-title, h1.entry-title');
gogo_css( 'gogo_title_clr','color','.thunk-first .short-heading,.thunk-pricing .short-heading,.thunk-clients-and-testimonials .short-heading,.thunk-contact-us .short-heading,.thunk-team .short-heading,.thunk-portfolio .short-heading,.thunk-blog .short-heading,.thunk-service .short-heading,.thunk-faq .short-heading,.thunk-woocommerce .short-heading,.thunk-blog h4,.thunk-service .service-txt h4,.thunk-service .service-txt h3,.video-window h4,.call-to-heading');
//site button
gogo_css('gogo_button_txt_clr','color','.menu-custom-html > a button,.read-more .zta-button,button,.woocommerce #respond input#submit, .woocommerce a.button,.woocommerce button.button, .woocommerce input.button,.type-button,.thunk-contact-us .leadform-show-form.leadform-lite .lf-field input,.main-header .main-header-bar a.main-header-btn');
gogo_css('gogo_button_border_radius','border-radius','.menu-custom-html > a button,.read-more .zta-button,button,.woocommerce #respond input#submit, .woocommerce a.button,.woocommerce button.button, .woocommerce input.button,.type-button,.type-button-overlay,.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child,.main-header .main-header-bar a.main-header-btn','px');
gogo_css('gogo_button_txt_hvr_clr','color','.menu-custom-html > a button:hover,.read-more .zta-button:hover,button:hover,.woocommerce #respond input#submit:hover, .woocommerce a.button:hover,.woocommerce button.button:hover, .woocommerce input.button:hover,.type-button:hover,.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child:hover input,.main-header .main-header-bar a.main-header-btn:hover');
gogo_css('gogo_button_bg_hvr_clr','background','.menu-custom-html > a button:hover,.read-more .zta-button:hover,button:hover,.woocommerce #respond input#submit:hover, .woocommerce a.button:hover,.woocommerce button.button:hover, .woocommerce input.button:hover,.type-button:hover .type-button-overlay,.thunk-pricing .type-button:hover .type-button-overlay,.thunk-contact-us .leadform-show-form.leadform-lite .lf-field:last-child:before,.load-more.lfb-load-more,.main-header .main-header-bar a.main-header-btn:hover');
wp.customize( 'gogo_button_bg_clr', function( value ){
        value.bind( function( newval ) {
            $('.menu-custom-html > a button,.read-more .zta-button,button,.woocommerce #respond input#submit, .woocommerce a.button,.woocommerce button.button, .woocommerce input.button,.main-header .main-header-bar a.main-header-btn').css('background', newval );
            $('.type-button,.pricing-deatails a.type-button,.thunk-contact-us .container .leadform-show-form.leadform-lite .lf-form-panel label input').css('background', newval );
        } );
} );

// search icon
gogo_css('gogo_search_icon_font_size','font-size','.searchfrom .search-btn','px');
gogo_css('gogo_search_icon_radius','border-radius','.searchfrom .search-btn','px');
gogo_css('gogo_search_icon_clr','color','.top-header-bar .searchfrom .search-btn,.main-header-bar .searchfrom .search-btn,.bottom-header-bar .searchfrom .search-btn ,.gogo-menu .menu-custom-search .searchfrom a');
gogo_css('gogo_search_icon_brd_clr','border-color','.searchfrom .search-btn');
gogo_css('gogo_search_icon_bg_clr','background','.searchfrom .search-btn');
gogo_css('.top-header-bar .searchfrom .search-btn:hover,.main-header-bar .searchfrom .search-btn:hover,.bottom-header-bar .searchfrom .search-btn:hover','color','.searchfrom .search-btn');
// search box
gogo_css('gogo_search_box_icon_width','width','.widget-area #searchform .form-content,.searchfrom #searchform .form-content','%');
gogo_css('gogo_search_box_icon_size','font-size','.widget-area #searchform .form-content:before,.searchfrom #searchform .form-content:before','px');
gogo_css('gogo_search_box_icon_height','line-height','.widget-area #searchform input[type=submit],.widget-area input#s,.widget-area #searchform .form-content:before,.searchfrom #searchform .form-content:before,.searchfrom input#s,.searchfrom #searchform input[type=submit]','px');
gogo_css('gogo_search_icon_brd_clr','border-color','.top-header-bar .searchfrom .search-btn, .main-header-bar .searchfrom .search-btn, .bottom-header-bar .searchfrom .search-btn, .gogo-menu .menu-custom-search .searchfrom a');
gogo_css('gogo_search_icon_hvr_clr','color','.top-header-bar .searchfrom .search-btn:hover,.main-header-bar .searchfrom .search-btn:hover,.bottom-header-bar .searchfrom .search-btn:hover');
wp.customize( 'gogo_search_box_icon_height', function( value ) {
        value.bind( function( newval ) {
            $('.widget-area #searchform input[type=submit],.widget-area input#s,.widget-area #searchform .form-content:before,.searchfrom #searchform .form-content:before,.searchfrom input#s,.searchfrom #searchform input[type=submit]').css('height', newval );
        } );
    } );
gogo_css('gogo_search_box_radius','border-radius','.widget-area #searchform input[type=submit],.widget-area input#s,.widget-area #searchform .form-content:before,.searchfrom #searchform .form-content:before,.searchfrom input#s,.searchfrom #searchform input[type=submit]','px');
gogo_css('gogo_social_box_bg_clr','background-color','.widget-area input#s,.searchfrom #searchform input#s');
gogo_css('gogo_social_box_icon_clr','color','.widget-area #searchform .form-content:before,.searchfrom #searchform .form-content:before');
gogo_css('gogo_social_box_brdr_clr','border-color','.widget-area input#s,.searchfrom #searchform input#s');
gogo_css('gogo_social_box_plc_holdr_clr','color','.form-content input#s::-webkit-input-placeholder, .form-content input#s');
gogo_css('gogo_search_box_plc_txt_size','font-size','.form-content input#s::-webkit-input-placeholder, .form-content input#s','px');
/**********************/
// woocommerce
/**********************/
     /**
     * Shop: Box Shadow
     */
    wp.customize( 'gogo_shop_product_box_shadow', function( setting ) {
        setting.bind( function( product_shadow ) {
            var products = $(document).find('.woocommerce-page .products .product, .woocommerce .products .product');
            product_shadow = product_shadow > 5 ? 5 : ( product_shadow < 0 ? 0 : product_shadow );
            products.removeClass('gogo-shadow-1 gogo-shadow-2 gogo-shadow-3 gogo-shadow-4 gogo-shadow-5');
            products.addClass( 'gogo-shadow-' + product_shadow );
        } );
    } );
    /**
     * Shop: Box Shadow Hover
     */
    wp.customize( 'gogo_shop_product_box_shadow_on_hover', function( setting ) {
        setting.bind( function( product_shadow ) {
            var products = $(document).find('.woocommerce-page .products .product, .woocommerce .products .product');
            product_shadow = product_shadow > 5 ? 5 : ( product_shadow < 0 ? 0 : product_shadow );
            products.removeClass('gogo-shadow-hover-1 gogo-shadow-hover-2 gogo-shadow-hover-3 gogo-shadow-hover-4 gogo-shadow-hover-5');
            products.addClass( 'gogo-shadow-hover-' + product_shadow );
        } );
    } );
/*******************/
//Typography
/******************/
// body font size
wp.customize(
    'gogo_body_font_size', function (value){
        'use strict';
        value.bind(
            function( to ) {
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_body_font_size'
                };
                var arraySizes = {
                    size3: { selectors:'body', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
// line-height
wp.customize(
    'gogo_body_font_line_height', function (value){
        'use strict';
        value.bind(
            function( to ) {
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: '',
                    styleClass: 'gogo_body_font_line_height'
                };

                var arraySizes = {
                    size3: { selectors:'body', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
// letter-spacing
wp.customize(
    'gogo_body_font_letter_spacing', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_body_font_letter_spacing'
                };
                var arraySizes = {
                    size3: { selectors:'body', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);

// content
// h1
wp.customize(
    'gogo_h1_size', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h1_size'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h1', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h1_line_height', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: '',
                    styleClass: 'gogo_h1_line_height'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h1', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h1_letter_spacing', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h1_letter_spacing'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h1', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
// h2
wp.customize(
    'gogo_h2_size', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h2_size'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h2', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h2_line_height', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: '',
                    styleClass: 'gogo_h2_line_height'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h2', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h2_letter_spacing', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h2_letter_spacing'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h2', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
// h3
wp.customize(
    'gogo_h3_size', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h3_size'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h3', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h3_line_height', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: '',
                    styleClass: 'gogo_h3_line_height'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h3', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h3_letter_spacing', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h3_letter_spacing'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h3', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
// h4
wp.customize(
    'gogo_h4_size', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h4_size'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h4', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h4_line_height', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: '',
                    styleClass: 'gogo_h4_line_height'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h4', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h4_letter_spacing', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h4_letter_spacing'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h4', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
// h5
wp.customize(
    'gogo_h5_size', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h5_size'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h5', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h5_line_height', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: '',
                    styleClass: 'gogo_h5_line_height'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h5', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h5_letter_spacing', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h5_letter_spacing'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h5', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
// h6
wp.customize(
    'gogo_h6_size', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h6_size'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h6', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h6_line_height', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: '',
                    styleClass: 'gogo_h6_line_height'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h6', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_h6_letter_spacing', function (value){
       'use strict';
        value.bind(
            function( to ){
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_h6_letter_spacing'
                };
                var arraySizes = {
                    size3: { selectors:'.entry-content h6', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
//Gogo Frontpage Typewriter Font Size
wp.customize(
    'gogo_typewriter_size', function (value){
        'use strict';
        value.bind(
            function( to ) {
                var settings = {
                    cssProperty: 'font-size',
                    propertyUnit: 'px',
                    styleClass: 'gogo_typewriter_size'
                };
                var arraySizes = {
                    size3: { selectors:'.thunk-typed-box .type-demo', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_typewriter_lineheight', function (value){
        'use strict';
        value.bind(
            function( to ) {
                var settings = {
                    cssProperty: 'line-height',
                    propertyUnit: 'px',
                    styleClass: 'gogo_typewriter_lineheight'
                };
                var arraySizes = {
                    size3: { selectors:'.thunk-typed-box .type-demo', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);
wp.customize(
    'gogo_typewriter_letterspacing', function (value){
        'use strict';
        value.bind(
            function( to ) {
                var settings = {
                    cssProperty: 'letter-spacing',
                    propertyUnit: 'px',
                    styleClass: 'gogo_typewriter_letterspacing'
                };
                var arraySizes = {
                    size3: { selectors:'.thunk-typed-box .type-demo', values: ['','',''] }
                };
                gogoGetCss( arraySizes, settings, to );
            }
        );
    }
);

//GOGO FRONTPAGE LIVE SETTINGS---------------------

/**************************************/
// gogo__name (SMALL HEADING TEXT) live preview
/**************************************/
wp.customize('gogo_button_text1', function(value){
         value.bind(function(to) {
             $('.slider-typewriter .type-button').text(to);
         });
     });
wp.customize('gogo_button_link1', function(value){
         value.bind(function(to) {
             $('.slider-typewriter .type-button').text(to);
         });
     });
wp.customize('gogo_introduction_name', function(value){
         value.bind(function(to) {
             $('.thunk-first .vertical-text').text(to);
         });
     });
wp.customize('gogo_introduction_description', function(value){
         value.bind(function(to) {
             $('.thunk-first .description').text(to);
         });
     });

wp.customize('gogo_blog_name', function(value){
         value.bind(function(to) {
             $('.thunk-blog .vertical-text').text(to);
         });
     });

wp.customize('gogo_service_name', function(value){
         value.bind(function(to) {
             $('.thunk-service .vertical-text').text(to);
         });
     });

wp.customize('gogo_pricing_name', function(value){
         value.bind(function(to) {
             $('.thunk-pricing .vertical-text').text(to);
         });
     });


wp.customize('gogo_contact_name', function(value){
         value.bind(function(to) {
             $('.thunk-contact-us .vertical-text').text(to);
         });
     });

wp.customize('gogo_team_name', function(value){
         value.bind(function(to) {
             $('.thunk-team .vertical-text').text(to);
         });
     });


wp.customize('gogo_portfolio_name', function(value){
         value.bind(function(to) {
             $('.thunk-portfolio .vertical-text').text(to);
         });
     });

wp.customize('gogo_woocommerce_name', function(value){
         value.bind(function(to) {
             $('.thunk-woocommerce .vertical-text').text(to);
         });
     });
/**************************************/
// gogo__Big Heading live preview
/**************************************/
wp.customize('gogo_introduction_heading', function(value){
         value.bind(function(to) {
             $('.thunk-first .short-heading').text(to);
         });
     });

wp.customize('gogo_blog_heading', function(value){
         value.bind(function(to) {
             $('.thunk-blog .short-heading').text(to);
         });
     });

wp.customize('gogo_service_heading', function(value){
         value.bind(function(to) {
             $('.thunk-service .short-heading').text(to);
         });
     });

wp.customize('gogo_pricing_heading', function(value){
         value.bind(function(to) {
             $('.thunk-pricing .short-heading').text(to);
         });
     });

wp.customize('gogo_ct_heading', function(value){
         value.bind(function(to) {
             $('.thunk-clients-and-testimonials .short-heading').text(to);
         });
     });

wp.customize('gogo_contact_heading', function(value){
         value.bind(function(to) {
             $('.thunk-contact-us .short-heading').text(to);
         });
     });

wp.customize('gogo_team_heading', function(value){
         value.bind(function(to) {
             $('.thunk-team .short-heading').text(to);
         });
     });

wp.customize('gogo_portfolio_heading', function(value){
         value.bind(function(to) {
             $('.thunk-portfolio .short-heading').text(to);
         });
     });

wp.customize('gogo_woocommerce_heading', function(value){
         value.bind(function(to) {
             $('.thunk-woocommerce .short-heading').text(to);
         });
     });
wp.customize('gogo_before_text', function(value){
         value.bind(function(to) {
             $('.td-start').text(to);
         });
     });

wp.customize('gogo_after_text', function(value){
         value.bind(function(to) {
             $('.td-end').text(to);
         });
     });

wp.customize('gogo_pricing_t_c', function(value){
         value.bind(function(to) {
             $('.thunk-pricing .pricing-subheading').text(to);
         });
     });

wp.customize('gogo_contact_address1', function(value){
         value.bind(function(to) {
             $('.thunk-contact-us .address:nth-of-type(1) p').text(to);
         });
     });

wp.customize('gogo_contact_address2', function(value){
         value.bind(function(to) {
             $('.thunk-contact-us .address:nth-of-type(2) p').text(to);
         });
     });

wp.customize('gogo_contact_support', function(value){
         value.bind(function(to) {
             $('.thunk-contact-us .address:nth-of-type(3) p').text(to);
         });
     });

wp.customize('gogo_video_ribbon_heading', function(value){
         value.bind(function(to) {
             $('.thunk-video-ribbon h4').text(to);
         });
     });

wp.customize('gogo_video_ribbon_subheading', function(value){
         value.bind(function(to) {
             $('.thunk-video-ribbon p').text(to);
         });
     });

wp.customize('gogo_call_to_heading', function(value){
         value.bind(function(to) {
             $('.thunk-call-to .call-to-heading').text(to);
         });
     });

wp.customize('gogo_call_to_button_text', function(value){
         value.bind(function(to) {
             $('.thunk-call-to .type-button.call-to').text(to);
         });
     });
}));
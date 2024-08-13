jQuery(document).ready(function(){
 "use strict";
//-----------------------//
// loader
//-----------------------//
if(!jQuery('body').hasClass('elementor-editor-active')){
jQuery(window).on('load', function(){
setTimeout(removeLoader); //wait for page load PLUS two seconds.
});
function removeLoader(){
    jQuery( ".gogo_overlayloader" ).fadeOut(700, function(){
      // fadeOut complete. Remove the loading div
    jQuery(".gogo-pre-loader img" ).hide(); //makes page more lightweight
    });  
  }
}
 // close-button-active
        if(jQuery('body').hasClass('mobile-menu-active','mobile-above-menu-active','mobile-bottom-menu-active').length!=''){
             jQuery('body').find('.sider').prepend('<div class="menu-close"><span tabindex="0" class="menu-close-btn"></span></div>');
             jQuery('.menu-close-btn').removeAttr("href");
            //Menu close
            jQuery('body,.menu-close-btn,.gogo-menu li a span.gogo-menu-link').click(function(){
            jQuery('body').removeClass('mobile-menu-active');
            jQuery('body').removeClass('mobile-above-menu-active');
            jQuery('body').removeClass('mobile-bottom-menu-active');
            });

            //Menu close on keypress
            jQuery('.menu-close-btn').keypress(function(){
            jQuery('body').removeClass('mobile-menu-active');
            jQuery('body').removeClass('mobile-above-menu-active');
            jQuery('body').removeClass('mobile-bottom-menu-active');
            });

            jQuery('#gogo-above-menu,#gogo-menu,#gogo-bottom-menu,#menu-btn,#menu-btn-abv,#menu-btn-btm,#menu-all-pages').click(function(event){
            event.stopPropagation();
            });
            gogomenu.modalMenu.init();
            // Esc key close menu
            document.addEventListener( 'keydown', function( event ) {
            if ( event.keyCode === 27 ) {
              event.preventDefault();
              document.querySelectorAll( '.mobile-menu-active' ).forEach( function( element ) {
                jQuery('body').removeClass('mobile-menu-active');
              }.bind( this ) );
              document.querySelectorAll( '.mobile-above-menu-active' ).forEach( function( element ) {
                jQuery('body').removeClass('mobile-above-menu-active');
              }.bind( this ) );
              document.querySelectorAll( '.mobile-bottom-menu-active' ).forEach( function( element ) {
                jQuery('body').removeClass('mobile-bottom-menu-active');
              }.bind( this ) );
            }
          }.bind( this ) );

        //ToggleBtn above Click
        jQuery('#menu-btn-abv').click(function (e){
           e.preventDefault();
           jQuery('body').addClass('mobile-above-menu-active');
           jQuery('#gogo-above-menu').removeClass('hide-menu'); 
           jQuery('.sider.above').removeClass('gogo-menu-hide');
           jQuery('.sider.main').addClass('gogo-menu-hide');
           jQuery('.sider.bottom').addClass('gogo-menu-hide');    
        });
        //ToggleBtn main menu Click
        jQuery('#menu-btn').click(function (e){
           e.preventDefault();
           jQuery('body').addClass('mobile-menu-active');
           jQuery('#gogo-menu').removeClass('hide-menu');
           jQuery('.sider.above').addClass('gogo-menu-hide');  
           jQuery('.sider.main').removeClass('gogo-menu-hide');   
           jQuery('.sider.bottom').addClass('gogo-menu-hide');  
        });
        //ToggleBtn bottom menu Click
        jQuery('#menu-btn-btm').click(function (e){
           e.preventDefault();
           jQuery('body').addClass('mobile-menu-active');
           jQuery('#gogo-bottom-menu').removeClass('hide-menu');
           jQuery('.sider.bottom').removeClass('gogo-menu-hide');  
           jQuery('.sider.main').addClass('gogo-menu-hide');
           jQuery('.sider.above').addClass('gogo-menu-hide');     
        });
        // default page
        jQuery('#menu-btn').click(function (e){
           e.preventDefault();
           jQuery('body').addClass('mobile-menu-active');
           jQuery('#menu-all-pages').removeClass('hide-menu');    
        });
        }
 // deafult menu
jQuery(document).ready(function(){
             jQuery("#menu-all-pages.gogo-menu").gogoResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'fast', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
             });       
        });
// main-menu-script
jQuery(document).ready(function (){
             jQuery("#gogo-menu").gogoResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
            });      
        });
// above-menu-script
jQuery(document).ready(function (){
             jQuery("#gogo-above-menu").gogoResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
             });      
         });
// bottom-menu-script
jQuery(document).ready(function () {
             jQuery("#gogo-bottom-menu").gogoResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
             });
             
         });
//**********************/
// header top search box
//**********************/
jQuery(".top-header-col1 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".top-header-col1 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".top-header-col2 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".top-header-col2 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".top-header-col3 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".top-header-col3 .searchfrom #searchform").slideToggle(300);
};
});
/********************/
// main header search
/********************/
jQuery(".menu-custom-search .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".menu-custom-search .searchfrom #searchform").slideToggle(300);
};
});
//**********************/
// header bottom search box
//**********************/
jQuery(".bottom-header-col1 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".bottom-header-col1 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".bottom-header-col2 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".bottom-header-col2 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".bottom-header-col3 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".bottom-header-col3 .searchfrom #searchform").slideToggle(300);
};
});
//**********************/
// footer above search box
//**********************/
jQuery(".top-footer-col1 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".top-footer-col1 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".top-footer-col2 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".top-footer-col2 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".top-footer-col3 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".top-footer-col3 .searchfrom #searchform").slideToggle(300);
};
});
//**********************/
// footer bottom search box
//**********************/
jQuery(".bottom-footer-col1 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".bottom-footer-col1 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".bottom-footer-col2 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".bottom-footer-col2 .searchfrom #searchform").slideToggle(300);
};
});
jQuery(".bottom-footer-col3 .search-btn").on("click", function(e){
e.preventDefault();
e.stopPropagation();
if(jQuery(this).find(jQuery(".fa")).toggleClass('fa-search').toggleClass('fa-close')){
jQuery(".bottom-footer-col3 .searchfrom #searchform").slideToggle(300);
};
});
/**************************************************/
// Show-hide Scroll to top & move-to-top arrow
/**************************************************/
if(jQuery("#back-to-top").val()=='on'){
  jQuery("body").prepend("<a id='move-to-top' class='animate' href='#'><i class='fa fa-angle-up'></i></a>"); 
  var scrollDes = 'html,body';  
  /*Opera does a strange thing if we use 'html' and 'body' together so my solution is to do the UA sniffing thing*/
  if(navigator.userAgent.match(/opera/i)){
    scrollDes = 'html';
  }
  //show ,hide
  jQuery(window).scroll(function (){
    if(jQuery(this).scrollTop() > 160){
      jQuery('#move-to-top').addClass('filling').removeClass('hiding');
    }else{
      jQuery('#move-to-top').removeClass('filling').addClass('hiding');
    }
  });
  jQuery('#move-to-top').click(function(){
      jQuery("html, body").animate({ scrollTop: 0 }, 600);
      return false;
  });
}
/**************************************************/
// Admin-bar height calculate
/**************************************************/
(function(jQuery){
    'use strict';
    jQuery(document).ready(function() {
        // if adminbar exist (should check for visible?) then add margin to our navbar
        var $wpAdminBar = jQuery('#wpadminbar');
        if ($wpAdminBar.length) {
           jQuery('header.mhdrleftpan,header.mhdrrightpan').css('margin-top',$wpAdminBar.height()+'px');
        }
    });
})(jQuery);
/**************************************************/
//mobile pan class activate
/**************************************************/
jQuery('.pan-icon').click(function (e){
e.preventDefault();
jQuery('body').toggleClass('mobile-pan-active');
jQuery('body').removeClass('cart-pan-active');
});
/**************************************************/
//mobile pan class activate
/**************************************************/
jQuery('header.mhdrleftpan .cart-contents,header.mhdrrightpan .cart-contents').click(function (e){
e.preventDefault();
jQuery('body').toggleClass('cart-pan-active');
jQuery('body').find('.gogo-cart').prepend('<div class="cart-close"><a class="cart-close-btn"></a></div>');
jQuery('.cart-close a').click(function (e){
jQuery('body').removeClass('cart-pan-active');
});
});
jQuery(window).on('resize', function(){
  jQuery('body').removeClass('cart-pan-active');
});
});
/**************************************************/
//Header sticky
/**************************************************/
if(jQuery("#header-scroll-down-hide").val()=='on'){
  var position = jQuery(window).scrollTop(); 
  var $headerBar = jQuery('header').height();
// should start at 0
jQuery(window).scroll(function(){
    var scroll = jQuery(window).scrollTop();
    if(scroll > position || scroll < $headerBar){
    jQuery("header.gogo-above-stick-hdr,header.gogo-main-stick-hdr,header.gogo-bottom-stick-hdr").removeClass("shrink");
    }else{
    jQuery("header.gogo-above-stick-hdr,header.gogo-main-stick-hdr,header.gogo-bottom-stick-hdr").addClass("shrink");
    }
    position = scroll;
});
}else{
jQuery(document).on("scroll", function(){
var $headerBar = jQuery('header').height();
var $totalheaderBar = $headerBar + 20;
  if(jQuery(document).scrollTop() > $totalheaderBar){
      jQuery("header.gogo-above-stick-hdr,header.gogo-main-stick-hdr,header.gogo-bottom-stick-hdr").addClass("shrink");
    }else{
      jQuery("header.gogo-above-stick-hdr,header.gogo-main-stick-hdr,header.gogo-bottom-stick-hdr").removeClass("shrink");
  } 
});
}
///------------------------------/// 
// section scroll ease function
///------------------------------/// 
jQuery(document).ready(function(){
jQuery('.gogo-menu li a[href*="#"]').click(function(){
                    if ("#" === jQuery(this).attr("href")) return !1;
                    if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
                        var t = jQuery(this.hash);
                        if ((t = t.length ? t : jQuery("[name=" + this.hash.slice(1) + "]")).length) return jQuery("html,body").animate({
                            scrollTop: t.offset().top - jQuery("header").height()
           }, 2000,'easeInOutExpo'), jQuery(".navbar .navbar-collapse").hasClass("in") && jQuery(".navbar .navbar-collapse.in").removeClass("in"), jQuery("body").hasClass("menu-open") && (jQuery("body").removeClass("menu-open"), jQuery(".navbar-collapse").css("height", "0"), jQuery(".navbar-toggle").attr("aria-expanded", "false")), !1
      }

 });
jQuery( window ).on(
        'scroll', function (){
          if ( jQuery( 'body' ).hasClass( 'home' ) ){
              var gogo_headerHt = jQuery("header").height();
              var gogo_scrollTop = jQuery( window ).scrollTop(); // cursor position
              var headerHeight = jQuery( '.gogo-menu' ).outerHeight(); // header height
              var isInOneSection = 'no'; // used for checking if the cursor is in one section or not
              // for all sections check if the cursor is inside a section
              jQuery( 'section' ).each(
                function(){
                  var thisID = '#' + jQuery( this ).attr( 'id' ); // section id
                  var gogo_offset = jQuery( this ).offset().top; // distance between top and our section
                  var thisHeight = jQuery( this ).outerHeight(); // section height
                  var thisBegin = gogo_offset - headerHeight; // where the section begins
                  var thisEnd = gogo_offset + thisHeight - headerHeight; // where the section ends
                  // if position of the cursor is inside of the this section
                  if( gogo_scrollTop + gogo_headerHt + 5 >= thisBegin &&
                    gogo_scrollTop + gogo_headerHt + 5 <= thisEnd ){
                    isInOneSection = 'yes';
                    jQuery( 'nav .on-section' ).removeClass( 'on-section' );
                    jQuery( 'nav a[href$="' + thisID + '"]' ).parent( 'li' ).addClass( 'on-section' ); // find the menu button with the same ID section
                    return false;
                  }
                  if( isInOneSection === 'no' ){
                   jQuery( 'nav .on-section' ).removeClass( 'on-section' );
                  }
                }
              );
           }
        }
    );
});
jQuery(document).ready(function(){
jQuery("li.menu-item a").on("hover", function() {
   jQuery(this).parent().parents("li").addClass("thunk-menu-li");
});
jQuery("li.menu-item a").on("click", function() {
   jQuery(this).parent().parents("li").addClass("thunk-menu-li");
});
});

/*-----------------------------------------------------------------------------------------------
  Modal Menu
--------------------------------------------------------------------------------------------------- */
var gogomenu = gogomenu || {};

gogomenu.modalMenu = {

  init: function() {
   
    this.keepFocusInModal();
  },
  keepFocusInModal: function() {
    var _doc = document;
    _doc.addEventListener( 'keydown', function( event ) {
      var toggleTarget, modal, selectors, elements, menuType, bottomMenu, activeEl, lastEl, firstEl, tabKey, shiftKey,
        toggleTarget = '.sider';
        if(jQuery('.mobile-menu-active').length!=''){
        selectors = 'a';
        modal = _doc.querySelector( toggleTarget );
        elements = modal.querySelectorAll( selectors );
        elements = Array.prototype.slice.call( elements );
        if ( '.sider' === toggleTarget ) {
          menuType = window.matchMedia( '(min-width: 1024px)' ).matches;
          menuType = menuType ? '.expanded-menu' : '.gogo-menu';
          elements = elements.filter( function( element ) {
            return null !== element.closest( menuType ) && null !== element.offsetParent;
          } );

          elements.unshift( _doc.querySelector( '.menu-close-btn' ) );
        }

        lastEl = elements[ elements.length - 1 ];
        firstEl = elements[0];
        activeEl = _doc.activeElement;
        tabKey = event.keyCode === 9;
        shiftKey = event.shiftKey;

        if ( ! shiftKey && tabKey && lastEl === activeEl ) {
          event.preventDefault();
          firstEl.focus();
        }

        if ( shiftKey && tabKey && firstEl === activeEl ) {
          event.preventDefault();
          lastEl.focus();
        }
      }
    } );
  }
}; // gogomenu.modalMenu
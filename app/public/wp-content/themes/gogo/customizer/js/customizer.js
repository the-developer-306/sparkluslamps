jQuery(document).ready(function(){

// section sorting
      jQuery( "#sortable" ).sortable({
        placeholder: "ui-sortable-placeholder", 
        cursor: 'move',
        opacity: 0.65,
        stop: function ( event, ui){
        var data = jQuery(this).sortable('toArray');
            //  console.log(data); // This should print array of IDs, but returns empty string/array      
            jQuery( this ).parents( '.customize-control').find( 'input[type="hidden"]' ).val( data ).trigger( 'change' );
        }
    });

      /* === Checkbox Multiple Control === */
    jQuery( '.customize-control-checkbox-multiple input[type="checkbox"]' ).on(
        'change',
        function() {
   // alert('');
            checkbox_values = jQuery( this ).parents( '.customize-control' ).find( 'input[type="checkbox"]:checked' ).map(
                function() {
                    return this.value;
                }
            ).get().join( ',' );

            jQuery( this ).parents( '.customize-control' ).find( 'input[type="hidden"]' ).val( checkbox_values ).trigger( 'change' );
        }
    );
//redirect
//above-header
jQuery( '.focus-customizer-widget-redirect-col1,.focus-customizer-widget-redirect' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );
jQuery( '.focus-customizer-menu-redirect-col1,.focus-customizer-menu-redirect-col2,.focus-customizer-menu-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel('nav_menus').focus();
} );
jQuery( '.focus-customizer-widget-redirect-col2' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );
jQuery( '.focus-customizer-widget-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );
jQuery( '.focus-customizer-social_media-redirect-col1' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.section( 'gogo-social-icon' ).focus();
} ); 
jQuery( '.focus-customizer-social_media-redirect-col2' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.section( 'gogo-social-icon' ).focus();
} );
jQuery( '.focus-customizer-social_media-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.section( 'gogo-social-icon' ).focus();
} );
// main-header
jQuery( '.focus-customizer-widget-redirect' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );   
jQuery( '.focus-customizer-social-media-redirect' ).on( 'click', function (e){
            e.preventDefault();
             wp.customize.section( 'gogo-social-icon' ).focus();
} ); 
// bottom-header
// above-header
jQuery( '.focus-customizer-bottom-widget-redirect-col1' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );
jQuery( '.focus-customizer-bottom-widget-redirect-col2' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );
jQuery( '.focus-customizer-bottom-widget-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );
jQuery( '.focus-customizer-bottom-menu-redirect-col1,.focus-customizer-bottom-menu-redirect-col2,.focus-customizer-bottom-menu-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel('nav_menus').focus();
} );
jQuery( '.focus-customizer-bottom-social_media-redirect-col1' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.section( 'gogo-social-icon' ).focus();
} ); 
jQuery( '.focus-customizer-bottom-social_media-redirect-col2' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.section( 'gogo-social-icon' ).focus();
} );
jQuery( '.focus-customizer-bottom-social_media-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.section( 'gogo-social-icon' ).focus();
} );
//footer
jQuery( '.focus-customizer-widget-redirect-col1,.focus-customizer-widget-redirect-col2,.focus-customizer-widget-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'widgets' ).focus();
} );
jQuery( '.focus-customizer-menu-redirect-col1,.focus-customizer-menu-redirect-col2,.focus-customizer-menu-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'nav_menus' ).focus();
} );
jQuery( '.focus-customizer-social_media-redirect-col1,.focus-customizer-social_media-redirect-col2,.focus-customizer-social_media-redirect-col3' ).on( 'click', function (e){
            e.preventDefault();
            wp.customize.panel( 'gogo-social-icon' ).focus();
} );

/* Move our focus widgets in the our focus panel */
/* === Checkbox Multiple Control === */
    jQuery( '.customize-control-checkbox-multiple input[type="checkbox"]' ).on(
        'change',
        function() {
   // alert('');
            checkbox_values = jQuery( this ).parents( '.customize-control' ).find( 'input[type="checkbox"]:checked' ).map(
                function() {
                    return this.value;
                }
            ).get().join( ',' );

            jQuery( this ).parents( '.customize-control' ).find( 'input[type="hidden"]' ).val( checkbox_values ).trigger( 'change' );
        }
    ); 
//SliderTypewriter Hiding
wp.customize( 'gogo_backslider_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_backslider_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Service Hiding
wp.customize( 'gogo_service_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_service_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );  
//Blog Hiding
wp.customize( 'gogo_blog_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_blog_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Pricing Hiding
wp.customize( 'gogo_pricing_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_pricing_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Introduction Hiding
wp.customize( 'gogo_introduction_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_introduction_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Ct Hiding
wp.customize( 'gogo_ct_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_ct_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Faq Hiding
wp.customize( 'gogo_faq_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_faq_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Contact Hiding
wp.customize( 'gogo_contact_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_contact_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Skill Hiding
wp.customize( 'gogo_skill_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_skill_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Team Hiding
wp.customize( 'gogo_team_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_team_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Video_Ribbon Hiding
wp.customize( 'gogo_video_ribbon_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_video_ribbon_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Portfolio Hiding
wp.customize( 'gogo_portfolio_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_portfolio_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Blog Hiding
wp.customize( 'gogo_social_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_social_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Singleproject Hiding
wp.customize( 'gogo_singleproject_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_singleproject_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Counter Hiding
wp.customize( 'gogo_counter_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_counter_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Woocommerce Hiding
wp.customize( 'gogo_woocommerce_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_woocommerce_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );
//Call to Hiding
wp.customize( 'gogo_call_to_hide', function( value ) {
        var subscribeSection = jQuery( '#accordion-section-gogo_call_to_section' );
        var filter_type = value.bind( function( to ) {
        if(to=='1'){
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' ); 
            } else{
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );     
            }
        } );
        if(filter_type()=='1'){
             subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-hidden' ).removeClass( 'thunk-section-visible' );  
            } else {
            subscribeSection.find( '.accordion-section-title' ).addClass( 'thunk-section-visible' ).removeClass( 'thunk-section-hidden' );  
            }   
    } );

});
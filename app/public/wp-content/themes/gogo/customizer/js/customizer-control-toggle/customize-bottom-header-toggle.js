( function( $ ) {
/****************************/		
//Bottom header layout
/****************************/
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ) {
		ZTACustomizerToggles ['gogo_bottom_header_layout'] = [
		    {
				controls: [
					'gogo_bottom_header_col1_set',
					'gogo_bottom_header_col2_set',
				    'gogo_bottom_header_col3_set',
				    'gogo_col1_bottom_texthtml',
				    'gogo_col2_bottom_texthtml',
				    'gogo_col3_bottom_texthtml',
				    'gogo_col1_bottom_menu_redirect',
				    'gogo_col2_bottom_menu_redirect',
				    'gogo_col3_bottom_menu_redirect',
				    'gogo_col1_bottom_widget_redirect',
				    'gogo_col2_bottom_widget_redirect',
				    'gogo_col3_bottom_widget_redirect',
				    'gogo_col1_bottom_social_media_redirect',
				    'gogo_col2_bottom_social_media_redirect',
				    'gogo_col3_bottom_social_media_redirect',
				    'gogo_bottom_hdr_hgt',
				    'gogo_bottom_hdr_botm_brd',
				    'gogo_bottom_brdr_clr',
				    'gogo_bottom_mobile_set',
				    'gogo_bottom_color_scheme'
				],
				callback: function(layout){
					if (layout=='btm-none'){
					return false;
					}
					return true;
				   }
			},
			{
				controls: [    
				'gogo_bottom_header_col2_set',  
				'gogo_bottom_header_col3_set',
				
				],
				callback: function(layout){
					if(layout!=='btm-two'|| layout!=='btm-three' || layout!=='btm-none'){
					return false;
					}
					return true;
				}
			},
			{
				controls: [ 
				'gogo_bottom_header_col1_set',   
				'gogo_bottom_header_col2_set', 
				
				],
				callback: function(layout){
					if(layout=='btm-two' || layout=='btm-three'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_bottom_header_col1_set', 
				],
				callback: function(layout){
					if(layout=='btm-one'|| layout=='btm-two' ||  layout=='btm-three'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_bottom_header_col3_set',  
				],
				callback: function(layout){
					if(layout=='btm-three'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_col1_bottom_texthtml',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col1_set' ).get();
					if ((layout!== 'btm-none') && val=='text'){
					return true;
					}
					return false;
				}
			},	
			{
				controls: [ 
				'gogo_col1_bottom_widget_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col1_set' ).get();
					if ((layout!== 'btm-none') && val=='widget'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_col1_bottom_menu_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col1_set' ).get();
					if ((layout!== 'btm-none') && val=='menu'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_col1_bottom_social_media_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col1_set' ).get();
					if ((layout!== 'btm-none') && val=='social'){
					return true;
					}
					return false;
				}
			},		
// col2
			{
				controls: [ 
				'gogo_col2_bottom_texthtml',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col2_set' ).get();
					if ((layout=='btm-two'||layout=='btm-three') && (val=='text')){
					return true;
					}
					return false;
				}
			},	
			{
				controls: [ 
				'gogo_col2_bottom_widget_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col2_set' ).get();
					if ((layout=='btm-two'||layout=='btm-three') && (val=='widget')){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_col2_bottom_menu_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col2_set' ).get();
					if ((layout=='btm-two'||layout=='btm-three') && (val=='menu')){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_col2_bottom_social_media_redirect',   
				],
				callback: function(layout){
                var val = api('gogo_bottom_header_col2_set').get();
					if ((layout=='btm-two'||layout=='btm-three') && (val=='social')){
					return true;
					}
					return false;
				}
			},
		
// col3
			{
				controls: [ 
				'gogo_col3_bottom_texthtml',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col3_set' ).get();
					if ((layout== 'btm-three') && val=='text'){
					return true;
					}
					return false;
				}
			},	
			{
				controls: [ 
				'gogo_col3_bottom_widget_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col3_set' ).get();
					if ((layout== 'btm-three') && val=='widget'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_col3_bottom_menu_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col3_set' ).get();
					if ((layout== 'btm-three') && val=='menu'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [ 
				'gogo_col3_bottom_social_media_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_col3_set' ).get();
					if ((layout== 'btm-three') && val=='social'){
					return true;
					}
					return false;
				}
			},
					
		];
		// bottom header col1 setting
		ZTACustomizerToggles ['gogo_bottom_header_col1_set'] = [
		   
		    {
				controls: [
				    
				'gogo_col1_bottom_texthtml',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout=='text' && val!=='btm-none'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col1_bottom_widget_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout=='widget' && val!=='btm-none'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col1_bottom_menu_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout=='menu' && val!=='btm-none'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col1_bottom_social_media_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout=='social' && val!=='btm-none'){
					return true;
					}
					return false;
				}
			},
			
		];
		// bottom header col2 setting
		ZTACustomizerToggles ['gogo_bottom_header_col2_set'] = [
		    {
				controls: [    
				'gogo_col2_bottom_texthtml',
				'gogo_col2_bottom_widget_redirect',
				'gogo_col2_bottom_menu_redirect',
				'gogo_col2_bottom_social_media_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout =='none' && val!=='btm-none'){
					return false;
					}
					return true;
				}
			},
		    {
				controls: [
				    
				'gogo_col2_bottom_texthtml',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if ((layout == 'text') && (val=='btm-two'|| val=='btm-three')){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col2_bottom_widget_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if ((layout == 'widget') && (val=='btm-two'|| val=='btm-three')){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col2_bottom_menu_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if ((layout == 'menu') && (val=='btm-two'|| val=='btm-three')){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col2_bottom_social_media_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if ((layout == 'social') && (val=='btm-two'|| val=='btm-three')){
					return true;
					}
					return false;
				}
			},
			
		];
		// bottom header col3 setting
		ZTACustomizerToggles ['gogo_bottom_header_col3_set'] = [
		    {
				controls: [    
				'gogo_col3_bottom_texthtml',
				'gogo_col3_bottom_widget_redirect',
				'gogo_col3_bottom_menu_redirect',
				'gogo_col3_bottom_social_media_redirect',   
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout =='none' && val!=='btm-none'){
					return false;
					}
					return true;
				}
			},
		    {
				controls: [
				    
				'gogo_col3_bottom_texthtml',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout == 'text' && val=='btm-three'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col3_bottom_widget_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout == 'widget' && val=='btm-three'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col3_bottom_menu_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout == 'menu' && val=='btm-three'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [
				    
				'gogo_col3_bottom_social_media_redirect',
				    
				],
				callback: function(layout){
                var val = api( 'gogo_bottom_header_layout' ).get();
					if (layout == 'social' && val=='btm-three'){
					return true;
					}
					return false;
				}
			},
			
		];
	});
})( jQuery );
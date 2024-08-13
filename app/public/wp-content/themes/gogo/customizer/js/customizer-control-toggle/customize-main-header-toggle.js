/****************/
// Main header	
/****************/
( function( $ ) {
//**********************************/
// container hide and show settings
//**********************************/
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ){
		ZTACustomizerToggles ['gogo_main_header_set'] = [
		    {
				controls: [    
				'gogo_main_header_texthtml',
				'gogo_mian_header_widget_redirect',
				'gogo_mian_header_social_media_redirect',
				'gogo_main_header_btn_txt',
				'gogo_main_header_btn_url'    
				],
				callback: function(custommenu){
					if (custommenu =='none'){
					return false;
					}
					return true;
				}
			},	
			 {
				controls: [    
				'gogo_main_header_texthtml',   
				],
				callback: function(custommenu){
					if (custommenu =='text'){
					return true;
					}
					return false;
				}
			},
			{
				controls: [    
				'gogo_mian_header_widget_redirect',   
				],
				callback: function(custommenu){
					if (custommenu =='widget'){
					return true;
					}
					return false;
				}
			},	
			{
				controls: [    
				'gogo_mian_header_social_media_redirect',   
				],
				callback: function(custommenu){
					if (custommenu =='social'){
					return true;
					}
					return false;
				}
			},	
			{
				controls: [    
				'gogo_main_header_btn_txt',
				'gogo_main_header_btn_url' 
				],
				callback: function(custommenu){
					if (custommenu =='button'){
					return true;
					}
					return false;
				}
			},	
		];
		ZTACustomizerToggles ['gogo_main_header_layout'] = [
		    {
				controls: [    
				'gogo_mobile_menu_open', 
				'gogo_main_header_menu_align',
				'gogo_main_header_mobile_txt'
				],
				callback: function(custommenu){
					if (custommenu =='mhdrleftpan' || custommenu =='mhdrrightpan'){
					return false;
					}
					return true;
				}
			},	
			 
		];	
  });
})( jQuery );
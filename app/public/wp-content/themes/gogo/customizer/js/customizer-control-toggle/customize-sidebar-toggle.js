/*********************************/
// Sidebar hide and show control
/*********************************/
( function( $ ){
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ) {
ZTACustomizerToggles ['gogo_sidebar_default_layout'] = [
		    {
				controls: [    
				'gogo_sidebar_width',
				'gogo-settings[gogo_sidebar_inside_space]'   
				],
				callback: function(layout){
					var pageset = api( 'gogo_sidebar_page_layout' ).get();
					var blogset = api( 'gogo_sidebar_blog_layout' ).get();
					var arcset = api( 'gogo_sidebar_archive_layout' ).get();
					if((layout == 'no-sidebar') &&  (pageset == 'no-sidebar' || pageset == 'default') &&  (blogset == 'no-sidebar' || blogset == 'default') &&  (arcset == 'no-sidebar' || arcset == 'default')){
					return false;
					}
					return true;
				}
			},		
		];
  });
  ZTACustomizerToggles ['gogo_sidebar_page_layout'] = [
		    {
				controls: [    
				'gogo_sidebar_width',
				'gogo-settings[gogo_sidebar_inside_space]'   
				],
				callback: function(layout){
					if(layout=='left' || layout=='right'){
					return true;
					}
					return false;
				}
			},		
		];
	ZTACustomizerToggles ['gogo_sidebar_blog_layout'] = [
		    {
				controls: [    
				'gogo_sidebar_width',
				'gogo-settings[gogo_sidebar_inside_space]'   
				],
				callback: function(layout){
					if(layout=='left' || layout=='right'){
					return true;
					}
					return false;
				}
			},		
		];
		ZTACustomizerToggles ['gogo_sidebar_archive_layout'] = [
		    {
				controls: [    
				'gogo_sidebar_width',
				'gogo-settings[gogo_sidebar_inside_space]'   
				],
				callback: function(layout){
					if(layout=='left' || layout=='right'){
					return true;
					}
					return false;
				}
			},		
		];
})( jQuery );
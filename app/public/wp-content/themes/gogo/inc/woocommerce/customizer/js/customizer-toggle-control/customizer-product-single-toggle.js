/*********************************/
// Sidebar hide and show control
/*********************************/
( function( $ ){
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ) {
ZTACustomizerToggles ['gogo_single_product_tab_display'] = [
		    {
				controls: [    
				'gogo_single_product_tab_layout',   
				],
				callback: function(layout){
					if(layout == true){
					return true;
					}
					return false;
				}
			},		
		];
ZTACustomizerToggles ['gogo_upsell_product_display'] = [
		    {
				controls: [    
				'gogo_upsale_num_col_shw',
				'gogo_upsale_num_product_shw',   
				],
				callback: function(layout){
					if(layout == true){
					return true;
					}
					return false;
				}
			},		
		];
ZTACustomizerToggles ['gogo_related_product_display'] = [
		    {
				controls: [    
				'gogo_related_num_col_shw',
				'gogo_related_num_product_shw',   
				],
				callback: function(layout){
					if(layout == true){
					return true;
					}
					return false;
				}
			},		
		];
ZTACustomizerToggles ['gogo_single_product_content_width'] = [
		    {
				controls: [    
				'gogo_product_cnt_widht',   
				],
				callback: function(layout){
					if(layout == 'defualt'){
					return false;
					}
					return true;
				}
			},		
		];		
  });
})( jQuery );
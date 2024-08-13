/*************************************/
// Blog Single Hide and Show control
/*************************************/
( function( $ ){
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ){
ZTACustomizerToggles ['gogo_single_post_content_width'] = [
		    {
				controls: [    
				'gogo_sngle_cnt_widht',
				],
				callback: function(layout){
					if((layout == 'defualt')){
					return false;
					}
					return true;
				}
			},
		];
ZTACustomizerToggles ['gogo_single_related_post'] = [
		    {
				controls: [    
				'gogo_single_related_post_option',
				],
				callback: function(layout){
					if((layout == 1)){
					return true;
					}
					return false;
				}
			},
		];
  });
})( jQuery );
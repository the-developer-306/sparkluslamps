/*****************************************************************************/
/**********************customizer control setting*************************/
/*****************************************************************************/
( function( $ ) {
//**********************************/
// Footer widget hide and show settings
//**********************************/
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ){
		ZTACustomizerToggles ['gogo_bottom_footer_widget_layout'] = [
			{
				controls: [
					
					'gogo_footer_widget_content_width',
					'gogo_bottom_footer_widget_redirect',
					'gogo_bottom_footer_widget_color_scheme'
				],
				callback: function(layout){
					if ('ft-wgt-none'== layout){
						return false;
					}
					return true;
				}
			},
				
		];	
 });
})( jQuery );

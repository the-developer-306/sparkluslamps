/*****************************************************************************/
/**********************customizer control setting*************************/
/*****************************************************************************/
( function( $ ) {
//**********************************/
// container hide and show settings
//**********************************/
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ) {
		ZTACustomizerToggles ['gogo_container_site_layout'] = [
			{
				controls: [
					'gogo_conatiner_width'
				],
				callback: function( site_layout ){
					if ( 'fullwidth' == site_layout ){
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'gogo_conatiner_maxwidth','gogo_conatiner_top_bottom_margin'
				],
				callback: function( site_layout ) {
					if ( 'maxwidth' == site_layout ) {
						return true;
					}
					return false;
				}
			},	
				
		];	
 });
})( jQuery );

/*************************************/
// Blog Archive Hide and Show control
/*************************************/
( function( $ ){
ZTAControlTrigger.addHook( 'gogo-toggle-control', function( argument, api ){
ZTACustomizerToggles ['gogo_blog_layout'] = [
		    {
				controls: [    
				'gogo_blog_grid_layout',
				'gogo-settings[gogo-blog-structure-meta]' 
				],
				callback: function(layout){
					if((layout == 'gogo-blog-layout-1')){
					return true;
					}
					return false;
				}
			},
				
		];

  });
  ZTACustomizerToggles ['gogo_date_box'] = [
		    {
				controls: [    
				'gogo_datebox_style'
				],
				callback: function(layout){
					if(layout==1){
					return true;
					}
					return false;
				}
			},	
		];
ZTACustomizerToggles ['gogo_blog_post_content'] = [
		    {
				controls: [    
				'gogo_blog_expt_length',
				'gogo_blog_read_more_txt',
				'gogo_main_read_more_btn'
				],
				callback: function(layout){
					if(layout=='full'||layout=='nocontent'){
					return false;
					}
					return true;
				}
			},	
		];	
 ZTACustomizerToggles ['gogo_blog_post_pagination'] = [
		    {
				controls: [    
				'gogo_load_more_txt'
				],
				callback: function(layout){
					if(layout=='num' || layout=='scroll'){
					return false;
					}
					return true;
				}
			},	
		];
  ZTACustomizerToggles ['gogo_blog_content_width'] = [
		    {
				controls: [    
				'gogo_blog_cnt_widht'
				],
				callback: function(layout){
					if(layout=='custom'){
					return true;
					}
					return false;
				}
			},	
		];
 ZTACustomizerToggles ['gogo_blog_grid_layout'] = [
		    {
				controls: [    
				'gogo_blog_highlight'
				],
				callback: function(layout){
					if(layout!=='gogo-one-colm'){
					return true;
					}
					return false;
				}
			},	
		];
})( jQuery );
<?php 
/**
 * Common Function for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
/**
 * Function to get above footer
 */
if ( ! function_exists( 'gogo_top_footer_markup' ) ){	
function gogo_top_footer_markup(){ ?>
<?php 
$gogo_above_footer_layout    = get_theme_mod( 'gogo_above_footer_layout','ft-abv-none');
$gogo_above_footer_col1_set  = get_theme_mod( 'gogo_above_footer_col1_set','text');
$gogo_above_footer_col2_set  = get_theme_mod( 'gogo_above_footer_col2_set','text');
$gogo_above_footer_col3_set  = get_theme_mod( 'gogo_above_footer_col3_set','text');
?>	
<div class="top-footer">
		 	<div class="top-footer-bar <?php echo esc_attr($gogo_above_footer_layout);?>">
		       <div class="container">
			      <div class="top-footer-container">
			      	<?php if($gogo_above_footer_layout=='ft-abv-one'):?>	
		             <div class="top-footer-col1">
		             	<?php gogo_top_footer_conetnt_col1($gogo_above_footer_col1_set); ?>
		             </div>
		             <?php elseif($gogo_above_footer_layout=='ft-abv-two'):?>
		             <div class="top-footer-col1">
		             	<?php gogo_top_footer_conetnt_col1($gogo_above_footer_col1_set); ?>
		             </div>	
		             	<div class="top-footer-col2"><?php gogo_top_footer_conetnt_col2($gogo_above_footer_col2_set); ?></div>
		             	<?php elseif($gogo_above_footer_layout=='ft-abv-three'):?>
		             		<div class="top-footer-col1">
		             	<?php gogo_top_footer_conetnt_col1($gogo_above_footer_col1_set); ?>
		                </div>	
		             	<div class="top-footer-col2"><?php gogo_top_footer_conetnt_col2($gogo_above_footer_col2_set); ?></div>
		             	<div class="top-footer-col3"><?php gogo_top_footer_conetnt_col3($gogo_above_footer_col3_set); ?></div>
		            <?php endif;?> 
		           </div>
		       </div>
		    </div>
		</div>
<?php }
}
add_action( 'gogo_top_footer', 'gogo_top_footer_markup' );
//************************************/
// Footer top col1 function
//************************************/
if ( ! function_exists( 'gogo_top_footer_conetnt_col1' ) ){	
function gogo_top_footer_conetnt_col1($content){ ?>
<?php if($content=='text'){?>
<div class='content-html'>
  <?php if(is_user_logged_in()){
    echo esc_html(get_theme_mod('gogo_footer_col1_texthtml',  __( 'Add your content here', 'gogo' )));
  }else{
    echo esc_html(get_theme_mod('gogo_footer_col1_texthtml'));
  }?>
</div>
<?php }
elseif($content=='menu'){
if ( has_nav_menu('gogo-abv-footer-menu' ) ) {?>     
<?php 
 gogo_avove_footer_nav_menu();
 }else{  if(is_user_logged_in()){?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign footer menu', 'gogo' );?></a>
 <?php }} 
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
	<div class="content-widget">
    <?php if( is_active_sidebar('footer-top-first' ) ){
    dynamic_sidebar('footer-top-first' );
     }else{ if(is_user_logged_in()){?>
     	<a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
     <?php }}?>
     </div>
<?php }elseif($content=='social'){?>
<div class="content-social">
<?php echo gogo_social_links();?>
</div>
<?php }elseif($content=='none'){
return false;
}?>
<?php }
}
//************************************/
// Footer top col2 function
//************************************/
if ( ! function_exists( 'gogo_top_footer_conetnt_col2' ) ){	
function gogo_top_footer_conetnt_col2($content){ ?>
<?php if($content=='text'){?>
<div class='content-html'>
  <?php if(is_user_logged_in()){echo esc_html(get_theme_mod('gogo_above_footer_col2_texthtml',  __( 'Add your content here', 'gogo' )));}else{
    echo esc_html(get_theme_mod('gogo_above_footer_col2_texthtml'));
  }?>
</div>
<?php }elseif($content=='menu'){
	if ( has_nav_menu('gogo-abv-footer-menu' ) ) {?>
<?php 
  gogo_avove_footer_nav_menu();
 }else{ if(is_user_logged_in()){?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign footer menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
	<div class="content-widget">
    <?php if( is_active_sidebar('footer-top-second' ) ){
    dynamic_sidebar('footer-top-second' );
     }else{ if(is_user_logged_in()){?>
     	<a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
     <?php }}?>
     </div>
<?php }elseif($content=='social'){?>
<div class="content-social">
<?php echo gogo_social_links();?>
</div>
<?php }elseif($content=='none'){
return false;
}?>
<?php }
}
//************************************/
// Footer top col3 function
//************************************/
if ( ! function_exists( 'gogo_top_footer_conetnt_col3' ) ){	
function gogo_top_footer_conetnt_col3($content){?>
<?php if($content=='text'){?>
<div class='content-html'>
    <?php if(is_user_logged_in()){ echo esc_html(get_theme_mod('gogo_above_footer_col3_texthtml',  __( 'Add your content here', 'gogo' )));}else{
      echo esc_html(get_theme_mod('gogo_above_footer_col3_texthtml'));
     }?>
</div>
<?php }elseif($content=='menu'){
	if ( has_nav_menu('gogo-abv-footer-menu' ) ){?>
<?php 
  gogo_avove_footer_nav_menu();
 } else { if(is_user_logged_in()){ ?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign footer menu', 'gogo' );?></a>
<?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
	<div class="content-widget">
    <?php if( is_active_sidebar('footer-top-third' ) ){
    dynamic_sidebar('footer-top-third' );
     }else{ if(is_user_logged_in()){ ?>
     	<a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
     <?php }}?>
     </div>
<?php }elseif($content=='social'){?>
<div class="content-social">
<?php echo gogo_social_links();?>
</div>
<?php }elseif($content=='none'){
return false;
}?>
<?php }
}
/**
 * Function to get bottom footer
 */
if (function_exists('gogopro_body_classes')) {
if ( ! function_exists( 'gogo_bottom_footer_markup' ) ){	
function gogo_bottom_footer_markup(){ ?>
<?php 
$gogo_bottom_footer_layout  = get_theme_mod( 'gogo_bottom_footer_layout','ft-btm-one');
$gogo_bottom_footer_col1_set= get_theme_mod( 'gogo_bottom_footer_col1_set','text');
$gogo_bottom_footer_col2_set= get_theme_mod( 'gogo_bottom_footer_col2_set','text');
$gogo_bottom_footer_col3_set= get_theme_mod( 'gogo_bottom_footer_col3_set','text');
?>	
<div class="bottom-footer">
		 	<div class="bottom-footer-bar <?php echo esc_attr($gogo_bottom_footer_layout);?>">
		       <div class="container">
			      <div class="bottom-footer-container">
              <?php if($gogo_bottom_footer_layout=='ft-btm-one'):?>  
                 <div class="bottom-footer-col1">
                  <?php gogo_bottom_footer_conetnt_col1($gogo_bottom_footer_col1_set); ?>
                 </div>
               <?php elseif($gogo_bottom_footer_layout=='ft-btm-two'):?> 
                <div class="bottom-footer-col1">
                  <?php gogo_bottom_footer_conetnt_col1($gogo_bottom_footer_col1_set); ?>
                 </div>
                 <div class="bottom-footer-col2">
                  <?php gogo_bottom_footer_conetnt_col2($gogo_bottom_footer_col2_set); ?>
                  </div>
              <?php elseif($gogo_bottom_footer_layout=='ft-btm-three'):?>
                   <div class="bottom-footer-col1">
                  <?php gogo_bottom_footer_conetnt_col1($gogo_bottom_footer_col1_set); ?>
                 </div>
                 <div class="bottom-footer-col2">
                  <?php gogo_bottom_footer_conetnt_col2($gogo_bottom_footer_col2_set); ?>
                  </div>
                  <div class="bottom-footer-col3">
                    <?php gogo_bottom_footer_conetnt_col3($gogo_bottom_footer_col3_set); ?>
                  </div>
              <?php endif;?>
		           </div>
		       </div>
		    </div>
</div>
<?php }
}
add_action( 'gogo_bottom_footer', 'gogo_bottom_footer_markup' );
}
else{
add_action( 'gogo_bottom_footer', 'gogo_bottom_footer_markup_lite' );
function gogo_bottom_footer_markup_lite(){
 ?>
<div class="bottom-footer">
      <div class="bottom-footer-bar">
           <div class="container">
            <div class="bottom-footer-container">
                 <div class="bottom-footer-col1 th-ftrdescription">
                 <?php 
      $allowed_html = array(
                                  'a' => array(
                                  'href' => array(),
                                  'title' => array(),
                                  'target' => array()
                              ),
                              'br' => array(),
                              'em' => array(),
                              'strong' => array(),
                          );
                $url = "https://themehunk.com/product/gogo-amazing-wordpress-theme/";
              echo  sprintf( 
                wp_kses( __( 'Gogo developed by <a href="%s" target="_blank" class="th-branding">ThemeHunk</a>', 'gogo' ), $allowed_html), esc_url( $url ) );
      ?>
                 </div>
               </div>
             </div>
           </div>
         </div>
<?php } }
//************************************/
// Footer bottom col1 function
//************************************/
if ( ! function_exists( 'gogo_bottom_footer_conetnt_col1' ) ){ 
function gogo_bottom_footer_conetnt_col1($content){ ?>
<?php if($content=='text'){?>
<div class='content-html'>
  <?php if(is_user_logged_in()){ echo esc_html(get_theme_mod('gogo_footer_bottom_col1_texthtml',__('Copyright | Gogo | Powered by Gogo','gogo')));}else{
    echo esc_html(get_theme_mod('gogo_footer_bottom_col1_texthtml'));
  }?>
</div>
<?php }elseif($content=='menu'){
  if ( has_nav_menu('gogo-btm-footer-menu' ) ){?>
<?php 
  gogo_bottom_footer_nav_menu();
 }else{ if(is_user_logged_in()){?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign footer menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
  <div class="content-widget">
    <?php if( is_active_sidebar('footer-bottom-first' ) ){
    dynamic_sidebar('footer-bottom-first' );
     } else { if(is_user_logged_in()){?>
      <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
     <?php }}?>
     </div>
<?php }elseif($content=='social'){?>
<div class="content-social">
<?php echo gogo_social_links();?>
</div>
<?php }elseif($content=='none'){
return false;
}?>
<?php }
}
//************************************/
// Footer bottom col2 function
//************************************/
if ( ! function_exists( 'gogo_bottom_footer_conetnt_col2' ) ){ 
function gogo_bottom_footer_conetnt_col2($content){ ?>
<?php if($content=='text'){?>
<div class='content-html'>
   <?php if(is_user_logged_in()){ echo esc_html(get_theme_mod('gogo_footer_bottom_col2_texthtml',  __( 'Add your content here', 'gogo' )));}else{
    echo esc_html(get_theme_mod('gogo_footer_bottom_col2_texthtml'));
   }?>
</div>
<?php }elseif($content=='menu'){
  if ( has_nav_menu('gogo-btm-footer-menu' ) ) {?>
<?php 
  gogo_bottom_footer_nav_menu();
 }else{ if(is_user_logged_in()){ ?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign footer menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
  <div class="content-widget">
    <?php if( is_active_sidebar('footer-bottom-second')){
    dynamic_sidebar('footer-bottom-second');
          }else{ if(is_user_logged_in()){ ?>
      <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
        <?php } }?>
  </div>
<?php }elseif($content=='social'){?>
<div class="content-social">
<?php echo gogo_social_links();?>
</div>
<?php }elseif($content=='none'){
return false;
}?>
<?php }
}
//************************************/
// Footer bottom col3 function
//************************************/
if ( ! function_exists( 'gogo_bottom_footer_conetnt_col3' ) ){ 
function gogo_bottom_footer_conetnt_col3($content){ ?>
<?php if($content=='text'){?>
<div class='content-html'>
  <?php if(is_user_logged_in()){  echo esc_html(get_theme_mod('gogo_bottom_footer_col3_texthtml',  __( 'Add your content here', 'gogo' )));}else{
    echo esc_html(get_theme_mod('gogo_bottom_footer_col3_texthtml'));
  }?>
</div>
<?php }elseif($content=='menu'){
  if ( has_nav_menu('gogo-btm-footer-menu' ) ) {?>
<?php 
  gogo_bottom_footer_nav_menu();
 }else{ if(is_user_logged_in()){?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign footer menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
  <div class="content-widget">
    <?php if( is_active_sidebar('footer-bottom-third')){
    dynamic_sidebar('footer-bottom-third');
          }else{ if(is_user_logged_in()){ ?>
      <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
        <?php } }?>
  </div>
<?php }elseif($content=='social'){?>
<div class="content-social">
<?php echo gogo_social_links();?>
</div>
<?php }elseif($content=='none'){
return false;
}?>
<?php }
}
/**
 * Function to get footer widget
 */
if ( ! function_exists( 'gogo_footer_widget_markup' ) ){	
function gogo_footer_widget_markup(){ ?>
<?php 
$gogo_bottom_footer_widget_layout  = get_theme_mod( 'gogo_bottom_footer_widget_layout','ft-wgt-one');
?>	
<div class="widget-footer">
		 	<div class="widget-footer-bar <?php echo esc_attr($gogo_bottom_footer_widget_layout);?>">
		       <div class="container">
			      <div class="widget-footer-container">
			      	<?php if($gogo_bottom_footer_widget_layout=='ft-wgt-one'):?>
		             <div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
                      <?php elseif($gogo_bottom_footer_widget_layout=='ft-wgt-two'): ?>
                      	<div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php }}?>
                      </div>
		             <div class="widget-footer-col2"><?php if( is_active_sidebar('footer-2' ) ){
                                       dynamic_sidebar('footer-2' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
                      <?php elseif($gogo_bottom_footer_widget_layout=='ft-wgt-three'): ?>
                      	<div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col2"><?php if( is_active_sidebar('footer-2' ) ){
                                       dynamic_sidebar('footer-2' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col3"><?php if( is_active_sidebar('footer-3' ) ){
                                       dynamic_sidebar('footer-3' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
                      <?php elseif($gogo_bottom_footer_widget_layout=='ft-wgt-four'): ?>
                      	<div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col2"><?php if( is_active_sidebar('footer-2' ) ){
                                       dynamic_sidebar('footer-2' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col3"><?php if( is_active_sidebar('footer-3' ) ){
                                       dynamic_sidebar('footer-3' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col4"><?php if( is_active_sidebar('footer-4' ) ){
                                       dynamic_sidebar('footer-4' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
                  <?php elseif($gogo_bottom_footer_widget_layout=='ft-wgt-five'): ?>
                  	<div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col2"><?php if( is_active_sidebar('footer-2' ) ){
                                       dynamic_sidebar('footer-2' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col3"><?php if( is_active_sidebar('footer-3' ) ){
                                       dynamic_sidebar('footer-3' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
                       <?php elseif($gogo_bottom_footer_widget_layout=='ft-wgt-six'): ?>
                       <div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col2"><?php if( is_active_sidebar('footer-2' ) ){
                                       dynamic_sidebar('footer-2' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col3"><?php if( is_active_sidebar('footer-3' ) ){
                                       dynamic_sidebar('footer-3' );
                             }else{?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php }?>
                      </div>
                  <?php elseif($gogo_bottom_footer_widget_layout=='ft-wgt-seven'): ?>
                  	<div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col2"><?php if( is_active_sidebar('footer-2' ) ){
                                       dynamic_sidebar('footer-2' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
                  <?php elseif($gogo_bottom_footer_widget_layout=='ft-wgt-eight'): ?>
                  	<div class="widget-footer-col1">
		             	<?php if( is_active_sidebar('footer-1' ) ){
                                       dynamic_sidebar('footer-1' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
		             <div class="widget-footer-col2"><?php if( is_active_sidebar('footer-2' ) ){
                                       dynamic_sidebar('footer-2' );
                             }else{ if(is_user_logged_in()){?>
     	                     <a href="<?php echo esc_url( admin_url( 'widgets.php' ) ); ?>"><?php esc_html_e( 'Add Widget', 'gogo' );?></a>
                          <?php } }?>
                      </div>
                  <?php endif;?>
		        </div>
		  </div>
	</div>
</div>
<?php }
}
add_action( 'gogo_widget_footer', 'gogo_footer_widget_markup' );
/***********************************************************
*Footer Post Meta Hide and show Function for Gogo Theme
***************************************************************/
if( ! function_exists( 'gogo_footer_abv_post_meta' ) ){
function gogo_footer_abv_post_meta($page_post_meta_set=''){
    $gogo_above_footer_layout = get_theme_mod('gogo_above_footer_layout','ft-abv-none');
    if($page_post_meta_set!=='on'){
        if( $gogo_above_footer_layout!=='ft-abv-none'):
             gogo_top_footer();
    endif;    
  }
 }
}
//Widget footer
if( ! function_exists( 'gogo_footer_widget_post_meta' ) ){
function gogo_footer_widget_post_meta($page_post_meta_set=''){
   $gogo_bottom_footer_widget_layout = get_theme_mod('gogo_bottom_footer_widget_layout','ft-wgt-none');
    if($page_post_meta_set!=='on'){
        if($gogo_bottom_footer_widget_layout!=='ft-wgt-none'):
             gogo_widget_footer();
    endif;    
  }
 }
}
//Footer bottom
if( ! function_exists( 'gogo_footer_bottom_post_meta' ) ){
function gogo_footer_bottom_post_meta($page_post_meta_set=''){
   $gogo_bottom_footer_layout = get_theme_mod('gogo_bottom_footer_layout','ft-btm-one');
    if($page_post_meta_set!=='on'){
        if($gogo_bottom_footer_layout!=='ft-btm-none'):
             gogo_bottom_footer();
    endif;    
  }
 }
}
<?php 
/**
 * Common Function for Gogo Theme.
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
/**
 * Function to get mian Header
 */
if ( ! function_exists( 'gogo_main_header_markup' ) ){
function gogo_main_header_markup(){ ?>
<?php 
$gogo_main_header_layout = get_theme_mod( 'gogo_main_header_layout','mhdrleft');
$gogo_main_header_menu_disable = get_theme_mod( 'gogo_main_header_menu_disable',false);
$gogo_mobile_menu_open = get_theme_mod( 'gogo_mobile_menu_open','overcenter');
$gogo_main_header_mobile_txt = get_theme_mod( 'gogo_main_header_mobile_txt','');
$gogo_main_header_menu_align = get_theme_mod( 'gogo_main_header_menu_align','inline');
?>  
<div class="main-header <?php echo esc_attr($gogo_main_header_layout);?> <?php echo esc_attr($gogo_main_header_menu_align);?>">
            <div class="main-header-bar two">
                <div class="container">
                    <div class="main-header-container">
           <?php if($gogo_main_header_layout!=='mhdrrightpan' && $gogo_main_header_layout!=='mhdrleftpan'):?>
                        <div class="main-header-col1">
                             <?php echo esc_html(gogo_logo());?>
                        </div>
                    <?php endif; ?>
      <div class="main-header-col2">
   <?php if($gogo_main_header_menu_disable==false){?>
        <nav>
        <!-- Menu Toggle btn-->
        <div class="menu-toggle">
            <button type="button" class="menu-btn" id="menu-btn">
            <div class="btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </div>
            <?php if($gogo_main_header_mobile_txt!==''){ ?>
            <div class="text">
                <span><?php echo esc_html($gogo_main_header_mobile_txt);?></span>
            </div>
            <?php } ?>
            </button>
        </div>
        <div class="sider main gogo-menu-hide <?php echo esc_attr($gogo_mobile_menu_open);?>">
        <div class="sider-inner"><?php if( has_nav_menu('gogo-main-menu' )){ gogo_main_nav_menu();
        }else{
            wp_page_menu(array( 
            'items_wrap'  => '<ul class="gogo-menu" data-menu-style="'.gogo_header_menu_style().'">%3$s</ul>' ));
        }?>
        </div>
        </div>
        </nav>

    <?php } else { ?>

        <div class="sider-inner">
        <?php echo gogo_add_header_widthout_menu_custom_item();?>
        </div>

    <?php } ?>
    <?php 
    if(class_exists( 'WooCommerce' )){
    if(get_theme_mod('gogo_woo_cart_visibility','display-all')=='display-all'){?>
    <div class="gogo_woo_cart">
    <?php do_action( 'gogo_cart_count' ); 
       do_action( 'gogo_cart' );?>
    </div>
   <?php  }
    if(get_theme_mod('gogo_woo_cart_visibility')=='disable-mobile'){
       if (!wp_is_mobile()):?>
        <div class="gogo_woo_cart">
       <?php do_action( 'gogo_cart_count' ); 
       do_action( 'gogo_cart' );?>
        </div>
       <?php endif;
     }
    }
    ?>
        <!-- Responsive Menu Structure-->
    </div> <!-- col-2-->
                    </div>
                </div>
            </div>
        </div>              
<?php   }
}
add_action( 'gogo_main_header', 'gogo_main_header_markup' );
/**************************************/
//logo & site title function
/**************************************/
if ( ! function_exists( 'gogo_logo' ) ){
function gogo_logo(){
$title_disable          = get_theme_mod( 'title_disable','enable');
$tagline_disable        = get_theme_mod( 'tagline_disable','enable');
$description            = get_bloginfo( 'description', 'display' );?>
<div class="gogo-logo">
<?php gogo_custom_logo();?>
</div>
<?php 
if($title_disable!='' || $tagline_disable!=''){
if($title_disable!=''){ 
?>
<div class="site-title"><h1>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
</h1>
</div>
<?php
}
if($tagline_disable!=''){
if ( $description || is_customize_preview() ):?>
   <p><?php echo esc_html($description); ?></p>
<?php endif;
    }
   } 
 }
}
/**************************************/
//Top Header function
/**************************************/
if ( ! function_exists( 'gogo_top_header_markup' ) ){   
function gogo_top_header_markup(){ ?>
<?php 
$gogo_above_header_layout     = get_theme_mod( 'gogo_above_header_layout','abv-none');
$gogo_above_header_col1_set   = get_theme_mod( 'gogo_above_header_col1_set','text');
$gogo_above_header_col2_set   = get_theme_mod( 'gogo_above_header_col2_set','text');
$gogo_above_header_col3_set   = get_theme_mod( 'gogo_above_header_col3_set','text');
?>
<div class="top-header">
        <div class="top-header-bar <?php echo esc_attr($gogo_above_header_layout);?>">
            <div class="container">
                <div class="top-header-container">
                <?php if($gogo_above_header_layout=='abv-one'):?>   
                 <div class="top-header-col1">
                    <?php gogo_top_header_conetnt_col1($gogo_above_header_col1_set); ?>
                 </div>
                <?php elseif($gogo_above_header_layout=='abv-two'): ?>
                <div class="top-header-col1">
                    <?php gogo_top_header_conetnt_col1($gogo_above_header_col1_set); ?>
                 </div>
                 <div class="top-header-col2"><?php gogo_top_header_conetnt_col2($gogo_above_header_col2_set); ?></div>
                 <?php elseif($gogo_above_header_layout=='abv-three'): ?>
                  <div class="top-header-col1">
                    <?php gogo_top_header_conetnt_col1($gogo_above_header_col1_set); ?>
                 </div>
                 <div class="top-header-col2"><?php gogo_top_header_conetnt_col2($gogo_above_header_col2_set); ?></div>
                 <div class="top-header-col3"><?php gogo_top_header_conetnt_col3($gogo_above_header_col3_set); ?></div>
                 <?php endif;?>
                  </div>
            </div>
        </div>
</div>
<?php   }
}
add_action( 'gogo_top_header', 'gogo_top_header_markup' );
//************************************/
// top header col1 function
//************************************/
if ( ! function_exists( 'gogo_top_header_conetnt_col1' ) ){ 
function gogo_top_header_conetnt_col1($content){ 
$gogo_mobile_menu_open = get_theme_mod( 'gogo_mobile_menu_open','overcenter');?>
<?php if($content=='text'){?>
<div class='content-html'>
    <?php if(is_user_logged_in()){ 
       echo esc_html(get_theme_mod('gogo_col1_texthtml',  __( 'Add your content here', 'gogo' )));
   }else{
       echo esc_html(get_theme_mod('gogo_col1_texthtml'));
    }?>
</div>
<?php }elseif($content=='menu'){
if ( has_nav_menu('gogo-above-menu' ) ) {?>
<!-- Menu Toggle btn-->
     <nav> 
        <div class="menu-toggle">
            <button type="button" class="menu-btn" id="menu-btn-abv">
                <div class="btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </div>
            </button>
        </div>
        <div class="sider above gogo-menu-hide <?php echo esc_attr($gogo_mobile_menu_open);?>">
        <div class="sider-inner">
        <?php gogo_abv_nav_menu();?>
        </div>
      </div>
    </nav>
<?php 
  }else{ if(is_user_logged_in()){?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign Above header menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
    <div class="content-widget">
    <?php if( is_active_sidebar('top-header-widget-col1' ) ){
    dynamic_sidebar('top-header-widget-col1' );
     }else{ if(is_user_logged_in()){?>
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
// top header col2 function
//************************************/
if ( ! function_exists( 'gogo_top_header_conetnt_col2' ) ){ 
function gogo_top_header_conetnt_col2($content){ 
$gogo_mobile_menu_open = get_theme_mod( 'gogo_mobile_menu_open','overcenter');?>
<?php if($content=='text'){?>
<div class='content-html'>
    <?php if(is_user_logged_in()){ echo esc_html(get_theme_mod('gogo_col2_texthtml',  __( 'Add your content here', 'gogo' )));}else{
       echo esc_html(get_theme_mod('gogo_col2_texthtml'));
    }?>
</div>
<?php }elseif($content=='menu'){
    if ( has_nav_menu('gogo-above-menu' ) ){?>
<!-- Menu Toggle btn-->
        <nav> 
        <div class="menu-toggle">
            <button type="button" class="menu-btn" id="menu-btn-abv">
                <div class="btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </div>
            </button>
        </div>
        <div class="sider above gogo-menu-hide <?php echo esc_attr($gogo_mobile_menu_open);?>">
        <div class="sider-inner">
        <?php gogo_abv_nav_menu();?>
        </div>
      </div>
    </nav>
<?php 
 }else{ if(is_user_logged_in()){?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign Above header menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
    <div class="content-widget">
    <?php if( is_active_sidebar('top-header-widget-col2' ) ){
    dynamic_sidebar('top-header-widget-col2' );
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
// top header col3 function
//************************************/
if ( ! function_exists( 'gogo_top_header_conetnt_col3' ) ){ 
function gogo_top_header_conetnt_col3($content){ 
$gogo_mobile_menu_open = get_theme_mod( 'gogo_mobile_menu_open','overcenter');?>
<?php if($content=='text'){?>
<div class='content-html'>
    <?php if(is_user_logged_in()){ echo esc_html(get_theme_mod('gogo_col3_texthtml',  __( 'Add your content here', 'gogo' )));}else{
            echo esc_html(get_theme_mod('gogo_col3_texthtml'));
    }?>
</div>
<?php }elseif($content=='menu'){
    if ( has_nav_menu('gogo-above-menu' ) ) {?>
<!-- Menu Toggle btn-->
       <nav> 
        <div class="menu-toggle">
            <button type="button" class="menu-btn" id="menu-btn-abv">
                <div class="btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </div>
            </button>
        </div>
        <div class="sider above gogo-menu-hide <?php echo esc_attr($gogo_mobile_menu_open);?>">
        <div class="sider-inner">
        <?php gogo_abv_nav_menu();?>
        </div>
      </div>
    </nav>
<?php 
 }else{ if(is_user_logged_in()){?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign Above header menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
    <div class="content-widget">
    <?php if( is_active_sidebar('top-header-widget-col3' ) ){
    dynamic_sidebar('top-header-widget-col3' );
     }else{if(is_user_logged_in()){?>
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
/***************************/
// bottom-header
/***************************/
if ( ! function_exists( 'gogo_bottom_header_markup' ) ){
function gogo_bottom_header_markup(){ ?>
<?php 
$gogo_bottom_header_layout     = get_theme_mod( 'gogo_bottom_header_layout','btm-none');
$gogo_bottom_header_col1_set   = get_theme_mod( 'gogo_bottom_header_col1_set','text');
$gogo_bottom_header_col2_set   = get_theme_mod( 'gogo_bottom_header_col2_set','text');
$gogo_bottom_header_col3_set   = get_theme_mod( 'gogo_bottom_header_col3_set','text');
?>
<div class="bottom-header">
            <div class="bottom-header-bar <?php echo esc_attr($gogo_bottom_header_layout);?>">
                <div class="container">
                    <div class="bottom-header-container">
                 <?php if($gogo_bottom_header_layout=='btm-one'):?>
                     <div class="bottom-header-col1">
                        <?php gogo_bottom_header_content_col1($gogo_bottom_header_col1_set); ?>
                        </div>
                 <?php endif; ?>
                 <?php if($gogo_bottom_header_layout=='btm-two'):?>
                     <div class="bottom-header-col1">
                        <?php gogo_bottom_header_content_col1($gogo_bottom_header_col1_set); ?>
                        </div>
                     <div class="bottom-header-col2">
                        <?php gogo_bottom_header_content_col2($gogo_bottom_header_col2_set); ?>
                        </div>
                 <?php endif; ?>
                  <?php if($gogo_bottom_header_layout=='btm-three'):?>
                     <div class="bottom-header-col1"><?php gogo_bottom_header_content_col1($gogo_bottom_header_col1_set); ?></div>
                     <div class="bottom-header-col2">
                        <?php gogo_bottom_header_content_col2($gogo_bottom_header_col2_set); ?>
                        </div>
                     <div class="bottom-header-col3"><?php gogo_bottom_header_content_col3($gogo_bottom_header_col3_set); ?></div>
                 <?php endif; ?>
                   </div>
                 </div>
             </div>
         </div>
<?php   }
}
add_action( 'gogo_bottom_header', 'gogo_bottom_header_markup' );
//************************************/
// bottom header col1 function
//************************************/
if ( ! function_exists( 'gogo_bottom_header_content_col1' ) ){ 
function gogo_bottom_header_content_col1($content){ 
$gogo_mobile_menu_open = get_theme_mod( 'gogo_mobile_menu_open','overcenter');?>
<?php if($content=='text'){?>
<div class='content-html'>
    <?php if ( is_user_logged_in() ) { echo esc_html(get_theme_mod('gogo_col1_bottom_texthtml',  __( 'Add your content here', 'gogo' )));}else{
        echo esc_html(get_theme_mod('gogo_col1_bottom_texthtml'));
    }?>
</div>
<?php }elseif($content=='menu'){
    if ( has_nav_menu('gogo-bottom-menu' ) ) {?>
<!-- Menu Toggle btn-->
        <nav> 
        <div class="menu-toggle">
            <button type="button" class="menu-btn" id="menu-btn-btm">
                <div class="btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </div>
            </button>
        </div>
        <div class="sider bottom gogo-menu-hide <?php echo esc_attr($gogo_mobile_menu_open);?>">
        <div class="sider-inner">
        <?php gogo_btm_nav_menu();?>
        </div>
      </div>
    </nav>
<?php 
 }else{ if ( is_user_logged_in() ) {?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign Bottom Header Menu', 'gogo' );?></a>
 <?php } }
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
    <div class="content-widget">
    <?php if( is_active_sidebar('bottom-header-widget-col1' ) ){
    dynamic_sidebar('bottom-header-widget-col1' );
     }else{ if ( is_user_logged_in() ) {?>
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
// bottom header col2 function
//************************************/
if ( ! function_exists( 'gogo_bottom_header_content_col2' ) ){ 
function gogo_bottom_header_content_col2($content){ ?>
<?php if($content=='text'){?>
<div class='content-html'>
    <?php if ( is_user_logged_in() ) { echo esc_html(get_theme_mod('gogo_col2_bottom_texthtml',  __( 'Add your content here', 'gogo' )));}else{
        echo esc_html(get_theme_mod('gogo_col2_bottom_texthtml'));
    }?>
</div>
<?php }elseif($content=='menu'){
    if ( has_nav_menu('gogo-bottom-menu' ) ) {?>
<!-- Menu Toggle btn-->
        <div class="menu-toggle">
            <button type="button" id="menu-btn" id="menu-btn-btm">
                <div class="btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </div>
            </button>
        </div>
<?php 
  gogo_btm_nav_menu();
 }else{ if ( is_user_logged_in() ) {?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign Bottom Header Menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
    <div class="content-widget">
    <?php if( is_active_sidebar('bottom-header-widget-col2' ) ){
    dynamic_sidebar('bottom-header-widget-col2' );
     }else{ if ( is_user_logged_in() ) {?>
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
// bottom header col3 function
//************************************/
if ( ! function_exists( 'gogo_bottom_header_content_col3' ) ){ 
function gogo_bottom_header_content_col3($content){ ?>
<?php if($content=='text'){?>
<div class='content-html'>

    <?php if ( is_user_logged_in() ) { echo esc_html(get_theme_mod('gogo_col3_bottom_texthtml',  __( 'Add your content here', 'gogo' )));}else{
      echo esc_html(get_theme_mod('gogo_col3_bottom_texthtml'));
    }?>
</div>
<?php }elseif($content=='menu'){
    if ( has_nav_menu('gogo-bottom-menu' ) ) {?>
<!-- Menu Toggle btn-->
        <div class="menu-toggle">
            <button type="button" id="menu-btn" id="menu-btn-btm">
                <div class="btn">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </div>
            </button>
        </div>
<?php 
  gogo_btm_nav_menu();
 }else{ if ( is_user_logged_in() ) {?>
<a href="<?php echo esc_url( admin_url( 'nav-menus.php' ) ); ?>"><?php esc_html_e( 'Assign Bottom Header Menu', 'gogo' );?></a>
 <?php }}
}
elseif($content=='search'){?>
<div class="searchfrom">
<a href="#" class="search-btn"><i class="fa fa-search"></i></a>
<?php get_search_form();?>
</div>
<?php }elseif($content=='widget'){?>
    <div class="content-widget">
    <?php if( is_active_sidebar('bottom-header-widget-col3' ) ){
    dynamic_sidebar('bottom-header-widget-col3' );
     }else{ if ( is_user_logged_in() ) {?>
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
function gogo_front_page_activation_class(){
$activate='';
$classes =get_body_class();
if (in_array('page-template-gogo-frontpage',$classes)){
    $activate ='thunk-gogo-frontpage';
   }else{
    $activate ='';
  }
  return $activate;
}
/******************************/
//Transparent header function
/******************************/
function gogo_header_transparent_class($gogo_transparent_post_meta){
    if($gogo_transparent_post_meta=='default' || $gogo_transparent_post_meta==''){
        $class='';
        $classes =get_body_class();
        $gogo_header_transparent = get_theme_mod( 'gogo_header_transparent',true);
        $gogo_header_transparent_internal = get_theme_mod('gogo_header_transparent_internal',false);
        if(($gogo_header_transparent_internal == true && is_page())){
          $class='gogo-transparent-header';  
        }elseif($gogo_header_transparent==true){
            if(in_array('page-template-gogo-frontpage',$classes)){
               $class='gogo-transparent-header'; 
            }
        }else{
          $class=''; 
        }
       return $class;
   }else{
        $class='';
        if($gogo_transparent_post_meta=='enable'){
        $class= 'gogo-transparent-header'; 
        return $class;
        }

   }
}
if(get_theme_mod('gogo_main_header_set','none')!=='none'):
function gogo_add_header_custom_item($items, $args){
    if(get_theme_mod('gogo_main_header_set')=='text'){
        $csmhtml = get_theme_mod('gogo_main_header_texthtml',__('Add your content here','gogo'));
          if( ($args->theme_location!== 'gogo-above-menu') && ($args->theme_location!== 'gogo-bottom-menu') && ($args->theme_location!== 'gogo-abv-footer-menu') && ($args->theme_location!== 'gogo-btm-footer-menu')){
          $items .= '<li class="menu-item zta-custom-item">'
                  . '<div class="menu-custom-html">'
                  . esc_html($csmhtml)
                  . '</div>'
                  . '</li>';
          }
        return $items;
    }elseif(get_theme_mod('gogo_main_header_set')=='widget'){
        ob_start();
dynamic_sidebar('main-header-widget');
$sidebar = ob_get_contents();
ob_end_clean();
          if( ($args->theme_location!== 'gogo-above-menu') && ($args->theme_location!== 'gogo-bottom-menu') && ($args->theme_location!== 'gogo-abv-footer-menu') && ($args->theme_location!== 'gogo-btm-footer-menu')){
            $items .= '<li class="menu-item zta-custom-item">'
                   . '<div class="menu-custom-widget">'
                   . $sidebar
                   . '</div>'
                   . '</li>';
          }
        return $items;
    }elseif(get_theme_mod('gogo_main_header_set')=='search'){
         if( ($args->theme_location!== 'gogo-above-menu') && ($args->theme_location!== 'gogo-bottom-menu') && ($args->theme_location!== 'gogo-abv-footer-menu') && ($args->theme_location!== 'gogo-btm-footer-menu')){
          $items .= '<li class="menu-item zta-custom-item">'
                  . '<div class="menu-custom-search">'
                  .'<div class="searchfrom">'
                  .'<a href="#" class="search-btn"><i class="fa fa-search"></i></a>'
                  . '<form role="search" method="get" id="searchform" action="'.esc_url(home_url( '/' )).'">'
                  .'<div class="form-content">'
                  .'<input type="text" placeholder="'.esc_attr_x( 'Search', 'placeholder', 'gogo' ).'" name="s" id="s" value=""/>'
                  .'<input type="submit" value="'.esc_attr_x( 'Search', 'text', 'gogo' ).'" />'
                  .'</div>'
                  .'</form>'
                  .'</div>'
                  .'</div>'
                  .'</li>';
          }
        return $items;
    }
    elseif(get_theme_mod('gogo_main_header_set')=='social'){
          if( ($args->theme_location!== 'gogo-above-menu') && ($args->theme_location!== 'gogo-bottom-menu') && ($args->theme_location!== 'gogo-abv-footer-menu') && ($args->theme_location!== 'gogo-btm-footer-menu')){
          $items .= '<li class="menu-item zta-custom-item">
                    <div class="menu-custom-search"><div class="content-social">
                    '.gogo_social_links().'</div></div></li>';
          }
        return $items;
    }
    elseif(get_theme_mod('gogo_main_header_set')=='button'){
         $btntxt = get_theme_mod('gogo_main_header_btn_txt','');
         $btnurl = get_theme_mod('gogo_main_header_btn_url','');
          if( ($args->theme_location!== 'gogo-above-menu') && ($args->theme_location!== 'gogo-bottom-menu') && ($args->theme_location!== 'gogo-abv-footer-menu') && ($args->theme_location!== 'gogo-btm-footer-menu')){
          $items .='<a class="main-header-btn" href="'.esc_url($btnurl).'">'.esc_html($btntxt)
                  .'</a>';
          }
        return $items;
    }
    elseif(get_theme_mod('gogo_main_header_set')=='none'){
          if( ($args->theme_location!== 'gogo-above-menu') && ($args->theme_location!== 'gogo-bottom-menu') && ($args->theme_location!== 'gogo-abv-footer-menu') && ($args->theme_location!== 'gogo-btm-footer-menu')){
          $items .= '';
          }
        return $items;
    }

}
add_filter('wp_nav_menu_items', 'gogo_add_header_custom_item', 10, 2);
endif;
/************************/
// Without menu
/************************/
function gogo_add_header_widthout_menu_custom_item(){
     $items="";
    if(get_theme_mod('gogo_main_header_set')=='text'){
        $csmhtml = get_theme_mod('gogo_main_header_texthtml','');
          $items .= '<div class="menu-custom-html">'
                  . esc_html($csmhtml)
                  . '</div>';
          
        return $items;
    }elseif(get_theme_mod('gogo_main_header_set')=='widget'){
        ob_start();
dynamic_sidebar('main-header-widget');
$sidebar = ob_get_contents();
ob_end_clean();
          
            $items .= '<div class="menu-custom-widget">'
                   . $sidebar
                   . '</div>';           
        return $items;
    }elseif(get_theme_mod('gogo_main_header_set')=='search'){
          
          $items .='<div class="menu-custom-search">'
                  .'<div class="searchfrom">'
                  .'<a href="#" class="search-btn"><i class="fa fa-search"></i></a>'
                  . '<form role="search" method="get" id="searchform" action="'.esc_url(home_url( '/' )).'">'
                  .'<div class="form-content">'
                  .'<input type="text" placeholder="'.esc_attr_x( 'Search', 'placeholder', 'gogo' ).'" name="s" id="s" value=""/>'
                  .'<input type="submit" value="'.esc_attr_x( 'Search', 'text', 'gogo' ).'" />'
                  .'</div>'
                  .'</form>'
                  .'</div>'
                  .'</div>';
                  return $items;
                 
          }
      
    elseif(get_theme_mod('gogo_main_header_set')=='social'){
          
          $items .= '<div class="menu-custom-search"><div class="content-social">
                    '.gogo_social_links().'</div></div></li>';
         
        return $items;
    }
    elseif(get_theme_mod('gogo_main_header_set')=='button'){
         $btntxt = get_theme_mod('gogo_main_header_btn_txt','');
         $btnurl = get_theme_mod('gogo_main_header_btn_url','');
          
          $items .='<a class="main-header-btn" href="'.esc_url($btnurl).'">'.esc_html($btntxt)
                  .'</a>';
        return $items;
    }
    elseif(get_theme_mod('gogo_main_header_set')=='none'){
          
          $items .= '';
          
        return $items;
    }
}
/***********************************************************
*Header Post Meta Hide and show Function for Gogo Theme
***************************************************************/
if( ! function_exists( 'gogo_header_abv_post_meta' ) ){
function gogo_header_abv_post_meta($page_post_meta_set=''){
    $gogo_above_header_layout = get_theme_mod('gogo_above_header_layout','abv-two');
    if($page_post_meta_set!=='on'){
        if($gogo_above_header_layout!=='abv-none'):
            gogo_top_header();
    endif;    
  }
 }
}
// main
if( ! function_exists( 'gogo_header_main_post_meta' ) ){
function gogo_header_main_post_meta($page_post_meta_set=''){
    if($page_post_meta_set!=='on'){
        gogo_main_header();
  }
 }
}
// bottom
if( ! function_exists( 'gogo_header_btm_post_meta' ) ){
function gogo_header_btm_post_meta($page_post_meta_set=''){
    $gogo_bottom_header_layout = get_theme_mod('gogo_bottom_header_layout','btm-two');
    if($page_post_meta_set!=='on'){
        if( $gogo_bottom_header_layout!=='btm-none'):
            gogo_bottom_header();
    endif;    
  }
 }
}
//PRELOADER
if( ! function_exists( 'gogo_preloader' ) ){
function gogo_preloader(){
 if (( isset( $_REQUEST['action'] ) && 'elementor' == $_REQUEST['action'] ) ||
                isset( $_REQUEST['elementor-preview'] )){
      return;
 }else{         

    $gogo_preloader_enable = get_theme_mod('gogo_preloader_enable',false);
    $gogo_preloader_image_upload = get_theme_mod('gogo_preloader_image_upload',GOGO_LOADER);
    if($gogo_preloader_enable==true){ ?>
    <div class="gogo_overlayloader">
    <div class="gogo-pre-loader"><img src="<?php echo esc_url($gogo_preloader_image_upload);?>"></div>
    </div> 
   <?php }
   }
 }
}
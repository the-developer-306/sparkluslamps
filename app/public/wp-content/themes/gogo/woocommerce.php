<?php
/**
 * The template for displaying all single posts
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#woocommerce
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0 
 */
get_header();
if ( ! class_exists( 'WooCommerce' ) ){
    return;
}
if(is_shop()){
$shop_page_id = get_option( 'woocommerce_shop_page_id' );
$postid=$shop_page_id;	
}else{
$postid=$post->ID;	
}
$page_woo_post_meta_set     = get_post_meta( $postid, 'gogo_sidebar_dyn', true );
$page_content_post_meta_set = get_post_meta( $postid, 'gogo_content_dyn', true );
?>
<div id="content" class="site-content product <?php echo  esc_attr(gogo_page_content_layout('',$page_content_post_meta_set)); ?>">
  <div id="container" class="site-container <?php echo esc_attr(gogo_sidebar_layout('', $page_woo_post_meta_set));?>">
	<div id="primary" class="main content-area">
		<main id="main" class="site-main" role="main">
			<article id="post-<?php the_ID(); ?>">
		        <?php woocommerce_content(); ?>
		    </article>
		</main>
	</div>
	<?php if(gogo_sidebar_layout('', $page_woo_post_meta_set)!=='no-sidebar'): get_sidebar(); endif; ?>
  </div>
</div>
<?php get_footer();
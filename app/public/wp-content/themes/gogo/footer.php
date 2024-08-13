<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */ 
if ( is_single() || is_page() ){
$gogo_disable_above_footer_dyn = get_post_meta( $post->ID, 'gogo_disable_above_footer_dyn', true );
$gogo_disable_footer_widget_dyn = get_post_meta( $post->ID, 'gogo_disable_footer_widget_dyn', true ); 
$gogo_disable_bottom_footer_dyn = get_post_meta( $post->ID, 'gogo_disable_bottom_footer_dyn', true ); 
}else{
$gogo_disable_above_footer_dyn  ='';
$gogo_disable_footer_widget_dyn ='';
$gogo_disable_bottom_footer_dyn ='';
}
?>
<footer>
	<div class="footer-wrap widget-area">
		<?php 
		gogo_footer_abv_post_meta($gogo_disable_above_footer_dyn);
		gogo_footer_widget_post_meta($gogo_disable_footer_widget_dyn);
	    gogo_footer_bottom_post_meta($gogo_disable_bottom_footer_dyn);
		?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
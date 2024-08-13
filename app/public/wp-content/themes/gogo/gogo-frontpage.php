<?php
/**
 * Template Name: Home Page Layout
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0 
 */
?>
<?php 
get_header();  ?>
<div class="gogo-frontpage-wrapper">
<?php
if( shortcode_exists( 'gogo' ) ){
//-- All section loop --
do_shortcode("[gogo section='gogo_show_frontpage']");
// Body in a frames code Starts-->
	if (get_theme_mod('gogo_remove_padding',true)==true){ ?>
	<div class="border top horizontal"></div>
	<div class="border right vertical"></div>
	<div class="border bottom horizontal"></div>
	<div class="border left vertical"></div>
<?php }   //  Body in a frame code END-->
}
else{ if ( is_user_logged_in() ) {?>
		<a href="">
		<h2 class="thunk-frontpage-plugin"><?php esc_html_e('Please Install And Activate Hunk Companion Plugin To Setup The Front Page','gogo')?></h2> </a>

<?php } }
?>
</div> <!-- ..........gogo-frontpage-wrapper END ............-->
<?php get_footer(); ?>
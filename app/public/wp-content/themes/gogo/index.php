<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 * @version 1.0
 */
get_header(); 
$gogo_blog_post_grid_layout_class = apply_filters( 'gogo_blog_post_grid_layout_class','');
$gogo_blog_post_highlight_layout_class = apply_filters( 'gogo_blog_post_highlight_layout_class','');
$gogo_blog_post_add_space_layout_class = apply_filters( 'gogo_blog_post_add_space_layout_class','');
$gogo_blog_post_remove_space_image_class = apply_filters( 'gogo_blog_post_remove_space_image_class','');
$blog_layout_classes = apply_filters( 'gogo_blog_post_layout_class','');
$gogo_containerarchive  = get_theme_mod('gogo_containerarchive','');
?>
<div id="content" class="site-content <?php echo esc_attr(
$gogo_containerarchive); ?>">
<div id="container" class="site-container <?php echo esc_attr(gogo_sidebar_layout());?>  <?php echo esc_attr($gogo_blog_post_highlight_layout_class);?> <?php echo esc_attr($gogo_blog_post_grid_layout_class);?> <?php echo esc_attr($gogo_blog_post_add_space_layout_class);?> <?php echo esc_attr($gogo_blog_post_remove_space_image_class);?> <?php echo esc_attr($blog_layout_classes);?> ">
	<div id="primary" class="main content-area">
		<h1 class="entry-title th-blog-page-title">
			<?php 
			if ( !(is_front_page())  ) {
			$our_title = get_the_title( get_option('page_for_posts', true) );
			echo esc_html($our_title); 
		}
		else{
			esc_html_e('Blog','gogo');
		}

			?>
				
			</h1>
		<main id="main" class="site-main" role="main">
			
			<div class="main-content-row ">
			<?php
			if( have_posts()):
				/* Start the Loop */
				while ( have_posts() ) : the_post();
					/*
					 * Include the Post-Format-specific template for the content.
					 * If you want to override this in a child theme, then include a file
					 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
					 */
				get_template_part( 'template-parts/content', get_post_format() );
				endwhile;
				
			else:
				get_template_part( 'template-parts/content', 'none' );
			endif;
			?>
		  </div>
		</main><!-- #main -->
		<?php gogo_post_loader();?>
	</div><!-- #primary -->
<?php if(gogo_sidebar_layout()!=='no-sidebar'): get_sidebar(); endif; ?>
</div><!-- #container -->
</div><!-- #content -->
<?php get_footer();?>
</div><!-- #page -->

<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
get_header(); 
$gogo_blog_post_grid_layout_class = apply_filters( 'gogo_blog_post_grid_layout_class','');
$gogo_blog_post_highlight_layout_class = apply_filters( 'gogo_blog_post_highlight_layout_class','');
$gogo_blog_post_add_space_layout_class = apply_filters( 'gogo_blog_post_add_space_layout_class','');
$gogo_blog_post_remove_space_image_class = apply_filters( 'gogo_blog_post_remove_space_image_class','');
$blog_layout_classes = apply_filters( 'gogo_blog_post_layout_class','');
$gogo_containerarchive  = get_theme_mod('gogo_containerarchive','');?>
<div id="content" class="site-content <?php echo esc_attr(
$gogo_containerarchive); ?>">
  <div id="container" class="site-container  archive-page <?php echo esc_attr(gogo_sidebar_layout());?> <?php echo esc_attr($gogo_blog_post_highlight_layout_class);?>  <?php echo esc_attr($gogo_blog_post_grid_layout_class);?> <?php echo esc_attr($gogo_blog_post_add_space_layout_class);?> <?php echo esc_attr($gogo_blog_post_remove_space_image_class);?> <?php echo esc_attr($blog_layout_classes);?>">
	<div id="primary" class="main content-area">
		<div class="entry-header entry-page archive">
           <h1 class="entry-title"><?php the_archive_title();?></h1>
        </div>
		<main id="main" class="site-main" role="main">
			<div class="main-content-row ">
		<?php
		if ( have_posts() ) : ?>
			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content' );

			endwhile;

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>
            </div>
		</main><!-- #main -->
		<?php gogo_post_loader();?>
	</div>
	<?php if(gogo_sidebar_layout()!=='no-sidebar'): get_sidebar(); endif; ?>
  </div>
</div>
<?php get_footer();
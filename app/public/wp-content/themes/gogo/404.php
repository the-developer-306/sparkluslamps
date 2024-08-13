<?php
/**
 * The template for displaying 404 pages (not found)
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
get_header();
$gogo_containerpage     = get_theme_mod('gogo_containerpage','');?>
<div id="content" class="site-content <?php echo esc_attr($gogo_containerpage); ?>">
  <div id="container" class="site-container no-sidebar">
	<div id="primary" class="content-area">
		<main id="main" class="site-main">
          <article id="error-404">
			<div class="error-404 not-found">
				<div class="error-heading">
					<h2><?php esc_html_e( '404', 'gogo' ); ?></h2>
					<h3><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'gogo' ); ?></h3>
				</div><!-- .error-heading -->

				<div class="page-content">
					<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try a search?', 'gogo' ); ?></p>
					<?php get_search_form(); ?>
				</div><!-- .page-content -->

				<?php
				wp_nav_menu( array(
					'theme_location' => 'menu-404',
					'depth'          => 1,
					'container'      => 'div',
					'container_id'   => 'quick-links-404',
					'fallback_cb'    => false,
					) );
				?>
			</div><!-- .error-404 -->
          </article>
		</main><!-- #main -->
	</div><!-- #primary -->
</div>
</div>
<?php
get_footer();
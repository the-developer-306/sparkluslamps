<?php
/**
 * Template part for displaying posts
 * @link https://codex.wordpress.org/Template_Hierarchy
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0 
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php
	$blog_layout_classes = apply_filters( 'gogo_blog_post_layout_class','');
	$gogo_post_date_box  = apply_filters( 'gogo_post_date_box','');
    ?>
	<div class="entry-content-outer-wrapper <?php echo esc_attr($blog_layout_classes);?>" >
	    <?php 
	    if($blog_layout_classes=='gogo-blog-layout-1'){
	       gogo_blog_post_thumbnai_and_title_order();
	       gogo_the_excerpt();
	      } else { ?>
           <?php $no_thumb=''; if ((function_exists('has_post_thumbnail')) && (has_post_thumbnail())) { ?>
			<div class="post-img-wrapper">
		    <div class="post-img">
		    <?php echo esc_html($gogo_post_date_box);?>
			<a href="<?php the_permalink() ?>"> <?php the_post_thumbnail('post_thumbnail_loop'); ?></a>
			</div>
	        </div>
			<?php }else{
				$no_thumb='no-thumb';
			} ?>    
		    <div class="entry-content-wrapper <?php echo esc_attr($no_thumb);?>">
		    <?php if($no_thumb=='no-thumb'){echo esc_html($gogo_post_date_box);}?>
			<?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' ); ?>
			<?php gogo_blog_get_post_meta();?>
			<?php gogo_the_excerpt();?> 
		    </div>  
	      <?php }	 
		?>     
	</div>
</article>
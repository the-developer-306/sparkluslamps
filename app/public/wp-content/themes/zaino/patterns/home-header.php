<?php
/**
 * Title: Homepage Header
 * Slug: zaino/home-header
 * Categories: featured
 */
?>

<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"top":"0","right":"0","bottom":"0","left":"0"},"padding":{"top":"10px","right":"10px","bottom":"10px","left":"10px"}},"typography":{"fontSize":"13px"}},"textColor":"primary","className":"has-background"} -->
<p class="has-text-align-center has-background has-primary-color has-text-color" style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:13px">
    <?php _e( '*** Free shipping on orders over $100 ***', 'zaino' ); ?>
</p>
<!-- /wp:paragraph -->

<!-- wp:cover {"url":"<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/hero.jpg","dimRatio":20,"focalPoint":{"x":0.33,"y":0.65},"minHeight":75,"minHeightUnit":"vh","contentPosition":"center center","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:75vh"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-20 has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/hero.jpg" style="object-position:33% 65%" data-object-fit="cover" data-object-position="33% 65%"/><div class="wp-block-cover__inner-container">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|50"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:group {"align":"full","style":{"spacing":{"padding":{"bottom":"var:preset|spacing|20"}}},"layout":{"type":"flex","justifyContent":"space-between"}} -->
<div class="wp-block-group alignfull" style="padding-bottom:var(--wp--preset--spacing--20)"><!-- wp:site-title {"level":0,"style":{"typography":{"fontStyle":"normal","fontWeight":"800","textTransform":"uppercase"}},"fontSize":"medium","fontFamily":"archivo"} /-->

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:navigation {"layout":{"type":"flex","setCascadingProperties":true,"justifyContent":"right"}} /-->

<!-- wp:woocommerce/mini-cart {"hasHiddenPrice":true,"fontSize":"small"} /--></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"40vh"} -->
<div style="height:40vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:group {"align":"full","style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"left":"0","top":"var:preset|spacing|80"},"margin":{"bottom":"var:preset|spacing|80"}}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group alignfull" style="margin-bottom:var(--wp--preset--spacing--80);padding-top:var(--wp--preset--spacing--80);padding-left:0"><!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"align":"left","placeholder":"Write title…","style":{"typography":{"lineHeight":"1.5"}},"textColor":"contrast","fontSize":"small"} -->
<p class="has-text-align-left has-contrast-color has-text-color has-small-font-size" style="line-height:1.5"><?php _e( 'New Season', 'zaino' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"style":{"typography":{"textTransform":"uppercase"}},"textColor":"contrast","fontSize":"xx-large"} -->
<h2 class="has-contrast-color has-text-color has-xx-large-font-size" style="text-transform:uppercase"><?php _e( 'New Arrivals', 'zaino' ); ?></h2>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button"><?php _e( 'Shop Backpacks', 'zaino' ); ?></a></div>
<!-- /wp:button -->

<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button"><?php _e( 'Shop All', 'zaino' ); ?></a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->
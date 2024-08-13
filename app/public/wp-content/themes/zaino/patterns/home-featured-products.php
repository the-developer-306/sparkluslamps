<?php
/**
 * Title: Featured Products
 * Slug: zaino/home-featured-products
 * Categories: featured
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50)"><!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide">
	<!-- wp:heading {"style":{"typography":{"letterSpacing":"1px","textTransform":"uppercase"}},"fontSize":"large"} -->
		<h2 class="has-large-font-size" style="letter-spacing:1px;text-transform:uppercase"><?php _e( 'Featured Products', 'zaino' ); ?></h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"fontSize":"small"} -->
		<p class="has-small-font-size"><a href="#"><?php _e( 'View All', 'zaino' ); ?></a></p>
	<!-- /wp:paragraph -->
</div><!-- /wp:group -->

<!-- wp:woocommerce/product-category {"columns":4,"rows":1,"contentVisibility":{"image":true,"title":true,"price":true,"rating":true,"button":false},"align":"wide"} /-->

</div><!-- /wp:group -->
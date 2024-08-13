<?php
/**
 * Title: Default Footer
 * Slug: zaino/footer
 * Categories: footer
 * Block Types: core/template-part/footer
 */
?>

<!-- wp:group {"tagName":"footer","align":"full","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"spacing":{"padding":{"top":"4.5vw","bottom":"4.5vw"},"margin":{"top":"0px","bottom":"0px"}}},"textColor":"background","layout":{"type":"constrained"}} -->
<footer class="wp-block-group alignfull has-background-color has-text-color has-link-color" style="margin-top:0px;margin-bottom:0px;padding-top:4.5vw;padding-bottom:4.5vw"><!-- wp:columns {"align":"wide"} -->
<!-- wp:separator {"opacity":"css","align":"wide","className":"is-style-wide"} -->
<hr class="wp-block-separator alignwide has-css-opacity is-style-wide"/>
<!-- /wp:separator -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:paragraph -->
<p><strong><?php _e( '10% off your first order', 'zaino' ); ?></strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><?php _e( 'Subscribe to our mailing list for 10% off your first order.', 'zaino' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:paragraph -->
<p><strong><?php _e( '30 days returns', 'zaino' ); ?></strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><?php _e( 'Shop with certainty with our 30 day returns policy.', 'zaino' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"8px"}}} -->
<div class="wp-block-column"><!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","fontStyle":"normal","fontWeight":"700"}},"fontSize":"small"} -->
<p class="has-small-font-size" style="font-style:normal;font-weight:700;text-transform:uppercase"><?php _e( 'Quick Links', 'zaino' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'About Us', 'zaino' ); ?></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Contact', 'zaino' ); ?></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Shipping', 'zaino' ); ?></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Returns', 'zaino' ); ?></a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"8px"}}} -->
<div class="wp-block-column"><!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","fontStyle":"normal","fontWeight":"700"}},"fontSize":"small"} -->
<p class="has-small-font-size" style="font-style:normal;font-weight:700;text-transform:uppercase"><?php _e( 'Shop', 'zaino' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'New Arrivals', 'zaino' ); ?></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Bestsellers', 'zaino' ); ?></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Collections', 'zaino' ); ?></a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"8px"}}} -->
<div class="wp-block-column"><!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","fontStyle":"normal","fontWeight":"700"}},"fontSize":"small"} -->
<p class="has-small-font-size" style="font-style:normal;font-weight:700;text-transform:uppercase"><?php _e( 'Follow Us', 'zaino' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Facebook', 'zaino' ); ?></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Instagram', 'zaino' ); ?></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size"><a href="#"><?php _e( 'Pinterest', 'zaino' ); ?></a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></footer>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|40"}}},"layout":{"type":"flex","justifyContent":"space-between"}} -->
<div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--40)"><!-- wp:site-title {"level":0,"style":{"typography":{"fontStyle":"normal","fontWeight":"900","textTransform":"uppercase","letterSpacing":"0px"}},"fontFamily":"archivo"} /-->

<!-- wp:paragraph {"align":"right","style":{"typography":{"fontSize":"12px"}}} -->
    <p class="has-text-align-right" style="font-size:12px">
        <?php
        printf(
            /* Translators: WordPress link. */
            esc_html__( 'Proudly powered by %s', 'zaino' ),
            '<a href="' . esc_url( __( 'https://wordpress.org', 'zaino' ) ) . '" rel="nofollow">WordPress</a>'
        )
        ?>
    </p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
<?php

/**
 * Title: Header Style Overlay
 * Slug: shopcity/header-style-overlay
 * Categories: shopcity
 */

?>
<!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"20px","bottom":"20px"},"margin":{"top":"0","bottom":"0"}},"dimensions":{"minHeight":""},"border":{"bottom":{"color":"#ffffff29","width":"1px"},"top":[],"right":[],"left":[]}},"backgroundColor":"transparent","className":"is-style-default shopcity-overlay-header","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group is-style-default shopcity-overlay-header has-transparent-background-color has-background" style="border-bottom-color: #ffffff29; border-bottom-width: 1px; margin-top: 0; margin-bottom: 0; padding-top: 20px; padding-right: var(--wp--preset--spacing--50); padding-bottom: 20px; padding-left: var(--wp--preset--spacing--50)">
    <!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:group {"style":{"spacing":{"padding":{"right":"0","left":"0"},"blockGap":"0"}},"className":"shopcity-navigation-row","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"right"}} -->
        <div class="wp-block-group shopcity-navigation-row" style="padding-right: 0; padding-left: 0">
            <!-- wp:navigation {"textColor":"light-color","overlayMenu":"always","overlayTextColor":"dark-color","className":"shopcity-navigation","layout":{"type":"flex","justifyContent":"center"}} -->
            <!-- wp:page-list /-->
            <!-- /wp:navigation -->
        </div>
        <!-- /wp:group -->

        <!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"right":"0","left":"0"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
        <div class="wp-block-group" style="padding-right: 0; padding-left: 0">
            <!-- wp:site-logo {"width":40,"shouldSyncIcon":false,"className":"is-style-default"} /-->

            <!-- wp:site-title {"style":{"typography":{"fontSize":"28px","fontStyle":"normal","fontWeight":"500","textTransform":"uppercase","letterSpacing":"2px"},"elements":{"link":{"color":{"text":"var:preset|color|background"},":hover":{"color":{"text":"var:preset|color|secondary"}}}}}} /-->
        </div>
        <!-- /wp:group -->

        <!-- wp:group {"style":{"elements":{"link":{"color":{"text":"var:preset|color|light-color"}}}},"textColor":"light-color","layout":{"type":"flex","flexWrap":"nowrap"}} -->
        <div class="wp-block-group has-light-color-color has-text-color has-link-color">
            <!-- wp:woocommerce/mini-cart {"miniCartIcon":"bag-alt","priceColor":{"slug":"light-color","color":"#FFFFFE","name":"Light Color","class":"has-light-color-price-color"},"iconColor":{"slug":"light-color","color":"#FFFFFE","name":"Light Color","class":"has-light-color-price-color"},"productCountColor":{"slug":"primary","color":"#d793a0","name":"Primary","class":"has-primary-product-count-color"}} /-->
        </div>
        <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
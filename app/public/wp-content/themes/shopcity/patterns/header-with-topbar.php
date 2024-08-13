<?php

/**
 * Title: Header with Topbar
 * Slug: shopcity/header-with-topbar
 * Categories: shopcity
 */
?>
<!-- wp:group {"layout":{"type":"constrained","contentSize":"100%"}} -->
<div class="wp-block-group">
    <!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","top":"10px","bottom":"10px"}}},"backgroundColor":"dark-color","layout":{"type":"constrained","contentSize":"1180px"}} -->
    <div class="wp-block-group has-dark-color-background-color has-background" style="padding-top: 10px; padding-right: var(--wp--preset--spacing--40); padding-bottom: 10px; padding-left: var(--wp--preset--spacing--40)">
        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|light-color"}}}},"textColor":"light-color","fontSize":"small"} -->
        <p class="has-text-align-center has-light-color-color has-text-color has-link-color has-small-font-size"><?php esc_html_e('Score 25% Off Your Favorite Picks! Hurry, Dive In Before the Sun Sets on This Exclusive Offer!', 'shopcity') ?></p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","top":"24px","bottom":"24px"}}},"backgroundColor":"background","layout":{"type":"constrained","contentSize":"1180px"}} -->
    <div class="wp-block-group has-background-background-color has-background" style="margin-top: 0; margin-bottom: 0; padding-top: 24px; padding-right: var(--wp--preset--spacing--40); padding-bottom: 24px; padding-left: var(--wp--preset--spacing--40)">
        <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
        <div class="wp-block-group">
            <!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group">
                <!-- wp:site-logo {"width":40,"shouldSyncIcon":false,"style":{"color":{"duotone":"var:preset|duotone|midnight"}}} /-->

                <!-- wp:site-title {"fontSize":"big"} /-->
            </div>
            <!-- /wp:group -->

            <!-- wp:navigation {"ref":2788} /-->

            <!-- wp:group {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"spacing":{"blockGap":"0"}},"textColor":"background","layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group has-background-color has-text-color has-link-color">
                <!-- wp:woocommerce/customer-account {"displayStyle":"icon_only","iconStyle":"alt","iconClass":"wc-block-customer-account__account-icon","textColor":"dark-color","style":{"elements":{"link":{"color":{"text":"var:preset|color|dark-color"}}}}} /-->

                <!-- wp:woocommerce/mini-cart {"miniCartIcon":"bag-alt","priceColor":{"slug":"dark-color","color":"#242323","name":"Dark Color","class":"has-dark-color-icon-color"},"iconColor":{"slug":"dark-color","color":"#242323","name":"Dark Color","class":"has-dark-color-icon-color"},"productCountColor":{"slug":"primary","color":"#d793a0","name":"Primary","class":"has-primary-product-count-color"}} /-->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
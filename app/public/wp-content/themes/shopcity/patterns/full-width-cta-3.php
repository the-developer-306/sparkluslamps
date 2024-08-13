<?php

/**
 * Title: Full width CTA 
 * Slug: shopcity/full-width-cta-3
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/banner_img.jpg',
);
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"var:preset|spacing|40","right":"var:preset|spacing|40"},"margin":{"top":"0","bottom":"0"}}},"backgroundColor":"background","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group has-background-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:var(--wp--preset--spacing--40);padding-bottom:0;padding-left:var(--wp--preset--spacing--40)"><!-- wp:cover {"url":"<?php echo esc_url($shopcity_images[0]) ?>","id":3406,"dimRatio":50,"overlayColor":"dark-color","isUserOverlayColor":true,"minHeight":480,"style":{"spacing":{"padding":{"right":"var:preset|spacing|60","left":"var:preset|spacing|60","top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
    <div class="wp-block-cover" style="padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--60);min-height:480px"><span aria-hidden="true" class="wp-block-cover__background has-dark-color-background-color has-background-dim"></span><img class="wp-block-cover__image-background wp-image-3406" alt="" src="<?php echo esc_url($shopcity_images[0]) ?>" data-object-fit="cover" />
        <div class="wp-block-cover__inner-container"><!-- wp:columns -->
            <div class="wp-block-columns"><!-- wp:column {"width":"45%","style":{"spacing":{"blockGap":"var:preset|spacing|20"}}} -->
                <div class="wp-block-column" style="flex-basis:45%"><!-- wp:paragraph {"align":"center","style":{"typography":{"textTransform":"uppercase"}},"fontSize":"small"} -->
                    <p class="has-text-align-center has-small-font-size" style="text-transform:uppercase"><?php esc_html_e('New Collection', 'shopcity') ?></p>
                    <!-- /wp:paragraph -->

                    <!-- wp:heading {"textAlign":"center","level":1,"fontSize":"xx-large"} -->
                    <h1 class="wp-block-heading has-text-align-center has-xx-large-font-size"><?php esc_html_e('Making your summer more Fashionable &amp; Cool', 'shopcity') ?></h1>
                    <!-- /wp:heading -->

                    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"28px"}}}} -->
                    <div class="wp-block-buttons" style="margin-top:28px"><!-- wp:button {"backgroundColor":"transparent","textColor":"background","style":{"spacing":{"padding":{"left":"40px","right":"40px","top":"20px","bottom":"20px"}},"border":{"width":"1px","radius":"0px"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"className":"is-style-button-hover-secondary-bgcolor"} -->
                        <div class="wp-block-button is-style-button-hover-secondary-bgcolor"><a class="wp-block-button__link has-background-color has-transparent-background-color has-text-color has-background has-link-color wp-element-button" style="border-width:1px;border-radius:0px;padding-top:20px;padding-right:40px;padding-bottom:20px;padding-left:40px"><?php esc_html_e('Start Shopping', 'shopcity') ?></a></div>
                        <!-- /wp:button -->
                    </div>
                    <!-- /wp:buttons -->
                </div>
                <!-- /wp:column -->

                <!-- wp:column -->
                <div class="wp-block-column"></div>
                <!-- /wp:column -->
            </div>
            <!-- /wp:columns -->
        </div>
    </div>
    <!-- /wp:cover -->
</div>
<!-- /wp:group -->
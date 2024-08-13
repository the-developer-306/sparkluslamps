<?php

/**
 * Title: Shop by Categories 4
 * Slug: shopcity/shop-by-cat-4
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/cat_1.jpg',
    $shopcity_agency_url . 'assets/images/cat_2.jpg',
    $shopcity_agency_url . 'assets/images/cat_3.jpg',
);
?>
<!-- wp:group {"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|80","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}}},"backgroundColor":"background","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group has-background-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--80);padding-left:var(--wp--preset--spacing--40)"><!-- wp:heading {"textAlign":"center"} -->
    <h2 class="wp-block-heading has-text-align-center"><?php esc_html_e('Shop By Category', 'shopcity') ?></h2>
    <!-- /wp:heading -->

    <!-- wp:columns {"style":{"spacing":{"margin":{"top":"40px"}}}} -->
    <div class="wp-block-columns" style="margin-top:40px"><!-- wp:column -->
        <div class="wp-block-column"><!-- wp:cover {"url":"<?php echo esc_url($shopcity_images[0]) ?>","id":3517,"dimRatio":10,"overlayColor":"heading-color","isUserOverlayColor":true,"minHeight":300,"contentPosition":"bottom center","isDark":false,"style":{"border":{"radius":"12px"}},"className":"shopcity-hover-cover","layout":{"type":"constrained"}} -->
            <div class="wp-block-cover is-light has-custom-content-position is-position-bottom-center shopcity-hover-cover" style="border-radius:12px;min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-heading-color-background-color has-background-dim-10 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-3517" alt="" src="<?php echo esc_url($shopcity_images[0]) ?>" data-object-fit="cover" />
                <div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"big"} -->
                    <h3 class="wp-block-heading has-text-align-center has-background-color has-text-color has-link-color has-big-font-size"><?php esc_html_e('Footwear', 'shopcity') ?></h3>
                    <!-- /wp:heading -->
                </div>
            </div>
            <!-- /wp:cover -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column"><!-- wp:cover {"url":"<?php echo esc_url($shopcity_images[1]) ?>","id":3444,"dimRatio":10,"overlayColor":"heading-color","isUserOverlayColor":true,"minHeight":300,"contentPosition":"bottom center","isDark":false,"style":{"border":{"radius":"12px"}},"className":"shopcity-hover-cover","layout":{"type":"constrained"}} -->
            <div class="wp-block-cover is-light has-custom-content-position is-position-bottom-center shopcity-hover-cover" style="border-radius:12px;min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-heading-color-background-color has-background-dim-10 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-3444" alt="" src="<?php echo esc_url($shopcity_images[1]) ?>" data-object-fit="cover" />
                <div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"big"} -->
                    <h3 class="wp-block-heading has-text-align-center has-background-color has-text-color has-link-color has-big-font-size"><?php esc_html_e('Beauty &amp; Cosmetics', 'shopcity') ?></h3>
                    <!-- /wp:heading -->
                </div>
            </div>
            <!-- /wp:cover -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column"><!-- wp:cover {"url":"<?php echo esc_url($shopcity_images[2]) ?>","id":3112,"dimRatio":10,"overlayColor":"heading-color","isUserOverlayColor":true,"minHeight":300,"contentPosition":"bottom center","style":{"border":{"radius":"12px"}},"className":"shopcity-hover-cover","layout":{"type":"constrained"}} -->
            <div class="wp-block-cover has-custom-content-position is-position-bottom-center shopcity-hover-cover" style="border-radius:12px;min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-heading-color-background-color has-background-dim-10 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-3112" alt="" src="<?php echo esc_url($shopcity_images[2]) ?>" data-object-fit="cover" />
                <div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"big"} -->
                    <h3 class="wp-block-heading has-text-align-center has-background-color has-text-color has-link-color has-big-font-size"><?php esc_html_e('Fashion &amp; Clothing', 'shopcity') ?></h3>
                    <!-- /wp:heading -->
                </div>
            </div>
            <!-- /wp:cover -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->
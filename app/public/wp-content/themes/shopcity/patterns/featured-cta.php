<?php

/**
 * Title: Featured CTA
 * Slug: shopcity/featured-cta
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/icon_1.png',
    $shopcity_agency_url . 'assets/images/icon_2.png',
    $shopcity_agency_url . 'assets/images/icon_3.png'
);
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"40px","bottom":"40px","left":"var:preset|spacing|40","right":"var:preset|spacing|40"},"margin":{"top":"0","bottom":"0"}}},"backgroundColor":"background-alt","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group has-background-alt-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:40px;padding-right:var(--wp--preset--spacing--40);padding-bottom:40px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column -->
        <div class="wp-block-column"><!-- wp:image {"id":3768,"width":"auto","height":"50px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
            <figure class="wp-block-image aligncenter size-full is-resized"><img src="<?php echo esc_url($shopcity_images[0]) ?>" alt="" class="wp-image-3768" style="width:auto;height:50px" /></figure>
            <!-- /wp:image -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center"}} -->
            <div class="wp-block-group"><!-- wp:heading {"textAlign":"center","level":3} -->
                <h3 class="wp-block-heading has-text-align-center"><?php esc_html_e('Free Shipping', 'shopcity') ?></h3>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"align":"center"} -->
                <p class="has-text-align-center"><?php esc_html_e('You will love at great low prices', 'shopcity') ?></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column"><!-- wp:image {"id":3773,"width":"auto","height":"50px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
            <figure class="wp-block-image aligncenter size-full is-resized"><img src="<?php echo esc_url($shopcity_images[1]) ?>" alt="" class="wp-image-3773" style="width:auto;height:50px" /></figure>
            <!-- /wp:image -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center"}} -->
            <div class="wp-block-group"><!-- wp:heading {"textAlign":"center","level":3} -->
                <h3 class="wp-block-heading has-text-align-center"><?php esc_html_e('Fast Delivery', 'shopcity') ?></h3>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"align":"center"} -->
                <p class="has-text-align-center"><?php esc_html_e('You will love at great low prices', 'shopcity') ?></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column"><!-- wp:image {"id":3774,"width":"auto","height":"50px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
            <figure class="wp-block-image aligncenter size-full is-resized"><img src="<?php echo esc_url($shopcity_images[2]) ?>" alt="" class="wp-image-3774" style="width:auto;height:50px" /></figure>
            <!-- /wp:image -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center"}} -->
            <div class="wp-block-group"><!-- wp:heading {"textAlign":"center","level":3} -->
                <h3 class="wp-block-heading has-text-align-center"><?php esc_html_e('Secure Payment', 'shopcity') ?></h3>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"align":"center"} -->
                <p class="has-text-align-center"><?php esc_html_e('You will love at great low prices', 'shopcity') ?></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->
<?php

/**
 * Title: Photo Gallery 1
 * Slug: shopcity/instagallery-1
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/insta_1.jpg',
    $shopcity_agency_url . 'assets/images/insta_2.jpg',
    $shopcity_agency_url . 'assets/images/insta_3.jpg',
    $shopcity_agency_url . 'assets/images/insta_4.png',
);
?>
<!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","bottom":"100px"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group" style="padding-right:var(--wp--preset--spacing--40);padding-bottom:100px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:heading {"textAlign":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"},":hover":{"color":{"text":"var:preset|color|secondary"}}}}},"textColor":"heading-color"} -->
    <h2 class="wp-block-heading has-text-align-center has-heading-color-color has-text-color has-link-color"><?php esc_html_e('Follow us on Instagram', 'shopcity') ?> <a href="#"><?php esc_html_e('@shopcity', 'shopcity') ?></a></h2>
    <!-- /wp:heading -->

    <!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"15px","left":"15px"},"margin":{"top":"40px"}}}} -->
    <div class="wp-block-columns" style="margin-top:40px"><!-- wp:column {"width":"48.5%"} -->
        <div class="wp-block-column" style="flex-basis:48.5%"><!-- wp:gallery {"imageCrop":false,"linkTo":"none"} -->
            <figure class="wp-block-gallery has-nested-images columns-default"><!-- wp:image {"id":3523,"sizeSlug":"full","linkDestination":"none"} -->
                <figure class="wp-block-image size-full"><img src="<?php echo esc_url($shopcity_images[0]) ?>" alt="" class="wp-image-3523" /></figure>
                <!-- /wp:image -->
            </figure>
            <!-- /wp:gallery -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column"><!-- wp:columns -->
            <div class="wp-block-columns"><!-- wp:column -->
                <div class="wp-block-column"><!-- wp:gallery {"columns":2,"linkTo":"none","style":{"spacing":{"blockGap":{"top":"15px","left":"15px"}}}} -->
                    <figure class="wp-block-gallery has-nested-images columns-2 is-cropped"><!-- wp:image {"id":3524,"sizeSlug":"large","linkDestination":"none"} -->
                        <figure class="wp-block-image size-large"><img src="<?php echo esc_url($shopcity_images[1]) ?>" alt="" class="wp-image-3524" /></figure>
                        <!-- /wp:image -->

                        <!-- wp:image {"id":3525,"sizeSlug":"large","linkDestination":"none"} -->
                        <figure class="wp-block-image size-large"><img src="<?php echo esc_url($shopcity_images[2]) ?>" alt="" class="wp-image-3525" /></figure>
                        <!-- /wp:image -->

                        <!-- wp:image {"id":3526,"sizeSlug":"large","linkDestination":"none"} -->
                        <figure class="wp-block-image size-large"><img src="<?php echo esc_url($shopcity_images[3]) ?>" alt="" class="wp-image-3526" /></figure>
                        <!-- /wp:image -->
                    </figure>
                    <!-- /wp:gallery -->
                </div>
                <!-- /wp:column -->
            </div>
            <!-- /wp:columns -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->
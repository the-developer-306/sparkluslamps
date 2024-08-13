<?php

/**
 * Title: About Section 2
 * Slug: shopcity/about-section-2
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/about_1.jpg',
    $shopcity_agency_url . 'assets/images/about_2.jpg',
);
?>
<!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","top":"120px","bottom":"120px"}}},"backgroundColor":"background-alt","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group has-background-alt-background-color has-background" style="padding-top:120px;padding-right:var(--wp--preset--spacing--40);padding-bottom:120px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:columns {"verticalAlignment":"top","style":{"spacing":{"blockGap":{"left":"20px"}}}} -->
    <div class="wp-block-columns are-vertically-aligned-top"><!-- wp:column {"verticalAlignment":"top","width":"65%","style":{"spacing":{"padding":{"top":"130px"}}}} -->
        <div class="wp-block-column is-vertically-aligned-top" style="padding-top:130px;flex-basis:65%"><!-- wp:heading {"level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"500","fontSize":"64px"}}} -->
            <h1 class="wp-block-heading" style="font-size:64px;font-style:normal;font-weight:500"><?php esc_html_e('Premium &amp; Organic Cosmetic Beauty Products', 'shopcity') ?></h1>
            <!-- /wp:heading -->

            <!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"40px"},"margin":{"top":"40px"}}}} -->
            <div class="wp-block-columns" style="margin-top:40px"><!-- wp:column -->
                <div class="wp-block-column"><!-- wp:paragraph -->
                    <p><?php esc_html_e('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure reprehenderit in voluptate.', 'shopcity') ?></p>
                    <!-- /wp:paragraph -->

                    <!-- wp:buttons {"style":{"spacing":{"margin":{"top":"40px"}}}} -->
                    <div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"backgroundColor":"transparent","textColor":"heading-color","style":{"border":{"radius":"0px","width":"1px"},"spacing":{"padding":{"left":"var:preset|spacing|60","right":"var:preset|spacing|60","top":"18px","bottom":"18px"}},"elements":{"link":{"color":{"text":"var:preset|color|heading-color"}}}},"className":"is-style-button-hover-secondary-bgcolor"} -->
                        <div class="wp-block-button is-style-button-hover-secondary-bgcolor"><a class="wp-block-button__link has-heading-color-color has-transparent-background-color has-text-color has-background has-link-color wp-element-button" style="border-width:1px;border-radius:0px;padding-top:18px;padding-right:var(--wp--preset--spacing--60);padding-bottom:18px;padding-left:var(--wp--preset--spacing--60)"><?php esc_html_e('Explore More', 'shopcity') ?></a></div>
                        <!-- /wp:button -->
                    </div>
                    <!-- /wp:buttons -->
                </div>
                <!-- /wp:column -->

                <!-- wp:column -->
                <div class="wp-block-column"><!-- wp:image {"id":3444,"sizeSlug":"full","linkDestination":"none"} -->
                    <figure class="wp-block-image size-full"><img src="<?php echo esc_url($shopcity_images[1]) ?>" alt="" class="wp-image-3444" /></figure>
                    <!-- /wp:image -->
                </div>
                <!-- /wp:column -->
            </div>
            <!-- /wp:columns -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"verticalAlignment":"top"} -->
        <div class="wp-block-column is-vertically-aligned-top"><!-- wp:image {"id":3443,"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}}} -->
            <figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url($shopcity_images[0]) ?>" alt="" class="wp-image-3443" style="border-radius:0px" /></figure>
            <!-- /wp:image -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->
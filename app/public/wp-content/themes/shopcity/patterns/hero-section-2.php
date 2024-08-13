<?php

/**
 * Title: Hero Section 2
 * Slug: shopcity/hero-section-2
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/banner_img_2.jpg',
);
?>
<!-- wp:group {"style":{"spacing":{"padding":{"right":"0","left":"0","top":"0px","bottom":"0px"},"margin":{"top":"0","bottom":"0"}}},"backgroundColor":"background-alt","layout":{"type":"constrained","contentSize":"100%"}} -->
<div class="wp-block-group has-background-alt-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:0px;padding-right:0;padding-bottom:0px;padding-left:0"><!-- wp:cover {"url":"<?php echo esc_url($shopcity_images[0]) ?>","id":3406,"dimRatio":30,"customOverlayColor":"#100d1b","isUserOverlayColor":true,"minHeight":620,"contentPosition":"center center","isDark":false,"layout":{"type":"constrained","contentSize":"1180px"}} -->
    <div class="wp-block-cover is-light" style="min-height:620px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-30 has-background-dim" style="background-color:#100d1b"></span><img class="wp-block-cover__image-background wp-image-3406" alt="" src="<?php echo esc_url($shopcity_images[0]) ?>" data-object-fit="cover" />
        <div class="wp-block-cover__inner-container"><!-- wp:group {"style":{"spacing":{"padding":{"top":"140px","bottom":"140px","left":"0","right":"0"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
            <div class="wp-block-group" style="padding-top:140px;padding-right:0;padding-bottom:140px;padding-left:0"><!-- wp:columns -->
                <div class="wp-block-columns"><!-- wp:column {"width":"50%"} -->
                    <div class="wp-block-column" style="flex-basis:50%"><!-- wp:heading {"textAlign":"left","level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"600","lineHeight":"1.4"},"color":{"text":"#fbfbfb"}},"fontSize":"xxx-large"} -->
                        <h1 class="wp-block-heading has-text-align-left has-text-color has-xxx-large-font-size" style="color:#fbfbfb;font-style:normal;font-weight:600;line-height:1.4"><?php esc_html_e('Your Shopping Destination Awaits: Start Exploring!', 'shopcity') ?></h1>
                        <!-- /wp:heading -->

                        <!-- wp:paragraph {"align":"left","style":{"color":{"text":"#f1f1f2"}}} -->
                        <p class="has-text-align-left has-text-color" style="color:#f1f1f2"><?php esc_html_e('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 'shopcity') ?></p>
                        <!-- /wp:paragraph -->

                        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
                        <div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"transparent","textColor":"background","style":{"spacing":{"padding":{"left":"30px","right":"30px","top":"20px","bottom":"20px"}},"border":{"width":"1px","radius":"0px"}},"className":"is-style-button-hover-secondary-bgcolor","fontSize":"medium"} -->
                            <div class="wp-block-button has-custom-font-size is-style-button-hover-secondary-bgcolor has-medium-font-size"><a class="wp-block-button__link has-background-color has-transparent-background-color has-text-color has-background wp-element-button" style="border-width:1px;border-radius:0px;padding-top:20px;padding-right:30px;padding-bottom:20px;padding-left:30px"><?php esc_html_e('Make an Appointment', 'shopcity') ?></a></div>
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
            <!-- /wp:group -->
        </div>
    </div>
    <!-- /wp:cover -->
</div>
<!-- /wp:group -->
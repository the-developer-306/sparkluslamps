<?php

/**
 * Title: Hero Section 4
 * Slug: shopcity/hero-block-4
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/banner_img_4.jpg',
);
?>
<!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","top":"0px","bottom":"0px"},"margin":{"top":"0","bottom":"0"}}},"backgroundColor":"background","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group has-background-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:0px;padding-right:var(--wp--preset--spacing--40);padding-bottom:0px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:cover {"url":"<?php echo esc_url($shopcity_images[0]) ?>","id":3825,"dimRatio":30,"customOverlayColor":"#100d1b","isUserOverlayColor":true,"minHeight":480,"contentPosition":"center center","style":{"border":{"radius":"20px"},"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"32px","right":"32px"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
    <div class="wp-block-cover" style="border-radius:20px;padding-top:var(--wp--preset--spacing--40);padding-right:32px;padding-bottom:var(--wp--preset--spacing--40);padding-left:32px;min-height:480px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-30 has-background-dim" style="background-color:#100d1b"></span><img class="wp-block-cover__image-background wp-image-3825" alt="" src="<?php echo esc_url($shopcity_images[0]) ?>" data-object-fit="cover" />
        <div class="wp-block-cover__inner-container"><!-- wp:group {"style":{"spacing":{"padding":{"left":"0","right":"0"}}},"layout":{"type":"constrained","contentSize":"640px"}} -->
            <div class="wp-block-group" style="padding-right:0;padding-left:0"><!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"600","fontSize":"54px"},"color":{"text":"#fbfbfb"}}} -->
                <h1 class="wp-block-heading has-text-align-center has-text-color" style="color:#fbfbfb;font-size:54px;font-style:normal;font-weight:600"><?php esc_html_e('Your Shopping Destination Awaits: Start Exploring!', 'shopcity') ?></h1>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"align":"center","style":{"color":{"text":"#f1f1f2"}}} -->
                <p class="has-text-align-center has-text-color" style="color:#f1f1f2"><?php esc_html_e('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 'shopcity') ?></p>
                <!-- /wp:paragraph -->

                <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
                <div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"transparent","textColor":"background","style":{"spacing":{"padding":{"left":"30px","right":"30px","top":"20px","bottom":"20px"}},"border":{"width":"1px","radius":"12px"}},"className":"is-style-button-hover-secondary-bgcolor","fontSize":"medium"} -->
                    <div class="wp-block-button has-custom-font-size is-style-button-hover-secondary-bgcolor has-medium-font-size"><a class="wp-block-button__link has-background-color has-transparent-background-color has-text-color has-background wp-element-button" style="border-width:1px;border-radius:12px;padding-top:20px;padding-right:30px;padding-bottom:20px;padding-left:30px"><?php esc_html_e('Make an Appointment', 'shopcity') ?></a></div>
                    <!-- /wp:button -->
                </div>
                <!-- /wp:buttons -->
            </div>
            <!-- /wp:group -->
        </div>
    </div>
    <!-- /wp:cover -->
</div>
<!-- /wp:group -->
<?php

/**
 * Title: Author Info Box
 * Slug: shopcity/custom-author-box
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/author_image.jpg',
);
?>
<!-- wp:group {"style":{"border":{"radius":"0px","width":"1px","color":"#EEEEF8"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"24px","right":"24px"}}},"backgroundColor":"light-color","layout":{"type":"constrained","contentSize":"540px"}} -->
<div class="wp-block-group has-border-color has-light-color-background-color has-background" style="border-color:#EEEEF8;border-width:1px;border-radius:0px;padding-top:40px;padding-right:24px;padding-bottom:40px;padding-left:24px"><!-- wp:image {"id":150,"width":"100px","height":"100px","scale":"cover","sizeSlug":"large","linkDestination":"none","align":"center","style":{"border":{"radius":"50px","width":"0px","style":"none"}}} -->
    <figure class="wp-block-image aligncenter size-large is-resized has-custom-border"><img src="<?php echo esc_url($shopcity_images[0]) ?>" alt="" class="wp-image-150" style="border-style:none;border-width:0px;border-radius:50px;object-fit:cover;width:100px;height:100px" /></figure>
    <!-- /wp:image -->

    <!-- wp:heading {"textAlign":"center","level":3,"fontSize":"medium"} -->
    <h3 class="wp-block-heading has-text-align-center has-medium-font-size"><?php esc_html_e('Liyana Parker', 'shopcity') ?></h3>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center"><?php esc_html_e('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'shopcity') ?></p>
    <!-- /wp:paragraph -->

    <!-- wp:social-links {"iconColor":"dark-color","iconColorValue":"#021614","iconBackgroundColor":"background-alt","iconBackgroundColorValue":"#fcf3f5","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|30"}}},"layout":{"type":"flex","justifyContent":"center"}} -->
    <ul class="wp-block-social-links has-icon-color has-icon-background-color"><!-- wp:social-link {"url":"#","service":"x"} /-->

        <!-- wp:social-link {"url":"#","service":"lastfm"} /-->

        <!-- wp:social-link {"url":"#","service":"instagram"} /-->
    </ul>
    <!-- /wp:social-links -->
</div>
<!-- /wp:group -->
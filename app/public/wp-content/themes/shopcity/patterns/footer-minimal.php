<?php

/**
 * Title: Footer Minimal
 * Slug: shopcity/footer-minimal
 * Categories: shopcity
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"bottom":"var:preset|spacing|50","top":"60px"}}},"backgroundColor":"background-alt","textColor":"contrast","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group has-contrast-color has-background-alt-background-color has-text-color has-background" style="padding-top: 60px; padding-bottom: var(--wp--preset--spacing--50)">
    <!-- wp:group {"layout":{"type":"constrained"}} -->
    <div class="wp-block-group">
        <!-- wp:site-title {"level":2,"textAlign":"center","style":{"typography":{"textTransform":"uppercase","letterSpacing":"2px"},"elements":{"link":{"color":{"text":"var:preset|color|heading-color"},":hover":{"color":{"text":"var:preset|color|secondary"}}}}},"fontSize":"large"} /-->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","right":"0","bottom":"5px","left":"0"},"margin":{"top":"60px"}},"border":{"top":{"color":"#eae0e1","width":"1px"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
    <div class="wp-block-group" style="border-top-color: #eae0e1; border-top-width: 1px; margin-top: 60px; padding-top: 30px; padding-right: 0; padding-bottom: 5px; padding-left: 0">
        <!-- wp:paragraph {"textColor":"foreground"} -->
        <p class="has-foreground-color has-text-color"><?php esc_html_e('Proudly powered by WordPress&nbsp;|&nbsp;Shopcity - Made with Love by WebsiteinWP.', 'shopcity') ?></p>
        <!-- /wp:paragraph -->

        <!-- wp:social-links {"iconColor":"heading-color","iconColorValue":"#021612","openInNewTab":true,"style":{"spacing":{"blockGap":{"top":"0","left":"20px"},"margin":{"right":"0","left":"0","top":"0px"}}},"className":"is-style-logos-only","layout":{"type":"flex","flexWrap":"nowrap"}} -->
        <ul class="wp-block-social-links has-icon-color is-style-logos-only" style="margin-top: 0px; margin-right: 0; margin-left: 0">
            <!-- wp:social-link {"url":"#","service":"facebook"} /-->

            <!-- wp:social-link {"url":"#","service":"x"} /-->

            <!-- wp:social-link {"url":"#","service":"spotify"} /-->

            <!-- wp:social-link {"url":"#","service":"instagram"} /-->
        </ul>
        <!-- /wp:social-links -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
<?php

/**
 * Title: Post Grid Layout with Sidebar
 * Slug: shopcity/post-grid-with-sidebar
 * Categories: shopcity
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/icon_meta_user.png',
    $shopcity_agency_url . 'assets/images/icon_meta_date.png'
);
?>
<!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40","top":"60px","bottom":"60px"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:60px;padding-right:var(--wp--preset--spacing--40);padding-bottom:60px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"width":"70%"} -->
        <div class="wp-block-column" style="flex-basis:70%"><!-- wp:query {"queryId":18,"query":{"perPage":"8","pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false}} -->
            <div class="wp-block-query"><!-- wp:post-template {"layout":{"type":"grid","columnCount":2}} -->
                <!-- wp:group {"style":{"spacing":{"padding":{"top":"24px","bottom":"24px","left":"24px","right":"24px"}},"border":{"radius":"0px","width":"0px","style":"none"}},"backgroundColor":"light-color","className":"shopcity-post-box is-style-shopcity-boxshadow-medium","layout":{"type":"constrained"}} -->
                <div class="wp-block-group shopcity-post-box is-style-shopcity-boxshadow-medium has-light-color-background-color has-background" style="border-style:none;border-width:0px;border-radius:0px;padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px"><!-- wp:post-featured-image {"isLink":true,"height":"240px","style":{"border":{"radius":"0px"}}} /-->

                    <!-- wp:post-terms {"term":"category","prefix":"Posted On ","style":{"typography":{"fontStyle":"normal","fontWeight":"500","textTransform":"none"}},"className":"is-style-default","fontSize":"small"} /-->

                    <!-- wp:post-title {"isLink":true,"style":{"typography":{"fontSize":"24px","fontStyle":"normal","fontWeight":"600"},"elements":{"link":{"color":{"text":"var:preset|color|heading-color"},":hover":{"color":{"text":"var:preset|color|secondary"}}}},"spacing":{"margin":{"top":"8px"}}}} /-->

                    <!-- wp:group {"style":{"spacing":{"margin":{"top":"10px","bottom":"10px"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                    <div class="wp-block-group" style="margin-top:10px;margin-bottom:10px"><!-- wp:group {"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"blockGap":"10px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                        <div class="wp-block-group" style="margin-top:0;margin-bottom:0"><!-- wp:image {"id":251,"width":"auto","height":"18px","sizeSlug":"full","linkDestination":"none","style":{"color":{"duotone":"var:preset|duotone|meta-white"}}} -->
                            <figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url($shopcity_images[0]) ?>" alt="" class="wp-image-251" style="width:auto;height:18px" /></figure>
                            <!-- /wp:image -->

                            <!-- wp:post-author-name {"style":{"typography":{"textTransform":"capitalize","lineHeight":"1.6"}},"fontSize":"small"} /-->
                        </div>
                        <!-- /wp:group -->

                        <!-- wp:group {"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"blockGap":"10px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                        <div class="wp-block-group" style="margin-top:0;margin-bottom:0"><!-- wp:image {"id":255,"width":"auto","height":"18px","sizeSlug":"full","linkDestination":"none","style":{"color":{"duotone":"var:preset|duotone|meta-white"}}} -->
                            <figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url($shopcity_images[1]) ?>" alt="" class="wp-image-255" style="width:auto;height:18px" /></figure>
                            <!-- /wp:image -->

                            <!-- wp:post-date {"style":{"typography":{"lineHeight":"1.6"}}} /-->
                        </div>
                        <!-- /wp:group -->
                    </div>
                    <!-- /wp:group -->

                    <!-- wp:post-excerpt {"excerptLength":20,"style":{"spacing":{"padding":{"top":"0rem","bottom":"0rem"},"margin":{"top":"16px","bottom":"0"}}}} /-->

                    <!-- wp:group {"style":{"spacing":{"margin":{"top":"20px"}}},"layout":{"type":"flex","orientation":"vertical"}} -->
                    <div class="wp-block-group" style="margin-top:20px"><!-- wp:read-more {"content":"Continue Reading...","style":{"elements":{"link":{"color":{"text":"var:preset|color|light-color"}}},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"15px","right":"15px"}},"border":{"width":"0px","style":"none","radius":"4px"}},"backgroundColor":"primary","textColor":"light-color","className":"shopcity-post-more is-style-readmore-hover-secondary-fill"} /--></div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:group -->
                <!-- /wp:post-template -->

                <!-- wp:query-pagination {"className":"shopcity-pagination"} -->
                <!-- wp:query-pagination-previous /-->

                <!-- wp:query-pagination-numbers /-->

                <!-- wp:query-pagination-next /-->
                <!-- /wp:query-pagination -->
            </div>
            <!-- /wp:query -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"width":"30%"} -->
        <div class="wp-block-column" style="flex-basis:30%"><!-- wp:template-part {"slug":"sidebar","theme":"shopcity","area":"uncategorized"} /--></div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
</div>
<!-- /wp:group -->
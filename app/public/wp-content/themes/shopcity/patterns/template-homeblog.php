<?php

/**
 * Title: Blog Home Template
 * Slug: shopcity/template-homeblog
 * Categories: template
 * Inserter: false
 */
$shopcity_agency_url = trailingslashit(get_template_directory_uri());
$shopcity_images = array(
    $shopcity_agency_url . 'assets/images/icon_meta_user.png',
    $shopcity_agency_url . 'assets/images/icon_meta_date.png'
);
?>
<!-- wp:group {"tagName":"main","style":{"border":{"top":{"color":"var:preset|color|border-color","width":"1px"},"right":{"style":"none","width":"0px"},"bottom":{"color":"var:preset|color|border-color","width":"1px"},"left":{"style":"none","width":"0px"}}},"layout":{"type":"constrained","contentSize":"100%"}} -->
<main class="wp-block-group" style="border-top-color:var(--wp--preset--color--border-color);border-top-width:1px;border-right-style:none;border-right-width:0px;border-bottom-color:var(--wp--preset--color--border-color);border-bottom-width:1px;border-left-style:none;border-left-width:0px"><!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"0"}}},"backgroundColor":"nutral","layout":{"type":"constrained","contentSize":"1200px"}} -->
    <div class="wp-block-group has-nutral-background-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:0"><!-- wp:query-title {"type":"archive","textAlign":"center","showPrefix":false,"style":{"typography":{"fontStyle":"normal","fontWeight":"600"}},"fontSize":"xxx-large"} /--></div>
    <!-- /wp:group -->

    <!-- wp:group {"tagName":"main","style":{"spacing":{"padding":{"bottom":"40px","top":"20px"}}},"layout":{"type":"constrained","contentSize":"100%"}} -->
    <main class="wp-block-group" style="padding-top:20px;padding-bottom:40px"><!-- wp:group {"style":{"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
        <div class="wp-block-group" style="padding-right:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)"><!-- wp:columns -->
            <div class="wp-block-columns"><!-- wp:column {"width":"70%"} -->
                <div class="wp-block-column" style="flex-basis:70%"><!-- wp:query {"queryId":18,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":true},"layout":{"type":"default"}} -->
                    <div class="wp-block-query"><!-- wp:post-template {"layout":{"type":"grid","columnCount":2}} -->
                        <!-- wp:group {"style":{"spacing":{"padding":{"top":"20px","bottom":"20px","left":"20px","right":"20px"}},"border":{"radius":"0px","width":"0px","style":"none"}},"backgroundColor":"light-color","className":"is-style-shopcity-boxshadow shopcity-post-box","layout":{"type":"constrained"}} -->
                        <div class="wp-block-group is-style-shopcity-boxshadow shopcity-post-box has-light-color-background-color has-background" style="border-style:none;border-width:0px;border-radius:0px;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px"><!-- wp:post-featured-image {"isLink":true,"height":"260px","style":{"border":{"radius":"0px"}}} /-->

                            <!-- wp:post-terms {"term":"category","prefix":"Posted On ","style":{"typography":{"fontStyle":"normal","fontWeight":"500","textTransform":"none"}},"className":"is-style-default","fontSize":"small"} /-->

                            <!-- wp:post-title {"isLink":true,"style":{"typography":{"fontSize":"24px","fontStyle":"normal","fontWeight":"600"},"elements":{"link":{"color":{"text":"var:preset|color|heading-color"},":hover":{"color":{"text":"var:preset|color|secondary"}}}},"spacing":{"margin":{"top":"12px"}}}} /-->

                            <!-- wp:group {"style":{"spacing":{"margin":{"top":"10px","bottom":"10px"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                            <div class="wp-block-group" style="margin-top:10px;margin-bottom:10px"><!-- wp:group {"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"blockGap":"10px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                                <div class="wp-block-group" style="margin-top:0;margin-bottom:0"><!-- wp:image {"id":251,"width":"auto","height":"18px","sizeSlug":"full","linkDestination":"none","style":{"color":{"duotone":"var:preset|duotone|meta-white"}}} -->
                                    <figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url($shopcity_images[0]) ?>" alt="" class="wp-image-251" style="width:auto;height:18px" /></figure>
                                    <!-- /wp:image -->

                                    <!-- wp:post-author-name {"style":{"typography":{"textTransform":"capitalize","lineHeight":"1.6"},"spacing":{"padding":{"top":"3px"}}},"fontSize":"small"} /-->
                                </div>
                                <!-- /wp:group -->

                                <!-- wp:group {"style":{"spacing":{"margin":{"top":"0","bottom":"0"},"blockGap":"10px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                                <div class="wp-block-group" style="margin-top:0;margin-bottom:0"><!-- wp:image {"id":255,"width":"auto","height":"18px","sizeSlug":"full","linkDestination":"none","style":{"color":{"duotone":"var:preset|duotone|meta-white"}}} -->
                                    <figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url($shopcity_images[1]) ?>" alt="" class="wp-image-255" style="width:auto;height:18px" /></figure>
                                    <!-- /wp:image -->

                                    <!-- wp:post-date {"style":{"typography":{"lineHeight":"1.6"},"spacing":{"padding":{"top":"3px"}}}} /-->
                                </div>
                                <!-- /wp:group -->
                            </div>
                            <!-- /wp:group -->

                            <!-- wp:post-excerpt {"excerptLength":25} /-->

                            <!-- wp:group {"layout":{"type":"flex","orientation":"vertical"}} -->
                            <div class="wp-block-group"><!-- wp:read-more {"content":"Continue Reading...","style":{"elements":{"link":{"color":{"text":"var:preset|color|light-color"}}},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"15px","right":"15px"}},"border":{"width":"0px","style":"none","radius":"4px"}},"backgroundColor":"primary","textColor":"light-color","className":"shopcity-post-more is-style-readmore-hover-secondary-fill"} /--></div>
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
    </main>
    <!-- /wp:group -->
</main>
<!-- /wp:group -->
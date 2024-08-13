<?php
/**
 * Title: Homepage Featured Product
 * Slug: zaino/home-featured-product
 * Categories: featured
 */
?>

<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:media-text {"align":"full","mediaId":94,"mediaLink":"<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/product-feature.jpg","mediaType":"image","verticalAlignment":"center","imageFill":false,"focalPoint":{"x":0.33,"y":0.66},"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}},"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}},"backgroundColor":"primary","textColor":"base"} -->
<div class="wp-block-media-text alignfull is-stacked-on-mobile is-vertically-aligned-center has-base-color has-primary-background-color has-text-color has-background has-link-color" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><figure class="wp-block-media-text__media"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/product-feature.jpg" alt="" class="wp-image-94 size-full"/></figure><div class="wp-block-media-text__content"><!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|80","right":"var:preset|spacing|80","bottom":"0","left":"var:preset|spacing|80"}}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--80);padding-right:var(--wp--preset--spacing--80);padding-bottom:0;padding-left:var(--wp--preset--spacing--80)"><!-- wp:woocommerce/product-best-sellers {"columns":1,"rows":1,"contentVisibility":{"image":true,"title":true,"price":true,"rating":true,"button":false},"stockStatus":["instock","outofstock","onbackorder"],"orderby":"date"} /--></div>
<!-- /wp:group --></div></div>
<!-- /wp:media-text --></div>
<!-- /wp:group -->
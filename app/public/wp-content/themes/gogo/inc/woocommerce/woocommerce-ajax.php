<?php
/**
 * Perform WooCommerce function with Ajax
 *
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
add_action( 'wp_ajax_gogo_product_remove', 'gogo_product_remove' );
add_action( 'wp_ajax_nopriv_gogo_product_remove', 'gogo_product_remove' );
function gogo_product_remove(){
    global $woocommerce;
    $cart = $woocommerce->cart;
    foreach ($woocommerce->cart->get_cart() as $cart_item_key => $cart_item){
    if($cart_item['product_id'] == $_POST['product_id'] ){
        // Remove product in the cart using  cart_item_key.
        $cart->remove_cart_item($cart_item_key);
        woocommerce_mini_cart();
        exit();
      }
    }
  die();
}

function gogo_product_count_update(){
   global $woocommerce; 
   $gogo_woo_cart_disable = get_theme_mod('gogo_woo_cart_disable','icon'); 
   $ordertotal       = wp_kses_data( $woocommerce->cart->get_total() );
   $productadd       = wp_kses_data($woocommerce->cart->cart_contents_count);
  ?>
  <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="cart-contents" >
    <?php if($gogo_woo_cart_disable=='icon'){?>
    <i class="fa fa-shopping-basket"></i>
    <?php } elseif($gogo_woo_cart_disable=='icon+cartcount'){?>
    <i class="fa fa-shopping-basket"></i>
    <span class="cart-crl"><?php echo esc_html($woocommerce->cart->cart_contents_count); ?></span>
    <?php } elseif($gogo_woo_cart_disable=='icon+total'){?>
    <i class="fa fa-shopping-basket"></i>
    <span class="cart-total"><?php esc_html($ordertotal);?></span>  
    <?php } else { ?>
     <i class="fa fa-shopping-basket"></i>
    <span class="cart-crl"><?php echo esc_html($woocommerce->cart->cart_contents_count); ?></span>
    <span class="cart-total"><?php echo esc_html($ordertotal);?></span>
    <?php } ?>
  </a>  
<?php 
  die();
}
add_action( 'wp_ajax_gogo_product_count_update', 'gogo_product_count_update' );
add_action( 'wp_ajax_nopriv_gogo_product_count_update', 'gogo_product_count_update' );
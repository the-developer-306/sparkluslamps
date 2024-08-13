jQuery(document).ready(function(){
/* woo, wc_add_to_cart_params */
  if ( typeof wc_add_to_cart_params === 'undefined' ){
      return false;
  }
  // Ajax remove cart item
  jQuery( document ).on( 'click', 'a.remove', function(e) { // Remove button selector
      e.preventDefault();
      // AJAX add to cart request

      var $thisbutton = jQuery( this );
      if ( $thisbutton.is( '.remove' ) ){
          //Check if the button has a product ID
          if ( ! $thisbutton.attr( 'data-product_id' ) ){ 
              return true;
          }
        }
        $product_id = $thisbutton.attr( 'data-product_id' );
          var data = {'product_id':$product_id,
           'action': 'gogo_product_remove'
         };
         jQuery.post(
           woocommerce_params.ajax_url, // The AJAX URL
           data, // Send our PHP function
           function(response){
            jQuery('.gogo-quickcart-dropdown').html(response);

        var data = {
           'action': 'gogo_product_count_update'
         };
         jQuery.post(
           woocommerce_params.ajax_url, // The AJAX URL
           data, // Send our PHP function
           function(response_data){
            jQuery('.cart-contents').html(response_data);
           }
         );

           }
         );

      return false;
      // return true;
  });
});
<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/wordpress/wp-load.php');

function trigger_news_order($check_data_present,$data,$checkout_address) {
   global $woocommerce;
   $checkout_address['first_name'] = $checkout_address['firstName'];
   $checkout_address['last_name'] = $checkout_address['lastName'];
   $checkout_address['address_1'] = $checkout_address['line1'];
   $checkout_address['address_2'] = $checkout_address['line2'];
   $checkout_address['postcode'] = $checkout_address['pincode'];
    // if ($check_data_present != $data){
        $address = array(
            'first_name' => "Joe",
            'last_name'  => "Doe",
            'email'      => "john.doe@gmail.com",
            'phone'      => "0123456789",
            'address_1'  => "1 St. James Street",
            'address_2'  => "",
            'city'       => "San Francisco",
            'state'      => "California",
            'postcode'   => "92105",
            'country'    => "US",
    );
    $from_product_id = $data;
    $order = wc_create_order( $from_product_id );

    $order->set_address( $checkout_address, 'billing' );
    $order->set_address( $checkout_address, 'shipping' ); // The Shipping address

    $product    = wc_get_product( $from_product_id );

    $order->add_product( $product );
    $order->set_payment_method('cod');
    // $order->

    $order->calculate_totals();
    $order->add_order_note("Testing COD");
    $order->update_status( 'processing', 'Imported order', true );
    // }
    

    // Display a message with the order number
    return true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    global $woocommerce;
    // $woocommerce.ger
    $check_data_present = $_POST['check_data_present'];
    $item_i = $_POST['item_i'];
    $address = $_POST['address'];
    trigger_news_order(true,1554,$address);
    // $order = wc_create_order([1554]);
    // Process the data and call your function
    // echo json_encode($_SERVER);
    echo $address;
}else{
        echo 'Invalid request';

    }
    // Handle non-POST requests or direct access to the script

?>
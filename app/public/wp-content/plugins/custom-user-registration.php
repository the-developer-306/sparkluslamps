<?php
/*
Plugin Name: Custom User Registration Handling
Description: Link orders to newly registered users based on email.
*/

// Add your code below this line
// Add this code to your theme's functions.php

add_action('user_register', 'link_orders_to_user_on_registration', 10, 1);

function link_orders_to_user_on_registration($user_id) {
    // Get the newly registered user's email
    $user = get_userdata($user_id);
    $user_email = $user->user_email;

    // Query orders with the same email
    $orders = get_posts(array(
        'post_type'   => 'shop_order', // Adjust if your order post type is different
        'numberposts' => -1,
        'meta_key'    => '_billing_email',
        'meta_value'  => $user_email,
    ));

    // Link orders to the user account
    foreach ($orders as $order) {
        update_post_meta($order->ID, '_customer_user', $user_id);
    }
}
?>
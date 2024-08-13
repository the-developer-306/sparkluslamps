<?php
/**
 * Plugin Name: Elementor Addon
 * Description: Simple hello world widgets for Elementor.
 * Version:     1.0.0
 * Author:      Elementor Developer
 * Author URI:  https://developers.elementor.com/
 * Text Domain: elementor-addon
 */

include 'helper.php';

function register_customize_widgets( $widgets_manager ) {

    $plugin_options = (array) get_option("wcmamtx_plugin_options");

    $el_widgets = array('my-orders'=>'My Orders',
        'dashboard'=>'Dashboard',
        'form-add-payment-method'=>'Add Payment Method',
        'form-edit-account'=>'Edit Account Form',
        'form-edit-address'=>'Edit Address Form',
        'form-login'=>'Login Form',
        'my-address'=>'My Address',
        'navigation'=>'Navigation',
        'orders'=>'Orders',
        'payment-methods'=>'Payment Methods'
    );


    $el_widgets = isset($plugin_options['el_widgets']) && !empty($plugin_options['el_widgets']) ? $plugin_options['el_widgets'] : $el_widgets;

    if (isset($el_widgets['my-orders'])) {

        require_once( __DIR__ . '/widgets/my-orders.php' );
        $widgets_manager->register( new \Elementor_My_orders_widget() );

    }

    if (isset($el_widgets['my-orders'])) {


        require_once( __DIR__ . '/widgets/dashboard.php' );
        $widgets_manager->register( new \Elementor_dashboard_widget() );

    }

    if (isset($el_widgets['form-add-payment-method'])) {

        require_once( __DIR__ . '/widgets/form-add-payment-method.php' );
        $widgets_manager->register( new \Elementor_formaddpaymentmethod_widget() );

    }

    if (isset($el_widgets['form-edit-account'])) {


        require_once( __DIR__ . '/widgets/form-edit-account.php' );
        $widgets_manager->register( new \Elementor_formeditaccount_widget() );

    }

    if (isset($el_widgets['form-edit-address'])) {


        require_once( __DIR__ . '/widgets/form-edit-address.php' );
        $widgets_manager->register( new \Elementor_formeditaddress_widget() );

    }




    if (isset($el_widgets['form-login'])) {


        require_once( __DIR__ . '/widgets/form-login.php' );
        $widgets_manager->register( new \Elementor_formlogin_widget() );

    }



    if (isset($el_widgets['my-address'])) {


        require_once( __DIR__ . '/widgets/my-address.php' );
        $widgets_manager->register( new \Elementor_myaddress_widget() );

    }



    if (isset($el_widgets['navigation'])) {


        require_once( __DIR__ . '/widgets/navigation.php' );
        $widgets_manager->register( new \Elementor_navigation_widget() );

    }

    if (isset($el_widgets['orders'])) { 


        require_once( __DIR__ . '/widgets/orders.php' );
        $widgets_manager->register( new \Elementor_orders_widget() );

    }

    if (isset($el_widgets['payment-methods'])) { 


        require_once( __DIR__ . '/widgets/payment-methods.php' );
        $widgets_manager->register( new \Elementor_paymentmethods_widget() );

    }



}
add_action( 'elementor/widgets/register', 'register_customize_widgets' );
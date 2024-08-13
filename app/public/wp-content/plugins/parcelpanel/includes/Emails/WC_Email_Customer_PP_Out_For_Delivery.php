<?php

namespace ParcelPanel\Emails;

class WC_Email_Customer_PP_Out_For_Delivery extends WC_Email_Shipping_Notice
{
    public function __construct()
    {
        $this->id          = 'customer_pp_out_for_delivery_shipment';
        $this->title       = __( 'ParcelPanel Out for delivery', 'parcelpanel' );
        $this->description = __( 'ParcelPanel Out for delivery emails are sent to customers when the shipment has arrived at the local point and is out for delivery.', 'parcelpanel' );

        // Triggers for this email.
        add_action( 'parcelpanel_shipment_status_out_for_delivery_notification', [ $this, 'trigger' ], 10, 3 );
        add_action( 'parcelpanel_shipment_status_pickup_notification', [ $this, 'trigger' ], 10, 3 );

        // Call parent constructor.
        parent::__construct();
    }

    /**
     * Get email subject.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_subject()
    {
        return __( 'A shipment from order {order_number} is out for delivery', 'parcelpanel' );
    }

    /**
     * Get email heading.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_heading()
    {
        return __( 'Your order is out for delivery', 'parcelpanel' );
    }
}

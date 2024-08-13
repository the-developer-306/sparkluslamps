<?php

namespace ParcelPanel\Emails;

class WC_Email_Customer_PP_Delivered extends WC_Email_Shipping_Notice
{
    public function __construct()
    {
        $this->id          = 'customer_pp_delivered_shipment';
        $this->title       = __( 'ParcelPanel Delivered', 'parcelpanel' );
        $this->description = __( 'ParcelPanel Delivered emails are sent to customers when the shipment has been delivered.', 'parcelpanel' );

        // Triggers for this email.
        add_action( 'parcelpanel_shipment_status_delivered_notification', [ $this, 'trigger' ], 10, 3 );

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
        return __( 'A shipment from order {order_number} has been delivered', 'parcelpanel' );
    }

    /**
     * Get email heading.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_heading()
    {
        return __( 'Your order has been delivered', 'parcelpanel' );
    }
}

<?php

namespace ParcelPanel\Emails;

class WC_Email_Customer_PP_Exception extends WC_Email_Shipping_Notice
{
    public function __construct()
    {
        $this->id          = 'customer_pp_exception_shipment';
        $this->title       = __( 'ParcelPanel Exception', 'parcelpanel' );
        $this->description = __( 'ParcelPanel Exception emails are sent to customers when the shipment might have been sent back to the sender, damaged, or lost.', 'parcelpanel' );

        // Triggers for this email.
        add_action( 'parcelpanel_shipment_status_exception_notification', [ $this, 'trigger' ], 10, 3 );

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
        return __( 'A shipment from order {order_number} has a delivery exception', 'parcelpanel' );
    }

    /**
     * Get email heading.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_heading()
    {
        return __( 'Your order has a delivery exception', 'parcelpanel' );
    }
}

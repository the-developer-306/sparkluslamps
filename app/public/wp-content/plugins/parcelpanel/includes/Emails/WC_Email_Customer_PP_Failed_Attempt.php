<?php

namespace ParcelPanel\Emails;

class WC_Email_Customer_PP_Failed_Attempt extends WC_Email_Shipping_Notice
{
    public function __construct()
    {
        $this->id          = 'customer_pp_failed_attempt_shipment';
        $this->title       = __( 'ParcelPanel Failed attempt', 'parcelpanel' );
        $this->description = __( 'ParcelPanel Failed attempt emails are sent to customers when the carrier attempt to deliver the shipment but failed.', 'parcelpanel' );

        // Triggers for this email.
        add_action( 'parcelpanel_shipment_status_failed_attempt_notification', [ $this, 'trigger' ], 10, 3 );
        add_action( 'parcelpanel_shipment_status_undelivered_notification', [ $this, 'trigger' ], 10, 3 );

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
        return __( 'A shipment from order {order_number} has a failed delivery attempt', 'parcelpanel' );
    }

    /**
     * Get email heading.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_heading()
    {
        return __( 'Your order has a failed delivery attempt', 'parcelpanel' );
    }
}

<?php

namespace ParcelPanel\Emails;

class WC_Email_Customer_PP_In_Transit extends WC_Email_Shipping_Notice
{
    public function __construct()
    {
        $this->id          = 'customer_pp_in_transit_shipment';
        $this->title       = __( 'ParcelPanel In transit', 'parcelpanel' );
        $this->description = __( 'ParcelPanel In transit emails are sent to customers when the shipment is on the way.', 'parcelpanel' );

        // Triggers for this email.
        add_action( 'parcelpanel_shipment_status_in_transit_notification', [ $this, 'trigger' ], 10, 3 );
        add_action( 'parcelpanel_shipment_status_transit_notification', [ $this, 'trigger' ], 10, 3 );

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
        return __( 'A shipment from order {order_number} is in transit', 'parcelpanel' );
    }

    /**
     * Get email heading.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_heading()
    {
        return __( 'Your order is in transit', 'parcelpanel' );
    }
}

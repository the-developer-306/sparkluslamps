<?php

namespace ParcelPanel\Emails;

class WC_Email_Customer_PP_Shipped_Order extends WC_Email_Shipping_Notice
{
    public function __construct()
    {
        $this->id = 'customer_shipped_order';
        $this->title = __('ParcelPanel Shipped order', 'parcelpanel');
        $this->description = __('Order shipped emails are sent to customers when their orders are marked shipped and usually indicate that their all shipments in the orders have been shipped.', 'parcelpanel');

        // Triggers for this email.
        add_action('woocommerce_order_status_shipped_notification', [$this, 'trigger'], 10, 3);

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
        return __('Your {site_title} order is now shipped', 'parcelpanel');
    }

    /**
     * Get email heading.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_heading()
    {
        return __('Your order is Shipped', 'parcelpanel');
    }
}

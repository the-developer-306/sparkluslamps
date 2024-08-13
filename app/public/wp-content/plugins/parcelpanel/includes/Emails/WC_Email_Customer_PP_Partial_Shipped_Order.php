<?php

namespace ParcelPanel\Emails;

class WC_Email_Customer_PP_Partial_Shipped_Order extends WC_Email_Shipping_Notice
{
    public function __construct()
    {
        $this->id = 'customer_partial_shipped_order';
        $this->title = __('ParcelPanel Partially Shipped order', 'parcelpanel');
        $this->description = __('Order partially shipped emails are sent to customers when their orders are marked partially shipped and usually indicate that their orders have been partially shipped.', 'parcelpanel');

        // Triggers for this email.
        add_action('woocommerce_order_status_partial-shipped_notification', [$this, 'trigger'], 10, 3);

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
        return __('Your {site_title} order is now partially shipped', 'parcelpanel');
    }

    /**
     * Get email heading.
     *
     * @return string
     * @since  3.1.0
     */
    public function get_default_heading()
    {
        return __('Your order is Partially Shipped', 'parcelpanel');
    }
}

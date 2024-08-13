<?php

namespace ParcelPanel\Emails;

use ParcelPanel\Action\TrackingNumber;
use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

class WC_Email_Shipping_Notice extends \WC_Email
{
    private $shipment_items = [];

    public function __construct()
    {
        $this->customer_email = true;
        $this->template_html  = 'emails/shipment-notice-2.php';
        // $this->template_plain = 'emails/plain/shipment-notice.php';
        $this->template_base = \ParcelPanel\TEMPLATE_PATH;
        $this->enabled       = 'no';
        $this->placeholders  = [
            '{order_date}'   => '',
            '{order_number}' => '',
        ];

        // Call parent constructor.
        parent::__construct();
    }

    /**
     * Trigger the sending of this email.
     *
     * @param int             $order_id The order ID.
     * @param \WC_Order|false $order    Order object.
     */
    public function trigger($order_id, $order = false)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        $this->setup_locale();

        if ($order_id && !is_a($order, 'WC_Order')) {
            $order = wc_get_order($order_id);
        }

        if (!is_a($order, 'WC_Order')) {
            $this->restore_locale();
            return;
        }

        // is shipping all pro
        $order_status = '';
        if (is_a($order, 'WC_Order')) {
            $order_status = $order->get_status() ?? '';
        }
        // $_sync_status = $order->get_meta('_parcelpanel_sync_status');
        // if ('1' !== $_sync_status) {
        //     $this->restore_locale();
        //     return;
        // }

        $tracking_ids = get_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id));
        update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), []);

        $tracking_ids = is_array($tracking_ids) ? array_unique($tracking_ids, SORT_NUMERIC) : [];

        $where_str = 'order_id=%d';
        $query_args = [$order_id];
        // @codingStandardsIgnoreStart
        $_shipment_items = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT
                order_id,
                tracking_id,
                order_item_id,
                quantity,
                shipment_status
                FROM {$TABLE_TRACKING_ITEMS} AS ppti
                WHERE {$where_str}",
                $query_args
            )
        );
        // @codingStandardsIgnoreEnd
        $shipment_tracking_ids = array_column($_shipment_items, 'tracking_id');

        if (empty($shipment_tracking_ids)) {
            $this->restore_locale();
            return;
        }

        $shipment_tracking_ids_placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($shipment_tracking_ids, '%d');

        // @codingStandardsIgnoreStart
        $tracking_item_by_id = array_column($wpdb->get_results(
            $wpdb->prepare(
                "SELECT
                ppt.id,
                ppt.tracking_number,
                ppt.courier_code,
                ppt.last_event,
                ppt.original_country,
                ppt.destination_country,
                ppt.origin_info,
                ppt.destination_info,
                ppt.transit_time,
                ppt.stay_time,
                ppt.fulfilled_at,
                ppt.updated_at
                FROM {$TABLE_TRACKING} AS ppt
                WHERE ppt.id IN ({$shipment_tracking_ids_placeholder_str})",
                $shipment_tracking_ids
            )
        ), null, 'id');
        // @codingStandardsIgnoreEnd

        foreach ($_shipment_items as $item) {
            // t_id: 0 means not shipped
            $t_id = $item->tracking_id;
            if (empty($tracking_item_by_id[$t_id])) {
                if (!empty($t_id)) {
                    continue;
                }
                $tracking_item_by_id[$t_id] = TrackingNumber::get_empty_tracking();
            }

            $_shipment_item = $tracking_item_by_id[$t_id];

            if (empty($_shipment_item->order_id)) {
                $_shipment_item->order_id = $item->order_id;
            }
            if (!isset($_shipment_item->product)) {
                $_shipment_item->product = [];
            }

            $_shipment_item->shipment_status = $item->shipment_status;
            $_shipment_product = $_shipment_item->product[] = new \stdClass;
            $_shipment_product->id = $item->order_item_id;
            $_shipment_product->quantity = $item->quantity;
        }

        $order_number = $order->get_order_number();
        $order_billing_email = $order->get_billing_email();
        $is_multi_shipment = count($tracking_item_by_id) > 1;  // 标记是否多个单号

        $tracking_page_settings = \ParcelPanel\Models\TrackingSettings::instance()->get_settings();
        $display_option = $tracking_page_settings['display_option'];
        $b_od_nb_a_em = !empty($display_option['b_od_nb_a_em']) ? $display_option['b_od_nb_a_em'] : false; // track by order
        $b_tk_nb = !empty($display_option['b_tk_nb']) ? $display_option['b_tk_nb'] : false; // track by number

        $f = 0; // 单号序列
        foreach ($tracking_item_by_id as $item) {
            ++$f;
            $order_number_suffix = $is_multi_shipment ? "-F{$f}" : '';
            $item->order_number = "#{$order_number}{$order_number_suffix}";

            if ('global' === $item->courier_code) {
                $item->courier_code = 'cainiao';
            }

            $tracking_by_order = (new ParcelPanelFunction)->parcelpanel_get_track_page_url(false, $order_number, $order_billing_email);
            $tracking_by_num = (new ParcelPanelFunction)->parcelpanel_get_track_page_url_by_tracking_number($item->tracking_number);

            $item->track_link = $tracking_by_order;
            if ($b_tk_nb && !empty($item->tracking_number)) {
                $item->track_link = $tracking_by_num;
            }
        }

        if (!in_array($order_status, ['shipped'])) {
            if (!empty($tracking_ids)) {
                foreach ($tracking_item_by_id as $tracking_id => $item) {
                    if (!in_array($tracking_id, $tracking_ids)) {
                        unset($tracking_item_by_id[$tracking_id]);
                    }
                }
            } else {
                unset($tracking_item_by_id[0]);
            }
        }

        $this->shipment_items = $tracking_item_by_id;
        $this->object                           = $order;
        $this->recipient                        = $this->object->get_billing_email();
        $this->placeholders['{order_date}']   = wc_format_datetime($this->object->get_date_created());
        $this->placeholders['{order_number}'] = $this->object->get_order_number();

        if ($this->is_enabled() && $this->get_recipient()) {
            \ParcelPanel\DEBUG && (new ParcelPanelFunction)->parcelpanel_log("email sent; order_id={$order_id} recipient={$this->get_recipient()}");
            $this->send($this->get_recipient(), $this->get_subject(), $this->get_content(), $this->get_headers(), $this->get_attachments());
        }

        $this->restore_locale();
    }

    /**
     * Get content html.
     *
     * @return string
     */
    public function get_content_html()
    {
        return wc_get_template_html($this->template_html, [
            'order'              => $this->object,
            'email_heading'      => $this->get_heading(),
            'additional_content' => $this->get_additional_content(),
            'sent_to_admin'      => false,
            'plain_text'         => false,
            'email'              => $this,
            'shipment_items' => $this->shipment_items,
        ], 'parcelpanel-woocommerce/', \ParcelPanel\TEMPLATE_PATH);
    }

    /**
     * Get content plain.
     *
     * @return string
     */
    public function get_content_plain()
    {
        return wc_get_template_html($this->template_plain, [
            'order'              => $this->object,
            'email_heading'      => $this->get_heading(),
            'additional_content' => $this->get_additional_content(),
            'sent_to_admin'      => false,
            'plain_text'         => true,
            'email'              => $this,
        ], 'parcelpanel-woocommerce/', \ParcelPanel\TEMPLATE_PATH);
    }

    /**
     * Default content to show below main email content.
     *
     * @return string
     * @since 3.7.0
     */
    public function get_default_additional_content()
    {
        return __('Thanks for shopping with us.', 'parcelpanel');
    }

    /**
     * Default content tracking header text.
     *
     * @return string
     */
    public function get_default_tracking_header_text(): string
    {
        return __('Tracking Information', 'parcelpanel');
    }


    /**
     * Init settings form fields.
     */
    public function init_form_fields()
    {
        /* translators: %s: list of placeholders */
        $placeholder_text  = sprintf(__('Available placeholders: %s', 'parcelpanel'), '<code>' . implode('</code>, <code>', array_keys($this->placeholders)) . '</code>');
        $this->form_fields = [
            'enabled'            => [
                'title'   => __('Enable/Disable', 'parcelpanel'),
                'type'    => 'checkbox',
                'label'   => __('Enable this email notification', 'parcelpanel'),
                'default' => 'yes',
            ],
            'subject'            => [
                'title'       => __('Subject', 'parcelpanel'),
                'type'        => 'text',
                'desc_tip'    => true,
                'description' => $placeholder_text,
                'placeholder' => $this->get_default_subject(),
                'default'     => '',
            ],
            'heading'            => [
                'title'       => __('Email heading', 'parcelpanel'),
                'type'        => 'text',
                'desc_tip'    => true,
                'description' => $placeholder_text,
                'placeholder' => $this->get_default_heading(),
                'default'     => '',
            ],
            'additional_content' => [
                'title'       => __('Additional content', 'parcelpanel'),
                'description' => __('Text to appear below the main email content.', 'parcelpanel') . ' ' . $placeholder_text,
                'css'         => 'width:400px; height: 75px;',
                'placeholder' => __('N/A', 'parcelpanel'),
                'type'        => 'textarea',
                'default'     => $this->get_default_additional_content(),
                'desc_tip'    => true,
            ],
            'email_type'         => [
                'title'       => __('Email type', 'parcelpanel'),
                'type'        => 'select',
                'description' => __('Choose which format of email to send.', 'parcelpanel'),
                'default'     => 'html',
                'class'       => 'email_type wc-enhanced-select',
                'options'     => $this->get_email_type_options(),
                'desc_tip'    => true,
            ],
        ];
    }
}

<?php

namespace ParcelPanel\Action;

use ParcelPanel\Emails\WC_Email_Shipping_Notice;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;
use const ParcelPanel\TEMPLATE_PATH;
use ParcelPanel\Models\Table;

class Email
{
    use Singleton;

    /**
     * Display shipment info in customer emails.
     *
     * @param \WC_Order $order Order object.
     * @param bool $sent_to_admin Whether the email is being sent to admin or not.
     * @param bool $plain_text Whether email is in plain text or not.
     * @param \WC_Email $email Email object.
     */

    public function order_shipment_info($order, $sent_to_admin, $plain_text = null, $email = null)
    {
        $TRACKING_SECTION_ORDER_STATUS = AdminSettings::get_tracking_section_order_status_field();

        $order_id = $order->get_id();

        if (!is_a($email, WC_Email_Shipping_Notice::class)) {

            $order_status = '';
            if (is_a($order, 'WC_Order')) {
                $order_status = $order->get_status() ?? '';
            }

            // open status
            $is_enable_email_notice = AdminSettings::get_email_notification_add_tracking_section_field();

            if (!$is_enable_email_notice || !(in_array($order_status, $TRACKING_SECTION_ORDER_STATUS, true) || in_array("wc-{$order_status}", $TRACKING_SECTION_ORDER_STATUS, true))) {
                return;
            }
        }

        $tracking_items = ShopOrder::instance()->retrieve_shipments_info_by_order_id($order_id);

        if (empty($tracking_items)) {
            $tracking_item = TrackingNumber::get_empty_tracking();

            $tracking_item->shipment_status = 1;

            $tracking_items = [$tracking_item];
        }

        // only send this tracking
        $tracking_ids = get_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id));
        update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), []);
        foreach ($tracking_items as $key => $item) {
            // no tracking id send email
            if (!empty($tracking_ids) && !in_array($item->id, $tracking_ids)) {
                continue;
            }

            if ($item->id == 0) {
                unset($tracking_items[$key]);
                $tracking_items[] = $item;
                break;
            }
        }

        $order_number = $order->get_order_number();
        $order_billing_email = $order->get_billing_email();
        $is_multi_shipment = count($tracking_items) > 1;  // Mark whether there are multiple order numbers

        $tracking_page_settings = \ParcelPanel\Models\TrackingSettings::instance()->get_settings();
        $display_option = $tracking_page_settings['display_option'];
        $b_od_nb_a_em = !empty($display_option['b_od_nb_a_em']) ? $display_option['b_od_nb_a_em'] : false; // track by order
        $b_tk_nb = !empty($display_option['b_tk_nb']) ? $display_option['b_tk_nb'] : false; // track by number

        $f = 0; // number sort
        foreach ($tracking_items as $item) {
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

        // check tracking detail all pro is virtual
        $is_no_virtual = $this->check_pro_virtual($order);

        if (true == $plain_text || !$is_no_virtual) {
            // wc_get_template( 'emails/plain/tracking-info.php', [ 'tracking_items' => $tracking_items, 'order_id' => $order_id ], 'parcelpanel-woocommerce/', "{$stylesheet_directory}/woocommerce/" );
        } else {
            // if ( file_exists( $local_template ) && is_writable( $local_template ) ) {
            //     wc_get_template( 'emails/tracking-info.php', [ 'tracking_items' => $tracking_items, 'order_id' => $order_id ], 'parcelpanel-woocommerce/', "{$stylesheet_directory}/woocommerce/" );
            // } else {
            wc_get_template('emails/tracking-info.php', ['shipment_items' => $tracking_items, 'order_id' => $order_id], 'parcelpanel-woocommerce/', \ParcelPanel\TEMPLATE_PATH);
            // }
        }
    }

    /**
     * Kadence WooCommerce Email Designer plugin make pp email model to wc model(make plain_text = true to fix this no add 2 track btn)
     */
    public function shipment_email_order_details($order, $shipment_items, $sent_to_admin = null, $plain_text = null, $email = null)
    {
        $order_id = $order->get_id();
        // $_sync_status = $order->get_meta('_parcelpanel_sync_status');
        // if ('1' !== $_sync_status) {
        //     return;
        // }


        if (true == $plain_text) {
        } else {

            $no_track_btn = false;
            $email_id = !empty($email->id) ? $email->id : '';
            if (in_array($email_id, [
                'customer_partial_shipped_order',
                'customer_shipped_order',
            ])) {
                $TRACKING_SECTION_ORDER_STATUS = AdminSettings::get_tracking_section_order_status_field();
                $order_status = '';
                if (is_a($order, 'WC_Order')) {
                    $order_status = $order->get_status() ?? '';
                }
                // open status
                $is_enable_email_notice = AdminSettings::get_email_notification_add_tracking_section_field();

                if (!$is_enable_email_notice || !(in_array($order_status, $TRACKING_SECTION_ORDER_STATUS, true) || in_array("wc-{$order_status}", $TRACKING_SECTION_ORDER_STATUS, true))) {
                    $no_track_btn = true;
                }
            }

            // check tracking detail all pro is virtual
            $is_no_virtual = $this->check_pro_virtual($order);
            if ($is_no_virtual && !$no_track_btn) {
                wc_get_template(
                    'emails/tracking-info.php',
                    [
                        'order' => $order,
                        'sent_to_admin' => $sent_to_admin,
                        'plain_text' => true, // go order_shipment_info email no add track btn (Kadence WooCommerce Email Designer plugin make pp email model to wc model)
                        'email' => $email,
                        'order_id' => $order_id,
                        'shipment_items' => $shipment_items,
                    ],
                    'parcelpanel-woocommerce/',
                    \ParcelPanel\TEMPLATE_PATH
                );
            }

            wc_get_template(
                'emails/email-order-details.php',
                [
                    'order' => $order,
                    'sent_to_admin' => $sent_to_admin,
                    'plain_text' => true, // go order_shipment_info email no add track btn (Kadence WooCommerce Email Designer plugin make pp email model to wc model)
                    'email' => $email,
                    'order_id' => $order_id,
                    'shipment_items' => $shipment_items,
                ],
                'parcelpanel-woocommerce/',
                \ParcelPanel\TEMPLATE_PATH
            );
        }
    }

    // check is virtual
    public function check_pro_virtual($order)
    {
        // tracking detail all pro is virtual
        $items = $order->get_items();
        $is_no_virtual = true;
        foreach ($items as $item_id => $item) {
            $product = $item->get_product();

            if ($product->is_virtual()) {
                $is_no_virtual = false;
                // This product is virtual 
            } else {
                // This product is not virtual 
                $is_no_virtual = true;
                break;
            }
        }

        return $is_no_virtual;
    }

    // new preview email
    public function preview_emails_new()
    {
        if (isset($_GET['pp_preview_mail_wc'])) {
            if (!check_ajax_referer('pp-preview-mail-wc', false, false)) {
                die('Security check');
            }

            global $wpdb;

            // get order id
            $TABLE_TRACKING_ITEMS = Table::$tracking_items;

            $key = 'ppwc_preview_emails_new';
            $orderM = (new ParcelPanelFunction)->catch_data_all($key);
            if ($orderM === false) {
                // @codingStandardsIgnoreStart
                $orderM = $wpdb->get_col(
                    $wpdb->prepare(
                        "SELECT ppti.order_id FROM $TABLE_TRACKING_ITEMS as ppti ORDER BY ppti.order_id DESC LIMIT 1"
                    )
                );
                // @codingStandardsIgnoreEnd
                (new ParcelPanelFunction)->catch_data_all($key, $orderM, 2, HOUR_IN_SECONDS);
            }

            $orderID = !empty($orderM[0]) ? $orderM[0] : 0;
            if (empty($orderID)) {
                die('Security check');
            }

            $index = sanitize_text_field('WC_Email_Customer_Completed_Order');

            $wc_emails = \WC_Emails::instance();
            $emails    = $wc_emails->get_emails();
            $current_email = $emails[$index];

            $current_email->trigger($orderID);

            // get default track model
            $tracking_item = new \stdClass();
            $tracking_item->tracking_number = '4PX3000487548030CN';
            $tracking_item->courier_code = '4PX';
            $tracking_item->shipment_status = 4;
            $tracking_item->order_number = '#1234';


            $tracking_page_settings = \ParcelPanel\Models\TrackingSettings::instance()->get_settings();
            $display_option = $tracking_page_settings['display_option'];
            $b_od_nb_a_em = !empty($display_option['b_od_nb_a_em']) ? $display_option['b_od_nb_a_em'] : false; // track by order
            $b_tk_nb = !empty($display_option['b_tk_nb']) ? $display_option['b_tk_nb'] : false; // track by number

            $order_billing_email = 'support@parcelpanel.org';
            $tracking_by_order = (new ParcelPanelFunction)->parcelpanel_get_track_page_url(false, $tracking_item->order_number, $order_billing_email);
            $tracking_by_num = (new ParcelPanelFunction)->parcelpanel_get_track_page_url_by_tracking_number($tracking_item->tracking_number);

            $tracking_item->track_link = $tracking_by_order;
            if ($b_tk_nb && !empty($tracking_item->tracking_number)) {
                $tracking_item->track_link = $tracking_by_num;
            }
            // $tracking_item->track_link = (new ParcelPanelFunction)->parcelpanel_get_track_page_url(true);
            $shipment_items = [$tracking_item];

            ob_start();
            include TEMPLATE_PATH . '/emails/tracking-info.php';
            $order_shipment_table = ob_get_clean();

            $partner = "/<table(.*?)<\/table>/si";
            preg_match($partner, $order_shipment_table, $matches);
            $newTable = !empty($matches[0]) ? $matches[0] : '';
            // get default track model

            $current_email->settings['heading'] = "Your order is Complete!";
            $current_email->object->set_id(1234);
            $current_email->object->set_date_created(strtotime('2023-03-03'));

            $strEmpty = '';
            $current_email->object->set_billing_first_name('Parcel Panel');
            $current_email->object->set_billing_last_name($strEmpty);
            $current_email->object->set_billing_company($strEmpty);
            $current_email->object->set_billing_address_1('Customer Billing Address');
            $current_email->object->set_billing_address_2($strEmpty);
            $current_email->object->set_billing_city($strEmpty);
            $current_email->object->set_billing_state($strEmpty);
            $current_email->object->set_billing_postcode($strEmpty);
            $current_email->object->set_billing_country($strEmpty);
            $current_email->object->set_billing_email('support@parcelpanel.org');
            $current_email->object->set_billing_phone('000-000-0000');
            $current_email->object->set_shipping_first_name('Parcel Panel');
            $current_email->object->set_shipping_last_name($strEmpty);
            $current_email->object->set_shipping_company($strEmpty);
            $current_email->object->set_shipping_address_1('Customer Shipping Address');
            $current_email->object->set_shipping_address_2($strEmpty);
            $current_email->object->set_shipping_city($strEmpty);
            $current_email->object->set_shipping_state($strEmpty);
            $current_email->object->set_shipping_postcode($strEmpty);
            $current_email->object->set_shipping_country($strEmpty);
            $current_email->object->set_shipping_phone($strEmpty);

            // get email html
            $content = $current_email->get_content_html();

            // get default track model
            $partner = "/<table class=\"td pp-tracking_table\"(.*?)<\/table>/si";
            preg_match($partner, $content, $matchesO);
            $nowTable = !empty($matchesO[0]) ? $matchesO[0] : '';

            if (!empty($nowTable)) {
                $content = str_replace($nowTable, $newTable, $content);
            } else {
                $content = str_replace("<h2>", $order_shipment_table . "<h2>", $content);
            }
            // get default track model


            // get pro default
            $partner = "/<table class=\"td\" cellspacing=\"0\" cellpadding=\"6\"(.*?)<\/table>/si";
            preg_match($partner, $content, $matches1);
            $nowProTable = !empty($matches1[0]) ? $matches1[0] : '';
            if (!empty($nowProTable)) {
                $newProTable = $this->getDefaultPro();
                $content = str_replace($nowProTable, $newProTable, $content);
            }

            $content = apply_filters('woocommerce_mail_content', $current_email->style_inline($content));

            echo $content; // phpcs:ignore
            exit;
        }
    }

    // pro default
    private function getDefaultPro()
    {
        return '
        <table class="td" cellspacing="0" cellpadding="6" border="1" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; width: 100%; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif;" width="100%">
		<thead>
			<tr>
				<th class="td" scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Product</th>
				<th class="td" scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Quantity</th>
				<th class="td" scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Price</th>
			</tr>
		</thead>
		<tbody>
			<tr class="order_item">
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif; word-wrap: break-word;" align="left">
                    Oversized Single-breasted Jacket		
                </td>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif;" align="left">
                    2		
                </td>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif;" align="left">
                    <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>99.80</span>		
                </td>
            </tr>
	
            <tr class="order_item">
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif; word-wrap: break-word;" align="left">
                    Striped Cotton Jumper	
                </td>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif;" align="left">
                    1		
                </td>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif;" align="left">
                    <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>59.90</span>		
                </td>
            </tr>

			<tr>
                <td colspan="3" style="padding: 12px; text-align: left; vertical-align: middle; font-family: \'Helvetica Neue\', Helvetica, Roboto, Arial, sans-serif;" align="left">
                    <p style="margin: 0 0 16px;">You can Track Your Order from the \"Track Order\" Page.<br>
                        Thanks for Buying from Singhal Law Publication.<br>
                        Have a Nice Day!
                    </p>
                </td>
            </tr>
		
		</tbody>
		<tfoot>
			<tr>
                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left; border-top-width: 4px;" align="left">Subtotal:</th>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left; border-top-width: 4px;" align="left"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>159.70</span></td>
            </tr>
			<tr>
                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Discount:</th>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">-<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>20.00</span>
                </td>
            </tr>
            <tr>
                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Shipping:</th>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Free shipping</td>
            </tr>
            <tr>
                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Total:</th>
                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>139.70</span></td>
            </tr>
		</tfoot>
	</table>';
    }
}

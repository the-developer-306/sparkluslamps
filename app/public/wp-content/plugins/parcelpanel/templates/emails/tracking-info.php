<?php

use ParcelPanel\ParcelPanelFunction;

defined('ABSPATH') || die;

$preview = $preview ?? false;

$text_align = is_rtl() ? 'right' : 'left';

/**
 * Shipment Tracking
 *
 * Shows tracking information in the HTML order email
 */
if (!empty($shipment_items)) :

    $tracking_page_settings = \ParcelPanel\Models\TrackingSettings::instance()->get_settings();

    $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses();

    $DISPLAY_OPTION = $tracking_page_settings['display_option'];
    $TRANSLATIONS = $tracking_page_settings['tracking_page_translations'];

    $SHOW_CARRIER_DETAILS = $DISPLAY_OPTION['carrier_details'];
    $SHOW_TRACKING_NUMBER = $DISPLAY_OPTION['tracking_number'];

    // $TEXT_TRACK_YOUR_ORDER = esc_html( $TRANSLATIONS[ 'track_your_order' ] );
    $TEXT_TRACK_YOUR_ORDER = (new ParcelPanelFunction)->parcelpanel_text_track_your_order();
    $TEXT_ORDER_NUMBER = $TRANSLATIONS['order_number'];
    $TEXT_TRACKING_NUMBER = $TRANSLATIONS['tracking_number'];
    $TEXT_CARRIER = $TRANSLATIONS['carrier'];
    $TEXT_STATUS = $TRANSLATIONS['status'];
    $TEXT_TRACK = $TRANSLATIONS['track'];

    $show_status_th = true;
    // for user do
    $domain_url = home_url();
    $parsed_url = wp_parse_url($domain_url);
    $domain = $parsed_url['host'];
    if (in_array($domain, array('footsoccerpro.co'))) {
        $show_status_th = false;
        // foreach ($shipment_items as $shipment_item) {
        //     $check_status = $shipment_item->shipment_status ?? '';
        //     if ($check_status == 'pending') {
        //         $show_status_th = false;
        //         break;
        //     }
        // }        
    }

?><h2><?php echo esc_html($TEXT_TRACK_YOUR_ORDER) ?></h2>
    <table class="td pp-tracking_table" cellspacing="0" cellpadding="6" style="width:100%;border-collapse:collapse">
        <thead>
            <tr>
                <th class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><?php echo esc_html($TEXT_ORDER_NUMBER) ?></th>
                <?php if ($SHOW_TRACKING_NUMBER) { ?>
                    <th class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><?php echo esc_html($TEXT_TRACKING_NUMBER) ?></th>
                <?php } ?>
                <?php if ($SHOW_CARRIER_DETAILS) { ?>
                    <th class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><?php echo esc_html($TEXT_CARRIER) ?></th>
                <?php } ?>
                <?php if ($show_status_th) { ?>
                    <th class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><?php echo esc_html($TEXT_STATUS) ?></th>
                <?php } ?>
                <th class="td"></th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($shipment_items as $shipment_item) {
                $order_number = $shipment_item->order_number;
                $track_link = $shipment_item->track_link;
                $tracking_number = $shipment_item->tracking_number;
                $courier_code = $shipment_item->courier_code;

                // Read the basic information of the carrier based on the short code
                $express_info = (new ParcelPanelFunction)->parcelpanel_get_courier_info($courier_code);
            ?>
                <tr>
                    <td class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><a href="<?php echo esc_url($track_link) ?>" target="_blank"><?php echo esc_html($order_number) ?></a></td>
                    <?php if ($SHOW_TRACKING_NUMBER) { ?>
                        <td class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><?php echo esc_html($tracking_number) ?></td>
                    <?php } ?>
                    <?php if ($SHOW_CARRIER_DETAILS) { ?>
                        <td class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><?php echo esc_html($express_info->name ?? '') ?></td>
                    <?php } ?>
                    <?php if ($show_status_th) { ?>
                        <td class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><?php echo esc_html($shipment_statuses[(new ParcelPanelFunction)->parcelpanel_get_shipment_status($shipment_item->shipment_status)]['text']) ?></td>
                    <?php } ?>
                    <td class="td" style="text-align:<?php echo esc_attr($text_align); ?>;"><a href="<?php echo esc_url($track_link) ?>" target="_blank"><?php echo esc_html($TEXT_TRACK) ?></a></td>
                </tr>
            <?php
            }
            ?>
        </tbody>
    </table><br />
<?php
endif;

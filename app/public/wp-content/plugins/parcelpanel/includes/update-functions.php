<?php

use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

defined('ABSPATH') || exit;

function parcelpanel_update_200_migrate_tracking_data()
{
    global $wpdb;

    $TABLE_TRACKING       = Table::$tracking;
    $TABLE_TRACKING_ITEMS = Table::$tracking_items;

    $shipments = [];

    wc_transaction_query();

    $exists_shipments = $wpdb->get_results("SELECT order_id,tracking_id FROM {$TABLE_TRACKING_ITEMS}"); // phpcs:ignore

    $where_not_in_tracking_id = '';
    $where_not_in_order_id    = '';
    if (!empty($exists_shipments)) {
        $_tracking_ids            = array_unique(array_column($exists_shipments, 'tracking_id'));
        $placeholder_str          = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($_tracking_ids, '%d');
        $where_not_in_tracking_id = $wpdb->prepare("AND id NOT IN ({$placeholder_str})", $_tracking_ids); // phpcs:ignore

        $_order_ids            = array_unique(array_column($exists_shipments, 'order_id'));
        $placeholder_str       = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($_order_ids, '%d');
        $where_not_in_order_id = $wpdb->prepare("AND ID NOT IN ({$placeholder_str})", $_order_ids); // phpcs:ignore
    }
    unset($exists_shipments);

    $tracking_data = $wpdb->get_results("SELECT id,order_id,order_item_id FROM {$TABLE_TRACKING} WHERE 1=1 {$where_not_in_tracking_id}"); // phpcs:ignore

    $where_type_status = "post_type='shop_order' AND post_status<>'trash' AND post_status<>'auto-draft'";

    // @codingStandardsIgnoreStart
    $order_ids = $wpdb->get_col($wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE {$where_type_status} AND post_date>=%s {$where_not_in_order_id}",
        (new \WC_DateTime("-30 day midnight"))->format('Y-m-d H:i:s')
    ));
    // @codingStandardsIgnoreEnd

    $empty_order_id_num = 0;
    foreach ($tracking_data as $tracking_datum) {
        $order_id    = $tracking_datum->order_id;
        $tracking_id = $tracking_datum->id;

        if (empty($order_id)) {
            ++$empty_order_id_num;
            continue;
        }

        $shipments[] = [
            'order_id'    => $order_id,
            'tracking_id' => $tracking_id,
        ];
    }

    $empty_tracking_order_num = 0;
    foreach (array_diff($order_ids, array_column($tracking_data, 'order_id')) as $order_id) {
        $empty_tracking_order_num += 1;
        $shipments[]              = [
            'order_id'    => $order_id,
            'tracking_id' => 0,
        ];
    }

    $insert_shipment_num = 0;
    foreach ($shipments as $shipment) {
        $insert_shipment_num += $wpdb->insert($TABLE_TRACKING_ITEMS, $shipment); // phpcs:ignore
    }

    wc_transaction_query('commit');

    (new ParcelPanelFunction)->parcelpanel_log('parcelpanel_update_200_migrate_tracking_data: ' . wp_json_encode([
        'empty_order_id_num'       => $empty_order_id_num,
        'empty_tracking_order_num' => $empty_tracking_order_num,
        'insert_shipment_num'      => $insert_shipment_num,
    ], 320));
}

function parcelpanel_update_200_db_version()
{
    update_option(\ParcelPanel\OptionName\DB_VERSION, '2.0.0');
}

function parcelpanel_update_220_migrate_tracking_data()
{
    global $wpdb;

    $TABLE_TRACKING = Table::$tracking;
    $TABLE_TRACKING_ITEMS = Table::$tracking_items;

    $result = $wpdb->query("UPDATE {$TABLE_TRACKING_ITEMS} AS ppti JOIN {$TABLE_TRACKING} AS ppt ON ppti.tracking_id = ppt.id SET ppti.shipment_status = ppt.shipment_status WHERE ppti.shipment_status = 1"); // phpcs:ignore

    (new ParcelPanelFunction)->parcelpanel_log('parcelpanel_update_220_migrate_tracking_data: ' . wp_json_encode([
        'affected_rows' => $result,
    ], 320));
}

function parcelpanel_update_220_db_version()
{
    update_option(\ParcelPanel\OptionName\DB_VERSION, '2.2.0');
}


function parcelpanel_update_280_enable_integration()
{
    if (
        empty(get_option(\ParcelPanel\OptionName\CONNECTED_AT))
        || get_option(sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, 1001)) !== false
        || (!is_plugin_active('ali2woo/ali2woo.php') && !is_plugin_active('ali2woo-lite/ali2woo-lite.php'))
    ) {
        // new user or option value existed or plugin is not activated
        return;
    }

    $result = \ParcelPanel\Action\AdminIntegration::set_integration_enabled(1001, true);

    (new ParcelPanelFunction)->parcelpanel_log('parcelpanel_update_280_migrate_tracking_data: ' . wp_json_encode([
        'enable_1001_integration_result' => $result,
    ], 320));
}

function parcelpanel_update_280_db_version()
{
    update_option(\ParcelPanel\OptionName\DB_VERSION, '2.8.0');
}

function parcelpanel_update_290_add_tracking()
{
    global $wpdb;

    $TABLE_TRACKING = Table::$tracking;

    $result = $wpdb->query("ALTER TABLE {$TABLE_TRACKING} ADD last_event_at int(10) unsigned NOT NULL DEFAULT 0 AFTER last_event"); // phpcs:ignore

    (new ParcelPanelFunction)->parcelpanel_log('parcelpanel_update_290_add_tracking: ' . wp_json_encode([
        'add_last_event_at' => $result,
    ], 320));
}

function parcelpanel_update_290_db_version()
{
    update_option(\ParcelPanel\OptionName\DB_VERSION, '2.9.0');
}

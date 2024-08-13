<?php

namespace ParcelPanel\Action;

use ParcelPanel\Api\Api;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

class Courier
{
    use Singleton;

    /**
     * Get courier list from parcelpanel and update courier in database
     */
    function update_courier_list()
    {
        global $wpdb;

        $resp = Api::couriers();

        if (is_wp_error($resp)) {
            /* sync err */

            (new ParcelPanelFunction)->parcelpanel_schedule_single_action('parcelpanel_update_courier_list', 3600);

            return $resp;
        }

        $courier_list = $resp['data'] ?? [];

        // start sql transaction
        wc_transaction_query();

        $TABLE_COURIER = Table::$courier;

        $report = [
            'added' => 0,
            'updated' => 0,
            'removed' => 0,
            'failed' => 0,
        ];

        $NOW_TIME = time();

        if (!empty($courier_list)) {

            $db_rows = $wpdb->get_results("SELECT * FROM $TABLE_COURIER"); // phpcs:ignore

            // format data
            foreach ($db_rows as $row) {
                $row->sort = intval($row->sort);
                $row->updated_at = intval($row->updated_at);
            }
            $db_couriers = array_column($db_rows, null, 'code');

            $data_update = [];
            $data_add = [];

            foreach ($courier_list as $courier) {

                $courier_code  = sanitize_text_field($courier['courier_code'] ?? '');
                $country_code  = sanitize_text_field($courier['country_code'] ?? '');
                $courier_name  = sanitize_text_field($courier['courier_name'] ?? '');
                $courier_phone = sanitize_text_field($courier['courier_phone'] ?? '');
                $courier_logo  = sanitize_text_field($courier['courier_logo'] ?? '');
                $courier_url   = sanitize_text_field($courier['courier_url'] ?? '');
                $sort          = intval($courier['sort'] ?? 9999);
                $updated_at    = strtotime($courier['updated_at'] ?? '') ?: $NOW_TIME;

                $_updated_at = $db_couriers[$courier_code]->updated_at ?? 0;

                if ($updated_at == $_updated_at) {
                    continue;
                }

                $data_array = [
                    'code'         => $courier_code,
                    'name'         => $courier_name,
                    'country_code' => $country_code,
                    'tel'          => $courier_phone,
                    'logo'         => $courier_logo,
                    'track_url'    => $courier_url,
                    'sort'         => $sort,
                    'updated_at'   => $updated_at,
                ];

                if (empty($db_couriers[$courier_code])) {
                    $data_add[] = $data_array;
                    continue;
                }

                foreach ($data_array as $field => $value) {
                    $_old_value = $db_couriers[$courier_code]->{$field};
                    if ($_old_value != $value) {
                        $data_update[] = $data_array;
                        break;
                    }
                }
            }

            $invalid_codes = array_diff(array_column($db_rows, 'code'), array_column($courier_list, 'courier_code'));

            // del courier
            foreach ($invalid_codes as $code) {
                $res = $wpdb->delete($TABLE_COURIER, ['code' => $code]); // phpcs:ignore
                $report['removed'] += $res;
            }

            // Add couriers
            foreach ($data_add as $data) {
                $res = $wpdb->insert($TABLE_COURIER, $data); // phpcs:ignore
                $report[$res ? 'added' : 'failed'] += 1;
            }

            // Update couriers
            foreach ($data_update as $data) {
                $res = $wpdb->update($TABLE_COURIER, $data, ['code' => $data['code'],]); // phpcs:ignore
                if ($res !== false) {
                    $report['updated'] += 1;
                } else {
                    $report['failed'] += 1;
                }
            }
        }

        // update use set courier list
        $selected_courier = (array)get_option(\ParcelPanel\OptionName\SELECTED_COURIER);
        $selected_courier = array_intersect(array_column($courier_list, 'courier_code'), $selected_courier);
        update_option(\ParcelPanel\OptionName\SELECTED_COURIER, array_values($selected_courier), false);

        wc_transaction_query('commit');

        // 30 day auto update 
        (new ParcelPanelFunction)->parcelpanel_schedule_single_action('parcelpanel_update_courier_list', 2592000);

        return $report;
    }
}

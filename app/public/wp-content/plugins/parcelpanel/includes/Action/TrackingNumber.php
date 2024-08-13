<?php

namespace ParcelPanel\Action;

use ParcelPanel\Api\Api;
use ParcelPanel\Api\Orders;
use ParcelPanel\Libs\ArrUtils;
use ParcelPanel\Libs\HooksTracker;
use ParcelPanel\Libs\Import\TrackingNumberCSVImporter;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

class TrackingNumber
{
    use Singleton;

    private $import_fields = [
        'order_number' => 'Order number',
        'tracking_number' => 'Tracking number',
        'courier' => 'Courier',
        'sku' => 'SKU',
        'qty' => 'Qty',
        'fulfilled_date' => 'Date shipped',
        'mark_order_as_completed' => 'Mark order as Completed',
    ];

    private $import_required_fields = ['order_number', 'tracking_number'];

    public function get_csv_mapping_items_ajax()
    {
        if (!current_user_can('manage_woocommerce')) {
            exit('You are not allowed');
        }

        check_ajax_referer('pp-import-csv-tracking-number');

        $file = wc_clean(wp_unslash($_REQUEST['file'] ?? ''));
        $delimiter = !empty($_REQUEST['delimiter']) ? wc_clean(wp_unslash($_REQUEST['delimiter'])) : ',';
        $map_preferences = isset($_REQUEST['map_preferences']) && wc_string_to_bool($_REQUEST['map_preferences']);

        if ($map_preferences) {
            add_filter('parcelpanel_csv_tracking_number_import_mapped_columns', [$this, 'auto_map_user_preferences'], 9999, 2);
        }

        $params = [
            'lines' => 1,
            'delimiter' => $delimiter,
        ];

        $importer = new TrackingNumberCSVImporter($file, $params);
        $headers = $importer->get_raw_keys();
        $mapped_items = $this->auto_map_columns($headers, false);

        (new ParcelPanelFunction)->parcelpanel_json_response([
            'fields' => $this->import_fields,
            'required_fields' => $this->import_required_fields,
            'headers' => $headers,
            'mapped_items' => (object)$mapped_items,
        ]);
    }

    /**
     * Auto map column names.
     *
     * @param array $raw_headers Raw header columns.
     * @param bool $num_indexes If should use numbers or raw header columns as indexes.
     *
     * @return array
     */
    private function auto_map_columns(array $raw_headers, bool $num_indexes = true)
    {
        $raw_headers_lower = [];
        foreach ($raw_headers as $csv_header) {
            $raw_headers_lower[] = trim(str_ireplace('(optional)', '', wc_strtolower($csv_header)));
        }

        $mapping = apply_filters('parcelpanel_csv_tracking_number_import_mapped_columns', [], $raw_headers);

        foreach ($this->import_fields as $field_k => $field_v) {

            // Skip mapped
            if (!empty($mapping[$field_k])) {
                continue;
            }

            $field_v_lower = wc_strtolower($field_v);

            foreach ($raw_headers as $csv_header_index => $csv_header) {
                if ($raw_headers_lower[$csv_header_index] == $field_v_lower) {
                    $mapping[$field_k] = $csv_header;
                }
            }
        }

        return $mapping;
    }

    /**
     * Map columns using the user's latest import mappings.
     *
     * @param array $headers Header columns.
     *
     * @return array
     */
    public function auto_map_user_preferences($headers, array $raw_headers)
    {
        $raw_headers_lower = [];
        foreach ($raw_headers as $csv_header) {
            $raw_headers_lower[] = trim(str_replace('(optional)', '', wc_strtolower($csv_header)));
        }

        $mapping_preferences = get_user_option('parcelpanel_tracking_number_import_mapping');

        if (!empty($mapping_preferences) && is_array($mapping_preferences)) {

            $mapping_preferences_lower = [];
            foreach ($mapping_preferences as $field_k => $mapping_preference) {
                $mapping_preferences_lower[$field_k] = trim(str_replace('(optional)', '', wc_strtolower($mapping_preference)));
            }

            foreach ($this->import_fields as $field_k => $field_v) {

                if (empty($mapping_preferences_lower[$field_k])) {
                    continue;
                }

                $header_k = array_search($mapping_preferences_lower[$field_k], $raw_headers_lower);
                if ($header_k !== false) {
                    $headers[$field_k] = $raw_headers[$header_k];
                }
            }

            return $headers;
        }

        return $headers;
    }

    function csv_importer()
    {
        if (!current_user_can('manage_woocommerce')) {
            exit('You are not allowed');
        }

        check_ajax_referer('pp-import-csv-tracking-number');

        $post_data = (new ParcelPanelFunction)->parcelpanel_get_post_data();

        $import_id = wc_clean($post_data['id'] ?? '');
        $file = wc_clean($post_data['file'] ?? '');
        $delimiter = !empty($post_data['delimiter']) ? wc_clean($post_data['delimiter']) : ',';
        $mapping = isset($post_data['map_from']) ? (array)wc_clean($post_data['map_from']) : [];

        if (empty($file)) {
            (new ParcelPanelFunction)->parcelpanel_json_response([], __('File is empty.', 'parcelpanel'), false);
        }

        $params = [
            'delimiter' => $delimiter,
            'skip' => absint($post_data['position'] ?? 0),  // PHPCS: input var ok.
            'mapping' => array_flip($mapping),
            'lines' => absint($post_data['line'] ?? 100),
            'parse' => true,
        ];

        if (empty($import_id)) {
            update_user_option(get_current_user_id(), 'parcelpanel_tracking_number_import_mapping', $mapping);
        }

        $importer = new TrackingNumberCSVImporter($file, $params);
        $results = $importer->import();
        $total = $importer->get_lines() - $importer->get_spaces();

        $fileArr = explode('/', $file);
        $nameC = count($fileArr);
        $fileName = $nameC - 1 >= 0 && !empty($fileArr[$nameC - 1]) ? $fileArr[$nameC - 1] : basename($file);

        $record_data = self::record_log($import_id, $fileName, $total, $results['succeeded_count'], count($results['failed_msg']), $results['failed_msg']);
        $res = [
            'position' => $importer->get_file_position(),
            'percentage' => empty($record_data['total']) ? 100 : $importer->get_percent_complete(),
        ];

        // Return to the import log after data processing is completed
        if (100 == $res['percentage']) {
            $res += $record_data;
            TrackingNumber::schedule_tracking_sync_action(1);
        } else {
            $res['id'] = $record_data['id'];
        }

        (new ParcelPanelFunction)->parcelpanel_json_response($res);
    }

    /**
     * Get imported record list API
     */
    function get_records_ajax()
    {
        if (!current_user_can('manage_woocommerce')) {
            exit('You are not allowed');
        }

        check_ajax_referer('pp-get-import-tracking-number-records');

        $record_ids = get_option(\ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_IDS, []);

        $is_ids_update = false;

        $res = [];

        // get 10 limit
        $n = 10;

        foreach (array_reverse($record_ids, true) as $key => $id) {

            $KEY_RECORD_DATA = sprintf(\ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_DATA, $id);

            $record_data = get_option($KEY_RECORD_DATA, []);

            if (empty($record_data)) {
                unset($record_ids[$key]);
                $is_ids_update = true;
                continue;
            }

            $record_data['date'] = gmdate('Y-m-d', $record_data['created_at']);

            $res[] = ['id' => $id] + $record_data;

            if (--$n <= 0) {
                break;
            }
        }

        if ($is_ids_update) {
            update_option(\ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_IDS, $record_ids, false);
        }

        (new ParcelPanelFunction)->parcelpanel_json_response($res);
    }

    /**
     * sync numbers
     */
    static function sync_tracking()
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // Interface exception identification
        $is_api_error = false;

        /* @var \WC_Order[] */
        $orders = [];

        // Get WP_Query query parameters
        $wp_query_args = (new ParcelPanelFunction)->parcelpanel_get_shop_order_query_args([], null, 1, -1);

        if (is_wp_error($wp_query_args)) {
            if (isset($wp_query_args->errors['no_install'])) {
                return;
            }
        }

        $wp_query = new \WP_Query;

        $not_in_ids = [0];

        while (true) {

            // @codingStandardsIgnoreStart
            $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($not_in_ids, '%d');
            // sync_time：[0,2]，sync max 3 time；100/time
            $tracking_data = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT DISTINCT ppt.id,ppti.order_id,ppti.order_item_id,ppti.quantity,tracking_number,courier_code,fulfilled_at FROM {$TABLE_TRACKING} AS ppt INNER JOIN {$TABLE_TRACKING_ITEMS} AS ppti ON ppt.id=ppti.tracking_id WHERE ppt.sync_times BETWEEN 0 AND 2 AND ppt.id NOT IN ({$placeholder_str}) AND tracking_number<>'' ORDER BY ppti.order_id ASC LIMIT 10",
                    $not_in_ids
                )
            );
            // @codingStandardsIgnoreEnd

            if (empty($tracking_data)) {
                break;
            }

            $tracking_ids = array_column($tracking_data, 'id');
            $order_ids = array_unique(array_column($tracking_data, 'order_id'), SORT_NUMERIC);

            // Cache the queried ID
            $not_in_ids = array_merge($not_in_ids, $tracking_ids);

            // Format：tracking_number => tracking_item
            $tracking_data = array_column($tracking_data, null, 'tracking_number');

            // Filter out unique order IDs
            $order_ids = array_diff($order_ids, array_keys($orders));


            foreach ($order_ids as $post_id) {

                // 个体 Order data
                $order = wc_get_order($post_id);

                if (!$order) {
                    continue;
                }

                $orders[$post_id] = $order;
            }

            // $wp_query_args['post__in'] = $order_ids;

            // // Query the synchronized order ID
            // $post_ids = $wp_query->query($wp_query_args);
            // foreach ($post_ids as $post_id) {
            //     // 获取Order对象
            //     $order = wc_get_order($post_id);
            //     if (!$order) {
            //         continue;
            //     }
            //     $orders[$post_id] = $order;
            // }

            // webhook data list
            $payloads = [];

            $productM = [];

            foreach ($tracking_data as $k => $tracking) {

                $order_id = $tracking->order_id;
                $fulfilled_at_t = $tracking->fulfilled_at ? $tracking->fulfilled_at : 0;
                $fulfilled_at = $fulfilled_at_t ? date_i18n(\DateTimeInterface::ATOM, $fulfilled_at_t) : '';
                $tracking_id = $tracking->id;

                $order = $orders[$order_id] ?? null;

                if (!$order) {
                    unset($tracking_data[$k]);
                    continue;
                }

                // get order_item_ids
                // @codingStandardsIgnoreStart
                $order_item_data = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT DISTINCT order_item_id,quantity FROM $TABLE_TRACKING_ITEMS WHERE tracking_id = %d",
                        $tracking_id
                    )
                );
                foreach ($order_item_data as $v) {
                    $_order_item_id = intval($v->order_item_id ?? '');
                    $_quantity = intval($v->quantity ?? '');
                    if (!empty($_order_item_id)) {

                        $order_itemmeta_table = $wpdb->prefix . 'woocommerce_order_itemmeta';
                        // $_order_item_id :  _qty _product_id _variation_id

                        $tracking_items = (array)$wpdb->get_results(
                            $wpdb->prepare(
                                "SELECT *
                                FROM $order_itemmeta_table
                                WHERE order_item_id = %d",
                                $_order_item_id
                            )
                        );

                        $pro = [];
                        $pro['_qty'] = $_quantity;
                        foreach ($tracking_items as $v) {
                            $_meta_key = $v->meta_key ?? '';
                            $_meta_value = $v->meta_value ?? '';
                            if (in_array($_meta_key, ['_product_id', '_variation_id'])) {
                                $pro[$_meta_key] = $_meta_value;
                            }
                        }
                        $productM[] = $pro;
                    }
                }
                // @codingStandardsIgnoreEnd

                $orderData = Orders::get_formatted_item_data($order);

                $order_ids = [$order_id];
                $order_tracking_data = Orders::get_tracking_data_by_order_id($order_ids);

                $orderData['tracking'] = $order_tracking_data[$order_id];

                // $payloads[] = [
                //     'order_id' => $order_id,
                //     'order_number' => $order->get_order_number(),
                //     'tracking_number' => $tracking->tracking_number,
                //     'courier_code' => $tracking->courier_code,
                //     'fulfilled_time' => $fulfilled_at_t,
                //     'fulfilled_at' => $fulfilled_at,
                //     'products' => $productM,
                //     'order' => $orderData,
                // ];

                if (empty($payloads[$order_id])) {
                    $payloads[$order_id] = [
                        'order' => $orderData,
                    ];
                }
            }

            // tracking to PP
            $resp = Api::add_tracking($payloads);

            if (is_wp_error($resp) || !is_array($resp)) {
                /* api err */
                $is_api_error = true;
                continue;
            }

            // success Tracking ID
            $success_ids = array_column($tracking_data, 'id');

            if ($success_ids) {

                // @codingStandardsIgnoreStart
                // sync success log
                $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($success_ids, '%d');
                $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE {$TABLE_TRACKING} SET `sync_times` = -1 WHERE `id` IN ({$placeholder_str})",
                        $success_ids
                    )
                );
                // @codingStandardsIgnoreEnd
            }
        }

        if ($is_api_error) {
            // re webhook
            self::schedule_tracking_sync_action(5);
            return;
        }

        // update courier
        self::schedule_tracking_courier_sync_action();
    }

    /**
     * sync number courier
     */
    static function sync_tracking_courier()
    {
        global $wpdb;

        // Interface exception identification
        $is_api_error = false;

        $TABLE_TRACKING = Table::$tracking;

        // Obtain the single number data of successful synchronization
        $tracking_number_list = $wpdb->get_col($wpdb->prepare("SELECT tracking_number FROM $TABLE_TRACKING WHERE sync_times=-1 AND courier_code=''")); // phpcs:ignore

        $tracking_numbers_chunk = array_chunk($tracking_number_list, 100);

        foreach ($tracking_numbers_chunk as $tracking_number_list) {

            $resp = Api::tracking_couriers($tracking_number_list);

            if (is_wp_error($resp) || !is_array($resp)) {
                /* api err */
                $is_api_error = true;
                continue;
            }

            if (empty($resp)) {
                foreach ($tracking_number_list as $tracking_number) {
                    $courier_code = 'cainiao';
                    $wpdb->query($wpdb->prepare("UPDATE $TABLE_TRACKING SET courier_code=%s WHERE tracking_number=%s AND courier_code=''", $courier_code, $tracking_number)); // phpcs:ignore
                }
            } else {
                foreach ($resp as $v) {

                    $tracking_number = $v['tracking_number'] ?? '';
                    $courier_code = $v['courier_code'] ?? 'cainiao';

                    if (empty($tracking_number) || empty($courier_code)) {
                        continue;
                    }

                    $wpdb->query($wpdb->prepare("UPDATE {$TABLE_TRACKING} SET courier_code=%s WHERE tracking_number=%s AND courier_code=''", $courier_code, $tracking_number)); // phpcs:ignore
                }
            }
        }

        if ($is_api_error) {
            // re sync
            self::schedule_tracking_courier_sync_action(60);
        }
    }

    /**
     * Planned order number synchronization task
     */
    public static function schedule_tracking_sync_action(int $delay = 30, $sync_all = false)
    {
        if ($delay === -1) {
            do_action('parcelpanel_tracking_sync');
            return;
        }

        (new ParcelPanelFunction)->parcelpanel_schedule_single_action('parcelpanel_tracking_sync', $delay);
    }

    /**
     * Plan order number carrier synchronization task
     */
    static function schedule_tracking_courier_sync_action(int $delay = 5)
    {
        (new ParcelPanelFunction)->parcelpanel_schedule_single_action('parcelpanel_tracking_courier_sync', $delay);
    }

    /**
     * logging save
     *
     * @param string $id
     * @param string $filename
     * @param int $total
     * @param int $succeeded
     * @param int $failed
     * @param array $details
     *
     * @return array|mixed
     * @author Mark
     * @date   2021/8/11 16:40
     */
    static function record_log($id = '', $filename = '', $total = 0, $succeeded = 0, $failed = 0, $details = [])
    {
        $KEY_RECORD_DATA = sprintf(\ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_DATA, $id);

        // all log ID
        $record_ids = get_option(\ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_IDS, []);

        // get import logs
        $record_data = get_option($KEY_RECORD_DATA, []);

        if (empty($record_data) || !is_array($record_data)) {
            // add

            $id = $time = time();

            $record_data = [
                'filename' => $filename,
                'total' => $total,
                'succeeded' => $succeeded,
                'failed' => $failed,
                'details' => $details,
                'created_at' => $time,
            ];

            // Retrieve log ID
            $KEY_RECORD_DATA = sprintf(\ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_DATA, $id);

            // Add a log ID
            $record_ids[] = $id;
            update_option(\ParcelPanel\OptionName\TRACKING_NUMBER_IMPORT_RECORD_IDS, $record_ids, false);
        } else {
            // update

            $record_data['succeeded'] += $succeeded;
            $record_data['failed'] += $failed;
            $record_data['details'] = array_merge($record_data['details'], $details);
        }

        // Record import log
        update_option($KEY_RECORD_DATA, $record_data, false);

        return ['id' => $id] + $record_data;
    }


    /**
     * get empty data
     */
    static function get_empty_tracking(): \stdClass
    {
        $tracking_item = new \stdClass;

        $tracking_item->id = 0;
        $tracking_item->order_id = 0;  // todo keep?
        $tracking_item->product = [];  // todo keep?
        $tracking_item->tracking_number = '';
        $tracking_item->courier_code = '';
        $tracking_item->shipment_status = 1;
        $tracking_item->last_event = '';
        $tracking_item->original_country = '';
        $tracking_item->destination_country = '';
        $tracking_item->origin_info = null;
        $tracking_item->destination_info = null;
        $tracking_item->transit_time = 0;
        $tracking_item->stay_time = 0;
        $tracking_item->sync_times = 0;
        $tracking_item->received_times = 0;
        $tracking_item->fulfilled_at = 0;
        $tracking_item->updated_at = 0;

        return $tracking_item;
    }


    /**
     * Rendering and importing single number modal box panel
     *
     * @deprecated 20220623
     */
    static function tmpl_upload_modal()
    {
        $import_template_file_link = (new ParcelPanelFunction)->parcelpanel_get_assets_path('templates/sample-template.csv');
?>
        <div id="pp-mdl-import" class="components-modal__screen-overlay pp-modal" style="display:none">
            <div role="dialog" tabindex="-1" class="components-modal__frame">
                <div role="document" class="components-modal__content">
                    <div class="components-modal__header">
                        <div class="components-modal__header-heading-container">
                            <h1 class="components-modal__header-heading">Import tracking number</h1>
                        </div>
                        <button type="button" aria-label="Close dialog" class="modal-close components-button has-icon">
                            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62" />
                            </svg>
                        </button>
                    </div>
                    <div class="pp-modal-body">
                        <div id="pp-pnl-upload">
                            <div style="margin-bottom:16px">
                                <p>Step 1: Copy the <a href="https://docs.google.com/spreadsheets/d/1NEJqC-yS0GoAkFx5jCqyVstP-tDgPvqle_hbksFWZ4g/copy" target="_blank">sample template</a> on Google Sheets(strongly recommend) or
                                    download <a href="<?php
                                                        echo esc_url($import_template_file_link) ?>" target="_blank">this CSV file</a>.</p>
                            </div>
                            <div style="margin-bottom:16px">
                                <p>Step 2: Fill in the data following the <a href="https://docs.parcelpanel.com/woocommerce/article/57" target="_blank">Import
                                        Template Instructions</a>. Tracking number that do not comply with the
                                    instructions will not be imported.</p>
                            </div>
                            <div style="margin-bottom:16px">
                                <p>Step 3: Download the file in a CSV format and upload
                                    it.</p>
                            </div>
                            <div class="pp-ipt-upload-wrapper"><input type="file" id="pp-ipt-upload-file" accept=".csv" style="padding:0;height:36px;line-height:36px">
                            </div>
                            <div id="pp-upload-progress" style="width:100%;display:none">
                                <div style="margin:0 0 4px;display:flex">
                                    <div>
                                        <p>Uploading:</p>
                                    </div>
                                    <div style="flex:1 1 0;text-align:right">
                                        <p class="percent">0%</p>
                                    </div>
                                </div>
                                <div style="width:100%;height:20px;border-radius:3px;overflow:hidden;background-color:#e0e1e3">
                                    <div class="progress-bar" style="height:100%;background-color:#0167a2;transition:all .3s ease 0s;width:0"></div>
                                </div>

                                <div style="margin:4px 0 0"><strong>Please DO NOT close or refresh this page before it
                                        was completed.</strong></div>
                            </div>
                            <div class="box-import-records" style="margin:20px 0 0;display:none">
                                <h4 style="margin:0 0 10px">Import records</h4>
                                <div class="lst-records"></div>
                            </div>
                        </div>
                        <div id="pp-pnl-record-detail" style="display:none">
                            <div><a class="back">back</a></div>
                            <div class="pp-row">
                                <div class="left">
                                    <p>Import file name:</p>
                                </div>
                                <div class="right">
                                    <p class="filename"></p>
                                </div>
                            </div>
                            <div class="pp-row">
                                <div class="left">
                                    <p>Total tracking numbers:</p>
                                </div>
                                <div class="right">
                                    <p class="total"></p>
                                </div>
                            </div>
                            <div class="pp-row">
                                <div class="left">
                                    <p>Succeeded:</p>
                                </div>
                                <div class="right">
                                    <p class="succeeded"></p>
                                </div>
                            </div>
                            <div class="pp-row">
                                <div class="left">
                                    <p>Failed:</p>
                                </div>
                                <div class="right">
                                    <p class="failed"></p>
                                </div>
                            </div>
                            <div class="pp-row">
                                <div class="left">
                                    <p>Details:</p>
                                </div>
                                <div class="right">
                                    <div class="details"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="components-modal__footer">
                    <button class="modal-close components-button is-secondary">Close</button>
                    <button class="btn-import components-button is-primary">Import</button>
                </div>
            </div>
        </div>
        <script>
            const pp_upload_nonce = "<?php echo esc_js(wp_create_nonce('pp-upload-csv')) ?>"
            const pp_import_nonce = "<?php echo esc_js(wp_create_nonce('pp-import-csv-tracking-number')) ?>"
            const pp_get_history_nonce = "<?php echo esc_js(wp_create_nonce('pp-get-import-tracking-number-records')) ?>"
        </script>
<?php
    }
}

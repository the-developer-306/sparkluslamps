<?php

namespace ParcelPanel\Api;

use ParcelPanel\Action\AdminSettings;
use ParcelPanel\Action\ShopOrder;
use ParcelPanel\Libs\HooksTracker;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;
use ParcelPanel\Models\TrackingItems;
use ParcelPanel\ParcelPanelFunction;

class Tracking
{
    use Singleton;

    /**
     * 获取所有单号
     */
    function get_trackings(\WP_REST_Request $request)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;

        $page = absint($request['page']) ?: 1;
        $limit = absint($request['limit']) ?: 200;
        $sort_id = 'ASC' == $request['sort_id'] ? 'ASC' : 'DESC';

        $offset = ($page - 1) * $limit;

        $where = '';

        if (isset($request['is_synced'])) {
            $is_synced = wc_string_to_bool($request['is_synced']);
            if ($is_synced) {
                $where .= ' AND sync_times = -1';
            } else {
                $where .= ' AND sync_times > -1';
            }
        }

        // @codingStandardsIgnoreStart
        $trackings = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT SQL_CALC_FOUND_ROWS * FROM $TABLE_TRACKING AS ppt
                WHERE 1=1 $where
                ORDER BY ppt.id $sort_id
                LIMIT %d,%d",
                $offset,
                $limit
            )
        );
        $total_rows = (int)$wpdb->get_var('SELECT FOUND_ROWS()');
        // @codingStandardsIgnoreEnd
        $this->retrieve_tracking_items($trackings);

        foreach ($trackings as $tracking) {
            $tracking->fulfilled_at = $tracking->fulfilled_at ? date_i18n(\DateTimeInterface::ATOM, $tracking->fulfilled_at) : '';
        }

        return ['total' => $total_rows, 'per_page' => $limit, 'trackings' => $trackings];
    }

    /**
     * 单号更新 webhook
     */
    function update(\WP_REST_Request $request)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // 异常单号
        $errors = [];

        // 当前时间
        $NOW_TIME = time();

        // 运输状态
        $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses();

        // 状态映射
        $DELIVERY_STATUS_MAP = [
            'InfoReceived' => 'info_received',
        ];

        $NOTFOUND_SUBSTATUS_MAP = [
            'notfound001' => 'info_received',
            'notfound002' => 'pending',
        ];

        // SQL for updating tracking info

        // 物流信息
        $tracks = (array)($request['data'] ?? []);

        // 兼容单身数据
        if (!isset($tracks[0])) {
            $tracks = [$tracks];
        }


        // 过滤输入
        $tracking_numbers = array_filter(array_column($tracks, 'tracking_number'));
        if (empty($tracking_numbers)) {
            return rest_ensure_response(['code' => RestApi::CODE_BAD_REQUEST]);
        }

        // 生成 SQL 占位符
        $placeholder = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_numbers);

        // @codingStandardsIgnoreStart
        $tracking_items = (array)$wpdb->get_results(
            $wpdb->prepare(
                "SELECT
                ppt.id,ppti.order_id,ppt.tracking_number,ppt.shipment_status AS tracking_status,ppti.shipment_status,ppti.custom_shipment_status,ppti.order_item_id,ppti.quantity
                FROM {$TABLE_TRACKING} AS ppt
                LEFT JOIN {$TABLE_TRACKING_ITEMS} AS ppti ON ppt.id=ppti.tracking_id
                WHERE tracking_number IN ({$placeholder})",
                $tracking_numbers
            )
        );
        // @codingStandardsIgnoreEnd

        // 缓存数据
        $db_cache = array_column($tracking_items, null, 'tracking_number');


        // 2天前
        $before_two_day = strtotime('-2 day midnight');


        // 开启事务
        wc_transaction_query();

        // 处理单号更新数据
        foreach ($tracks as $track) {

            $tracking_number = wc_clean($track['tracking_number'] ?? '');
            $courier_code = wc_clean($track['courier_code'] ?? '');
            $delivery_status = wc_clean($track['delivery_status'] ?? '');
            $substatus = wc_clean($track['sub_status'] ?? '');
            $destination_country = wc_clean($track['destination'] ?? '');
            $original_country = wc_clean($track['original'] ?? '');
            $origin_info = $track['origin_info'] ?? [];
            $destination_info = $track['destination_info'] ?? [];
            $last_event = wc_clean($track['latest_event'] ?? '');
            $transit_time = (int)($track['transit_time'] ?? 0);
            $stay_time = (int)($track['stay_time'] ?? 0);
            // $updated_at          = (array)( $track[ 'updated_at' ] ?? [] );


            // 状态转换
            $delivery_status = $DELIVERY_STATUS_MAP[$delivery_status] ?? $delivery_status;

            if (isset($NOTFOUND_SUBSTATUS_MAP[$substatus])) {
                $delivery_status = $NOTFOUND_SUBSTATUS_MAP[$substatus];
            }

            $tracking_status = $shipment_statuses[$delivery_status]['id'] ?? 1;

            // 取数据缓存
            $key = $tracking_number;

            if (!array_key_exists($key, $db_cache)) {
                // 查无此单
                $errors[] = $tracking_number;
                continue;
            }

            $tracking_item = $db_cache[$key];
            $tracking_id = $tracking_item->id ?? 0;
            $order_id = $tracking_item->order_id ?? 0;
            $previous_status = $tracking_item->shipment_status ?? 1;
            $custom_shipment_status = $tracking_item->custom_shipment_status ?? 0;
            $shipment_status = empty($custom_shipment_status) ? $tracking_status : $previous_status;

            $origin_info_str = wp_json_encode($origin_info, 320);
            $destination_info_str = wp_json_encode($destination_info, 320);

            try {

                if (empty($custom_shipment_status)) {
                    // @codingStandardsIgnoreStart
                    // automatic update shipment status
                    $wpdb->query(
                        $wpdb->prepare(
                            "UPDATE {$TABLE_TRACKING_ITEMS} AS ppti
                            SET ppti.shipment_status = %d
                            WHERE ppti.tracking_id=%d",
                            [
                                $tracking_status,  // shipment_status
                                $tracking_id,  // id
                            ]
                        )
                    );
                    // @codingStandardsIgnoreEnd
                }

                // @codingStandardsIgnoreStart
                $res = $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE `{$TABLE_TRACKING}`
                        SET `courier_code` = %s
                        , `shipment_status` = %d
                        , `last_event` = %s
                        , `original_country` = %s
                        , `destination_country` = %s
                        , `origin_info` = %s
                        , `destination_info` = %s
                        , `received_times` = `received_times` + 1
                        , `transit_time` = %d
                        , `stay_time` = %d
                        , `updated_at` = %d
                        WHERE `id` = %d",
                        [
                            $courier_code,  // `courier_code`
                            $tracking_status,  // `shipment_status`
                            $last_event,  // `last_event`
                            $original_country,  // `original_country`
                            $destination_country,  // `destination_country`
                            $origin_info_str,  // `origin_info`
                            $destination_info_str,  // `destination_info`
                            $transit_time,  // `transit_time`
                            $stay_time,  // `stay_time`
                            $NOW_TIME,  // `updated_at`
                            $tracking_id,  // `id`
                        ]
                    )
                );
                // @codingStandardsIgnoreEnd

                if (false === $res) {

                    $errors[] = $tracking_number;
                } else {

                    if (empty($custom_shipment_status) && $previous_status != $shipment_status) {

                        if (4 == $shipment_status) {
                            /* 已到达状态 */

                            $org_trackinfo = (array)$origin_info['trackinfo'] ?? [];
                            $dst_trackinfo = (array)$destination_info['trackinfo'] ?? [];
                            $trackinfo = array_merge($org_trackinfo, $dst_trackinfo);

                            foreach ($trackinfo as $item) {

                                $checkpoint_delivery_status = $item['checkpoint_delivery_status'] ?? '';

                                if ('delivered' == $checkpoint_delivery_status) {

                                    $checkpoint_time = strtotime($item['checkpoint_date'] ?? '') ?: 0;

                                    if ($before_two_day <= $checkpoint_time) {
                                        /* 在时效内 */

                                        // 发送邮件
                                        do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$tracking_id]);
                                    }

                                    break;
                                }
                            }
                        } else {

                            // 发送邮件
                            do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$tracking_id]);
                        }
                    }
                }
            } catch (\Exception $e) {

                $errors[] = $tracking_number;
            }
        }

        // 提交事务
        wc_transaction_query('commit');

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'errors' => $errors,
        ];

        return rest_ensure_response($resp_data);
    }

    function updateNew(\WP_REST_Request $request)
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // Exception order number
        $errors = [];

        // now time
        $NOW_TIME = time();

        // Shipping status
        $shipment_statuses = (new ParcelPanelFunction)->parcelpanel_get_shipment_statuses();

        // state mapping
        $DELIVERY_STATUS_MAP = [
            'InfoReceived' => 'info_received',
        ];

        $NOTFOUND_SUBSTATUS_MAP = [
            'notfound001' => 'info_received',
            'notfound002' => 'pending',
        ];

        // SQL for updating tracking info

        // tracking data
        $tracks = (array)($request['data'] ?? []);

        // Compatible with single data
        if (!isset($tracks[0])) {
            $tracks = [$tracks];
        }

        // filter input
        $tracking_numbers = array_filter(array_column($tracks, 'tracking_number'));
        if (empty($tracking_numbers)) {
            // return rest_ensure_response(['code' => RestApi::CODE_BAD_REQUEST]);
        }

        // Generate SQL placeholders
        $placeholder = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($tracking_numbers);

        if (!empty($placeholder)) {
            // @codingStandardsIgnoreStart
            $tracking_items = (array)$wpdb->get_results(
                $wpdb->prepare(
                    "SELECT
                    ppt.id,ppti.order_id,ppt.tracking_number,ppt.shipment_status AS tracking_status,ppti.shipment_status,ppti.custom_shipment_status,ppti.order_item_id,ppti.quantity
                    FROM {$TABLE_TRACKING} AS ppt
                    LEFT JOIN {$TABLE_TRACKING_ITEMS} AS ppti ON ppt.id=ppti.tracking_id
                    WHERE tracking_number IN ({$placeholder})",
                    $tracking_numbers
                )
            );
            // @codingStandardsIgnoreEnd
        } else {
            $tracking_items = [];
        }

        // cache data
        $db_cache = array_column($tracking_items, null, 'tracking_number');


        // 2 days ago
        $before_two_day = strtotime('-2 day midnight');

        $status_arr = [1, 2, 3, 4, 5, 6, 7, 8];

        // Open transaction
        wc_transaction_query();

        // order id arr
        $order_id_arr = [];

        // Process order number update data
        foreach ($tracks as $track) {

            $order_id = wc_clean($track['order_id'] ?? '');
            $tracking_number = wc_clean($track['tracking_number'] ?? '');
            $courier_code = wc_clean($track['courier_code'] ?? '');
            $delivery_status = wc_clean($track['delivery_status'] ?? '');
            // $substatus           = wc_clean( $track[ 'sub_status' ] ?? '' );
            // $destination_country = wc_clean($track['destination'] ?? '');
            $destination_country = wc_clean($track['destination'] ?? '');
            $original_country = wc_clean($track['original'] ?? '');
            $origin_info = $track['origin_info'] ?? [];
            $destination_info = $track['destination_info'] ?? [];
            $last_event = wc_clean($track['latest_event'] ?? '');
            $latest_event_at = (int)($track['latest_event_at'] ?? 0);
            $transit_time = (int)($track['transit_time'] ?? 0);
            $stay_time = (int)($track['stay_time'] ?? 0);
            // $updated_at          = (array)( $track[ 'updated_at' ] ?? [] );
            $custom_track_status = $track['custom_track_status'] ?? 0;
            $custom_track_time = $track['custom_track_time'] ?? [];
            if (!empty($custom_track_time) && !empty($custom_track_status)) {
                $custom_track_time = is_array($custom_track_time) ? $custom_track_time : json_decode($custom_track_time, true);
            }

            if (!in_array($order_id, $order_id_arr)) {
                $order_id_arr[] = $order_id;
            }

            // status change
            $tracking_status = $shipment_statuses[$delivery_status]['id'] ?? 1;

            // get data cache
            $key = $tracking_number;

            if (empty($tracking_number) && !empty($order_id)) {
                $shipment_status = 1;
                if (in_array($custom_track_status, $status_arr)) {
                    $shipment_status = $custom_track_status;
                }

                // @codingStandardsIgnoreStart
                $_shipments = $wpdb->get_results($wpdb->prepare(
                    "SELECT *
                    FROM $TABLE_TRACKING_ITEMS
                    WHERE order_id=%d",
                    $order_id
                ));
                if (empty($_shipments)) {
                    // no，restart new item
                    $wpdb->insert($TABLE_TRACKING_ITEMS, ['order_id' => $order_id]);
                }

                // Batch update shipment status
                $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE $TABLE_TRACKING_ITEMS AS ppti
                        SET shipment_status=%d, custom_shipment_status=%d
                        WHERE order_id=%d AND tracking_id=%d",
                        [
                            $shipment_status,
                            $custom_track_status,
                            $order_id,
                            0
                        ]
                    )
                );
                // @codingStandardsIgnoreEnd
                $delivery_status = (new ParcelPanelFunction)->parcelpanel_get_shipment_status($shipment_status);
                do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [0]);

                continue;
            }

            if (!array_key_exists($key, $db_cache)) {
                // no order
                $errors[] = $tracking_number;
                continue;
            }

            $tracking_item = $db_cache[$key];
            $tracking_id = $tracking_item->id ?? 0;
            $order_id = $tracking_item->order_id ?? 0;
            $previous_status = $tracking_item->shipment_status ?? 1;
            $custom_shipment_status = $tracking_item->custom_shipment_status ?? 0;
            $shipment_status = empty($custom_shipment_status) ? $tracking_status : $previous_status;

            $origin_info_str = wp_json_encode($origin_info, 320);
            $destination_info_str = wp_json_encode($destination_info, 320);

            try {
                // @codingStandardsIgnoreStart
                if (empty($custom_shipment_status)) {

                    // automatic update shipment status
                    $wpdb->query($wpdb->prepare(
                        "UPDATE {$TABLE_TRACKING_ITEMS} AS ppti
                        SET ppti.shipment_status = %d
                        WHERE ppti.tracking_id=%d",
                        [
                            $tracking_status,  // shipment_status
                            $tracking_id,  // id
                        ]
                    ));
                }

                // change sql 
                $res = $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE `{$TABLE_TRACKING}`
                        SET `courier_code` = %s
                        , `shipment_status` = %d
                        , `last_event` = %s
                        , `last_event_at` = %s
                        , `original_country` = %s
                        , `destination_country` = %s
                        , `origin_info` = %s
                        , `destination_info` = %s
                        , `received_times` = `received_times` + 1
                        , `transit_time` = %d
                        , `stay_time` = %d
                        , `updated_at` = %d
                        WHERE `id` = %d",
                        [
                            $courier_code,  // `courier_code`
                            $tracking_status,  // `shipment_status`
                            $last_event,  // `last_event`
                            $latest_event_at,  // `last_event_at`
                            $original_country,  // `original_country`
                            $destination_country,  // `destination_country`
                            $origin_info_str,  // `origin_info`
                            $destination_info_str,  // `destination_info`
                            $transit_time,  // `transit_time`
                            $stay_time,  // `stay_time`
                            $NOW_TIME,  // `updated_at`
                            $tracking_id,  // `id`
                        ]
                    )
                );
                // @codingStandardsIgnoreEnd
            } catch (\Exception $e) {
                $errors[] = $tracking_number;
            }

            try {
                // email send
                if (false === $res) {

                    $errors[] = $tracking_number;
                } else {

                    if (!empty($custom_track_status)) {
                        // 自定义状态发送邮件

                        if (!empty($custom_track_time['4'])) {
                            $checkpoint_time = $custom_track_time['4'];
                            if ($before_two_day <= $checkpoint_time) {
                                /* 在时效内 */

                                // 发送邮件
                                do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$tracking_id]);
                            }
                        } else {
                            // 发送邮件
                            do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$tracking_id]);
                        }
                    } else {
                        if (empty($custom_shipment_status) && $previous_status != $shipment_status) {

                            if (4 == $shipment_status) {
                                /* 已到达状态 */
                                if ($before_two_day <= $latest_event_at) {
                                    /* 在时效内 */

                                    // 发送邮件
                                    do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$tracking_id]);
                                }
                            } else {

                                // 发送邮件
                                do_action("parcelpanel_shipment_status_{$delivery_status}_notification", $order_id, false, [$tracking_id]);
                            }
                        }
                    }
                }
            } catch (\Exception $e) {
                $errors[] = $tracking_number;
            }
        }

        // order change status to Delivered function
        if (!empty($order_id_arr)) {
            foreach ($order_id_arr as $orderId) {

                $checkChange = get_option(sprintf(\ParcelPanel\OptionName\CHENGE_DELIVERED, $orderId));
                if (!empty($checkChange)) {
                    continue;
                }

                // is all product has shipped
                // @codingStandardsIgnoreStart
                $_shipments = $wpdb->get_results($wpdb->prepare(
                    "SELECT *
                    FROM {$TABLE_TRACKING_ITEMS}
                    WHERE order_id=%d",
                    $orderId
                ));
                // @codingStandardsIgnoreEnd
                if (empty($_shipments)) {
                    continue;
                }

                // check tracking date
                $goCheckTracking = true;

                // status check order items
                $itemHasAllShipped = true;
                foreach ($_shipments as $v) {
                    $shipment_status = $v->shipment_status ?? 0;
                    $tracking_id = $v->tracking_id ?? 0;

                    if (!in_array($shipment_status, [4])) {
                        $itemHasAllShipped = false;
                        break;
                    }

                    if (empty($tracking_id)) {
                        $goCheckTracking = false;
                    }
                }

                if ($goCheckTracking) {

                    $trackingIds = [];
                    $items_f = [];
                    foreach ($_shipments as $v) {
                        $order_item_id = $v->order_item_id ?? 0;
                        $quantity = $v->quantity ?? 0;
                        $tracking_id = $v->tracking_id ?? 0;

                        if (empty($tracking_id)) {
                            $trackingIds = [];
                            break;
                        }

                        $trackingIds[] = $tracking_id;

                        if (isset($items_f[$order_item_id]) && $items_f[$order_item_id] == 0) {
                            continue;
                        }

                        if (empty($quantity)) {
                            $items_f[$order_item_id] = 0;
                        } else {
                            $now_q = !empty($items_f[$order_item_id]) ? $items_f[$order_item_id] + $quantity : $quantity;
                            $items_f[$order_item_id] = $now_q;
                        }
                    }


                    if (empty($trackingIds)) {
                        continue;
                    }

                    // @codingStandardsIgnoreStart
                    // check tracking is Delivered
                    $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($trackingIds);

                    $_trackings = $wpdb->get_results($wpdb->prepare(
                        "SELECT *
                        FROM {$TABLE_TRACKING}
                        WHERE id IN ({$placeholder_str})",
                        $trackingIds
                    ));
                    // @codingStandardsIgnoreEnd
                    if (empty($_trackings)) {
                        continue;
                    }

                    // Have all orders been Delivered , and one of them must be Delivered for within 2 days
                    $allDelivered = true;
                    $allNoDel = false;
                    foreach ($_trackings as $v) {
                        $shipment_status = $v->shipment_status ?? 0;
                        $last_event_at = $v->last_event_at ?? 0;
                        if (!in_array($shipment_status, [4])) {
                            $allDelivered = false;
                            break;
                        }

                        if (in_array($shipment_status, [4]) && $last_event_at > $NOW_TIME - 86400 * 2) {
                            $allNoDel = true;
                        }
                    }

                    if (!$allDelivered || !$allNoDel) {
                        continue;
                    }


                    $itemHasAllShipped = true;
                    $order = wc_get_order($orderId);
                    $items = $order->get_items();
                    foreach ($items as $item_id => $item) {
                        $product_quantity = $item->get_quantity();
                        if (isset($items_f[$item_id]) && ($items_f[$item_id] == $product_quantity || $items_f[$item_id] == 0)) {
                            continue;
                        }
                        $itemHasAllShipped = false;
                        break;
                    }
                }

                // check order_id all delivered auto change order status
                if ($itemHasAllShipped) {
                    $parcelpanel_fulfill_workflow = AdminSettings::get_fulfill_workflow_field();
                    $shipped_type = $parcelpanel_fulfill_workflow['shipped_type'] ?? 0;
                    $delivered_type = $parcelpanel_fulfill_workflow['delivered_type'] ?? 0;
                    $delivered_enable_email_del = $parcelpanel_fulfill_workflow['delivered_enable_email_del'] ?? false;
                    $delivered_enable_email_com = $parcelpanel_fulfill_workflow['delivered_enable_email_com'] ?? false;

                    if ($delivered_type == 1 && $delivered_enable_email_del) {
                        // delivered
                        ShopOrder::update_order_status_to_delivered($orderId, $parcelpanel_fulfill_workflow);
                        // only first do change
                        update_option(sprintf(\ParcelPanel\OptionName\CHENGE_DELIVERED, $orderId), 1);
                    } else if ($delivered_type == 2 && $delivered_enable_email_com) {

                        // if ($shipped_type == 1) {
                        //     // shipped
                        //     ShopOrder::update_order_status_to_shipped($orderId, $parcelpanel_fulfill_workflow);
                        // } else {
                        //     // completed
                        //     ShopOrder::update_order_status_to_completed($orderId);
                        // }
                        // completed
                        ShopOrder::update_order_status_to_completed($orderId);
                        // only first do change
                        update_option(sprintf(\ParcelPanel\OptionName\CHENGE_DELIVERED, $orderId), 1);
                    }
                }
            }
        }

        // commit transaction
        wc_transaction_query('commit');

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'errors' => $errors,
            'res' => $res ?? '',
            'delivery_status' => $delivery_status ?? '',
            'order_id' => $order_id ?? '',
            'tracking_id' => $tracking_id ?? '',
            'custom_track_status' => $custom_track_status ?? '',
            'custom_track_time' => $custom_track_time ?? '',
        ];

        return rest_ensure_response($resp_data);
    }

    /**
     * @param \stdClass[] $trackings
     */
    private function retrieve_tracking_items(array $trackings)
    {
        global $wpdb;

        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        foreach ($trackings as $tracking) {
            // Set the default value
            $tracking->tracking_items = [];
        }

        $trackings_by_id = array_column($trackings, null, 'id');

        if (!empty($trackings_by_id)) {
            // @codingStandardsIgnoreStart
            $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($trackings_by_id);

            $tracking_item_results = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT * FROM {$TABLE_TRACKING_ITEMS}
                    WHERE tracking_id IN ({$placeholder_str})",
                    array_keys($trackings_by_id)
                )
            );
            // @codingStandardsIgnoreEnd
            TrackingItems::format_result_data($tracking_item_results);

            foreach ($tracking_item_results as $item) {

                $tracking_id = $item->tracking_id;

                if (array_key_exists($tracking_id, $trackings_by_id)) {
                    $trackings_by_id[$tracking_id]->tracking_items[] = $item;
                }
            }
        }
    }
}

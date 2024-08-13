<?php

namespace ParcelPanel\Api\Admin;

use ParcelPanel\Action\Common;
use ParcelPanel\Action\ShopOrder;
use ParcelPanel\Action\TrackingNumber;
use ParcelPanel\Action\UserTrackPage;
use ParcelPanel\Api\RestApi;
use ParcelPanel\Libs\HooksTracker;
use ParcelPanel\Libs\Import\TrackingNumberCSVImporter;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\Table;
use ParcelPanel\ParcelPanelFunction;

class AdminShipment
{
    use Singleton;

    protected $start_time = 0;
    private $order_id = 0;
    private $tracking_items = [];

    public function shipment_tracking(\WP_REST_Request $request)
    {

        $params = $request->get_json_params();

        $type = $params['type'] ?? '';
        if (empty($type)) {
            return rest_ensure_response([
                'code' => RestApi::CODE_SUCCESS,
                'msg' => 'Type is empty',
                'data' => [],
            ]);
        }
        $data = $params['data'] ?? [];

        $res = [];

        if ($type == 1) {
            // shipment create
            $res = $this->shipmentCreate($data);
        } else if ($type == 2) {
            // shipment delete
            $res = $this->shipmentDelete($data);
        }

        if (!empty($res)) {
            TrackingNumber::schedule_tracking_sync_action(1);
        }

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => $res,
        ];

        return rest_ensure_response($resp_data);
    }

    // shipment delete
    private function shipmentDelete($data)
    {
        $res = [];
        foreach ($data as $key => $parsed_data) {

            $order_id = $parsed_data['order_id'] ?? 0;
            $tracking_number = $parsed_data['tracking_number'] ?? '';

            if (empty($tracking_number) && empty($order_id)) {
                $res[] = [
                    'order_id' => $order_id,
                    'tracking_number' => $tracking_number,
                    'message' => 1001,
                ];
                continue;
            }

            $check = self::deleteOrderShipment($order_id, $tracking_number);

            if ($check) {
                $msg = 2001;
            } else {
                $msg = 1002;
            }

            $res[] = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'message' => $msg,
            ];
        }

        return $res;
    }

    private function deleteOrderShipment($order_id, $tracking_number)
    {
        global $wpdb;

        wc_transaction_query();

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        if (!empty($tracking_number)) {
            // get tracking_id
            $tracking_item = $wpdb->get_row($wpdb->prepare("SELECT id FROM $TABLE_TRACKING WHERE tracking_number=%s", $tracking_number)); // phpcs:ignore
            $tracking_id = $tracking_item->id ?? 0;

            if (!empty($tracking_id)) {
                $where = ['tracking_id' => $tracking_id];
                if (!empty($order_id)) {
                    $where = ['order_id' => $order_id, 'tracking_id' => $tracking_id];
                }
                $result = $wpdb->delete($TABLE_TRACKING_ITEMS, $where); // phpcs:ignore
                if ($result) {
                    $where = ['id' => $tracking_id];
                    $resultT = $wpdb->delete($TABLE_TRACKING, $where); // phpcs:ignore

                    if ($resultT) {
                        // del shipment data message
                        $order_message = [
                            'order_id' => $order_id,
                            'tracking_number' => $tracking_number,
                        ];
                        Common::instance()->shipmentChange($order_message, 3);
                    }
                }
            } else {
                $result = true;
            }
        } else {

            $del_tracking_id = [];
            $tracking_item = $wpdb->get_results($wpdb->prepare("SELECT tracking_id FROM $TABLE_TRACKING_ITEMS WHERE order_id=%d", $order_id)); // phpcs:ignore
            foreach ($tracking_item as $v) {
                $tracking_id = $v->tracking_id ?? 0;
                if (!empty($tracking_id)) {

                    $tracking_item_arr = $wpdb->get_row($wpdb->prepare("SELECT tracking_number FROM $TABLE_TRACKING WHERE id=%d", $tracking_id)); // phpcs:ignore
                    $tracking_number = $tracking_item_arr->tracking_number ?? '';

                    $where = ['id' => $tracking_id];
                    $resultT = $wpdb->delete($TABLE_TRACKING, $where); // phpcs:ignore

                    if (!in_array($tracking_id, $del_tracking_id) && $resultT) {
                        // del shipment data message
                        $order_message = [
                            'order_id' => $order_id,
                            'tracking_number' => $tracking_number,
                        ];
                        Common::instance()->shipmentChange($order_message, 3);
                        $del_tracking_id[] = $tracking_id;
                    }
                }
            }
            $result = $wpdb->query($wpdb->prepare("DELETE FROM $TABLE_TRACKING_ITEMS WHERE order_id=%d AND tracking_id!=%d", $order_id, 0)); // phpcs:ignore
        }

        wc_transaction_query('commit');

        return !empty($result);
    }

    // shipment create
    private function shipmentCreate($shipmentTracking)
    {
        // e.g. [['order_id'=>1,'tracking_number'=>'22'],['order_id'=>1,'tracking_number'=>'22'],]

        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TACKING_ITEMS = Table::$tracking_items;

        $this->start_time = time();
        $index = 0;
        $rtn_data = [
            'succeeded_count' => 0,
            'failed_count' => 0,
            'msg' => [],
        ];

        $TRACKING_NUMBER_MIN_LEN = 4;
        wc_transaction_query();
        $success_order_ids = [];
        $wpdb->show_errors = false;

        foreach ($shipmentTracking as $key => $parsed_data) {

            $this->order_id = 0;
            $this->tracking_items = [];

            $order_id = $parsed_data['order_id'] ?? 0;
            $courier_code = $parsed_data['courier_code'] ?? '';
            // $courier_code = (new ParcelPanelFunction)->parcelpanel_get_courier_code_from_name($parsed_data['courier'] ?? '');
            $tracking_number = $parsed_data['tracking_number'] ?? '';
            $fulfilled_at = $this->parse_fulfilled_date_field($parsed_data['date_shipped'] ?? '');
            $status_shipped = $parsed_data['status_shipped'] ?? '';
            $line_items = $parsed_data['line_items'] ?? [];

            try {

                if (empty($order_id)) {
                    // 订单不存在
                    throw new \Exception(109);
                }

                $order = wc_get_order($order_id);

                if (empty($order)) {
                    // 订单不存在
                    throw new \Exception(101);
                }

                $this->order_id = $order_id;


                if (empty($tracking_number)) {
                    // tracking number empty
                    throw new \Exception(108);
                }

                if (strlen($tracking_number) < $TRACKING_NUMBER_MIN_LEN) {
                    // tracking number short
                    throw new \Exception(102);
                }

                // check tracking number
                $is_editable_tracking = self::is_editable_tracking($order_id, $tracking_number);
                if (!$is_editable_tracking) {
                    throw new \Exception(103);
                }

                $this->retrieve_tracking_items();
                // all pro has fulfillment
                if ($this->is_shipped_all()) {
                    throw new \Exception(104);
                }

                // currency
                $currency = get_woocommerce_currency();

                $order_line_items_quantity_by_id = [];
                /** @var \WC_Order_Item_Product[] $items */
                $items = $order->get_items('line_item');
                foreach ($items as $item) {
                    $order_line_items_quantity_by_id[$item->get_id()] = $item->get_quantity('edit');
                }

                $shipment_line_items = [];
                foreach ($line_items as $pro) {
                    $sku = $pro['sku'] ?? '';
                    $quantity = $pro['qty'] ?? 0;

                    $shipment_line_one = [];
                    if (empty($sku)) {
                        continue;
                    }

                    foreach ($items as $item) {
                        $product = $item->get_product();
                        $_sku = $product->get_sku('edit');
                        if ($_sku === $sku) {
                            $_quantity = $item->get_quantity('edit');
                            $parent_id = !empty($product->get_parent_id()) ? $product->get_parent_id() : 0;

                            $pro_now_id = $product->get_id();
                            $link_pro = $parent_id ? $parent_id : $pro_now_id;

                            $virtual = $product->get_virtual();

                            $permalink = get_permalink($pro_now_id);

                            $link = UserTrackPage::instance()->getProductGetParam($permalink, $link_pro);

                            $image = wp_get_attachment_url($product->get_image_id()) ?: '';

                            $shipment_line_one = [
                                'id' => $item->get_id(),
                                'name' => $item->get_name(),
                                'product_id' => $item->get_product_id(),
                                'variation_id' => $item->get_variation_id(),
                                'quantity' => 0 < $quantity ? $quantity : $_quantity,
                                'sku' => $_sku,
                                'parent_id' => $parent_id,
                                'image_url' => $image,
                                'link' => $link,
                                'virtual' => $virtual,
                                'currency' => $currency,
                            ];

                            break;
                        }
                    }
                    if (empty($shipment_line_one)) {
                        throw new \Exception(105);
                    }
                    $shipment_line_items[] = $shipment_line_one;
                }

                if (empty($shipment_line_items)) {
                    // Populate all order items and let subsequent steps adapt to the quantity of items
                    foreach ($items as $item) {
                        $product = $item->get_product();

                        $_sku = '';
                        $parent_id = 0;
                        $pro_now_id = 0;
                        $virtual = false;
                        $image = '';
                        if (!empty($product)) {
                            $_sku = $product->get_sku('edit');
                            $parent_id = !empty($product->get_parent_id()) ? $product->get_parent_id() : 0;
                            $pro_now_id = $product->get_id();
                            $virtual = $product->get_virtual();
                            $image = wp_get_attachment_url($product->get_image_id()) ?: '';
                        }

                        $_quantity = $item->get_quantity('edit');
                        $link_pro = $parent_id ? $parent_id : $pro_now_id;

                        $permalink = get_permalink($pro_now_id);

                        $link = UserTrackPage::instance()->getProductGetParam($permalink, $link_pro);

                        $shipment_line_items[] = [
                            'id' => $item->get_id(),
                            'name' => $item->get_name(),
                            'product_id' => $item->get_product_id(),
                            'variation_id' => $item->get_variation_id(),
                            'quantity' => $_quantity,
                            'sku' => $_sku,
                            'parent_id' => $parent_id,
                            'image_url' => $image,
                            'link' => $link,
                            'virtual' => $virtual,
                            'currency' => $currency,
                        ];
                    }
                }

                // Adjust to shippable quantity
                $shipment_line_items_quantity_by_id = ShopOrder::get_items_quantity(null, $order_line_items_quantity_by_id, $shipment_line_items, $this->tracking_items);
                if (empty($shipment_line_items_quantity_by_id)) {
                    throw new \Exception(106);
                }

                $tracking_data = self::init_tracking_data($tracking_number, $courier_code, $fulfilled_at, $order_id, $shipment_line_items);
                if (is_wp_error($tracking_data)) {
                    throw new \Exception(107);
                }

                $current_tracking_items = [];
                foreach ($this->tracking_items as $shipment) {
                    if ($tracking_data->id == $shipment->tracking_id) {
                        $current_tracking_items[] = $shipment;
                    }
                }
                $_original_shipment = $current_tracking_items[0] ?? null;

                $k1 = [];
                // foreach ($current_tracking_items as $shipment) {
                //     if (!$shipment->quantity) {
                //         $k1[$shipment->order_item_id] = 0;
                //         continue;
                //     }
                //     if (!array_key_exists($shipment->order_item_id, $k1)) {
                //         $k1[$shipment->order_item_id] = 0;
                //     } elseif (!$k1[$shipment->order_item_id]) {
                //         // 若当前商品数量已置为0，则不再进行计数
                //         continue;
                //     }
                //     $k1[$shipment->order_item_id] += $shipment->quantity;
                // }

                foreach ($shipment_line_items_quantity_by_id as $_order_item_id => $_quantity) {
                    if (!array_key_exists($_order_item_id, $k1)) {
                        $k1[$_order_item_id] = 0;
                    }
                    $k1[$_order_item_id] += $_quantity;
                }

                $insert_data = [];
                $delete_data = [];
                foreach ($k1 as $_order_item_id => $_quantity) {
                    $is_ok = false;
                    foreach ($current_tracking_items as $k => $_shipment) {
                        if ($_shipment->order_item_id == $_order_item_id) {
                            // $has_data = true;
                            if ($_shipment->quantity != $_quantity) {
                                $delete_data[] = $_shipment->tracking_item_id;
                            } else {
                                if ($is_ok) {
                                    $delete_data[] = $_shipment->tracking_item_id;
                                } else {
                                    $is_ok = true;
                                }
                            }
                            unset($current_tracking_items[$k]);
                        }
                    }

                    if (!$is_ok) {
                        $item_insert_data = [
                            'order_id' => $order_id,
                            'order_item_id' => $_order_item_id,
                            'quantity' => $_quantity,
                            'tracking_id' => $tracking_data->id,
                            'shipment_status' => $tracking_data->shipment_status,
                        ];
                        $tracking_ids[] = $tracking_data->id;
                        // if ($_original_shipment) {
                        //     $item_insert_data['shipment_status'] = $_original_shipment->shipment_status;
                        //     $item_insert_data['custom_status_time'] = $_original_shipment->custom_status_time;
                        //     $item_insert_data['custom_shipment_status'] = $_original_shipment->custom_shipment_status;
                        // }
                        $insert_data[] = $item_insert_data;
                    }
                }

                if (!empty($insert_data)) {
                    foreach ($insert_data as $datum) {
                        // add shipment data
                        $wpdb->insert($TABLE_TACKING_ITEMS, $datum); // phpcs:ignore
                    }
                }
                if (!empty($delete_data)) {
                    // del fail log
                    // @codingStandardsIgnoreStart
                    $placeholder_str = (new ParcelPanelFunction)->parcelpanel_get_prepare_placeholder_str($delete_data, '%d');
                    $wpdb->query(
                        $wpdb->prepare(
                            "DELETE FROM {$TABLE_TACKING_ITEMS} WHERE id IN ({$placeholder_str})",
                            $delete_data
                        )
                    );
                    // @codingStandardsIgnoreEnd
                }

                $success_order_ids[] = $order_id;

                if (!empty($success_order_ids)) {

                    $success_order_ids = array_unique($success_order_ids);

                    // update shipments
                    foreach ($success_order_ids as $order_id) {
                        ShopOrder::adjust_unfulfilled_shipment_items($order_id);
                    }
                }

                // 0:  no change status  other: completed  2: partial_shipped 3 shipped
                $mark_order_as_completed = $status_shipped;
                if (0 !== $mark_order_as_completed) {
                    if ($mark_order_as_completed == 2) {
                        if (!empty($tracking_ids)) {
                            update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), array_values($tracking_ids));
                        } else {
                            update_option(sprintf(\ParcelPanel\OptionName\NO_EMAIL_TRACKING, $order_id), []);
                        }
                        // order to partial_shipped
                        ShopOrder::update_order_status_to_partial_shipped($order_id);
                    } else if ($mark_order_as_completed == 3) {
                        // order to shipped
                        ShopOrder::update_order_status_to_shipped($order_id);
                        // } else if ($mark_order_as_completed == 4) {
                        // order to delivered
                        // ShopOrder::update_order_status_to_delivered($order_id);
                    } else {
                        // order to completed
                        ShopOrder::update_order_status_to_completed($order_id);
                    }
                }

                $rtn_data['succeeded_count'] += 1;

                $rtn_data['msg'][] = [
                    'key' => $key,
                    'order_id' => $order_id,
                    'tracking_number' => $tracking_number,
                    'courier_code' => $courier_code,
                    'line_items' => $shipment_line_items,
                    'message' => 200,
                ];
            } catch (\Exception $e) {

                $message = $e->getMessage();

                $rtn_data['msg'][] = [
                    'key' => $key,
                    'order_id' => $order_id,
                    'tracking_number' => $tracking_number,
                    'courier_code' => $courier_code,
                    'message' => $message,
                ];

                $rtn_data['failed_count'] += 1;
            } finally {
                unset($order);
            }
        }

        // commit
        wc_transaction_query('commit');

        return $rtn_data;
    }

    // fulfilled date do
    public function parse_fulfilled_date_field(string $value): int
    {
        if ($value) {
            $checkTime = explode(' ', $value);
            $get_time = strtotime($value);
            if (empty($checkTime[1])) {
                $check = strtotime(gmdate('Y-m-d'));
                $valueD = gmdate('Y-m-d', $get_time);
                if ($get_time < $check) {
                    $value = $valueD . ' 23:59:59';
                } else {
                    $value = $valueD . ' ' . gmdate('h:i:s');
                }
            }
        }
        $timeRes = !empty($value) ? strtotime($value) : time();
        return !empty($timeRes) ? $timeRes : time();
    }

    /**
     * order shipment add
     *
     * @param string $tracking_number 运单号码
     * @param string $courier_code 运输商简码
     * @param int $fulfilled_at 时间戳
     *
     * @return \stdClass|\WP_Error
     */
    private static function init_tracking_data(string $tracking_number, string $courier_code = '', int $fulfilled_at = 0, $order_id = 0, $shipment_line_items = [])
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;

        // @codingStandardsIgnoreStart
        $tracking_data = $wpdb->get_row($wpdb->prepare(
            "SELECT id,tracking_number,courier_code,shipment_status,sync_times,fulfilled_at,updated_at FROM $TABLE_TRACKING WHERE tracking_number=%s",
            $tracking_number
        ));
        // @codingStandardsIgnoreEnd
        if (empty($tracking_data)) {
            $tracking_item_data = ShopOrder::get_tracking_item_data($tracking_number, $courier_code, $fulfilled_at);
            $res = $wpdb->insert($TABLE_TRACKING, $tracking_item_data); // phpcs:ignore

            if (false === $res) {
                // 数据库问题，可能是单号重复
                $error = $wpdb->last_error;
                return new \WP_Error('db_error', '', $error);
            }

            $tracking_data = new \stdClass();
            $tracking_data->id = $wpdb->insert_id;
            $tracking_data->tracking_number = $tracking_number;
            $tracking_data->courier_code = $courier_code;
            $tracking_data->shipment_status = 1;
            $tracking_data->sync_times = 0;
            $tracking_data->fulfilled_at = $tracking_item_data['fulfilled_at'];
            $tracking_data->updated_at = $tracking_item_data['updated_at'];

            // add shipment data message
            $order_message = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'shipment_line_items' => $shipment_line_items,
                'courier_code' => $courier_code,
                'fulfilled_at' => $fulfilled_at,
            ];
            Common::instance()->shipmentChange($order_message, 1);

            return $tracking_data;
        }

        $tracking_data->id = (int)$tracking_data->id;
        $tracking_data->shipment_status = (int)$tracking_data->shipment_status;
        $tracking_data->sync_times = (int)$tracking_data->sync_times;
        $tracking_data->fulfilled_at = (int)$tracking_data->fulfilled_at;
        $tracking_data->updated_at = (int)$tracking_data->updated_at;

        $_update_tracking_data = [];
        if ($tracking_data->courier_code != $courier_code) {
            // 修改了运输商需要重新同步单号
            $_update_tracking_data['courier_code'] = $courier_code;
            $_update_tracking_data['shipment_status'] = 1;
            $_update_tracking_data['last_event'] = null;
            $_update_tracking_data['original_country'] = '';
            $_update_tracking_data['destination_country'] = '';
            $_update_tracking_data['origin_info'] = null;
            $_update_tracking_data['destination_info'] = null;
            $_update_tracking_data['transit_time'] = 0;
            $_update_tracking_data['stay_time'] = 0;
            $_update_tracking_data['sync_times'] = 0;
            $_update_tracking_data['received_times'] = 0;
        }
        if ($tracking_data->fulfilled_at != $fulfilled_at) {
            $_update_tracking_data['fulfilled_at'] = $fulfilled_at;
        }
        if (0 < $tracking_data->sync_times) {
            // 重置同步次数
            $_update_tracking_data['sync_times'] = 0;
        }
        if (!empty($_update_tracking_data)) {
            $_update_tracking_data['updated_at'] = time();

            $res = $wpdb->update($TABLE_TRACKING, $_update_tracking_data, ['id' => $tracking_data->id]); // phpcs:ignore

            if (false === $res) {
                $error = $wpdb->last_error;
                return new \WP_Error('db_error', '', $error);
            }

            // update shipment data message
            $order_message = [
                'order_id' => $order_id,
                'tracking_number' => $tracking_number,
                'shipment_line_items' => $shipment_line_items,
                'courier_code' => $courier_code,
                'fulfilled_at' => $fulfilled_at,
            ];
            Common::instance()->shipmentChange($order_message, 2);
        }

        return $tracking_data;
    }

    /**
     * check number with order or not
     *
     * @param $order_id
     * @param $tracking_number
     *
     * @return bool
     */
    private static function is_editable_tracking($order_id, $tracking_number): bool
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;

        // @codingStandardsIgnoreStart
        $_order_id = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT ppti.order_id FROM
                (SELECT id FROM $TABLE_TRACKING WHERE tracking_number=%s) AS ppt
                JOIN $TABLE_TRACKING_ITEMS AS ppti ON ppt.id=ppti.tracking_id LIMIT 1",
                $tracking_number,
            )
        );
        // @codingStandardsIgnoreEnd

        if (!empty($_order_id) && $_order_id != $order_id) {
            return false;
        }

        return true;
    }

    private function retrieve_tracking_items()
    {
        global $wpdb;

        $TABLE_TRACKING = Table::$tracking;
        $TABLE_TRACKING_ITEMS = Table::$tracking_items;
        // @codingStandardsIgnoreStart
        $this->tracking_items = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT
                ppt.id,
                ppti.id AS tracking_item_id,
                ppti.tracking_id,
                ppti.order_id,
                ppti.order_item_id,
                ppti.quantity,
                ppti.custom_shipment_status,
                ppti.custom_status_time,
                ppt.tracking_number,
                ppt.courier_code,
                ppti.shipment_status,
                ppt.last_event,
                ppt.original_country,
                ppt.destination_country,
                ppt.origin_info,
                ppt.destination_info,
                ppt.transit_time,
                ppt.stay_time,
                ppt.fulfilled_at,
                ppt.updated_at
                FROM $TABLE_TRACKING_ITEMS AS ppti
                LEFT JOIN $TABLE_TRACKING AS ppt ON ppt.id = ppti.tracking_id
                WHERE ppti.order_id=%d",
                $this->order_id
            )
        );
        // @codingStandardsIgnoreEnd
    }

    private function is_shipped_all(): bool
    {
        foreach ($this->tracking_items as $item) {
            if ($item->tracking_id && empty($item->order_item_id)) {
                return true;
            }
        }
        return false;
    }
}

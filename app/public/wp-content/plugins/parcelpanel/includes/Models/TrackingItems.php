<?php

namespace ParcelPanel\Models;

class TrackingItems
{
    const FIELDS_FORMAT = [
        'id' => 'int',
        'order_id' => 'int',
        'order_item_id' => 'int',
        'quantity' => 'int',
        'tracking_id' => 'int',
        'shipment_status' => 'int',
        'custom_shipment_status' => 'int',
        'custom_status_time' => 'json',
    ];

    public static function format_result_data($result = [])
    {
        foreach ($result as $item) {
            self::format_object_data($item, self::FIELDS_FORMAT);
        }
    }

    public static function format_object_data($values, $formats)
    {
        foreach ($values as $k => &$v) {
            if (isset($formats[$k])) {
                switch ($formats[$k]) {
                    case 'json':
                        $v = json_decode($v);
                        break;
                    case 'int':
                        settype($v, 'int');
                        break;
                }
            }
        }
    }
}

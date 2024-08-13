<?php

namespace ParcelPanel\Models;

use ParcelPanel\Api\Api;

/**
 * @deprecated 2.2.0
 */
class Location
{
    private $id;
    private $address;
    private $countryCode;

    function __construct($address, $countryCode = '')
    {
        $this->countryCode = $countryCode;

        $this->setAddress($address);

        $this->id = self::getId($address);
    }

    private function setAddress($address)
    {
        $this->address = strtr($address, [' ' => '-', ',' => '-']);
    }

    private static function getId($address): string
    {
        return md5($address);
    }

    function getData()
    {
        $data = $this->getDataFromDb();

        if (!empty($data)) {
            return $data;
        }

        $data = $this->getDataFromApi();

        if (empty($data)) {
            $data = $this->getDataFromMapServer();
        }

        if (!empty($data)) {
            $this->saveData($data);
        }

        return $data;
    }

    function saveData(array $data): bool
    {
        global $wpdb;

        $NOW_TIME = time();

        $TABLE_LOCATION = Table::$location;

        // @codingStandardsIgnoreStart
        $res = $wpdb->replace($TABLE_LOCATION, [
            'id'         => $this->id,
            'data'       => wp_json_encode($data, 320),
            'expired_at' => $NOW_TIME + 2592000,  // 30 天
            'updated_at' => $NOW_TIME,
        ]);
        // @codingStandardsIgnoreEnd
        return 0 !== $res;
    }

    private function getDataFromApi(): ?array
    {
        $resp = Api::geo_info($this->address);

        if (is_wp_error($resp)) {
            // 接口异常
            return null;
        }

        return [
            'lat' => $resp['lat'],
            'lon' => $resp['lon'],
        ];
    }

    private function getDataFromDb()
    {
        global $wpdb;

        $TABLE_LOCATION = Table::$location;

        $NOW_TIME = time();

        $row = $wpdb->get_row($wpdb->prepare("SELECT `data`,`expired_at` FROM {$TABLE_LOCATION} WHERE `id` = %s", $this->id)); // phpcs:ignore

        if (empty($row)) {
            return null;
        }

        if ($row->expired_at < $NOW_TIME) {
            return null;
        }

        return json_decode($row->data, 1);
    }

    private function getDataFromMapServer(): ?array
    {
        $MAP_SEARCH_URL = 'https://nominatim.openstreetmap.org/search/%s?format=json&addressdetails=1&limit=1';

        //请求地址拿到信息
        if (empty($this->address)) {
            return null;
        }
        $resp = wp_remote_get(sprintf($MAP_SEARCH_URL, $this->address));

        if (is_wp_error($resp)) {
            return null;
        }

        $content = wp_remote_retrieve_body($resp);
        // parcelpanel_log( $content );

        $content = (array)json_decode($content, 1);

        if (!empty($content)) {
            $lat = $content[0]['lat'] ?? '';  // 上下 纬度
            $lon = $content[0]['lon'] ?? '';  // 左右 经度

            return [
                'lat' => $lat,
                'lon' => $lon,
            ];
        }

        return null;
    }
}

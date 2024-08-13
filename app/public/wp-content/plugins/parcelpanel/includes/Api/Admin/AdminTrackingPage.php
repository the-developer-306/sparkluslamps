<?php

declare(strict_types=1);

namespace ParcelPanel\Api\Admin;

use ParcelPanel\Api\RestApi;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\Models\TrackingSettings;

class AdminTrackingPage
{
    use Singleton;

    public function save_settings(\WP_REST_Request $request)
    {
        $params = $request->get_json_params();

        if ($params) {
            TrackingSettings::instance()->save_settings($params);
        }
        $result = TrackingSettings::instance()->get_settings();

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => $result,
        ];

        return rest_ensure_response($resp_data);
    }

    public function get_settings()
    {
        $result = TrackingSettings::instance()->get_settings();

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => $result,
        ];

        return rest_ensure_response($resp_data);
    }

    public function get_settings_old()
    {
        $result = TrackingSettings::instance()->get_settings_old();

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => $result,
        ];

        return rest_ensure_response($resp_data);
    }

}

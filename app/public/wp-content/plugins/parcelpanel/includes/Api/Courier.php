<?php

namespace ParcelPanel\Api;

use ParcelPanel\Libs\Singleton;

class Courier
{
    use Singleton;

    /**
     * courier update webhook
     */
    function update(\WP_REST_Request $request)
    {
        $action = (int)($request['data']['action'] ?? 0);

        $resp_data = [
            'code' => RestApi::CODE_SUCCESS,
            'data' => [],
        ];

        if (200 === $action) {
            $resp_data['data'] = \ParcelPanel\Action\Courier::instance()->update_courier_list();
        }

        return rest_ensure_response($resp_data);
    }
}

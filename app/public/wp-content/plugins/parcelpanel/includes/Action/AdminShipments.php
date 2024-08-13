<?php

namespace ParcelPanel\Action;

use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;

class AdminShipments
{
    use Singleton;

    function check_first_sync_ajax()
    {
        check_ajax_referer('pp-check-first-sync');

        $first_synced_at = intval(get_option(\ParcelPanel\OptionName\FIRST_SYNCED_AT));

        (new ParcelPanelFunction)->parcelpanel_json_response([
            'first_synced_at' => $first_synced_at,
        ]);
    }
}

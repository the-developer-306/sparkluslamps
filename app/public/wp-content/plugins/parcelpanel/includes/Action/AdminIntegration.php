<?php

namespace ParcelPanel\Action;

use ParcelPanel\Libs\Singleton;

class AdminIntegration
{
    use Singleton;

    public const APP_IDS = [
        1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009,
    ];

    public static function get_app_integrated($app_id): bool
    {
        return (int)get_option(sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, $app_id)) === 1;
    }

    public static function get_admin_order_actions_add_track_order_status_field(): array
    {
        return (array)get_option(\ParcelPanel\OptionName\ADMIN_ORDER_ACTIONS_ADD_TRACK_ORDER_STATUS, []);
    }

    public static function set_integration_enabled($app_id, $enabled): bool
    {
        $option_key = sprintf(\ParcelPanel\OptionName\INTEGRATION_APP_ENABLED, $app_id);
        $option_value = filter_var($enabled, FILTER_VALIDATE_BOOLEAN);
        return update_option($option_key, $option_value);
    }
}

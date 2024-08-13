<?php

namespace ParcelPanel\Models;

use ParcelPanel\Action\UserTrackPage;
use ParcelPanel\Api\Api;
use ParcelPanel\Api\Configs;
use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;

/**
 * Tracking Settings
 *
 * @property-read array $display_option
 * @property-read array $tracking_page_translations
 * @property-read array $custom_order_status
 * @property-read array $custom_tracking_info
 * @property-read array $estimated_delivery_time
 * @property-read array $product_recommend
 * @property-read array $additional_text_setting
 * @property-read array $date_and_time_format
 * @property-read array $translate_tracking_detailed_info
 * @property-read array $custom_css_and_html
 */
class TrackingSettings
{
    use Singleton;

    const FLAG_DISPLAY_OPTIONS = [
        'carrier_details' => 1,
        'tracking_number' => 2 << 0,
        'package_contents_details' => 2 << 1,
        'map_coordinates' => 2 << 2,
        'google_translate_widget' => 2 << 3,
        'b_od_nb_a_em' => 2 << 4,  // By order number and email
        'b_tk_nb' => 2 << 5,  // by number
        'tracking_detailed_info' => 2 << 7,  // Tracking details
    ];

    /**
     * Store in database
     */
    const DEFAULT_SETTINGS = [
        'dsp_opt' => [
            '_width' => '1200px',
            'color' => '#008000',
            'ui_style' => 0,  // 0: Light style, 1: Dark style
            '_selections' => 0x016f,
            'map_coordinates_position' => 0,
            'hide_keywords' => '',
        ],
        'trk_pg_trans' => [
            // 'track_your_order'           => 'Track Your Order',
            'order_number' => 'Order Number',
            'expected_delivery' => 'Expected Delivery Date',
            'or' => 'OR',
            'email' => 'Email',
            'track' => 'Track',
            'order' => 'Order',
            'tracking_number' => 'Tracking Number',
            'product' => 'Product',
            'carrier' => 'Carrier',
            'status' => 'Status',
            'order_not_found' => 'Could Not Find Order',
            'enter_your_order' => 'Please enter your order number',
            'enter_your_email' => 'Please enter your email',
            'enter_your_tracking_number' => 'Please enter your tracking number',
            'not_yet_shipped' => 'These items have not yet shipped.',
            'ordered' => 'Ordered',
            'order_ready' => 'Order Ready',
            'waiting_updated' => 'Waiting for carrier to update tracking information, please try again later.',
            'shipping_to' => 'Shipping To',
            'current_location' => 'Current Location',
            'may_like' => 'You may also like...',
            'pending' => 'Pending',
            'in_transit' => 'In Transit',
            'out_for_delivery' => 'Out for Delivery',
            'delivered' => 'Delivered',
            'expired' => 'Expired',
            'failed_attempt' => 'Failed Attempt',
            'exception' => 'Exception',
            'info_received' => 'Info Received',
        ],
        'cst_o_sta' => [],
        'cst_trk_inf' => [
            'days' => null,
            'info' => '',
        ],
        'est_dely_t' => [
            'enabled' => false,
            'calc_from' => 0,  // 0: Order created time, 1: Order fulfilled time
            'e_d_t' => [10, 20],
            'bod_enabled' => false,
            'bod_items' => [],
        ],
        'prod_reco' => [
            'enabled' => false,
            'position' => 0,
            'advanced' => false,
            'product_cat_id' => 0,
        ],
        'addl_txt_set' => [
            'text_above' => '',
            'text_below' => '',
        ],
        'dt_t_set' => [
            'date_format' => 2,
            'time_format' => 0,
        ],
        'trans_trk_detl_inf' => [],
        'cst_css_html' => [
            'css' => '',
            'html_top' => '',
            'html_bottom' => '',
        ],
        'thm_lng' => [
            'val' => 'en',
        ],
    ];

    /**
     * Field mapping
     *
     * Parameter example:
     * 'example_gratia' => [
     *     'field'    => 'eg',
     *     'name'     => 'example_gratia',
     *     'call_set' => [ __CLASS__, 'custom_save' ],
     *     'call_get' => 'wc_clean',
     * ]
     */
    const FIELD_MAP = [
        'display_option' => [
            'field' => 'dsp_opt',
            'name' => 'display_option',
        ],
        'tracking_page_translations' => [
            'field' => 'trk_pg_trans',
            'name' => 'tracking_page_translations',
        ],
        'custom_order_status' => [
            'field' => 'cst_o_sta',
            'name' => 'custom_order_status',
        ],
        'custom_tracking_info' => [
            'field' => 'cst_trk_inf',
            'name' => 'custom_tracking_info',
        ],
        'estimated_delivery_time' => [
            'field' => 'est_dely_t',
            'name' => 'estimated_delivery_time',
        ],
        'product_recommend' => [
            'field' => 'prod_reco',
            'name' => 'product_recommend',
        ],
        'additional_text_setting' => [
            'field' => 'addl_txt_set',
            'name' => 'additional_text_setting',
        ],
        'date_and_time_format' => [
            'field' => 'dt_t_set',
            'name' => 'date_and_time_format',
        ],
        'translate_tracking_detailed_info' => [
            'field' => 'trans_trk_detl_inf',
            'name' => 'translate_tracking_detailed_info',
        ],
        'custom_css_and_html' => [
            'field' => 'cst_css_html',
            'name' => 'custom_css_and_html',
        ],
        'theme_language' => [
            'field' => 'thm_lng',
            'name' => 'theme_language',
        ],
    ];

    private $settings = [];

    private static $settings_cache = [];

    function __get($name)
    {
        if (empty(self::$settings_cache)) {
            TrackingSettings::instance()->get_settings();
        }

        if (array_key_exists($name, self::$settings_cache)) {
            return self::$settings_cache[$name];
        }

        return null;
    }

    function get_setting_items($name, array $custom_items = []): array
    {
        if (!array_key_exists($name, self::FIELD_MAP)) {
            return [];
        }

        $value = self::FIELD_MAP[$name];

        $callback = isset($value['call_get']) && is_callable($value['call_get']) ? $value['call_get'] : [$this, "get_{$name}_field"];

        $items = $custom_items ?: (array)($this->settings[$value['field']] ?? []);

        return call_user_func($callback, $items) ?: [];
    }

    function get_settings(): array
    {
        if (empty(self::$settings_cache)) {

            // Read from database
            // $this->settings = get_option(\ParcelPanel\OptionName\TRACKING_PAGE_OPTIONS);

            // if ( empty( $this->settings ) ) {
            //     // Get default data
            //     $this->settings = self::DEFAULT_SETTINGS;
            // }
            //
            // foreach ( self::FIELD_MAP as $name => $value ) {
            //     self::$settings_cache[ $name ] = $this->get_setting_items( $name );
            // }

            // $tracking_config = Api::userTrackConfigs();
            $tracking_config = get_option(\ParcelPanel\OptionName\TRACKING_PAGE_NEW_OPTIONS);
            if (empty($tracking_config)) {
                Configs::get_pp_track_page_config();
                $tracking_config = get_option(\ParcelPanel\OptionName\TRACKING_PAGE_NEW_OPTIONS);
            }
            if (is_wp_error($tracking_config)) {
                return [];
            }

            // track page translate message
            $tracking_page_settings = $tracking_config['data'] ?? [];
            // $TRANSLATIONS = $tracking_page_settings['tracking_page_translations'];
            // $TEXT_ORDER_NUMBER = $TRANSLATIONS['order_number'];
            // $TEXT_TRACKING_NUMBER = $TRANSLATIONS['tracking_number'];
            // $TEXT_CARRIER = $TRANSLATIONS['carrier'];
            // $TEXT_STATUS = $TRANSLATIONS['status'];
            // $TEXT_TRACK = $TRANSLATIONS['track'];

            $pluginsTagger = $tracking_page_settings['pluginsTagger'] ?? [];
            // Translation replacement wpml switch
            $isActivePlugins = is_plugin_active('wpml-string-translation/plugin.php'); // Check whether the wpml plug-in is installed and activated
            $isActiveCMSPlugins = is_plugin_active('sitepress-multilingual-cms/sitepress.php'); // Check whether the wpml cms plug-in is installed and activated
            if (!empty($pluginsTagger) && !empty($pluginsTagger['wpml']) && !empty($isActivePlugins) && !empty($isActiveCMSPlugins)) {
                $tracking_config_res = UserTrackPage::instance()->getTranWPML($tracking_page_settings);
                $tracking_page_settings = !empty($tracking_config_res['tracking_config']) ? $tracking_config_res['tracking_config'] : $tracking_page_settings;
            }
            // if (isset($tracking_page_settings['pluginsTagger'])) {
            //     unset($tracking_page_settings['pluginsTagger']);
            // }

            self::$settings_cache = $tracking_page_settings;
        }

        return self::$settings_cache;
    }

    function get_settings_old(): array
    {
        if (empty(self::$settings_cache)) {

            // Read from database
            $this->settings = get_option(\ParcelPanel\OptionName\TRACKING_PAGE_OPTIONS);

            if (empty($this->settings)) {
                // Get default data
                $this->settings = self::DEFAULT_SETTINGS;
            }

            foreach (self::FIELD_MAP as $name => $value) {
                self::$settings_cache[$name] = $this->get_setting_items($name);
            }
        }

        return self::$settings_cache;
    }

    /**
     * save settings
     *
     * @param array $settings Data that needs to be updated
     *
     * @return bool
     */
    function save_settings(array $settings = []): bool
    {
        $this->settings = get_option(\ParcelPanel\OptionName\TRACKING_PAGE_OPTIONS);

        if (empty($this->settings)) {
            $this->settings = self::DEFAULT_SETTINGS;
        }

        foreach (self::FIELD_MAP as $value) {

            if (array_key_exists($value['name'], $settings)) {

                $callback = isset($value['call_set']) && is_callable($value['call_set']) ? $value['call_set'] : [$this, "set_{$value['name']}_field"];

                $data = (array)($settings[$value['name']] ?? []);

                call_user_func($callback, $data);
            }
        }

        return update_option(\ParcelPanel\OptionName\TRACKING_PAGE_OPTIONS, $this->settings);
    }


    /**
     * Display options
     */
    private function get_display_option_field(array $items = []): array
    {
        $rtn = array_merge(self::DEFAULT_SETTINGS['dsp_opt'], $items);

        $_selections = intval($items['_selections'] ?? 0x017f);

        // Expand option selected state
        foreach (self::FLAG_DISPLAY_OPTIONS as $key => $flag) {
            $rtn[$key] = ($flag === ($_selections & $flag));
        }

        $_width = $items['_width'] ?? '';

        $rtn['width'] = floatval($_width) ?: 1200;
        $rtn['width_unit'] = strpos($_width, '%') ? '%' : 'px';

        unset($rtn['_selections']);

        return $rtn;
    }

    /**
     * Tracking page translations
     */
    private function get_tracking_page_translations_field(array $items = []): array
    {
        // Whitelist filtering
        $items = array_intersect_key($items, self::DEFAULT_SETTINGS['trk_pg_trans']);
        $res = array_merge(self::DEFAULT_SETTINGS['trk_pg_trans'], $items);

        $MAP = [
            'transit' => 'in_transit',
            'pickup' => 'out_for_delivery',
            'undelivered' => 'failed_attempt',
        ];

        foreach ($MAP as $k => $v) {
            $res[$k] = $res[$v];
        }

        return $res;
    }

    /**
     * Custom order status
     */
    private function get_custom_order_status_field(array $items = []): array
    {
        // $extra = [
        //     'ordered'         => [
        //         'icon'     => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#4a4949" d="M17 18c-.551 0-1-.449-1-1 0-.551.449-1 1-1 .551 0 1 .449 1 1 0 .551-.449 1-1 1zM4 17c0 .551-.449 1-1 1-.551 0-1-.449-1-1 0-.551.449-1 1-1 .551 0 1 .449 1 1zM17.666 5.841L16.279 10H4V4.133l13.666 1.708zM17 14H4v-2h13a1 1 0 0 0 .949-.684l2-6a1 1 0 0 0-.825-1.308L4 2.117V1a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h1v12.184A2.996 2.996 0 0 0 0 17c0 1.654 1.346 3 3 3s3-1.346 3-3c0-.353-.072-.686-.184-1h8.368A2.962 2.962 0 0 0 14 17c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3z"></path></svg>',
        //         'name'     => "Ordered",
        //         'children' => [],
        //     ],
        //     'order_ready'     => [
        //         'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#4a4949" d="M19.901 4.581c-.004-.009-.002-.019-.006-.028l-2-4A1.001 1.001 0 0 0 17 0H3c-.379 0-.725.214-.895.553l-2 4c-.004.009-.002.019-.006.028A.982.982 0 0 0 0 5v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a.982.982 0 0 0-.099-.419zM2 18V6h7v1a1 1 0 0 0 2 0V6h7v12H2zM3.618 2H9v2H2.618l1-2zm13.764 2H11V2h5.382l1 2zM9 14H5a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2m-4-2h2a1 1 0 0 0 0-2H5a1 1 0 0 0 0 2"></path></svg>',
        //         'name' => 'Order ready',
        //     ],
        //     'in_transit'      => [
        //         'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#4a4949" d="M17.816 14c-.415-1.162-1.514-2-2.816-2s-2.4.838-2.816 2H12v-4h6v4h-.184zM15 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM2 4h8v10H7.816C7.4 12.838 6.302 12 5 12s-2.4.838-2.816 2H2V4zm13.434 1l1.8 3H12V5h3.434zm4.424 3.485l-3-5C16.678 3.185 16.35 3 16 3h-4a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h1.185C2.6 17.162 3.698 18 5 18s2.4-.838 2.816-2h4.37c.413 1.162 1.512 2 2.814 2s2.4-.838 2.816-2H19a1 1 0 0 0 1-1V9c0-.18-.05-.36-.142-.515z"></path></svg>',
        //         'name' => 'In transit',
        //     ],
        //     'out_of_delivery' => [
        //         'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#4a4949" d="M10 0C5.589 0 2 3.589 2 8c0 7.495 7.197 11.694 7.504 11.869a.996.996 0 0 0 .992 0C10.803 19.694 18 15.495 18 8c0-4.412-3.589-8-8-8m-.001 17.813C8.478 16.782 4 13.296 4 8c0-3.31 2.691-6 6-6s6 2.69 6 6c0 5.276-4.482 8.778-6.001 9.813M10 10c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2m0-6C7.794 4 6 5.794 6 8s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4"></path></svg>',
        //         'name' => 'Out of delivery',
        //     ],
        //     'delivered'       => [
        //         'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#4a4949" d="M10 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6m-1 9a.997.997 0 0 1-.707-.293l-2-2a.999.999 0 1 1 1.414-1.414L9 10.586l3.293-3.293a.999.999 0 1 1 1.414 1.414l-4 4A.997.997 0 0 1 9 13"></path></svg>',
        //         'name' => 'Delivered',
        //     ],
        // ];

        $children = [];

        foreach ($items as $k => $v) {
            $children[] = [
                'id' => $k,
                'status' => trim($v['status'] ?? ''),
                'info' => trim($v['info'] ?? ''),
                'days' => intval($v['days'] ?? 0),
            ];
        }

        return $children;
    }

    private function get_custom_tracking_info_field(array $items = [])
    {
        return array_merge(self::DEFAULT_SETTINGS['cst_trk_inf'], $items);
    }

    /**
     * Product recommendation
     */
    private function get_product_recommend_field(array $items = [])
    {
        return array_merge(self::DEFAULT_SETTINGS['prod_reco'], $items);
    }

    /**
     * Additional text setting
     */
    private function get_additional_text_setting_field(array $items = []): array
    {
        return array_merge(self::DEFAULT_SETTINGS['addl_txt_set'], $items);
    }

    /**
     * Date and time format
     */
    private function get_date_and_time_format_field(array $items = []): array
    {
        return array_merge(self::DEFAULT_SETTINGS['dt_t_set'], $items);
    }

    /**
     * Manually translate tracking detailed info
     */
    private function get_translate_tracking_detailed_info_field(array $items = []): array
    {
        return $items;
    }

    /**
     * Custom CSS and HTML
     */
    private function get_custom_css_and_html_field(array $items = []): array
    {
        return array_merge(self::DEFAULT_SETTINGS['cst_css_html'], $items);
    }

    /**
     * Theme language
     */
    private function get_theme_language_field(array $items = []): array
    {
        return array_merge(self::DEFAULT_SETTINGS['thm_lng'], $items);
    }


    /**
     * Display options
     */
    private function set_display_option_field(array $items = [])
    {
        $data = &$this->settings['dsp_opt'];

        $width = floatval($items['width'] ?? 0);
        $width_unit = '%' == ($items['width_unit'] ?? '') ? '%' : 'px';

        if ($width <= 0) {
            $width = $width_unit == '%' ? 100 : 1200;
        }

        $data['_width'] = "{$width}{$width_unit}";

        $color = sanitize_hex_color($items['color'] ?? '');
        if (!empty($color)) {
            $data['color'] = $color;
        }

        // option encoding
        $_selections = 0;

        foreach (self::FLAG_DISPLAY_OPTIONS as $key => $flag) {
            if (filter_var($items[$key] ?? true, FILTER_VALIDATE_BOOLEAN)) {
                $_selections |= $flag;
            }
        }

        // You must choose one of the two
        if (!($_selections & (self::FLAG_DISPLAY_OPTIONS['b_od_nb_a_em'] | self::FLAG_DISPLAY_OPTIONS['b_tk_nb']))) {
            $_selections |= self::FLAG_DISPLAY_OPTIONS['b_od_nb_a_em'];
        }

        $data['_selections'] = $_selections;

        if (array_key_exists('ui_style', $items)) {

            $ui_style = intval($items['ui_style']);

            $data['ui_style'] = in_array($ui_style, [0, 1]) ? $ui_style : 0;
        }

        if (array_key_exists('map_coordinates_position', $items)) {
            $data['map_coordinates_position'] = intval($items['map_coordinates_position']);
        }

        if (array_key_exists('hide_keywords', $items)) {

            $hide_keywords_list = explode(',', $items['hide_keywords']);

            $data['hide_keywords'] = implode(',', array_unique(array_filter(array_map('sanitize_text_field', $hide_keywords_list))));
        }
    }

    /**
     * Tracking page translations
     */
    private function set_tracking_page_translations_field(array $items = [])
    {
        // Whitelist filtering
        $items = array_intersect_key($items, self::DEFAULT_SETTINGS['trk_pg_trans']);
        self::combine_setting('trk_pg_trans', $items, null, true);
    }

    /**
     * Custom order status
     */
    private function set_custom_order_status_field(array $items = [])
    {
        $data = [];

        $max = 3;

        foreach ($items as $k => $v) {
            $data[] = [
                'status' => sanitize_text_field($v['status'] ?? ''),
                'info' => sanitize_text_field($v['info'] ?? ''),
                'days' => intval($v['days'] ?? 0),
            ];
            if (!--$max) {
                break;
            }
        }

        $this->settings['cst_o_sta'] = $data;
    }

    /**
     * Custom tracking info
     */
    private function set_custom_tracking_info_field(array $items = [])
    {
        $days = intval($items['days'] ?? 0);
        $info = wc_clean($items['info'] ?? '');

        if ($days <= 0 || empty($info)) {
            $this->settings['cst_trk_inf'] = self::DEFAULT_SETTINGS['cst_trk_inf'];
            return;
        }

        $this->settings['cst_trk_inf'] = [
            'days' => $days,
            'info' => $info,
        ];
    }
    /**
     * Product recommendation
     */
    private function set_product_recommend_field(array $items = [])
    {
        $enabled = !!($items['enabled'] ?? false);
        $advanced = !!($items['advanced'] ?? false);
        $position = intval($items['position']);
        $product_cat_id = intval($items['product_cat_id']);

        // 0: Top, 1: Bottom, 2: Right
        if (!in_array($position, [0, 1, 2])) {
            $position = 0;
        }

        // if ( ! $product_cat_id ) {
        //     $enabled = false;
        // }

        $this->settings['prod_reco'] = [
            'enabled' => $enabled,
            'position' => $position,
            'advanced' => $advanced,
            'product_cat_id' => $product_cat_id,
        ];
    }

    /**
     * Additional text setting
     */
    private function set_additional_text_setting_field(array $items = [])
    {
        self::combine_setting('addl_txt_set', $items, 'trim');
    }

    /**
     * Date and time format
     */
    private function set_date_and_time_format_field(array $items = [])
    {
        self::combine_setting('dt_t_set', $items, 'intval');
    }

    /**
     * Manually translate tracking detailed info
     */
    private function set_translate_tracking_detailed_info_field(array $items)
    {
        $info_list = [];

        foreach ($items as $value) {
            $before = sanitize_text_field($value['before'] ?? '');
            $after = sanitize_text_field($value['after'] ?? '');
            if (empty($before)) {
                continue;
            }

            $info = [
                'before' => $before,
                'after' => $after,
                'sort' => 0,
            ];

            if (preg_match('/([\x{4e00}-\x{9fa5}]+)/u', $before)) {
                // Including Chinese
                $info['sort'] = mb_strlen($before, 'UTF8');
            } else {
                // Does not contain Chinese
                $info['sort'] = strlen($before);
            }

            $info_list[] = $info;
        }

        // Sort Sort descending
        usort($info_list, function ($a, $b) {
            if ($a['sort'] == $b['sort']) {
                return 0;
            }
            return $b['sort'] < $a['sort'] ? -1 : 1;
        });

        $this->settings['trans_trk_detl_inf'] = $info_list;
    }

    /**
     * Custom CSS and HTML
     */
    private function set_custom_css_and_html_field(array $items)
    {
        self::combine_setting('cst_css_html', $items, 'trim');
    }

    /**
     * Theme language
     */
    private function set_theme_language_field(array $items)
    {
        self::combine_setting('thm_lng', $items);
    }

    /**
     * Merge settings
     *
     * Strictly refer to the key name of DEFAULT_SETTINGS
     *
     * @param int|string $setting_field Set item fields
     * @param array $items Setting item data
     * @param callable|null $filter_callback Custom filter data callback function; default: wc_clean()
     */
    private function combine_setting($setting_field, array $items, ?callable $filter_callback = null, $set_default_when_empty = false)
    {
        $data = &$this->settings[$setting_field];

        $keys = array_keys(self::DEFAULT_SETTINGS[$setting_field]);

        foreach ($keys as $key) {

            if (array_key_exists($key, $items)) {

                if (!is_callable($filter_callback)) {
                    $filter_callback = 'wc_clean';
                }

                $data[$key] = call_user_func($filter_callback, $items[$key]);
            }

            if ($set_default_when_empty && empty($data[$key])) {
                $data[$key] = self::DEFAULT_SETTINGS[$setting_field][$key];
            }
        }
    }
}

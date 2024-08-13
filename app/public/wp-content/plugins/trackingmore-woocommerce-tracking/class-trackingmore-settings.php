<?php
if (!defined('ABSPATH')) exit;

if (!class_exists('TrackingMore_Dependencies'))
    require_once 'class-trackingmore-dependencies.php';

class TrackingMore_Settings
{
    private $options;

    private $plugins;

    public function __construct()
    {
        $this->plugins[] = array(
            'value' => 'trackingmore',
            'label' => 'TrackingMore',
            'path' => 'trackingmore-woocommerce-tracking/trackingmore.php'
        );
        $this->plugins[] = array(
            'value' => 'wc-shipment-tracking',
            'label' => 'WooCommerce Shipment Tracking',
            'path' => array('woocommerce-shipment-tracking/shipment-tracking.php', 'woocommerce-shipment-tracking/woocommerce-shipment-tracking.php')
        );

        add_action('admin_menu', array($this, 'add_plugin_page'));
        add_action('admin_init', array($this, 'page_init'));
        add_action('admin_print_styles', array($this, 'admin_styles'));
        add_action('admin_print_scripts', array(&$this, 'library_scripts'));

        $locale = 'en';
        if(function_exists('get_locale')) {
            $locale = get_locale();
            if(!empty($locale) && $locale == 'zh_CN') {
                $locale = 'cn';
            } elseif (!empty($locale) && $locale == 'zh_HK' || $locale == 'zh_TW'){
                $locale = 'tw';
            }else {
                $locale = 'en';
            }
        }
        $this->locale = $locale;
    }


    public function admin_styles()
    {
        wp_enqueue_style('trackingmore_styles_tds', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/tdesign/tdesign.min.css');
        wp_enqueue_style('trackingmore_styles_tds_theme', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/tdesign/tdesign-trackingmore.min.css');
        wp_enqueue_style('trackingmore_styles_chosen', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/chosen/chosen.min.css');
        wp_enqueue_style('trackingmore_styles', plugins_url(basename(dirname(__FILE__))) . '/assets/css/admin.css');
    }

    public function library_scripts()
    {
        wp_enqueue_script('trackingmore_script_vue', plugins_url(basename(dirname(__FILE__))) . '/assets/js/vue.min.js');
        wp_enqueue_script('trackingmore_script_vue-composition-api', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/tdesign/vue-composition-api.prod.js');
        wp_enqueue_script('trackingmore_script_tds', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/tdesign/tdesign.min.js');
        wp_enqueue_script('trackingmore_styles_chosen_jquery', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/chosen/chosen.jquery.min.js');
        wp_enqueue_script('trackingmore_styles_chosen_proto', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/chosen/chosen.proto.min.js');
        wp_enqueue_script('trackingmore_script_util', plugins_url(basename(dirname(__FILE__))) . '/assets/js/util.js');
        wp_enqueue_script('trackingmore_script_couriers', plugins_url(basename(dirname(__FILE__))) . '/assets/js/couriers.js');
        $this->localize_script();
        wp_enqueue_script('trackingmore_script_setting', plugins_url(basename(dirname(__FILE__))) . '/assets/js/setting.js', NULL, filemtime(dirname(__FILE__) . '/assets/js/setting.js'));
    }

    public function localize_script() {
        include_once('couriers.php');
    }

    public function add_plugin_page()
    {
        add_menu_page(
            'TrackingMore Settings Admin',
            'TrackingMore',
            'manage_options',
            'trackingmore-setting-admin',
            array( $this, 'create_admin_page' ),
            plugins_url() . '/' . basename( dirname( __FILE__ ) ) . '/assets/images/sidebar-logo.svg',
            100
        );
    }

    public function create_admin_page()
    {
        $this->options = get_option('trackingmore_option_name');

        ?>
        <div class="wrap">
            <?php screen_icon(); ?>
            <h2>TrackingMore <?php esc_html_e('Settings', 'trackingmore'); ?></h2>

            <form method="post" action="options.php">
                <?php
                settings_fields('trackingmore_option_group');
                do_settings_sections('trackingmore-setting-admin');
                submit_button();
                ?>
            </form>
        </div>
    <?php
    }

    public function page_init()
    {
        register_setting(
            'trackingmore_option_group', 
            'trackingmore_option_name', 
            array($this, 'sanitize') 
        );

        add_settings_section(
            'trackingmore_setting_section_id', 
            '', 
            array($this, 'print_section_info'), 
            'trackingmore-setting-admin' 
        );

        add_settings_field(
            'plugin',
            'Plugin',
            array($this, 'plugin_callback'),
            'trackingmore-setting-admin',
            'trackingmore_setting_section_id'
        );

        add_settings_field(
            'couriers',
            'Carriers',
            array($this, 'couriers_callback'),
            'trackingmore-setting-admin',
            'trackingmore_setting_section_id'
        );

        add_settings_field(
            'use_track_button',
            'Display Track Button at Order History Page',
            array($this, 'track_button_callback'),
            'trackingmore-setting-admin',
            'trackingmore_setting_section_id'
        );

        add_settings_field(
            'custom_domain',
            'Custom domain of track button',
            array($this, 'custom_domain_callback'),
            'trackingmore-setting-admin',
            'trackingmore_setting_section_id'
        );

//        add_settings_field(
//            'track_message',
//            __('Content', 'trackingmore'),
//            array($this, 'track_message_callback'),
//            'trackingmore-setting-admin',
//            'trackingmore_setting_section_id'
//        );
    }

    public function sanitize($input)
    {
        $new_input = array();

        if (isset($input['couriers'])) {
            $new_input['couriers'] = sanitize_text_field($input['couriers']);
        }

        if (isset($input['custom_domain'])) {
            $new_input['custom_domain'] = sanitize_text_field($input['custom_domain']);
        }

        if (isset($input['plugin'])) {
            $new_input['plugin'] = sanitize_text_field($input['plugin']);
        }

        if (isset($input['track_message_1'])) {
            $postfix = '';
            if (substr($input['track_message_1'], -1) == ' ') {
                $postfix = ' ';
            }
            $new_input['track_message_1'] = sanitize_text_field($input['track_message_1']) . $postfix;
        }

        if (isset($input['track_message_2'])) {
            $postfix = '';
            if (substr($input['track_message_2'], -1) == ' ') {
                $postfix = ' ';
            }
            $new_input['track_message_2'] = sanitize_text_field($input['track_message_2']) . $postfix;
        }

        if (isset($input['use_track_button'])) {
            $new_input['use_track_button'] = true;
        }

        return $new_input;
    }

    public function print_section_info()
    {
    }

    public function couriers_callback()
    {

        $couriers = array();
        if (isset($this->options['couriers'])) {
            $couriers = explode(',', $this->options['couriers']);
        }

        echo '<select data-placeholder="Please select couriers" id="couriers_select" class="chosen-select " multiple style="width:100%">';
        echo '</select>';
        echo '<input type="hidden" id="couriers" name="trackingmore_option_name[couriers]" value="' . implode(",", $couriers) . '"/>';

    }

    public function plugin_callback()
    {

        $options = "";
        foreach ($this->plugins as $plugin) {
            //print_r($plugin);
            if (TrackingMore_Dependencies::plugin_active_check($plugin['path'])) {
                $option = '<option value="' . $plugin['value'] . '"';

                if (isset($this->options['plugin']) && esc_attr($this->options['plugin']) == $plugin['value']) {
                    $option .= ' selected="selected"';
                }

                $option .= '>' . $plugin['label'] . '</option>';
                $options .= $option;
            }
        }

        printf(
            '<select id="plugin" name="trackingmore_option_name[plugin]" class="trackingmore_dropdown">' . $options . '</select>'
        );
    }

    public function custom_domain_callback()
    {
        printf(
            '<input type="text" id="custom_domain" name="trackingmore_option_name[custom_domain]" value="%s" style="width:100%%" placeholder="https://subdomian.trackingmore.org">',
            isset($this->options['custom_domain']) ? $this->options['custom_domain'] : ''
        );
        printf(
            '<p>If you change the URL, please make sure you input correct URL and track button works. <a href="%s" target="_blank">View more</a></p>',
            'https://support.trackingmore.com/en/article/how-to-customize-the-domain-of-track-button-for-woocommerce-10paml4/'
        );
    }

    public function track_message_callback()
    {

        printf(
            '<input type="text" id="track_message_1" name="trackingmore_option_name[track_message_1]" value="%s" style="width:100%%">',
            isset($this->options['track_message_1']) ? $this->options['track_message_1'] : __('Your order was shipped via ', 'trackingmore')
        );
        printf('<br/>');
        printf(
            '<input type="text" id="track_message_2" name="trackingmore_option_name[track_message_2]" value="%s" style="width:100%%">',
            isset($this->options['track_message_2']) ? $this->options['track_message_2'] : __('Tracking number is ', 'trackingmore')
        );
        printf('<br/>');
        printf('<br/>');
        printf('<b>%s:</b>',__('Demo', 'trackingmore'));
        printf(
            '<div id="track_message_demo_1" style="width:100%%"></div>'
        );
    }

    public function track_button_callback()
    {

        printf(
            '<label><input type="checkbox" id="use_track_button" name="trackingmore_option_name[use_track_button]" %s>%s</label>',
            (isset($this->options['use_track_button']) && $this->options['use_track_button'] === true) ? 'checked="checked"' : '','Use Track Button'
        );
    }
}


if (is_admin())
    $trackingmore_settings = new TrackingMore_Settings();

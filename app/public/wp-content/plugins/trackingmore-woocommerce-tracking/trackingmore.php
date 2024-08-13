<?php
/**
 * Plugin Name: TrackingMore Order Tracking for WooCommerce (Free plan available)
 * Plugin URI: https://www.trackingmore.com/
 * Description: Add tracking number and carrier name to WooCommerce, display tracking info at order history page, auto import tracking numbers to trackingmore.
 * Version: 1.1.6
 * Author: TrackingMore
 * Author URI: https://www.trackingmore.com
 * Text Domain: trackingmore
 * Domain Path: /languages/
 */

defined('ABSPATH') or die("No script kiddies please!");

if (!function_exists('is_woocommerce_active'))
    require_once('trackingmore-functions.php');


if (is_woocommerce_active()) {

    if (!class_exists('TrackingMore')) {

        final class TrackingMore
        {

            protected static $_instance = null;

            public static function instance()
            {
                if (is_null(self::$_instance)) {
                    self::$_instance = new self();
                }
                return self::$_instance;
            }

            public $pluginFile;
            public $pluginDir;
            public $pluginUrl;
            public $actions;

            public function __construct()
            {
                $this->pluginFile = __FILE__;
                $this->pluginDir  = untrailingslashit( plugin_dir_path( __FILE__ ) );
                $this->pluginUrl  = untrailingslashit( plugin_dir_url( __FILE__ ) );

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
                $this->includes();

                $this->api = new TrackingMore_API();

                // meta box new version
                $this->actions = TrackingMore_Actions::get_instance();

                $options = get_option('trackingmore_option_name');
                if ($options) {

                    if (isset($options['plugin'])) {
                        $plugin = $options['plugin'];
                        if ($plugin == 'trackingmore') {
                            add_action('admin_print_scripts', array(&$this, 'library_scripts'));
                            add_action('in_admin_footer', array(&$this, 'include_footer_script'));
                            add_action('admin_print_styles', array(&$this, 'admin_styles'));
                            //add_action('add_meta_boxes', array(&$this, 'add_meta_box'));// old meta box
                            add_action('woocommerce_process_shop_order_meta', array(&$this, 'save_meta_box'), 0, 2);

                            $this->couriers = $options['couriers'];

                            # new meta box
                            add_action('add_meta_boxes', array( $this->actions, 'add_meta_box' ) );
                            # new mate box ajax
                            add_action( 'wp_ajax_trackingmore_get_order_init', array( $this->actions, 'get_init_settings' ) );
                            add_action( 'wp_ajax_trackingmore_get_single_tracking', array( $this->actions, 'get_single_tracking' ) );
                            add_action( 'wp_ajax_trackingmore_save_single_tracking', array( $this->actions, 'save_single_tracking' ) );
                            add_action( 'wp_ajax_trackingmore_delete_single_tracking', array( $this->actions, 'delete_single_tracking' ) );

                            // 订单列表自定义列
                            add_filter( 'manage_shop_order_posts_columns', array( $this->actions, 'shop_order_columns_header' ), 50 );
                            add_action( 'manage_shop_order_posts_custom_column', array( $this->actions, 'render_shop_order_columns' ) );
                        }

                        // View Order Page
                        $this->plugin = $plugin;
                    } else {
                        $this->plugin = '';
                    }

                    if (isset($options['use_track_button'])) {
                        $this->use_track_button = $options['use_track_button'];
                    } else {
                        $this->use_track_button = false;
                    }

                    if (isset($options['custom_domain'])) {
                        $this->custom_domain = $options['custom_domain'];
                    } else {
                        $this->custom_domain = '';
                    }

                    add_action('woocommerce_view_order', array(&$this, 'display_tracking_info'));
                    add_action('woocommerce_email_before_order_table', array(&$this, 'email_display'));

                }

                add_action('show_user_profile', array($this, 'add_api_key_field'));
                add_action('edit_user_profile', array($this, 'add_api_key_field'));
                add_action('personal_options_update', array($this, 'generate_api_key'));
                add_action('edit_user_profile_update', array($this, 'generate_api_key'));

                add_action('plugins_loaded', array($this, 'load_plugin_textdomain'));
                register_activation_hook(__FILE__, array($this, 'install'));
            }

            public function install()
            {
                global $wp_roles;

                if (class_exists('WP_Roles')) {
                    if (!isset($wp_roles)) {
                        $wp_roles = new WP_Roles();
                    }
                }

                if (is_object($wp_roles)) {
                    $wp_roles->add_cap('administrator', 'manage_trackingmore');
                }
            }

            private function includes()
            {
                include_once('trackingmore-fields.php');
                $this->trackingmore_fields = $trackingmore_fields;

                include_once('class-trackingmore-api.php');
                include_once('class-trackingmore-settings.php');
                # new mate box actions
                include_once( $this->pluginDir . '/includes/class-trackingmore-actions.php' );
            }

            public function load_plugin_textdomain()
            {
                $locale = apply_filters( 'plugin_locale', get_locale(), 'trackingmore' );
                load_textdomain( 'trackingmore', WP_LANG_DIR . '/plugins/trackingmore-' . $locale . '.mo' );
                load_plugin_textdomain('trackingmore', false, dirname(plugin_basename(__FILE__)) . '/languages');
            }

            public function admin_styles()
            {
                wp_enqueue_style('trackingmore_styles_chosen', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/chosen/chosen.min.css');
                wp_enqueue_style('trackingmore_styles', plugins_url(basename(dirname(__FILE__))) . '/assets/css/admin.css');
            }

            public function library_scripts()
            {
                wp_enqueue_script('trackingmore_styles_chosen_jquery', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/chosen/chosen.jquery.min.js');
                wp_enqueue_script('trackingmore_styles_chosen_proto', plugins_url(basename(dirname(__FILE__))) . '/assets/plugin/chosen/chosen.proto.min.js');
                wp_enqueue_script('trackingmore_script_util', plugins_url(basename(dirname(__FILE__))) . '/assets/js/util.js');
                wp_enqueue_script('trackingmore_script_couriers', plugins_url(basename(dirname(__FILE__))) . '/assets/js/couriers.js');
                $this->localize_script();
                wp_enqueue_script('trackingmore_script_admin', plugins_url(basename(dirname(__FILE__))) . '/assets/js/admin.js');
            }
            public function localize_script() {
                include_once('couriers.php');
            }
            public function include_footer_script()
            {
                wp_enqueue_script('trackingmore_script_footer', plugins_url(basename(dirname(__FILE__))) . '/assets/js/footer.js', true);
            }

            public function add_meta_box()
            {
                add_meta_box('woocommerce-trackingmore', __('TrackingMore', 'wc_trackingmore'), array(&$this, 'meta_box'), 'shop_order', 'side', 'high');
            }

            public function meta_box()
            {

                global $post;

                $selected_provider = get_post_meta($post->ID, '_trackingmore_tracking_provider', true);

                echo '<div id="trackingmore_wrapper">';

                echo '<p class="form-field"><label for="trackingmore_tracking_provider">' . __('Carrier:', 'trackingmore') . '</label><br/><select id="trackingmore_tracking_provider" name="trackingmore_tracking_provider" class="chosen_select" style="width:100%">';
                if ($selected_provider == '') {
                    $selected_text = 'selected="selected"';
                } else {
                    $selected_text = '';
                }
                echo '<option disabled ' . $selected_text . ' value="">' . __('Please Select', 'trackingmore') . '</option>';
                echo '</select>';
                echo '<br><a href="options-general.php?page=trackingmore-setting-admin">' . __('Update carrier list', 'trackingmore') . '</a>';
                echo '<input type="hidden" id="trackingmore_tracking_provider_hidden" value="' . $selected_provider . '"/>';
                echo '<input type="hidden" id="trackingmore_couriers_selected" value="' . $this->couriers . '"/>';
                include('trackingmore-fields.php');
                $this->trackingmore_fields = $trackingmore_fields;
                foreach ($this->trackingmore_fields as $field) {
                    if ($field['type'] == 'date') {
                        woocommerce_wp_text_input(array(
                            'id' => $field['id'],
                            'label' => __($field['label'], 'wc_trackingmore'),
                            'placeholder' => $field['placeholder'],
                            'description' => $field['description'],
                            'class' => $field['class'],
                            'value' => ($date = get_post_meta($post->ID, '_' . $field['id'], true)) ? date('Y-m-d', $date) : ''
                        ));
                    } else {
                        woocommerce_wp_text_input(array(
                            'id' => $field['id'],
                            'label' => __($field['label'], 'wc_trackingmore'),
                            'placeholder' => $field['placeholder'],
                            'description' => $field['description'],
                            'class' => $field['class'],
                            'value' => get_post_meta($post->ID, '_' . $field['id'], true),
                        ));
                    }
                }

                echo '</div>';
            }

            public function save_meta_box($post_id, $post)
            {
                if (isset($_POST['trackingmore_tracking_number'])) {
                    $tracking_provider = wc_clean($_POST['trackingmore_tracking_provider']);
                    update_post_meta($post_id, '_trackingmore_tracking_provider', $tracking_provider);

                    foreach ($this->trackingmore_fields as $field) {
                        if ($field['type'] == 'date') {
                            update_post_meta($post_id, '_' . $field['id'], wc_clean(strtotime($_POST[$field['id']])));
                        } else {
                            update_post_meta($post_id, '_' . $field['id'], wc_clean($_POST[$field['id']]));
                        }
                    }
                }
            }

            public function add_api_key_field($user)
            {

                if (!current_user_can('manage_trackingmore'))
                    return;

                if (current_user_can('edit_user', $user->ID)) {
                    ?>
                    <h3>TrackingMore</h3>
                    <table class="form-table">
                        <tbody>
                        <tr>
                            <th><label
                                    for="trackingmore_wp_api_key"><?php _e('TrackingMore\'s WordPress API Key', 'trackingmore'); ?></label>
                            </th>
                            <td>
                                <?php if (empty($user->trackingmore_wp_api_key)) : ?>
                                    <input name="trackingmore_wp_generate_api_key" type="checkbox"
                                           id="trackingmore_wp_generate_api_key" value="0"/>
                                    <span class="description"><?php _e('Generate API Key', 'trackingmore'); ?></span>
                                <?php else : ?>
                                    <code id="trackingmore_wp_api_key"><?php echo $user->trackingmore_wp_api_key ?></code>
                                    <br/>
                                    <input name="trackingmore_wp_generate_api_key" type="checkbox"
                                           id="trackingmore_wp_generate_api_key" value="0"/>
                                    <span class="description"><?php _e('Revoke API Key', 'trackingmore'); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                <?php
                }
            }

            public function generate_api_key($user_id)
            {

                if (current_user_can('edit_user', $user_id)) {

                    $user = get_userdata($user_id);

                    // creating/deleting key
                    if (isset($_POST['trackingmore_wp_generate_api_key'])) {

                        // consumer key
                        if (empty($user->trackingmore_wp_api_key)) {

                            $api_key = 'ck_' . hash('md5', $user->user_login . date('U') . mt_rand());

                            update_user_meta($user_id, 'trackingmore_wp_api_key', $api_key);

                        } else {

                            delete_user_meta($user_id, 'trackingmore_wp_api_key');
                        }

                    }
                }
            }
            function display_tracking_info($order_id, $for_email = false)
            {
                if ($this->plugin == 'trackingmore') {
                    $this->display_order_trackingmore($order_id, $for_email);
                } else if ($this->plugin == 'wc-shipment-tracking') { //$49
                    $this->display_order_wc_shipment_tracking($order_id, $for_email);
                }
            }

            private function display_order_trackingmore($order_id, $for_email)
            {
                $values = array();
                foreach ($this->trackingmore_fields as $field) {
                    $values[$field['id']] = get_post_meta($order_id, '_' . $field['id'], true);
                    if ($field['type'] == 'date' && $values[$field['id']]) {
                        $values[$field['id']] = date_i18n(__('l jS F Y', 'wc_shipment_tracking'), $values[$field['id']]);
                    }
                }
                $values['trackingmore_tracking_provider'] = get_post_meta($order_id, '_trackingmore_tracking_provider', true);

                if (!$values['trackingmore_tracking_provider'])
                    return;

                if (!$values['trackingmore_tracking_number'])
                    return;


                $options = get_option('trackingmore_option_name');

                if (array_key_exists('track_message_1', $options) && array_key_exists('track_message_2', $options)) {
                    $track_message_1 = $options['track_message_1'];
                    $track_message_2 = $options['track_message_2'];
                } else {
                    $track_message_1 = __('Your order was shipped via ', 'trackingmore');
                    $track_message_2 = __('Tracking number is ', 'trackingmore');
                }

                $required_fields_values = array();
                $provider_required_fields = explode(",", $values['trackingmore_tracking_required_fields']);

                for ($i = 0 ; $i < count($provider_required_fields); $i++) {
                    $field = $provider_required_fields[$i];
                    foreach ($this->trackingmore_fields as $trackingmore_field) {
                        if (array_key_exists('key', $trackingmore_field) && $field == $trackingmore_field['key']) {
                            array_unshift($required_fields_values, $values[$trackingmore_field['id']]);
                        }
                    }
                }

                if (count($required_fields_values)) {
                    $required_fields_msg = ' (' . join(', ', $required_fields_values) . ')';
                } else {
                    $required_fields_msg = '';
                }

                ?>

                <h2>Tracking Information</h2>
                <table class="shop_table shop_table_responsive">
                    <thead>
                    <tr>
                        <th>Courier</th>
                        <th>Tracking Number</th>
                        <?php if (!$for_email && $this->use_track_button) {?>
                            <th>Actions</th>
                        <?php }?>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><?php echo $values['trackingmore_tracking_provider_name'];?></td>
                        <td><?php echo $values['trackingmore_tracking_number'];?></td>
                        <?php if (!$for_email && $this->use_track_button) {?>
                            <td>
                                <?php $this->display_track_button($values['trackingmore_tracking_provider'], $values['trackingmore_tracking_number'], $required_fields_values); ?>
                            </td>
                        <?php }?>
                    </tr>
                    </tbody>
                </table>

                <?php

//                echo "<h2>Tracking Information</h2>";
//                echo "<div><span style='font-size: 16px;'>".$track_message_1 . $values['trackingmore_tracking_provider_name'] . "<br/>" . $track_message_2 . $values['trackingmore_tracking_number'] . "</span></div>";
//
//                if (!$for_email && $this->use_track_button) {
//                    $this->display_track_button($values['trackingmore_tracking_provider'], $values['trackingmore_tracking_number'], $required_fields_values);
//                }
            }

            private function display_order_wc_shipment_tracking($order_id, $for_email)
            {
                if ($for_email || !$this->use_track_button) {
                    return;
                }

                $tracking = get_post_meta($order_id, '_tracking_number', true);
                $sharp = strpos($tracking, '#');
                $colon = strpos($tracking, ':');
                $required_fields = array();
                if ($sharp && $colon && $sharp >= $colon) {
                    return;
                } else if (!$sharp && $colon) {
                    return;
                } else if ($sharp) {
                    $tracking_provider = substr($tracking, 0, $sharp);
                    if ($colon) {
                        $tracking_number = substr($tracking, $sharp + 1, $colon - $sharp - 1);
                        $temp = substr($tracking, $sharp + 1, strlen($tracking));
                        $required_fields = explode(':', $temp);
                    } else {
                        $tracking_number = substr($tracking, $sharp + 1, strlen($tracking));
                    }
                } else {
                    $tracking_provider = '';
                    $tracking_number = $tracking;
                }
                if ($tracking_number) {
                    $this->display_track_button($tracking_provider, $tracking_number, $required_fields);
                }
            }

            function email_display($order)
            {
                $this->display_tracking_info($order->id, true);
            }

            private function display_track_button($tracking_provider, $tracking_number, $required_fields_values)
            {

                $js = '(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n))return;r=e.createElement(t);r.id=n;r.src="//cdn.trackingmore.com/button/getbutton.js?v=1.1.5";i.parentNode.insertBefore(r,i)})(document,"script","trackingmore-jssdk")';
                if (function_exists('wc_enqueue_js')) {
                    wc_enqueue_js($js);
                } else {
                    global $woocommerce;
                    $woocommerce->add_inline_js($js);
                }

                if (count($required_fields_values)) {
                    $tracking_number = $tracking_number . ':' . join(':', $required_fields_values);
                }

                $temp_url = '';
                $temp_slug = ' data-slug="' . $tracking_provider . '"';
                if($this->custom_domain != '') {
                    $temp_url = '" data-domain="' . $this->custom_domain;
                    $temp_slug = '';
                }
                $track_button = '<div id="as-root"></div><div  token="" class="as-track-button" data-size="small" data-tracking-number="' . $tracking_number . $temp_url .'" data-express-code = "'. $tracking_provider . '" data-hide-tracking-number="true" data-width="600px" lang="' . $this->locale . '"></div>';
                echo wpautop(sprintf('%s', $track_button));
            }

            function encode_detect_convert($str)
            {
                if(function_exists('mb_detect_encoding') && function_exists('mb_convert_encoding')) {
                    $encode = '';
                    $encode = mb_detect_encoding($str, array("ASCII",'UTF-8',"GB2312","GBK",'BIG5','EUC_CN')); 
                    if(!empty($encode)) {
                        $str = mb_convert_encoding($str, 'UTF-8', $encode);
                        
                    }    
                }
                return $str;
            }
        }

        if (!function_exists('getTrackingMoreInstance')) {
            function getTrackingMoreInstance()
            {
                return TrackingMore::Instance();
            }
        }
    }
    $GLOBALS['trackingmore'] = getTrackingMoreInstance();

}

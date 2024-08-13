<?php
if ( !defined('ABSPATH')) exit;

class TrackingMore_Actions
{
    private static $instance;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function add_meta_box()
    {
        add_meta_box('woocommerce-trackingmore', __('TrackingMore', 'wc_trackingmore'), array(&$this, 'meta_box'), 'shop_order', 'side', 'high');
    }

    /**
     * 显示元素盒子
     */
    public function meta_box()
    {
        // 增加防止csrf攻击ajax，在html中生成对应参数值
        woocommerce_wp_hidden_input(
            array(
                'id'    => 'trackingmore_get_nonce',
                'value' => wp_create_nonce( 'get-tracking-item' ),
            )
        );
        woocommerce_wp_hidden_input(
            array(
                'id'    => 'trackingmore_delete_nonce',
                'value' => wp_create_nonce( 'delete-tracking-item' ),
            )
        );
        woocommerce_wp_hidden_input(
            array(
                'id'    => 'trackingmore_create_nonce',
                'value' => wp_create_nonce( 'create-tracking-item' ),
            )
        );

        require_once( $GLOBALS['trackingmore']->pluginDir . '/includes/views/trackingmore_meta_box.php' );
    }

    ###+++++++++++++++++++++++++++++++++++++++++++++ 订单列表页自定义列 开始 ++++++++++++++++++++++++++++++++++++++++###

    /**
     * 在管理订单列表中定义发货跟踪列
     * @param array $columns
     * @return array 改变列
     */
    public function shop_order_columns_header( $columns ) {
        $columns['woocommerce-trackingmore-tracking'] = 'TrackingMore Tracking';
        return $columns;
    }

    /**
     * 渲染Order页面自定义内容
     * @param string $column
     */
    public function render_shop_order_columns( $column ) {
        global $post;
        if ( 'woocommerce-trackingmore-tracking' === $column ) {
            echo wp_kses_post( $this->get_trackingmore_tracking_column( $post->ID ) );
        }
    }

    /**
     * 获取货件跟踪栏的内容
     * @param int $order_id Order ID
     * @return string 显示列表内容
     */
    public function get_trackingmore_tracking_column( $order_id ) {
        ob_start();

        if ( version_compare( WC()->version, '3.0', '<' ) ) {
            $slug = get_post_meta( $order_id, '_trackingmore_tracking_provider', true );
            $name = get_post_meta( $order_id, '_trackingmore_tracking_provider_name', true );
            $tracking_number = get_post_meta( $order_id, '_trackingmore_tracking_number', true );
        } else {
            $order          = new WC_Order( $order_id );
            $slug = $order->get_meta( '_trackingmore_tracking_provider', true );
            $name = $order->get_meta( '_trackingmore_tracking_provider_name', true );
            $tracking_number = $order->get_meta( '_trackingmore_tracking_number', true );
        }

        if ( !empty($slug) && !empty($tracking_number) ) {
            $trackingmore_tracking_link = 'https://www.trackingmore.com/track/en/' . $tracking_number . '?express=' . $slug;

            printf(
                '<ul><li><div>
                        <b>%s</b>
                    </div>
                    <a href="%s" title="%s" target="_blank" class=ft11>%s</a></li></ul>',
                esc_html( $name ),
                esc_url( $trackingmore_tracking_link ),
                esc_html( $tracking_number ),
                esc_html( $tracking_number )
            );
        } else {
            echo '-';
        }
    }

    ###+++++++++++++++++++++++++++++++++++++++++++++ 订单列表页自定义列 结束 ++++++++++++++++++++++++++++++++++++++++###

    ###+++++++++++++++++++++++++++++++++++++++++++++ ajax start ++++++++++++++++++++++++++++++++++++++++###

    // 初始化物流商
    public function get_init_settings() {
        check_ajax_referer( 'get-tracking-item', 'security', true );
        // 获取所有物流商
        $couriers_list = json_decode( file_get_contents( $GLOBALS['trackingmore']->pluginDir . "/assets/js/couriers.json" ), true );
        // 获取所国家地区
        $country_region = json_decode( file_get_contents( $GLOBALS['trackingmore']->pluginDir . "/assets/js/country_region.json" ), true );

        // 获取已选择的物流商
        $select_couriers = $GLOBALS['trackingmore']->couriers;

        $select_couriers_arr = $couriers = [];

        if ( !empty($select_couriers) ) {
            $select_couriers_arr = explode(',',$select_couriers);
        }

        // 定义要查找的是哪个键的值
        $found_arr = array_column($couriers_list, 'slug');

        if ( !empty($select_couriers_arr) ) {
            foreach ( $select_couriers_arr as $v ) {
                $found_key = array_search( $v, $found_arr );
                $couriers[] = $couriers_list[$found_key];
            }
        }

        /*** 暂时获取物流商、简码  开始 ***/
        if ( empty( $_REQUEST['order_id'] ) ) {
            $this->rJson(400,'missing order_id field');
        }
        $order_id = wc_clean( $_REQUEST['order_id'] );

        if ( version_compare( WC()->version, '3.0', '<' ) ) {
            $order_trackings = array(
                'slug'                  => get_post_meta( $order_id, '_trackingmore_tracking_provider', true ),
                'tracking_number'       => get_post_meta( $order_id, '_trackingmore_tracking_number', true ),
                'name'                  => get_post_meta( $order_id, '_trackingmore_tracking_provider_name', true ),
                'key'                   => get_post_meta( $order_id, '_trackingmore_tracking_key', true ),
                'account_number'        => get_post_meta( $order_id, '_trackingmore_tracking_account', true ),
                'postal_code'           => get_post_meta( $order_id, '_trackingmore_tracking_postal', true ),
                'ship_date'             => get_post_meta( $order_id, '_trackingmore_tracking_shipdate', true ),
                'destination_country'   => get_post_meta( $order_id, '_trackingmore_tracking_destination_country', true ),
                'origin_country'        => get_post_meta( $order_id, '_trackingmore_tracking_origin_country', true ),
            );
        } else {
            $order          = new WC_Order( $order_id );
            $order_trackings = array(
                'slug'                  => $order->get_meta( '_trackingmore_tracking_provider', true ),
                'tracking_number'       => $order->get_meta( '_trackingmore_tracking_number', true ),
                'name'                  => $order->get_meta( '_trackingmore_tracking_provider_name', true ),
                'key'                   => $order->get_meta( '_trackingmore_tracking_key', true ),
                'account_number'        => $order->get_meta( '_trackingmore_tracking_account', true ),
                'postal_code'           => $order->get_meta( '_trackingmore_tracking_postal', true ),
                'ship_date'             => $order->get_meta( '_trackingmore_tracking_shipdate', true ),
                'destination_country'   => $order->get_meta( '_trackingmore_tracking_destination_country', true ),
                'origin_country'        => $order->get_meta( '_trackingmore_tracking_origin_country', true ),
            );
        }
        /*** 暂时获取物流商、简码  结束 ***/

        $data = array(
            'country_region'    => $country_region,
            'couriers_list'     => $couriers,
            'couriers'          => $couriers_list,
            'trackings'         => $order_trackings,
        );

        $this->rJson(200, 'success', $data);
    }

    // 获取物流商、简码
    public function get_single_tracking() {
        check_ajax_referer( 'get-tracking-item', 'security', true );

        if ( empty( $_REQUEST['order_id'] ) ) {
            $this->rJson(400,'missing order_id field');
        }
        $order_id = wc_clean( $_REQUEST['order_id'] );

        if ( version_compare( WC()->version, '3.0', '<' ) ) {
            $order_trackings = array(
                'slug'                  => get_post_meta( $order_id, '_trackingmore_tracking_provider', true ),
                'tracking_number'       => get_post_meta( $order_id, '_trackingmore_tracking_number', true ),
                'name'                  => get_post_meta( $order_id, '_trackingmore_tracking_provider_name', true ),
                'key'                   => get_post_meta( $order_id, '_trackingmore_tracking_key', true ),
                'account_number'        => get_post_meta( $order_id, '_trackingmore_tracking_account', true ),
                'postal_code'           => get_post_meta( $order_id, '_trackingmore_tracking_postal', true ),
                'ship_date'             => get_post_meta( $order_id, '_trackingmore_tracking_shipdate', true ),
                'destination_country'   => get_post_meta( $order_id, '_trackingmore_tracking_destination_country', true ),
                'origin_country'        => get_post_meta( $order_id, '_trackingmore_tracking_origin_country', true ),
            );
        } else {
            $order          = new WC_Order( $order_id );
            $order_trackings = array(
                'slug'                  => $order->get_meta( '_trackingmore_tracking_provider', true ),
                'tracking_number'       => $order->get_meta( '_trackingmore_tracking_number', true ),
                'name'                  => $order->get_meta( '_trackingmore_tracking_provider_name', true ),
                'key'                   => $order->get_meta( '_trackingmore_tracking_key', true ),
                'account_number'        => $order->get_meta( '_trackingmore_tracking_account', true ),
                'postal_code'           => $order->get_meta( '_trackingmore_tracking_postal', true ),
                'ship_date'             => $order->get_meta( '_trackingmore_tracking_shipdate', true ),
                'destination_country'   => $order->get_meta( '_trackingmore_tracking_destination_country', true ),
                'origin_country'        => $order->get_meta( '_trackingmore_tracking_origin_country', true ),
            );
        }

        $this->rJson( 200, 'success', ['trackings'=>$order_trackings] );
    }

    // 信息保存
    public function save_single_tracking() {
        check_ajax_referer( 'create-tracking-item', 'security', true );

        $order_id               = wc_clean( $_REQUEST['order_id'] );
        $slug                   = wc_clean( $_REQUEST['slug'] );
        $tracking_number        = wc_clean( $_REQUEST['tracking_number'] );
        $tracking_key           = wc_clean( $_REQUEST['key'] );
        $account_number         = wc_clean( $_REQUEST['account_number'] );
        $postal_code            = wc_clean( $_REQUEST['postal_code'] );
        $ship_date              = wc_clean( $_REQUEST['ship_date'] );
        $destination_country    = wc_clean( $_REQUEST['destination_country'] );
        if ( empty( $order_id ) || empty( $slug ) || empty( $tracking_number ) ) {
            $this->rJson( 400, 'missing required field' );
        }

        // 获取所有物流商
        $couriers_list = json_decode( file_get_contents( $GLOBALS['trackingmore']->pluginDir . "/assets/js/couriers.json" ), true );
        // 获取物流商名称
        $found_arr = array_column($couriers_list, 'slug');
        $found_key = array_search( $slug, $found_arr );
        $courier_name = $couriers_list[$found_key]['name'];

        if ( version_compare( WC()->version, '3.0', '<' ) ) {
            update_post_meta( $order_id, '_trackingmore_tracking_number', $tracking_number );
            update_post_meta( $order_id, '_trackingmore_tracking_provider', $slug );
            update_post_meta( $order_id, '_trackingmore_tracking_provider_name', $courier_name );
            update_post_meta( $order_id, '_trackingmore_tracking_key', $tracking_key );
            update_post_meta( $order_id, '_trackingmore_tracking_account', $account_number );
            update_post_meta( $order_id, '_trackingmore_tracking_postal', $postal_code );
            update_post_meta( $order_id, '_trackingmore_tracking_shipdate', $ship_date );
            update_post_meta( $order_id, '_trackingmore_tracking_destination_country', $destination_country );
            update_post_meta( $order_id, '_trackingmore_tracking_origin_country', $destination_country );
        } else {
            $order = new WC_Order( $order_id );
            $order->update_meta_data( '_trackingmore_tracking_number', $tracking_number );
            $order->update_meta_data( '_trackingmore_tracking_provider', $slug );
            $order->update_meta_data( '_trackingmore_tracking_provider_name', $courier_name );
            $order->update_meta_data( '_trackingmore_tracking_key', $tracking_key );
            $order->update_meta_data( '_trackingmore_tracking_account', $account_number );
            $order->update_meta_data( '_trackingmore_tracking_postal', $postal_code );
            $order->update_meta_data( '_trackingmore_tracking_shipdate', $ship_date );
            $order->update_meta_data( '_trackingmore_tracking_destination_country', $destination_country );
            $order->update_meta_data( '_trackingmore_tracking_origin_country', $destination_country );
            $order->save_meta_data();
        }
        // date_modified update
        $order = new WC_Order( $order_id );
        $order->set_date_modified( current_time( 'mysql' ) );
        $order->save();

        $this->rJson( 200, 'success' );
    }

    // 信息删除
    public function delete_single_tracking() {
        check_ajax_referer( 'delete-tracking-item', 'security', true );

        $order_id           = wc_clean( $_REQUEST['order_id'] );
        if ( empty( $order_id ) ) {
            $this->rJson( 400, 'missing required field' );
        }

        if ( version_compare( WC()->version, '3.0', '<' ) ) {
            update_post_meta( $order_id, '_trackingmore_tracking_number', null );
            update_post_meta( $order_id, '_trackingmore_tracking_provider', null );
            update_post_meta( $order_id, '_trackingmore_tracking_provider_name', null );
            update_post_meta( $order_id, '_trackingmore_tracking_key', null );
            update_post_meta( $order_id, '_trackingmore_tracking_account', null );
            update_post_meta( $order_id, '_trackingmore_tracking_postal', null );
            update_post_meta( $order_id, '_trackingmore_tracking_shipdate', null );
            update_post_meta( $order_id, '_trackingmore_tracking_destination_country', null );
            update_post_meta( $order_id, '_trackingmore_tracking_origin_country', null );
        } else {
            $order = new WC_Order( $order_id );
            $order->update_meta_data( '_trackingmore_tracking_number', null );
            $order->update_meta_data( '_trackingmore_tracking_provider', null );
            $order->update_meta_data( '_trackingmore_tracking_provider_name', null );
            $order->update_meta_data( '_trackingmore_tracking_key', null );
            $order->update_meta_data( '_trackingmore_tracking_account', null );
            $order->update_meta_data( '_trackingmore_tracking_postal', null );
            $order->update_meta_data( '_trackingmore_tracking_shipdate', null );
            $order->update_meta_data( '_trackingmore_tracking_destination_country', null );
            $order->update_meta_data( '_trackingmore_tracking_origin_country', null );
            $order->save_meta_data();
        }
        // date_modified update
        $order = new WC_Order( $order_id );
        $order->set_date_modified( current_time( 'mysql' ) );
        $order->save();

        $this->rJson( 200, 'success' );
    }

    ###+++++++++++++++++++++++++++++++++++++++++++++ ajax end ++++++++++++++++++++++++++++++++++++++++###

    // 数据返回
    private function rJson( $code, $message, $data = array() ) {
        header( 'Content-Type: application/json' );
        wp_send_json( array('code' => $code, 'msg'  => $message, 'data' => $data) );
        wp_die();
    }
}
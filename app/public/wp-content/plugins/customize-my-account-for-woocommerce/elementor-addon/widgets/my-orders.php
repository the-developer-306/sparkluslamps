<?php
class Elementor_My_orders_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'my_orders_widget';
	}

	public function get_title() {
		return esc_html__( 'My Orders', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-products-archive';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/my-orders.php';
	}
}
<?php
class Elementor_orders_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'orders_widget';
	}

	public function get_title() {
		return esc_html__( 'Orders', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-editor-list-ol';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/orders.php';
	}
}
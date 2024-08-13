<?php
class Elementor_paymentmethods_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'paymentmethods_widget';
	}

	public function get_title() {
		return esc_html__( 'Payment Methods', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-paypal-button';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/payment-methods.php';
	}
}
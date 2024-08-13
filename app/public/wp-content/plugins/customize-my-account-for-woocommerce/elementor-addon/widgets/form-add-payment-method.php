<?php
class Elementor_formaddpaymentmethod_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'my_formaddpaymentmethod_widget';
	}

	public function get_title() {
		return esc_html__( 'Add Payment Method', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-paypal-button';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/form-add-payment-method.php';
	}
}
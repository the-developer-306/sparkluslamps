<?php
class Elementor_myaddress_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'my_myaddresswidget';
	}

	public function get_title() {
		return esc_html__( 'My Address', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-map-pin';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/my-address.php';
	}
}
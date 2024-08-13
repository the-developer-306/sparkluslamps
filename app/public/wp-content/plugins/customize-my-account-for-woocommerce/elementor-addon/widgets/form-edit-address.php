<?php
class Elementor_formeditaddress_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'my_formeditaddresswidget';
	}

	public function get_title() {
		return esc_html__( 'Edit address Form', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-image-hotspot';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/form-edit-address.php';
	}
}
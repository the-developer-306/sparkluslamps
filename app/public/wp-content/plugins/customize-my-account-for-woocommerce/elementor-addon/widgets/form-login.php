<?php
class Elementor_formlogin_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'my_formloginwidget';
	}

	public function get_title() {
		return esc_html__( 'Login Form', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-person';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/form-login.php';
	}
}
<?php
class Elementor_dashboard_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'dashboard_widget_1';
	}

	public function get_title() {
		return esc_html__( 'Dashboard', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-dashboard';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/dashboard.php';
	}
}
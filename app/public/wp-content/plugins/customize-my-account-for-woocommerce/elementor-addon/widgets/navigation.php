<?php
class Elementor_navigation_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'navigation_widget';
	}

	public function get_title() {
		return esc_html__( 'Navigation', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-nav-menu';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/navigation.php';
	}
}
<?php
class Elementor_formeditaccount_widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'my_formeditaccountwidget';
	}

	public function get_title() {
		return esc_html__( 'Edit Account Form', 'customize-my-account-for-woocommerce' );
	}

	public function get_icon() {
		return 'eicon-editor-external-link';
	}

	public function get_categories() {
		return [ 'customize-my-account' ];
	}



	protected function render() {
		include 'templates/form-edit-account.php';
	}
}
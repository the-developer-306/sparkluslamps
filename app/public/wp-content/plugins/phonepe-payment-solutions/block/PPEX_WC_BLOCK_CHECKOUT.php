<?php
require_once __DIR__ . '/../common/PPEX_PG_Constants.php';
use Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType;

final class PPEX_WC_BLOCK_CHECKOUT extends AbstractPaymentMethodType {
	protected $name = PPEX_PG_Constants::PHONEPE_PG_ID;
	public function initialize() {
		$this->settings = get_option('woocommerce_phonepe_settings', []);
	}

	public function is_active() {
		return true;
	}

	public function get_payment_method_script_handles() {

		wp_register_script(
			'ppex_wc_blocks_integration',
			plugin_dir_url(__FILE__) . '../js/ppex_block_checkout.js',
			[
				'wc-blocks-registry',
				'wc-settings',
				'wp-element',
				'wp-html-entities',
				'wp-i18n',
			],
			null,
			true
		);

		return ['ppex_wc_blocks_integration'];
	}
}

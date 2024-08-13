<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://coderitsolution.com/
 * @since      1.0.0
 *
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/includes
 * @author     Coder IT Solution <coderitteam@gmail.com>
 */
class Cits_Customize_Woocommerce_My_Account_Page_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'cits-customize-woocommerce-my-account-page',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
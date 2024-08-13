<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://coderitsolution.com/
 * @since      1.0.0
 *
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/includes
 * @author     Coder IT Solution <coderitteam@gmail.com>
 */
class Cits_Customize_Woocommerce_My_Account_Page_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	private $table_activator;
    public function __construct($activator){
        $this->table_activator = $activator;
    }
	public function deactivate() {
		if ( ! defined( 'ABSPATH' ) ) exit;
        global $wpdb;
        $wpdb->query("DROP TABLE IF EXISTS ".$wpdb->prefix."cits_custom_woo_my_account");
	}

}
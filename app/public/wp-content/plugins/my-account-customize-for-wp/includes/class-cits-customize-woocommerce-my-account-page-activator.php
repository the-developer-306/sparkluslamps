<?php

/**
 * Fired during plugin activation
 *
 * @link       https://coderitsolution.com/
 * @since      1.0.0
 *
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/includes
 * @author     Coder IT Solution <coderitteam@gmail.com>
 */
class Cits_Customize_Woocommerce_My_Account_Page_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
  public function activate() {
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php');

    global $wpdb;
    // Table 1
    $cits_custom_woo_my_account_query = "CREATE TABLE `".$this->cits_custom_woo_my_account_prefix()."` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `menu_position` varchar(255) NOT NULL,
            `select_design` varchar(255) NOT NULL,
            `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci";
    dbDelta($cits_custom_woo_my_account_query);
    $tableName = $this->cits_custom_woo_my_account_prefix();
    $data = array(
      'menu_position'   => 'left',
      'select_design'   => 'simple_design',
    );
    $wpdb->insert($tableName, $data );


	}
	// Prefix add korer jonno
  public function cits_custom_woo_my_account_prefix(){
      if ( ! defined( 'ABSPATH' ) ) exit;
      global $wpdb;
      return $wpdb->prefix . "cits_custom_woo_my_account";
  }
 
}
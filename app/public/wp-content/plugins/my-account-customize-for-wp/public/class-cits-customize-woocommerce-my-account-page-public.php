<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://coderitsolution.com/
 * @since      1.0.0
 *
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Cits_Customize_Woocommerce_My_Account_Page
 * @subpackage Cits_Customize_Woocommerce_My_Account_Page/public
 * @author     Coder IT Solution <coderitteam@gmail.com>
 */
class Cits_Customize_Woocommerce_My_Account_Page_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		$menuPosition = cits_custom_woo_my_account_table_func("menu_position");
		$selectDesign = cits_custom_woo_my_account_table_func("select_design");
 
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/cits-customize-woocommerce-my-account-page-public.css', array(), $this->version, 'all' );
		if ($menuPosition === 'left') {
			wp_enqueue_style( 'my-account-left', CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL . 'public/css/cits-customize-woocommerce-my-account-left.css', array(), $this->version, 'all' );
		}if ($menuPosition === 'right') {
			wp_enqueue_style( 'my-account-right', CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL . 'public/css/cits-customize-woocommerce-my-account-right.css', array(), $this->version, 'all' );
		}if ($menuPosition === 'horizontal') {
			wp_enqueue_style( 'my-account-horizontal', CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL . 'public/css/cits-customize-woocommerce-my-account-horizontal.css', array(), $this->version, 'all' );
		}if ($selectDesign === 'simple_design') {
			wp_enqueue_style( 'my-account-dark-design', CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL . 'public/css/cits-customize-woocommerce-my-account-simple-design.css', array(), $this->version, 'all' );
		}if ($selectDesign === 'dark_design') {
			wp_enqueue_style( 'my-account-dark-design', CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL . 'public/css/cits-customize-woocommerce-my-account-dark-design.css', array(), $this->version, 'all' );
		}if ($selectDesign === 'modern_desgin') {
			wp_enqueue_style( 'my-account-modern-design', CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL . 'public/css/cits-customize-woocommerce-my-account-modern-design.css', array(), $this->version, 'all' );
		};

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() { 
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/cits-customize-woocommerce-my-account-page-public.js', array( 'jquery' ), $this->version, false );

	}

}
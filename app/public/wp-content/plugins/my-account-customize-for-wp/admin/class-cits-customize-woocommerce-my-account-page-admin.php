<?php
class Cits_Customize_Woocommerce_My_Account_Page_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}


	private $allowed_tags =  [
	    'div' => [
	        'class' => true,
	        'id' => true,
	    ],
	    
	    'img' => [
	        'src' => true,
	        'alt' => true,
	        'class' => true,
	    ],
	    'a' => [
	        'href' => true,
	        'title' => true,
	        'class' => true,
	        'target' => true,
	        'rel' => true
	    ],
	    'ul' => [
	        'class' => true,
	    ],
	    'li' => [
	        'class' => true,
	    ],
	    'p' => [
	        'class' => true,
	    ],
	    'h1' => [
	        'class' => true,
	    ],
	    'h2' => [
	        'class' => true,
	    ],
	    'h3' => [
	        'class' => true,
	    ],
	    'button' => [
	        'type' => true,
	        'class' => true,
	        'style' => true
	    ],
	    'table' => [
	        'class' => true,
	        'role' => true,
	    ],
	    'tbody' => [],
	    'tr' => [],
	    'th' => [
	        'scope' => true,
	    ],
	    'td' => [],
	    'span' => [
	        'class' => true,
	    ],
	    'textarea' => [
	        'class' => true,
	        'name' => true,
	        'placeholder' => true,
	        'readonly' => true,
	        'cols' => true,
	        'rows' => true,
	    ],
	    'form' => [
	        'method' => true,
	        'action' => true,
	        'class' => true,
	    ],
	    'input' => [
	        'type' => true,
	        'name' => true,
	        'checked' => true,
	        'value' => true,
	        'class' => true,
	        'id' => true,
	        'placeholder' => true,
	        'readonly' => true,
	    ],
	    'label' => [
	        'for' => true,
	        'class' => true,
	    ],
	    'br' => [],
	    'owl-carousel' => [
	        'class' => true,
	    ],
	    'owl-theme' => [
	        'class' => true,
	    ],
	    'script' => [
	        'class' => true,
	    ],
	];

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() { 
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/cits-customize-woocommerce-my-account-page-admin.css', array(), $this->version, 'all' ); 
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() { 
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/cits-customize-woocommerce-my-account-page-admin.js', array( 'jquery' ), $this->version, false ); 
	}


	public function add_cits_customize_woocommerce_my_account_page_activator_manu(){
	
		add_menu_page(
	        "CITS_Woo_Options",
        	"Woocommerce My Account Customize",
	        "manage_options",
	        "cits_woocommerce_options",
	        array($this, "cits_woocommerce_dashbord_function"),
	        CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL . 'admin/images/logo.svg',
	        25
	    );
	    add_submenu_page(
	    	"cits_woocommerce_options",
	    	"Settings",
	    	"Settings",
	    	"manage_options",
	    	"cits_woocommerce_options",
	    	array($this, "cits_woocommerce_dashbord_function")
	    );
	    add_submenu_page(
	    	'cits_woocommerce_options',
	        'About',
	        'About',
	        'manage_options',
	        'cits_about',
	        array($this, "cits_woocommerce_new_function")
	    );

	   

	}

	public function cits_woocommerce_dashbord_function(){
		ob_start();
		include_once(CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_PATH . "admin/partials/cits-customize-woocommerce-my-account-deshbord.php");

		$template = ob_get_contents();
		ob_get_clean();
		echo wp_kses($template,$this->allowed_tags);
	}

	public function cits_woocommerce_new_function(){
		ob_start();
		include_once(CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_PATH . "admin/partials/cits-customize-woocommerce-my-account-about.php");

		$template = ob_get_contents();
		ob_get_clean();
		echo wp_kses($template,$this->allowed_tags);
	}




}
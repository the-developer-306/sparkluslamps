<?php
/*
	 Plugin Name: Fastrr Checkout
	 Description: Seamlessly integrate with pickrr which will help you ship across 26000 pincodes and and at the cheapest of rates. Let you customer choose the courier based on their flexibility.
	 Version: 3.0
	 Author: Fastrr Checkout
	 Author URI: https://pickrr.in
	 Copyright: pickrr
	 Text Domain: pickrr-woocommerce-shipping-calculator
	 WC requires at least: 3.0.1
	 WC tested up to: 5.8
	*/
@ini_set('WP_DEBUG', false);
@ini_set('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);

$plugin_js_path = "https://fastrr-boost-ui.pickrr.com/assets/js/channels/woocommerce.js";
global $plugin_js_path;

if (!defined('ABSPATH')) {
	exit;
}

/*
 * Common Classes.
 */
if (!class_exists("pickrr_Shipping_Rates_Common")) {
	require_once 'class-pickrr-shipping-rates-common.php';
}

register_activation_hook(__FILE__, function () {
	//flush_rewrite_rules();
	//die("register_activation_hook <br>");
	$woocommerce_status = pickrr_Shipping_Rates_Common::woocommerce_active_check(); // True if woocommerce is active.
	if ($woocommerce_status === false) {
		deactivate_plugins(basename(__FILE__));
		wp_die(__("Oops! You tried installing the plugin without activating woocommerce. Please install and activate woocommerce and then try again .", "pickrr-woocommerce-shipping-calculator"), "", array('back_link' => 1));
	}
});

register_uninstall_hook(__FILE__, 'pickrr_woocommerce_uninstall');

/**
 * Delete all settings data when uninstalled
 *
 * @return null
 */
function pickrr_woocommerce_uninstall()
{
	delete_option('fastrr_checkout_option_name');
}



/**
 * pickrr shipping calculator root directory path.
 */
if (!defined('pickrr_WC_RATE_PLUGIN_ROOT_DIR')) {
	define('pickrr_WC_RATE_PLUGIN_ROOT_DIR', __DIR__);
}

/**
 * pickrr Shipping Calculator root file.
 */
if (!defined('pickrr_WC_RATE_PLUGIN_ROOT_FILE')) {
	define('pickrr_WC_RATE_PLUGIN_ROOT_FILE', __FILE__);
}


if (!defined("pickrr_ACCESS_TOKEN")) {
	define("pickrr_ACCESS_TOKEN", "");
}

/**
 * pickrr account register api.
 */
if (!defined("pickrr_WC_ACCOUNT_REGISTER_ENDPOINT")) {
	define("pickrr_WC_ACCOUNT_REGISTER_ENDPOINT", "https://reporting.pickrr.com/api/ve1/aggregator-service/seller/verify");
}

/**
 * WooCommerce Shipping Calculator.
 */

add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'pickrr_plugin_action_links');
function pickrr_plugin_action_links($links)
{
	$plugin_links = array(
		'<a href="' . admin_url('admin.php?page=fastrr-checkout') . '">' . __('Settings', 'fastrr-checkout') . '</a>',
		'<a href="https://support.pickrr.in/solution/articles/43000526636-pickrr-wordpress-app-help-document">' . __('Documentation', 'fastrr-checkout') . '</a>',
		'<a href="https://app.pickrr.in/register">' . __('Sign Up', 'fastrr-checkout') . '</a>'
	);
	return array_merge($plugin_links, $links);
}
if (!class_exists("FastrrCheckout")) {
	require_once 'FastrrCheckout.php';
}

add_action('before_woocommerce_init', function () {
	if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
		\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
	}
	wc_enqueue_js( "
	if(Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Calcutta' || Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kolkata'){
		document.cookie = 'hidecheckout=' + encodeURIComponent(false) + '; path=/;';
	}else{
		document.cookie = 'hidecheckout=' + encodeURIComponent(true) + '; path=/;';
	};");
});

wp_enqueue_script( 'jquery-v-3', $plugin_js_path, array(), null, true );
// customize checkout page Ayush plugin
add_action('woocommerce_after_add_to_cart_form', 'bbloomer_echo_variation_info');
function bbloomer_echo_variation_info()
{
	global $product;
	if (!$product->is_type('variable'))
		return;


	// 	setting variant id to button
	if ($product->is_type('variable')) {
		wc_enqueue_js("
			if($( 'input.variation_id' ).val() !== ''){
				document.getElementById('buyNowBtn').dataset.variation_id = $( 'input.variation_id' ).val();
			}
		  ");
		wc_enqueue_js("
			 $( 'input.variation_id' ).change( function(){
				if( '' != $(this).val() ) {
				   var var_id = $(this).val();
				   document.getElementById('buyNowBtn').dataset.variation_id = var_id;
				}
			 });
		  ");
	}


	wc_enqueue_js("
      $(document).on('found_variation', 'form.cart', function( event, variation ) {   
	    document.getElementById('buyNowBtn').dataset.variation_qty = variation?.max_qty;
      });
   ");


}
// Start rest_api_init
add_action('rest_api_init', function () {
	register_rest_route('wc/v3/', '/product/(?P<id>[0-9 ,]+)/variation/(?P<variation_id>[0-9 ,]+)', [
		'methods' => 'GET',
		'callback' => 'wl_posts',
	]);
});
function wl_posts($data)
{
	try {
		if (!empty($data->get_param('id'))) {
			// get all shipping_tax_rate start
			$all_tax_rates = [];
			$tax_classes = WC_Tax::get_tax_classes(); // Retrieve all tax classes.
			if (!in_array('', $tax_classes)) { // Make sure "Standard rate" (empty class name) is present.
				array_unshift($tax_classes, '');
			}
			foreach ($tax_classes as $tax_class) { // For each tax class, get all rates.
				$taxes = WC_Tax::get_rates_for_tax_class($tax_class);
				$all_tax_rates = array_merge($all_tax_rates, $taxes);
			}
			$shipping_tax_rate = [];
			foreach ($all_tax_rates as $all_tax_rates_key => $all_tax_rates_value) {
				$all_tax_rates_value = json_decode(json_encode($all_tax_rates_value), true);
				if ($all_tax_rates_value['tax_rate_shipping'] == 1) {
					$shipping_tax_rate = $all_tax_rates_value;
					break;
				}
			}
			// get all shipping_tax_rate end

			$product_id_str = $data->get_param('id');
			$product_ids = explode(",", $product_id_str);
			$variation_id_str = $data->get_param('variation_id');
			$variation_ids = explode(",", $variation_id_str);
			$products_details = [];

			foreach ($product_ids as $key => $product_id) {
				if (!empty($product_id)) {
					$product = wc_get_product($product_id);
					if ($product === false) {
						throw new \Exception('Product id invalid ');
					}
					$product_details = [];
					$product_details['is_taxable'] = $product->is_taxable();
					$product_details['variable'] = $product->is_type('variable');
					if (!empty($variation_ids[$key]) && $product_details['variable']) {
						$variation_id = $variation_ids[$key];
						$product = new WC_Product_Variation($variation_id);
					}
					if ($product->is_taxable()) {
						$tax = new WC_Tax();
						$base_tax_rates = $tax->get_shop_base_rate($product->tax_class);
						$product_details['base_tax_rates'] = $base_tax_rates;
						$product_details['prices_include_tax'] = get_option('woocommerce_prices_include_tax');
					}
					$product_details['get_data'] = $product->get_data();
					$product_details['get_data']['img'] = wp_get_attachment_image_url($product->get_image_id(), 'full');
					$product_details['shipping_tax_rate'] = $shipping_tax_rate;
					$products_details[$product_id] = $product_details;
				}
			}
		}
		return $products_details;
	} catch (Exception $e) {
		return ["error" => $e->getMessage()];
	}
}

// End

add_filter( 'woocommerce_rest_shop_order_object_query', 'filter_orders_by_custom_order_number', 100, 2 );

function filter_orders_by_custom_order_number( $args, $request ) {
    if( !isset( $request['_fastrr_cart_id'] ) ) {
        return $args;
    }
    // add custom query to existing meta_query if exist
    if( isset( $args['meta_query'] ) ) {
        $args['meta_query']['relation'] = 'AND';
    } else {
        $args['meta_query'] = array();
    }
    $args['meta_query'][] = array(
        'key' => '_fastrr_cart_id',
        'value' => $request['_fastrr_cart_id']
    );
    
    return $args;
}

add_action('plugins_loaded', 'alter_woo_hooks');

function alter_woo_hooks()
{
	$settings = get_option('fastrr_checkout_option_name');
	add_shortcode('buy_now_fastrr', 'pickrr_add_to_cart_fasterr');
	if ($settings['proceed_to_checkout_button_enabled'] == 'no') {
		remove_action('woocommerce_proceed_to_checkout', 'woocommerce_button_proceed_to_checkout', 20);
		remove_action('woocommerce_widget_shopping_cart_buttons', 'woocommerce_widget_shopping_cart_proceed_to_checkout', 20);
		// view cart option in hover cart
		//remove_action( 'woocommerce_widget_shopping_cart_buttons', 'woocommerce_widget_shopping_cart_button_view_cart', 10 );
		add_filter('woocommerce_order_button_html', 'remove_order_place_button_html');
	}
	if (isset($settings['fastrr_enable_in_checkout_page_enabled']) && $settings['fastrr_enable_in_checkout_page_enabled'] == 'yes') {
		//add_action('woocommerce_review_order_after_submit', 'pickrr_fasterr_checkout_page', 20);
		$args = "checkout_page";
		add_action('woocommerce_review_order_after_submit', function () use ($args) {
			pickrr_fasterr_checkout_page($args);
		});
	}

	if (isset($settings['fastrr_enable_in_cart_page_enabled']) && $settings['fastrr_enable_in_cart_page_enabled'] == 'yes') {
		$args = "cart_page";
		//add_action('woocommerce_after_cart_totals', 'pickrr_fasterr_checkout_page', 20);
		add_action(
			'woocommerce_proceed_to_checkout',
			function () use ($args) {
				pickrr_fasterr_checkout_page($args);
			}
		);

		
	}

	if(isset($settings['fastrr_enable_in_mini_cart']) && $settings['fastrr_enable_in_mini_cart'] =='yes'){
			$args = "cart_page";
			if(isset($settings['mini_cart_sort_code']) && $settings['mini_cart_sort_code'] !==''){
				$default_minicart_hook = $settings['mini_cart_sort_code'];
			}else{
				$default_minicart_hook = 'woocommerce_widget_shopping_cart_buttons';
			};
			add_action($default_minicart_hook,
			   function() use ( $args ) {
				   pickrr_fasterr_checkout_page( $args ); });
		};
		
	if (isset($settings['fastrr_enable_in_product_page_enabled']) && $settings['fastrr_enable_in_product_page_enabled'] == 'yes') {
		add_action('wp_enqueue_scripts', 'callback_for_setting_up_scripts');
		add_action('woocommerce_after_add_to_cart_button', 'pickrr_add_to_cart_fasterr', 20);
	}
	if (isset($settings['fastrr_enable_in_prod_mode']) && $settings['fastrr_enable_in_prod_mode'] == 'yes') {
			wc_enqueue_js("
					$(document).ready(function() {
	 				$('.checkout-button.button.alt.wc-forward').hide();
	 				$('.button.checkout.wc-forward').hide();
					});
			");
	}
}
function remove_order_place_button_html($button)
{
	return '';
}

add_action('init', 'woocommerce_clear_cart_url');

function woocommerce_clear_cart_url()
{
	if (isset($_GET['clear-cart'])) {
		global $woocommerce;
		$woocommerce->cart->empty_cart();
	};
	try {
			if (isset($_GET['attributes']["cart_data"])) {
				global $woocommerce;

				$woocommerce->cart->empty_cart();
		
				// Extract product_id and quantity from attributes[cart_data]
				$cart_data = $_GET['attributes']['cart_data'];
				$cart_items = explode(',', $cart_data);
				
				foreach ($cart_items as $cart_item) {
						list($product_id, $quantity) = explode(':', $cart_item);
						// Add product to the cart
						WC()->cart->add_to_cart($product_id, $quantity);
				};
		}
		} catch (\Throwable $th) {
			echo $th;
		}
}

/**
 * Show an faster button in add_to_cart_page.
 *
 * @return null
 */

function get_css($settings = [], $type = 'button', $page = '')
{
	// $type = button || img
	// $page = product_page || cart_page
	$styple = "display: flex; justify-content: center; align-items: center; ";

	if ($page == 'product_page' && $type == 'button') {
		if (isset($settings['fastrr_enable_in_product_page_style_width']) && !empty($settings['fastrr_enable_in_product_page_style_width'])) {
			$styple .= "width:" . $settings['fastrr_enable_in_product_page_style_width'] . ';';
		}
		if (isset($settings['fastrr_enable_in_product_page_style_background_color']) && !empty($settings['fastrr_enable_in_product_page_style_background_color'])) {
			$styple .= "background-color:" . $settings['fastrr_enable_in_product_page_style_background_color'] . ';';
		}
		if (isset($settings['fastrr_enable_in_product_page_style_border']) && !empty($settings['fastrr_enable_in_product_page_style_border'])) {
			$styple .= "border:" . $settings['fastrr_enable_in_product_page_style_border'] . ';';
		}
		if (isset($settings['fastrr_enable_in_product_page_style']) && !empty($settings['fastrr_enable_in_product_page_style'])) {
			$styple .= $settings['fastrr_enable_in_product_page_style'];
		}

	}
	if ($page == 'cart_page' && $type == 'button') {
		if (isset($settings['fastrr_enable_in_cart_page_style_width']) && !empty($settings['fastrr_enable_in_cart_page_style_width'])) {
			$styple .= "width:" . $settings['fastrr_enable_in_cart_page_style_width'] . ';';
		}
		if (isset($settings['fastrr_enable_in_cart_page_style_background_color']) && !empty($settings['fastrr_enable_in_cart_page_style_background_color'])) {
			$styple .= "background-color:" . $settings['fastrr_enable_in_cart_page_style_background_color'] . ';';
		}
		if (isset($settings['fastrr_enable_in_cart_page_style_border']) && !empty($settings['fastrr_enable_in_cart_page_style_border'])) {
			$styple .= "border:" . $settings['fastrr_enable_in_cart_page_style_border'] . ';';
		}
		if (isset($settings['fastrr_enable_in_cart_page_style']) && !empty($settings['fastrr_enable_in_cart_page_style'])) {
			$styple .= $settings['fastrr_enable_in_cart_page_style'];
		}

	}
	return $styple;
}

function callback_for_setting_up_scripts()
{
	wp_register_style('FastrrCss', plugin_dir_url(__FILE__) . 'FastrrCss.css');
	wp_enqueue_style('FastrrCss');
	//     wp_enqueue_script( 'FastrrJS', plugin_dir_url( __FILE__ ).'FastrrJS.js', array( 'jquery' ) );
}
function pickrr_add_to_cart_fasterr()
{
	global $product;
	global $woocommerce;
	global $plugin_js_path;
	// echo $attr;
	$product_id = $product->get_id();
	$new_checkout_url = WC()->cart->get_checkout_url();
	$settings = get_option('fastrr_checkout_option_name');
	if (!isset($settings['integration_id']) || empty($settings['integration_id'])) {
		return true;
	}

	try{
		if(isset($settings['category_to_hide_button']) && $settings['category_to_hide_button'] !==''){
			$ids_to_hide_button = explode(",",  $settings['category_to_hide_button']);
			$product_cat = explode(",",implode(',', wp_get_post_terms(get_the_ID(), 'product_cat', array('fields' => 'ids'))));
			if (is_array($product_cat)) {
				foreach ($product_cat as $cat) {
						if (in_array($cat, $ids_to_hide_button)) {
							return;
						};
				}
		} elseif (is_string($product_cat)) {
				if (in_array($product_cat, $ids_to_hide_button)) {
					return;
				};
		}
	};
	}catch (Exception $e) {
		// Handle the exception
		echo 'Caught exception: ',  $e->getMessage(), "\n";
};

	// 	cases for buy now button
	$button_text = "Buy Now";
	if(isset($settings['fastrr_checkout_button_text']) && $settings['fastrr_checkout_button_text'] !== ""){
			$button_text = $settings['fastrr_checkout_button_text'];
		}
	$discount_text = "";
	$buttonTemplate = $settings['fastrr_checkout_template_name'];
	$buttonDiscount = $settings['fastrr_checkout_display_disc_value'];
	$buttonType = $settings['fastrr_checkout_display_discount_type'];

	if ($buttonDiscount) {
		switch ($buttonType) {
			case 'flat':
				$discount_text = '&#8377;' . " " . $buttonDiscount;
				break;
			case 'percent':
				$discount_text = $buttonDiscount . " " . '%';
				break;
		}
		$discount_text = 'Extra ' . $discount_text . ' Off on';
	}

	switch ($buttonTemplate) {
		case "cod":
			$button_text .= "  with COD";
			$discount_text .= '';
			break;
		case "upi":
			$button_text .= ' with UPI';
			$discount_text = $discount_text ? $discount_text . ' ' . ' UPI' : '';
			break;
		case "cod-upi":
			$button_text .= ' with UPI / COD';
			$discount_text = $discount_text ? $discount_text . ' ' . ' UPI' : '';
			break;
		case 'all':
			$discount_text = $discount_text ? $discount_text . ' ' . ' Prepaid Orders' : '';
			break;
		case 'rz':
			break;
		default:
			$button_text .= ' with UPI / COD';
	}



	//  wp_enqueue_script( 'jquery-v-2', 'https://fastrr-juspay.netlify.app/script.js', false );
	//  wp_enqueue_script( 'jquery-v-2-1', 'https://mystoreorgin.wpcomstaging.com/wp-content/plugins/fastrr-checkout-plugin/FastrrJS.js', false );
	wp_enqueue_script( 'jquery-v-3', $plugin_js_path, array(), null, true );
	//  echo plugin_dir_url( __FILE__ ).'FastrrJS.js';
	// $product_woo_com = new stdClass(); 
	// $product_woo_com->id = $product->get_id();

	?>
	<script>
		window.addEventListener('load', function () {
			var quantity_id = jQuery('.quantity').find(':input[type=text]').attr('id');
			if (!quantity_id) {
				quantity_id = jQuery('.quantity').find(':input[name=quantity]').attr('id');
			}
			jQuery("#fastrr-checkout-btn-2").attr("data-quantity", quantity_id);

			// get quantity_id
			jQuery("#buyNowBtn").attr("data-quantity", quantity_id);

			// disable btn if quanity is less then 0
			var price = <?php echo $product->get_price(); ?>;
			if (price <= 0) {
				jQuery("#buyNowBtn").attr("disabled", 'disabled');
			}


			var className = '';
			jQuery('input[type="submit"]').each(function () {
				if (jQuery(this).val() == "Add to cart") {
					className = jQuery(this).attr("class");
				}
			});
			if (className == '') {
				jQuery('button').each(function (event) {
					if ((jQuery(this).attr("type") == "submit") && (jQuery(this).text() == "Add to cart")) {
						className = jQuery(this).attr("class");
					}
				});
			}
			jQuery("#fastrr-checkout-btn-2").attr("class", className);
		});
	</script>
	<div class="wc-proceed-to-checkoutt" style="<?php if($settings['fastrr_enable_in_prod_mode'] == 'no' || $_COOKIE['hidecheckout']=='true'){ echo "display:none"; }; ?>">
		<input type="hidden" name="variation_id" class="variation_id" value="">
		<div class="shiprocket-headless" data-type="product">
			<button quantity_id="" data-variation_id="" data-id="<?php echo wc_get_product()->get_id(); ?>"
				data-domain="<?php echo get_site_url(); ?>" type="button" class="sr-headless-checkout single_add_to_cart_button"
				id="buyNowBtn" data-qty="<?php echo $product->get_stock_quantity(); ?>">
				<div class="sr-d-flex flex-center">
					<div class="sr-d-flex full-width flex-center">
						<span>
							<?php echo $button_text ?>
						</span>
						<img src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/upi_options.svg"
							alt="Google Pay | Phone Pay | UPI" class="sr-pl-15"><img
							src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/right_arrow.svg" class="sr-pl-15"
							alt="right_arrow">
					</div>
					<div>
						<span class="sr-discount-label">
							<?php echo $discount_text ?>
						</span>
						<span class="sr-powered-by">
							<img src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/powered_by.svg " alt="">
						</span>
					</div>
				</div>
			</button>
		</div>
		<script type="text/javascript">
			jQuery("#buyNowBtn").click(function ($) {
				const btn = document.getElementById('buyNowBtn');
				var quantity_id = jQuery('.quantity').find(':input[type=number]').attr('id');
				const btnClassNames = document.getElementById('buyNowBtn').className;
				var value = document.getElementById(quantity_id)?.value;
				var var_qty = document.getElementById('buyNowBtn').dataset.variation_qty;
				var pro_qty = document.getElementById('buyNowBtn').dataset.qty;

				var total_qty = var_qty ? var_qty : pro_qty;
				var product_ = {};
				var callAPI = false;
				try{
					product_ = {
						id: '<?php echo esc_js( $product->get_id() ); ?>',
						name: '<?php echo esc_js( $product->get_name() ); ?>',
						price: '<?php echo esc_js( $product->get_price() ); ?>',
						type: '<?php echo esc_js( $product->get_type() ); ?>',
						vendor: '<?php echo esc_js( get_post_meta( $product->get_id(), '_vendor', true )); ?>',
						category:'<?php echo esc_js(implode(',', wp_get_post_terms($product->get_id(), 'product_cat', array('fields'=> 'ids')))); ?>'
					};
				}catch(error){
					callAPI = true;
				}
				var image__ = '<?php echo wp_get_attachment_url($product->get_image_id()); ?>';
				product_["image_url"] = image__
				let closest_form_val = jQuery(this).closest('form')?.find(':input:not(:hidden)')?.serializeArray();
				let custom_obj = {};
				closest_form_val?.map(val=>{
					if(val.value){
						var input = jQuery('input[name="' + val.name + '"]');
						var inputId = input.attr('id');
						var labelFor = jQuery('label[for="' + inputId + '"]').text()?.trim();
						let obj_key ;
						if(inputId){
							obj_key=labelFor
						}else{
							obj_key=val.name
						}
						custom_obj[obj_key] = val.value;
					};
				});

				product_["custom_attributes"] = custom_obj;
				console.log(custom_obj, 'extra params');
				if ((!btnClassNames.includes('disabled') || !btnClassNames.includes('disabled')) || var_qty > 0 && var_qty === "") {
					HeadlessCheckout.buyNow(event, product_, callAPI)
				}
			});
			jQuery(document).ready(function ($) {
				let anyBlank = jQuery('#buyNowBtn').closest('form').find(':input[required]').filter(function () {
					return !this.value.trim(); // Check if the value is blank after trimming whitespace
				}).length > 0;

				// Disable the button if any required field is blank
				jQuery('#buyNowBtn').prop('disabled', anyBlank)
				// Attach an event listener to the required fields within the closest form
				jQuery('#buyNowBtn').closest('form').find(':input[required]').on('input', function () {
					// Check if any required field is blank
					let anyBlank = jQuery('#buyNowBtn').closest('form').find(':input[required]').filter(function () {
						return !this.value.trim(); // Check if the value is blank after trimming whitespace
					}).length > 0;

					// Disable the button if any required field is blank
					jQuery('#buyNowBtn').prop('disabled', anyBlank);
				});
			});
			

			jQuery(document).ready(function ($) {
				// Find the closest form to #buyNowBtn
				var form = jQuery('#buyNowBtn').closest('form');
				// Find all input elements with labels within the form
				var inputsWithLabels = form.find('label:not(:hidden)').map(function () {
					var labelFor = $(this).attr('for');
					var labelText = $(this)?.text()?.trim();
					var input = form.find('#' + labelFor + ':not(:hidden)');

					return {
						label: labelText,
						labelText: input?.val()?.trim()
					};
				}).get();
				// Now you have an array of objects with label and input values
				console.log(inputsWithLabels);
			});
			
		</script>
	</div>
	<?php
}
/**
 * Show an faster button in checkout_page.
 *
 * @return null
 */

function load_cart_data()
{
	global $woocommerce;
	$items = $woocommerce->cart->get_cart();
	$cart_product_details = array();
	foreach ($items as $cart_item_key => $cart_item) {
		$_product = wc_get_product($cart_item['data']->get_id());
		$item_data = array();
		$item_data = apply_filters('woocommerce_get_item_data', $item_data, $cart_item);
		$extra_dataa = new stdClass();
		$ind = 0;
		foreach ($item_data as $key => $data) {
			$url_img = '';
			$url_anchor = '';
			if (str_contains($data['display'], 'img')) {
				$doc = new DOMDocument();
				@$doc->loadHTML($data['display']);

				$tags = $doc->getElementsByTagName('img');
				foreach ($tags as $tag) {
					$url_img = $tag->getAttribute('src');
				}
			}
			if (str_contains($data['display'], '<a')) {
				$doc = new DOMDocument();
				@$doc->loadHTML($data['display']);

				$tags = $doc->getElementsByTagName('a');
				foreach ($tags as $tag) {
					$url_anchor = $tag->getAttribute('href');
				}
			}

			$_te = array_map('wp_strip_all_tags', $data);
			$item_data[$key]['key'] = !empty($_te['key']) ? $_te['key'] : $_te['name'];
			$item_data[$key]['display'] = !empty($_te['display']) ? $_te['display'] : $_te['value'];
			if (!empty($_te['key'])) {
				$keys = $_te['key'];
			} elseif (!empty($_te['name'])) {
				$keys = $_te['name'];
			} else {
				$keys = $ind;
			}

			if (!empty($url_img)) {
				$extra_dataa->$keys = $url_img;
			} elseif (!empty($url_anchor)) {
				$extra_dataa->$keys = $url_anchor;

			} else {
				$extra_dataa->$keys = !empty($_te['value']) ? $_te['value'] : $_te['display'];
			}
			$ind++;
		}
		if (isset($cart_item['fpd_data'])) {
			$fpd_data_key = '_fpd_data';
			$extra_dataa->$fpd_data_key = $cart_item['fpd_data']['fpd_product'];
		}
		$attribute = $cart_item['variation'];
		if (isset($attribute)) {
			foreach ($attribute as $key => $value) {
				$extra_dataa->$key = $value;
			}
			;
		}
		;
		$variation_id = 0;
		if (isset($cart_item['variation']) && count($cart_item['variation']) > 0) {
			$variation_id = $cart_item['variation_id'];
			$_product = new WC_Product_Variation($variation_id);
		}
		;
		$cart_product_details[$cart_item_key]['getId'] = $cart_item['product_id'];
		$cart_product_details[$cart_item_key]['sku'] = $_product->get_sku();
		$cart_product_details[$cart_item_key]['img'] = wp_get_attachment_image_url($_product->get_image_id(), 'full');
		$cart_product_details[$cart_item_key]['get_title'] = $_product->get_name(); // $_product->get_title(); // get_title
		$cart_product_details[$cart_item_key]['quantity'] = $cart_item['quantity']; // Quantity
		$cart_product_details[$cart_item_key]['variation_id'] = $variation_id; // variation_id
		$cart_product_details[$cart_item_key]['original_price'] = $_product->get_regular_price(); //get_post_meta($cart_item['product_id'] , '_price', true); // price
		$cart_product_details[$cart_item_key]['price'] = empty($_product->get_price()) ? $cart_product_details[$cart_item_key]['price'] : $_product->get_price(); // _sale_price
		$cart_product_details[$cart_item_key]['category']=implode(',', wp_get_post_terms($_product->get_id(), 'product_cat', array('fields' => 'ids')));
		$cart_product_details[$cart_item_key]['custom_attributes'] = $extra_dataa;
	}
	wp_send_json_success($cart_product_details);
}

add_action('wp_ajax_cart_products', 'load_cart_data');
add_action('wp_ajax_nopriv_cart_products', 'load_cart_data');

function check_product_inventory_cart(){
	global $woocommerce;
	$items = $woocommerce->cart->get_cart();
	$no_stock_product = array();

	foreach($items as $cart_item_key => $cart_item) {
			$_product = wc_get_product($cart_item['data']->get_id());
			if ($_product && $_product->managing_stock()) {
					$stock_quantity = $_product->get_stock_quantity();
					$stock_status = $_product->get_stock_status();

					if ($stock_status === 'outofstock') {
							$no_stock_product[] = $_product->get_name(); // Add product name to the array
					}
			}
	}

	if (empty($no_stock_product)) {
			wp_send_json_success($no_stock_product);
	} else {
			wp_send_json_success($no_stock_product);
	}
}

add_action('wp_ajax_check_product_inventory_cart', 'check_product_inventory_cart');
add_action('wp_ajax_nopriv_check_product_inventory_cart', 'check_product_inventory_cart');
function pickrr_fasterr_checkout_page($args = 'cart_page')
{

	// $args = cart_page || checkout_page
	global $product;
	global $plugin_js_path;
	$settings = get_option('fastrr_checkout_option_name');

	if (!isset($settings['integration_id']) || empty($settings['integration_id'])) {
		return true;
	}

	// 	cases for buy now button
	$button_text = "Buy Now";
	if(isset($settings['fastrr_checkout_button_text']) && $settings['fastrr_checkout_button_text'] !== ""){
			$button_text = $settings['fastrr_checkout_button_text'];
		}
	$discount_text = "";
	$buttonTemplate = $settings['fastrr_checkout_template_name'];
	$buttonDiscount = $settings['fastrr_checkout_display_disc_value'];
	$buttonType = $settings['fastrr_checkout_display_discount_type'];

	if ($buttonDiscount) {
		switch ($buttonType) {
			case 'flat':
				$discount_text = '&#8377;' . " " . $buttonDiscount;
				break;
			case 'percent':
				$discount_text = $buttonDiscount . " " . '%';
				break;
		}
		$discount_text = 'Extra ' . $discount_text . ' Off on';
	}

	switch ($buttonTemplate) {
		case "cod":
			$button_text .= "  with COD";
			$discount_text .= '';
			break;
		case "upi":
			$button_text .= ' with UPI';
			$discount_text = $discount_text ? $discount_text . ' ' . ' UPI' : '';
			break;
		case "cod-upi":
			$button_text .= ' with UPI / COD';
			$discount_text = $discount_text ? $discount_text . ' ' . ' UPI' : '';
			break;
		case 'all':
			$discount_text = $discount_text ? $discount_text . ' ' . ' Prepaid Orders' : '';
			break;
		case 'rz':
			break;
		default:
			$button_text .= ' with UPI / COD';
	}



	// wp_enqueue_script( 'jquery-v-2', 'https://fastrr-boost-ui.pickrr.com/assets/js/channels/woocommerce.js', false );
	wp_enqueue_script( 'jquery-v-3', $plugin_js_path, array(), null, true );
	global $woocommerce;
	$items = $woocommerce->cart->get_cart();
	$cart_product_details = [];
	foreach ($items as $cart_item_key => $cart_item) {
		$_product = wc_get_product($cart_item['data']->get_id());
		$item_data = array();
		$item_data = apply_filters('woocommerce_get_item_data', $item_data, $cart_item);
		$extra_dataa = new stdClass();
		$ind = 0;
		foreach ($item_data as $key => $data) {
			$url_img = '';
			$url_anchor = '';
			if (str_contains($data['display'], 'img')) {
				$doc = new DOMDocument();
				@$doc->loadHTML($data['display']);

				$tags = $doc->getElementsByTagName('img');
				foreach ($tags as $tag) {
					$url_img = $tag->getAttribute('src');
				}
			}
			if (str_contains($data['display'], '<a')) {
				// echo "Image tag inside";
				$doc = new DOMDocument();
				@$doc->loadHTML($data['display']);

				$tags = $doc->getElementsByTagName('a');
				foreach ($tags as $tag) {
					$url_anchor = $tag->getAttribute('href');
					// echo $url_img;
				}
			}

			$_te = array_map('wp_strip_all_tags', $data);
			$item_data[$key]['key'] = !empty($_te['key']) ? $_te['key'] : $_te['name'];
			$item_data[$key]['display'] = !empty($_te['display']) ? $_te['display'] : $_te['value'];
			// $keys = ! empty( $_te['key'] ) ? $_te['key'] : ! empty( $_te['name'] ) ? $_te['name'] : $ind;
			if (!empty($_te['key'])) {
				$keys = $_te['key'];
			} elseif (!empty($_te['name'])) {
				$keys = $_te['name'];
			} else {
				$keys = $ind;
			}

			if (!empty($url_img)) {
				$extra_dataa->$keys = $url_img;
			} elseif (!empty($url_anchor)) {
				$extra_dataa->$keys = $url_anchor;

			} else {
				$extra_dataa->$keys = !empty($_te['value']) ? $_te['value'] : $_te['display'];
			}
			$ind++;
		}
		if (isset($cart_item['fpd_data'])) {
			$fpd_data_key = '_fpd_data';
			$extra_dataa->$fpd_data_key = $cart_item['fpd_data']['fpd_product'];
		}
		$attribute = $cart_item['variation'];
		if (isset($attribute)) {
			foreach ($attribute as $key => $value) {
				$extra_dataa->$key = $value;
			}
			;
		}
		;
		$variation_id = 0;
		if (isset($cart_item['variation']) && count($cart_item['variation']) > 0) {
			$variation_id = $cart_item['variation_id'];
			$_product = new WC_Product_Variation($variation_id);
		}
		;
		// End variations
		$sale_price = get_post_meta($cart_item['product_id'], '_sale_price', true);
		// $cart_product_details[$cart_item_key] = [...$cart_item];
		$cart_product_details[$cart_item_key]['getId'] = $cart_item['product_id'];
		$cart_product_details[$cart_item_key]['sku'] = $_product->get_sku();
		$cart_product_details[$cart_item_key]['img'] = wp_get_attachment_image_url($_product->get_image_id(), 'full');
		$cart_product_details[$cart_item_key]['get_title'] = $_product->get_name(); // $_product->get_title(); // get_title
		$cart_product_details[$cart_item_key]['quantity'] = $cart_item['quantity']; // Quantity
		$cart_product_details[$cart_item_key]['variation_id'] = $variation_id; // variation_id
		$cart_product_details[$cart_item_key]['original_price'] = $_product->get_regular_price(); //get_post_meta($cart_item['product_id'] , '_price', true); // price
		$cart_product_details[$cart_item_key]['price'] = empty($_product->get_price()) ? $cart_product_details[$cart_item_key]['price'] : $_product->get_price(); // _sale_price
		$cart_product_details[$cart_item_key]['category']=implode(',', wp_get_post_terms($_product->get_id(), 'product_cat', array('fields' => 'ids')));

		$cart_product_details[$cart_item_key]['custom_attributes'] = $extra_dataa;
	}
	if ($args == "checkout_page") {
		$button_css = $settings['fastrr_enable_in_checkout_page_style'];
		$fastrr_img_css = $settings['fastrr_enable_in_checkout_page_img_style'];
	} else {
		$button_css = get_css($settings, "button", "cart_page");
		// $fastrr_img_css = $settings['fastrr_enable_in_cart_page_img_style'];
	}
	?>
	<script type="text/javascript">
		function buyfromCart() {
			const qtyExist = document.getElementsByClassName('woocommerce-error')?.[0]?.className;
			const getProductDetails = async () => {
				const that = this
				jQuery.ajax({
					url: '<?php echo admin_url('admin-ajax.php'); ?>',
					data: {
						action: 'cart_products',
						security: '<?php echo wp_create_nonce('custom_nonce'); ?>',
					},
					type: 'GET',
					success: function (response) {
						// Handle the response from the server
						const data = that.cart_product_details(response.data);
						const jsonData = JSON.parse(data);
						let items = jsonData.order_details.items;
						HeadlessCheckout.checkout(event, items);
					},
					error: function (error) {
						console.error('Error in AJAX request:', error);
					}
				});

			};

			if (!qtyExist) {
				getProductDetails();
			} else {
				alert('Item(s) not in the stock');
			};
		}
		if (Intl.DateTimeFormat().resolvedOptions().timeZone !== "Asia/Calcutta" && Intl.DateTimeFormat().resolvedOptions().timeZone !== "Asia/Kolkata") {
			jQuery(".checkout-button").show();
		};
	</script>
	<div class="shiprocket-headless" data-type="cart" style="<?php if($settings['fastrr_enable_in_prod_mode'] == 'no' || $_COOKIE['hidecheckout']=='true'){ echo "display:none"; }; ?>">
		<button data-cartData="<?php echo json_encode($cart_product_details); ?>" type="button"
			class="sr-headless-checkout single_add_to_cart_button checkout-button" id="checkoutBtn">
			<div class="sr-d-flex flex-center">
				<div class="sr-d-flex full-width flex-center">
					<span>
						<?php echo $button_text ?>
					</span>
					<img src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/upi_options.svg"
						alt="Google Pay |                                 Phone Pay | UPI" class="sr-pl-15"><img
						src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/right_arrow.svg"
						class="sr-pl-15" alt="right_arrow">
				</div>

			</div>
			<div>
				<span class="sr-discount-label">
					<?php echo $discount_text ?>
				</span>
				<span class="sr-powered-by">
					<img src="https://fastrr-boost-ui.pickrr.com/assets/images/boost_button/powered_by.svg " alt="">
				</span>

			</div>
		</button>
	</div>
	<script type="text/javascript">
		jQuery("#checkoutBtn").click(function ($) {
			const qtyExist = document.getElementsByClassName('woocommerce-error')?.[0]?.className;
			const getProductDetails = async () => {
				const data = await cart_product_details(<?php echo json_encode($cart_product_details); ?>);
				const jsonData = JSON.parse(data);
				let items = jsonData.order_details.items;
				HeadlessCheckout.checkout(event, items);
			};

			// if (!qtyExist) {
			// 	getProductDetails();
			// } else {
			// 	alert('Item(s) not in the stock');
			// };
			jQuery.ajax({
						url: '<?php echo admin_url('admin-ajax.php'); ?>',
            data: {
								action: 'check_product_inventory_cart',
								security:'<?php echo wp_create_nonce('custom_nonce'); ?>',
            },
            type: 'GET',
            success: async function(response) {
                // Handle the response from the server
								console.log(response,response.data.length);
								if(response.data.length > 0){
									// alert("redirect");
									window.location.href = '/cart/'; 
								}else{
									getProductDetails();
								}
            },
            error: function(error) {
                console.error('Error in AJAX request:', error);
            }
        });
		});
		setTimeout(()=>{
			if (Intl.DateTimeFormat().resolvedOptions().timeZone !== "Asia/Calcutta" && Intl.DateTimeFormat().resolvedOptions().timeZone !== "Asia/Kolkata") {
			// jQuery(".checkout-button").show();
			jQuery(".checkout-button.button.alt.wc-forward").addClass("inline-checkout");
		};
			},2000);
	</script>

	<?php
}



/**
 * Show cart details and ajax call in checkout_page
 *
 * @return null
 */


/**
 * JS for AJAX Add to Cart handling
 */
function ace_product_page_ajax_add_to_cart_js()
{
	?>
	<script type="text/javascript">
		jQuery(document.body).on('updated_cart_totals', function () {
			location.reload();

		});
		function cart_product_details(payload = []) {
			var cart_product_details = payload;
			var box = {}; // my object
			var items = []; // my array
			var total_price = 0;
			var domain_name = `<?php echo str_replace('https://', '', get_site_url()); ?>`;
			const token = "test_item_url";//document.getElementById('product_info').dataset.token;
			for (var k in cart_product_details) {
				// get_title, quantity, price, sale_price
				box = {
					...cart_product_details[k],
					"id": cart_product_details[k].getId,
					"properties": null,
					"quantity": cart_product_details[k].quantity,
					"variant_id": cart_product_details[k].getId,
					"variation_id": cart_product_details[k].variation_id,
					"product_id": cart_product_details[k].getId,
					"key": "39538580717670:f35ab36bca5cc742fdbdfc5b806684a6",
					"title": cart_product_details[k].get_title,
					"price": cart_product_details[k].price * 100,
					"original_price": cart_product_details[k].original_price * 100,
					"discounted_price": 0,
					"line_price": 0,
					"original_line_price": 100,
					"total_discount": 0,
					"discounts": [{
						"amount": 100,
						"title": "auto"
					}],
					"sku": cart_product_details[k].sku,
					"grams": 0,
					"vendor": "",
					"taxable": true,
					"product_has_only_default_variant": false,
					"gift_card": false,
					"final_price": 100,
					"final_line_price": 100,
					"url": "/products/rupa-shirts?variant=39538580717670",
					"featured_image": {
						"aspect_ratio": 1,
						"alt": "Cap",
						"height": 300,
						"url": cart_product_details[k].img,
						"width": 300
					},

					"image": cart_product_details[k].img,
					"handle": "rupa-shirts",
					"requires_shipping": true,
					"product_type": "",
					"product_title": "Cap",
					"product_description": "",
					"variant_title": "small",
					"variant_options": ["small"],
					"options_with_values": [{
						"name": "Size",
						"value": "small"
					}],
					"line_level_discount_allocations": [],
					"line_level_total_discount": 0
				};
				if (cart_product_details[k].get_weight != undefined && cart_product_details[k].get_weight != '') {
					box.weight = cart_product_details[k].get_weight;
				}
				if (cart_product_details[k].get_length != undefined && cart_product_details[k].get_length != '') {
					box.length = cart_product_details[k].get_length;
				}
				if (cart_product_details[k].get_width != undefined && cart_product_details[k].get_width != '') {
					box.breadth = cart_product_details[k].get_width;
				}
				if (cart_product_details[k].get_height != undefined && cart_product_details[k].get_height != '') {
					box.height = cart_product_details[k].get_height;
				}

				total_price = total_price + ((cart_product_details[k].price * 100) * cart_product_details[k].quantity);
				items.push(box);
			}
			var data = `{
									"order_details": {
									"token": "`+ token + `",
									"note": null,
									"attributes": {},
									"original_total_price": 100,
									"total_price": `+ total_price + `,
									"total_discount": 0,
									"total_weight": 0,
									"item_count": 1,
									"items": `+ JSON.stringify(items) + `,
									"requires_shipping": true,
									"currency": "INR",
									"items_subtotal_price": 100
									},
									"domain": "`+ domain_name + `"
								}`;
			return data;
		}
		function call_fasterr_popup() {
			let pickrrIframe = document.createElement('iframe');
			pickrrIframe.id = 'pickrr-iframe';
			pickrrIframe.frameBorder = '0';
			if (window.innerWidth > 576) {
				pickrrIframe.style.height = 'calc(90vh - 50px)';
			} else {
				pickrrIframe.style.height = 'calc(calc(var(--vh, 1vh) * 100) - 36px)';
			}
			if (window.innerWidth > 576) {
				pickrrIframe.style.width = '90vw';
			} else {
				pickrrIframe.style.width = '100vw';
			}
			pickrrIframe.style.margin = '0';
			if (window.innerWidth > 576) {
				pickrrIframe.style.borderRadius = '0px 0px 10px 10px';
			} else {
				pickrrIframe.style.borderRadius = '0px';
			}
			pickrrIframe.style.backgroundColor = '#fff';
			document.getElementById('pickrr-div').appendChild(pickrrIframe);
		}
	</script>
	<script type="text/javascript" charset="UTF-8">
		jQuery(function ($) {
			$('#fastrr-checkout-btn-2').on('submit', function (e) {
				e.preventDefault();
				var form = $(this);
				form.block({ message: null, overlayCSS: { background: '#fff', opacity: 0.6 } });
				var formData = new FormData(form[0]);
				formData.append('add-to-cart', form.find('[name=add-to-cart]').val());
				// Ajax action.
				$.ajax({
					url: wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'ace_add_to_cart'),
					data: formData,
					type: 'POST',
					processData: false,
					contentType: false,
					complete: function (response) {
						response = response.responseJSON;

						if (!response) {
							return;
						}

						if (response.error && response.product_url) {
							window.location = response.product_url;
							return;
						}

						// Redirect to cart option
						if (wc_add_to_cart_params.cart_redirect_after_add === 'yes') {
							window.location = wc_add_to_cart_params.cart_url;
							return;
						}

						var $thisbutton = form.find('.single_add_to_cart_button'); //
						var $thisbutton = null; // uncomment this if you don't want the 'View cart' button

						// Trigger event so themes can refresh other areas.
						$(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $thisbutton]);

						// Remove existing notices
						$('.woocommerce-error, .woocommerce-message, .woocommerce-info').remove();

						// Add new notices
						form.unblock();
					}
				});
			});
		});
	</script>
	<?php
}

function custom_ajax_function()
{
	check_ajax_referer('custom_nonce', 'security');

	// Your PHP logic here
	// include_once(plugin_dir_path(__FILE__) . 'path/to/your-plugin-file.php');
	function trigger_news_order($check_data_present, $data, $checkout_address)
	{
		global $woocommerce;

		$checkout_address['first_name'] = $checkout_address['firstName'];
		$checkout_address['last_name'] = $checkout_address['lastName'];
		$checkout_address['address_1'] = $checkout_address['line1'];
		$checkout_address['address_2'] = $checkout_address['line2'];
		$checkout_address['postcode'] = $checkout_address['pincode'];
		$from_product_id = $data;
		$order = wc_create_order($from_product_id);

		$order->set_address($checkout_address, 'billing');
		$order->set_address($checkout_address, 'shipping'); // The Shipping address

		$product = wc_get_product($from_product_id);

		$order->add_product($product);
		$order->set_payment_method('cod');
		// $order->

		$order->calculate_totals();
		$order->add_order_note("Testing COD");
		$order->update_status('processing', 'Imported order', true);
		// }


		// Display a message with the order number
		return true;
	}

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		global $woocommerce;
		// $woocommerce.ger
		$check_data_present = $_POST['check_data_present'];
		$item_i = $_POST['item_i'];
		$address = $_POST['address'];
		trigger_news_order(true, $item_i, $address);
		//  $order = wc_create_order([1554]);
		//  Process the data and call your function
		//  echo json_encode($_SERVER);
		echo $address;
	} else {
		echo 'NOt Valid';

	}
}

add_action('wp_ajax_custom_action', 'custom_ajax_function');
add_action('wp_ajax_nopriv_custom_action', 'custom_ajax_function');

function single_order_button()
{
	function trigger_new_order($from_product_id)
	{
		$address = array(
			'first_name' => "Joe",
			'last_name' => "Doe",
			'email' => "john.doe@gmail.com",
			'phone' => "0123456789",
			'address_1' => "1 St. James Street",
			'address_2' => "",
			'city' => "San Francisco",
			'state' => "California",
			'postcode' => "92105",
			'country' => "US",
		);

		$order = wc_create_order($from_product_id);

		$order->set_address($address, 'billing');
		$order->set_address($address, 'shipping'); // The Shipping address

		$product = wc_get_product($from_product_id);

		$order->add_product($product);
		$order->set_payment_method('cod');
		// $order->

		$order->calculate_totals();
		$order->add_order_note("Testing COD");
		$order->update_status('processing', 'Imported order', true);

		// Display a message with the order number
		echo '<p>' . sprintf(__("Order #%d has been created"), $order->get_id()) . '</p>';
	}
	if (isset($_POST['new-order']) && $_POST['new-order'] === 'Submit') {
		trigger_new_order(get_the_id());
	} else {
		?>
		<form class="new" method="post">
			<input class="button alt" type="submit" id="button" name="new-order" value="Submit">
		</form>
		<?php
	}
}

function test_listner()
{
	$cod_trigger = false;
	global $cod_trigger;


	?>
	<script type="text/javascript">

		function CheckoutMessageListener(event) {
			let data = event.data;
			switch (data.trigger) {
				case "create-cod-order":
					SendEventToPlugin(data);
					break;
				case "order-view":
      				viewOrder(data?.data);
        			break;
			}
		};
		function SendEventToPlugin(data) {
			const check_data_present = data.data.item_id ? true : false;
			const item_i = data.data.item_id;
			let address = data.data.address;
			jQuery.ajax({
				url: '<?php echo admin_url('admin-ajax.php'); ?>',

				data: {
					action: 'custom_action',
					security: '<?php echo wp_create_nonce('custom_nonce'); ?>',
					check_data_present: check_data_present,
					item_i: item_i,
					address: address
				},
				type: 'POST',
				success: function (response) {
					// Handle the response from the server
					console.log(response);
				},
				error: function (error) {
					console.error('Error in AJAX request:', error);
				}
			});
		}
function viewOrder(data){
	jQuery.ajax({
						url: '<?php echo admin_url('admin-ajax.php'); ?>',
						
            data: {
								action: 'load_user_to_platform',
								security:'<?php echo wp_create_nonce('custom_nonce'); ?>',
                user_id:data.channelCustomerId
            },
            type: 'POST',
            success: function(response) {
                // Handle the response from the server
                console.log(response);
            },
            error: function(error) {
                console.error('Error in AJAX request:', error);
            }
        });
}
		window.addEventListener('load', function () {
			window.addEventListener("message", CheckoutMessageListener, false);
		})
	</script>
	<?php

}
function load_user_to_platform() {
	check_ajax_referer('custom_nonce', 'security');
 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
		
    
    // Check if default variation is found
    wp_set_current_user($user_id);
		wp_set_auth_cookie($user_id);
		 wp_send_json_success();

 }else{
				 echo 'NOt Valid';
 
		 }
}
add_action('wp_ajax_load_user_to_platform', 'load_user_to_platform');
add_action('wp_ajax_nopriv_load_user_to_platform', 'load_user_to_platform');
add_action('wp_footer', 'ace_product_page_ajax_add_to_cart_js');
// add_action( 'wp_footer', 'single_order_button' );
add_action('wp_footer', 'test_listner');


add_action('woocommerce_order_status_changed', 'send_email_on_order_status_change', 10, 4);

function send_email_on_order_status_change($order_id, $old_status, $new_status, $order) {
    // Check if the old status is "checkout-draft" and the new status is "processing"
    if ($old_status === 'checkout-draft' && $new_status === 'processing') {
        // Get the user's email address
        $user_email = $order->get_billing_email();

        // Prepare email subject and message
        $subject = 'Your order status has changed';
        $message = 'Your order status has changed from checkout-draft to processing';
		 $mailer = WC()->mailer();
    	$email_template = $mailer->emails['WC_Email_Customer_Processing_Order'];
        
		 $email_template->trigger($order_id);
    }
}
function bbloomer_populate_checkout( $fields ) {
	$queryParams = $_GET;
	global $woocommerce;
$mappedFields_new = array(
	'email' => 'billing_email',
	'first_name' => 'billing_first_name',
	'last_name' => 'billing_last_name',
	'address1' => 'billing_address_1',
	'address2' => 'billing_address_2',
	'city' => 'billing_city',
	'province' => 'billing_state',
	'country' => 'billing_country',
	'zip' => 'billing_postcode',
	'phone' => 'billing_phone',
);

	foreach ($queryParams as $queryParam => $woocommerceField) {
		foreach ($woocommerceField as $fiel => $fie) {
			if(gettype($fie)=="array"){
				foreach ($fie as $shipping_key => $shipping_val) {
					$fields['billing'][$mappedFields_new[$shipping_key]]['default'] = $shipping_val;
				}
			}
			if(gettype($fie)=="string"){
				$fields['billing'][$mappedFields_new[$fiel]]['default'] = $fie;
			}
		}
	}
	return $fields;
}
add_filter( 'woocommerce_checkout_fields' , 'bbloomer_populate_checkout', 1234 );
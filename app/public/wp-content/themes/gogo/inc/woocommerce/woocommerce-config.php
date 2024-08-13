<?php
/**
 * Perform all main WooCommerce configurations for this theme
 *
 * @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
// If plugin - 'WooCommerce' not exist then return.
if ( ! class_exists( 'WooCommerce' ) ) {
	return;
}
/**
 * Gogo WooCommerce Compatibility
 */
if ( ! class_exists( 'Gogo_Woocommerce' ) ) :
	/**
	 * Gogo_Woocommerce Compatibility
	 *
	 * @since 1.0.0
	 */
	class Gogo_Woocommerce {

        /**
		 * Member Variable
		 *
		 * @var object instance
		 */
		private static $instance;

		/**
		 * Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}
        /**
		 * Constructor
		 */
		public function __construct(){
			get_template_part( 'inc/woocommerce/woocommerce-common-function');
			add_filter( 'gogo_theme_defaults', array( $this, 'theme_defaults' ) );
			add_action( 'after_setup_theme', array( $this, 'setup_theme' ) );
			// Register Store Sidebars.
			add_action( 'widgets_init', array( $this, 'gogo_store_widgets_init' ), 15 );
			// Replace Store Sidebars.
			add_filter( 'gogo_get_sidebar', array( $this, 'gogo_replace_store_sidebar' ) );
			add_action( 'woocommerce_before_shop_loop_item_title', array( $this, 'product_flip_image' ), 10 );
			add_filter( 'post_class', array( $this, 'gogo_product_class' ) );
			add_action( 'wp', array( $this, 'woocommerce_init' ), 1 );
			add_action( 'wp', array( $this, 'shop_customization' ), 5 );
			add_action( 'wp', array( $this, 'single_product_customization' ) );
			add_filter( 'woocommerce_sale_flash', 'gogo_sale_badge_style',9 );
			add_filter( 'get_product_search_form' , 'gogo_custom_product_searchform' );
			add_action( 'gogo_cart','gogo_menu_woo_cart_product');
			add_action( 'gogo_cart_count','gogo_menu_cart_view');
			
		 }
         /**
		 * Theme Defaults.
		 *
		 * @param array $defaults Array of options value.
		 * @return array
		 */
		function theme_defaults( $defaults ){
			$defaults['gogo-product-structure'] = array(
				'category',
				'title',
				'ratings',
				'price',
				'add_cart',
			);
			$defaults['gogo-woo-single-product-structure'] = array(
				'title',
				'ratings',
				'price',
				'short_desc',
				'add_cart',
				'meta',
			);

			return $defaults;
		}
		/**
		 * Setup theme
		 *
		 * @since 1.0.3
		 */
		function setup_theme(){
			// WooCommerce.
			add_theme_support( 'wc-product-gallery-zoom' );
			add_theme_support( 'wc-product-gallery-lightbox' );
			add_theme_support( 'wc-product-gallery-slider' );
		}
       /**
		 * Store widgets init.
		 */
		function gogo_store_widgets_init() {
			register_sidebar(array(
		              'name'          => esc_html__( 'WooCommerce Sidebar', 'gogo' ),
		              'id'            => 'gogo-woo-shop-sidebar',
		              'description'   => esc_html__( 'Add widgets here to appear in your WooCommerce Sidebar.', 'gogo' ),
		              'before_widget' => '<section id="%1$s" class="widget %2$s"><div class="gogo-widget-content">',
		              'after_widget'  => '</div></section>',
		              'before_title'  => '<h4 class="widget-title">',
		              'after_title'   => '</h4>',
	        ) );
			register_sidebar(array(
		              'name'          => esc_html__( 'Product Sidebar', 'gogo' ),
		              'id'            => 'gogo-woo-product-sidebar',
		              'description'   => esc_html__( 'This sidebar will be used on Single Product page.', 'gogo' ),
		              'before_widget' => '<section id="%1$s" class="widget %2$s"><div class="gogo-widget-content">',
		              'after_widget'  => '</div></section>',
		              'before_title'  => '<h4 class="widget-title">',
		              'after_title'   => '</h4>',
	        ) );
		}
		/**
		 * Assign shop sidebar for store page.
		 *
		 * @param String $sidebar Sidebar.
		 *
		 * @return String $sidebar Sidebar.
		 */
		function gogo_replace_store_sidebar( $sidebar ) {

			if ( is_shop() || is_product_taxonomy() || is_checkout() || is_cart() || is_account_page() ) {
				$sidebar = 'gogo-woo-shop-sidebar';
			} elseif ( is_product() ) {
				$sidebar = 'gogo-woo-product-sidebar';
			}

			return $sidebar;
		}
		/**
		 * Product Flip Image
		 */
		function product_flip_image() {

			global $product;

			$hover_style = get_theme_mod( 'gogo_woo_product_animation' );

			if ( 'swap' === $hover_style ) {

				$attachment_ids = $product->get_gallery_image_ids();

				if ( $attachment_ids ) {

					$image_size = apply_filters( 'single_product_archive_thumbnail_size', 'shop_catalog' );

					echo apply_filters( 'gogo_woocommerce_product_flip_image', wp_get_attachment_image( reset( $attachment_ids ), $image_size, false, array( 'class' => 'show-on-hover' ) ) );
				}
			}
		}
		/**
		 * Add class on single product page
		 *
		 * @param Array $classes product classes.
		 *
		 * @return array.
		 */
		function gogo_product_class( $classes ){
			if ( is_shop() || is_product_taxonomy() || post_type_exists( 'product' ) ) {
				$hover_style = get_theme_mod( 'gogo_woo_product_animation' );
				if ( '' !== $hover_style ){
					$classes[] = 'gogo-woo-hover-'.esc_attr($hover_style);
				}
				$align_style = get_theme_mod( 'gogo_product_content_alignment','' );

				if ( '' !== $align_style ) {
					$classes[] = 'gogo-woo-alignment-'.esc_attr($align_style);
				}
                $shadow_style = get_theme_mod( 'gogo_shop_product_box_shadow' );

				if ( '' !== $shadow_style ) {
					$classes[] = 'gogo-shadow-'.esc_attr($shadow_style);
				}
                $shadow_hvr_style = get_theme_mod( 'gogo_shop_product_box_shadow_on_hover' );

				if ( '' !== $shadow_hvr_style ) {
					$classes[] = 'gogo-shadow-hover-'.esc_attr($shadow_hvr_style);
				}

				$single_product_style = get_theme_mod( 'gogo_single_product_alignment','left');

				if ( '' !== $single_product_style ){
					$classes[] = 'gogo-single-product-content-'.esc_attr($single_product_style);
				}

				$single_product_tab_style = get_theme_mod( 'gogo_single_product_tab_layout','' );

				if ( '' !== $single_product_style ) {
					$classes[] = 'gogo-single-product-tab-'.esc_attr($single_product_tab_style);
				}

			}
			return $classes;
		}
		/**
		 * Shop customization.
		 *
		 * @return void
		 */
		function shop_customization() {
				add_action( 'woocommerce_before_shop_loop_item', 'gogo_woo_shop_thumbnail_wrap_start', 6 );
                add_action( 'woocommerce_before_shop_loop_item', 'woocommerce_show_product_loop_sale_flash', 9 );
				add_action( 'woocommerce_after_shop_loop_item', 'gogo_woo_shop_thumbnail_wrap_end', 8 );
				remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
				/**
				 * Shop Page Product Content Sorting
				 */
				add_action( 'woocommerce_after_shop_loop_item', 'gogo_woo_woocommerce_shop_product_content' );
		
		}

/****************/
// Single Product
/****************/		
         /**
		 * Single Product customization.
		 *
		 * @return void
		 */
		function single_product_customization(){
			if ( ! is_product() ) {
				return;
			}
			// Remove Default actions.
			remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
			remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );
			remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
			remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
			remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
			remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
			remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );
            
			/**
			* Single Product Content Sorting
			*/
			add_action( 'woocommerce_single_product_summary', array( $this, 'gogo_woo_single_product_content_structure' ), 10 );
			add_filter( 'woocommerce_output_related_products_args', array( $this, 'related_no_col_product_show' ) );
			if(get_theme_mod( 'gogo_upsell_product_display','' )==true){
			  add_action( 'woocommerce_after_single_product_summary',array( $this, 'gogo_woocommerce_output_upsells' ));
             }else{
             remove_action( 'woocommerce_after_single_product_summary',array( $this, 'gogo_woocommerce_output_upsells' ));	
             }
			/**
			* Display Tab
			*/
			if ( ! get_theme_mod( 'gogo_single_product_tab_display',true ) ){
				remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
			}
			/* Display Related Products */
			if ( ! get_theme_mod( 'gogo_related_product_display',true ) ) {
				remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
			}
			/* Display upsell Products */
			if ( ! get_theme_mod( 'gogo_upsell_product_display',true ) ) {
				remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 20 );
			}

		
		}
        function gogo_woo_single_product_content_structure( $product_type = '' ){
	    $single_structure = apply_filters( 'gogo_woo_single_product_structure',gogo_get_option( 'gogo-woo-single-product-structure' ), $product_type );

			if ( is_array( $single_structure ) && ! empty( $single_structure ) ) {

				foreach ( $single_structure as $value ) {

					switch ( $value ) {
						case 'title':
							/**
							 * Add Product Title on single product page for all products.
							 */
							do_action( 'gogo_woo_single_title_before' );
							woocommerce_template_single_title();
							do_action( 'gogo_woo_single_title_after' );
							break;
						case 'price':
							/**
							 * Add Product Price on single product page for all products.
							 */
							do_action( 'gogo_woo_single_price_before' );
							woocommerce_template_single_price();
							do_action( 'gogo_woo_single_price_after' );
							break;
						case 'ratings':
							/**
							 * Add rating on single product page for all products.
							 */
							do_action( 'gogo_woo_single_rating_before' );
							woocommerce_template_single_rating();
							do_action( 'gogo_woo_single_rating_after' );
							break;
						case 'short_desc':
							do_action( 'gogo_woo_single_short_description_before' );
							woocommerce_template_single_excerpt();
							do_action( 'gogo_woo_single_short_description_after' );
							break;
						case 'add_cart':
							do_action( 'gogo_woo_single_add_to_cart_before' );
							woocommerce_template_single_add_to_cart();
							do_action( 'gogo_woo_single_add_to_cart_after' );
							break;
						case 'meta':
							do_action( 'gogo_woo_single_category_before' );
							woocommerce_template_single_meta();
							do_action( 'gogo_woo_single_category_after' );
							break;
						default:
							break;
					}
				}
			}
		}
		// realted product argument pass
        function related_no_col_product_show( $args){
		$rel_columns = get_theme_mod('gogo_related_num_col_shw','3');
		$rel_no_product = get_theme_mod( 'gogo_related_num_product_shw','3');
		$args['posts_per_page'] = $rel_no_product; // related products
	    $args['columns'] = $rel_columns; // arranged in columns
	    return $args;
		}
        // upsale product
       
		function gogo_woocommerce_output_upsells(){
		$upsell_columns = get_theme_mod('gogo_upsale_num_col_shw','3');
		$upsell_no_product = get_theme_mod( 'gogo_upsale_num_product_shw','3');	
        woocommerce_upsell_display($upsell_no_product,$upsell_columns); // Display max 3 products, 3 per row
         }
        
         /**
		 * Remove Woo-Commerce Default actions
		 */
		function woocommerce_init() {
			remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
			remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
			remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );
			remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );
			remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );
			remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
			remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
		}


	}
endif;
if ( apply_filters( 'gogo_enable_woocommerce_integration', true ) ) {
	Gogo_Woocommerce::get_instance();
}
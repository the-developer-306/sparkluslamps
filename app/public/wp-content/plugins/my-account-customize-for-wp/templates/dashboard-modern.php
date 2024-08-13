<?php 
if ( ! is_user_logged_in() ) {
    return;
}

if ( ! defined( 'ABSPATH' ) ) exit;

global $wp;
$current_url = home_url( add_query_arg( array(), $wp->request ) );
?>
<div class="cits-dashbord-area">
 	 <div class="dashboard-dark-design dashboard-modern-design"> 
 	 	<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/orders' ); ?>"><span>
 	 		<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/cart-plus.svg' ); ?>" alt="Image">
 	 		<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/cart-white.svg' ); ?>" alt="Image">
 	 	</span><span>Orders</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/downloads' ); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/download.svg' ); ?>" alt="Image">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/download-white.svg' ); ?>" alt="Image">
		</span><span>Downloads</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/edit-address' ); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/location-dot.svg' ); ?>" alt="Image">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/location-dot-white.svg' ); ?>" alt="Image">
		<span>Addresses</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/edit-account' ); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/user.svg' ); ?>" alt="Image">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/user-white.svg' ); ?>" alt="Image">
		</span><span>Account details</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( wp_logout_url( home_url() )); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/arrow-right-back.svg' ); ?>" alt="Image">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/arrow-right-back-white.svg' ); ?>" alt="Image">
		</span><span>Log Out</span></a></div>
	</div>
</div>

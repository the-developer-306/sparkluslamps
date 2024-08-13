<?php 
if ( ! is_user_logged_in() ) {
    return;
}

if ( ! defined( 'ABSPATH' ) ) exit;

global $wp;
$current_url = home_url( add_query_arg( array(), $wp->request ) );

$current_user = wp_get_current_user(); 
?>
<div class="cits-dashbord-area dashbord-simple-area">
	
 	<div class="dashboard-dark-design"> 
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/orders' ); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/cart-plus.svg' ); ?>" alt="orders">
 	 		<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/cart-white.svg' ); ?>" alt="orders">
		</span><span>Orders</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/downloads' ); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/download.svg' ); ?>" alt="downloads">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/download-white.svg' ); ?>" alt="downloads">
		</span><span>Downloads</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/edit-address' ); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/location-dot.svg' ); ?>" alt="address">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/location-dot-white.svg' ); ?>" alt="address">
		<span>Addresses</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( $current_url.'/edit-account' ); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/user.svg' ); ?>" alt="account">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/user-white.svg' ); ?>" alt="account">
		</span><span>Account details</span></a></div>
		<div><a class="cits-dashbord-single-item" href="<?php echo esc_url( wp_logout_url( home_url() )); ?>"><span>
			<img class="dark-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/arrow-right-back.svg' ); ?>" alt="logout">
			<img class="white-image" src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'public/images/arrow-right-back-white.svg' ); ?>" alt="logout">
		</span><span>Log Out</span></a></div>
	</div>
</div>

<?php
if ( ! class_exists( 'TrackingMore_Dependencies' ) )
	require_once 'class-trackingmore-dependencies.php';

if ( ! function_exists( 'is_woocommerce_active' ) ) {
	function is_woocommerce_active() {
		return TrackingMore_Dependencies::woocommerce_active_check();
	}
}

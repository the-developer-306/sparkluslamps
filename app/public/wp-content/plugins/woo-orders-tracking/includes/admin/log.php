<?php

/**
 * Class VI_WOO_ORDERS_TRACKING_ADMIN_LOG
 *
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VI_WOO_ORDERS_TRACKING_ADMIN_LOG {
	public static function log( $logs_content, $type = 'import_tracking' ) {
		self::wc_log($logs_content,$type ?: 'debug');
	}
	public static function wc_log( $content, $source = 'debug', $level = 'info' ) {
		$content =  $source !== 'shipstation-debug' ? wp_strip_all_tags( $content ) : $content;
		$log     = wc_get_logger();
		$log->log( $level,
			$content,
			array(
				'source' => 'woo-orders-tracking-' . $source,
			)
		);
	}
}

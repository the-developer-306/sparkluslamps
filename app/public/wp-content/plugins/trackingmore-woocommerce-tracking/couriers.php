<?php
$couriers = json_decode( file_get_contents( $GLOBALS['trackingmore']->pluginDir . "/assets/js/couriers.json" ), true );
wp_localize_script( 'trackingmore_script_couriers', 'data', $couriers );
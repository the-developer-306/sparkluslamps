<?php

/**
* Database Config
*
* Inserted by Local
*/
define( 'DB_NAME', 'local' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', 'root' );
define( 'DB_HOST', 'localhost' );


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

/**
 * Database connection information is automatically provided.
 * There is no need to set or change the following database configuration
 * values:
 *   DB_HOST
 *   DB_NAME
 *   DB_USER
 *   DB_PASSWORD
 *   DB_CHARSET
 *   DB_COLLATE
 */

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */

define('AUTH_KEY',         '|kNN$t>ufn_;ulS@Hk]bg0{ikKL#U2@ZQ!|E>FEOnr;-kw]6n%T>Z*XHyb|,][ke');
define('SECURE_AUTH_KEY',  'cW%m8o7C)sxHmD!Oq(drLV=56BN?rVDZdf^rvbC>C+m6SIf7)miXxm8c$L{W2aSK');
define('LOGGED_IN_KEY',    '=q6UX}pJP-e.JGp*A06]O{Ka!*0BG5a{?ZFmz=@0H#|ERerv0E|1m5sudQUp%nnH');
define('NONCE_KEY',        ':Phu:_b_wZB=^sq;U-)D(h1HW~Zduhm!+cfHI3nnQ)X3n.t93Y~{;_(<?0j{6x5z');
define('AUTH_SALT',        '+i99ntI{Bg1dpS5|ug{qWg8]itdJTRSmSK4:Hw:=45]JZWY8#:6]z[(xSzrvB?>l');
define('SECURE_AUTH_SALT', 'LP2iHY3U<>r->[HV2X+ddj,)0XOtmg0b85j>rteDl62ag{F[MnPSNH[G$={ywP=%');
define('LOGGED_IN_SALT',   'AeBa[r#KQ?2fkyAjG4xnyGun%B=$6J[PF5=]VX^$#*lT,39D+NMCbhe,w>thw3Tp');
define('NONCE_SALT',       '2Hfs-XID=loSX>7!)c#HHXP!0HIT6cbTm3?t{vGITQX=ExJycX3Ocq*#VyYS8PwZ');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
if ( ! defined( 'WP_DEBUG') ) {
	// define('WP_DEBUG', false);
  define('WP_DEBUG', true);
}
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);


define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

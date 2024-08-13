<?php
if (!defined('SHOPCITY_VERSION')) {
    // Replace the version number of the theme on each release.
    define('SHOPCITY_VERSION', wp_get_theme()->get('Version'));
}
define('SHOPCITY_DEBUG', defined('WP_DEBUG') && WP_DEBUG === true);
define('SHOPCITY_DIR', trailingslashit(get_template_directory()));
define('SHOPCITY_URL', trailingslashit(get_template_directory_uri()));

if (!function_exists('shopcity_support')) :

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * @since walker_fse 1.0.0
     *
     * @return void
     */
    function shopcity_support()
    {
        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');
        // Add support for block styles.
        add_theme_support('wp-block-styles');
        add_theme_support('post-thumbnails');
        // Enqueue editor styles.
        add_editor_style('style.css');
    }

endif;
add_action('after_setup_theme', 'shopcity_support');

/*----------------------------------------------------------------------------------
Enqueue Styles
-----------------------------------------------------------------------------------*/
if (!function_exists('shopcity_styles')) :
    function shopcity_styles()
    {
        // registering style for theme
        wp_enqueue_style('shopcity-style', get_stylesheet_uri(), array(), SHOPCITY_VERSION);
        if (is_rtl()) {
            wp_enqueue_style('shopcity-rtl-css', get_template_directory_uri() . '/assets/css/rtl.css', 'rtl_css');
        }
        // registering js for theme
        wp_enqueue_script('jquery');
    }
endif;

add_action('wp_enqueue_scripts', 'shopcity_styles');

/**
 * Enqueue scripts for admin area
 */
function shopcity_admin_style()
{
    if (!is_user_logged_in()) {
        return;
    }
    $hello_notice_current_screen = get_current_screen();
    if (!empty($_GET['page']) && 'about-shopcity' === $_GET['page'] || $hello_notice_current_screen->id === 'themes' || $hello_notice_current_screen->id === 'dashboard') {
        wp_enqueue_style('shopcity-admin-style', get_template_directory_uri() . '/assets/css/admin-style.css', array(), SHOPCITY_VERSION, 'all');
        wp_enqueue_script('shopcity-admin-scripts', get_template_directory_uri() . '/assets/js/shopcity-admin-scripts.js', array(), SHOPCITY_VERSION, true);
        wp_localize_script('shopcity-admin-scripts', 'shopcity_localize', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('shopcity_nonce'),
            'redirect_url' => admin_url('themes.php?page=templategalaxy')
        ));
    }
}
add_action('admin_enqueue_scripts', 'shopcity_admin_style');

/**
 * Enqueue assets scripts for both backend and frontend
 */
function shopcity_block_assets()
{
    wp_enqueue_style('shopcity-blocks-style', get_template_directory_uri() . '/assets/css/blocks.css');
}
add_action('enqueue_block_assets', 'shopcity_block_assets');

/**
 * Load core file.
 */
require_once get_template_directory() . '/inc/core/init.php';

/**
 * Load welcome page file.
 */
require_once get_template_directory() . '/inc/admin/welcome-notice.php';

if (!function_exists('shopcity_excerpt_more_postfix')) {
    function shopcity_excerpt_more_postfix($more)
    {
        if (is_admin()) {
            return $more;
        }
        return '...';
    }
    add_filter('excerpt_more', 'shopcity_excerpt_more_postfix');
}
function shopcity_add_woocommerce_support()
{
    add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'shopcity_add_woocommerce_support');

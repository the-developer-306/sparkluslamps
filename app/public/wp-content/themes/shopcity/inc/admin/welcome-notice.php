<?php

/**
 * file for holding dashboard welcome page for theme
 */
if (!function_exists('shopcity_welcome_notice')) :
    function shopcity_welcome_notice()
    {
        if (get_option('shopcity_dashboard_dismissed_notice')) {
            return;
        }
        global $pagenow;
        $current_screen  = get_current_screen();

        if (is_admin()) {
            if ($current_screen->id !== 'dashboard' && $current_screen->id !== 'themes') {
                return;
            }
            if (is_network_admin()) {
                return;
            }
            if (!current_user_can('manage_options')) {
                return;
            }


?>
            <div class="shopcity-admin-notice notice notice-info is-dismissible content-install-plugin theme-info-notice" id="shopcity-dismiss-notice">
                <div class="info-content">
                    <h3><span class="theme-name"><span><?php echo __('Thank you for using Shopcity. In order to complete the task correctly, kindly install and activate the recommended plugin.', 'shopcity'); ?></span></h3>
                    <p class="notice-text"><?php echo __('TemplateGalaxy: Please install and activate TemplateGalaxy pluign from our website to use additional patterns, templates  and import demo with "one click demo import" feature.', 'shopcity') ?></p>
                    <p class="notice-text"><?php echo __('Advanced Import: This is required only for the one-click demo import features and can be deleted once the demo is imported.', 'shopcity') ?></p>
                    <a href="#" id="install-activate-button" class="button admin-button info-button"><?php echo __('Getting started with a single click', 'shopcity'); ?></a>
                    <a href="<?php echo admin_url(); ?>themes.php?page=about-shopcity" class="button admin-button info-button"><?php echo __('Explore Shopcity', 'shopcity'); ?></a>
                </div>


            </div>
    <?php
        }
    }
endif;
add_action('admin_notices', 'shopcity_welcome_notice');
function shopcity_dashboard_dismissble_notice()
{
    check_ajax_referer('shopcity_nonce', 'nonce');
    update_option('shopcity_dashboard_dismissed_notice', 1);
}
add_action('wp_ajax_shopcity_dashboard_dismissble_notice', 'shopcity_dashboard_dismissble_notice');
add_action('wp_ajax_shopcity_dismissble_notice', 'shopcity_dismissble_notice');
// Hook into a custom action when the button is clicked
add_action('wp_ajax_shopcity_install_and_activate_plugins', 'shopcity_install_and_activate_plugins');
add_action('wp_ajax_nopriv_shopcity_install_and_activate_plugins', 'shopcity_install_and_activate_plugins');
add_action('wp_ajax_shopcity_rplugin_activation', 'shopcity_rplugin_activation');
add_action('wp_ajax_nopriv_shopcity_rplugin_activation', 'shopcity_rplugin_activation');

// Function to install and activate the plugins



function shopcity_check_plugin_installed_status($pugin_slug, $plugin_file)
{
    return file_exists(ABSPATH . 'wp-content/plugins/' . $pugin_slug . '/' . $plugin_file) ? true : false;
}

/* Check if plugin is activated */


function shopcity_check_plugin_active_status($pugin_slug, $plugin_file)
{
    return is_plugin_active($pugin_slug . '/' . $plugin_file) ? true : false;
}

require_once(ABSPATH . 'wp-admin/includes/plugin-install.php');
require_once(ABSPATH . 'wp-admin/includes/file.php');
require_once(ABSPATH . 'wp-admin/includes/misc.php');
require_once(ABSPATH . 'wp-admin/includes/class-wp-upgrader.php');
function shopcity_install_and_activate_plugins()
{
    check_ajax_referer('shopcity_nonce', 'nonce');
    // Define the plugins to be installed and activated
    $recommended_plugins = array(
        array(
            'slug' => 'templategalaxy',
            'file' => 'templategalaxy.php',
            'name' => __('TemplateGalaxy', 'shopcity')
        ),
        array(
            'slug' => 'advanced-import',
            'file' => 'advanced-import.php',
            'name' =>  __('Advanced Import', 'shopcity')
        )
        // Add more plugins here as needed
    );

    // Include the necessary WordPress functions


    // Set up a transient to store the installation progress
    set_transient('install_and_activate_progress', array(), MINUTE_IN_SECONDS * 10);

    // Loop through each plugin
    foreach ($recommended_plugins as $plugin) {
        $plugin_slug = $plugin['slug'];
        $plugin_file = $plugin['file'];
        $plugin_name = $plugin['name'];

        // Check if the plugin is active
        if (is_plugin_active($plugin_slug . '/' . $plugin_file)) {
            shopcity_update_install_and_activate_progress($plugin_name, 'Already Active');
            continue; // Skip to the next plugin
        }

        // Check if the plugin is installed but not active
        if (shopcity_is_plugin_installed($plugin_slug . '/' . $plugin_file)) {
            $activate = activate_plugin($plugin_slug . '/' . $plugin_file);
            if (is_wp_error($activate)) {
                shopcity_update_install_and_activate_progress($plugin_name, 'Error');
                continue; // Skip to the next plugin
            }
            shopcity_update_install_and_activate_progress($plugin_name, 'Activated');
            continue; // Skip to the next plugin
        }

        // Plugin is not installed or activated, proceed with installation
        shopcity_update_install_and_activate_progress($plugin_name, 'Installing');

        // Fetch plugin information
        $api = plugins_api('plugin_information', array(
            'slug' => $plugin_slug,
            'fields' => array('sections' => false),
        ));

        // Check if plugin information is fetched successfully
        if (is_wp_error($api)) {
            shopcity_update_install_and_activate_progress($plugin_name, 'Error');
            continue; // Skip to the next plugin
        }

        // Set up the plugin upgrader
        $upgrader = new Plugin_Upgrader();
        $install = $upgrader->install($api->download_link);

        // Check if installation is successful
        if ($install) {
            // Activate the plugin
            $activate = activate_plugin($plugin_slug . '/' . $plugin_file);

            // Check if activation is successful
            if (is_wp_error($activate)) {
                shopcity_update_install_and_activate_progress($plugin_name, 'Error');
                continue; // Skip to the next plugin
            }
            shopcity_update_install_and_activate_progress($plugin_name, 'Activated');
        } else {
            shopcity_update_install_and_activate_progress($plugin_name, 'Error');
        }
    }

    // Delete the progress transient
    $redirect_url = admin_url('themes.php?page=advanced-import');

    // Delete the progress transient
    delete_transient('install_and_activate_progress');
    // Return JSON response
    wp_send_json_success(array('redirect_url' => $redirect_url));
}

// Function to check if a plugin is installed but not active
function shopcity_is_plugin_installed($plugin_slug)
{
    $plugins = get_plugins();
    return isset($plugins[$plugin_slug]);
}

// Function to update the installation and activation progress
function shopcity_update_install_and_activate_progress($plugin_name, $status)
{
    $progress = get_transient('install_and_activate_progress');
    $progress[] = array(
        'plugin' => $plugin_name,
        'status' => $status,
    );
    set_transient('install_and_activate_progress', $progress, MINUTE_IN_SECONDS * 10);
}

function shopcity_dashboard_menu()
{
    add_theme_page(esc_html__('About shopcity', 'shopcity'), esc_html__('About shopcity', 'shopcity'), 'edit_theme_options', 'about-shopcity', 'shopcity_theme_info_display');
}
add_action('admin_menu', 'shopcity_dashboard_menu');
function shopcity_theme_info_display()
{ ?>
    <div class="dashboard-about-shopcity">
        <h1> <?php echo __('Welcome to Shopcity- Full Site Editing WordPress Theme', 'shopcity') ?></h1>
        <p><?php echo __('Shopcity is a powerful and versatile WooCommerce theme designed to elevate your online store with ease. Featuring Full Site Editing, it offers 6 free and 3 premium pre-built demos that can be imported with one click, along with over 20 ready-to-use sections for a highly customizable experience. Lightweight, responsive, and SEO-friendly, Shopcity ensures fast loading times and a polished, professional look on any device. Perfect for any eCommerce or online store, its drag-and-drop interface simplifies the creation of unique, engaging layouts. Transform your eCommerce site with Shopcity\'s sleek design and unmatched functionality. Explore more about shopcity at https://websiteinwp.com/shopcity-ecommerce-wordpress-theme-for-store/', 'shopcity') ?></p>
        <h3><span class="theme-name"><span><?php echo __('Recommended Plugins:', 'shopcity'); ?></span></h3>
        <p class="notice-text"><?php echo __('TemplateGalaxy: Please install and activate TemplateGalaxy pluign from our website to use additional patterns, templates  and import demo with "one click demo import" feature.', 'shopcity') ?></p>
        <p class="notice-text"><?php echo __('Advanced Import: This is required only for the one-click demo import features and can be deleted once the demo is imported.', 'shopcity') ?></p>
        <a href="#" id="install-activate-button" class="installing-all-pluign button admin-button info-button"><?php echo __('Getting started with a single click', 'shopcity'); ?></a>
        <h3 class="shopcity-baisc-guideline-header"><?php echo __('Basic Theme Setup', 'shopcity') ?></h3>
        <div class="shopcity-baisc-guideline">
            <div class="featured-box">
                <ul>
                    <li><strong><?php echo __('Setup Header Layout:', 'shopcity') ?></strong>
                        <ul>
                            <li> - <?php echo __('Go to Appearance -> Editor -> Patterns -> Template Parts -> Header:', 'shopcity') ?></li>
                            <li> - <?php echo __('click on Header > Click on Edit (Icon) -> Add or Remove Requirend block/content as your requirement.:', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on save to update your layout', 'shopcity') ?></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="featured-box">
                <ul>
                    <li><strong><?php echo __('Setup Footer Layout:', 'shopcity') ?></strong>
                        <ul>
                            <li> - <?php echo __('Go to Appearance -> Editor -> Patterns -> Template Parts -> Footer:', 'shopcity') ?></li>
                            <li> - <?php echo __('click on Footer > Click on Edit (Icon) > Add or Remove Requirend block/content as your requirement.:', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on save to update your layout', 'shopcity') ?></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="featured-box">
                <ul>
                    <li><strong><?php echo __('Setup Templates like Homepage/404/Search/Page/Single and more templates Layout:', 'shopcity') ?></strong>
                        <ul>
                            <li> - <?php echo __('Go to Appearance -> Editor -> Templates:', 'shopcity') ?></li>
                            <li> - <?php echo __('click on Template(You need to edit/update) > Click on Edit (Icon) > Add or Remove Requirend block/content as your requirement.:', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on save to update your layout', 'shopcity') ?></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="featured-box">
                <ul>
                    <li><strong><?php echo __('Restore/Reset Default Content layout of Template(Like: Frontpage/Blog/Archive etc.)', 'shopcity') ?></strong>
                        <ul>
                            <li> - <?php echo __('Go to Appearance -> Editor -> Templates:', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on Manage all Templates', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on 3 Dots icon at right side of respective Template', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on Clear Customization', 'shopcity') ?></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="featured-box">
                <ul>
                    <li><strong><?php echo __('Restore/Reset Default Content layout of Template Parts(Header/Footer/Sidebar)', 'shopcity') ?></strong>
                        <ul>
                            <li> - <?php echo __('Go to Appearance -> Editor -> Patterns:', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on Manage All Template Parts', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on 3 Dots icon at right side of respective Template parts', 'shopcity') ?></li>
                            <li> - <?php echo __('Click on Clear Customization', 'shopcity') ?></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div class="featured-list">
            <div class="half-col free-features">
                <h3><?php echo __('shopcity Features (Free)', 'shopcity') ?></h3>
                <ul>
                    <li> <strong>- <?php echo __('Pre-build sections', 'shopcity') ?></strong>
                        <ul>

                            <li> <?php echo __('Banner Section - 4+', 'shopcity') ?></li>
                            <li> <?php echo __('About Us Section - 2', 'shopcity') ?></li>
                            <li> <?php echo __('Product Showcase Section', 'shopcity') ?></li>
                            <li> <?php echo __('Featured Category Section', 'shopcity') ?></li>
                            <li> <?php echo __('Gallery Section', 'shopcity') ?></li>
                            <li> <?php echo __('Testimonials Section', 'shopcity') ?></li>
                            <li> <?php echo __('Feature/Featured CTA Section', 'shopcity') ?></li>
                            <li> <?php echo __('Offer and Promotion CTA', 'shopcity') ?></li>


                        </ul>
                    <li>
                    <li> <strong>- <?php echo __('Base Templates Ready', 'shopcity') ?></strong>
                        <ul>
                            <li> <?php echo __('404 Template', 'shopcity') ?></li>
                            <li> <?php echo __('Archive Template', 'shopcity') ?></li>
                            <li> <?php echo __('Blank Template', 'shopcity') ?></li>
                            <li> <?php echo __('Front Page Template', 'shopcity') ?></li>
                            <li> <?php echo __('Blog Home Template', 'shopcity') ?></li>
                            <li> <?php echo __('Index Page Template', 'shopcity') ?></li>
                            <li> <?php echo __('Search Template', 'shopcity') ?></li>
                            <li> <?php echo __('Page Template', 'shopcity') ?></li>
                            <li> <?php echo __('Product Catalog Template', 'shopcity') ?></li>
                            <li> <?php echo __('Product Single Page Template', 'shopcity') ?></li>
                            <li> <?php echo __('Blank Template', 'shopcity') ?></li>

                        </ul>
                    <li>
                    <li><strong> - <?php echo __('6 Pre-build ready to import starter sites', 'shopcity') ?></strong></li>
                    <li><strong> - <?php echo __('20+ Pre-build ready to use patterns/section collection', 'shopcity') ?></strong></li>
                    <li><strong> - <?php echo __('Fully Customizable Header Layout - 3+', 'shopcity') ?></strong></li>
                    <li> <strong>- <?php echo __('Fully Customizable Footer Layout - 3+ ', 'shopcity') ?></strong></li>
                    <li><strong> - <?php echo __('Multiple Typography Option', 'shopcity') ?></strong></li>
                    <li> <strong>- <?php echo __('Advanced Color Options', 'shopcity') ?></strong></li>
                    <li> <strong>- <?php echo __('Grid Layout for Post Display', 'shopcity') ?></strong></li>
                    <li> <strong>- <?php echo __('List Layout for Post Display', 'shopcity') ?></strong></li>
                </ul>
            </div>
            <div class="half-col pro-features">
                <h3><?php echo __('Premium Version Offer', 'shopcity') ?></h3>
                <ul>
                    <li><?php echo __('Includes all free features', 'shopcity') ?></li>
                    <li><?php echo __('3 more additional (9 total) Pre-build ready to import starter sites', 'shopcity') ?></li>
                    <li><?php echo __('30+ Pre-build ready to use patterns/section collection', 'shopcity') ?></li>
                    <li><?php echo __('Slider Patterns', 'shopcity') ?></li>
                    <li><?php echo __('Post Slider Carousel Pattern', 'shopcity') ?></li>
                    <li><?php echo __('Testimonial Carousel Pattern', 'shopcity') ?></li>
                    <li><?php echo __('Post Carousel Patterns', 'shopcity') ?></li>
                    <li><?php echo __('Social Share Icons display shortcode as Pattern', 'shopcity') ?></li>
                    <li><?php echo __('Breadcrumb display shortcode as Pattern', 'shopcity') ?></li>
                    <li><?php echo __('Related Posts display shortcode as Pattern', 'shopcity') ?></li>
                    <li><?php echo __('Current Date display shortcode as Pattern', 'shopcity') ?></li>
                    <li><?php echo __('Current Time display shortcode as Pattern', 'shopcity') ?></li>
                </ul>
                <a href="https://websiteinwp.com/plan-and-pricing/" class="upgrade-btn button" target="_blank"><?php echo __('Upgrade to Pro', 'shopcity') ?></a>
            </div>
        </div>
    </div>
<?php
}

<?php 

if (!class_exists('wcmamtx_add_frontend_class')) {

  class wcmamtx_add_frontend_class {

    private $endpoint_key;
    private $endpoint_content;

    private $column_val;
    private $column_key;
    private $column_key_custom;
    
    public function __construct() {
	
	
	  add_action( 'wp_enqueue_scripts', array( $this, 'wcmamtx_load_assets' ) );
	  add_action( 'woocommerce_account_menu_items', array($this, 'wcmamtx_rename_my_account_menu_items'), 100, 1);
      add_action( 'woocommerce_locate_template', array($this,'wcmamtx_override_default_navigation_template'), 100, 3 );

      
      add_filter( 'wpml_sl_blacklist_requests',  array($this,'wpml_sl_blacklist_requests'), 10, 2 );
      add_action( 'init', array($this,'wcmamtx_add_custom_endpoint_page') );
      add_action( 'woocommerce_account_dashboard', array($this,'wcmamtx_add_myaccount_links'), 10 );
      
      add_action( 'parse_request', array($this,'wcmamtx_my_account_default_redirect'), 10, 1);
      add_filter( 'woocommerce_get_endpoint_url', array( $this, 'wcmamtx_link_url_redirect' ), 10, 4 );

      
      

      add_action('the_content', array( $this, 'wcmamtx_modify_post_content' ));

      add_filter( 'woodmart_override_heading_my_account_menu', array( $this, 'wp_nav_menu_items_function' ), 10, 1 );

       add_action( 'wp_nav_menu_items', array( $this, 'wcmamtx_add_menu_items' ), 10, 2 );
    }


    public function wp_nav_menu_items_function($out) {


        $out = wcmamtx_get_my_account_menu();

        return $out;

    }

    public function wcmamtx_add_menu_items( $items, $args ) {

        $frontend_url = get_permalink(get_option('woocommerce_myaccount_page_id'));

        $wcmamtx_plugin_options = (array) get_option('wcmamtx_plugin_options');

        $nav_header_widget_text = isset($wcmamtx_plugin_options['nav_header_widget_text']) ? $wcmamtx_plugin_options['nav_header_widget_text'] : esc_html__('My Account','customize-my-account-for-woocommerce-pro');


        

        $widget_show_enabled    = isset($wcmamtx_plugin_options['nav_header_widget']) ? $wcmamtx_plugin_options['nav_header_widget'] : "no";

        if ($widget_show_enabled != "yes") {
            return $items;
        }

        $widget_show_location    = isset($wcmamtx_plugin_options['widget_menu_location']) ? $wcmamtx_plugin_options['widget_menu_location'] : "primary";

        if( $args->theme_location != $widget_show_location ) {
            return $items;
        }

       
        if ( !is_user_logged_in() ) {

            $show_only_logged_in    = isset($wcmamtx_plugin_options['show_only_logged_in']) ? $wcmamtx_plugin_options['show_only_logged_in'] : "no";

            if ($show_only_logged_in == "yes") {
                return $items;
            }


            $nav_header_widget_text_logout = isset($wcmamtx_plugin_options['nav_header_widget_text_logout']) ? $wcmamtx_plugin_options['nav_header_widget_text_logout'] : esc_html__('Log In','customize-my-account-for-woocommerce');


            $Menu_link = '<li class="menu-item menu-item-type-post_type menu-item-object-page wcmamtx_menu wcmamtx_menu_logged_out"><a class="menu-link nav-top-link" aria-expanded="true" aria-haspopup="menu"  href="'.$frontend_url.'">'.$nav_header_widget_text_logout.'</a>';

            $items .= $Menu_link;

            return $items;
        
        } 



        

        $Menu_link  = '<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children wcmamtx_menu wcmamtx_menu_logged_in"><a class="menu-link" href="'.$frontend_url.'">'.$nav_header_widget_text.'<i class="fa fa-chevron-down wcmamtx_nav_chevron"></i></a>';

        $Menu_link .= '<ul class="sub-menu nav-dropdown nav-dropdown-default" style="">';

        $Menu_link .= wcmamtx_get_my_account_menu_plain_li();

        $Menu_link .= '</ul></li>';



        $items .= $Menu_link;

        return $items;
    }
    



    public function wcmamtx_add_myaccount_links() { 
        $wcmamtx_tabs   = get_option('wcmamtx_advanced_settings');

        $plugin_options = (array) get_option( 'wcmamtx_plugin_options' );
         
        if ( (isset($plugin_options['disable_dashboard_links'])) && ($plugin_options['disable_dashboard_links'] == "yes")) {
            return;
        }

        if (!isset($wcmamtx_tabs) || (empty($wcmamtx_tabs))) {
             $wcmamtx_tabs = wc_get_account_menu_items();
        } 
        ?>
        <div class="wcmtx-my-account-links wcmtx-grid">
            <?php foreach ( $wcmamtx_tabs as $key => $value ) : 
               $icon_source       = isset($value['icon_source']) ? $value['icon_source'] : "default";
               if (isset($value['endpoint_name']) && ($value['endpoint_name'] != '')) {
                $name = $value['endpoint_name'];
            } else {
                $name = $value;
            }  

            $wcmamtx_type = isset($value['wcmamtx_type']) ? $value['wcmamtx_type'] : "endpoint";

            $should_show = 'yes';


            if (isset($value['visibleto']) && ($value['visibleto'] != "all")) {

                $allowedroles  = isset($value['roles']) ? $value['roles'] : "";

                $allowedusers  = isset($value['users']) ? $value['users'] : array();

                $is_visible    = wcmamtx_check_role_visibility($allowedroles,$value['visibleto'],$allowedusers);

            } else {

                $is_visible = 'yes';
            }



            if (isset($value['show']) && ($value['show'] == "no")) {
                
                 $should_show = 'no';
                
            }

            $hide_in_link_toggle = isset($value['hide_dashboard_links']) && ($value['hide_dashboard_links'] == "01") ? "enabled" : "disabled";

            if (isset($hide_in_link_toggle) && ($hide_in_link_toggle == "enabled")) {
                
                 $should_show = 'no';
                
            }



            if (($wcmamtx_type != "group") && ($should_show == 'yes') && ($is_visible == "yes")) {

                $key = isset($value['endpoint_key']) ? $value['endpoint_key'] : $key;


            ?>
                <div class="wcmamtx_dashboard_link <?php echo esc_attr( $key ); ?>-link">
                    
                    <a href="<?php echo esc_url( wc_get_account_endpoint_url( $key ) ); ?>">
                        
                        <p class="wcmtx_icon_src">
                            <?php wcmamtx_get_account_menu_li_icon_html($icon_source,$value,$key); ?>
                        </p>

                        <?php echo esc_html( $name ); ?>
                            
                    </a>
                </div>
            <?php } ?>
            <?php endforeach; ?>
        </div>
        <?php 
    }


    public function wpml_sl_blacklist_requests( $blacklist, $sitepress ) {

        $advanced_settings = (array) get_option( 'wcmamtx_advanced_settings' );

        if (!isset($advanced_settings)) {
            return  $blacklist;
        } else {

            $myaccount_id = get_option( 'woocommerce_myaccount_page_id' );
            $myaccount_page = get_post($myaccount_id); 
            $accountslug = $myaccount_page->post_name;


            foreach ($advanced_settings as $key=>$value) {
                if (isset($value['exclude_wpml_sticky']) && ($value['exclude_wpml_sticky'] == "01")) {
                    $blacklist[] = ''.$accountslug.'/'.$key.'';
                }

            }
        }

        
        

        return $blacklist;
    }


    public function wcmamtx_modify_post_content($content) {
        global $post;

        if ($post === null) {

            return $content;

        }

        $post_id = $post->ID;

        $myaccount_id = get_option( 'woocommerce_myaccount_page_id' );


        $plugin_options = (array) get_option( 'wcmamtx_plugin_options' );


        if (isset($plugin_options['custom_myaccount']) && ($plugin_options['custom_myaccount'] == "yes")) {

            if ($post_id != $myaccount_id) {

                return $content;

            } else {

                $advanced_settings = (array) get_option( 'wcmamtx_advanced_settings' );

                global $wp_query;

                if (!isset($advancedsettings) || (sizeof($advancedsettings) == 1)) {
                    $tabs = wc_get_account_menu_items();
                } else {
                    $tabs = $advancedsettings;
                }

                foreach ($tabs as $key=>$value) { 

                    if (isset( $wp_query->query_vars[$key] )) {
                      return $content;
                  }

              }



              $plugin_options = (array) get_option( 'wcmamtx_plugin_options' );

              if (isset($plugin_options['custom_my_account_template']) && ($plugin_options['custom_my_account_template'] != "default") && ($plugin_options['custom_my_account_template'] != "") ) {
                $contentElementor = "";

                if (class_exists("\\Elementor\\Plugin")) {
                    $post_ID = $plugin_options['custom_my_account_template'];
                    $pluginElementor = \Elementor\Plugin::instance();
                    $contentElementor = $pluginElementor->frontend->get_builder_content($post_ID);
                }

                $content = $contentElementor;
            }
            
        }

    }






        return $content;
    }

    /**
 * Parses a url to extract the query parameters from it as a assoc array
 * @param string $url
 * @param bool $decode (optional) apply url decode
 * @return array
 */
    function parseUrl($url, $decode = false)
    {
        $urlData = parse_url($url);

        if (empty($urlData['query'])) { return null; }

        $query = explode("&", $urlData['query']);
        $parameters = array();

        foreach($query as $parameter) {
            $param = explode("=", $parameter);

            if (!empty($param) && count($param) == 2)
                $parameters[$param[0]] = $decode == true ? urldecode($param[1]) : $param[1];
        }

        return $parameters;
    }


    public function woocommerce_my_account_my_orders_actions_func($actions,$order) {
        $new_actions = (array) get_option('wcmamtx_order_actions');

        if (!isset($new_actions) || (!is_array($new_actions)) ) {
            return $actions;
        }

        if ((isset($new_actions)) && (is_array($new_actions)) && (!empty($new_actions))) {

            foreach ($new_actions as $key=>$value) {


                if (isset($value['endpoint_name']) && (isset($value['action_url'])) && ($value['action_url'] != "")) {



                    $action_url  = $value['action_url'];

                    


                    $params = $this->parseUrl($action_url);

                    
                



                    foreach ($params as $skey=>$svalue) {
                        

                        if ($svalue == "{orderid}") {
                            $action_url = preg_replace('{orderid}', $order->ID , $action_url);
                        } else {

                            $svalue = substr($svalue, 1, -1);

                            $matchtext  ='{'.$svalue.'}';

                            $metavalue  = get_post_meta($order->ID,$svalue,true);

                            

                            $action_url = preg_replace($matchtext,  $metavalue , $action_url);

                        } 

                    }

                    $icon_source       = isset($value['icon_source']) ? $value['icon_source'] : "";


                    if ($icon_source == "custom") {
                        $icon       = isset($value['icon']) ? $value['icon'] : "";

                        if ($icon != '') {
                            $icon_html ='<i class="wcmtx_float_right '.$icon.'"></i>';
                        }
                    } else if ($icon_source == "dashicon") {
                        $icon       = isset($value['dashicon']) ? $value['dashicon'] : "";

                        if ($icon != '') {
                             $icon_html ='<span class="dashicons wcmtx_float_right '.$icon.'"></span>'; 
                         }

                    }

                    
                    $action_name = ''.$value['endpoint_name'].'';
                    $actions[] = array(
                        "url" => $action_url,
                        "name" => $action_name,
                        "icon_html" => $icon_html
                    );
               }


           }

       }

        

        return $actions;
    }


    public function woocommerce_account_orders_columns_func($columns = array()) {

        $new_columns = (array) get_option('wcmamtx_order_settings');

        $core_fields       = 'order-number,order-date,order-status,order-total,order-actions';


        if (!isset($new_columns) || (!is_array($new_columns)) || (sizeof($new_columns) == 1)) {
            return $columns;
        }

        $rewind = array();



        foreach ($new_columns as $key=>$value) {

           


            if (!isset($value['show']) || ($value['show'] != 'no')) {

                

                if (isset($value['endpoint_name'])) {
                    $rewind[$key] = $value['endpoint_name'];
                }

                if (!preg_match('/\b'.$key.'\b/', $core_fields ) && isset($value)) { 

                    
                    if (isset($value['value'])) {
                        $this->column_val = $value['value'];
                    }
                    

                    if (isset($value['endpoint_key'])) {
                        $this->column_key = $value['endpoint_key'];
                    }

                    if (isset($value['custom_key'])) {
                        $this->column_key_custom = $value['custom_key'];
                    }


                    add_action('woocommerce_my_account_my_orders_column_'.$key.'',array($this,'process_column_values'),10,2);

                }

            }
        }

        
        if (!in_array('order-actions', $rewind)) {
              $rewind['order-actions'] = '';
        }
        
        

        return $rewind;
    }

    public function wcmamtx_flush_rewrite_rules() {
        

            flush_rewrite_rules();

        
        
    }


    public function process_column_values($order,$column_id){

        
        $column_val_type = $this->column_val;

        $main_array = (array) get_option('wcmamtx_order_settings');

        $custom_key =$main_array[$column_id]['custom_key'];


        switch($column_val_type) {

            case "orderid":
                echo $order->ID;
            break;

            case "customkey":
                

                $first_value = get_post_meta($order->ID,''.$custom_key.'',true);
                $second_value = get_post_meta($order->ID,'_'.$custom_key.'',true);

                if (!isset($first_value) || ($first_value == "")) {
                    echo $second_value;
                } else {
                    echo $first_value;
                }
            break;

            case "checkoutfield":
                
                
                
                $first_value = get_post_meta($order->ID,''.$custom_key.'',true);
                $second_value = get_post_meta($order->ID,'_'.$custom_key.'',true);

                if (!isset($first_value) || ($first_value == "")) {
                    echo $second_value;
                } else {
                    echo $first_value;
                }
            break;

        }

    }


    /**
     * Get endpoint URL.
     *
     * Gets the URL for an endpoint, which varies depending on permalink settings.
     *
     * @param  string $endpoint  Endpoint slug.
     * @param  string $value     Query param value.
     * @param  string $permalink Permalink.
     *
     * @return string
     */
    public function wcmamtx_get_endpoint_url( $endpoint, $value = '', $permalink = '' ) {
        if ( ! $permalink ) {
            $permalink = get_permalink();
        }

        // Map endpoint to options.
        
        $query_vars = WC()->query->get_query_vars();
        $endpoint   = ! empty( $query_vars[ $endpoint ] ) ? $query_vars[ $endpoint ] : $endpoint;
        $value      = ( get_option( 'woocommerce_myaccount_edit_address_endpoint', 'edit-address' ) === $endpoint ) ? wc_edit_address_i18n( $value ) : $value;

        if ( get_option( 'permalink_structure' ) ) {
            if ( strstr( $permalink, '?' ) ) {
                $query_string = '?' . wp_parse_url( $permalink, PHP_URL_QUERY );
                $permalink    = current( explode( '?', $permalink ) );
            } else {
                $query_string = '';
            }
            $url = trailingslashit( $permalink );

            if ( $value ) {
                $url .= trailingslashit( $endpoint ) . user_trailingslashit( $value );
            } else {
                $url .= user_trailingslashit( $endpoint );
            }

            $url .= $query_string;
        } else {
            $url = add_query_arg( $endpoint, $value, $permalink );
        }

        return apply_filters( 'woocommerce_get_endpoint_url', $url, $endpoint, $value, $permalink );
    }

    public function wcmamtx_my_account_default_redirect() {
        global $wp;

        $plugin_options = get_option('wcmamtx_plugin_options');

        $advanced_settings = (array) get_option( 'wcmamtx_advanced_settings' );
        
        if (isset($plugin_options) && isset($plugin_options['default_tab']) && ($plugin_options['default_tab'] != "")) {
            $tab_value_key =  $plugin_options['default_tab'];
        }

        


        if (isset($tab_value_key)) {
            if (array_key_exists($tab_value_key, $advanced_settings)) {

                $tab_value  = $advanced_settings[''.$tab_value_key.''];

                $tvalue = isset($tab_value['endpoint_key']) ? $tab_value['endpoint_key'] : $tab_value_key;



                $default_tab    = isset($tvalue) ? $tvalue : "dashboard";

                $accountslug    = 'my-account';


                $myaccount_id = get_option( 'woocommerce_myaccount_page_id' );
                $myaccount_page = get_post($myaccount_id); 
                $accountslug = $myaccount_page->post_name;


                if (is_user_logged_in() && $wp->request === $accountslug && ($default_tab != "dashboard")) {     
                    $redirect_url = wc_get_account_endpoint_url($default_tab);

                    wp_redirect($redirect_url);

                    exit;
                }

            }

        }

    }


    public function wcmamtx_add_custom_endpoint_page() {
        $wcmamtx_tabs = get_option('wcmamtx_advanced_settings');

        $core_fields       = 'dashboard,orders,downloads,edit-address,edit-account,customer-logout';

        if (!is_array($wcmamtx_tabs)) {

            return;
        }

        if (!isset($wcmamtx_tabs) || (sizeof($wcmamtx_tabs) == 1)) {
            return;
        } 


        foreach ($wcmamtx_tabs as $key=>$value) {

            if (!preg_match('/\b'.$key.'\b/', $core_fields )) {

                if (isset($value['endpoint_key']) && ($value['endpoint_key'] != '')) {
                    $new_key = $value['endpoint_key'];
                } else {
                    $new_key = $key;
                }

                if (isset($value['wcmamtx_type']) && ($value['wcmamtx_type'] == "endpoint") ) {
                    add_rewrite_endpoint( $new_key, EP_ROOT | EP_PAGES );
                    add_action( 'wp_loaded', array($this,'wcmamtx_flush_rewrite_rules') );
                }
            }

        }

        $this->wcmamtx_core_endpoint_contents();

        
    }


    public function wcmamtx_override_default_navigation_template( $template, $template_name, $template_path ) {

        $theme = wp_get_theme();
        $name  = $theme->{'Name'};
        $name  = str_replace(" ", "-", $name);

        $tname    = strtolower($name);





       

        $plugin_options = (array) get_option( 'wcmamtx_plugin_options' );


        if (isset($plugin_options['disable_navigation']) && ($plugin_options['disable_navigation'] == "yes")) {
            return $template;
        }
         
        if ( strstr($template, 'navigation.php') ) {
            $template = wcmamtx_plugin_path() . '/templates/myaccount/navigation.php';
        }




        
        if (isset($plugin_options['override_endpoints']) && ($plugin_options['override_endpoints'] == "yes") ) {


            


            if ( strstr($template, 'orders.php') && (isset($plugin_options['custom_templates']['orders'])) && ($plugin_options['custom_templates']['orders'] != "default")) {
                $template = wcmamtx_plugin_path() . '/templates/myaccount/orders.php';

                if (class_exists("\\Elementor\\Plugin")) {
                    $post_ID = $plugin_options['custom_templates']['orders'];

                    

                    $pluginElementor = \Elementor\Plugin::instance();
                    $contentElementor = $pluginElementor->frontend->get_builder_content($post_ID);

                    
                }
                

                echo $pluginElementor->frontend->get_builder_content($post_ID);

                $template = wcmamtx_plugin_path() . '/templates/myaccount/empty_form.php';
               
            }
           

            
           
        }    


        
        return $template;
    }


    


	public function wcmamtx_load_assets() {

		$wcmamtx_locals = array();

        $wcmamtx_plugin_options = (array) get_option('wcmamtx_plugin_options');

        if (is_account_page()) {

            wp_enqueue_script( 'wcmamtxfrontend', ''.wcmamtx_PLUGIN_URL.'assets/js/frontend.js',array( 'jquery'), false, true);
   
		    wp_enqueue_style( 'wcmamtx-frontend', ''.wcmamtx_PLUGIN_URL.'assets/css/frontend.css' );
            wp_enqueue_style( 'wcmamtx-font-awesome', ''.wcmamtx_PLUGIN_URL.'assets/css/all.min.css' );
            wp_localize_script( 'wcmamtxfrontend', 'wcmamtxfrontend', $wcmamtx_locals );


        } 


        if (is_user_logged_in()) {
            wp_enqueue_script( 'wcmamtxfrontend', ''.wcmamtx_PLUGIN_URL.'assets/js/frontend.js',array( 'jquery'), false, true);

            

            
            
        }

        wp_enqueue_style( 'wcmamtx-frontend-unique', ''.wcmamtx_PLUGIN_URL.'assets/css/frontend-unique.css' );
        wp_enqueue_script( 'wcmamtx-frontend-unique', ''.wcmamtx_PLUGIN_URL.'assets/js/frontend-unique.js' );
		
   
	}


	public function wcmamtx_rename_my_account_menu_items($items) {

		$wcmamtx_tabs = get_option('wcmamtx_advanced_settings');

        $core_fields_array =  array(
                         'dashboard'=>'dashboard',
                         'orders'=>'orders',
                         'downloads'=>'downloads',
                         'edit-address'=>'edit-address',
                         'edit-account'=>'edit-account',
                         'customer-logout'=>'customer-logout'
                      );
        

        if (!is_array($wcmamtx_tabs)) {
        	return $items;
        }

        if (!isset($wcmamtx_tabs) || (sizeof($wcmamtx_tabs) == 1)) {
            return $items;
        } else {
        	$new_ordered_array = $this->wcmamtx_reoder_array($wcmamtx_tabs,$items);

        }


        foreach ($items as $ikey=>$ivalue) {
            if (!array_key_exists($ikey, $new_ordered_array) && !array_key_exists($ikey, $core_fields_array)) {
                $new_ordered_array[$ikey] = $ivalue;           

            }
        }

        

		return $new_ordered_array;
    }

    public function wcmamtx_reoder_array($wcmamtx_tabs,$items) {
    	
    	$ordered = array();
        
        $core_fields       = 'dashboard,orders,downloads,edit-address,edit-account,customer-logout';

        $this->endpoint_content = '';



        foreach ($wcmamtx_tabs as $key=>$value) {
            
                if (!preg_match('/\b'.$key.'\b/', $core_fields ) && (isset($value['endpoint_key']))) {
                    $new_key = $value['endpoint_key'];

                } else {
                    $new_key = $key;
                }




                if (isset($value['endpoint_name']) && ($value['endpoint_name'] != '')) {
                    $new_value = $value['endpoint_name'];
                } else {
                    $new_value = $value;
                }


                if (isset($value['visibleto']) && ($value['visibleto'] != "all")) {
                    
                    $allowedroles  = isset($value['roles']) ? $value['roles'] : "";

                    $allowedusers  = isset($value['users']) ? $value['users'] : array();

                    $is_visible = wcmamtx_check_role_visibility($allowedroles,$value['visibleto'],$allowedusers);
                
                } else {

                    $is_visible = 'yes';
                }


                if (preg_match('/\b'.$key.'\b/', $core_fields )) {

                    if (isset($value['show'])) {

                        if ($value['show'] == "yes") {
                            
                            
                            if ($is_visible == 'yes') { 
                                
                                $ordered[$new_key] = $new_value;
                            }
                            
                        
                        }

                    } else {

                        

                        if ($is_visible == 'yes') {

                            $ordered[$new_key] = $new_value;
                        }
                    }

                } else {



                    if ($is_visible == 'yes') {
                        $ordered[$new_key] = $new_value;
                    }

                    if (isset($value['endpoint_key']) && ($value['endpoint_key'] != '')) {
                        $new_key = $value['endpoint_key'];
                    }

                    

                }
            	      
        }

        return $ordered;
    }


    public function wcmamtx_core_endpoint_contents() {

        

        $wcmamtx_tabs      = get_option('wcmamtx_advanced_settings');
        

        if (!is_array($wcmamtx_tabs)) {
            return;
        }

        if (!isset($wcmamtx_tabs) || (sizeof($wcmamtx_tabs) == 1)) {
            return;
        } else {
            
            $this->extra_content_foreach($wcmamtx_tabs);
        }


    }

    public function extra_content_foreach($wcmamtx_tabs) {
        $core_content_fields       = 'downloads,edit-address,edit-account';
        $core_fields       = 'dashboard,orders,downloads,edit-address,edit-account,customer-logout';

        $content  = '';
        $content_settings = 'after';

        foreach ($wcmamtx_tabs as $key=>$value) {

            if (preg_match('/\b'.$key.'\b/', $core_content_fields )) {

                $content           = isset($value['content']) ? $value['content'] : "";
                $content_settings  = isset($value['content_settings']) ? $value['content_settings'] : "after";

                switch($key) {
                    case "edit-address":
                        switch($content_settings) {
                            case "after":
                                add_action( 'woocommerce_after_edit_account_address_form', function() use ( $content ) {
                            
                                    echo apply_filters('the_content',$content);
                                });
                            break;

                            case "before":
                                add_action( 'woocommerce_before_edit_account_address_form', function() use ( $content ) {
                            
                                    echo apply_filters('the_content',$content);
                                });
                            break;
                        }
                    break;

                    case "downloads":
                        switch($content_settings) {
                            case "after":
                                add_action( 'woocommerce_after_account_downloads', function() use ( $content ) {
                            
                                    echo apply_filters('the_content',$content);
                                });
                            break;

                            case "before":
                                add_action( 'woocommerce_before_account_downloads', function() use ( $content ) {
                            
                                    echo apply_filters('the_content',$content);
                                });
                            break;
                        }
                    break;

                    case "edit-account":
                        switch($content_settings) {
                            case "after":
                                add_action( 'woocommerce_after_edit_account_form', function() use ( $content ) {
                            
                                    echo apply_filters('the_content',$content);
                                });
                            break;

                            case "before":
                                add_action( 'woocommerce_before_edit_account_form', function() use ( $content ) {
                            
                                    echo apply_filters('the_content',$content);
                                });
                            break;
                        }
                    break;
                }

            } elseif ((!preg_match('/\b'.$key.'\b/', $core_fields )) && (isset($value['wcmamtx_type']) && ($value['wcmamtx_type'] == "endpoint") )) {

                $content            = isset($value['content']) ? $value['content'] : "";
                

                $plugin_options = (array) get_option( 'wcmamtx_plugin_options' );

                if (isset($plugin_options['override_endpoints']) && ($plugin_options['override_endpoints'] == "yes") && isset($plugin_options['custom_templates'][$key]) && ($plugin_options['custom_templates'][$key] != "default") && ($plugin_options['custom_templates'][$key] != "") ) {
                     $contentElementor = "";

                     if (class_exists("\\Elementor\\Plugin")) {
                        $post_ID = $plugin_options['custom_templates'][$key];
                        $pluginElementor = \Elementor\Plugin::instance();
                        $contentElementor = $pluginElementor->frontend->get_builder_content($post_ID);
                    }

                    $content = $contentElementor;
                }


                global $end_key;
                $end_key = $key;

                add_filter( 'query_vars', array( $this, 'wcmamtx_do_query_vars' ), 0 );

                $endkey             = isset($value['endpoint_key']) ? $value['endpoint_key'] : $key;

                if ($content != '') {
                    add_action( 'woocommerce_account_'.$endkey.'_endpoint', function() use ( $content ) {

                       echo apply_filters('the_content',$content);
                   });
                }

            }
        }
    }




    public function wcmamtx_do_query_vars( $vars ) {
        $vars[] = $this->endpoint_key;

        return $vars;
    }

    public function wcmamtx_link_url_redirect($url, $endpoint, $value, $permalink) {

        $wcmamtx_tabs = get_option('wcmamtx_advanced_settings');
        $core_fields       = 'dashboard,orders,downloads,edit-address,edit-account,customer-logout';


        if (!is_array($wcmamtx_tabs)) {

            return;
        }

        if (!isset($wcmamtx_tabs) || (sizeof($wcmamtx_tabs) == 1)) {
            return;
        } 


        foreach ($wcmamtx_tabs as $key=>$value) {

            if (!preg_match('/\b'.$key.'\b/', $core_fields )) {

                if (isset($value['endpoint_key']) && ($value['endpoint_key'] != '')) {
                    $new_key = $value['endpoint_key'];
                } else {
                    $new_key = $key;
                }

                if (isset($value['wcmamtx_type']) && ($value['wcmamtx_type'] == "link") ) {

                    $endpoint_url  = isset($value['link_inputtarget']) ? $value['link_inputtarget'] : "#";

                    if ( $endpoint == $new_key ) {


                        $url = $endpoint_url;

                    }
                }
            }

        }

        


        return $url;
    }





   }
}

new wcmamtx_add_frontend_class();

?>
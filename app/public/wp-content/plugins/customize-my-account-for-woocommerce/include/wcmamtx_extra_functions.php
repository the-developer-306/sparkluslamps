<?php

/**
 * Get account menu item classes.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_placeholder_img_src')) {

	function wcmamtx_placeholder_img_src() {
		return ''.wcmamtx_PLUGIN_URL.'assets/images/placeholder.png';
	}

}


/**
 * License activation reminder.
 *
 * @since 1.0.0
 * @param string .
 * @return string
 */

if (!function_exists('wcmamtx_review_reminder_div')) {

	function wcmamtx_review_reminder_div() { 
		?>

		<div class="wcmamtx_notice_div review">

			<div class="wcmamtx_notice_div_uppertext">
				<?php echo esc_html__( 'If you like our plugin kindly rate it.'); ?>

				<a type="button" target="_blank" href="https://wordpress.org/support/plugin/customize-my-account-for-woocommerce/reviews/#new-post"  class="" >
						
						<?php echo esc_html__( 'Rate now' ,'customize-my-account-for-woocommerce-pro'); ?>
					</a>

				<div class="sysbasics_review_buttons">
					

					<a type="button" target="_blank" href="#"  class="wcmamtx_dismiss_renew_notice wcmamtx_frontend_link" >
						
						<?php echo esc_html__( 'Dismiss notice' ,'customize-my-account-for-woocommerce-pro'); ?>
					</a>
				</div>
			</div>
		</div>

		<?php 
	}
}


/**
 * Get account menu item classes.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_account_menu_item_classes')) {

	function wcmamtx_get_account_menu_item_classes( $endpoint,$value ) {

		global $wp;

		$core_fields       = 'dashboard,orders,downloads,edit-address,edit-account,customer-logout';

		$icon_source       = isset($value['icon_source']) ? $value['icon_source'] : "default";

		switch($icon_source) {

			case "default":
			   $extra_li_class = '';
			break;

			case "noicon":
			   $extra_li_class = 'wcmamtx_no_icon';
			break;

			case "custom":
			   $extra_li_class = 'wcmamtx_custom_icon';
			break;

			case "dashicon":
			   $extra_li_class = 'wcmamtx_custom_icon';
			break;

		}
        
        

        $classes = array(
        	'woocommerce-MyAccount-navigation-link',
        	'woocommerce-MyAccount-navigation-link--' . $endpoint,
        	''.$extra_li_class.''
        );
        
        
		

	    // Set current item class.
		$current = isset( $wp->query_vars[ $endpoint ] );
		if ( 'dashboard' === $endpoint && ( isset( $wp->query_vars['page'] ) || empty( $wp->query_vars ) ) ) {
		    $current = true; // Dashboard is not an endpoint, so needs a custom check.
	    } elseif ( 'orders' === $endpoint && isset( $wp->query_vars['view-order'] ) ) {
		    $current = true; // When looking at individual order, highlight Orders list item (to signify where in the menu the user currently is).
	    } elseif ( 'payment-methods' === $endpoint && isset( $wp->query_vars['add-payment-method'] ) ) {
		    $current = true;
	    }
 
	    if ( $current ) {
		    $classes[] = 'is-active';
	    }

	    $classes = apply_filters( 'woocommerce_account_menu_item_classes', $classes, $endpoint );

	    return implode( ' ', array_map( 'sanitize_html_class', $classes ) );
    }
}


// **********************************************************************//
// ! My account menu
// **********************************************************************//

if ( ! function_exists( 'wcmamtx_get_my_account_menu_plain_li' ) ) {
	function wcmamtx_get_my_account_menu_plain_li() {
		$user_info  = get_userdata( get_current_user_id() );
		$user_roles = $user_info->roles;

		$out = '';

		$wcmamtx_tabs   =  (array) get_option('wcmamtx_advanced_settings');

		$items = wc_get_account_menu_items();

		$core_fields    = 'dashboard,orders,downloads,edit-address,edit-account,customer-logout';

		$core_fields_array =  array(
			'dashboard'=>'dashboard',
			'orders'=>'orders',
			'downloads'=>'downloads',
			'edit-address'=>'edit-address',
			'edit-account'=>'edit-account',
			'customer-logout'=>'customer-logout'
		);





		foreach ($items as $ikey=>$ivalue) {
			if (!array_key_exists($ikey, $wcmamtx_tabs) && !array_key_exists($ikey, $core_fields_array) ) {

				$match_index = 0;

				foreach ($wcmamtx_tabs as $tkey=>$tvalue) {
					if (isset($tvalue['endpoint_key']) && ($tvalue['endpoint_key'] == $ikey)) {
						$match_index++;
					}
				}

				if ($match_index == 0) {
					$wcmamtx_tabs[$ikey] = array(
						'show' => 'yes',
						'third_party' => 'yes',
						'endpoint_key' => $ikey,
						'wcmamtx_type' => 'endpoint',
						'parent'       => 'none',
						'endpoint_name'=> $ivalue,
					);   
				}           

			}
		}





		$plugin_options = get_option('wcmamtx_plugin_options');

		$icon_position  = 'right';
		$icon_extra_class = '';

		if (!is_array($wcmamtx_tabs)) { 
			$wcmamtx_tabs = $items;
		}

		if (!isset($wcmamtx_tabs) || (sizeof($wcmamtx_tabs) == 1)) {
			$wcmamtx_tabs = $items;
		}

		if (isset($plugin_options['icon_position']) && ($plugin_options['icon_position'] != '')) {
			$icon_position = $plugin_options['icon_position'];
		}

		if (isset($plugin_options['menu_position']) && ($plugin_options['menu_position'] != '')) {
			$menu_position = $plugin_options['menu_position'];
		}



		switch($icon_position) {
			case "right":
			$icon_extra_class = "wcmamtx_custom_right";
			break;

			case "left":
			$icon_extra_class = "wcmamtx_custom_left";
			break;

			default:
			$icon_extra_class = "wcmamtx_custom_right";
			break;
		}

		$menu_position_extra_class = "";

		if (isset($menu_position) && ($menu_position != '')) {
			switch($menu_position) {
				case "left":
				$menu_position_extra_class = "wcmamtx_menu_left";
				break;

				case "right":
				$menu_position_extra_class = "wcmamtx_menu_right";
				break;

				default:
				$menu_position_extra_class = "";
				break;
			}
		}





		foreach ( $wcmamtx_tabs as $key => $value ) {
			
			if (isset($value['endpoint_name']) && ($value['endpoint_name'] != '')) {
				$name = $value['endpoint_name'];
			} else {
				$name = $value;
			}

			$should_show = 'yes';


			if (isset($value['visibleto']) && ($value['visibleto'] != "all")) {

				$allowedroles  = isset($value['roles']) ? $value['roles'] : "";
                
                $allowedusers  = isset($value['users']) ? $value['users'] : array();


				$is_visible = wcmamtx_check_role_visibility($allowedroles,$value['visibleto'],$allowedusers);

			} else {

				$is_visible = 'yes';
			}



			if (isset($value['show']) && ($value['show'] == "no")) {

				$should_show = 'no';

			}


			if (isset($value['class']) && ($value['class'] != '')) {
				$extraclass = str_replace(',',' ', $value['class']);
			} else {
				$extraclass = '';
			}

			if (isset($value['endpoint_key']) && ($value['endpoint_key'] != '')) {
				$key = $value['endpoint_key'];
			}

			if (isset($value['parent']) && ($value['parent'] != '')) {
				$parent = $value['parent'];
			} else {
				$parent = 'none';
			}



			$icon_source       = isset($value['icon_source']) ? $value['icon_source'] : "default";

			$hide_myaccount_widget = isset($value['hide_myaccount_widget']) && ($value['hide_myaccount_widget'] == "01") ? "enabled" : "disabled";

            if (isset($hide_myaccount_widget) && ($hide_myaccount_widget == "enabled")) {
                
                 $should_show = 'no';
                
            }

			if (($should_show == "yes") && ($is_visible == "yes")) {

				if (isset($value['wcmamtx_type']) && ($value['wcmamtx_type'] == "group")) {


					$openclose = 'closed';

					$out .='<li class="wcmamtx_group2_sub menu-item menu-item-type-post_type menu-item-object-page '.$extraclass.' closed"><a href="#" class="wcmamtx_group_sub menu-link">'.esc_html( $name ).'&emsp;<i class="fa fa-chevron-down wcmamtx_group_fa"></i></a>';




					
					$m_icon_extra_class = '';






					$all_keys  = get_option('wcmamtx_advanced_settings'); 
					$plugin_options = get_option('wcmamtx_plugin_options'); 

					$matches   = wcmamtx_get_child_li($all_keys, $key); 




					if (sizeof($matches) > 0) { 
						$out .='<ul class="wcmamtx_sub_level" style="display:none;">';

						foreach ($matches as $mkey=>$mvalue) {

							$mkey  = isset($mvalue['endpoint_key']) ? $mvalue['endpoint_key'] : $mkey;

							if (isset($mvalue['endpoint_name']) && ($mvalue['endpoint_name'] != '')) {
								$liname = $mvalue['endpoint_name'];
							} else {
								$liname = $mvalue;
							}

							$should_show = 'yes';



							if (isset($mvalue['show']) && ($mvalue['show'] == "no")) {

								$should_show = 'no';

							}

							if (isset($mvalue['visibleto']) && ($mvalue['visibleto'] != "all")) {

								$allowedroles  = isset($mvalue['roles']) ? $mvalue['roles'] : "";
								$allowedusers  = isset($mvalue['users']) ? $mvalue['users'] : array();

								$is_visible = wcmamtx_check_role_visibility($allowedroles,$mvalue['visibleto'],$allowedusers);

							} else {

								$is_visible = 'yes';
							}

							$icon_source_child       = isset($mvalue['icon_source']) ? $mvalue['icon_source'] : "default";

							if (isset($mvalue['class']) && ($mvalue['class'] != '')) {
								$mextraclass = str_replace(',',' ', $mvalue['class']);
							} else {
								$mextraclass = '';
							}


							if (($should_show == "yes") && ($is_visible == "yes")) {

								$out .= '<li class="menu-item menu-item-type-post_type menu-item-object-page"><a class="menu-link sub-menu-link" href="' . esc_url( wc_get_account_endpoint_url( $mkey ) ) . '"><span>' . esc_html( $liname ) . '</span></a></li>';
							}
						}
						$out .='</ul>';
					} 

					$out .='</li>';




				} else {

					if ($parent == "none") {
						$out .= '<li class="menu-item menu-item-type-post_type menu-item-object-page"><a class="menu-link" href="' . esc_url( wc_get_account_endpoint_url( $key ) ) . '"><span>' . esc_html( $name ) . '</span></a></li>';
					}

				} 
			}
		}

		$out .='';

		return $out;
	}
}


/**
 * Get account li html.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_account_menu_li_icon_html')) {

	function wcmamtx_get_account_menu_li_icon_html($icon_source,$value,$key) {
        
        switch ($icon_source) {

        	case "custom":

        	$icon       = isset($value['icon']) ? $value['icon'] : "";

        	if ($icon != '') { ?>
        		<i class="<?php echo $icon; ?>"></i>
        	<?php }
        	break;

        	case "dashicon":

        	$icon       = isset($value['dashicon']) ? $value['dashicon'] : "";

			if ($icon != '') { ?>
				<span class="dashicons <?php echo $icon; ?>"></span>
			<?php } else { ?>

				<i class="fa fa-file-alt"></i>

			<?php }
        	break;

        	case "noicon":

        	break;


        	case "upload":

        	$swatchimage = isset($value['upload_icon']) ? $value['upload_icon'] : "";

        	if (isset($swatchimage) && ($swatchimage != "")) {
        		$swatchurl     = wp_get_attachment_thumb_url( $swatchimage );

        		?>
        		<img class="wcmamtx_upload_image_icon" src="<?php echo $swatchurl; ?>">
        		<?php
        	} else {
        		?>
        		<img class="wcmamtx_upload_image_icon" src="<?php echo wcmamtx_placeholder_img_src(); ?>">
        		<?php
        	}

        	

        	break;



        	default:

        	$icon ='fa fa-file-alt';

			switch($key) {
				case "dashboard":
				$icon ='fa fa-tachometer-alt';
				break;

				case "orders":
				$icon ='fa fa-shopping-basket';
				break;

				case "downloads":
				$icon ='fa fa-file-download';
				break;

				case "edit-address":
				$icon ='fa fa-home';
				break;

				case "edit-account":
				$icon ='fa fa-user';
				break;

				case "customer-logout":
				$icon ='fa fa-sign-out-alt';
				break;




			}

			if ($icon != '') { ?>
				<i class="<?php echo $icon; ?>"></i>
			<?php } else { ?>
				<i class="fa fa-file-alt"></i>
			<?php }
        	break;

        }


	}

}


/**
 * Get account li html.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_account_menu_li_html')) {

	function wcmamtx_get_account_menu_li_html( $name , $key , $value ,$icon_extra_class,$extraclass,$icon_source) { 

		$wsmt_li_fontsize = get_theme_mod('wsmt_li_fontsize');
         
        $font_size = isset($wsmt_li_fontsize) ? $wsmt_li_fontsize : "16px";

        $wsmt_li_padding = get_theme_mod('wsmt_li_padding');
         
        $padding_left = isset($wsmt_li_padding) ? $wsmt_li_padding : "0px";


		?>

		<li  class="<?php echo wcmamtx_get_account_menu_item_classes( $key , $value ); ?> <?php echo $extraclass; ?> <?php if ($icon_source == "custom") { echo $icon_extra_class; } ?>">
			<a class="woocommerce-MyAccount-navigation-link_a"  href="<?php echo wcmamtx_get_account_endpoint_url( $key ); ?>" <?php if (isset($value['wcmamtx_type']) && ($value['wcmamtx_type'] == "link") && (isset($value['link_targetblank'])) && ($value['link_targetblank'] == 01) ) { echo 'target="_blank"'; } ?>>
				<?php wcmamtx_get_account_menu_li_icon_html($icon_source,$value,$key); ?>
				<?php echo esc_html( $name ); ?>
			</a>
		</li>

	<?php }
}


/**
 * License activation reminder.
 *
 * @since 1.0.0
 * @param string .
 * @return string
 */

if (!function_exists('wcmamtx_load_pro_reminder_div')) {

	function wcmamtx_load_pro_reminder_div() { 
		?>

		<div class="wcmamtx_notice_div">

			<div class="wcmamtx_notice_div_uppertext">
				<?php echo esc_html__( 'This feature is available in pro version only.'); ?>

			</div>

			<div class="wcmamtx_notice_div_lowerbutton">
				<a type="button" href="https://sysbasics.com/go/customize-demo/"  class="btn btn-primary " >
					<span class="dashicons dashicons-lock"></span>
					<?php echo esc_html__( 'Pro Version Demo' ,'customize-my-account-for-woocommerce'); ?>
				</a>

				<a type="button" target="_blank" href="https://sysbasics.com/go/customize/"  class="btn btn-success wcmamtx_frontend_link" >
					<span class="dashicons dashicons-lock"></span>
					<?php echo esc_html__( 'Pro Version Page' ,'customize-my-account-for-woocommerce'); ?>
				</a>
			</div>
		</div>

		<?php 
	}
}


/**
 * License activation reminder.
 *
 * @since 1.0.0
 * @param string .
 * @return string
 */

if (!function_exists('wcmamtx_show_limit_info')) {

	function wcmamtx_show_limit_info() { 
		?>

		<div class="wcmamtx_notice_div">

			<div class="wcmamtx_notice_div_uppertext">
				

			</div>

			<div class="wcmamtx_notice_div_lowerbutton">
				<a type="button" href="https://sysbasics.com/go/customize-demo/"  class="btn btn-primary " >
					<span class="dashicons dashicons-lock"></span>
					<?php echo esc_html__( 'Pro Version Demo' ,'customize-my-account-for-woocommerce'); ?>
				</a>

				<a type="button" target="_blank" href="https://sysbasics.com/go/customize/"  class="btn btn-success wcmamtx_frontend_link" >
					<span class="dashicons dashicons-lock"></span>
					<?php echo esc_html__( 'Pro Version Page' ,'customize-my-account-for-woocommerce'); ?>
				</a>
			</div>
		</div>

		<?php 
	}
}


/**
 * Get account li html.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_account_endpoint_url')) {

	function wcmamtx_get_account_endpoint_url($key) {



		$core_url =  esc_url( wc_get_account_endpoint_url( $key ) );


		if (!isset($core_url) || ($core_url == "")) {

			

			if ( 'dashboard' === $key ) {
				return wc_get_page_permalink( 'myaccount' );
			}

			if ( 'customer-logout' === $key ) {
				return wc_logout_url();
			}

			return ''.wc_get_page_permalink( 'myaccount' ).''.$key.'/';
		}


		return apply_filters('wcmamtx_override_endpoint_url',$core_url,$key);

	}
}


/**
 * Get account li html.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_account_order_items')) {

	function wcmamtx_get_account_order_items() {

		$columns = array(
			'order-number'  => esc_html__( 'Order', 'woocommerce' ),
			'order-date'    => esc_html__( 'Date', 'woocommerce' ),
			'order-status'  => esc_html__( 'Status', 'woocommerce' ),
			'order-total'   => esc_html__( 'Total', 'woocommerce' ),
			'order-actions' => '&nbsp;',
		);

		return apply_filters('woocommerce_account_orders_columns',$columns);

	}
}


/**
 * Get account li html.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_meta_values')) {

	function wcmamtx_get_meta_values( $post_type = 'order', $exclude_empty = false, $exclude_hidden = false)
	{

		$meta_keys = array();
        global $wpdb;
    $query = "
        SELECT DISTINCT($wpdb->postmeta.meta_key) 
        FROM $wpdb->posts 
        LEFT JOIN $wpdb->postmeta 
        ON $wpdb->posts.ID = $wpdb->postmeta.post_id 
        WHERE $wpdb->posts.post_type = '%s'
    ";
    if($exclude_empty) 
        $query .= " AND $wpdb->postmeta.meta_key != ''";
    if($exclude_hidden) 
        $query .= " AND $wpdb->postmeta.meta_key NOT RegExp '(^[_0-9].+$)' ";

    $meta_keys = $wpdb->get_col($wpdb->prepare($query, $post_type));

    return $meta_keys;


	}
}


/**
 * Get account group html.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_account_menu_group_html')) {

	function wcmamtx_get_account_menu_group_html( $name , $key , $value ,$icon_extra_class,$extraclass,$icon_source) { 

		


        if (isset($value['group_open_default']) && ($value['group_open_default'] == "01" )) { 
        	$openclose = 'open'; 

        } else {

        	
            
            $match_index = 0;
            

            $browser_url = $_SERVER['REQUEST_URI'];

            $parts = explode("/", $browser_url);

            $parsed  = isset($parts[1]) ? $parts[1] : "";           
            $parsed2 = isset($parts[2]) ? $parts[2] : "";
            $parsed3 = isset($parts[3]) ? $parts[3] : "";
            $parsed4 = isset($parts[3]) ? $parts[3] : "";
            


			$all_keys  = get_option('wcmamtx_advanced_settings'); 
			$plugin_options = get_option('wcmamtx_plugin_options'); 

			$matches   = wcmamtx_get_child_li($all_keys, $key); 
        	
			if (sizeof($matches) > 0) { 
				foreach ($matches as $mkey=>$mvalue) {

					$mkey  = isset($mvalue['endpoint_key']) ? $mvalue['endpoint_key'] : $mkey;

					if (($parsed == $mkey) || ($parsed2 == $mkey) || ($parsed3 == $mkey) || ($parsed4 == $mkey)) {

                        $match_index++;
                        
					} 
				}
			}

			if ($match_index > 0) {
				$openclose = 'open';
			} else {
				$openclose = 'closed';
			}


        }

		?>

		<li class="wcmamtx_group2 <?php echo wcmamtx_get_account_menu_item_classes( $key , $value ); ?> <?php echo $extraclass; ?> <?php if ($icon_source == "custom") { echo $icon_extra_class; } ?> <?php echo $openclose; ?> ">
			<a href="#" class="wcmamtx_group">
				<?php 
				if ($openclose == 'open') { ?>
					<i class="fa fa-chevron-up wcmamtx_group_fa" ></i>
				<?php } else { ?>
                    <i class="fa fa-chevron-down wcmamtx_group_fa"></i>
				<?php }
				?>
				<?php 
				if ($icon_source == "custom") {
					$icon       = isset($value['icon']) ? $value['icon'] : "";

					if ($icon != '') { ?>
						<i class="<?php echo $icon; ?>"></i>
					<?php }
				} else if ($icon_source == "dashicon") {
					$icon       = isset($value['dashicon']) ? $value['dashicon'] : "";

					if ($icon != '') { ?>
						<span class="dashicons <?php echo $icon; ?>"></span>
					<?php }

				}
				?>
				<?php echo esc_html( $name ); ?>
			</a>
			<?php


			$m_icon_position  = 'right';
            $m_icon_extra_class = '';

            if (isset($plugin_options['icon_position']) && ($plugin_options['icon_position'] != '')) {
            	$m_icon_position = $plugin_options['icon_position'];
            }



            switch($m_icon_position) {
            	case "right":
            	$m_icon_extra_class = "wcmamtx_custom_right";
            	break;

            	case "left":
            	$m_icon_extra_class = "wcmamtx_custom_left";
            	break;

            	default:
            	$m_icon_extra_class = "wcmamtx_custom_right";
            	break;
            }

            $all_keys  = get_option('wcmamtx_advanced_settings'); 
			$plugin_options = get_option('wcmamtx_plugin_options'); 

			$matches   = wcmamtx_get_child_li($all_keys, $key); 
            
            
			

			if (sizeof($matches) > 0) { ?>
				<ul class="wcmamtx_sub_level" style="<?php if ($openclose == "open") { echo 'display:block;'; } else { echo 'display:none;'; } ?>">
					<?php
					foreach ($matches as $mkey=>$mvalue) {

						$mkey  = isset($mvalue['endpoint_key']) ? $mvalue['endpoint_key'] : $mkey;
						
						if (isset($mvalue['endpoint_name']) && ($mvalue['endpoint_name'] != '')) {
							$liname = $mvalue['endpoint_name'];
						} else {
							$liname = $mvalue;
						}

						$should_show = 'yes';



						if (isset($mvalue['show']) && ($mvalue['show'] == "no")) {

							$should_show = 'no';

						}

						if (isset($mvalue['visibleto']) && ($mvalue['visibleto'] != "all")) {

							$allowedroles  = isset($mvalue['roles']) ? $mvalue['roles'] : "";
							$allowedusers  = isset($mvalue['users']) ? $mvalue['users'] : array();

							$is_visible = wcmamtx_check_role_visibility($allowedroles,$mvalue['visibleto'],$allowedusers);

						} else {

							$is_visible = 'yes';
						}

						$icon_source_child       = isset($mvalue['icon_source']) ? $mvalue['icon_source'] : "default";

						if (isset($mvalue['class']) && ($mvalue['class'] != '')) {
							$mextraclass = str_replace(',',' ', $mvalue['class']);
						} else {
							$mextraclass = '';
						}


						if (($should_show == "yes") && ($is_visible == "yes")) {

							wcmamtx_get_account_menu_li_html( $liname, $mkey ,$mvalue ,$m_icon_extra_class,$mextraclass,$icon_source_child );
					    }
					}
					?>
				</ul>
			<?php } ?>
			
		</li>

	<?php }
}




// **********************************************************************//
// ! My account menu
// **********************************************************************//

if ( ! function_exists( 'wcmamtx_get_my_account_menu' ) ) {
	function wcmamtx_get_my_account_menu() {
		$user_info  = get_userdata( get_current_user_id() );
		$user_roles = $user_info->roles;

		$out = '<ul class="">';

		$wcmamtx_tabs   =  (array) get_option('wcmamtx_advanced_settings');

		$items = wc_get_account_menu_items();

		$core_fields    = 'dashboard,orders,downloads,edit-address,edit-account,customer-logout';

		$core_fields_array =  array(
			'dashboard'=>'dashboard',
			'orders'=>'orders',
			'downloads'=>'downloads',
			'edit-address'=>'edit-address',
			'edit-account'=>'edit-account',
			'customer-logout'=>'customer-logout'
		);





		foreach ($items as $ikey=>$ivalue) {
			if (!array_key_exists($ikey, $wcmamtx_tabs) && !array_key_exists($ikey, $core_fields_array) ) {

				$match_index = 0;

				foreach ($wcmamtx_tabs as $tkey=>$tvalue) {
					if (isset($tvalue['endpoint_key']) && ($tvalue['endpoint_key'] == $ikey)) {
						$match_index++;
					}
				}

				if ($match_index == 0) {
					$wcmamtx_tabs[$ikey] = array(
						'show' => 'yes',
						'third_party' => 'yes',
						'endpoint_key' => $ikey,
						'wcmamtx_type' => 'endpoint',
						'parent'       => 'none',
						'endpoint_name'=> $ivalue,
					);   
				}           

			}
		}





		$plugin_options = get_option('wcmamtx_plugin_options');

		$icon_position  = 'right';
		$icon_extra_class = '';

		if (!is_array($wcmamtx_tabs)) { 
			$wcmamtx_tabs = $items;
		}

		if (!isset($wcmamtx_tabs) || (sizeof($wcmamtx_tabs) == 1)) {
			$wcmamtx_tabs = $items;
		}

		if (isset($plugin_options['icon_position']) && ($plugin_options['icon_position'] != '')) {
			$icon_position = $plugin_options['icon_position'];
		}

		if (isset($plugin_options['menu_position']) && ($plugin_options['menu_position'] != '')) {
			$menu_position = $plugin_options['menu_position'];
		}



		switch($icon_position) {
			case "right":
			$icon_extra_class = "wcmamtx_custom_right";
			break;

			case "left":
			$icon_extra_class = "wcmamtx_custom_left";
			break;

			default:
			$icon_extra_class = "wcmamtx_custom_right";
			break;
		}

		$menu_position_extra_class = "";

		if (isset($menu_position) && ($menu_position != '')) {
			switch($menu_position) {
				case "left":
				$menu_position_extra_class = "wcmamtx_menu_left";
				break;

				case "right":
				$menu_position_extra_class = "wcmamtx_menu_right";
				break;

				default:
				$menu_position_extra_class = "";
				break;
			}
		}





		foreach ( $wcmamtx_tabs as $key => $value ) {
			
			if (isset($value['endpoint_name']) && ($value['endpoint_name'] != '')) {
				$name = $value['endpoint_name'];
			} else {
				$name = $value;
			}

			$should_show = 'yes';


			if (isset($value['visibleto']) && ($value['visibleto'] != "all")) {

				$allowedroles  = isset($value['roles']) ? $value['roles'] : "";
				$allowedusers  = isset($value['users']) ? $value['users'] : array();



				$is_visible = wcmamtx_check_role_visibility($allowedroles,$value['visibleto'],$allowedusers);

			} else {

				$is_visible = 'yes';
			}



			if (isset($value['show']) && ($value['show'] == "no")) {

				$should_show = 'no';

			}


			if (isset($value['class']) && ($value['class'] != '')) {
				$extraclass = str_replace(',',' ', $value['class']);
			} else {
				$extraclass = '';
			}

			if (isset($value['endpoint_key']) && ($value['endpoint_key'] != '')) {
				$key = $value['endpoint_key'];
			}

			if (isset($value['parent']) && ($value['parent'] != '')) {
				$parent = $value['parent'];
			} else {
				$parent = 'none';
			}



			$icon_source       = isset($value['icon_source']) ? $value['icon_source'] : "default";

			$hide_myaccount_widget = isset($value['hide_myaccount_widget']) && ($value['hide_myaccount_widget'] == "01") ? "enabled" : "disabled";

            if (isset($hide_myaccount_widget) && ($hide_myaccount_widget == "enabled")) {
                
                 $should_show = 'no';
                
            }

			if (($should_show == "yes") && ($is_visible == "yes")) {

				if (isset($value['wcmamtx_type']) && ($value['wcmamtx_type'] == "group")) {


					$openclose = 'closed';

					$out .='<li class="wcmamtx_group2_sub '.wcmamtx_get_account_menu_item_classes( $key , $value ).' '.$extraclass.' closed"><a href="#" class="wcmamtx_group_sub">'.esc_html( $name ).'&emsp;<i class="fa fa-chevron-down wcmamtx_group_fa"></i></a>';




					$m_icon_position  = 'right';
					$m_icon_extra_class = '';

					if (isset($plugin_options['icon_position']) && ($plugin_options['icon_position'] != '')) {
						$m_icon_position = $plugin_options['icon_position'];
					}



					switch($m_icon_position) {
						case "right":
						$m_icon_extra_class = "wcmamtx_custom_right";
						break;

						case "left":
						$m_icon_extra_class = "wcmamtx_custom_left";
						break;

						default:
						$m_icon_extra_class = "wcmamtx_custom_right";
						break;
					}

					$all_keys  = get_option('wcmamtx_advanced_settings'); 
					$plugin_options = get_option('wcmamtx_plugin_options'); 

					$matches   = wcmamtx_get_child_li($all_keys, $key); 




					if (sizeof($matches) > 0) { 
						$out .='<ul class="wcmamtx_sub_level" style="display:none;">';

						foreach ($matches as $mkey=>$mvalue) {

							$mkey  = isset($mvalue['endpoint_key']) ? $mvalue['endpoint_key'] : $mkey;

							if (isset($mvalue['endpoint_name']) && ($mvalue['endpoint_name'] != '')) {
								$liname = $mvalue['endpoint_name'];
							} else {
								$liname = $mvalue;
							}

							$should_show = 'yes';



							if (isset($mvalue['show']) && ($mvalue['show'] == "no")) {

								$should_show = 'no';

							}

							if (isset($mvalue['visibleto']) && ($mvalue['visibleto'] != "all")) {

								$allowedroles  = isset($mvalue['roles']) ? $mvalue['roles'] : "";
								$allowedusers  = isset($mvalue['users']) ? $mvalue['users'] : array();

								$is_visible = wcmamtx_check_role_visibility($allowedroles,$mvalue['visibleto'],$allowedusers);

							} else {

								$is_visible = 'yes';
							}

							$icon_source_child       = isset($mvalue['icon_source']) ? $mvalue['icon_source'] : "default";

							if (isset($mvalue['class']) && ($mvalue['class'] != '')) {
								$mextraclass = str_replace(',',' ', $mvalue['class']);
							} else {
								$mextraclass = '';
							}


							if (($should_show == "yes") && ($is_visible == "yes")) {

								$out .= '<li class="' . wc_get_account_menu_item_classes( $mkey ) . '"><a href="' . esc_url( wc_get_account_endpoint_url( $mkey ) ) . '"><span>' . esc_html( $liname ) . '</span></a></li>';
							}
						}
						$out .='</ul>';
					} 

					$out .='</li>';




				} else {

					if ($parent == "none") {
						$out .= '<li class="' . wc_get_account_menu_item_classes( $key ) . '"><a href="' . esc_url( wc_get_account_endpoint_url( $key ) ) . '"><span>' . esc_html( $name ) . '</span></a></li>';
					}

				} 
			}
		}

		return $out . '</ul>';
	}
}


/**
 * Get parent li items.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_get_child_li')) {


	function wcmamtx_get_child_li($array, $key) {

		$results = array();



		foreach ($array as $subkey=>$subvalue) {

			if (isset($subvalue['parent'])) {

				if ($subvalue['parent'] == $key) {
					$results[$subkey] = $subvalue;
				}
			}

		}

		return $results;
	}

}

/**
 * Get parent li items.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_check_role_visibility')) {

    function wcmamtx_check_role_visibility($allowedroles,$visibile_to,$allowedusers) {

    	$role_status       = 'no';



        switch($visibile_to) {

        	case "specific_exclude":

        	if (isset($allowedroles) && is_array($allowedroles) && (!empty($allowedroles))) {
        		if ( ! is_user_logged_in() ) {
        			$role_status       = 'no';
        			return $role_status; 
        		}

        		$allowedauthors = '';

        		foreach ($allowedroles as $role) {
        			$allowedauthors.=''.$role.',';
        		}

        		$allowedauthors=substr_replace($allowedauthors, "", -1);

        		global $current_user;
        		$user_roles = $current_user->roles;
        		$user_role = array_shift($user_roles);



        		if (!preg_match('/\b'.$user_role.'\b/', $allowedauthors )) {
        			$role_status       = 'yes';
        			return $role_status;
        		}

        	}

        	if (empty($allowedroles) && ( ! is_user_logged_in() )) {
        		$role_status       = 'yes';
        		return $role_status;
        	}

        	break;

        	case "specific":

        	if (isset($allowedroles) && is_array($allowedroles) && (!empty($allowedroles))) {
        		if ( ! is_user_logged_in() ) {
        			$role_status       = 'no';
        			return $role_status; 
        		}

        		$allowedauthors = '';

        		foreach ($allowedroles as $role) {
        			$allowedauthors.=''.$role.',';
        		}

        		$allowedauthors=substr_replace($allowedauthors, "", -1);

        		global $current_user;
        		$user_roles = $current_user->roles;
        		$user_role = array_shift($user_roles);



        		if (preg_match('/\b'.$user_role.'\b/', $allowedauthors )) {
        			$role_status       = 'yes';
        			return $role_status;
        		}

        	}

        	if (empty($allowedroles) && ( ! is_user_logged_in() )) {
        		$role_status       = 'yes';
        		return $role_status;
        	}

        	break;

        	case "specific_exclude_user":



        	if (isset($allowedusers) && is_array($allowedusers) && (!empty($allowedusers))) {

        		if ( ! is_user_logged_in() ) {
        			$user_status       = 'no';
        			return $user_status; 
        		}
                
                $user_match_index = 0;

                $user_id = get_current_user_id();

                foreach ($allowedusers as $alloweduser) {

                	if ($user_id == $alloweduser) {
                		$user_match_index++;
                	}

                }

                if ($user_match_index > 0 ) {
                	$user_status       = 'no';
        			return $user_status; 
                } else {
                	$user_status       = 'yes';
        			return $user_status; 
                }


        	}

        	break;

        	case "specific_user":

        	if (isset($allowedusers) && is_array($allowedusers) && (!empty($allowedusers))) {

        		if ( ! is_user_logged_in() ) {
        			$user_status       = 'no';
        			return $user_status; 
        		}
                
                $user_match_index = 0;

                $user_id = get_current_user_id();

                foreach ($allowedusers as $alloweduser) {

                	if ($user_id == $alloweduser) {
                		$user_match_index++;
                	}

                }

                if ($user_match_index > 0 ) {
                	$user_status       = 'yes';
        			return $user_status; 
                } else {
                	$user_status       = 'no';
        			return $user_status; 
                }


        	}

        	break;

        }


        return $role_status; 
    }
}

/**
 * Show user avatar before natigation items.
 *
 * @since 1.0.0
 * @param string $endpoint Endpoint.
 * @return string
 */

if (!function_exists('wcmamtx_myaccount_customer_avatar')) {

    function wcmamtx_myaccount_customer_avatar() {
	    $current_user = wp_get_current_user();

	    $plugin_options = get_option('wcmamtx_plugin_options');

	    $show_avatar    = isset($plugin_options['show_avatar']) ? $plugin_options['show_avatar'] : "no";
	    $avatar_size    = isset($plugin_options['avatar_size']) ? $plugin_options['avatar_size'] : 200;

	    if (isset($show_avatar) && ($show_avatar == "yes")) {
	    	echo '<div class="wcmamtx_myaccount_avatar">' . get_avatar( $current_user->user_email, $avatar_size , '', $current_user->display_name ) . '</div>';
	    }
    }
}
 
add_action( 'wcmamtx_before_account_navigation', 'wcmamtx_myaccount_customer_avatar', 5 );


function wcmtxka_find_string_match($string,$array) {

	foreach ($array as $key=>$value) {

	$endpoint_key = $value['endpoint_key'];
    
    if ($endpoint_key == $string) { // Yoshi version
    	
    	return 'found';
    }
}

return 'notfound';


}

?>
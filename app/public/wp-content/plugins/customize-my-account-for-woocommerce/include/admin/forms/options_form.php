<?php 


$advanced_settings = (array) get_option( 'wcmamtx_advanced_settings' );
$plugin_options = (array) get_option( 'wcmamtx_plugin_options' );

if (!isset($advanced_settings) || (sizeof($advanced_settings) == 1)) {
	$tabs = wc_get_account_menu_items();
} else {
	$tabs = $advanced_settings;
}

if (!isset($advancedsettings) || (sizeof($advancedsettings) == 1)) {
	$tabs2 = wc_get_account_menu_items();
} else {
	$tabs2 = $advancedsettings;
}

foreach ($tabs2 as $tkey=>$tvalue) {
	if(strpos($tkey, "group") !== false){
		unset($tabs2[$tkey]);
	}
}


$core_fields       = 'dashboard,edit-address,edit-account,customer-logout,downloads';

?> 

<table class="widefat wcmamtx_options_table">


	<tr>
		<td><label><?php echo esc_html__('Show My Account widget on navigation menu','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<input type="checkbox" data-toggle="toggle"  data-on="<?php echo esc_html__('Yes','customize-my-account-for-woocommerce'); ?>" data-off="<?php echo esc_html__('No','customize-my-account-for-woocommerce'); ?>" class="wcmamtx_show_nav_header_widget" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[nav_header_widget]" value="yes" <?php if (isset($plugin_options['nav_header_widget']) && ($plugin_options['nav_header_widget'] == "yes")) { echo 'checked'; } ?>>
			
		</td>
	</tr>


	<tr class="nav_header_widget_tr" style="<?php if (isset($plugin_options['nav_header_widget']) && ($plugin_options['nav_header_widget'] == "yes")) { echo 'display:table-row;'; } else { echo 'display:none;'; } ?>">
		<td><label><?php echo esc_html__('Header Menu Location','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<?php 
             
               $menu_locations = get_nav_menu_locations();



			?>
			<select class="wcmamtx_default_tab_select" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[widget_menu_location]">
                 <?php foreach ($menu_locations as $key=>$value) { ?>
                      <option value="<?php echo $key;?>" <?php if (isset($plugin_options['widget_menu_location']) && ($plugin_options['widget_menu_location'] == $key)) {echo 'selected';} ?>><?php echo $key;?></option>
                 <?php } ?>
			</select>
			
		</td>
	</tr>

	<tr class="nav_header_widget_tr" style="<?php if (isset($plugin_options['nav_header_widget']) && ($plugin_options['nav_header_widget'] == "yes")) { echo 'display:table-row;'; } else { echo 'display:none;'; } ?>">
		<td><label><?php echo esc_html__('Widget text (logged in)','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<?php             
               $nav_header_widget_text = isset($plugin_options['nav_header_widget_text']) ? $plugin_options['nav_header_widget_text'] : esc_html__('My Account','customize-my-account-for-woocommerce');
			?>
			<input type="text" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[nav_header_widget_text]" value="<?php echo $nav_header_widget_text; ?>">
			
		</td>
	</tr>


	<tr class="nav_header_widget_tr" style="<?php if (isset($plugin_options['nav_header_widget']) && ($plugin_options['nav_header_widget'] == "yes")) { echo 'display:table-row;'; } else { echo 'display:none;'; } ?>">
		<td><label><?php echo esc_html__('Widget text (logged out)','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<?php             
               $nav_header_widget_text_logout = isset($plugin_options['nav_header_widget_text_logout']) ? $plugin_options['nav_header_widget_text_logout'] : esc_html__('Log In','customize-my-account-for-woocommerce');
			?>
			<input type="text" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[nav_header_widget_text_logout]" value="<?php echo $nav_header_widget_text_logout; ?>">
			
		</td>
	</tr>

	<tr lass="nav_header_widget_tr" style="<?php if (isset($plugin_options['nav_header_widget']) && ($plugin_options['nav_header_widget'] == "yes")) { echo 'display:table-row;'; } else { echo 'display:none;'; } ?>">
		<td><label><?php echo esc_html__('Show widget only for logged in','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<input type="checkbox" data-toggle="toggle"  data-on="<?php echo esc_html__('Yes','customize-my-account-for-woocommerce'); ?>" data-off="<?php echo esc_html__('No','customize-my-account-for-woocommerce'); ?>" class="wcmamtx_show_only_logged_in" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[show_only_logged_in]" value="yes" <?php if (isset($plugin_options['show_only_logged_in']) && ($plugin_options['show_only_logged_in'] == "yes")) { echo 'checked'; } ?>>
			
		</td>
	</tr>
	

	

	<tr>
		<td><label><?php echo esc_html__('Menu position','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<select class="wcmamtx_menu_position_select" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[menu_position]">
				<option value="left" <?php if (isset($plugin_options['menu_position']) && ($plugin_options['menu_position'] != "right")) { echo 'selected'; } ?>><?php echo esc_html__('Vertical Left','customize-my-account-for-woocommerce'); ?></option>
				<option value="right" <?php if (isset($plugin_options['menu_position']) && ($plugin_options['menu_position'] == "right")) { echo 'selected'; } ?>><?php echo esc_html__('Vertical Right','customize-my-account-for-woocommerce'); ?></option>
			</select>
		</td>
	</tr>

	<tr>
		<td><label><?php echo esc_html__('Disable navigation template override','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<input type="checkbox" data-toggle="toggle"  data-on="<?php echo esc_html__('Yes','customize-my-account-for-woocommerce'); ?>" data-off="<?php echo esc_html__('No','customize-my-account-for-woocommerce'); ?>" class="wcmamtx_show_avatar_checkbox" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[disable_navigation]" value="yes" <?php if (isset($plugin_options['disable_navigation']) && ($plugin_options['disable_navigation'] == "yes")) { echo 'checked'; } ?>>
			<p><?php echo esc_html__('Turn it on if you face styling issues on your frontend','customize-my-account-for-woocommerce'); ?></p>
		</td>
	</tr>

	<tr>
		<td><label><?php echo esc_html__('Disable Dashboard Links','customize-my-account-for-woocommerce'); ?></label> <br />
		</td>
		<td>
			<input type="checkbox" data-toggle="toggle"  data-on="<?php echo esc_html__('Yes','customize-my-account-for-woocommerce'); ?>" data-off="<?php echo esc_html__('No','customize-my-account-for-woocommerce'); ?>" class="" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[disable_dashboard_links]" value="yes" <?php if (isset($plugin_options['disable_dashboard_links']) && ($plugin_options['disable_dashboard_links'] == "yes")) { echo 'checked'; } ?>>
			<p><?php echo esc_html__('Turn it on if your theme is already displaying dashboard links and you do not want plugin to duplicate it','customize-my-account-for-woocommerce'); ?></p>
		</td>
	</tr>



	<?php if  (wcmamtx_elementor_mode == "on") { ?>

		<tr width="100%">
			<td width="30%"><label><?php echo esc_html__('Elementor Widgets','customize-my-account-for-woocommerce'); ?></label> <br />
			</td>
			<td width="70%">
				<?php 

				$el_widgets1 = array('my-orders'=>'My Orders',
					                'dashboard'=>'Dashboard',
					                'form-add-payment-method'=>'Add Payment Method',
					                'form-edit-account'=>'Edit Account Form',
					                'form-edit-address'=>'Edit Address Form',
					                'form-login'=>'Login Form',
					                'my-address'=>'My Address',
					                'navigation'=>'Navigation',
					                'orders'=>'Orders',
					                'payment-methods'=>'Payment Methods'
					            );



                
				$el_widgets = isset($plugin_options['el_widgets']) && !empty($plugin_options['el_widgets']) ? $plugin_options['el_widgets'] : $el_widgets1;


               
			    ?>
			    <ul class="wcmamtx_elwidget_ul">
			    <?php

				foreach ($el_widgets1 as $key=>$value) { ?>

					<li>
						<label><?php echo esc_attr($value); ?></label>
						<input type="checkbox" data-toggle="toggle" data-on="<?php echo esc_html__('Yes','customize-my-account-for-woocommerce'); ?>" data-off="<?php echo esc_html__('No','customize-my-account-for-woocommerce'); ?>" class="wcmamtx_widget_checkbox" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[el_widgets][<?php echo $key; ?>]" value="yes" <?php if (isset($el_widgets[$key])) { echo 'checked';}?> >

					</li>           

				<?php }

				?>
			    </ul>
			</td>
		</tr>
		<tr>
			<td><label><?php echo esc_html__('Use Custom elementor template for My Account Page','customize-my-account-for-woocommerce'); ?></label> <br />
			</td>
			<td>
				<input type="checkbox" data-toggle="toggle"  data-on="<?php echo esc_html__('Yes','customize-my-account-for-woocommerce'); ?>" data-off="<?php echo esc_html__('No','customize-my-account-for-woocommerce'); ?>" class="override_myaccount_tr_checkbox" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[custom_myaccount]" value="yes" <?php if (isset($plugin_options['custom_myaccount']) && ($plugin_options['custom_myaccount'] == "yes")) { echo 'checked'; } ?>>
				            
				
			</td>
		</tr>

		<tr class="override_myaccount_tr" style="<?php if (isset($plugin_options['custom_myaccount']) && ($plugin_options['custom_myaccount'] == "yes")) { echo 'display:table-row'; } else { echo 'display:none;'; } ?>">
			<td>
			</td>
			<td>
                <?php

                $default_value2 = isset($plugin_options['custom_my_account_template']) ? $plugin_options['custom_my_account_template'] : "default";

                ?>


						<select class="myaccount wcmamtx_load_elementor_template" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[custom_my_account_template]">
							<option value="default" <?php if ($default_value2 == "default") { echo 'selected'; } ?>>
								<?php echo esc_html__( 'Default' ,'customize-my-account-for-woocommerce'); ?>
									
							</option>

							<?php if ($default_value2 != "default") { ?>
								<option value="<?php echo $default_value2; ?>" <?php echo 'selected';  ?>>
								     <?php echo get_the_title($default_value2); ?>
							    </option>
							<?php } ?>
							
						</select>
						    <button title="<?php echo esc_html__('Create new template','customize-my-account-for-woocommerce'); ?>" type="button" href="#" data-toggle="modal" data-target="#wcmamtx_example_modal" data-etype="myaccount" id="wcmamtx_add_link" class="btn btn-primary btn-sm wcmamtx_add_group">
				           
				            	<span class="dashicons dashicons-insert"></span>
				            </button>

				          



						<?php if ($default_value2 != "default") { 

                            $elementor_edit_link = ''.admin_url().'post.php?post='.$default_value2.'&action=elementor';

							?>
							<a target="blank" title="<?php echo esc_html__('Edit this template','customize-my-account-for-woocommerce'); ?>" class="btn btn-sm btn-primary" href="<?php echo $elementor_edit_link; ?>">
								<span class="dashicons dashicons-edit"></span>
							</a>
							<a target="blank" title="<?php echo esc_html__('View on frontend','customize-my-account-for-woocommerce'); ?>" class="btn btn-sm btn-primary" href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>">
								<span class="dashicons dashicons-welcome-view-site"></span>
							</a>
						<?php } ?>


			</td>
		</tr>

		<tr>
			<td><label><?php echo esc_html__('Replace endpoint content with Elementor Template','customize-my-account-for-woocommerce'); ?></label> <br />
			</td>
			<td>
				<input type="checkbox" data-toggle="toggle"  data-on="<?php echo esc_html__('Yes','customize-my-account-for-woocommerce'); ?>" data-off="<?php echo esc_html__('No','customize-my-account-for-woocommerce'); ?>" class="override_endpoint_tr_checkbox" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[override_endpoints]" value="yes" <?php if (isset($plugin_options['override_endpoints']) && ($plugin_options['override_endpoints'] == "yes")) { echo 'checked'; } ?>>
				

				          

				            <div class="modal fade" id="wcmamtx_example_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				        	<div class="modal-dialog" role="document">
				        		<div class="modal-content">
				        			
				        			<div class="modal-body">
				        				
				        				<div class="form-group">
				        					<input type="text" class="form-control" id="wcmamtx_modal_label" placeholder="<?php echo esc_html__( 'Enter label' ,'customize-my-account-for-woocommerce'); ?>" value="">
				        					<input type="hidden" class="form-control" nonce="<?php echo wp_create_nonce( 'wcmamtx_nonce_hidden' ); ?>" id="wcmamtx_hidden_endpoint_type" placeholder="<?php echo esc_html__( 'Enter label' ,'customize-my-account-for-woocommerce'); ?>" value="">
				        				</div>
				        				<div class="alert alert-info wcmamtx_enter_label_alert" role="alert" style="display:none;"></div>
				        				<button type="button" class="btn btn-secondary btn-close-modal-button" data-dismiss="modal"><?php echo esc_html__( 'Close' ,'customize-my-account-for-woocommerce'); ?></button>
				        				<button type="submit" class="btn btn-primary wcmamtx_new_template"><?php echo esc_html__( 'Add' ,'customize-my-account-for-woocommerce'); ?>
				        				    	
				        				</button>
				        				
				        			</div>
				        			<div class="modal-footer">
				        				
				        			</div>
				        		</div>
				        	</div>
				        </div>
				
			</td>
		</tr>




		<tr class="override_endpoint_tr" style="<?php if (isset($plugin_options['override_endpoints']) && ($plugin_options['override_endpoints'] == "yes")) { echo 'display:table-row'; } else { echo 'display:none;'; } ?>">
			<td>
			</td>
			<td>


			    <ul class="wcmamtx_elwidget_ul2">
			    <?php

				foreach ($tabs2 as $key=>$value) { 
                    $default_value = isset($plugin_options['custom_templates'][$key]) ? $plugin_options['custom_templates'][$key] : "default";

                    $etype_val     = str_replace(' ', '-', $value);

                    

                    if (!preg_match('/\b'.$key.'\b/', $core_fields )) { 

					?>

					<li>
						<label><?php echo esc_attr($value); ?></label>
						<select class="<?php echo strtolower($etype_val); ?> wcmamtx_load_elementor_template" name="<?php  echo esc_html__($this->wcmamtx_plugin_options_key); ?>[custom_templates][<?php echo $key; ?>]">
							<option value="default" <?php if ($default_value == "default") { echo 'selected'; } ?>>
								<?php echo esc_html__( 'Default' ,'customize-my-account-for-woocommerce'); ?>
									
							</option>

							<?php if ($default_value != "default") { ?>
								<option value="<?php echo $default_value; ?>" <?php echo 'selected';  ?>>
								     <?php echo get_the_title($default_value); ?>
							    </option>
							<?php } ?>
							
						</select>
                        <a type="button" title="<?php echo esc_html__('Create new template','customize-my-account-for-woocommerce'); ?>" href="#" data-toggle="modal" data-target="#wcmamtx_example_modal" data-etype="<?php echo strtolower($etype_val); ?>" id="wcmamtx_add_link" class="">
				            <span class="dashicons dashicons-insert"></span>
				        </a>

				        <?php if ($default_value != "default") { 

                            $elementor_edit_link = ''.admin_url().'post.php?post='.$default_value.'&action=elementor';

							?>
							<a target="blank" title="<?php echo esc_html__('Edit this template','customize-my-account-for-woocommerce'); ?>" href="<?php echo $elementor_edit_link; ?>">
								<span class="dashicons dashicons-edit"></span>
							</a>
							<a target="blank" title="<?php echo esc_html__('View on frontend','customize-my-account-for-woocommerce'); ?>" href="<?php echo wc_get_endpoint_url($key, '', get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>">
								<span class="dashicons dashicons-welcome-view-site"></span>
							</a>
						<?php } ?>
					</li>           

				<?php }
				    }

				?>
			    </ul>
				
			</td>
		</tr>

	

	<?php } else { ?>
		<tr>
			<td>
			</td>
			<td>
				<p><?php echo esc_html__( 'We highly recommend you to use elementor page builder along with our plugin' ,'customize-my-account-for-woocommerce'); ?> &emsp;&emsp;<a target="_blank" type="button" href="https://wordpress.org/plugins/elementor/"  class="btn btn-success wcmamtx_pro_link" >
					<span class="dashicons dashicons-admin-customizer"></span>
					<?php echo esc_html__( 'Install Elementor Free Plugin' ,'customize-my-account-for-woocommerce'); ?>
				</a> </p>
			</td>
		</tr>

	<?php } ?>
</table>
				            <div class="modal fade" id="wcmamtx_example_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				            	<div class="modal-dialog" role="document">
				            		<div class="modal-content">

				            			<div class="modal-body">

				            				<div class="form-group">
				            					<input type="text" class="form-control" id="wcmamtx_modal_label" placeholder="<?php echo esc_html__( 'Enter label' ,'customize-my-account-for-woocommerce'); ?>" value="">
				            					<input type="hidden" class="form-control" nonce="<?php echo wp_create_nonce( 'wcmamtx_nonce_hidden' ); ?>" id="wcmamtx_hidden_endpoint_type" placeholder="<?php echo esc_html__( 'Enter label' ,'customize-my-account-for-woocommerce'); ?>" value="">
				            				</div>
				            				<div class="alert alert-info wcmamtx_enter_label_alert" role="alert" style="display:none;"></div>
				            				<button type="button" class="btn btn-secondary btn-close-modal-button" data-dismiss="modal"><?php echo esc_html__( 'Close' ,'customize-my-account-for-woocommerce'); ?></button>
				            				<button type="submit" class="btn btn-primary wcmamtx_new_template"><?php echo esc_html__( 'Add new template' ,'customize-my-account-for-woocommerce'); ?>

				            			</button>

				            		</div>
				            		<div class="modal-footer">

				            		</div>
				            	    </div>
				                </div>
				            </div>
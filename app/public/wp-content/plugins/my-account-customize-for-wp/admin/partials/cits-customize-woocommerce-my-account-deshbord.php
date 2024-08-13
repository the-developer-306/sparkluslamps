<?php 
if ( ! defined( 'ABSPATH' ) ) exit;
$menuPosition = cits_custom_woo_my_account_table_func("menu_position");
$selectDesign = cits_custom_woo_my_account_table_func("select_design");

if ( isset( $_POST['woo_my_account_dashbord_nonce'] ) &&  wp_verify_nonce( sanitize_text_field( wp_unslash ( $_POST['woo_my_account_dashbord_nonce'] ) ) , 'woo_my_account_dashbord' ) ){
	$select_menu_position 	= sanitize_text_field( $_POST['select_menu_position'] );
	$select_design 			= sanitize_text_field( $_POST['select_design'] );

	if (empty($select_menu_position)) {
		$error = "Menu Position Is Required!";
	}
	elseif (empty($select_design)) {
		$error = "Design Is Required!";
	}
	else{
		global $wpdb;
		$dataId = cits_custom_woo_my_account_table_func("id");
		$table_name = $wpdb->prefix.'cits_custom_woo_my_account';
		$wpdb->update($table_name, array(
		    'menu_position' => $select_menu_position,
		    'select_design' => $select_design,
		), array( 'ID' => $dataId ) );
		$success = "Updated Successfully";
		echo "<script> setTimeout(function(){ location.reload(); }, 2000);</script>";
	};
};?>

<main class="cits-woo-main-options">

	<div class="cits-woo-top-area">
		<ul>
			<li><a href="https://coderitsolution.com/"><img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/logo.svg' ); ?>" alt="Coder IT Solution"></a></li>
			<li><a href="<?php echo esc_url( get_admin_url(null, 'admin.php?page=cits_woocommerce_options') ); ?>"><img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/icon-1.png' ); ?>">Setting</a></li>
			<li><a href="<?php echo esc_url( get_admin_url(null, 'admin.php?page=cits_about') ); ?>"><img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/icon-2.png' ); ?>">About</a></li> 
		</ul>
	</div>
	<div class="cits-woo-content-body cits-woo-content-style">
		<h2>Settings</h2>

		<form method="POST">
			<?php wp_nonce_field( 'woo_my_account_dashbord', 'woo_my_account_dashbord_nonce' ); ?>

			<?php if (isset($success)): ?>
			<div class="success-alart">
				<p><?php echo esc_html( $success ); ?></p>
				<button type="button" class="notice-dismiss main-notice-dismiss"></button>
			</div>
			<?php endif ?>
			<?php if (isset($error)): ?>
			<div class="error-alart">
				<p><?php echo esc_html( $error ); ?></p>
				<button type="button" class="notice-dismiss main-notice-dismiss"></button>
			</div>
			<?php endif ?>
			<div class="form-single-item">
				<h3>Select Menu Position :</h3>
				<div class="radio-buttons">
					<label class="custom-radio">
						<input type="radio" value="left" name="select_menu_position"
							<?php if ($menuPosition === 'left') { echo 'checked' ;} ?>>
						<span class="radio-btn"><img
								src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/check.png' ); ?>"
								alt="icon">
							<div class="hobbies-icon">
								<h3 class="">left</h3>
								<img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/left.svg' ); ?>"
									alt="Img">
							</div>
						</span>
					</label>
					<label class="custom-radio">
						<input type="radio" value="right" name="select_menu_position"
							<?php if ($menuPosition === 'right') { echo 'checked';} ?>>
						<span class="radio-btn"><img
								src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/check.png' ); ?>"
								alt="icon">
							<div class="hobbies-icon">
								<h3 class="">right</h3>
								<img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/right.svg' ); ?>"
									alt="Img">
							</div>
						</span>
					</label>
					<label class="custom-radio">
						<input type="radio" value="horizontal" name="select_menu_position"
							<?php if ($menuPosition === 'horizontal') { echo 'checked' ;} ?>>
						<span class="radio-btn"><img
								src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/check.png' ); ?>"
								alt="icon">
							<div class="hobbies-icon">
								<h3 class="">horizontal</h3>
								<img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/horizontal.svg' ); ?>"
									alt="Img">
							</div>
						</span>
					</label>
				</div>
			</div>
			<div class="form-single-item">
				<h3>Select Design :</h3>
				<div class="radio-buttons">
					<label class="custom-radio">
						<input type="radio" value="default" name="select_design"
							<?php if ($selectDesign === 'default') { echo esc_attr( 'checked' ) ;} ?>>
						<span class="radio-btn"><img
								src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/check.png' ); ?>"
								alt="icon">
							<div class="hobbies-icon">
								<h3 class="">Default</h3>
								<img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/default.svg' ); ?>"
									alt="Img">
							</div>
						</span>
					</label>
					<label class="custom-radio">
						<input type="radio" value="simple_design" name="select_design"
							<?php if ($selectDesign === 'simple_design') { echo esc_attr( 'checked' ) ;} ?>>
						<span class="radio-btn"><img
								src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/check.png' ); ?>"
								alt="icon">
							<div class="hobbies-icon">
								<h3 class="">Simple</h3>
								<img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/simple.svg' ); ?>"
									alt="Img">
							</div>
						</span>
					</label>


					<label class="custom-radio">
						<input type="radio" value="dark_design" name="select_design"
							<?php if ($selectDesign === 'dark_design') { echo esc_attr( 'checked' ) ;} ?>>
						<span class="radio-btn"><img
								src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/check.png' ); ?>"
								alt="icon">
							<div class="hobbies-icon">
								<h3 class="">Dark</h3>
								<img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/dark.svg' ); ?>"
									alt="Img">
							</div>
						</span>
					</label>
					<label class="custom-radio">
						<input type="radio" value="modern_desgin" name="select_design"
							<?php if ($selectDesign === 'modern_desgin') { echo esc_attr( 'checked' ) ;} ?>>
						<span class="radio-btn"><img
								src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/check.png' ); ?>"
								alt="icon">
							<div class="hobbies-icon">
								<h3 class="">Modern</h3>
								<img src="<?php echo esc_attr( CITS_CUSTOMIZE_WOOCOMMERCE_PLUGIN_URL.'admin/images/modern.svg' ); ?>"
									alt="Img">
							</div>
						</span>
					</label>
				</div>
			</div>
			<div class="form-single-item">
				<h3></h3>
				<input class="submit-btn" name="submit_save" type="submit" value="Save">
			</div>
		</form>
	</div>

</main>
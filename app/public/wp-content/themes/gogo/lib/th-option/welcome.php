
<!--- tab first -->
<div class="theme_link">
    <h3><?php _e('1. Install Recommended Plugins','gogo'); ?></h3>
    <p><?php _e('We highly Recommend to install plugin to get all customization options in Gogo theme. Also install recommended plugins available in recommended tab.','gogo'); ?></p>
</div>
<div class="theme_link">
    <h3><?php _e('2. Setup Home Page','gogo'); ?><!-- <php echo $theme_config['plugin_title']; ?> --></h3>
        <p><?php _e('To set up the HomePage in Gogo theme, Just follow the below given Instructions.','gogo'); ?> </p>
<p><?php _e('Go to Wp Dashboard > Pages > Add New > Create a Page using “Home Page Template” available in Page attribute.','gogo'); ?> </p>
<p><?php _e('Now go to Settings > Reading > Your homepage displays > A static page (select below) and set that page as your homepage.','gogo'); ?> </p>
     <p>
        <?php
		if($this->_check_homepage_setup()){
            $class = "activated";
            $btn_text = __("Home Page Activated",'gogo');
            $Bstyle = "display:none;";
            $style = "display:inline-block;";
        }else{
            $class = "default-home";
             $btn_text = __("Set Home Page",'gogo');
             $Bstyle = "display:inline-block;";
            $style = "display:none;";


        }
        ?>
        <button style="<?php echo $Bstyle; ?>"; class="button activate-now <?PHP echo $class; ?>"><?php _e($btn_text,'gogo'); ?></button>
                <a style="<?php echo $style; ?>";  target="_blank" href="<?php echo get_home_url(); ?>" class="button alink button-primary"><?php _e('View Home Page','gogo'); ?></a>

		
         </p>
		 	 
		 
    <p>
        <a target="_blank" href="<?php echo esc_url('https://themehunk.com/docs/gogo-theme/#homepage-setting');?>" class="button"><?php _e('Go to Doc','gogo'); ?></a>
    </p>
</div>

<!--- tab third -->





<!--- tab second -->
<div class="theme_link">
    <h3><?php _e('3. Customize Your Website','gogo'); ?><!-- <php echo $theme_config['plugin_title']; ?> --></h3>
    <p><?php _e('Gogo theme support live customizer for home page set up. Everything visible at home page can be changed through customize panel','gogo'); ?></p>
    <p>
    <a href="<?php echo admin_url('customize.php'); ?>" class="button button-primary"><?php _e("Start Customize","gogo"); ?></a>
    </p>
</div>
<!--- tab third -->

  <div class="theme_link">
    <h3><?php _e("4. Customizer Links","gogo"); ?></h3>
    <div class="card-content">
        <div class="columns">
                <div class="col">
                    <a href="<?php echo admin_url('customize.php?autofocus[control]=custom_logo'); ?>" class="components-button is-link"><?php _e("Upload Logo","gogo"); ?></a>
                    <hr><a href="<?php echo admin_url('customize.php?autofocus[section]=static_front_page'); ?>" class="components-button is-link"><?php _e("Homepage Settings","gogo"); ?></a><hr>
                    <a href="<?php echo admin_url('customize.php?autofocus[panel]=woocommerce'); ?>" class="components-button is-link"><?php _e("Woocommerce","gogo"); ?></a><hr>

                </div>

               <div class="col">

                <a href="<?php echo admin_url('customize.php?autofocus[panel]=nav_menus'); ?>" class="components-button is-link"><?php _e("Menus","gogo"); ?></a><hr>

                <a href="<?php echo admin_url('customize.php?autofocus[section]=custom_css'); ?>" class="components-button is-link"><?php _e("Additional CSS","gogo"); ?></a>
                <hr>


                 <a href="<?php echo admin_url('customize.php?autofocus[panel]=widgets'); ?>" class="components-button is-link"><?php _e("Widgets","gogo"); ?></a><hr>
            </div>

        </div>
    </div>

</div>
<!--- tab fourth -->
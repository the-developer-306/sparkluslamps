<div class="wrap-th about-wrap-th theme_info_wrapper">
    <div class="header">

        <!-- themehunkhemes-badge wp-badge-->
<div class="th-option-area">
        <div class="th-option-top-hdr">
            <div class="col-1">
                <div class="logo-img">
                <a target="_blank" href="<?php echo $theme_header['theme_brand_url']; ?>/?wp=gogo" class=""> <span class="logo-image"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/lib/th-option/assets/images/icon.png"/><?php echo $theme_header['theme_brand']; ?></span></a>
            </div>
            </div>
            <div class="col-2">
                <div class="th-option-heading">
                    <h2><?php  echo $theme_header['welcome']; ?></h2>
                    <span><?php echo $theme_header['welcome_desc']; ?></span>
                </div>
                <span class="version"><?php echo $theme_header['v']; ?></span>
                <span><?php echo _e('FREE THEME','gogo'); ?></span>
            </div>
        </div>
        <div class="th-option-bottom-hdr">
            <a class="tablinks active" onclick="openTab(event, 'Welcome')"><?php _e('Welcome','gogo');?></a>

            <a class="tablinks" onclick="openTab(event, 'Import-Demo-Content')"><?php _e('Demo Import','gogo');?> </a>
            <a class="tablinks" onclick="openTab(event, 'Recommended-Plugin')"><?php _e('Recommended Plugin','gogo');?> </a>
            
            <a class="tablinks get-child" onclick="openTab(event, 'Get-Child-Theme')"><?php _e('Get Child Theme','gogo');?></a>
            <a class="tablinks" onclick="openTab(event, 'Free-Vs-Pro')"><?php _e('Free Vs Pro','gogo');?></a>
            <a class="tablinks" onclick="openTab(event, 'Help')"><?php _e('Help','gogo');?></a>

        </div>
    </div>

    </div> <!-- /header -->




    </div>

<div class="content-wrap">
    <div class="main">

<div class="tab-left" >

        

        <!-- Tab content -->
        <div id="Welcome" class="tabcontent active">
            <div class="rp-two-column welcome-tabs">
        <?php include('welcome.php' ); ?>

            </div> <!-- close twocolumn -->
        </div>


          <div id="Import-Demo-Content" class="tabcontent">

            <div class="rp-two-column">

                <div class="rcp theme_link th-row import-demo">
                    <div class="import-image">
                        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/lib/th-option/assets/images/import.gif">
                    </div>
                <div class="title-plugin">
                <h3><?php _e('Click Here To Import Demo','gogo'); ?></h3>
				 
				 <p> <?php _e('Click the below button and import  homepage. You will need to install the Hunk Companion plugin for properly working sections on the homepage.', 'gogo'); ?></p>

                 <!---
              <a class="button disabled importdemo"><?php //_e( 'Setup Home Page', 'gogo' ); ?></a> -->


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
        <a style="<?php echo $style; ?>"; class="button alink disabled importdemo"><?php _e('Import Demo','gogo'); ?></a>
         </p>
             </div>
             </div>
                <?php $this->plugin_install('import-demo-content'); ?>
            </div>
        </div>

        <div id="Recommended-Plugin" class="tabcontent">
            <div class="rp-two-column">
            <?php $this->plugin_install(); ?>
            </div>
        </div>


            <div id="Free-Vs-Pro" class="tabcontent">
                <div class="rp-two-column">
                    <?php include('free-pro.php' ); ?>

                </div>
            </div>


            <div id="Get-Child-Theme" class="tabcontent">
                <div class="rp-two-column">
                    <?php require_once( trailingslashit( get_template_directory() ) . 'lib/th-option/get-child-theme.php'); ?>


                </div>
            </div>

    <div id="Help" class="tabcontent">
        <div class="rp-two-column">
                    <?php include('need-help.php' ); ?>

        </div>
    </div>


</div> <!-- tab div close -->



<div class="sidebar-wrap">
    <div class="sidebar">
    <?php include('sidebar.php' ); ?>
    </div>
</div>


</div>
</div>
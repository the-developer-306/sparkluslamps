<?php


if (!class_exists('wcmamtx_add_frontend_customizer')) {

   class wcmamtx_add_frontend_customizer {

     public function __construct() {


      add_action('customize_register',array($this,'mytheme_customizer_options'));

      
      
      add_action( 'customize_preview_init', array($this,'wcmamtx_load_assets') );
      

      add_action( 'wp_ajax_restore_customizer_settings', array( $this, 'restore_customizer_settings' ) );
      

   }








    public function wcmamtx_load_assets() {
       

      if (current_user_can('administrator') || current_user_can('shop_manager') ) {

          

          

            $wcmamtx_js_array2 = array(
                
                'restorealert'         => esc_html__( 'Are you sure you want to restore to default settings.You can not undo this.' ,'customize-my-account-for-woocommerce'),
                
                
            );

            wp_localize_script( 'wcmamtx_customizer', 'wcmamtx_customizer', $wcmamtx_js_array2 );

            wp_enqueue_script( 'wcmamtx_customizer', ''.wcmamtx_PLUGIN_URL.'assets/js/customizer.js',array( 'jquery','customize-my-account-for-woocommerce' ),'',true);

      }
        
    }

    public function mytheme_customizer_options($wp_customize) {
       $wp_customize->add_setting(
      'wsmt_nav_background', //give it an ID
         array(
            'default' => '', // Give it a default
         )
       );

        $wp_customize->add_setting(
      'wsmt_nav_color', //give it an ID
         array(
            'default' => '', // Give it a default
         )
       );


       $wp_customize->add_setting(
      'wsmt_li_background', //give it an ID
         array(
            'default' => 'nothing', // Give it a default
         )
       );

       $wp_customize->add_setting(
      'wsmt_li_fontsize', //give it an ID
         array(
            'default' => '16px', // Give it a default
         )
       );

       $wp_customize->add_setting(
      'wsmt_li_padding', //give it an ID
         array(
            'default' => '0px', // Give it a default
         )
       );

       $wp_customize->add_control('wsmt_nav_background',array(
           'label' => __( 'Color', 'customize-my-account-for-woocommerce' ),
           'section' => 'wcmamtx_customizer',
           'priority' => 40,
           'settings'   => 'wsmt_nav_background'
      ));

       $wp_customize->add_control('wsmt_li_background',array(
           'label' => __( 'Color', 'customize-my-account-for-woocommerce' ),
           'section' => 'wcmamtx_customizer',
           'priority' => 40,
           'settings'   => 'wsmt_li_background'
      ));


       $wp_customize->add_control('wsmt_nav_color',array(
           'label' => __( 'Color', 'customize-my-account-for-woocommerce' ),
           'section' => 'wcmamtx_customizer',
           'priority' => 40,
           'settings'   => 'wsmt_nav_color'
      ));

      $wp_customize->add_control( new WP_Customize_Control(
        $wp_customize,
        'wsmt_li_fontsize',
        array(
            'label'          => __( 'Font Size', 'customize-my-account-for-woocommerce' ),
            'section'        => 'wcmamtx_customizer',
            'settings'       => 'wsmt_li_fontsize',
            'type' => 'range',
            'input_attrs' => array(
                'min' => 8,
                'max' => 30,
                // 'step' => 2,
              )
        )
      ));

      $wp_customize->add_control( new WP_Customize_Control(
        $wp_customize,
        'wsmt_li_padding',
        array(
            'label'          => __( 'Padding From Left', 'customize-my-account-for-woocommerce' ),
            'section'        => 'wcmamtx_customizer',
            'settings'       => 'wsmt_li_padding',
            'type' => 'range',
            'input_attrs' => array(
                'min' => 0,
                'max' => 10,
                // 'step' => 2,
              )
        )
      ));

       
       

      //Section
      $wp_customize->add_section(
            'wcmamtx_customizer',
            array(
                'title' => __( 'My Account Customizer', 'customize-my-account-for-woocommerce' ),
                'priority' => 30,
                'description' => __( 'Customize your My Account Page.', 'customize-my-account-for-woocommerce' ),
                'capability' => 'edit_theme_options',
            )
      );
       $wp_customize->add_control(
            new WP_Customize_Color_Control(
               $wp_customize,
              'wsmt_nav_background', //give it an ID
               array(
                  'label'      => __( 'Navigation Background', 'customize-my-account-for-woocommerce' ), //set the label to appear in the Customizer
                  'section'    => 'wcmamtx_customizer', //select the section for it to appear under  
                  'settings'   => 'wsmt_nav_background' //pick the setting it applies to
               )
            )
       );

       $wp_customize->add_control(
            new WP_Customize_Color_Control(
               $wp_customize,
              'wsmt_nav_color', //give it an ID
               array(
                  'label'      => __( 'Text Color', 'customize-my-account-for-woocommerce' ), //set the label to appear in the Customizer
                  'section'    => 'wcmamtx_customizer', //select the section for it to appear under  
                  'settings'   => 'wsmt_nav_color' //pick the setting it applies to
               )
            )
       );

       $wp_customize->add_control(
            new WP_Customize_Color_Control(
               $wp_customize,
              'wsmt_li_background', //give it an ID
               array(
                  'label'      => __( 'Each Menu Background', 'customize-my-account-for-woocommerce' ), //set the label to appear in the Customizer
                  'section'    => 'wcmamtx_customizer', //select the section for it to appear under  
                  'settings'   => 'wsmt_li_background' //pick the setting it applies to
               )
            )
       );

       
    }

 }
}

new wcmamtx_add_frontend_customizer();


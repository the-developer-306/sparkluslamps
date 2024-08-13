<?php
/**
 *Blog Option
* @package Themehunk
 * @subpackage gogo
 * @since      1.0.0
 */
/********************/
// Blog layout
/********************/
if(class_exists('Gogo_WP_Customize_Control_Radio_Image')){
        $wp_customize->add_setting(
            'gogo_blog_layout', array(
                'default'           => 'gogo-blog-layout-1',
                'sanitize_callback' => 'gogo_sanitize_radio',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customize_Control_Radio_Image(
                $wp_customize, 'gogo_blog_layout', array(
                    'label'    => esc_html__( 'Blog Layout', 'gogo' ),
                    'section'  => 'gogo-blog-archive',
                    'choices'  => array(   
                        'gogo-blog-layout-1' => array(
                            'url' => GOGO_BLOG_ARCHIVE_LAYOUT_1,
                        ),
                        
                    ),
                )
            )
        );
    } 
    /*********************/
    //Grid-layout
    /*********************/
    $wp_customize->add_setting('gogo_blog_grid_layout', array(
        'default'          =>'gogo-one-colm',
        'capability'       =>'edit_theme_options',
        'sanitize_callback'=>'gogo_sanitize_select',
    ));
    $wp_customize->add_control('gogo_blog_grid_layout', array(
        'settings'=> 'gogo_blog_grid_layout',
        'label'   => __('Grid Layout','gogo'),
        'section' => 'gogo-blog-archive',
        'type'    => 'select',
        'choices' => array(
        'gogo-one-colm'     => __('One Column','gogo'),
        'gogo-two-colm'     => __('Two Column','gogo'),
        'gogo-three-colm'   => __('Three Column','gogo'),
        'gogo-four-colm'    => __('Four Column','gogo'), 
        ),
    ));
    // Highlight first image
    $wp_customize->add_setting( 'gogo_blog_highlight', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_blog_highlight', array(
                'label'       => esc_html__('Make First Post Large', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-archive',
                'settings'    => 'gogo_blog_highlight',
            ) ) );
    
    // add Space b/w post
    $wp_customize->add_setting( 'gogo_blog_add_space', array(
                'default'           => true,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_blog_add_space', array(
                'label'       => esc_html__('Add Space Between Post', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-archive',
                'settings'    => 'gogo_blog_add_space',
            ) ) );
    // add Space b/w post
    $wp_customize->add_setting( 'gogo_blog_img_rmv_space', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_blog_img_rmv_space', array(
                'label'       => esc_html__('Remove Featured Image Space
','gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-archive',
                'settings'    => 'gogo_blog_img_rmv_space',
            ) ) );
    //date box
    $wp_customize->add_setting( 'gogo_date_box', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_date_box', array(
                'label'       => esc_html__('Enable Date Box', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-archive',
                'settings'    => 'gogo_date_box',
            ) ) );
    // Date box style
    $wp_customize->add_setting('gogo_datebox_style', array(
        'default'        => 'square',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
    $wp_customize->add_control('gogo_datebox_style', array(
        'settings' => 'gogo_datebox_style',
        'label'   => __('Blog Date','gogo'),
        'section' => 'gogo-blog-archive',
        'type'    => 'select',
        'choices'    => array(
        'square'   => __('Square','gogo'),
        'circle' => __('Circle','gogo'), 
        'diamond' => __('Diamond','gogo'), 
        ),
    ));
    //enable dropcap
    $wp_customize->add_setting( 'gogo_blog_dropcap', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_blog_dropcap', array(
                'label'       => esc_html__('Enable Drop Cap', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-archive',
                'settings'    => 'gogo_blog_dropcap',
            ) ) );
    /*******************/
    //blog post content
    /*******************/
    $wp_customize->add_setting('gogo_blog_post_content', array(
        'default'        => 'excerpt',
        'capability'     => 'edit_theme_options',
        'sanitize_callback' => 'gogo_sanitize_select',
    ));
    $wp_customize->add_control('gogo_blog_post_content', array(
        'settings' => 'gogo_blog_post_content',
        'label'   => __('Blog Post Content','gogo'),
        'section' => 'gogo-blog-archive',
        'type'    => 'select',
        'choices'    => array(
        'full'   => __('Full Content','gogo'),
        'excerpt' => __('Excerpt Content','gogo'), 
        'nocontent' => __('No Content','gogo'), 
        ),
    ));
    // excerpt length
    $wp_customize->add_setting('gogo_blog_expt_length', array(
			'default'           =>'30',
            'capability'        => 'edit_theme_options',
			'sanitize_callback' =>'gogo_sanitize_number',
		)
	);
	$wp_customize->add_control('gogo_blog_expt_length', array(
			'type'        => 'number',
			'section'     => 'gogo-blog-archive',
			'label'       => __( 'Excerpt Length', 'gogo' ),
			'input_attrs' => array(
				'min'  => 0,
				'step' => 1,
				'max'  => 3000,
			),
		)
	);
	// read more text
    $wp_customize->add_setting('gogo_blog_read_more_txt', array(
			'default'           =>'Read More',
            'capability'        => 'edit_theme_options',
			'sanitize_callback' =>'gogo_sanitize_text',
            'transport'         => 'postMessage',
		)
	);
	$wp_customize->add_control('gogo_blog_read_more_txt', array(
			'type'        => 'text',
			'section'     => 'gogo-blog-archive',
			'label'       => __( 'Read More Text', 'gogo' ),
			'settings' => 'gogo_blog_read_more_txt',
			
		)
	);
	// display read more as a button
    $wp_customize->add_setting( 'gogo_main_read_more_btn', array(
                'default'           => false,
                'sanitize_callback' => 'gogo_sanitize_checkbox',
            ) );
    $wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'gogo_main_read_more_btn', array(
                'label'       => esc_html__('Display Read More as Button', 'gogo'),
                'type'        => 'checkbox',
                'section'     => 'gogo-blog-archive',
                'settings'    => 'gogo_main_read_more_btn',
            ) ) );
    /*********************/
    //blog post pagination
    /*********************/
    $wp_customize->add_setting('gogo_blog_post_pagination', array(
        'default'          =>'num',
        'capability'       =>'edit_theme_options',
        'sanitize_callback'=>'gogo_sanitize_select',
    ));
    $wp_customize->add_control('gogo_blog_post_pagination', array(
        'settings'=> 'gogo_blog_post_pagination',
        'label'   => __('Post Pagination','gogo'),
        'section' => 'gogo-blog-archive',
        'type'    => 'select',
        'choices' => array(
        'num'     => __('Numbered','gogo'),
        'click'   => __('Load More','gogo'), 
        'scroll'  => __('Infinite Scroll','gogo'), 
        ),
    ));
    //load more text
    $wp_customize->add_setting('gogo_load_more_txt', array(
            'default'           =>'More Posts',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' =>'gogo_sanitize_text',
        )
    );
    $wp_customize->add_control('gogo_load_more_txt', array(
            'type'        => 'text',
            'section'     => 'gogo-blog-archive',
            'label'       => __( 'Load More Text', 'gogo' ),
            'settings' => 'gogo_load_more_txt',
            
        )
    );
    //blog title & meta ordering
     $wp_customize->add_setting(
        GOGO_THEME_SETTINGS . '[gogo-blog-structure-meta]', array(
            'default'           =>gogo_get_option('gogo-blog-structure-meta'),
            'type'              => 'option',
            'sanitize_callback' => 'gogo_sanitize_multi_choices',
        )
    );
    $wp_customize->add_control(
        new Gogo_Control_Sortable(
            $wp_customize, GOGO_THEME_SETTINGS . '[gogo-blog-structure-meta]', array(
                'type'     => 'zta-sortable',
                'section'  => 'gogo-blog-archive',
                'label'    => __( 'Blog Structure', 'gogo' ),
                'choices'  => array(
                    'image'  => __( 'Featured Image', 'gogo' ),
                    'title'  => __( 'Post Title & Meta', 'gogo' ),  
                ),
            )
        )
    );
    //blog meta odering
     $wp_customize->add_setting(
        GOGO_THEME_SETTINGS . '[gogo-blog-meta]', array(
            'default'           =>gogo_get_option('gogo-blog-meta'),
            'type'              => 'option',
            'sanitize_callback' => 'gogo_sanitize_multi_choices',
        )
    );
    $wp_customize->add_control(
        new Gogo_Control_Sortable(
            $wp_customize, GOGO_THEME_SETTINGS . '[gogo-blog-meta]', array(
                'type'     => 'zta-sortable',
                'section'  => 'gogo-blog-archive',
                'label'    => __( 'Blog Meta', 'gogo' ),
                'choices'  => array(
                    'comments'  => __( 'Comments', 'gogo' ),
                    'category'  => __( 'Category', 'gogo' ),
                    'author'    => __( 'Author', 'gogo' ),
                    'date'      => __( 'Publish Date', 'gogo' ),
                ),
            )
        )
    );
    //post meta seprator
    $wp_customize->add_setting('gogo_blog_meta_seprator', array(
            'default'           =>'/',
            'capability'        => 'edit_theme_options',
            'sanitize_callback' =>'gogo_sanitize_text',
        )
    );
    $wp_customize->add_control('gogo_blog_meta_seprator', array(
            'type'        => 'text',
            'section'     => 'gogo-blog-archive',
            'label'       => __( 'Post Meta Separator', 'gogo' ),
            'settings' => 'gogo_blog_meta_seprator',
            
        )
    );
    /*********************/
    //blog content width
    /*********************/
    $wp_customize->add_setting('gogo_blog_content_width', array(
        'default'          =>'defualt',
        'capability'       =>'edit_theme_options',
        'sanitize_callback'=>'esc_attr',
    ));
    $wp_customize->add_control('gogo_blog_content_width', array(
        'settings'=> 'gogo_blog_content_width',
        'label'   => __('Blog Content Width','gogo'),
        'section' => 'gogo-blog-archive',
        'type'    => 'select',
        'choices' => array(
        'defualt'    => __('Default','gogo'),
        'custom' => __('Custom','gogo'), 
        ),
    ));
    if ( class_exists( 'Gogo_WP_Customizer_Range_Value_Control' ) ){
$wp_customize->add_setting(
            'gogo_blog_cnt_widht', array(
                'sanitize_callback' => 'gogo_sanitize_range_value',
                'default'           => '1200',
                'transport'         => 'postMessage',
            )
        );
$wp_customize->add_control(
            new Gogo_WP_Customizer_Range_Value_Control(
                $wp_customize, 'gogo_blog_cnt_widht', array(
                    'label'       => esc_html__( 'Enter Width in px', 'gogo' ),
                    'section'     => 'gogo-blog-archive',
                    'type'        => 'range-value',
                    'input_attr'  => array(
                        'min'  => 768,
                        'max'  => 1920,
                        'step' => 1,
                    ),
                )
        )
);
}
/****************/
//doc link
/****************/
$wp_customize->add_setting('gogo_blog_archv_doc_learn_more', array(
    'sanitize_callback' => 'gogo_sanitize_text',
    ));
$wp_customize->add_control(new Gogo_Misc_Control( $wp_customize, 'gogo_blog_archv_doc_learn_more',
            array(
        'section'     => 'gogo-blog-archive',
        'type'        => 'custom_message',
        'description' => sprintf( wp_kses(__( 'To know more Go with this <a target="_blank" href="%s">Doc</a> !', 'gogo' ), array(  'a' => array( 'href' => array(),'target' => array() ) ) ), esc_url('https://themehunk.com/docs/gogo-theme/#blog-archive')),
         'priority'   =>50,
)));
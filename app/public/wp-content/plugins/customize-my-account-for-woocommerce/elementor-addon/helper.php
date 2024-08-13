<?php 
namespace Elementor;

function category_elementor_init(){
    Plugin::instance()->elements_manager->add_category(
        'customize-my-account',
        [
            'title'  => 'Customize My Account ',
            'icon' => 'eicon-my-account'
        ],
        1
    );
}
add_action('elementor/init', 'Elementor\category_elementor_init');
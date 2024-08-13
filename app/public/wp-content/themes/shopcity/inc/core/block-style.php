<?php

/**
 * Block Styles
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_style/
 *
 * @package shopcity
 * @since 1.0.0
 */

if (function_exists('register_block_style')) {
    /**
     * Register block styles.
     *
     * @since 0.1
     *
     * @return void
     */
    function hello_agency_register_block_styles()
    {
        register_block_style(
            'core/columns',
            array(
                'name'  => 'shopcity-boxshadow',
                'label' => __('Box Shadow', 'shopcity')
            )
        );

        register_block_style(
            'core/column',
            array(
                'name'  => 'shopcity-boxshadow',
                'label' => __('Box Shadow', 'shopcity')
            )
        );
        register_block_style(
            'core/column',
            array(
                'name'  => 'shopcity-boxshadow-medium',
                'label' => __('Box Shadow Medium', 'shopcity')
            )
        );
        register_block_style(
            'core/column',
            array(
                'name'  => 'shopcity-boxshadow-large',
                'label' => __('Box Shadow Large', 'shopcity')
            )
        );

        register_block_style(
            'core/group',
            array(
                'name'  => 'shopcity-boxshadow',
                'label' => __('Box Shadow', 'shopcity')
            )
        );
        register_block_style(
            'core/group',
            array(
                'name'  => 'shopcity-boxshadow-medium',
                'label' => __('Box Shadow Medium', 'shopcity')
            )
        );
        register_block_style(
            'core/group',
            array(
                'name'  => 'shopcity-boxshadow-large',
                'label' => __('Box Shadow Larger', 'shopcity')
            )
        );
        register_block_style(
            'core/image',
            array(
                'name'  => 'shopcity-boxshadow',
                'label' => __('Box Shadow', 'shopcity')
            )
        );
        register_block_style(
            'core/image',
            array(
                'name'  => 'shopcity-boxshadow-medium',
                'label' => __('Box Shadow Medium', 'shopcity')
            )
        );
        register_block_style(
            'core/image',
            array(
                'name'  => 'shopcity-boxshadow-larger',
                'label' => __('Box Shadow Large', 'shopcity')
            )
        );
        register_block_style(
            'core/image',
            array(
                'name'  => 'shopcity-image-pulse',
                'label' => __('Iamge Pulse Effect', 'shopcity')
            )
        );
        register_block_style(
            'core/image',
            array(
                'name'  => 'shopcity-boxshadow-hover',
                'label' => __('Box Shadow on Hover', 'shopcity')
            )
        );
        register_block_style(
            'core/image',
            array(
                'name'  => 'shopcity-image-hover-pulse',
                'label' => __('Hover Pulse Effect', 'shopcity')
            )
        );
        register_block_style(
            'core/image',
            array(
                'name'  => 'shopcity-image-hover-rotate',
                'label' => __('Hover Rotate Effect', 'shopcity')
            )
        );
        register_block_style(
            'core/columns',
            array(
                'name'  => 'shopcity-boxshadow-hover',
                'label' => __('Box Shadow on Hover', 'shopcity')
            )
        );

        register_block_style(
            'core/column',
            array(
                'name'  => 'shopcity-boxshadow-hover',
                'label' => __('Box Shadow on Hover', 'shopcity')
            )
        );

        register_block_style(
            'core/group',
            array(
                'name'  => 'shopcity-boxshadow-hover',
                'label' => __('Box Shadow on Hover', 'shopcity')
            )
        );

        register_block_style(
            'core/post-terms',
            array(
                'name'  => 'categories-background-with-round',
                'label' => __('Background Color', 'shopcity')
            )
        );
        register_block_style(
            'core/button',
            array(
                'name'  => 'button-hover-primary-color',
                'label' => __('Hover: Primary Color', 'shopcity')
            )
        );
        register_block_style(
            'core/button',
            array(
                'name'  => 'button-hover-secondary-color',
                'label' => __('Hover: Secondary Color', 'shopcity')
            )
        );
        register_block_style(
            'core/button',
            array(
                'name'  => 'button-hover-primary-bgcolor',
                'label' => __('Hover: Primary color fill', 'shopcity')
            )
        );
        register_block_style(
            'core/button',
            array(
                'name'  => 'button-hover-secondary-bgcolor',
                'label' => __('Hover: Secondary color fill', 'shopcity')
            )
        );
        register_block_style(
            'core/button',
            array(
                'name'  => 'button-hover-white-bgcolor',
                'label' => __('Hover: White color fill', 'shopcity')
            )
        );

        register_block_style(
            'core/read-more',
            array(
                'name'  => 'readmore-hover-primary-color',
                'label' => __('Hover: Primary Color', 'shopcity')
            )
        );
        register_block_style(
            'core/read-more',
            array(
                'name'  => 'readmore-hover-secondary-color',
                'label' => __('Hover: Secondary Color', 'shopcity')
            )
        );
        register_block_style(
            'core/read-more',
            array(
                'name'  => 'readmore-hover-primary-fill',
                'label' => __('Hover: Primary Fill', 'shopcity')
            )
        );
        register_block_style(
            'core/read-more',
            array(
                'name'  => 'readmore-hover-secondary-fill',
                'label' => __('Hover: secondary Fill', 'shopcity')
            )
        );

        register_block_style(
            'core/list',
            array(
                'name'  => 'list-style-no-bullet',
                'label' => __('Hide bullet', 'shopcity')
            )
        );
        register_block_style(
            'core/gallery',
            array(
                'name'  => 'enable-grayscale-mode-on-image',
                'label' => __('Enable Grayscale Mode on Image', 'shopcity')
            )
        );
        register_block_style(
            'core/social-links',
            array(
                'name'  => 'social-icon-size-small',
                'label' => __('Small Size', 'shopcity')
            )
        );
        register_block_style(
            'core/social-links',
            array(
                'name'  => 'social-icon-size-large',
                'label' => __('Large Size', 'shopcity')
            )
        );
        register_block_style(
            'core/page-list',
            array(
                'name'  => 'shopcity-page-list-bullet-hide-style',
                'label' => __('Hide Bullet Style', 'shopcity')
            )
        );
        register_block_style(
            'core/page-list',
            array(
                'name'  => 'shopcity-page-list-bullet-hide-style-white-color',
                'label' => __('Hide Bullet Style with White Text Color', 'shopcity')
            )
        );
        register_block_style(
            'core/categories',
            array(
                'name'  => 'shopcity-categories-bullet-hide-style',
                'label' => __('Hide Bullet Style', 'shopcity')
            )
        );
        register_block_style(
            'core/categories',
            array(
                'name'  => 'shopcity-categories-bullet-hide-style-white-color',
                'label' => __('Hide Bullet Style with Text color White', 'shopcity')
            )
        );
    }
    add_action('init', 'hello_agency_register_block_styles');
}

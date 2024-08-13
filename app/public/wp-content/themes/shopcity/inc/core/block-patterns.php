<?php

/**
 * shopcity: Block Patterns
 *
 * @since shopcity 1.0.0
 */

/**
 * Registers pattern categories for shopcity
 *
 * @since shopcity 1.0.0
 *
 * @return void
 */
function shopcity_register_pattern_category()
{
	$block_pattern_categories = array(
		'shopcity' => array('label' => __('Shopcity Patterns', 'shopcity')),
		'shopcity-templates' => array('label' => __('Shopcity Home Templates', 'shopcity'))
	);

	$block_pattern_categories = apply_filters('shopcity_block_pattern_categories', $block_pattern_categories);

	foreach ($block_pattern_categories as $name => $properties) {
		if (!WP_Block_Pattern_Categories_Registry::get_instance()->is_registered($name)) {
			register_block_pattern_category($name, $properties); // phpcs:ignore WPThemeReview.PluginTerritory.ForbiddenFunctions.editor_blocks_register_block_pattern_category
		}
	}
}
add_action('init', 'shopcity_register_pattern_category', 9);

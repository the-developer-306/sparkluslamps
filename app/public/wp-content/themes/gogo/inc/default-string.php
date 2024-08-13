<?php
/**
 * Gogo Theme Strings
 * @package Themehunk
 * @subpackage gogo
 * @since 1.0
 */
/**
 * Default Strings
 */
if ( ! function_exists( 'gogo_default_strings' ) ) {

	/**
	 * Default Strings
	 *
	 * @since 1.0.0
	 * @param  string  $key  String key.
	 * @param  boolean $echo Print string.
	 * @return mixed        Return string or nothing.
	 */
	function gogo_default_strings( $key, $echo = true ) {

		$defaults = apply_filters(
			'gogo_default_strings', array(

				// Header.
				'string-header-skip-link'                => __( 'Skip to content', 'gogo' ),

				// 404 Page Strings.
				'string-404-sub-title'                   => __( 'It looks like the link pointing here was faulty. Maybe try searching?', 'gogo' ),

				// Search Page Strings.
				'string-search-nothing-found'            => __( 'Nothing Found', 'gogo' ),
				'string-search-nothing-found-message'    => __( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'gogo' ),
				'string-full-width-search-message'       => __( 'Start typing and press enter to search', 'gogo' ),
				'string-full-width-search-placeholder'   => __( 'Start Typing&hellip;', 'gogo' ),
				'string-header-cover-search-placeholder' => __( 'Start Typing&hellip;', 'gogo' ),
				'string-search-input-placeholder'        => __( 'Search &hellip;', 'gogo' ),

				// Comment Template Strings.
				'string-comment-reply-link'              => __( 'Reply', 'gogo' ),
				'string-comment-edit-link'               => __( 'Edit', 'gogo' ),
				'string-comment-awaiting-moderation'     => __( 'Your comment is awaiting moderation.', 'gogo' ),
				'string-comment-title-reply'             => __( 'Leave a Comment', 'gogo' ),
				'string-comment-cancel-reply-link'       => __( 'Cancel Reply', 'gogo' ),
				'string-comment-label-submit'            => __( 'Post Comment &raquo;', 'gogo' ),
				'string-comment-label-message'           => __( 'Type here..', 'gogo' ),
				'string-comment-label-name'              => __( 'Name*', 'gogo' ),
				'string-comment-label-email'             => __( 'Email*', 'gogo' ),
				'string-comment-label-website'           => __( 'Website', 'gogo' ),
				'string-comment-closed'                  => __( 'Comments are closed.', 'gogo' ),
				'string-comment-navigation-title'        => __( 'Comment navigation', 'gogo' ),
				'string-comment-navigation-next'         => __( 'Newer Comments', 'gogo' ),
				'string-comment-navigation-previous'     => __( 'Older Comments', 'gogo' ),

				// Blog Default Strings.
				'string-blog-page-links-before'          => __( 'Pages:', 'gogo' ),
				'string-blog-meta-author-by'             => __( 'By ', 'gogo' ),
				'string-blog-meta-leave-a-comment'       => __( 'Leave a Comment', 'gogo' ),
				'string-blog-meta-one-comment'           => __( '1 Comment', 'gogo' ),
				'string-blog-meta-multiple-comment'      => __( '% Comments', 'gogo' ),
				'string-blog-navigation-next'            => __( 'Next Page', 'gogo' ) . ' <span class="ast-right-arrow">&rarr;</span>',
				'string-blog-navigation-previous'        => '<span class="ast-left-arrow">&larr;</span> ' . __( 'Previous Page', 'gogo' ),

				// Single Post Default Strings.
				'string-single-page-links-before'        => __( 'Pages:', 'gogo' ),
				/* translators: 1: Post type label */
				'string-single-navigation-next'          => __( 'Next %s', 'gogo' ) . ' <span class="ast-right-arrow">&rarr;</span>',
				/* translators: 1: Post type label */
				'string-single-navigation-previous'      => '<span class="ast-left-arrow">&larr;</span> ' . __( 'Previous %s', 'gogo' ),

				// Content None.
				'string-content-nothing-found-message'   => __( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'gogo' ),

			)
		);

		if ( is_rtl() ) {
			$defaults['string-blog-navigation-next']     = __( 'Next Page', 'gogo' ) . ' <span class="ast-left-arrow">&larr;</span>';
			$defaults['string-blog-navigation-previous'] = '<span class="ast-right-arrow">&rarr;</span> ' . __( 'Previous Page', 'gogo' );

			/* translators: 1: Post type label */
			$defaults['string-single-navigation-next'] = __( 'Next %s', 'gogo' ) . ' <span class="ast-left-arrow">&larr;</span>';
			/* translators: 1: Post type label */
			$defaults['string-single-navigation-previous'] = '<span class="ast-right-arrow">&rarr;</span> ' . __( 'Previous %s', 'gogo' );
		}

		$output = isset( $defaults[ $key ] ) ? $defaults[ $key ] : '';

		/**
		 * Print or return
		 */
		if ( $echo ) {
			echo esc_html($output);
		} else {
			return $output;
		}
	}
}

<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function gutenberg_pop_up_block_assets() {
	wp_enqueue_script(
		'gutenberg_pop_up-block-bootstrap-js',
		plugins_url( '/bootstrap-modal.min.js', dirname( __FILE__ ) ), 
		array( 'wp-blocks', 'wp-i18n', 'wp-element' )
	);
	wp_enqueue_script(
		'block-party-pop-up-velocity',
		"//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js",
		array( 'jquery' )
	);
	wp_enqueue_script(
		'block-party-pop-up-velocity-ui',
		"//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js",
		array( 'jquery', 'block-party-pop-up-velocity' )
	);
	wp_enqueue_script(
		'block-party-pop-up-animations',
		plugins_url( '/animations.js', dirname(__FILE__) ),
		array( 'jquery', 'block-party-pop-up-velocity', 'block-party-pop-up-velocity-ui' )
	);
	wp_enqueue_style(
		'gutenberg_pop_up-block-editor-bootstrap-css',
		plugins_url( 'bootstrap-modal.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ) 
	);
} 

add_action( 'enqueue_block_assets', 'gutenberg_pop_up_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function gutenberg_pop_up_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'block-party-pop-up-velocity',
		"//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js",
		array( 'jquery' )
	);
	wp_enqueue_script(
		'block-party-pop-up-velocity-ui',
		"//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js",
		array( 'jquery', 'block-party-pop-up-velocity' )
	);
	wp_enqueue_script(
		'gutenberg_pop_up-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) 
	);
} 

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'gutenberg_pop_up_editor_assets' );

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

/**
 * Render the Pop Up block
 *
 * @param array $attributes
 * @return string
 */
function renderPopUpBlock( $attributes, $content ) {
	
	$buttonStyle = "background-color: " . $attributes['buttonColor'] ."; color: " . $attributes['buttonTextColor'];

	$output = "<div class='" . $attributes['className'] . "' style='display: flex; justify-content: " . $attributes['align'] . "'>";
				
	$output .= "<p><button style='$buttonStyle' type='button' class='button' data-toggle='modal' data-target='#" . $attributes['randomKey'] . "'>";
					
	$output .= $attributes['buttonText'];
				
	$output .= "</button></p></div>";

	// due to some themes having strange z-index issues on the content, we need to put this at the bottom of the page to avoid that. We are using an anonymous function in case there is more than one per page.
	add_action('wp_footer', function() use ($attributes, $content) {

		$modalContentStyle = "background-color: " . $attributes['textBackgroundColor'] ."; color: " . $attributes['textColor']."; border-radius: " . $attributes['borderRadius'] . "px";
				
		$modalHeaderStyle = "background-color: " . $attributes['titleBackgroundColor'] ."; border-radius: " . $attributes['borderRadius']  . "px " . $attributes['borderRadius'] . "px 0 0";
		
		$modalTitleStyle = "color: " . $attributes['titleColor'];

    	?>
			<div class="modal" data-easein="<?php echo $attributes['animation']; ?>" id="<?php echo $attributes['randomKey']; ?>" style="color: <?php echo $attributes['textColor']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog<?php echo $attributes['size']; ?>" role="document">
					<div class="modal-content" style="<?php echo $modalContentStyle; ?>">
						<div class="modal-header" style="<?php echo $modalHeaderStyle; ?>">
							<h4 class="modal-title" id="myModalLabel" style="<?php echo $modalTitleStyle; ?>"><?php echo $attributes['title']; ?></h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						</div>
						<div class="modal-body">
							<?php echo $content; ?>
						</div>
					</div>
				</div>
			</div>
    	<?php
	});

	return $output;
}
/**
 * Register the Pop Up block
 *
 * @return void
 */
function registerPopUpBlock() {
	if( \function_exists('register_block_type') ){
		$attributes = [];
		$attributes['title'] 					= ['type' => 'string', 'default' => ''];
		$attributes['buttonText'] 				= ['type' => 'string', 'default' => "Click Me"];
		$attributes['align'] 					= ['type' => 'string', 'default' => 'left'];
		$attributes['randomKey'] 				= ['type' => 'string', 'default' => 'myModal'];
		$attributes['size'] 						= ['type' => 'string', 'default' => ''];
		$attributes['textBackgroundColor'] 	= ['type' => 'string', 'default' => ''];
		$attributes['titleBackgroundColor'] = ['type' => 'string', 'default' => ''];
		$attributes['textColor']			 	= ['type' => 'string', 'default' => ''];
		$attributes['titleColor']			 	= ['type' => 'string', 'default' => ''];
		$attributes['buttonColor']			 	= ['type' => 'string', 'default' => ''];
		$attributes['buttonTextColor']	 	= ['type' => 'string', 'default' => ''];
		$attributes['borderRadius']			= ['type' => 'number', 'default' => 6];
		$attributes['animation']			 	= ['type' => 'string', 'default' => 'fadeIn'];
	  \register_block_type( 'blockparty/block-gutenberg-pop-up', array(
		  'attributes' => $attributes,
				'render_callback' => 'renderPopUpBlock',
	  ) );
	}
}
add_action('init', 'registerPopUpBlock' );





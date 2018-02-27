/**
 * BLOCK: gutenberg-pop-up
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const InnerBlocks = wp.blocks.InnerBlocks;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-gutenberg-pop-up', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Pop Up' ), // Block title.
	icon: 'external', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Pop Up' )
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function({ attributes, setAttributes, focus, setFocus, className }) {

		return (
			<div>
				Pop Up Content:
				<InnerBlocks/>
				Pop Up Preview:
				<div className={ className }>
					<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
						Launch demo modal
					</button>

					<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									<h4 className="modal-title" id="myModalLabel">Modal title</h4>
								</div>
								<div className="modal-body">
									<InnerBlocks/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function({ attributes, setAttributes, focus, setFocus, className }) {
		return (
			<div className={ className }>
				<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
					Launch demo modal
				</button>

				<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 className="modal-title" id="myModalLabel">Modal title</h4>
							</div>
							<div className="modal-body">
								<InnerBlocks.Content/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );

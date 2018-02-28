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
const TextControl = wp.components.TextControl;
const SelectControl = wp.components.SelectControl;
const ToggleControl = wp.components.ToggleControl;
const IconButton = wp.components.IconButton;
const { Component } = wp.element;

class EditorComponent extends Component {


	constructor() {
		super( ...arguments );
		this.state = {
			isEditing: false
		}
	}

	componentDidMount() {
		const randomKey = "myModal" + Math.floor(Math.random() * 1000);
		this.props.setAttributes({randomKey: randomKey});
	}

	render() {
		const { attributes, setAttributes, className} = this.props;
		return (<div>
				{ this.state.isEditing
					?
						<div>
							<TextControl
								label="Button Text:"
								onChange={ ( value ) => setAttributes( { buttonText: value } ) }
								value={ attributes.buttonText }
								placeholder="Button Text"
							/>
							<TextControl
								label="Pop Up Title:"
								onChange={ ( value ) => setAttributes( { title: value } ) }
								value={ attributes.title }
								placeholder="Pop Up Title"
							/>
							<SelectControl
								label="Size"
								value={ attributes.size }
								options={[
									{ value: 'lg', label: 'Large' },
									{ value: 'sm', label: 'Small' },
								]}
								onChange={ (value) => setAttributes( { size: value } ) }
							/>
							<ToggleControl
								label="Fade"
								checked={ !! attributes.fade }
								onChange={ () => setAttributes( { fade: ! attributes.fade } ) }
							/>
							<label class="blocks-base-control__label">Pop Up Content:</label>
							<InnerBlocks/>
							<div style={{textAlign: 'right'}}>
								<IconButton style={{display: 'inline-block'}} icon="editor-break" label={ __( 'Apply' ) } type="submit" onClick={(event) => { event.preventDefault(); this.setState({ isEditing: false });}}/>
							</div>
						</div>
					:
						<div className={ className } onClick={() => this.setState({ isEditing: true })}>
							<p><button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target={"#"+attributes.randomKey}>
								{attributes.buttonText}
							</button></p>

							<div className="modal fade" id={attributes.randomKey} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
								<div className={ "modal-dialog modal-"+attributes.size } role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title" id="myModalLabel">{attributes.title}</h4>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										</div>
										<div className="modal-body">
											<InnerBlocks/>
										</div>
									</div>
								</div>
							</div>
						</div>
				}

			</div>);
	}
}

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
	attributes: {
		title: {
			type: 'string',
			default: 'Title'
		},
		buttonText: {
			type: 'string',
			default: 'Button Text'
		},
		randomKey: {
			type: 'string',
			default: 'myModal'
		},
		size: {
			type: 'string',
			default: 'lg'
		},
		fade: {
			type: 'boolean',
			default: true
		},
	},
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
	edit: EditorComponent,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */


	save: function({ attributes, className }) {
		return (
			<div className={ className }>
				<p><button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target={"#"+attributes.randomKey}>
					{attributes.buttonText}
				</button></p>

				<div className="modal fade" id={attributes.randomKey} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className={ "modal-dialog modal-"+attributes.size } role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title" id="myModalLabel">{attributes.title}</h4>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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

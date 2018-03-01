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
const RangeControl = wp.components.RangeControl;
const IconButton = wp.components.IconButton;
const { Component } = wp.element;
const InspectorControls = wp.blocks.InspectorControls;
const ColorPalette = wp.blocks.ColorPalette;

class EditorComponent extends Component {


	constructor() {
		super( ...arguments );
		this.state = {
			isEditing: false,
			colorSelector: 'titleColor',
		}
	}

	componentDidMount() {
		const randomKey = "myModal" + Math.floor(Math.random() * 1000);
		this.props.setAttributes({randomKey: randomKey});
	}

	handleChildClick(e) {
		e.stopPropagation();
		this.setState( { colorSelector: e.target.className } );
		console.log(e.target.className);
}

	render() {
		const { attributes, setAttributes, className, focus} = this.props;

		const controls = focus ?
		 (
			 <InspectorControls>
				<SelectControl
					label={ __("Size: ") }
					value={ attributes.size }
					options={[
						{ value: ' modal-lg', label: 'Large' },
						{ value: '', label: 'Medium' },
						{ value: ' modal-sm', label: 'Small' },
					]}
					onChange={ (value) => setAttributes( { size: value } ) }
				/>
				<SelectControl
					label={ __("Color: ") }
					value={ this.state.colorSelector }
					options={[
						{ value: 'titleColor', label: __("Title") },
						{ value: 'titleBackgroundColor', label: __("Title Background") },
						{ value: 'textColor', label: __("Content") },
						{ value: 'textBackgroundColor', label: __("Content Background") },
					]}
					onChange={ (value) => this.setState( { colorSelector: value } ) }
				/>
				<ColorPalette
					onChange={ ( value ) => {
						switch (this.state.colorSelector) {
						  case 'textBackgroundColor':
						    setAttributes( { textBackgroundColor: value} );
						    break;
							case 'titleBackgroundColor':
							  setAttributes( { titleBackgroundColor: value} );
							  break;
						  case 'titleColor':
								setAttributes( { titleColor: value} );
								break;
						  case 'textColor':
						    setAttributes( { textColor: value} );
						    break;
							}
						}
					}
				/>
				<RangeControl
				label={ __("Border: ") }
				value={ (attributes.borderRadius / 3) }
				min={ 0 }
				max={ 5 }
				onChange={ (value) => setAttributes( { borderRadius: (value * 3) } ) }
				/>
				<div className="colorPreview" onClick={ () => this.setState( { colorSelector: 'textBackgroundColor' } ) } style={{
						borderRadius: attributes.borderRadius,
						border: "1px solid rgba(0, 0, 0, 0.2)",
						width: "75px",
						height: "60px",
						position: "relative",
						left: "33%",
						textAlign: 'center',
						backgroundColor: attributes.textBackgroundColor,
						boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
						marginBottom: "3px",
					}}>
					<div className="titleBackgroundColor" style={{ backgroundColor: attributes.titleBackgroundColor, borderBottom: '1px solid #e5e5e5', height: "40%", borderRadius: `${attributes.borderRadius}px ${attributes.borderRadius}px 0 0` }} onClick={ (e) => this.handleChildClick(e) }>
						<h3 className="titleColor" style={{ color: attributes.titleColor, width: "0", padding: "2px"}} onClick={ (e) => this.handleChildClick(e) }>Title</h3>
					</div>
					<p className="textColor" style={{ color: attributes.textColor }} onClick={ (e) => this.handleChildClick(e) }>Content</p>
				</div>
			</InspectorControls>
		) : null;

		return [
			controls,
			(
				<div>
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
								<div className={ "modal-dialog"+attributes.size } role="document">
									<div className="modal-content" style={{backgroundColor: attributes.textBackgroundColor, color: attributes.textColor, borderRadius: attributes.borderRadius }}>
										<div className="modal-header" style={{ backgroundColor: attributes.titleBackgroundColor, borderRadius: `${attributes.borderRadius}px ${attributes.borderRadius}px 0 0` }}>
											<h4 className="modal-title" id="myModalLabel" style={{color: attributes.titleColor}}>{attributes.title}</h4>
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

			</div>)
		];
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
			default: ''
		},
		textBackgroundColor: {
			type: 'string',
			default: ''
		},
		titleBackgroundColor: {
			type: 'string',
			default: ''
		},
		textColor: {
			type: 'string',
			default: ''
		},
		titleColor: {
			type: 'string',
			default: ''
		},
		borderRadius: {
			type: 'number',
			default: 6
		}
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

				<div className="modal fade" id={attributes.randomKey} style={{color: attributes.textColor}} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className={ "modal-dialog"+attributes.size } role="document">
						<div className="modal-content" style={{ backgroundColor: attributes.textBackgroundColor, borderRadius: attributes.borderRadius }}>
							<div className="modal-header" style={{ backgroundColor: attributes.titleBackgroundColor, borderRadius: `${attributes.borderRadius}px ${attributes.borderRadius}px 0 0` }}>
								<h4 className="modal-title" id="myModalLabel" style={{color: attributes.titleColor}}>{attributes.title}</h4>
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

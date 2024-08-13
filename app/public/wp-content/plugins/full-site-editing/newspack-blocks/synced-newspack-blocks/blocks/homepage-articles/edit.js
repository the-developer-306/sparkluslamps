/* eslint-disable jsx-a11y/anchor-is-valid */

/**
 * Internal dependencies
 */
import QueryControls from '../../components/query-controls';
import { postsBlockSelector, postsBlockDispatch, isBlogPrivate, shouldReflow } from './utils';
import {
	formatAvatars,
	formatByline,
	formatSponsorLogos,
	formatSponsorByline,
	getPostStatusLabel,
} from '../../shared/js/utils';
import { PostTypesPanel, PostStatusesPanel } from '../../components/editor-panels';

/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { dateI18n, __experimentalGetSettings } from '@wordpress/date';
import { Component, Fragment, RawHTML } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
	withColors,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	RangeControl,
	Toolbar,
	ToggleControl,
	TextControl,
	Placeholder,
	Spinner,
	BaseControl,
	Path,
	SVG,
} from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { decodeEntities } from '@wordpress/html-entities';
import {
	Icon,
	formatListBullets,
	fullscreen,
	grid,
	image,
	postFeaturedImage,
	pullLeft,
	pullRight,
} from '@wordpress/icons';

let IS_SUBTITLE_SUPPORTED_IN_THEME;
if (
	typeof window === 'object' &&
	window.newspack_blocks_data &&
	window.newspack_blocks_data.post_subtitle
) {
	IS_SUBTITLE_SUPPORTED_IN_THEME = true;
}

const landscapeIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<Path
			clipRule="evenodd"
			d="M18.714 7.5H5.286a.786.786 0 00-.786.786v7.428c0 .434.352.786.786.786h13.428a.786.786 0 00.786-.786V8.286a.786.786 0 00-.786-.786zM5.286 6A2.286 2.286 0 003 8.286v7.428A2.286 2.286 0 005.286 18h13.428A2.286 2.286 0 0021 15.714V8.286A2.286 2.286 0 0018.714 6H5.286z"
			fillRule="evenodd"
		/>
	</SVG>
);

const portraitIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<Path
			clipRule="evenodd"
			d="M15.714 4.5H8.286a.786.786 0 00-.786.786v13.428c0 .434.352.786.786.786h7.428a.786.786 0 00.786-.786V5.286a.786.786 0 00-.786-.786zM8.286 3A2.286 2.286 0 006 5.286v13.428A2.286 2.286 0 008.286 21h7.428A2.286 2.286 0 0018 18.714V5.286A2.286 2.286 0 0015.714 3H8.286z"
			fillRule="evenodd"
		/>
	</SVG>
);

const squareIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<Path
			clipRule="evenodd"
			d="M18.714 4.5H5.286a.786.786 0 00-.786.786v13.428c0 .434.352.786.786.786h13.428a.786.786 0 00.786-.786V5.286a.786.786 0 00-.786-.786zM5.286 3A2.286 2.286 0 003 5.286v13.428A2.286 2.286 0 005.286 21h13.428A2.286 2.286 0 0021 18.714V5.286A2.286 2.286 0 0018.714 3H5.286z"
			fillRule="evenodd"
		/>
	</SVG>
);

class Edit extends Component {
	renderPost = post => {
		const { attributes, isUIDisabled } = this.props;
		const {
			showImage,
			imageShape,
			mediaPosition,
			minHeight,
			showCaption,
			showExcerpt,
			showReadMore,
			readMoreLabel,
			showSubtitle,
			showAuthor,
			showAvatar,
			showDate,
			showCategory,
			sectionHeader,
		} = attributes;

		const styles = {
			minHeight:
				mediaPosition === 'behind' &&
				showImage &&
				post.newspack_featured_image_src &&
				minHeight + 'vh',
			paddingTop:
				mediaPosition === 'behind' &&
				showImage &&
				post.newspack_featured_image_src &&
				minHeight / 5 + 'vh',
		};

		const postClasses = classNames(
			{
				'post-has-image': post.newspack_featured_image_src,
				'newspack-block--disabled': isUIDisabled,
			},
			post.newspack_article_classes
		);

		const postTitle = this.titleForPost( post );
		const dateFormat = __experimentalGetSettings().formats.date;
		return (
			<article className={ postClasses } key={ post.id } style={ styles }>
				{ getPostStatusLabel( post ) }
				{ showImage && post.newspack_featured_image_src && (
					<figure className="post-thumbnail" key="thumbnail">
						<a href="#">
							{ imageShape === 'landscape' && (
								<img src={ post.newspack_featured_image_src.landscape } alt="" />
							) }
							{ imageShape === 'portrait' && (
								<img src={ post.newspack_featured_image_src.portrait } alt="" />
							) }
							{ imageShape === 'square' && (
								<img src={ post.newspack_featured_image_src.square } alt="" />
							) }
							{ imageShape === 'uncropped' && (
								<img src={ post.newspack_featured_image_src.uncropped } alt="" />
							) }
						</a>
						{ showCaption && '' !== post.newspack_featured_image_caption && (
							<figcaption>{ post.newspack_featured_image_caption }</figcaption>
						) }
					</figure>
				) }

				<div className="entry-wrapper">
					{ ( post.newspack_post_sponsors ||
						( showCategory && 0 < post.newspack_category_info.length ) ) && (
						<div
							className={ 'cat-links' + ( post.newspack_post_sponsors ? ' sponsor-label' : '' ) }
						>
							{ post.newspack_post_sponsors && (
								<span className="flag">{ post.newspack_post_sponsors[ 0 ].flag }</span>
							) }
							{ showCategory &&
								( ! post.newspack_post_sponsors || post.newspack_sponsors_show_categories ) && (
									<RawHTML>{ decodeEntities( post.newspack_category_info ) }</RawHTML>
								) }
						</div>
					) }
					{ RichText.isEmpty( sectionHeader ) ? (
						<h2 className="entry-title" key="title">
							<a href="#">{ postTitle }</a>
						</h2>
					) : (
						<h3 className="entry-title" key="title">
							<a href="#">{ postTitle }</a>
						</h3>
					) }
					{ IS_SUBTITLE_SUPPORTED_IN_THEME && showSubtitle && (
						<RawHTML
							key="subtitle"
							className="newspack-post-subtitle newspack-post-subtitle--in-homepage-block"
						>
							{ post.meta.newspack_post_subtitle || '' }
						</RawHTML>
					) }
					{ showExcerpt && (
						<RawHTML key="excerpt" className="excerpt-contain">
							{ post.excerpt.rendered }
						</RawHTML>
					) }
					{ showReadMore && post.post_link && (
						<a href="#" key="readmore" className="more-link">
							{ readMoreLabel }
						</a>
					) }
					<div className="entry-meta">
						{ post.newspack_post_sponsors && (
							<span
								className={ `entry-sponsors ${
									post.newspack_sponsors_show_author ? 'plus-author' : ''
								}` }
							>
								{ formatSponsorLogos( post.newspack_post_sponsors ) }
								{ formatSponsorByline( post.newspack_post_sponsors ) }
							</span>
						) }

						{ showAuthor &&
							! post.newspack_listings_hide_author &&
							showAvatar &&
							( ! post.newspack_post_sponsors || post.newspack_sponsors_show_author ) &&
							formatAvatars( post.newspack_author_info ) }

						{ showAuthor &&
							! post.newspack_listings_hide_author &&
							( ! post.newspack_post_sponsors || post.newspack_sponsors_show_author ) &&
							formatByline( post.newspack_author_info ) }

						{ showDate && ! post.newspack_listings_hide_publish_date && (
							<time className="entry-date published" key="pub-date">
								{ dateI18n( dateFormat, post.date ) }
							</time>
						) }
					</div>
				</div>
			</article>
		);
	};

	titleForPost = post => {
		if ( ! post.title ) {
			return '';
		}
		if ( typeof post.title === 'string' ) {
			return decodeEntities( post.title.trim() );
		}
		if ( typeof post.title === 'object' && post.title.rendered ) {
			return decodeEntities( post.title.rendered.trim() );
		}
	};

	renderInspectorControls = () => {
		const { attributes, setAttributes, textColor, setTextColor } = this.props;

		const {
			authors,
			specificPosts,
			postsToShow,
			categories,
			includeSubcategories,
			customTaxonomies,
			columns,
			colGap,
			postType,
			showImage,
			showCaption,
			imageScale,
			mobileStack,
			minHeight,
			moreButton,
			showExcerpt,
			showReadMore,
			readMoreLabel,
			excerptLength,
			showSubtitle,
			typeScale,
			showDate,
			showAuthor,
			showAvatar,
			showCategory,
			postLayout,
			mediaPosition,
			specificMode,
			tags,
			tagExclusions,
			categoryExclusions,
		} = attributes;

		const imageSizeOptions = [
			{
				value: 1,
				label: /* translators: label for small size option */ __( 'Small', 'full-site-editing' ),
				shortName: /* translators: abbreviation for small size */ __( 'S', 'full-site-editing' ),
			},
			{
				value: 2,
				label: /* translators: label for medium size option */ __( 'Medium', 'full-site-editing' ),
				shortName: /* translators: abbreviation for medium size */ __( 'M', 'full-site-editing' ),
			},
			{
				value: 3,
				label: /* translators: label for large size option */ __( 'Large', 'full-site-editing' ),
				shortName: /* translators: abbreviation for large size */ __( 'L', 'full-site-editing' ),
			},
			{
				value: 4,
				label: /* translators: label for extra large size option */ __(
					'Extra Large',
					'full-site-editing'
				),
				shortName: /* translators: abbreviation for extra large size */ __(
					'XL',
					'full-site-editing'
				),
			},
		];

		const colGapOptions = [
			{
				value: 1,
				label: /* translators: label for small size option */ __( 'Small', 'full-site-editing' ),
				shortName: /* translators: abbreviation for small size */ __( 'S', 'full-site-editing' ),
			},
			{
				value: 2,
				label: /* translators: label for medium size option */ __( 'Medium', 'full-site-editing' ),
				shortName: /* translators: abbreviation for medium size */ __( 'M', 'full-site-editing' ),
			},
			{
				value: 3,
				label: /* translators: label for large size option */ __( 'Large', 'full-site-editing' ),
				shortName: /* translators: abbreviation for large size */ __( 'L', 'full-site-editing' ),
			},
		];

		const handleAttributeChange = key => value => setAttributes( { [ key ]: value } );

		return (
			<Fragment>
				<PanelBody title={ __( 'Display Settings', 'full-site-editing' ) } initialOpen={ true }>
					<QueryControls
						numberOfItems={ postsToShow }
						onNumberOfItemsChange={ _postsToShow =>
							setAttributes( { postsToShow: _postsToShow || 1 } )
						}
						specificMode={ specificMode }
						onSpecificModeChange={ handleAttributeChange( 'specificMode' ) }
						specificPosts={ specificPosts }
						onSpecificPostsChange={ handleAttributeChange( 'specificPosts' ) }
						authors={ authors }
						onAuthorsChange={ handleAttributeChange( 'authors' ) }
						categories={ categories }
						onCategoriesChange={ handleAttributeChange( 'categories' ) }
						includeSubcategories={ includeSubcategories }
						onIncludeSubcategoriesChange={ handleAttributeChange( 'includeSubcategories' ) }
						tags={ tags }
						onTagsChange={ handleAttributeChange( 'tags' ) }
						onCustomTaxonomiesChange={ handleAttributeChange( 'customTaxonomies' ) }
						customTaxonomies={ customTaxonomies }
						tagExclusions={ tagExclusions }
						onTagExclusionsChange={ handleAttributeChange( 'tagExclusions' ) }
						categoryExclusions={ categoryExclusions }
						onCategoryExclusionsChange={ handleAttributeChange( 'categoryExclusions' ) }
						postType={ postType }
					/>
					{ postLayout === 'grid' && (
						<Fragment>
							<RangeControl
								label={ __( 'Columns', 'full-site-editing' ) }
								value={ columns }
								onChange={ handleAttributeChange( 'columns' ) }
								min={ 2 }
								max={ 6 }
								required
							/>

							<BaseControl
								label={ __( 'Columns Gap', 'full-site-editing' ) }
								id="newspackcolumns-col-gap"
							>
								<PanelRow>
									<ButtonGroup
										id="newspackcolumns-col-gap"
										aria-label={ __( 'Columns Gap', 'full-site-editing' ) }
									>
										{ colGapOptions.map( option => {
											const isCurrent = colGap === option.value;
											return (
												<Button
													isPrimary={ isCurrent }
													aria-pressed={ isCurrent }
													aria-label={ option.label }
													key={ option.value }
													onClick={ () => setAttributes( { colGap: option.value } ) }
												>
													{ option.shortName }
												</Button>
											);
										} ) }
									</ButtonGroup>
								</PanelRow>
							</BaseControl>
						</Fragment>
					) }
					{ ! specificMode && isBlogPrivate() ? (
						/*
						 * Hide the "Load more posts" button option on private sites.
						 *
						 * Client-side fetching from a private WP.com blog requires authentication,
						 * which is not provided in the current implementation.
						 * See https://github.com/Automattic/newspack-blocks/issues/306.
						 */
						<i>
							{ __(
								'This blog is private, therefore the "Load more posts" feature is not active.',
								'full-site-editing'
							) }
						</i>
					) : (
						! specificMode && (
							<ToggleControl
								label={ __( 'Show "Load more posts" Button', 'full-site-editing' ) }
								checked={ moreButton }
								onChange={ () => setAttributes( { moreButton: ! moreButton } ) }
							/>
						)
					) }
					<ToggleControl
						label={ __( 'Use deduplication logic', 'full-site-editing' ) }
						help={ __(
							'If unchecked, this block will be excluded from the deduplication logic and may show duplicate posts.',
							'full-site-editing'
						) }
						checked={ attributes.deduplicate }
						onChange={ () => setAttributes( { deduplicate: ! attributes.deduplicate } ) }
						className="newspack-blocks-deduplication-toggle"
					/>
				</PanelBody>
				<PanelBody title={ __( 'Featured Image Settings', 'full-site-editing' ) }>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Featured Image', 'full-site-editing' ) }
							checked={ showImage }
							onChange={ () => setAttributes( { showImage: ! showImage } ) }
						/>
					</PanelRow>

					{ showImage && (
						<PanelRow>
							<ToggleControl
								label={ __( 'Show Featured Image Caption', 'full-site-editing' ) }
								checked={ showCaption }
								onChange={ () => setAttributes( { showCaption: ! showCaption } ) }
							/>
						</PanelRow>
					) }

					{ showImage && mediaPosition !== 'top' && mediaPosition !== 'behind' && (
						<Fragment>
							<PanelRow>
								<ToggleControl
									label={ __( 'Stack on mobile', 'full-site-editing' ) }
									checked={ mobileStack }
									onChange={ () => setAttributes( { mobileStack: ! mobileStack } ) }
								/>
							</PanelRow>
							<BaseControl
								label={ __( 'Featured Image Size', 'full-site-editing' ) }
								id="newspackfeatured-image-size"
							>
								<PanelRow>
									<ButtonGroup
										id="newspackfeatured-image-size"
										aria-label={ __( 'Featured Image Size', 'full-site-editing' ) }
									>
										{ imageSizeOptions.map( option => {
											const isCurrent = imageScale === option.value;
											return (
												<Button
													isPrimary={ isCurrent }
													aria-pressed={ isCurrent }
													aria-label={ option.label }
													key={ option.value }
													onClick={ () => setAttributes( { imageScale: option.value } ) }
												>
													{ option.shortName }
												</Button>
											);
										} ) }
									</ButtonGroup>
								</PanelRow>
							</BaseControl>
						</Fragment>
					) }

					{ showImage && mediaPosition === 'behind' && (
						<RangeControl
							label={ __( 'Minimum height', 'full-site-editing' ) }
							help={ __(
								"Sets a minimum height for the block, using a percentage of the screen's current height.",
								'full-site-editing'
							) }
							value={ minHeight }
							onChange={ _minHeight => setAttributes( { minHeight: _minHeight } ) }
							min={ 0 }
							max={ 100 }
							required
						/>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Post Control Settings', 'full-site-editing' ) }>
					{ IS_SUBTITLE_SUPPORTED_IN_THEME && (
						<PanelRow>
							<ToggleControl
								label={ __( 'Show Subtitle', 'full-site-editing' ) }
								checked={ showSubtitle }
								onChange={ () => setAttributes( { showSubtitle: ! showSubtitle } ) }
							/>
						</PanelRow>
					) }
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Excerpt', 'full-site-editing' ) }
							checked={ showExcerpt }
							onChange={ () => setAttributes( { showExcerpt: ! showExcerpt } ) }
						/>
					</PanelRow>
					{ showExcerpt && (
						<RangeControl
							label={ __( 'Max number of words in excerpt', 'full-site-editing' ) }
							value={ excerptLength }
							onChange={ value => setAttributes( { excerptLength: value } ) }
							min={ 10 }
							max={ 100 }
						/>
					) }
					<ToggleControl
						label={ __( 'Add a "Read More" link', 'full-site-editing' ) }
						checked={ showReadMore }
						onChange={ () => setAttributes( { showReadMore: ! showReadMore } ) }
					/>
					{ showReadMore && (
						<TextControl
							label={ __( '"Read More" link text', 'full-site-editing' ) }
							value={ readMoreLabel }
							placeholder={ readMoreLabel }
							onChange={ value => setAttributes( { readMoreLabel: value } ) }
						/>
					) }
					<RangeControl
						className="type-scale-slider"
						label={ __( 'Type Scale', 'full-site-editing' ) }
						value={ typeScale }
						onChange={ _typeScale => setAttributes( { typeScale: _typeScale } ) }
						min={ 1 }
						max={ 10 }
						required
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'full-site-editing' ) }
					initialOpen={ true }
					colorSettings={ [
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'full-site-editing' ),
						},
					] }
				/>
				<PanelBody title={ __( 'Post Meta Settings', 'full-site-editing' ) }>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Date', 'full-site-editing' ) }
							checked={ showDate }
							onChange={ () => setAttributes( { showDate: ! showDate } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Category', 'full-site-editing' ) }
							checked={ showCategory }
							onChange={ () => setAttributes( { showCategory: ! showCategory } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Author', 'full-site-editing' ) }
							checked={ showAuthor }
							onChange={ () => setAttributes( { showAuthor: ! showAuthor } ) }
						/>
					</PanelRow>
					{ showAuthor && (
						<PanelRow>
							<ToggleControl
								label={ __( 'Show Author Avatar', 'full-site-editing' ) }
								checked={ showAvatar }
								onChange={ () => setAttributes( { showAvatar: ! showAvatar } ) }
							/>
						</PanelRow>
					) }
				</PanelBody>
				<PostTypesPanel attributes={ attributes } setAttributes={ setAttributes } />
				<PostStatusesPanel attributes={ attributes } setAttributes={ setAttributes } />
			</Fragment>
		);
	};

	componentDidMount() {
		this.props.triggerReflow();
	}
	componentDidUpdate( props ) {
		if ( shouldReflow( props, this.props ) ) {
			this.props.triggerReflow();
		}
	}
	componentWillUnmount() {
		this.props.triggerReflow();
	}

	render() {
		/**
		 * Constants
		 */

		const { attributes, className, setAttributes, isSelected, latestPosts, textColor, error } =
			this.props;

		const {
			showImage,
			imageShape,
			postLayout,
			mediaPosition,
			moreButton,
			moreButtonText,
			columns,
			colGap,
			typeScale,
			imageScale,
			mobileStack,
			sectionHeader,
			showCaption,
			showCategory,
			specificMode,
			textAlign,
		} = attributes;

		const classes = classNames( className, {
			'is-grid': postLayout === 'grid',
			'show-image': showImage,
			[ `columns-${ columns }` ]: postLayout === 'grid',
			[ `colgap-${ colGap }` ]: postLayout === 'grid',
			[ `ts-${ typeScale }` ]: typeScale !== '5',
			[ `image-align${ mediaPosition }` ]: showImage,
			[ `is-${ imageScale }` ]: imageScale !== '1' && showImage,
			'mobile-stack': mobileStack,
			[ `is-${ imageShape }` ]: showImage,
			'has-text-color': textColor.color !== '',
			'show-caption': showCaption,
			'show-category': showCategory,
			[ `has-text-align-${ textAlign }` ]: textAlign,
			wpnbha: true,
		} );

		const blockControls = [
			{
				icon: <Icon icon={ formatListBullets } />,
				title: __( 'List View', 'full-site-editing' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: postLayout === 'list',
			},
			{
				icon: <Icon icon={ grid } />,
				title: __( 'Grid View', 'full-site-editing' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
		];

		const blockControlsImages = [
			{
				icon: <Icon icon={ postFeaturedImage } />,
				title: __( 'Show media on top', 'full-site-editing' ),
				isActive: mediaPosition === 'top',
				onClick: () => setAttributes( { mediaPosition: 'top' } ),
			},
			{
				icon: <Icon icon={ pullLeft } />,
				title: __( 'Show media on left', 'full-site-editing' ),
				isActive: mediaPosition === 'left',
				onClick: () => setAttributes( { mediaPosition: 'left' } ),
			},
			{
				icon: <Icon icon={ pullRight } />,
				title: __( 'Show media on right', 'full-site-editing' ),
				isActive: mediaPosition === 'right',
				onClick: () => setAttributes( { mediaPosition: 'right' } ),
			},
			{
				icon: <Icon icon={ image } />,
				title: __( 'Show media behind', 'full-site-editing' ),
				isActive: mediaPosition === 'behind',
				onClick: () => setAttributes( { mediaPosition: 'behind' } ),
			},
		];

		const blockControlsImageShape = [
			{
				icon: landscapeIcon,
				title: __( 'Landscape Image Shape', 'full-site-editing' ),
				isActive: imageShape === 'landscape',
				onClick: () => setAttributes( { imageShape: 'landscape' } ),
			},
			{
				icon: portraitIcon,
				title: __( 'portrait Image Shape', 'full-site-editing' ),
				isActive: imageShape === 'portrait',
				onClick: () => setAttributes( { imageShape: 'portrait' } ),
			},
			{
				icon: squareIcon,
				title: __( 'Square Image Shape', 'full-site-editing' ),
				isActive: imageShape === 'square',
				onClick: () => setAttributes( { imageShape: 'square' } ),
			},
			{
				icon: <Icon icon={ fullscreen } />,
				title: __( 'Uncropped', 'full-site-editing' ),
				isActive: imageShape === 'uncropped',
				onClick: () => setAttributes( { imageShape: 'uncropped' } ),
			},
		];

		return (
			<Fragment>
				<div
					className={ classes }
					style={ {
						color: textColor.color,
					} }
				>
					<div>
						{ latestPosts && ( ! RichText.isEmpty( sectionHeader ) || isSelected ) && (
							<RichText
								onChange={ value => setAttributes( { sectionHeader: value } ) }
								placeholder={ __( 'Write header…', 'full-site-editing' ) }
								value={ sectionHeader }
								tagName="h2"
								className="article-section-title"
							/>
						) }
						{ latestPosts && ! latestPosts.length && (
							<Placeholder>{ __( 'Sorry, no posts were found.', 'full-site-editing' ) }</Placeholder>
						) }
						{ ! latestPosts && ! error && (
							<Placeholder icon={ <Spinner /> } className="component-placeholder__align-center" />
						) }
						{ ! latestPosts && error && (
							<Placeholder className="component-placeholder__align-center newspack-block--error">
								{ error }
							</Placeholder>
						) }

						{ latestPosts && latestPosts.map( post => this.renderPost( post ) ) }
					</div>
				</div>

				{ ! specificMode && latestPosts && moreButton && ! isBlogPrivate() && (
					/*
					 * The "More" button option is hidden for private sites, so we should
					 * also hide the button in case it was previously enabled.
					 */
					<div className="editor-styles-wrapper wpnbha__wp-block-button__wrapper">
						<div className="wp-block-button">
							<RichText
								placeholder={ __( 'Load more posts', 'full-site-editing' ) }
								value={ moreButtonText }
								onChange={ value => setAttributes( { moreButtonText: value } ) }
								className="wp-block-button__link"
								allowedFormats={ [] }
							/>
						</div>
					</div>
				) }

				<BlockControls>
					<Toolbar>
						<AlignmentControl
							value={ textAlign }
							onChange={ nextAlign => {
								setAttributes( { textAlign: nextAlign } );
							} }
						/>
					</Toolbar>
					<Toolbar controls={ blockControls } />
					{ showImage && <Toolbar controls={ blockControlsImages } /> }
					{ showImage && <Toolbar controls={ blockControlsImageShape } /> }
				</BlockControls>
				<InspectorControls>{ this.renderInspectorControls() }</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	withColors( { textColor: 'color' } ),
	withSelect( postsBlockSelector ),
	withDispatch( postsBlockDispatch ),
] )( Edit );

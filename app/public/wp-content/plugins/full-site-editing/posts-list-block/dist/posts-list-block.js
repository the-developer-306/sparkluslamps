/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 725:
/***/ (() => {

// extracted by mini-css-extract-plugin


/***/ }),

/***/ 129:
/***/ (() => {

// extracted by mini-css-extract-plugin


/***/ }),

/***/ 744:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(715);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(382);
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(495);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(725);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(129);







const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__;




const icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  opacity: ".87",
  fill: "none",
  d: "M0 0h24v24H0V0z"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 5v14h17V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm13 2H9v-2h9v2zm0-4H9v-2h9v2zm0-4H9V7h9v2z"
}));
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_6__/* .name */ .UU, {
  title: __('Blog Posts Listing', 'full-site-editing'),
  description: __('Displays your latest Blog Posts.', 'full-site-editing'),
  icon: icon,
  category: 'layout',
  supports: {
    html: false,
    multiple: false,
    reusable: false,
    inserter: false
  },
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_6__/* .attributes */ .uK,
  edit: ({
    attributes,
    setAttributes,
    clientId,
    isSelected
  }) => {
    const block = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core/block-editor').getBlock(clientId);

    // Find if any of possible transformations is into the Homepage Posts block.
    const possibleTransforms = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.getPossibleBlockTransformations)([block]);
    const homepagePostsTransform = possibleTransforms.find(transform => transform && (0,_transforms__WEBPACK_IMPORTED_MODULE_7__/* .isValidHomepagePostsBlockType */ .X)(transform.name));
    const canBeUpgraded = !!homepagePostsTransform;
    const upgradeBlock = () => {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/block-editor').replaceBlocks(block.clientId, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.switchToBlockType)(block, homepagePostsTransform.name));
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, canBeUpgraded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
      actions: [{
        label: __('Update Block', 'full-site-editing'),
        onClick: upgradeBlock
      }],
      className: "posts-list__notice",
      isDismissible: false
    }, __('An improved version of this block is available. Update for a better, more natural way to manage your blog post listings. There may be small visual changes.', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
      icon: icon,
      label: __('Your recent blog posts will be displayed here.', 'full-site-editing')
    }, isSelected ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
      label: __('Number of posts to show', 'full-site-editing'),
      value: attributes.postsPerPage,
      onChange: val => setAttributes({
        postsPerPage: val
      }),
      min: 1,
      max: 50
    }) : null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
      label: __('Number of posts', 'full-site-editing'),
      value: attributes.postsPerPage,
      onChange: val => setAttributes({
        postsPerPage: val
      }),
      min: 1,
      max: 50
    }))));
  },
  save: () => null,
  transforms: _transforms__WEBPACK_IMPORTED_MODULE_7__/* .transforms */ .m
});

/***/ }),

/***/ 495:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ isValidHomepagePostsBlockType),
/* harmony export */   m: () => (/* binding */ transforms)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);

const HOMEPAGE_POSTS_BLOCK_TYPES = ['a8c/blog-posts', 'newspack-blocks/homepage-articles'];
const getTransformFunction = type => ({
  postsPerPage
}) => {
  // Configure the Newspack block to look as close as possible
  // to the output of this one.
  return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)(type, {
    postsToShow: postsPerPage,
    showAvatar: false,
    displayPostDate: true,
    displayPostContent: true
  });
};
const isValidHomepagePostsBlockType = type => HOMEPAGE_POSTS_BLOCK_TYPES.indexOf(type) > -1;
const transforms = {
  to: HOMEPAGE_POSTS_BLOCK_TYPES.map(type => ({
    type: 'block',
    blocks: [type],
    transform: getTransformFunction(type)
  }))
};

/***/ }),

/***/ 715:
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ 427:
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ 143:
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ 87:
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ 723:
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ 382:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"UU":"a8c/posts-list","uK":{"postsPerPage":{"type":"number","default":10}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_posts_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(744);

})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
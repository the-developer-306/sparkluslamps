/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 772:
/***/ (() => {

// extracted by mini-css-extract-plugin


/***/ }),

/***/ 390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(491);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(468);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(817);






function ContextualTip({
  searchTerm,
  random = false,
  canUserCreate
}) {
  if (!searchTerm) {
    return null;
  }
  if (!_list__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.length) {
    return null;
  }
  const normalizedSearchTerm = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.deburr)((0,lodash__WEBPACK_IMPORTED_MODULE_4__.lowerCase)(searchTerm)).replace(/^\//, '');
  const foundTips = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.filter)(_list__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, ({
    keywords,
    permission
  }) => canUserCreate(permission) && (0,lodash__WEBPACK_IMPORTED_MODULE_4__.filter)([...new Set(keywords)], keyword => (0,lodash__WEBPACK_IMPORTED_MODULE_4__.includes)(normalizedSearchTerm, keyword)).length);
  if (!foundTips.length) {
    return null;
  }
  const index = random ? Math.floor(Math.random() * foundTips.length) : 0;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "contextual-tip"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tip, null, (0,lodash__WEBPACK_IMPORTED_MODULE_4__.get)(foundTips, [index, 'description'])));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.compose)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withSelect)(select => {
  return {
    canUserCreate: type => select('core').canUser('create', type)
  };
}))(ContextualTip));

/***/ }),

/***/ 817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tip_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(381);



const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;

function getTipDescription(text, conversion, textFallback) {
  if (typeof _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement !== 'undefined') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)(text, conversion);
  }
  return textFallback;
}
const tips = [{
  context: 'theme',
  keywords: ['theme', __('theme', 'full-site-editing')],
  description: getTipDescription(__('You can visit the <a>theme directory</a> to select a different design for your site.', 'full-site-editing'), {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tip_link__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
      section: "themes"
    })
  }, __('You can visit the theme directory to select a different design for your site.', 'full-site-editing')),
  permission: 'settings'
}, {
  context: 'css',
  keywords: ['css', __('css', 'full-site-editing'), 'style', __('style', 'full-site-editing')],
  description: getTipDescription(__('You can visit the the <a>Customizer</a> to edit the CSS on your site.', 'full-site-editing'), {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tip_link__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
      section: "customizer",
      subsection: "custom_css"
    })
  }, __('You can visit the the Customizer to edit the CSS on your site.', 'full-site-editing')),
  permission: 'settings'
}, {
  context: 'plugin',
  keywords: ['plugin', __('plugin', 'full-site-editing')],
  description: getTipDescription(__('You can visit the <a>plugin directory</a> to get started with installing new plugins.', 'full-site-editing'), {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tip_link__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
      section: "plugins"
    })
  }, __('You can visit the plugin directory to get started with installing new plugins.', 'full-site-editing')),
  permission: 'settings'
}, {
  context: 'header',
  keywords: ['header', __('header', 'full-site-editing')],
  description: getTipDescription(__('You can visit the the <a>Customizer</a> to edit your logo and site title.', 'full-site-editing'), {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tip_link__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
      section: "customizer",
      subsection: "title_tagline"
    })
  }, __('You can visit the the Customizer to edit your logo and site title.', 'full-site-editing')),
  permission: 'settings'
}, {
  context: 'color',
  keywords: ['color', __('color', 'full-site-editing')],
  description: getTipDescription(__('You can visit the the <a>Customizer</a> to edit the colors on your site.', 'full-site-editing'), {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tip_link__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
      section: "customizer",
      subsection: "colors"
    })
  }, __('You can visit the the Customizer to edit the colors on your site.', 'full-site-editing')),
  permission: 'settings'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tips);

/***/ }),

/***/ 381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(220);



const isEditorIFramed = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .inIframe */ .a)();
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__({
  section,
  children,
  subsection
}) {
  const {
    hostname
  } = window.location;
  const editorSelector = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor');
  const postId = editorSelector.getCurrentPostId();
  const postType = editorSelector.getCurrentPostType();
  const returnLink = isEditorIFramed && !_utils__WEBPACK_IMPORTED_MODULE_2__/* .isSimpleSite */ .S ? '&' + encodeURIComponent(`return=https://wordpress.com/${postType}/${hostname}/${postId}`) : '';
  const autofocus = `autofocus[section]=${subsection}`;
  let href = '#';
  switch (section) {
    case 'themes':
      href = isEditorIFramed ? `https://wordpress.com/themes/${hostname}` : './themes.php';
      break;
    case 'plugins':
      href = isEditorIFramed || _utils__WEBPACK_IMPORTED_MODULE_2__/* .isSimpleSite */ .S ? `https://wordpress.com/plugins/${hostname}` : './plugin-install.php';
      break;
    case 'customizer':
      href = isEditorIFramed && _utils__WEBPACK_IMPORTED_MODULE_2__/* .isSimpleSite */ .S ? `https://wordpress.com/customize/${hostname}?${autofocus}` : `./customize.php?${autofocus}${returnLink}`;
      break;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: href,
    target: "_blank",
    rel: "noreferrer noopener"
  }, children);
}

/***/ }),

/***/ 220:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ isSimpleSite),
/* harmony export */   a: () => (/* binding */ inIframe)
/* harmony export */ });
/**
 * Detect if the editor is already iFramed.
 * @returns {boolean} `True` is the editor is iFramed. Otherwise, `False`.
 */
const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
const isSimpleSite = !!(window && window._currentSiteType && window._currentSiteType === 'simple');

/***/ }),

/***/ 468:
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ 715:
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ 427:
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ 491:
/***/ ((module) => {

module.exports = window["wp"]["compose"];

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

/***/ 279:
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(715);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(279);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(468);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _contextual_tips_contextual_tip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(390);
/* harmony import */ var _contextual_tips_style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(772);







const ContextualTips = function () {
  const [debouncedFilterValue, setFilterValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const debouncedSetFilterValue = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.debounce)(setFilterValue, 400);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.__unstableInserterMenuExtension, null, ({
    filterValue,
    hasItems
  }) => {
    if (hasItems || !filterValue) {
      return null;
    }
    if (debouncedFilterValue !== filterValue) {
      debouncedSetFilterValue(filterValue);
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_contextual_tips_contextual_tip__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
      searchTerm: filterValue
    });
  });
};

// Check if the experimental slot is available before to register plugin.
if (typeof _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.__unstableInserterMenuExtension !== 'undefined') {
  (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__.registerPlugin)('block-inserter-contextual-tips', {
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContextualTips, null);
    }
  });
}
})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
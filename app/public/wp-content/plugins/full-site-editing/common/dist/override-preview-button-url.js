/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 7143:
/***/ ((module) => {

module.exports = window["wp"]["data"];

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
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

const isEditorReady = async () => new Promise(resolve => {
  const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.subscribe)(() => {
    // Calypso sends the message as soon as the iframe is loaded, so we
    // need to be sure that the editor is initialized and the core blocks
    // registered. There is an unstable selector for that, so we use
    // `isCleanNewPost` otherwise which is triggered when everything is
    // initialized if the post is new.
    const editorIsReady = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').__unstableIsEditorReady ? (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').__unstableIsEditorReady() : (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').isCleanNewPost();
    if (editorIsReady) {
      unsubscribe();
      resolve();
    }
  });
});

/**
 * The gutenberg block editor preview button opens a new window to a simple site's mapped
 * domain.
 * Adds logmein query param to editor draft post preview url to add WordPress cookies in
 * a first party context ( allowing us to avoid third party cookie issues )
 */
async function overridePreviewButtonUrl() {
  await isEditorReady();

  // Tracks when a popover is introduced into the post editor DOM
  const popoverSlotObserver = new window.MutationObserver(mutations => {
    const isComponentsPopover = node => node.classList.contains('components-popover');
    for (const record of mutations) {
      for (const node of record.addedNodes) {
        if (isComponentsPopover(node)) {
          const previewButton = node.querySelector('a[href$="preview=true"]');
          // Disables default onclick behavior for the preview button and replaces
          // it with our own window opening logic. Overriding the href directly
          // doesn't work because the custom href we apply is overridden somewhere
          // upstream.

          if (previewButton) {
            previewButton.onclick = function (e) {
              e.preventDefault();
              e.stopPropagation();
              window.open(`${previewButton.href}&logmein=direct`);
            };
          }
        }
      }
    }
  });
  const popoverSlotElem = document.querySelector('.interface-interface-skeleton ~ .popover-slot');
  if (popoverSlotElem) {
    popoverSlotObserver.observe(popoverSlotElem, {
      childList: true
    });
  }
}
overridePreviewButtonUrl();
})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UD: () => (/* binding */ popperGenerator)
/* harmony export */ });
/* unused harmony export createPopper */
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9811);
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7608);
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5678);
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8311);
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7423);
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2010);
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8179);
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2324);









var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/(/* unused pure expression or super */ null && (popperGenerator())); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ 7379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2324);

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isShadowRoot */ .Ng)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ 3177:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2324);
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9539);
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9328);
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4290);




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__/* .round */ .LI)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__/* .round */ .LI)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ 9888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1541);
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6120);
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1179);
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5678);
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8311);
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8569);
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7094);
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2324);
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3177);
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8448);
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7379);
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4455);
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9227);
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9539);















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .viewport */ .R9 ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__/* .isElement */ .vq)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A)(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__/* .isHTMLElement */ .sb)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__/* .isElement */ .vq)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__/* .isElement */ .vq)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A)(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A)(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__/* .max */ .T9)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__/* .min */ .jk)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__/* .min */ .jk)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__/* .max */ .T9)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ 9811:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3177);
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1549);
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4455);
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2324);
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4850);
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8569);
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1287);
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9539);









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__/* .round */ .LI)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__/* .round */ .LI)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__/* .isHTMLElement */ .sb)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__/* .isHTMLElement */ .sb)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__/* .isHTMLElement */ .sb)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ 7094:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9328);

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element).getComputedStyle(element);
}

/***/ }),

/***/ 8569:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2324);

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .vq)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ 1179:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8569);
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7094);
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4850);
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2733);
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9539);




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__/* .max */ .T9)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__/* .max */ .T9)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__/* .max */ .T9)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ 2812:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ 7608:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3177);
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ 4455:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ 1549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2733);
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9328);
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2324);
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2812);




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__/* .isHTMLElement */ .sb)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(node);
  }
}

/***/ }),

/***/ 8311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9328);
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4455);
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7094);
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2324);
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(726);
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8448);
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6717);








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isShadowRoot */ .Ng)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ 8448:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4455);
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8569);
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2324);



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__/* .isShadowRoot */ .Ng)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(element) // fallback

  );
}

/***/ }),

/***/ 2061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8448);
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1287);
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4455);
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2324);




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__/* .isHTMLElement */ .sb)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(node));
}

/***/ }),

/***/ 6120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9328);
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8569);
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4850);
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4290);




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(element),
    y: y
  };
}

/***/ }),

/***/ 9328:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ 2733:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9328);

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ 4850:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3177);
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8569);
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2733);



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(element).scrollLeft;
}

/***/ }),

/***/ 2324:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ng: () => (/* binding */ isShadowRoot),
/* harmony export */   sb: () => (/* binding */ isHTMLElement),
/* harmony export */   vq: () => (/* binding */ isElement)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9328);


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ 4290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6717);

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)());
}

/***/ }),

/***/ 1287:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7094);

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ 726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4455);

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element)) >= 0;
}

/***/ }),

/***/ 5678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2061);
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8448);
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9328);
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1287);




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(target)));
}

/***/ }),

/***/ 1541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DD: () => (/* binding */ placements),
/* harmony export */   GM: () => (/* binding */ modifierPhases),
/* harmony export */   Mn: () => (/* binding */ top),
/* harmony export */   OM: () => (/* binding */ basePlacements),
/* harmony export */   Ol: () => (/* binding */ variationPlacements),
/* harmony export */   R9: () => (/* binding */ viewport),
/* harmony export */   WY: () => (/* binding */ clippingParents),
/* harmony export */   _N: () => (/* binding */ end),
/* harmony export */   ir: () => (/* binding */ reference),
/* harmony export */   kb: () => (/* binding */ left),
/* harmony export */   ni: () => (/* binding */ start),
/* harmony export */   pG: () => (/* binding */ right),
/* harmony export */   qZ: () => (/* binding */ auto),
/* harmony export */   sQ: () => (/* binding */ bottom),
/* harmony export */   xf: () => (/* binding */ popper)
/* harmony export */ });
/* unused harmony exports beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite */
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ 6084:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4455);
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2324);

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isHTMLElement */ .sb)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ 1759:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9385);
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7608);
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7379);
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8311);
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5446);
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4358);
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4339);
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1212);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1541);








 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .basePlacements */ .OM));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__/* .left */ .kb, _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .right */ .pG].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .top */ .Mn : _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .left */ .kb;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .bottom */ .sQ : _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .right */ .pG;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__/* .within */ .u)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A)(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ 2393:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export mapToStyles */
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1541);
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8311);
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9328);
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8569);
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7094);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9385);
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2688);
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9539);







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__/* .round */ .LI)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__/* .round */ .LI)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .left */ .kb;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .top */ .Mn;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .top */ .Mn || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .left */ .kb || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .right */ .pG) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .end */ ._N) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .bottom */ .sQ;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .left */ .kb || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .top */ .Mn || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .bottom */ .sQ) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .end */ ._N) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .right */ .pG;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ 3461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9328);
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ 3199:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1661);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9385);
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7908);
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6476);
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7047);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1541);
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2688);






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .auto */ .qZ) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .auto */ .qZ ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .start */ .ni;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__/* .top */ .Mn, _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .bottom */ .sQ].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .right */ .pG : _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .left */ .kb : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .bottom */ .sQ : _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .top */ .Mn;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ 4584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1541);
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6476);



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__/* .top */ .Mn, _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .right */ .pG, _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .bottom */ .sQ, _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .left */ .kb].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ 4647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export distanceAndSkiddingToXY */
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9385);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1541);

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__/* .left */ .kb, _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .top */ .Mn].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__/* .left */ .kb, _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .right */ .pG].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__/* .placements */ .DD.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ 9792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4186);


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ 6922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1541);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9385);
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5446);
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3479);
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4358);
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7608);
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8311);
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6476);
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2688);
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2045);
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9539);












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .top */ .Mn : _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .left */ .kb;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .bottom */ .sQ : _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .right */ .pG;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .start */ .ni ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .start */ .ni ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__/* .within */ .u)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__/* .within */ .u)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__/* .min */ .jk)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__/* .max */ .T9)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .top */ .Mn : _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .left */ .kb;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .bottom */ .sQ : _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .right */ .pG;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__/* .top */ .Mn, _enums_js__WEBPACK_IMPORTED_MODULE_5__/* .left */ .kb].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__/* .withinMaxClamp */ .P)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__/* .within */ .u)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ 6833:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n4: () => (/* binding */ createPopper)
/* harmony export */ });
/* unused harmony export defaultModifiers */
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5461);
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3461);
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9792);
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2393);
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6084);
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4647);
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3199);
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6922);
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1759);
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4584);










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A, _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__/* .popperGenerator */ .UD)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ 7047:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2688);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1541);
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6476);
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9385);




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .placements */ .DD : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .variationPlacements */ .Ol : _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .variationPlacements */ .Ol.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .basePlacements */ .OM;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ 4186:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9385);
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2688);
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5446);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1541);




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .top */ .Mn:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .bottom */ .sQ:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .right */ .pG:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .left */ .kb:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .start */ .ni:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__/* .end */ ._N:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ 2010:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ 6476:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9888);
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8569);
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3177);
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4186);
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9227);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1541);
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2324);
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4339);
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1212);








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .clippingParents */ .WY : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .viewport */ .R9 : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .popper */ .xf : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .basePlacements */ .OM));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .popper */ .xf ? _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .reference */ .ir : _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .popper */ .xf;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__/* .isElement */ .vq)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A)(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .popper */ .xf ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .popper */ .xf && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__/* .right */ .pG, _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .bottom */ .sQ].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__/* .top */ .Mn, _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .bottom */ .sQ].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ 1212:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ 3479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ 9385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ 2045:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ 5446:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ 1661:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ 7908:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ 2688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ 9539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LI: () => (/* binding */ round),
/* harmony export */   T9: () => (/* binding */ max),
/* harmony export */   jk: () => (/* binding */ min)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ 8179:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ 4339:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2045);

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(), paddingObject);
}

/***/ }),

/***/ 7423:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1541);
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__/* .modifierPhases */ .GM.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ 9227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ 6717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ 4358:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ withinMaxClamp),
/* harmony export */   u: () => (/* binding */ within)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9539);

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .max */ .T9)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__/* .min */ .jk)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ 8620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ compile)
/* harmony export */ });
/* harmony import */ var _tannin_postfix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3412);
/* harmony import */ var _tannin_evaluate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7336);



/**
 * Given a C expression, returns a function which can be called to evaluate its
 * result.
 *
 * @example
 *
 * ```js
 * import compile from '@tannin/compile';
 *
 * const evaluate = compile( 'n > 1' );
 *
 * evaluate( { n: 2 } );
 * // ⇒ true
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {(variables?:{[variable:string]:*})=>*} Compiled evaluator.
 */
function compile( expression ) {
	var terms = (0,_tannin_postfix__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)( expression );

	return function( variables ) {
		return (0,_tannin_evaluate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)( terms, variables );
	};
}


/***/ }),

/***/ 7336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ evaluate)
/* harmony export */ });
/**
 * Operator callback functions.
 *
 * @type {Object}
 */
var OPERATORS = {
	'!': function( a ) {
		return ! a;
	},
	'*': function( a, b ) {
		return a * b;
	},
	'/': function( a, b ) {
		return a / b;
	},
	'%': function( a, b ) {
		return a % b;
	},
	'+': function( a, b ) {
		return a + b;
	},
	'-': function( a, b ) {
		return a - b;
	},
	'<': function( a, b ) {
		return a < b;
	},
	'<=': function( a, b ) {
		return a <= b;
	},
	'>': function( a, b ) {
		return a > b;
	},
	'>=': function( a, b ) {
		return a >= b;
	},
	'==': function( a, b ) {
		return a === b;
	},
	'!=': function( a, b ) {
		return a !== b;
	},
	'&&': function( a, b ) {
		return a && b;
	},
	'||': function( a, b ) {
		return a || b;
	},
	'?:': function( a, b, c ) {
		if ( a ) {
			throw b;
		}

		return c;
	},
};

/**
 * Given an array of postfix terms and operand variables, returns the result of
 * the postfix evaluation.
 *
 * @example
 *
 * ```js
 * import evaluate from '@tannin/evaluate';
 *
 * // 3 + 4 * 5 / 6 ⇒ '3 4 5 * 6 / +'
 * const terms = [ '3', '4', '5', '*', '6', '/', '+' ];
 *
 * evaluate( terms, {} );
 * // ⇒ 6.333333333333334
 * ```
 *
 * @param {string[]} postfix   Postfix terms.
 * @param {Object}   variables Operand variables.
 *
 * @return {*} Result of evaluation.
 */
function evaluate( postfix, variables ) {
	var stack = [],
		i, j, args, getOperatorResult, term, value;

	for ( i = 0; i < postfix.length; i++ ) {
		term = postfix[ i ];

		getOperatorResult = OPERATORS[ term ];
		if ( getOperatorResult ) {
			// Pop from stack by number of function arguments.
			j = getOperatorResult.length;
			args = Array( j );
			while ( j-- ) {
				args[ j ] = stack.pop();
			}

			try {
				value = getOperatorResult.apply( null, args );
			} catch ( earlyReturn ) {
				return earlyReturn;
			}
		} else if ( variables.hasOwnProperty( term ) ) {
			value = variables[ term ];
		} else {
			value = +term;
		}

		stack.push( value );
	}

	return stack[ 0 ];
}


/***/ }),

/***/ 4043:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ pluralForms)
/* harmony export */ });
/* harmony import */ var _tannin_compile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8620);


/**
 * Given a C expression, returns a function which, when called with a value,
 * evaluates the result with the value assumed to be the "n" variable of the
 * expression. The result will be coerced to its numeric equivalent.
 *
 * @param {string} expression C expression.
 *
 * @return {Function} Evaluator function.
 */
function pluralForms( expression ) {
	var evaluate = (0,_tannin_compile__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)( expression );

	return function( n ) {
		return +evaluate( { n: n } );
	};
}


/***/ }),

/***/ 3412:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ postfix)
/* harmony export */ });
var PRECEDENCE, OPENERS, TERMINATORS, PATTERN;

/**
 * Operator precedence mapping.
 *
 * @type {Object}
 */
PRECEDENCE = {
	'(': 9,
	'!': 8,
	'*': 7,
	'/': 7,
	'%': 7,
	'+': 6,
	'-': 6,
	'<': 5,
	'<=': 5,
	'>': 5,
	'>=': 5,
	'==': 4,
	'!=': 4,
	'&&': 3,
	'||': 2,
	'?': 1,
	'?:': 1,
};

/**
 * Characters which signal pair opening, to be terminated by terminators.
 *
 * @type {string[]}
 */
OPENERS = [ '(', '?' ];

/**
 * Characters which signal pair termination, the value an array with the
 * opener as its first member. The second member is an optional operator
 * replacement to push to the stack.
 *
 * @type {string[]}
 */
TERMINATORS = {
	')': [ '(' ],
	':': [ '?', '?:' ],
};

/**
 * Pattern matching operators and openers.
 *
 * @type {RegExp}
 */
PATTERN = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;

/**
 * Given a C expression, returns the equivalent postfix (Reverse Polish)
 * notation terms as an array.
 *
 * If a postfix string is desired, simply `.join( ' ' )` the result.
 *
 * @example
 *
 * ```js
 * import postfix from '@tannin/postfix';
 *
 * postfix( 'n > 1' );
 * // ⇒ [ 'n', '1', '>' ]
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {string[]} Postfix terms.
 */
function postfix( expression ) {
	var terms = [],
		stack = [],
		match, operator, term, element;

	while ( ( match = expression.match( PATTERN ) ) ) {
		operator = match[ 0 ];

		// Term is the string preceding the operator match. It may contain
		// whitespace, and may be empty (if operator is at beginning).
		term = expression.substr( 0, match.index ).trim();
		if ( term ) {
			terms.push( term );
		}

		while ( ( element = stack.pop() ) ) {
			if ( TERMINATORS[ operator ] ) {
				if ( TERMINATORS[ operator ][ 0 ] === element ) {
					// Substitution works here under assumption that because
					// the assigned operator will no longer be a terminator, it
					// will be pushed to the stack during the condition below.
					operator = TERMINATORS[ operator ][ 1 ] || operator;
					break;
				}
			} else if ( OPENERS.indexOf( element ) >= 0 || PRECEDENCE[ element ] < PRECEDENCE[ operator ] ) {
				// Push to stack if either an opener or when pop reveals an
				// element of lower precedence.
				stack.push( element );
				break;
			}

			// For each popped from stack, push to terms.
			terms.push( element );
		}

		if ( ! TERMINATORS[ operator ] ) {
			stack.push( operator );
		}

		// Slice matched fragment from expression to continue match.
		expression = expression.substr( match.index + operator.length );
	}

	// Push remainder of operand, if exists, to terms.
	expression = expression.trim();
	if ( expression ) {
		terms.push( expression );
	}

	// Pop remaining items from stack into terms.
	return terms.concat( stack.reverse() );
}


/***/ }),

/***/ 7315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ sprintf)
/* harmony export */ });
/**
 * Regular expression matching format placeholder syntax.
 *
 * The pattern for matching named arguments is a naive and incomplete matcher
 * against valid JavaScript identifier names.
 *
 * via Mathias Bynens:
 *
 * >An identifier must start with $, _, or any character in the Unicode
 * >categories “Uppercase letter (Lu)”, “Lowercase letter (Ll)”, “Titlecase
 * >letter (Lt)”, “Modifier letter (Lm)”, “Other letter (Lo)”, or “Letter
 * >number (Nl)”.
 * >
 * >The rest of the string can contain the same characters, plus any U+200C zero
 * >width non-joiner characters, U+200D zero width joiner characters, and
 * >characters in the Unicode categories “Non-spacing mark (Mn)”, “Spacing
 * >combining mark (Mc)”, “Decimal digit number (Nd)”, or “Connector
 * >punctuation (Pc)”.
 *
 * If browser support is constrained to those supporting ES2015, this could be
 * made more accurate using the `u` flag:
 *
 * ```
 * /^[$_\p{L}\p{Nl}][$_\p{L}\p{Nl}\u200C\u200D\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*$/u;
 * ```
 *
 * @see http://www.pixelbeat.org/programming/gcc/format_specs.html
 * @see https://mathiasbynens.be/notes/javascript-identifiers#valid-identifier-names
 *
 * @type {RegExp}
 */
var PATTERN = /%(((\d+)\$)|(\(([$_a-zA-Z][$_a-zA-Z0-9]*)\)))?[ +0#-]*\d*(\.(\d+|\*))?(ll|[lhqL])?([cduxXefgsp%])/g;
//               ▲         ▲                    ▲       ▲  ▲            ▲           ▲ type
//               │         │                    │       │  │            └ Length (unsupported)
//               │         │                    │       │  └ Precision / max width
//               │         │                    │       └ Min width (unsupported)
//               │         │                    └ Flags (unsupported)
//               └ Index   └ Name (for named arguments)

/**
 * Given a format string, returns string with arguments interpolatation.
 * Arguments can either be provided directly via function arguments spread, or
 * with an array as the second argument.
 *
 * @see https://en.wikipedia.org/wiki/Printf_format_string
 *
 * @example
 *
 * ```js
 * import sprintf from '@tannin/sprintf';
 *
 * sprintf( 'Hello %s!', 'world' );
 * // ⇒ 'Hello world!'
 * ```
 *
 * @param {string} string printf format string
 * @param {Array}  [args] String arguments.
 *
 * @return {string} Formatted string.
 */
function sprintf( string, args ) {
	var i;

	if ( ! Array.isArray( args ) ) {
		// Construct a copy of arguments from index one, used for replace
		// function placeholder substitution.
		args = new Array( arguments.length - 1 );
		for ( i = 1; i < arguments.length; i++ ) {
			args[ i - 1 ] = arguments[ i ];
		}
	}

	i = 1;

	return string.replace( PATTERN, function() {
		var index, name, precision, type, value;

		index = arguments[ 3 ];
		name = arguments[ 5 ];
		precision = arguments[ 7 ];
		type = arguments[ 9 ];

		// There's no placeholder substitution in the explicit "%", meaning it
		// is not necessary to increment argument index.
		if ( type === '%' ) {
			return '%';
		}

		// Asterisk precision determined by peeking / shifting next argument.
		if ( precision === '*' ) {
			precision = args[ i - 1 ];
			i++;
		}

		if ( name !== undefined ) {
			// If it's a named argument, use name.
			if ( args[ 0 ] && typeof args[ 0 ] === 'object' &&
					args[ 0 ].hasOwnProperty( name ) ) {
				value = args[ 0 ][ name ];
			}
		} else {
			// If not a positional argument, use counter value.
			if ( index === undefined ) {
				index = i;
			}

			i++;

			// Positional argument.
			value = args[ index - 1 ];
		}

		// Parse as type.
		if ( type === 'f' ) {
			value = parseFloat( value ) || 0;
		} else if ( type === 'd' ) {
			value = parseInt( value ) || 0;
		}

		// Apply precision.
		if ( precision !== undefined ) {
			if ( type === 'f' ) {
				value = value.toFixed( precision );
			} else if ( type === 's' ) {
				value = value.substr( 0, precision );
			}
		}

		// To avoid "undefined" concatenation, return empty string if no
		// placeholder substitution can be performed.
		return value !== undefined && value !== null ? value : '';
	} );
}


/***/ }),

/***/ 4446:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifiying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7898:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5573);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1085);
/**
 * WordPress dependencies
 */


const close = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (close);
//# sourceMappingURL=close.js.map

/***/ }),

/***/ 6263:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5573);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1085);
/**
 * WordPress dependencies
 */


const globe = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M12 3.3c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8s-4-8.8-8.8-8.8zm6.5 5.5h-2.6C15.4 7.3 14.8 6 14 5c2 .6 3.6 2 4.5 3.8zm.7 3.2c0 .6-.1 1.2-.2 1.8h-2.9c.1-.6.1-1.2.1-1.8s-.1-1.2-.1-1.8H19c.2.6.2 1.2.2 1.8zM12 18.7c-1-.7-1.8-1.9-2.3-3.5h4.6c-.5 1.6-1.3 2.9-2.3 3.5zm-2.6-4.9c-.1-.6-.1-1.1-.1-1.8 0-.6.1-1.2.1-1.8h5.2c.1.6.1 1.1.1 1.8s-.1 1.2-.1 1.8H9.4zM4.8 12c0-.6.1-1.2.2-1.8h2.9c-.1.6-.1 1.2-.1 1.8 0 .6.1 1.2.1 1.8H5c-.2-.6-.2-1.2-.2-1.8zM12 5.3c1 .7 1.8 1.9 2.3 3.5H9.7c.5-1.6 1.3-2.9 2.3-3.5zM10 5c-.8 1-1.4 2.3-1.8 3.8H5.5C6.4 7 8 5.6 10 5zM5.5 15.3h2.6c.4 1.5 1 2.8 1.8 3.7-1.8-.6-3.5-2-4.4-3.7zM14 19c.8-1 1.4-2.2 1.8-3.7h2.6C17.6 17 16 18.4 14 19z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globe);
//# sourceMappingURL=globe.js.map

/***/ }),

/***/ 5756:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5573);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1085);
/**
 * WordPress dependencies
 */


const link = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (link);
//# sourceMappingURL=link.js.map

/***/ }),

/***/ 3634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s9: () => (/* binding */ useI18n)
/* harmony export */ });
/* unused harmony exports I18nProvider, withI18n */
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1085);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



/**
 * Utility to make a new context value
 *
 * @param i18n
 */
function makeContextValue(i18n) {
  return {
    __: i18n.__.bind(i18n),
    _x: i18n._x.bind(i18n),
    _n: i18n._n.bind(i18n),
    _nx: i18n._nx.bind(i18n),
    isRTL: i18n.isRTL.bind(i18n),
    hasTranslation: i18n.hasTranslation.bind(i18n)
  };
}
const I18nContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)(makeContextValue(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.defaultI18n));
/**
 * The `I18nProvider` should be mounted above any localized components:
 *
 * @example
 * ```js
 * import { createI18n } from '@wordpress/i18n';
 * import { I18nProvider } from '@wordpress/react-i18n';
 * const i18n = createI18n();
 *
 * ReactDom.render(
 * 	<I18nProvider i18n={ i18n }>
 * 		<App />
 * 	</I18nProvider>,
 * 	el
 * );
 * ```
 *
 * You can also instantiate the provider without the `i18n` prop. In that case it will use the
 * default `I18n` instance exported from `@wordpress/i18n`.
 *
 * @param props i18n provider props.
 * @return Children wrapped in the I18nProvider.
 */
function I18nProvider(props) {
  const {
    children,
    i18n = defaultI18n
  } = props;
  const [update, forceUpdate] = useReducer(() => [], []);

  // Rerender translations whenever the i18n instance fires a change event.
  useEffect(() => i18n.subscribe(forceUpdate), [i18n]);
  const value = useMemo(() => makeContextValue(i18n), [i18n, update]);
  return /*#__PURE__*/_jsx(I18nContext.Provider, {
    value: value,
    children: children
  });
}

/**
 * React hook providing access to i18n functions. It exposes the `__`, `_x`, `_n`, `_nx`,
 * `isRTL` and `hasTranslation` functions from [`@wordpress/i18n`](../i18n).
 * Refer to their documentation there.
 *
 * @example
 * ```js
 * import { useI18n } from '@wordpress/react-i18n';
 *
 * function MyComponent() {
 * 	const { __ } = useI18n();
 * 	return __( 'Hello, world!' );
 * }
 * ```
 */
const useI18n = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(I18nContext);
/**
 * React higher-order component that passes the i18n translate functions (the same set
 * as exposed by the `useI18n` hook) to the wrapped component as props.
 *
 * @example
 * ```js
 * import { withI18n } from '@wordpress/react-i18n';
 *
 * function MyComponent( { __ } ) {
 * 	return __( 'Hello, world!' );
 * }
 *
 * export default withI18n( MyComponent );
 * ```
 *
 * @param InnerComponent React component to be wrapped and receive the i18n functions like `__`
 * @return The wrapped component
 */
function withI18n(InnerComponent) {
  const EnhancedComponent = props => {
    const i18nProps = useI18n();
    return /*#__PURE__*/_jsx(InnerComponent, {
      ...props,
      ...i18nProps
    });
  };
  const innerComponentName = InnerComponent.displayName || InnerComponent.name || 'Component';
  EnhancedComponent.displayName = `WithI18n(${innerComponentName})`;
  return EnhancedComponent;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 49:
/***/ ((module) => {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),

/***/ 3284:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {}
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim()
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


/***/ }),

/***/ 8437:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 46:
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 2191:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(461);
var assert = __webpack_require__(7784);

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
exports.BlockHash = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};


/***/ }),

/***/ 2986:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(461);
var common = __webpack_require__(2191);
var shaCommon = __webpack_require__(600);

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_5 = utils.sum32_5;
var ft_1 = shaCommon.ft_1;
var BlockHash = common.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
module.exports = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ 536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(461);
var common = __webpack_require__(2191);
var shaCommon = __webpack_require__(600);
var assert = __webpack_require__(7784);

var sum32 = utils.sum32;
var sum32_4 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash = common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash);
module.exports = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32(T1, T2);
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
  this.h[5] = sum32(this.h[5], f);
  this.h[6] = sum32(this.h[6], g);
  this.h[7] = sum32(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ 600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(461);
var rotr32 = utils.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
exports.ft_1 = ft_1;

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
exports.ch32 = ch32;

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
exports.maj32 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}
exports.p32 = p32;

function s0_256(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
exports.s0_256 = s0_256;

function s1_256(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
exports.s1_256 = s1_256;

function g0_256(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
exports.g0_256 = g0_256;

function g1_256(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
exports.g1_256 = g1_256;


/***/ }),

/***/ 461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var assert = __webpack_require__(7784);
var inherits = __webpack_require__(5615);

exports.inherits = inherits;

function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192;
          res[p++] = (c & 63) | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = (c >> 18) | 240;
          res[p++] = ((c >> 12) & 63) | 128;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        } else {
          res[p++] = (c >> 12) | 224;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
exports.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
exports.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
exports.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
exports.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
exports.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
exports.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
exports.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
exports.split32 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
exports.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
exports.rotl32 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
exports.sum32 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
exports.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
exports.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
exports.sum32_5 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
exports.sum64_hi = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}
exports.shr64_hi = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.shr64_lo = shr64_lo;


/***/ }),

/***/ 5615:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 2327:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var events = __webpack_require__(46)
var inherits = __webpack_require__(5615)

module.exports = LRU

function LRU (opts) {
  if (!(this instanceof LRU)) return new LRU(opts)
  if (typeof opts === 'number') opts = {max: opts}
  if (!opts) opts = {}
  events.EventEmitter.call(this)
  this.cache = {}
  this.head = this.tail = null
  this.length = 0
  this.max = opts.max || 1000
  this.maxAge = opts.maxAge || 0
}

inherits(LRU, events.EventEmitter)

Object.defineProperty(LRU.prototype, 'keys', {
  get: function () { return Object.keys(this.cache) }
})

LRU.prototype.clear = function () {
  this.cache = {}
  this.head = this.tail = null
  this.length = 0
}

LRU.prototype.remove = function (key) {
  if (typeof key !== 'string') key = '' + key
  if (!this.cache.hasOwnProperty(key)) return

  var element = this.cache[key]
  delete this.cache[key]
  this._unlink(key, element.prev, element.next)
  return element.value
}

LRU.prototype._unlink = function (key, prev, next) {
  this.length--

  if (this.length === 0) {
    this.head = this.tail = null
  } else {
    if (this.head === key) {
      this.head = prev
      this.cache[this.head].next = null
    } else if (this.tail === key) {
      this.tail = next
      this.cache[this.tail].prev = null
    } else {
      this.cache[prev].next = next
      this.cache[next].prev = prev
    }
  }
}

LRU.prototype.peek = function (key) {
  if (!this.cache.hasOwnProperty(key)) return

  var element = this.cache[key]

  if (!this._checkAge(key, element)) return
  return element.value
}

LRU.prototype.set = function (key, value) {
  if (typeof key !== 'string') key = '' + key

  var element

  if (this.cache.hasOwnProperty(key)) {
    element = this.cache[key]
    element.value = value
    if (this.maxAge) element.modified = Date.now()

    // If it's already the head, there's nothing more to do:
    if (key === this.head) return value
    this._unlink(key, element.prev, element.next)
  } else {
    element = {value: value, modified: 0, next: null, prev: null}
    if (this.maxAge) element.modified = Date.now()
    this.cache[key] = element

    // Eviction is only possible if the key didn't already exist:
    if (this.length === this.max) this.evict()
  }

  this.length++
  element.next = null
  element.prev = this.head

  if (this.head) this.cache[this.head].next = key
  this.head = key

  if (!this.tail) this.tail = key
  return value
}

LRU.prototype._checkAge = function (key, element) {
  if (this.maxAge && (Date.now() - element.modified) > this.maxAge) {
    this.remove(key)
    this.emit('evict', {key: key, value: element.value})
    return false
  }
  return true
}

LRU.prototype.get = function (key) {
  if (typeof key !== 'string') key = '' + key
  if (!this.cache.hasOwnProperty(key)) return

  var element = this.cache[key]

  if (!this._checkAge(key, element)) return

  if (this.head !== key) {
    if (key === this.tail) {
      this.tail = element.next
      this.cache[this.tail].prev = null
    } else {
      // Set prev.next -> element.next:
      this.cache[element.prev].next = element.next
    }

    // Set element.next.prev -> element.prev:
    this.cache[element.next].prev = element.prev

    // Element is the new head
    this.cache[this.head].next = key
    element.prev = this.head
    element.next = null
    this.head = key
  }

  return element.value
}

LRU.prototype.evict = function () {
  if (!this.tail) return
  var key = this.tail
  var value = this.remove(this.tail)
  this.emit('evict', {key: key, value: value})
}


/***/ }),

/***/ 3896:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 9165:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 349:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 3736:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 7685:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 4707:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 7347:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 9429:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5299:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 6401:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 6764:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 6025:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5888:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 1301:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5089:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 7784:
/***/ ((module) => {

module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};


/***/ }),

/***/ 9772:
/***/ ((module) => {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ 4803:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ usePopper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5795);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6833);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9772);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8615);





var EMPTY_MODIFIERS = [];
var usePopper = function usePopper(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }

  var prevOptions = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || 'bottom',
    strategy: options.strategy || 'absolute',
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: '0',
        top: '0'
      },
      arrow: {
        position: 'absolute'
      }
    },
    attributes: {}
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var updateStateModifier = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      name: 'updateState',
      enabled: true,
      phase: 'write',
      fn: function fn(_ref) {
        var state = _ref.state;
        var elements = Object.keys(state.elements);
        react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(function () {
          setState({
            styles: (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .fromEntries */ .PW)(elements.map(function (element) {
              return [element, state.styles[element] || {}];
            })),
            attributes: (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .fromEntries */ .PW)(elements.map(function (element) {
              return [element, state.attributes[element]];
            }))
          });
        });
      },
      requires: ['computeStyles']
    };
  }, []);
  var popperOptions = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: 'applyStyles',
        enabled: false
      }])
    };

    if (react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default()(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .Es)(function () {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .Es)(function () {
    if (referenceElement == null || popperElement == null) {
      return;
    }

    var createPopper = options.createPopper || _popperjs_core__WEBPACK_IMPORTED_MODULE_4__/* .createPopper */ .n4;
    var popperInstance = createPopper(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function () {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

/***/ }),

/***/ 8615:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Es: () => (/* binding */ useIsomorphicLayoutEffect),
/* harmony export */   PW: () => (/* binding */ fromEntries)
/* harmony export */ });
/* unused harmony exports unwrapArray, safeInvoke, setRef */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === 'function') {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
      ref.current = node;
    }
};
/**
 * Simple ponyfill for Object.fromEntries
 */

var fromEntries = function fromEntries(entries) {
  return entries.reduce(function (acc, _ref) {
    var key = _ref[0],
        value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
/**
 * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
 */

var useIsomorphicLayoutEffect =  true && window.document && window.document.createElement ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

/***/ }),

/***/ 3335:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(1609),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}__webpack_unused_export__=l;exports.jsx=q;__webpack_unused_export__=q;


/***/ }),

/***/ 1085:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(3335);
} else {}


/***/ }),

/***/ 2714:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Tannin)
/* harmony export */ });
/* harmony import */ var _tannin_plural_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4043);


/**
 * Tannin constructor options.
 *
 * @typedef {Object} TanninOptions
 *
 * @property {string}   [contextDelimiter] Joiner in string lookup with context.
 * @property {Function} [onMissingKey]     Callback to invoke when key missing.
 */

/**
 * Domain metadata.
 *
 * @typedef {Object} TanninDomainMetadata
 *
 * @property {string}            [domain]       Domain name.
 * @property {string}            [lang]         Language code.
 * @property {(string|Function)} [plural_forms] Plural forms expression or
 *                                              function evaluator.
 */

/**
 * Domain translation pair respectively representing the singular and plural
 * translation.
 *
 * @typedef {[string,string]} TanninTranslation
 */

/**
 * Locale data domain. The key is used as reference for lookup, the value an
 * array of two string entries respectively representing the singular and plural
 * translation.
 *
 * @typedef {{[key:string]:TanninDomainMetadata|TanninTranslation,'':TanninDomainMetadata|TanninTranslation}} TanninLocaleDomain
 */

/**
 * Jed-formatted locale data.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @typedef {{[domain:string]:TanninLocaleDomain}} TanninLocaleData
 */

/**
 * Default Tannin constructor options.
 *
 * @type {TanninOptions}
 */
var DEFAULT_OPTIONS = {
	contextDelimiter: '\u0004',
	onMissingKey: null,
};

/**
 * Given a specific locale data's config `plural_forms` value, returns the
 * expression.
 *
 * @example
 *
 * ```
 * getPluralExpression( 'nplurals=2; plural=(n != 1);' ) === '(n != 1)'
 * ```
 *
 * @param {string} pf Locale data plural forms.
 *
 * @return {string} Plural forms expression.
 */
function getPluralExpression( pf ) {
	var parts, i, part;

	parts = pf.split( ';' );

	for ( i = 0; i < parts.length; i++ ) {
		part = parts[ i ].trim();
		if ( part.indexOf( 'plural=' ) === 0 ) {
			return part.substr( 7 );
		}
	}
}

/**
 * Tannin constructor.
 *
 * @class
 *
 * @param {TanninLocaleData} data      Jed-formatted locale data.
 * @param {TanninOptions}    [options] Tannin options.
 */
function Tannin( data, options ) {
	var key;

	/**
	 * Jed-formatted locale data.
	 *
	 * @name Tannin#data
	 * @type {TanninLocaleData}
	 */
	this.data = data;

	/**
	 * Plural forms function cache, keyed by plural forms string.
	 *
	 * @name Tannin#pluralForms
	 * @type {Object<string,Function>}
	 */
	this.pluralForms = {};

	/**
	 * Effective options for instance, including defaults.
	 *
	 * @name Tannin#options
	 * @type {TanninOptions}
	 */
	this.options = {};

	for ( key in DEFAULT_OPTIONS ) {
		this.options[ key ] = options !== undefined && key in options
			? options[ key ]
			: DEFAULT_OPTIONS[ key ];
	}
}

/**
 * Returns the plural form index for the given domain and value.
 *
 * @param {string} domain Domain on which to calculate plural form.
 * @param {number} n      Value for which plural form is to be calculated.
 *
 * @return {number} Plural form index.
 */
Tannin.prototype.getPluralForm = function( domain, n ) {
	var getPluralForm = this.pluralForms[ domain ],
		config, plural, pf;

	if ( ! getPluralForm ) {
		config = this.data[ domain ][ '' ];

		pf = (
			config[ 'Plural-Forms' ] ||
			config[ 'plural-forms' ] ||
			// Ignore reason: As known, there's no way to document the empty
			// string property on a key to guarantee this as metadata.
			// @ts-ignore
			config.plural_forms
		);

		if ( typeof pf !== 'function' ) {
			plural = getPluralExpression(
				config[ 'Plural-Forms' ] ||
				config[ 'plural-forms' ] ||
				// Ignore reason: As known, there's no way to document the empty
				// string property on a key to guarantee this as metadata.
				// @ts-ignore
				config.plural_forms
			);

			pf = (0,_tannin_plural_forms__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)( plural );
		}

		getPluralForm = this.pluralForms[ domain ] = pf;
	}

	return getPluralForm( n );
};

/**
 * Translate a string.
 *
 * @param {string}      domain   Translation domain.
 * @param {string|void} context  Context distinguishing terms of the same name.
 * @param {string}      singular Primary key for translation lookup.
 * @param {string=}     plural   Fallback value used for non-zero plural
 *                               form index.
 * @param {number=}     n        Value to use in calculating plural form.
 *
 * @return {string} Translated string.
 */
Tannin.prototype.dcnpgettext = function( domain, context, singular, plural, n ) {
	var index, key, entry;

	if ( n === undefined ) {
		// Default to singular.
		index = 0;
	} else {
		// Find index by evaluating plural form for value.
		index = this.getPluralForm( domain, n );
	}

	key = singular;

	// If provided, context is prepended to key with delimiter.
	if ( context ) {
		key = context + this.options.contextDelimiter + singular;
	}

	entry = this.data[ domain ][ key ];

	// Verify not only that entry exists, but that the intended index is within
	// range and non-empty.
	if ( entry && entry[ index ] ) {
		return entry[ index ];
	}

	if ( this.options.onMissingKey ) {
		this.options.onMissingKey( singular, domain );
	}

	// If entry not found, fall back to singular vs. plural with zero index
	// representing the singular value.
	return index === 0 ? singular : plural;
};


/***/ }),

/***/ 9372:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ ShouldShowFirstPostPublishedModalProvider),
/* harmony export */   r: () => (/* binding */ useShouldShowFirstPostPublishedModal)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);





const ShouldShowFPPModalContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createContext(false);
const useShouldShowFirstPostPublishedModal = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(ShouldShowFPPModalContext);
};
const ShouldShowFirstPostPublishedModalProvider = function ({
  children
}) {
  const {
    fetchShouldShowFirstPostPublishedModal
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('automattic/wpcom-welcome-guide');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchShouldShowFirstPostPublishedModal();
  }, [fetchShouldShowFirstPostPublishedModal]);
  const ShouldShowFirstPostPublishedModal = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select('automattic/wpcom-welcome-guide').getShouldShowFirstPostPublishedModal(), []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ShouldShowFPPModalContext.Provider, {
    value: ShouldShowFirstPostPublishedModal
  }, children);
};

/***/ }),

/***/ 1161:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ useHasSeenSellerCelebrationModal),
/* harmony export */   f: () => (/* binding */ HasSeenSellerCelebrationModalProvider)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);





const HasSeenSCModalContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createContext({
  hasSeenSellerCelebrationModal: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateHasSeenSellerCelebrationModal: () => {}
});
const useHasSeenSellerCelebrationModal = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(HasSeenSCModalContext);
};
const HasSeenSellerCelebrationModalProvider = function ({
  children
}) {
  const [hasSeenSellerCelebrationModal, setHasSeenSellerCelebrationModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  function fetchHasSeenSellerCelebrationModal() {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/wpcom/v2/block-editor/has-seen-seller-celebration-modal'
    }).then(result => setHasSeenSellerCelebrationModal(result.has_seen_seller_celebration_modal)).catch(() => setHasSeenSellerCelebrationModal(false));
  }
  function updateHasSeenSellerCelebrationModal(value) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      method: 'PUT',
      path: '/wpcom/v2/block-editor/has-seen-seller-celebration-modal',
      data: {
        has_seen_seller_celebration_modal: value
      }
    }).finally(() => {
      setHasSeenSellerCelebrationModal(true);
    });
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchHasSeenSellerCelebrationModal();
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HasSeenSCModalContext.Provider, {
    value: {
      hasSeenSellerCelebrationModal,
      updateHasSeenSellerCelebrationModal
    }
  }, children);
};

/***/ }),

/***/ 4873:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Watch the user's block selection and keep a note if they ever select a payments
 * block.
 * A payments block is any block with 'payments' in the name, like jetpack/simple-payments
 * or jetpack/recurring-payments.
 * Selecting a block whose direct parent has 'payments' in the name also counts.
 * This is to account for clicking inside the button in a payments block, for example.
 * @returns {boolean} Has the user selected a payments block (or a direct descendant) at least once?
 */
const useHasSelectedPaymentBlockOnce = () => {
  const [hasSelectedPaymentsOnce, setHasSelectedPaymentsOnce] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Get the name of the currently selected block
  const selectedBlockName = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    // Special case: We know we're returning true, so we don't need to find block names.
    if (hasSelectedPaymentsOnce) {
      return '';
    }
    const selectedBlock = select('core/block-editor').getSelectedBlock();
    return selectedBlock?.name ?? '';
  });

  // Get the name of the currently selected block's direct parent, if one exists
  const parentSelectedBlockName = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    // Special case: We know we're returning true, so we don't need to find block names.
    if (hasSelectedPaymentsOnce) {
      return '';
    }
    const selectedBlock = select('core/block-editor').getSelectedBlock();
    if (selectedBlock?.clientId) {
      const parentIds = select('core/block-editor').getBlockParents(selectedBlock?.clientId);
      if (parentIds && parentIds.length) {
        const parent = select('core/block-editor').getBlock(parentIds[parentIds.length - 1]);
        return parent?.name ?? '';
      }
    }
    return '';
  });

  // On selection change, set hasSelectedPaymentsOnce=true if block name or parent's block name contains 'payments'
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!hasSelectedPaymentsOnce && (selectedBlockName.includes('payments') || parentSelectedBlockName.includes('payments'))) {
      setHasSelectedPaymentsOnce(true);
    }
  }, [selectedBlockName, parentSelectedBlockName, hasSelectedPaymentsOnce, setHasSelectedPaymentsOnce]);
  return hasSelectedPaymentsOnce;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useHasSelectedPaymentBlockOnce);

/***/ }),

/***/ 6822:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3166);
/* harmony import */ var _has_seen_seller_celebration_modal_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1161);
/* harmony import */ var _use_has_selected_payment_block_once__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4873);





const useShouldShowSellerCelebrationModal = () => {
  const [shouldShowSellerCelebrationModal, setShouldShowSellerCelebrationModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    siteIntent: intent
  } = (0,_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)();
  const hasSelectedPaymentsOnce = (0,_use_has_selected_payment_block_once__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)();
  const {
    hasSeenSellerCelebrationModal
  } = (0,_has_seen_seller_celebration_modal_context__WEBPACK_IMPORTED_MODULE_3__/* .useHasSeenSellerCelebrationModal */ .Z)();
  const hasPaymentsBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const isSiteEditor = !!select('core/edit-site');
    if (isSiteEditor) {
      const page = select('core/edit-site').getPage();
      const pageId = parseInt(page?.context?.postId);
      const pageEntity = select('core').getEntityRecord('postType', 'page', pageId);
      let paymentsBlock = false;
      // Only check for payment blocks if we haven't seen the celebration modal text yet
      if (!hasSeenSellerCelebrationModal) {
        const didCountRecurringPayments = select('core/block-editor').getGlobalBlockCount('jetpack/recurring-payments') > 0;
        const didCountSimplePayments = select('core/block-editor').getGlobalBlockCount('jetpack/simple-payments') > 0;
        paymentsBlock = (pageEntity?.content?.raw?.includes('<!-- wp:jetpack/recurring-payments -->') || pageEntity?.content?.raw?.includes('<!-- wp:jetpack/simple-payments -->') || didCountRecurringPayments || didCountSimplePayments) ?? false;
      }
      return paymentsBlock;
    }
    let paymentBlockCount = 0;
    // Only check for payment blocks if we haven't seen the celebration modal yet
    if (!hasSeenSellerCelebrationModal) {
      paymentBlockCount += select('core/block-editor').getGlobalBlockCount('jetpack/recurring-payments');
      paymentBlockCount += select('core/block-editor').getGlobalBlockCount('jetpack/simple-payments');
    }
    return paymentBlockCount > 0;
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (intent === 'sell' && hasPaymentsBlock && hasSelectedPaymentsOnce && !hasSeenSellerCelebrationModal) {
      setShouldShowSellerCelebrationModal(true);
    }
  }, [intent, hasPaymentsBlock, hasSelectedPaymentsOnce, hasSeenSellerCelebrationModal]);
  return shouldShowSellerCelebrationModal;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useShouldShowSellerCelebrationModal);

/***/ }),

/***/ 3166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// FIXME: We can use `useSiteIntent` from `@automattic/data-stores` and remove this.
// https://github.com/Automattic/wp-calypso/pull/73565#discussion_r1113839120
const useSiteIntent = () => {
  // We can skip the request altogether since this information is already added to the window in
  // https://github.com/Automattic/jetpack/blob/e135711f9a130946dae1bca6c9c0967350331067/projects/plugins/jetpack/extensions/plugins/launchpad-save-modal/launchpad-save-modal.php#LL31C8-L31C34
  // We could update this to use the launchpad endpoint in jetpack-mu-wpcom, but that may require
  // permissions changes as it requires 'manage_options' to read
  // https://github.com/Automattic/jetpack/blob/e135711f9a130946dae1bca6c9c0967350331067/projects/packages/jetpack-mu-wpcom/src/features/wpcom-endpoints/class-wpcom-rest-api-v2-endpoint-launchpad.php#L121.
  return {
    siteIntent: window.Jetpack_LaunchpadSaveModal?.siteIntentOption,
    siteIntentFetched: true
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSiteIntent);

/***/ }),

/***/ 676:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var wpcom_proxy_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1445);



const useSitePlan = siteIdOrSlug => {
  const [sitePlan, setSitePlan] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const fetchSite = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async () => {
    const siteObj = await (0,wpcom_proxy_request__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay)({
      path: `/sites/${siteIdOrSlug}?http_envelope=1`,
      apiVersion: '1.1'
    });
    if (siteObj?.plan) {
      setSitePlan(siteObj.plan);
    }
  }, [siteIdOrSlug]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchSite();
  }, [fetchSite]);
  return sitePlan;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSitePlan);

/***/ }),

/***/ 2469:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ HasSeenVideoCelebrationModalProvider),
/* harmony export */   v: () => (/* binding */ useHasSeenVideoCelebrationModal)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);





const HasSeenVCModalContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createContext({
  hasSeenVideoCelebrationModal: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateHasSeenVideoCelebrationModal: () => {}
});
const useHasSeenVideoCelebrationModal = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(HasSeenVCModalContext);
};
const HasSeenVideoCelebrationModalProvider = function ({
  children
}) {
  const [hasSeenVideoCelebrationModal, setHasSeenVideoCelebrationModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchHasSeenVideoCelebrationModal();
  }, []);
  function fetchHasSeenVideoCelebrationModal() {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/wpcom/v2/block-editor/has-seen-video-celebration-modal'
    }).then(result => setHasSeenVideoCelebrationModal(result.has_seen_video_celebration_modal)).catch(() => setHasSeenVideoCelebrationModal(false));
  }
  function updateHasSeenVideoCelebrationModal(value) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      method: 'PUT',
      path: '/wpcom/v2/block-editor/has-seen-video-celebration-modal',
      data: {
        has_seen_video_celebration_modal: value
      }
    }).finally(() => {
      setHasSeenVideoCelebrationModal(value);
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HasSeenVCModalContext.Provider, {
    value: {
      hasSeenVideoCelebrationModal,
      updateHasSeenVideoCelebrationModal
    }
  }, children);
};

/***/ }),

/***/ 7330:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var wpcom_proxy_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1445);
/* harmony import */ var _site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3166);
/* harmony import */ var _has_seen_video_celebration_modal_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2469);




const useShouldShowVideoCelebrationModal = isEditorSaving => {
  const {
    siteIntent: intent
  } = (0,_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)();
  const [shouldShowVideoCelebrationModal, setShouldShowVideoCelebrationModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    hasSeenVideoCelebrationModal
  } = (0,_has_seen_video_celebration_modal_context__WEBPACK_IMPORTED_MODULE_2__/* .useHasSeenVideoCelebrationModal */ .v)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const maybeRenderVideoCelebrationModal = async () => {
      // Get latest site options since the video may have just been uploaded.
      const siteObj = await (0,wpcom_proxy_request__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay)({
        path: `/sites/${window._currentSiteId}?http_envelope=1`,
        apiVersion: '1.1'
      });
      if (siteObj?.options?.launchpad_checklist_tasks_statuses?.video_uploaded) {
        setShouldShowVideoCelebrationModal(true);
      }
    };
    if ('videopress' === intent && !hasSeenVideoCelebrationModal) {
      maybeRenderVideoCelebrationModal();
    } else if (hasSeenVideoCelebrationModal) {
      setShouldShowVideoCelebrationModal(false);
    }
  }, [isEditorSaving,
  // included so that we check whether the video has been uploaded on save.
  intent, hasSeenVideoCelebrationModal]);
  return shouldShowVideoCelebrationModal;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useShouldShowVideoCelebrationModal);

/***/ }),

/***/ 1914:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _public_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9846);
/* harmony import */ var _public_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(6706);
/* harmony import */ var _automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(3903);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2619);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2279);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3053);
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3832);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _dotcom_fse_lib_first_post_published_modal_should_show_first_post_published_modal_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9372);
/* harmony import */ var _dotcom_fse_lib_seller_celebration_modal_has_seen_seller_celebration_modal_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1161);
/* harmony import */ var _dotcom_fse_lib_video_celebration_modal_has_seen_video_celebration_modal_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2469);
/* harmony import */ var _blogging_prompts_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7011);
/* harmony import */ var _draft_post_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3186);
/* harmony import */ var _first_post_published_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5252);
/* harmony import */ var _purchase_notice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9836);
/* harmony import */ var _seller_celebration_modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6272);
/* harmony import */ var _sharing_modal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4648);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9428);
/* harmony import */ var _video_celebration_modal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(6516);
/* harmony import */ var _welcome_modal_wpcom_nux__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(6616);
/* harmony import */ var _welcome_tour_tour_launch__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(965);

/*** THIS MUST BE THE FIRST THING EVALUATED IN THIS SCRIPT *****/


/* eslint-disable wpcalypso/jsx-classname-namespace */























/**
 * Sometimes Gutenberg doesn't allow you to re-register the module and throws an error.
 * FIXME: The new version allow it by default, but we might need to ensure that all the site has the new version.
 * @see https://github.com/Automattic/wp-calypso/pull/79663
 */
let unlock;
try {
  unlock = (0,_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_6__.__dangerousOptInToUnstableAPIsOnlyForCoreModules)('I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.', '@wordpress/edit-site').unlock;
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Error: Unable to get the unlock api. Reason: %s', error);
}
function WelcomeTour() {
  const [showDraftPostModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.getQueryArg)(window.location.href, 'showDraftPostModal'));
  const {
    show,
    isLoaded,
    variant,
    isManuallyOpened,
    isNewPageLayoutModalOpen,
    siteEditorCanvasMode
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const welcomeGuideStoreSelect = select('automattic/wpcom-welcome-guide');
    const starterPageLayoutsStoreSelect = select('automattic/starter-page-layouts');
    let canvasMode;
    if (unlock && select('core/edit-site')) {
      canvasMode = select('core/edit-site') && unlock(select('core/edit-site')).getCanvasMode();
    }
    return {
      show: welcomeGuideStoreSelect.isWelcomeGuideShown(),
      isLoaded: welcomeGuideStoreSelect.isWelcomeGuideStatusLoaded(),
      variant: welcomeGuideStoreSelect.getWelcomeGuideVariant(),
      isManuallyOpened: welcomeGuideStoreSelect.isWelcomeGuideManuallyOpened(),
      isNewPageLayoutModalOpen: starterPageLayoutsStoreSelect?.isOpen(),
      // Handle the case where SPT is not initalized.
      siteEditorCanvasMode: canvasMode
    };
  }, []);
  const setOpenState = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('automattic/starter-page-layouts')?.setOpenState;
  const {
    fetchWelcomeGuideStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('automattic/wpcom-welcome-guide');

  // On mount check if the WPCOM welcome guide status exists in state (from local storage), otherwise fetch it from the API.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isLoaded) {
      fetchWelcomeGuideStatus();
    }
  }, [fetchWelcomeGuideStatus, isLoaded]);
  const filteredShow = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.applyFilters)('a8c.WpcomBlockEditorWelcomeTour.show', show);
  if (!filteredShow || isNewPageLayoutModalOpen) {
    return null;
  }

  // Hide the Welcome Tour when not in the edit mode. Note that canvas mode is available only in the site editor
  if (siteEditorCanvasMode && siteEditorCanvasMode !== 'edit') {
    return null;
  }

  // Open patterns panel before Welcome Tour if necessary (e.g. when using Blank Canvas theme)
  // Do this only when Welcome Tour is not manually opened.
  // NOTE: at the moment, 'starter-page-templates' assets are not loaded on /site-editor/ page so 'setOpenState' may be undefined
  if (variant === _store__WEBPACK_IMPORTED_MODULE_17__/* .BLANK_CANVAS_VARIANT */ .gH && !isManuallyOpened && setOpenState) {
    setOpenState('OPEN_FOR_BLANK_CANVAS');
    return null;
  }
  if (variant === _store__WEBPACK_IMPORTED_MODULE_17__/* .DEFAULT_VARIANT */ .um) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_21__/* .LocaleProvider */ .YO, {
      localeSlug: window.wpcomBlockEditorNuxLocale ?? _automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_22__/* .i18nDefaultLocaleSlug */ .$y
    }, showDraftPostModal ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_draft_post_modal__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_welcome_tour_tour_launch__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, null));
  }

  // This case is redundant now and it will be cleaned up in a follow-up PR
  if (variant === 'modal' && _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Guide && _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GuidePage) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_welcome_modal_wpcom_nux__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, null);
  }
  return null;
}
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__.registerPlugin)('wpcom-block-editor-nux', {
  render: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dotcom_fse_lib_seller_celebration_modal_has_seen_seller_celebration_modal_context__WEBPACK_IMPORTED_MODULE_9__/* .HasSeenSellerCelebrationModalProvider */ .f, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dotcom_fse_lib_video_celebration_modal_has_seen_video_celebration_modal_context__WEBPACK_IMPORTED_MODULE_10__/* .HasSeenVideoCelebrationModalProvider */ .j, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dotcom_fse_lib_first_post_published_modal_should_show_first_post_published_modal_context__WEBPACK_IMPORTED_MODULE_8__/* .ShouldShowFirstPostPublishedModalProvider */ .l, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(WelcomeTour, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_first_post_published_modal__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_sharing_modal__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_seller_celebration_modal__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_purchase_notice__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_video_celebration_modal__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blogging_prompts_modal__WEBPACK_IMPORTED_MODULE_11__/* .BloggingPromptsModal */ .C, null))))
});

/***/ }),

/***/ 6281:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowLeftIcon),
/* harmony export */   f: () => (/* binding */ ArrowRightIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


const ArrowRightIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
}));
const ArrowLeftIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
}));

/***/ }),

/***/ 7011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ BloggingPromptsModal)
/* harmony export */ });
/* unused harmony export BloggingPromptsModalInner */
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4997);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3832);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6154);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6281);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3896);







const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__;





const BloggingPromptsModalInner = () => {
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(true);
  const [prompts, setPrompts] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)([]);
  const [promptIndex, setPromptIndex] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(() => {
    const siteId = window._currentSiteId;
    const path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.addQueryArgs)(`/wpcom/v3/sites/${siteId}/blogging-prompts`, {
      per_page: 10,
      after: moment__WEBPACK_IMPORTED_MODULE_8___default()().format('--MM-DD'),
      order: 'desc',
      force_year: new Date().getFullYear()
    });
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path
    }).then(result => {
      (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_writing_prompts_modal_viewed');
      return setPrompts(result);
    })
    // eslint-disable-next-line no-console
    .catch(() => console.error('Unable to fetch writing prompts'));
  }, []);
  if (!isOpen || !prompts.length) {
    return null;
  }
  function selectPrompt() {
    const promptId = prompts[promptIndex]?.id;
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/editor').resetEditorBlocks([(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.createBlock)('jetpack/blogging-prompt', {
      promptId
    })]);
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_writing_prompts_modal_prompt_selected', {
      prompt_id: promptId
    });
    setIsOpen(false);
  }
  const closeModal = () => {
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_writing_prompts_modal_closed');
    setIsOpen(false);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    onRequestClose: closeModal,
    className: "blogging-prompts-modal",
    title: __('Some ideas for writing topics', 'full-site-editing')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blogging-prompts-modal__prompt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blogging-prompts-modal__prompt-navigation"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: () => {
      if (promptIndex - 1 < 0) {
        return setPromptIndex(prompts.length - 1);
      }
      return setPromptIndex(promptIndex - 1);
    },
    "aria-label": __('Show previous prompt', 'full-site-editing'),
    variant: "secondary",
    className: "blogging-prompts-modal__prompt-navigation-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons__WEBPACK_IMPORTED_MODULE_10__/* .ArrowLeftIcon */ .A, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "blogging-prompts-modal__prompt-text"
  }, prompts[promptIndex]?.text), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: () => setPromptIndex((promptIndex + 1) % prompts.length),
    "aria-label": __('Show next prompt', 'full-site-editing'),
    variant: "secondary",
    className: "blogging-prompts-modal__prompt-navigation-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons__WEBPACK_IMPORTED_MODULE_10__/* .ArrowRightIcon */ .f, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: selectPrompt,
    variant: "secondary"
  }, __('Post Answer', 'full-site-editing'))));
};
const BloggingPromptsModal = () => {
  const hasQueryArg = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.getQueryArg)(window.location.href, 'new_prompt');
  const editorType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.select)('core/editor').getCurrentPostType();
  const shouldOpen = hasQueryArg && editorType === 'post';
  if (!shouldOpen) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BloggingPromptsModalInner, null);
};

/***/ }),

/***/ 3555:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_nux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5518);
/* harmony import */ var _wordpress_nux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_nux__WEBPACK_IMPORTED_MODULE_1__);

 //ensure nux store loads

// Disable nux and welcome guide features from core.
const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.subscribe)(() => {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/nux').disableTips();
  if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/edit-post')?.isFeatureActive('welcomeGuide')) {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/edit-post').toggleFeature('welcomeGuide');
    unsubscribe();
  }
  if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/edit-site')?.isFeatureActive('welcomeGuide')) {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/edit-site').toggleFeature('welcomeGuide');
    unsubscribe();
  }
});

// Listen for these features being triggered to call dotcom welcome guide instead.
// Note migration of areTipsEnabled: https://github.com/WordPress/gutenberg/blob/5c3a32dabe4393c45f7fe6ac5e4d78aebd5ee274/packages/data/src/plugins/persistence/index.js#L269
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.subscribe)(() => {
  if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/nux').areTipsEnabled()) {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/nux').disableTips();
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('automattic/wpcom-welcome-guide').setShowWelcomeGuide(true);
  }
  if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/edit-post')?.isFeatureActive('welcomeGuide')) {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/edit-post').toggleFeature('welcomeGuide');
    // On mounting, the welcomeGuide feature is turned on by default. This opens the welcome guide despite `welcomeGuideStatus` value.
    // This check ensures that we only listen to `welcomeGuide` changes if the welcomeGuideStatus value is loaded and respected
    if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('automattic/wpcom-welcome-guide').isWelcomeGuideStatusLoaded()) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('automattic/wpcom-welcome-guide').setShowWelcomeGuide(true, {
        openedManually: true
      });
    }
  }
  if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/edit-site')?.isFeatureActive('welcomeGuide')) {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/edit-site').toggleFeature('welcomeGuide');
    if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('automattic/wpcom-welcome-guide').isWelcomeGuideStatusLoaded()) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('automattic/wpcom-welcome-guide').setShowWelcomeGuide(true, {
        openedManually: true
      });
    }
  }
});

/***/ }),

/***/ 3186:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2619);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nux_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5673);
/* harmony import */ var _images_draft_post_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2345);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9165);







const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__;



const CLOSE_EDITOR_ACTION = 'a8c.wpcom-block-editor.closeEditor';
const DraftPostModal = () => {
  const siteId = window._currentSiteId;
  const primaryDomain = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('automattic/site').getPrimarySiteDomain(siteId));
  const homeUrl = `/home/${primaryDomain?.domain || window.location.hostname}`;
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const closeModal = () => setIsOpen(false);
  const closeEditor = () => {
    if ((0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.hasAction)(CLOSE_EDITOR_ACTION)) {
      (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.doAction)(CLOSE_EDITOR_ACTION, homeUrl);
    } else {
      window.location.href = `https://wordpress.com${homeUrl}`;
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_nux_modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
    isOpen: isOpen,
    className: "wpcom-block-editor-draft-post-modal",
    title: __('Write your first post', 'full-site-editing'),
    description: __('It’s time to flex those writing muscles and start drafting your first post!', 'full-site-editing'),
    imageSrc: _images_draft_post_svg__WEBPACK_IMPORTED_MODULE_7__,
    actionButtons: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: true,
      onClick: closeModal
    }, __('Start writing', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isSecondary: true,
      onClick: closeEditor
    }, __("I'm not ready", 'full-site-editing'))),
    onRequestClose: closeModal,
    onOpen: () => (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_draft_post_modal_show')
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DraftPostModal);

/***/ }),

/***/ 5252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3832);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _dotcom_fse_lib_first_post_published_modal_should_show_first_post_published_modal_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9372);
/* harmony import */ var _dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3166);
/* harmony import */ var _nux_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5673);
/* harmony import */ var _images_post_published_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8794);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(349);






const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__;







/**
 * Show the first post publish modal
 */
const FirstPostPublishedModalInner = () => {
  const {
    link
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').getCurrentPost(), []);
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').getCurrentPostType(), []);
  const isCurrentPostPublished = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').isCurrentPostPublished(), []);
  const previousIsCurrentPostPublished = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(isCurrentPostPublished);
  const shouldShowFirstPostPublishedModal = (0,_dotcom_fse_lib_first_post_published_modal_should_show_first_post_published_modal_context__WEBPACK_IMPORTED_MODULE_7__/* .useShouldShowFirstPostPublishedModal */ .r)();
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const closeModal = () => setIsOpen(false);
  const {
    siteUrlOption,
    launchpadScreenOption,
    siteIntentOption
  } = window?.launchpadOptions || {};
  let siteUrl = '';
  if ((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_5__.isURL)(siteUrlOption)) {
    // https://mysite.wordpress.com/path becomes mysite.wordpress.com
    siteUrl = new URL(siteUrlOption).hostname;
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // If the user is set to see the first post modal and current post status changes to publish,
    // open the post publish modal
    if (shouldShowFirstPostPublishedModal && !previousIsCurrentPostPublished.current && isCurrentPostPublished && postType === 'post') {
      previousIsCurrentPostPublished.current = isCurrentPostPublished;

      // When the post published panel shows, it is focused automatically.
      // Thus, we need to delay open the modal so that the modal would not be close immediately
      // because the outside of modal is focused
      window.setTimeout(() => {
        setIsOpen(true);
      });
    }
  }, [postType, shouldShowFirstPostPublishedModal, isCurrentPostPublished]);
  const handleViewPostClick = event => {
    event.preventDefault();
    window.top.location.href = link;
  };
  const handleNextStepsClick = event => {
    event.preventDefault();
    window.top.location.href = `https://wordpress.com/setup/write/launchpad?siteSlug=${siteUrl}`;
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_nux_modal__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
    isOpen: isOpen,
    className: "wpcom-block-editor-post-published-modal",
    title: __('Your first post is published!', 'full-site-editing'),
    description: __('Congratulations! You did it. View your post to see how it will look on your site.', 'full-site-editing'),
    imageSrc: _images_post_published_svg__WEBPACK_IMPORTED_MODULE_10__,
    actionButtons: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "primary",
      onClick: handleViewPostClick
    }, __('View Post', 'full-site-editing')), launchpadScreenOption === 'full' && siteIntentOption === 'write' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "secondary",
      onClick: handleNextStepsClick
    }, __('Next Steps', 'full-site-editing'))),
    onRequestClose: closeModal,
    onOpen: () => (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_first_post_published_modal_show')
  });
};
const FirstPostPublishedModal = () => {
  const {
    siteIntent: intent
  } = (0,_dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A)();
  if (intent === 'write') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(FirstPostPublishedModalInner, null);
  }
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FirstPostPublishedModal);

/***/ }),

/***/ 5673:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4357);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3736);






const NuxModal = ({
  isOpen,
  className,
  title,
  description,
  imageSrc,
  actionButtons,
  onRequestClose,
  onOpen
}) => {
  const prevIsOpen = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!prevIsOpen.current && isOpen) {
      onOpen?.();
    }
    prevIsOpen.current = isOpen;
  }, [prevIsOpen, isOpen, onOpen]);
  if (!isOpen) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)('wpcom-block-editor-nux-modal', className),
    title: "",
    onRequestClose: onRequestClose
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-nux-modal__image-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: imageSrc,
    alt: title
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "wpcom-block-editor-nux-modal__title"
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wpcom-block-editor-nux-modal__description"
  }, description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-nux-modal__buttons"
  }, actionButtons));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NuxModal);

/***/ }),

/***/ 9846:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* exported __webpack_public_path__ */
/* global __webpack_public_path__ */

/**
 * Dynamically set WebPack's publicPath so that split assets can be found.
 * @see https://webpack.js.org/guides/public-path/#on-the-fly
 */
if ( true && window.wpcomBlockEditorNuxAssetsUrl) {
  // eslint-disable-next-line no-global-assign
  __webpack_require__.p = window.wpcomBlockEditorNuxAssetsUrl;
}

/***/ }),

/***/ 9836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(692);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7685);


const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;



function PurchaseNotice() {
  const hasPaymentNotice = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
  const {
    createNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_2__.store);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const noticePattern = /[&?]notice=([\w_-]+)/;
    const match = noticePattern.exec(document.location.search);
    const notice = match && match[1];
    if ('purchase-success' === notice && hasPaymentNotice.current === false) {
      hasPaymentNotice.current = true;
      createNotice('info', __('Congrats! Premium blocks are now available to use.', 'full-site-editing'), {
        isDismissible: true,
        type: 'snackbar'
      });
    }
  }, [createNotice]);
  return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PurchaseNotice);

/***/ }),

/***/ 6272:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _dotcom_fse_lib_seller_celebration_modal_has_seen_seller_celebration_modal_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1161);
/* harmony import */ var _dotcom_fse_lib_seller_celebration_modal_use_should_show_seller_celebration_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6822);
/* harmony import */ var _dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3166);
/* harmony import */ var _nux_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5673);
/* harmony import */ var _images_product_published_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9661);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4707);






const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__;







/**
 * Show the seller celebration modal
 */
const SellerCelebrationModalInner = () => {
  const {
    addEntities
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // @TODO - not sure if I actually need this; need to test with it removed.
    // Teach core data about the status entity so we can use selectors like `getEntityRecords()`
    addEntities([{
      baseURL: '/wp/v2/statuses',
      key: 'slug',
      kind: 'root',
      name: 'status',
      plural: 'statuses'
    }]);
    // Only register entity once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // conditions to show:
  // - user just finished saving (check)
  // - editor has not yet displayed modal once (check)
  // - user is a seller (check)
  // - user has not saved site before
  // - content includes product block, and a user has selected it at least once (check)
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [hasDisplayedModal, setHasDisplayedModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const isSiteEditor = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => !!select('core/edit-site'));
  const previousIsEditorSaving = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    updateHasSeenSellerCelebrationModal
  } = (0,_dotcom_fse_lib_seller_celebration_modal_has_seen_seller_celebration_modal_context__WEBPACK_IMPORTED_MODULE_5__/* .useHasSeenSellerCelebrationModal */ .Z)();
  const linkUrl = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (isSiteEditor) {
      const page = select('core/edit-site').getPage();
      const pageId = parseInt(page?.context?.postId);
      const pageEntity = select('core').getEntityRecord('postType', 'page', pageId);
      return pageEntity?.link;
    }
    const currentPost = select('core/editor').getCurrentPost();
    return currentPost.link;
  });
  const shouldShowSellerCelebrationModal = (0,_dotcom_fse_lib_seller_celebration_modal_use_should_show_seller_celebration_modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)();
  const isEditorSaving = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (isSiteEditor) {
      const page = select('core/edit-site').getPage();
      const pageId = parseInt(page?.context?.postId);
      const isSavingSite = select('core').isSavingEntityRecord('root', 'site') && !select('core').isAutosavingEntityRecord('root', 'site');
      const isSavingEntity = select('core').isSavingEntityRecord('postType', 'page', pageId) && !select('core').isAutosavingEntityRecord('postType', 'page', pageId);
      return isSavingSite || isSavingEntity;
    }
    const currentPost = select('core/editor').getCurrentPost();
    const isSavingEntity = select('core').isSavingEntityRecord('postType', currentPost?.type, currentPost?.id) && !select('core').isAutosavingEntityRecord('postType', currentPost?.type, currentPost?.id);
    return isSavingEntity;
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isEditorSaving && previousIsEditorSaving.current && !hasDisplayedModal && shouldShowSellerCelebrationModal) {
      setIsModalOpen(true);
      setHasDisplayedModal(true);
      updateHasSeenSellerCelebrationModal(true);
    }
    previousIsEditorSaving.current = isEditorSaving;
  }, [isEditorSaving, hasDisplayedModal, shouldShowSellerCelebrationModal, updateHasSeenSellerCelebrationModal]);

  // if save state has changed and was saving on last render
  // then it has finished saving
  // open modal if content has sell block,

  const closeModal = () => setIsModalOpen(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_nux_modal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
    isOpen: isModalOpen,
    className: "wpcom-site-editor-seller-celebration-modal",
    title: __("You've added your first product!", 'full-site-editing'),
    description: __('Preview your product on your site before launching and sharing with others.', 'full-site-editing'),
    imageSrc: _images_product_published_svg__WEBPACK_IMPORTED_MODULE_9__,
    actionButtons: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: closeModal
    }, __('Continue editing', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: true,
      href: linkUrl,
      target: "_blank",
      rel: "noopener noreferrer"
    }, __('View your product', 'full-site-editing'))),
    onRequestClose: closeModal,
    onOpen: () => (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_seller_celebration_modal_show')
  });
};
const SellerCelebrationModal = () => {
  const {
    siteIntent: intent
  } = (0,_dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)();
  if (intent === 'sell') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SellerCelebrationModalInner, null);
  }
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SellerCelebrationModal);

/***/ }),

/***/ 4648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _automattic_components__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(1720);
/* harmony import */ var _automattic_onboarding__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(4949);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(4446);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(6263);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(5756);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(692);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3634);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(4357);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var calypso_components_forms_clipboard_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(655);
/* harmony import */ var calypso_components_forms_form_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6552);
/* harmony import */ var _dotcom_fse_lib_first_post_published_modal_should_show_first_post_published_modal_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9372);
/* harmony import */ var _dotcom_fse_lib_seller_celebration_modal_use_should_show_seller_celebration_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6822);
/* harmony import */ var _dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3166);
/* harmony import */ var _dotcom_fse_lib_video_celebration_modal_use_should_show_video_celebration_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7330);
/* harmony import */ var _images_illo_share_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7233);
/* harmony import */ var _inline_social_logo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(841);
/* harmony import */ var _inline_social_logos_sprite__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7966);
/* harmony import */ var _suggested_tags__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4327);
/* harmony import */ var _use_sharing_modal_dismissed__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5742);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7347);
























const FB_APP_ID = '249643311490';
const SharingModalInner = () => {
  const isDismissedDefault = window?.sharingModalOptions?.isDismissed || false;
  const {
    launchpadScreenOption
  } = window?.launchpadOptions || {};
  const {
    isDismissed,
    updateIsDismissed
  } = (0,_use_sharing_modal_dismissed__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A)(isDismissedDefault);
  const {
    __
  } = (0,_wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_18__/* .useI18n */ .s9)();
  const isPrivateBlog = window?.wpcomGutenberg?.blogPublic === '-1';
  const {
    link,
    title,
    status: postStatus,
    password: postPassword
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').getCurrentPost(), []);
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').getCurrentPostType(), []);
  const isCurrentPostPublished = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').isCurrentPostPublished(), []);
  const previousIsCurrentPostPublished = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(isCurrentPostPublished);
  const shouldShowFirstPostPublishedModal = (0,_dotcom_fse_lib_first_post_published_modal_should_show_first_post_published_modal_context__WEBPACK_IMPORTED_MODULE_8__/* .useShouldShowFirstPostPublishedModal */ .r)();
  const shouldShowSellerCelebrationModal = (0,_dotcom_fse_lib_seller_celebration_modal_use_should_show_seller_celebration_modal__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A)();
  const shouldShowVideoCelebrationModal = (0,_dotcom_fse_lib_video_celebration_modal_use_should_show_video_celebration_modal__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A)(isCurrentPostPublished);
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const closeModal = () => setIsOpen(false);
  const {
    createNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__.store);
  const [shouldShowSuggestedTags, setShouldShowSuggestedTags] = react__WEBPACK_IMPORTED_MODULE_5___default().useState(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // The first post will show a different modal.
    if (!shouldShowFirstPostPublishedModal && !shouldShowSellerCelebrationModal && !shouldShowVideoCelebrationModal && launchpadScreenOption !== 'full' && !previousIsCurrentPostPublished.current && isCurrentPostPublished &&
    // Ensure post is published publicly and not private or password protected.
    postStatus === 'publish' && !postPassword && postType === 'post') {
      previousIsCurrentPostPublished.current = isCurrentPostPublished;
      (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_sharing_dialog_show');

      // When the post published panel shows, it is focused automatically.
      // Thus, we need to delay open the modal so that the modal would not be close immediately
      // because the outside of modal is focused
      window.setTimeout(() => {
        setIsOpen(true);
      });
    }
  }, [postType, shouldShowFirstPostPublishedModal, shouldShowSellerCelebrationModal, shouldShowVideoCelebrationModal, isCurrentPostPublished, launchpadScreenOption]);
  if (!isOpen || isDismissedDefault || isPrivateBlog) {
    return null;
  }
  const shareTwitter = () => {
    const baseUrl = new URL('https://twitter.com/intent/tweet');
    const params = new URLSearchParams({
      text: title,
      url: link
    });
    baseUrl.search = params.toString();
    const twitterUrl = baseUrl.href;
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_sharing_twitter');
    window.open(twitterUrl, 'twitter', 'width=550,height=420,resizeable,scrollbars');
  };
  const shareFb = () => {
    const baseUrl = new URL('https://www.facebook.com/sharer.php');
    const params = new URLSearchParams({
      u: link,
      app_id: FB_APP_ID
    });
    baseUrl.search = params.toString();
    const facebookUrl = baseUrl.href;
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_sharing_facebook');
    window.open(facebookUrl, 'facebook', 'width=626,height=436,resizeable,scrollbars');
  };
  const shareLinkedin = () => {
    const baseUrl = new URL('https://www.linkedin.com/shareArticle');
    const params = new URLSearchParams({
      title,
      url: link
    });
    baseUrl.search = params.toString();
    const linkedinUrl = baseUrl.href;
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_sharing_linkedin');
    window.open(linkedinUrl, 'linkedin', 'width=626,height=436,resizeable,scrollbars');
  };
  const shareTumblr = () => {
    const baseUrl = new URL('https://www.tumblr.com/widgets/share/tool');
    const params = new URLSearchParams({
      canonicalUrl: link,
      title: title
    });
    baseUrl.search = params.toString();
    const tumblrUrl = baseUrl.href;
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_sharing_tumblr');
    window.open(tumblrUrl, 'tumblr', 'width=626,height=436,resizeable,scrollbars');
  };
  const sharePinterest = () => {
    const baseUrl = new URL('https://pinterest.com/pin/create/button/');
    const params = new URLSearchParams({
      url: link,
      description: title
    });
    baseUrl.search = params.toString();
    const pinterestUrl = baseUrl.href;
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_sharing_pinterest');
    window.open(pinterestUrl, 'pinterest', 'width=626,height=436,resizeable,scrollbars');
  };
  const copyLinkClick = () => {
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_sharing_link_copy');
    createNotice('success', __('Link copied to clipboard.', 'full-site-editing'), {
      type: 'snackbar'
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    className: "wpcom-block-editor-post-published-sharing-modal",
    title: "",
    onRequestClose: closeModal
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inline_social_logos_sprite__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-post-published-sharing-modal__inner"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-post-published-sharing-modal__left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, " ", __('Post published!', 'full-site-editing'), " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-post-published-buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: link,
    className: "link-button wpcom-block-editor-post-published-sharing-modal__view-post-link",
    rel: "external"
  }, ' ', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A
  }), " ", __('View Post', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(calypso_components_forms_clipboard_button__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
    text: link,
    className: "components-button link-button",
    onCopy: copyLinkClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A
  }), " ", __('Copy Link', 'full-site-editing'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, __('Get more traffic to your post by sharing:', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A)('wpcom-block-editor-post-published-sharing-modal__sharing-button', 'share-facebook'),
    onClick: shareFb
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inline_social_logo__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
    icon: "facebook",
    size: 18
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A)('wpcom-block-editor-post-published-sharing-modal__sharing-button', 'share-twitter'),
    onClick: shareTwitter
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inline_social_logo__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
    icon: "twitter-alt",
    size: 18
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A)('wpcom-block-editor-post-published-sharing-modal__sharing-button', 'share-linkedin'),
    onClick: shareLinkedin
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inline_social_logo__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
    icon: "linkedin",
    size: 18
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A)('wpcom-block-editor-post-published-sharing-modal__sharing-button', 'share-tumblr'),
    onClick: shareTumblr
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inline_social_logo__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
    icon: "tumblr-alt",
    size: 18
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A)('wpcom-block-editor-post-published-sharing-modal__sharing-button', 'share-pinterest'),
    onClick: sharePinterest
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inline_social_logo__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
    icon: "pinterest-alt",
    size: 18
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-post-published-sharing-modal__checkbox-section"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_automattic_components__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
    htmlFor: "toggle",
    className: "is-checkbox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(calypso_components_forms_form_checkbox__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
    id: "toggle",
    onChange: () => {
      updateIsDismissed(!isDismissed);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, __("Don't show again", 'full-site-editing'))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-post-published-sharing-modal__right"
  }, shouldShowSuggestedTags ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_suggested_tags__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
    setShouldShowSuggestedTags: setShouldShowSuggestedTags
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "wpcom-block-editor-post-published-sharing-modal__image",
    src: _images_illo_share_svg__WEBPACK_IMPORTED_MODULE_12__,
    alt: __('Share Post', 'full-site-editing')
  }))));
};
const SharingModal = () => {
  const {
    siteIntent: intent
  } = (0,_dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)();
  if (intent === _automattic_onboarding__WEBPACK_IMPORTED_MODULE_24__/* .START_WRITING_FLOW */ .Xf || intent === _automattic_onboarding__WEBPACK_IMPORTED_MODULE_24__/* .DESIGN_FIRST_FLOW */ .JV) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SharingModalInner, null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SharingModal);

/***/ }),

/***/ 841:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4357);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);




/**
 * InlineSocialLogo is a copy of client/components/social-logo that references an inline SVG sprite.
 * This componenet is needed because:
 *
 * The XML <use> element does not work with SVGs loaded from external domains.
 * In the editor, images are loaded from the CDN (s0.wp.com) in production.
 * useInline allows us to reference an svg sprite from the current page instead.
 * see https://github.com/w3c/svgwg/issues/707
 *
 * InlineSocialLogosSprite must be included on the page where this is used
 * @returns A Social Logo SVG
 */
function InlineSocialLogo(props) {
  const {
    size = 24,
    icon,
    className,
    ...otherProps
  } = props;

  // Using a missing icon doesn't produce any errors, just a blank icon, which is the exact intended behaviour.
  // This means we don't need to perform any checks on the icon name.
  const iconName = `social-logo-${icon}`;
  // The current CSS expects individual icon classes in the form of e.g. `.twitter`, but the social-logos build
  // appears to generate them in the form of `.social-logo-twitter` instead.
  // We add both here, to ensure compatibility.
  const iconClass = (0,clsx__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)('social-logo', iconName, icon, className);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    className: iconClass,
    height: size,
    width: size
  }, otherProps), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("use", {
    xlinkHref: `#${icon}`
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.memo(InlineSocialLogo));

/***/ }),

/***/ 7966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A hidden inline svg sprite of social logos.
 *
 * Sprite was coppied from https://wordpress.com/calypso/images/social-logos-d55401f99bb02ebd6cf4.svg
 * @returns see above.
 */
const InlineSocialLogosSprite = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 0 0",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: 'none'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "amazon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M13.582 8.182c-1.648.185-3.802.308-5.344.984-1.781.769-3.03 2.337-3.03 4.644 0 2.953 1.86 4.429 4.253 4.429 2.02 0 3.125-.477 4.685-2.065.516.747.685 1.109 1.629 1.894a.589.589 0 00.672-.066l.006.006c.567-.505 1.599-1.401 2.18-1.888.231-.188.19-.496.009-.754-.52-.718-1.072-1.303-1.072-2.634V8.305c0-1.876.133-3.599-1.249-4.891C15.23 2.369 13.422 2 12.04 2 9.336 2 6.318 3.01 5.686 6.351c-.068.355.191.542.423.594l2.754.298c.258-.013.445-.266.494-.523.236-1.151 1.2-1.706 2.284-1.706.584 0 1.249.215 1.595.738.398.584.346 1.384.346 2.061v.369zm-.533 5.906c-.451.8-1.169 1.291-1.967 1.291-1.09 0-1.728-.83-1.728-2.061 0-2.42 2.171-2.86 4.227-2.86v.615c.001 1.108.027 2.031-.532 3.015zm7.634 5.251C18.329 21.076 14.917 22 11.979 22c-4.118 0-7.826-1.522-10.632-4.057-.22-.199-.024-.471.241-.317 3.027 1.762 6.771 2.823 10.639 2.823 2.608 0 5.476-.541 8.115-1.66.397-.169.73.262.341.55zm.653 1.704c-.194.163-.379.076-.293-.139.284-.71.92-2.298.619-2.684-.301-.386-1.99-.183-2.749-.092-.23.027-.266-.173-.059-.319 1.348-.946 3.555-.673 3.811-.356.26.32-.066 2.533-1.329 3.59z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "behance"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M7.799 5.698c.589 0 1.12.051 1.606.156.482.102.894.273 1.241.507.344.235.612.546.804.938.188.387.281.871.281 1.443 0 .619-.141 1.137-.421 1.551-.284.413-.7.751-1.255 1.014.756.218 1.317.601 1.689 1.146.374.549.557 1.205.557 1.975 0 .623-.12 1.161-.359 1.612a3.144 3.144 0 01-.973 1.114c-.408.288-.876.5-1.399.637A6.144 6.144 0 017.963 18H2V5.698h5.799m-.35 4.97c.481 0 .878-.114 1.192-.345.311-.228.463-.603.463-1.119 0-.286-.051-.523-.152-.707a1.123 1.123 0 00-.416-.427 1.733 1.733 0 00-.596-.216 3.616 3.616 0 00-.697-.06H4.709v2.874h2.74zm.151 5.237c.267 0 .521-.024.759-.077.243-.053.457-.137.637-.261.182-.12.332-.283.441-.491.11-.206.163-.474.163-.798 0-.633-.18-1.084-.533-1.357-.356-.27-.83-.404-1.413-.404H4.709v3.388H7.6zm8.562-.041c.367.358.897.538 1.583.538.493 0 .92-.125 1.277-.374.354-.248.571-.514.654-.79h2.155c-.347 1.072-.872 1.838-1.589 2.299-.708.463-1.572.693-2.58.693-.701 0-1.332-.113-1.899-.337a4.041 4.041 0 01-1.439-.958 4.364 4.364 0 01-.904-1.484 5.433 5.433 0 01-.32-1.899c0-.666.11-1.288.329-1.863a4.36 4.36 0 01.933-1.492c.406-.42.885-.751 1.444-.994a4.63 4.63 0 011.857-.363c.754 0 1.414.145 1.98.44a3.941 3.941 0 011.389 1.181 4.82 4.82 0 01.783 1.69c.16.632.217 1.292.171 1.983h-6.428c-.001.706.237 1.372.604 1.73m2.811-4.68c-.291-.321-.783-.496-1.384-.496-.39 0-.714.066-.973.2a1.972 1.972 0 00-.621.491 1.772 1.772 0 00-.328.628 2.695 2.695 0 00-.111.587h3.98c-.058-.625-.271-1.085-.563-1.41zm-3.916-3.446h4.985V6.524h-4.985v1.214z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "blogger-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M19.779 9.904h-.981l-.021.001a1.163 1.163 0 01-1.16-1.079l-.001-.013A5.813 5.813 0 0011.803 3H8.871a5.813 5.813 0 00-5.813 5.813v6.375a5.813 5.813 0 005.813 5.813h6.257a5.814 5.814 0 005.813-5.813l.002-4.121a1.164 1.164 0 00-1.164-1.163zM8.726 7.713h3.291a1.117 1.117 0 110 2.234H8.726a1.117 1.117 0 110-2.234zm6.601 8.657H8.72a1.057 1.057 0 110-2.114h6.607a1.057 1.057 0 110 2.114z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "blogger"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M14.722 14.019a.654.654 0 01-.654.654H9.977a.654.654 0 010-1.308h4.091c.361 0 .654.293.654.654zm-4.741-3.321h2.038a.692.692 0 000-1.384H9.981a.692.692 0 000 1.384zM21 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2zm-3.456 6.39a.72.72 0 00-.72-.72h-.607l-.013.001a.72.72 0 01-.718-.668l-.001-.008a3.599 3.599 0 00-3.599-3.599H10.07a3.599 3.599 0 00-3.599 3.599v3.947a3.6 3.6 0 003.599 3.599h3.874a3.599 3.599 0 003.599-3.599l.001-2.552z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "codepen"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M22.016 8.84l-.007-.037c-.005-.025-.008-.048-.015-.072-.003-.015-.01-.028-.013-.042l-.023-.062-.02-.042a.391.391 0 00-.03-.057.357.357 0 00-.025-.038l-.035-.052-.03-.037c-.015-.017-.028-.032-.043-.045-.01-.012-.022-.023-.035-.035a.442.442 0 00-.048-.04l-.037-.03-.015-.012-9.161-6.096a.864.864 0 00-.955 0L2.359 8.237l-.015.012-.038.028-.048.04a.638.638 0 00-.078.082c-.012.013-.022.023-.03.037-.011.017-.025.035-.035.052a.498.498 0 01-.025.038c-.011.022-.021.039-.03.059a.39.39 0 01-.02.041 1.184 1.184 0 00-.034.106c-.007.023-.011.046-.016.071-.001.014-.005.025-.006.037a.73.73 0 00-.009.114v6.093c0 .037.003.075.008.112l.007.038c.005.023.008.047.015.072a.209.209 0 00.013.04c.007.022.013.042.022.063l.02.04a.4.4 0 00.055.096l.035.052.03.037a.603.603 0 00.042.045l.035.035c.015.013.032.028.048.04l.038.03.013.01 9.163 6.095a.858.858 0 00.959.004l9.163-6.095.015-.01c.013-.01.027-.02.037-.03a.534.534 0 00.048-.04c.013-.012.025-.023.035-.035.017-.015.03-.032.043-.045l.03-.037a.678.678 0 00.035-.052l.025-.038a.4.4 0 00.03-.058l.02-.04.023-.063c.003-.013.01-.027.013-.04.007-.025.01-.048.015-.072l.007-.037c.003-.042.007-.079.007-.117V8.954a.625.625 0 00-.008-.114zm-9.154-4.376l6.751 4.49-3.016 2.013-3.735-2.492V4.464zm-1.724 0v4.009l-3.735 2.494-3.014-2.013 6.749-4.49zm-7.439 6.098L5.853 12l-2.155 1.438v-2.876zm7.439 8.974l-6.749-4.491 3.015-2.011 3.735 2.492v4.01zM12 14.035L8.953 12 12 9.966 15.047 12 12 14.035zm.862 5.501v-4.009l3.735-2.492 3.016 2.011-6.751 4.49zm7.441-6.098L18.147 12l2.156-1.438v2.876z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "dribbble"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm8.434-8.631c-.292-.092-2.644-.794-5.32-.365 1.117 3.07 1.572 5.57 1.659 6.09a8.56 8.56 0 003.661-5.725zm-5.098 6.507c-.127-.749-.623-3.361-1.822-6.477l-.056.019c-4.818 1.679-6.547 5.02-6.701 5.334A8.5 8.5 0 0012 20.555a8.488 8.488 0 003.336-.679zm-9.682-2.152c.193-.331 2.538-4.213 6.943-5.637.111-.036.224-.07.337-.102a29.017 29.017 0 00-.692-1.45c-4.266 1.277-8.405 1.223-8.778 1.216a8.497 8.497 0 002.19 5.973zm-2.015-7.46c.382.005 3.901.02 7.897-1.041a54.477 54.477 0 00-3.167-4.94 8.572 8.572 0 00-4.73 5.981zm6.359-6.555a45.7 45.7 0 013.187 5c3.037-1.138 4.323-2.867 4.477-3.085a8.508 8.508 0 00-7.664-1.915zm8.614 2.903c-.18.243-1.612 2.078-4.77 3.367a27.028 27.028 0 01.751 1.678c2.842-.357 5.666.215 5.948.275a8.503 8.503 0 00-1.929-5.32z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "dropbox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 6.134L6.069 9.797 2 6.54l5.883-3.843L12 6.134zm-10 6.92l5.883 3.843L12 13.459 6.069 9.797 2 13.054zm10 .405l4.116 3.439L22 13.054l-4.069-3.257L12 13.459zM22 6.54l-5.884-3.843L12 6.134l5.931 3.663L22 6.54zm-9.989 7.66l-4.129 3.426-1.767-1.153v1.291l5.896 3.539 5.897-3.539v-1.291l-1.769 1.153-4.128-3.426z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "eventbrite"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M18.041 3.931L5.959 3A2.96 2.96 0 003 5.959v12.083A2.96 2.96 0 005.959 21l12.083-.931C19.699 19.983 21 18.744 21 17.11V6.89c0-1.634-1.259-2.863-2.959-2.959zM16.933 8.17c-.082.215-.192.432-.378.551-.188.122-.489.132-.799.132-1.521 0-3.062-.048-4.607-.048-.152.708-.304 1.416-.451 2.128.932-.004 1.873.005 2.81.005.726 0 1.462-.069 1.586.525.04.189-.001.426-.052.615-.105.38-.258.676-.625.783-.185.054-.408.058-.646.058-1.145 0-2.345.017-3.493.02-.169.772-.328 1.553-.489 2.333 1.57-.005 3.067-.041 4.633-.058.627-.007 1.085.194 1.009.85a2.17 2.17 0 01-.211.725c-.102.208-.248.376-.488.452-.237.075-.541.064-.862.078-.304.014-.614.008-.924.016-.309.009-.619.022-.919.022-1.253 0-2.429.08-3.683.073-.603-.004-1.014-.249-1.124-.757-.059-.273-.018-.58.036-.841a3542.51 3542.51 0 011.629-7.763c.056-.265.114-.511.225-.714a1.24 1.24 0 01.79-.62c.368-.099.883-.047 1.344-.047.305 0 .612.008.914.016.925.026 1.817.03 2.747.053.304.007.615.016.915.016.621 0 1.17.073 1.245.614.039.288-.051.567-.132.783z",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "facebook"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "feed"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M2 8.667V12c5.515 0 10 4.485 10 10h3.333c0-7.363-5.97-13.333-13.333-13.333zM2 2v3.333c9.19 0 16.667 7.477 16.667 16.667H22C22 10.955 13.045 2 2 2zm2.5 15a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "flickr"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M6.5 7c-2.75 0-5 2.25-5 5s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5zm11 0c-2.75 0-5 2.25-5 5s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "foursquare"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M17.573 2H6.905C5.434 2 5 3.107 5 3.805v16.948c0 .785.422 1.077.66 1.172.238.097.892.177 1.285-.275 0 0 5.035-5.843 5.122-5.93.132-.132.132-.132.262-.132h3.26c1.368 0 1.588-.977 1.732-1.552.078-.318.692-3.428 1.225-6.122l.675-3.368C19.56 2.893 19.14 2 17.573 2zm-1.078 5.22c-.053.252-.372.518-.665.518h-4.157c-.467 0-.802.318-.802.787v.508c0 .467.337.798.805.798h3.528c.331 0 .655.362.583.715-.072.353-.407 2.102-.448 2.295-.04.193-.262.523-.655.523h-2.88c-.523 0-.683.068-1.033.503-.35.437-3.505 4.223-3.505 4.223-.032.035-.063.027-.063-.015V4.852c0-.298.26-.648.648-.648h8.562c.315 0 .61.297.528.683l-.446 2.333z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "ghost"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M10.203 20.997H3.005v-3.599h7.198v3.599zm10.792-3.599h-7.193v3.599h7.193v-3.599zm.003-7.198H3v3.599h17.998V10.2zm-7.195-7.197H3.005v3.599h10.798V3.003zm7.197 0h-3.599v3.599H21V3.003z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "github"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.09.682-.218.682-.484 0-.236-.009-.866-.014-1.699-2.782.602-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.909-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.337-2.22-.251-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.097-2.646 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.307.679.917.679 1.852 0 1.335-.012 2.415-.012 2.741 0 .269.18.579.688.481A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "google-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.05 16c-3.312 0-6-2.688-6-6s2.688-6 6-6c1.62 0 2.976.594 4.014 1.566L14.26 9.222c-.432-.408-1.188-.888-2.31-.888-1.986 0-3.606 1.65-3.606 3.672 0 2.022 1.62 3.672 3.606 3.672 2.298 0 3.144-1.59 3.3-2.532h-3.306v-2.238h5.616c.084.378.15.732.15 1.23 0 3.426-2.298 5.862-5.76 5.862z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "google-plus-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M8 11h6.61c.06.35.11.7.11 1.16 0 4-2.68 6.84-6.72 6.84-3.87 0-7-3.13-7-7s3.13-7 7-7c1.89 0 3.47.69 4.69 1.83l-1.9 1.83c-.52-.5-1.43-1.08-2.79-1.08-2.39 0-4.34 1.98-4.34 4.42S5.61 16.42 8 16.42c2.77 0 3.81-1.99 3.97-3.02H8V11zm15 0h-2V9h-2v2h-2v2h2v2h2v-2h2"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "google-plus"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.919 14.05a4.051 4.051 0 010-8.1c1.094 0 2.009.401 2.709 1.057l-1.15 1.118a2.229 2.229 0 00-1.559-.599c-1.341 0-2.434 1.114-2.434 2.479s1.094 2.479 2.434 2.479c1.551 0 2.122-1.073 2.227-1.709h-2.232v-1.511h3.791c.057.255.101.494.101.83.001 2.312-1.55 3.956-3.887 3.956zM19 12.75h-1.25V14h-1.5v-1.25H15v-1.5h1.25V10h1.5v1.25H19v1.5z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "google"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12.02 10.18v3.73h5.51c-.26 1.57-1.67 4.22-5.5 4.22-3.31 0-6.01-2.75-6.01-6.12s2.7-6.12 6.01-6.12c1.87 0 3.13.8 3.85 1.48l2.84-2.76C16.99 2.99 14.73 2 12.03 2c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.77 0 9.6-4.06 9.6-9.77 0-.83-.11-1.42-.25-2.05h-9.36z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "instagram"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 4.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.671.31.42.163.72.358 1.035.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.949.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.671-.163.42-.358.72-.673 1.035-.315.315-.615.51-1.035.673-.317.123-.794.27-1.671.31-.949.043-1.233.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.671-.31a2.786 2.786 0 01-1.035-.673 2.786 2.786 0 01-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.949-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.671.163-.42.358-.72.673-1.035.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.949-.043 1.234-.052 3.637-.052M12 3c-2.444 0-2.751.01-3.711.054-.958.044-1.612.196-2.184.418a4.401 4.401 0 00-1.594 1.039c-.5.5-.808 1.002-1.038 1.594-.223.572-.375 1.226-.419 2.184C3.01 9.249 3 9.556 3 12s.01 2.751.054 3.711c.044.958.196 1.612.418 2.185.23.592.538 1.094 1.038 1.594s1.002.808 1.594 1.038c.572.222 1.227.375 2.185.418.96.044 1.267.054 3.711.054s2.751-.01 3.711-.054c.958-.044 1.612-.196 2.185-.418a4.411 4.411 0 001.594-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.375-1.227.418-2.185.044-.96.054-1.267.054-3.711s-.01-2.751-.054-3.711c-.044-.958-.196-1.612-.418-2.185A4.411 4.411 0 0019.49 4.51c-.5-.5-1.002-.808-1.594-1.038-.572-.222-1.227-.375-2.185-.418C14.751 3.01 14.444 3 12 3zm0 4.378a4.622 4.622 0 100 9.244 4.622 4.622 0 000-9.244zM12 15a3 3 0 110-6 3 3 0 010 6zm4.804-8.884a1.08 1.08 0 10.001 2.161 1.08 1.08 0 00-.001-2.161z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "link"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M17 13H7v-2h10v2zm1-6h-1c-1.631 0-3.065.792-3.977 2H18c1.103 0 2 .897 2 2v2c0 1.103-.897 2-2 2h-4.977c.913 1.208 2.347 2 3.977 2h1a4 4 0 004-4v-2a4 4 0 00-4-4zM2 11v2a4 4 0 004 4h1c1.63 0 3.065-.792 3.977-2H6c-1.103 0-2-.897-2-2v-2c0-1.103.897-2 2-2h4.977C10.065 7.792 8.631 7 7 7H6a4 4 0 00-4 4z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "linkedin"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "mail"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.236l-8 4.882-8-4.882V6h16v2.236z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "mastodon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M20.617 13.92c-.265 1.361-2.37 2.851-4.788 3.14-1.261.15-2.502.288-3.826.228-2.165-.1-3.873-.517-3.873-.517 0 .211.013.411.039.599.282 2.136 2.119 2.264 3.859 2.324 1.756.06 3.32-.433 3.32-.433l.072 1.588s-1.228.659-3.417.781c-1.207.066-2.705-.031-4.45-.493-3.785-1.001-4.436-5.036-4.536-9.13-.03-1.215-.011-2.361-.011-3.32 0-4.186 2.742-5.413 2.742-5.413 1.383-.635 3.756-.902 6.224-.923h.06c2.467.021 4.842.288 6.225.923 0 0 2.742 1.227 2.742 5.413 0 0 .035 3.089-.382 5.233zm-2.854-4.909v5.069h-2.008V9.16c0-1.037-.436-1.563-1.309-1.563-.965 0-1.448.624-1.448 1.859v2.693h-1.996V9.456c0-1.235-.484-1.859-1.449-1.859-.873 0-1.309.526-1.309 1.563v4.92H6.236V9.011c0-1.035.263-1.859.793-2.468.547-.609 1.262-.921 2.15-.921 1.028 0 1.806.395 2.32 1.185l.501.839.5-.839c.514-.79 1.292-1.185 2.32-1.185.888 0 1.604.312 2.15.921.53.609.793 1.433.793 2.468z",
    "fill-rule": "evenodd"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "medium-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M7.423 6c3.27 0 5.922 2.686 5.922 6s-2.651 6-5.922 6S1.5 15.313 1.5 12s2.652-6 5.923-6zm9.458.351c1.635 0 2.961 2.53 2.961 5.65 0 3.118-1.325 5.648-2.96 5.648-1.636 0-2.962-2.53-2.962-5.649s1.325-5.649 2.96-5.649zm4.577.589c.576 0 1.042 2.265 1.042 5.06 0 2.794-.466 5.06-1.042 5.06-.575 0-1.04-2.265-1.04-5.06 0-2.794.465-5.06 1.04-5.06z",
    "fill-rule": "nonzero"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "medium"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M3 3v18h18V3H3zm15 4.26l-1 .93a.28.28 0 00-.11.27v6.8a.27.27 0 00.11.27l.94.93v.2h-4.75v-.2l1-1c.09-.1.09-.12.09-.27V9.74l-2.71 6.9h-.37L8 9.74v4.62a.67.67 0 00.17.54l1.27 1.54v.2H5.86v-.2l1.27-1.54a.64.64 0 00.17-.54V9a.5.5 0 00-.16-.4L6 7.26v-.2h3.52L12.23 13l2.38-5.94H18v.2z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "patreon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M13.975 5a5.05 5.05 0 00-5.041 5.046c0 2.774 2.261 5.03 5.04 5.03A5.034 5.034 0 0019 10.047C19 7.264 16.746 5 13.975 5zM5 18.44h2.461V5H5v13.44z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "pinterest-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12.289 2C6.617 2 3.606 5.648 3.606 9.622c0 1.846 1.025 4.146 2.666 4.878.25.111.381.063.439-.169.044-.175.267-1.029.365-1.428a.365.365 0 00-.091-.362c-.54-.63-.975-1.791-.975-2.873 0-2.777 2.194-5.464 5.933-5.464 3.23 0 5.49 2.108 5.49 5.122 0 3.407-1.794 5.768-4.13 5.768-1.291 0-2.257-1.021-1.948-2.277.372-1.495 1.089-3.112 1.089-4.191 0-.967-.542-1.775-1.663-1.775-1.319 0-2.379 1.309-2.379 3.059 0 1.115.394 1.869.394 1.869s-1.302 5.279-1.54 6.261c-.405 1.666.053 4.368.094 4.604.021.126.167.169.25.063.129-.165 1.699-2.419 2.142-4.051.158-.59.817-2.995.817-2.995.43.784 1.681 1.446 3.013 1.446 3.963 0 6.822-3.494 6.822-7.833C20.394 5.112 16.849 2 12.289 2"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "pinterest"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.087-.791-.166-2.005.035-2.869.182-.78 1.173-4.971 1.173-4.971s-.299-.599-.299-1.484c0-1.39.806-2.429 1.809-2.429.853 0 1.265.641 1.265 1.409 0 .858-.546 2.141-.828 3.329-.236.996.499 1.807 1.481 1.807 1.777 0 3.144-1.874 3.144-4.579 0-2.394-1.72-4.068-4.177-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.781.744 2.282a.297.297 0 01.069.287c-.077.316-.246.995-.279 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.051 6.607-6.051 3.469 0 6.165 2.472 6.165 5.775 0 3.446-2.173 6.22-5.189 6.22-1.013 0-1.966-.526-2.292-1.148l-.623 2.377c-.226.869-.835 1.957-1.243 2.622.936.289 1.93.445 2.961.445 5.523 0 10-4.477 10-10S17.523 2 12 2z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "pocket"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M21.927 4.194A1.82 1.82 0 0020.222 3H3.839a1.823 1.823 0 00-1.813 1.814v6.035l.069 1.2c.29 2.73 1.707 5.115 3.899 6.778l.119.089.025.018a9.897 9.897 0 003.91 1.727 10.06 10.06 0 004.049-.014.261.261 0 00.064-.023 9.906 9.906 0 003.753-1.691l.025-.018c.04-.029.08-.058.119-.089 2.192-1.664 3.609-4.049 3.898-6.778l.069-1.2V4.814a1.792 1.792 0 00-.098-.62zm-4.235 6.287l-4.704 4.512a1.372 1.372 0 01-1.898 0l-4.705-4.512a1.371 1.371 0 111.898-1.979l3.756 3.601 3.755-3.601a1.372 1.372 0 011.898 1.979z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "polldaddy"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.487 2 2 6.487 2 12c0 5.514 4.487 10 10 10 5.514 0 10-4.486 10-10 0-5.513-4.486-10-10-10zm.991 1.68c2.361.084 4.657 1.251 6.197 3.136.283.334.541.693.774 1.067a7.775 7.775 0 00-6.094-2.94 7.764 7.764 0 00-5.896 2.703c-.006.003-.01.01-.016.014l-.152.159-.031.032a6.122 6.122 0 00-1.633 4.165 6.15 6.15 0 006.143 6.143c.57 0 1.123-.081 1.649-.227-1.849.839-4.131.747-5.926-.324-1.841-1.089-3.171-3.111-3.433-5.313A7.386 7.386 0 016.69 6.137C8.294 4.5 10.634 3.563 12.991 3.68zm3.373 8.519c-.049-2.024-1.587-3.889-3.544-4.174-1.927-.343-3.917.857-4.451 2.661a3.673 3.673 0 00.2 2.653c.39.8 1.067 1.451 1.894 1.759 1.664.654 3.63-.27 4.173-1.863.593-1.58-.396-3.423-1.94-3.776-1.52-.407-3.161.757-3.204 2.243a2.362 2.362 0 00.753 1.879c.501.476 1.23.667 1.871.529a2.067 2.067 0 001.469-1.134 1.912 1.912 0 00-.087-1.767c-.297-.513-.859-.863-1.429-.881a1.698 1.698 0 00-1.437.679 1.525 1.525 0 00-.18 1.489c.004.011.01.021.016.03.193.634.774 1.1 1.467 1.117a1.618 1.618 0 01-.97-.183c-.466-.244-.809-.747-.893-1.29a1.8 1.8 0 01.499-1.539 2.016 2.016 0 011.58-.606c.593.04 1.159.35 1.517.859.364.496.51 1.156.383 1.773-.116.62-.529 1.174-1.093 1.514a2.515 2.515 0 01-1.914.286c-.65-.161-1.226-.606-1.584-1.206a2.825 2.825 0 01-.341-2.031c.143-.7.573-1.321 1.176-1.753 1.193-.883 3.056-.751 4.106.411 1.106 1.1 1.327 3.027.406 4.371-.877 1.376-2.74 2.086-4.374 1.594-1.639-.449-2.913-2.079-3.031-3.853-.07-.884.13-1.797.583-2.577.445-.777 1.155-1.432 1.972-1.862 1.64-.88 3.816-.743 5.349.424 1.251.924 2.083 2.42 2.236 4.009l.001.03c0 2.9-2.359 5.26-5.26 5.26a5.216 5.216 0 01-1.947-.376 5.01 5.01 0 002.613-.079 4.955 4.955 0 002.514-1.751c.618-.828.95-1.861.901-2.869zM12 21.113c-5.024 0-9.111-4.087-9.111-9.113 0-4.789 3.713-8.723 8.411-9.081a6.548 6.548 0 00-.397.06c-2.644.453-5.017 2.106-6.32 4.409-1.309 2.301-1.391 5.19-.3 7.527 1.056 2.34 3.253 4.156 5.776 4.553 2.497.44 5.133-.483 6.787-2.301 1.719-1.797 2.269-4.529 1.486-6.796-.583-1.81-1.976-3.331-3.7-4.046 3.417.594 6.174 3.221 6.174 6.781 0 1.004-.241 2.02-.657 2.966-1.498 2.984-4.586 5.041-8.149 5.041z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "print"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M9 16h6v2H9v-2zm13 1h-3v3a2 2 0 01-2 2H7a2 2 0 01-2-2v-3H2V9a2 2 0 012-2h1V5a2 2 0 012-2h10a2 2 0 012 2v2h1a2 2 0 012 2v8zM7 7h10V5H7v2zm10 7H7v6h10v-6zm3-3.5a1.5 1.5 0 10-3.001.001A1.5 1.5 0 0020 10.5z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "reddit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M22 11.816a2.279 2.279 0 00-2.277-2.277c-.593 0-1.122.24-1.526.614-1.481-.965-3.455-1.594-5.647-1.69l1.171-3.702 3.18.748a1.878 1.878 0 001.876 1.862 1.88 1.88 0 001.877-1.878 1.88 1.88 0 00-1.877-1.877c-.769 0-1.431.466-1.72 1.13l-3.508-.826a.386.386 0 00-.46.261l-1.35 4.268c-2.316.038-4.411.67-5.97 1.671a2.24 2.24 0 00-1.492-.581A2.279 2.279 0 002 11.816c0 .814.433 1.523 1.078 1.925a4.056 4.056 0 00-.061.672c0 3.292 4.011 5.97 8.941 5.97s8.941-2.678 8.941-5.97c0-.214-.02-.424-.053-.632A2.259 2.259 0 0022 11.816zm-3.224-7.422a1.1 1.1 0 11-.001 2.199 1.1 1.1 0 01.001-2.199zM2.777 11.816c0-.827.672-1.5 1.499-1.5.313 0 .598.103.838.269-.851.676-1.477 1.479-1.812 2.36a1.482 1.482 0 01-.525-1.129zm9.182 7.79c-4.501 0-8.164-2.329-8.164-5.193S7.457 9.22 11.959 9.22s8.164 2.329 8.164 5.193-3.663 5.193-8.164 5.193zm8.677-6.605c-.326-.89-.948-1.701-1.797-2.384.248-.186.55-.301.883-.301.827 0 1.5.673 1.5 1.5.001.483-.23.911-.586 1.185zm-11.64 1.703c-.76 0-1.397-.616-1.397-1.376 0-.76.637-1.397 1.397-1.397s1.376.637 1.376 1.397-.616 1.376-1.376 1.376zm7.405-1.376c0 .76-.616 1.376-1.376 1.376-.76 0-1.399-.616-1.399-1.376 0-.76.639-1.397 1.399-1.397s1.376.637 1.376 1.397zm-1.172 3.38a.389.389 0 010 .55c-.674.674-1.727 1.002-3.219 1.002l-.011-.002-.011.002c-1.492 0-2.544-.328-3.218-1.002a.389.389 0 11.55-.55c.521.521 1.394.775 2.669.775l.011.002.011-.002c1.275 0 2.148-.253 2.669-.775a.387.387 0 01.549 0z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "share"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M18 16c-.788 0-1.499.31-2.034.807L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.048 4.118A2.981 2.981 0 0015 19a3 3 0 103-3z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "skype"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M10.113 2.699l.1-.02c.033.017.066.033.098.051l-.198-.031zM2.72 10.223l-.017.103c.018.032.033.064.051.095l-.034-.198zm18.555 3.548c.007-.035.011-.071.018-.106-.018-.031-.033-.064-.052-.095l.034.201zm-7.712 7.428c.032.019.065.035.096.053l.105-.017-.201-.036zM22 16.386a5.55 5.55 0 01-1.637 3.953 5.548 5.548 0 01-3.953 1.637 5.575 5.575 0 01-2.75-.725l.105-.017-.202-.035c.032.019.065.035.096.053a9.524 9.524 0 01-1.654.147 9.375 9.375 0 01-3.676-.743 9.38 9.38 0 01-3.002-2.023 9.397 9.397 0 01-2.023-3.002 9.375 9.375 0 01-.743-3.676c0-.546.049-1.093.142-1.628.018.032.033.064.051.095l-.034-.199-.017.103A5.586 5.586 0 012 7.615c0-1.493.582-2.898 1.637-3.953A5.555 5.555 0 017.59 2.024c.915 0 1.818.228 2.622.655l-.1.02.199.031c-.032-.018-.066-.034-.098-.051l.004-.001a9.543 9.543 0 011.788-.169 9.41 9.41 0 016.678 2.766 9.4 9.4 0 012.024 3.002 9.375 9.375 0 01.743 3.676c0 .575-.054 1.15-.157 1.712-.018-.031-.033-.064-.052-.095l.034.201c.007-.035.011-.071.018-.106.461.829.707 1.767.707 2.721zm-5.183-2.248c0-1.331-.613-2.743-3.033-3.282l-2.209-.49c-.84-.192-1.807-.444-1.807-1.237 0-.794.679-1.348 1.903-1.348 2.468 0 2.243 1.696 3.468 1.696.645 0 1.209-.379 1.209-1.031 0-1.521-2.435-2.663-4.5-2.663-2.242 0-4.63.952-4.63 3.488 0 1.221.436 2.521 2.839 3.123l2.984.745c.903.223 1.129.731 1.129 1.189 0 .762-.758 1.507-2.129 1.507-2.679 0-2.307-2.062-3.743-2.062-.645 0-1.113.444-1.113 1.078 0 1.236 1.501 2.886 4.856 2.886 3.195 0 4.776-1.538 4.776-3.599z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "spotify"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.871 7.077-.496 9.713 1.115a.623.623 0 01.206.857M17.81 13.7a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166A.779.779 0 116.32 11.3c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.256 1.072m.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 11-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 11-.955 1.608"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "squarespace"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M20.87 9.271a3.86 3.86 0 00-5.458 0l-6.141 6.141a.964.964 0 101.365 1.364l6.14-6.14a1.929 1.929 0 112.729 2.729l-6.022 6.022a1.929 1.929 0 002.729 0l4.658-4.658a3.86 3.86 0 000-5.458zm-2.047 2.047a.965.965 0 00-1.365 0l-6.14 6.14a1.929 1.929 0 01-2.729 0 .964.964 0 10-1.364 1.364 3.86 3.86 0 005.458 0l6.14-6.14a.966.966 0 000-1.364zm-2.047-6.141a3.858 3.858 0 00-5.458 0l-6.14 6.14a.964.964 0 101.364 1.364l6.141-6.14a1.929 1.929 0 012.729 0 .965.965 0 101.364-1.364zm-2.047 2.047a.964.964 0 00-1.364 0l-6.14 6.141a1.929 1.929 0 11-2.729-2.729l6.022-6.022a1.929 1.929 0 00-2.729 0L3.13 9.271a3.86 3.86 0 005.458 5.458l6.14-6.141a.963.963 0 00.001-1.364z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "stumbleupon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 4.294a4.471 4.471 0 00-4.471 4.471v6.353a1.059 1.059 0 11-2.118 0v-2.824H2v2.941a4.471 4.471 0 008.942 0v-6.47a1.059 1.059 0 112.118 0v1.294l1.412.647 2-.647V8.765A4.473 4.473 0 0012 4.294zm1.059 8.059v2.882a4.471 4.471 0 008.941 0v-2.824h-3.412v2.824a1.059 1.059 0 11-2.118 0v-2.882l-2 .647-1.411-.647z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "telegram"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.08 14.757s-.25.625-.936.325l-2.541-1.949-1.63 1.486s-.127.096-.266.036c0 0-.12-.011-.27-.486-.15-.475-.911-2.972-.911-2.972L6 12.349s-.387-.137-.425-.438c-.037-.3.437-.462.437-.462l10.03-3.934s.824-.362.824.238l-1.786 9.004z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "tiktok-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm9.584 3h-2.052l.019 8.128a1.73 1.73 0 11-1.215-1.65v-2.084h-.533a3.804 3.804 0 103.803 3.803l-.022-4.207c1.268.968 2.85.869 2.85.869V8.82C14.47 8.636 14.584 6 14.584 6z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "tiktok"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12.22 2h3.42s-.19 4.394 4.75 4.702v3.396s-2.636.166-4.75-1.448l.037 7.011a6.338 6.338 0 11-6.34-6.338h.89v3.472a2.882 2.882 0 102.024 2.752L12.22 2z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "tumblr-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M16.749 17.396c-.357.17-1.041.319-1.551.332-1.539.041-1.837-1.081-1.85-1.896V9.847h3.861v-2.91h-3.847V2.039h-2.817c-.046 0-.127.041-.138.144-.165 1.499-.867 4.13-3.783 5.181v2.484h1.945v6.282c0 2.151 1.587 5.206 5.775 5.135 1.413-.024 2.982-.616 3.329-1.126l-.924-2.743z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "tumblr"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5.569 14.265c-2.446.042-3.372-1.742-3.372-2.998v-3.668H8.923v-1.45c1.703-.614 2.113-2.15 2.209-3.025.007-.06.054-.084.081-.084h1.645V8.9h2.246v1.7H12.85v3.495c.008.476.182 1.131 1.081 1.107.298-.008.697-.094.906-.194l.54 1.601c-.205.296-1.121.641-1.946.656z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "twitch"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M16.499 8.089h-1.636v4.91h1.636v-4.91zm-4.499 0h-1.637v4.91H12v-4.91zM4.228 3.178L3 6.451v13.092h4.499V22h2.456l2.454-2.456h3.681L21 14.636V3.178H4.228zm15.136 10.638L16.5 16.681H12l-2.453 2.453V16.68H5.863V4.814h13.501v9.002z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "twitter-alt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M22.23 5.924a8.212 8.212 0 01-2.357.646 4.115 4.115 0 001.804-2.27 8.221 8.221 0 01-2.606.996 4.103 4.103 0 00-6.991 3.742 11.647 11.647 0 01-8.457-4.287 4.087 4.087 0 00-.556 2.063 4.1 4.1 0 001.825 3.415 4.09 4.09 0 01-1.859-.513v.052a4.104 4.104 0 003.292 4.023 4.099 4.099 0 01-1.853.07 4.11 4.11 0 003.833 2.85 8.236 8.236 0 01-5.096 1.756 8.33 8.33 0 01-.979-.057 11.617 11.617 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531a8.298 8.298 0 002.047-2.123z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "twitter"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-2.534 6.71c.004.099.007.198.007.298 0 3.045-2.318 6.556-6.556 6.556a6.52 6.52 0 01-3.532-1.035 4.626 4.626 0 003.412-.954 2.307 2.307 0 01-2.152-1.6 2.295 2.295 0 001.04-.04 2.306 2.306 0 01-1.848-2.259v-.029c.311.173.666.276 1.044.288a2.303 2.303 0 01-.713-3.076 6.54 6.54 0 004.749 2.407 2.305 2.305 0 013.926-2.101 4.602 4.602 0 001.463-.559 2.31 2.31 0 01-1.013 1.275c.466-.056.91-.18 1.323-.363-.31.461-.7.867-1.15 1.192z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "vimeo"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M22.396 7.164c-.093 2.026-1.507 4.799-4.245 8.32C15.322 19.161 12.928 21 10.97 21c-1.214 0-2.24-1.119-3.079-3.359l-1.68-6.159c-.623-2.239-1.29-3.36-2.005-3.36-.156 0-.701.328-1.634.98l-.978-1.261c1.027-.902 2.04-1.805 3.037-2.708C6.001 3.95 7.03 3.327 7.715 3.264c1.619-.156 2.616.951 2.99 3.321.404 2.557.685 4.147.841 4.769.467 2.121.981 3.181 1.542 3.181.435 0 1.09-.688 1.963-2.065.871-1.376 1.338-2.422 1.401-3.142.125-1.187-.343-1.782-1.401-1.782-.498 0-1.012.115-1.541.341 1.023-3.35 2.977-4.977 5.862-4.884 2.139.063 3.148 1.45 3.024 4.161z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "whatsapp"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M2.048 22l1.406-5.136a9.894 9.894 0 01-1.323-4.955C2.133 6.446 6.579 2 12.042 2a9.848 9.848 0 017.011 2.906 9.85 9.85 0 012.9 7.011c-.002 5.464-4.448 9.91-9.91 9.91h-.004a9.913 9.913 0 01-4.736-1.206L2.048 22zm5.497-3.172l.301.179a8.214 8.214 0 004.193 1.148h.003c4.54 0 8.235-3.695 8.237-8.237a8.189 8.189 0 00-2.41-5.828 8.182 8.182 0 00-5.824-2.416c-4.544 0-8.239 3.695-8.241 8.237a8.222 8.222 0 001.259 4.384l.196.312-.832 3.04 3.118-.819zm9.49-4.554c-.062-.103-.227-.165-.475-.289-.248-.124-1.465-.723-1.692-.806-.227-.083-.392-.124-.557.124-.165.248-.64.806-.784.971-.144.165-.289.186-.536.062-.248-.124-1.046-.385-1.991-1.229-.736-.657-1.233-1.468-1.378-1.715-.144-.248-.015-.382.109-.505.111-.111.248-.289.371-.434.124-.145.165-.248.248-.413.083-.165.041-.31-.021-.434s-.557-1.343-.763-1.839c-.202-.483-.407-.417-.559-.425-.144-.007-.31-.009-.475-.009a.91.91 0 00-.66.31c-.226.248-.866.847-.866 2.066 0 1.219.887 2.396 1.011 2.562.124.165 1.746 2.666 4.23 3.739.591.255 1.052.408 1.412.522.593.189 1.133.162 1.56.098.476-.071 1.465-.599 1.671-1.177.206-.58.206-1.075.145-1.179z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "woocommerce"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M19 2H5C3.3 2 2 3.3 2 5v11c0 1.7 1.3 3 3 3h4l6 3-1-3h5c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3zm-1.6 4.5c-.4.8-.8 2.1-1 3.9-.3 1.8-.4 3.1-.3 4.1 0 .3 0 .5-.1.7s-.3.4-.6.4-.6-.1-.9-.4c-1-1-1.8-2.6-2.4-4.6-.7 1.4-1.2 2.4-1.6 3.1-.6 1.2-1.2 1.8-1.6 1.9-.3 0-.5-.2-.8-.7-.5-1.4-1.1-4.2-1.7-8.2 0-.3 0-.5.2-.7.1-.2.4-.3.7-.4.5 0 .9.2.9.8.3 2.3.7 4.2 1.1 5.7l2.4-4.5c.2-.4.4-.6.8-.6.5 0 .8.3.9.9.3 1.4.6 2.6 1 3.7.3-2.7.8-4.7 1.4-5.9.2-.3.4-.5.7-.5.2 0 .5.1.7.2.2.2.3.4.3.6s0 .4-.1.5z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "wordpress"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12.158 12.786L9.46 20.625a8.984 8.984 0 005.526-.144.852.852 0 01-.065-.124l-2.763-7.571zM3.009 12a8.993 8.993 0 005.067 8.092L3.788 8.341A8.952 8.952 0 003.009 12zm15.06-.454c0-1.112-.399-1.881-.741-2.48-.456-.741-.883-1.368-.883-2.109 0-.826.627-1.596 1.51-1.596.04 0 .078.005.116.007A8.963 8.963 0 0012 3.009a8.982 8.982 0 00-7.512 4.052c.211.007.41.011.579.011.94 0 2.396-.114 2.396-.114.484-.028.541.684.057.741 0 0-.487.057-1.029.085l3.274 9.739 1.968-5.901-1.401-3.838c-.484-.028-.943-.085-.943-.085-.485-.029-.428-.769.057-.741 0 0 1.484.114 2.368.114.94 0 2.397-.114 2.397-.114.485-.028.542.684.057.741 0 0-.488.057-1.029.085l3.249 9.665.897-2.996c.456-1.169.684-2.137.684-2.907zm1.82-3.86c.039.286.06.593.06.924 0 .912-.171 1.938-.684 3.22l-2.746 7.94a8.984 8.984 0 004.47-7.771 8.922 8.922 0 00-1.1-4.313zM12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "xanga"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M9 9h6v6H9V9zM3 9h6V3H3v6zm12 0h6V3h-6v6zm0 12h6v-6h-6v6zM3 21h6v-6H3v6z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("symbol", {
    viewBox: "0 0 24 24",
    id: "youtube"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M21.8 8.001s-.195-1.378-.795-1.985c-.76-.797-1.613-.801-2.004-.847-2.799-.202-6.997-.202-6.997-.202h-.009s-4.198 0-6.997.202c-.39.047-1.242.051-2.003.847-.6.607-.795 1.985-.795 1.985S2 9.62 2 11.238v1.517c0 1.618.2 3.237.2 3.237s.195 1.378.795 1.985c.761.797 1.76.771 2.205.855 1.6.153 6.8.201 6.8.201s4.203-.006 7.001-.209c.391-.047 1.243-.051 2.004-.847.6-.607.795-1.985.795-1.985s.2-1.618.2-3.237v-1.517c0-1.618-.2-3.237-.2-3.237zM9.935 14.594l-.001-5.62 5.404 2.82-5.403 2.8z"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InlineSocialLogosSprite);

/***/ }),

/***/ 4327:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6706);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(692);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3634);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _use_add_tags_to_post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8640);










function SuggestedTags(props) {
  const {
    __,
    _n
  } = (0,_wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_7__/* .useI18n */ .s9)();
  const localeSlug = (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_8__/* .useLocale */ .Ym)();
  const {
    id: postId,
    meta: postMeta
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/editor').getCurrentPost(), []);
  const {
    createNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__.store);
  const origSuggestedTags = postMeta?.reader_suggested_tags ? JSON.parse(postMeta.reader_suggested_tags) : [];
  const [selectedTags, setSelectedTags] = react__WEBPACK_IMPORTED_MODULE_5__.useState(origSuggestedTags);
  const onAddTagsButtonClick = numAddedTags => {
    // Compare origSuggestedTags and selectedTags and determine the number of tags that are different
    const numSuggestedTags = origSuggestedTags.length;
    const numSelectedTags = selectedTags.length;
    const numSameTags = origSuggestedTags.filter(tag => selectedTags.includes(tag)).length;
    const eventProps = {
      number_of_original_suggested_tags: numSuggestedTags,
      number_of_selected_tags: numSelectedTags,
      number_of_suggested_tags_selected: numSameTags,
      number_of_added_tags: numAddedTags
    };
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_reader_post_publish_add_tags', eventProps);
    if (numAddedTags > 0) {
      createNotice('success', _n('Tag Added.', 'Tags Added.', numAddedTags, 'full-site-editing'), {
        type: 'snackbar'
      });
    } else {
      createNotice('warning', __('No Tags Added.', 'full-site-editing'), {
        type: 'snackbar'
      });
    }
    props.setShouldShowSuggestedTags(false);
  };
  const {
    saveTags
  } = (0,_use_add_tags_to_post__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(postId, selectedTags, onAddTagsButtonClick);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (origSuggestedTags?.length === 0) {
      // Check if localeSlug begins with 'en'
      if (localeSlug && localeSlug.startsWith('en')) {
        (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_reader_post_publish_no_suggested_tags');
      }
      props.setShouldShowSuggestedTags(false);
    } else {
      (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_reader_post_publish_show_suggested_tags', {
        number_of_original_suggested_tags: origSuggestedTags.length
      });
    }
  }, []);
  const onChangeSelectedTags = newTags => {
    setSelectedTags(newTags);
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_reader_post_publish_update_suggested_tags');
  };
  const tokenField = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    value: selectedTags,
    onChange: onChangeSelectedTags,
    label: __('Tags', 'full-site-editing')
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-post-published-sharing-modal__suggest-tags"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, __('Recommended tags:', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('Based on the topics and themes in your post, here are some suggested tags to consider:', 'full-site-editing')), tokenField, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('Adding tags can help drive more traffic to your post.', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "wpcom-block-editor-post-published-sharing-modal__save-tags",
    onClick: saveTags,
    variant: "primary"
  }, __('Add these tags', 'full-site-editing')));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.memo(SuggestedTags));

/***/ }),

/***/ 8640:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

const useAddTagsToPost = (postId, tags, onSaveTags) => {
  async function saveTags() {
    let addedTags = 0;
    try {
      const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'POST',
        path: `/wpcom/v2/read/sites/${window._currentSiteId}/posts/${postId}/tags/add`,
        data: {
          tags
        }
      });
      addedTags = result.added_tags ?? 0;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error: Unable to add tags. Reason: %s', JSON.stringify(error));
    }
    onSaveTags(addedTags);
  }
  return {
    saveTags
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useAddTagsToPost);

/***/ }),

/***/ 5742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const useSharingModalDismissed = initial => {
  const [isDismissed, setSharingModalDismissed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(initial);
  function updateIsDismissed(value) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      method: 'PUT',
      path: '/wpcom/v2/block-editor/sharing-modal-dismissed',
      data: {
        wpcom_sharing_modal_dismissed: value
      }
    }).finally(() => {
      setSharingModalDismissed(value);
    });
  }
  return {
    isDismissed,
    updateIsDismissed
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSharingModalDismissed);

/***/ }),

/***/ 9428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gH: () => (/* binding */ BLANK_CANVAS_VARIANT),
/* harmony export */   kz: () => (/* binding */ register),
/* harmony export */   um: () => (/* binding */ DEFAULT_VARIANT)
/* harmony export */ });
/* unused harmony exports actions, selectors */
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6161);
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var a8c_fse_common_data_stores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4995);
/* harmony import */ var a8c_fse_common_data_stores__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(a8c_fse_common_data_stores__WEBPACK_IMPORTED_MODULE_3__);




const DEFAULT_VARIANT = 'tour';
const BLANK_CANVAS_VARIANT = 'blank-canvas-tour';
const showWelcomeGuideReducer = (state = undefined, action) => {
  switch (action.type) {
    case 'WPCOM_WELCOME_GUIDE_FETCH_STATUS_SUCCESS':
      return action.response.show_welcome_guide;
    case 'WPCOM_WELCOME_GUIDE_SHOW_SET':
      return action.show;
    case 'WPCOM_WELCOME_GUIDE_RESET_STORE':
      return undefined;
    default:
      return state;
  }
};
const welcomeGuideManuallyOpenedReducer = (state = false, action) => {
  switch (action.type) {
    case 'WPCOM_WELCOME_GUIDE_SHOW_SET':
      if (typeof action.openedManually !== 'undefined') {
        return action.openedManually;
      }
      return state;
    case 'WPCOM_WELCOME_GUIDE_RESET_STORE':
      return false;
    default:
      return state;
  }
};

// TODO: next PR convert file to Typescript to ensure control of tourRating values: null, 'thumbs-up' 'thumbs-down'
const tourRatingReducer = (state = undefined, action) => {
  switch (action.type) {
    case 'WPCOM_WELCOME_GUIDE_TOUR_RATING_SET':
      return action.tourRating;
    case 'WPCOM_WELCOME_GUIDE_RESET_STORE':
      return undefined;
    default:
      return state;
  }
};
const welcomeGuideVariantReducer = (state = DEFAULT_VARIANT, action) => {
  switch (action.type) {
    case 'WPCOM_WELCOME_GUIDE_FETCH_STATUS_SUCCESS':
      return action.response.variant;
    case 'WPCOM_HAS_USED_PATTERNS_MODAL':
      return state === BLANK_CANVAS_VARIANT ? DEFAULT_VARIANT : state;
    case 'WPCOM_WELCOME_GUIDE_RESET_STORE':
      return DEFAULT_VARIANT;
    default:
      return state;
  }
};
const shouldShowFirstPostPublishedModalReducer = (state = false, action) => {
  switch (action.type) {
    case 'WPCOM_SET_SHOULD_SHOW_FIRST_POST_PUBLISHED_MODAL':
      return action.value;
    case 'WPCOM_WELCOME_GUIDE_RESET_STORE':
      return false;
    default:
      return state;
  }
};
const reducer = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.combineReducers)({
  welcomeGuideManuallyOpened: welcomeGuideManuallyOpenedReducer,
  showWelcomeGuide: showWelcomeGuideReducer,
  tourRating: tourRatingReducer,
  welcomeGuideVariant: welcomeGuideVariantReducer,
  shouldShowFirstPostPublishedModal: shouldShowFirstPostPublishedModalReducer
});
const actions = {
  *fetchWelcomeGuideStatus() {
    const response = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_2__.apiFetch)({
      path: '/wpcom/v2/block-editor/nux'
    });
    return {
      type: 'WPCOM_WELCOME_GUIDE_FETCH_STATUS_SUCCESS',
      response
    };
  },
  *fetchShouldShowFirstPostPublishedModal() {
    const response = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_2__.apiFetch)({
      path: '/wpcom/v2/block-editor/should-show-first-post-published-modal'
    });
    return {
      type: 'WPCOM_SET_SHOULD_SHOW_FIRST_POST_PUBLISHED_MODAL',
      value: response.should_show_first_post_published_modal
    };
  },
  setShowWelcomeGuide: (show, {
    openedManually,
    onlyLocal
  } = {}) => {
    if (!onlyLocal) {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: '/wpcom/v2/block-editor/nux',
        method: 'POST',
        data: {
          show_welcome_guide: show
        }
      });
    }
    return {
      type: 'WPCOM_WELCOME_GUIDE_SHOW_SET',
      show,
      openedManually
    };
  },
  setTourRating: tourRating => {
    return {
      type: 'WPCOM_WELCOME_GUIDE_TOUR_RATING_SET',
      tourRating
    };
  },
  setUsedPageOrPatternsModal: () => {
    return {
      type: 'WPCOM_HAS_USED_PATTERNS_MODAL'
    };
  },
  // The `resetStore` action is only used for testing to reset the
  // store inbetween tests.
  resetStore: () => ({
    type: 'WPCOM_WELCOME_GUIDE_RESET_STORE'
  })
};
const selectors = {
  isWelcomeGuideManuallyOpened: state => state.welcomeGuideManuallyOpened,
  isWelcomeGuideShown: state => !!state.showWelcomeGuide,
  isWelcomeGuideStatusLoaded: state => typeof state.showWelcomeGuide !== 'undefined',
  getTourRating: state => state.tourRating,
  // the 'modal' variant previously used for mobile has been removed but its slug may still be persisted in local storage
  getWelcomeGuideVariant: state => state.welcomeGuideVariant === 'modal' ? DEFAULT_VARIANT : state.welcomeGuideVariant,
  getShouldShowFirstPostPublishedModal: state => state.shouldShowFirstPostPublishedModal
};
function register() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.registerStore)('automattic/wpcom-welcome-guide', {
    reducer,
    actions,
    selectors,
    controls: _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_2__.controls,
    persist: true
  });
}

/***/ }),

/***/ 6516:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var calypso_assets_images_illustrations_video_success_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8132);
/* harmony import */ var _dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3166);
/* harmony import */ var _dotcom_fse_lib_video_celebration_modal_has_seen_video_celebration_modal_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2469);
/* harmony import */ var _dotcom_fse_lib_video_celebration_modal_use_should_show_video_celebration_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7330);
/* harmony import */ var _nux_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5673);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9429);





const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__;







// Shows a celebration modal after a video is first uploaded to a site and the editor is saved.
const VideoCelebrationModalInner = () => {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [hasDisplayedModal, setHasDisplayedModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const isSiteEditor = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => !!select('core/edit-site'));
  const previousIsEditorSaving = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    updateHasSeenVideoCelebrationModal
  } = (0,_dotcom_fse_lib_video_celebration_modal_has_seen_video_celebration_modal_context__WEBPACK_IMPORTED_MODULE_6__/* .useHasSeenVideoCelebrationModal */ .v)();
  const {
    isEditorSaving
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    if (isSiteEditor) {
      const isSavingSite = select('core').isSavingEntityRecord('root', 'site') && !select('core').isAutosavingEntityRecord('root', 'site');
      const page = select('core/edit-site').getPage();
      const pageId = parseInt(page?.context?.postId);
      const isSavingEntity = select('core').isSavingEntityRecord('postType', 'page', pageId) && !select('core').isAutosavingEntityRecord('postType', 'page', pageId);
      const pageEntity = select('core').getEntityRecord('postType', 'page', pageId);
      return {
        isEditorSaving: isSavingSite || isSavingEntity,
        linkUrl: pageEntity?.link
      };
    }
    const currentPost = select('core/editor').getCurrentPost();
    const isSavingEntity = select('core').isSavingEntityRecord('postType', currentPost?.type, currentPost?.id) && !select('core').isAutosavingEntityRecord('postType', currentPost?.type, currentPost?.id);
    return {
      isEditorSaving: isSavingEntity
    };
  });
  const shouldShowVideoCelebrationModal = (0,_dotcom_fse_lib_video_celebration_modal_use_should_show_video_celebration_modal__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(isEditorSaving);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Conditions to show modal:
    // - user just finished saving
    // - celebration modal hasn't been viewed/isn't visible
    // - site intent is 'videopress'
    // - site has uploaded a video
    if (!isEditorSaving && previousIsEditorSaving.current && !hasDisplayedModal && shouldShowVideoCelebrationModal) {
      setIsModalOpen(true);
      setHasDisplayedModal(true);
      updateHasSeenVideoCelebrationModal(true);
    }
    previousIsEditorSaving.current = isEditorSaving;
  }, [isEditorSaving, hasDisplayedModal, shouldShowVideoCelebrationModal, updateHasSeenVideoCelebrationModal]);
  const closeModal = () => setIsModalOpen(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_nux_modal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
    isOpen: isModalOpen,
    className: "wpcom-site-editor-video-celebration-modal",
    title: __('You’ve added your first video!', 'full-site-editing'),
    description: __('Feel free to keep editing your homepage, or continue and launch your site.', 'full-site-editing'),
    imageSrc: calypso_assets_images_illustrations_video_success_svg__WEBPACK_IMPORTED_MODULE_4__,
    actionButtons: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      onClick: closeModal
    }, __('Keep editing', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      isPrimary: true,
      href: `https://wordpress.com/setup/videopress/launchpad?siteSlug=${window.location.hostname}`,
      target: "_blank",
      rel: "noopener noreferrer"
    }, __('Continue and launch', 'full-site-editing'))),
    onRequestClose: closeModal
  });
};
const VideoCelebrationModal = () => {
  const {
    siteIntent: intent
  } = (0,_dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)();
  if ('videopress' === intent) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(VideoCelebrationModalInner, null);
  }
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoCelebrationModal);

/***/ }),

/***/ 6616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _images_block_picker_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8141);
/* harmony import */ var _images_editor_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2784);
/* harmony import */ var _images_preview_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6253);
/* harmony import */ var _images_private_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8628);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5299);


/* eslint-disable wpcalypso/jsx-classname-namespace */






const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__;





function WpcomNux() {
  const {
    show,
    isNewPageLayoutModalOpen,
    isManuallyOpened
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => ({
    show: select('automattic/wpcom-welcome-guide').isWelcomeGuideShown(),
    isNewPageLayoutModalOpen: select('automattic/starter-page-layouts') &&
    // Handle the case where SPT is not initalized.
    select('automattic/starter-page-layouts').isOpen(),
    isManuallyOpened: select('automattic/wpcom-welcome-guide').isWelcomeGuideManuallyOpened()
  }));
  const {
    setShowWelcomeGuide
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('automattic/wpcom-welcome-guide');

  // Track opening of the welcome guide
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (show && !isNewPageLayoutModalOpen) {
      (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_nux_open', {
        is_gutenboarding: window.calypsoifyGutenberg?.isGutenboarding,
        is_manually_opened: isManuallyOpened
      });
    }
  }, [isManuallyOpened, isNewPageLayoutModalOpen, show]);
  if (!show || isNewPageLayoutModalOpen) {
    return null;
  }
  const dismissWpcomNux = () => {
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_nux_dismiss', {
      is_gutenboarding: window.calypsoifyGutenberg?.isGutenboarding
    });
    setShowWelcomeGuide(false, {
      openedManually: false
    });
  };
  const nuxPages = getWpcomNuxPages();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Guide, {
    className: "wpcom-block-editor-nux",
    contentLabel: __('Welcome to your website', 'full-site-editing'),
    finishButtonText: __('Get started', 'full-site-editing'),
    onFinish: dismissWpcomNux
  }, nuxPages.map((nuxPage, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NuxPage, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)({
    key: nuxPage.heading,
    pageNumber: index + 1,
    isLastPage: index === nuxPages.length - 1
  }, nuxPage))));
}

/**
 * This function returns a collection of NUX slide data
 * @returns { Array } a collection of <NuxPage /> props
 */
function getWpcomNuxPages() {
  return [{
    heading: __('Welcome to your website', 'full-site-editing'),
    description: __('Edit your homepage, add the pages you need, and change your site’s look and feel.', 'full-site-editing'),
    imgSrc: _images_editor_svg__WEBPACK_IMPORTED_MODULE_6__,
    alignBottom: true
  }, {
    heading: __('Add or edit your content', 'full-site-editing'),
    description: __('Edit the placeholder content we’ve started you off with, or click the plus sign to add more content.', 'full-site-editing'),
    imgSrc: _images_block_picker_svg__WEBPACK_IMPORTED_MODULE_5__
  }, {
    heading: __('Preview your site as you go', 'full-site-editing'),
    description: __('As you edit your site content, click “Preview” to see your site the way your visitors will.', 'full-site-editing'),
    imgSrc: _images_preview_svg__WEBPACK_IMPORTED_MODULE_7__,
    alignBottom: true
  }, {
    heading: __('Hidden until you’re ready', 'full-site-editing'),
    description: __('Your site will remain hidden until launched. Click “Launch” in the toolbar to share it with the world.', 'full-site-editing'),
    imgSrc: _images_private_svg__WEBPACK_IMPORTED_MODULE_8__,
    alignBottom: true
  }];
}
function NuxPage({
  pageNumber,
  isLastPage,
  alignBottom = false,
  heading,
  description,
  imgSrc
}) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_nux_slide_view', {
      slide_number: pageNumber,
      is_last_slide: isLastPage,
      is_gutenboarding: window.calypsoifyGutenberg?.isGutenboarding
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GuidePage, {
    className: "wpcom-block-editor-nux__page"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-nux__text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "wpcom-block-editor-nux__heading"
  }, heading), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-nux__description"
  }, description)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-block-editor-nux__visual"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    // Force remount so the stale image doesn't remain while new image is fetched
    key: imgSrc,
    src: imgSrc,
    alt: "",
    "aria-hidden": "true",
    className: 'wpcom-block-editor-nux__image' + (alignBottom ? ' align-bottom' : '')
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomNux);

/***/ }),

/***/ 7160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getEditorType)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Post (Post Type: ‘post’)
 * Page (Post Type: ‘page’)
 * Attachment (Post Type: ‘attachment’)
 * Revision (Post Type: ‘revision’)
 * Navigation menu (Post Type: ‘nav_menu_item’)
 * Block templates (Post Type: ‘wp_template’)
 * Template parts (Post Type: ‘wp_template_part’)
 * @see https://developer.wordpress.org/themes/basics/post-types/#default-post-types
 */

const getEditorType = () => {
  /**
   * Beware when using this method to figure out if we are in the site editor.
   * @see https://github.com/WordPress/gutenberg/issues/46616#issuecomment-1355301090
   * @see https://github.com/Automattic/jetpack/blob/2e56d0d/projects/plugins/jetpack/extensions/shared/get-editor-type.js
   */
  if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/edit-site')) {
    return 'site';
  }
  if ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor')) {
    return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').getCurrentPostType();
  }
  return undefined;
};

/***/ }),

/***/ 965:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6706);
/* harmony import */ var _automattic_onboarding__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4949);
/* harmony import */ var _automattic_tour_kit__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7616);
/* harmony import */ var _automattic_tour_kit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7960);
/* harmony import */ var _automattic_viewport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9886);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3166);
/* harmony import */ var _dotcom_fse_lib_site_plan_use_site_plan__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(676);
/* harmony import */ var _get_editor_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7160);
/* harmony import */ var _tour_steps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5463);
/* harmony import */ var _style_tour_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6401);













function LaunchWpcomWelcomeTour() {
  const {
    show,
    isNewPageLayoutModalOpen,
    isManuallyOpened
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    show: select('automattic/wpcom-welcome-guide').isWelcomeGuideShown(),
    // Handle the case where the new page pattern modal is initialized and open
    isNewPageLayoutModalOpen: select('automattic/starter-page-layouts') && select('automattic/starter-page-layouts').isOpen(),
    isManuallyOpened: select('automattic/wpcom-welcome-guide').isWelcomeGuideManuallyOpened()
  }), []);
  const {
    siteIntent,
    siteIntentFetched
  } = (0,_dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)();
  const localeSlug = (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_8__/* .useLocale */ .Ym)();
  const editorType = (0,_get_editor_type__WEBPACK_IMPORTED_MODULE_5__/* .getEditorType */ .A)();
  const {
    siteIntent: intent
  } = (0,_dotcom_fse_lib_site_intent_use_site_intent__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)();
  // We check the URL param along with site intent because the param loads faster and prevents element flashing.
  const isBlogOnboardingFlow = intent === _automattic_onboarding__WEBPACK_IMPORTED_MODULE_9__/* .START_WRITING_FLOW */ .Xf || intent === _automattic_onboarding__WEBPACK_IMPORTED_MODULE_9__/* .DESIGN_FIRST_FLOW */ .JV;
  // Preload first card image (others preloaded after open state confirmed)
  (0,_automattic_tour_kit__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)([(0,_tour_steps__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(localeSlug, false, false, null, siteIntent)[0]]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isBlogOnboardingFlow) {
      return;
    }
    if (!show && !isNewPageLayoutModalOpen) {
      return;
    }
    if (!siteIntentFetched) {
      return;
    }

    // Track opening of the Welcome Guide
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_tour_open', {
      is_gutenboarding: window.calypsoifyGutenberg?.isGutenboarding,
      is_manually_opened: isManuallyOpened,
      intent: siteIntent,
      editor_type: editorType
    });
  }, [isNewPageLayoutModalOpen, isManuallyOpened, show, siteIntent, siteIntentFetched, editorType, isBlogOnboardingFlow]);
  if (!show || isNewPageLayoutModalOpen || isBlogOnboardingFlow) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(WelcomeTour, {
    siteIntent
  });
}
function WelcomeTour({
  siteIntent
}) {
  const sitePlan = (0,_dotcom_fse_lib_site_plan_use_site_plan__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(window._currentSiteId);
  const localeSlug = (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_8__/* .useLocale */ .Ym)();
  const {
    setShowWelcomeGuide
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('automattic/wpcom-welcome-guide');
  const isGutenboarding = window.calypsoifyGutenberg?.isGutenboarding;
  const isWelcomeTourNext = () => {
    return new URLSearchParams(document.location.search).has('welcome-tour-next');
  };
  const isSiteEditor = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => !!select('core/edit-site'), []);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Until `@types/wordpress__editor` (which has `@types/wordpress__core-data` as a dependency) can be upgraded to a version that includes `getCurrentTheme`
  // the function has existed for many years, and works as expected on wpcom and atomic
  const currentTheme = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core').getCurrentTheme());
  const themeName = currentTheme?.name?.raw?.toLowerCase() ?? null;
  const tourSteps = (0,_tour_steps__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(localeSlug, isWelcomeTourNext(), isSiteEditor, themeName, siteIntent);

  // Only keep Payment block step if user comes from seller simple flow
  if (!('sell' === siteIntent && sitePlan && 'ecommerce-bundle' !== sitePlan.product_slug)) {
    const paymentBlockIndex = tourSteps.findIndex(step => step.slug === 'payment-block');
    tourSteps.splice(paymentBlockIndex, 1);
  }
  const {
    isInserterOpened,
    isSettingsOpened
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    isInserterOpened: select('core/edit-post').isInserterOpened(),
    isSettingsOpened: select('core/interface').getActiveComplementaryArea('core/edit-post') === 'edit-post/document'
  }), []);
  const isTourMinimized = (0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_11__/* .isWithinBreakpoint */ .hO)('<782px') && (isInserterOpened || isSettingsOpened);
  const editorType = (0,_get_editor_type__WEBPACK_IMPORTED_MODULE_5__/* .getEditorType */ .A)();
  const tourConfig = {
    steps: tourSteps,
    closeHandler: (_steps, currentStepIndex, source) => {
      (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_tour_dismiss', {
        is_gutenboarding: isGutenboarding,
        slide_number: currentStepIndex + 1,
        action: source,
        intent: siteIntent,
        editor_type: editorType
      });
      setShowWelcomeGuide(false, {
        openedManually: false
      });
    },
    isMinimized: isTourMinimized,
    options: {
      tourRating: {
        enabled: true,
        useTourRating: () => {
          return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('automattic/wpcom-welcome-guide').getTourRating(), []);
        },
        onTourRate: rating => {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('automattic/wpcom-welcome-guide').setTourRating(rating);
          (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_tour_rate', {
            thumbs_up: rating === 'thumbs-up',
            is_gutenboarding: false,
            intent: siteIntent,
            editor_type: editorType
          });
        }
      },
      callbacks: {
        onMinimize: currentStepIndex => {
          (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_tour_minimize', {
            is_gutenboarding: isGutenboarding,
            slide_number: currentStepIndex + 1,
            intent: siteIntent,
            editor_type: editorType
          });
        },
        onMaximize: currentStepIndex => {
          (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_tour_maximize', {
            is_gutenboarding: isGutenboarding,
            slide_number: currentStepIndex + 1,
            intent: siteIntent,
            editor_type: editorType
          });
        },
        onStepViewOnce: currentStepIndex => {
          const lastStepIndex = tourSteps.length - 1;
          const {
            heading
          } = tourSteps[currentStepIndex].meta;
          (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_tour_slide_view', {
            slide_number: currentStepIndex + 1,
            is_last_slide: currentStepIndex === lastStepIndex,
            slide_heading: heading,
            is_gutenboarding: isGutenboarding,
            intent: siteIntent,
            editor_type: editorType
          });
        }
      },
      effects: {
        spotlight: isWelcomeTourNext() ? {
          styles: {
            minWidth: '50px',
            minHeight: '50px',
            borderRadius: '2px'
          }
        } : undefined,
        arrowIndicator: false
      },
      popperModifiers: [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
        name: 'offset',
        options: {
          offset: ({
            placement,
            reference
          }) => {
            if (placement === 'bottom') {
              const boundary = document.querySelector('.edit-post-header');
              if (!boundary) {
                return;
              }
              const boundaryRect = boundary.getBoundingClientRect();
              const boundaryBottomY = boundaryRect.height + boundaryRect.y;
              const referenceBottomY = reference.height + reference.y;
              return [0, boundaryBottomY - referenceBottomY + 16];
            }
            return [0, 0];
          }
        }
      }), [])],
      classNames: 'wpcom-editor-welcome-tour',
      portalParentElement: document.getElementById('wpwrap')
    }
  };

  // Theme isn't immediately available, so we prevent rendering so the content doesn't switch after it is presented, since some content is based on theme
  if (null === themeName) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_automattic_tour_kit__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
    config: tourConfig
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LaunchWpcomWelcomeTour);

/***/ }),

/***/ 5463:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(355);
/* harmony import */ var _automattic_viewport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9886);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3832);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _get_editor_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7160);







const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__;


function getTourAssets(key) {
  const CDN_PREFIX = 'https://s0.wp.com/i/editor-welcome-tour';
  const tourAssets = {
    addBlock: {
      desktop: {
        src: `${CDN_PREFIX}/slide-add-block.gif`,
        type: 'image/gif'
      },
      mobile: {
        src: `${CDN_PREFIX}/slide-add-block_mobile.gif`,
        type: 'image/gif'
      }
    },
    allBlocks: {
      desktop: {
        src: `${CDN_PREFIX}/slide-all-blocks.gif`,
        type: 'image/gif'
      }
    },
    finish: {
      desktop: {
        src: `${CDN_PREFIX}/slide-finish.png`,
        type: 'image/gif'
      }
    },
    makeBold: {
      desktop: {
        src: `${CDN_PREFIX}/slide-make-bold.gif`,
        type: 'image/gif'
      }
    },
    moreOptions: {
      desktop: {
        src: `${CDN_PREFIX}/slide-more-options.gif`,
        type: 'image/gif'
      },
      mobile: {
        src: `${CDN_PREFIX}/slide-more-options_mobile.gif`,
        type: 'image/gif'
      }
    },
    moveBlock: {
      desktop: {
        src: `${CDN_PREFIX}/slide-move-block.gif`,
        type: 'image/gif'
      },
      mobile: {
        src: `${CDN_PREFIX}/slide-move-block_mobile.gif`,
        type: 'image/gif'
      }
    },
    findYourWay: {
      desktop: {
        src: `${CDN_PREFIX}/slide-find-your-way.gif`,
        type: 'image/gif'
      }
    },
    undo: {
      desktop: {
        src: `${CDN_PREFIX}/slide-undo.gif`,
        type: 'image/gif'
      }
    },
    welcome: {
      desktop: {
        src: `${CDN_PREFIX}/slide-welcome.png`,
        type: 'image/png'
      },
      mobile: {
        src: `${CDN_PREFIX}/slide-welcome_mobile.jpg`,
        type: 'image/jpeg'
      }
    },
    editYourSite: {
      desktop: {
        src: `https://s.w.org/images/block-editor/edit-your-site.gif?1`,
        type: 'image/gif'
      },
      mobile: {
        src: `https://s.w.org/images/block-editor/edit-your-site.gif?1`,
        type: 'image/gif'
      }
    },
    videomakerWelcome: {
      desktop: {
        src: `${CDN_PREFIX}/slide-videomaker-welcome.png`,
        type: 'image/png'
      }
    },
    videomakerEdit: {
      desktop: {
        src: `${CDN_PREFIX}/slide-videomaker-edit.png`,
        type: 'image/png'
      }
    }
  };
  return tourAssets[key];
}
function getTourSteps(localeSlug, referencePositioning = false, isSiteEditor = false, themeName = null, siteIntent = undefined) {
  const isVideoMaker = 'videomaker' === (themeName ?? '');
  const isPatternAssembler = !!(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.getQueryArg)(window.location.href, 'assembler');
  const siteEditorCourseUrl = `https://wordpress.com/home/${window.location.hostname}?courseSlug=site-editor-quick-start`;
  const editorType = (0,_get_editor_type__WEBPACK_IMPORTED_MODULE_5__/* .getEditorType */ .A)();
  const onSiteEditorCourseLinkClick = () => {
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_editor_wpcom_tour_site_editor_course_link_click', {
      is_pattern_assembler: isPatternAssembler,
      intent: siteIntent,
      editor_type: editorType
    });
  };
  return [{
    slug: 'welcome',
    meta: {
      heading: isPatternAssembler ? __('Nice job! Your new page is set up.', 'full-site-editing') : __('Welcome to WordPress!', 'full-site-editing'),
      descriptions: {
        desktop: (() => {
          if (isPatternAssembler) {
            return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)(__('This is the Site Editor, where you can change everything about your site, including adding content to your homepage. <link_to_site_editor_course>Watch these short videos</link_to_site_editor_course> and take this tour to get started.', 'full-site-editing'), {
              link_to_site_editor_course: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
                href: siteEditorCourseUrl,
                onClick: onSiteEditorCourseLinkClick,
                children: null
              })
            });
          }
          return isSiteEditor ? __('Take this short, interactive tour to learn the fundamentals of the WordPress Site Editor.', 'full-site-editing') : __('Take this short, interactive tour to learn the fundamentals of the WordPress editor.', 'full-site-editing');
        })(),
        mobile: null
      },
      imgSrc: getTourAssets(isVideoMaker ? 'videomakerWelcome' : 'welcome'),
      imgLink: isPatternAssembler ? {
        href: siteEditorCourseUrl,
        playable: true,
        onClick: onSiteEditorCourseLinkClick
      } : undefined
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: ['is-with-extra-padding', 'calypso_editor_wpcom_draft_post_modal_show']
      }
    }
  }, {
    slug: 'everything-is-a-block',
    meta: {
      heading: __('Everything is a block', 'full-site-editing'),
      descriptions: {
        desktop: __('In the WordPress Editor, paragraphs, images, and videos are all blocks.', 'full-site-editing'),
        mobile: null
      },
      imgSrc: getTourAssets('allBlocks')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: 'wpcom-editor-welcome-tour__step'
      }
    }
  }, {
    slug: 'add-block',
    ...(referencePositioning && {
      referenceElements: {
        mobile: '.edit-post-header .edit-post-header__toolbar .components-button.edit-post-header-toolbar__inserter-toggle',
        desktop: '.edit-post-header .edit-post-header__toolbar .components-button.edit-post-header-toolbar__inserter-toggle'
      }
    }),
    meta: {
      heading: __('Adding a new block', 'full-site-editing'),
      descriptions: {
        desktop: __('Click + to open the inserter. Then click the block you want to add.', 'full-site-editing'),
        mobile: __('Tap + to open the inserter. Then tap the block you want to add.', 'full-site-editing')
      },
      imgSrc: getTourAssets('addBlock')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: ['is-with-extra-padding', 'wpcom-editor-welcome-tour__step']
      }
    }
  }, {
    slug: 'edit-block',
    meta: {
      heading: __('Click a block to change it', 'full-site-editing'),
      descriptions: {
        desktop: isVideoMaker ? __('Use the toolbar to change the appearance of a selected block. Try replacing a video!', 'full-site-editing') : __('Use the toolbar to change the appearance of a selected block. Try making it bold.', 'full-site-editing'),
        mobile: null
      },
      imgSrc: getTourAssets(isVideoMaker ? 'videomakerEdit' : 'makeBold')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: 'wpcom-editor-welcome-tour__step'
      }
    }
  }, {
    slug: 'settings',
    ...(referencePositioning && {
      referenceElements: {
        mobile: '.edit-post-header .edit-post-header__settings .interface-pinned-items > button:nth-child(1)',
        desktop: '.edit-post-header .edit-post-header__settings .interface-pinned-items > button:nth-child(1)'
      }
    }),
    meta: {
      heading: __('More Options', 'full-site-editing'),
      descriptions: {
        desktop: __('Click the settings icon to see even more options.', 'full-site-editing'),
        mobile: __('Tap the settings icon to see even more options.', 'full-site-editing')
      },
      imgSrc: getTourAssets('moreOptions')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: ['is-with-extra-padding', 'wpcom-editor-welcome-tour__step']
      }
    }
  }, ...(!(0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_6__/* .isMobile */ .Fr)() ? [{
    slug: 'find-your-way',
    meta: {
      heading: __('Find your way', 'full-site-editing'),
      descriptions: {
        desktop: __("Use List View to see all the blocks you've added. Click and drag any block to move it around.", 'full-site-editing'),
        mobile: null
      },
      imgSrc: getTourAssets('findYourWay')
    },
    options: {
      classNames: {
        desktop: ['is-with-extra-padding', 'wpcom-editor-welcome-tour__step'],
        mobile: 'wpcom-editor-welcome-tour__step'
      }
    }
  }] : []), ...(!(0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_6__/* .isMobile */ .Fr)() ? [{
    slug: 'undo',
    ...(referencePositioning && {
      referenceElements: {
        desktop: '.edit-post-header .edit-post-header__toolbar .components-button.editor-history__undo'
      }
    }),
    meta: {
      heading: __('Undo any mistake', 'full-site-editing'),
      descriptions: {
        desktop: __("Click the Undo button if you've made a mistake.", 'full-site-editing'),
        mobile: null
      },
      imgSrc: getTourAssets('undo')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: 'wpcom-editor-welcome-tour__step'
      }
    }
  }] : []), {
    slug: 'drag-drop',
    meta: {
      heading: __('Drag & drop', 'full-site-editing'),
      descriptions: {
        desktop: __('To move blocks around, click and drag the handle.', 'full-site-editing'),
        mobile: __('To move blocks around, tap the up and down arrows.', 'full-site-editing')
      },
      imgSrc: getTourAssets('moveBlock')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: ['is-with-extra-padding', 'wpcom-editor-welcome-tour__step']
      }
    }
  }, {
    slug: 'payment-block',
    meta: {
      heading: __('The Payments block', 'full-site-editing'),
      descriptions: {
        desktop: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, __('The Payments block allows you to accept payments for one-time, monthly recurring, or annual payments on your website', 'full-site-editing'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
          href: (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_7__/* .localizeUrl */ .rm)('https://wordpress.com/support/video-tutorials-add-payments-features-to-your-site-with-our-guides/#how-to-use-the-payments-block-video', localeSlug),
          rel: "noopener noreferrer"
        }, __('Learn more', 'full-site-editing'))),
        mobile: null
      },
      imgSrc: getTourAssets('welcome')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: 'wpcom-editor-welcome-tour__step'
      }
    }
  }, ...(isSiteEditor ? [{
    slug: 'edit-your-site',
    meta: {
      heading: __('Edit your site', 'full-site-editing'),
      descriptions: {
        desktop: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)(__('Design everything on your site - from the header right down to the footer - in the Site Editor. <link_to_fse_docs>Learn more</link_to_fse_docs>', 'full-site-editing'), {
          link_to_fse_docs: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
            href: (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_7__/* .localizeUrl */ .rm)('https://wordpress.com/support/full-site-editing/', localeSlug),
            children: null
          })
        }),
        mobile: __('Design everything on your site - from the header right down to the footer - in the Site Editor.', 'full-site-editing')
      },
      imgSrc: getTourAssets('editYourSite')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: ['is-with-extra-padding', 'wpcom-editor-welcome-tour__step']
      }
    }
  }] : []), {
    slug: 'congratulations',
    meta: {
      heading: __('Congratulations!', 'full-site-editing'),
      descriptions: {
        desktop: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)(__("You've learned the basics. Remember, your site is private until you <link_to_launch_site_docs>decide to launch</link_to_launch_site_docs>. View the <link_to_editor_docs>block editing docs</link_to_editor_docs> to learn more.", 'full-site-editing'), {
          link_to_launch_site_docs: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
            href: (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_7__/* .localizeUrl */ .rm)('https://wordpress.com/support/settings/privacy-settings/#launch-your-site', localeSlug),
            children: null
          }),
          link_to_editor_docs: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
            href: (0,_automattic_i18n_utils__WEBPACK_IMPORTED_MODULE_7__/* .localizeUrl */ .rm)('https://wordpress.com/support/wordpress-editor/', localeSlug),
            children: null
          })
        }),
        mobile: null
      },
      imgSrc: getTourAssets('finish')
    },
    options: {
      classNames: {
        desktop: 'wpcom-editor-welcome-tour__step',
        mobile: 'wpcom-editor-welcome-tour__step'
      }
    }
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTourSteps);

/***/ }),

/***/ 655:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2207);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4357);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);





// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
const ClipboardButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  className,
  text,
  onCopy = noop,
  ...rest
}, ref) => {
  function onCopyHandler() {
    if (text) {
      navigator.clipboard.writeText(text);
      onCopy();
    }
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_automattic_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)({}, rest, {
    onClick: onCopyHandler,
    ref: ref,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)('clipboard-button', className)
  }));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClipboardButton);

/***/ }),

/***/ 6552:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4357);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);





const FormInputCheckbox = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  className,
  ...otherProps
}, ref) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)({
  ref: ref
}, otherProps, {
  type: "checkbox",
  className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(className, 'form-checkbox')
})));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormInputCheckbox);

/***/ }),

/***/ 8948:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Oy: () => (/* reexport safe */ _tracks__WEBPACK_IMPORTED_MODULE_8__.Oy)
/* harmony export */ });
/* harmony import */ var _utils_do_not_track__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(595);
/* harmony import */ var _utils_current_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1379);
/* harmony import */ var _page_view_params__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8910);
/* harmony import */ var _utils_get_tracking_prefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2189);
/* harmony import */ var _utils_set_tracking_prefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4121);
/* harmony import */ var _utils_is_country_in_gdpr_zone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6472);
/* harmony import */ var _utils_is_region_in_ccpa_zone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(750);
/* harmony import */ var _utils_is_region_in_sts_zone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8739);
/* harmony import */ var _tracks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4342);
/* harmony import */ var _train_tracks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7067);
/**
 * Re-export
 */











/***/ }),

/***/ 8910:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports getPageViewParams, getMostRecentUrlPath */
// We use this module state to track url paths submitted to recordTracksPageView
// `lib/analytics/index.js` also reuses it for timing.record
let mostRecentUrlPath = null;

// pathCounter is used to keep track of the order of calypso_page_view Tracks events.
let pathCounter = 0;
if (true) {
  window.addEventListener('popstate', function () {
    // throw away our URL value if the user used the back/forward buttons
    mostRecentUrlPath = null;
  });
}
function getPageViewParams(urlPath) {
  const params = {
    last_pageview_path_with_count: `${mostRecentUrlPath}(${pathCounter.toString()})`,
    this_pageview_path_with_count: `${urlPath}(${pathCounter + 1})`
  };
  // Record this path.
  mostRecentUrlPath = urlPath;
  pathCounter++;
  return params;
}

/**
 * Gets the url path which was set on the last call to getPageViewParams() and stored in module state
 * mostRecentUrlPath will be null if the page was refreshed or getPageViewParams() has not been called
 */
function getMostRecentUrlPath() {
  return mostRecentUrlPath;
}

/***/ }),

/***/ 4342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Oy: () => (/* binding */ recordTracksEvent)
/* harmony export */ });
/* unused harmony exports getTracksLoadPromise, pushEventToTracksQueue, analyticsEvents, getTracksAnonymousUserId, initializeAnalytics, identifyUser, signalUserFromAnotherProduct, recordTracksPageView, recordTracksPageViewWithPageParams, getGenericSuperPropsGetter */
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_load_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7944);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3284);
/* harmony import */ var _page_view_params__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8910);
/* harmony import */ var _utils_current_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1379);
/* harmony import */ var _utils_debug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2193);
/* harmony import */ var _utils_do_not_track__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(595);
/* harmony import */ var _utils_get_tracking_prefs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2189);
/* eslint-disable @typescript-eslint/no-explicit-any */









/**
 * Tracks uses a bunch of special query params that should not be used as property name
 * See internal Nosara repo?
 */
const TRACKS_SPECIAL_PROPS_NAMES = (/* unused pure expression or super */ null && (['geo', 'message', 'request', 'geocity', 'ip']));
const EVENT_NAME_EXCEPTIONS = ['a8c_cookie_banner_ok', 'a8c_cookie_banner_view', 'a8c_ccpa_optout',
// WooCommerce Onboarding / Connection Flow.
'wcadmin_storeprofiler_create_jetpack_account', 'wcadmin_storeprofiler_connect_store', 'wcadmin_storeprofiler_login_jetpack_account', 'wcadmin_storeprofiler_payment_login', 'wcadmin_storeprofiler_payment_create_account',
// Checkout
'calypso_checkout_switch_to_p_24', 'calypso_checkout_composite_p24_submit_clicked',
// Launch Bar
'wpcom_launchbar_button_click',
// Request for free migration
'wpcom_support_free_migration_request_click'];
let _superProps; // Added to all Tracks events.
let _loadTracksResult = Promise.resolve(); // default value for non-BOM environments.

if (typeof document !== 'undefined') {
  _loadTracksResult = (0,_automattic_load_script__WEBPACK_IMPORTED_MODULE_1__/* .loadScript */ .k0)('//stats.wp.com/w.js?67');
}
function createRandomId(randomBytesLength = 9) {
  if (false) {}
  // 9 * 4/3 = 12
  // this is to avoid getting padding of a random byte string when it is base64 encoded
  let randomBytes;
  if (window.crypto && window.crypto.getRandomValues) {
    randomBytes = new Uint8Array(randomBytesLength);
    window.crypto.getRandomValues(randomBytes);
  } else {
    randomBytes = Array(randomBytesLength).fill(0).map(() => Math.floor(Math.random() * 256));
  }
  return window.btoa(String.fromCharCode(...randomBytes));
}
function getUrlParameter(name) {
  if (false) {}
  name = name.replace(/[[]/g, '\\[').replace(/[\]]/g, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function checkForBlockedTracks() {
  // Proceed only after the tracks script load finished and failed.
  // Calling this function from `initialize` ensures current user is set.
  // This detects stats blocking, and identifies by `getCurrentUser()`, URL, or cookie.
  return _loadTracksResult.catch(() => {
    let _ut;
    let _ui;
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.ID) {
      _ut = 'wpcom:user_id';
      _ui = currentUser.ID;
    } else {
      _ut = getUrlParameter('_ut') || 'anon';
      _ui = getUrlParameter('_ui');
      if (!_ui) {
        const cookies = cookie.parse(document.cookie);
        if (cookies.tk_ai) {
          _ui = cookies.tk_ai;
        } else {
          const randomIdLength = 18; // 18 * 4/3 = 24 (base64 encoded chars).
          _ui = createRandomId(randomIdLength);
          document.cookie = cookie.serialize('tk_ai', _ui);
        }
      }
    }
    debug('Loading /nostats.js', {
      _ut,
      _ui
    });
    return loadScript('/nostats.js?_ut=' + encodeURIComponent(_ut) + '&_ui=' + encodeURIComponent(_ui));
  });
}

/**
 * Returns a promise that marks whether and when the external Tracks script loads.
 */
function getTracksLoadPromise() {
  return _loadTracksResult;
}
function pushEventToTracksQueue(args) {
  if (true) {
    window._tkq = window._tkq || [];
    window._tkq.push(args);
  }
}
const analyticsEvents = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();

/**
 * Returns the anoymous id stored in the `tk_ai` cookie
 * @returns The Tracks anonymous user id
 */
function getTracksAnonymousUserId() {
  const cookies = cookie.parse(document.cookie);
  return cookies.tk_ai;
}
function initializeAnalytics(currentUser, superProps) {
  // Update super props.
  if ('function' === typeof superProps) {
    debug('superProps', superProps);
    _superProps = superProps;
  }

  // Identify current user.
  if ('object' === typeof currentUser) {
    debug('identifyUser', currentUser);
    identifyUser(currentUser);
  }
  const tracksLinkerId = getUrlParameter('_tkl');
  if (tracksLinkerId && tracksLinkerId !== getTracksAnonymousUserId()) {
    // Link tk_ai anonymous ids if _tkl parameter is present in URL and ids between pages are different (e.g. cross-domain)
    signalUserFromAnotherProduct(tracksLinkerId, 'anon');
  }

  // Tracks blocked?
  debug('checkForBlockedTracks');
  return checkForBlockedTracks();
}
function identifyUser(userData) {
  // Ensure object.
  if ('object' !== typeof userData) {
    debug('Invalid userData.', userData);
    return; // Not possible.
  }

  // Set current user.
  const currentUser = setCurrentUser(userData);
  if (!currentUser) {
    debug('Insufficient userData.', userData);
    return; // Not possible.
  }

  // Tracks user identification.
  debug('Tracks identifyUser.', currentUser);
  pushEventToTracksQueue(['identifyUser', currentUser.ID, currentUser.username]);
}

/**
 * For tracking users between our products, generally passing the id via a request parameter.
 *
 * Use 'anon' for userIdType for anonymous users.
 */
function signalUserFromAnotherProduct(userId, userIdType) {
  debug('Tracks signalUserFromAnotherProduct.', userId, userIdType);
  pushEventToTracksQueue(['signalAliasUserGeneral', userId, userIdType]);
}
function recordTracksEvent(eventName, eventProperties) {
  eventProperties = eventProperties || {};
  const trackingPrefs = (0,_utils_get_tracking_prefs__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Ay)();
  if (!trackingPrefs?.buckets.analytics) {
    (0,_utils_debug__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)('Analytics has been disabled - Ignoring event "%s" with actual props %o', eventName, eventProperties);
    return;
  }
  if (false) {}
  (0,_utils_debug__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)('Record event "%s" called with props %o', eventName, eventProperties);
  if (!eventName.startsWith('calypso_') && !eventName.startsWith('jetpack_') && !eventName.startsWith('wpcom_dsp_widget_') && !EVENT_NAME_EXCEPTIONS.includes(eventName)) {
    (0,_utils_debug__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)('- Event name must be prefixed by "calypso_", "jetpack_", or added to `EVENT_NAME_EXCEPTIONS`');
    return;
  }
  if (_superProps) {
    const superProperties = _superProps(eventProperties);
    eventProperties = {
      ...eventProperties,
      ...superProperties
    }; // assign to a new object so we don't modify the argument
  }

  // Remove properties that have an undefined value
  // This allows a caller to easily remove properties from the recorded set by setting them to undefined
  eventProperties = Object.fromEntries(Object.entries(eventProperties).filter(([, val]) => typeof val !== 'undefined'));
  (0,_utils_debug__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)('Recording event "%s" with actual props %o', eventName, eventProperties);
  pushEventToTracksQueue(['recordEvent', eventName, eventProperties]);
  analyticsEvents.emit('record-event', eventName, eventProperties);
}
function recordTracksPageView(urlPath, params) {
  debug('Recording pageview in tracks.', urlPath, params);
  let eventProperties = {
    do_not_track: getDoNotTrack() ? 1 : 0,
    path: urlPath
  };

  // Add calypso build timestamp if set
  const build_timestamp =  true && window.BUILD_TIMESTAMP;
  if (build_timestamp) {
    eventProperties = Object.assign(eventProperties, {
      build_timestamp
    });
  }

  // add optional path params
  if (params) {
    eventProperties = Object.assign(eventProperties, params);
  }

  // Record some query parameters as event properties on the page view event
  // so we can analyze their performance with our analytics tools
  if ( true && window.location) {
    const urlParams = new URL(window.location.href).searchParams;

    // Record all `utm` marketing params.
    const utmParamEntries = urlParams && Array.from(urlParams.entries()).filter(([key]) => key.startsWith('utm_'));
    const utmParams = utmParamEntries ? Object.fromEntries(utmParamEntries) : {};

    // Record the 'ref' param.
    const refParam = urlParams && urlParams.get('ref') ? {
      ref: urlParams.get('ref')
    } : {};
    eventProperties = Object.assign(eventProperties, {
      ...utmParams,
      ...refParam
    });
  }
  recordTracksEvent('calypso_page_view', eventProperties);
}
function recordTracksPageViewWithPageParams(urlPath, params) {
  const pageViewParams = getPageViewParams(urlPath);
  recordTracksPageView(urlPath, Object.assign(params || {}, pageViewParams));
}
function getGenericSuperPropsGetter(config) {
  return () => {
    const superProps = {
      environment: "production",
      environment_id: config('env_id'),
      site_id_label: 'wpcom',
      client: config('client_slug')
    };
    if (true) {
      Object.assign(superProps, {
        vph: window.innerHeight,
        vpw: window.innerWidth
      });
    }
    return superProps;
  };
}

/***/ }),

/***/ 7067:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports recordTrainTracksRender, recordTrainTracksInteract, getNewRailcarId */
/* harmony import */ var _tracks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4342);


function recordTrainTracksRender({
  railcarId,
  uiAlgo,
  uiPosition,
  fetchAlgo,
  fetchPosition,
  query,
  result,
  recBlogId,
  recPostId,
  recFeedId,
  recFeedItemId
}) {
  const props = {};

  // Remap and filter undefined props
  Object.entries({
    railcar: railcarId,
    ui_algo: uiAlgo,
    ui_position: uiPosition,
    fetch_algo: fetchAlgo,
    fetch_query: query,
    fetch_position: fetchPosition,
    rec_result: result,
    rec_blog_id: recBlogId,
    rec_post_id: recPostId,
    rec_feed_id: recFeedId,
    rec_feed_item_id: recFeedItemId
  }).forEach(([key, val]) => val !== undefined && (props[key] = val));
  recordTracksEvent('calypso_traintracks_render', props);
}
function recordTrainTracksInteract({
  railcarId,
  action
}) {
  recordTracksEvent('calypso_traintracks_interact', {
    railcar: railcarId,
    action
  });
}
function getNewRailcarId(suffix = 'recommendation') {
  return `${uuid().replace(/-/g, '')}-${suffix}`;
}

/***/ }),

/***/ 1379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports getCurrentUser, setCurrentUser */
/* harmony import */ var _hash_pii__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7523);


/**
 * Module variables
 */
let _currentUser;
/**
 * Gets current user.
 * @returns Current user.
 */
function getCurrentUser() {
  return _currentUser;
}

/**
 * Sets current user, (stored in javascript memory).
 * @param currentUser the user data for the current user
 * @returns Current user.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setCurrentUser(currentUser) {
  if (!currentUser.ID || isNaN(parseInt(currentUser.ID, 10)) || !currentUser.username || !currentUser.email) {
    return; // Invalid user data.
  }
  _currentUser = {
    ID: parseInt(currentUser.ID, 10),
    username: currentUser.username,
    email: currentUser.email,
    hashedPii: {
      ID: hashPii(currentUser.ID),
      username: hashPii(currentUser.username.toLowerCase().replace(/\s/g, '')),
      email: hashPii(currentUser.email.toLowerCase().replace(/\s/g, ''))
    }
  };
  return _currentUser;
}

/***/ }),

/***/ 2193:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2090);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Module variables
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debug__WEBPACK_IMPORTED_MODULE_0___default()('calypso:analytics'));

/***/ }),

/***/ 595:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export default */
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2193);


/**
 * Whether Do Not Track is enabled in the user's browser.
 * @returns true if Do Not Track is enabled in the user's browser.
 */
function getDoNotTrack() {
  const result = Boolean( true && (
  // Internet Explorer 11 uses window.doNotTrack rather than navigator.doNotTrack.
  // Safari 7.1.3+ uses window.doNotTrack rather than navigator.doNotTrack.
  // MDN ref: https://developer.mozilla.org/en-US/docs/Web/API/navigator/doNotTrack#Browser_compatibility
  window.doNotTrack === '1' || window.navigator && window.navigator.doNotTrack === '1'));
  debug(`Do Not Track: ${result}`);
  return result;
}

/***/ }),

/***/ 2189:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ getTrackingPrefs)
/* harmony export */ });
/* unused harmony exports TRACKING_PREFS_COOKIE_V1, TRACKING_PREFS_COOKIE_V2, parseTrackingPrefs */
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3284);
/* harmony import */ var _is_country_in_gdpr_zone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6472);
/* harmony import */ var _is_region_in_ccpa_zone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(750);



const TRACKING_PREFS_COOKIE_V1 = 'sensitive_pixel_option';
const TRACKING_PREFS_COOKIE_V2 = 'sensitive_pixel_options';
const prefsDisallowAll = {
  ok: false,
  buckets: {
    essential: true,
    // essential bucket is always allowed
    analytics: false,
    advertising: false
  }
};
const prefsAllowAnalyticsGdpr = {
  ok: false,
  // false is important so the cookie banner is shown
  buckets: {
    essential: true,
    analytics: true,
    // in GDPR zone, analytics is opt-out
    advertising: false // in GDPR zone, advertising is opt-in
  }
};
const prefsAllowAll = {
  ok: true,
  buckets: {
    essential: true,
    analytics: true,
    advertising: true
  }
};
const parseTrackingPrefs = (cookieV2, cookieV1, defaultPrefs = prefsDisallowAll) => {
  const {
    ok,
    buckets
  } = cookieV2 ? JSON.parse(cookieV2) : {};
  if (typeof ok === 'boolean') {
    return {
      ok,
      buckets: {
        ...defaultPrefs.buckets,
        ...buckets
      }
    };
  } else if (cookieV1 && ['yes', 'no'].includes(cookieV1)) {
    return {
      ok: cookieV1 === 'yes',
      buckets: prefsAllowAll.buckets
    };
  }
  return defaultPrefs;
};

/**
 * Returns consents for every Cookie Jar bucket based on privacy driven approach
 *
 * WARNING: this function is meant to work on the client side. If not called
 *          from the client side then it defaults to allow all
 * @returns Whether we may track the current user
 */
function getTrackingPrefs() {
  if (typeof document === 'undefined') {
    //throw new Error( 'getTrackingPrefs() can only be called on the client side' );
    return prefsAllowAll;
  }
  const cookies = cookie__WEBPACK_IMPORTED_MODULE_0__.parse(document.cookie);
  const isCountryGdpr = (0,_is_country_in_gdpr_zone__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(cookies.country_code);
  const isCountryCcpa = (0,_is_region_in_ccpa_zone__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(cookies.country_code, cookies.region);
  if (!isCountryGdpr && !isCountryCcpa) {
    return prefsAllowAll;
  }

  // default tracking mechanism for GDPR is opt-in for marketing and opt-out for anaytics, for CCPA is opt-out:
  const defaultPrefs = isCountryGdpr ? prefsAllowAnalyticsGdpr : prefsAllowAll;
  const {
    ok,
    buckets
  } = parseTrackingPrefs(cookies[TRACKING_PREFS_COOKIE_V2], cookies[TRACKING_PREFS_COOKIE_V1], defaultPrefs);
  if (isCountryCcpa) {
    // For CCPA, only the advertising bucket is relevant, the rest are always true
    return {
      ok,
      buckets: {
        ...prefsAllowAll.buckets,
        advertising: buckets.advertising
      }
    };
  }

  // For CCPA, only the advertising bucket is relevant, the rest are always true
  return {
    ok,
    buckets
  };
}

/***/ }),

/***/ 7523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export default */
/* harmony import */ var hash_js_lib_hash_sha_256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(536);
/* harmony import */ var hash_js_lib_hash_sha_256__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hash_js_lib_hash_sha_256__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Hashes users' Personally Identifiable Information using SHA256
 * @param data Data to be hashed
 * @returns SHA256 in hex string format
 */
function hashPii(data) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sha256().update(data.toString()).digest('hex');
}

/***/ }),

/***/ 6472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ isCountryInGdprZone)
/* harmony export */ });
const GDPR_COUNTRIES = [
// European Member countries
'AT',
// Austria
'BE',
// Belgium
'BG',
// Bulgaria
'CY',
// Cyprus
'CZ',
// Czech Republic
'DE',
// Germany
'DK',
// Denmark
'EE',
// Estonia
'ES',
// Spain
'FI',
// Finland
'FR',
// France
'GR',
// Greece
'HR',
// Croatia
'HU',
// Hungary
'IE',
// Ireland
'IT',
// Italy
'LT',
// Lithuania
'LU',
// Luxembourg
'LV',
// Latvia
'MT',
// Malta
'NL',
// Netherlands
'PL',
// Poland
'PT',
// Portugal
'RO',
// Romania
'SE',
// Sweden
'SI',
// Slovenia
'SK',
// Slovakia
'GB',
// United Kingdom
// Single Market Countries that GDPR applies to
'CH',
// Switzerland
'IS',
// Iceland
'LI',
// Liechtenstein
'NO' // Norway
];

/**
 * Returns a boolean telling whether a country is in the GDPR zone.
 * @param countryCode The country code to look for.
 * @returns Whether the country is in the GDPR zone
 */
function isCountryInGdprZone(countryCode) {
  if ('unknown' === countryCode) {
    // Fail safe: if we don't know the countryCode, assume it's in the Gdpr zone.
    return true;
  }
  return countryCode !== undefined && GDPR_COUNTRIES.includes(countryCode);
}

/***/ }),

/***/ 750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ isRegionInCcpaZone)
/* harmony export */ });
const CCPA_US_REGIONS = ['california',
// CA
'colorado',
// CO
'connecticut',
// CT
'utah',
// UT
'virginia',
// VA
'texas',
// TX
'tennessee',
// TN
'oregon',
// OR
'new jersey',
// NJ
'montana',
// MT
'iowa',
// IA
'indiana',
// IN
'delaware' // DE
];

/**
 * Returns a boolean telling whether a region is in the CCPA zone.
 * @param countryCode The country code to check (it needs to be 'US' for CCPA to apply)
 * @param region The region to look for.
 * @returns Whether the region is in the GDPR zone
 */
function isRegionInCcpaZone(countryCode, region) {
  if ('US' !== countryCode) {
    return false;
  }
  if ('unknown' === region) {
    // Fail safe: if we don't know the region, assume it's in the CCPA zone.
    return true;
  }
  return region !== undefined && CCPA_US_REGIONS.includes(region.toLowerCase());
}

/***/ }),

/***/ 8739:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony export default */
const STS_US_REGIONS = (/* unused pure expression or super */ null && (['california',
// CA
'florida',
// FL
'maryland',
// MD
'massachusetts',
// MA
'new hampshire',
// NH
'nevada',
// NV
'pennsylvania',
// PA
'washington' // WA
]));

/**
 * Returns a boolean telling whether a region is in an STS (session tracking sensitive) zone.
 * @param countryCode The country code to check (it needs to be 'US' for STS to apply)
 * @param region The region to look for.
 * @returns Whether the region is in the STS zone
 */

function isRegionInStsZone(countryCode, region) {
  if ('US' !== countryCode) {
    return false;
  }
  if ('unknown' === region) {
    // If we don't know the region, assume it's not in an STS zone.
    return true;
  }
  return region !== undefined && STS_US_REGIONS.includes(region.toLowerCase());
}

/***/ }),

/***/ 4121:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3284);
/* harmony import */ var _get_tracking_prefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2189);


const COOKIE_MAX_AGE = (/* unused pure expression or super */ null && (60 * 60 * 24 * (365.25 / 2))); /* six months; 365.25 -> avg days in year */

const setTrackingPrefs = newPrefs => {
  const {
    ok,
    buckets
  } = getTrackingPrefs();
  const newOptions = {
    ok: typeof newPrefs.ok === 'boolean' ? newPrefs.ok : ok,
    buckets: {
      ...buckets,
      ...newPrefs.buckets
    }
  };
  document.cookie = cookie.serialize(TRACKING_PREFS_COOKIE_V2, JSON.stringify(newOptions), {
    path: '/',
    maxAge: COOKIE_MAX_AGE
  });
  return newOptions;
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (setTrackingPrefs)));

/***/ }),

/***/ 2207:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4357);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6764);





const isAnchor = props => !!props.href;
const cleanAnchorProps = ({
  type,
  borderless,
  busy,
  className,
  compact,
  primary,
  scary,
  plain,
  transparent,
  ...anchorProps
}) => anchorProps;
const cleanButtonProps = ({
  type = 'button',
  borderless,
  busy,
  className,
  compact,
  primary,
  scary,
  plain,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Clean incorrect usage of the component
  rel,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Clean incorrect usage of the component
  href,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Clean incorrect usage of the component
  target,
  transparent,
  ...buttonProps
}) => ({
  ...buttonProps,
  type
});
const Button = (props, ref) => {
  const classes = props.plain ? (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)('button-plain', props.className) : (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)('button', props.className, {
    'is-compact': props.compact,
    'is-primary': props.primary,
    'is-scary': props.scary,
    'is-busy': props.busy,
    'is-borderless': props.borderless,
    'is-transparent': props.transparent
  });
  if (isAnchor(props)) {
    const anchorProps = cleanAnchorProps(props);
    // block referrers when external link
    const rel = anchorProps.target ? (anchorProps.rel || '').replace(/noopener|noreferrer/g, '') + ' noopener noreferrer' : anchorProps.rel;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({}, anchorProps, {
      rel: rel,
      className: classes,
      ref: ref
    }));
  }
  const buttonProps = cleanButtonProps(props);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({}, buttonProps, {
    className: classes,
    ref: ref
  }));
};
/**
 * @deprecated This button has been deprecated in favor of the `Button` component from `@wordpress/components`.
 * Please use the `Button` component from `@wordpress/components` instead. This button has aggressive and generic CSS that breaks many other buttons when imported.
 */
const ButtonWithForwardedRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(Button);
ButtonWithForwardedRef.defaultProps = {
  type: 'button'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonWithForwardedRef);

/***/ }),

/***/ 1720:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4357);
/* harmony import */ var i18n_calypso__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9944);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6025);






const FormLabel = ({
  children,
  required,
  optional,
  className,
  // Via LabelProps
  ...labelProps
}) => {
  const translate = (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)();
  const hasChildren = react__WEBPACK_IMPORTED_MODULE_1__.Children.count(children) > 0;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({}, labelProps, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(className, 'form-label')
  }), children, hasChildren && required && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
    className: "form-label__required"
  }, translate('Required')), hasChildren && optional && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
    className: "form-label__optional"
  }, translate('Optional')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormLabel);

/***/ }),

/***/ 743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4357);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8468);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5888);


const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;



const PaginationControl = ({
  activePageIndex,
  numberOfPages,
  onChange,
  classNames,
  children
}) => {
  const classes = (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)('pagination-control', classNames);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: classes,
    "aria-label": __('Pagination control')
  }, (0,lodash__WEBPACK_IMPORTED_MODULE_2__.times)(numberOfPages, index => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: `${numberOfPages}-${index}`,
    "aria-current": index === activePageIndex ? 'page' : undefined
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)('pagination-control__page', {
      'is-current': index === activePageIndex
    }),
    disabled: index === activePageIndex,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: 1: current page number 2: total number of pages */
    __('Page %1$d of %2$d'), index + 1, numberOfPages),
    onClick: () => onChange(index)
  }))), children && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "pagination-control__last-item"
  }, children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaginationControl);

/***/ }),

/***/ 8883:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _default_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5118);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(_default_i18n__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A));

/***/ }),

/***/ 5118:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2434);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A());

/***/ }),

/***/ 2434:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_interpolate_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2540);
/* harmony import */ var _tannin_sprintf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7315);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2090);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hash_js_lib_hash_sha_1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2986);
/* harmony import */ var hash_js_lib_hash_sha_1__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hash_js_lib_hash_sha_1__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lru__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2327);
/* harmony import */ var lru__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lru__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tannin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2714);
/* harmony import */ var _number_format__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4015);









/**
 * Module variables
 */
const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('i18n-calypso');

/**
 * Constants
 */
const decimal_point_translation_key = 'number_format_decimals';
const thousands_sep_translation_key = 'number_format_thousands_sep';
const domain_key = 'messages';
const translationLookup = [
// By default don't modify the options when looking up translations.
function (options) {
  return options;
}];
const hashCache = {};

// raise a console warning
function warn() {
  if (!I18N.throwErrors) {
    return;
  }
  if ( true && window.console && window.console.warn) {
    window.console.warn.apply(window.console, arguments);
  }
}

// turns Function.arguments into an array
function simpleArguments(args) {
  return Array.prototype.slice.call(args);
}

/**
 * Coerce the possible arguments and normalize to a single object.
 * @param   {any} args - arguments passed in from `translate()`
 * @returns {Object}         - a single object describing translation needs
 */
function normalizeTranslateArguments(args) {
  const original = args[0];

  // warn about older deprecated syntax
  if (typeof original !== 'string' || args.length > 3 || args.length > 2 && typeof args[1] === 'object' && typeof args[2] === 'object') {
    warn('Deprecated Invocation: `translate()` accepts ( string, [string], [object] ). These arguments passed:', simpleArguments(args), '. See https://github.com/Automattic/i18n-calypso#translate-method');
  }
  if (args.length === 2 && typeof original === 'string' && typeof args[1] === 'string') {
    warn('Invalid Invocation: `translate()` requires an options object for plural translations, but passed:', simpleArguments(args));
  }

  // options could be in position 0, 1, or 2
  // sending options as the first object is deprecated and will raise a warning
  let options = {};
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      options = args[i];
    }
  }

  // `original` can be passed as first parameter or as part of the options object
  // though passing original as part of the options is a deprecated approach and will be removed
  if (typeof original === 'string') {
    options.original = original;
  } else if (typeof options.original === 'object') {
    options.plural = options.original.plural;
    options.count = options.original.count;
    options.original = options.original.single;
  }
  if (typeof args[1] === 'string') {
    options.plural = args[1];
  }
  if (typeof options.original === 'undefined') {
    throw new Error('Translate called without a `string` value as first argument.');
  }
  return options;
}

/**
 * Takes translate options object and coerces to a Tannin request to retrieve translation.
 * @param   {Object} tannin  - tannin data object
 * @param   {Object} options - object describing translation
 * @returns {string}         - the returned translation from Tannin
 */
function getTranslationFromTannin(tannin, options) {
  return tannin.dcnpgettext(domain_key, options.context, options.original, options.plural, options.count);
}
function getTranslation(i18n, options) {
  for (let i = translationLookup.length - 1; i >= 0; i--) {
    const lookup = translationLookup[i](Object.assign({}, options));
    const key = lookup.context ? lookup.context + '\u0004' + lookup.original : lookup.original;

    // Only get the translation from tannin if it exists.
    if (i18n.state.locale[key]) {
      return getTranslationFromTannin(i18n.state.tannin, lookup);
    }
  }
  return null;
}
function I18N() {
  if (!(this instanceof I18N)) {
    return new I18N();
  }
  this.defaultLocaleSlug = 'en';
  // Tannin always needs a plural form definition, or it fails when dealing with plurals.
  this.defaultPluralForms = n => n === 1 ? 0 : 1;
  this.state = {
    numberFormatSettings: {},
    tannin: undefined,
    locale: undefined,
    localeSlug: undefined,
    localeVariant: undefined,
    textDirection: undefined,
    translations: lru__WEBPACK_IMPORTED_MODULE_3___default()({
      max: 100
    })
  };
  this.componentUpdateHooks = [];
  this.translateHooks = [];
  this.stateObserver = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  // Because the higher-order component can wrap a ton of React components,
  // we need to bump the number of listeners to infinity and beyond
  // FIXME: still valid?
  this.stateObserver.setMaxListeners(0);
  // default configuration
  this.configure();
}
I18N.throwErrors = false;
I18N.prototype.on = function (...args) {
  this.stateObserver.on(...args);
};
I18N.prototype.off = function (...args) {
  this.stateObserver.off(...args);
};
I18N.prototype.emit = function (...args) {
  this.stateObserver.emit(...args);
};

/**
 * Formats numbers using locale settings and/or passed options.
 * @param   {string|number}  number to format (required)
 * @param   {number | Object}  options  Number of decimal places or options object (optional)
 * @returns {string}         Formatted number as string
 */
I18N.prototype.numberFormat = function (number, options = {}) {
  const decimals = typeof options === 'number' ? options : options.decimals || 0;
  const decPoint = options.decPoint || this.state.numberFormatSettings.decimal_point || '.';
  const thousandsSep = options.thousandsSep || this.state.numberFormatSettings.thousands_sep || ',';
  return (0,_number_format__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(number, decimals, decPoint, thousandsSep);
};
I18N.prototype.configure = function (options) {
  Object.assign(this, options || {});
  this.setLocale();
};
I18N.prototype.setLocale = function (localeData) {
  if (localeData && localeData[''] && localeData['']['key-hash']) {
    const keyHash = localeData['']['key-hash'];
    const transform = function (string, hashLength) {
      const lookupPrefix = hashLength === false ? '' : String(hashLength);
      if (typeof hashCache[lookupPrefix + string] !== 'undefined') {
        return hashCache[lookupPrefix + string];
      }
      const hash = hash_js_lib_hash_sha_1__WEBPACK_IMPORTED_MODULE_2___default()().update(string).digest('hex');
      if (hashLength) {
        return hashCache[lookupPrefix + string] = hash.substr(0, hashLength);
      }
      return hashCache[lookupPrefix + string] = hash;
    };
    const generateLookup = function (hashLength) {
      return function (options) {
        if (options.context) {
          options.original = transform(options.context + String.fromCharCode(4) + options.original, hashLength);
          delete options.context;
        } else {
          options.original = transform(options.original, hashLength);
        }
        return options;
      };
    };
    if (keyHash.substr(0, 4) === 'sha1') {
      if (keyHash.length === 4) {
        translationLookup.push(generateLookup(false));
      } else {
        const variableHashLengthPos = keyHash.substr(5).indexOf('-');
        if (variableHashLengthPos < 0) {
          const hashLength = Number(keyHash.substr(5));
          translationLookup.push(generateLookup(hashLength));
        } else {
          const minHashLength = Number(keyHash.substr(5, variableHashLengthPos));
          const maxHashLength = Number(keyHash.substr(6 + variableHashLengthPos));
          for (let hashLength = minHashLength; hashLength <= maxHashLength; hashLength++) {
            translationLookup.push(generateLookup(hashLength));
          }
        }
      }
    }
  }

  // if localeData is not given, assumes default locale and reset
  if (!localeData || !localeData[''].localeSlug) {
    this.state.locale = {
      '': {
        localeSlug: this.defaultLocaleSlug,
        plural_forms: this.defaultPluralForms
      }
    };
  } else if (localeData[''].localeSlug === this.state.localeSlug) {
    // Exit if same data as current (comparing references only)
    if (localeData === this.state.locale) {
      return;
    }

    // merge new data into existing one
    Object.assign(this.state.locale, localeData);
  } else {
    this.state.locale = Object.assign({}, localeData);
  }
  this.state.localeSlug = this.state.locale[''].localeSlug;
  this.state.localeVariant = this.state.locale[''].localeVariant;

  // extract the `textDirection` info (LTR or RTL) from either:
  // - the translation for the special string "ltr" (standard in Core, not present in Calypso)
  // - or the `momentjs_locale.textDirection` property present in Calypso translation files
  this.state.textDirection = this.state.locale['text direction\u0004ltr']?.[0] || this.state.locale['']?.momentjs_locale?.textDirection;
  this.state.tannin = new tannin__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A({
    [domain_key]: this.state.locale
  });

  // Updates numberFormat preferences with settings from translations
  this.state.numberFormatSettings.decimal_point = getTranslationFromTannin(this.state.tannin, normalizeTranslateArguments([decimal_point_translation_key]));
  this.state.numberFormatSettings.thousands_sep = getTranslationFromTannin(this.state.tannin, normalizeTranslateArguments([thousands_sep_translation_key]));

  // If translation isn't set, define defaults.
  if (this.state.numberFormatSettings.decimal_point === decimal_point_translation_key) {
    this.state.numberFormatSettings.decimal_point = '.';
  }
  if (this.state.numberFormatSettings.thousands_sep === thousands_sep_translation_key) {
    this.state.numberFormatSettings.thousands_sep = ',';
  }
  this.stateObserver.emit('change');
};
I18N.prototype.getLocale = function () {
  return this.state.locale;
};

/**
 * Get the current locale slug.
 * @returns {string} The string representing the currently loaded locale
 */
I18N.prototype.getLocaleSlug = function () {
  return this.state.localeSlug;
};

/**
 * Get the current locale variant. That's set for some special locales that don't have a
 * standard ISO code, like `de_formal` or `sr_latin`.
 * @returns {string|undefined} The string representing the currently loaded locale's variant
 */
I18N.prototype.getLocaleVariant = function () {
  return this.state.localeVariant;
};

/**
 * Get the current text direction, left-to-right (LTR) or right-to-left (RTL).
 * @returns {boolean} `true` in case the current locale has RTL text direction
 */
I18N.prototype.isRtl = function () {
  return this.state.textDirection === 'rtl';
};

/**
 * Adds new translations to the locale data, overwriting any existing translations with a matching key.
 * @param {Object} localeData Locale data
 */
I18N.prototype.addTranslations = function (localeData) {
  for (const prop in localeData) {
    if (prop !== '') {
      this.state.tannin.data.messages[prop] = localeData[prop];
    }
  }
  this.stateObserver.emit('change');
};

/**
 * Checks whether the given original has a translation.
 * @returns {boolean} whether a translation exists
 */
I18N.prototype.hasTranslation = function () {
  return !!getTranslation(this, normalizeTranslateArguments(arguments));
};

/**
 * Exposes single translation method.
 * See sibling README
 * @returns {string | Object | undefined} translated text or an object containing React children that can be inserted into a parent component
 */
I18N.prototype.translate = function () {
  const options = normalizeTranslateArguments(arguments);
  let translation = getTranslation(this, options);
  if (!translation) {
    // This purposefully calls tannin for a case where there is no translation,
    // so that tannin gives us the expected object with English text.
    translation = getTranslationFromTannin(this.state.tannin, options);
  }

  // handle any string substitution
  if (options.args) {
    const sprintfArgs = Array.isArray(options.args) ? options.args.slice(0) : [options.args];
    sprintfArgs.unshift(translation);
    try {
      translation = (0,_tannin_sprintf__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(...sprintfArgs);
    } catch (error) {
      if (!window || !window.console) {
        return;
      }
      const errorMethod = this.throwErrors ? 'error' : 'warn';
      if (typeof error !== 'string') {
        window.console[errorMethod](error);
      } else {
        window.console[errorMethod]('i18n sprintf error:', sprintfArgs);
      }
    }
  }

  // interpolate any components
  if (options.components) {
    translation = (0,_automattic_interpolate_components__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)({
      mixedString: translation,
      components: options.components,
      throwErrors: this.throwErrors
    });
  }

  // run any necessary hooks
  this.translateHooks.forEach(function (hook) {
    translation = hook(translation, options);
  });
  return translation;
};

/**
 * Causes i18n to re-render all translations.
 *
 * This can be necessary if an extension makes changes that i18n is unaware of
 * and needs those changes manifested immediately (e.g. adding an important
 * translation hook, or modifying the behaviour of an existing hook).
 *
 * If at all possible, react components should try to use the more local
 * updateTranslation() function inherited from the mixin.
 */
I18N.prototype.reRenderTranslations = function () {
  debug('Re-rendering all translations due to external request');
  this.stateObserver.emit('change');
};
I18N.prototype.registerComponentUpdateHook = function (callback) {
  this.componentUpdateHooks.push(callback);
};
I18N.prototype.registerTranslateHook = function (callback) {
  this.translateHooks.push(callback);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (I18N);

/***/ }),

/***/ 4015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ number_format)
/* harmony export */ });
/*
 * Exposes number format capability
 *
 * @copyright Copyright (c) 2013 Kevin van Zonneveld (http://kvz.io) and Contributors (http://phpjs.org/authors).
 * @license See CREDITS.md
 * @see https://github.com/kvz/phpjs/blob/ffe1356af23a6f2512c84c954dd4e828e92579fa/functions/strings/number_format.js
 */
function toFixedFix(n, prec) {
  const k = Math.pow(10, prec);
  return '' + (Math.round(n * k) / k).toFixed(prec);
}
function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
  const dec = typeof dec_point === 'undefined' ? '.' : dec_point;
  let s = '';
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/***/ }),

/***/ 9944:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ useTranslate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8883);


function bindTranslate(i18n) {
  const translate = i18n.translate.bind(i18n);
  Object.defineProperty(translate, 'localeSlug', {
    get: i18n.getLocaleSlug.bind(i18n)
  });
  return translate;
}
function useTranslate() {
  const i18n = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A);
  const [counter, setCounter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onChange = () => setCounter(c => c + 1);
    i18n.on('change', onChange);
    return () => i18n.off('change', onChange);
  }, [i18n]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => bindTranslate(i18n, counter), [i18n, counter]);
}

/***/ }),

/***/ 6706:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YO: () => (/* binding */ LocaleProvider),
/* harmony export */   Ym: () => (/* binding */ useLocale),
/* harmony export */   t: () => (/* binding */ getWpI18nLocaleSlug)
/* harmony export */ });
/* unused harmony exports localeContext, withLocale, useIsEnglishLocale, useHasEnTranslation */
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9491);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);






const localeContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)(null);
const LocaleProvider = ({
  children,
  localeSlug
}) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(localeContext.Provider, {
  value: localeSlug
}, children);

/**
 * Returns locale slug
 * @param {string} locale locale to be converted e.g. "en_US".
 * @returns locale string e.g. "en"
 */
function mapWpI18nLangToLocaleSlug(locale = '') {
  if (!locale) {
    return '';
  }
  const TARGET_LOCALES = ['pt_br', 'pt-br', 'zh_tw', 'zh-tw', 'zh_cn', 'zh-cn', 'zh_sg', 'zh-sg'];
  const lowerCaseLocale = locale.toLowerCase();
  const formattedLocale = TARGET_LOCALES.includes(lowerCaseLocale) ? lowerCaseLocale.replace('_', '-') : lowerCaseLocale.replace(/([-_].*)$/i, '');
  return formattedLocale || 'en';
}

/**
 * Get the lang from the @wordpress/i18n locale data
 * @returns lang e.g. "en_US"
 */
function getWpI18nLocaleLang() {
  const localeData = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.getLocaleData() || {};
  return localeData['']?.lang || localeData['']?.language || '';
}

/**
 * Get the lang from the @wordpress/i18n locale data and map the value to the locale slug
 * @returns lang e.g. "en", "pt-br", "zh-tw"
 */
function getWpI18nLocaleSlug() {
  const language = getWpI18nLocaleLang();
  return mapWpI18nLangToLocaleSlug(language);
}

/**
 * React hook providing the current locale slug. If `<LocaleProvider>` hasn't
 * been defined in the component tree then it will fall back to using the
 * data from `@wordpress/i18n` to determine the current locale slug.
 * @example
 *
 * import { useLocale } from '@automattic/i18n-utils';
 * function MyComponent() {
 *   const locale = useLocale();
 *   return <div>The current locale is: { locale }</div>;
 * }
 */
function useLocale() {
  const fromProvider = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(localeContext);
  const providerHasLocale = !!fromProvider;
  const [fromWpI18n, setWpLocale] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(getWpI18nLocaleSlug());
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    // If the <LocaleProvider> has been used further up the component tree
    // then we don't want to subscribe to any defaultI18n changes.
    if (providerHasLocale) {
      return;
    }
    setWpLocale(getWpI18nLocaleSlug());
    return _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.subscribe(() => {
      setWpLocale(getWpI18nLocaleSlug());
    });
  }, [providerHasLocale]);
  return fromProvider || fromWpI18n ||  true && window._currentUserLocale || 'en';
}

/**
 * HoC providing the current locale slug supplied to `<LocaleProvider>`.
 * @param InnerComponent Component that will receive `locale` as a prop
 * @returns Component enhanced with locale
 * @example
 *
 * import { withLocale } from '@automattic/i18n-utils';
 * function MyComponent( { locale } ) {
 *   return <div>The current locale is: { locale }</div>;
 * }
 * export default withLocale( MyComponent );
 */
const withLocale = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(InnerComponent => {
  return props => {
    const locale = useLocale();
    const innerProps = {
      ...props,
      locale
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerComponent, innerProps);
  };
}, 'withLocale');

/**
 * React hook providing whether the current locale slug belongs to English or not
 * @example
 *
 * import { useIsEnglishLocale } from '@automattic/i18n-utils';
 * function MyComponent() {
 *   const isEnglishLocale = useIsEnglishLocale();
 *   return <div>The current locale is English: { isEnglishLocale }</div>;
 * }
 */
function useIsEnglishLocale() {
  const locale = useLocale();
  return englishLocales.includes(locale);
}
function useHasEnTranslation() {
  const isEnglishLocale = useIsEnglishLocale();
  return useCallback((...args) => isEnglishLocale || i18n.hasTranslation(...args), [isEnglishLocale]);
}

/***/ }),

/***/ 3903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $y: () => (/* binding */ i18nDefaultLocaleSlug),
/* harmony export */   BS: () => (/* binding */ forumLocales),
/* harmony export */   Cx: () => (/* binding */ localesWithGoBlog),
/* harmony export */   K8: () => (/* binding */ localesWithCookiePolicy),
/* harmony export */   S9: () => (/* binding */ localesWithPrivacyPolicy),
/* harmony export */   Sc: () => (/* binding */ localesWithBlog),
/* harmony export */   Sj: () => (/* binding */ localesToSubdomains),
/* harmony export */   Ws: () => (/* binding */ localesForPricePlans),
/* harmony export */   _J: () => (/* binding */ supportSiteLocales),
/* harmony export */   lW: () => (/* binding */ magnificentNonEnLocales),
/* harmony export */   mt: () => (/* binding */ localesWithLearn),
/* harmony export */   rh: () => (/* binding */ jetpackComLocales)
/* harmony export */ });
/* unused harmony exports englishLocales, livechatSupportLocales */
/**
 * The locale sets here map roughly to those found in locales.php
 *
 * todo: move these into @automattic/languages as another downloaded resource
 * todo: cleanup _shared.json - replace references to the below config options with imports from here
 */

const i18nDefaultLocaleSlug = 'en';
const localesWithBlog = ['en', 'ja', 'es', 'pt', 'fr', 'pt-br'];
const localesWithGoBlog = ['en', 'pt-br', 'de', 'es', 'fr', 'it'];
const localesWithPrivacyPolicy = ['en', 'fr', 'de', 'es'];
const localesWithCookiePolicy = ['en', 'fr', 'de', 'es'];
const localesWithLearn = ['en', 'es'];
const localesForPricePlans = ['ar', 'de', 'el', 'es', 'fr', 'he', 'id', 'it', 'ja', 'ko', 'nl', 'pt-br', 'ro', 'ru', 'sv', 'tr', 'zh-cn', 'zh-tw'];
const localesToSubdomains = {
  'pt-br': 'br',
  br: 'bre',
  zh: 'zh-cn',
  'zh-hk': 'zh-tw',
  'zh-sg': 'zh-cn',
  kr: 'ko'
};

// replaces config( 'english_locales' )
const englishLocales = (/* unused pure expression or super */ null && (['en', 'en-gb']));

// replaces config( 'livechat_support_locales' )
const livechatSupportLocales = (/* unused pure expression or super */ null && (['en']));

// replaces config( 'support_site_locales' )
const supportSiteLocales = ['ar', 'de', 'en', 'es', 'fr', 'he', 'id', 'it', 'ja', 'ko', 'nl', 'pt-br', 'ru', 'sv', 'tr', 'zh-cn', 'zh-tw'];

// replaces config( 'forum_locales')
const forumLocales = ['ar', 'de', 'el', 'en', 'es', 'fa', 'fi', 'fr', 'id', 'it', 'ja', 'nl', 'pt', 'pt-br', 'ru', 'sv', 'th', 'tl', 'tr'];

// replaces config( 'magnificent_non_en_locales')
const magnificentNonEnLocales = ['es', 'pt-br', 'de', 'fr', 'he', 'ja', 'it', 'nl', 'ru', 'tr', 'id', 'zh-cn', 'zh-tw', 'ko', 'ar', 'sv'];

// replaces config( 'jetpack_com_locales')
const jetpackComLocales = ['en', 'ar', 'de', 'es', 'fr', 'he', 'id', 'it', 'ja', 'ko', 'nl', 'pt-br', 'ro', 'ru', 'sv', 'tr', 'zh-cn', 'zh-tw'];

/***/ }),

/***/ 355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rm: () => (/* binding */ localizeUrl)
/* harmony export */ });
/* unused harmony exports urlLocalizationMapping, useLocalizeUrl, withLocalizeUrl */
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9491);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _locale_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6706);
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3903);





const INVALID_URL = `http://__domain__.invalid`;
function getDefaultLocale() {
  return (0,_locale_context__WEBPACK_IMPORTED_MODULE_3__/* .getWpI18nLocaleSlug */ .t)() ?? 'en';
}
const setLocalizedUrlHost = (hostname, validLocales = []) => (url, locale) => {
  if (validLocales.includes(locale) && locale !== 'en') {
    // Avoid changing the hostname when the locale is set via the path.
    if (url.pathname.substr(0, locale.length + 2) !== '/' + locale + '/') {
      url.host = `${_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesToSubdomains */ .Sj[locale] || locale}.${hostname}`;
    }
  }
  return url;
};
const setLocalizedWpComPath = (prefix, validLocales = [], limitPathMatch = null) => (url, localeSlug) => {
  url.host = 'wordpress.com';
  if (typeof limitPathMatch === 'object' && limitPathMatch instanceof RegExp && !limitPathMatch.test(url.pathname)) {
    validLocales = []; // only rewrite to English.
  }
  url.pathname = prefix + url.pathname;
  if (validLocales.includes(localeSlug) && localeSlug !== 'en') {
    url.pathname = localeSlug + url.pathname;
  }
  return url;
};
const prefixOrSuffixLocalizedUrlPath = (validLocales = [], limitPathMatch = null, prefixOrSuffix) => (url, localeSlug) => {
  if (typeof limitPathMatch === 'object' && limitPathMatch instanceof RegExp) {
    if (!limitPathMatch.test(url.pathname)) {
      return url; // No rewriting if not matches the path.
    }
  }
  if (!validLocales.includes(localeSlug) || localeSlug === 'en') {
    return url;
  }
  if (prefixOrSuffix === 'prefix') {
    url.pathname = localeSlug + url.pathname;
  } else if (prefixOrSuffix === 'suffix') {
    // Make sure there's a slash between the path and the locale. Plus, if
    // the path has a trailing slash, add one after the suffix too.
    if (url.pathname.endsWith('/')) {
      url.pathname += localeSlug + '/';
    } else {
      url.pathname += '/' + localeSlug;
    }
  }
  return url;
};
const prefixLocalizedUrlPath = (validLocales = [], limitPathMatch = null) => (url, localeSlug) => {
  return prefixOrSuffixLocalizedUrlPath(validLocales, limitPathMatch, 'prefix')(url, localeSlug);
};
const suffixLocalizedUrlPath = (validLocales = [], limitPathMatch = null) => (url, localeSlug) => {
  return prefixOrSuffixLocalizedUrlPath(validLocales, limitPathMatch, 'suffix')(url, localeSlug);
};
const urlLocalizationMapping = {
  'wordpress.com/support/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .supportSiteLocales */ ._J),
  'wordpress.com/forums/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .forumLocales */ .BS),
  'wordpress.com/blog/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithBlog */ .Sc, /^\/blog\/?$/),
  'wordpress.com/go/': (url, localeSlug) => {
    // Rewrite non-home URLs (e.g. posts) only for Spanish, because that's
    // the only language into which we're currently translating content.
    const isHome = ['/go/', '/go'].includes(url.pathname);
    if (!isHome && 'es' !== localeSlug) {
      return url;
    }
    return prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithGoBlog */ .Cx)(url, localeSlug);
  },
  'wordpress.com/pricing/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesForPricePlans */ .Ws),
  'wordpress.com/tos/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'wordpress.com/wp-admin/': setLocalizedUrlHost('wordpress.com', _locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'wordpress.com/wp-login.php': setLocalizedUrlHost('wordpress.com', _locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'jetpack.com': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .jetpackComLocales */ .rh),
  'cloud.jetpack.com': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .jetpackComLocales */ .rh),
  'en.support.wordpress.com': setLocalizedWpComPath('/support', _locales__WEBPACK_IMPORTED_MODULE_4__/* .supportSiteLocales */ ._J),
  'en.blog.wordpress.com': setLocalizedWpComPath('/blog', _locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithBlog */ .Sc, /^\/$/),
  'apps.wordpress.com': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW),
  'en.forums.wordpress.com': setLocalizedWpComPath('/forums', _locales__WEBPACK_IMPORTED_MODULE_4__/* .forumLocales */ .BS),
  'automattic.com/privacy/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithPrivacyPolicy */ .S9),
  'automattic.com/cookies/': prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithCookiePolicy */ .K8),
  'wordpress.com/help/contact/': (url, localeSlug, isLoggedIn) => {
    if (isLoggedIn) {
      return url;
    }
    url.pathname = url.pathname.replace(/\/help\//, '/support/');
    return prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .supportSiteLocales */ ._J)(url, localeSlug);
  },
  'wordpress.com': (url, localeSlug) => {
    // Don't rewrite checkout and me URLs.
    if (/^\/(checkout|me)(\/|$)/.test(url.pathname)) {
      return url;
    }
    // Don't rewrite Calypso URLs that have the URL at the end.
    if (/\/([a-z0-9-]+\.)+[a-z]{2,}\/?$/.test(url.pathname)) {
      return url;
    }
    return prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/theme/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/themes/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/plugins/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/log-in/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/start/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  },
  'wordpress.com/learn/': (url, localeSlug) => {
    const webinars = url.pathname.includes('/learn/webinars/');
    if (webinars && 'es' === localeSlug) {
      url.pathname = url.pathname.replace('/learn/webinars/', '/learn/es/webinars/');
      return url;
    }
    return suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesWithLearn */ .mt)(url, localeSlug);
  },
  'wordpress.com/plans/': (url, localeSlug, isLoggedIn) => {
    // if logged in, or url.pathname contains characters after `/plans/`, don't rewrite
    return isLoggedIn || url.pathname !== '/plans/' ? url : prefixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .localesForPricePlans */ .Ws)(url, localeSlug);
  },
  'wordpress.com/setup/': (url, localeSlug, isLoggedIn) => {
    return isLoggedIn ? url : suffixLocalizedUrlPath(_locales__WEBPACK_IMPORTED_MODULE_4__/* .magnificentNonEnLocales */ .lW)(url, localeSlug);
  }
};
function hasTrailingSlash(urlString) {
  try {
    const url = new URL(String(urlString), INVALID_URL);
    return url.pathname.endsWith('/');
  } catch (e) {
    return false;
  }
}
function localizeUrl(fullUrl, locale = getDefaultLocale(), isLoggedIn = true, preserveTrailingSlashVariation = false) {
  let url;
  try {
    url = new URL(String(fullUrl), INVALID_URL);
  } catch (e) {
    return fullUrl;
  }

  // Ignore and passthrough /relative/urls that have no host specified
  if (url.origin === INVALID_URL) {
    return fullUrl;
  }

  // Let's unify the URL.
  url.protocol = 'https:';
  if (!url.pathname.endsWith('.php')) {
    // Essentially a trailingslashit.
    // We need to do this because the matching list is standardised to use
    // trailing slashes everywhere.
    // However, if the `preserveTrailingSlashVariation` option is enabled, we
    // remove the trailing slash at the end again, when appropriate.
    url.pathname = (url.pathname + '/').replace(/\/+$/, '/');
  }
  const firstPathSegment = url.pathname.substr(0, 1 + url.pathname.indexOf('/', 1));
  if ('en.wordpress.com' === url.host) {
    url.host = 'wordpress.com';
  }
  if ('/' + locale + '/' === firstPathSegment) {
    return fullUrl;
  }

  // Lookup is checked back to front.
  const lookup = [url.host, url.host + firstPathSegment, url.host + url.pathname];
  for (let i = lookup.length - 1; i >= 0; i--) {
    if (lookup[i] in urlLocalizationMapping) {
      const mapped = urlLocalizationMapping[lookup[i]](url, locale, isLoggedIn).href;
      if (!preserveTrailingSlashVariation) {
        return mapped;
      }
      try {
        const mappedUrl = new URL(mapped);
        if (!hasTrailingSlash(fullUrl)) {
          mappedUrl.pathname = mappedUrl.pathname.replace(/\/+$/, '');
        }
        return mappedUrl.href;
      } catch {
        return mapped;
      }
    }
  }

  // Nothing needed to be changed, just return it unmodified.
  return fullUrl;
}
function useLocalizeUrl() {
  const providerLocale = (0,_locale_context__WEBPACK_IMPORTED_MODULE_3__/* .useLocale */ .Ym)();
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((fullUrl, locale, isLoggedIn, preserveTrailingSlashVariation) => {
    if (locale) {
      return localizeUrl(fullUrl, locale, isLoggedIn, preserveTrailingSlashVariation);
    }
    return localizeUrl(fullUrl, providerLocale, isLoggedIn, preserveTrailingSlashVariation);
  }, [providerLocale]);
}
const withLocalizeUrl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(InnerComponent => {
  return props => {
    const localizeUrl = useLocalizeUrl();
    const innerProps = {
      ...props,
      localizeUrl
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerComponent, innerProps);
  };
}, 'withLocalizeUrl');

/***/ }),

/***/ 2540:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ interpolate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tokenize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3935);


function getCloseIndex(openIndex, tokens) {
  const openToken = tokens[openIndex];
  let nestLevel = 0;
  for (let i = openIndex + 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.value === openToken.value) {
      if (token.type === 'componentOpen') {
        nestLevel++;
        continue;
      }
      if (token.type === 'componentClose') {
        if (nestLevel === 0) {
          return i;
        }
        nestLevel--;
      }
    }
  }
  // if we get this far, there was no matching close token
  throw new Error('Missing closing component token `' + openToken.value + '`');
}
function buildChildren(tokens, components) {
  let children = [];
  let openComponent;
  let openIndex;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'string') {
      children.push(token.value);
      continue;
    }
    // component node should at least be set
    if (components[token.value] === undefined) {
      throw new Error(`Invalid interpolation, missing component node: \`${token.value}\``);
    }
    // should be either ReactElement or null (both type "object"), all other types deprecated
    if (typeof components[token.value] !== 'object') {
      throw new Error(`Invalid interpolation, component node must be a ReactElement or null: \`${token.value}\``);
    }
    // we should never see a componentClose token in this loop
    if (token.type === 'componentClose') {
      throw new Error(`Missing opening component token: \`${token.value}\``);
    }
    if (token.type === 'componentOpen') {
      openComponent = components[token.value];
      openIndex = i;
      break;
    }
    // componentSelfClosing token
    children.push(components[token.value]);
    continue;
  }
  if (openComponent) {
    const closeIndex = getCloseIndex(openIndex, tokens);
    const grandChildTokens = tokens.slice(openIndex + 1, closeIndex);
    const grandChildren = buildChildren(grandChildTokens, components);
    const clonedOpenComponent = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(openComponent, {}, grandChildren);
    children.push(clonedOpenComponent);
    if (closeIndex < tokens.length - 1) {
      const siblingTokens = tokens.slice(closeIndex + 1);
      const siblings = buildChildren(siblingTokens, components);
      children = children.concat(siblings);
    }
  }
  children = children.filter(Boolean);
  if (children.length === 0) {
    return null;
  }
  if (children.length === 1) {
    return children[0];
  }
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, ...children);
}
function interpolate(options) {
  const {
    mixedString,
    components,
    throwErrors
  } = options;
  if (!components) {
    return mixedString;
  }
  if (typeof components !== 'object') {
    if (throwErrors) {
      throw new Error(`Interpolation Error: unable to process \`${mixedString}\` because components is not an object`);
    }
    return mixedString;
  }
  const tokens = (0,_tokenize__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(mixedString);
  try {
    return buildChildren(tokens, components);
  } catch (error) {
    if (throwErrors) {
      throw new Error(`Interpolation Error: unable to process \`${mixedString}\` because of error \`${error.message}\``);
    }
    return mixedString;
  }
}

/***/ }),

/***/ 3935:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ tokenize)
/* harmony export */ });
function identifyToken(item) {
  // {{/example}}
  if (item.startsWith('{{/')) {
    return {
      type: 'componentClose',
      value: item.replace(/\W/g, '')
    };
  }
  // {{example /}}
  if (item.endsWith('/}}')) {
    return {
      type: 'componentSelfClosing',
      value: item.replace(/\W/g, '')
    };
  }
  // {{example}}
  if (item.startsWith('{{')) {
    return {
      type: 'componentOpen',
      value: item.replace(/\W/g, '')
    };
  }
  return {
    type: 'string',
    value: item
  };
}
function tokenize(mixedString) {
  const tokenStrings = mixedString.split(/(\{\{\/?\s*\w+\s*\/?\}\})/g); // split to components and strings
  return tokenStrings.map(identifyToken);
}

/***/ }),

/***/ 6772:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ko: () => (/* binding */ addScriptCallback),
/* harmony export */   VP: () => (/* binding */ isLoading),
/* harmony export */   lF: () => (/* binding */ handleRequestSuccess),
/* harmony export */   ss: () => (/* binding */ handleRequestError)
/* harmony export */ });
/* unused harmony exports getCallbacksMap, removeScriptCallback, removeScriptCallbacks, removeAllScriptCallbacks, executeCallbacks */
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2090);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

const debug = debug__WEBPACK_IMPORTED_MODULE_0___default()('lib/load-script/callback-handler');

/**
 * Module variables
 */
const callbacksForURLsInProgress = new Map();
function getCallbacksMap() {
  return callbacksForURLsInProgress;
}
function isLoading(url) {
  return getCallbacksMap().has(url);
}
function addScriptCallback(url, callback) {
  const callbacksMap = getCallbacksMap();
  if (isLoading(url)) {
    debug(`Adding a callback for an existing script from "${url}"`);
    callbacksMap.get(url).add(callback);
  } else {
    debug(`Adding a callback for a new script from "${url}"`);
    callbacksMap.set(url, new Set([callback]));
  }
}
function removeScriptCallback(url, callback) {
  debug(`Removing a known callback for a script from "${url}"`);
  if (!isLoading(url)) {
    return;
  }
  const callbacksMap = getCallbacksMap();
  const callbacksAtUrl = callbacksMap.get(url);
  callbacksAtUrl.delete(callback);
  if (callbacksAtUrl.size === 0) {
    callbacksMap.delete(url);
  }
}
function removeScriptCallbacks(url) {
  debug(`Removing all callbacks for a script from "${url}"`);
  getCallbacksMap().delete(url);
}
function removeAllScriptCallbacks() {
  debug('Removing all callbacks for scripts from all URLs');
  getCallbacksMap().clear();
}
function executeCallbacks(url, error = null) {
  const callbacksMap = getCallbacksMap();
  const callbacksForUrl = callbacksMap.get(url);
  if (callbacksForUrl) {
    const debugMessage = `Executing callbacks for "${url}"` + (error === null ? ' with success' : ` with error "${error}"`);
    debug(debugMessage);
    callbacksForUrl.forEach(cb => {
      if (typeof cb === 'function') {
        cb(error);
      }
    });
    callbacksMap.delete(url);
  }
}
function handleRequestSuccess() {
  const url = this.getAttribute('src');
  debug(`Handling successful request for "${url}"`);
  executeCallbacks(url);
  this.onload = null;
}
function handleRequestError() {
  const url = this.getAttribute('src');
  debug(`Handling failed request for "${url}"`);
  executeCallbacks(url, new Error(`Failed to load script "${url}"`));
  this.onerror = null;
}

/***/ }),

/***/ 371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ attachToHead),
/* harmony export */   u: () => (/* binding */ createScriptElement)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2090);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _callback_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6772);


const debug = debug__WEBPACK_IMPORTED_MODULE_0___default()('lib/load-script/dom-operations');
function createScriptElement(url, args) {
  debug(`Creating script element for "${url}"`);
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.onload = _callback_handler__WEBPACK_IMPORTED_MODULE_1__/* .handleRequestSuccess */ .lF;
  script.onerror = _callback_handler__WEBPACK_IMPORTED_MODULE_1__/* .handleRequestError */ .ss;
  script.async = true;
  if (args) {
    Object.entries(args).forEach(([key, value]) => script[key] = value);
  }
  return script;
}
function attachToHead(element) {
  debug('Attaching element to head');
  document.head.appendChild(element);
}

/***/ }),

/***/ 7944:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k0: () => (/* binding */ loadScript)
/* harmony export */ });
/* unused harmony exports JQUERY_URL, loadjQueryDependentScript */
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2090);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _callback_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6772);
/* harmony import */ var _dom_operations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(371);
/**
 * A little module for loading a external script
 *
 */




const debug = debug__WEBPACK_IMPORTED_MODULE_0___default()('package/load-script');

// NOTE: This exists for compatibility.


/**
 * Module variables
 */
const JQUERY_URL = 'https://s0.wp.com/wp-includes/js/jquery/jquery.js';

//
// loadScript and loadjQueryDependentScript
//

function loadScript(url, callback, args) {
  // If this script is not currently being loaded, create a script element and attach to document head.
  const shouldLoadScript = !(0,_callback_handler__WEBPACK_IMPORTED_MODULE_1__/* .isLoading */ .VP)(url);
  if (shouldLoadScript) {
    // the onload/onerror callbacks are guaranteed to be called asynchronously, so it's ok to first
    // add the element and only then attach callbacks, as long as it happens in one event loop tick.
    (0,_dom_operations__WEBPACK_IMPORTED_MODULE_2__/* .attachToHead */ .H)((0,_dom_operations__WEBPACK_IMPORTED_MODULE_2__/* .createScriptElement */ .u)(url, args));
  }

  // if callback is provided, behave traditionally
  if (typeof callback === 'function') {
    (0,_callback_handler__WEBPACK_IMPORTED_MODULE_1__/* .addScriptCallback */ .Ko)(url, callback);
    return;
  }

  // but if not, return a Promise
  return new Promise((resolve, reject) => {
    (0,_callback_handler__WEBPACK_IMPORTED_MODULE_1__/* .addScriptCallback */ .Ko)(url, error => {
      if (error === null) {
        resolve();
      } else {
        reject(error);
      }
    });
  });
}
function loadjQueryDependentScript(url, callback, args) {
  debug(`Loading a jQuery dependent script from "${url}"`);
  if (window.jQuery) {
    debug(`jQuery found on window, skipping jQuery script loading for "${url}"`);
    return loadScript(url, callback, args);
  }
  const loadPromise = loadScript(JQUERY_URL).then(() => loadScript(url, callback, args));

  // if callback is provided, call it on resolution
  if (typeof callback === 'function') {
    loadPromise.then(() => callback(null), error => callback(error));
    return;
  }

  // if not, return the Promise
  return loadPromise;
}

/***/ }),

/***/ 4949:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JV: () => (/* binding */ DESIGN_FIRST_FLOW),
/* harmony export */   Xf: () => (/* binding */ START_WRITING_FLOW)
/* harmony export */ });
/* unused harmony exports ACCOUNT_FLOW, AI_ASSEMBLER_FLOW, NEWSLETTER_FLOW, NEWSLETTER_POST_SETUP_FLOW, HOSTING_LP_FLOW, NEW_HOSTED_SITE_FLOW, NEW_HOSTED_SITE_FLOW_USER_INCLUDED, TRANSFERRING_HOSTED_SITE_FLOW, LINK_IN_BIO_FLOW, LINK_IN_BIO_TLD_FLOW, LINK_IN_BIO_POST_SETUP_FLOW, CONNECT_DOMAIN_FLOW, VIDEOPRESS_FLOW, VIDEOPRESS_ACCOUNT, VIDEOPRESS_TV_FLOW, VIDEOPRESS_TV_PURCHASE_FLOW, IMPORT_FOCUSED_FLOW, IMPORT_HOSTED_SITE_FLOW, SENSEI_FLOW, ECOMMERCE_FLOW, ENTREPRENEUR_FLOW, WOOEXPRESS_FLOW, FREE_FLOW, FREE_POST_SETUP_FLOW, MIGRATION_FLOW, SITE_MIGRATION_FLOW, MIGRATION_SIGNUP_FLOW, HOSTED_SITE_MIGRATION_FLOW, COPY_SITE_FLOW, BUILD_FLOW, WRITE_FLOW, SITE_SETUP_FLOW, WITH_THEME_FLOW, WITH_THEME_ASSEMBLER_FLOW, ASSEMBLER_FIRST_FLOW, READYMADE_TEMPLATE_FLOW, UPDATE_DESIGN_FLOW, DOMAIN_UPSELL_FLOW, DOMAIN_TRANSFER, GOOGLE_TRANSFER, HUNDRED_YEAR_PLAN_FLOW, REBLOGGING_FLOW, DOMAIN_FOR_GRAVATAR_FLOW, ONBOARDING_FLOW, ONBOARDING_GUIDED_FLOW, EMAIL_SUBSCRIPTION_FLOW, isLinkInBioFlow, isNewsletterFlow, isFreeFlow, isNewsletterOrLinkInBioFlow, isTailoredSignupFlow, isEntrepreneurSignupFlow, isHostingSignupFlow, isNewHostedSiteCreationFlow, isTransferringHostedSiteCreationFlow, isAnyHostingFlow, isAnyMigrationFlow, isMigrationFlow, isCopySiteFlow, isEntrepreneurFlow, isWooExpressFlow, isNewSiteMigrationFlow, isMigrationSignupFlow, isHostedSiteMigrationFlow, isBuildFlow, isWriteFlow, isUpdateDesignFlow, isStartWritingFlow, isDesignFirstFlow, isBlogOnboardingFlow, isOnboardingGuidedFlow, isDomainUpsellFlow, isSiteAssemblerFlow, isReadymadeFlow, isWithThemeAssemblerFlow, isWithThemeFlow, isSiteSetupFlow, isSenseiFlow, ecommerceFlowRecurTypes, isVideoPressFlow, isVideoPressTVFlow, isDomainForGravatarFlow */
const ACCOUNT_FLOW = 'account';
const AI_ASSEMBLER_FLOW = 'ai-assembler';
const NEWSLETTER_FLOW = 'newsletter';
const NEWSLETTER_POST_SETUP_FLOW = 'newsletter-post-setup';
const HOSTING_LP_FLOW = 'hosting-start';
const NEW_HOSTED_SITE_FLOW = 'new-hosted-site';
const NEW_HOSTED_SITE_FLOW_USER_INCLUDED = 'new-hosted-site-user-included';
const TRANSFERRING_HOSTED_SITE_FLOW = 'transferring-hosted-site';
const LINK_IN_BIO_FLOW = 'link-in-bio';
const LINK_IN_BIO_TLD_FLOW = 'link-in-bio-tld';
const LINK_IN_BIO_POST_SETUP_FLOW = 'link-in-bio-post-setup';
const CONNECT_DOMAIN_FLOW = 'connect-domain';
const VIDEOPRESS_FLOW = 'videopress';
const VIDEOPRESS_ACCOUNT = 'videopress-account';
const VIDEOPRESS_TV_FLOW = 'videopress-tv';
const VIDEOPRESS_TV_PURCHASE_FLOW = 'videopress-tv-purchase';
const IMPORT_FOCUSED_FLOW = 'import-focused';
const IMPORT_HOSTED_SITE_FLOW = 'import-hosted-site';
const SENSEI_FLOW = 'sensei';
const ECOMMERCE_FLOW = 'ecommerce';
const ENTREPRENEUR_FLOW = 'entrepreneur';
const WOOEXPRESS_FLOW = 'wooexpress';
const FREE_FLOW = 'free';
const FREE_POST_SETUP_FLOW = 'free-post-setup';
const MIGRATION_FLOW = 'import-focused';
const SITE_MIGRATION_FLOW = 'site-migration';
const MIGRATION_SIGNUP_FLOW = 'migration-signup';
const HOSTED_SITE_MIGRATION_FLOW = 'hosted-site-migration';
const COPY_SITE_FLOW = 'copy-site';
const BUILD_FLOW = 'build';
const WRITE_FLOW = 'write';
const START_WRITING_FLOW = 'start-writing';
const DESIGN_FIRST_FLOW = 'design-first';
const SITE_SETUP_FLOW = 'site-setup';
const WITH_THEME_FLOW = 'with-theme';
const WITH_THEME_ASSEMBLER_FLOW = 'with-theme-assembler';
const ASSEMBLER_FIRST_FLOW = 'assembler-first';
const READYMADE_TEMPLATE_FLOW = 'readymade-template';
const UPDATE_DESIGN_FLOW = 'update-design';
const DOMAIN_UPSELL_FLOW = 'domain-upsell';
const DOMAIN_TRANSFER = 'domain-transfer';
const GOOGLE_TRANSFER = 'google-transfer';
const HUNDRED_YEAR_PLAN_FLOW = 'hundred-year-plan';
const REBLOGGING_FLOW = 'reblogging';
const DOMAIN_FOR_GRAVATAR_FLOW = 'domain-for-gravatar';
const ONBOARDING_FLOW = 'onboarding';
const ONBOARDING_GUIDED_FLOW = 'onboarding';
const EMAIL_SUBSCRIPTION_FLOW = 'email-subscription';
const isLinkInBioFlow = flowName => {
  return Boolean(flowName && [LINK_IN_BIO_FLOW, LINK_IN_BIO_TLD_FLOW, LINK_IN_BIO_POST_SETUP_FLOW].includes(flowName));
};
const isNewsletterFlow = flowName => {
  return Boolean(flowName && [NEWSLETTER_FLOW, NEWSLETTER_POST_SETUP_FLOW].includes(flowName));
};
const isFreeFlow = flowName => {
  return Boolean(flowName && [FREE_FLOW, FREE_POST_SETUP_FLOW].includes(flowName));
};
const isNewsletterOrLinkInBioFlow = flowName => {
  return Boolean(flowName && [NEWSLETTER_FLOW, NEWSLETTER_POST_SETUP_FLOW, LINK_IN_BIO_FLOW, LINK_IN_BIO_TLD_FLOW, LINK_IN_BIO_POST_SETUP_FLOW].includes(flowName));
};
const isTailoredSignupFlow = flowName => {
  return Boolean(flowName && (isNewsletterOrLinkInBioFlow(flowName) || VIDEOPRESS_FLOW === flowName || VIDEOPRESS_TV_FLOW === flowName || VIDEOPRESS_TV_PURCHASE_FLOW === flowName || ECOMMERCE_FLOW === flowName || FREE_FLOW === flowName));
};
const isEntrepreneurSignupFlow = flowName => {
  return Boolean(flowName && ENTREPRENEUR_FLOW === flowName);
};
const isHostingSignupFlow = flowName => {
  return Boolean(flowName && HOSTING_LP_FLOW === flowName);
};
const isNewHostedSiteCreationFlow = flowName => {
  return Boolean(flowName && NEW_HOSTED_SITE_FLOW === flowName);
};
const isTransferringHostedSiteCreationFlow = flowName => {
  return Boolean(flowName && TRANSFERRING_HOSTED_SITE_FLOW === flowName);
};
const isAnyHostingFlow = flowName => {
  return Boolean(flowName && [HOSTING_LP_FLOW, NEW_HOSTED_SITE_FLOW, TRANSFERRING_HOSTED_SITE_FLOW].includes(flowName));
};
const isAnyMigrationFlow = flowName => {
  return Boolean(flowName && [MIGRATION_FLOW, IMPORT_FOCUSED_FLOW, IMPORT_HOSTED_SITE_FLOW].includes(flowName));
};
const isMigrationFlow = flowName => {
  return Boolean(flowName && [MIGRATION_FLOW].includes(flowName));
};
const isCopySiteFlow = flowName => {
  return Boolean(flowName && [COPY_SITE_FLOW].includes(flowName));
};
const isEntrepreneurFlow = flowName => {
  return Boolean(flowName && [ENTREPRENEUR_FLOW].includes(flowName));
};
const isWooExpressFlow = flowName => {
  return Boolean(flowName && [WOOEXPRESS_FLOW].includes(flowName));
};
const isNewSiteMigrationFlow = flowName => {
  return Boolean(flowName && [SITE_MIGRATION_FLOW].includes(flowName));
};
const isMigrationSignupFlow = flowName => {
  return Boolean(flowName && [MIGRATION_SIGNUP_FLOW].includes(flowName));
};
const isHostedSiteMigrationFlow = flowName => {
  return Boolean(flowName && [HOSTED_SITE_MIGRATION_FLOW].includes(flowName));
};
const isBuildFlow = flowName => {
  return Boolean(flowName && [BUILD_FLOW].includes(flowName));
};
const isWriteFlow = flowName => {
  return Boolean(flowName && [WRITE_FLOW].includes(flowName));
};
const isUpdateDesignFlow = flowName => {
  return Boolean(flowName && [UPDATE_DESIGN_FLOW].includes(flowName));
};
const isStartWritingFlow = flowName => {
  return Boolean(flowName && [START_WRITING_FLOW].includes(flowName));
};
const isDesignFirstFlow = flowName => {
  return Boolean(flowName && [DESIGN_FIRST_FLOW].includes(flowName));
};
const isBlogOnboardingFlow = flowName => {
  return Boolean(flowName && [START_WRITING_FLOW, DESIGN_FIRST_FLOW].includes(flowName));
};
const isOnboardingGuidedFlow = flowName => {
  return Boolean(flowName && [ONBOARDING_GUIDED_FLOW].includes(flowName));
};
const isDomainUpsellFlow = flowName => {
  return Boolean(flowName && [DOMAIN_UPSELL_FLOW].includes(flowName));
};
const isSiteAssemblerFlow = flowName => {
  const SITE_ASSEMBLER_FLOWS = [WITH_THEME_ASSEMBLER_FLOW, AI_ASSEMBLER_FLOW, ASSEMBLER_FIRST_FLOW];
  return !!flowName && SITE_ASSEMBLER_FLOWS.includes(flowName);
};
const isReadymadeFlow = flowName => flowName === READYMADE_TEMPLATE_FLOW;
const isWithThemeAssemblerFlow = flowName => {
  return !!flowName && WITH_THEME_ASSEMBLER_FLOW === flowName;
};
const isWithThemeFlow = flowName => {
  const WITH_THEME_FLOWS = [WITH_THEME_FLOW, WITH_THEME_ASSEMBLER_FLOW];
  return !!flowName && WITH_THEME_FLOWS.includes(flowName);
};
const isSiteSetupFlow = flowName => {
  return !!flowName && SITE_SETUP_FLOW === flowName;
};
const isSenseiFlow = flowName => {
  return Boolean(flowName && SENSEI_FLOW === flowName);
};
const ecommerceFlowRecurTypes = {
  YEARLY: 'yearly',
  MONTHLY: 'monthly',
  '2Y': '2Y',
  '3Y': '3Y'
};
const isVideoPressFlow = flowName => {
  return !!flowName && [VIDEOPRESS_FLOW, VIDEOPRESS_ACCOUNT].includes(flowName);
};
const isVideoPressTVFlow = flowName => {
  return Boolean(flowName && [VIDEOPRESS_TV_FLOW, VIDEOPRESS_TV_PURCHASE_FLOW].includes(flowName));
};
const isDomainForGravatarFlow = flowName => {
  return Boolean(flowName && [DOMAIN_FOR_GRAVATAR_FLOW].includes(flowName));
};

/***/ }),

/***/ 6506:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_use_focus_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3851);
/* harmony import */ var _hooks_use_focus_trap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4248);
/* harmony import */ var _hooks_use_keydown_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(256);

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */



const KeyboardNavigation = ({
  onMinimize,
  onDismiss,
  onNextStepProgression,
  onPreviousStepProgression,
  tourContainerRef,
  isMinimized
}) => {
  function ExpandedTourNav() {
    (0,_hooks_use_keydown_handler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)({
      onEscape: onMinimize,
      onArrowRight: onNextStepProgression,
      onArrowLeft: onPreviousStepProgression
    });
    (0,_hooks_use_focus_trap__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(tourContainerRef);
    return null;
  }
  function MinimizedTourNav() {
    (0,_hooks_use_keydown_handler__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)({
      onEscape: onDismiss('esc-key-minimized')
    });
    return null;
  }
  const isTourFocused = (0,_hooks_use_focus_handler__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(tourContainerRef);
  if (!isTourFocused) {
    return null;
  }
  return isMinimized ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MinimizedTourNav, null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ExpandedTourNav, null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KeyboardNavigation);

/***/ }),

/***/ 1377:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   h: () => (/* binding */ useTourKitContext)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const TourKitContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
const TourKitContextProvider = ({
  config,
  children
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TourKitContext.Provider, {
    value: {
      config
    }
  }, children);
};
const useTourKitContext = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(TourKitContext);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourKitContextProvider);

/***/ }),

/***/ 7459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_viewport_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4638);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4357);
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4803);
/* harmony import */ var _hooks_use_step_tracking__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6962);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1441);
/* harmony import */ var _utils_live_resize_modifier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4096);
/* harmony import */ var _keyboard_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6506);
/* harmony import */ var _tour_kit_minimized__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5708);
/* harmony import */ var _tour_kit_overlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2336);
/* harmony import */ var _tour_kit_spotlight__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3388);
/* harmony import */ var _tour_kit_step__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(160);


/**
 * External Dependencies
 */




/**
 * Internal Dependencies
 */








const handleCallback = (currentStepIndex, callback) => {
  typeof callback === 'function' && callback(currentStepIndex);
};
const TourKitFrame = ({
  config
}) => {
  const [currentStepIndex, setCurrentStepIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [initialFocusedElement, setInitialFocusedElement] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isMinimized, setIsMinimized] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(config.isMinimized ?? false);
  const [popperElement, setPopperElement] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [tourReady, setTourReady] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const tourContainerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const isMobile = (0,_automattic_viewport_react__WEBPACK_IMPORTED_MODULE_1__/* .useMobileBreakpoint */ .lC)();
  const lastStepIndex = config.steps.length - 1;
  const referenceElements = config.steps[currentStepIndex].referenceElements;
  const referenceElementSelector = referenceElements?.[isMobile ? 'mobile' : 'desktop'] || referenceElements?.desktop;
  const referenceElement = referenceElementSelector ? document.querySelector(referenceElementSelector) : null;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (config.isMinimized) {
      setIsMinimized(true);
    }
  }, [config.isMinimized]);
  const showArrowIndicator = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (config.options?.effects?.arrowIndicator === false) {
      return false;
    }
    return !!(referenceElement && !isMinimized && tourReady);
  }, [config.options?.effects?.arrowIndicator, isMinimized, referenceElement, tourReady]);
  const showSpotlight = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!config.options?.effects?.spotlight) {
      return false;
    }
    return !isMinimized;
  }, [config.options?.effects?.spotlight, isMinimized]);
  const showOverlay = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (showSpotlight() || !config.options?.effects?.overlay) {
      return false;
    }
    return !isMinimized;
  }, [config.options?.effects?.overlay, isMinimized, showSpotlight]);
  const handleDismiss = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(source => {
    return () => {
      config.closeHandler(config.steps, currentStepIndex, source);
    };
  }, [config, currentStepIndex]);
  const handleNextStepProgression = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    let newStepIndex = currentStepIndex;
    if (lastStepIndex > currentStepIndex) {
      newStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(newStepIndex);
    }
    handleCallback(newStepIndex, config.options?.callbacks?.onNextStep);
  }, [config.options?.callbacks?.onNextStep, currentStepIndex, lastStepIndex]);
  const handlePreviousStepProgression = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    let newStepIndex = currentStepIndex;
    if (currentStepIndex > 0) {
      newStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(newStepIndex);
    }
    handleCallback(newStepIndex, config.options?.callbacks?.onPreviousStep);
  }, [config.options?.callbacks?.onPreviousStep, currentStepIndex]);
  const handleGoToStep = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(stepIndex => {
    setCurrentStepIndex(stepIndex);
    handleCallback(stepIndex, config.options?.callbacks?.onGoToStep);
  }, [config.options?.callbacks?.onGoToStep, currentStepIndex]);
  const handleMinimize = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsMinimized(true);
    handleCallback(currentStepIndex, config.options?.callbacks?.onMinimize);
  }, [config.options?.callbacks?.onMinimize, currentStepIndex]);
  const handleMaximize = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsMinimized(false);
    handleCallback(currentStepIndex, config.options?.callbacks?.onMaximize);
  }, [config.options?.callbacks?.onMaximize, currentStepIndex]);
  const {
    styles: popperStyles,
    attributes: popperAttributes,
    update: popperUpdate
  } = (0,react_popper__WEBPACK_IMPORTED_MODULE_2__/* .usePopper */ .E)(referenceElement, popperElement, {
    strategy: 'fixed',
    placement: config?.placement ?? 'bottom',
    modifiers: [{
      name: 'preventOverflow',
      options: {
        rootBoundary: 'document',
        padding: 16 // same as the left/margin of the tour frame
      }
    }, {
      name: 'arrow',
      options: {
        padding: 12
      }
    }, {
      name: 'offset',
      options: {
        offset: [0, showArrowIndicator() ? 12 : 10]
      }
    }, {
      name: 'flip',
      options: {
        fallbackPlacements: ['top', 'left', 'right']
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (0,_utils_live_resize_modifier__WEBPACK_IMPORTED_MODULE_3__/* .liveResizeModifier */ .Y)(config.options?.effects?.liveResize), [config.options?.effects?.liveResize]), ...(config.options?.popperModifiers || [])]
  });
  const stepRepositionProps = !isMinimized && referenceElement && tourReady ? {
    style: popperStyles?.popper,
    ...popperAttributes?.popper
  } : null;
  const arrowPositionProps = !isMinimized && referenceElement && tourReady ? {
    style: popperStyles?.arrow,
    ...popperAttributes?.arrow
  } : null;

  /*
   * Focus first interactive element when step renders.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTimeout(() => initialFocusedElement?.focus());
  }, [initialFocusedElement]);

  /*
   * Fixes issue with Popper misplacing the instance on mount
   * See: https://stackoverflow.com/questions/65585859/react-popper-incorrect-position-on-mount
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // If no reference element to position step near
    if (!referenceElement) {
      setTourReady(true);
      return;
    }
    setTourReady(false);
    if (popperUpdate) {
      popperUpdate().then(() => setTourReady(true)).catch(() => setTourReady(true));
    }
  }, [popperUpdate, referenceElement]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (referenceElement && config.options?.effects?.autoScroll) {
      referenceElement.scrollIntoView(config.options.effects.autoScroll);
    }
  }, [config.options?.effects?.autoScroll, referenceElement]);
  const classes = (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)('tour-kit-frame', isMobile ? 'is-mobile' : 'is-desktop', {
    'is-visible': tourReady
  }, (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .classParser */ .e)(config.options?.classNames));
  (0,_hooks_use_step_tracking__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(currentStepIndex, config.options?.callbacks?.onStepViewOnce);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (config.options?.callbacks?.onStepView) {
      handleCallback(currentStepIndex, config.options?.callbacks?.onStepView);
    }
  }, [config.options?.callbacks?.onStepView, currentStepIndex]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_keyboard_navigation__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
    onMinimize: handleMinimize,
    onDismiss: handleDismiss,
    onNextStepProgression: handleNextStepProgression,
    onPreviousStepProgression: handlePreviousStepProgression,
    tourContainerRef: tourContainerRef,
    isMinimized: isMinimized
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classes,
    ref: tourContainerRef
  }, showOverlay() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_overlay__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
    visible: true
  }), showSpotlight() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_spotlight__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)({
    referenceElement: referenceElement,
    liveResize: config.options?.effects?.liveResize || {}
  }, config.options?.effects?.spotlight || {})), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)({
    className: "tour-kit-frame__container",
    ref: setPopperElement
  }, stepRepositionProps), showArrowIndicator() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)({
    className: "tour-kit-frame__arrow",
    "data-popper-arrow": true
  }, arrowPositionProps)), !isMinimized ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_step__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
    config: config,
    steps: config.steps,
    currentStepIndex: currentStepIndex,
    onMinimize: handleMinimize,
    onDismiss: handleDismiss,
    onNextStep: handleNextStepProgression,
    onPreviousStep: handlePreviousStepProgression,
    onGoToStep: handleGoToStep,
    setInitialFocusedElement: setInitialFocusedElement
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_minimized__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
    config: config,
    steps: config.steps,
    currentStepIndex: currentStepIndex,
    onMaximize: handleMaximize,
    onDismiss: handleDismiss
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourKitFrame);

/***/ }),

/***/ 5708:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Internal Dependencies
 */

const TourKitMinimized = ({
  config,
  steps,
  currentStepIndex,
  onMaximize,
  onDismiss
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tour-kit-minimized"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(config.renderers.tourMinimized, {
    steps: steps,
    currentStepIndex: currentStepIndex,
    onMaximize: onMaximize,
    onDismiss: onDismiss
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourKitMinimized);

/***/ }),

/***/ 2336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4357);

/**
 * External Dependencies
 */

const TourKitOverlay = ({
  visible
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)('tour-kit-overlay', {
      'is-visible': visible
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourKitOverlay);

/***/ }),

/***/ 3274:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ SpotlightInteractivity)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tour_kit_spotlight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3388);


const SpotlightInteractivity = ({
  enabled = false,
  rootElementSelector = '#wpwrap'
}) => {
  if (!enabled) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
    .${_tour_kit_spotlight__WEBPACK_IMPORTED_MODULE_1__/* .SPOTLIT_ELEMENT_CLASS */ .E}, .${_tour_kit_spotlight__WEBPACK_IMPORTED_MODULE_1__/* .SPOTLIT_ELEMENT_CLASS */ .E} * {
        pointer-events: auto;
    }
    .tour-kit-frame__container button {
        pointer-events: auto;
    }
    .tour-kit-spotlight, .tour-kit-overlay {
        pointer-events: none;
    }
    ${rootElementSelector} :not(.${_tour_kit_spotlight__WEBPACK_IMPORTED_MODULE_1__/* .SPOTLIT_ELEMENT_CLASS */ .E}, .${_tour_kit_spotlight__WEBPACK_IMPORTED_MODULE_1__/* .SPOTLIT_ELEMENT_CLASS */ .E} *) {
        pointer-events: none;
    }
    `);
};

/***/ }),

/***/ 3388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   E: () => (/* binding */ SPOTLIT_ELEMENT_CLASS)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4357);
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4803);
/* harmony import */ var _utils_live_resize_modifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4096);
/* harmony import */ var _tour_kit_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2336);
/* harmony import */ var _tour_kit_spotlight_interactivity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3274);








const SPOTLIT_ELEMENT_CLASS = 'wp-tour-kit-spotlit';
const TourKitSpotlight = ({
  referenceElement,
  styles,
  interactivity,
  liveResize
}) => {
  const [popperElement, sePopperElement] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const referenceRect = referenceElement?.getBoundingClientRect();
  const modifiers = [{
    name: 'flip',
    enabled: false
  }, {
    name: 'preventOverflow',
    options: {
      mainAxis: false // true by default
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    name: 'offset',
    options: {
      offset: ({
        placement,
        reference,
        popper
      }) => {
        if (placement === 'bottom') {
          return [0, -(reference.height + (popper.height - reference.height) / 2)];
        }
        return [0, 0];
      }
    }
  }), []),
  // useMemo because https://popper.js.org/react-popper/v2/faq/#why-i-get-render-loop-whenever-i-put-a-function-inside-the-popper-configuration
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return (0,_utils_live_resize_modifier__WEBPACK_IMPORTED_MODULE_1__/* .liveResizeModifier */ .Y)(liveResize);
  }, [liveResize])];
  const {
    styles: popperStyles,
    attributes: popperAttributes
  } = (0,react_popper__WEBPACK_IMPORTED_MODULE_2__/* .usePopper */ .E)(referenceElement, popperElement, {
    strategy: 'fixed',
    placement: 'bottom',
    modifiers
  });
  const clipDimensions = referenceRect ? {
    width: `${referenceRect.width}px`,
    height: `${referenceRect.height}px`
  } : null;
  const clipRepositionProps = referenceElement ? {
    style: {
      ...(clipDimensions && clipDimensions),
      ...popperStyles?.popper,
      ...(styles && styles)
    },
    ...popperAttributes?.popper
  } : null;

  /**
   * Add a .wp-spotlit class to the referenced element so that we can
   * apply CSS styles to it, for whatever purposes such as interactivity
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    referenceElement?.classList.add(SPOTLIT_ELEMENT_CLASS);
    return () => {
      referenceElement?.classList.remove(SPOTLIT_ELEMENT_CLASS);
    };
  }, [referenceElement]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_spotlight_interactivity__WEBPACK_IMPORTED_MODULE_3__/* .SpotlightInteractivity */ .q, interactivity), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_overlay__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
    visible: !clipRepositionProps
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)({
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)('tour-kit-spotlight', {
      'is-visible': !!clipRepositionProps
    }),
    ref: sePopperElement
  }, clipRepositionProps)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourKitSpotlight);

/***/ }),

/***/ 160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_viewport_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4638);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4357);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1441);

/**
 * External Dependencies
 */


/**
 * Internal Dependencies
 */

const TourKitStep = ({
  config,
  steps,
  currentStepIndex,
  onMinimize,
  onDismiss,
  onNextStep,
  onPreviousStep,
  setInitialFocusedElement,
  onGoToStep
}) => {
  const isMobile = (0,_automattic_viewport_react__WEBPACK_IMPORTED_MODULE_1__/* .useMobileBreakpoint */ .lC)();
  const classes = (0,clsx__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)('tour-kit-step', `is-step-${currentStepIndex}`, (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .classParser */ .e)(config.steps[currentStepIndex].options?.classNames?.[isMobile ? 'mobile' : 'desktop']));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classes
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(config.renderers.tourStep, {
    steps: steps,
    currentStepIndex: currentStepIndex,
    onDismiss: onDismiss,
    onNextStep: onNextStep,
    onPreviousStep: onPreviousStep,
    onMinimize: onMinimize,
    setInitialFocusedElement: setInitialFocusedElement,
    onGoToStep: onGoToStep
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourKitStep);

/***/ }),

/***/ 7743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _error_boundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5544);
/* harmony import */ var _tour_kit_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1377);
/* harmony import */ var _tour_kit_frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7459);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1301);

// import { TourKitContextProvider } from './tour-kit-context';






const TourKit = ({
  config,
  __temp__className
}) => {
  const portalParent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(document.createElement('div')).current;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const classes = ['tour-kit', ...(__temp__className ? [__temp__className] : [])];
    portalParent.classList.add(...classes);
    const portalParentElement = config.options?.portalParentElement || document.body;
    portalParentElement.appendChild(portalParent);
    return () => {
      portalParentElement.removeChild(portalParent);
    };
  }, [__temp__className, portalParent, config.options?.portalParentElement]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_error_boundary__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_context__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
    config: config
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createPortal)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tour_kit_frame__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
    config: config
  }), portalParent))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourKit);

/***/ }),

/***/ 5544:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4586);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



class ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "state", {
      hasError: false
    });
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, "Something went wrong.");
    }
    return this.props.children;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ 3851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External Dependencies
 */


/**
 * A hook that returns true/false if ref node receives focus by either tabbing or clicking into any of its children.
 * @param ref React.MutableRefObject< null | HTMLElement >
 */
const useFocusHandler = ref => {
  const [hasFocus, setHasFocus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleFocus = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (document.hasFocus() && ref.current?.contains(document.activeElement)) {
      setHasFocus(true);
    } else {
      setHasFocus(false);
    }
  }, [ref]);
  const handleMousedown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(event => {
    if (ref.current?.contains(event.target)) {
      setHasFocus(true);
    } else {
      setHasFocus(false);
    }
  }, [ref]);
  const handleKeyup = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(event => {
    if (event.key === 'Tab') {
      if (ref.current?.contains(event.target)) {
        setHasFocus(true);
      } else {
        setHasFocus(false);
      }
    }
  }, [ref]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('mousedown', handleMousedown);
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('mousedown', handleMousedown);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, [ref, handleFocus, handleKeyup, handleMousedown]);
  return hasFocus;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useFocusHandler);

/***/ }),

/***/ 4248:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8107);
/* harmony import */ var _wordpress_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External Dependencies
 */


/**
 * A hook that constraints tabbing/focus on focuable elements in the given element ref.
 * @param ref React.MutableRefObject< null | HTMLElement >
 */
const useFocusTrap = ref => {
  const [firstFocusableElement, setFirstFocusableElement] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [lastFocusableElement, setLastFocusableElement] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const handleTrapFocus = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(event => {
    let handled = false;
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          handled = true;
        }
      } else if (document.activeElement === lastFocusableElement) {
        // Tab
        firstFocusableElement?.focus();
        handled = true;
      }
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [firstFocusableElement, lastFocusableElement]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const focusableElements = ref.current ? _wordpress_dom__WEBPACK_IMPORTED_MODULE_0__.focus.focusable.find(ref.current) : [];
    if (focusableElements && focusableElements.length) {
      setFirstFocusableElement(focusableElements[0]);
      setLastFocusableElement(focusableElements[focusableElements.length - 1]);
    }
    document.addEventListener('keydown', handleTrapFocus);
    return () => {
      document.removeEventListener('keydown', handleTrapFocus);
    };
  }, [ref, handleTrapFocus]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useFocusTrap);

/***/ }),

/***/ 256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable jsdoc/require-param */
/**
 * External Dependencies
 */

/**
 * A hook the applies the respective callbacks in response to keydown events.
 */
const useKeydownHandler = ({
  onEscape,
  onArrowRight,
  onArrowLeft
}) => {
  const handleKeydown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(event => {
    let handled = false;
    switch (event.key) {
      case 'Escape':
        onEscape && (onEscape(), handled = true);
        break;
      case 'ArrowRight':
        onArrowRight && (onArrowRight(), handled = true);
        break;
      case 'ArrowLeft':
        onArrowLeft && (onArrowLeft(), handled = true);
        break;
      default:
        break;
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [onEscape, onArrowRight, onArrowLeft]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useKeydownHandler);

/***/ }),

/***/ 6962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External Dependencies
 */

/**
 * Internal Dependencies
 */

const useStepTracking = (currentStepIndex, onStepViewOnce) => {
  const [stepsViewed, setStepsViewed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stepsViewed.includes(currentStepIndex)) {
      return;
    }
    setStepsViewed(prev => [...prev, currentStepIndex]);
    onStepViewOnce?.(currentStepIndex);
  }, [currentStepIndex, onStepViewOnce, stepsViewed]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStepTracking);

/***/ }),

/***/ 1441:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ debug),
/* harmony export */   e: () => (/* binding */ classParser)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2090);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Helper to convert CSV of `classes` to an array.
 * @param classes String or array of classes to format.
 * @returns Array of classes
 */
function classParser(classes) {
  if (classes?.length) {
    return classes.toString().split(',');
  }
  return null;
}
const debug = debug__WEBPACK_IMPORTED_MODULE_0___default()('tour-kit');

/***/ }),

/***/ 4096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ liveResizeModifier)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1441);


// Adds the resizeObserver and mutationObserver properties to the popper effect function argument

/**
 * Function that returns a Popper modifier that observes the specified root element as well as
 * reference element for any changes. The reason for being a currying function is so that
 * we can customise the root element selector, otherwise observing at a higher than necessary
 * level might cause unnecessary performance penalties.
 *
 * The Popper modifier queues an asynchronous update on the Popper instance whenever either of the
 * Observers trigger its callback.
 * @returns custom Popper modifier
 */
const liveResizeModifier = ({
  rootElementSelector,
  mutation = false,
  resize = false
} = {
  mutation: false,
  resize: false
}) => ({
  name: 'liveResizeModifier',
  enabled: true,
  phase: 'main',
  fn: () => {
    return;
  },
  effect: arg0 => {
    try {
      const {
        state,
        instance
      } = arg0; // augment types here because we are mutating the properties on the argument that is passed in

      const ObserversProp = Symbol(); // use a symbol here so that we don't clash with multiple poppers using this modifier on the same reference node
      const {
        reference
      } = state.elements;
      reference[ObserversProp] = {
        resizeObserver: new ResizeObserver(() => {
          instance.update();
        }),
        mutationObserver: new MutationObserver(() => {
          instance.update();
        })
      };
      if (resize) {
        if (reference instanceof Element) {
          reference[ObserversProp].resizeObserver.observe(reference);
        } else {
          (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .debug */ .Y)('Error: ResizeObserver does not work with virtual elements, Tour Kit will not resize automatically if the size of the referenced element changes.');
        }
      }
      if (mutation) {
        const rootElementNode = document.querySelector(rootElementSelector || '#wpwrap');
        if (rootElementNode instanceof Element) {
          reference[ObserversProp].mutationObserver.observe(rootElementNode, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true
          });
        } else {
          (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .debug */ .Y)(`Error: ${rootElementSelector} selector did not find a valid DOM element, Tour Kit will not update automatically if the DOM layout changes.`);
        }
      }
      return () => {
        reference[ObserversProp].resizeObserver.disconnect();
        reference[ObserversProp].mutationObserver.disconnect();
        delete reference[ObserversProp];
      };
    } catch (error) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .debug */ .Y)('Error: Tour Kit live resize modifier failed unexpectedly:', error);
    }
  }
});

/***/ }),

/***/ 9696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4446);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7898);
/* harmony import */ var _wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3634);
/* harmony import */ var _icons_maximize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9504);







const WpcomTourKitMinimized = ({
  steps,
  onMaximize,
  onDismiss,
  currentStepIndex
}) => {
  const {
    __
  } = (0,_wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_3__/* .useI18n */ .s9)();
  const lastStepIndex = steps.length - 1;
  const page = currentStepIndex + 1;
  const numberOfPages = lastStepIndex + 1;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    gap: 0,
    className: "wpcom-tour-kit-minimized"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: onMaximize,
    "aria-label": __('Resume Tour', "full-site-editing")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    gap: 13
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: 1: current page number, 2: total number of pages */
  __('Resume tour <span>(%1$d/%2$d)</span>', "full-site-editing"), page, numberOfPages), {
    span: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "wpcom-tour-kit-minimized__tour-index"
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
    icon: _icons_maximize__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
    size: 24
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: onDismiss('close-btn-minimized'),
    "aria-label": __('Close Tour', "full-site-editing")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
    size: 24
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomTourKitMinimized);

/***/ }),

/***/ 2120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3634);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4357);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1377);
/* harmony import */ var _icons_thumbs_down__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5010);
/* harmony import */ var _icons_thumbs_up__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5197);








const WpcomTourKitRating = () => {
  const [tempRating, setTempRating] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const context = (0,_index__WEBPACK_IMPORTED_MODULE_2__/* .useTourKitContext */ .h)();
  const config = context.config;
  const tourRating = config.options?.tourRating?.useTourRating?.() ?? tempRating;
  const {
    __
  } = (0,_wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_3__/* .useI18n */ .s9)();
  let isDisabled = false;
  if (!config.options?.tourRating?.enabled) {
    return null;
  }

  // check is on tempRating to allow rerating in a restarted tour
  if (!isDisabled && tempRating !== undefined) {
    isDisabled = true;
  }
  const rateTour = isThumbsUp => {
    if (isDisabled) {
      return;
    }
    const rating = isThumbsUp ? 'thumbs-up' : 'thumbs-down';
    if (rating !== tourRating) {
      isDisabled = true;
      setTempRating(rating);
      config.options?.tourRating?.onTourRate?.(rating);
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wpcom-tour-kit-rating__end-text"
  }, __('Did you find this guide helpful?', "full-site-editing")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    "aria-label": __('Rate thumbs up', "full-site-editing"),
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)('wpcom-tour-kit-rating__end-icon', {
      active: tourRating === 'thumbs-up'
    }),
    disabled: isDisabled,
    icon: _icons_thumbs_up__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
    onClick: () => rateTour(true),
    iconSize: 24
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    "aria-label": __('Rate thumbs down', "full-site-editing"),
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)('wpcom-tour-kit-rating__end-icon', {
      active: tourRating === 'thumbs-down'
    }),
    disabled: isDisabled,
    icon: _icons_thumbs_down__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
    onClick: () => rateTour(false),
    iconSize: 24
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomTourKitRating);

/***/ }),

/***/ 9267:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(743);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3634);




const WpcomTourKitStepCardNavigation = ({
  currentStepIndex,
  onDismiss,
  onGoToStep,
  onNextStep,
  onPreviousStep,
  setInitialFocusedElement,
  steps
}) => {
  const {
    __
  } = (0,_wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s9)();
  const isFirstStep = currentStepIndex === 0;
  const lastStepIndex = steps.length - 1;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_automattic_components__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
    activePageIndex: currentStepIndex,
    numberOfPages: lastStepIndex + 1,
    onChange: onGoToStep
  }, isFirstStep ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    onClick: onDismiss('no-thanks-btn')
  }, __('Skip', "full-site-editing")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "wpcom-tour-kit-step-card-navigation__next-btn",
    variant: "primary",
    onClick: onNextStep,
    ref: setInitialFocusedElement
  }, __('Take the tour', "full-site-editing"))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    onClick: onPreviousStep
  }, __('Back', "full-site-editing")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "wpcom-tour-kit-step-card-navigation__next-btn",
    variant: "primary",
    onClick: onNextStep,
    ref: setInitialFocusedElement
  }, __('Next', "full-site-editing")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomTourKitStepCardNavigation);

/***/ }),

/***/ 8090:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7898);
/* harmony import */ var _wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3634);
/* harmony import */ var _icons_minimize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8830);





const WpcomTourKitStepCardOverlayControls = ({
  onMinimize,
  onDismiss
}) => {
  const {
    __
  } = (0,_wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s9)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-tour-kit-step-card-overlay-controls"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    label: __('Minimize Tour', "full-site-editing"),
    variant: "primary",
    className: "wpcom-tour-kit-step-card-overlay-controls__minimize-icon",
    icon: _icons_minimize__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A,
    iconSize: 24,
    onClick: onMinimize
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    label: __('Close Tour', "full-site-editing"),
    variant: "primary",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
    iconSize: 24,
    onClick: onDismiss('close-btn')
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomTourKitStepCardOverlayControls);

/***/ }),

/***/ 782:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_viewport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9886);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4446);
/* harmony import */ var _wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3634);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4357);
/* harmony import */ var _wpcom_tour_kit_rating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2120);
/* harmony import */ var _wpcom_tour_kit_step_card_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9267);
/* harmony import */ var _wpcom_tour_kit_step_card_overlay_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8090);









const WpcomTourKitStepCard = ({
  steps,
  currentStepIndex,
  onMinimize,
  onDismiss,
  onGoToStep,
  onNextStep,
  onPreviousStep,
  setInitialFocusedElement
}) => {
  const {
    __
  } = (0,_wordpress_react_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s9)();
  const lastStepIndex = steps.length - 1;
  const {
    descriptions,
    heading,
    imgSrc,
    imgLink
  } = steps[currentStepIndex].meta;
  const isLastStep = currentStepIndex === lastStepIndex;
  const description = descriptions[(0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .isMobile */ .Fr)() ? 'mobile' : 'desktop'] ?? descriptions.desktop;

  // @todo check why the assertion is needed here to pass TS
  const mediaQueryList = (0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .getMediaQueryList */ .hf)(_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .MOBILE_BREAKPOINT */ .Dy);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, {
    className: "wpcom-tour-kit-step-card",
    isElevated: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wpcom_tour_kit_step_card_overlay_controls__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
    onDismiss: onDismiss,
    onMinimize: onMinimize
  }), imgSrc && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardMedia, {
    className: "wpcom-tour-kit-step-card__media"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("picture", null, imgSrc.mobile && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    srcSet: imgSrc.mobile.src,
    type: imgSrc.mobile.type,
    media: mediaQueryList?.media
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    alt: __('Tour Media', "full-site-editing"),
    src: imgSrc.desktop?.src
  })), imgLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)('wpcom-tour-kit-step-card__media-link', {
      'wpcom-tour-kit-step-card__media-link--playable': imgLink.playable
    }),
    href: imgLink.href,
    target: "_blank",
    rel: "noreferrer noopener",
    onClick: imgLink.onClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      width: "27",
      height: "32",
      viewBox: "0 0 27 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M27 16L-1.4682e-06 31.5885L-1.05412e-07 0.411542L27 16Z",
      fill: "white"
    })),
    size: 27
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "wpcom-tour-kit-step-card__heading"
  }, heading), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wpcom-tour-kit-step-card__description"
  }, description, isLastStep ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "wpcom-tour-kit-step-card__description",
    variant: "tertiary",
    onClick: () => onGoToStep(0),
    ref: setInitialFocusedElement
  }, __('Restart tour', "full-site-editing")) : null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardFooter, null, isLastStep ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wpcom_tour_kit_rating__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wpcom_tour_kit_step_card_navigation__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
    currentStepIndex: currentStepIndex,
    onDismiss: onDismiss,
    onGoToStep: onGoToStep,
    onNextStep: onNextStep,
    onPreviousStep: onPreviousStep,
    setInitialFocusedElement: setInitialFocusedElement,
    steps: steps
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomTourKitStepCard);

/***/ }),

/***/ 8205:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wpcom_tour_kit_step_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(782);


const WpcomTourKitStep = ({
  steps,
  currentStepIndex,
  onDismiss,
  onNextStep,
  onPreviousStep,
  onMinimize,
  setInitialFocusedElement,
  onGoToStep
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wpcom_tour_kit_step_card__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, {
    steps: steps,
    currentStepIndex: currentStepIndex,
    onDismiss: onDismiss,
    onMinimize: onMinimize,
    onGoToStep: onGoToStep,
    onNextStep: onNextStep,
    onPreviousStep: onPreviousStep,
    setInitialFocusedElement: setInitialFocusedElement
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomTourKitStep);

/***/ }),

/***/ 7960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_tour_kit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7743);
/* harmony import */ var _hooks_use_prefetch_tour_assets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7616);
/* harmony import */ var _wpcom_tour_kit_minimized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9696);
/* harmony import */ var _wpcom_tour_kit_step__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8205);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5089);






const WpcomTourKit = ({
  config
}) => {
  (0,_hooks_use_prefetch_tour_assets__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(config.steps);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_tour_kit__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
    __temp__className: "wpcom-tour-kit",
    config: {
      ...config,
      renderers: {
        tourStep: _wpcom_tour_kit_step__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
        tourMinimized: _wpcom_tour_kit_minimized__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A
      }
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WpcomTourKit);

/***/ }),

/***/ 7616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ usePrefetchTourAssets)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function usePrefetchTourAssets(steps) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    steps.forEach(step => {
      step.meta.imgSrc?.mobile && (new window.Image().src = step.meta.imgSrc.mobile.src);
      step.meta.imgSrc?.desktop && (new window.Image().src = step.meta.imgSrc.desktop.src);
    });
  }, [steps]);
}

/***/ }),

/***/ 9504:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5573);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


const minimize = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M14.086 5.412l3.476-.015c-.627.625-1.225 1.22-1.82 1.81l-.03.031c-.977.971-1.944 1.934-3.015 3.004l1.06 1.061c1.07-1.07 2.036-2.03 3.013-3.002l.03-.03 1.817-1.808-.03 3.448 1.5.013.046-5.28.007-.759-.76.003-5.301.024.007 1.5zM9.914 18.587l-3.476.016c.627-.625 1.225-1.22 1.82-1.81l.03-.031c.977-.971 1.944-1.934 3.015-3.004l-1.06-1.061c-1.07 1.069-2.036 2.03-3.012 3.001l-.001.001-.03.03-1.817 1.808.03-3.448-1.5-.013-.046 5.279-.007.76.76-.003 5.301-.024-.007-1.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (minimize);

/***/ }),

/***/ 8830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5573);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


const minimize = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M18.514 9.988l-3.476.016c.627-.626 1.225-1.22 1.82-1.811l.03-.03v-.001c.977-.971 1.944-1.933 3.015-3.004l-1.06-1.06c-1.07 1.069-2.037 2.03-3.013 3.001l-.03.03-1.818 1.809.03-3.449-1.5-.013-.045 5.28-.007.76.76-.004 5.301-.024-.007-1.5zM5.486 14.012l3.477-.016-1.82 1.811-.03.03c-.977.972-1.945 1.934-3.015 3.005l1.06 1.06c1.07-1.068 2.035-2.03 3.012-3V16.9l.03-.03 1.818-1.809-.03 3.449 1.5.013.046-5.28.006-.76-.76.004-5.3.024.006 1.5z",
  fill: "#fff"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (minimize);

/***/ }),

/***/ 5010:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5573);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


const thumbsDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M13.131 19.12a.667.667 0 001.227-.417l-.436-4.989h3.88c.954 0 1.64-.916 1.37-1.831L17.42 5.919a.286.286 0 00-.274-.205H9.429v7.588l3.702 5.818zm-5.417-5.977V5.714h-2v7.429h2zm5.98 8a2.381 2.381 0 01-2.01-1.103l-3.297-5.183H4V4h13.145a2 2 0 011.919 1.436l1.753 5.963a3.143 3.143 0 01-3.015 4.03h-2.01l.274 3.125a2.381 2.381 0 01-2.372 2.589z",
  fill: "#000"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thumbsDown);

/***/ }),

/***/ 5197:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5573);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


const thumbsUp = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  width: "24",
  height: "24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/SVG"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M13.131 4.023a.667.667 0 011.227.416l-.436 4.99h3.88c.954 0 1.64.916 1.37 1.831l-1.753 5.963a.286.286 0 01-.274.206H9.429V9.84l3.702-5.818zM7.714 10v7.428h-2V10h2zm5.98-8c-.814 0-1.572.416-2.01 1.103L8.388 8.286H4v10.857h13.145a2 2 0 001.919-1.436l1.753-5.963a3.143 3.143 0 00-3.015-4.03h-2.01l.274-3.125A2.381 2.381 0 0013.694 2z",
  fill: "#000"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thumbsUp);

/***/ }),

/***/ 4638:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lC: () => (/* binding */ useMobileBreakpoint)
/* harmony export */ });
/* unused harmony exports useBreakpoint, useDesktopBreakpoint, withBreakpoint, withMobileBreakpoint, withDesktopBreakpoint */
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9575);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_viewport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9886);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9491);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);






/**
 * React hook for getting the status for a breakpoint and keeping it updated.
 * @param {string} breakpoint The breakpoint to consider.
 * @returns {boolean} The current status for the breakpoint.
 */
function useBreakpoint(breakpoint) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(() => ({
    isActive: (0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .isWithinBreakpoint */ .hO)(breakpoint),
    breakpoint
  }));
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    function handleBreakpointChange(isActive) {
      setState(prevState => {
        // Ensure we bail out without rendering if nothing changes, by preserving state.
        if (prevState.isActive === isActive && prevState.breakpoint === breakpoint) {
          return prevState;
        }
        return {
          isActive,
          breakpoint
        };
      });
    }
    const unsubscribe = (0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .subscribeIsWithinBreakpoint */ .xV)(breakpoint, handleBreakpointChange);
    // The unsubscribe function is the entire cleanup for the effect.
    return unsubscribe;
  }, [breakpoint]);
  return breakpoint === state.breakpoint ? state.isActive : (0,_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .isWithinBreakpoint */ .hO)(breakpoint);
}

/**
 * React hook for getting the status for the mobile breakpoint and keeping it
 * updated.
 * @returns {boolean} The current status for the breakpoint.
 */
function useMobileBreakpoint() {
  return useBreakpoint(_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .MOBILE_BREAKPOINT */ .Dy);
}

/**
 * React hook for getting the status for the desktop breakpoint and keeping it
 * updated.
 * @returns {boolean} The current status for the breakpoint.
 */
function useDesktopBreakpoint() {
  return useBreakpoint(DESKTOP_BREAKPOINT);
}

/**
 * React higher order component for getting the status for a breakpoint and
 * keeping it updated.
 * @param {string} breakpoint The breakpoint to consider.
 * @returns {Function} A function that given a component returns the
 * wrapped component.
 */
const withBreakpoint = breakpoint => createHigherOrderComponent(WrappedComponent => /*#__PURE__*/forwardRef((props, ref) => {
  const isActive = useBreakpoint(breakpoint);
  return createElement(WrappedComponent, _extends({}, props, {
    isBreakpointActive: isActive,
    ref: ref
  }));
}), 'WithBreakpoint');

/**
 * React higher order component for getting the status for the mobile
 * breakpoint and keeping it updated.
 * @param {import('react').Component|Function} Wrapped The component to wrap.
 * @returns {Function} The wrapped component.
 */
const withMobileBreakpoint = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(WrappedComponent => /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
  const isActive = useBreakpoint(_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .MOBILE_BREAKPOINT */ .Dy);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({}, props, {
    isBreakpointActive: isActive,
    ref: ref
  }));
}), 'WithMobileBreakpoint');

/**
 * React higher order component for getting the status for the desktop
 * breakpoint and keeping it updated.
 * @param {import('react').Component|Function} Wrapped The component to wrap.
 * @returns {Function} The wrapped component.
 */
const withDesktopBreakpoint = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(WrappedComponent => /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
  const isActive = useBreakpoint(_automattic_viewport__WEBPACK_IMPORTED_MODULE_3__/* .DESKTOP_BREAKPOINT */ .jK);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({}, props, {
    isBreakpointActive: isActive,
    ref: ref
  }));
}), 'WithDesktopBreakpoint');

/***/ }),

/***/ 9886:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dy: () => (/* binding */ MOBILE_BREAKPOINT),
/* harmony export */   Fr: () => (/* binding */ isMobile),
/* harmony export */   hO: () => (/* binding */ isWithinBreakpoint),
/* harmony export */   hf: () => (/* binding */ getMediaQueryList),
/* harmony export */   jK: () => (/* binding */ DESKTOP_BREAKPOINT),
/* harmony export */   xV: () => (/* binding */ subscribeIsWithinBreakpoint)
/* harmony export */ });
/* unused harmony exports WIDE_BREAKPOINT, subscribeIsMobile, isDesktop, subscribeIsDesktop, getWindowInnerWidth, isTabletResolution, DEVICE_MOBILE, DEVICE_TABLET, DEVICE_DESKTOP, resolveDeviceTypeByViewPort */
// Determine whether a user is viewing calypso from a device within a
// particular mobile-first responsive breakpoint, matching our existing media
// queries. [1]
//
// This function takes a string matching one of our mobile-first breakpoints
// and returns a boolean based on whether the current `window.innerWidth`
// matches. This is used to segment behavior based on device or browser size,
// but should not be used in place of css for design.
//
// Valid breakpoints include:
// - '<480px'
// - '<660px'
// - '<800px'
// - '<960px'
// - '<1040px'
// - '<1280px'
// - '<1400px'
// - '>480px'
// - '>660px'
// - '>800px'
// - '>960px'
// - '>1040px'
// - '>1280px'
// - '>1400px'
// - '480px-660px'
// - '480px-960px'
// - '660px-960px'
//
// As implemented in our sass media query mixins, minimums are exclusive, while
// maximums are inclusive. i.e.,
//
// - '>480px' is equivalent to `@media (min-width: 481px)`
// - '<960px' is equivalent to `@media (max-width: 960px)`
// - '480px-960px' is equivalent to `@media (max-width: 960px) and (min-width: 481px)`
//
// [1] https://github.com/Automattic/wp-calypso/blob/HEAD/docs/coding-guidelines/css.md#media-queries
//

// FIXME: We can't detect window size on the server, so until we have more intelligent detection,
// use 769, which is just above the general maximum mobile screen width.
const SERVER_WIDTH = 769;
const MOBILE_BREAKPOINT = '<480px';
const DESKTOP_BREAKPOINT = '>960px';
const WIDE_BREAKPOINT = '>1280px';
const isServer =  false || !window.matchMedia;
const noop = () => null;
function addListenerFunctions(obj) {
  return {
    addListener: () => undefined,
    removeListener: () => undefined,
    ...obj
  };
}
function createMediaQueryList(args) {
  const {
    min,
    max
  } = args ?? {};
  if (min !== undefined && max !== undefined) {
    return isServer ? addListenerFunctions({
      matches: SERVER_WIDTH > min && SERVER_WIDTH <= max
    }) : window.matchMedia(`(min-width: ${min + 1}px) and (max-width: ${max}px)`);
  }
  if (min !== undefined) {
    return isServer ? addListenerFunctions({
      matches: SERVER_WIDTH > min
    }) : window.matchMedia(`(min-width: ${min + 1}px)`);
  }
  if (max !== undefined) {
    return isServer ? addListenerFunctions({
      matches: SERVER_WIDTH <= max
    }) : window.matchMedia(`(max-width: ${max}px)`);
  }
  return false;
}

// @todo We should algin the behavior with the `break-*` mixins from Gutenberg to include minimums
// See https://github.com/WordPress/gutenberg/blob/f1d0bd550f85f5fa4279a3fdb9a2b9c28a7544c6/packages/base-styles/_mixins.scss#L27
const mediaQueryOptions = {
  '<480px': {
    max: 480
  },
  '<660px': {
    max: 660
  },
  '<782px': {
    max: 782
  },
  '<800px': {
    max: 800
  },
  '<960px': {
    max: 960
  },
  '<1040px': {
    max: 1040
  },
  '<1180px': {
    max: 1180
  },
  '<1280px': {
    max: 1280
  },
  '<1400px': {
    max: 1400
  },
  '>480px': {
    min: 480
  },
  '>660px': {
    min: 660
  },
  '>=782px': {
    min: 781
  },
  '>782px': {
    min: 782
  },
  '>800px': {
    min: 800
  },
  '>=960px': {
    min: 959
  },
  '>960px': {
    min: 960
  },
  '>1040px': {
    min: 1040
  },
  '>1280px': {
    min: 1280
  },
  '>1400px': {
    min: 1400
  },
  '480px-660px': {
    min: 480,
    max: 660
  },
  '660px-960px': {
    min: 660,
    max: 960
  },
  '480px-960px': {
    min: 480,
    max: 960
  }
};
function getMediaQueryList(breakpoint) {
  if (!mediaQueryOptions.hasOwnProperty(breakpoint)) {
    try {
      // eslint-disable-next-line no-console
      console.warn('Undefined breakpoint used in `mobile-first-breakpoint`', breakpoint);
    } catch (e) {}
    return undefined;
  }
  return createMediaQueryList(mediaQueryOptions[breakpoint]);
}

/**
 * Returns whether the current window width matches a breakpoint.
 * @param {string} breakpoint The breakpoint to consider.
 * @returns {boolean|undefined} Whether the provided breakpoint is matched.
 */
function isWithinBreakpoint(breakpoint) {
  const mediaQueryList = getMediaQueryList(breakpoint);
  return mediaQueryList ? mediaQueryList.matches : undefined;
}

/**
 * Registers a listener to be notified of changes to breakpoint matching status.
 * @param {string} breakpoint The breakpoint to consider.
 * @param {Function} listener The listener to be called on change.
 * @returns {Function} The function to be called when unsubscribing.
 */
function subscribeIsWithinBreakpoint(breakpoint, listener) {
  if (!listener) {
    return noop;
  }
  const mediaQueryList = getMediaQueryList(breakpoint);
  if (mediaQueryList && !isServer) {
    const wrappedListener = evt => listener(evt.matches);
    mediaQueryList.addListener(wrappedListener);
    // Return unsubscribe function.
    return () => mediaQueryList.removeListener(wrappedListener);
  }
  return noop;
}

/**
 * Returns whether the current window width matches the mobile breakpoint.
 * @returns {boolean|undefined} Whether the mobile breakpoint is matched.
 */
function isMobile() {
  return isWithinBreakpoint(MOBILE_BREAKPOINT);
}

/**
 * Registers a listener to be notified of changes to mobile breakpoint matching status.
 * @param {Function} listener The listener to be called on change.
 * @returns {Function} The registered subscription; undefined if none.
 */
function subscribeIsMobile(listener) {
  return subscribeIsWithinBreakpoint(MOBILE_BREAKPOINT, listener);
}

/**
 * Returns whether the current window width matches the desktop breakpoint.
 * @returns {boolean|undefined} Whether the desktop breakpoint is matched.
 */
function isDesktop() {
  return isWithinBreakpoint(DESKTOP_BREAKPOINT);
}

/**
 * Registers a listener to be notified of changes to desktop breakpoint matching status.
 * @param {Function} listener The listener to be called on change.
 * @returns {Function} The registered subscription; undefined if none.
 */
function subscribeIsDesktop(listener) {
  return subscribeIsWithinBreakpoint(DESKTOP_BREAKPOINT, listener);
}

/**
 * Returns the current window width.
 * Avoid using this method, as it triggers a layout recalc.
 * @returns {number} The current window width, in pixels.
 */
function getWindowInnerWidth() {
  return isServer ? SERVER_WIDTH : window.innerWidth;
}

/******************************************/
/*       Vertical Scroll Experiment       */
/*  	       pcbrnV-XN-p2               */
/******************************************/

//TODO: To be refactored using above using the DESKTOP_BREAKPOINT constant
function isTabletResolution() {
  if (!isServer) {
    return window.innerWidth < 1040;
  }
  return false;
}
const DEVICE_MOBILE = 'mobile';
const DEVICE_TABLET = 'tablet';
const DEVICE_DESKTOP = 'desktop';
function resolveDeviceTypeByViewPort() {
  if (isMobile()) {
    return DEVICE_MOBILE;
  } else if (isTabletResolution()) {
    return DEVICE_TABLET;
  }
  return DEVICE_DESKTOP;
}

/******************************************/

/***/ }),

/***/ 1445:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports requestAllBlogsAccess, reloadProxy, canAccessWpcomApis */
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2090);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7981);
/* harmony import */ var wp_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8966);
/* harmony import */ var wp_error__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wp_error__WEBPACK_IMPORTED_MODULE_1__);




/**
 * debug instance
 */
const debug = debug__WEBPACK_IMPORTED_MODULE_0___default()('wpcom-proxy-request');

/**
 * WordPress.com REST API base endpoint.
 */
const proxyOrigin = 'https://public-api.wordpress.com';
let onStreamRecord = null;

/**
 * Detecting support for the structured clone algorithm. IE8 and 9, and Firefox
 * 6.0 and below only support strings as postMessage's message. This browsers
 * will try to use the toString method.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 * https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm
 * https://github.com/Modernizr/Modernizr/issues/388#issuecomment-31127462
 */
const postStrings = (() => {
  let r = false;
  try {
    window.postMessage({
      toString: function () {
        r = true;
      }
    }, '*');
  } catch (e) {
    /* empty */
  }
  return r;
})();

/**
 * Test if the browser supports constructing a new `File` object. Not present on Edge and IE.
 */
const supportsFileConstructor = (() => {
  try {
    // eslint-disable-next-line no-new
    new window.File(['a'], 'test.jpg', {
      type: 'image/jpeg'
    });
    return true;
  } catch (e) {
    return false;
  }
})();

/**
 * Reference to the <iframe> DOM element.
 * Gets set in the install() function.
 */
let iframe = null;

/**
 * Set to `true` upon the iframe's "load" event.
 */
let loaded = false;

/**
 * Array of buffered API requests. Added to when API requests are done before the
 * proxy <iframe> is "loaded", and fulfilled once the "load" DOM event on the
 * iframe occurs.
 */
let buffered;

/**
 * In-flight API request XMLHttpRequest dummy "proxy" instances.
 */
const requests = {};

/**
 * Performs a "proxied REST API request". This happens by calling
 * `iframe.postMessage()` on the proxy iframe instance, which from there
 * takes care of WordPress.com user authentication (via the currently
 * logged-in user's cookies).
 * @param {Object} originalParams - request parameters
 * @param {Function} [fn] - callback response
 * @returns {window.XMLHttpRequest} XMLHttpRequest instance
 */
const makeRequest = (originalParams, fn) => {
  const params = Object.assign({}, originalParams);
  debug('request(%o)', params);

  // inject the <iframe> upon the first proxied API request
  if (!iframe) {
    install();
  }

  // generate a uuid for this API request
  const id = (0,uuid__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)();
  params.callback = id;
  params.supports_args = true; // supports receiving variable amount of arguments
  params.supports_error_obj = true; // better Error object info
  params.supports_progress = true; // supports receiving XHR "progress" events

  // force uppercase "method" since that's what the <iframe> is expecting
  params.method = String(params.method || 'GET').toUpperCase();
  debug('params object: %o', params);
  const xhr = new window.XMLHttpRequest();
  xhr.params = params;

  // store the `XMLHttpRequest` instance so that "onmessage" can access it again
  requests[id] = xhr;
  if ('function' === typeof fn) {
    // a callback function was provided
    let called = false;
    const xhrOnLoad = e => {
      if (called) {
        return;
      }
      called = true;
      const body = e.response ?? xhr.response;
      debug('body: ', body);
      debug('headers: ', e.headers);
      fn(null, body, e.headers);
    };
    const xhrOnError = e => {
      if (called) {
        return;
      }
      called = true;
      const error = e.error ?? e.err ?? e;
      debug('error: ', error);
      debug('headers: ', e.headers);
      fn(error, null, e.headers);
    };
    xhr.addEventListener('load', xhrOnLoad);
    xhr.addEventListener('abort', xhrOnError);
    xhr.addEventListener('error', xhrOnError);
  }
  if ('function' === typeof params.onStreamRecord) {
    // remove onStreamRecord param, which can’t be cloned
    onStreamRecord = params.onStreamRecord;
    delete params.onStreamRecord;

    // FIXME @azabani implement stream mode processing
    // Hint: port the algorithm from wpcom-xhr-request@1.2.0 to /public.api/rest-proxy/provider-
    // v2.0.js in rWP, then plumb stream records from onmessage below to onStreamRecord (or add
    // the XMLHttpRequest#response to ondownloadprogress there, then parse the chunks here).
  }
  if (loaded) {
    submitRequest(params);
  } else {
    debug('buffering API request since proxying <iframe> is not yet loaded');
    buffered.push(params);
  }
  return xhr;
};

/**
 * Performs a "proxied REST API request". This happens by calling
 * `iframe.postMessage()` on the proxy iframe instance, which from there
 * takes care of WordPress.com user authentication (via the currently
 * logged-in user's cookies).
 *
 * If no function is specified as second parameter, a promise is returned.
 * @param {Object} originalParams - request parameters
 * @param {Function} [fn] - callback response
 * @returns {window.XMLHttpRequest|Promise} XMLHttpRequest instance or Promise
 */
const request = (originalParams, fn) => {
  // if callback is provided, behave traditionally
  if ('function' === typeof fn) {
    // request method
    return makeRequest(originalParams, fn);
  }

  // but if not, return a Promise
  return new Promise((res, rej) => {
    makeRequest(originalParams, (err, response) => {
      err ? rej(err) : res(response);
    });
  });
};

/**
 * Set proxy to "access all users' blogs" mode.
 */
function requestAllBlogsAccess() {
  return request({
    metaAPI: {
      accessAllUsersBlogs: true
    }
  });
}

/**
 * Calls the `postMessage()` function on the <iframe>.
 * @param {Object} params
 */

function submitRequest(params) {
  // Sometimes the `iframe.contentWindow` is `null` even though the `iframe` has been correctly
  // loaded. Can happen when some other buggy script removes it from the document.
  if (!iframe.contentWindow) {
    debug('proxy iframe is not present in the document');
    // Look up the issuing XHR request and make it fail
    const id = params.callback;
    const xhr = requests[id];
    delete requests[id];
    reject(xhr, wp_error__WEBPACK_IMPORTED_MODULE_1___default()({
      status_code: 500,
      error_description: 'proxy iframe element is not loaded'
    }), {});
    return;
  }
  debug('sending API request to proxy <iframe> %o', params);

  // `formData` needs to be patched if it contains `File` objects to work around
  // a Chrome bug. See `patchFileObjects` description for more details.
  if (params.formData) {
    patchFileObjects(params.formData);
  }
  iframe.contentWindow.postMessage(postStrings ? JSON.stringify(params) : params, proxyOrigin);
}

/**
 * Returns `true` if `v` is a DOM File instance, `false` otherwise.
 * @param {any} v - instance to analyze
 * @returns {boolean} `true` if `v` is a DOM File instance
 */
function isFile(v) {
  return v && Object.prototype.toString.call(v) === '[object File]';
}

/*
 * Find a `File` object in a form data value. It can be either the value itself, or
 * in a `fileContents` property of the value.
 */
function getFileValue(v) {
  if (isFile(v)) {
    return v;
  }
  if (typeof v === 'object' && isFile(v.fileContents)) {
    return v.fileContents;
  }
  return null;
}

/**
 * Finds all `File` instances in `formData` and creates a new `File` instance whose storage is
 * forced to be a `Blob` instead of being backed by a file on disk. That works around a bug in
 * Chrome where `File` instances with `has_backing_file` flag cannot be sent over a process
 * boundary when site isolation is on.
 * @see https://bugs.chromium.org/p/chromium/issues/detail?id=866805
 * @see https://bugs.chromium.org/p/chromium/issues/detail?id=631877
 * @param {Array} formData Form data to patch
 */
function patchFileObjects(formData) {
  // There are several landmines to avoid when making file uploads work on all browsers:
  // - the `new File()` constructor trick breaks file uploads on Safari 10 in a way that's
  //   impossible to detect: it will send empty files in the multipart/form-data body.
  //   Therefore we need to detect Chrome.
  // - IE11 and Edge don't support the `new File()` constructor at all. It will throw exception,
  //   so it's detectable by the `supportsFileConstructor` code.
  // - `window.chrome` exists also on Edge (!), `window.chrome.webstore` is only in Chrome and
  //   not in other Chromium based browsers (which have the site isolation bug, too).
  if (!window.chrome || !supportsFileConstructor) {
    return;
  }
  for (let i = 0; i < formData.length; i++) {
    const val = getFileValue(formData[i][1]);
    if (val) {
      formData[i][1] = new window.File([val], val.name, {
        type: val.type
      });
    }
  }
}

/**
 * Injects the proxy <iframe> instance in the <body> of the current
 * HTML page.
 */

function install() {
  debug('install()');
  if (iframe) {
    uninstall();
  }
  buffered = [];

  // listen to messages sent to `window`
  window.addEventListener('message', onmessage);

  // create the <iframe>
  iframe = document.createElement('iframe');
  const origin = window.location.origin;
  debug('using "origin": %o', origin);

  // set `src` and hide the iframe
  iframe.src = proxyOrigin + '/wp-admin/rest-proxy/?v=2.0#' + origin;
  iframe.style.display = 'none';

  // inject the <iframe> into the <body>
  document.body.appendChild(iframe);
}

/**
 * Reloads the proxy iframe.
 */
const reloadProxy = () => {
  install();
};

/**
 * Removes the <iframe> proxy instance from the <body> of the page.
 */
function uninstall() {
  debug('uninstall()');
  window.removeEventListener('message', onmessage);
  document.body.removeChild(iframe);
  loaded = false;
  iframe = null;
}

/**
 * The proxy <iframe> instance's "load" event callback function.
 */

function onload() {
  debug('proxy <iframe> "load" event');
  loaded = true;

  // flush any buffered API calls
  if (buffered) {
    for (let i = 0; i < buffered.length; i++) {
      submitRequest(buffered[i]);
    }
    buffered = null;
  }
}

/**
 * The main `window` object's "message" event callback function.
 * @param {window.Event} e
 */

function onmessage(e) {
  // If the iframe was never loaded, this message might be unrelated.
  if (!iframe?.contentWindow) {
    return;
  }
  debug('onmessage');

  // Filter out messages from different origins
  if (e.origin !== proxyOrigin) {
    debug('ignoring message... %o !== %o', e.origin, proxyOrigin);
    return;
  }

  // Filter out messages from different iframes
  if (e.source !== iframe.contentWindow) {
    debug('ignoring message... iframe elements do not match');
    return;
  }
  let {
    data
  } = e;
  if (!data) {
    return debug('no `data`, bailing');
  }

  // Once the iframe is loaded, we can start using it.
  if (data === 'ready') {
    onload();
    return;
  }
  if (postStrings && 'string' === typeof data) {
    data = JSON.parse(data);
  }

  // check if we're receiving a "progress" event
  if (data.upload || data.download) {
    return onprogress(data);
  }
  if (!data.length) {
    return debug("`e.data` doesn't appear to be an Array, bailing...");
  }

  // first get the `xhr` instance that we're interested in
  const id = data[data.length - 1];
  if (!(id in requests)) {
    return debug('bailing, no matching request with callback: %o', id);
  }
  const xhr = requests[id];

  // Build `error` and `body` object from the `data` object
  const {
    params
  } = xhr;
  const body = data[0];
  let statusCode = data[1];
  const headers = data[2];

  // We don't want to delete requests while we're processing stream messages
  if (statusCode === 207) {
    // 207 is a signal from rest-proxy. It means, "this isn't the final
    // response to the query." The proxy supports WebSocket connections
    // by invoking the original success callback for each message received.
  } else {
    // this is the final response to this query
    delete requests[id];
  }
  if (!params.metaAPI) {
    debug('got %o status code for URL: %o', statusCode, params.path);
  } else {
    statusCode = body === 'metaAPIupdated' ? 200 : 500;
  }
  if (typeof headers === 'object') {
    // add statusCode into headers object
    headers.status = statusCode;
    if (shouldProcessInStreamMode(headers['Content-Type'])) {
      if (statusCode === 207) {
        onStreamRecord(body);
        return;
      }
    }
  }
  if (statusCode && 2 === Math.floor(statusCode / 100)) {
    // 2xx status code, success
    resolve(xhr, body, headers);
  } else {
    // any other status code is a failure
    const wpe = wp_error__WEBPACK_IMPORTED_MODULE_1___default()(params, statusCode, body);
    reject(xhr, wpe, headers);
  }
}

/**
 * Returns true iff stream mode processing is required (see wpcom-xhr-request@1.2.0).
 * @param {string} contentType response Content-Type header value
 */
function shouldProcessInStreamMode(contentType) {
  return /^application[/]x-ndjson($|;)/.test(contentType);
}

/**
 * Handles a "progress" event being proxied back from the iframe page.
 * @param {Object} data
 */

function onprogress(data) {
  debug('got "progress" event: %o', data);
  const xhr = requests[data.callbackId];
  if (xhr) {
    const prog = new window.ProgressEvent('progress', data);
    const target = data.upload ? xhr.upload : xhr;
    target.dispatchEvent(prog);
  }
}

/**
 * Emits the "load" event on the `xhr`.
 * @param {window.XMLHttpRequest} xhr
 * @param {Object} body
 */

function resolve(xhr, body, headers) {
  const e = new window.ProgressEvent('load');
  e.data = e.body = e.response = body;
  e.headers = headers;
  xhr.dispatchEvent(e);
}

/**
 * Emits the "error" event on the `xhr`.
 * @param {window.XMLHttpRequest} xhr
 * @param {Error} err
 */

function reject(xhr, err, headers) {
  const e = new window.ProgressEvent('error');
  e.error = e.err = err;
  e.headers = headers;
  xhr.dispatchEvent(e);
}

// list of valid origins for wpcom requests.
// taken from wpcom-proxy-request (rest-proxy/provider-v2.0.js)
const wpcomAllowedOrigins = (/* unused pure expression or super */ null && (['https://wordpress.com', 'https://cloud.jetpack.com', 'https://agencies.automattic.com', 'http://wpcalypso.wordpress.com',
// for running docker on dev instances
'http://widgets.wp.com', 'https://widgets.wp.com', 'https://dev-mc.a8c.com', 'https://mc.a8c.com', 'https://dserve.a8c.com', 'http://calypso.localhost:3000', 'https://calypso.localhost:3000', 'http://jetpack.cloud.localhost:3000', 'https://jetpack.cloud.localhost:3000', 'http://agencies.localhost:3000', 'https://agencies.localhost:3000', 'http://calypso.localhost:3001', 'https://calypso.localhost:3001', 'https://calypso.live', 'http://127.0.0.1:41050', 'http://send.linguine.localhost:3000']));

/**
 * Shelved from rest-proxy/provider-v2.0.js.
 * This returns true for all WPCOM origins except Atomic sites.
 * @param urlOrigin
 * @returns
 */
function isAllowedOrigin(urlOrigin) {
  // sites in the allow-list and some subdomains of "calypso.live" and "wordpress.com"
  // are allowed without further check
  return wpcomAllowedOrigins.includes(urlOrigin) || /^https:\/\/[a-z0-9-]+\.calypso\.live$/.test(urlOrigin) || /^https:\/\/([a-z0-9-]+\.)+wordpress\.com$/.test(urlOrigin);
}
function canAccessWpcomApis() {
  return isAllowedOrigin(window.location.origin);
}

/**
 * Export `request` function.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);


/***/ }),

/***/ 2090:
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
  let warned = false;
  return () => {
    if (!warned) {
      warned = true;
      console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
  };
})();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if ( true && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // Is firebug? http://stackoverflow.com/a/398120/376773
   true && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
  if (!this.useColors) {
    return;
  }
  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }
    index++;
    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
  let r;
  try {
    r = exports.storage.getItem('debug');
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }
  return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
module.exports = __webpack_require__(869)(exports);
const {
  formatters
} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};

/***/ }),

/***/ 869:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(8437);
  createDebug.destroy = destroy;
  Object.keys(env).forEach(key => {
    createDebug[key] = env[key];
  });

  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];

  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */
  createDebug.formatters = {};

  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;

  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */
  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return;
      }
      const self = debug;

      // Set `diff` timestamp
      const curr = Number(new Date());
      const ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      }

      // Apply any `formatters` transformations
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return '%';
        }
        index++;
        const formatter = createDebug.formatters[format];
        if (typeof formatter === 'function') {
          const val = args[index];
          match = formatter.call(self, val);

          // Now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // Apply env-specific formatting (colors, etc.)
      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }
    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      },
      set: v => {
        enableOverride = v;
      }
    });

    // Env-specific initialization logic for debug instances
    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }
    return debug;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }

  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    const len = split.length;
    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */
  function disable() {
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
    createDebug.enable('');
    return namespaces;
  }

  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */
  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    let i;
    let len;
    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }

  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */
  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }
    return val;
  }

  /**
  * XXX DO NOT USE. This is a temporary stub function.
  * XXX It WILL be removed in the next major release.
  */
  function destroy() {
    console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  }
  createDebug.enable(createDebug.load());
  return createDebug;
}
module.exports = setup;

/***/ }),

/***/ 2676:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var camelCase = __webpack_require__(4238);

module.exports = function () {
	var cased = camelCase.apply(camelCase, arguments);
	return cased.charAt(0).toUpperCase() + cased.slice(1);
};


/***/ }),

/***/ 4238:
/***/ ((module) => {

"use strict";

module.exports = function () {
	var str = [].map.call(arguments, function (str) {
		return str.trim();
	}).filter(function (str) {
		return str.length;
	}).join('-');

	if (!str.length) {
		return '';
	}

	if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
		if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
			return str;
		}

		return str.toLowerCase();
	}

	return str
	.replace(/^[_.\- ]+/, '')
	.toLowerCase()
	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};


/***/ }),

/***/ 3512:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ 8062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ 9834:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ unsafeStringify)
/* harmony export */ });

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (stringify)));

/***/ }),

/***/ 7981:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3512);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8062);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9834);




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__/* .unsafeStringify */ .k)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ 8966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uppercamelcase = __webpack_require__(2676);
var statusCodes = __webpack_require__(49);

module.exports = WPError;

function WPError () {
  var self = new Error();

  for (var i = 0; i < arguments.length; i++) {
    process(self, arguments[i]);
  }

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(self, WPError);
  }

  return self;
}

function process ( self, data ) {
  if ( ! data ) { 
    return;
  }
  
  if (typeof data === 'number') {
    setStatusCode( self, data );

  } else {
    // assume it's a plain 'ol Object with some props to copy over
    if ( data.status_code ) {
      setStatusCode( self, data.status_code );
    }

    if ( data.error ) {
      self.name = toName( data.error );
    }

    if ( data.error_description ) {
      self.message = data.error_description;
    }

    var errors = data.errors;
    if ( errors ) {
      var first = errors.length ? errors[0] : errors;
      process( self, first );
    }

    for ( var i in data ) {
      self[i] = data[i];
    }

    if ( self.status && ( data.method || data.path ) ) {
      setStatusCodeMessage( self );
    }
  }
}

function setStatusCode ( self, code ) {
  self.name = toName( statusCodes[ code ] );
  self.status = self.statusCode = code;
  setStatusCodeMessage( self );
}

function setStatusCodeMessage ( self ) {
  var code = self.status;
  var method = self.method;
  var path = self.path;

  var m = code + ' status code';
  var extended = method || path;

  if ( extended ) m += ' for "';
  if ( method ) m += method;
  if ( extended ) m += ' ';
  if ( path ) m += path;
  if ( extended ) m += '"';

  self.message = m;
}

function toName ( str ) {
  return uppercamelcase( String(str).replace(/error$/i, ''), 'error' );
}


/***/ }),

/***/ 2345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/draft-post-19715e868be3c82bb350.svg";

/***/ }),

/***/ 8794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/post-published-ca9ddfc04a7c889a72d2.svg";

/***/ }),

/***/ 9661:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/product-published-f8461fe85ee7eb5713c8.svg";

/***/ }),

/***/ 7233:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/illo-share-d04d91232090e41822db.svg";

/***/ }),

/***/ 8141:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/block-picker-baad989c3eaa6c60cc56.svg";

/***/ }),

/***/ 2784:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/editor-a1965f46cfb792664a14.svg";

/***/ }),

/***/ 6253:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/preview-a3fa241fd59995b1fc42.svg";

/***/ }),

/***/ 8628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/private-761a5407869f32039248.svg";

/***/ }),

/***/ 8132:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/video-success-efc454c6ae0b77ec03f0.svg";

/***/ }),

/***/ 1609:
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ 5795:
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ 4995:
/***/ ((module) => {

"use strict";
module.exports = window["a8c-fse-common-data-stores"];

/***/ }),

/***/ 8468:
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ 6154:
/***/ ((module) => {

"use strict";
module.exports = window["moment"];

/***/ }),

/***/ 1455:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ 4997:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ 6427:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ 7143:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ 6161:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["dataControls"];

/***/ }),

/***/ 8107:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["dom"];

/***/ }),

/***/ 6087:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ 2619:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ 7723:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ 692:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["notices"];

/***/ }),

/***/ 5518:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["nux"];

/***/ }),

/***/ 2279:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ 5573:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ 3053:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["privateApis"];

/***/ }),

/***/ 3832:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ 4586:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(205);

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ 9575:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ 9824:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7545);

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

/***/ }),

/***/ 205:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7545);
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9824);


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(i) ? i : i + "";
}

/***/ }),

/***/ 7545:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ }),

/***/ 4357:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export clsx */
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9428);
/* harmony import */ var _src_disable_core_nux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3555);
/* harmony import */ var _src_block_editor_nux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1914);



(0,_src_store__WEBPACK_IMPORTED_MODULE_0__/* .register */ .kz)();
})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
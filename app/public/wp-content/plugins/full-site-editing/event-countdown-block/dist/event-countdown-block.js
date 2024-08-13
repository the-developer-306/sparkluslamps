/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 353:
/***/ (() => {

// extracted by mini-css-extract-plugin


/***/ }),

/***/ 485:
/***/ (() => {

// extracted by mini-css-extract-plugin


/***/ }),

/***/ 514:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(443);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(154);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);

/* eslint-disable wpcalypso/jsx-classname-namespace */
// disabled CSS class rule due to existing code already
// that users the non-conformant classnames




const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__;


const TIMEZONELESS_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

/**
 * Assigns timezone to a date without altering it
 * @param {string} date a date in YYYY-MM-DDTHH:mm:ss format
 * @param {number} offset the offset in hours
 * @returns a moment instance
 */
function assignTimezone(date, offset, format = TIMEZONELESS_FORMAT) {
  // passing the `true` flag to `utcOffset` keeps the date unaltered, only adds a tz
  return moment__WEBPACK_IMPORTED_MODULE_4___default()(date, format).utcOffset(offset * 60, true);
}
const edit = ({
  attributes,
  setAttributes,
  className
}) => {
  const settings = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.__experimentalGetSettings)();
  let label = __('Choose Date', 'full-site-editing');
  let eventDate;
  if (attributes.eventTimestamp) {
    label = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)(settings.formats.datetimeAbbreviated,
    // eventTimestamp is UNIX (in seconds), Date expect milliseconds
    new Date(attributes.eventTimestamp * 1000));

    // the DateTimePicker requires the date to be in this format
    // we offset the date by the site timezone settings to counteract the Datepicker automatic adjustment to the client-side timezone
    eventDate = moment__WEBPACK_IMPORTED_MODULE_4___default()(attributes.eventTimestamp * 1000).utcOffset(settings.timezone.offset * 60).format(TIMEZONELESS_FORMAT);
  } else if (attributes.eventDate) {
    // backwards compatibility
    const siteTimeZoneAdjustedTime = assignTimezone(attributes.eventDate, Number.parseFloat(settings.timezone.offset) // offset can be a string if a manual timezone is selected
    );
    label = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)(settings.formats.datetimeAbbreviated, siteTimeZoneAdjustedTime);
    eventDate = attributes.eventDate;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
    label: __('Event Countdown', 'full-site-editing'),
    instructions: __('Count down to an event. Set a title and pick a time and date.', 'full-site-editing'),
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icon__WEBPACK_IMPORTED_MODULE_5__/* .EventCountdownIcon */ .l, null),
    className: className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, __('Title:', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: attributes.eventTitle,
    onChange: evt => setAttributes({
      eventTitle: evt.target.value
    }),
    placeholder: __('Event Title', 'full-site-editing'),
    className: "event-countdown__event-title",
    "aria-label": __('Event Title', 'full-site-editing')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, __('Date:', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    position: "bottom left",
    renderToggle: ({
      onToggle,
      isOpen
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      onClick: onToggle,
      "aria-expanded": isOpen,
      "aria-live": "polite",
      isSecondary: true
    }, label),
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DateTimePicker, {
      key: "event-countdown-picker",
      onChange: date => setAttributes({
        eventTimestamp: assignTimezone(date, settings.timezone.offset).unix()
      }),
      currentDate: eventDate
    })
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (edit);

/***/ }),

/***/ 15:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ EventCountdownIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


const EventCountdownIcon = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
}));

/***/ }),

/***/ 56:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(514);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(775);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(353);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(485);


const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('jetpack/event-countdown', {
  title: __('Event Countdown', 'full-site-editing'),
  description: __('Count down to your favorite next thing, and celebrate with fireworks when the time is right!', 'full-site-editing'),
  icon: _icon__WEBPACK_IMPORTED_MODULE_3__/* .EventCountdownIcon */ .l,
  category: 'widgets',
  supports: {
    align: ['wide', 'full']
  },
  example: {
    attributes: {
      eventTimestamp: 1318874398,
      eventTitle: 'Total Solar Eclipse'
    }
  },
  attributes: {
    eventTitle: {
      type: 'string',
      source: 'text',
      selector: '.event-countdown__event-title'
    },
    eventTimestamp: {
      type: 'number'
    }
  },
  edit: props => {
    if (props.isSelected) {
      return (0,_edit__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(props);
    }
    return (0,_view__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)({
      ...props,
      isEditView: true
    });
  },
  save: _view__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
  deprecated: [{
    attributes: {
      eventTitle: {
        type: 'string',
        source: 'text',
        selector: '.event-countdown__event-title'
      },
      eventDate: {
        type: 'string'
      }
    },
    // the new `view` function can handle the deprecated attributes
    save: _view__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A
  }]
});

/***/ }),

/***/ 775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/* eslint-disable wpcalypso/jsx-classname-namespace */
// disabled CSS class rule due to existing code already
// that users the non-conformant classnames


const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__,
  _x = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x;
const view = ({
  attributes,
  className,
  isEditView
}) => {
  // Expected values in save.
  let days = '&nbsp;';
  let hours = '&nbsp;';
  let mins = '&nbsp;';
  let secs = '&nbsp;';
  if (isEditView) {
    // Zero out.
    days = hours = mins = secs = 0;
    let eventTime;
    if (attributes.eventTimestamp) {
      eventTime = attributes.eventTimestamp * 1000;
    } else {
      // backwards compatibility
      eventTime = new Date(attributes.eventDate).getTime();
    }
    const now = Date.now();
    const diff = eventTime - now;
    if (diff > 0) {
      // Convert diff to seconds.
      let rem = Math.round(diff / 1000);
      days = Math.floor(rem / (24 * 60 * 60));
      rem = rem - days * 24 * 60 * 60;
      hours = Math.floor(rem / (60 * 60));
      rem = rem - hours * 60 * 60;
      mins = Math.floor(rem / 60);
      rem = rem - mins * 60;
      secs = rem;
    }
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-countdown__date"
  }, attributes.eventTimestamp || attributes.eventDate), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-countdown__counter"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "event-countdown__day"
  }, days), ' ', _x('days', 'Countdown days remaining', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "event-countdown__hour"
  }, hours), ' ', _x('hours', 'Countdown hours remaining', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "event-countdown__minute"
  }, mins), ' ', _x('minutes', 'Countdown minutes remaining', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "event-countdown__second"
  }, secs), ' ', _x('seconds', 'Countdown seconds remaining', 'full-site-editing'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('until', 'full-site-editing'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "event-countdown__event-title"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, attributes.eventTitle)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (view);

/***/ }),

/***/ 154:
/***/ ((module) => {

module.exports = window["moment"];

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ 427:
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ 443:
/***/ ((module) => {

module.exports = window["wp"]["date"];

/***/ }),

/***/ 87:
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ 723:
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/* harmony import */ var _blocks_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56);

})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
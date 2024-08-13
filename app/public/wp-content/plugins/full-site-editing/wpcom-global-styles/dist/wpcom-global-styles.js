/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

/***/ 8166:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 4241:
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

/***/ 2084:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _automattic_calypso_products__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6277);
/* harmony import */ var _automattic_calypso_products__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2400);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _image_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8998);
/* harmony import */ var _use_canvas__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5167);
/* harmony import */ var _modal_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8166);

/* global wpcomGlobalStyles */







const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__;




const GlobalStylesModal = () => {
  const isSiteEditor = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => !!select('core/edit-site'), []);
  const {
    viewCanvasPath
  } = (0,_use_canvas__WEBPACK_IMPORTED_MODULE_7__/* .useCanvas */ .y)();
  const isVisible = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (!isSiteEditor) {
      return false;
    }
    const currentSidebar = select('core/interface').getActiveComplementaryArea('core/edit-site');
    return select('automattic/wpcom-global-styles').isModalVisible(currentSidebar, viewCanvasPath);
  }, [viewCanvasPath, isSiteEditor]);
  const {
    dismissModal
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('automattic/wpcom-global-styles');
  const {
    set: setPreference
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/preferences');

  // Hide the welcome guide modal, so it doesn't conflict with our modal.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isSiteEditor) {
      setPreference('core/edit-site', 'welcomeGuideStyles', false);
    }
  }, [setPreference, isSiteEditor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isVisible) {
      (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_global_styles_gating_modal_show', {
        context: 'site-editor'
      });
    }
  }, [isVisible]);
  const closeModal = () => {
    dismissModal();
    (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_global_styles_gating_modal_dismiss', {
      context: 'site-editor'
    });
  };
  if (!isSiteEditor || !isVisible) {
    return null;
  }
  const planName = (0,_automattic_calypso_products__WEBPACK_IMPORTED_MODULE_9__/* .getPlan */ .U7)(_automattic_calypso_products__WEBPACK_IMPORTED_MODULE_10__/* .PLAN_PREMIUM */ .Gi).getTitle();
  const description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.sprintf)( /* translators: %s is the short-form Premium plan name */
  __("Change all of your site's fonts, colors and more. Available on the %s plan.", 'full-site-editing'), planName);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    className: "wpcom-global-styles-modal",
    onRequestClose: closeModal
    // set to false so that 1Password's autofill doesn't automatically close the modal
    ,
    shouldCloseOnClickOutside: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-global-styles-modal__content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-global-styles-modal__text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "wpcom-global-styles-modal__heading"
  }, __('A powerful new way to style your site', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wpcom-global-styles-modal__description"
  }, description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-global-styles-modal__actions"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: closeModal
  }, __('Try it out', 'full-site-editing')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    href: wpcomGlobalStyles.upgradeUrl,
    target: "_top",
    onClick: () => (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)('calypso_global_styles_gating_modal_upgrade_click', {
      context: 'site-editor'
    })
  }, __('Upgrade plan', 'full-site-editing')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wpcom-global-styles-modal__image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _image_svg__WEBPACK_IMPORTED_MODULE_6__,
    alt: ""
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalStylesModal);

/***/ }),

/***/ 220:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ GlobalStylesNotices)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8948);
/* harmony import */ var _automattic_calypso_products__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6277);
/* harmony import */ var _automattic_calypso_products__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2400);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3402);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1799);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4357);
/* harmony import */ var _use_canvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5167);
/* harmony import */ var _use_global_styles_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8994);
/* harmony import */ var _use_preview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8263);
/* harmony import */ var _notice_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4241);

/* global wpcomGlobalStyles */







const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__;





const GLOBAL_STYLES_VIEW_NOTICE_SELECTOR = 'wpcom-global-styles-notice-container';
const trackEvent = (eventName, isSiteEditor = true) => (0,_automattic_calypso_analytics__WEBPACK_IMPORTED_MODULE_1__/* .recordTracksEvent */ .Oy)(eventName, {
  context: isSiteEditor ? 'site-editor' : 'post-editor',
  blog_id: wpcomGlobalStyles.wpcomBlogId
});
function GlobalStylesWarningNotice() {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    trackEvent('calypso_global_styles_gating_notice_view_canvas_show');
  }, []);
  const planName = (0,_automattic_calypso_products__WEBPACK_IMPORTED_MODULE_9__/* .getPlan */ .U7)(_automattic_calypso_products__WEBPACK_IMPORTED_MODULE_10__/* .PLAN_PREMIUM */ .Gi).getTitle();
  const upgradeTranslation = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.sprintf)( /* translators: %s is the short-form Premium plan name */
  __('Your site includes premium styles that are only visible to visitors after <a>upgrading to the %s plan or higher</a>.', 'full-site-editing'), planName);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "warning",
    isDismissible: false,
    className: "wpcom-global-styles-notice"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)(upgradeTranslation, {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ExternalLink, {
      href: wpcomGlobalStyles.upgradeUrl,
      target: "_blank",
      onClick: () => trackEvent('calypso_global_styles_gating_notice_view_canvas_upgrade_click')
    })
  }));
}
function GlobalStylesViewNotice() {
  const {
    canvas
  } = (0,_use_canvas__WEBPACK_IMPORTED_MODULE_5__/* .useCanvas */ .y)();
  const [isRendered, setIsRendered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    globalStylesInUse
  } = (0,_use_global_styles_config__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStylesConfig */ .h)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!globalStylesInUse) {
      document.querySelector(`.${GLOBAL_STYLES_VIEW_NOTICE_SELECTOR}`)?.remove();
      setIsRendered(false);
      return;
    }
    if (isRendered) {
      return;
    }
    if (canvas !== 'view') {
      return;
    }
    const saveHub = document.querySelector('.edit-site-save-hub');
    if (!saveHub) {
      return;
    }

    // Insert the notice as a sibling of the save hub instead of as a child,
    // to prevent our notice from breaking the flex styles of the hub.
    const container = saveHub.parentNode;
    const noticeContainer = document.createElement('div');
    noticeContainer.classList.add(GLOBAL_STYLES_VIEW_NOTICE_SELECTOR);
    container.insertBefore(noticeContainer, saveHub);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GlobalStylesWarningNotice, null), noticeContainer);
    setIsRendered(true);
  }, [isRendered, canvas, globalStylesInUse]);
  return null;
}
function GlobalStylesEditNotice() {
  const NOTICE_ID = 'wpcom-global-styles/gating-notice';
  const {
    globalStylesInUse,
    globalStylesId
  } = (0,_use_global_styles_config__WEBPACK_IMPORTED_MODULE_6__/* .useGlobalStylesConfig */ .h)();
  const {
    canvas
  } = (0,_use_canvas__WEBPACK_IMPORTED_MODULE_5__/* .useCanvas */ .y)();
  const {
    isSiteEditor,
    isPostEditor
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => ({
    isSiteEditor: !!select('core/edit-site') && canvas === 'edit',
    isPostEditor: !select('core/edit-site') && !!select('core/editor').getCurrentPostId()
  }), [canvas]);
  const {
    previewPostWithoutCustomStyles,
    canPreviewPost
  } = (0,_use_preview__WEBPACK_IMPORTED_MODULE_7__/* .usePreview */ .g)();
  const {
    createWarningNotice,
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/notices');
  const {
    editEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core');
  const upgradePlan = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    window.open(wpcomGlobalStyles.upgradeUrl, '_blank').focus();
    trackEvent('calypso_global_styles_gating_notice_upgrade_click', isSiteEditor);
  }, [isSiteEditor]);
  const previewPost = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    previewPostWithoutCustomStyles();
    trackEvent('calypso_global_styles_gating_notice_preview_click', isSiteEditor);
  }, [isSiteEditor, previewPostWithoutCustomStyles]);
  const resetGlobalStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!globalStylesId) {
      return;
    }
    editEntityRecord('root', 'globalStyles', globalStylesId, {
      styles: {},
      settings: {}
    });
    trackEvent('calypso_global_styles_gating_notice_reset_click', isSiteEditor);
  }, [editEntityRecord, globalStylesId, isSiteEditor]);
  const openResetGlobalStylesSupport = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    window.open(wpcomGlobalStyles.resetGlobalStylesSupportUrl, '_blank').focus();
    trackEvent('calypso_global_styles_gating_notice_reset_support_click', isSiteEditor);
  }, [isSiteEditor]);
  const showNotice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const actions = [{
      label: __('Upgrade now', 'full-site-editing'),
      onClick: upgradePlan,
      variant: 'primary',
      noDefaultClasses: true,
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A)('wpcom-global-styles-action-is-upgrade', 'wpcom-global-styles-action-has-icon', 'wpcom-global-styles-action-is-external')
    }];
    if (isPostEditor && canPreviewPost) {
      actions.push({
        label: __('Preview without premium styles', 'full-site-editing'),
        onClick: previewPost,
        variant: 'secondary',
        noDefaultClasses: true,
        className: 'wpcom-global-styles-action-has-icon wpcom-global-styles-action-is-external'
      });
    }
    actions.push({
      label: __('Remove premium styles', 'full-site-editing'),
      onClick: isSiteEditor ? resetGlobalStyles : openResetGlobalStylesSupport,
      variant: isSiteEditor ? 'secondary' : 'link',
      noDefaultClasses: true,
      className: isSiteEditor ? '' : 'wpcom-global-styles-action-has-icon wpcom-global-styles-action-is-external wpcom-global-styles-action-is-support'
    });
    const planName = (0,_automattic_calypso_products__WEBPACK_IMPORTED_MODULE_9__/* .getPlan */ .U7)(_automattic_calypso_products__WEBPACK_IMPORTED_MODULE_10__/* .PLAN_PREMIUM */ .Gi).getTitle();
    createWarningNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.sprintf)( /* translators: %s is the short-form Premium plan name */
    __('Your site includes premium styles that are only visible to visitors after upgrading to the %s plan or higher.', 'full-site-editing'), planName), {
      id: NOTICE_ID,
      actions: actions
    });
    trackEvent('calypso_global_styles_gating_notice_show', isSiteEditor);
  }, [canPreviewPost, createWarningNotice, isPostEditor, isSiteEditor, openResetGlobalStylesSupport, previewPost, resetGlobalStyles, upgradePlan]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isSiteEditor && !isPostEditor) {
      return;
    }
    if (globalStylesInUse) {
      showNotice();
    } else {
      removeNotice(NOTICE_ID);
    }
    return () => removeNotice(NOTICE_ID);
  }, [globalStylesInUse, isSiteEditor, isPostEditor, removeNotice, showNotice]);
  return null;
}
function GlobalStylesNotices() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__/* .QueryClientProvider */ .Ht, {
    client: new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_13__/* .QueryClient */ .E()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GlobalStylesViewNotice, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GlobalStylesEditNotice, null));
}

/***/ }),

/***/ 4014:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* exported __webpack_public_path__ */
/* global __webpack_public_path__ */

/**
 * Dynamically set WebPack's publicPath so that split assets can be found.
 * @see https://webpack.js.org/guides/public-path/#on-the-fly
 */
if ( true && window.wpcomGlobalStyles?.assetsUrl) {
  // eslint-disable-next-line no-global-assign
  __webpack_require__.p = window.wpcomGlobalStyles.assetsUrl;
}

/***/ }),

/***/ 1772:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

const DEFAULT_STATE = {
  isModalVisible: true
};
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.registerStore)('automattic/wpcom-global-styles', {
  reducer: (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case 'DISMISS_MODAL':
        return {
          ...state,
          isModalVisible: false
        };
    }
    return state;
  },
  actions: {
    dismissModal: () => ({
      type: 'DISMISS_MODAL'
    })
  },
  selectors: {
    isModalVisible: (state, currentSidebar, viewCanvasPath) => state.isModalVisible && (currentSidebar === 'edit-site/global-styles' || viewCanvasPath === '/wp_global_styles')
  },
  persist: true
});

/***/ }),

/***/ 5167:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ useCanvas)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


function useCanvas() {
  const [canvas, setCanvas] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [viewCanvasPath, setViewCanvasPath] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const isSiteEditor = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => !!select('core/edit-site'), []);

  // Since Gutenberg doesn't provide a stable selector to get canvas data,
  // we need to infer it from the URL.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!isSiteEditor) {
      return;
    }
    const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.subscribe)(() => {
      const params = new URLSearchParams(window.location.search);
      const _canvas = params.get('canvas') ?? 'view';
      setCanvas(_canvas);
      setViewCanvasPath(_canvas === 'view' ? params.get('path') : undefined);
    });
    return () => unsubscribe();
  }, [isSiteEditor]);
  return {
    canvas,
    viewCanvasPath
  };
}

/***/ }),

/***/ 8994:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ useGlobalStylesConfig)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

function useGlobalStylesConfig() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const {
      getEditedEntityRecord,
      __experimentalGetCurrentGlobalStylesId
    } = select('core');
    const _globalStylesId = __experimentalGetCurrentGlobalStylesId ? __experimentalGetCurrentGlobalStylesId() : null;
    const globalStylesRecord = getEditedEntityRecord('root', 'globalStyles', _globalStylesId);
    const globalStylesConfig = {
      styles: globalStylesRecord?.styles ?? {},
      settings: globalStylesRecord?.settings ?? {}
    };

    // Determine if the global Styles are in use on the current site.
    const globalStylesInUse = !!(Object.keys(globalStylesConfig.styles).length || Object.keys(globalStylesConfig.settings).length);
    return {
      globalStylesInUse,
      globalStylesId: _globalStylesId
    };
  }, []);
}

/***/ }),

/***/ 8263:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ usePreview)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3832);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);





const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__;

function writeInterstitialMessage(targetDocument) {
  let markup = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.renderToString)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "editor-post-preview-button__interstitial-message"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 96 96"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
    className: "outer",
    d: "M48 12c19.9 0 36 16.1 36 36S67.9 84 48 84 12 67.9 12 48s16.1-36 36-36",
    fill: "none"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
    className: "inner",
    d: "M69.5 46.4c0-3.9-1.4-6.7-2.6-8.8-1.6-2.6-3.1-4.9-3.1-7.5 0-2.9 2.2-5.7 5.4-5.7h.4C63.9 19.2 56.4 16 48 16c-11.2 0-21 5.7-26.7 14.4h2.1c3.3 0 8.5-.4 8.5-.4 1.7-.1 1.9 2.4.2 2.6 0 0-1.7.2-3.7.3L40 67.5l7-20.9L42 33c-1.7-.1-3.3-.3-3.3-.3-1.7-.1-1.5-2.7.2-2.6 0 0 5.3.4 8.4.4 3.3 0 8.5-.4 8.5-.4 1.7-.1 1.9 2.4.2 2.6 0 0-1.7.2-3.7.3l11.5 34.3 3.3-10.4c1.6-4.5 2.4-7.8 2.4-10.5zM16.1 48c0 12.6 7.3 23.5 18 28.7L18.8 35c-1.7 4-2.7 8.4-2.7 13zm32.5 2.8L39 78.6c2.9.8 5.9 1.3 9 1.3 3.7 0 7.3-.6 10.6-1.8-.1-.1-.2-.3-.2-.4l-9.8-26.9zM76.2 36c0 3.2-.6 6.9-2.4 11.4L64 75.6c9.5-5.5 15.9-15.8 15.9-27.6 0-5.5-1.4-10.8-3.9-15.3.1 1 .2 2.1.2 3.3z",
    fill: "none"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('Generating preview…', 'full-site-editing'))));
  markup += `
		<style>
			body {
				margin: 0;
			}
			.editor-post-preview-button__interstitial-message {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100vh;
				width: 100vw;
			}
			@-webkit-keyframes paint {
				0% {
					stroke-dashoffset: 0;
				}
			}
			@-moz-keyframes paint {
				0% {
					stroke-dashoffset: 0;
				}
			}
			@-o-keyframes paint {
				0% {
					stroke-dashoffset: 0;
				}
			}
			@keyframes paint {
				0% {
					stroke-dashoffset: 0;
				}
			}
			.editor-post-preview-button__interstitial-message svg {
				width: 192px;
				height: 192px;
				stroke: #555d66;
				stroke-width: 0.75;
			}
			.editor-post-preview-button__interstitial-message svg .outer,
			.editor-post-preview-button__interstitial-message svg .inner {
				stroke-dasharray: 280;
				stroke-dashoffset: 280;
				-webkit-animation: paint 1.5s ease infinite alternate;
				-moz-animation: paint 1.5s ease infinite alternate;
				-o-animation: paint 1.5s ease infinite alternate;
				animation: paint 1.5s ease infinite alternate;
			}
			p {
				text-align: center;
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
			}
		</style>
	`;
  targetDocument.write(markup);
  targetDocument.title = __('Generating preview…', 'full-site-editing');
  targetDocument.close();
}
function usePreview() {
  const {
    currentPostLink,
    isAutosaveable,
    isDraft,
    isPostEditor,
    isLocked,
    isSaveable,
    previewLink
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const {
      getCurrentPostId,
      getCurrentPostAttribute,
      getEditedPostPreviewLink,
      isEditedPostAutosaveable,
      isEditedPostSaveable,
      isPostLocked,
      getEditedPostAttribute
    } = select('core/editor');
    return {
      currentPostLink: getCurrentPostAttribute('link'),
      isAutosaveable: isEditedPostAutosaveable(),
      isDraft: ['draft', 'auto-draft'].indexOf(getEditedPostAttribute('status')) !== -1,
      isLocked: isPostLocked(),
      isPostEditor: !select('core/edit-site') && !!getCurrentPostId(),
      isSaveable: isEditedPostSaveable(),
      previewLink: getEditedPostPreviewLink()
    };
  });
  const previewWindow = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    autosave,
    savePost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/editor');
  const previewPostWithoutCustomStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!isPostEditor) {
      return;
    }
    if (!previewWindow.current || previewWindow.current.closed) {
      previewWindow.current = window.open('', '_blank');
    }
    previewWindow.current.focus();
    if (!isAutosaveable || isLocked) {
      if (previewWindow.current && !previewWindow.current.closed) {
        previewWindow.current.location = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(previewLink || currentPostLink, {
          'hide-global-styles': ''
        });
      }
      return;
    }
    if (isDraft) {
      savePost({
        isPreview: true
      });
    } else {
      autosave({
        isPreview: true
      });
    }
    writeInterstitialMessage(previewWindow.current.document);
  }, [autosave, currentPostLink, isAutosaveable, isDraft, isLocked, isPostEditor, previewLink, savePost]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isPostEditor) {
      return;
    }
    if (previewWindow.current && previewLink && !previewWindow.current.closed) {
      previewWindow.current.location = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(previewLink, {
        'hide-global-styles': true
      });
    }
  }, [isPostEditor, previewLink]);
  return {
    previewPostWithoutCustomStyles,
    canPreviewPost: isSaveable
  };
}

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

/***/ 736:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// TODO: Revisit whether it is useful for the Desktop app to override the following properties:
// signup_url, login_url, logout_url and discover_logged_out_redirect_url

const config = {
  env: 'production',
  env_id: 'desktop',
  client_slug: 'desktop',
  readerFollowingSource: 'desktop',
  boom_analytics_key: 'desktop',
  google_recaptcha_site_key: '6LdoXcAUAAAAAM61KvdgP8xwnC19YuzAiOWn5Wtn'
};
const features = {
  desktop: true,
  'desktop-promo': false,
  'login/social-first': false,
  'sign-in-with-apple': false,
  // Note: there is also a sign-in-with-apple/redirect flag
  // that may/may not be relevant to override for the Desktop app.
  'signup/social': false,
  'signup/social-first': false,
  'login/magic-login': false,
  'bilmur-script': false
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data => {
  data = Object.assign(data, config);
  if (data.features) {
    data.features = Object.assign(data.features, features);
  }
  if (window.electron && window.electron.features) {
    data.features = Object.assign(data.features ?? {}, window.electron.features);
  }
  return data;
});

/***/ }),

/***/ 696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ol: () => (/* binding */ isEnabled)
/* harmony export */ });
/* unused harmony exports isCalypsoLive, enabledFeatures, enable, disable */
/* harmony import */ var _automattic_create_calypso_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5813);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3284);
/* harmony import */ var _desktop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(736);



/**
 * Manages config flags for various deployment builds
 * @module config/index
 */
if (false) {}
if (!window.configData) {
  if (false) {}
  window.configData = {};
}
const isDesktop = window.electron !== undefined;
let configData;
if (isDesktop) {
  configData = (0,_desktop__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(window.configData);
} else {
  configData = window.configData;
}

// calypso.live matches
// hash-abcd1234.calypso.live matches
// calypso.live.com doesn't match
const CALYPSO_LIVE_REGEX = /^([a-zA-Z0-9-]+\.)?calypso\.live$/;

// check if the current browser location is *.calypso.live
function isCalypsoLive() {
  return  true && CALYPSO_LIVE_REGEX.test(window.location.host);
}
function applyFlags(flagsString, modificationMethod) {
  const flags = flagsString.split(',');
  flags.forEach(flagRaw => {
    const flag = flagRaw.replace(/^[-+]/, '');
    const enabled = !/^-/.test(flagRaw);
    if (configData.features) {
      configData.features[flag] = enabled;
      // eslint-disable-next-line no-console
      console.log('%cConfig flag %s via %s: %s', 'font-weight: bold;', enabled ? 'enabled' : 'disabled', modificationMethod, flag);
    }
  });
}
const flagEnvironments = ['wpcalypso', 'horizon', 'stage', 'jetpack-cloud-stage', 'a8c-for-agencies-stage'];
if ( false || flagEnvironments.includes(configData.env_id) || isCalypsoLive()) {
  const cookies = cookie__WEBPACK_IMPORTED_MODULE_1__.parse(document.cookie);
  if (cookies.flags) {
    applyFlags(cookies.flags, 'cookie');
  }
  try {
    const session = window.sessionStorage.getItem('flags');
    if (session) {
      applyFlags(session, 'sessionStorage');
    }
  } catch (e) {
    // in private context, accessing session storage can throw
  }
  const match = document.location.search && document.location.search.match(/[?&]flags=([^&]+)(&|$)/);
  if (match) {
    applyFlags(decodeURIComponent(match[1]), 'URL');
  }
}
const configApi = (0,_automattic_create_calypso_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(configData);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (configApi)));
const isEnabled = configApi.isEnabled;
const enabledFeatures = configApi.enabledFeatures;
const enable = configApi.enable;
const disable = configApi.disable;

/***/ }),

/***/ 1421:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $5r: () => (/* binding */ FEATURE_WAF_V2),
/* harmony export */   $By: () => (/* binding */ FEATURE_ONE_CLICK_THREAT_RESOLUTION),
/* harmony export */   $lI: () => (/* binding */ FEATURE_ADVANCED_DESIGN_CUSTOMIZATION),
/* harmony export */   A6: () => (/* binding */ FEATURE_SENSEI_JETPACK),
/* harmony export */   AOP: () => (/* binding */ FEATURE_GOOGLE_ANALYTICS),
/* harmony export */   AR4: () => (/* binding */ FEATURE_EXTENSIONS),
/* harmony export */   BAE: () => (/* binding */ FEATURE_FREE_DOMAIN),
/* harmony export */   BFp: () => (/* binding */ FEATURE_SENSEI_UNLIMITED),
/* harmony export */   BGp: () => (/* binding */ FEATURE_PROMOTE_ON_TIKTOK),
/* harmony export */   Bb_: () => (/* binding */ FEATURE_FREE_WORDPRESS_THEMES),
/* harmony export */   BfV: () => (/* binding */ FEATURE_JETPACK_ESSENTIAL),
/* harmony export */   BoU: () => (/* binding */ FEATURE_PREMIUM_CUSTOMIZABE_THEMES),
/* harmony export */   Bof: () => (/* binding */ FEATURE_JETPACK_SOCIAL_BASIC_MONTHLY),
/* harmony export */   CD8: () => (/* binding */ FEATURE_ACTIVITY_LOG),
/* harmony export */   CFg: () => (/* binding */ FEATURE_PREMIUM_THEMES),
/* harmony export */   CN1: () => (/* binding */ FEATURE_UNLIMITED_PRODUCTS),
/* harmony export */   COw: () => (/* binding */ FEATURE_FREE_THEMES_SIGNUP),
/* harmony export */   CR9: () => (/* binding */ FEATURE_MANAGED_HOSTING),
/* harmony export */   CTo: () => (/* binding */ FEATURE_STORE_DESIGN),
/* harmony export */   Cf7: () => (/* binding */ FEATURE_SECURITY_VULNERABILITY_NOTIFICATIONS),
/* harmony export */   Ckc: () => (/* binding */ FEATURE_INTERNATIONAL_PAYMENTS),
/* harmony export */   Czl: () => (/* binding */ FEATURE_DYNAMIC_UPSELLS),
/* harmony export */   D6q: () => (/* binding */ FEATURE_JETPACK_PRODUCT_BACKUP),
/* harmony export */   D9A: () => (/* binding */ FEATURE_STREAMLINED_CHECKOUT),
/* harmony export */   DA$: () => (/* binding */ FEATURE_P2_UNLIMITED_USERS),
/* harmony export */   DF1: () => (/* binding */ WPCOM_FEATURES_ATOMIC),
/* harmony export */   DGp: () => (/* binding */ FEATURE_JETPACK_CRM),
/* harmony export */   DZs: () => (/* binding */ FEATURE_BACKUP_ARCHIVE_UNLIMITED),
/* harmony export */   Doi: () => (/* binding */ FEATURE_LIST_PRODUCTS_BY_BRAND),
/* harmony export */   DtW: () => (/* binding */ FEATURE_MANAGE),
/* harmony export */   Dw1: () => (/* binding */ FEATURE_JETPACK_SEARCH_MONTHLY),
/* harmony export */   DyV: () => (/* binding */ FEATURE_PAYMENT_BLOCKS),
/* harmony export */   EPC: () => (/* binding */ FEATURE_BEAUTIFUL_THEMES),
/* harmony export */   F2P: () => (/* binding */ FEATURE_OFFSITE_BACKUP_VAULTPRESS_REALTIME),
/* harmony export */   FHf: () => (/* binding */ FEATURE_P2_VIDEO_SHARING),
/* harmony export */   Faw: () => (/* binding */ FEATURE_GROUP_PAYMENT_TRANSACTION_FEES),
/* harmony export */   Fig: () => (/* binding */ FEATURE_WP_SUBDOMAIN_SIGNUP),
/* harmony export */   Fim: () => (/* binding */ FEATURE_REAL_TIME_ANALYTICS),
/* harmony export */   GNY: () => (/* binding */ FEATURE_SALES_REPORTS),
/* harmony export */   GRF: () => (/* binding */ FEATURE_NEWSLETTER_IMPORT_SUBSCRIBERS_FREE),
/* harmony export */   GlD: () => (/* binding */ FEATURE_ES_SEARCH_JP),
/* harmony export */   H$K: () => (/* binding */ FEATURE_UNLIMITED_SUBSCRIBERS),
/* harmony export */   H7I: () => (/* binding */ FEATURE_AUTOMATED_SALES_TAXES),
/* harmony export */   HIJ: () => (/* binding */ FEATURE_JETPACK_BACKUP_REALTIME_MONTHLY),
/* harmony export */   HKK: () => (/* binding */ FEATURE_VIDEOPRESS_JP),
/* harmony export */   HU_: () => (/* binding */ FEATURE_SECURITY_DDOS),
/* harmony export */   H_g: () => (/* binding */ FEATURE_JETPACK_PRODUCT_VIDEOPRESS),
/* harmony export */   Hc$: () => (/* binding */ FEATURE_SENSEI_SUPPORT),
/* harmony export */   HeJ: () => (/* binding */ FEATURE_JETPACK_BACKUP_DAILY_MONTHLY),
/* harmony export */   Isg: () => (/* binding */ FEATURE_PRODUCT_SCAN_REALTIME_V2),
/* harmony export */   ItL: () => (/* binding */ FEATURE_ALL_PERSONAL_FEATURES),
/* harmony export */   J2p: () => (/* binding */ FEATURE_JETPACK_CRM_MONTHLY),
/* harmony export */   JEu: () => (/* binding */ FEATURE_BACKUP_ARCHIVE_30),
/* harmony export */   JLP: () => (/* binding */ FEATURE_MEMBERSHIPS),
/* harmony export */   JUp: () => (/* binding */ FEATURE_CLOUD_CRITICAL_CSS),
/* harmony export */   JYj: () => (/* binding */ FEATURE_OFFSITE_BACKUP_VAULTPRESS_DAILY),
/* harmony export */   JZF: () => (/* binding */ FEATURE_FAST_SUPPORT_FROM_EXPERTS),
/* harmony export */   JZR: () => (/* binding */ FEATURE_200GB_STORAGE),
/* harmony export */   J_n: () => (/* binding */ FEATURE_JETPACK_BACKUP_T1_MONTHLY),
/* harmony export */   Jgn: () => (/* binding */ WPCOM_FEATURES_SCAN),
/* harmony export */   Jmr: () => (/* binding */ FEATURE_SELL_SHIP),
/* harmony export */   Jr$: () => (/* binding */ FEATURE_MALWARE_SCANNING_DAILY_AND_ON_DEMAND),
/* harmony export */   K5c: () => (/* binding */ FEATURE_SHARES_SOCIAL_MEDIA_JP),
/* harmony export */   KAl: () => (/* binding */ FEATURE_GIFT_CARDS),
/* harmony export */   KGH: () => (/* binding */ FEATURE_50GB_STORAGE),
/* harmony export */   KUL: () => (/* binding */ FEATURE_MARKETING_AUTOMATION),
/* harmony export */   KmN: () => (/* binding */ FEATURE_SITE_STAGING_SITES),
/* harmony export */   LHc: () => (/* binding */ FEATURE_SENSEI_STORAGE),
/* harmony export */   LHt: () => (/* binding */ FEATURE_SITE_ACTIVITY_LOG_JP),
/* harmony export */   LKS: () => (/* binding */ FEATURE_SECURITY_BRUTE_FORCE),
/* harmony export */   LUJ: () => (/* binding */ FEATURE_BACK_IN_STOCK_NOTIFICATIONS),
/* harmony export */   LVB: () => (/* binding */ FEATURE_ACCEPT_PAYMENTS_V2),
/* harmony export */   LhS: () => (/* binding */ FEATURE_EMAIL_MARKETING),
/* harmony export */   Lpb: () => (/* binding */ FEATURE_SITE_STATS),
/* harmony export */   M$n: () => (/* binding */ FEATURE_VIDEO_UPLOADS),
/* harmony export */   M7I: () => (/* binding */ FEATURE_ACCEPT_LOCAL_PAYMENTS),
/* harmony export */   MVP: () => (/* binding */ FEATURE_JETPACK_SCAN_DAILY_MONTHLY),
/* harmony export */   MZU: () => (/* binding */ FEATURE_NO_ADS),
/* harmony export */   MaF: () => (/* binding */ FEATURE_INVENTORY_MGMT),
/* harmony export */   MaQ: () => (/* binding */ FEATURE_FREE_BLOG_DOMAIN),
/* harmony export */   Mo5: () => (/* binding */ FEATURE_UPLOAD_THEMES),
/* harmony export */   MtP: () => (/* binding */ FEATURE_P2_ADVANCED_SEARCH),
/* harmony export */   N3t: () => (/* binding */ FEATURE_PAID_SUBSCRIBERS_JP),
/* harmony export */   NAz: () => (/* binding */ FEATURE_JETPACK_ANTI_SPAM_MONTHLY),
/* harmony export */   NBm: () => (/* binding */ FEATURE_PLUGIN_AUTOUPDATE_JP),
/* harmony export */   NI9: () => (/* binding */ WPCOM_FEATURES_PREMIUM_THEMES_LIMITED),
/* harmony export */   Ncs: () => (/* binding */ FEATURE_ADVERTISE_ON_GOOGLE),
/* harmony export */   Nno: () => (/* binding */ FEATURE_LIST_UNLIMITED_PRODUCTS),
/* harmony export */   NrG: () => (/* binding */ FEATURE_ALL_PREMIUM_FEATURES),
/* harmony export */   O2$: () => (/* binding */ FEATURE_REAL_TIME_SECURITY_SCANS),
/* harmony export */   O6g: () => (/* binding */ FEATURE_PAYPAL_JP),
/* harmony export */   OPf: () => (/* binding */ FEATURE_ALL_PREMIUM_FEATURES_JETPACK),
/* harmony export */   Ohd: () => (/* binding */ FEATURE_PRODUCT_SCAN_DAILY_V2),
/* harmony export */   Onf: () => (/* binding */ FEATURE_JETPACK_BOOST_MONTHLY),
/* harmony export */   OvS: () => (/* binding */ FEATURE_TIERED_STORAGE_PLANS_AVAILABLE),
/* harmony export */   P25: () => (/* binding */ FEATURE_ALWAYS_ONLINE),
/* harmony export */   P2_: () => (/* binding */ FEATURE_PRODUCT_BACKUP_DAILY_V2),
/* harmony export */   P44: () => (/* binding */ FEATURE_JETPACK_REAL_TIME_MALWARE_SCANNING),
/* harmony export */   QMR: () => (/* binding */ FEATURE_STANDARD_SECURITY_TOOLS),
/* harmony export */   QXs: () => (/* binding */ FEATURE_SECURITY_MALWARE),
/* harmony export */   Qcp: () => (/* binding */ FEATURE_UPTIME_MONITOR_JP),
/* harmony export */   Qqh: () => (/* binding */ WPCOM_FEATURES_INSTALL_PURCHASED_PLUGINS),
/* harmony export */   QuL: () => (/* binding */ FEATURE_COMMISSION_FEE_WOO_FEATURES),
/* harmony export */   QvK: () => (/* binding */ FEATURE_MIN_MAX_ORDER_QUANTITY),
/* harmony export */   R7Q: () => (/* binding */ FEATURE_COLLECT_PAYMENTS_V2),
/* harmony export */   RAq: () => (/* binding */ FEATURE_ONE_CLICK_RESTORE_V2),
/* harmony export */   R_9: () => (/* binding */ FEATURE_AUDIO_UPLOADS),
/* harmony export */   RkI: () => (/* binding */ FEATURE_STYLE_CUSTOMIZATION),
/* harmony export */   Rs_: () => (/* binding */ WPCOM_FEATURES_ANTISPAM),
/* harmony export */   S4e: () => (/* binding */ FEATURE_GOOGLE_ANALYTICS_V3),
/* harmony export */   SIm: () => (/* binding */ FEATURE_WP_UPDATES),
/* harmony export */   SQX: () => (/* binding */ FEATURE_PREMIUM_STORE_THEMES),
/* harmony export */   SyJ: () => (/* binding */ FEATURE_BLANK),
/* harmony export */   TEv: () => (/* binding */ FEATURE_6GB_STORAGE),
/* harmony export */   Tgp: () => (/* binding */ FEATURE_PREMIUM_CONTENT_BLOCK),
/* harmony export */   Tjc: () => (/* binding */ FEATURE_P2_3GB_STORAGE),
/* harmony export */   Tuf: () => (/* binding */ FEATURE_BANDWIDTH),
/* harmony export */   UjR: () => (/* binding */ FEATURE_JETPACK_BACKUP_T2_MONTHLY),
/* harmony export */   Uqd: () => (/* binding */ FEATURE_COMMISSION_FEE_STANDARD_FEATURES),
/* harmony export */   Uvw: () => (/* binding */ FEATURE_SENSEI_INTERACTIVE),
/* harmony export */   V82: () => (/* binding */ FEATURE_SENSEI_SELL_COURSES),
/* harmony export */   VX3: () => (/* binding */ FEATURE_ACTIVITY_LOG_1_YEAR_V2),
/* harmony export */   Vrh: () => (/* binding */ FEATURE_PREMIUM_SUPPORT),
/* harmony export */   Vy9: () => (/* binding */ FEATURE_EASY_SITE_MIGRATION),
/* harmony export */   W5X: () => (/* binding */ FEATURE_ADVANCED_SEO),
/* harmony export */   WI4: () => (/* binding */ FEATURE_WOOCOMMERCE_STORE),
/* harmony export */   WO2: () => (/* binding */ FEATURE_3GB_STORAGE),
/* harmony export */   WT$: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_0_WOO),
/* harmony export */   WcS: () => (/* binding */ FEATURE_JETPACK_BOOST),
/* harmony export */   WoS: () => (/* binding */ FEATURE_STATS_JP),
/* harmony export */   WtV: () => (/* binding */ FEATURE_COLLECT_PAYMENTS_LINK_IN_BIO),
/* harmony export */   XNd: () => (/* binding */ FEATURE_SEAMLESS_STAGING_PRODUCTION_SYNCING),
/* harmony export */   Xil: () => (/* binding */ FEATURE_SELL_EGIFTS_AND_VOUCHERS),
/* harmony export */   Xlo: () => (/* binding */ FEATURE_BULK_DISCOUNTS),
/* harmony export */   Xsf: () => (/* binding */ FEATURE_JETPACK_BACKUP_T0_YEARLY),
/* harmony export */   XuE: () => (/* binding */ FEATURE_DISCOUNTED_SHIPPING),
/* harmony export */   Xx6: () => (/* binding */ FEATURE_JETPACK_VIDEOPRESS_MONTHLY),
/* harmony export */   YQh: () => (/* binding */ FEATURE_INTEGRATED_SHIPMENT_TRACKING),
/* harmony export */   Y_U: () => (/* binding */ FEATURE_INVENTORY),
/* harmony export */   YgQ: () => (/* binding */ FEATURE_P2_13GB_STORAGE),
/* harmony export */   Ymf: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_8),
/* harmony export */   Ywz: () => (/* binding */ FEATURE_SOCIAL_MEDIA_TOOLS),
/* harmony export */   Z1x: () => (/* binding */ FEATURE_P2_PRIORITY_CHAT_EMAIL_SUPPORT),
/* harmony export */   ZIK: () => (/* binding */ FEATURE_DONATIONS_AND_TIPS_JP),
/* harmony export */   ZLu: () => (/* binding */ FEATURE_WOOCOMMERCE_HOSTING),
/* harmony export */   ZNU: () => (/* binding */ FEATURE_BACKUP_STORAGE_SPACE_UNLIMITED),
/* harmony export */   Zvm: () => (/* binding */ FEATURE_UNLIMITED_EMAILS),
/* harmony export */   ZxR: () => (/* binding */ FEATURE_TITAN_EMAIL),
/* harmony export */   ZzH: () => (/* binding */ WPCOM_FEATURES_BACKUPS),
/* harmony export */   _22: () => (/* binding */ FEATURE_HOSTING),
/* harmony export */   _5J: () => (/* binding */ FEATURE_JETPACK_1_YEAR_ARCHIVE_ACTIVITY_LOG),
/* harmony export */   _5w: () => (/* binding */ FEATURE_PLAN_SECURITY_DAILY),
/* harmony export */   _Qs: () => (/* binding */ FEATURE_WAF),
/* harmony export */   _nr: () => (/* binding */ FEATURE_JETPACK_SOCIAL_ADVANCED_BI_YEARLY),
/* harmony export */   _pA: () => (/* binding */ FEATURE_JETPACK_BACKUP_T0_MONTHLY),
/* harmony export */   _vw: () => (/* binding */ FEATURE_SITE_BACKUPS_AND_RESTORE),
/* harmony export */   a2z: () => (/* binding */ FEATURE_SCAN_V2),
/* harmony export */   aC2: () => (/* binding */ FEATURE_MONETISE),
/* harmony export */   aER: () => (/* binding */ FEATURE_WP_SUBDOMAIN),
/* harmony export */   aFM: () => (/* binding */ FEATURE_AUTOMATED_RESTORES),
/* harmony export */   aNF: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_0_ALL),
/* harmony export */   adL: () => (/* binding */ FEATURE_ALL_BUSINESS_FEATURES),
/* harmony export */   akF: () => (/* binding */ FEATURE_JETPACK_BACKUP_T1_BI_YEARLY),
/* harmony export */   b1C: () => (/* binding */ FEATURE_PAYMENT_BUTTONS_JP),
/* harmony export */   b9l: () => (/* binding */ FEATURE_POST_EDITS_HISTORY),
/* harmony export */   bA6: () => (/* binding */ FEATURE_DISPLAY_PRODUCTS_BRAND),
/* harmony export */   bMh: () => (/* binding */ FEATURE_PRIORITY_24_7_SUPPORT),
/* harmony export */   bUN: () => (/* binding */ FEATURE_MARKETPLACE_SYNC_SOCIAL_MEDIA_INTEGRATION),
/* harmony export */   bW1: () => (/* binding */ FEATURE_MULTI_SITE),
/* harmony export */   ba_: () => (/* binding */ FEATURE_P2_UNLIMITED_POSTS_PAGES),
/* harmony export */   bnw: () => (/* binding */ FEATURE_SFTP_DATABASE),
/* harmony export */   boO: () => (/* binding */ FEATURE_CRM_V2),
/* harmony export */   bw5: () => (/* binding */ FEATURE_JETPACK_1TB_BACKUP_STORAGE),
/* harmony export */   ceT: () => (/* binding */ FEATURE_PRODUCT_RECOMMENDATIONS),
/* harmony export */   ch3: () => (/* binding */ FEATURE_PREMIUM_CONTENT_JP),
/* harmony export */   d4e: () => (/* binding */ FEATURE_ECOMMERCE_MARKETING),
/* harmony export */   dBh: () => (/* binding */ FEATURE_AD_FREE_EXPERIENCE),
/* harmony export */   dIT: () => (/* binding */ FEATURE_PRODUCT_BACKUP_REALTIME_V2),
/* harmony export */   dZJ: () => (/* binding */ FEATURE_P2_CUSTOMIZATION_OPTIONS),
/* harmony export */   dut: () => (/* binding */ FEATURE_JETPACK_BACKUP_T2_YEARLY),
/* harmony export */   e00: () => (/* binding */ FEATURE_UPLOAD_PLUGINS),
/* harmony export */   e5F: () => (/* binding */ FEATURE_USERS),
/* harmony export */   e7t: () => (/* binding */ FEATURE_REALTIME_BACKUPS_JP),
/* harmony export */   e7z: () => (/* binding */ FEATURE_CONNECT_WITH_FACEBOOK),
/* harmony export */   eAf: () => (/* binding */ FEATURE_EMAIL_FORWARDING_EXTENDED_LIMIT),
/* harmony export */   eCG: () => (/* binding */ FEATURE_BURST),
/* harmony export */   eYY: () => (/* binding */ FEATURE_EARN_AD),
/* harmony export */   emy: () => (/* binding */ FEATURE_SEO_PREVIEW_TOOLS),
/* harmony export */   fPv: () => (/* binding */ FEATURE_ABANDONED_CART_RECOVERY),
/* harmony export */   fZL: () => (/* binding */ FEATURE_WOOCOMMERCE_MOBILE_APP),
/* harmony export */   fcV: () => (/* binding */ FEATURE_COMMUNITY_SUPPORT),
/* harmony export */   fgV: () => (/* binding */ FEATURE_LIVE_SHIPPING_RATES),
/* harmony export */   fls: () => (/* binding */ FEATURE_P2_MORE_FILE_TYPES),
/* harmony export */   fv4: () => (/* binding */ FEATURE_JETPACK_SOCIAL_ADVANCED),
/* harmony export */   g9: () => (/* binding */ FEATURE_JETPACK_SOCIAL_BASIC_BI_YEARLY),
/* harmony export */   gH7: () => (/* binding */ FEATURE_ACCEPT_PAYMENTS),
/* harmony export */   gOt: () => (/* binding */ FEATURE_JETPACK_BACKUP_T1_YEARLY),
/* harmony export */   gQ2: () => (/* binding */ FEATURE_ADVANCED_SEO_TOOLS),
/* harmony export */   gbu: () => (/* binding */ FEATURE_AUTOMATIC_SALES_TAX),
/* harmony export */   gmv: () => (/* binding */ FEATURE_PRINT_SHIPPING_LABELS),
/* harmony export */   hQm: () => (/* binding */ FEATURE_UPLOAD_THEMES_PLUGINS),
/* harmony export */   hS1: () => (/* binding */ FEATURE_BACKUP_REALTIME_V2),
/* harmony export */   hVU: () => (/* binding */ FEATURE_GOOGLE_MY_BUSINESS),
/* harmony export */   hXr: () => (/* binding */ FEATURE_INTEGRATED_PAYMENTS),
/* harmony export */   hjj: () => (/* binding */ FEATURE_BACKUP_DAILY_V2),
/* harmony export */   iAz: () => (/* binding */ FEATURE_ISOLATED_INFRA),
/* harmony export */   iNP: () => (/* binding */ FEATURE_SENSEI_HOSTING),
/* harmony export */   iPI: () => (/* binding */ FEATURE_CHECKOUT),
/* harmony export */   iQ_: () => (/* binding */ FEATURE_STATS_PAID),
/* harmony export */   irI: () => (/* binding */ FEATURE_SIMPLE_PAYMENTS),
/* harmony export */   ix8: () => (/* binding */ FEATURE_JETPACK_SCAN_DAILY),
/* harmony export */   j58: () => (/* binding */ FEATURE_PLUGINS_THEMES),
/* harmony export */   j6z: () => (/* binding */ FEATURE_CUSTOM_STORE),
/* harmony export */   jM: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_2_REGULAR),
/* harmony export */   jO_: () => (/* binding */ FEATURE_JETPACK_BOOST_BI_YEARLY),
/* harmony export */   jPE: () => (/* binding */ FEATURE_NO_BRANDING),
/* harmony export */   jdY: () => (/* binding */ FEATURE_NEWSLETTERS_RSS),
/* harmony export */   jiF: () => (/* binding */ FEATURE_UNLTD_SOCIAL_MEDIA_JP),
/* harmony export */   jwP: () => (/* binding */ FEATURE_PRODUCT_BUNDLES),
/* harmony export */   k4q: () => (/* binding */ FEATURE_OFFER_BULK_DISCOUNTS),
/* harmony export */   kPp: () => (/* binding */ FEATURE_ADVANCED_SEO_EXPANDED_ABBR),
/* harmony export */   kSO: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_0),
/* harmony export */   kYS: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_4),
/* harmony export */   kb1: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_2),
/* harmony export */   kbH: () => (/* binding */ PREMIUM_DESIGN_FOR_STORES),
/* harmony export */   kbI: () => (/* binding */ FEATURE_SELL_60_COUNTRIES),
/* harmony export */   kgl: () => (/* binding */ FEATURE_CUSTOM_DOMAIN),
/* harmony export */   ko5: () => (/* binding */ FEATURE_PAGES),
/* harmony export */   kzF: () => (/* binding */ FEATURE_JETPACK_VIDEOPRESS_BI_YEARLY),
/* harmony export */   l1X: () => (/* binding */ FEATURE_JETPACK_ANTI_SPAM),
/* harmony export */   l58: () => (/* binding */ FEATURE_SYNC_WITH_PINTEREST),
/* harmony export */   l5Q: () => (/* binding */ FEATURE_UNLIMITED_TRAFFIC),
/* harmony export */   lIm: () => (/* binding */ FEATURE_SMART_REDIRECTS),
/* harmony export */   lS7: () => (/* binding */ FEATURE_CPUS),
/* harmony export */   lW1: () => (/* binding */ FEATURE_DEV_TOOLS),
/* harmony export */   lu6: () => (/* binding */ FEATURE_AUTOMATED_BACKUPS_SECURITY_SCAN),
/* harmony export */   lwq: () => (/* binding */ FEATURE_JETPACK_BACKUP_REALTIME),
/* harmony export */   m38: () => (/* binding */ FEATURE_STOCK_NOTIFS),
/* harmony export */   m51: () => (/* binding */ FEATURE_INSTALL_PLUGINS),
/* harmony export */   mEY: () => (/* binding */ FEATURE_SHIPPING_CARRIERS),
/* harmony export */   mT$: () => (/* binding */ FEATURE_SHIPPING_INTEGRATIONS),
/* harmony export */   nYV: () => (/* binding */ FEATURE_WORDPRESS_CMS),
/* harmony export */   ndR: () => (/* binding */ FEATURE_SENSEI_QUIZZES),
/* harmony export */   nh1: () => (/* binding */ FEATURE_AUTOMATED_EMAIL_TRIGGERS),
/* harmony export */   njy: () => (/* binding */ FEATURE_RECOMMEND_ADD_ONS),
/* harmony export */   oIC: () => (/* binding */ FEATURE_WORDADS_INSTANT),
/* harmony export */   ow: () => (/* binding */ FEATURE_P2_ACTIVITY_OVERVIEW),
/* harmony export */   ozR: () => (/* binding */ FEATURE_PRODUCT_ADD_ONS),
/* harmony export */   p0N: () => (/* binding */ FEATURE_FREE_SSL_CERTIFICATE),
/* harmony export */   pJg: () => (/* binding */ FEATURE_JETPACK_SOCIAL_ADVANCED_MONTHLY),
/* harmony export */   pX_: () => (/* binding */ FEATURE_TRAFFIC_TOOLS),
/* harmony export */   pbK: () => (/* binding */ FEATURE_BLOG_DOMAIN),
/* harmony export */   pt9: () => (/* binding */ FEATURE_SPAM_AKISMET_PLUS),
/* harmony export */   q6q: () => (/* binding */ FEATURE_P2_SIMPLE_SEARCH),
/* harmony export */   qCK: () => (/* binding */ FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY),
/* harmony export */   qCV: () => (/* binding */ FEATURE_CONTACT_FORM_JP),
/* harmony export */   qRK: () => (/* binding */ FEATURE_CUSTOM_ORDER_EMAILS),
/* harmony export */   qot: () => (/* binding */ FEATURE_DATACENTRE_FAILOVER),
/* harmony export */   r_P: () => (/* binding */ FEATURE_ADD_UNLIMITED_LINKS),
/* harmony export */   rag: () => (/* binding */ FEATURE_JETPACK_VIDEOPRESS),
/* harmony export */   sPj: () => (/* binding */ FEATURE_AUTOMATIC_SECURITY_FIXES),
/* harmony export */   sWw: () => (/* binding */ FEATURE_WOOCOMMERCE),
/* harmony export */   sgf: () => (/* binding */ FEATURE_1GB_STORAGE),
/* harmony export */   siL: () => (/* binding */ FEATURE_JETPACK_SEARCH_BI_YEARLY),
/* harmony export */   snK: () => (/* binding */ FEATURE_ANTISPAM_V2),
/* harmony export */   swD: () => (/* binding */ FEATURE_CLOUDFLARE_ANALYTICS),
/* harmony export */   tDt: () => (/* binding */ FEATURE_ALL_FREE_FEATURES_JETPACK),
/* harmony export */   tdE: () => (/* binding */ FEATURE_JETPACK_SOCIAL_BASIC),
/* harmony export */   tx2: () => (/* binding */ FEATURE_JETPACK_30_DAY_ARCHIVE_ACTIVITY_LOG),
/* harmony export */   uFG: () => (/* binding */ FEATURE_CART_ABANDONMENT_EMAILS),
/* harmony export */   uGw: () => (/* binding */ WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED),
/* harmony export */   uVr: () => (/* binding */ FEATURE_UNLIMITED_ADMINS),
/* harmony export */   uXB: () => (/* binding */ FEATURE_ASSEMBLED_KITS),
/* harmony export */   u_9: () => (/* binding */ FEATURE_WORDPRESS_MOBILE_APP),
/* harmony export */   uoN: () => (/* binding */ FEATURE_FAST_DNS),
/* harmony export */   ur7: () => (/* binding */ FEATURE_SEO_JP),
/* harmony export */   vCo: () => (/* binding */ FEATURE_FREE_THEMES),
/* harmony export */   vQx: () => (/* binding */ FEATURE_PAYMENT_TRANSACTION_FEES_10),
/* harmony export */   vbh: () => (/* binding */ FEATURE_THE_READER),
/* harmony export */   vkJ: () => (/* binding */ FEATURE_UNLIMITED_PRODUCTS_SERVICES),
/* harmony export */   vrw: () => (/* binding */ FEATURE_JETPACK_BACKUP_DAILY),
/* harmony export */   vz3: () => (/* binding */ FEATURE_GLOBAL_EDGE_CACHING),
/* harmony export */   wIu: () => (/* binding */ FEATURE_ALL_FREE_FEATURES),
/* harmony export */   whx: () => (/* binding */ FEATURE_REPUBLICIZE),
/* harmony export */   xEy: () => (/* binding */ FEATURE_RECURRING_PAYMENTS),
/* harmony export */   xj: () => (/* binding */ FEATURE_PRODUCT_SEARCH_V2),
/* harmony export */   xoQ: () => (/* binding */ FEATURE_13GB_STORAGE),
/* harmony export */   xpj: () => (/* binding */ FEATURE_MALWARE_SCANNING_DAILY),
/* harmony export */   xq9: () => (/* binding */ FEATURE_CDN),
/* harmony export */   xsQ: () => (/* binding */ FEATURE_JETPACK_SEARCH),
/* harmony export */   xt: () => (/* binding */ FEATURE_JETPACK_ADVANCED),
/* harmony export */   y$v: () => (/* binding */ FEATURE_AI_ASSISTED_PRODUCT_DESCRIPTION),
/* harmony export */   y33: () => (/* binding */ FEATURE_SPAM_JP),
/* harmony export */   yCc: () => (/* binding */ FEATURE_JETPACK_ALL_BACKUP_SECURITY_FEATURES),
/* harmony export */   yD$: () => (/* binding */ FEATURE_LTD_SOCIAL_MEDIA_JP),
/* harmony export */   yT6: () => (/* binding */ FEATURE_SELL_INTERNATIONALLY),
/* harmony export */   yks: () => (/* binding */ FEATURE_WORDADS),
/* harmony export */   yqq: () => (/* binding */ FEATURE_CUSTOM_MARKETING_AUTOMATION),
/* harmony export */   zTG: () => (/* binding */ FEATURE_VIDEO_UPLOADS_JETPACK_PRO)
/* harmony export */ });
/* unused harmony exports FEATURE_SET_PRIMARY_CUSTOM_DOMAIN, FEATURE_LEGACY_STORAGE_200GB, FEATURE_UNLIMITED_STORAGE, EXPERT_SUPPORT_ALL_DAYS, FEATURE_SFTP, FEATURE_SSH, FEATURE_VIDEO_UPLOADS_JETPACK_PREMIUM, FEATURE_INSTALL_THEMES, FEATURE_PERFORMANCE, FEATURE_ALL_PERSONAL_FEATURES_JETPACK, FEATURE_DONATIONS, FEATURE_PREMIUM_CONTENT_CONTAINER, FEATURE_SECURITY_SETTINGS, FEATURE_WOOP, FEATURE_STATS_FREE, FEATURE_SEARCH, FEATURE_SEARCH_V2, FEATURE_VIDEO_HOSTING_V2, FEATURE_CRM_INTEGRATED_WITH_WORDPRESS, FEATURE_CRM_LEADS_AND_FUNNEL, FEATURE_CRM_PROPOSALS_AND_INVOICES, FEATURE_CRM_TRACK_TRANSACTIONS, FEATURE_CRM_NO_CONTACT_LIMITS, FEATURE_SECURE_STORAGE_V2, FEATURE_ONE_CLICK_FIX_V2, FEATURE_INSTANT_EMAIL_V2, FEATURE_AKISMET_V2, FEATURE_SPAM_BLOCK_V2, FEATURE_SPAM_10K_PER_MONTH, FEATURE_FILTERING_V2, FEATURE_LANGUAGE_SUPPORT_V2, FEATURE_SPELLING_CORRECTION_V2, FEATURE_SUPPORTS_WOOCOMMERCE_V2, FEATURE_JETPACK_SCAN_BI_YEARLY, FEATURE_JETPACK_VIDEOPRESS_EDITOR, FEATURE_JETPACK_VIDEOPRESS_STORAGE, FEATURE_JETPACK_VIDEOPRESS_UNBRANDED, FEATURE_JETPACK_SOCIAL_V1_YEARLY, FEATURE_JETPACK_SOCIAL_V1_MONTHLY, FEATURE_JETPACK_SOCIAL_V1_BI_YEARLY, FEATURE_SOCIAL_AUTO_SHARE, FEATURE_SOCIAL_SHARES_1000, FEATURE_SOCIAL_IMAGE_GENERATOR, FEATURE_SOCIAL_ENHANCED_PUBLISHING, FEATURE_SOCIAL_THREADS_CONNECTION, FEATURE_JETPACK_MONITOR_MONTHLY, FEATURE_JETPACK_MONITOR_YEARLY, FEATURE_MONITOR_1_MINUTE_CHECK_INTERVAL, FEATURE_MONITOR_MULTIPLE_EMAIL_RECIPIENTS, FEATURE_MONITOR_SMS_NOTIFICATIONS, FEATURE_JETPACK_1GB_BACKUP_STORAGE, FEATURE_JETPACK_10GB_BACKUP_STORAGE, FEATURE_JETPACK_REAL_TIME_CLOUD_BACKUPS, FEATURE_UNLIMITED_USERS, FEATURE_UNLIMITED_POSTS_PAGES, FEATURE_ADDITIONAL_SITES, WPCOM_FEATURES_AI_ASSISTANT, WPCOM_FEATURES_AKISMET, WPCOM_FEATURES_BACKUPS_RESTORE, WPCOM_FEATURES_CDN, WPCOM_FEATURES_CLASSIC_SEARCH, WPCOM_FEATURES_CLOUDFLARE_CDN, WPCOM_FEATURES_COPY_SITE, WPCOM_FEATURES_FULL_ACTIVITY_LOG, WPCOM_FEATURES_INSTALL_PLUGINS, WPCOM_FEATURES_INSTANT_SEARCH, WPCOM_FEATURES_LIVE_SUPPORT, WPCOM_FEATURES_MANAGE_PLUGINS, WPCOM_FEATURES_NO_ADVERTS, WPCOM_FEATURES_NO_WPCOM_BRANDING, WPCOM_FEATURES_PRIORITY_SUPPORT, WPCOM_FEATURES_REAL_TIME_BACKUPS, WPCOM_FEATURES_SCHEDULED_UPDATES, WPCOM_FEATURES_SEO_PREVIEW_TOOLS, WPCOM_FEATURES_SUBSCRIPTION_GIFTING, WPCOM_FEATURES_LOCKED_MODE, WPCOM_FEATURES_LEGACY_CONTACT, WPCOM_FEATURES_UPLOAD_AUDIO_FILES, WPCOM_FEATURES_UPLOAD_PLUGINS, WPCOM_FEATURES_UPLOAD_VIDEO_FILES, WPCOM_FEATURES_VAULTPRESS_BACKUPS, WPCOM_FEATURES_VIDEOPRESS, WPCOM_FEATURES_VIDEOPRESS_UNLIMITED_STORAGE, WPCOM_FEATURES_VIDEO_HOSTING, WPCOM_FEATURES_WORDADS, WPCOM_FEATURES_CUSTOM_DESIGN, WPCOM_FEATURES_GLOBAL_STYLES, WPCOM_FEATURES_SITE_PREVIEW_LINKS, FEATURE_IMPORT_SUBSCRIBERS, FEATURE_ADD_MULTIPLE_PAGES_NEWSLETTER, FEATURE_COLLECT_PAYMENTS_NEWSLETTER, FEATURE_POST_BY_EMAIL, FEATURE_GOOGLE_ANALYTICS_V2, FEATURE_CUSTOMIZE_THEMES_BUTTONS_COLORS, FEATURE_TRACK_VIEWS_CLICKS, FEATURE_DESIGN_TOOLS, FEATURE_REFERRAL_PROGRAMS, FEATURE_CUSTOMER_BIRTHDAY_EMAILS, FEATURE_LOYALTY_POINTS_PROGRAMS, FEATURE_ASSEMBLED_PRODUCTS_AND_KITS, FEATURE_BRUTE_PROTECT_JP, FEATURE_AUTOMATTIC_DATACENTER_FAILOVER, FEATURE_CUSTOM_PRODUCT_KITS, FEATURE_TYPE_JETPACK_ANTI_SPAM, FEATURE_TYPE_JETPACK_ACTIVITY_LOG, FEATURE_TYPE_JETPACK_BACKUP, FEATURE_TYPE_JETPACK_BOOST, FEATURE_TYPE_JETPACK_SCAN, FEATURE_TYPE_JETPACK_SOCIAL, FEATURE_TYPE_JETPACK_SEARCH, FEATURE_TYPE_JETPACK_STATS, FEATURE_TYPE_JETPACK_VIDEOPRESS */
/* harmony import */ var _jetpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6090);

const FEATURE_WP_SUBDOMAIN = 'wordpress-subdomain';
const FEATURE_BLOG_DOMAIN = 'blog-domain';
const FEATURE_CUSTOM_DOMAIN = 'custom-domain';
const FEATURE_SET_PRIMARY_CUSTOM_DOMAIN = 'set-primary-custom-domain';
const FEATURE_JETPACK_ESSENTIAL = 'jetpack-essential';
const FEATURE_JETPACK_ADVANCED = 'jetpack-advanced';
const FEATURE_FREE_THEMES = 'free-themes';
const FEATURE_1GB_STORAGE = '1gb-storage';
const FEATURE_3GB_STORAGE = '3gb-storage';
const FEATURE_6GB_STORAGE = '6gb-storage';
const FEATURE_13GB_STORAGE = '13gb-storage';
const FEATURE_50GB_STORAGE = '50gb-storage';
const FEATURE_200GB_STORAGE = '200gb-storage';
const FEATURE_LEGACY_STORAGE_200GB = 'upload-space-200gb';
const FEATURE_UNLIMITED_STORAGE = 'unlimited-storage';
const FEATURE_COMMUNITY_SUPPORT = 'community-support';
const EXPERT_SUPPORT_ALL_DAYS = 'expert-support-all-days';
const FEATURE_EMAIL_FORWARDING_EXTENDED_LIMIT = 'email-forwarding-extended-limit';
const FEATURE_PREMIUM_SUPPORT = 'priority-support';
const FEATURE_GOOGLE_ANALYTICS = 'google-analytics';
const FEATURE_CLOUDFLARE_ANALYTICS = 'cloudflare-analytics';
const FEATURE_GOOGLE_MY_BUSINESS = 'google-my-business';
const FEATURE_SFTP = 'sftp';
const FEATURE_SSH = 'ssh';
const FEATURE_SITE_STAGING_SITES = 'staging-sites';
const FEATURE_SEAMLESS_STAGING_PRODUCTION_SYNCING = 'seamless-staging-production-syncing';
const FEATURE_NO_ADS = 'no-adverts';
const FEATURE_VIDEO_UPLOADS = 'video-upload';
const FEATURE_VIDEO_UPLOADS_JETPACK_PREMIUM = 'video-upload-jetpack-premium';
const FEATURE_VIDEO_UPLOADS_JETPACK_PRO = 'video-upload-jetpack-pro';
const FEATURE_AUDIO_UPLOADS = 'audio-upload';
const FEATURE_WORDADS_INSTANT = 'wordads-instant';
const FEATURE_NO_BRANDING = 'no-wp-branding';
const FEATURE_ADVANCED_SEO = 'advanced-seo';
const FEATURE_UPLOAD_PLUGINS = 'upload-plugins';
const FEATURE_INSTALL_PLUGINS = 'install-plugins';
const FEATURE_INSTALL_THEMES = 'install-themes';
const FEATURE_UPLOAD_THEMES = 'upload-themes';
const FEATURE_PERFORMANCE = 'performance';
const FEATURE_REPUBLICIZE = 'republicize';
const FEATURE_SIMPLE_PAYMENTS = 'simple-payments';
const FEATURE_ALL_FREE_FEATURES = 'all-free-features';
const FEATURE_ALL_FREE_FEATURES_JETPACK = 'all-free-features-jetpack';
const FEATURE_ALL_PERSONAL_FEATURES = 'all-personal-features';
const FEATURE_ALL_PERSONAL_FEATURES_JETPACK = 'all-personal-features-jetpack';
const FEATURE_ALL_PREMIUM_FEATURES = 'all-premium-features';
const FEATURE_ALL_PREMIUM_FEATURES_JETPACK = 'all-premium-features-jetpack';
const FEATURE_ADVANCED_DESIGN_CUSTOMIZATION = 'advanced-design-customization';
const FEATURE_UPLOAD_THEMES_PLUGINS = 'upload-themes-and-plugins';
const FEATURE_FREE_DOMAIN = 'free-custom-domain';
const FEATURE_FREE_BLOG_DOMAIN = 'free-blog-domain';
const FEATURE_MONETISE = 'monetise-your-site';
const FEATURE_EARN_AD = 'earn-ad-revenue';
const FEATURE_WP_SUBDOMAIN_SIGNUP = 'wordpress-subdomain-signup';
const FEATURE_ADVANCED_SEO_TOOLS = 'advanced-seo-tools';
const FEATURE_ADVANCED_SEO_EXPANDED_ABBR = 'advanced-seo-expanded-abbreviation';
const FEATURE_FREE_THEMES_SIGNUP = 'free-themes-signup';
const FEATURE_MEMBERSHIPS = 'memberships';
const FEATURE_DONATIONS = 'donations';
const FEATURE_RECURRING_PAYMENTS = 'recurring-payments';
// This is a legacy alias, FEATURE_PREMIUM_CONTENT_CONTAINER should be used instead.
const FEATURE_PREMIUM_CONTENT_BLOCK = 'premium-content-block';
const FEATURE_PREMIUM_CONTENT_CONTAINER = 'premium-content/container';
const FEATURE_HOSTING = 'hosting';
const PREMIUM_DESIGN_FOR_STORES = 'premium-design-for-stores';
const FEATURE_SFTP_DATABASE = 'sftp-and-database-access';
const FEATURE_SITE_BACKUPS_AND_RESTORE = 'site-backups-and-restore';
const FEATURE_SECURITY_SETTINGS = 'security-settings';
const FEATURE_WOOP = 'woop';
/*
 * TODO: To avoid confusion, this constant value should be renamed to `premium-themes` after
 * `WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED` has been renamed to `premium-themes-unlimited`
 * (see comment below).
 */
const FEATURE_PREMIUM_THEMES = 'premium-themes-v3';
const FEATURE_STATS_PAID = 'stats-paid';
const FEATURE_STATS_FREE = 'stats-free';

// Jetpack features constants
const FEATURE_BLANK = 'blank-feature';
const FEATURE_STANDARD_SECURITY_TOOLS = 'standard-security-tools';
const FEATURE_SITE_STATS = 'site-stats';
const FEATURE_TRAFFIC_TOOLS = 'traffic-tools';
const FEATURE_MANAGE = 'jetpack-manage';
const FEATURE_SPAM_AKISMET_PLUS = 'spam-akismet-plus';
const FEATURE_OFFSITE_BACKUP_VAULTPRESS_DAILY = 'offsite-backup-vaultpress-daily';
const FEATURE_OFFSITE_BACKUP_VAULTPRESS_REALTIME = 'offsite-backup-vaultpress-realtime';
const FEATURE_BACKUP_ARCHIVE_30 = 'backup-archive-30';
const FEATURE_BACKUP_ARCHIVE_UNLIMITED = 'backup-archive-unlimited';
const FEATURE_BACKUP_STORAGE_SPACE_UNLIMITED = 'backup-storage-space-unlimited';
const FEATURE_AUTOMATED_RESTORES = 'automated-restores';
const FEATURE_EASY_SITE_MIGRATION = 'easy-site-migration';
const FEATURE_MALWARE_SCANNING_DAILY = 'malware-scanning-daily';
const FEATURE_MALWARE_SCANNING_DAILY_AND_ON_DEMAND = 'malware-scanning-daily-and-on-demand';
const FEATURE_ONE_CLICK_THREAT_RESOLUTION = 'one-click-threat-resolution';
const FEATURE_AUTOMATIC_SECURITY_FIXES = 'automatic-security-fixes';
const FEATURE_ACTIVITY_LOG = 'site-activity-log';
const FEATURE_FREE_WORDPRESS_THEMES = 'free-wordpress-themes';
const FEATURE_SEO_PREVIEW_TOOLS = 'seo-preview-tools';
const FEATURE_SEARCH = 'search';
const FEATURE_ACCEPT_PAYMENTS = 'accept-payments';
const FEATURE_SHIPPING_CARRIERS = 'shipping-carriers';
const FEATURE_UNLIMITED_PRODUCTS_SERVICES = 'unlimited-products-service';
const FEATURE_ECOMMERCE_MARKETING = 'ecommerce-marketing';
const FEATURE_PREMIUM_CUSTOMIZABE_THEMES = 'premium-customizable-themes';
const FEATURE_ALL_BUSINESS_FEATURES = 'all-business-features';
const FEATURE_BACKUP_DAILY_V2 = 'backup-daily-v2';
const FEATURE_BACKUP_REALTIME_V2 = 'backup-realtime-v2';
const FEATURE_PRODUCT_BACKUP_DAILY_V2 = 'product-backup-daily-v2';
const FEATURE_PRODUCT_BACKUP_REALTIME_V2 = 'product-backup-realtime-v2';
const FEATURE_SCAN_V2 = 'scan-v2';
const FEATURE_PRODUCT_SCAN_DAILY_V2 = 'product-scan-daily-v2';
const FEATURE_PRODUCT_SCAN_REALTIME_V2 = 'product-scan-realtime-v2';
const FEATURE_ANTISPAM_V2 = 'antispam-v2';
const FEATURE_WAF = 'waf';
const FEATURE_ACTIVITY_LOG_1_YEAR_V2 = 'activity-log-1-year-v2';
const FEATURE_SEARCH_V2 = 'search-v2';
const FEATURE_PRODUCT_SEARCH_V2 = 'product-search-v2';
const FEATURE_PLAN_SECURITY_DAILY = 'security-daily';
const FEATURE_VIDEO_HOSTING_V2 = 'video-hosting-v2';
const FEATURE_CRM_V2 = 'crm-v2';
const FEATURE_CRM_INTEGRATED_WITH_WORDPRESS = 'crm-integrated-with-wordpress';
const FEATURE_CRM_LEADS_AND_FUNNEL = 'crm-leads-and-funnel';
const FEATURE_CRM_PROPOSALS_AND_INVOICES = 'crm-proposals-and-invoices';
const FEATURE_CRM_TRACK_TRANSACTIONS = 'crm-track-transactions';
const FEATURE_CRM_NO_CONTACT_LIMITS = 'crm-no-contact-limits';
const FEATURE_COLLECT_PAYMENTS_V2 = 'collect-payments-v2';
const FEATURE_SECURE_STORAGE_V2 = 'secure-storage-v2';
const FEATURE_ONE_CLICK_RESTORE_V2 = 'one-click-restore-v2';
const FEATURE_ONE_CLICK_FIX_V2 = 'one-click-fix-v2';
const FEATURE_INSTANT_EMAIL_V2 = 'instant-email-v2';
const FEATURE_AKISMET_V2 = 'akismet-v2';
const FEATURE_SPAM_BLOCK_V2 = 'spam-block-v2';
const FEATURE_SPAM_10K_PER_MONTH = 'spam-block-10k';
const FEATURE_FILTERING_V2 = 'filtering-v2';
const FEATURE_LANGUAGE_SUPPORT_V2 = 'language-support-v2';
const FEATURE_SPELLING_CORRECTION_V2 = 'spelling-correction-v2';
const FEATURE_SUPPORTS_WOOCOMMERCE_V2 = 'supports-woocommerce-v2';
const FEATURE_JETPACK_BACKUP_DAILY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_DAILY */ .QwW;
const FEATURE_JETPACK_BACKUP_DAILY_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY */ .Siv;
const FEATURE_JETPACK_BACKUP_REALTIME = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_REALTIME */ .Gm4;
const FEATURE_JETPACK_BACKUP_REALTIME_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY */ .Gt$;
const FEATURE_JETPACK_BACKUP_T0_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_T0_YEARLY */ .Q$E;
const FEATURE_JETPACK_BACKUP_T0_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_T0_MONTHLY */ .Hsb;
const FEATURE_JETPACK_BACKUP_T1_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_T1_YEARLY */ .FID;
const FEATURE_JETPACK_BACKUP_T1_BI_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_T1_BI_YEARLY */ .$r5;
const FEATURE_JETPACK_BACKUP_T1_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_T1_MONTHLY */ .CSg;
const FEATURE_JETPACK_BACKUP_T2_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_T2_YEARLY */ .KJ0;
const FEATURE_JETPACK_BACKUP_T2_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BACKUP_T2_MONTHLY */ .VK;
const FEATURE_JETPACK_SCAN_BI_YEARLY = (/* unused pure expression or super */ null && (PRODUCT_JETPACK_SCAN_BI_YEARLY));
const FEATURE_JETPACK_SCAN_DAILY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SCAN */ .lBi;
const FEATURE_JETPACK_SCAN_DAILY_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SCAN_MONTHLY */ .Pni;
const FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_ANTI_SPAM_BI_YEARLY */ .z73;
const FEATURE_JETPACK_ANTI_SPAM = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_ANTI_SPAM */ .AcP;
const FEATURE_JETPACK_ANTI_SPAM_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_ANTI_SPAM_MONTHLY */ .mKR;
const FEATURE_JETPACK_SEARCH_BI_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SEARCH_BI_YEARLY */ .JeG;
const FEATURE_JETPACK_SEARCH = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SEARCH */ .AAK;
const FEATURE_JETPACK_SEARCH_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SEARCH_MONTHLY */ .uGP;
const FEATURE_JETPACK_VIDEOPRESS_BI_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_VIDEOPRESS_BI_YEARLY */ .PE9;
const FEATURE_JETPACK_VIDEOPRESS = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_VIDEOPRESS */ .QjD;
const FEATURE_JETPACK_VIDEOPRESS_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_VIDEOPRESS_MONTHLY */ .ydj;
const FEATURE_JETPACK_VIDEOPRESS_EDITOR = 'jetpack-videopress-editor';
const FEATURE_JETPACK_VIDEOPRESS_STORAGE = 'jetpack-videopress-storage';
const FEATURE_JETPACK_VIDEOPRESS_UNBRANDED = 'jetpack-videopress-unbranded';
const FEATURE_JETPACK_CRM = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_CRM */ .ynD;
const FEATURE_JETPACK_CRM_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_CRM_MONTHLY */ .ua0;
const FEATURE_JETPACK_BOOST_BI_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BOOST_BI_YEARLY */ .WVY;
const FEATURE_JETPACK_BOOST = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BOOST */ .F6C;
const FEATURE_JETPACK_BOOST_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_BOOST_MONTHLY */ .Nd7;
const FEATURE_CLOUD_CRITICAL_CSS = 'cloud-critical-css';
const FEATURE_JETPACK_SOCIAL_ADVANCED_BI_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY */ .XcS;
const FEATURE_JETPACK_SOCIAL_ADVANCED = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SOCIAL_ADVANCED */ .eIK;
const FEATURE_JETPACK_SOCIAL_ADVANCED_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY */ .ax4;
const FEATURE_JETPACK_SOCIAL_BASIC_BI_YEARLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY */ .VT6;
const FEATURE_JETPACK_SOCIAL_BASIC = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SOCIAL_BASIC */ .aWU;
const FEATURE_JETPACK_SOCIAL_BASIC_MONTHLY = _jetpack__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY */ .GFE;
const FEATURE_JETPACK_SOCIAL_V1_YEARLY = (/* unused pure expression or super */ null && (PRODUCT_JETPACK_SOCIAL_V1_YEARLY));
const FEATURE_JETPACK_SOCIAL_V1_MONTHLY = (/* unused pure expression or super */ null && (PRODUCT_JETPACK_SOCIAL_V1_MONTHLY));
const FEATURE_JETPACK_SOCIAL_V1_BI_YEARLY = (/* unused pure expression or super */ null && (PRODUCT_JETPACK_SOCIAL_V1_BI_YEARLY));
const FEATURE_SOCIAL_AUTO_SHARE = 'social-auto-share';
const FEATURE_SOCIAL_SHARES_1000 = 'social-shares-1000';
const FEATURE_SOCIAL_IMAGE_GENERATOR = 'social-image-generator';
const FEATURE_SOCIAL_ENHANCED_PUBLISHING = 'social-enhanced-publishing';
const FEATURE_SOCIAL_THREADS_CONNECTION = 'social-threads-connection';
const FEATURE_JETPACK_MONITOR_MONTHLY = (/* unused pure expression or super */ null && (PRODUCT_JETPACK_MONITOR_MONTHLY));
const FEATURE_JETPACK_MONITOR_YEARLY = (/* unused pure expression or super */ null && (PRODUCT_JETPACK_MONITOR_YEARLY));
const FEATURE_MONITOR_1_MINUTE_CHECK_INTERVAL = 'monitor-1-minute-check-interval';
const FEATURE_MONITOR_MULTIPLE_EMAIL_RECIPIENTS = 'monitor-multiple-email-recipients';
const FEATURE_MONITOR_SMS_NOTIFICATIONS = 'monitor-sms-notifications';

// Jetpack tiered product features
const FEATURE_JETPACK_1GB_BACKUP_STORAGE = 'jetpack-1gb-backup-storage';
const FEATURE_JETPACK_10GB_BACKUP_STORAGE = 'jetpack-10gb-backup-storage';
const FEATURE_JETPACK_1TB_BACKUP_STORAGE = 'jetpack-1tb-backup-storage';
const FEATURE_JETPACK_1_YEAR_ARCHIVE_ACTIVITY_LOG = 'jetpack-1-year-archive-activity-log';
const FEATURE_JETPACK_30_DAY_ARCHIVE_ACTIVITY_LOG = 'jetpack-30-day-archive-activity-log';
const FEATURE_JETPACK_REAL_TIME_CLOUD_BACKUPS = 'jetpack-real-time-cloud-backups';
const FEATURE_JETPACK_REAL_TIME_MALWARE_SCANNING = 'jetpack-real-time-malware-scanning';
const FEATURE_JETPACK_PRODUCT_BACKUP = 'jetpack-product-backup';
const FEATURE_JETPACK_PRODUCT_VIDEOPRESS = 'jetpack-product-videopress';
const FEATURE_JETPACK_ALL_BACKUP_SECURITY_FEATURES = 'jetpack-all-backup-security-features';

// P2 project features
const FEATURE_P2_3GB_STORAGE = 'p2-3gb-storage';
const FEATURE_P2_UNLIMITED_USERS = 'p2-unlimited-users';
const FEATURE_P2_UNLIMITED_POSTS_PAGES = 'p2-unlimited-posts-pages';
const FEATURE_P2_SIMPLE_SEARCH = 'p2-simple-search';
const FEATURE_P2_CUSTOMIZATION_OPTIONS = 'p2-customization-options';
const FEATURE_P2_13GB_STORAGE = 'p2-13gb-storage';
const FEATURE_P2_ADVANCED_SEARCH = 'p2-advanced-search';
const FEATURE_P2_VIDEO_SHARING = 'p2-video-sharing';
const FEATURE_P2_MORE_FILE_TYPES = 'p2-more-file-types';
const FEATURE_P2_PRIORITY_CHAT_EMAIL_SUPPORT = 'p2-priority-chat-email-support';
const FEATURE_P2_ACTIVITY_OVERVIEW = 'p2-activity-overview';

// New features Flexible and Pro plans introduced.
const FEATURE_MANAGED_HOSTING = 'managed-hosting';
const FEATURE_UNLIMITED_USERS = 'unlimited-users';
const FEATURE_UNLIMITED_POSTS_PAGES = 'unlimited-posts-pages';
const FEATURE_PAYMENT_BLOCKS = 'payment-blocks';
const FEATURE_TITAN_EMAIL = 'titan-email';
const FEATURE_UNLIMITED_ADMINS = 'unlimited-admins';
const FEATURE_ADDITIONAL_SITES = 'additional-sites';
const FEATURE_WOOCOMMERCE = 'woocommerce';
const FEATURE_SOCIAL_MEDIA_TOOLS = 'social-media-tools';

// From class-wpcom-features.php in WPCOM
const WPCOM_FEATURES_AI_ASSISTANT = 'ai-assistant';
const WPCOM_FEATURES_AKISMET = 'akismet';
const WPCOM_FEATURES_ANTISPAM = 'antispam';
const WPCOM_FEATURES_ATOMIC = 'atomic';
const WPCOM_FEATURES_BACKUPS = 'backups';
const WPCOM_FEATURES_BACKUPS_RESTORE = 'restore';
const WPCOM_FEATURES_CDN = 'cdn';
const WPCOM_FEATURES_CLASSIC_SEARCH = 'search';
const WPCOM_FEATURES_CLOUDFLARE_CDN = 'cloudflare-cdn';
const WPCOM_FEATURES_COPY_SITE = 'copy-site';
const WPCOM_FEATURES_FULL_ACTIVITY_LOG = 'full-activity-log';
const WPCOM_FEATURES_INSTALL_PLUGINS = 'install-plugins';
const WPCOM_FEATURES_INSTALL_PURCHASED_PLUGINS = 'install-purchased-plugins';
const WPCOM_FEATURES_INSTANT_SEARCH = 'instant-search';
const WPCOM_FEATURES_LIVE_SUPPORT = 'live_support';
const WPCOM_FEATURES_MANAGE_PLUGINS = 'manage-plugins';
const WPCOM_FEATURES_NO_ADVERTS = 'no-adverts/no-adverts.php';
const WPCOM_FEATURES_NO_WPCOM_BRANDING = 'no-wpcom-branding';
/*
 * TODO: This constant value should be renamed (here and in `class-wpcom-features.php` in
 * WPCOM) to `premium-themes-unlimited` so it's not confused with `FEATURE_PREMIUM_THEMES`.
 */
const WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED = 'premium-themes';
/*
 * TODO: This constant value should be renamed (here and in `class-wpcom-features.php` in
 * WPCOM) to `premium-themes-limited` so it better reflects the actual feature.
 */
const WPCOM_FEATURES_PREMIUM_THEMES_LIMITED = 'personal-themes';
const WPCOM_FEATURES_PRIORITY_SUPPORT = 'priority_support';
const WPCOM_FEATURES_REAL_TIME_BACKUPS = 'real-time-backups';
const WPCOM_FEATURES_SCAN = 'scan';
const WPCOM_FEATURES_SCHEDULED_UPDATES = 'scheduled-updates';
const WPCOM_FEATURES_SEO_PREVIEW_TOOLS = 'seo-preview-tools';
const WPCOM_FEATURES_SUBSCRIPTION_GIFTING = 'subscription-gifting';
const WPCOM_FEATURES_LOCKED_MODE = 'locked-mode';
const WPCOM_FEATURES_LEGACY_CONTACT = 'legacy-contact';
const WPCOM_FEATURES_UPLOAD_AUDIO_FILES = 'upload-audio-files';
const WPCOM_FEATURES_UPLOAD_PLUGINS = 'upload-plugins';
const WPCOM_FEATURES_UPLOAD_VIDEO_FILES = 'upload-video-files';
const WPCOM_FEATURES_VAULTPRESS_BACKUPS = 'vaultpress-backups';
const WPCOM_FEATURES_VIDEOPRESS = 'videopress';
const WPCOM_FEATURES_VIDEOPRESS_UNLIMITED_STORAGE = 'videopress-unlimited-storage';
const WPCOM_FEATURES_VIDEO_HOSTING = 'video-hosting';
const WPCOM_FEATURES_WORDADS = 'wordads';
const WPCOM_FEATURES_CUSTOM_DESIGN = 'custom-design';
const WPCOM_FEATURES_GLOBAL_STYLES = 'global-styles';
const WPCOM_FEATURES_SITE_PREVIEW_LINKS = 'site-preview-links';

// Signup flow related features
const FEATURE_UNLIMITED_EMAILS = 'unlimited-emails';
const FEATURE_UNLIMITED_SUBSCRIBERS = 'unlimited-subscribers';
const FEATURE_IMPORT_SUBSCRIBERS = 'import-subscribers';
const FEATURE_ADD_MULTIPLE_PAGES_NEWSLETTER = 'add-multiple-pages-newsletter';
const FEATURE_AD_FREE_EXPERIENCE = 'ad-free-experience';
const FEATURE_COLLECT_PAYMENTS_NEWSLETTER = 'collect-payments-newsletter';
const FEATURE_POST_BY_EMAIL = 'post-by-email';
const FEATURE_REAL_TIME_ANALYTICS = 'real-time-analytics';
const FEATURE_GOOGLE_ANALYTICS_V2 = 'google-analytics-v2';
const FEATURE_ADD_UNLIMITED_LINKS = 'add-unlimited-links';
const FEATURE_CUSTOMIZE_THEMES_BUTTONS_COLORS = 'customize-themes-buttons-colors';
const FEATURE_TRACK_VIEWS_CLICKS = 'track-views-clicks';
const FEATURE_COLLECT_PAYMENTS_LINK_IN_BIO = 'collect-payments-link-in-bio';
const FEATURE_NEWSLETTER_IMPORT_SUBSCRIBERS_FREE = 'newsletter-import-subscribers-free';
const FEATURE_PAYMENT_TRANSACTION_FEES_10 = 'payment-transaction-fees-10';
const FEATURE_PAYMENT_TRANSACTION_FEES_8 = 'payment-transaction-fees-8';
const FEATURE_PAYMENT_TRANSACTION_FEES_4 = 'payment-transaction-fees-4';
const FEATURE_PAYMENT_TRANSACTION_FEES_2 = 'payment-transaction-fees-2';
const FEATURE_PAYMENT_TRANSACTION_FEES_0 = 'payment-transaction-fees-0';
const FEATURE_PAYMENT_TRANSACTION_FEES_0_WOO = 'payment-transaction-fees-0-woo';
const FEATURE_PAYMENT_TRANSACTION_FEES_0_ALL = 'payment-transaction-fees-0-all';
const FEATURE_PAYMENT_TRANSACTION_FEES_2_REGULAR = 'payment-transaction-fees-2-regular';
const FEATURE_GROUP_PAYMENT_TRANSACTION_FEES = 'payment-transaction-fees-group';
const FEATURE_COMMISSION_FEE_STANDARD_FEATURES = 'payment-commission-fee-standard';
const FEATURE_COMMISSION_FEE_WOO_FEATURES = 'payment-commission-fee-woo';
const FEATURE_THE_READER = 'the-reader';

// Pricing Grid 2023 Features
const FEATURE_BEAUTIFUL_THEMES = 'beautiful-themes';
const FEATURE_PAGES = 'pages-v1';
const FEATURE_USERS = 'users-v1';
const FEATURE_NEWSLETTERS_RSS = 'newsletter-rss';
const FEATURE_POST_EDITS_HISTORY = 'post-edits-history';
const FEATURE_SECURITY_BRUTE_FORCE = 'security-brute-force';
const FEATURE_SMART_REDIRECTS = 'smart-redirects';
const FEATURE_ALWAYS_ONLINE = 'always-online';
const FEATURE_FAST_DNS = 'fast-dns';
const FEATURE_STYLE_CUSTOMIZATION = 'style-customization';
const FEATURE_DESIGN_TOOLS = 'design-tools';
const FEATURE_WORDADS = 'wordads-v2';
const FEATURE_PLUGINS_THEMES = 'plugins-themes-v1';
const FEATURE_BANDWIDTH = 'bandwidth-v1';
const FEATURE_BURST = 'burst-v1';
const FEATURE_WAF_V2 = 'waf-v2';
const FEATURE_CDN = 'cdn-v1';
const FEATURE_CPUS = 'cpus-v1';
const FEATURE_DATACENTRE_FAILOVER = 'datacentre-failover';
const FEATURE_ISOLATED_INFRA = 'isolated-infra';
const FEATURE_SECURITY_MALWARE = 'security-malware';
const FEATURE_REAL_TIME_SECURITY_SCANS = 'real-time-security-scans';
const FEATURE_SECURITY_VULNERABILITY_NOTIFICATIONS = 'security-vulnerability-notifications';
const FEATURE_SECURITY_DDOS = 'security-ddos';
const FEATURE_DEV_TOOLS = 'dev-tools';
const FEATURE_WP_UPDATES = 'wp-updates';
const FEATURE_MULTI_SITE = 'multi-site';
const FEATURE_SELL_SHIP = 'sell-ship';
const FEATURE_SELL_INTERNATIONALLY = 'sell-internationally';
const FEATURE_AUTOMATIC_SALES_TAX = 'automatic-sales-tax';
const FEATURE_AUTOMATED_BACKUPS_SECURITY_SCAN = 'automated-backups-security-scan';
const FEATURE_INTEGRATED_SHIPMENT_TRACKING = 'integrated-shipment-tracking';
const FEATURE_SELL_EGIFTS_AND_VOUCHERS = 'sell-e-gifts-and-vouchers';
const FEATURE_EMAIL_MARKETING = 'email-marketing';
const FEATURE_MARKETPLACE_SYNC_SOCIAL_MEDIA_INTEGRATION = 'marketplace-sync-social-media-integration';
const FEATURE_BACK_IN_STOCK_NOTIFICATIONS = 'back-in-stock-notifications';
const FEATURE_MARKETING_AUTOMATION = 'marketing-automation';
const FEATURE_AUTOMATED_EMAIL_TRIGGERS = 'automated-email-triggers';
const FEATURE_CART_ABANDONMENT_EMAILS = 'cart-abandonment-emails';
const FEATURE_REFERRAL_PROGRAMS = 'referral-programs';
const FEATURE_CUSTOMER_BIRTHDAY_EMAILS = 'customer-birthday-emails';
const FEATURE_LOYALTY_POINTS_PROGRAMS = 'loyalty-points-programs';
const FEATURE_OFFER_BULK_DISCOUNTS = 'offer-bulk-discounts';
const FEATURE_RECOMMEND_ADD_ONS = 'recommend-add-ons';
const FEATURE_ASSEMBLED_PRODUCTS_AND_KITS = 'assembled-products-and-kits';
const FEATURE_MIN_MAX_ORDER_QUANTITY = 'min-max-order-quantity';
const FEATURE_CUSTOM_STORE = 'custom-store';
const FEATURE_INVENTORY = 'inventory';
const FEATURE_CHECKOUT = 'checkout-v1';
const FEATURE_ACCEPT_PAYMENTS_V2 = 'accept-payments-v2';
const FEATURE_SALES_REPORTS = 'sales-reports';
const FEATURE_EXTENSIONS = 'extensions-v1';
const FEATURE_STATS_JP = 'stats-jp';
const FEATURE_SPAM_JP = 'spam-jp';
const FEATURE_LTD_SOCIAL_MEDIA_JP = 'ltd-social-media-jp';
const FEATURE_SHARES_SOCIAL_MEDIA_JP = 'shares-social-media-jp';
const FEATURE_CONTACT_FORM_JP = 'contact-form-jp';
const FEATURE_PAID_SUBSCRIBERS_JP = 'paid-subscribers-jp';
const FEATURE_VIDEOPRESS_JP = 'videopress-jp';
const FEATURE_UNLTD_SOCIAL_MEDIA_JP = 'unltd-social-media-jp';
const FEATURE_SEO_JP = 'seo-jp';
const FEATURE_BRUTE_PROTECT_JP = 'brute-protect-jp';
const FEATURE_REALTIME_BACKUPS_JP = 'realtime-backups-jp';
const FEATURE_UPTIME_MONITOR_JP = 'uptime-monitor-jp';
const FEATURE_GLOBAL_EDGE_CACHING = 'global-edge-caching';
const FEATURE_ES_SEARCH_JP = 'es-search-jp';
const FEATURE_PLUGIN_AUTOUPDATE_JP = 'plugin-autoupdate-jp';
const FEATURE_PREMIUM_CONTENT_JP = 'premium-content-jp';
const FEATURE_SITE_ACTIVITY_LOG_JP = 'site-activity-log-jp';
const FEATURE_DONATIONS_AND_TIPS_JP = 'donations-and-tips-jp';
const FEATURE_PAYPAL_JP = 'payments-paypal-jp';
const FEATURE_PAYMENT_BUTTONS_JP = 'payment-buttons-jp';
const FEATURE_AUTOMATTIC_DATACENTER_FAILOVER = 'automattic-datacenter-fail-over';
const FEATURE_PREMIUM_STORE_THEMES = 'premium-store-themes';
const FEATURE_WOOCOMMERCE_HOSTING = 'woocommerce-hosting';
const FEATURE_STORE_DESIGN = 'store-design';
const FEATURE_UNLIMITED_PRODUCTS = 'unlimited-products';
const FEATURE_DISPLAY_PRODUCTS_BRAND = 'display-products-brand';
const FEATURE_PRODUCT_ADD_ONS = 'product-add-ons';
const FEATURE_ASSEMBLED_KITS = 'assembled-kits';
const FEATURE_STOCK_NOTIFS = 'stock-notifs';
const FEATURE_DYNAMIC_UPSELLS = 'dynamic-upsells';
const FEATURE_CUSTOM_MARKETING_AUTOMATION = 'custom-marketing-automation';
const FEATURE_BULK_DISCOUNTS = 'bulk-discounts';
const FEATURE_INVENTORY_MGMT = 'inventory-mgmt';
const FEATURE_STREAMLINED_CHECKOUT = 'streamlined-checkout';
const FEATURE_SELL_60_COUNTRIES = 'sell-60-countries';
const FEATURE_SHIPPING_INTEGRATIONS = 'shipping-integrations';
const FEATURE_UNLIMITED_TRAFFIC = 'unlimited-traffic';
const FEATURE_TIERED_STORAGE_PLANS_AVAILABLE = 'tiered-storage-plans-available';
const FEATURE_FAST_SUPPORT_FROM_EXPERTS = 'fast-support-from-experts';
const FEATURE_PRIORITY_24_7_SUPPORT = 'priority-24-7-support';

// Woo Express Features
const FEATURE_WOOCOMMERCE_STORE = 'woocommerce-store'; // WooCommerce store
const FEATURE_WOOCOMMERCE_MOBILE_APP = 'woocommerce-mobile-app'; // WooCommerce mobile app
const FEATURE_WORDPRESS_CMS = 'wordpress-cms'; // WordPress CMS
const FEATURE_WORDPRESS_MOBILE_APP = 'wordpress-mobile-app'; // WordPress mobile app
const FEATURE_FREE_SSL_CERTIFICATE = 'free-ssl-certificate'; // Free SSL certificate
const FEATURE_GOOGLE_ANALYTICS_V3 = 'google-analytics-v3'; // Google Analytics
const FEATURE_LIST_UNLIMITED_PRODUCTS = 'list-unlimited-products'; // List unlimited products
const FEATURE_GIFT_CARDS = 'gift-cards'; // Gift cards
const FEATURE_PRODUCT_BUNDLES = 'product-bundles'; // Product bundles
const FEATURE_CUSTOM_PRODUCT_KITS = 'custom-product-kits'; // Custom product kits
const FEATURE_LIST_PRODUCTS_BY_BRAND = 'list-products-by-brand'; // List products by brand
const FEATURE_PRODUCT_RECOMMENDATIONS = 'product-recommendations'; // Product recommendations
const FEATURE_INTEGRATED_PAYMENTS = 'integrated-payments'; // Integrated payments
const FEATURE_INTERNATIONAL_PAYMENTS = 'international-payments'; // International payments
const FEATURE_AUTOMATED_SALES_TAXES = 'automated-sales-taxes'; // Automated sales taxes
const FEATURE_ACCEPT_LOCAL_PAYMENTS = 'accept-local-payments'; // Accept local payments
const FEATURE_PROMOTE_ON_TIKTOK = 'promote-on-tiktok'; // Promote on TikTok
const FEATURE_SYNC_WITH_PINTEREST = 'sync-with-pinterest'; // Sync with Pinterest
const FEATURE_CONNECT_WITH_FACEBOOK = 'connect-with-facebook'; // Connect with Facebook
const FEATURE_ABANDONED_CART_RECOVERY = 'abandoned-cart-recovery'; // Abandoned cart recovery
const FEATURE_ADVERTISE_ON_GOOGLE = 'advertise-on-google'; // Advertise on Google
const FEATURE_CUSTOM_ORDER_EMAILS = 'custom-order-emails'; // Custom order emails
const FEATURE_LIVE_SHIPPING_RATES = 'live-shipping-rates'; // Live shipping rates
const FEATURE_DISCOUNTED_SHIPPING = 'discounted-shipping'; // Discounted shipping
const FEATURE_PRINT_SHIPPING_LABELS = 'print-shipping-labels'; // Print shipping labels
const FEATURE_AI_ASSISTED_PRODUCT_DESCRIPTION = 'ai-assisted-product-descriptions'; // AI-assisted product descriptions

// Sensei Features
const FEATURE_SENSEI_SUPPORT = 'sensei-support';
const FEATURE_SENSEI_UNLIMITED = 'sensei-unlimited';
const FEATURE_SENSEI_INTERACTIVE = 'sensei-interactive';
const FEATURE_SENSEI_QUIZZES = 'sensei-quizzes';
const FEATURE_SENSEI_SELL_COURSES = 'sensei-sell-courses';
const FEATURE_SENSEI_STORAGE = 'sensei-storage';
const FEATURE_SENSEI_HOSTING = 'sensei-hosting';
const FEATURE_SENSEI_JETPACK = 'sensei-jetpack';

// Feature types
const FEATURE_TYPE_JETPACK_ANTI_SPAM = 'jetpack_anti_spam';
const FEATURE_TYPE_JETPACK_ACTIVITY_LOG = 'jetpack_activity_log';
const FEATURE_TYPE_JETPACK_BACKUP = 'jetpack_backup';
const FEATURE_TYPE_JETPACK_BOOST = 'jetpack_boost';
const FEATURE_TYPE_JETPACK_SCAN = 'jetpack_scan';
const FEATURE_TYPE_JETPACK_SOCIAL = 'jetpack_social';
const FEATURE_TYPE_JETPACK_SEARCH = 'jetpack_search';
const FEATURE_TYPE_JETPACK_STATS = 'jetpack_stats';
const FEATURE_TYPE_JETPACK_VIDEOPRESS = 'jetpack_videopress';

/***/ }),

/***/ 6090:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $bO: () => (/* binding */ PLAN_JETPACK_STARTER_MONTHLY),
/* harmony export */   $r5: () => (/* binding */ PRODUCT_JETPACK_BACKUP_T1_BI_YEARLY),
/* harmony export */   AAK: () => (/* binding */ PRODUCT_JETPACK_SEARCH),
/* harmony export */   AcP: () => (/* binding */ PRODUCT_JETPACK_ANTI_SPAM),
/* harmony export */   BfZ: () => (/* binding */ PLAN_JETPACK_PREMIUM_MONTHLY),
/* harmony export */   CAp: () => (/* binding */ JETPACK_TAG_FOR_BLOGS),
/* harmony export */   CSg: () => (/* binding */ PRODUCT_JETPACK_BACKUP_T1_MONTHLY),
/* harmony export */   CiF: () => (/* binding */ JETPACK_TAG_FOR_MEMBERSHIP_SITES),
/* harmony export */   Ctn: () => (/* binding */ JETPACK_LEGACY_PLANS),
/* harmony export */   CwU: () => (/* binding */ PRODUCT_JETPACK_CREATOR_MONTHLY),
/* harmony export */   EsA: () => (/* binding */ PLAN_JETPACK_PERSONAL_MONTHLY),
/* harmony export */   F6C: () => (/* binding */ PRODUCT_JETPACK_BOOST),
/* harmony export */   FID: () => (/* binding */ PRODUCT_JETPACK_BACKUP_T1_YEARLY),
/* harmony export */   GFE: () => (/* binding */ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY),
/* harmony export */   Gm4: () => (/* binding */ PRODUCT_JETPACK_BACKUP_REALTIME),
/* harmony export */   Gt$: () => (/* binding */ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY),
/* harmony export */   Hsb: () => (/* binding */ PRODUCT_JETPACK_BACKUP_T0_MONTHLY),
/* harmony export */   I5k: () => (/* binding */ PLAN_JETPACK_SECURITY_DAILY),
/* harmony export */   JeG: () => (/* binding */ PRODUCT_JETPACK_SEARCH_BI_YEARLY),
/* harmony export */   KJ0: () => (/* binding */ PRODUCT_JETPACK_BACKUP_T2_YEARLY),
/* harmony export */   Ldz: () => (/* binding */ PRODUCT_JETPACK_CREATOR_BI_YEARLY),
/* harmony export */   MMo: () => (/* binding */ PLAN_JETPACK_FREE),
/* harmony export */   Nd7: () => (/* binding */ PRODUCT_JETPACK_BOOST_MONTHLY),
/* harmony export */   OkD: () => (/* binding */ JETPACK_TAG_FOR_NEWS_ORGANISATIONS),
/* harmony export */   PE9: () => (/* binding */ PRODUCT_JETPACK_VIDEOPRESS_BI_YEARLY),
/* harmony export */   Pni: () => (/* binding */ PRODUCT_JETPACK_SCAN_MONTHLY),
/* harmony export */   Q$E: () => (/* binding */ PRODUCT_JETPACK_BACKUP_T0_YEARLY),
/* harmony export */   QjD: () => (/* binding */ PRODUCT_JETPACK_VIDEOPRESS),
/* harmony export */   QwW: () => (/* binding */ PRODUCT_JETPACK_BACKUP_DAILY),
/* harmony export */   Ryn: () => (/* binding */ PLAN_JETPACK_PREMIUM),
/* harmony export */   Siv: () => (/* binding */ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY),
/* harmony export */   UBB: () => (/* binding */ PLAN_JETPACK_SECURITY_REALTIME_MONTHLY),
/* harmony export */   VK: () => (/* binding */ PRODUCT_JETPACK_BACKUP_T2_MONTHLY),
/* harmony export */   VT6: () => (/* binding */ PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY),
/* harmony export */   VlM: () => (/* binding */ PLAN_JETPACK_GOLDEN_TOKEN),
/* harmony export */   VtF: () => (/* binding */ JETPACK_SECURITY_PLANS),
/* harmony export */   WVY: () => (/* binding */ PRODUCT_JETPACK_BOOST_BI_YEARLY),
/* harmony export */   XcS: () => (/* binding */ PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY),
/* harmony export */   Xoz: () => (/* binding */ PLAN_JETPACK_SECURITY_T2_MONTHLY),
/* harmony export */   Y1g: () => (/* binding */ PLAN_JETPACK_PERSONAL),
/* harmony export */   YhD: () => (/* binding */ PLAN_JETPACK_BUSINESS_MONTHLY),
/* harmony export */   _4K: () => (/* binding */ PLAN_JETPACK_COMPLETE_BI_YEARLY),
/* harmony export */   aWU: () => (/* binding */ PRODUCT_JETPACK_SOCIAL_BASIC),
/* harmony export */   asM: () => (/* binding */ PLAN_JETPACK_SECURITY_T2_YEARLY),
/* harmony export */   ax4: () => (/* binding */ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY),
/* harmony export */   b2e: () => (/* binding */ PLAN_JETPACK_SECURITY_T1_YEARLY),
/* harmony export */   cCi: () => (/* binding */ PLAN_JETPACK_STARTER_YEARLY),
/* harmony export */   dOg: () => (/* binding */ GROUP_JETPACK),
/* harmony export */   eIK: () => (/* binding */ PRODUCT_JETPACK_SOCIAL_ADVANCED),
/* harmony export */   eJ8: () => (/* binding */ PLAN_JETPACK_SECURITY_T1_MONTHLY),
/* harmony export */   flA: () => (/* binding */ PRODUCT_JETPACK_CREATOR_YEARLY),
/* harmony export */   iYv: () => (/* binding */ JETPACK_TAG_FOR_WOOCOMMERCE_STORES),
/* harmony export */   kU: () => (/* binding */ PLAN_JETPACK_BUSINESS),
/* harmony export */   kZv: () => (/* binding */ PRODUCT_JETPACK_SCAN_BI_YEARLY),
/* harmony export */   lBi: () => (/* binding */ PRODUCT_JETPACK_SCAN),
/* harmony export */   mKR: () => (/* binding */ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY),
/* harmony export */   ncG: () => (/* binding */ PLAN_JETPACK_SECURITY_T1_BI_YEARLY),
/* harmony export */   oIK: () => (/* binding */ PRODUCT_JETPACK_STATS_BI_YEARLY),
/* harmony export */   pz9: () => (/* binding */ PLAN_JETPACK_COMPLETE),
/* harmony export */   rD9: () => (/* binding */ PLAN_JETPACK_COMPLETE_MONTHLY),
/* harmony export */   sG7: () => (/* binding */ PLAN_JETPACK_SECURITY_REALTIME),
/* harmony export */   sLv: () => (/* binding */ PRODUCT_JETPACK_STATS_YEARLY),
/* harmony export */   uGP: () => (/* binding */ PRODUCT_JETPACK_SEARCH_MONTHLY),
/* harmony export */   ua0: () => (/* binding */ PRODUCT_JETPACK_CRM_MONTHLY),
/* harmony export */   ufm: () => (/* binding */ PLAN_JETPACK_SECURITY_DAILY_MONTHLY),
/* harmony export */   xSC: () => (/* binding */ JETPACK_TAG_FOR_SMALL_SITES),
/* harmony export */   ydj: () => (/* binding */ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY),
/* harmony export */   ynD: () => (/* binding */ PRODUCT_JETPACK_CRM),
/* harmony export */   z4N: () => (/* binding */ PRODUCT_JETPACK_STATS_MONTHLY),
/* harmony export */   z73: () => (/* binding */ PRODUCT_JETPACK_ANTI_SPAM_BI_YEARLY)
/* harmony export */ });
/* unused harmony exports PRODUCT_JETPACK_AI_BI_YEARLY, PRODUCT_JETPACK_AI_BI_YEARLY_100, PRODUCT_JETPACK_AI_BI_YEARLY_200, PRODUCT_JETPACK_AI_BI_YEARLY_500, PRODUCT_JETPACK_AI_BI_YEARLY_750, PRODUCT_JETPACK_AI_BI_YEARLY_1000, PRODUCT_JETPACK_AI_MONTHLY, PRODUCT_JETPACK_AI_MONTHLY_100, PRODUCT_JETPACK_AI_MONTHLY_200, PRODUCT_JETPACK_AI_MONTHLY_500, PRODUCT_JETPACK_AI_MONTHLY_750, PRODUCT_JETPACK_AI_MONTHLY_1000, PRODUCT_JETPACK_AI_YEARLY, PRODUCT_JETPACK_AI_YEARLY_100, PRODUCT_JETPACK_AI_YEARLY_200, PRODUCT_JETPACK_AI_YEARLY_500, PRODUCT_JETPACK_AI_YEARLY_750, PRODUCT_JETPACK_AI_YEARLY_1000, PRODUCT_JETPACK_BACKUP, PRODUCT_JETPACK_SCAN_REALTIME, PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY, PRODUCT_JETPACK_SEARCH_FREE, PRODUCT_JETPACK_CRM_FREE, PRODUCT_JETPACK_CRM_FREE_MONTHLY, PRODUCT_JETPACK_SOCIAL_V1_BI_YEARLY, PRODUCT_JETPACK_SOCIAL_V1_YEARLY, PRODUCT_JETPACK_SOCIAL_V1_MONTHLY, PRODUCT_JETPACK_STATS_MONTHLY_10K, PRODUCT_JETPACK_STATS_MONTHLY_100K, PRODUCT_JETPACK_STATS_MONTHLY_250K, PRODUCT_JETPACK_STATS_MONTHLY_500K, PRODUCT_JETPACK_STATS_MONTHLY_1M, PRODUCT_JETPACK_STATS_YEARLY_10K, PRODUCT_JETPACK_STATS_YEARLY_100K, PRODUCT_JETPACK_STATS_YEARLY_250K, PRODUCT_JETPACK_STATS_YEARLY_500K, PRODUCT_JETPACK_STATS_YEARLY_1M, PRODUCT_JETPACK_STATS_BI_YEARLY_10K, PRODUCT_JETPACK_STATS_BI_YEARLY_100K, PRODUCT_JETPACK_STATS_BI_YEARLY_250K, PRODUCT_JETPACK_STATS_BI_YEARLY_500K, PRODUCT_JETPACK_STATS_BI_YEARLY_1M, PRODUCT_JETPACK_STATS_PWYW_YEARLY, PRODUCT_JETPACK_STATS_FREE, PRODUCT_JETPACK_MONITOR_YEARLY, PRODUCT_JETPACK_MONITOR_MONTHLY, PRODUCT_JETPACK_MONITOR, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_3TB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_5TB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_3TB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_5TB_YEARLY, PRODUCT_WOOCOMMERCE_BOOKINGS, PRODUCT_WOOCOMMERCE_SUBSCRIPTIONS, PRODUCT_WOOCOMMERCE_PRODUCT_BUNDLES, PRODUCT_WOOCOMMERCE_PRODUCT_ADD_ONS, PRODUCT_WOOCOMMERCE_MINMAX_QUANTITIES, PRODUCT_WOOCOMMERCE_AUTOMATEWOO, PRODUCT_WOOCOMMERCE_ADVANCED_NOTIFICATIONS, PRODUCT_WOOCOMMERCE_ALL_PRODUCTS_WOO_SUBSCRIPTIONS, PRODUCT_WOOCOMMERCE_AUTOMATEWOO_BIRTHDAYS, PRODUCT_WOOCOMMERCE_AUTOMATEWOO_REFER_A_FRIEND, PRODUCT_WOOCOMMERCE_BACK_IN_STOCK_NOTIFICATIONS, PRODUCT_WOOCOMMERCE_BULK_STOCK_MANAGEMENT, PRODUCT_WOOCOMMERCE_CHECKOUT_FIELD_EDITOR, PRODUCT_WOOCOMMERCE_COMPOSITE_PRODUCTS, PRODUCT_WOOCOMMERCE_CONDITIONAL_SHIPPING_PAYMENTS, PRODUCT_WOOCOMMERCE_EU_VAT_NUMBER, PRODUCT_WOOCOMMERCE_FLAT_RATE_BOX_SHIPPING, PRODUCT_WOOCOMMERCE_GIFT_CARDS, PRODUCT_WOOCOMMERCE_GIFTING_WC_SUBSCRIPTIONS, PRODUCT_WOOCOMMERCE_PER_PRODUCT_SHIPPING, PRODUCT_WOOCOMMERCE_PRODUCT_CSV_IMPORT_SUITE, PRODUCT_WOOCOMMERCE_PRODUCT_RECOMMENDATIONS, PRODUCT_WOOCOMMERCE_PRODUCT_VENDORS, PRODUCT_WOOCOMMERCE_RETURNS_WARRANTY_REQUESTS, PRODUCT_WOOCOMMERCE_SUBSCRIPTION_DOWNLOADS, PRODUCT_WOOCOMMERCE_SHIPMENT_TRACKING, PRODUCT_WOOCOMMERCE_SHIPPING_MULTIPLE_ADDRESSES, PRODUCT_WOOCOMMERCE_STOREFRONT_EXTENSIONS_BUNDLE, PRODUCT_WOOCOMMERCE_TABLE_RATE_SHIPPING, PRODUCT_WOOCOMMERCE_ADDITIONAL_IMAGE_VARIATIONS, PRODUCT_WOOCOMMERCE_BOOKINGS_AVAILABILITY, PRODUCT_WOOCOMMERCE_BOX_OFFICE, PRODUCT_WOOCOMMERCE_BRANDS, PRODUCT_WOOCOMMERCE_COUPON_CAMPAIGNS, PRODUCT_WOOCOMMERCE_DEPOSITS, PRODUCT_WOOCOMMERCE_DISTANCE_RATE_SHIPPING, PRODUCT_WOOCOMMERCE_ONE_PAGE_CHECKOUT, PRODUCT_WOOCOMMERCE_ORDER_BARCODES, PRODUCT_WOOCOMMERCE_POINTS_AND_REWARDS, PRODUCT_WOOCOMMERCE_PRE_ORDERS, PRODUCT_WOOCOMMERCE_PURCHASE_ORDER_GATEWAY, PRODUCT_WOOCOMMERCE_SHIPPING, PRODUCT_WOOCOMMERCE_ACCOMMODATIONS_BOOKINGS, PRODUCT_WOOCOMMERCE_TAX, PRODUCT_WOOCOMMERCE_WOOPAYMENTS, JETPACK_BACKUP_PRODUCTS_YEARLY, JETPACK_BACKUP_PRODUCTS_MONTHLY, JETPACK_BACKUP_PRODUCTS, JETPACK_BACKUP_ADDON_MONTHLY, JETPACK_BACKUP_ADDON_YEARLY, JETPACK_BACKUP_ADDON_PRODUCTS, JETPACK_BACKUP_T0_PRODUCTS, JETPACK_BACKUP_T1_PRODUCTS, JETPACK_BACKUP_T2_PRODUCTS, JETPACK_BOOST_PRODUCTS, JETPACK_SCAN_PRODUCTS, JETPACK_SOCIAL_BASIC_PRODUCTS, JETPACK_SOCIAL_ADVANCED_PRODUCTS, JETPACK_SOCIAL_V1_PRODUCTS, JETPACK_SOCIAL_PRODUCTS, JETPACK_STATS_PRODUCTS, JETPACK_ANTI_SPAM_PRODUCTS, JETPACK_SEARCH_PRODUCTS, JETPACK_CRM_PRODUCTS, JETPACK_CRM_FREE_PRODUCTS, JETPACK_VIDEOPRESS_PRODUCTS, JETPACK_MONITOR_PRODUCTS, JETPACK_AI_PRODUCTS, JETPACK_AI_ALIASES, JETPACK_STATS_ALIASES, JETPACK_CREATOR_PRODUCTS, WOOCOMMERCE_PRODUCTS, JETPACK_PRODUCTS_LIST, JETPACK_ALIAS_LIST, JETPACK_TIERED_PRODUCTS, JETPACK_MULTI_OPTION_PRODUCTS, JETPACK_PRODUCTS_BY_TERM, JETPACK_PRODUCT_PRICE_MATRIX, JETPACK_PRODUCT_UPGRADE_MAP, JETPACK_MONTHLY_LEGACY_PLANS, JETPACK_YEARLY_LEGACY_PLANS, JETPACK_LEGACY_PLANS_MAX_PLUGIN_VERSION, JETPACK_SECURITY_T1_PLANS, JETPACK_SECURITY_T2_PLANS, JETPACK_COMPLETE_PLANS, JETPACK_STARTER_PLANS, JETPACK_MONTHLY_PLANS, JETPACK_RESET_PLANS, JETPACK_RESET_PLANS_BY_TERM, JETPACK_PLANS, JETPACK_PLANS_BY_TERM, BEST_VALUE_PLANS, JETPACK_PLAN_UPGRADE_MAP, JETPACK_STARTER_UPGRADE_MAP, JETPACK_SECURITY_CATEGORY, JETPACK_PERFORMANCE_CATEGORY, JETPACK_GROWTH_CATEGORY, JETPACK_PRODUCT_CATEGORIES, JETPACK_BACKUP_PRODUCT_LANDING_PAGE_URL, JETPACK_SEARCH_PRODUCT_LANDING_PAGE_URL, JETPACK_STATS_PRODUCT_LANDING_PAGE_URL, JETPACK_SCAN_PRODUCT_LANDING_PAGE_URL, JETPACK_ANTI_SPAM_PRODUCT_LANDING_PAGE_URL, JETPACK_BOOST_PRODUCT_LANDING_PAGE_URL, JETPACK_SOCIAL_PRODUCT_LANDING_PAGE_URL, JETPACK_VIDEOPRESS_PRODUCT_LANDING_PAGE_URL, JETPACK_CRM_PRODUCT_LANDING_PAGE_URL, JETPACK_REDIRECT_CHECKOUT_TO_WPADMIN, JETPACK_REDIRECT_URL, JETPACK_RELATED_PRODUCTS_MAP, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_VIDEOGRAPHERS, JETPACK_TAG_FOR_EDUCATORS, JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_ALL_SITES, JETPACK_PRODUCT_RECCOMENDATION_MAP */
/* harmony import */ var _wpcom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2400);

const GROUP_JETPACK = 'GROUP_JETPACK';

// Products
const PRODUCT_JETPACK_AI_BI_YEARLY = 'jetpack_ai_bi_yearly';
const PRODUCT_JETPACK_AI_BI_YEARLY_100 = 'jetpack_ai_bi_yearly:-q-100';
const PRODUCT_JETPACK_AI_BI_YEARLY_200 = 'jetpack_ai_bi_yearly:-q-200';
const PRODUCT_JETPACK_AI_BI_YEARLY_500 = 'jetpack_ai_bi_yearly:-q-500';
const PRODUCT_JETPACK_AI_BI_YEARLY_750 = 'jetpack_ai_bi_yearly:-q-750';
const PRODUCT_JETPACK_AI_BI_YEARLY_1000 = 'jetpack_ai_bi_yearly:-q-1000';
const PRODUCT_JETPACK_AI_MONTHLY = 'jetpack_ai_monthly';
const PRODUCT_JETPACK_AI_MONTHLY_100 = 'jetpack_ai_monthly:-q-100';
const PRODUCT_JETPACK_AI_MONTHLY_200 = 'jetpack_ai_monthly:-q-200';
const PRODUCT_JETPACK_AI_MONTHLY_500 = 'jetpack_ai_monthly:-q-500';
const PRODUCT_JETPACK_AI_MONTHLY_750 = 'jetpack_ai_monthly:-q-750';
const PRODUCT_JETPACK_AI_MONTHLY_1000 = 'jetpack_ai_monthly:-q-1000';
const PRODUCT_JETPACK_AI_YEARLY = 'jetpack_ai_yearly';
const PRODUCT_JETPACK_AI_YEARLY_100 = 'jetpack_ai_yearly:-q-100';
const PRODUCT_JETPACK_AI_YEARLY_200 = 'jetpack_ai_yearly:-q-200';
const PRODUCT_JETPACK_AI_YEARLY_500 = 'jetpack_ai_yearly:-q-500';
const PRODUCT_JETPACK_AI_YEARLY_750 = 'jetpack_ai_yearly:-q-750';
const PRODUCT_JETPACK_AI_YEARLY_1000 = 'jetpack_ai_yearly:-q-1000';
const PRODUCT_JETPACK_BOOST_BI_YEARLY = 'jetpack_boost_bi_yearly';
const PRODUCT_JETPACK_BOOST = 'jetpack_boost_yearly';
const PRODUCT_JETPACK_BOOST_MONTHLY = 'jetpack_boost_monthly';
const PRODUCT_JETPACK_BACKUP = 'jetpack_backup';
const PRODUCT_JETPACK_BACKUP_T0_YEARLY = 'jetpack_backup_t0_yearly';
const PRODUCT_JETPACK_BACKUP_T0_MONTHLY = 'jetpack_backup_t0_monthly';
const PRODUCT_JETPACK_BACKUP_T1_YEARLY = 'jetpack_backup_t1_yearly';
const PRODUCT_JETPACK_BACKUP_T1_BI_YEARLY = 'jetpack_backup_t1_bi_yearly';
const PRODUCT_JETPACK_BACKUP_T1_MONTHLY = 'jetpack_backup_t1_monthly';
const PRODUCT_JETPACK_BACKUP_T2_YEARLY = 'jetpack_backup_t2_yearly';
const PRODUCT_JETPACK_BACKUP_T2_MONTHLY = 'jetpack_backup_t2_monthly';
const PRODUCT_JETPACK_SCAN_BI_YEARLY = 'jetpack_scan_bi_yearly';
const PRODUCT_JETPACK_SCAN = 'jetpack_scan';
const PRODUCT_JETPACK_SCAN_MONTHLY = 'jetpack_scan_monthly';
const PRODUCT_JETPACK_SCAN_REALTIME = 'jetpack_scan_realtime';
const PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY = 'jetpack_scan_realtime_monthly';
const PRODUCT_JETPACK_ANTI_SPAM_BI_YEARLY = 'jetpack_anti_spam_bi_yearly';
const PRODUCT_JETPACK_ANTI_SPAM = 'jetpack_anti_spam';
const PRODUCT_JETPACK_ANTI_SPAM_MONTHLY = 'jetpack_anti_spam_monthly';
const PRODUCT_JETPACK_SEARCH_BI_YEARLY = 'jetpack_search_bi_yearly';
const PRODUCT_JETPACK_SEARCH = 'jetpack_search';
const PRODUCT_JETPACK_SEARCH_FREE = 'jetpack_search_free';
const PRODUCT_JETPACK_SEARCH_MONTHLY = 'jetpack_search_monthly';
const PRODUCT_JETPACK_CRM = 'jetpack_crm';
const PRODUCT_JETPACK_CRM_MONTHLY = 'jetpack_crm_monthly';
const PRODUCT_JETPACK_CRM_FREE = 'jetpack_crm_free';
const PRODUCT_JETPACK_CRM_FREE_MONTHLY = 'jetpack_crm_free_monthly';
const PRODUCT_JETPACK_VIDEOPRESS_BI_YEARLY = 'jetpack_videopress_bi_yearly';
const PRODUCT_JETPACK_VIDEOPRESS = 'jetpack_videopress';
const PRODUCT_JETPACK_VIDEOPRESS_MONTHLY = 'jetpack_videopress_monthly';
const PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY = 'jetpack_social_basic_bi_yearly';
const PRODUCT_JETPACK_SOCIAL_BASIC = 'jetpack_social_basic_yearly';
const PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY = 'jetpack_social_basic_monthly';
const PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY = 'jetpack_social_advanced_bi_yearly';
const PRODUCT_JETPACK_SOCIAL_ADVANCED = 'jetpack_social_advanced_yearly';
const PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY = 'jetpack_social_advanced_monthly';
const PRODUCT_JETPACK_SOCIAL_V1_BI_YEARLY = 'jetpack_social_v1_bi_yearly';
const PRODUCT_JETPACK_SOCIAL_V1_YEARLY = 'jetpack_social_v1_yearly';
const PRODUCT_JETPACK_SOCIAL_V1_MONTHLY = 'jetpack_social_v1_monthly';
const PRODUCT_JETPACK_STATS_MONTHLY = 'jetpack_stats_monthly';
const PRODUCT_JETPACK_STATS_MONTHLY_10K = 'jetpack_stats_monthly:-q-10000';
const PRODUCT_JETPACK_STATS_MONTHLY_100K = 'jetpack_stats_monthly:-q-100000';
const PRODUCT_JETPACK_STATS_MONTHLY_250K = 'jetpack_stats_monthly:-q-250000';
const PRODUCT_JETPACK_STATS_MONTHLY_500K = 'jetpack_stats_monthly:-q-500000';
const PRODUCT_JETPACK_STATS_MONTHLY_1M = 'jetpack_stats_monthly:-q-1000000';
const PRODUCT_JETPACK_STATS_YEARLY = 'jetpack_stats_yearly';
const PRODUCT_JETPACK_STATS_YEARLY_10K = 'jetpack_stats_yearly:-q-10000';
const PRODUCT_JETPACK_STATS_YEARLY_100K = 'jetpack_stats_yearly:-q-100000';
const PRODUCT_JETPACK_STATS_YEARLY_250K = 'jetpack_stats_yearly:-q-250000';
const PRODUCT_JETPACK_STATS_YEARLY_500K = 'jetpack_stats_yearly:-q-500000';
const PRODUCT_JETPACK_STATS_YEARLY_1M = 'jetpack_stats_yearly:-q-1000000';
const PRODUCT_JETPACK_STATS_BI_YEARLY = 'jetpack_stats_bi_yearly';
const PRODUCT_JETPACK_STATS_BI_YEARLY_10K = 'jetpack_stats_bi_yearly:-q-10000';
const PRODUCT_JETPACK_STATS_BI_YEARLY_100K = 'jetpack_stats_bi_yearly:-q-100000';
const PRODUCT_JETPACK_STATS_BI_YEARLY_250K = 'jetpack_stats_bi_yearly:-q-250000';
const PRODUCT_JETPACK_STATS_BI_YEARLY_500K = 'jetpack_stats_bi_yearly:-q-500000';
const PRODUCT_JETPACK_STATS_BI_YEARLY_1M = 'jetpack_stats_bi_yearly:-q-1000000';
const PRODUCT_JETPACK_STATS_PWYW_YEARLY = 'jetpack_stats_pwyw_yearly';
const PRODUCT_JETPACK_STATS_FREE = 'jetpack_stats_free_yearly';
const PRODUCT_JETPACK_MONITOR_YEARLY = 'jetpack_monitor_yearly';
const PRODUCT_JETPACK_MONITOR_MONTHLY = 'jetpack_monitor_monthly';
const PRODUCT_JETPACK_MONITOR = (/* unused pure expression or super */ null && (PRODUCT_JETPACK_MONITOR_YEARLY));
const PRODUCT_JETPACK_CREATOR_BI_YEARLY = 'jetpack_creator_bi_yearly';
const PRODUCT_JETPACK_CREATOR_YEARLY = 'jetpack_creator_yearly';
const PRODUCT_JETPACK_CREATOR_MONTHLY = 'jetpack_creator_monthly';

//add-on products
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_MONTHLY = 'jetpack_backup_addon_storage_10gb_monthly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_MONTHLY = 'jetpack_backup_addon_storage_100gb_monthly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_MONTHLY = 'jetpack_backup_addon_storage_1tb_monthly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_3TB_MONTHLY = 'jetpack_backup_addon_storage_3tb_monthly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_5TB_MONTHLY = 'jetpack_backup_addon_storage_5tb_monthly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_YEARLY = 'jetpack_backup_addon_storage_10gb_yearly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_YEARLY = 'jetpack_backup_addon_storage_100gb_yearly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_YEARLY = 'jetpack_backup_addon_storage_1tb_yearly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_3TB_YEARLY = 'jetpack_backup_addon_storage_3tb_yearly';
const PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_5TB_YEARLY = 'jetpack_backup_addon_storage_5tb_yearly';

// Legacy Products
const PRODUCT_JETPACK_BACKUP_DAILY = 'jetpack_backup_daily';
const PRODUCT_JETPACK_BACKUP_REALTIME = 'jetpack_backup_realtime';
const PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY = 'jetpack_backup_daily_monthly';
const PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY = 'jetpack_backup_realtime_monthly';

// Woo Extensions
const PRODUCT_WOOCOMMERCE_BOOKINGS = 'woocommerce_bookings_yearly';
const PRODUCT_WOOCOMMERCE_SUBSCRIPTIONS = 'woocommerce_subscriptions_yearly';
const PRODUCT_WOOCOMMERCE_PRODUCT_BUNDLES = 'woocommerce_product_bundles_yearly';
const PRODUCT_WOOCOMMERCE_PRODUCT_ADD_ONS = 'woocommerce_product_add_ons_yearly';
const PRODUCT_WOOCOMMERCE_MINMAX_QUANTITIES = 'woocommerce_minmax_quantities_yearly';
const PRODUCT_WOOCOMMERCE_AUTOMATEWOO = 'woocommerce_automatewoo_yearly';
const PRODUCT_WOOCOMMERCE_ADVANCED_NOTIFICATIONS = 'woocommerce_advanced_notifications_yearly';
const PRODUCT_WOOCOMMERCE_ALL_PRODUCTS_WOO_SUBSCRIPTIONS = 'woocommerce_all_products_woo_subscriptions_yearly';
const PRODUCT_WOOCOMMERCE_AUTOMATEWOO_BIRTHDAYS = 'woocommerce_automatewoo_birthdays_yearly';
const PRODUCT_WOOCOMMERCE_AUTOMATEWOO_REFER_A_FRIEND = 'woocommerce_automatewoo_refer_a_friend_yearly';
const PRODUCT_WOOCOMMERCE_BACK_IN_STOCK_NOTIFICATIONS = 'woocommerce_back_in_stock_notifications_yearly';
const PRODUCT_WOOCOMMERCE_BULK_STOCK_MANAGEMENT = 'woocommerce_bulk_stock_management_yearly';
const PRODUCT_WOOCOMMERCE_CHECKOUT_FIELD_EDITOR = 'woocommerce_checkout_field_editor_yearly';
const PRODUCT_WOOCOMMERCE_COMPOSITE_PRODUCTS = 'woocommerce_composite_products_yearly';
const PRODUCT_WOOCOMMERCE_CONDITIONAL_SHIPPING_PAYMENTS = 'woocommerce_conditional_shipping_payments_yearly';
const PRODUCT_WOOCOMMERCE_EU_VAT_NUMBER = 'woocommerce_eu_vat_number_yearly';
const PRODUCT_WOOCOMMERCE_FLAT_RATE_BOX_SHIPPING = 'woocommerce_flat_rate_box_shipping_yearly';
const PRODUCT_WOOCOMMERCE_GIFT_CARDS = 'woocommerce_gift_cards_yearly';
const PRODUCT_WOOCOMMERCE_GIFTING_WC_SUBSCRIPTIONS = 'woocommerce_gifting_wc_subscriptions_yearly';
const PRODUCT_WOOCOMMERCE_PER_PRODUCT_SHIPPING = 'woocommerce_per_product_shipping_yearly';
const PRODUCT_WOOCOMMERCE_PRODUCT_CSV_IMPORT_SUITE = 'woocommerce_product_csv_import_suite_yearly';
const PRODUCT_WOOCOMMERCE_PRODUCT_RECOMMENDATIONS = 'woocommerce_product_recommendations_yearly';
const PRODUCT_WOOCOMMERCE_PRODUCT_VENDORS = 'woocommerce_product_vendors_yearly';
const PRODUCT_WOOCOMMERCE_RETURNS_WARRANTY_REQUESTS = 'woocommerce_returns_warranty_requests_yearly';
const PRODUCT_WOOCOMMERCE_SUBSCRIPTION_DOWNLOADS = 'woocommerce_subscription_downloads_yearly';
const PRODUCT_WOOCOMMERCE_SHIPMENT_TRACKING = 'woocommerce_shipment_tracking_yearly';
const PRODUCT_WOOCOMMERCE_SHIPPING_MULTIPLE_ADDRESSES = 'woocommerce_shipping_multiple_addresses_yearly';
const PRODUCT_WOOCOMMERCE_STOREFRONT_EXTENSIONS_BUNDLE = 'woocommerce_storefront_extensions_bundle_yearly';
const PRODUCT_WOOCOMMERCE_TABLE_RATE_SHIPPING = 'woocommerce_table_rate_shipping_yearly';
const PRODUCT_WOOCOMMERCE_ADDITIONAL_IMAGE_VARIATIONS = 'woocommerce_additional_image_variations_yearly';
const PRODUCT_WOOCOMMERCE_BOOKINGS_AVAILABILITY = 'woocommerce_bookings_availability_yearly';
const PRODUCT_WOOCOMMERCE_BOX_OFFICE = 'woocommerce_box_office_yearly';
const PRODUCT_WOOCOMMERCE_BRANDS = 'woocommerce_brands_yearly';
const PRODUCT_WOOCOMMERCE_COUPON_CAMPAIGNS = 'woocommerce_coupon_campaigns_yearly';
const PRODUCT_WOOCOMMERCE_DEPOSITS = 'woocommerce_deposits_yearly';
const PRODUCT_WOOCOMMERCE_DISTANCE_RATE_SHIPPING = 'woocommerce_distance_rate_shipping_yearly';
const PRODUCT_WOOCOMMERCE_ONE_PAGE_CHECKOUT = 'woocommerce_one_page_checkout_yearly';
const PRODUCT_WOOCOMMERCE_ORDER_BARCODES = 'woocommerce_order_barcodes_yearly';
const PRODUCT_WOOCOMMERCE_POINTS_AND_REWARDS = 'woocommerce_points_and_rewards_yearly';
const PRODUCT_WOOCOMMERCE_PRE_ORDERS = 'woocommerce_pre_orders_yearly';
const PRODUCT_WOOCOMMERCE_PURCHASE_ORDER_GATEWAY = 'woocommerce_purchase_order_gateway_yearly';
const PRODUCT_WOOCOMMERCE_SHIPPING = 'woocommerce_shipping_yearly';
const PRODUCT_WOOCOMMERCE_ACCOMMODATIONS_BOOKINGS = 'woocommerce_accommodations_bookings_yearly';
const PRODUCT_WOOCOMMERCE_TAX = 'woocommerce_tax_yearly';
const PRODUCT_WOOCOMMERCE_WOOPAYMENTS = 'woocommerce_woopayments_yearly';

// Backup
const JETPACK_BACKUP_PRODUCTS_YEARLY = [PRODUCT_JETPACK_BACKUP_DAILY, PRODUCT_JETPACK_BACKUP_REALTIME, PRODUCT_JETPACK_BACKUP_T0_YEARLY, PRODUCT_JETPACK_BACKUP_T1_YEARLY, PRODUCT_JETPACK_BACKUP_T2_YEARLY];
const JETPACK_BACKUP_PRODUCTS_MONTHLY = [PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY, PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY, PRODUCT_JETPACK_BACKUP_T0_MONTHLY, PRODUCT_JETPACK_BACKUP_T1_MONTHLY, PRODUCT_JETPACK_BACKUP_T2_MONTHLY];
const JETPACK_BACKUP_PRODUCTS = [PRODUCT_JETPACK_BACKUP_T1_BI_YEARLY, ...JETPACK_BACKUP_PRODUCTS_YEARLY, ...JETPACK_BACKUP_PRODUCTS_MONTHLY];
const JETPACK_BACKUP_ADDON_MONTHLY = [PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_3TB_MONTHLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_5TB_MONTHLY];
const JETPACK_BACKUP_ADDON_YEARLY = [PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_3TB_YEARLY, PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_5TB_YEARLY];
const JETPACK_BACKUP_ADDON_PRODUCTS = [...JETPACK_BACKUP_ADDON_MONTHLY, ...JETPACK_BACKUP_ADDON_YEARLY];
const JETPACK_BACKUP_T0_PRODUCTS = [PRODUCT_JETPACK_BACKUP_T0_MONTHLY, PRODUCT_JETPACK_BACKUP_T0_YEARLY];
const JETPACK_BACKUP_T1_PRODUCTS = [PRODUCT_JETPACK_BACKUP_T1_BI_YEARLY, PRODUCT_JETPACK_BACKUP_T1_MONTHLY, PRODUCT_JETPACK_BACKUP_T1_YEARLY];
const JETPACK_BACKUP_T2_PRODUCTS = [PRODUCT_JETPACK_BACKUP_T2_MONTHLY, PRODUCT_JETPACK_BACKUP_T2_YEARLY];
// Boost
const JETPACK_BOOST_PRODUCTS = [PRODUCT_JETPACK_BOOST_BI_YEARLY, PRODUCT_JETPACK_BOOST, PRODUCT_JETPACK_BOOST_MONTHLY];

// Scan
const JETPACK_SCAN_PRODUCTS = [PRODUCT_JETPACK_SCAN_BI_YEARLY, PRODUCT_JETPACK_SCAN, PRODUCT_JETPACK_SCAN_MONTHLY, PRODUCT_JETPACK_SCAN_REALTIME, PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY];

// Social Basic
const JETPACK_SOCIAL_BASIC_PRODUCTS = [PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY, PRODUCT_JETPACK_SOCIAL_BASIC, PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY];

// Social Advanced
const JETPACK_SOCIAL_ADVANCED_PRODUCTS = [PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY, PRODUCT_JETPACK_SOCIAL_ADVANCED, PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY];
const JETPACK_SOCIAL_V1_PRODUCTS = [PRODUCT_JETPACK_SOCIAL_V1_BI_YEARLY, PRODUCT_JETPACK_SOCIAL_V1_YEARLY, PRODUCT_JETPACK_SOCIAL_V1_MONTHLY];

// Social
const JETPACK_SOCIAL_PRODUCTS = [...JETPACK_SOCIAL_BASIC_PRODUCTS, ...JETPACK_SOCIAL_ADVANCED_PRODUCTS, ...JETPACK_SOCIAL_V1_PRODUCTS];

// Stats
const JETPACK_STATS_PRODUCTS = [PRODUCT_JETPACK_STATS_BI_YEARLY, PRODUCT_JETPACK_STATS_YEARLY, PRODUCT_JETPACK_STATS_MONTHLY, PRODUCT_JETPACK_STATS_PWYW_YEARLY, PRODUCT_JETPACK_STATS_FREE];

// Anti-spam
const JETPACK_ANTI_SPAM_PRODUCTS = [PRODUCT_JETPACK_ANTI_SPAM_BI_YEARLY, PRODUCT_JETPACK_ANTI_SPAM, PRODUCT_JETPACK_ANTI_SPAM_MONTHLY];

// Search
const JETPACK_SEARCH_PRODUCTS = [PRODUCT_JETPACK_SEARCH_BI_YEARLY, PRODUCT_JETPACK_SEARCH, PRODUCT_JETPACK_SEARCH_MONTHLY, PRODUCT_JETPACK_SEARCH_FREE, _wpcom__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_WPCOM_SEARCH */ .o5, _wpcom__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_WPCOM_SEARCH_MONTHLY */ .k2];

// CRM
const JETPACK_CRM_PRODUCTS = [PRODUCT_JETPACK_CRM, PRODUCT_JETPACK_CRM_MONTHLY];
const JETPACK_CRM_FREE_PRODUCTS = [PRODUCT_JETPACK_CRM_FREE, PRODUCT_JETPACK_CRM_FREE_MONTHLY];

// VideoPress
const JETPACK_VIDEOPRESS_PRODUCTS = [PRODUCT_JETPACK_VIDEOPRESS_BI_YEARLY, PRODUCT_JETPACK_VIDEOPRESS, PRODUCT_JETPACK_VIDEOPRESS_MONTHLY];

// Monitor
const JETPACK_MONITOR_PRODUCTS = [PRODUCT_JETPACK_MONITOR_YEARLY, PRODUCT_JETPACK_MONITOR_MONTHLY];
const JETPACK_AI_PRODUCTS = [PRODUCT_JETPACK_AI_BI_YEARLY, PRODUCT_JETPACK_AI_MONTHLY, PRODUCT_JETPACK_AI_YEARLY];
const JETPACK_AI_ALIASES = [PRODUCT_JETPACK_AI_BI_YEARLY_100, PRODUCT_JETPACK_AI_BI_YEARLY_200, PRODUCT_JETPACK_AI_BI_YEARLY_500, PRODUCT_JETPACK_AI_BI_YEARLY_750, PRODUCT_JETPACK_AI_BI_YEARLY_1000, PRODUCT_JETPACK_AI_MONTHLY_100, PRODUCT_JETPACK_AI_MONTHLY_200, PRODUCT_JETPACK_AI_MONTHLY_500, PRODUCT_JETPACK_AI_MONTHLY_750, PRODUCT_JETPACK_AI_MONTHLY_1000, PRODUCT_JETPACK_AI_YEARLY_100, PRODUCT_JETPACK_AI_YEARLY_200, PRODUCT_JETPACK_AI_YEARLY_500, PRODUCT_JETPACK_AI_YEARLY_750, PRODUCT_JETPACK_AI_YEARLY_1000];
const JETPACK_STATS_ALIASES = [PRODUCT_JETPACK_STATS_BI_YEARLY_10K, PRODUCT_JETPACK_STATS_BI_YEARLY_100K, PRODUCT_JETPACK_STATS_BI_YEARLY_250K, PRODUCT_JETPACK_STATS_BI_YEARLY_500K, PRODUCT_JETPACK_STATS_BI_YEARLY_1M, PRODUCT_JETPACK_STATS_MONTHLY_10K, PRODUCT_JETPACK_STATS_MONTHLY_100K, PRODUCT_JETPACK_STATS_MONTHLY_250K, PRODUCT_JETPACK_STATS_MONTHLY_500K, PRODUCT_JETPACK_STATS_MONTHLY_1M, PRODUCT_JETPACK_STATS_YEARLY_10K, PRODUCT_JETPACK_STATS_YEARLY_100K, PRODUCT_JETPACK_STATS_YEARLY_250K, PRODUCT_JETPACK_STATS_YEARLY_500K, PRODUCT_JETPACK_STATS_YEARLY_1M];

// Creator
const JETPACK_CREATOR_PRODUCTS = [PRODUCT_JETPACK_CREATOR_BI_YEARLY, PRODUCT_JETPACK_CREATOR_YEARLY, PRODUCT_JETPACK_CREATOR_MONTHLY];

// WooCommerce Products
const WOOCOMMERCE_PRODUCTS = [PRODUCT_WOOCOMMERCE_BOOKINGS, PRODUCT_WOOCOMMERCE_SUBSCRIPTIONS, PRODUCT_WOOCOMMERCE_PRODUCT_BUNDLES, PRODUCT_WOOCOMMERCE_PRODUCT_ADD_ONS, PRODUCT_WOOCOMMERCE_MINMAX_QUANTITIES, PRODUCT_WOOCOMMERCE_AUTOMATEWOO, PRODUCT_WOOCOMMERCE_ADVANCED_NOTIFICATIONS, PRODUCT_WOOCOMMERCE_ALL_PRODUCTS_WOO_SUBSCRIPTIONS, PRODUCT_WOOCOMMERCE_AUTOMATEWOO_BIRTHDAYS, PRODUCT_WOOCOMMERCE_AUTOMATEWOO_REFER_A_FRIEND, PRODUCT_WOOCOMMERCE_BACK_IN_STOCK_NOTIFICATIONS, PRODUCT_WOOCOMMERCE_BULK_STOCK_MANAGEMENT, PRODUCT_WOOCOMMERCE_CHECKOUT_FIELD_EDITOR, PRODUCT_WOOCOMMERCE_COMPOSITE_PRODUCTS, PRODUCT_WOOCOMMERCE_CONDITIONAL_SHIPPING_PAYMENTS, PRODUCT_WOOCOMMERCE_EU_VAT_NUMBER, PRODUCT_WOOCOMMERCE_FLAT_RATE_BOX_SHIPPING, PRODUCT_WOOCOMMERCE_GIFT_CARDS, PRODUCT_WOOCOMMERCE_GIFTING_WC_SUBSCRIPTIONS, PRODUCT_WOOCOMMERCE_PER_PRODUCT_SHIPPING, PRODUCT_WOOCOMMERCE_PRODUCT_CSV_IMPORT_SUITE, PRODUCT_WOOCOMMERCE_PRODUCT_RECOMMENDATIONS, PRODUCT_WOOCOMMERCE_PRODUCT_VENDORS, PRODUCT_WOOCOMMERCE_RETURNS_WARRANTY_REQUESTS, PRODUCT_WOOCOMMERCE_SUBSCRIPTION_DOWNLOADS, PRODUCT_WOOCOMMERCE_SHIPMENT_TRACKING, PRODUCT_WOOCOMMERCE_SHIPPING_MULTIPLE_ADDRESSES, PRODUCT_WOOCOMMERCE_STOREFRONT_EXTENSIONS_BUNDLE, PRODUCT_WOOCOMMERCE_TABLE_RATE_SHIPPING, PRODUCT_WOOCOMMERCE_ADDITIONAL_IMAGE_VARIATIONS, PRODUCT_WOOCOMMERCE_BOOKINGS_AVAILABILITY, PRODUCT_WOOCOMMERCE_BOX_OFFICE, PRODUCT_WOOCOMMERCE_BRANDS, PRODUCT_WOOCOMMERCE_COUPON_CAMPAIGNS, PRODUCT_WOOCOMMERCE_DEPOSITS, PRODUCT_WOOCOMMERCE_DISTANCE_RATE_SHIPPING, PRODUCT_WOOCOMMERCE_ONE_PAGE_CHECKOUT, PRODUCT_WOOCOMMERCE_ORDER_BARCODES, PRODUCT_WOOCOMMERCE_POINTS_AND_REWARDS, PRODUCT_WOOCOMMERCE_PRE_ORDERS, PRODUCT_WOOCOMMERCE_PURCHASE_ORDER_GATEWAY, PRODUCT_WOOCOMMERCE_SHIPPING, PRODUCT_WOOCOMMERCE_ACCOMMODATIONS_BOOKINGS, PRODUCT_WOOCOMMERCE_TAX, PRODUCT_WOOCOMMERCE_WOOPAYMENTS];
const JETPACK_PRODUCTS_LIST = [...JETPACK_BACKUP_PRODUCTS, ...JETPACK_BOOST_PRODUCTS, ...JETPACK_SCAN_PRODUCTS, ...JETPACK_ANTI_SPAM_PRODUCTS, ...JETPACK_SEARCH_PRODUCTS, ...JETPACK_VIDEOPRESS_PRODUCTS, ...JETPACK_SOCIAL_PRODUCTS, ...JETPACK_BACKUP_ADDON_PRODUCTS, ...JETPACK_AI_PRODUCTS, ...JETPACK_STATS_PRODUCTS, ...JETPACK_MONITOR_PRODUCTS, ...JETPACK_CREATOR_PRODUCTS, ...JETPACK_SOCIAL_V1_PRODUCTS];

// Aliases are for products with quantity slugs in checkout (ex. jetpack-ai-yearly:-q-100)
// These are here to help with handling product quantity in situations where infrastructure is not aware of it
const JETPACK_ALIAS_LIST = [...JETPACK_AI_ALIASES, ...JETPACK_STATS_ALIASES];

// Defines Jetpack products with multiple tiers
const JETPACK_TIERED_PRODUCTS = [...JETPACK_AI_PRODUCTS, ...JETPACK_STATS_PRODUCTS];

// Defines Jetpack products with multiple product options (ex. Social Basic/Social Advanced)
const JETPACK_MULTI_OPTION_PRODUCTS = [...JETPACK_SOCIAL_PRODUCTS];
const JETPACK_PRODUCTS_BY_TERM = [{
  yearly: PRODUCT_JETPACK_BACKUP_DAILY,
  monthly: PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY
}, {
  yearly: PRODUCT_JETPACK_BACKUP_REALTIME,
  monthly: PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_SEARCH_BI_YEARLY,
  yearly: PRODUCT_JETPACK_SEARCH,
  monthly: PRODUCT_JETPACK_SEARCH_MONTHLY
}, {
  yearly: _wpcom__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_WPCOM_SEARCH */ .o5,
  monthly: _wpcom__WEBPACK_IMPORTED_MODULE_0__/* .PRODUCT_WPCOM_SEARCH_MONTHLY */ .k2
}, {
  biYearly: PRODUCT_JETPACK_SCAN_BI_YEARLY,
  yearly: PRODUCT_JETPACK_SCAN,
  monthly: PRODUCT_JETPACK_SCAN_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_ANTI_SPAM_BI_YEARLY,
  yearly: PRODUCT_JETPACK_ANTI_SPAM,
  monthly: PRODUCT_JETPACK_ANTI_SPAM_MONTHLY
}, {
  yearly: PRODUCT_JETPACK_CRM,
  monthly: PRODUCT_JETPACK_CRM_MONTHLY
}, {
  yearly: PRODUCT_JETPACK_CRM_FREE,
  monthly: PRODUCT_JETPACK_CRM_FREE_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_BACKUP_T1_BI_YEARLY,
  yearly: PRODUCT_JETPACK_BACKUP_T1_YEARLY,
  monthly: PRODUCT_JETPACK_BACKUP_T1_MONTHLY
}, {
  yearly: PRODUCT_JETPACK_BACKUP_T2_YEARLY,
  monthly: PRODUCT_JETPACK_BACKUP_T2_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_VIDEOPRESS_BI_YEARLY,
  yearly: PRODUCT_JETPACK_VIDEOPRESS,
  monthly: PRODUCT_JETPACK_VIDEOPRESS_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_BOOST_BI_YEARLY,
  yearly: PRODUCT_JETPACK_BOOST,
  monthly: PRODUCT_JETPACK_BOOST_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY,
  yearly: PRODUCT_JETPACK_SOCIAL_BASIC,
  monthly: PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY,
  yearly: PRODUCT_JETPACK_SOCIAL_ADVANCED,
  monthly: PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_STATS_BI_YEARLY,
  yearly: PRODUCT_JETPACK_STATS_YEARLY,
  monthly: PRODUCT_JETPACK_STATS_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_AI_BI_YEARLY,
  yearly: PRODUCT_JETPACK_AI_YEARLY,
  monthly: PRODUCT_JETPACK_AI_MONTHLY
}, {
  yearly: PRODUCT_JETPACK_MONITOR_YEARLY,
  monthly: PRODUCT_JETPACK_MONITOR_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_CREATOR_BI_YEARLY,
  yearly: PRODUCT_JETPACK_CREATOR_YEARLY,
  monthly: PRODUCT_JETPACK_CREATOR_MONTHLY
}, {
  biYearly: PRODUCT_JETPACK_SOCIAL_V1_BI_YEARLY,
  yearly: PRODUCT_JETPACK_SOCIAL_V1_YEARLY,
  monthly: PRODUCT_JETPACK_SOCIAL_V1_MONTHLY
}];
const JETPACK_PRODUCT_PRICE_MATRIX = {
  [PRODUCT_JETPACK_BACKUP_DAILY]: {
    relatedProduct: PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_BACKUP_REALTIME]: {
    relatedProduct: PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_BACKUP_T1_YEARLY]: {
    relatedProduct: PRODUCT_JETPACK_BACKUP_T1_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_BACKUP_T2_YEARLY]: {
    relatedProduct: PRODUCT_JETPACK_BACKUP_T2_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_BOOST]: {
    relatedProduct: PRODUCT_JETPACK_BOOST_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_SOCIAL_BASIC]: {
    relatedProduct: PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_SOCIAL_V1_YEARLY]: {
    relatedProduct: PRODUCT_JETPACK_SOCIAL_V1_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_SOCIAL_ADVANCED]: {
    relatedProduct: PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_SEARCH]: {
    relatedProduct: PRODUCT_JETPACK_SEARCH_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_SCAN]: {
    relatedProduct: PRODUCT_JETPACK_SCAN_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_ANTI_SPAM]: {
    relatedProduct: PRODUCT_JETPACK_ANTI_SPAM_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_VIDEOPRESS]: {
    relatedProduct: PRODUCT_JETPACK_VIDEOPRESS_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_MONITOR_YEARLY]: {
    relatedProduct: PRODUCT_JETPACK_MONITOR_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_STATS_YEARLY]: {
    relatedProduct: PRODUCT_JETPACK_STATS_MONTHLY,
    ratio: 12
  },
  [PRODUCT_JETPACK_CREATOR_YEARLY]: {
    relatedProduct: PRODUCT_JETPACK_CREATOR_MONTHLY,
    ratio: 12
  }
};
// Key/value: Superseding product/Products superseded (yearly terms)
const JETPACK_PRODUCT_UPGRADE_MAP = {
  [PRODUCT_JETPACK_BACKUP_T2_YEARLY]: [PRODUCT_JETPACK_BACKUP_T1_YEARLY],
  [PRODUCT_JETPACK_BACKUP_REALTIME]: [PRODUCT_JETPACK_BACKUP_DAILY]
};

// Plans
const PLAN_JETPACK_FREE = 'jetpack_free';
const PLAN_JETPACK_PERSONAL = 'jetpack_personal';
const PLAN_JETPACK_PERSONAL_MONTHLY = 'jetpack_personal_monthly';
const PLAN_JETPACK_PREMIUM = 'jetpack_premium';
const PLAN_JETPACK_PREMIUM_MONTHLY = 'jetpack_premium_monthly';
const PLAN_JETPACK_BUSINESS = 'jetpack_business';
const PLAN_JETPACK_BUSINESS_MONTHLY = 'jetpack_business_monthly';
const PLAN_JETPACK_SECURITY_T1_YEARLY = 'jetpack_security_t1_yearly';
const PLAN_JETPACK_SECURITY_T1_MONTHLY = 'jetpack_security_t1_monthly';
const PLAN_JETPACK_SECURITY_T1_BI_YEARLY = 'jetpack_security_t1_bi_yearly';
const PLAN_JETPACK_SECURITY_T2_YEARLY = 'jetpack_security_t2_yearly';
const PLAN_JETPACK_SECURITY_T2_MONTHLY = 'jetpack_security_t2_monthly';
const PLAN_JETPACK_COMPLETE_BI_YEARLY = 'jetpack_complete_bi_yearly';
const PLAN_JETPACK_COMPLETE = 'jetpack_complete';
const PLAN_JETPACK_COMPLETE_MONTHLY = 'jetpack_complete_monthly';
const PLAN_JETPACK_STARTER_YEARLY = 'jetpack_starter_yearly';
const PLAN_JETPACK_STARTER_MONTHLY = 'jetpack_starter_monthly';
const PLAN_JETPACK_GOLDEN_TOKEN = 'jetpack_golden_token_lifetime';

// Legacy Security Plans
const PLAN_JETPACK_SECURITY_DAILY = 'jetpack_security_daily';
const PLAN_JETPACK_SECURITY_DAILY_MONTHLY = 'jetpack_security_daily_monthly';
const PLAN_JETPACK_SECURITY_REALTIME = 'jetpack_security_realtime';
const PLAN_JETPACK_SECURITY_REALTIME_MONTHLY = 'jetpack_security_realtime_monthly';

// Legacy (before offer reset)
const JETPACK_LEGACY_PLANS = [PLAN_JETPACK_PERSONAL, PLAN_JETPACK_PERSONAL_MONTHLY, PLAN_JETPACK_BUSINESS, PLAN_JETPACK_BUSINESS_MONTHLY, PLAN_JETPACK_PREMIUM, PLAN_JETPACK_PREMIUM_MONTHLY];
const JETPACK_MONTHLY_LEGACY_PLANS = [PLAN_JETPACK_PERSONAL_MONTHLY, PLAN_JETPACK_BUSINESS_MONTHLY, PLAN_JETPACK_PREMIUM_MONTHLY];
const JETPACK_YEARLY_LEGACY_PLANS = [PLAN_JETPACK_PERSONAL, PLAN_JETPACK_BUSINESS, PLAN_JETPACK_PREMIUM];
const JETPACK_LEGACY_PLANS_MAX_PLUGIN_VERSION = '8.9.1'; // Jetpack versions prior to this one are not fully compatible with new plans

// Security
const JETPACK_SECURITY_PLANS = [PLAN_JETPACK_SECURITY_DAILY, PLAN_JETPACK_SECURITY_DAILY_MONTHLY, PLAN_JETPACK_SECURITY_REALTIME, PLAN_JETPACK_SECURITY_REALTIME_MONTHLY, PLAN_JETPACK_SECURITY_T1_YEARLY, PLAN_JETPACK_SECURITY_T1_MONTHLY, PLAN_JETPACK_SECURITY_T1_BI_YEARLY, PLAN_JETPACK_SECURITY_T2_YEARLY, PLAN_JETPACK_SECURITY_T2_MONTHLY];
const JETPACK_SECURITY_T1_PLANS = [PLAN_JETPACK_SECURITY_T1_MONTHLY, PLAN_JETPACK_SECURITY_T1_YEARLY, PLAN_JETPACK_SECURITY_T1_BI_YEARLY];
const JETPACK_SECURITY_T2_PLANS = [PLAN_JETPACK_SECURITY_T2_MONTHLY, PLAN_JETPACK_SECURITY_T2_YEARLY];

// Complete
const JETPACK_COMPLETE_PLANS = [PLAN_JETPACK_COMPLETE_BI_YEARLY, PLAN_JETPACK_COMPLETE, PLAN_JETPACK_COMPLETE_MONTHLY];

// Starter
const JETPACK_STARTER_PLANS = [PLAN_JETPACK_STARTER_YEARLY, PLAN_JETPACK_STARTER_MONTHLY];
const JETPACK_MONTHLY_PLANS = [PLAN_JETPACK_PREMIUM_MONTHLY, PLAN_JETPACK_BUSINESS_MONTHLY, PLAN_JETPACK_PERSONAL_MONTHLY, PLAN_JETPACK_SECURITY_DAILY_MONTHLY, PLAN_JETPACK_SECURITY_REALTIME_MONTHLY, PLAN_JETPACK_SECURITY_T1_MONTHLY, PLAN_JETPACK_SECURITY_T2_MONTHLY, PLAN_JETPACK_COMPLETE_MONTHLY];
const JETPACK_RESET_PLANS = [...JETPACK_STARTER_PLANS, ...JETPACK_SECURITY_PLANS, ...JETPACK_COMPLETE_PLANS, PLAN_JETPACK_GOLDEN_TOKEN];
const JETPACK_RESET_PLANS_BY_TERM = [{
  biYearly: PLAN_JETPACK_COMPLETE_BI_YEARLY,
  yearly: PLAN_JETPACK_COMPLETE,
  monthly: PLAN_JETPACK_COMPLETE_MONTHLY
}, {
  yearly: PLAN_JETPACK_SECURITY_DAILY,
  monthly: PLAN_JETPACK_SECURITY_DAILY_MONTHLY
}, {
  yearly: PLAN_JETPACK_SECURITY_REALTIME,
  monthly: PLAN_JETPACK_SECURITY_REALTIME_MONTHLY
}, {
  biYearly: PLAN_JETPACK_SECURITY_T1_BI_YEARLY,
  yearly: PLAN_JETPACK_SECURITY_T1_YEARLY,
  monthly: PLAN_JETPACK_SECURITY_T1_MONTHLY
}, {
  yearly: PLAN_JETPACK_SECURITY_T2_YEARLY,
  monthly: PLAN_JETPACK_SECURITY_T2_MONTHLY
}, {
  yearly: PLAN_JETPACK_STARTER_YEARLY,
  monthly: PLAN_JETPACK_STARTER_MONTHLY
}];
const JETPACK_PLANS = [PLAN_JETPACK_FREE, ...JETPACK_LEGACY_PLANS, ...JETPACK_RESET_PLANS];
const JETPACK_PLANS_BY_TERM = [{
  yearly: PLAN_JETPACK_BUSINESS,
  monthly: PLAN_JETPACK_BUSINESS_MONTHLY
}, {
  yearly: PLAN_JETPACK_PERSONAL,
  monthly: PLAN_JETPACK_PERSONAL_MONTHLY
}, {
  yearly: PLAN_JETPACK_PREMIUM,
  monthly: PLAN_JETPACK_PREMIUM_MONTHLY
}, ...JETPACK_RESET_PLANS_BY_TERM];
const BEST_VALUE_PLANS = [PLAN_JETPACK_PREMIUM, PLAN_JETPACK_PREMIUM_MONTHLY];
// Key/value: Superseding plan/Plans superseded (yearly terms)
const JETPACK_PLAN_UPGRADE_MAP = {
  [PLAN_JETPACK_SECURITY_T2_YEARLY]: [PLAN_JETPACK_SECURITY_T1_YEARLY, PLAN_JETPACK_STARTER_YEARLY],
  [PLAN_JETPACK_SECURITY_T1_YEARLY]: [PLAN_JETPACK_STARTER_YEARLY],
  [PLAN_JETPACK_SECURITY_REALTIME]: [PLAN_JETPACK_SECURITY_DAILY],
  [PLAN_JETPACK_COMPLETE]: [PLAN_JETPACK_SECURITY_REALTIME, PLAN_JETPACK_SECURITY_DAILY, PLAN_JETPACK_SECURITY_T2_YEARLY, PLAN_JETPACK_SECURITY_T1_YEARLY, PLAN_JETPACK_STARTER_YEARLY]
};
const JETPACK_STARTER_UPGRADE_MAP = {
  [PLAN_JETPACK_STARTER_YEARLY]: PLAN_JETPACK_SECURITY_T1_YEARLY,
  [PLAN_JETPACK_STARTER_MONTHLY]: PLAN_JETPACK_SECURITY_T1_MONTHLY
};

// Categories
const JETPACK_SECURITY_CATEGORY = 'jetpack_security_category';
const JETPACK_PERFORMANCE_CATEGORY = 'jetpack_performance_category';
const JETPACK_GROWTH_CATEGORY = 'jetpack_growth_category';
const JETPACK_PRODUCT_CATEGORIES = [JETPACK_SECURITY_CATEGORY, JETPACK_PERFORMANCE_CATEGORY, JETPACK_GROWTH_CATEGORY];

// URL
const JETPACK_BACKUP_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/upgrade/backup/';
const JETPACK_SEARCH_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/upgrade/search/';
const JETPACK_STATS_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/stats/';
const JETPACK_SCAN_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/upgrade/scan/';
const JETPACK_ANTI_SPAM_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/upgrade/anti-spam/';
const JETPACK_BOOST_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/boost/';
const JETPACK_SOCIAL_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/social/';
const JETPACK_VIDEOPRESS_PRODUCT_LANDING_PAGE_URL = 'https://jetpack.com/videopress/';
const JETPACK_CRM_PRODUCT_LANDING_PAGE_URL = 'https://jetpackcrm.com/';
// If JETPACK_CLOUD_REDIRECT_CHECKOUT_TO_WPADMIN is true, checkout will redirect to the site's wp-admin,
// otherwise it will redirect to the JETPACK_REDIRECT_URL. Checkout references these constants in:
// client/my-sites/checkout/src/hooks/use-get-thank-you-url/get-thank-you-page-url.ts
const JETPACK_REDIRECT_CHECKOUT_TO_WPADMIN = true;
const JETPACK_REDIRECT_URL = 'https://jetpack.com/redirect/?source=jetpack-checkout-thankyou';

// Key/value maps related products to a given one
const JETPACK_RELATED_PRODUCTS_MAP = {
  [PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY]: [PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY, PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY],
  [PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY]: [PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY, PRODUCT_JETPACK_SOCIAL_BASIC_BI_YEARLY],
  [PRODUCT_JETPACK_SOCIAL_BASIC]: [PRODUCT_JETPACK_SOCIAL_ADVANCED, PRODUCT_JETPACK_SOCIAL_BASIC],
  [PRODUCT_JETPACK_SOCIAL_ADVANCED]: [PRODUCT_JETPACK_SOCIAL_ADVANCED, PRODUCT_JETPACK_SOCIAL_BASIC],
  [PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY]: [PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY, PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY],
  [PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY]: [PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY, PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY]
};

// Tags, 'Recommended for'
const JETPACK_TAG_FOR_WOOCOMMERCE_STORES = 'jetpack_tag_for_woocommerce_stores';
const JETPACK_TAG_FOR_NEWS_ORGANISATIONS = 'jetpack_tag_for_news_organisations';
const JETPACK_TAG_FOR_MEMBERSHIP_SITES = 'jetpack_tag_for_membership_sites';
const JETPACK_TAG_FOR_ONLINE_FORUMS = 'jetpack_tag_for_online_forums';
const JETPACK_TAG_FOR_BLOGS = 'jetpack_tag_for_blogs';
const JETPACK_TAG_FOR_VIDEOGRAPHERS = 'jetpack_tag_for_videographers';
const JETPACK_TAG_FOR_EDUCATORS = 'jetpack_tag_for_educators';
const JETPACK_TAG_FOR_BLOGGERS = 'jetpack_tag_for_bloggers';
const JETPACK_TAG_FOR_ALL_SITES = 'jetpack_tag_for_all_sites';
const JETPACK_TAG_FOR_SMALL_SITES = 'jetpack_tag_for_small_sites';

// Maps products to 'Recommended for' tags
const JETPACK_PRODUCT_RECCOMENDATION_MAP = {
  [PRODUCT_JETPACK_BACKUP_DAILY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BACKUP_REALTIME]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BACKUP_T1_YEARLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BACKUP_T1_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BACKUP_T2_YEARLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BACKUP_T2_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_VIDEOPRESS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_VIDEOGRAPHERS, JETPACK_TAG_FOR_EDUCATORS, JETPACK_TAG_FOR_BLOGS],
  [PRODUCT_JETPACK_VIDEOPRESS_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_VIDEOGRAPHERS, JETPACK_TAG_FOR_EDUCATORS, JETPACK_TAG_FOR_BLOGS],
  [PRODUCT_JETPACK_ANTI_SPAM]: [JETPACK_TAG_FOR_BLOGS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_ANTI_SPAM_MONTHLY]: [JETPACK_TAG_FOR_BLOGS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_SCAN]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_SCAN_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_SCAN_REALTIME]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_SEARCH]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_SEARCH_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS],
  [PRODUCT_JETPACK_BOOST]: [JETPACK_TAG_FOR_ALL_SITES],
  [PRODUCT_JETPACK_BOOST_MONTHLY]: [JETPACK_TAG_FOR_ALL_SITES],
  [PRODUCT_JETPACK_SOCIAL_BASIC]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_SOCIAL_ADVANCED]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_SOCIAL_V1_YEARLY]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_SOCIAL_V1_MONTHLY]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_SOCIAL_V1_BI_YEARLY]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_STATS_YEARLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES],
  [PRODUCT_JETPACK_STATS_MONTHLY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES],
  [PRODUCT_JETPACK_AI_MONTHLY]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_AI_YEARLY]: [JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_NEWS_ORGANISATIONS, JETPACK_TAG_FOR_MEMBERSHIP_SITES, JETPACK_TAG_FOR_ONLINE_FORUMS, JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_JETPACK_CREATOR_YEARLY]: [JETPACK_TAG_FOR_EDUCATORS, JETPACK_TAG_FOR_BLOGGERS, JETPACK_TAG_FOR_VIDEOGRAPHERS, JETPACK_TAG_FOR_MEMBERSHIP_SITES],
  // WooCommerce Extensions
  [PRODUCT_WOOCOMMERCE_BOOKINGS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_SUBSCRIPTIONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PRODUCT_BUNDLES]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PRODUCT_ADD_ONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_MINMAX_QUANTITIES]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_AUTOMATEWOO]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_ADVANCED_NOTIFICATIONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_ALL_PRODUCTS_WOO_SUBSCRIPTIONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_AUTOMATEWOO_BIRTHDAYS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_AUTOMATEWOO_REFER_A_FRIEND]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_BACK_IN_STOCK_NOTIFICATIONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_BULK_STOCK_MANAGEMENT]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_CHECKOUT_FIELD_EDITOR]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_COMPOSITE_PRODUCTS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_CONDITIONAL_SHIPPING_PAYMENTS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_EU_VAT_NUMBER]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_FLAT_RATE_BOX_SHIPPING]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_GIFT_CARDS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_GIFTING_WC_SUBSCRIPTIONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PER_PRODUCT_SHIPPING]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PRODUCT_CSV_IMPORT_SUITE]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PRODUCT_RECOMMENDATIONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PRODUCT_VENDORS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_RETURNS_WARRANTY_REQUESTS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_SUBSCRIPTION_DOWNLOADS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_SHIPMENT_TRACKING]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_SHIPPING_MULTIPLE_ADDRESSES]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_STOREFRONT_EXTENSIONS_BUNDLE]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_TABLE_RATE_SHIPPING]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_ADDITIONAL_IMAGE_VARIATIONS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_BOOKINGS_AVAILABILITY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_BOX_OFFICE]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_BRANDS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_COUPON_CAMPAIGNS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_DEPOSITS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_DISTANCE_RATE_SHIPPING]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_ONE_PAGE_CHECKOUT]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_ORDER_BARCODES]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_POINTS_AND_REWARDS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PRE_ORDERS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_PURCHASE_ORDER_GATEWAY]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_SHIPPING]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_ACCOMMODATIONS_BOOKINGS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_TAX]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES],
  [PRODUCT_WOOCOMMERCE_WOOPAYMENTS]: [JETPACK_TAG_FOR_WOOCOMMERCE_STORES]
};

/***/ }),

/***/ 2895:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $5: () => (/* binding */ TERM_BIENNIALLY),
/* harmony export */   Lf: () => (/* binding */ TERM_ANNUALLY),
/* harmony export */   SP: () => (/* binding */ TERM_CENTENNIALLY),
/* harmony export */   V0: () => (/* binding */ TERM_TRIENNIALLY),
/* harmony export */   he: () => (/* binding */ TERM_MONTHLY)
/* harmony export */ });
/* unused harmony exports TERM_QUADRENNIALLY, TERM_QUINQUENNIALLY, TERM_SEXENNIALLY, TERM_SEPTENNIALLY, TERM_OCTENNIALLY, TERM_NOVENNIALLY, TERM_DECENNIALLY, TERMS_LIST, URL_FRIENDLY_TERMS_MAPPING, PLAN_MONTHLY_PERIOD, PLAN_ANNUAL_PERIOD, PLAN_BIENNIAL_PERIOD, PLAN_TRIENNIAL_PERIOD, PLAN_QUADRENNIAL_PERIOD, PLAN_QUINQUENNIAL_PERIOD, PLAN_SEXENNIAL_PERIOD, PLAN_SEPTENNIAL_PERIOD, PLAN_OCTENNIAL_PERIOD, PLAN_NOVENNIAL_PERIOD, PLAN_DECENNIAL_PERIOD, PLAN_CENTENNIAL_PERIOD, PERIOD_LIST */
const TERM_MONTHLY = 'TERM_MONTHLY';
const TERM_ANNUALLY = 'TERM_ANNUALLY';
const TERM_BIENNIALLY = 'TERM_BIENNIALLY'; //2y
const TERM_TRIENNIALLY = 'TERM_TRIENNIALLY'; //3y
const TERM_QUADRENNIALLY = 'TERM_QUADRENNIALLY'; //4y
const TERM_QUINQUENNIALLY = 'TERM_QUINQUENNIALLY'; //5y
const TERM_SEXENNIALLY = 'TERM_SEXENNIALLY'; //6y
const TERM_SEPTENNIALLY = 'TERM_SEPTENNIALLY'; //7y
const TERM_OCTENNIALLY = 'TERM_OCTENNIALLY'; //8y
const TERM_NOVENNIALLY = 'TERM_NOVENNIALLY'; //9y
const TERM_DECENNIALLY = 'TERM_DECENNIALLY'; //10y
const TERM_CENTENNIALLY = 'TERM_CENTENNIALLY'; //100y

const TERMS_LIST = [TERM_MONTHLY, TERM_ANNUALLY, TERM_BIENNIALLY, TERM_TRIENNIALLY, TERM_QUADRENNIALLY, TERM_QUINQUENNIALLY, TERM_SEXENNIALLY, TERM_SEPTENNIALLY, TERM_OCTENNIALLY, TERM_NOVENNIALLY, TERM_DECENNIALLY, TERM_CENTENNIALLY];
const URL_FRIENDLY_TERMS_MAPPING = {
  monthly: TERM_MONTHLY,
  yearly: TERM_ANNUALLY,
  '2yearly': TERM_BIENNIALLY,
  '3yearly': TERM_TRIENNIALLY,
  '4yearly': TERM_QUADRENNIALLY,
  '5yearly': TERM_QUINQUENNIALLY,
  '6yearly': TERM_SEXENNIALLY,
  '7yearly': TERM_SEPTENNIALLY,
  '8yearly': TERM_OCTENNIALLY,
  '9yearly': TERM_NOVENNIALLY,
  '10yearly': TERM_DECENNIALLY,
  '100yearly': TERM_CENTENNIALLY
};
const PLAN_MONTHLY_PERIOD = 31;
const PLAN_ANNUAL_PERIOD = 365;
const PLAN_BIENNIAL_PERIOD = 730;
const PLAN_TRIENNIAL_PERIOD = 1095;
const PLAN_QUADRENNIAL_PERIOD = 1460;
const PLAN_QUINQUENNIAL_PERIOD = 1825;
const PLAN_SEXENNIAL_PERIOD = 2190;
const PLAN_SEPTENNIAL_PERIOD = 2555;
const PLAN_OCTENNIAL_PERIOD = 2920;
const PLAN_NOVENNIAL_PERIOD = 3285;
const PLAN_DECENNIAL_PERIOD = 3650;
const PLAN_CENTENNIAL_PERIOD = 36500;
const PERIOD_LIST = [PLAN_MONTHLY_PERIOD, PLAN_ANNUAL_PERIOD, PLAN_BIENNIAL_PERIOD, PLAN_TRIENNIAL_PERIOD, PLAN_QUADRENNIAL_PERIOD, PLAN_QUINQUENNIAL_PERIOD, PLAN_SEXENNIAL_PERIOD, PLAN_SEPTENNIAL_PERIOD, PLAN_OCTENNIAL_PERIOD, PLAN_NOVENNIAL_PERIOD, PLAN_DECENNIAL_PERIOD, PLAN_CENTENNIAL_PERIOD];

/***/ }),

/***/ 9433:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $R: () => (/* binding */ TYPE_GOLDEN_TOKEN),
/* harmony export */   $k: () => (/* binding */ TYPE_WOOEXPRESS_SMALL),
/* harmony export */   C5: () => (/* binding */ TYPE_SECURITY_T1),
/* harmony export */   JH: () => (/* binding */ TYPE_SECURITY_T2),
/* harmony export */   ME: () => (/* binding */ TYPE_SECURITY_DAILY),
/* harmony export */   O2: () => (/* binding */ TYPE_FREE),
/* harmony export */   P3: () => (/* binding */ TYPE_STARTER),
/* harmony export */   UQ: () => (/* binding */ TYPE_ECOMMERCE),
/* harmony export */   V4: () => (/* binding */ TYPE_ALL),
/* harmony export */   VS: () => (/* binding */ TYPE_PRO),
/* harmony export */   au: () => (/* binding */ TYPE_BLOGGER),
/* harmony export */   bk: () => (/* binding */ TYPE_WOO_EXPRESS_PLUS),
/* harmony export */   df: () => (/* binding */ TYPE_WOOEXPRESS_MEDIUM),
/* harmony export */   e8: () => (/* binding */ TYPE_BUSINESS),
/* harmony export */   gA: () => (/* binding */ TYPE_PERSONAL),
/* harmony export */   gf: () => (/* binding */ TYPE_SECURITY_REALTIME),
/* harmony export */   kh: () => (/* binding */ TYPE_JETPACK_STARTER),
/* harmony export */   lP: () => (/* binding */ TYPE_100_YEAR),
/* harmony export */   n4: () => (/* binding */ TYPE_PREMIUM),
/* harmony export */   nT: () => (/* binding */ TYPE_FLEXIBLE),
/* harmony export */   t0: () => (/* binding */ TYPE_ENTERPRISE_GRID_WPCOM),
/* harmony export */   zf: () => (/* binding */ TYPE_P2_PLUS)
/* harmony export */ });
/* unused harmony export TYPES_LIST */
const TYPE_FREE = 'TYPE_FREE';
const TYPE_BLOGGER = 'TYPE_BLOGGER';
const TYPE_PERSONAL = 'TYPE_PERSONAL';
const TYPE_PREMIUM = 'TYPE_PREMIUM';
const TYPE_BUSINESS = 'TYPE_BUSINESS';
const TYPE_100_YEAR = 'TYPE_100_YEAR';
const TYPE_ECOMMERCE = 'TYPE_ECOMMERCE';
const TYPE_ENTERPRISE_GRID_WPCOM = 'TYPE_ENTERPRISE_GRID_WPCOM';
const TYPE_WOOEXPRESS_SMALL = 'TYPE_WOOEXPRESS_SMALL';
const TYPE_WOOEXPRESS_MEDIUM = 'TYPE_WOOEXPRESS_MEDIUM';
const TYPE_WOO_EXPRESS_PLUS = 'TYPE_WOO_EXPRESS_PLUS';
const TYPE_SECURITY_DAILY = 'TYPE_SECURITY_DAILY';
const TYPE_SECURITY_REALTIME = 'TYPE_SECURITY_REALTIME';
const TYPE_SECURITY_T1 = 'TYPE_SECURITY_T1';
const TYPE_SECURITY_T2 = 'TYPE_SECURITY_T2';
const TYPE_JETPACK_STARTER = 'TYPE_JETPACK_STARTER';
const TYPE_ALL = 'TYPE_ALL';
const TYPE_P2_PLUS = 'TYPE_P2_PLUS';
const TYPE_FLEXIBLE = 'TYPE_FLEXIBLE';
const TYPE_PRO = 'TYPE_PRO';
const TYPE_STARTER = 'TYPE_STARTER';
const TYPE_GOLDEN_TOKEN = 'TYPE_GOLDEN_TOKEN';
const TYPES_LIST = [TYPE_FREE, TYPE_BLOGGER, TYPE_PERSONAL, TYPE_PREMIUM, TYPE_BUSINESS, TYPE_100_YEAR, TYPE_ECOMMERCE, TYPE_ENTERPRISE_GRID_WPCOM, TYPE_WOOEXPRESS_SMALL, TYPE_WOOEXPRESS_MEDIUM, TYPE_WOO_EXPRESS_PLUS, TYPE_SECURITY_DAILY, TYPE_SECURITY_REALTIME, TYPE_ALL, TYPE_P2_PLUS, TYPE_FLEXIBLE, TYPE_PRO, TYPE_STARTER, TYPE_GOLDEN_TOKEN, TYPE_JETPACK_STARTER, TYPE_SECURITY_T1, TYPE_SECURITY_T2];

/***/ }),

/***/ 2400:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AD: () => (/* binding */ PLAN_PREMIUM_2_YEARS),
/* harmony export */   Ap: () => (/* binding */ PLAN_P2_FREE),
/* harmony export */   BC: () => (/* binding */ PLAN_WPCOM_STARTER),
/* harmony export */   Bk: () => (/* binding */ PLAN_WPCOM_PRO),
/* harmony export */   CR: () => (/* binding */ PLAN_BUSINESS_3_YEARS),
/* harmony export */   DH: () => (/* binding */ PLAN_ECOMMERCE),
/* harmony export */   Dj: () => (/* binding */ PLAN_BLUEHOST_CLOUD_2Y),
/* harmony export */   E$: () => (/* binding */ PLAN_ECOMMERCE_TRIAL_MONTHLY),
/* harmony export */   EX: () => (/* binding */ PLAN_PERSONAL_3_YEARS),
/* harmony export */   Ey: () => (/* binding */ PLAN_HOSTING_TRIAL_MONTHLY),
/* harmony export */   FP: () => (/* binding */ PLAN_BLOGGER_2_YEARS),
/* harmony export */   Ft: () => (/* binding */ GROUP_P2),
/* harmony export */   Gi: () => (/* binding */ PLAN_PREMIUM),
/* harmony export */   JZ: () => (/* binding */ PLAN_PERSONAL),
/* harmony export */   LP: () => (/* binding */ PLAN_WPCOM_FLEXIBLE),
/* harmony export */   M4: () => (/* binding */ PLAN_P2_PLUS),
/* harmony export */   Ol: () => (/* binding */ PLAN_PREMIUM_MONTHLY),
/* harmony export */   Ou: () => (/* binding */ PLAN_WOOEXPRESS_MEDIUM),
/* harmony export */   P: () => (/* binding */ PLAN_WOOEXPRESS_PLUS),
/* harmony export */   PE: () => (/* binding */ PLAN_BLOGGER),
/* harmony export */   Pi: () => (/* binding */ PLAN_BLUEHOST_CLOUD),
/* harmony export */   Qf: () => (/* binding */ PLAN_WOOEXPRESS_SMALL_MONTHLY),
/* harmony export */   T7: () => (/* binding */ PLAN_FREE),
/* harmony export */   Uv: () => (/* binding */ PLAN_BLUEHOST_CLOUD_3Y),
/* harmony export */   ZL: () => (/* binding */ PLAN_BUSINESS_MONTHLY),
/* harmony export */   Zc: () => (/* binding */ PLAN_PERSONAL_MONTHLY),
/* harmony export */   bQ: () => (/* binding */ PLAN_PERSONAL_2_YEARS),
/* harmony export */   cE: () => (/* binding */ PLAN_ENTERPRISE_GRID_WPCOM),
/* harmony export */   dj: () => (/* binding */ PLAN_100_YEARS),
/* harmony export */   hz: () => (/* binding */ GROUP_WPCOM),
/* harmony export */   k2: () => (/* binding */ PRODUCT_WPCOM_SEARCH_MONTHLY),
/* harmony export */   mR: () => (/* binding */ PLAN_ECOMMERCE_3_YEARS),
/* harmony export */   nM: () => (/* binding */ PLAN_PREMIUM_3_YEARS),
/* harmony export */   nb: () => (/* binding */ PLAN_BLUEHOST_CLOUD_MONTHLY),
/* harmony export */   o5: () => (/* binding */ PRODUCT_WPCOM_SEARCH),
/* harmony export */   r: () => (/* binding */ PLAN_ECOMMERCE_MONTHLY),
/* harmony export */   se: () => (/* binding */ PLAN_WOOEXPRESS_MEDIUM_MONTHLY),
/* harmony export */   uQ: () => (/* binding */ PLAN_MIGRATION_TRIAL_MONTHLY),
/* harmony export */   vD: () => (/* binding */ PLAN_WPCOM_PRO_2_YEARS),
/* harmony export */   vt: () => (/* binding */ PLAN_BUSINESS_2_YEARS),
/* harmony export */   xY: () => (/* binding */ PLAN_BUSINESS),
/* harmony export */   xi: () => (/* binding */ PLAN_ECOMMERCE_2_YEARS),
/* harmony export */   yZ: () => (/* binding */ PLAN_WOOEXPRESS_SMALL),
/* harmony export */   zY: () => (/* binding */ PLAN_WPCOM_PRO_MONTHLY)
/* harmony export */ });
/* unused harmony exports WPCOM_SEARCH_PRODUCTS, PRODUCT_1GB_SPACE_UPGRADE, PRODUCT_5GB_SPACE_UPGRADE, PRODUCT_10GB_SPACE_UPGRADE, PRODUCT_50GB_SPACE_UPGRADE, PRODUCT_100GB_SPACE_UPGRADE, WPCOM_SPACE_UPGRADE_PRODUCTS, PRODUCT_NO_ADS, PRODUCT_WPCOM_UNLIMITED_THEMES, PRODUCT_1GB_SPACE, PRODUCT_WPCOM_CUSTOM_DESIGN, WPCOM_OTHER_PRODUCTS, WPCOM_PRODUCTS, PLAN_HOST_BUNDLE, PLAN_WPCOM_ENTERPRISE, PLAN_CHARGEBACK, PLAN_VIP, WPCOM_PLANS, WPCOM_MONTHLY_PLANS, WOO_EXPRESS_PLANS, WPCOM_PREMIUM_PLANS, WPCOM_DIFM_LITE, PLAN_BUSINESS_ONBOARDING_EXPIRE, PLAN_BUSINESS_2Y_ONBOARDING_EXPIRE */
const GROUP_WPCOM = 'GROUP_WPCOM';
const GROUP_P2 = 'GROUP_P2';

/**
 * WPCOM Search Products
 */
const PRODUCT_WPCOM_SEARCH = 'wpcom_search';
const PRODUCT_WPCOM_SEARCH_MONTHLY = 'wpcom_search_monthly';
const WPCOM_SEARCH_PRODUCTS = [PRODUCT_WPCOM_SEARCH, PRODUCT_WPCOM_SEARCH_MONTHLY];

/**
 * WPCOM Space Upgrade Products
 * - Special products that do not yet map to the exported `PRODUCTS_LIST` in @automattic/calypso-products
 */
const PRODUCT_1GB_SPACE_UPGRADE = '1gb_space_upgrade';
const PRODUCT_5GB_SPACE_UPGRADE = '5gb_space_upgrade';
const PRODUCT_10GB_SPACE_UPGRADE = '10gb_space_upgrade';
const PRODUCT_50GB_SPACE_UPGRADE = '50gb_space_upgrade';
const PRODUCT_100GB_SPACE_UPGRADE = '100gb_space_upgrade';
const WPCOM_SPACE_UPGRADE_PRODUCTS = [PRODUCT_1GB_SPACE_UPGRADE, PRODUCT_5GB_SPACE_UPGRADE, PRODUCT_10GB_SPACE_UPGRADE, PRODUCT_50GB_SPACE_UPGRADE, PRODUCT_100GB_SPACE_UPGRADE];

/**
 * WPCOM Other Products
 * - Special products that do not yet map to the exported `PRODUCTS_LIST` in @automattic/calypso-products
 */
const PRODUCT_NO_ADS = 'no-adverts/no-adverts.php';
const PRODUCT_WPCOM_UNLIMITED_THEMES = 'unlimited_themes';
const PRODUCT_1GB_SPACE = 'wordpress_com_1gb_space_addon_yearly';
const PRODUCT_WPCOM_CUSTOM_DESIGN = 'custom-design';
const WPCOM_OTHER_PRODUCTS = [PRODUCT_NO_ADS, PRODUCT_WPCOM_UNLIMITED_THEMES, PRODUCT_1GB_SPACE, PRODUCT_WPCOM_CUSTOM_DESIGN];

/**
 * WPCOM Products / having definitions in `PRODUCTS_LIST` in @automattic/calypso-products
 */
const WPCOM_PRODUCTS = [...WPCOM_SEARCH_PRODUCTS];

/**
 * Plans
 */
const PLAN_BUSINESS_MONTHLY = 'business-bundle-monthly';
const PLAN_BUSINESS = 'business-bundle';
const PLAN_BUSINESS_2_YEARS = 'business-bundle-2y';
const PLAN_BUSINESS_3_YEARS = 'business-bundle-3y';
const PLAN_100_YEARS = 'wp_com_hundred_year_bundle_centennially';
const PLAN_PREMIUM_MONTHLY = 'value_bundle_monthly';
const PLAN_PREMIUM = 'value_bundle';
const PLAN_PREMIUM_2_YEARS = 'value_bundle-2y';
const PLAN_PREMIUM_3_YEARS = 'value_bundle-3y';
const PLAN_PERSONAL_MONTHLY = 'personal-bundle-monthly';
const PLAN_PERSONAL = 'personal-bundle';
const PLAN_PERSONAL_2_YEARS = 'personal-bundle-2y';
const PLAN_PERSONAL_3_YEARS = 'personal-bundle-3y';
const PLAN_BLOGGER = 'blogger-bundle';
const PLAN_BLOGGER_2_YEARS = 'blogger-bundle-2y';
const PLAN_ECOMMERCE_MONTHLY = 'ecommerce-bundle-monthly';
const PLAN_ECOMMERCE = 'ecommerce-bundle';
const PLAN_ECOMMERCE_2_YEARS = 'ecommerce-bundle-2y';
const PLAN_ECOMMERCE_3_YEARS = 'ecommerce-bundle-3y';
const PLAN_ECOMMERCE_TRIAL_MONTHLY = 'ecommerce-trial-bundle-monthly';
const PLAN_WOOEXPRESS_SMALL = 'wooexpress-small-bundle-yearly';
const PLAN_WOOEXPRESS_SMALL_MONTHLY = 'wooexpress-small-bundle-monthly';
const PLAN_WOOEXPRESS_MEDIUM = 'wooexpress-medium-bundle-yearly';
const PLAN_WOOEXPRESS_MEDIUM_MONTHLY = 'wooexpress-medium-bundle-monthly';
const PLAN_WOOEXPRESS_PLUS = 'wooexpress-plus'; // Not a real plan;
const PLAN_FREE = 'free_plan';
const PLAN_HOST_BUNDLE = 'host-bundle';
const PLAN_WPCOM_ENTERPRISE = 'wpcom-enterprise';
const PLAN_CHARGEBACK = 'chargeback';
const PLAN_VIP = 'vip';
const PLAN_P2_PLUS = 'wp_p2_plus_monthly';
const PLAN_P2_FREE = 'p2_free_plan'; // Not a real plan; it's a renamed WP.com Free for the P2 project.
const PLAN_WPCOM_FLEXIBLE = 'wpcom-flexible'; // Not a real plan; it's a renamed WP.com Free for the plans overhaul.
const PLAN_WPCOM_PRO = 'pro-plan';
const PLAN_WPCOM_PRO_MONTHLY = 'pro-plan-monthly';
const PLAN_WPCOM_PRO_2_YEARS = 'pro-plan-2y';
const PLAN_WPCOM_STARTER = 'starter-plan';
const PLAN_ENTERPRISE_GRID_WPCOM = 'plan-enterprise-grid-wpcom'; // Not a real plan; we show the VIP section in the plans grid as part of pdgrnI-1Qp-p2.
const PLAN_BLUEHOST_CLOUD = 'bluehost-cloud-bundle'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_BLUEHOST_CLOUD_MONTHLY = 'bluehost-cloud-bundle-monthly'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_BLUEHOST_CLOUD_2Y = 'bluehost-cloud-bundle-2y'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_BLUEHOST_CLOUD_3Y = 'bluehost-cloud-bundle-3y'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_MIGRATION_TRIAL_MONTHLY = 'wp_bundle_migration_trial_monthly';
const PLAN_HOSTING_TRIAL_MONTHLY = 'wp_bundle_hosting_trial_monthly';
const WPCOM_PLANS = [PLAN_BUSINESS_MONTHLY, PLAN_BUSINESS, PLAN_BUSINESS_2_YEARS, PLAN_BUSINESS_3_YEARS, PLAN_100_YEARS, PLAN_PREMIUM_MONTHLY, PLAN_PREMIUM, PLAN_PREMIUM_2_YEARS, PLAN_PREMIUM_3_YEARS, PLAN_PERSONAL_MONTHLY, PLAN_PERSONAL, PLAN_PERSONAL_2_YEARS, PLAN_PERSONAL_3_YEARS, PLAN_BLOGGER, PLAN_BLOGGER_2_YEARS, PLAN_ECOMMERCE_MONTHLY, PLAN_ECOMMERCE, PLAN_ECOMMERCE_2_YEARS, PLAN_ECOMMERCE_3_YEARS, PLAN_ECOMMERCE_TRIAL_MONTHLY, PLAN_MIGRATION_TRIAL_MONTHLY, PLAN_HOSTING_TRIAL_MONTHLY, PLAN_FREE, PLAN_HOST_BUNDLE, PLAN_WPCOM_ENTERPRISE, PLAN_BLUEHOST_CLOUD, PLAN_BLUEHOST_CLOUD_MONTHLY, PLAN_BLUEHOST_CLOUD_2Y, PLAN_BLUEHOST_CLOUD_3Y, PLAN_CHARGEBACK, PLAN_VIP, PLAN_P2_PLUS, PLAN_P2_FREE, PLAN_WPCOM_FLEXIBLE, PLAN_WPCOM_PRO, PLAN_WPCOM_PRO_MONTHLY, PLAN_WPCOM_PRO_2_YEARS, PLAN_WPCOM_STARTER, PLAN_ENTERPRISE_GRID_WPCOM, PLAN_WOOEXPRESS_MEDIUM, PLAN_WOOEXPRESS_MEDIUM_MONTHLY, PLAN_WOOEXPRESS_SMALL, PLAN_WOOEXPRESS_SMALL_MONTHLY, PLAN_WOOEXPRESS_PLUS];
const WPCOM_MONTHLY_PLANS = [PLAN_BUSINESS_MONTHLY, PLAN_PREMIUM_MONTHLY, PLAN_PERSONAL_MONTHLY, PLAN_ECOMMERCE_MONTHLY, PLAN_ECOMMERCE_TRIAL_MONTHLY, PLAN_MIGRATION_TRIAL_MONTHLY, PLAN_HOSTING_TRIAL_MONTHLY, PLAN_WOOEXPRESS_MEDIUM_MONTHLY, PLAN_WOOEXPRESS_SMALL_MONTHLY, PLAN_WOOEXPRESS_PLUS, PLAN_WPCOM_PRO_MONTHLY, PLAN_ENTERPRISE_GRID_WPCOM, PLAN_FREE];
const WOO_EXPRESS_PLANS = [PLAN_WOOEXPRESS_MEDIUM, PLAN_WOOEXPRESS_MEDIUM_MONTHLY, PLAN_WOOEXPRESS_SMALL, PLAN_WOOEXPRESS_SMALL_MONTHLY, PLAN_WOOEXPRESS_PLUS];
const WPCOM_PREMIUM_PLANS = [PLAN_PREMIUM_MONTHLY, PLAN_PREMIUM, PLAN_PREMIUM_2_YEARS, PLAN_PREMIUM_3_YEARS];
const WPCOM_DIFM_LITE = 'wp_difm_lite';
const PLAN_BUSINESS_ONBOARDING_EXPIRE = '2021-07-31T00:00:00+00:00';
const PLAN_BUSINESS_2Y_ONBOARDING_EXPIRE = '2022-07-31T00:00:00+00:00';

/***/ }),

/***/ 6277:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U7: () => (/* binding */ getPlan)
/* harmony export */ });
/* unused harmony exports getPlans, getPlanFeaturesGroupedForFeaturesGrid, getPlanFeaturesGroupedForComparisonGrid, getWooExpressFeaturesGroupedForFeaturesGrid, getWooExpressFeaturesGroupedForComparisonGrid, getPlansSlugs, getPlanByPathSlug, getPlanPath, getPlanClass, planHasFeature, planHasAtLeastOneFeature, getAllFeaturesForPlan, planHasSuperiorFeature, shouldFetchSitePlans, getMonthlyPlanByYearly, getYearlyPlanByMonthly, getBiennialPlan, getTriennialPlan, planLevelsMatch, isEcommercePlan, isProPlan, isBusinessPlan, isPremiumPlan, isPersonalPlan, isBloggerPlan, isFreePlan, isFreeHostingTrial, isBusinessTrial, is100YearPlan, isWpcomEnterpriseGridPlan, isWooExpressPlusPlan, isWooExpressMediumPlan, isWooExpressSmallPlan, isWooExpressPlan, isFlexiblePlan, isStarterPlan, isJetpackStarterPlan, isSecurityDailyPlan, isSecurityRealTimePlan, isSecurityT1Plan, isSecurityT2Plan, isCompletePlan, isWpComPlan, isWpComBusinessPlan, isWpComEcommercePlan, isWpComProPlan, isWpComPremiumPlan, isWpComPersonalPlan, isWpComBloggerPlan, isWpComFreePlan, isWpComAnnualPlan, isWpComBiennialPlan, isWpComTriennialPlan, isWpComMonthlyPlan, isJetpackBusinessPlan, isJetpackPremiumPlan, isJetpackPersonalPlan, isJetpackFreePlan, isJetpackOfferResetPlan, isP2FreePlan, isP2PlusPlan, findFirstSimilarPlanKey, findSimilarPlansKeys, findPlansKeys, planMatches, calculateMonthlyPriceForPlan, calculateMonthlyPrice, getBillingMonthsForTerm, getBillingYearsForTerm, getBillingTermForMonths, plansLink, applyTestFiltersToPlansList, applyTestFiltersToProductsList, getPlanTermLabel, getPopularPlanSpec, chooseDefaultCustomerType, planHasJetpackSearch, planHasJetpackClassicSearch, getFeaturesList, getPlanFeaturesObject, isValidFeatureKey, getFeatureByKey */
/* harmony import */ var _plans_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6257);





function getPlans() {
  return PLANS_LIST;
}
function getPlanFeaturesGroupedForFeaturesGrid() {
  return resolveFeatureGroupsForFeaturesGrid();
}
function getPlanFeaturesGroupedForComparisonGrid() {
  return resolveFeatureGroupsForComparisonGrid();
}
function getWooExpressFeaturesGroupedForFeaturesGrid() {
  // Same as getPlanFeaturesGroupedForFeaturesGrid() for now
  return getPlanFeaturesGroupedForFeaturesGrid();
}
function getWooExpressFeaturesGroupedForComparisonGrid() {
  return resolveWooExpressFeatureGroupsForComparisonGrid();
}
function getPlansSlugs() {
  return Object.keys(getPlans());
}
function getPlan(planKey) {
  if (typeof planKey !== 'string') {
    if (Object.values(_plans_list__WEBPACK_IMPORTED_MODULE_0__/* .PLANS_LIST */ .W).includes(planKey)) {
      return planKey;
    }
    return undefined;
  }
  return _plans_list__WEBPACK_IMPORTED_MODULE_0__/* .PLANS_LIST */ .W[planKey];
}
function getPlanByPathSlug(pathSlug, group) {
  let plans = Object.values(PLANS_LIST);
  plans = plans.filter(p => group ? p.group === group : true);
  return plans.find(p => typeof p.getPathSlug === 'function' && p.getPathSlug() === pathSlug);
}
function getPlanPath(plan) {
  const retrievedPlan = getPlan(plan);
  const slug = retrievedPlan?.getPathSlug || (() => undefined);
  return slug();
}
function getPlanClass(planKey) {
  if (isFreePlan(planKey)) {
    return 'is-free-plan';
  }
  if (isFlexiblePlan(planKey)) {
    return 'is-flexible-plan';
  }
  if (isBloggerPlan(planKey)) {
    return 'is-blogger-plan';
  }
  if (isPersonalPlan(planKey)) {
    return 'is-personal-plan';
  }
  if (isPremiumPlan(planKey)) {
    return 'is-premium-plan';
  }
  if (isBusinessPlan(planKey)) {
    return 'is-business-plan';
  }
  if (isWooExpressPlusPlan(planKey)) {
    return 'is-wooexpress-plus-plan';
  }
  if (isWooExpressMediumPlan(planKey)) {
    return 'is-wooexpress-medium-plan';
  }
  if (isWooExpressSmallPlan(planKey)) {
    return 'is-wooexpress-small-plan';
  }
  if (isEcommercePlan(planKey)) {
    return 'is-ecommerce-plan';
  }
  if (isWpcomEnterpriseGridPlan(planKey)) {
    return 'is-wpcom-enterprise-grid-plan';
  }
  if (isProPlan(planKey)) {
    return 'is-pro-plan';
  }
  if (isSecurityDailyPlan(planKey)) {
    return 'is-daily-security-plan';
  }
  if (isSecurityRealTimePlan(planKey)) {
    return 'is-realtime-security-plan';
  }
  if (isSecurityT1Plan(planKey)) {
    return 'is-security-t1';
  }
  if (isSecurityT2Plan(planKey)) {
    return 'is-security-t2';
  }
  if (isCompletePlan(planKey)) {
    return 'is-complete-plan';
  }
  if (isFreeHostingTrial(planKey)) {
    return 'is-free-hosting-trial';
  }
  if (isP2PlusPlan(planKey)) {
    return 'is-p2-plus-plan';
  }
  return '';
}

/**
 * Determines if a plan has a specific feature.
 *
 * Collects features for a plan by calling all possible feature methods for the plan.
 */
function planHasFeature(plan, feature) {
  const allFeatures = getAllFeaturesForPlan(plan);
  return allFeatures.includes(feature);
}

/**
 * Determine if a plan has at least one of several features.
 */
function planHasAtLeastOneFeature(plan, features) {
  const allFeatures = getAllFeaturesForPlan(plan);
  return features.some(feature => allFeatures.includes(feature));
}

/**
 * Get all features for a plan
 *
 * Collects features for a plan by calling all possible feature methods for the plan.
 *
 * Returns an array of all the plan features (may have duplicates)
 */
function getAllFeaturesForPlan(plan) {
  const planObj = getPlan(plan);
  if (!planObj) {
    return [];
  }
  return [...('getPlanCompareFeatures' in planObj && planObj.getPlanCompareFeatures ? planObj.getPlanCompareFeatures() : []), ...('getPromotedFeatures' in planObj && planObj.getPromotedFeatures ? planObj.getPromotedFeatures() : []), ...('getSignupFeatures' in planObj && planObj.getSignupFeatures ? planObj.getSignupFeatures() : []), ...('getSignupCompareAvailableFeatures' in planObj && planObj.getSignupCompareAvailableFeatures ? planObj.getSignupCompareAvailableFeatures() : []), ...('getBlogSignupFeatures' in planObj && planObj.getBlogSignupFeatures ? planObj.getBlogSignupFeatures() : []), ...('getPortfolioSignupFeatures' in planObj && planObj.getPortfolioSignupFeatures ? planObj.getPortfolioSignupFeatures() : []), ...('getIncludedFeatures' in planObj && planObj.getIncludedFeatures ? planObj.getIncludedFeatures() : [])];
}

/**
 * Determines if a plan has a superior version of a specific feature.
 */
function planHasSuperiorFeature(plan, feature) {
  const planConstantObj = getPlan(plan);
  const features = planConstantObj?.getInferiorFeatures?.() ?? [];
  return features.includes(feature);
}
function shouldFetchSitePlans(sitePlans) {
  return !sitePlans.hasLoadedFromServer && !sitePlans.isRequesting;
}

/**
 * Returns the monthly slug which corresponds to the provided yearly slug or "" if the slug is
 * not a recognized or cannot be converted.
 */
function getMonthlyPlanByYearly(planSlug) {
  const plan = getPlan(planSlug);
  if (plan && 'getMonthlySlug' in plan && plan.getMonthlySlug) {
    return plan.getMonthlySlug();
  }
  return findFirstSimilarPlanKey(planSlug, {
    term: TERM_MONTHLY
  }) || '';
}

/**
 * Returns the yearly slug which corresponds to the provided monthly slug or "" if the slug is
 * not a recognized or cannot be converted.
 */
function getYearlyPlanByMonthly(planSlug) {
  const plan = getPlan(planSlug);
  if (plan && 'getAnnualSlug' in plan && plan.getAnnualSlug) {
    return plan.getAnnualSlug();
  }
  return findFirstSimilarPlanKey(planSlug, {
    term: TERM_ANNUALLY
  }) || '';
}

/**
 * Returns the biennial slug which corresponds to the provided slug or "" if the slug is
 * not a recognized or cannot be converted.
 */
function getBiennialPlan(planSlug) {
  return findFirstSimilarPlanKey(planSlug, {
    term: TERM_BIENNIALLY
  }) || '';
}

/**
 * Returns the triennial slug which corresponds to the provided slug or "" if the slug is
 * not recognized or cannot be converted.
 */
function getTriennialPlan(planSlug) {
  return findFirstSimilarPlanKey(planSlug, {
    term: TERM_TRIENNIALLY
  }) || '';
}

/**
 * Returns true if plan "types" match regardless of their interval.
 *
 * For example (fake plans):
 *     planLevelsMatch( PRO_YEARLY, PRO_YEARLY ) => true
 *     planLevelsMatch( PRO_YEARLY, PRO_MONTHLY ) => true
 *     planLevelsMatch( PRO_YEARLY, PERSONAL_YEARLY ) => false
 */
function planLevelsMatch(planSlugA, planSlugB) {
  const planA = getPlan(planSlugA);
  const planB = getPlan(planSlugB);
  return Boolean(planA && planB && planA.type === planB.type && planA.group === planB.group);
}
function isEcommercePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_ECOMMERCE
  });
}
function isProPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PRO
  });
}
function isBusinessPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_BUSINESS
  });
}
function isPremiumPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PREMIUM
  });
}
function isPersonalPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PERSONAL
  });
}
function isBloggerPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_BLOGGER
  });
}
function isFreePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_FREE
  });
}
function isFreeHostingTrial(planSlug) {
  return planSlug === PLAN_HOSTING_TRIAL_MONTHLY;
}
function isBusinessTrial(planSlug) {
  return planSlug === PLAN_HOSTING_TRIAL_MONTHLY || planSlug === PLAN_MIGRATION_TRIAL_MONTHLY;
}
function is100YearPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_100_YEAR
  });
}

// Checks if it is an Enterprise plan (a.k.a VIP), introduced as part of pdgrnI-1Qp-p2.
// This is not a real plan, but added to display Enterprise in the pricing grid.
function isWpcomEnterpriseGridPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_ENTERPRISE_GRID_WPCOM,
    group: GROUP_WPCOM
  });
}
function isWooExpressPlusPlan(planSlug) {
  return PLAN_WOOEXPRESS_PLUS === planSlug;
}
function isWooExpressMediumPlan(planSlug) {
  return [PLAN_WOOEXPRESS_MEDIUM, PLAN_WOOEXPRESS_MEDIUM_MONTHLY].includes(planSlug);
}
function isWooExpressSmallPlan(planSlug) {
  return [PLAN_WOOEXPRESS_SMALL, PLAN_WOOEXPRESS_SMALL_MONTHLY].includes(planSlug);
}
function isWooExpressPlan(planSlug) {
  return WOO_EXPRESS_PLANS.includes(planSlug);
}
function isFlexiblePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_FLEXIBLE
  });
}
function isStarterPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_STARTER
  });
}
function isJetpackStarterPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_JETPACK_STARTER
  });
}
function isSecurityDailyPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_SECURITY_DAILY
  });
}
function isSecurityRealTimePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_SECURITY_REALTIME
  });
}
function isSecurityT1Plan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_SECURITY_T1
  });
}
function isSecurityT2Plan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_SECURITY_T2
  });
}
function isCompletePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_ALL
  });
}
function isWpComPlan(planSlug) {
  return planMatches(planSlug, {
    group: GROUP_WPCOM
  });
}
function isWpComBusinessPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_BUSINESS,
    group: GROUP_WPCOM
  });
}
function isWpComEcommercePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_ECOMMERCE,
    group: GROUP_WPCOM
  });
}
function isWpComProPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PRO,
    group: GROUP_WPCOM
  });
}
function isWpComPremiumPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PREMIUM,
    group: GROUP_WPCOM
  });
}
function isWpComPersonalPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PERSONAL,
    group: GROUP_WPCOM
  });
}
function isWpComBloggerPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_BLOGGER,
    group: GROUP_WPCOM
  });
}
function isWpComFreePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_FREE,
    group: GROUP_WPCOM
  });
}
function isWpComAnnualPlan(planSlug) {
  return planMatches(planSlug, {
    term: TERM_ANNUALLY,
    group: GROUP_WPCOM
  });
}
function isWpComBiennialPlan(planSlug) {
  return planMatches(planSlug, {
    term: TERM_BIENNIALLY,
    group: GROUP_WPCOM
  });
}
function isWpComTriennialPlan(planSlug) {
  return planMatches(planSlug, {
    term: TERM_TRIENNIALLY,
    group: GROUP_WPCOM
  });
}
function isWpComMonthlyPlan(planSlug) {
  return planMatches(planSlug, {
    term: TERM_MONTHLY,
    group: GROUP_WPCOM
  });
}
function isJetpackBusinessPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_BUSINESS,
    group: GROUP_JETPACK
  });
}
function isJetpackPremiumPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PREMIUM,
    group: GROUP_JETPACK
  });
}
function isJetpackPersonalPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_PERSONAL,
    group: GROUP_JETPACK
  });
}
function isJetpackFreePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_FREE,
    group: GROUP_JETPACK
  });
}
function isJetpackOfferResetPlan(planSlug) {
  return JETPACK_RESET_PLANS.includes(planSlug);
}
function isP2FreePlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_FREE,
    group: GROUP_P2
  });
}
function isP2PlusPlan(planSlug) {
  return planMatches(planSlug, {
    type: TYPE_P2_PLUS
  });
}
function findFirstSimilarPlanKey(planKey, diff) {
  return findSimilarPlansKeys(planKey, diff)[0];
}

/**
 * A similar plan is one that has the same `type`, `group`, and `term` as first
 * argument, except for differences specified in the second argument.
 *
 * For example:
 *
 * > findSimilarPlansKeys( TYPE_BUSINESS, { term: TERM_BIENNIALLY } );
 * [PLAN_BUSINESS_2_YEARS]
 * > findSimilarPlansKeys( TYPE_JETPACK_BUSINESS_MONTHLY, { type: TYPE_ANNUALLY } );
 * [TYPE_JETPACK_BUSINESS]
 */
function findSimilarPlansKeys(planKey, diff = {}) {
  const plan = getPlan(planKey);
  // @TODO: make getPlan() throw an error on failure. This is going to be a larger change with a separate PR.
  if (!plan) {
    return [];
  }
  return findPlansKeys({
    type: plan.type,
    group: plan.group,
    term: plan.term,
    ...diff
  });
}

/**
 * Finds all keys of plans matching a query
 *
 * For example:
 *
 * > findPlansKeys( { term: TERM_BIENNIALLY } );
 * [PLAN_PERSONAL_2_YEARS, PLAN_PREMIUM_2_YEARS, PLAN_BUSINESS_2_YEARS]
 */
function findPlansKeys(query = {}) {
  const plans = getPlans();
  return Object.keys(plans).filter(k => planMatches(plans[k], query));
}

/**
 * Matches plan specified by `planKey` against `query`.
 * Only compares `type`, `group`, and `term` properties.
 *
 * For example:
 *
 * > planMatches( TYPE_BUSINESS, { term: TERM_ANNUALLY, group: GROUP_WPCOM, type: TYPE_BUSINESS } );
 * true
 *
 * > planMatches( TYPE_BUSINESS, { term: TERM_BIENNIALLY } );
 * false
 */
function planMatches(planKey, query = {}) {
  const acceptedKeys = ['type', 'group', 'term'];
  const unknownKeys = Object.keys(query).filter(key => !acceptedKeys.includes(key));
  if (unknownKeys.length) {
    throw new Error(`planMatches can only match against ${acceptedKeys.join(',')}, ` + `but unknown keys ${unknownKeys.join(',')} were passed.`);
  }

  // @TODO: make getPlan() throw an error on failure. This is going to be a larger change with a separate PR.
  const plan = getPlan(planKey);
  if (!plan) {
    return false;
  }
  if ((!('type' in query) || plan.type === query.type) && (!('group' in query) || plan.group === query.group) && (!('term' in query) || plan.term === query.term)) {
    return true;
  }
  return false;
}
function calculateMonthlyPriceForPlan(planSlug, termPrice) {
  const plan = getPlan(planSlug);
  if (!plan) {
    throw new Error(`Unknown plan: ${planSlug}`);
  }
  return calculateMonthlyPrice(plan.term, termPrice);
}
function calculateMonthlyPrice(term, termPrice) {
  const divisor = getBillingMonthsForTerm(term);
  return parseFloat((termPrice / divisor).toFixed(2));
}
function getBillingMonthsForTerm(term) {
  if (term === TERM_MONTHLY) {
    return 1;
  } else if (term === TERM_ANNUALLY) {
    return 12;
  } else if (term === TERM_BIENNIALLY) {
    return 24;
  } else if (term === TERM_TRIENNIALLY) {
    return 36;
  } else if (term === TERM_QUADRENNIALLY) {
    return 48;
  } else if (term === TERM_QUINQUENNIALLY) {
    return 60;
  } else if (term === TERM_SEXENNIALLY) {
    return 72;
  } else if (term === TERM_SEPTENNIALLY) {
    return 84;
  } else if (term === TERM_OCTENNIALLY) {
    return 96;
  } else if (term === TERM_NOVENNIALLY) {
    return 108;
  } else if (term === TERM_DECENNIALLY) {
    return 120;
  } else if (term === TERM_CENTENNIALLY) {
    return 1200;
  }
  throw new Error(`Unknown term: ${term}`);
}
function getBillingYearsForTerm(term) {
  if (term === TERM_MONTHLY) {
    return 0;
  } else if (term === TERM_ANNUALLY) {
    return 1;
  } else if (term === TERM_BIENNIALLY) {
    return 2;
  } else if (term === TERM_TRIENNIALLY) {
    return 3;
  } else if (term === TERM_CENTENNIALLY) {
    return 100;
  }
  throw new Error(`Unknown term: ${term}`);
}
function getBillingTermForMonths(term) {
  if (term === 1) {
    return TERM_MONTHLY;
  } else if (term === 12) {
    return TERM_ANNUALLY;
  } else if (term === 24) {
    return TERM_BIENNIALLY;
  } else if (term === 36) {
    return TERM_TRIENNIALLY;
  } else if (term === 48) {
    return TERM_QUADRENNIALLY;
  } else if (term === 60) {
    return TERM_QUINQUENNIALLY;
  } else if (term === 72) {
    return TERM_SEXENNIALLY;
  } else if (term === 84) {
    return TERM_SEPTENNIALLY;
  } else if (term === 96) {
    return TERM_OCTENNIALLY;
  } else if (term === 108) {
    return TERM_NOVENNIALLY;
  } else if (term === 120) {
    return TERM_DECENNIALLY;
  } else if (term === 1200) {
    return TERM_CENTENNIALLY;
  }
  throw new Error(`Unknown term: ${term}`);
}
function plansLink(urlString, siteSlug, intervalType, forceIntervalType = false) {
  const url = new URL(urlString, window.location.origin);
  if ('monthly' === intervalType || forceIntervalType) {
    url.pathname += '/' + intervalType;
  }
  if (siteSlug) {
    url.pathname += '/' + siteSlug;
  }
  if (urlString.startsWith('/')) {
    return url.pathname + url.search;
  }
  return url.toString();
}
function applyTestFiltersToPlansList(planName, abtest, extraArgs = {}) {
  const plan = getPlan(planName);
  if (!plan) {
    throw new Error(`Unknown plan: ${planName}`);
  }
  const filteredPlanConstantObj = {
    ...plan
  };
  const filteredPlanFeaturesConstantList = 'getPlanCompareFeatures' in plan && plan.getPlanCompareFeatures ? plan.getPlanCompareFeatures(abtest, extraArgs) : [];

  /* eslint-disable @typescript-eslint/no-empty-function */

  // these becomes no-ops when we removed some of the abtest overrides, but
  // we're leaving the code in place for future tests
  const removeDisabledFeatures = () => {};
  const updatePlanDescriptions = () => {};
  const updatePlanFeatures = () => {};

  /* eslint-enable */

  removeDisabledFeatures();
  updatePlanDescriptions();
  updatePlanFeatures();
  return {
    ...filteredPlanConstantObj,
    getPlanCompareFeatures: () => filteredPlanFeaturesConstantList
  };
}
function applyTestFiltersToProductsList(productName) {
  const product = getProductFromSlug(productName);
  if (typeof product === 'string') {
    throw new Error(`Unknown product ${productName} `);
  }
  const filteredProductConstantObj = {
    ...product
  };

  /* eslint-disable @typescript-eslint/no-empty-function */

  // these becomes no-ops when we removed some of the abtest overrides, but
  // we're leaving the code in place for future tests
  const removeDisabledFeatures = () => {};
  const updatePlanDescriptions = () => {};
  const updatePlanFeatures = () => {};

  /* eslint-enable */

  removeDisabledFeatures();
  updatePlanDescriptions();
  updatePlanFeatures();
  return {
    ...filteredProductConstantObj,
    getPlanCompareFeatures: () => []
  };
}
function getPlanTermLabel(planName, translate) {
  const plan = getPlan(planName);
  if (!plan || !plan.term) {
    return;
  }
  switch (plan.term) {
    case TERM_MONTHLY:
      return translate('Monthly subscription');
    case TERM_ANNUALLY:
      return translate('Annual subscription');
    case TERM_BIENNIALLY:
      return translate('Two year subscription');
    case TERM_TRIENNIALLY:
      return translate('Three year subscription');
    case TERM_CENTENNIALLY:
      return translate('Hundred year subscription');
  }
}
const getPopularPlanSpec = ({
  flowName,
  customerType,
  isJetpack,
  availablePlans
}) => {
  // Jetpack doesn't currently highlight "Popular" plans
  if (isJetpack) {
    return false;
  }
  if (availablePlans.length === 0) {
    return false;
  }
  const defaultPlan = getPlan(availablePlans[0]);
  if (!defaultPlan) {
    return false;
  }
  const group = GROUP_WPCOM;
  if (flowName === 'hosting') {
    return {
      type: TYPE_BUSINESS,
      group
    };
  }
  if (flowName === 'link-in-bio' || flowName === 'link-in-bio-tld') {
    return {
      type: TYPE_PERSONAL,
      group
    };
  }
  if (customerType === 'personal') {
    if (availablePlans.findIndex(isPremiumPlan) !== -1) {
      return {
        type: TYPE_PREMIUM,
        group
      };
    }
    // when customerType is not personal, default to business
  } else if (availablePlans.findIndex(isBusinessPlan) !== -1) {
    return {
      type: TYPE_BUSINESS,
      group
    };
  }

  // finally, just return the default one.
  return {
    type: defaultPlan.type,
    group
  };
};
function isValueTruthy(value) {
  return !!value;
}
const chooseDefaultCustomerType = ({
  currentCustomerType,
  selectedPlan,
  currentPlan
}) => {
  if (currentCustomerType) {
    return currentCustomerType;
  }
  const group = GROUP_WPCOM;
  const businessPlanSlugs = [findPlansKeys({
    group,
    term: TERM_ANNUALLY,
    type: TYPE_PREMIUM
  })[0], findPlansKeys({
    group,
    term: TERM_BIENNIALLY,
    type: TYPE_PREMIUM
  })[0], findPlansKeys({
    group,
    term: TERM_TRIENNIALLY,
    type: TYPE_PREMIUM
  })[0], findPlansKeys({
    group,
    term: TERM_ANNUALLY,
    type: TYPE_BUSINESS
  })[0], findPlansKeys({
    group,
    term: TERM_BIENNIALLY,
    type: TYPE_BUSINESS
  })[0], findPlansKeys({
    group,
    term: TERM_TRIENNIALLY,
    type: TYPE_BUSINESS
  })[0], findPlansKeys({
    group,
    term: TERM_ANNUALLY,
    type: TYPE_ECOMMERCE
  })[0], findPlansKeys({
    group,
    term: TERM_BIENNIALLY,
    type: TYPE_ECOMMERCE
  })[0], findPlansKeys({
    group,
    term: TERM_TRIENNIALLY,
    type: TYPE_ECOMMERCE
  })[0], findPlansKeys({
    group,
    term: TERM_ANNUALLY,
    type: TYPE_PRO
  })[0], findPlansKeys({
    group,
    term: TERM_BIENNIALLY,
    type: TYPE_PRO
  })[0]].map(planKey => getPlan(planKey)).filter(isValueTruthy).map(plan => plan.getStoreSlug());
  if (selectedPlan) {
    return businessPlanSlugs.includes(selectedPlan) ? 'business' : 'personal';
  } else if (currentPlan) {
    const isPlanInBusinessGroup = businessPlanSlugs.indexOf(currentPlan.productSlug) !== -1;
    return isPlanInBusinessGroup ? 'business' : 'personal';
  }
  return 'personal';
};

/**
 * Determines if a plan includes Jetpack Search by looking at the plan's features.
 */
const planHasJetpackSearch = planSlug => planHasFeature(planSlug, FEATURE_JETPACK_SEARCH) || planHasFeature(planSlug, FEATURE_JETPACK_SEARCH_MONTHLY);

/**
 * Determines if a plan includes Jetpack Search Classic by checking available plans.
 */
function planHasJetpackClassicSearch(plan) {
  return plan && (isJetpackBusiness(plan) || isBusiness(plan) || isEnterprise(plan) || isEcommerce(plan) || isPro(plan) || isVipPlan(plan));
}
function getFeaturesList() {
  return FEATURES_LIST;
}
const getPlanFeaturesObject = planFeaturesList => {
  if (!planFeaturesList) {
    return [];
  }
  return planFeaturesList.map(featuresConst => FEATURES_LIST[featuresConst]);
};
function isValidFeatureKey(feature) {
  return !!FEATURES_LIST[feature];
}
function getFeatureByKey(feature) {
  return FEATURES_LIST[feature];
}

/***/ }),

/***/ 6257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ PLANS_LIST)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(696);
/* harmony import */ var i18n_calypso__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5744);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2895);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6090);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1421);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2400);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9433);
/* harmony import */ var _plans__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8242);





function isValueTruthy(value) {
  return !!value;
}
function compact(elements) {
  return elements.filter(isValueTruthy);
}
const WPComGetBillingTimeframe = () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('per month, billed annually');
const WPComGetBiennialBillingTimeframe = () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('/month, billed every two years');
const WPComGetTriennialBillingTimeframe = () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('/month, billed every three years');
const getBiAnnualTimeframe = () => ({
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
  getBillingTimeFrame: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('per 2 years')
});
const getAnnualTimeframe = () => ({
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
  getBillingTimeFrame: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('per year')
});
const getMonthlyTimeframe = () => ({
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he,
  getBillingTimeFrame: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('per month, billed monthly')
});
const getJetpackCommonPlanDetails = () => ({
  getRecommendedFor: () => [{
    tag: _constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_TAG_FOR_WOOCOMMERCE_STORES */ .iYv,
    label: (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('WooCommerce stores')
  }, {
    tag: _constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_TAG_FOR_NEWS_ORGANISATIONS */ .OkD,
    label: (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('News organizations')
  }, {
    tag: _constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_TAG_FOR_MEMBERSHIP_SITES */ .CiF,
    label: (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Membership sites')
  }]
});
const getDotcomPlanDetails = () => ({
  // Features only available for annual plans
  getAnnualPlansOnlyFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_DOMAIN */ .BAE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF]
});

/* eslint-disable wpcalypso/jsx-classname-namespace */
const plansDescriptionHeadingComponent = {
  components: {
    strong: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
      className: "plans__features plan-features__targeted-description-heading"
    })
  }
};
/* eslint-enable */

const getPlanFreeDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_FREE */ .O2,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Free'),
  getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for students'),
  getBlogAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for students'),
  getPortfolioAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for students'),
  getStoreAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for students'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Get a taste of the world’s most popular CMS & blogging software.'),
  getNewsletterTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Start fresh or make the switch, bringing your first 100 readers with you.'),
  getLinkInBioTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Get started for free with unlimited links and keep track of how many visits you get.'),
  getBlogOnboardingTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Not a trial – blog free for as long as you like.'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Get a free website and be on your way to publishing your ' + 'first post in less than five minutes.'),
  getPlanCompareFeatures: () => [
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_SUBDOMAIN */ .aER, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ESSENTIAL */ .BfV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMUNITY_SUPPORT */ .fcV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES */ .vCo, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_3GB_STORAGE */ .WO2],
  getSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMUNITY_SUPPORT */ .fcV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_SUBDOMAIN_SIGNUP */ .Fig, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES_SIGNUP */ .COw],
  getBlogSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMUNITY_SUPPORT */ .fcV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_SUBDOMAIN_SIGNUP */ .Fig, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES_SIGNUP */ .COw],
  getPortfolioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMUNITY_SUPPORT */ .fcV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_SUBDOMAIN_SIGNUP */ .Fig, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES_SIGNUP */ .COw],
  get2023PricingGridSignupWpcomFeatures: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BEAUTIFUL_THEMES */ .EPC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAGES */ .ko5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_USERS */ .e5F, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_POST_EDITS_HISTORY */ .b9l, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NEWSLETTERS_RSS */ .jdY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_BRUTE_FORCE */ .LKS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SMART_REDIRECTS */ .lIm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALWAYS_ONLINE */ .P25, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_10 */ .vQx];
  },
  get2023PlanComparisonFeatureOverride: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BEAUTIFUL_THEMES */ .EPC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAGES */ .ko5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_USERS */ .e5F, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_POST_EDITS_HISTORY */ .b9l, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NEWSLETTERS_RSS */ .jdY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_BRUTE_FORCE */ .LKS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SMART_REDIRECTS */ .lIm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALWAYS_ONLINE */ .P25, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BANDWIDTH */ .Tuf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_DNS */ .uoN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GLOBAL_EDGE_CACHING */ .vz3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CDN */ .xq9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DATACENTRE_FAILOVER */ .qot, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_UPDATES */ .SIm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MULTI_SITE */ .bW1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_MALWARE */ .QXs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_DDOS */ .HU_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_10 */ .vQx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_STANDARD_FEATURES */ .Uqd, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GROUP_PAYMENT_TRANSACTION_FEES */ .Faw];
  },
  get2023PricingGridSignupJetpackFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAID_SUBSCRIBERS_JP */ .N3t, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_JP */ .ch3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DONATIONS_AND_TIPS_JP */ .ZIK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_BUTTONS_JP */ .b1C, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_JP */ .WoS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LTD_SOCIAL_MEDIA_JP */ .yD$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CONTACT_FORM_JP */ .qCV],
  get2023PlanComparisonJetpackFeatureOverride: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAID_SUBSCRIBERS_JP */ .N3t, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DONATIONS_AND_TIPS_JP */ .ZIK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_JP */ .ch3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_BUTTONS_JP */ .b1C, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_JP */ .WoS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_JP */ .y33, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CONTACT_FORM_JP */ .qCV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_ACTIVITY_LOG_JP */ .LHt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHARES_SOCIAL_MEDIA_JP */ .K5c],
  getStorageFeature: () => _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_1GB_STORAGE */ .sgf,
  getPlanComparisonFeatureLabels: () => ({
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHARES_SOCIAL_MEDIA_JP */ .K5c]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('%d shares per month', {
      args: [30]
    }),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_STANDARD_FEATURES */ .Uqd]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('10%')
  }),
  getNewsletterSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NEWSLETTER_IMPORT_SUBSCRIBERS_FREE */ .GRF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_JP */ .ch3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NEWSLETTERS_RSS */ .jdY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_EMAILS */ .Zvm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_JP */ .WoS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BANDWIDTH */ .Tuf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LTD_SOCIAL_MEDIA_JP */ .yD$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_10 */ .vQx],
  getLinkInBioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BEAUTIFUL_THEMES */ .EPC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAGES */ .ko5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADD_UNLIMITED_LINKS */ .r_P, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_JP */ .WoS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALWAYS_ONLINE */ .P25, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CONTACT_FORM_JP */ .qCV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LTD_SOCIAL_MEDIA_JP */ .yD$],
  getBlogOnboardingSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BEAUTIFUL_THEMES */ .EPC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAGES */ .ko5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_USERS */ .e5F, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_POST_EDITS_HISTORY */ .b9l, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_BRUTE_FORCE */ .LKS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALWAYS_ONLINE */ .P25, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_THE_READER */ .vbh],
  getBlogOnboardingSignupJetpackFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NEWSLETTER_IMPORT_SUBSCRIBERS_FREE */ .GRF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_EMAILS */ .Zvm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NEWSLETTERS_RSS */ .jdY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_JP */ .WoS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LTD_SOCIAL_MEDIA_JP */ .yD$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_JP */ .y33],
  getIncludedFeatures: () => [],
  getInferiorFeatures: () => []
});
const getPlanBloggerDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_BLOGGER */ .au,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Blogger'),
  // @TODO not updating copy for now, we need to update it after the first round of design {{{
  getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for bloggers'),
  getBlogAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for bloggers'),
  getPortfolioAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for bloggers'),
  getStoreAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for bloggers'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for bloggers:{{/strong}} Brand your blog with a custom .blog domain name, and remove all WordPress.com advertising. Receive additional storage space and customer support via email.', plansDescriptionHeadingComponent),
  getShortDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Brand your blog with a custom .blog domain name, and remove all WordPress.com advertising. Receive additional storage space and customer support via email.'),
  // }}}
  getPlanCompareFeatures: () => [
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BLOG_DOMAIN */ .pbK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ESSENTIAL */ .BfV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES */ .vCo, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_6GB_STORAGE */ .TEv, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MEMBERSHIPS */ .JLP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_BLOCK */ .Tgp],
  getSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BLOG_DOMAIN */ .pbK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_FREE_FEATURES */ .wIu],
  getBlogSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_BLOG_DOMAIN */ .MaQ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_FREE_FEATURES */ .wIu],
  getPortfolioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_BLOG_DOMAIN */ .MaQ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_FREE_FEATURES */ .wIu],
  // Features not displayed but used for checking plan abilities
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUDIO_UPLOADS */ .R_9],
  getInferiorFeatures: () => []
});
const getPlanPersonalDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_PERSONAL */ .gA,
  getTitle: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanPersonalTitle */ .Sr,
  getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for personal use'),
  getBlogAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for personal use'),
  getPortfolioAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for personal use'),
  getStoreAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for personal use'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Create your home on the web with a custom domain name.'),
  getNewsletterTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Monetize your writing, go ad-free, and expand your media content.'),
  getLinkInBioTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Take Link In Bio to the next level with gated content, paid subscribers, and an ad-free site.'),
  getBlogOnboardingTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Take the next step with gated content, paid subscribers, and an ad-free site.'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for personal use:{{/strong}} Boost your' + ' website with a custom domain name, and remove all WordPress.com advertising. ' + 'Unlock unlimited, expert customer support via email.', plansDescriptionHeadingComponent),
  getShortDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Boost your website with a custom domain name, and remove all WordPress.com advertising. ' + 'Unlock unlimited, expert customer support via email.'),
  getPlanCompareFeatures: () => compact([
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ESSENTIAL */ .BfV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES */ .vCo, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_6GB_STORAGE */ .TEv, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MEMBERSHIPS */ .JLP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_BLOCK */ .Tgp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_8 */ .Ymf]),
  getSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_DOMAIN */ .BAE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES */ .vCo],
  getBlogSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_DOMAIN */ .BAE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_FREE_FEATURES */ .wIu],
  getPortfolioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_DOMAIN */ .BAE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_FREE_FEATURES */ .wIu],
  getSignupCompareAvailableFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COLLECT_PAYMENTS_V2 */ .R7Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF],
  get2023PricingGridSignupWpcomFeatures: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_LIMITED */ .NI9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_DNS */ .uoN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_8 */ .Ymf];
  },
  get2023PlanComparisonFeatureOverride: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_DNS */ .uoN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_8 */ .Ymf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_THEMES */ .CFg];
  },
  getStorageFeature: () => _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_6GB_STORAGE */ .TEv,
  getPlanComparisonFeatureLabels: () => ({
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_THEMES */ .CFg]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Dozens of premium themes'),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHARES_SOCIAL_MEDIA_JP */ .K5c]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('%d shares per month', {
      args: [30]
    }),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_STANDARD_FEATURES */ .Uqd]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('8%')
  }),
  getNewsletterSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_SUBSCRIBERS */ .H$K, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_8 */ .Ymf],
  getNewsletterHighlightedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_EMAILS */ .Zvm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh],
  getLinkInBioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COLLECT_PAYMENTS_LINK_IN_BIO */ .WtV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAID_SUBSCRIBERS_JP */ .N3t],
  getLinkInBioHighlightedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl],
  getBlogOnboardingSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_DNS */ .uoN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_8 */ .Ymf],
  getBlogOnboardingHighlightedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl],
  getBlogOnboardingSignupJetpackFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_SUBSCRIBERS */ .H$K, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_JP */ .ch3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAID_SUBSCRIBERS_JP */ .N3t],
  getCheckoutFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_DNS */ .uoN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAID_SUBSCRIBERS_JP */ .N3t],
  // Features not displayed but used for checking plan abilities
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUDIO_UPLOADS */ .R_9],
  getInferiorFeatures: () => []
});
const getPlanEcommerceDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_ECOMMERCE */ .UQ,
  getTitle: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanEcommerceTitle */ .iP,
  getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for online stores'),
  getBlogAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for online stores'),
  getPortfolioAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for online stores'),
  getStoreAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for online stores'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Build an online store with powerful, integrated premium extensions.'),
  getDescription: () => {
    return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for online stores:{{/strong}} Sell products or services with this powerful, ' + 'all-in-one online store experience. This plan includes premium integrations and is extendable, ' + 'so it’ll grow with you as your business grows.', plansDescriptionHeadingComponent);
  },
  getShortDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Sell products or services with this powerful, ' + 'all-in-one online store experience. This plan includes premium integrations and is extendable, ' + 'so it’ll grow with you as your business grows.'),
  getTagline: function () {
    return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Learn more about everything included with %(planName)s and take advantage of its powerful marketplace features.', {
      args: {
        planName: this.getTitle()
      }
    });
  },
  getPlanCompareFeatures: (_, {
    isLoggedInMonthlyPricing
  } = {}) => compact([
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ADVANCED */ .xt, isLoggedInMonthlyPricing && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MEMBERSHIPS */ .JLP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_BLOCK */ .Tgp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, isLoggedInMonthlyPricing && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS */ .M$n, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_PLUGINS */ .e00, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES */ .Mo5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SFTP_DATABASE */ .bnw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_BRANDING */ .jPE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_PAYMENTS */ .gH7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_CARRIERS */ .mEY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_PRODUCTS_SERVICES */ .vkJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ECOMMERCE_MARKETING */ .d4e, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CUSTOMIZABE_THEMES */ .BoU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_0 */ .kSO]),
  getPromotedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI],
  getSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_PAYMENTS */ .gH7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_CARRIERS */ .mEY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_BUSINESS_FEATURES */ .adL],
  getBlogSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_PAYMENTS */ .gH7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_CARRIERS */ .mEY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_BUSINESS_FEATURES */ .adL],
  getPortfolioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_PAYMENTS */ .gH7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_CARRIERS */ .mEY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_BUSINESS_FEATURES */ .adL],
  getSignupCompareAvailableFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COLLECT_PAYMENTS_V2 */ .R7Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EARN_AD */ .eYY, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INSTALL_PLUGINS */ .m51, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_EXPANDED_ABBR */ .kPp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_BACKUPS_AND_RESTORE */ ._vw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SFTP_DATABASE */ .bnw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_PAYMENTS */ .gH7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_CARRIERS */ .mEY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .PREMIUM_DESIGN_FOR_STORES */ .kbH].filter(isValueTruthy),
  get2023PricingGridSignupWpcomFeatures: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WOOCOMMERCE_HOSTING */ .ZLu, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_STORE_THEMES */ .SQX, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STORE_DESIGN */ .CTo, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_PRODUCTS */ .CN1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DISPLAY_PRODUCTS_BRAND */ .bA6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_ADD_ONS */ .ozR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ASSEMBLED_KITS */ .uXB, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MIN_MAX_ORDER_QUANTITY */ .QvK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STOCK_NOTIFS */ .m38, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DYNAMIC_UPSELLS */ .Czl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_MARKETING_AUTOMATION */ .yqq, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BULK_DISCOUNTS */ .Xlo, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INVENTORY_MGMT */ .MaF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STREAMLINED_CHECKOUT */ .D9A, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SELL_60_COUNTRIES */ .kbI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_INTEGRATIONS */ .mT$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_0_ALL */ .aNF];
  },
  get2023PlanComparisonFeatureOverride: () => {
    return [];
  },
  getCheckoutFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGINS_THEMES */ .j58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_PAYMENTS */ .gH7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_CARRIERS */ .mEY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_PRODUCTS_SERVICES */ .vkJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INVENTORY */ .Y_U, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_MARKETING_AUTOMATION */ .yqq],
  get2023PricingGridSignupJetpackFeatures: () => [],
  getStorageFeature: (showLegacyStorageFeature, isCurrentPlan) => {
    if (showLegacyStorageFeature && isCurrentPlan) {
      return _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR;
    }
    return (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('plans/updated-storage-labels') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_50GB_STORAGE */ .KGH : _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR;
  },
  getPlanComparisonFeatureLabels: () => ({
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_THEMES */ .CFg]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlimited premium themes'),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHARES_SOCIAL_MEDIA_JP */ .K5c]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlimited shares'),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_STANDARD_FEATURES */ .Uqd]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('0%'),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_WOO_FEATURES */ .QuL]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('0%')
  }),
  getHostingSignupFeatures: term => () => compact([term !== _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SELL_SHIP */ .Jmr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_STORE */ .j6z, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INVENTORY */ .Y_U, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CHECKOUT */ .iPI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_PAYMENTS_V2 */ .LVB, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SALES_REPORTS */ .GNY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_CARRIERS */ .mEY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EXTENSIONS */ .AR4, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BANDWIDTH */ .Tuf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GLOBAL_EDGE_CACHING */ .vz3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BURST */ .eCG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WAF_V2 */ .$5r, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CDN */ .xq9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CPUS */ .lS7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DATACENTRE_FAILOVER */ .qot, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_MALWARE */ .QXs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_DDOS */ .HU_]),
  // Features not displayed but used for checking plan abilities
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUDIO_UPLOADS */ .R_9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_MY_BUSINESS */ .hVU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CLOUDFLARE_ANALYTICS */ .swD, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_INSTALL_PURCHASED_PLUGINS */ .Qqh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES_PLUGINS */ .hQm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EMAIL_FORWARDING_EXTENDED_LIMIT */ .eAf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ATOMIC */ .DF1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getInferiorFeatures: () => []
});
const getWooExpressMediumPlanCompareFeatures = () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WOOCOMMERCE_STORE */ .WI4, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WOOCOMMERCE_MOBILE_APP */ .fZL, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDPRESS_CMS */ .nYV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDPRESS_MOBILE_APP */ .u_9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_SSL_CERTIFICATE */ .p0N, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_BACKUPS_SECURITY_SCAN */ .lu6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_ADMINS */ .uVr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SALES_REPORTS */ .GNY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS_V3 */ .S4e, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LIST_UNLIMITED_PRODUCTS */ .Nno, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GIFT_CARDS */ .KAl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MIN_MAX_ORDER_QUANTITY */ .QvK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_BUNDLES */ .jwP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LIST_PRODUCTS_BY_BRAND */ .Doi, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_RECOMMENDATIONS */ .ceT, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INTEGRATED_PAYMENTS */ .hXr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INTERNATIONAL_PAYMENTS */ .Ckc, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_SALES_TAXES */ .H7I, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_LOCAL_PAYMENTS */ .M7I, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_RECURRING_PAYMENTS */ .xEy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MIN_MAX_ORDER_QUANTITY */ .QvK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PROMOTE_ON_TIKTOK */ .BGp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SYNC_WITH_PINTEREST */ .l58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CONNECT_WITH_FACEBOOK */ .e7z, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACK_IN_STOCK_NOTIFICATIONS */ .LUJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MARKETING_AUTOMATION */ .KUL, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ABANDONED_CART_RECOVERY */ .fPv, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_TOOLS */ .gQ2, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVERTISE_ON_GOOGLE */ .Ncs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_ORDER_EMAILS */ .qRK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INTEGRATED_SHIPMENT_TRACKING */ .YQh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LIVE_SHIPPING_RATES */ .fgV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DISCOUNTED_SHIPPING */ .XuE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRINT_SHIPPING_LABELS */ .gmv, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AI_ASSISTED_PRODUCT_DESCRIPTION */ .y$v];
const getWooExpressSmallPlanCompareFeatures = () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WOOCOMMERCE_STORE */ .WI4, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WOOCOMMERCE_MOBILE_APP */ .fZL, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDPRESS_CMS */ .nYV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDPRESS_MOBILE_APP */ .u_9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_SSL_CERTIFICATE */ .p0N, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_BACKUPS_SECURITY_SCAN */ .lu6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_ADMINS */ .uVr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SALES_REPORTS */ .GNY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS_V3 */ .S4e, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LIST_UNLIMITED_PRODUCTS */ .Nno, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GIFT_CARDS */ .KAl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LIST_PRODUCTS_BY_BRAND */ .Doi, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INTEGRATED_PAYMENTS */ .hXr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INTERNATIONAL_PAYMENTS */ .Ckc, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_SALES_TAXES */ .H7I, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACCEPT_LOCAL_PAYMENTS */ .M7I, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_RECURRING_PAYMENTS */ .xEy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PROMOTE_ON_TIKTOK */ .BGp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SYNC_WITH_PINTEREST */ .l58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CONNECT_WITH_FACEBOOK */ .e7z, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_TOOLS */ .gQ2, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVERTISE_ON_GOOGLE */ .Ncs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_ORDER_EMAILS */ .qRK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INTEGRATED_SHIPMENT_TRACKING */ .YQh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_LIVE_SHIPPING_RATES */ .fgV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRINT_SHIPPING_LABELS */ .gmv, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AI_ASSISTED_PRODUCT_DESCRIPTION */ .y$v];
const getWooExpressPlanCompareFeatures = () => [...getWooExpressSmallPlanCompareFeatures(), ...getWooExpressMediumPlanCompareFeatures()];
const getPlanWooExpressMediumDetails = () => ({
  ...getPlanEcommerceDetails(),
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Performance'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Accelerate your growth with advanced features.'),
  get2023PricingGridSignupWpcomFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACK_IN_STOCK_NOTIFICATIONS */ .LUJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MARKETING_AUTOMATION */ .KUL, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_EMAIL_TRIGGERS */ .nh1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CART_ABANDONMENT_EMAILS */ .uFG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_OFFER_BULK_DISCOUNTS */ .k4q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_RECOMMEND_ADD_ONS */ .njy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MIN_MAX_ORDER_QUANTITY */ .QvK],
  getPlanCompareFeatures: () => getWooExpressPlanCompareFeatures(),
  get2023PlanComparisonFeatureOverride: () => getWooExpressMediumPlanCompareFeatures(),
  getStorageFeature: () => _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR,
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Learn more about everything included with Woo Express Performance and take advantage of its powerful marketplace features.')
});
const getPlanWooExpressSmallDetails = () => ({
  ...getPlanEcommerceDetails(),
  get2023PricingGridSignupWpcomFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_ADMINS */ .uVr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_50GB_STORAGE */ .KGH, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_PRODUCTS_SERVICES */ .vkJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SELL_INTERNATIONALLY */ .yT6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATIC_SALES_TAX */ .gbu, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_BACKUPS_SECURITY_SCAN */ .lu6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INTEGRATED_SHIPMENT_TRACKING */ .YQh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REAL_TIME_ANALYTICS */ .Fim, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SELL_EGIFTS_AND_VOUCHERS */ .Xil, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EMAIL_MARKETING */ .LhS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MARKETPLACE_SYNC_SOCIAL_MEDIA_INTEGRATION */ .bUN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_TOOLS */ .gQ2, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AI_ASSISTED_PRODUCT_DESCRIPTION */ .y$v],
  getPlanCompareFeatures: () => getWooExpressPlanCompareFeatures(),
  get2023PlanComparisonFeatureOverride: () => getWooExpressSmallPlanCompareFeatures(),
  getStorageFeature: () => _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_50GB_STORAGE */ .KGH,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Essential'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Everything you need to set up your store and start selling your products.'),
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Learn more about everything included with Woo Express Essential and take advantage of its powerful marketplace features.')
});
const getPlanPremiumDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_PREMIUM */ .n4,
  getTitle: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanPremiumTitle */ .$h,
  getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for freelancers'),
  getBlogAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for freelancers'),
  getPortfolioAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for freelancers'),
  getStoreAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for freelancers'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Build a unique website with powerful design tools.'),
  getNewsletterTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Make it even more memorable with premium designs and style customization.'),
  getLinkInBioTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Make a great first impression with premium designs and style customization.'),
  getBlogOnboardingTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Make it even more memorable with premium designs, 4K video, and style customization.'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for freelancers:{{/strong}} Build a unique website with advanced design tools, CSS editing, lots of space for audio and video,' + ' Google Analytics support,' + ' and the ability to monetize your site with ads.', plansDescriptionHeadingComponent),
  getShortDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Build a unique website with advanced design tools, CSS editing, lots of space for audio and video,' + ' Google Analytics support,' + ' and the ability to monetize your site with ads.'),
  getPlanCompareFeatures: (_, {
    isLoggedInMonthlyPricing
  } = {}) => compact([
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ESSENTIAL */ .BfV, isLoggedInMonthlyPricing && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_13GB_STORAGE */ .xoQ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MEMBERSHIPS */ .JLP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_BLOCK */ .Tgp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, isLoggedInMonthlyPricing && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS */ .M$n, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_4 */ .kYS]),
  getPromotedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_13GB_STORAGE */ .xoQ],
  getSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_PERSONAL_FEATURES */ .ItL],
  getTagline: function () {
    return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Take your Newsletter further, faster. Get everything included in %(planName)s, plus premium design themes, baked-in video uploads, ad monetization, deep visitor insights from Google Analytics, and 24/7 expert support.', {
      args: {
        planName: this.getTitle()
      }
    });
  },
  getNewsletterSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STYLE_CUSTOMIZATION */ .RkI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLTD_SOCIAL_MEDIA_JP */ .jiF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEOPRESS_JP */ .HKK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_PAID */ .iQ_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_4 */ .kYS],
  getNewsletterHighlightedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_EMAILS */ .Zvm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AD_FREE_EXPERIENCE */ .dBh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REAL_TIME_ANALYTICS */ .Fim, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw],
  getLinkInBioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STYLE_CUSTOMIZATION */ .RkI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEOPRESS_JP */ .HKK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLTD_SOCIAL_MEDIA_JP */ .jiF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS */ .yks, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_PAID */ .iQ_],
  getLinkInBioHighlightedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl],
  getBlogOnboardingSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STYLE_CUSTOMIZATION */ .RkI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS */ .yks, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_4 */ .kYS],
  getBlogOnboardingHighlightedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl],
  getBlogOnboardingSignupJetpackFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEOPRESS_JP */ .HKK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLTD_SOCIAL_MEDIA_JP */ .jiF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_ACTIVITY_LOG_JP */ .LHt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_PAID */ .iQ_],
  getBlogSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MONETISE */ .aC2, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_PERSONAL_FEATURES */ .ItL].filter(isValueTruthy),
  getPortfolioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_PERSONAL_FEATURES */ .ItL].filter(isValueTruthy),
  getSignupCompareAvailableFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COLLECT_PAYMENTS_V2 */ .R7Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EARN_AD */ .eYY, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP].filter(isValueTruthy),
  get2023PricingGridSignupWpcomFeatures: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS */ .yks, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STYLE_CUSTOMIZATION */ .RkI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_4 */ .kYS];
  },
  get2023PlanComparisonFeatureOverride: () => {
    return [];
  },
  getCheckoutFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS */ .yks, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STYLE_CUSTOMIZATION */ .RkI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_PAID */ .iQ_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEOPRESS_JP */ .HKK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLTD_SOCIAL_MEDIA_JP */ .jiF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_ACTIVITY_LOG_JP */ .LHt],
  get2023PricingGridSignupJetpackFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEOPRESS_JP */ .HKK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLTD_SOCIAL_MEDIA_JP */ .jiF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_ACTIVITY_LOG_JP */ .LHt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_PAID */ .iQ_],
  getStorageFeature: () => _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_13GB_STORAGE */ .xoQ,
  getPlanComparisonFeatureLabels: () => ({
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_THEMES */ .CFg]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlimited premium themes'),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHARES_SOCIAL_MEDIA_JP */ .K5c]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlimited shares'),
    [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_STANDARD_FEATURES */ .Uqd]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('4%')
  }),
  get2023PlanComparisonJetpackFeatureOverride: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYPAL_JP */ .O6g, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEOPRESS_JP */ .HKK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_PAID */ .iQ_],
  // Features not displayed but used for checking plan abilities
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUDIO_UPLOADS */ .R_9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CLOUDFLARE_ANALYTICS */ .swD, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getInferiorFeatures: () => []
});
const getPlanBusinessDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_BUSINESS */ .e8,
  getTitle: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanBusinessTitle */ .gL,
  getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for small businesses'),
  getBlogAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for small businesses'),
  getPortfolioAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for small businesses'),
  getStoreAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('The plan for small businesses'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlock the power of WordPress with the managed hosting platform built by WordPress experts.'),
  getBlogOnboardingTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Expand your blog with plugins and powerful tools to help you scale.'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for small businesses:{{/strong}} Power your' + ' business website with custom plugins and themes,' + ' %(nmOfGB)s GB storage, and the ability to remove WordPress.com branding.', {
    ...plansDescriptionHeadingComponent,
    args: {
      nmOfGB: (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('plans/updated-storage-labels') ? '50' : '200'
    }
  }),
  getShortDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Power your business website with custom plugins and themes,' + ' %(nmOfGB)s GB storage, and the ability to remove WordPress.com branding.', {
    args: {
      nmOfGB: (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('plans/updated-storage-labels') ? '50' : '200'
    }
  }),
  getTagline: function () {
    return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Learn more about everything included with %(planName)s and take advantage of its powerful marketplace features.', {
      args: {
        planName: this.getTitle()
      }
    });
  },
  getPlanCompareFeatures: (_, {
    isLoggedInMonthlyPricing
  } = {}) => compact([
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ADVANCED */ .xt, isLoggedInMonthlyPricing && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_50GB_STORAGE */ .KGH, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MEMBERSHIPS */ .JLP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_BLOCK */ .Tgp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, isLoggedInMonthlyPricing && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS */ .M$n, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_PLUGINS */ .e00, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES */ .Mo5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SFTP_DATABASE */ .bnw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_BRANDING */ .jPE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_2 */ .kb1]),
  getPromotedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS */ .M$n],
  getSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES_PLUGINS */ .hQm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_TOOLS */ .gQ2, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_PREMIUM_FEATURES */ .NrG],
  getBlogSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES_PLUGINS */ .hQm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_TOOLS */ .gQ2, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_PREMIUM_FEATURES */ .NrG],
  getPortfolioSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES_PLUGINS */ .hQm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_PREMIUM_FEATURES */ .NrG],
  getSignupCompareAvailableFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COLLECT_PAYMENTS_V2 */ .R7Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EARN_AD */ .eYY, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INSTALL_PLUGINS */ .m51, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_EXPANDED_ABBR */ .kPp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_BACKUPS_AND_RESTORE */ ._vw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SFTP_DATABASE */ .bnw].filter(isValueTruthy),
  get2023PricingGridSignupWpcomFeatures: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGINS_THEMES */ .j58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BANDWIDTH */ .Tuf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_TRAFFIC */ .l5Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GLOBAL_EDGE_CACHING */ .vz3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BURST */ .eCG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WAF_V2 */ .$5r, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CDN */ .xq9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CPUS */ .lS7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DATACENTRE_FAILOVER */ .qot, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ISOLATED_INFRA */ .iAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_MALWARE */ .QXs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_TIERED_STORAGE_PLANS_AVAILABLE */ .OvS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REAL_TIME_SECURITY_SCANS */ .O2$,
    /***
     * Probably should be moved to Jetpack Features
     */
    _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_JP */ .y33, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_DDOS */ .HU_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DEV_TOOLS */ .lW1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_STAGING_SITES */ .KmN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEAMLESS_STAGING_PRODUCTION_SYNCING */ .XNd, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_UPDATES */ .SIm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MULTI_SITE */ .bW1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_VULNERABILITY_NOTIFICATIONS */ .Cf7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_0_WOO */ .WT$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_2_REGULAR */ .jM];
  },
  get2023PlanComparisonFeatureOverride: () => {
    return [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGINS_THEMES */ .j58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BANDWIDTH */ .Tuf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_TRAFFIC */ .l5Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GLOBAL_EDGE_CACHING */ .vz3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BURST */ .eCG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WAF_V2 */ .$5r, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CDN */ .xq9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CPUS */ .lS7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DATACENTRE_FAILOVER */ .qot, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ISOLATED_INFRA */ .iAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_MALWARE */ .QXs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_TIERED_STORAGE_PLANS_AVAILABLE */ .OvS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REAL_TIME_SECURITY_SCANS */ .O2$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_JP */ .y33, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_DDOS */ .HU_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DEV_TOOLS */ .lW1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_STAGING_SITES */ .KmN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEAMLESS_STAGING_PRODUCTION_SYNCING */ .XNd, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_UPDATES */ .SIm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MULTI_SITE */ .bW1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_VULNERABILITY_NOTIFICATIONS */ .Cf7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_0_WOO */ .WT$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_2_REGULAR */ .jM, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_WOO_FEATURES */ .QuL];
  },
  getCheckoutFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGINS_THEMES */ .j58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BANDWIDTH */ .Tuf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CDN */ .xq9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_TOOLS */ .gQ2, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRIORITY_24_7_SUPPORT */ .bMh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DEV_TOOLS */ .lW1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REALTIME_BACKUPS_JP */ .e7t, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_ACTIVITY_LOG_JP */ .LHt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_DDOS */ .HU_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_STAGING_SITES */ .KmN],
  get2023PricingGridSignupJetpackFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REALTIME_BACKUPS_JP */ .e7t, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ONE_CLICK_RESTORE_V2 */ .RAq, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPTIME_MONITOR_JP */ .Qcp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ES_SEARCH_JP */ .GlD, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGIN_AUTOUPDATE_JP */ .NBm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_JP */ .ur7],
  getPlanComparisonFeatureLabels: () => {
    const featureLabels = {
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_THEMES */ .CFg]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlimited premium themes'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_STORE_THEMES */ .SQX]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_PRODUCTS */ .CN1]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DISPLAY_PRODUCTS_BRAND */ .bA6]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_ADD_ONS */ .ozR]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ASSEMBLED_KITS */ .uXB]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MIN_MAX_ORDER_QUANTITY */ .QvK]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STOCK_NOTIFS */ .m38]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DYNAMIC_UPSELLS */ .Czl]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_MARKETING_AUTOMATION */ .yqq]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BULK_DISCOUNTS */ .Xlo]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INVENTORY_MGMT */ .MaF]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STREAMLINED_CHECKOUT */ .D9A]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SELL_60_COUNTRIES */ .kbI]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHIPPING_INTEGRATIONS */ .mT$]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with paid plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SHARES_SOCIAL_MEDIA_JP */ .K5c]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlimited shares'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STORE_DESIGN */ .CTo]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Available with plugins'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_STANDARD_FEATURES */ .Uqd]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('2%'),
      [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COMMISSION_FEE_WOO_FEATURES */ .QuL]: i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('0%')
    };
    return featureLabels;
  },
  getStorageFeature: (showLegacyStorageFeature, isCurrentPlan) => {
    if (showLegacyStorageFeature) {
      /* If the user is currently has a legacy plan with 200GB storage space, the capacity will decrease to
       * 50GB if they change their billing terms.
       */
      return isCurrentPlan ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR : _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_50GB_STORAGE */ .KGH;
    }
    return (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('plans/updated-storage-labels') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_50GB_STORAGE */ .KGH : _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_200GB_STORAGE */ .JZR;
  },
  getHostingSignupFeatures: term => () => compact([term !== _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGINS_THEMES */ .j58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BANDWIDTH */ .Tuf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GLOBAL_EDGE_CACHING */ .vz3, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BURST */ .eCG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WAF_V2 */ .$5r, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CDN */ .xq9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CPUS */ .lS7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DATACENTRE_FAILOVER */ .qot, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ISOLATED_INFRA */ .iAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_MALWARE */ .QXs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_DDOS */ .HU_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_DEV_TOOLS */ .lW1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_STAGING_SITES */ .KmN, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_UPDATES */ .SIm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MULTI_SITE */ .bW1]),
  getBlogOnboardingSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGINS_THEMES */ .j58, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SECURITY_MALWARE */ .QXs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WP_UPDATES */ .SIm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_TRANSACTION_FEES_2 */ .kb1],
  getBlogOnboardingSignupJetpackFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_JP */ .ur7, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLUGIN_AUTOUPDATE_JP */ .NBm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REALTIME_BACKUPS_JP */ .e7t, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ONE_CLICK_RESTORE_V2 */ .RAq, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ES_SEARCH_JP */ .GlD],
  // Features not displayed but used for checking plan abilities
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUDIO_UPLOADS */ .R_9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_MY_BUSINESS */ .hVU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CLOUDFLARE_ANALYTICS */ .swD, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_INSTALL_PURCHASED_PLUGINS */ .Qqh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EMAIL_FORWARDING_EXTENDED_LIMIT */ .eAf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ATOMIC */ .DF1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getInferiorFeatures: () => [],
  getSenseiFeatures: term => () => compact([term !== _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, term !== _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he && _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_SUPPORT */ .Hc$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_UNLIMITED */ .BFp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_INTERACTIVE */ .Uvw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_QUIZZES */ .ndR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_SELL_COURSES */ .V82, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_STORAGE */ .LHc, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_HOSTING */ .iNP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_JETPACK */ .A6]),
  getSenseiHighlightedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SENSEI_SUPPORT */ .Hc$]
});
const getPlanProDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_PRO */ .VS,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('WordPress Pro'),
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('This plan gives you access to our most powerful features at an affordable price for an unmatched value you won’t get anywhere else. No longer available to new users.'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('You’ve got our best deal on hosting! ' + 'Your Pro plan includes access to all the most popular features WordPress.com has to offer, including premium themes and access to over 50,000 plugins. ' + 'As an existing customer, you can keep your site on this plan as long as your subscription remains active.'),
  getSubTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Unlimited features. Unbeatable value.'),
  getPlanCompareFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_TRAFFIC */ .l5Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MANAGED_HOSTING */ .CR9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES */ .vCo, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_INSTALL_PLUGINS */ .m51, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_INSTALL_PURCHASED_PLUGINS */ .Qqh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WOOCOMMERCE */ .sWw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_50GB_STORAGE */ .KGH, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_ADS */ .MZU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_ADMINS */ .uVr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS */ .M$n, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_BLOCKS */ .DyV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SOCIAL_MEDIA_TOOLS */ .Ywz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_TITAN_EMAIL */ .ZxR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MONETISE */ .aC2, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SFTP_DATABASE */ .bnw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_BACKUPS_AND_RESTORE */ ._vw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ESSENTIAL */ .BfV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO_EXPANDED_ABBR */ .kPp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUDIO_UPLOADS */ .R_9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CLOUDFLARE_ANALYTICS */ .swD, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_COLLECT_PAYMENTS_V2 */ .R7Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EARN_AD */ .eYY, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EMAIL_FORWARDING_EXTENDED_LIMIT */ .eAf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_MY_BUSINESS */ .hVU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_HOSTING */ ._22, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_DESIGN_CUSTOMIZATION */ .$lI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MEMBERSHIPS */ .JLP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_NO_BRANDING */ .jPE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_CONTENT_BLOCK */ .Tgp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SFTP_DATABASE */ .bnw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_BACKUPS_AND_RESTORE */ ._vw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_PLUGINS */ .e00, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES */ .Mo5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UPLOAD_THEMES_PLUGINS */ .hQm, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ATOMIC */ .DF1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getPlanCancellationDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Heads up — you are currently on a legacy plan that is no longer available for new subscribers. ' + 'Your Pro plan includes access to all the most popular features WordPress.com has to offer, ' + 'including premium themes and access to over 50,000 plugins. As an existing Pro plan subscriber, ' + 'you can keep your site on this legacy plan as long as your subscription remains active. ' + 'If canceled, the WordPress.com Pro plan can no longer be added to your account.')
});

// The following is not a real plan, we are adding it here so that
// Woo Express Plus gets its own column in the plans grid.
const getPlanWooExpressPlusDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_WOO_EXPRESS_PLUS */ .bk,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Plus'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('For fast-growing businesses that need access to the most powerful tools.'),
  getDescription: () => '',
  get2023PricingGridSignupWpcomFeatures: () => [],
  get2023PricingGridSignupJetpackFeatures: () => []
});

// The following is not a real plan, we are adding it here so that
// VIP (a.k.a Enterprise) gets its own column in the plans grid.
// Check pdgrnI-1Qp-p2 for more details.
const get2023EnterprisGrideDetails = () => ({
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_ENTERPRISE_GRID_WPCOM */ .t0,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Enterprise'),
  getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for enterprises'),
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Deliver an unmatched performance with the highest security standards on our enterprise content platform.'),
  getDescription: () => '',
  get2023PricingGridSignupWpcomFeatures: () => [],
  get2023PricingGridSignupJetpackFeatures: () => []
});
const getJetpackPersonalDetails = () => ({
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_PERSONAL */ .gA,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Personal'),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo].includes(plan),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for personal use:{{/strong}} Security essentials for your WordPress site, including ' + 'automated backups and priority support.', plansDescriptionHeadingComponent),
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Your data is being securely backed up and you have access to priority support.'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_DAILY_V2 */ .hjj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ANTISPAM_V2 */ .snK],
  getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('per year'),
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_OFFSITE_BACKUP_VAULTPRESS_DAILY */ .JYj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_30 */ .JEu, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_STORAGE_SPACE_UNLIMITED */ .ZNU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_RESTORES */ .aFM, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_AKISMET_PLUS */ .pt9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EASY_SITE_MIGRATION */ .Vy9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_OFFSITE_BACKUP_VAULTPRESS_DAILY */ .JYj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_AKISMET_PLUS */ .pt9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACTIVITY_LOG */ .CD8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_FREE_FEATURES_JETPACK */ .tDt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH]
});
const getJetpackPremiumDetails = () => ({
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_PREMIUM */ .n4,
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL */ .Y1g, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL_MONTHLY */ .EsA].includes(plan),
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Premium'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for small businesses:{{/strong}} Comprehensive, automated scanning for security vulnerabilities, ' + 'fast video hosting, and marketing automation.', plansDescriptionHeadingComponent),
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Your site is being secured and you have access to marketing tools and priority support.'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_DAILY_V2 */ .hjj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SCAN_V2 */ .a2z, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ANTISPAM_V2 */ .snK],
  getIncludedFeatures: () => compact([
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_OFFSITE_BACKUP_VAULTPRESS_DAILY */ .JYj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_30 */ .JEu, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_STORAGE_SPACE_UNLIMITED */ .ZNU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_RESTORES */ .aFM, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_AKISMET_PLUS */ .pt9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EASY_SITE_MIGRATION */ .Vy9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MALWARE_SCANNING_DAILY */ .xpj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS_BI_YEARLY */ .kzF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS */ .rag, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS_MONTHLY */ .Xx6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_OFFSITE_BACKUP_VAULTPRESS_DAILY */ .JYj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_AKISMET_PLUS */ .pt9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MALWARE_SCANNING_DAILY */ .xpj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATIC_SECURITY_FIXES */ .sPj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_FREE_FEATURES_JETPACK */ .tDt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH])
});
const getJetpackBusinessDetails = () => ({
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_BUSINESS */ .e8,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Professional'),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PREMIUM */ .Ryn, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PREMIUM_MONTHLY */ .BfZ, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL */ .Y1g, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL_MONTHLY */ .EsA].includes(plan),
  getDescription: () => (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for organizations:{{/strong}} The most powerful WordPress sites.', plansDescriptionHeadingComponent) : i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for organizations:{{/strong}} The most powerful WordPress sites: real-time backups ' + 'and premium themes.', plansDescriptionHeadingComponent),
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('You have the full suite of security and performance tools.'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_REALTIME_V2 */ .hS1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_SCAN_REALTIME_V2 */ .Isg, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ANTISPAM_V2 */ .snK],
  getIncludedFeatures: () => compact([
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_OFFSITE_BACKUP_VAULTPRESS_REALTIME */ .F2P, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_UNLIMITED */ .DZs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_STORAGE_SPACE_UNLIMITED */ .ZNU, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUTOMATED_RESTORES */ .aFM, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SPAM_AKISMET_PLUS */ .pt9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_EASY_SITE_MIGRATION */ .Vy9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MALWARE_SCANNING_DAILY_AND_ON_DEMAND */ .Jr$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ONE_CLICK_THREAT_RESOLUTION */ .$By, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME */ .lwq, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME_MONTHLY */ .HIJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS_BI_YEARLY */ .kzF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS */ .rag, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS_MONTHLY */ .Xx6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_OFFSITE_BACKUP_VAULTPRESS_REALTIME */ .F2P, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ALL_PREMIUM_FEATURES_JETPACK */ .OPf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH]),
  getInferiorFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ]
});
const getPlanJetpackSecurityDailyDetails = () => ({
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_SECURITY_DAILY */ .ME,
  getTitle: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Security {{em}}Daily{{/em}}', {
    components: {
      em: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", null)
    }
  }),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, ..._constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_LEGACY_PLANS */ .Ctn].includes(plan),
  getDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('All of the essential Jetpack Security features in one package including VaultPress Backup, Scan, Akismet Anti-spam and more.'),
  getTagline: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Best for sites with occasional updates'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_BACKUP_DAILY_V2 */ .P2_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_SCAN_DAILY_V2 */ .Ohd, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ANTISPAM_V2 */ .snK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WAF */ ._Qs],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_30 */ .JEu, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH]
});
const getPlanJetpackSecurityRealtimeDetails = () => ({
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_SECURITY_REALTIME */ .gf,
  getTitle: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Security {{em}}Real-time{{/em}}', {
    components: {
      em: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", {
        style: {
          whiteSpace: 'nowrap'
        }
      })
    }
  }),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY */ .I5k, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY_MONTHLY */ .ufm, ..._constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_LEGACY_PLANS */ .Ctn].includes(plan),
  getDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Get next-level protection with real-time backups, real-time scan and all essential security tools.'),
  getTagline: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Best for sites with frequent updates'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLAN_SECURITY_DAILY */ ._5w, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_BACKUP_REALTIME_V2 */ .dIT, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_SCAN_REALTIME_V2 */ .Isg, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACTIVITY_LOG_1_YEAR_V2 */ .VX3],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME */ .lwq, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME_MONTHLY */ .HIJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_UNLIMITED */ .DZs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getInferiorFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_30 */ .JEu]
});
const getPlanJetpackSecurityT1Details = () => ({
  ...getJetpackCommonPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_SECURITY_T1 */ .C5,
  getTitle: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Security', {
    context: 'Jetpack product name'
  }),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, ..._constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_LEGACY_PLANS */ .Ctn].includes(plan),
  getDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Easy-to-use, comprehensive WordPress site security including backups, malware scanning, and spam protection.'),
  getFeaturedDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('This bundle includes:{{ul}}{{li}}VaultPress Backup (10GB){{/li}}{{li}}Scan{{/li}}{{li}}Akismet Anti-spam (10k API calls/mo){{/li}}{{/ul}}', {
    components: {
      ul: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null),
      li: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null)
    },
    comment: '{{ul}}{{ul/}} represents an unordered list, and {{li}}{/li} represents a list item'
  }),
  getLightboxDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Easy-to-use, comprehensive WordPress site security including backups, malware scanning, and spam protection.{{br/}}Includes VaultPress Backup, Jetpack Scan, and Akismet Anti-spam.', {
    components: {
      br: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null)
    },
    comment: '{{br/}} represents a line break'
  }),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_PRODUCT_BACKUP */ .D6q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_REAL_TIME_MALWARE_SCANNING */ .P44, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ANTISPAM_V2 */ .snK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WAF */ ._Qs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_30_DAY_ARCHIVE_ACTIVITY_LOG */ .tx2],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T1_BI_YEARLY */ .akF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T1_YEARLY */ .gOt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T1_MONTHLY */ .J_n, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_UNLIMITED */ .DZs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getBenefits: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Protect your revenue stream and content'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Learn about issues before your customers are impacted'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Restore your site in one click from desktop or mobile'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Fix your site without a developer'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Protect Woo order and customer data'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Save time manually reviewing spam'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Best-in-class support from WordPress experts')],
  getInferiorFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ]
});
const getPlanJetpackSecurityT2Details = () => ({
  ...getPlanJetpackSecurityT1Details(),
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_SECURITY_T2 */ .JH,
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PLAN_SECURITY_DAILY */ ._5w, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_BACKUP_REALTIME_V2 */ .dIT, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_SCAN_REALTIME_V2 */ .Isg, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WAF */ ._Qs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_1_YEAR_ARCHIVE_ACTIVITY_LOG */ ._5J],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T2_YEARLY */ .dut, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T2_MONTHLY */ .UjR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_UNLIMITED */ .DZs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getInferiorFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_30 */ .JEu]
});
const getPlanJetpackCompleteDetails = () => ({
  ...getJetpackCommonPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_ALL */ .V4,
  getTitle: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Complete', {
    context: 'Jetpack plan name'
  }),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, ..._constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_SECURITY_PLANS */ .VtF, ..._constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_LEGACY_PLANS */ .Ctn].includes(plan),
  getDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Get the full power of Jetpack with all Security, Performance, Growth, and Design tools.'),
  getFeaturedDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Get the full Jetpack suite with real-time security tools, improved site performance, and tools to grow your business.'),
  getLightboxDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Full Jetpack suite with real-time security, instant site search, ad-free video, all CRM extensions, and extra storage for backups and video.'),
  getTagline: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('For best-in-class WordPress sites'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ALL_BACKUP_SECURITY_FEATURES */ .yCc, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_1TB_BACKUP_STORAGE */ .bw5, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_PRODUCT_VIDEOPRESS */ .H_g, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_SEARCH_V2 */ .xj, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CRM_V2 */ .boO, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_1_YEAR_ARCHIVE_ACTIVITY_LOG */ ._5J],
  getIncludedFeatures: () => compact([_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T2_YEARLY */ .dut, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T2_MONTHLY */ .UjR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SEARCH_BI_YEARLY */ .siL, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SEARCH */ .xsQ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SEARCH_MONTHLY */ .Dw1, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_CRM */ .DGp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_CRM_MONTHLY */ .J2p, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_UNLIMITED */ .DZs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BOOST_BI_YEARLY */ .jO_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BOOST */ .WcS, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BOOST_MONTHLY */ .Onf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SOCIAL_ADVANCED_BI_YEARLY */ ._nr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SOCIAL_ADVANCED */ .fv4, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SOCIAL_ADVANCED_MONTHLY */ .pJg, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS_BI_YEARLY */ .kzF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS */ .rag, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_VIDEOPRESS_MONTHLY */ .Xx6, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CLOUD_CRITICAL_CSS */ .JUp, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('themes/premium') ? _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_PREMIUM_THEMES_UNLIMITED */ .uGw : null, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STATS_PAID */ .iQ_]),
  getInferiorFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_30 */ .JEu, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SOCIAL_BASIC_BI_YEARLY */ .g9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SOCIAL_BASIC */ .tdE, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SOCIAL_BASIC_MONTHLY */ .Bof],
  getBenefits: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Protect your revenue stream and content'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Learn about issues before your customers are impacted'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Restore your site in one click from desktop or mobile'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Fix your site without a developer'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Protect Woo order and customer data'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Save time manually reviewing spam'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Grow your business with video, social, and CRM tools'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Best-in-class support from WordPress experts')]
});
const getPlanJetpackStarterDetails = () => ({
  ...getJetpackCommonPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_JETPACK_STARTER */ .kh,
  getTitle: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Starter', {
    context: 'Jetpack product name'
  }),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, ..._constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_LEGACY_PLANS */ .Ctn].includes(plan),
  getTagline: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Essential security tools: real-time backups and comment spam protection.'),
  getDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Essential security tools: real-time backups and comment spam protection.'),
  getFeaturedDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('This bundle includes:{{ul}}{{li}}VaultPress Backup (1GB){{/li}}{{li}}Akismet Anti-spam (1k API calls/mo){{/li}}{{/ul}}', {
    components: {
      ul: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null),
      li: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null)
    },
    comment: '{{ul}}{{ul/}} represents an unordered list, and {{li}}{/li} represents a list item'
  }),
  getRecommendedFor: () => [{
    tag: _constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_TAG_FOR_SMALL_SITES */ .xSC,
    label: (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Small sites')
  }, {
    tag: _constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_TAG_FOR_BLOGS */ .CAp,
    label: (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Blogs')
  }],
  getLightboxDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Essential security tools: real-time backups and comment spam protection.'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_PRODUCT_BACKUP */ .D6q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ANTISPAM_V2 */ .snK],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T0_YEARLY */ .Xsf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T0_MONTHLY */ ._pA, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_BI_YEARLY */ .qCK, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM */ .l1X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_ANTI_SPAM_MONTHLY */ .NAz, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_UNLIMITED */ .DZs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_ANTISPAM */ .Rs_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getBenefits: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Protect your revenue stream and content'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Restore your site in one click from desktop or mobile'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Fix your site without a developer'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Protect Woo order and customer data'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Save time manually reviewing spam'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Best-in-class support from WordPress experts')],
  getInferiorFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ]
});
const getPlanJetpackGoldenTokenDetails = () => ({
  group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_GOLDEN_TOKEN */ .$R,
  getTitle: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Golden Token', {
    context: 'The name of a Jetpack plan awarded to amazing WordPress sites'
  }),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo, ..._constants__WEBPACK_IMPORTED_MODULE_4__/* .JETPACK_LEGACY_PLANS */ .Ctn].includes(plan),
  getDescription: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('The Golden Token provides a lifetime license for Backup and Scan.'),
  getTagline: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('A lifetime of Jetpack powers for your website'),
  getPlanCardFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_BACKUP_REALTIME_V2 */ .dIT, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PRODUCT_SCAN_REALTIME_V2 */ .Isg, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ACTIVITY_LOG_1_YEAR_V2 */ .VX3],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME */ .lwq, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME_MONTHLY */ .HIJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_UNLIMITED */ .DZs, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_VIDEO_UPLOADS_JETPACK_PRO */ .zTG, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_REPUBLICIZE */ .whx, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SIMPLE_PAYMENTS */ .irI, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_WORDADS_INSTANT */ .oIC, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PREMIUM_SUPPORT */ .Vrh, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_SCAN */ .Jgn, _constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_BACKUPS */ .ZzH],
  getInferiorFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BACKUP_ARCHIVE_30 */ .JEu]
});

// DO NOT import. Use `getPlan` instead.
const PLANS_LIST = {
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7]: {
    ...getPlanFreeDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('No expiration date'),
    getProductId: () => 1,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7,
    getPathSlug: () => 'beginner'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE]: {
    ...getPlanBloggerDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: WPComGetBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7].includes(plan),
    getProductId: () => 1010,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE,
    getPathSlug: () => 'blogger'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP]: {
    ...getPlanBloggerDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
    getBillingTimeFrame: WPComGetBiennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE].includes(plan),
    getProductId: () => 1030,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP,
    getPathSlug: () => 'blogger-2-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc]: {
    ...getPlanPersonalDetails(),
    ...getMonthlyTimeframe(),
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP].includes(plan),
    getProductId: () => 1019,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc,
    getPathSlug: () => 'personal-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ]: {
    ...getPlanPersonalDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: WPComGetBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc].includes(plan),
    getProductId: () => 1009,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ,
    getPathSlug: () => 'personal'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ]: {
    ...getPlanPersonalDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
    getBillingTimeFrame: WPComGetBiennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ].includes(plan),
    getProductId: () => 1029,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ,
    getPathSlug: () => 'personal-2-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_3_YEARS */ .EX]: {
    ...getPlanPersonalDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_TRIENNIALLY */ .V0,
    getBillingTimeFrame: WPComGetTriennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ].includes(plan),
    getProductId: () => 1049,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_3_YEARS */ .EX,
    getPathSlug: () => 'personal-3-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol]: {
    ...getPlanPremiumDetails(),
    ...getMonthlyTimeframe(),
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ].includes(plan),
    getProductId: () => 1013,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol,
    getPathSlug: () => 'premium-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi]: {
    ...getPlanPremiumDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: WPComGetBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC].includes(plan),
    getProductId: () => 1003,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi,
    getPathSlug: () => 'premium'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD]: {
    ...getPlanPremiumDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
    getBillingTimeFrame: WPComGetBiennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi].includes(plan),
    getProductId: () => 1023,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD,
    getPathSlug: () => 'premium-2-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_3_YEARS */ .nM]: {
    ...getPlanPremiumDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_TRIENNIALLY */ .V0,
    getBillingTimeFrame: WPComGetTriennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_3_YEARS */ .EX, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD].includes(plan),
    getProductId: () => 1043,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_3_YEARS */ .nM,
    getPathSlug: () => 'premium-3-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL]: {
    ...getPlanBusinessDetails(),
    ...getMonthlyTimeframe(),
    availableFor: plan => (0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('upgrades/wpcom-monthly-plans') && [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1018,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL,
    getPathSlug: () => 'business-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY]: {
    ...getPlanBusinessDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: WPComGetBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1008,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY,
    getPathSlug: () => 'business'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_2_YEARS */ .vt]: {
    ...getPlanBusinessDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
    getBillingTimeFrame: WPComGetBiennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_2_YEARS */ .vD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1028,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_2_YEARS */ .vt,
    getPathSlug: () => 'business-2-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_3_YEARS */ .CR]: {
    ...getPlanBusinessDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_TRIENNIALLY */ .V0,
    getBillingTimeFrame: WPComGetTriennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_3_YEARS */ .EX, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_3_YEARS */ .nM, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_2_YEARS */ .vt, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_2_YEARS */ .vD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1048,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_3_YEARS */ .CR,
    getPathSlug: () => 'business-3-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_100_YEARS */ .dj]: {
    ...getPlanBusinessDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_CENTENNIALLY */ .SP,
    group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_100_YEAR */ .lP,
    // Todo: ¯\_(ツ)_/¯ on the copy.
    getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('100-Year Plan'),
    getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for long-term thinkers'),
    getBlogAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for long-term thinkers'),
    getPortfolioAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for long-term thinkers'),
    getStoreAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for long-term thinkers'),
    getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('A plan to leave a lasting mark on the web.'),
    getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('A plan to leave a lasting mark on the web.'),
    getShortDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('A plan to leave a lasting mark on the web.'),
    getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('A plan to leave a lasting mark on the web.'),
    getBlogOnboardingTagLine: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('A plan to leave a lasting mark on the web.'),
    getBillingTimeFrame: WPComGetBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1061,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_100_YEARS */ .dj,
    getPathSlug: () => 'wp_bundle_hundred_year'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_MONTHLY */ .r]: {
    ...getPlanEcommerceDetails(),
    ...getMonthlyTimeframe(),
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_2_YEARS */ .vt, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1021,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_MONTHLY */ .r,
    getPathSlug: () => 'ecommerce-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE */ .DH]: {
    ...getPlanEcommerceDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: WPComGetBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_2_YEARS */ .vt, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_MONTHLY */ .r, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1011,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE */ .DH,
    getPathSlug: () => 'ecommerce'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_2_YEARS */ .xi]: {
    ...getPlanEcommerceDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
    getBillingTimeFrame: WPComGetBiennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_2_YEARS */ .vD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_2_YEARS */ .vt, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_MONTHLY */ .r, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE */ .DH, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1031,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_2_YEARS */ .xi,
    getPathSlug: () => 'ecommerce-2-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_MEDIUM_MONTHLY */ .se]: {
    ...getPlanWooExpressMediumDetails(),
    ...getMonthlyTimeframe(),
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_WOOEXPRESS_MEDIUM */ .df,
    getBillingTimeFrame: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('per month'),
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL_MONTHLY */ .Qf].includes(plan),
    getProductId: () => 1053,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_MEDIUM_MONTHLY */ .se,
    getPathSlug: () => 'wooexpress-medium-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_MEDIUM */ .Ou]: {
    ...getPlanWooExpressMediumDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: WPComGetBillingTimeframe,
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_WOOEXPRESS_MEDIUM */ .df,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_MEDIUM_MONTHLY */ .se, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL */ .yZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL_MONTHLY */ .Qf].includes(plan),
    getProductId: () => 1055,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_MEDIUM */ .Ou,
    getPathSlug: () => 'wooexpress-medium-yearly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL_MONTHLY */ .Qf]: {
    ...getPlanWooExpressSmallDetails(),
    ...getMonthlyTimeframe(),
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_WOOEXPRESS_SMALL */ .$k,
    getBillingTimeFrame: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('per month'),
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$].includes(plan),
    getProductId: () => 1054,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL_MONTHLY */ .Qf,
    getPathSlug: () => 'wooexpress-small-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL */ .yZ]: {
    ...getPlanWooExpressSmallDetails(),
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_WOOEXPRESS_SMALL */ .$k,
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: WPComGetBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL_MONTHLY */ .Qf, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$].includes(plan),
    getProductId: () => 1056,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_SMALL */ .yZ,
    getPathSlug: () => 'wooexpress-small-yearly'
  },
  // Not a real plan. This is used to show the Plus offering in the Woo Express plans grid
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_PLUS */ .P]: {
    ...getPlanWooExpressPlusDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: () => '',
    getProductId: () => 0,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WOOEXPRESS_PLUS */ .P
  },
  // Not a real plan. This is used to show the Enterprise (VIP) offering in
  // the main plans grid as part of pdgrnI-1Qp-p2.
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ENTERPRISE_GRID_WPCOM */ .cE]: {
    ...get2023EnterprisGrideDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: () => '',
    getProductId: () => 0,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ENTERPRISE_GRID_WPCOM */ .cE,
    getPathSlug: () => 'enterprise'
  },
  // Not a real plan. This is used to show the Bluehost cloud offering
  // in the landing pages for now
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD */ .Pi]: {
    ...get2023EnterprisGrideDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    getBillingTimeFrame: () => '',
    getProductId: () => 0,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD */ .Pi
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD_MONTHLY */ .nb]: {
    ...get2023EnterprisGrideDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he,
    getBillingTimeFrame: () => '',
    getProductId: () => 0,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD_MONTHLY */ .nb
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD_2Y */ .Dj]: {
    ...get2023EnterprisGrideDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
    getBillingTimeFrame: () => '',
    getProductId: () => 0,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD_2Y */ .Dj
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD_3Y */ .Uv]: {
    ...get2023EnterprisGrideDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_TRIENNIALLY */ .V0,
    getBillingTimeFrame: () => '',
    getProductId: () => 0,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLUEHOST_CLOUD_3Y */ .Uv
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_3_YEARS */ .mR]: {
    ...getPlanEcommerceDetails(),
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_TRIENNIALLY */ .V0,
    getBillingTimeFrame: WPComGetTriennialBillingTimeframe,
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_2_YEARS */ .vD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER */ .PE, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BLOGGER_2_YEARS */ .FP, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_MONTHLY */ .Zc, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL */ .JZ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_2_YEARS */ .bQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PERSONAL_3_YEARS */ .EX, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_MONTHLY */ .Ol, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM */ .Gi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_2_YEARS */ .AD, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_PREMIUM_3_YEARS */ .nM, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_MONTHLY */ .ZL, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS */ .xY, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_2_YEARS */ .vt, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_BUSINESS_3_YEARS */ .CR, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_MONTHLY */ .r, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE */ .DH, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_2_YEARS */ .xi, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey].includes(plan),
    getProductId: () => 1051,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_3_YEARS */ .mR,
    getPathSlug: () => 'ecommerce-3-years'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo]: {
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
    group: _constants__WEBPACK_IMPORTED_MODULE_4__/* .GROUP_JETPACK */ .dOg,
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_FREE */ .O2,
    getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Free'),
    getProductId: () => 2002,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_FREE */ .MMo,
    getTagline: (siteFeatures = []) => {
      const hasSiteJetpackBackup = siteFeatures.some(feature => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY */ .vrw, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_DAILY_MONTHLY */ .HeJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME */ .lwq, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_REALTIME_MONTHLY */ .HIJ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T1_BI_YEARLY */ .akF, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T1_YEARLY */ .gOt, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T1_MONTHLY */ .J_n, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T2_YEARLY */ .dut, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_BACKUP_T2_MONTHLY */ .UjR].includes(feature));
      const hasSiteJetpackScan = siteFeatures.some(feature => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY */ .ix8, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SCAN_DAILY_MONTHLY */ .MVP].includes(feature));
      if (hasSiteJetpackBackup && hasSiteJetpackScan) {
        return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Upgrade your site to access additional features, including spam protection and priority support.');
      } else if (hasSiteJetpackBackup) {
        return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Upgrade your site to access additional features, including spam protection, security scanning, and priority support.');
      } else if (hasSiteJetpackScan) {
        return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Upgrade your site to access additional features, including spam protection, backups, and priority support.');
      }
      return i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Upgrade your site for additional features, including spam protection, backups, security scanning, and priority support.');
    },
    getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('The features most needed by WordPress sites' + ' — perfectly packaged and optimized for everyone.'),
    getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('for life'),
    getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STANDARD_SECURITY_TOOLS */ .QMR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_STATS */ .Lpb, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_TRAFFIC_TOOLS */ .pX_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MANAGE */ .DtW, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_ADVANCED_SEO */ .W5X, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SEO_PREVIEW_TOOLS */ .emy, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_WORDPRESS_THEMES */ .Bb_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_SITE_STATS */ .Lpb, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_STANDARD_SECURITY_TOOLS */ .QMR, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_TRAFFIC_TOOLS */ .pX_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_BLANK */ .SyJ]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PREMIUM */ .Ryn]: {
    ...getJetpackPremiumDetails(),
    ...getAnnualTimeframe(),
    getProductId: () => 2000,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PREMIUM */ .Ryn,
    getPathSlug: () => 'premium'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PREMIUM_MONTHLY */ .BfZ]: {
    ...getJetpackPremiumDetails(),
    ...getMonthlyTimeframe(),
    getProductId: () => 2003,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PREMIUM_MONTHLY */ .BfZ,
    getPathSlug: () => 'premium-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL */ .Y1g]: {
    ...getJetpackPersonalDetails(),
    ...getAnnualTimeframe(),
    getProductId: () => 2005,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL */ .Y1g,
    getPathSlug: () => 'jetpack-personal'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL_MONTHLY */ .EsA]: {
    ...getJetpackPersonalDetails(),
    ...getMonthlyTimeframe(),
    getProductId: () => 2006,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_PERSONAL_MONTHLY */ .EsA,
    getPathSlug: () => 'jetpack-personal-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_BUSINESS */ .kU]: {
    ...getJetpackBusinessDetails(),
    ...getAnnualTimeframe(),
    getProductId: () => 2001,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_BUSINESS */ .kU,
    getPathSlug: () => 'professional'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_BUSINESS_MONTHLY */ .YhD]: {
    ...getJetpackBusinessDetails(),
    ...getMonthlyTimeframe(),
    getProductId: () => 2004,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_BUSINESS_MONTHLY */ .YhD,
    getPathSlug: () => 'professional-monthly'
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY */ .I5k]: {
    ...getPlanJetpackSecurityDailyDetails(),
    ...getAnnualTimeframe(),
    getMonthlySlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY_MONTHLY */ .ufm,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY */ .I5k,
    getPathSlug: () => 'security-daily',
    getProductId: () => 2010
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY_MONTHLY */ .ufm]: {
    ...getPlanJetpackSecurityDailyDetails(),
    ...getMonthlyTimeframe(),
    getAnnualSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY */ .I5k,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_DAILY_MONTHLY */ .ufm,
    getPathSlug: () => 'security-daily-monthly',
    getProductId: () => 2011
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_REALTIME */ .sG7]: {
    ...getPlanJetpackSecurityRealtimeDetails(),
    ...getAnnualTimeframe(),
    getMonthlySlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_REALTIME_MONTHLY */ .UBB,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_REALTIME */ .sG7,
    getPathSlug: () => 'security-realtime',
    getProductId: () => 2012
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_REALTIME_MONTHLY */ .UBB]: {
    ...getPlanJetpackSecurityRealtimeDetails(),
    ...getMonthlyTimeframe(),
    getAnnualSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_REALTIME */ .sG7,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_REALTIME_MONTHLY */ .UBB,
    getPathSlug: () => 'security-realtime-monthly',
    getProductId: () => 2013
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE_BI_YEARLY */ ._4K]: {
    ...getPlanJetpackCompleteDetails(),
    ...getBiAnnualTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE_BI_YEARLY */ ._4K,
    getPathSlug: () => 'complete-bi-yearly',
    getProductId: () => 2035,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T2_YEARLY */ .KJ0, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN_BI_YEARLY */ .kZv, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM_BI_YEARLY */ .z73, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_VIDEOPRESS_BI_YEARLY */ .PE9, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BOOST_BI_YEARLY */ .WVY, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SOCIAL_ADVANCED_BI_YEARLY */ .XcS, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SEARCH_BI_YEARLY */ .JeG, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_STATS_BI_YEARLY */ .oIK, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_CRM */ .ynD, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_CREATOR_BI_YEARLY */ .Ldz],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1TB (1,000GB) of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1-year activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 1 year'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (60k API calls/mo)'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VideoPress: 1TB of ad-free video hosting'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Boost: Automatic CSS generation'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Site Search: Up to 100k records and 100k requests/mo.'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Social: Get unlimited shares and share as a post by attaching images or videos.'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('CRM: Entrepreneur with 30 extensions')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE */ .pz9]: {
    ...getPlanJetpackCompleteDetails(),
    ...getAnnualTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE */ .pz9,
    getPathSlug: () => 'complete',
    getProductId: () => 2014,
    getMonthlySlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE_MONTHLY */ .rD9,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T2_YEARLY */ .KJ0, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN */ .lBi, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM */ .AcP, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_VIDEOPRESS */ .QjD, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BOOST */ .F6C, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SOCIAL_ADVANCED */ .eIK, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SEARCH */ .AAK, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_STATS_YEARLY */ .sLv, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_CRM */ .ynD, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_CREATOR_YEARLY */ .flA],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1TB (1,000GB) of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1-year activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 1 year'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (60k API calls/mo)'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VideoPress: 1TB of ad-free video hosting'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Boost: Automatic CSS generation'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Site Search: Up to 100k records and 100k requests/mo.'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Social: Get unlimited shares and share as a post by attaching images or videos.'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('CRM: Entrepreneur with 30 extensions')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE_MONTHLY */ .rD9]: {
    ...getPlanJetpackCompleteDetails(),
    ...getMonthlyTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE_MONTHLY */ .rD9,
    getPathSlug: () => 'complete-monthly',
    getProductId: () => 2015,
    getAnnualSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_COMPLETE */ .pz9,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T2_MONTHLY */ .VK, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN_MONTHLY */ .Pni, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM_MONTHLY */ .mKR, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_VIDEOPRESS_MONTHLY */ .ydj, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BOOST_MONTHLY */ .Nd7, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY */ .ax4, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SEARCH_MONTHLY */ .uGP, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_STATS_MONTHLY */ .z4N, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_CRM_MONTHLY */ .ua0, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_CREATOR_MONTHLY */ .CwU],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1TB (1,000GB) of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1-year activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 1-year'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (60k API calls/mo)'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VideoPress: 1TB of ad-free video hosting'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Boost: Automatic CSS generation'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Site Search: Up to 100k records and 100k requests/mo.'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Social: Get unlimited shares and share as a post by attaching images or videos.'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('CRM: Entrepreneur with 30 extensions')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T1_BI_YEARLY */ .ncG]: {
    ...getPlanJetpackSecurityT1Details(),
    ...getBiAnnualTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T1_BI_YEARLY */ .ncG,
    getPathSlug: () => 'security-20gb-bi-yearly',
    getProductId: () => 2034,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T1_BI_YEARLY */ .$r5, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN_BI_YEARLY */ .kZv, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM_BI_YEARLY */ .z73],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('10GB of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('30-day activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 30 days'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (10k API calls/mo)')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T1_YEARLY */ .b2e]: {
    ...getPlanJetpackSecurityT1Details(),
    ...getAnnualTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T1_YEARLY */ .b2e,
    getPathSlug: () => 'security-20gb-yearly',
    getProductId: () => 2016,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T1_YEARLY */ .FID, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN */ .lBi, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM */ .AcP],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('10GB of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('30-day activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 30 days'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (10k API calls/mo)')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T1_MONTHLY */ .eJ8]: {
    ...getPlanJetpackSecurityT1Details(),
    ...getMonthlyTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T1_MONTHLY */ .eJ8,
    getPathSlug: () => 'security-20gb-monthly',
    getProductId: () => 2017,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T1_MONTHLY */ .CSg, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN_MONTHLY */ .Pni, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM_MONTHLY */ .mKR],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('10GB of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('30-day activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 30 days'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (10k API calls/mo)')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T2_YEARLY */ .asM]: {
    ...getPlanJetpackSecurityT2Details(),
    ...getAnnualTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T2_YEARLY */ .asM,
    getPathSlug: () => 'security-1tb-yearly',
    getProductId: () => 2019,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T2_YEARLY */ .KJ0, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN */ .lBi, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM */ .AcP],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('{{strong}}1TB (1,000GB){{/strong}} of cloud storage', {
      components: {
        strong: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null)
      }
    }), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('{{strong}}1-year{{/strong}} activity log archive', {
      components: {
        strong: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null)
      }
    }), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last {{strong}}1 year{{/strong}}', {
      components: {
        strong: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null)
      }
    }), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (10k API calls/mo)')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T2_MONTHLY */ .Xoz]: {
    ...getPlanJetpackSecurityT2Details(),
    ...getMonthlyTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_SECURITY_T2_MONTHLY */ .Xoz,
    getPathSlug: () => 'security-1tb-monthly',
    getProductId: () => 2020,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T2_MONTHLY */ .VK, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_SCAN_MONTHLY */ .Pni, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM_MONTHLY */ .mKR],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('{{strong}}1TB (1,000GB){{/strong}} of cloud storage', {
      components: {
        strong: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null)
      }
    }), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('{{strong}}1-year{{/strong}} activity log archive', {
      components: {
        strong: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null)
      }
    }), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last {{strong}}1 year{{/strong}}', {
      components: {
        strong: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null)
      }
    }), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Scan: Real-time malware scanning and one-click fixes'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (10k API calls/mo)')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_STARTER_YEARLY */ .cCi]: {
    ...getPlanJetpackStarterDetails(),
    ...getAnnualTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_STARTER_YEARLY */ .cCi,
    getPathSlug: () => 'starter-yearly',
    getProductId: () => 2030,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T0_YEARLY */ .Q$E, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM */ .AcP],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1GB of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('30-day activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 30 days'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (1k API calls/mo)')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_STARTER_MONTHLY */ .$bO]: {
    ...getPlanJetpackStarterDetails(),
    ...getMonthlyTimeframe(),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_STARTER_MONTHLY */ .$bO,
    getPathSlug: () => 'starter-monthly',
    getProductId: () => 2031,
    getProductsIncluded: () => [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_BACKUP_T0_MONTHLY */ .Hsb, _constants__WEBPACK_IMPORTED_MODULE_4__/* .PRODUCT_JETPACK_ANTI_SPAM_MONTHLY */ .mKR],
    getWhatIsIncluded: () => [(0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('VaultPress Backup: Real-time backups as you edit'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('1GB of cloud storage'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('30-day activity log archive'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Unlimited one-click restores from the last 30 days'), (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('Akismet: Comment and form spam protection (1k API calls/mo)')]
  },
  [_constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_GOLDEN_TOKEN */ .VlM]: {
    ...getPlanJetpackGoldenTokenDetails(),
    ...getAnnualTimeframe(),
    getMonthlySlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_GOLDEN_TOKEN */ .VlM,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_4__/* .PLAN_JETPACK_GOLDEN_TOKEN */ .VlM,
    getPathSlug: () => 'golden-token',
    getProductId: () => 2900
  },
  [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_P2_PLUS */ .M4]: {
    ...getDotcomPlanDetails(),
    group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_P2 */ .Ft,
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_P2_PLUS */ .zf,
    getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('P2+'),
    getDescription: () => '',
    getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for professionals:{{/strong}} Enhance your P2 with more space for audio and video, advanced search, an activity overview panel, and priority customer support.', plansDescriptionHeadingComponent),
    getShortDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Some short description'),
    get2023PricingGridSignupWpcomFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_13GB_STORAGE */ .YgQ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_ADVANCED_SEARCH */ .MtP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_VIDEO_SHARING */ .FHf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_MORE_FILE_TYPES */ .fls, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_PRIORITY_CHAT_EMAIL_SUPPORT */ .Z1x, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_ACTIVITY_OVERVIEW */ .ow],
    getStorageFeature: () => _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_13GB_STORAGE */ .YgQ,
    getPlanCompareFeatures: () => [
    // pay attention to ordering, shared features should align on /plan page
    _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_13GB_STORAGE */ .YgQ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_ADVANCED_SEARCH */ .MtP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_VIDEO_SHARING */ .FHf, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_MORE_FILE_TYPES */ .fls, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_PRIORITY_CHAT_EMAIL_SUPPORT */ .Z1x, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_ACTIVITY_OVERVIEW */ .ow],
    // TODO: update this once we put P2+ in the signup.
    getSignupFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FAST_SUPPORT_FROM_EXPERTS */ .JZF],
    // TODO: no idea about this, copied from the WP.com Premium plan.
    // Features not displayed but used for checking plan abilities
    getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_AUDIO_UPLOADS */ .R_9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SEARCH_BI_YEARLY */ .siL, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SEARCH */ .xsQ, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_JETPACK_SEARCH_MONTHLY */ .Dw1],
    getInferiorFeatures: () => [],
    // TODO: Calypso requires this prop but we probably don't need it. Refactor Calypso?
    getAudience: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Best for bloggers'),
    ...getMonthlyTimeframe(),
    availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7].includes(plan),
    //TODO: only for P2 sites.
    getProductId: () => 1040,
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_P2_PLUS */ .M4,
    getPathSlug: () => 'p2-plus',
    getBillingTimeFrame: () => (0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .translate */ .Tl)('per user per month')
  }
};
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_P2_FREE */ .Ap] = {
  ...PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7],
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_P2 */ .Ft,
  getPlanTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('{{strong}}Best for small groups:{{/strong}} All the features needed to share, discuss, review, and collaborate with your team in one spot, without interruptions.', plansDescriptionHeadingComponent),
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('P2 Free'),
  get2023PricingGridSignupWpcomFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_3GB_STORAGE */ .Tjc, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_UNLIMITED_USERS */ .DA$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_UNLIMITED_POSTS_PAGES */ .ba_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_SIMPLE_SEARCH */ .q6q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_CUSTOMIZATION_OPTIONS */ .dZJ],
  getStorageFeature: () => _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_3GB_STORAGE */ .Tjc,
  getPlanCompareFeatures: () => [
  // pay attention to ordering, shared features should align on /plan page
  _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_3GB_STORAGE */ .Tjc, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_UNLIMITED_USERS */ .DA$, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_UNLIMITED_POSTS_PAGES */ .ba_, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_SIMPLE_SEARCH */ .q6q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_P2_CUSTOMIZATION_OPTIONS */ .dZJ]
};

// Brand new WPCOM plans
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC] = {
  ...getDotcomPlanDetails(),
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_STARTER */ .P3,
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('WordPress Starter'),
  getProductId: () => 1033,
  getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC,
  getPathSlug: () => 'starter',
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.hasTranslation('Start with a custom domain name, simple payments, and extra storage.') || ['en', 'en-gb'].includes((0,i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* .getLocaleSlug */ .yb)() || '') ? i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Start with a custom domain name, simple payments, and extra storage.') : i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Start your WordPress.com website. Limited functionality and storage.'),
  getSubTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Essential features. Freedom to grow.'),
  getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('per month, billed yearly'),
  getPlanCompareFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_TRAFFIC */ .l5Q, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_MANAGED_HOSTING */ .CR9, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_FREE_THEMES */ .vCo, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_CUSTOM_DOMAIN */ .kgl, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_UNLIMITED_ADMINS */ .uVr, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_6GB_STORAGE */ .TEv, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_GOOGLE_ANALYTICS */ .AOP, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_PAYMENT_BLOCKS */ .DyV, _constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_TITAN_EMAIL */ .ZxR],
  getIncludedFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .WPCOM_FEATURES_INSTALL_PURCHASED_PLUGINS */ .Qqh]
};
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_FLEXIBLE */ .LP] = {
  // Inherits the free plan
  ...PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7],
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_FLEXIBLE */ .nT,
  getTitle: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('WordPress Free'),
  getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('upgrade when you need'),
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Start your free WordPress.com website. Limited functionality and storage.'),
  getPlanCompareFeatures: () => [_constants__WEBPACK_IMPORTED_MODULE_5__/* .FEATURE_1GB_STORAGE */ .sgf]
};
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk] = {
  ...getPlanProDetails(),
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_ANNUALLY */ .Lf,
  getProductId: () => 1032,
  getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk,
  getPathSlug: () => 'pro',
  getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('per month, billed yearly')
};
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY] = {
  ...getPlanProDetails(),
  ...getMonthlyTimeframe(),
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7].includes(plan),
  getProductId: () => 1034,
  getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY,
  getPathSlug: () => 'pro-monthly'
};
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_2_YEARS */ .vD] = {
  ...getPlanProDetails(),
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_BIENNIALLY */ .$5,
  availableFor: plan => [_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_FREE */ .T7, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_STARTER */ .BC, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO */ .Bk, _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_MONTHLY */ .zY].includes(plan),
  getProductId: () => 1035,
  getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_WPCOM_PRO_2_YEARS */ .vD,
  getPathSlug: () => 'pro-2-years',
  getBillingTimeFrame: WPComGetBiennialBillingTimeframe
};
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$] = {
  ...getDotcomPlanDetails(),
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_ECOMMERCE */ .UQ,
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  getProductId: () => 1052,
  getPathSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$,
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he,
  getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('free trial'),
  getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_ECOMMERCE_TRIAL_MONTHLY */ .E$,
  getTitle: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanCommerceTrialTitle */ .p8,
  getDescription: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanCommerceTrialTitle */ .p8,
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Get a taste of the world’s most popular eCommerce software.')
};
if ((0,_automattic_calypso_config__WEBPACK_IMPORTED_MODULE_1__/* .isEnabled */ .Ol)('plans/migration-trial')) {
  PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ] = {
    ...getPlanBusinessDetails(),
    type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_BUSINESS */ .e8,
    group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
    getProductId: () => 1057,
    getPathSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ,
    term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he,
    getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('free trial'),
    getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_MIGRATION_TRIAL_MONTHLY */ .uQ,
    getTitle: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanBusinessTrialTitle */ .eg
  };
}
PLANS_LIST[_constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey] = {
  ...getPlanBusinessDetails(),
  getPlanTagline: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanBusinessTrialTagline */ .k7,
  type: _constants__WEBPACK_IMPORTED_MODULE_7__/* .TYPE_BUSINESS */ .e8,
  group: _constants__WEBPACK_IMPORTED_MODULE_6__/* .GROUP_WPCOM */ .hz,
  getProductId: () => 1058,
  getPathSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey,
  term: _constants__WEBPACK_IMPORTED_MODULE_3__/* .TERM_MONTHLY */ .he,
  getBillingTimeFrame: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Try it for 3 days'),
  getStoreSlug: () => _constants__WEBPACK_IMPORTED_MODULE_6__/* .PLAN_HOSTING_TRIAL_MONTHLY */ .Ey,
  getTitle: _plans__WEBPACK_IMPORTED_MODULE_8__/* .getPlanBusinessTrialTitle */ .eg,
  getDescription: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Hosting free trial'),
  getTagline: () => i18n_calypso__WEBPACK_IMPORTED_MODULE_2__/* ["default"].translate */ .Ay.translate('Get a taste of unlimited performance and unbeatable uptime')
};

/***/ }),

/***/ 8242:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $h: () => (/* binding */ getPlanPremiumTitle),
/* harmony export */   Sr: () => (/* binding */ getPlanPersonalTitle),
/* harmony export */   eg: () => (/* binding */ getPlanBusinessTrialTitle),
/* harmony export */   gL: () => (/* binding */ getPlanBusinessTitle),
/* harmony export */   iP: () => (/* binding */ getPlanEcommerceTitle),
/* harmony export */   k7: () => (/* binding */ getPlanBusinessTrialTagline),
/* harmony export */   p8: () => (/* binding */ getPlanCommerceTrialTitle)
/* harmony export */ });
/* harmony import */ var i18n_calypso__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5744);


/**
 * Extracted functions to avoid Calypso apps from depending on the PLANS_LIST object.
 * See: p7H4VZ-4S4-p2
 */

const getPlanPersonalTitle = () =>
// translators: Personal is a plan name
i18n_calypso__WEBPACK_IMPORTED_MODULE_0__/* ["default"].translate */ .Ay.translate('Personal');
const getPlanPremiumTitle = () =>
// translators: Premium is a plan name
i18n_calypso__WEBPACK_IMPORTED_MODULE_0__/* ["default"].translate */ .Ay.translate('Premium');
const getPlanBusinessTitle = () =>
// translators: Business is a plan name
i18n_calypso__WEBPACK_IMPORTED_MODULE_0__/* ["default"].translate */ .Ay.translate('Business');
const getPlanEcommerceTitle = () =>
// translators: Commerce is a plan name
i18n_calypso__WEBPACK_IMPORTED_MODULE_0__/* ["default"].translate */ .Ay.translate('Commerce');
const getPlanBusinessTrialTitle = () =>
// translators: Business Trial is a plan name
i18n_calypso__WEBPACK_IMPORTED_MODULE_0__/* ["default"].translate */ .Ay.translate('Business Trial');
const getPlanBusinessTrialTagline = () =>
// translators: Business is a plan name
i18n_calypso__WEBPACK_IMPORTED_MODULE_0__/* ["default"].translate */ .Ay.translate('Try all the features of our Business plan.');
const getPlanCommerceTrialTitle = () =>
// translators: Commerce Trial is a plan name
i18n_calypso__WEBPACK_IMPORTED_MODULE_0__/* ["default"].translate */ .Ay.translate('Commerce Trial');

/***/ }),

/***/ 5813:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns configuration value for given key
 *
 * If the requested key isn't defined in the configuration
 * data then this will report the failure with either an
 * error or a console warning.
 *
 * When in the 'development' NODE_ENV it will raise an error
 * to crash execution early. However, because many modules
 * call this function in the module-global scope a failure
 * here can not only crash that module but also entire
 * application flows as well as trigger unexpected and
 * unwanted behaviors. Therefore if the NODE_ENV is not
 * 'development' we will return `undefined` and log a message
 * to the console instead of halting the execution thread.
 *
 * The config files are loaded in sequence: _shared.json, {env}.json, {env}.local.json
 * @see server/config/parser.js
 * @param data Configurat data.
 * @throws {ReferenceError} when key not defined in the config (NODE_ENV=development only)
 * @returns A function that gets the value of property named by the key
 */
const config = data => key => {
  if (key in data) {
    return data[key];
  }
  if (false) {}

  // display console error only in a browser
  // (not in tests, for example)
  if (true) {
    // eslint-disable-next-line no-console
    console.error('%cCore Error: ' + `%cCould not find config value for key %c${key}%c. ` + 'Please make sure that if you need it then it has a default value assigned in ' + '%cconfig/_shared.json' + '%c.', 'color: red; font-size: 120%',
    // error prefix
    'color: black;',
    // message
    'color: blue;',
    // key name
    'color: black;',
    // message
    'color: blue;',
    // config file reference
    'color: black' // message
    );
  }
  return undefined;
};

/**
 * Checks whether a specific feature is enabled.
 * @param data the json environment configuration to use for getting config values
 * @returns A function that takes a feature name and returns true when the feature is enabled.
 */
const isEnabled = data => feature => {
  // Feature flags activated from environment variables.
  if (typeof process !== 'undefined' && process?.env?.ACTIVE_FEATURE_FLAGS && typeof process.env.ACTIVE_FEATURE_FLAGS === 'string') {
    const env_active_feature_flags = process.env.ACTIVE_FEATURE_FLAGS?.split(',');
    if (env_active_feature_flags.includes(feature)) {
      return true;
    }
  }
  return data.features && !!data.features[feature] || false;
};

/**
 * Gets a list of all enabled features.
 * @param data A set of config data (Not used by general users, is pre-filled via currying).
 * @returns List of enabled features (strings).
 */
const enabledFeatures = data => () => {
  if (!data.features) {
    return [];
  }
  return Object.entries(data.features).reduce((enabled, [feature, isEnabled]) => isEnabled ? [...enabled, feature] : enabled, []);
};

/**
 * Enables a specific feature.
 * @param data the json environment configuration to use for getting config values
 */
const enable = data => feature => {
  if (data.features) {
    data.features[feature] = true;
  }
};

/**
 * Disables a specific feature.
 * @param data the json environment configuration to use for getting config values
 */

const disable = data => feature => {
  if (data.features) {
    data.features[feature] = false;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data => {
  const configApi = config(data);
  configApi.isEnabled = isEnabled(data);
  configApi.enabledFeatures = enabledFeatures(data);
  configApi.enable = enable(data);
  configApi.disable = disable(data);
  return configApi;
});

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

/***/ 5744:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Tl: () => (/* binding */ translate),
/* harmony export */   yb: () => (/* binding */ getLocaleSlug)
/* harmony export */ });
/* unused harmony exports numberFormat, configure, setLocale, getLocale, getLocaleVariant, isRtl, addTranslations, reRenderTranslations, registerComponentUpdateHook, registerTranslateHook, state, stateObserver, on, off, emit */
/* harmony import */ var _default_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5118);







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);

// Export the default instance's properties and bound methods for convenience
// These should be deprecated eventually, exposing only the default `i18n` instance
const numberFormat = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.numberFormat.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const translate = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.translate.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const configure = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.configure.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const setLocale = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.setLocale.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const getLocale = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getLocale.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const getLocaleSlug = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getLocaleSlug.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const getLocaleVariant = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getLocaleVariant.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const isRtl = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.isRtl.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const addTranslations = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.addTranslations.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const reRenderTranslations = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.reRenderTranslations.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const registerComponentUpdateHook = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.registerComponentUpdateHook.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const registerTranslateHook = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.registerTranslateHook.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const state = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.state;
const stateObserver = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.stateObserver;
const on = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.on.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const off = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.off.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);
const emit = _default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.emit.bind(_default_i18n__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A);

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

/***/ 8998:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/image-f40c6b2b12b942b650ea.svg";

/***/ }),

/***/ 1609:
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ 6427:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ 7143:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ 8490:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ 6087:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ 7723:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ 2279:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ 3832:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ 8241:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ focusManager)
/* harmony export */ });
/* unused harmony export FocusManager */
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2127);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4181);
// src/focusManager.ts


var FocusManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__/* .Subscribable */ .Q {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isServer */ .S$ && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();

//# sourceMappingURL=focusManager.js.map

/***/ }),

/***/ 1642:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PL: () => (/* binding */ infiniteQueryBehavior)
/* harmony export */ });
/* unused harmony exports hasNextPage, hasPreviousPage */
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4181);
// src/infiniteQueryBehavior.ts

function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const fetchFn = async () => {
        const options = context.options;
        const direction = context.fetchOptions?.meta?.fetchMore?.direction;
        const oldPages = context.state.data?.pages || [];
        const oldPageParams = context.state.data?.pageParams || [];
        const empty = { pages: [], pageParams: [] };
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = context.options.queryFn || (() => Promise.reject(
          new Error(`Missing queryFn: '${context.options.queryHash}'`)
        ));
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const page = await queryFn(
            queryFnContext
          );
          const { maxPages } = context.options;
          const addTo = previous ? _utils_js__WEBPACK_IMPORTED_MODULE_0__/* .addToStart */ .ZZ : _utils_js__WEBPACK_IMPORTED_MODULE_0__/* .addToEnd */ .y9;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        let result;
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          result = await fetchPage(
            empty,
            oldPageParams[0] ?? options.initialPageParam
          );
          const remainingPages = pages ?? oldPages.length;
          for (let i = 1; i < remainingPages; i++) {
            const param = getNextPageParam(options, result);
            result = await fetchPage(result, param);
          }
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  );
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return options.getPreviousPageParam?.(
    pages[0],
    pages,
    pageParams[0],
    pageParams
  );
}
function hasNextPage(options, data) {
  if (!data)
    return false;
  return getNextPageParam(options, data) != null;
}
function hasPreviousPage(options, data) {
  if (!data || !options.getPreviousPageParam)
    return false;
  return getPreviousPageParam(options, data) != null;
}

//# sourceMappingURL=infiniteQueryBehavior.js.map

/***/ }),

/***/ 1:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ Mutation)
/* harmony export */ });
/* unused harmony export getDefaultState */
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8852);
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6181);
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1089);
// src/mutation.ts



var Mutation = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__/* .Removable */ .k {
  constructor(config) {
    super();
    this.mutationId = config.mutationId;
    this.#defaultOptions = config.defaultOptions;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  #observers;
  #defaultOptions;
  #mutationCache;
  #retryer;
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    const executeMutation = () => {
      this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_1__/* .createRetryer */ .II)({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject(new Error("No mutationFn found"));
          }
          return this.options.mutationFn(variables);
        },
        onFail: (failureCount, error) => {
          this.#dispatch({ type: "failed", failureCount, error });
        },
        onPause: () => {
          this.#dispatch({ type: "pause" });
        },
        onContinue: () => {
          this.#dispatch({ type: "continue" });
        },
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode
      });
      return this.#retryer.promise;
    };
    const restored = this.state.status === "pending";
    try {
      if (!restored) {
        this.#dispatch({ type: "pending", variables });
        await this.#mutationCache.config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables
          });
        }
      }
      const data = await executeMutation();
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        this.#dispatch({ type: "error", error });
      }
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !(0,_retryer_js__WEBPACK_IMPORTED_MODULE_1__/* .canFetch */ .v_)(this.options.networkMode),
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__/* .notifyManager */ .j.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

//# sourceMappingURL=mutation.js.map

/***/ }),

/***/ 9931:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ MutationCache)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8852);
/* harmony import */ var _mutation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4181);
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2127);
// src/mutationCache.ts




var MutationCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__/* .Subscribable */ .Q {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = [];
    this.#mutationId = 0;
  }
  #mutations;
  #mutationId;
  #resuming;
  build(client, options, state) {
    const mutation = new _mutation_js__WEBPACK_IMPORTED_MODULE_1__/* .Mutation */ .s({
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.#mutations.push(mutation);
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    this.#mutations = this.#mutations.filter((x) => x !== mutation);
    this.notify({ type: "removed", mutation });
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__/* .notifyManager */ .j.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return this.#mutations;
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.#mutations.find(
      (mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .matchMutation */ .nJ)(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.#mutations.filter(
      (mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .matchMutation */ .nJ)(filters, mutation)
    );
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__/* .notifyManager */ .j.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    this.#resuming = (this.#resuming ?? Promise.resolve()).then(() => {
      const pausedMutations = this.#mutations.filter((x) => x.state.isPaused);
      return _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__/* .notifyManager */ .j.batch(
        () => pausedMutations.reduce(
          (promise, mutation) => promise.then(() => mutation.continue().catch(_utils_js__WEBPACK_IMPORTED_MODULE_3__/* .noop */ .lQ)),
          Promise.resolve()
        )
      );
    }).then(() => {
      this.#resuming = void 0;
    });
    return this.#resuming;
  }
};

//# sourceMappingURL=mutationCache.js.map

/***/ }),

/***/ 8852:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ notifyManager)
/* harmony export */ });
/* unused harmony export createNotifyManager */
// src/notifyManager.ts
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = (cb) => setTimeout(cb, 0);
  const setScheduler = (fn) => {
    scheduleFn = fn;
  };
  const batch = (callback) => {
    let result;
    transactions++;
    try {
      result = callback();
    } finally {
      transactions--;
      if (!transactions) {
        flush();
      }
    }
    return result;
  };
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const batchCalls = (callback) => {
    return (...args) => {
      schedule(() => {
        callback(...args);
      });
    };
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  const setNotifyFunction = (fn) => {
    notifyFn = fn;
  };
  const setBatchNotifyFunction = (fn) => {
    batchNotifyFn = fn;
  };
  return {
    batch,
    batchCalls,
    schedule,
    setNotifyFunction,
    setBatchNotifyFunction,
    setScheduler
  };
}
var notifyManager = createNotifyManager();

//# sourceMappingURL=notifyManager.js.map

/***/ }),

/***/ 2262:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ onlineManager)
/* harmony export */ });
/* unused harmony export OnlineManager */
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2127);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4181);
// src/onlineManager.ts


var OnlineManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__/* .Subscribable */ .Q {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isServer */ .S$ && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();

//# sourceMappingURL=onlineManager.js.map

/***/ }),

/***/ 7092:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ Query)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4181);
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8852);
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1089);
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6181);
// src/query.ts




var Query = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__/* .Removable */ .k {
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.#setOptions(config.options);
    this.#observers = [];
    this.#cache = config.cache;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = config.state || getDefaultState(this.options);
    this.state = this.#initialState;
    this.scheduleGc();
  }
  #initialState;
  #revertState;
  #cache;
  #promise;
  #retryer;
  #observers;
  #defaultOptions;
  #abortSignalConsumed;
  get meta() {
    return this.options.meta;
  }
  #setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.#observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .replaceData */ .pl)(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.#dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = this.#promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .lQ).catch(_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .lQ) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.#initialState);
  }
  isActive() {
    return this.#observers.some(
      (observer) => observer.options.enabled !== false
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.#observers.some((observer) => observer.getCurrentResult().isStale);
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .timeUntilStale */ .j3)(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.#observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.#observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.#observers.includes(observer)) {
      this.#observers = this.#observers.filter((x) => x !== observer);
      if (!this.#observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.#observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#promise) {
        this.#retryer?.continueRetry();
        return this.#promise;
      }
    }
    if (options) {
      this.#setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.#observers.find((x) => x.options.queryFn);
      if (observer) {
        this.#setOptions(observer.options);
      }
    }
    if (false) {}
    const abortController = new AbortController();
    const queryFnContext = {
      queryKey: this.queryKey,
      meta: this.meta
    };
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    addSignalProperty(queryFnContext);
    const fetchFn = () => {
      if (!this.options.queryFn) {
        return Promise.reject(
          new Error(`Missing queryFn: '${this.options.queryHash}'`)
        );
      }
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(
          this.options.queryFn,
          queryFnContext,
          this
        );
      }
      return this.options.queryFn(
        queryFnContext
      );
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    this.options.behavior?.onFetch(
      context,
      this
    );
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__/* .isCancelledError */ .wm)(error) && error.silent)) {
        this.#dispatch({
          type: "error",
          error
        });
      }
      if (!(0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__/* .isCancelledError */ .wm)(error)) {
        this.#cache.config.onError?.(
          error,
          this
        );
        this.#cache.config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      if (!this.isFetchingOptimistic) {
        this.scheduleGc();
      }
      this.isFetchingOptimistic = false;
    };
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__/* .createRetryer */ .II)({
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (typeof data === "undefined") {
          if (false) {}
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        this.setData(data);
        this.#cache.config.onSuccess?.(data, this);
        this.#cache.config.onSettled?.(
          data,
          this.state.error,
          this
        );
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode
    });
    this.#promise = this.#retryer.promise;
    return this.#promise;
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: action.meta ?? null,
            fetchStatus: (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__/* .canFetch */ .v_)(this.options.networkMode) ? "fetching" : "paused",
            ...!state.dataUpdatedAt && {
              error: null,
              status: "pending"
            }
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if ((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__/* .isCancelledError */ .wm)(error) && error.revert && this.#revertState) {
            return { ...this.#revertState, fetchStatus: "idle" };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__/* .notifyManager */ .j.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = typeof data !== "undefined";
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

//# sourceMappingURL=query.js.map

/***/ }),

/***/ 6832:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4181);
/* harmony import */ var _query_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7092);
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8852);
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2127);
// src/queryCache.ts




var QueryCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__/* .Subscribable */ .Q {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .hashQueryKeyByOptions */ .F$)(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new _query_js__WEBPACK_IMPORTED_MODULE_2__/* .Query */ .X({
        cache: this,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__/* .notifyManager */ .j.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .matchQuery */ .MK)(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .matchQuery */ .MK)(filters, query)) : queries;
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__/* .notifyManager */ .j.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__/* .notifyManager */ .j.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__/* .notifyManager */ .j.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

//# sourceMappingURL=queryCache.js.map

/***/ }),

/***/ 1799:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ QueryClient)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4181);
/* harmony import */ var _queryCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6832);
/* harmony import */ var _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9931);
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8241);
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2262);
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8852);
/* harmony import */ var _infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1642);
// src/queryClient.ts







var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new _queryCache_js__WEBPACK_IMPORTED_MODULE_0__/* .QueryCache */ .$();
    this.#mutationCache = config.mutationCache || new _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__/* .MutationCache */ .q();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1)
      return;
    this.#unsubscribeFocus = _focusManager_js__WEBPACK_IMPORTED_MODULE_2__/* .focusManager */ .m.subscribe(() => {
      if (_focusManager_js__WEBPACK_IMPORTED_MODULE_2__/* .focusManager */ .m.isFocused()) {
        this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__/* .onlineManager */ .t.subscribe(() => {
      if (_onlineManager_js__WEBPACK_IMPORTED_MODULE_3__/* .onlineManager */ .t.isOnline()) {
        this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0)
      return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  getQueryData(queryKey) {
    return this.#queryCache.find({ queryKey })?.state.data;
  }
  ensureQueryData(options) {
    const cachedData = this.getQueryData(options.queryKey);
    return cachedData !== void 0 ? Promise.resolve(cachedData) : this.fetchQuery(options);
  }
  getQueriesData(filters) {
    return this.getQueryCache().findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const query = this.#queryCache.find({ queryKey });
    const prevData = query?.state.data;
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .functionalUpdate */ .Zw)(updater, prevData);
    if (typeof data === "undefined") {
      return void 0;
    }
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__/* .notifyManager */ .j.batch(
      () => this.getQueryCache().findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    return this.#queryCache.find({ queryKey })?.state;
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__/* .notifyManager */ .j.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__/* .notifyManager */ .j.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(filters = {}, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__/* .notifyManager */ .j.batch(
      () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ);
  }
  invalidateQueries(filters = {}, options = {}) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__/* .notifyManager */ .j.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: filters.refetchType ?? filters.type ?? "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(filters = {}, options) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options?.cancelRefetch ?? true
    };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__/* .notifyManager */ .j.batch(
      () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ);
  }
  fetchInfiniteQuery(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__/* .infiniteQueryBehavior */ .PL)(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .noop */ .lQ);
  }
  resumePausedMutations() {
    return this.#mutationCache.resumePausedMutations();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .hashKey */ .EN)(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    let result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .partialMatchKey */ .Cp)(queryKey, queryDefault.queryKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .hashKey */ .EN)(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    let result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .partialMatchKey */ .Cp)(mutationKey, queryDefault.mutationKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...options?.queryKey && this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__/* .hashQueryKeyByOptions */ .F$)(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (typeof defaultedOptions.refetchOnReconnect === "undefined") {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (typeof defaultedOptions.throwOnError === "undefined") {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (typeof defaultedOptions.networkMode === "undefined" && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};

//# sourceMappingURL=queryClient.js.map

/***/ }),

/***/ 6181:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ Removable)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4181);
// src/removable.ts

var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .isValidTimeout */ .gn)(this.gcTime)) {
      this.#gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .isServer */ .S$ ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (this.#gcTimeout) {
      clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};

//# sourceMappingURL=removable.js.map

/***/ }),

/***/ 1089:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   II: () => (/* binding */ createRetryer),
/* harmony export */   v_: () => (/* binding */ canFetch),
/* harmony export */   wm: () => (/* binding */ isCancelledError)
/* harmony export */ });
/* unused harmony export CancelledError */
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8241);
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2262);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4181);
// src/retryer.ts



function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__/* .onlineManager */ .t.isOnline() : true;
}
var CancelledError = class {
  constructor(options) {
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const shouldPause = () => !_focusManager_js__WEBPACK_IMPORTED_MODULE_1__/* .focusManager */ .m.isFocused() || config.networkMode !== "always" && !_onlineManager_js__WEBPACK_IMPORTED_MODULE_0__/* .onlineManager */ .t.isOnline();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        const canContinue = isResolved || !shouldPause();
        if (canContinue) {
          continueResolve(value);
        }
        return canContinue;
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .isServer */ .S$ ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .sleep */ .yy)(delay).then(() => {
        if (shouldPause()) {
          return pause();
        }
        return;
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  if (canFetch(config.networkMode)) {
    run();
  } else {
    pause().then(run);
  }
  return {
    promise,
    cancel,
    continue: () => {
      const didContinue = continueFn?.();
      return didContinue ? promise : Promise.resolve();
    },
    cancelRetry,
    continueRetry
  };
}

//# sourceMappingURL=retryer.js.map

/***/ }),

/***/ 2127:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ Subscribable)
/* harmony export */ });
// src/subscribable.ts
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

//# sourceMappingURL=subscribable.js.map

/***/ }),

/***/ 4181:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cp: () => (/* binding */ partialMatchKey),
/* harmony export */   EN: () => (/* binding */ hashKey),
/* harmony export */   F$: () => (/* binding */ hashQueryKeyByOptions),
/* harmony export */   MK: () => (/* binding */ matchQuery),
/* harmony export */   S$: () => (/* binding */ isServer),
/* harmony export */   ZZ: () => (/* binding */ addToStart),
/* harmony export */   Zw: () => (/* binding */ functionalUpdate),
/* harmony export */   gn: () => (/* binding */ isValidTimeout),
/* harmony export */   j3: () => (/* binding */ timeUntilStale),
/* harmony export */   lQ: () => (/* binding */ noop),
/* harmony export */   nJ: () => (/* binding */ matchMutation),
/* harmony export */   pl: () => (/* binding */ replaceData),
/* harmony export */   y9: () => (/* binding */ addToEnd),
/* harmony export */   yy: () => (/* binding */ sleep)
/* harmony export */ });
/* unused harmony exports isPlainArray, isPlainObject, keepPreviousData, replaceEqualDeep, shallowEqualObjects */
// src/utils.ts
var isServer =  false || "Deno" in window;
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetchStatus !== "undefined" && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function keepPreviousData(previousData) {
  return previousData;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3402:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ht: () => (/* binding */ QueryClientProvider)
/* harmony export */ });
/* unused harmony exports QueryClientContext, useQueryClient */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
"use client";

// src/QueryClientProvider.tsx

var QueryClientContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = React.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(QueryClientContext.Provider, { value: client }, children);
};

//# sourceMappingURL=QueryClientProvider.js.map

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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _public_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4014);
/* harmony import */ var _public_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3402);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1799);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8490);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2279);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2084);
/* harmony import */ var _notices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(220);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1772);

/*** THIS MUST BE THE FIRST THING EVALUATED IN THIS SCRIPT *****/







const showGlobalStylesComponents = () => {
  (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)('wpcom-global-styles', {
    render: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__/* .QueryClientProvider */ .Ht, {
      client: new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__/* .QueryClient */ .E()
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_modal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_notices__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, null))
  });
};
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
  showGlobalStylesComponents();
});
})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
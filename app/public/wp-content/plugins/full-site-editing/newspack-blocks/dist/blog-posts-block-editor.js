/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ALL),
/* harmony export */   B: () => (/* binding */ logError),
/* harmony export */   C: () => (/* binding */ CALL),
/* harmony export */   D: () => (/* binding */ wrapSagaDispatch),
/* harmony export */   E: () => (/* binding */ identity),
/* harmony export */   F: () => (/* binding */ FORK),
/* harmony export */   G: () => (/* binding */ GET_CONTEXT),
/* harmony export */   J: () => (/* binding */ JOIN),
/* harmony export */   K: () => (/* binding */ take),
/* harmony export */   L: () => (/* binding */ fork),
/* harmony export */   M: () => (/* binding */ cancel),
/* harmony export */   N: () => (/* binding */ call),
/* harmony export */   O: () => (/* binding */ delay),
/* harmony export */   P: () => (/* binding */ PUT),
/* harmony export */   R: () => (/* binding */ RACE),
/* harmony export */   S: () => (/* binding */ SELECT),
/* harmony export */   T: () => (/* binding */ TAKE),
/* harmony export */   Y: () => (/* binding */ put),
/* harmony export */   a: () => (/* binding */ CPS),
/* harmony export */   b: () => (/* binding */ CANCEL),
/* harmony export */   d: () => (/* binding */ ACTION_CHANNEL),
/* harmony export */   e: () => (/* binding */ expanding),
/* harmony export */   f: () => (/* binding */ CANCELLED),
/* harmony export */   g: () => (/* binding */ FLUSH),
/* harmony export */   h: () => (/* binding */ SET_CONTEXT),
/* harmony export */   i: () => (/* binding */ internalErr),
/* harmony export */   j: () => (/* binding */ getMetaInfo),
/* harmony export */   k: () => (/* binding */ kTrue),
/* harmony export */   l: () => (/* binding */ createAllStyleChildCallbacks),
/* harmony export */   m: () => (/* binding */ createEmptyArray),
/* harmony export */   o: () => (/* binding */ once),
/* harmony export */   p: () => (/* binding */ assignWithSymbols),
/* harmony export */   q: () => (/* binding */ makeIterator),
/* harmony export */   r: () => (/* binding */ remove),
/* harmony export */   s: () => (/* binding */ shouldComplete),
/* harmony export */   t: () => (/* binding */ noop),
/* harmony export */   u: () => (/* binding */ flatMap),
/* harmony export */   v: () => (/* binding */ getLocation),
/* harmony export */   y: () => (/* binding */ shouldCancel),
/* harmony export */   z: () => (/* binding */ shouldTerminate)
/* harmony export */ });
/* unused harmony exports $, H, I, Q, U, V, W, X, Z, _, a0, a1, a2, a3, a4, a5, a6, a7, c, n, w, x */
/* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3068);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9575);
/* harmony import */ var _redux_saga_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4860);
/* harmony import */ var _redux_saga_delay_p__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1344);





var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue =
/*#__PURE__*/
konst(true);

var noop = function noop() {};

if (false) {}
var identity = function identity(v) {
  return v;
};
var hasSymbol = typeof Symbol === 'function';
var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var assignWithSymbols = function assignWithSymbols(target, source) {
  (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(function (s) {
      target[s] = source[s];
    });
  }
};
var flatMap = function flatMap(mapper, arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, arr.map(mapper));
};
function remove(array, item) {
  var index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
function once(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    fn();
  };
}

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}
function logError(error, _ref2) {
  var sagaStack = _ref2.sagaStack;

  /*eslint-disable no-console*/
  console.error(error);
  console.error(sagaStack);
}
var internalErr = function internalErr(err) {
  return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
};
var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
};
var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array

var createEmptyArray = function createEmptyArray(n) {
  return Array.apply(null, new Array(n));
};
var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    if (false) {}

    return dispatch(Object.defineProperty(action, _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .SAGA_ACTION */ .q8, {
      value: true
    }));
  };
};
var shouldTerminate = function shouldTerminate(res) {
  return res === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TERMINATE */ .a6;
};
var shouldCancel = function shouldCancel(res) {
  return res === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TASK_CANCEL */ .nm;
};
var shouldComplete = function shouldComplete(res) {
  return shouldTerminate(res) || shouldCancel(res);
};
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys = Object.keys(shape);
  var totalCount = keys.length;

  if (false) {}

  var completedCount = 0;
  var completed;
  var results = (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YO)(shape) ? createEmptyArray(totalCount) : {};
  var childCallbacks = {};

  function checkEnd() {
    if (completedCount === totalCount) {
      completed = true;
      parentCallback(results);
    }
  }

  keys.forEach(function (key) {
    var chCbAtKey = function chCbAtKey(res, isErr) {
      if (completed) {
        return;
      }

      if (isErr || shouldComplete(res)) {
        parentCallback.cancel();
        parentCallback(res, isErr);
      } else {
        results[key] = res;
        completedCount++;
        checkEnd();
      }
    };

    chCbAtKey.cancel = noop;
    childCallbacks[key] = chCbAtKey;
  });

  parentCallback.cancel = function () {
    if (!completed) {
      completed = true;
      keys.forEach(function (key) {
        return childCallbacks[key].cancel();
      });
    }
  };

  return childCallbacks;
}
function getMetaInfo(fn) {
  return {
    name: fn.name || 'anonymous',
    location: getLocation(fn)
  };
}
function getLocation(instrumented) {
  return instrumented[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .SAGA_LOCATION */ .x2];
}

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;

          default: // DROP

        }
      }
    },
    take: take,
    flush: flush
  };
}

var none = function none() {
  return zeroBuffer;
};
var fixed = function fixed(limit) {
  return ringBuffer(limit, ON_OVERFLOW_THROW);
};
var dropping = function dropping(limit) {
  return ringBuffer(limit, ON_OVERFLOW_DROP);
};
var sliding = function sliding(limit) {
  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
};
var expanding = function expanding(initialSize) {
  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
};

var buffers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  none: none,
  fixed: fixed,
  dropping: dropping,
  sliding: sliding,
  expanding: expanding
});

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var effectTypes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: CANCEL,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

var TEST_HINT = '\n(HINT: if you are getting these errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__.IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};

var isForkEffect = function isForkEffect(eff) {
  return effect(eff) && eff.type === FORK;
};

var detach = function detach(eff) {
  if (false) {}

  return makeEffect(FORK, _extends({}, eff.payload, {
    detached: true
  }));
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (false) {}

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .pattern */ .T1)(patternOrChannel)) {
    if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .notUndef */ .uQ)(multicastPattern)) {
      /* eslint-disable no-console */
      console.warn("take(pattern) takes one argument but two were provided. Consider passing an array for listening to several action types");
    }

    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .multicast */ .fD)(patternOrChannel) && (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .notUndef */ .uQ)(multicastPattern) && (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .pattern */ .T1)(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .channel */ .Ix)(patternOrChannel)) {
    if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .notUndef */ .uQ)(multicastPattern)) {
      /* eslint-disable no-console */
      console.warn("take(channel) takes one argument but two were provided. Second argument is ignored.");
    }

    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  if (false) {}
}
var takeMaybe = function takeMaybe() {
  var eff = take.apply(void 0, arguments);
  eff.payload.maybe = true;
  return eff;
};
function put(channel$1, action) {
  if (false) {}

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .undef */ .vD)(action)) {
    action = channel$1; // `undefined` instead of `null` to make default parameter work

    channel$1 = undefined;
  }

  return makeEffect(PUT, {
    channel: channel$1,
    action: action
  });
}
var putResolve = function putResolve() {
  var eff = put.apply(void 0, arguments);
  eff.payload.resolve = true;
  return eff;
};
function all(effects) {
  var eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}
function race(effects) {
  var eff = makeEffect(RACE, effects);
  eff.combinator = true;
  return eff;
} // this match getFnCallDescriptor logic

var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    check(fnDescriptor, func, effectName + ": argument fn is not function");
    return;
  }

  if (context && string(fn)) {
    check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .func */ .Pc)(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YO)(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Yj)(fn) && (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .func */ .Pc)(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

var isNotDelayEffect = function isNotDelayEffect(fn) {
  return fn !== delay;
};

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (false) { var arg0; }

  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function apply(context, fn, args) {
  if (args === void 0) {
    args = [];
  }

  var fnDescriptor = [context, fn];

  if (false) {}

  return makeEffect(CALL, getFnCallDescriptor([context, fn], args));
}
function cps(fnDescriptor) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
function spawn(fnDescriptor) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return detach(fork.apply(void 0, [fnDescriptor].concat(args)));
}
function join(taskOrTasks) {
  if (false) {}

  return makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .SELF_CANCELLATION */ .Pe;
  }

  if (false) {}

  return makeEffect(CANCEL, taskOrTasks);
}
function select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (false) {}

  return makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
/**
  channel(pattern, [buffer])    => creates a proxy channel for store actions
**/

function actionChannel(pattern$1, buffer$1) {
  if (false) {}

  return makeEffect(ACTION_CHANNEL, {
    pattern: pattern$1,
    buffer: buffer$1
  });
}
function cancelled() {
  return makeEffect(CANCELLED, {});
}
function flush(channel$1) {
  if (false) {}

  return makeEffect(FLUSH, channel$1);
}
function getContext(prop) {
  if (false) {}

  return makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  if (false) {}

  return makeEffect(SET_CONTEXT, props);
}
var delay =
/*#__PURE__*/
call.bind(null, _redux_saga_delay_p__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A);




/***/ }),

/***/ 506:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports END, channel, eventChannel, isEnd, multicastChannel, runSaga, stdChannel */
/* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3068);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9575);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7502);
/* harmony import */ var _redux_saga_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4860);
/* harmony import */ var _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(619);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2419);
/* harmony import */ var _redux_saga_deferred__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(370);











var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/

var semaphore = 0;
/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/

function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}
/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/


function asap(task) {
  queue.push(task);

  if (!semaphore) {
    suspend();
    flush();
  }
}
/**
 * Puts the scheduler in a `suspended` state and executes a task immediately.
 */

function immediately(task) {
  try {
    suspend();
    return task();
  } finally {
    flush();
  }
}
/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/

function suspend() {
  semaphore++;
}
/**
  Puts the scheduler in a `released` state.
**/


function release() {
  semaphore--;
}
/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/


function flush() {
  release();
  var task;

  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task);
  }
}

var array = function array(patterns) {
  return function (input) {
    return patterns.some(function (p) {
      return matcher(p)(input);
    });
  };
};
var predicate = function predicate(_predicate) {
  return function (input) {
    return _predicate(input);
  };
};
var string = function string(pattern) {
  return function (input) {
    return input.type === String(pattern);
  };
};
var symbol = function symbol(pattern) {
  return function (input) {
    return input.type === pattern;
  };
};
var wildcard = function wildcard() {
  return _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.k;
};
function matcher(pattern) {
  // prettier-ignore
  var matcherCreator = pattern === '*' ? wildcard : (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Yj)(pattern) ? string : (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YO)(pattern) ? array : (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .stringableFunc */ .mr)(pattern) ? string : (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .func */ .Pc)(pattern) ? predicate : (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .symbol */ .HR)(pattern) ? symbol : null;

  if (matcherCreator === null) {
    throw new Error("invalid pattern: " + pattern);
  }

  return matcherCreator(pattern);
}

var END = {
  type: _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .CHANNEL_END_TYPE */ .x7
};
var isEnd = function isEnd(a) {
  return a && a.type === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .CHANNEL_END_TYPE */ .x7;
};
var CLOSED_CHANNEL_WITH_TAKERS = 'Cannot have a closed channel with pending takers';
var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
function channel(buffer$1) {
  if (buffer$1 === void 0) {
    buffer$1 = (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.e)();
  }

  var closed = false;
  var takers = [];

  if (false) {}

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.i)(CLOSED_CHANNEL_WITH_TAKERS);
    }

    if (takers.length && !buffer$1.isEmpty()) {
      throw (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.i)('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    if (false) {}

    if (closed) {
      return;
    }

    if (takers.length === 0) {
      return buffer$1.put(input);
    }

    var cb = takers.shift();
    cb(input);
  }

  function take(cb) {
    if (false) {}

    if (closed && buffer$1.isEmpty()) {
      cb(END);
    } else if (!buffer$1.isEmpty()) {
      cb(buffer$1.take());
    } else {
      takers.push(cb);

      cb.cancel = function () {
        (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.r)(takers, cb);
      };
    }
  }

  function flush(cb) {
    if (false) {}

    if (closed && buffer$1.isEmpty()) {
      cb(END);
      return;
    }

    cb(buffer$1.flush());
  }

  function close() {
    if (false) {}

    if (closed) {
      return;
    }

    closed = true;
    var arr = takers;
    takers = [];

    for (var i = 0, len = arr.length; i < len; i++) {
      var taker = arr[i];
      taker(END);
    }
  }

  return {
    take: take,
    put: put,
    flush: flush,
    close: close
  };
}
function eventChannel(subscribe, buffer) {
  if (buffer === void 0) {
    buffer = none();
  }

  var closed = false;
  var unsubscribe;
  var chan = channel(buffer);

  var close = function close() {
    if (closed) {
      return;
    }

    closed = true;

    if (func(unsubscribe)) {
      unsubscribe();
    }

    chan.close();
  };

  unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      close();
      return;
    }

    chan.put(input);
  });

  if (false) {}

  unsubscribe = once(unsubscribe);

  if (closed) {
    unsubscribe();
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: close
  };
}
function multicastChannel() {
  var _ref;

  var closed = false;
  var currentTakers = [];
  var nextTakers = currentTakers;

  function checkForbiddenStates() {
    if (closed && nextTakers.length) {
      throw (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.i)(CLOSED_CHANNEL_WITH_TAKERS);
    }
  }

  var ensureCanMutateNextTakers = function ensureCanMutateNextTakers() {
    if (nextTakers !== currentTakers) {
      return;
    }

    nextTakers = currentTakers.slice();
  };

  var close = function close() {
    if (false) {}

    closed = true;
    var takers = currentTakers = nextTakers;
    nextTakers = [];
    takers.forEach(function (taker) {
      taker(END);
    });
  };

  return _ref = {}, _ref[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .MULTICAST */ .Xl] = true, _ref.put = function put(input) {
    if (false) {}

    if (closed) {
      return;
    }

    if (isEnd(input)) {
      close();
      return;
    }

    var takers = currentTakers = nextTakers;

    for (var i = 0, len = takers.length; i < len; i++) {
      var taker = takers[i];

      if (taker[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .MATCH */ .E_](input)) {
        taker.cancel();
        taker(input);
      }
    }
  }, _ref.take = function take(cb, matcher) {
    if (matcher === void 0) {
      matcher = wildcard;
    }

    if (false) {}

    if (closed) {
      cb(END);
      return;
    }

    cb[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .MATCH */ .E_] = matcher;
    ensureCanMutateNextTakers();
    nextTakers.push(cb);
    cb.cancel = (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.o)(function () {
      ensureCanMutateNextTakers();
      (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.r)(nextTakers, cb);
    });
  }, _ref.close = close, _ref;
}
function stdChannel() {
  var chan = multicastChannel();
  var put = chan.put;

  chan.put = function (input) {
    if (input[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .SAGA_ACTION */ .q8]) {
      put(input);
      return;
    }

    asap(function () {
      put(input);
    });
  };

  return chan;
}

var RUNNING = 0;
var CANCELLED = 1;
var ABORTED = 2;
var DONE = 3;

function resolvePromise(promise, cb) {
  var cancelPromise = promise[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .CANCEL */ .bO];

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .func */ .Pc)(cancelPromise)) {
    cb.cancel = cancelPromise;
  }

  promise.then(cb, function (error) {
    cb(error, true);
  });
}

var current = 0;
var nextSagaId = (function () {
  return ++current;
});

var _effectRunnerMap;

function getIteratorMetaInfo(iterator, fn) {
  if (iterator.isSagaIterator) {
    return {
      name: iterator.meta.name
    };
  }

  return (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.j)(fn);
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  // catch synchronous failures; see #152 and #441
  try {
    var result = fn.apply(context, args); // i.e. a generator function returns an iterator

    if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .iterator */ .lJ)(result)) {
      return result;
    }

    var resolved = false;

    var next = function next(arg) {
      if (!resolved) {
        resolved = true; // Only promises returned from fork will be interpreted. See #1573

        return {
          value: result,
          done: !(0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .promise */ .iv)(result)
        };
      } else {
        return {
          value: arg,
          done: true
        };
      }
    };

    return (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.q)(next);
  } catch (err) {
    // do not bubble up synchronous failures for detached forks
    // instead create a failed task. See #152 and #441
    return (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.q)(function () {
      throw err;
    });
  }
}

function runPutEffect(env, _ref2, cb) {
  var channel = _ref2.channel,
      action = _ref2.action,
      resolve = _ref2.resolve;

  /**
   Schedule the put in case another saga is holding a lock.
   The put will be executed atomically. ie nested puts will execute after
   this put has terminated.
   **/
  asap(function () {
    var result;

    try {
      result = (channel ? channel.put : env.dispatch)(action);
    } catch (error) {
      cb(error, true);
      return;
    }

    if (resolve && (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .promise */ .iv)(result)) {
      resolvePromise(result, cb);
    } else {
      cb(result);
    }
  }); // Put effects are non cancellables
}

function runTakeEffect(env, _ref3, cb) {
  var _ref3$channel = _ref3.channel,
      channel = _ref3$channel === void 0 ? env.channel : _ref3$channel,
      pattern = _ref3.pattern,
      maybe = _ref3.maybe;

  var takeCb = function takeCb(input) {
    if (input instanceof Error) {
      cb(input, true);
      return;
    }

    if (isEnd(input) && !maybe) {
      cb(_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TERMINATE */ .a6);
      return;
    }

    cb(input);
  };

  try {
    channel.take(takeCb, (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .notUndef */ .uQ)(pattern) ? matcher(pattern) : null);
  } catch (err) {
    cb(err, true);
    return;
  }

  cb.cancel = takeCb.cancel;
}

function runCallEffect(env, _ref4, cb, _ref5) {
  var context = _ref4.context,
      fn = _ref4.fn,
      args = _ref4.args;
  var task = _ref5.task;

  // catch synchronous failures; see #152
  try {
    var result = fn.apply(context, args);

    if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .promise */ .iv)(result)) {
      resolvePromise(result, cb);
      return;
    }

    if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .iterator */ .lJ)(result)) {
      // resolve iterator
      proc(env, result, task.context, current, (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.j)(fn),
      /* isRoot */
      false, cb);
      return;
    }

    cb(result);
  } catch (error) {
    cb(error, true);
  }
}

function runCPSEffect(env, _ref6, cb) {
  var context = _ref6.context,
      fn = _ref6.fn,
      args = _ref6.args;

  // CPS (ie node style functions) can define their own cancellation logic
  // by setting cancel field on the cb
  // catch synchronous failures; see #152
  try {
    var cpsCb = function cpsCb(err, res) {
      if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .undef */ .vD)(err)) {
        cb(res);
      } else {
        cb(err, true);
      }
    };

    fn.apply(context, args.concat(cpsCb));

    if (cpsCb.cancel) {
      cb.cancel = cpsCb.cancel;
    }
  } catch (error) {
    cb(error, true);
  }
}

function runForkEffect(env, _ref7, cb, _ref8) {
  var context = _ref7.context,
      fn = _ref7.fn,
      args = _ref7.args,
      detached = _ref7.detached;
  var parent = _ref8.task;
  var taskIterator = createTaskIterator({
    context: context,
    fn: fn,
    args: args
  });
  var meta = getIteratorMetaInfo(taskIterator, fn);
  immediately(function () {
    var child = proc(env, taskIterator, parent.context, current, meta, detached, undefined);

    if (detached) {
      cb(child);
    } else {
      if (child.isRunning()) {
        parent.queue.addTask(child);
        cb(child);
      } else if (child.isAborted()) {
        parent.queue.abort(child.error());
      } else {
        cb(child);
      }
    }
  }); // Fork effects are non cancellables
}

function runJoinEffect(env, taskOrTasks, cb, _ref9) {
  var task = _ref9.task;

  var joinSingleTask = function joinSingleTask(taskToJoin, cb) {
    if (taskToJoin.isRunning()) {
      var joiner = {
        task: task,
        cb: cb
      };

      cb.cancel = function () {
        if (taskToJoin.isRunning()) (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.r)(taskToJoin.joiners, joiner);
      };

      taskToJoin.joiners.push(joiner);
    } else {
      if (taskToJoin.isAborted()) {
        cb(taskToJoin.error(), true);
      } else {
        cb(taskToJoin.result());
      }
    }
  };

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YO)(taskOrTasks)) {
    if (taskOrTasks.length === 0) {
      cb([]);
      return;
    }

    var childCallbacks = (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.l)(taskOrTasks, cb);
    taskOrTasks.forEach(function (t, i) {
      joinSingleTask(t, childCallbacks[i]);
    });
  } else {
    joinSingleTask(taskOrTasks, cb);
  }
}

function cancelSingleTask(taskToCancel) {
  if (taskToCancel.isRunning()) {
    taskToCancel.cancel();
  }
}

function runCancelEffect(env, taskOrTasks, cb, _ref10) {
  var task = _ref10.task;

  if (taskOrTasks === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .SELF_CANCELLATION */ .Pe) {
    cancelSingleTask(task);
  } else if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YO)(taskOrTasks)) {
    taskOrTasks.forEach(cancelSingleTask);
  } else {
    cancelSingleTask(taskOrTasks);
  }

  cb(); // cancel effects are non cancellables
}

function runAllEffect(env, effects, cb, _ref11) {
  var digestEffect = _ref11.digestEffect;
  var effectId = current;
  var keys = Object.keys(effects);

  if (keys.length === 0) {
    cb((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YO)(effects) ? [] : {});
    return;
  }

  var childCallbacks = (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.l)(effects, cb);
  keys.forEach(function (key) {
    digestEffect(effects[key], effectId, childCallbacks[key], key);
  });
}

function runRaceEffect(env, effects, cb, _ref12) {
  var digestEffect = _ref12.digestEffect;
  var effectId = current;
  var keys = Object.keys(effects);
  var response = (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .array */ .YO)(effects) ? (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.m)(keys.length) : {};
  var childCbs = {};
  var completed = false;
  keys.forEach(function (key) {
    var chCbAtKey = function chCbAtKey(res, isErr) {
      if (completed) {
        return;
      }

      if (isErr || (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.s)(res)) {
        // Race Auto cancellation
        cb.cancel();
        cb(res, isErr);
      } else {
        cb.cancel();
        completed = true;
        response[key] = res;
        cb(response);
      }
    };

    chCbAtKey.cancel = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
    childCbs[key] = chCbAtKey;
  });

  cb.cancel = function () {
    // prevents unnecessary cancellation
    if (!completed) {
      completed = true;
      keys.forEach(function (key) {
        return childCbs[key].cancel();
      });
    }
  };

  keys.forEach(function (key) {
    if (completed) {
      return;
    }

    digestEffect(effects[key], effectId, childCbs[key], key);
  });
}

function runSelectEffect(env, _ref13, cb) {
  var selector = _ref13.selector,
      args = _ref13.args;

  try {
    var state = selector.apply(void 0, [env.getState()].concat(args));
    cb(state);
  } catch (error) {
    cb(error, true);
  }
}

function runChannelEffect(env, _ref14, cb) {
  var pattern = _ref14.pattern,
      buffer = _ref14.buffer;
  var chan = channel(buffer);
  var match = matcher(pattern);

  var taker = function taker(action) {
    if (!isEnd(action)) {
      env.channel.take(taker, match);
    }

    chan.put(action);
  };

  var close = chan.close;

  chan.close = function () {
    taker.cancel();
    close();
  };

  env.channel.take(taker, match);
  cb(chan);
}

function runCancelledEffect(env, data, cb, _ref15) {
  var task = _ref15.task;
  cb(task.isCancelled());
}

function runFlushEffect(env, channel, cb) {
  channel.flush(cb);
}

function runGetContextEffect(env, prop, cb, _ref16) {
  var task = _ref16.task;
  cb(task.context[prop]);
}

function runSetContextEffect(env, props, cb, _ref17) {
  var task = _ref17.task;
  (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.p)(task.context, props);
  cb();
}

var effectRunnerMap = (_effectRunnerMap = {}, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.T] = runTakeEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.P] = runPutEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.A] = runAllEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.R] = runRaceEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.C] = runCallEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.a] = runCPSEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.F] = runForkEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.J] = runJoinEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.b] = runCancelEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.S] = runSelectEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.d] = runChannelEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.f] = runCancelledEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.g] = runFlushEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.G] = runGetContextEffect, _effectRunnerMap[_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.h] = runSetContextEffect, _effectRunnerMap);

/**
 Used to track a parent task and its forks
 In the fork model, forked tasks are attached by default to their parent
 We model this using the concept of Parent task && main Task
 main task is the main flow of the current Generator, the parent tasks is the
 aggregation of the main tasks + all its forked tasks.
 Thus the whole model represents an execution tree with multiple branches (vs the
 linear execution tree in sequential (non parallel) programming)

 A parent tasks has the following semantics
 - It completes if all its forks either complete or all cancelled
 - If it's cancelled, all forks are cancelled as well
 - It aborts if any uncaught error bubbles up from forks
 - If it completes, the return value is the one returned by the main task
 **/

function forkQueue(mainTask, onAbort, cont) {
  var tasks = [];
  var result;
  var completed = false;
  addTask(mainTask);

  var getTasks = function getTasks() {
    return tasks;
  };

  function abort(err) {
    onAbort();
    cancelAll();
    cont(err, true);
  }

  function addTask(task) {
    tasks.push(task);

    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.r)(tasks, task);
      task.cont = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;

      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }

        if (!tasks.length) {
          completed = true;
          cont(result);
        }
      }
    };
  }

  function cancelAll() {
    if (completed) {
      return;
    }

    completed = true;
    tasks.forEach(function (t) {
      t.cont = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: getTasks
  };
}

// there can be only a single saga error created at any given moment

function formatLocation(fileName, lineNumber) {
  return fileName + "?" + lineNumber;
}

function effectLocationAsString(effect) {
  var location = (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.v)(effect);

  if (location) {
    var code = location.code,
        fileName = location.fileName,
        lineNumber = location.lineNumber;
    var source = code + "  " + formatLocation(fileName, lineNumber);
    return source;
  }

  return '';
}

function sagaLocationAsString(sagaMeta) {
  var name = sagaMeta.name,
      location = sagaMeta.location;

  if (location) {
    return name + "  " + formatLocation(location.fileName, location.lineNumber);
  }

  return name;
}

function cancelledTasksAsString(sagaStack) {
  var cancelledTasks = (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.u)(function (i) {
    return i.cancelledTasks;
  }, sagaStack);

  if (!cancelledTasks.length) {
    return '';
  }

  return ['Tasks cancelled due to error:'].concat(cancelledTasks).join('\n');
}

var crashedEffect = null;
var sagaStack = [];
var addSagaFrame = function addSagaFrame(frame) {
  frame.crashedEffect = crashedEffect;
  sagaStack.push(frame);
};
var clear = function clear() {
  crashedEffect = null;
  sagaStack.length = 0;
}; // this sets crashed effect for the soon-to-be-reported saga frame
// this slightly streatches the singleton nature of this module into wrong direction
// as it's even less obvious what's the data flow here, but it is what it is for now

var setCrashedEffect = function setCrashedEffect(effect) {
  crashedEffect = effect;
};
/**
  @returns {string}

  @example
  The above error occurred in task errorInPutSaga {pathToFile}
  when executing effect put({type: 'REDUCER_ACTION_ERROR_IN_PUT'}) {pathToFile}
      created by fetchSaga {pathToFile}
      created by rootSaga {pathToFile}
*/

var toString = function toString() {
  var firstSaga = sagaStack[0],
      otherSagas = sagaStack.slice(1);
  var crashedEffectLocation = firstSaga.crashedEffect ? effectLocationAsString(firstSaga.crashedEffect) : null;
  var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : '');
  return [errorMessage].concat(otherSagas.map(function (s) {
    return "    created by " + sagaLocationAsString(s.meta);
  }), [cancelledTasksAsString(sagaStack)]).join('\n');
};

function newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont) {
  var _task;

  if (cont === void 0) {
    cont = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
  }

  var status = RUNNING;
  var taskResult;
  var taskError;
  var deferredEnd = null;
  var cancelledDueToErrorTasks = [];
  var context = Object.create(parentContext);
  var queue = forkQueue(mainTask, function onAbort() {
    cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, queue.getTasks().map(function (t) {
      return t.meta.name;
    }));
  }, end);
  /**
   This may be called by a parent generator to trigger/propagate cancellation
   cancel all pending tasks (including the main task), then end the current task.
    Cancellation propagates down to the whole execution tree held by this Parent task
   It's also propagated to all joiners of this task and their execution tree/joiners
    Cancellation is noop for terminated/Cancelled tasks tasks
   **/

  function cancel() {
    if (status === RUNNING) {
      // Setting status to CANCELLED does not necessarily mean that the task/iterators are stopped
      // effects in the iterator's finally block will still be executed
      status = CANCELLED;
      queue.cancelAll(); // Ending with a TASK_CANCEL will propagate the Cancellation to all joiners

      end(_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TASK_CANCEL */ .nm, false);
    }
  }

  function end(result, isErr) {
    if (!isErr) {
      // The status here may be RUNNING or CANCELLED
      // If the status is CANCELLED, then we do not need to change it here
      if (result === _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TASK_CANCEL */ .nm) {
        status = CANCELLED;
      } else if (status !== CANCELLED) {
        status = DONE;
      }

      taskResult = result;
      deferredEnd && deferredEnd.resolve(result);
    } else {
      status = ABORTED;
      addSagaFrame({
        meta: meta,
        cancelledTasks: cancelledDueToErrorTasks
      });

      if (task.isRoot) {
        var sagaStack = toString(); // we've dumped the saga stack to string and are passing it to user's code
        // we know that it won't be needed anymore and we need to clear it

        clear();
        env.onError(result, {
          sagaStack: sagaStack
        });
      }

      taskError = result;
      deferredEnd && deferredEnd.reject(result);
    }

    task.cont(result, isErr);
    task.joiners.forEach(function (joiner) {
      joiner.cb(result, isErr);
    });
    task.joiners = null;
  }

  function setContext(props) {
    if (false) {}

    (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.p)(context, props);
  }

  function toPromise() {
    if (deferredEnd) {
      return deferredEnd.promise;
    }

    deferredEnd = (0,_redux_saga_deferred__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)();

    if (status === ABORTED) {
      deferredEnd.reject(taskError);
    } else if (status !== RUNNING) {
      deferredEnd.resolve(taskResult);
    }

    return deferredEnd.promise;
  }

  var task = (_task = {}, _task[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TASK */ .wn] = true, _task.id = parentEffectId, _task.meta = meta, _task.isRoot = isRoot, _task.context = context, _task.joiners = [], _task.queue = queue, _task.cancel = cancel, _task.cont = cont, _task.end = end, _task.setContext = setContext, _task.toPromise = toPromise, _task.isRunning = function isRunning() {
    return status === RUNNING;
  }, _task.isCancelled = function isCancelled() {
    return status === CANCELLED || status === RUNNING && mainTask.status === CANCELLED;
  }, _task.isAborted = function isAborted() {
    return status === ABORTED;
  }, _task.result = function result() {
    return taskResult;
  }, _task.error = function error() {
    return taskError;
  }, _task);
  return task;
}

function proc(env, iterator$1, parentContext, parentEffectId, meta, isRoot, cont) {
  if (false) {}

  var finalRunEffect = env.finalizeRunEffect(runEffect);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/

  next.cancel = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
  /** Creates a main task to track the main flow */

  var mainTask = {
    meta: meta,
    cancel: cancelMain,
    status: RUNNING
  };
  /**
   Creates a new task descriptor for this generator.
   A task is the aggregation of it's mainTask and all it's forked tasks.
   **/

  var task = newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont);
  var executingContext = {
    task: task,
    digestEffect: digestEffect
  };
  /**
    cancellation of the main task. We'll simply resume the Generator with a TASK_CANCEL
  **/

  function cancelMain() {
    if (mainTask.status === RUNNING) {
      mainTask.status = CANCELLED;
      next(_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TASK_CANCEL */ .nm);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/


  if (cont) {
    cont.cancel = task.cancel;
  } // kicks up the generator


  next(); // then return the task descriptor to the caller

  return task;
  /**
   * This is the generator driver
   * It's a recursive async/continuation function which calls itself
   * until the generator terminates or throws
   * @param {internal commands(TASK_CANCEL | TERMINATE) | any} arg - value, generator will be resumed with.
   * @param {boolean} isErr - the flag shows if effect finished with an error
   *
   * receives either (command | effect result, false) or (any thrown thing, true)
   */

  function next(arg, isErr) {
    try {
      var result;

      if (isErr) {
        result = iterator$1.throw(arg); // user handled the error, we can clear bookkept values

        clear();
      } else if ((0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.y)(arg)) {
        /**
          getting TASK_CANCEL automatically cancels the main task
          We can get this value here
           - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.status = CANCELLED;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/

        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          This will jump to the finally block
        **/

        result = (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .func */ .Pc)(iterator$1.return) ? iterator$1.return(_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TASK_CANCEL */ .nm) : {
          done: true,
          value: _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__/* .TASK_CANCEL */ .nm
        };
      } else if ((0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.z)(arg)) {
        // We get TERMINATE flag, i.e. by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = (0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .func */ .Pc)(iterator$1.return) ? iterator$1.return() : {
          done: true
        };
      } else {
        result = iterator$1.next(arg);
      }

      if (!result.done) {
        digestEffect(result.value, parentEffectId, next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        if (mainTask.status !== CANCELLED) {
          mainTask.status = DONE;
        }

        mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.status === CANCELLED) {
        throw error;
      }

      mainTask.status = ABORTED;
      mainTask.cont(error, true);
    }
  }

  function runEffect(effect, effectId, currCb) {
    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
       This is a sort of inversion of control: called async functions are responsible
      of completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
       Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/
    if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .promise */ .iv)(effect)) {
      resolvePromise(effect, currCb);
    } else if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .iterator */ .lJ)(effect)) {
      // resolve iterator
      proc(env, effect, task.context, effectId, meta,
      /* isRoot */
      false, currCb);
    } else if (effect && effect[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_2__.IO]) {
      var effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, currCb, executingContext);
    } else {
      // anything else returned as is
      currCb(effect);
    }
  }

  function digestEffect(effect, parentEffectId, cb, label) {
    if (label === void 0) {
      label = '';
    }

    var effectId = nextSagaId();
    env.sagaMonitor && env.sagaMonitor.effectTriggered({
      effectId: effectId,
      parentEffectId: parentEffectId,
      label: label,
      effect: effect
    });
    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/

    var effectSettled; // Completion callback passed to the appropriate effect runner

    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t; // defensive measure

      if (env.sagaMonitor) {
        if (isErr) {
          env.sagaMonitor.effectRejected(effectId, res);
        } else {
          env.sagaMonitor.effectResolved(effectId, res);
        }
      }

      if (isErr) {
        setCrashedEffect(effect);
      }

      cb(res, isErr);
    } // tracks down the current cancel


    currCb.cancel = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t; // setup cancellation logic on the parent cb

    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      currCb.cancel(); // propagates cancel downward

      currCb.cancel = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t; // defensive measure

      env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
    };

    finalRunEffect(effect, effectId, currCb);
  }
}

var RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";
function runSaga(_ref, saga) {
  var _ref$channel = _ref.channel,
      channel = _ref$channel === void 0 ? stdChannel() : _ref$channel,
      dispatch = _ref.dispatch,
      getState = _ref.getState,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? {} : _ref$context,
      sagaMonitor = _ref.sagaMonitor,
      effectMiddlewares = _ref.effectMiddlewares,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.B : _ref$onError;

  if (false) {}

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var iterator$1 = saga.apply(void 0, args);

  if (false) {}

  var effectId = nextSagaId();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.rootSagaStarted = sagaMonitor.rootSagaStarted || _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.t;
    sagaMonitor.rootSagaStarted({
      effectId: effectId,
      saga: saga,
      args: args
    });
  }

  if (false) { var MIDDLEWARE_TYPE_ERROR; }

  var finalizeRunEffect;

  if (effectMiddlewares) {
    var middleware = redux__WEBPACK_IMPORTED_MODULE_4__/* .compose */ .Zz.apply(void 0, effectMiddlewares);

    finalizeRunEffect = function finalizeRunEffect(runEffect) {
      return function (effect, effectId, currCb) {
        var plainRunEffect = function plainRunEffect(eff) {
          return runEffect(eff, effectId, currCb);
        };

        return middleware(plainRunEffect)(effect);
      };
    };
  } else {
    finalizeRunEffect = _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.E;
  }

  var env = {
    channel: channel,
    dispatch: (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.D)(dispatch),
    getState: getState,
    sagaMonitor: sagaMonitor,
    onError: onError,
    finalizeRunEffect: finalizeRunEffect
  };
  return immediately(function () {
    var task = proc(env, iterator$1, context, effectId, (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.j)(saga),
    /* isRoot */
    true, undefined);

    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task);
    }

    return task;
  });
}

function sagaMiddlewareFactory(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? {} : _ref$context,
      _ref$channel = _ref.channel,
      channel = _ref$channel === void 0 ? stdChannel() : _ref$channel,
      sagaMonitor = _ref.sagaMonitor,
      options = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(_ref, ["context", "channel", "sagaMonitor"]);

  var boundRunSaga;

  if (false) {}

  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState,
        dispatch = _ref2.dispatch;
    boundRunSaga = runSaga.bind(null, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)({}, options, {
      context: context,
      channel: channel,
      dispatch: dispatch,
      getState: getState,
      sagaMonitor: sagaMonitor
    }));
    return function (next) {
      return function (action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }

        var result = next(action); // hit reducers

        channel.put(action);
        return result;
      };
    };
  }

  sagaMiddleware.run = function () {
    if (false) {}

    return boundRunSaga.apply(void 0, arguments);
  };

  sagaMiddleware.setContext = function (props) {
    if (false) {}

    (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.p)(context, props);
  };

  return sagaMiddleware;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sagaMiddlewareFactory);



/***/ }),

/***/ 2361:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T1: () => (/* reexport safe */ _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.N),
/* harmony export */   cb: () => (/* reexport safe */ _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.O),
/* harmony export */   p8: () => (/* binding */ takeLatest$1),
/* harmony export */   yJ: () => (/* reexport safe */ _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.Y)
/* harmony export */ });
/* unused harmony exports debounce, retry, takeEvery, takeLeading, throttle */
/* harmony import */ var _redux_saga_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4860);
/* harmony import */ var _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(619);







var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};
function safeName(patternOrChannel) {
  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .channel */ .Ix)(patternOrChannel)) {
    return 'channel';
  }

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .stringableFunc */ .mr)(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if ((0,_redux_saga_is__WEBPACK_IMPORTED_MODULE_0__/* .func */ .Pc)(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.q)(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.K)(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.L.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yCancel = function yCancel(task) {
    return {
      done: false,
      value: (0,_io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.M)(task)
    };
  };

  var task, action;

  var setTask = function setTask(t) {
    return task = t;
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return task ? {
        nextState: 'q3',
        effect: yCancel(task)
      } : {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    },
    q3: function q3() {
      return {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    }
  }, 'q1', "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLeading(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yCall = function yCall(ac) {
    return {
      done: false,
      value: call.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action;

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yCall(action)
      };
    }
  }, 'q1', "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function throttle(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, channel$1;

  var yTake = function yTake() {
    return {
      done: false,
      value: take(channel$1)
    };
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yDelay = {
    done: false,
    value: delay(delayLength)
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setChannel = function setChannel(ch) {
    return channel$1 = ch;
  };

  var needsChannel = !channel(patternOrChannel);

  if (!needsChannel) {
    setChannel(patternOrChannel);
  }

  return fsmIterator({
    q1: function q1() {
      var yActionChannel = {
        done: false,
        value: actionChannel(patternOrChannel, sliding(1))
      };
      return {
        nextState: 'q2',
        effect: yActionChannel,
        stateUpdater: setChannel
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yTake(),
        stateUpdater: setAction
      };
    },
    q3: function q3() {
      return {
        nextState: 'q4',
        effect: yFork(action)
      };
    },
    q4: function q4() {
      return {
        nextState: 'q2',
        effect: yDelay
      };
    }
  }, needsChannel ? 'q1' : 'q2', "throttle(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function retry(maxTries, delayLength, fn) {
  var counter = maxTries;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var yCall = {
    done: false,
    value: call.apply(void 0, [fn].concat(args))
  };
  var yDelay = {
    done: false,
    value: delay(delayLength)
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yCall,
        errorState: 'q10'
      };
    },
    q2: function q2() {
      return {
        nextState: qEnd
      };
    },
    q10: function q10(error) {
      counter -= 1;

      if (counter <= 0) {
        throw error;
      }

      return {
        nextState: 'q1',
        effect: yDelay
      };
    }
  }, 'q1', "retry(" + fn.name + ")");
}

function debounceHelper(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, raceOutput;
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yRace = {
    done: false,
    value: race({
      action: take(patternOrChannel),
      debounce: delay(delayLength)
    })
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yNoop = function yNoop(value) {
    return {
      done: false,
      value: value
    };
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setRaceOutput = function setRaceOutput(ro) {
    return raceOutput = ro;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yRace,
        stateUpdater: setRaceOutput
      };
    },
    q3: function q3() {
      return raceOutput.debounce ? {
        nextState: 'q1',
        effect: yFork(action)
      } : {
        nextState: 'q2',
        effect: yNoop(raceOutput.action),
        stateUpdater: setAction
      };
    }
  }, 'q1', "debounce(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

var validateTakeEffect = function validateTakeEffect(fn, patternOrChannel, worker) {
  check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
  check(worker, notUndef, fn.name + " requires a saga parameter");
};

function takeEvery$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}
function takeLatest$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return _io_c3792963_js__WEBPACK_IMPORTED_MODULE_1__.L.apply(void 0, [takeLatest, patternOrChannel, worker].concat(args));
}
function takeLeading$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return fork.apply(void 0, [takeLeading, patternOrChannel, worker].concat(args));
}
function throttle$1(ms, patternOrChannel, worker) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  return fork.apply(void 0, [throttle, ms, patternOrChannel, worker].concat(args));
}
function retry$1(maxTries, delayLength, worker) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }

  return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
}
function debounce(delayLength, pattern, worker) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }

  return fork.apply(void 0, [debounceHelper, delayLength, pattern, worker].concat(args));
}




/***/ }),

/***/ 370:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export arrayOfDeferred */
function deferred() {
  var def = {};
  def.promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
}
function arrayOfDeferred(length) {
  var arr = [];

  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }

  return arr;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deferred);



/***/ }),

/***/ 1344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3068);


var MAX_SIGNED_INT = 2147483647;
function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
  if (false) {}

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, Math.min(MAX_SIGNED_INT, ms), val);
  });

  promise[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__/* .CANCEL */ .bO] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (delayP);


/***/ }),

/***/ 4860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HR: () => (/* binding */ symbol),
/* harmony export */   Ix: () => (/* binding */ channel),
/* harmony export */   Pc: () => (/* binding */ func),
/* harmony export */   T1: () => (/* binding */ pattern),
/* harmony export */   YO: () => (/* binding */ array),
/* harmony export */   Yj: () => (/* binding */ string),
/* harmony export */   fD: () => (/* binding */ multicast),
/* harmony export */   iv: () => (/* binding */ promise),
/* harmony export */   lJ: () => (/* binding */ iterator),
/* harmony export */   mr: () => (/* binding */ stringableFunc),
/* harmony export */   uQ: () => (/* binding */ notUndef),
/* harmony export */   vD: () => (/* binding */ undef)
/* harmony export */ });
/* unused harmony exports buffer, effect, iterable, number, object, observable, sagaAction, task */
/* harmony import */ var _redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3068);


var undef = function undef(v) {
  return v === null || v === undefined;
};
var notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var func = function func(f) {
  return typeof f === 'function';
};
var number = function number(n) {
  return typeof n === 'number';
};
var string = function string(s) {
  return typeof s === 'string';
};
var array = Array.isArray;
var object = function object(obj) {
  return obj && !array(obj) && typeof obj === 'object';
};
var promise = function promise(p) {
  return p && func(p.then);
};
var iterator = function iterator(it) {
  return it && func(it.next) && func(it.throw);
};
var iterable = function iterable(it) {
  return it && func(Symbol) ? func(it[Symbol.iterator]) : array(it);
};
var task = function task(t) {
  return t && t[TASK];
};
var sagaAction = function sagaAction(a) {
  return Boolean(a && a[SAGA_ACTION]);
};
var observable = function observable(ob) {
  return ob && func(ob.subscribe);
};
var buffer = function buffer(buf) {
  return buf && func(buf.isEmpty) && func(buf.take) && func(buf.put);
};
var pattern = function pattern(pat) {
  return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
};
var channel = function channel(ch) {
  return ch && func(ch.take) && func(ch.close);
};
var stringableFunc = function stringableFunc(f) {
  return func(f) && f.hasOwnProperty('toString');
};
var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var multicast = function multicast(ch) {
  return channel(ch) && ch[_redux_saga_symbols__WEBPACK_IMPORTED_MODULE_0__/* .MULTICAST */ .Xl];
};
var effect = function effect(eff) {
  return eff && eff[IO];
};




/***/ }),

/***/ 3068:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E_: () => (/* binding */ MATCH),
/* harmony export */   IO: () => (/* binding */ IO),
/* harmony export */   Pe: () => (/* binding */ SELF_CANCELLATION),
/* harmony export */   Xl: () => (/* binding */ MULTICAST),
/* harmony export */   a6: () => (/* binding */ TERMINATE),
/* harmony export */   bO: () => (/* binding */ CANCEL),
/* harmony export */   nm: () => (/* binding */ TASK_CANCEL),
/* harmony export */   q8: () => (/* binding */ SAGA_ACTION),
/* harmony export */   wn: () => (/* binding */ TASK),
/* harmony export */   x2: () => (/* binding */ SAGA_LOCATION),
/* harmony export */   x7: () => (/* binding */ CHANNEL_END_TYPE)
/* harmony export */ });
var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var CHANNEL_END_TYPE =
/*#__PURE__*/
createSymbol('CHANNEL_END');
var IO =
/*#__PURE__*/
createSymbol('IO');
var MATCH =
/*#__PURE__*/
createSymbol('MATCH');
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');
var SAGA_ACTION =
/*#__PURE__*/
createSymbol('SAGA_ACTION');
var SELF_CANCELLATION =
/*#__PURE__*/
createSymbol('SELF_CANCELLATION');
var TASK =
/*#__PURE__*/
createSymbol('TASK');
var TASK_CANCEL =
/*#__PURE__*/
createSymbol('TASK_CANCEL');
var TERMINATE =
/*#__PURE__*/
createSymbol('TERMINATE');
var SAGA_LOCATION =
/*#__PURE__*/
createSymbol('LOCATION');




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

/***/ 3948:
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


const formatListBullets = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM6 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatListBullets);
//# sourceMappingURL=format-list-bullets.js.map

/***/ }),

/***/ 2805:
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


const fullscreen = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M6 4a2 2 0 0 0-2 2v3h1.5V6a.5.5 0 0 1 .5-.5h3V4H6Zm3 14.5H6a.5.5 0 0 1-.5-.5v-3H4v3a2 2 0 0 0 2 2h3v-1.5Zm6 1.5v-1.5h3a.5.5 0 0 0 .5-.5v-3H20v3a2 2 0 0 1-2 2h-3Zm3-16a2 2 0 0 1 2 2v3h-1.5V6a.5.5 0 0 0-.5-.5h-3V4h3Z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fullscreen);
//# sourceMappingURL=fullscreen.js.map

/***/ }),

/***/ 5388:
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


const grid = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "m3 5c0-1.10457.89543-2 2-2h13.5c1.1046 0 2 .89543 2 2v13.5c0 1.1046-.8954 2-2 2h-13.5c-1.10457 0-2-.8954-2-2zm2-.5h6v6.5h-6.5v-6c0-.27614.22386-.5.5-.5zm-.5 8v6c0 .2761.22386.5.5.5h6v-6.5zm8 0v6.5h6c.2761 0 .5-.2239.5-.5v-6zm0-8v6.5h6.5v-6c0-.27614-.2239-.5-.5-.5z",
    fillRule: "evenodd",
    clipRule: "evenodd"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (grid);
//# sourceMappingURL=grid.js.map

/***/ }),

/***/ 3727:
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


const image = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (image);
//# sourceMappingURL=image.js.map

/***/ }),

/***/ 6537:
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


const postFeaturedImage = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M19 3H5c-.6 0-1 .4-1 1v7c0 .5.4 1 1 1h14c.5 0 1-.4 1-1V4c0-.6-.4-1-1-1zM5.5 10.5v-.4l1.8-1.3 1.3.8c.3.2.7.2.9-.1L11 8.1l2.4 2.4H5.5zm13 0h-2.9l-4-4c-.3-.3-.8-.3-1.1 0L8.9 8l-1.2-.8c-.3-.2-.6-.2-.9 0l-1.3 1V4.5h13v6zM4 20h9v-1.5H4V20zm0-4h16v-1.5H4V16z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postFeaturedImage);
//# sourceMappingURL=post-featured-image.js.map

/***/ }),

/***/ 3517:
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


const pullLeft = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M4 18h6V6H4v12zm9-9.5V10h7V8.5h-7zm0 7h7V14h-7v1.5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pullLeft);
//# sourceMappingURL=pull-left.js.map

/***/ }),

/***/ 2956:
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


const pullRight = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M14 6v12h6V6h-6zM4 10h7V8.5H4V10zm0 5.5h7V14H4v1.5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pullRight);
//# sourceMappingURL=pull-right.js.map

/***/ }),

/***/ 9870:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ 9015:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 1399:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 115:
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


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

/***/ 9111:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _redux_saga_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(506);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_redux_saga_core__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay);


/***/ }),

/***/ 9652:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T1: () => (/* reexport safe */ _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__.T1),
/* harmony export */   cb: () => (/* reexport safe */ _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__.cb),
/* harmony export */   p8: () => (/* reexport safe */ _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__.p8),
/* harmony export */   yJ: () => (/* reexport safe */ _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__.yJ)
/* harmony export */ });
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2361);



/***/ }),

/***/ 2419:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tw: () => (/* binding */ applyMiddleware),
/* harmony export */   Zz: () => (/* binding */ compose),
/* harmony export */   y$: () => (/* binding */ createStore)
/* harmony export */ });
/* unused harmony exports __DO_NOT_USE__ActionTypes, bindActionCreators, combineReducers, legacy_createStore */
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9740);


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (false) {}

  return typeOfVal;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }

    if (typeof action.type === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Creates a Redux store that holds the state tree.
 *
 * **We recommend using `configureStore` from the
 * `@reduxjs/toolkit` package**, which replaces `createStore`:
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

var legacy_createStore = (/* unused pure expression or super */ null && (createStore));

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error( true ? formatProdErrorMessage(15) : 0);
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}




/***/ }),

/***/ 2519:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ CAROUSEL_BLOCK_NAME)
/* harmony export */ });
/**
 * Block name in the A8C\FSE context.
 */
const CAROUSEL_BLOCK_NAME = 'a8c/posts-carousel';

/***/ }),

/***/ 1270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4586);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_query_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2216);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(231);
/* harmony import */ var _shared_js_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(723);
/* harmony import */ var _components_editor_panels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6994);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9870);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8443);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4715);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9491);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8537);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4446);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3948);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5388);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(6537);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3517);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(2956);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(3727);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(2805);


/* eslint-disable jsx-a11y/anchor-is-valid */

/**
 * Internal dependencies
 */





/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__;








let IS_SUBTITLE_SUPPORTED_IN_THEME;
if ( true && window.newspack_blocks_data && window.newspack_blocks_data.post_subtitle) {
  IS_SUBTITLE_SUPPORTED_IN_THEME = true;
}
const landscapeIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Path, {
  clipRule: "evenodd",
  d: "M18.714 7.5H5.286a.786.786 0 00-.786.786v7.428c0 .434.352.786.786.786h13.428a.786.786 0 00.786-.786V8.286a.786.786 0 00-.786-.786zM5.286 6A2.286 2.286 0 003 8.286v7.428A2.286 2.286 0 005.286 18h13.428A2.286 2.286 0 0021 15.714V8.286A2.286 2.286 0 0018.714 6H5.286z",
  fillRule: "evenodd"
}));
const portraitIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Path, {
  clipRule: "evenodd",
  d: "M15.714 4.5H8.286a.786.786 0 00-.786.786v13.428c0 .434.352.786.786.786h7.428a.786.786 0 00.786-.786V5.286a.786.786 0 00-.786-.786zM8.286 3A2.286 2.286 0 006 5.286v13.428A2.286 2.286 0 008.286 21h7.428A2.286 2.286 0 0018 18.714V5.286A2.286 2.286 0 0015.714 3H8.286z",
  fillRule: "evenodd"
}));
const squareIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Path, {
  clipRule: "evenodd",
  d: "M18.714 4.5H5.286a.786.786 0 00-.786.786v13.428c0 .434.352.786.786.786h13.428a.786.786 0 00.786-.786V5.286a.786.786 0 00-.786-.786zM5.286 3A2.286 2.286 0 003 5.286v13.428A2.286 2.286 0 005.286 21h13.428A2.286 2.286 0 0021 18.714V5.286A2.286 2.286 0 0018.714 3H5.286z",
  fillRule: "evenodd"
}));
class Edit extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A)(this, "renderPost", post => {
      const {
        attributes,
        isUIDisabled
      } = this.props;
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
        sectionHeader
      } = attributes;
      const styles = {
        minHeight: mediaPosition === 'behind' && showImage && post.newspack_featured_image_src && minHeight + 'vh',
        paddingTop: mediaPosition === 'behind' && showImage && post.newspack_featured_image_src && minHeight / 5 + 'vh'
      };
      const postClasses = classnames__WEBPACK_IMPORTED_MODULE_5___default()({
        'post-has-image': post.newspack_featured_image_src,
        'newspack-block--disabled': isUIDisabled
      }, post.newspack_article_classes);
      const postTitle = this.titleForPost(post);
      const dateFormat = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_7__.__experimentalGetSettings)().formats.date;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
        className: postClasses,
        key: post.id,
        style: styles
      }, (0,_shared_js_utils__WEBPACK_IMPORTED_MODULE_3__/* .getPostStatusLabel */ .X8)(post), showImage && post.newspack_featured_image_src && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", {
        className: "post-thumbnail",
        key: "thumbnail"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: "#"
      }, imageShape === 'landscape' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: post.newspack_featured_image_src.landscape,
        alt: ""
      }), imageShape === 'portrait' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: post.newspack_featured_image_src.portrait,
        alt: ""
      }), imageShape === 'square' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: post.newspack_featured_image_src.square,
        alt: ""
      }), imageShape === 'uncropped' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: post.newspack_featured_image_src.uncropped,
        alt: ""
      })), showCaption && '' !== post.newspack_featured_image_caption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("figcaption", null, post.newspack_featured_image_caption)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "entry-wrapper"
      }, (post.newspack_post_sponsors || showCategory && 0 < post.newspack_category_info.length) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'cat-links' + (post.newspack_post_sponsors ? ' sponsor-label' : '')
      }, post.newspack_post_sponsors && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "flag"
      }, post.newspack_post_sponsors[0].flag), showCategory && (!post.newspack_post_sponsors || post.newspack_sponsors_show_categories) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, null, (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_12__.decodeEntities)(post.newspack_category_info))), _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.RichText.isEmpty(sectionHeader) ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
        className: "entry-title",
        key: "title"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: "#"
      }, postTitle)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
        className: "entry-title",
        key: "title"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: "#"
      }, postTitle)), IS_SUBTITLE_SUPPORTED_IN_THEME && showSubtitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, {
        key: "subtitle",
        className: "newspack-post-subtitle newspack-post-subtitle--in-homepage-block"
      }, post.meta.newspack_post_subtitle || ''), showExcerpt && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, {
        key: "excerpt",
        className: "excerpt-contain"
      }, post.excerpt.rendered), showReadMore && post.post_link && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: "#",
        key: "readmore",
        className: "more-link"
      }, readMoreLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "entry-meta"
      }, post.newspack_post_sponsors && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: `entry-sponsors ${post.newspack_sponsors_show_author ? 'plus-author' : ''}`
      }, (0,_shared_js_utils__WEBPACK_IMPORTED_MODULE_3__/* .formatSponsorLogos */ .__)(post.newspack_post_sponsors), (0,_shared_js_utils__WEBPACK_IMPORTED_MODULE_3__/* .formatSponsorByline */ .vQ)(post.newspack_post_sponsors)), showAuthor && !post.newspack_listings_hide_author && showAvatar && (!post.newspack_post_sponsors || post.newspack_sponsors_show_author) && (0,_shared_js_utils__WEBPACK_IMPORTED_MODULE_3__/* .formatAvatars */ .Az)(post.newspack_author_info), showAuthor && !post.newspack_listings_hide_author && (!post.newspack_post_sponsors || post.newspack_sponsors_show_author) && (0,_shared_js_utils__WEBPACK_IMPORTED_MODULE_3__/* .formatByline */ .NQ)(post.newspack_author_info), showDate && !post.newspack_listings_hide_publish_date && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("time", {
        className: "entry-date published",
        key: "pub-date"
      }, (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_7__.dateI18n)(dateFormat, post.date)))));
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A)(this, "titleForPost", post => {
      if (!post.title) {
        return '';
      }
      if (typeof post.title === 'string') {
        return (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_12__.decodeEntities)(post.title.trim());
      }
      if (typeof post.title === 'object' && post.title.rendered) {
        return (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_12__.decodeEntities)(post.title.rendered.trim());
      }
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A)(this, "renderInspectorControls", () => {
      const {
        attributes,
        setAttributes,
        textColor,
        setTextColor
      } = this.props;
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
        categoryExclusions
      } = attributes;
      const imageSizeOptions = [{
        value: 1,
        label: /* translators: label for small size option */__('Small', 'full-site-editing'),
        shortName: /* translators: abbreviation for small size */__('S', 'full-site-editing')
      }, {
        value: 2,
        label: /* translators: label for medium size option */__('Medium', 'full-site-editing'),
        shortName: /* translators: abbreviation for medium size */__('M', 'full-site-editing')
      }, {
        value: 3,
        label: /* translators: label for large size option */__('Large', 'full-site-editing'),
        shortName: /* translators: abbreviation for large size */__('L', 'full-site-editing')
      }, {
        value: 4,
        label: /* translators: label for extra large size option */__('Extra Large', 'full-site-editing'),
        shortName: /* translators: abbreviation for extra large size */__('XL', 'full-site-editing')
      }];
      const colGapOptions = [{
        value: 1,
        label: /* translators: label for small size option */__('Small', 'full-site-editing'),
        shortName: /* translators: abbreviation for small size */__('S', 'full-site-editing')
      }, {
        value: 2,
        label: /* translators: label for medium size option */__('Medium', 'full-site-editing'),
        shortName: /* translators: abbreviation for medium size */__('M', 'full-site-editing')
      }, {
        value: 3,
        label: /* translators: label for large size option */__('Large', 'full-site-editing'),
        shortName: /* translators: abbreviation for large size */__('L', 'full-site-editing')
      }];
      const handleAttributeChange = key => value => setAttributes({
        [key]: value
      });
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelBody, {
        title: __('Display Settings', 'full-site-editing'),
        initialOpen: true
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_query_controls__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, {
        numberOfItems: postsToShow,
        onNumberOfItemsChange: _postsToShow => setAttributes({
          postsToShow: _postsToShow || 1
        }),
        specificMode: specificMode,
        onSpecificModeChange: handleAttributeChange('specificMode'),
        specificPosts: specificPosts,
        onSpecificPostsChange: handleAttributeChange('specificPosts'),
        authors: authors,
        onAuthorsChange: handleAttributeChange('authors'),
        categories: categories,
        onCategoriesChange: handleAttributeChange('categories'),
        includeSubcategories: includeSubcategories,
        onIncludeSubcategoriesChange: handleAttributeChange('includeSubcategories'),
        tags: tags,
        onTagsChange: handleAttributeChange('tags'),
        onCustomTaxonomiesChange: handleAttributeChange('customTaxonomies'),
        customTaxonomies: customTaxonomies,
        tagExclusions: tagExclusions,
        onTagExclusionsChange: handleAttributeChange('tagExclusions'),
        categoryExclusions: categoryExclusions,
        onCategoryExclusionsChange: handleAttributeChange('categoryExclusions'),
        postType: postType
      }), postLayout === 'grid' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.RangeControl, {
        label: __('Columns', 'full-site-editing'),
        value: columns,
        onChange: handleAttributeChange('columns'),
        min: 2,
        max: 6,
        required: true
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.BaseControl, {
        label: __('Columns Gap', 'full-site-editing'),
        id: "newspackcolumns-col-gap"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ButtonGroup, {
        id: "newspackcolumns-col-gap",
        "aria-label": __('Columns Gap', 'full-site-editing')
      }, colGapOptions.map(option => {
        const isCurrent = colGap === option.value;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Button, {
          isPrimary: isCurrent,
          "aria-pressed": isCurrent,
          "aria-label": option.label,
          key: option.value,
          onClick: () => setAttributes({
            colGap: option.value
          })
        }, option.shortName);
      }))))), !specificMode && (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isBlogPrivate */ .Wu)() ?
      /*
       * Hide the "Load more posts" button option on private sites.
       *
       * Client-side fetching from a private WP.com blog requires authentication,
       * which is not provided in the current implementation.
       * See https://github.com/Automattic/newspack-blocks/issues/306.
       */
      (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, __('This blog is private, therefore the "Load more posts" feature is not active.', 'full-site-editing')) : !specificMode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show "Load more posts" Button', 'full-site-editing'),
        checked: moreButton,
        onChange: () => setAttributes({
          moreButton: !moreButton
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Use deduplication logic', 'full-site-editing'),
        help: __('If unchecked, this block will be excluded from the deduplication logic and may show duplicate posts.', 'full-site-editing'),
        checked: attributes.deduplicate,
        onChange: () => setAttributes({
          deduplicate: !attributes.deduplicate
        }),
        className: "newspack-blocks-deduplication-toggle"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelBody, {
        title: __('Featured Image Settings', 'full-site-editing')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Featured Image', 'full-site-editing'),
        checked: showImage,
        onChange: () => setAttributes({
          showImage: !showImage
        })
      })), showImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Featured Image Caption', 'full-site-editing'),
        checked: showCaption,
        onChange: () => setAttributes({
          showCaption: !showCaption
        })
      })), showImage && mediaPosition !== 'top' && mediaPosition !== 'behind' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Stack on mobile', 'full-site-editing'),
        checked: mobileStack,
        onChange: () => setAttributes({
          mobileStack: !mobileStack
        })
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.BaseControl, {
        label: __('Featured Image Size', 'full-site-editing'),
        id: "newspackfeatured-image-size"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ButtonGroup, {
        id: "newspackfeatured-image-size",
        "aria-label": __('Featured Image Size', 'full-site-editing')
      }, imageSizeOptions.map(option => {
        const isCurrent = imageScale === option.value;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Button, {
          isPrimary: isCurrent,
          "aria-pressed": isCurrent,
          "aria-label": option.label,
          key: option.value,
          onClick: () => setAttributes({
            imageScale: option.value
          })
        }, option.shortName);
      }))))), showImage && mediaPosition === 'behind' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.RangeControl, {
        label: __('Minimum height', 'full-site-editing'),
        help: __("Sets a minimum height for the block, using a percentage of the screen's current height.", 'full-site-editing'),
        value: minHeight,
        onChange: _minHeight => setAttributes({
          minHeight: _minHeight
        }),
        min: 0,
        max: 100,
        required: true
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelBody, {
        title: __('Post Control Settings', 'full-site-editing')
      }, IS_SUBTITLE_SUPPORTED_IN_THEME && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Subtitle', 'full-site-editing'),
        checked: showSubtitle,
        onChange: () => setAttributes({
          showSubtitle: !showSubtitle
        })
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Excerpt', 'full-site-editing'),
        checked: showExcerpt,
        onChange: () => setAttributes({
          showExcerpt: !showExcerpt
        })
      })), showExcerpt && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.RangeControl, {
        label: __('Max number of words in excerpt', 'full-site-editing'),
        value: excerptLength,
        onChange: value => setAttributes({
          excerptLength: value
        }),
        min: 10,
        max: 100
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Add a "Read More" link', 'full-site-editing'),
        checked: showReadMore,
        onChange: () => setAttributes({
          showReadMore: !showReadMore
        })
      }), showReadMore && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.TextControl, {
        label: __('"Read More" link text', 'full-site-editing'),
        value: readMoreLabel,
        placeholder: readMoreLabel,
        onChange: value => setAttributes({
          readMoreLabel: value
        })
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.RangeControl, {
        className: "type-scale-slider",
        label: __('Type Scale', 'full-site-editing'),
        value: typeScale,
        onChange: _typeScale => setAttributes({
          typeScale: _typeScale
        }),
        min: 1,
        max: 10,
        required: true
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.PanelColorSettings, {
        title: __('Color Settings', 'full-site-editing'),
        initialOpen: true,
        colorSettings: [{
          value: textColor.color,
          onChange: setTextColor,
          label: __('Text Color', 'full-site-editing')
        }]
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelBody, {
        title: __('Post Meta Settings', 'full-site-editing')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Date', 'full-site-editing'),
        checked: showDate,
        onChange: () => setAttributes({
          showDate: !showDate
        })
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Category', 'full-site-editing'),
        checked: showCategory,
        onChange: () => setAttributes({
          showCategory: !showCategory
        })
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Author', 'full-site-editing'),
        checked: showAuthor,
        onChange: () => setAttributes({
          showAuthor: !showAuthor
        })
      })), showAuthor && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.ToggleControl, {
        label: __('Show Author Avatar', 'full-site-editing'),
        checked: showAvatar,
        onChange: () => setAttributes({
          showAvatar: !showAvatar
        })
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_editor_panels__WEBPACK_IMPORTED_MODULE_4__/* .PostTypesPanel */ .O, {
        attributes: attributes,
        setAttributes: setAttributes
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_editor_panels__WEBPACK_IMPORTED_MODULE_4__/* .PostStatusesPanel */ .X, {
        attributes: attributes,
        setAttributes: setAttributes
      }));
    });
  }
  componentDidMount() {
    this.props.triggerReflow();
  }
  componentDidUpdate(props) {
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .shouldReflow */ .pV)(props, this.props)) {
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

    const {
      attributes,
      className,
      setAttributes,
      isSelected,
      latestPosts,
      textColor,
      error
    } = this.props;
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
      textAlign
    } = attributes;
    const classes = classnames__WEBPACK_IMPORTED_MODULE_5___default()(className, {
      'is-grid': postLayout === 'grid',
      'show-image': showImage,
      [`columns-${columns}`]: postLayout === 'grid',
      [`colgap-${colGap}`]: postLayout === 'grid',
      [`ts-${typeScale}`]: typeScale !== '5',
      [`image-align${mediaPosition}`]: showImage,
      [`is-${imageScale}`]: imageScale !== '1' && showImage,
      'mobile-stack': mobileStack,
      [`is-${imageShape}`]: showImage,
      'has-text-color': textColor.color !== '',
      'show-caption': showCaption,
      'show-category': showCategory,
      [`has-text-align-${textAlign}`]: textAlign,
      wpnbha: true
    });
    const blockControls = [{
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A
      }),
      title: __('List View', 'full-site-editing'),
      onClick: () => setAttributes({
        postLayout: 'list'
      }),
      isActive: postLayout === 'list'
    }, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A
      }),
      title: __('Grid View', 'full-site-editing'),
      onClick: () => setAttributes({
        postLayout: 'grid'
      }),
      isActive: postLayout === 'grid'
    }];
    const blockControlsImages = [{
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A
      }),
      title: __('Show media on top', 'full-site-editing'),
      isActive: mediaPosition === 'top',
      onClick: () => setAttributes({
        mediaPosition: 'top'
      })
    }, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A
      }),
      title: __('Show media on left', 'full-site-editing'),
      isActive: mediaPosition === 'left',
      onClick: () => setAttributes({
        mediaPosition: 'left'
      })
    }, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A
      }),
      title: __('Show media on right', 'full-site-editing'),
      isActive: mediaPosition === 'right',
      onClick: () => setAttributes({
        mediaPosition: 'right'
      })
    }, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A
      }),
      title: __('Show media behind', 'full-site-editing'),
      isActive: mediaPosition === 'behind',
      onClick: () => setAttributes({
        mediaPosition: 'behind'
      })
    }];
    const blockControlsImageShape = [{
      icon: landscapeIcon,
      title: __('Landscape Image Shape', 'full-site-editing'),
      isActive: imageShape === 'landscape',
      onClick: () => setAttributes({
        imageShape: 'landscape'
      })
    }, {
      icon: portraitIcon,
      title: __('portrait Image Shape', 'full-site-editing'),
      isActive: imageShape === 'portrait',
      onClick: () => setAttributes({
        imageShape: 'portrait'
      })
    }, {
      icon: squareIcon,
      title: __('Square Image Shape', 'full-site-editing'),
      isActive: imageShape === 'square',
      onClick: () => setAttributes({
        imageShape: 'square'
      })
    }, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A
      }),
      title: __('Uncropped', 'full-site-editing'),
      isActive: imageShape === 'uncropped',
      onClick: () => setAttributes({
        imageShape: 'uncropped'
      })
    }];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: classes,
      style: {
        color: textColor.color
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, latestPosts && (!_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.RichText.isEmpty(sectionHeader) || isSelected) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.RichText, {
      onChange: value => setAttributes({
        sectionHeader: value
      }),
      placeholder: __('Write header…', 'full-site-editing'),
      value: sectionHeader,
      tagName: "h2",
      className: "article-section-title"
    }), latestPosts && !latestPosts.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Placeholder, null, __('Sorry, no posts were found.', 'full-site-editing')), !latestPosts && !error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Placeholder, {
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Spinner, null),
      className: "component-placeholder__align-center"
    }), !latestPosts && error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Placeholder, {
      className: "component-placeholder__align-center newspack-block--error"
    }, error), latestPosts && latestPosts.map(post => this.renderPost(post)))), !specificMode && latestPosts && moreButton && !(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isBlogPrivate */ .Wu)() &&
    /*
     * The "More" button option is hidden for private sites, so we should
     * also hide the button in case it was previously enabled.
     */
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "editor-styles-wrapper wpnbha__wp-block-button__wrapper"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wp-block-button"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.RichText, {
      placeholder: __('Load more posts', 'full-site-editing'),
      value: moreButtonText,
      onChange: value => setAttributes({
        moreButtonText: value
      }),
      className: "wp-block-button__link",
      allowedFormats: []
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Toolbar, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.AlignmentControl, {
      value: textAlign,
      onChange: nextAlign => {
        setAttributes({
          textAlign: nextAlign
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {
      controls: blockControls
    }), showImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {
      controls: blockControlsImages
    }), showImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {
      controls: blockControlsImageShape
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.InspectorControls, null, this.renderInspectorControls()));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_11__.compose)([(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_8__.withColors)({
  textColor: 'color'
}), (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.withSelect)(_utils__WEBPACK_IMPORTED_MODULE_2__/* .postsBlockSelector */ .cR), (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.withDispatch)(_utils__WEBPACK_IMPORTED_MODULE_2__/* .postsBlockDispatch */ .Fl)])(Edit));

/***/ }),

/***/ 8460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W0: () => (/* binding */ settings)
/* harmony export */ });
/* unused harmony exports name, title, icon */
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4997);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2619);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1270);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9015);
/* harmony import */ var _view_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1399);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9546);

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */
const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__,
  _x = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._x;


/**
 * Style dependencies - will load in editor
 */



const {
  name,
  attributes,
  category
} = _block_json__WEBPACK_IMPORTED_MODULE_8__;

// Name must be exported separately.

const title = __('Homepage Posts', 'full-site-editing');
const icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Path, {
  d: "M6.5 14.25H11v-1.5H6.5zM14.5 11.25h-8v-1.5h8zM6.5 8.25h8v-1.5h-8z"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Path, {
  clipRule: "evenodd",
  d: "M4.625 3C3.728 3 3 3.728 3 4.625v11.75C3 17.272 3.728 18 4.625 18h11.75c.897 0 1.625-.728 1.625-1.625V4.625C18 3.728 17.272 3 16.375 3zm11.75 1.5H4.625a.125.125 0 00-.125.125v11.75c0 .069.056.125.125.125h11.75a.125.125 0 00.125-.125V4.625a.125.125 0 00-.125-.125z",
  fillRule: "evenodd"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Path, {
  d: "M20.25 8v11c0 .69-.56 1.25-1.249 1.25H6v1.5h13.001A2.749 2.749 0 0021.75 19V8z"
}));
const settings = {
  title,
  icon: {
    src: icon,
    foreground: '#36f'
  },
  attributes,
  category,
  keywords: [__('posts', 'full-site-editing'), __('articles', 'full-site-editing'), __('latest', 'full-site-editing')],
  description: __('A block for displaying homepage posts.', 'full-site-editing'),
  styles: [{
    name: 'default',
    label: _x('Default', 'block style', 'full-site-editing'),
    isDefault: true
  }, {
    name: 'borders',
    label: _x('Borders', 'block style', 'full-site-editing')
  }],
  supports: {
    html: false,
    align: ['wide', 'full'],
    default: ''
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
  save: () => null,
  // to use view.php
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/latest-posts'],
      transform: ({
        displayPostContent,
        displayPostDate,
        postLayout,
        columns,
        postsToShow,
        categories
      }) => {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)((0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.applyFilters)('blocks.transforms_from_name', 'newspack-blocks/homepage-articles'), {
          showExcerpt: displayPostContent,
          showDate: displayPostDate,
          postLayout,
          columns,
          postsToShow,
          showAuthor: false,
          categories: categories ? [categories] : []
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/latest-posts'],
      transform: ({
        showExcerpt,
        showDate,
        postLayout,
        columns,
        postsToShow,
        categories
      }) => {
        return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)('core/latest-posts', {
          displayPostContent: showExcerpt,
          displayPostDate: showDate,
          postLayout,
          columns,
          postsToShow,
          categories: categories[0] || ''
        });
      }
    }]
  }
};

/***/ }),

/***/ 613:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ STORE_NAMESPACE),
/* harmony export */   n: () => (/* binding */ registerQueryStore)
/* harmony export */ });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2419);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9652);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9111);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8468);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3832);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9546);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(231);
/**
 * External dependencies
 */





/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_6__;
const STORE_NAMESPACE = `newspack-blocks/${name}`;
const initialState = {
  // Map of returned posts to block clientIds.
  postsByBlock: {},
  errorsByBlock: {}
};

// Generic redux action creators, not @wordpress/data actions.
const actions = {
  reflow: () => {
    reduxStore.dispatch({
      type: 'REFLOW'
    });
  }
};

// Generic redux selectors, not @wordpress/data selectors.
const selectors = {
  getPosts({
    clientId
  }) {
    return reduxStore.getState().postsByBlock[clientId];
  },
  getError({
    clientId
  }) {
    return reduxStore.getState().errorsByBlock[clientId];
  },
  isUIDisabled() {
    return reduxStore.getState().isUIDisabled;
  }
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISABLE_UI':
      return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.set)(state, 'isUIDisabled', true);
    case 'ENABLE_UI':
      return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.set)(state, 'isUIDisabled', false);
    case 'UPDATE_BLOCK_POSTS':
      return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.set)(state, ['postsByBlock', action.clientId], action.posts);
    case 'UPDATE_BLOCK_ERROR':
      return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.set)(state, ['errorsByBlock', action.clientId], action.error);
  }
  return state;
};

// create the saga middleware
const sagaMiddleware = (0,redux_saga__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay)();
// mount it on the Store
const reduxStore = (0,redux__WEBPACK_IMPORTED_MODULE_8__/* .createStore */ .y$)(reducer, (0,redux__WEBPACK_IMPORTED_MODULE_8__/* .applyMiddleware */ .Tw)(sagaMiddleware));
const genericStore = {
  getSelectors() {
    return selectors;
  },
  getActions() {
    return actions;
  },
  ...reduxStore
};

/**
 * A cache for posts queries.
 */
const POSTS_QUERIES_CACHE = {};
const createCacheKey = JSON.stringify;

/**
 * Get posts for a single block.
 *
 * @yield
 * @param {Object} block an object with a postsQuery and a clientId
 */
function* getPostsForBlock(block) {
  const cacheKey = createCacheKey(block.postsQuery);
  const restUrl = window.newspack_blocks_data.posts_rest_url;
  let posts = POSTS_QUERIES_CACHE[cacheKey];
  if (posts === undefined) {
    const url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_5__.addQueryArgs)(restUrl, {
      ...block.postsQuery,
      // `context=edit` is needed, so that custom REST fields are returned.
      context: 'edit'
    });
    posts = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .call */ .T1)((_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()), {
      url
    });
    POSTS_QUERIES_CACHE[cacheKey] = posts;
  }
  const postsIds = posts.map(post => post.id);
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .put */ .yJ)({
    type: 'UPDATE_BLOCK_POSTS',
    clientId: block.clientId,
    posts
  });
  return postsIds;
}

/**
 * Whether a block uses deduplication.
 *
 * @param {string} clientId
 *
 * @return {boolean} whether the block uses deduplication
 */
function shouldDeduplicate(clientId) {
  const {
    getBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor');
  const block = getBlock(clientId);
  return block?.attributes?.deduplicate;
}
const createFetchPostsSaga = blockNames => {
  /**
   * "worker" Saga: will be fired on REFLOW actions
   *
   * @yield
   */
  function* fetchPosts() {
    // debounce by 300ms
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .delay */ .cb)(300);
    const {
      getBlocks
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor');
    const {
      getCurrentPostId
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/editor');
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .put */ .yJ)({
      type: 'DISABLE_UI'
    });

    // Ensure innerBlocks are populated for widget area blocks.
    // See https://github.com/WordPress/gutenberg/issues/32607#issuecomment-890728216.
    const blocks = getBlocks().map(block => {
      const innerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor').getBlocks(block.clientId);
      return {
        ...block,
        innerBlocks
      };
    });
    const blockQueries = (0,_utils__WEBPACK_IMPORTED_MODULE_7__/* .getBlockQueries */ .yG)(blocks, blockNames);

    // Use requested specific posts ids as the starting state of exclusion list.
    const specificPostsId = blockQueries.reduce((acc, {
      clientId,
      postsQuery
    }) => {
      if (shouldDeduplicate(clientId) && postsQuery.include) {
        acc = [...acc, ...postsQuery.include];
      }
      return acc;
    }, []);
    let exclude = (0,_utils__WEBPACK_IMPORTED_MODULE_7__/* .sanitizePostList */ .kN)([...specificPostsId, getCurrentPostId()]);
    while (blockQueries.length) {
      const nextBlock = blockQueries.shift();
      const deduplicate = shouldDeduplicate(nextBlock.clientId);
      if (deduplicate) {
        nextBlock.postsQuery.exclude = exclude;
      }
      let fetchedPostIds = [];
      try {
        fetchedPostIds = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .call */ .T1)(getPostsForBlock, nextBlock);
      } catch (e) {
        yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .put */ .yJ)({
          type: 'UPDATE_BLOCK_ERROR',
          clientId: nextBlock.clientId,
          error: e.message
        });
      }
      if (deduplicate) {
        exclude = [...exclude, ...fetchedPostIds];
      }
    }
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .put */ .yJ)({
      type: 'ENABLE_UI'
    });
  }

  /**
   * Starts fetchPosts on each dispatched `REFLOW` action.
   *
   * fetchPosts will wait 300ms before fetching. Thanks to takeLatest,
   * if new reflow happens during this time, the reflow from before
   * will be cancelled.
   *
   * @yield
   */
  return function* fetchPostsSaga() {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__/* .takeLatest */ .p8)('REFLOW', fetchPosts);
  };
};
const registerQueryStore = blockNames => {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.register)({
    name: STORE_NAMESPACE,
    instantiate: () => genericStore
  });

  // Run the saga ✨
  sagaMiddleware.run(createFetchPostsSaga(blockNames));
};

/***/ }),

/***/ 231:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fl: () => (/* binding */ postsBlockDispatch),
/* harmony export */   Wu: () => (/* binding */ isBlogPrivate),
/* harmony export */   cR: () => (/* binding */ postsBlockSelector),
/* harmony export */   kN: () => (/* binding */ sanitizePostList),
/* harmony export */   pV: () => (/* binding */ shouldReflow),
/* harmony export */   yG: () => (/* binding */ getBlockQueries)
/* harmony export */ });
/* unused harmony exports queryCriteriaFromAttributes, getEditorBlocksIds */
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8468);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(613);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;


/**
 * Based global WP.com blog_public option, checks whether current blog is
 * private or not.
 */
const isBlogPrivate = () =>  true && window.wpcomGutenberg && Number(window.wpcomGutenberg.blogPublic) === -1;

/**
 * Block attributes which influence posts query
 */
const POST_QUERY_ATTRIBUTES = ['postsToShow', 'authors', 'categories', 'includeSubcategories', 'excerptLength', 'tags', 'customTaxonomies', 'showExcerpt', 'specificPosts', 'specificMode', 'tagExclusions', 'categoryExclusions', 'postType', 'includedPostStatuses', 'deduplicate'];
/**
 * Does the props change necessitate a reflow?
 * A reflow should happen if:
 * 1. Query-changing attributes of a block change
 * 2. The top-level blocks order changes. A Homepage Articles
 *    block might be nested somewhere.
 */
const shouldReflow = (prevProps, props) => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)((0,lodash__WEBPACK_IMPORTED_MODULE_0__.pick)(prevProps.attributes, POST_QUERY_ATTRIBUTES), (0,lodash__WEBPACK_IMPORTED_MODULE_0__.pick)(props.attributes, POST_QUERY_ATTRIBUTES)) || !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(prevProps.topBlocksClientIdsInOrder, props.topBlocksClientIdsInOrder);

/**
 * Builds query criteria from given attributes.
 */
const queryCriteriaFromAttributes = attributes => {
  const {
    postsToShow,
    authors,
    categories,
    includeSubcategories,
    excerptLength,
    postType,
    showExcerpt,
    tags,
    customTaxonomies,
    specificPosts = [],
    specificMode,
    tagExclusions,
    categoryExclusions,
    includedPostStatuses
  } = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.pick)(attributes, POST_QUERY_ATTRIBUTES);
  const cleanPosts = sanitizePostList(specificPosts);
  const isSpecificPostModeActive = specificMode && cleanPosts && cleanPosts.length;
  const criteria = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.pickBy)(isSpecificPostModeActive ? {
    include: cleanPosts,
    postsToShow: specificPosts.length,
    postType
  } : {
    postsToShow,
    categories,
    includeSubcategories,
    authors,
    tags,
    tagExclusions,
    categoryExclusions,
    customTaxonomies,
    postType,
    includedPostStatuses
  }, value => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(value));
  criteria.excerptLength = excerptLength;
  criteria.showExcerpt = showExcerpt;
  return criteria;
};
const sanitizePostList = postList => postList.map(id => parseInt(id)).filter(id => id > 0);

/**
 * Each eligible block's attributes can be used to create a posts query.
 * This function is recursively traversing an array of blocks and creating an aray
 * of {postsQuery, clientId} objects.
 * The eligible blocks are identified by block name, passed in the second argument.
 */
const getBlockQueries = (blocks, blockNames) => blocks.flatMap(block => {
  const homepageArticleBlocks = [];
  if (blockNames.indexOf(block.name) >= 0) {
    const postsQuery = queryCriteriaFromAttributes(block.attributes);
    homepageArticleBlocks.push({
      postsQuery,
      clientId: block.clientId
    });
  }
  return homepageArticleBlocks.concat(getBlockQueries(block.innerBlocks, blockNames));
});
const getEditorBlocksIds = blocks => blocks.flatMap(block => {
  const homepageArticleBlocks = [];
  homepageArticleBlocks.push(block.clientId);
  return homepageArticleBlocks.concat(getEditorBlocksIds(block.innerBlocks));
});
const PREVIEW_IMAGE_BASE = window.newspack_blocks_data.assets_path;
const generatePreviewPost = id => {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  return {
    author: 1,
    content: {
      rendered: '<p>' + __('The post content.', 'newspack-blocks') + '</p>'
    },
    date_gmt: now.toISOString(),
    excerpt: {
      rendered: '<p>' + __('The post excerpt.', 'newspack-blocks') + '</p>'
    },
    featured_media: '1',
    id,
    meta: {
      newspack_post_subtitle: __('Post Subtitle', 'newspack-blocks')
    },
    title: {
      rendered: __('Post Title', 'newspack-blocks')
    },
    newspack_article_classes: 'type-post',
    newspack_author_info: [{
      display_name: __('Author Name', 'newspack-blocks'),
      avatar: `<div style="background: #36f;width: 40px;height: 40px;display: block;overflow: hidden;border-radius: 50%; max-width: 100%; max-height: 100%;"></div>`,
      id: 1,
      author_link: '/'
    }],
    newspack_category_info: __('Category', 'newspack-blocks'),
    newspack_featured_image_caption: __('Featured image caption', 'newspack-blocks'),
    newspack_featured_image_src: {
      large: `${PREVIEW_IMAGE_BASE}/newspack-1024x536.jpg`,
      landscape: `${PREVIEW_IMAGE_BASE}/newspack-800x600.jpg`,
      portrait: `${PREVIEW_IMAGE_BASE}/newspack-600x800.jpg`,
      square: `${PREVIEW_IMAGE_BASE}/newspack-800x800.jpg`,
      uncropped: `${PREVIEW_IMAGE_BASE}/newspack-1024x536.jpg`
    },
    newspack_has_custom_excerpt: false,
    newspack_post_sponsors: false
  };
};
const getPreviewPosts = attributes => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.times)(attributes.postsToShow, generatePreviewPost);
/**
 * wordpress/data selector for blocks using this custom store.
 */
const postsBlockSelector = (select, {
  clientId,
  attributes
}) => {
  const {
    getEditedPostAttribute
  } = select('core/editor');
  const editorBlocks = getEditedPostAttribute('blocks') || [];
  const {
    getBlocks
  } = select('core/block-editor');
  const editorBlocksIds = getEditorBlocksIds(editorBlocks);
  const blocks = getBlocks();
  const isWidgetEditor = blocks.some(block => block.name === 'core/widget-area');
  // The block might be rendered in the block styles preview, not in the editor.
  const isEditorBlock = editorBlocksIds.length === 0 || editorBlocksIds.indexOf(clientId) >= 0 || isWidgetEditor;
  const {
    getPosts,
    getError,
    isUIDisabled
  } = select(_store__WEBPACK_IMPORTED_MODULE_2__/* .STORE_NAMESPACE */ .C);
  const props = {
    isEditorBlock,
    isUIDisabled: isUIDisabled(),
    error: getError({
      clientId
    }),
    topBlocksClientIdsInOrder: blocks.map(block => block.clientId),
    latestPosts: isEditorBlock ? getPosts({
      clientId
    }) :
    // For block preview, display static content.
    getPreviewPosts(attributes)
  };
  return props;
};

/**
 * wordpress/data dispatch for blocks using this custom store.
 */
const postsBlockDispatch = (dispatch, {
  isEditorBlock
}) => {
  return {
    // Only editor blocks can trigger reflows.
    triggerReflow: isEditorBlock ? dispatch(_store__WEBPACK_IMPORTED_MODULE_2__/* .STORE_NAMESPACE */ .C).reflow : () => undefined
  };
};

/***/ }),

/***/ 3033:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4586);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8468);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _autocomplete_tokenfield_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(115);


/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


/**
 * An multi-selecting, api-driven autocomplete input suitable for use in block attributes.
 */
class AutocompleteTokenField extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    /**
     * If the component has tokens passed in props, it should fetch info after it mounts.
     */
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(this, "isFetchingInfoOnLoad", () => {
      const {
        tokens,
        fetchSavedInfo
      } = this.props;
      return Boolean(tokens.length && fetchSavedInfo);
    });
    this.state = {
      suggestions: [],
      validValues: {},
      loading: this.isFetchingInfoOnLoad()
    };
    this.debouncedUpdateSuggestions = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)(this.updateSuggestions, 500);
  }
  /**
   * When the component loads, fetch information about the tokens so we can populate
   * the tokens with the correct labels.
   */
  componentDidMount() {
    if (this.isFetchingInfoOnLoad()) {
      const {
        tokens,
        fetchSavedInfo
      } = this.props;
      fetchSavedInfo(tokens).then(results => {
        const {
          validValues
        } = this.state;
        results.forEach(suggestion => {
          validValues[suggestion.value] = suggestion.label;
        });
        this.setState({
          validValues,
          loading: false
        });
      });
    }
  }

  /**
   * Clean up any unfinished autocomplete api call requests.
   */
  componentWillUnmount() {
    delete this.suggestionsRequest;
    this.debouncedUpdateSuggestions.cancel();
  }

  /**
   * Get a list of labels for input values.
   *
   * @param {Array} values Array of values (ids, etc.).
   * @return {Array} array of valid labels corresponding to the values.
   */
  getLabelsForValues(values) {
    const {
      validValues
    } = this.state;
    return values.reduce((accumulator, value) => validValues[value] ? [...accumulator, validValues[value]] : accumulator, []);
  }

  /**
   * Get a list of values for input labels.
   *
   * @param {Array} labels Array of labels from the tokens.
   * @return {Array} Array of valid values corresponding to the labels.
   */
  getValuesForLabels(labels) {
    const {
      validValues
    } = this.state;
    return labels.map(label => Object.keys(validValues).find(key => validValues[key] === label));
  }

  /**
   * Refresh the autocomplete dropdown.
   *
   * @param {string} input Input to fetch suggestions for
   */
  updateSuggestions(input) {
    const {
      fetchSuggestions
    } = this.props;
    if (!fetchSuggestions) {
      return;
    }
    this.setState({
      loading: true
    }, () => {
      const request = fetchSuggestions(input);
      request.then(suggestions => {
        // A fetch Promise doesn't have an abort option. It's mimicked by
        // comparing the request reference in on the instance, which is
        // reset or deleted on subsequent requests or unmounting.
        if (this.suggestionsRequest !== request) {
          return;
        }
        const {
          validValues
        } = this.state;
        const currentSuggestions = [];
        suggestions.forEach(suggestion => {
          const trimmedSuggestionLabel = suggestion.label.trim();
          const duplicatedSuggestionIndex = currentSuggestions.indexOf(trimmedSuggestionLabel);
          if (duplicatedSuggestionIndex >= 0) {
            suggestion.label = `${trimmedSuggestionLabel} (${suggestion.value})`;
          }
          currentSuggestions.push(trimmedSuggestionLabel);
          validValues[suggestion.value] = trimmedSuggestionLabel;
        });
        this.setState({
          suggestions: currentSuggestions,
          validValues,
          loading: false
        });
      }).catch(() => {
        if (this.suggestionsRequest === request) {
          this.setState({
            loading: false
          });
        }
      });
      this.suggestionsRequest = request;
    });
  }

  /**
   * When a token is selected, we need to convert the string label into a recognized value suitable for saving as an attribute.
   *
   * @param {Array} tokenStrings An array of token label strings.
   */
  handleOnChange(tokenStrings) {
    const {
      onChange
    } = this.props;
    onChange(this.getValuesForLabels(tokenStrings));
  }

  /**
   * To populate the tokens, we need to convert the values into a human-readable label.
   *
   * @return {Array} An array of token label strings.
   */
  getTokens() {
    const {
      tokens
    } = this.props;
    return this.getLabelsForValues(tokens);
  }

  /**
   * Render.
   */
  render() {
    const {
      help,
      label = ''
    } = this.props;
    const {
      suggestions,
      loading
    } = this.state;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "autocomplete-tokenfield"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
      value: this.getTokens(),
      suggestions: suggestions,
      onChange: tokens => this.handleOnChange(tokens),
      onInputChange: input => this.debouncedUpdateSuggestions(input),
      label: label
    }), loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), help && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "autocomplete-tokenfield__help"
    }, help));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutocompleteTokenField);

/***/ }),

/***/ 6994:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ PostTypesPanel),
/* harmony export */   X: () => (/* binding */ PostStatusesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7143);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);

/**
 * WordPress dependencies
 */

const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;


const CheckboxesGroup = ({
  options,
  values,
  onChange
}) => {
  if (!Array.isArray(options)) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null);
  }
  return options.map(({
    name,
    slug
  }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
    key: slug
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
    label: name,
    checked: values.indexOf(slug) > -1,
    onChange: value => {
      const cleanPostType = [...new Set(values)];
      if (value && cleanPostType.indexOf(slug) === -1) {
        cleanPostType.push(slug);
      } else if (!value && cleanPostType.indexOf(slug) > -1) {
        cleanPostType.splice(cleanPostType.indexOf(slug), 1);
      }
      onChange(cleanPostType);
    }
  })));
};
const PostTypesPanel = ({
  attributes,
  setAttributes
}) => {
  const {
    availablePostTypes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const {
      getPostTypes
    } = select('core');
    return {
      availablePostTypes: getPostTypes({
        per_page: -1
      })?.filter(({
        supports: {
          newspack_blocks: newspackBlocks
        }
      }) => newspackBlocks)
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: __('Post Types', 'full-site-editing')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxesGroup, {
    options: availablePostTypes,
    values: attributes.postType,
    onChange: postType => setAttributes({
      postType
    })
  }));
};
const PostStatusesPanel = ({
  attributes,
  setAttributes
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: __('Additional Post Statuses', 'full-site-editing')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, __('Selection here has effect only for editors, regular users will only see published posts.', 'full-site-editing'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxesGroup, {
    values: attributes.includedPostStatuses,
    options: [{
      name: 'Draft',
      slug: 'draft'
    }, {
      name: 'Scheduled',
      slug: 'future'
    }],
    onChange: includedPostStatuses => setAttributes({
      includedPostStatuses
    })
  }));
};

/***/ }),

/***/ 2216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4586);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6427);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1455);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3832);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8537);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3033);


/**
 * WordPress dependencies
 */

const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;






/**
 * Internal dependencies.
 */

const getCategoryTitle = category => (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(category.name) || __('(no title)', 'full-site-editing');
const getTermTitle = term => (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(term.name) || __('(no title)', 'full-site-editing');
class QueryControls extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "state", {
      showAdvancedFilters: false
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchPostSuggestions", search => {
      const {
        postType
      } = this.props;
      const restUrl = window.newspack_blocks_data.specific_posts_rest_url;
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        url: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(restUrl, {
          search,
          postsToShow: 20,
          _fields: 'id,title',
          type: 'post',
          postType
        })
      }).then(function (posts) {
        const result = posts.map(post => ({
          value: post.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(post.title) || __('(no title)', 'full-site-editing')
        }));
        return result;
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchSavedPosts", postIDs => {
      const {
        postType
      } = this.props;
      const restUrl = window.newspack_blocks_data.posts_rest_url;
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        url: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(restUrl, {
          // These params use the block query parameters (see Newspack_Blocks::build_articles_query).
          postsToShow: 100,
          include: postIDs.join(','),
          _fields: 'id,title',
          postType
        })
      }).then(function (posts) {
        return posts.map(post => ({
          value: post.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(post.title.rendered) || __('(no title)', 'full-site-editing')
        }));
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchAuthorSuggestions", search => {
      const restUrl = window.newspack_blocks_data.authors_rest_url;
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        url: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(restUrl, {
          search,
          per_page: 20,
          fields: 'id,name'
        })
      }).then(function (users) {
        return users.map(user => ({
          value: user.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(user.name) || __('(no name)', 'full-site-editing')
        }));
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchSavedAuthors", userIDs => {
      const restUrl = window.newspack_blocks_data.authors_rest_url;
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        url: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(restUrl, {
          per_page: 100,
          include: userIDs.join(','),
          fields: 'id,name'
        })
      }).then(function (users) {
        return users.map(user => ({
          value: user.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(user.name) || __('(no name)', 'full-site-editing')
        }));
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchCategorySuggestions", search => {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)('/wp/v2/categories', {
          search,
          per_page: 20,
          _fields: 'id,name,parent',
          orderby: 'count',
          order: 'desc'
        })
      }).then(categories => Promise.all(categories.map(category => {
        if (category.parent > 0) {
          return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
            path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(`/wp/v2/categories/${category.parent}`, {
              _fields: 'name'
            })
          }).then(parentCategory => ({
            value: category.id,
            label: `${getCategoryTitle(category)} – ${getCategoryTitle(parentCategory)}`
          }));
        }
        return Promise.resolve({
          value: category.id,
          label: getCategoryTitle(category)
        });
      })));
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchSavedCategories", categoryIDs => {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)('/wp/v2/categories', {
          per_page: 100,
          _fields: 'id,name',
          include: categoryIDs.join(',')
        })
      }).then(function (categories) {
        return categories.map(category => ({
          value: category.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(category.name) || __('(no title)', 'full-site-editing')
        }));
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchTagSuggestions", search => {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)('/wp/v2/tags', {
          search,
          per_page: 20,
          _fields: 'id,name',
          orderby: 'count',
          order: 'desc'
        })
      }).then(function (tags) {
        return tags.map(tag => ({
          value: tag.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(tag.name) || __('(no title)', 'full-site-editing')
        }));
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchSavedTags", tagIDs => {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)('/wp/v2/tags', {
          per_page: 100,
          _fields: 'id,name',
          include: tagIDs.join(',')
        })
      }).then(function (tags) {
        return tags.map(tag => ({
          value: tag.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(tag.name) || __('(no title)', 'full-site-editing')
        }));
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchCustomTaxonomiesSuggestions", (taxSlug, search) => {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(`/wp/v2/${taxSlug}`, {
          search,
          per_page: 20,
          _fields: 'id,name,parent',
          orderby: 'count',
          order: 'desc'
        })
      }).then(terms => Promise.all(terms.map(term => {
        if (term.parent > 0) {
          return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
            path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(`/wp/v2/${taxSlug}/${term.parent}`, {
              _fields: 'name'
            })
          }).then(parentTerm => ({
            value: term.id,
            label: `${getTermTitle(term)} – ${getTermTitle(parentTerm)}`
          }));
        }
        return Promise.resolve({
          value: term.id,
          label: getTermTitle(term)
        });
      })));
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "fetchSavedCustomTaxonomies", (taxSlug, termIDs) => {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(`/wp/v2/${taxSlug}`, {
          per_page: 100,
          _fields: 'id,name',
          include: termIDs.join(',')
        })
      }).then(function (terms) {
        return terms.map(term => ({
          value: term.id,
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_5__.decodeEntities)(term.name) || __('(no title)', 'full-site-editing')
        }));
      });
    });
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(this, "render", () => {
      const {
        specificMode,
        onSpecificModeChange,
        specificPosts,
        onSpecificPostsChange,
        authors,
        onAuthorsChange,
        categories,
        onCategoriesChange,
        includeSubcategories,
        onIncludeSubcategoriesChange,
        tags,
        onTagsChange,
        customTaxonomies,
        onCustomTaxonomiesChange,
        tagExclusions,
        onTagExclusionsChange,
        categoryExclusions,
        onCategoryExclusionsChange,
        enableSpecific
      } = this.props;
      const {
        showAdvancedFilters
      } = this.state;
      const registeredCustomTaxonomies = window.newspack_blocks_data?.custom_taxonomies;
      const customTaxonomiesPrepareChange = (taxSlug, value) => {
        let newValue = customTaxonomies.filter(tax => tax.slug !== taxSlug);
        newValue = [...newValue, {
          slug: taxSlug,
          terms: value
        }];
        onCustomTaxonomiesChange(newValue);
      };
      const getTermsOfCustomTaxonomy = taxSlug => {
        const tax = customTaxonomies.find(taxObj => taxObj.slug === taxSlug);
        return tax ? tax.terms : [];
      };
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, enableSpecific && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        checked: specificMode,
        onChange: onSpecificModeChange,
        label: __('Choose Specific Posts', 'full-site-editing')
      }), specificMode ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        tokens: specificPosts || [],
        onChange: onSpecificPostsChange,
        fetchSuggestions: this.fetchPostSuggestions,
        fetchSavedInfo: this.fetchSavedPosts,
        label: __('Posts', 'full-site-editing'),
        help: __('Begin typing post title, click autocomplete result to select.', 'full-site-editing')
      }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.QueryControls, this.props), onAuthorsChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        tokens: authors || [],
        onChange: onAuthorsChange,
        fetchSuggestions: this.fetchAuthorSuggestions,
        fetchSavedInfo: this.fetchSavedAuthors,
        label: __('Authors', 'full-site-editing')
      }), onCategoriesChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        tokens: categories || [],
        onChange: onCategoriesChange,
        fetchSuggestions: this.fetchCategorySuggestions,
        fetchSavedInfo: this.fetchSavedCategories,
        label: __('Categories', 'full-site-editing')
      }), onIncludeSubcategoriesChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        checked: includeSubcategories,
        onChange: onIncludeSubcategoriesChange,
        label: __('Include subcategories ', 'full-site-editing')
      }), onTagsChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        tokens: tags || [],
        onChange: onTagsChange,
        fetchSuggestions: this.fetchTagSuggestions,
        fetchSavedInfo: this.fetchSavedTags,
        label: __('Tags', 'full-site-editing')
      }), onCustomTaxonomiesChange && registeredCustomTaxonomies.map(tax => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        key: `${customTaxonomies[tax.slug]}-selector`,
        tokens: getTermsOfCustomTaxonomy(tax.slug),
        onChange: value => {
          customTaxonomiesPrepareChange(tax.slug, value);
        },
        fetchSuggestions: search => this.fetchCustomTaxonomiesSuggestions(tax.slug, search),
        fetchSavedInfo: termIds => this.fetchSavedCustomTaxonomies(tax.slug, termIds),
        label: tax.label
      })), onTagExclusionsChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        isLink: true,
        onClick: () => this.setState({
          showAdvancedFilters: !showAdvancedFilters
        })
      }, showAdvancedFilters ? __('Hide Advanced Filters', 'full-site-editing') : __('Show Advanced Filters', 'full-site-editing'))), showAdvancedFilters && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, onTagExclusionsChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        tokens: tagExclusions || [],
        onChange: onTagExclusionsChange,
        fetchSuggestions: this.fetchTagSuggestions,
        fetchSavedInfo: this.fetchSavedTags,
        label: __('Excluded Tags', 'full-site-editing')
      }), onCategoryExclusionsChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_autocomplete_tokenfield__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        tokens: categoryExclusions || [],
        onChange: onCategoryExclusionsChange,
        fetchSuggestions: this.fetchCategorySuggestions,
        fetchSavedInfo: this.fetchSavedCategories,
        label: __('Excluded Categories', 'full-site-editing')
      }))));
    });
  }
}
QueryControls.defaultProps = {
  enableSpecific: true,
  specificPosts: [],
  authors: [],
  categories: [],
  tags: [],
  customTaxonomies: [],
  tagExclusions: []
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryControls);

/***/ }),

/***/ 723:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Az: () => (/* binding */ formatAvatars),
/* harmony export */   NQ: () => (/* binding */ formatByline),
/* harmony export */   X8: () => (/* binding */ getPostStatusLabel),
/* harmony export */   __: () => (/* binding */ formatSponsorLogos),
/* harmony export */   vQ: () => (/* binding */ formatSponsorByline)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6087);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const _x = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x,
  __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__;

const formatAvatars = authorInfo => authorInfo.map(author => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "avatar author-avatar",
  key: author.id
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
  className: "url fn n",
  href: author.author_link
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, null, author.avatar))));
const formatByline = authorInfo => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "byline"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "author-prefix"
}, _x('by', 'post author', 'full-site-editing')), ' ', authorInfo.reduce((accumulator, author, index) => {
  return [...accumulator, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "author vcard",
    key: author.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "url fn n",
    href: author.author_link
  }, author.display_name)), index < authorInfo.length - 2 && ', ', authorInfo.length > 1 && index === authorInfo.length - 2 && _x(' and ', 'post author', 'full-site-editing')];
}, []));
const formatSponsorLogos = sponsorInfo => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "sponsor-logos"
}, sponsorInfo.map(sponsor => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
  key: sponsor.id
}, sponsor.src && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
  href: sponsor.sponsor_url
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
  src: sponsor.src,
  width: sponsor.img_width,
  height: sponsor.img_height,
  alt: sponsor.sponsor_name
})))));
const formatSponsorByline = sponsorInfo => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: "byline sponsor-byline"
}, sponsorInfo[0].byline_prefix, ' ', sponsorInfo.reduce((accumulator, sponsor, index) => {
  return [...accumulator, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "author",
    key: sponsor.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: sponsor.author_link
  }, sponsor.sponsor_name)), index < sponsorInfo.length - 2 && ', ', sponsorInfo.length > 1 && index === sponsorInfo.length - 2 && _x(' and ', 'post author', 'full-site-editing')];
}, []));
const getPostStatusLabel = (post = {}) => post.post_status !== 'publish' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "newspack-preview-label"
}, {
  draft: __('Draft', 'full-site-editing'),
  future: __('Scheduled', 'full-site-editing')
}[post.post_status]) : null;

/***/ }),

/***/ 1609:
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ 8468:
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ 1455:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ 4715:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

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

/***/ 8443:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["date"];

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

/***/ 8537:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["htmlEntities"];

/***/ }),

/***/ 7723:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ 5573:
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

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

/***/ 9740:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _objectSpread2)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4586);

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

/***/ }),

/***/ 7502:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
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

/***/ 9546:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"homepage-articles","category":"newspack","attributes":{"className":{"type":"string","default":""},"showExcerpt":{"type":"boolean","default":true},"excerptLength":{"type":"number","default":55},"showReadMore":{"type":"boolean","default":false},"readMoreLabel":{"type":"string","default":"Keep reading"},"showDate":{"type":"boolean","default":true},"showImage":{"type":"boolean","default":true},"showCaption":{"type":"boolean","default":false},"disableImageLazyLoad":{"type":"boolean","default":false},"fetchPriority":{"type":"string","default":""},"imageShape":{"type":"string","default":"landscape"},"minHeight":{"type":"integer","default":0},"moreButton":{"type":"boolean","default":false},"moreButtonText":{"type":"string","default":""},"showAuthor":{"type":"boolean","default":true},"showAvatar":{"type":"boolean","default":true},"showCategory":{"type":"boolean","default":false},"postLayout":{"type":"string","default":"list"},"columns":{"type":"integer","default":3},"colGap":{"type":"integer","default":3},"postsToShow":{"type":"integer","default":3},"mediaPosition":{"type":"string","default":"top"},"authors":{"type":"array","default":[],"items":{"type":"integer"}},"categories":{"type":"array","default":[],"items":{"type":"integer"}},"includeSubcategories":{"type":"boolean","default":true},"tags":{"type":"array","default":[],"items":{"type":"integer"}},"customTaxonomies":{"type":"array","default":[],"items":{"type":"object","properties":{"slug":{"type":"string"},"terms":{"type":"array","items":{"type":"integer"}}}}},"tagExclusions":{"type":"array","default":[],"items":{"type":"integer"}},"categoryExclusions":{"type":"array","default":[],"items":{"type":"integer"}},"specificPosts":{"type":"array","default":[],"items":{"type":"integer"}},"typeScale":{"type":"integer","default":4},"imageScale":{"type":"integer","default":3},"mobileStack":{"type":"boolean","default":false},"sectionHeader":{"type":"string","default":""},"specificMode":{"type":"boolean","default":false},"textColor":{"type":"string","default":""},"customTextColor":{"type":"string","default":""},"singleMode":{"type":"boolean","default":false},"showSubtitle":{"type":"boolean","default":false},"postType":{"type":"array","default":["post"],"items":{"type":"string"}},"textAlign":{"type":"string","default":"left"},"includedPostStatuses":{"type":"array","default":["publish"],"items":{"type":"string"}},"deduplicate":{"type":"boolean","default":true}}}');

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4997);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2619);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7723);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2519);
/* harmony import */ var _synced_newspack_blocks_blocks_homepage_articles_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8460);
/* harmony import */ var _synced_newspack_blocks_blocks_homepage_articles_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(613);



const __ = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__;




/**
 * Block name in the A8C\FSE context.
 */
const blockName = 'a8c/blog-posts';
function setBlockTransformationName(name) {
  return name !== 'newspack-blocks/homepage-articles' ? name : blockName;
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.transforms_from_name', 'set-transformed-block-name', setBlockTransformationName);
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(blockName, {
  ..._synced_newspack_blocks_blocks_homepage_articles_index__WEBPACK_IMPORTED_MODULE_4__/* .settings */ .W0,
  title: __('Blog Posts', 'full-site-editing'),
  category: 'widgets'
});

// The Blog Posts block and Carousel block should use the same store, so that deduplication is handled
// between these blocks.
(0,_synced_newspack_blocks_blocks_homepage_articles_store__WEBPACK_IMPORTED_MODULE_5__/* .registerQueryStore */ .n)([blockName, _consts__WEBPACK_IMPORTED_MODULE_3__/* .CAROUSEL_BLOCK_NAME */ .t]);
})();

window.EditingToolkit = __webpack_exports__;
/******/ })()
;
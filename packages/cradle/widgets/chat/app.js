/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/index.ts":
/*!*************************!*\
  !*** ./client/index.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var most__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! most */ "./node_modules/most/src/index.js");

const messageTemplate = document.querySelector('#chat-message');
const messagesDom = document.querySelector('.messages');
const inputBox = document.querySelector('#chat-input');
const remoteMessage$ = Object(most__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])('message', window);
const input$ = Object(most__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])('change', document.querySelector('#chat-input'))
    .map(e => e.target.value);
const sendMessage$ = Object(most__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])('submit', document.querySelector('#chat-form'))
    .tap(e => e.preventDefault());
const localMessage$ = input$.sampleWith(sendMessage$);
function appendMessage(message) {
    const clone = document.importNode(messageTemplate.content, true);
    clone.querySelector('.sender').textContent = 'me';
    clone.querySelector('.time').textContent = new Date().toLocaleTimeString();
    clone.querySelector('.body').textContent = message;
    messagesDom.appendChild(clone);
    messagesDom.scrollTop = messagesDom.scrollHeight;
}
localMessage$.observe(e => {
    window.parent.postMessage(e, '*');
    appendMessage(e);
    inputBox.value = "";
});
remoteMessage$.observe(console.log);
remoteMessage$
    .map(ev => ev.data)
    .observe(appendMessage);


/***/ }),

/***/ "./node_modules/@most/multicast/dist/multicast.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/@most/multicast/dist/multicast.es.js ***!
  \***********************************************************/
/*! exports provided: MulticastSource, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MulticastSource", function() { return MulticastSource; });
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");


var MulticastDisposable = function MulticastDisposable (source, sink) {
  this.source = source
  this.sink = sink
  this.disposed = false
};

MulticastDisposable.prototype.dispose = function dispose () {
  if (this.disposed) {
    return
  }
  this.disposed = true
  var remaining = this.source.remove(this.sink)
  return remaining === 0 && this.source._dispose()
};

function tryEvent (t, x, sink) {
  try {
    sink.event(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

function tryEnd (t, x, sink) {
  try {
    sink.end(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

var dispose = function (disposable) { return disposable.dispose(); }

var emptyDisposable = {
  dispose: function dispose$1 () {}
}

var MulticastSource = function MulticastSource (source) {
  this.source = source
  this.sinks = []
  this._disposable = emptyDisposable
};

MulticastSource.prototype.run = function run (sink, scheduler) {
  var n = this.add(sink)
  if (n === 1) {
    this._disposable = this.source.run(this, scheduler)
  }
  return new MulticastDisposable(this, sink)
};

MulticastSource.prototype._dispose = function _dispose () {
  var disposable = this._disposable
  this._disposable = emptyDisposable
  return Promise.resolve(disposable).then(dispose)
};

MulticastSource.prototype.add = function add (sink) {
  this.sinks = Object(_most_prelude__WEBPACK_IMPORTED_MODULE_0__["append"])(sink, this.sinks)
  return this.sinks.length
};

MulticastSource.prototype.remove = function remove$1 (sink) {
  var i = Object(_most_prelude__WEBPACK_IMPORTED_MODULE_0__["findIndex"])(sink, this.sinks)
  // istanbul ignore next
  if (i >= 0) {
    this.sinks = Object(_most_prelude__WEBPACK_IMPORTED_MODULE_0__["remove"])(i, this.sinks)
  }

  return this.sinks.length
};

MulticastSource.prototype.event = function event (time, value) {
  var s = this.sinks
  if (s.length === 1) {
    return s[0].event(time, value)
  }
  for (var i = 0; i < s.length; ++i) {
    tryEvent(time, value, s[i])
  }
};

MulticastSource.prototype.end = function end (time, value) {
  var s = this.sinks
  for (var i = 0; i < s.length; ++i) {
    tryEnd(time, value, s[i])
  }
};

MulticastSource.prototype.error = function error (time, err) {
  var s = this.sinks
  for (var i = 0; i < s.length; ++i) {
    s[i].error(time, err)
  }
};

function multicast (stream) {
  var source = stream.source
  return source instanceof MulticastSource
    ? stream
    : new stream.constructor(new MulticastSource(source))
}

/* harmony default export */ __webpack_exports__["default"] = (multicast);
//# sourceMappingURL=multicast.es.js.map


/***/ }),

/***/ "./node_modules/@most/prelude/dist/index.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/@most/prelude/dist/index.es.js ***!
  \*****************************************************/
/*! exports provided: cons, append, drop, tail, copy, map, reduce, replace, remove, removeAll, findIndex, isArrayLike, id, compose, apply, curry2, curry3, curry4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cons", function() { return cons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drop", function() { return drop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tail", function() { return tail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAll", function() { return removeAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return apply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curry2", function() { return curry2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curry3", function() { return curry3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curry4", function() { return curry4; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */

// Non-mutating array operations

// cons :: a -> [a] -> [a]
// a with x prepended
function cons(x, a) {
  var l = a.length;
  var b = new Array(l + 1);
  b[0] = x;
  for (var i = 0; i < l; ++i) {
    b[i + 1] = a[i];
  }
  return b;
}

// append :: a -> [a] -> [a]
// a with x appended
function append(x, a) {
  var l = a.length;
  var b = new Array(l + 1);
  for (var i = 0; i < l; ++i) {
    b[i] = a[i];
  }

  b[l] = x;
  return b;
}

// drop :: Int -> [a] -> [a]
// drop first n elements
function drop(n, a) {
  // eslint-disable-line complexity
  if (n < 0) {
    throw new TypeError('n must be >= 0');
  }

  var l = a.length;
  if (n === 0 || l === 0) {
    return a;
  }

  if (n >= l) {
    return [];
  }

  return unsafeDrop(n, a, l - n);
}

// unsafeDrop :: Int -> [a] -> Int -> [a]
// Internal helper for drop
function unsafeDrop(n, a, l) {
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = a[n + i];
  }
  return b;
}

// tail :: [a] -> [a]
// drop head element
function tail(a) {
  return drop(1, a);
}

// copy :: [a] -> [a]
// duplicate a (shallow duplication)
function copy(a) {
  var l = a.length;
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = a[i];
  }
  return b;
}

// map :: (a -> b) -> [a] -> [b]
// transform each element with f
function map(f, a) {
  var l = a.length;
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = f(a[i]);
  }
  return b;
}

// reduce :: (a -> b -> a) -> a -> [b] -> a
// accumulate via left-fold
function reduce(f, z, a) {
  var r = z;
  for (var i = 0, l = a.length; i < l; ++i) {
    r = f(r, a[i], i);
  }
  return r;
}

// replace :: a -> Int -> [a]
// replace element at index
function replace(x, i, a) {
  // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0');
  }

  var l = a.length;
  var b = new Array(l);
  for (var j = 0; j < l; ++j) {
    b[j] = i === j ? x : a[j];
  }
  return b;
}

// remove :: Int -> [a] -> [a]
// remove element at index
function remove(i, a) {
  // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0');
  }

  var l = a.length;
  if (l === 0 || i >= l) {
    // exit early if index beyond end of array
    return a;
  }

  if (l === 1) {
    // exit early if index in bounds and length === 1
    return [];
  }

  return unsafeRemove(i, a, l - 1);
}

// unsafeRemove :: Int -> [a] -> Int -> [a]
// Internal helper to remove element at index
function unsafeRemove(i, a, l) {
  var b = new Array(l);
  var j = void 0;
  for (j = 0; j < i; ++j) {
    b[j] = a[j];
  }
  for (j = i; j < l; ++j) {
    b[j] = a[j + 1];
  }

  return b;
}

// removeAll :: (a -> boolean) -> [a] -> [a]
// remove all elements matching a predicate
function removeAll(f, a) {
  var l = a.length;
  var b = new Array(l);
  var j = 0;
  for (var x, i = 0; i < l; ++i) {
    x = a[i];
    if (!f(x)) {
      b[j] = x;
      ++j;
    }
  }

  b.length = j;
  return b;
}

// findIndex :: a -> [a] -> Int
// find index of x in a, from the left
function findIndex(x, a) {
  for (var i = 0, l = a.length; i < l; ++i) {
    if (x === a[i]) {
      return i;
    }
  }
  return -1;
}

// isArrayLike :: * -> boolean
// Return true iff x is array-like
function isArrayLike(x) {
  return x != null && typeof x.length === 'number' && typeof x !== 'function';
}

/** @license MIT License (c) copyright 2010-2016 original author or authors */

// id :: a -> a
var id = function id(x) {
  return x;
};

// compose :: (b -> c) -> (a -> b) -> (a -> c)
var compose = function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
};

// apply :: (a -> b) -> a -> b
var apply = function apply(f, x) {
  return f(x);
};

// curry2 :: ((a, b) -> c) -> (a -> b -> c)
function curry2(f) {
  function curried(a, b) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return function (b) {
          return f(a, b);
        };
      default:
        return f(a, b);
    }
  }
  return curried;
}

// curry3 :: ((a, b, c) -> d) -> (a -> b -> c -> d)
function curry3(f) {
  function curried(a, b, c) {
    // eslint-disable-line complexity
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry2(function (b, c) {
          return f(a, b, c);
        });
      case 2:
        return function (c) {
          return f(a, b, c);
        };
      default:
        return f(a, b, c);
    }
  }
  return curried;
}

// curry4 :: ((a, b, c, d) -> e) -> (a -> b -> c -> d -> e)
function curry4(f) {
  function curried(a, b, c, d) {
    // eslint-disable-line complexity
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry3(function (b, c, d) {
          return f(a, b, c, d);
        });
      case 2:
        return curry2(function (c, d) {
          return f(a, b, c, d);
        });
      case 3:
        return function (d) {
          return f(a, b, c, d);
        };
      default:
        return f(a, b, c, d);
    }
  }
  return curried;
}

/** @license MIT License (c) copyright 2016 original author or authors */


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/most/src/LinkedList.js":
/*!*********************************************!*\
  !*** ./node_modules/most/src/LinkedList.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LinkedList; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/**
 * Doubly linked list
 * @constructor
 */
function LinkedList () {
  this.head = null
  this.length = 0
}

/**
 * Add a node to the end of the list
 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to add
 */
LinkedList.prototype.add = function (x) {
  if (this.head !== null) {
    this.head.prev = x
    x.next = this.head
  }
  this.head = x
  ++this.length
}

/**
 * Remove the provided node from the list
 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to remove
 */
LinkedList.prototype.remove = function (x) { // eslint-disable-line  complexity
  --this.length
  if (x === this.head) {
    this.head = this.head.next
  }
  if (x.next !== null) {
    x.next.prev = x.prev
    x.next = null
  }
  if (x.prev !== null) {
    x.prev.next = x.next
    x.prev = null
  }
}

/**
 * @returns {boolean} true iff there are no nodes in the list
 */
LinkedList.prototype.isEmpty = function () {
  return this.length === 0
}

/**
 * Dispose all nodes
 * @returns {Promise} promise that fulfills when all nodes have been disposed,
 *  or rejects if an error occurs while disposing
 */
LinkedList.prototype.dispose = function () {
  if (this.isEmpty()) {
    return Promise.resolve()
  }

  var promises = []
  var x = this.head
  this.head = null
  this.length = 0

  while (x !== null) {
    promises.push(x.dispose())
    x = x.next
  }

  return Promise.all(promises)
}


/***/ }),

/***/ "./node_modules/most/src/Promise.js":
/*!******************************************!*\
  !*** ./node_modules/most/src/Promise.js ***!
  \******************************************/
/*! exports provided: isPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function isPromise (p) {
  return p !== null && typeof p === 'object' && typeof p.then === 'function'
}


/***/ }),

/***/ "./node_modules/most/src/Queue.js":
/*!****************************************!*\
  !*** ./node_modules/most/src/Queue.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Queue; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

// Based on https://github.com/petkaantonov/deque

function Queue (capPow2) {
  this._capacity = capPow2 || 32
  this._length = 0
  this._head = 0
}

Queue.prototype.push = function (x) {
  var len = this._length
  this._checkCapacity(len + 1)

  var i = (this._head + len) & (this._capacity - 1)
  this[i] = x
  this._length = len + 1
}

Queue.prototype.shift = function () {
  var head = this._head
  var x = this[head]

  this[head] = void 0
  this._head = (head + 1) & (this._capacity - 1)
  this._length--
  return x
}

Queue.prototype.isEmpty = function () {
  return this._length === 0
}

Queue.prototype.length = function () {
  return this._length
}

Queue.prototype._checkCapacity = function (size) {
  if (this._capacity < size) {
    this._ensureCapacity(this._capacity << 1)
  }
}

Queue.prototype._ensureCapacity = function (capacity) {
  var oldCapacity = this._capacity
  this._capacity = capacity

  var last = this._head + this._length

  if (last > oldCapacity) {
    copy(this, 0, this, oldCapacity, last & (oldCapacity - 1))
  }
}

function copy (src, srcIndex, dst, dstIndex, len) {
  for (var j = 0; j < len; ++j) {
    dst[j + dstIndex] = src[j + srcIndex]
    src[j + srcIndex] = void 0
  }
}


/***/ }),

/***/ "./node_modules/most/src/Stream.js":
/*!*****************************************!*\
  !*** ./node_modules/most/src/Stream.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stream; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function Stream (source) {
  this.source = source
}

Stream.prototype.run = function (sink, scheduler) {
  return this.source.run(sink, scheduler)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/accumulate.js":
/*!********************************************************!*\
  !*** ./node_modules/most/src/combinator/accumulate.js ***!
  \********************************************************/
/*! exports provided: scan, reduce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return scan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _runSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runSource */ "./node_modules/most/src/runSource.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @param {Stream} stream stream to scan
 * @returns {Stream} new stream containing successive reduce results
 */
function scan (f, initial, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Scan(f, initial, stream.source))
}

function Scan (f, z, source) {
  this.source = source
  this.f = f
  this.value = z
}

Scan.prototype.run = function (sink, scheduler) {
  var d1 = scheduler.asap(_scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_4__["default"].event(this.value, sink))
  var d2 = this.source.run(new ScanSink(this.f, this.value, sink), scheduler)
  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_3__["all"]([d1, d2])
}

function ScanSink (f, z, sink) {
  this.f = f
  this.value = z
  this.sink = sink
}

ScanSink.prototype.event = function (t, x) {
  var f = this.f
  this.value = f(this.value, x)
  this.sink.event(t, this.value)
}

ScanSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error
ScanSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end

/**
* Reduce a stream to produce a single result.  Note that reducing an infinite
* stream will return a Promise that never fulfills, but that may reject if an error
* occurs.
* @param {function(result:*, x:*):*} f reducer function
* @param {*} initial initial value
* @param {Stream} stream to reduce
* @returns {Promise} promise for the file result of the reduce
*/
function reduce (f, initial, stream) {
  return Object(_runSource__WEBPACK_IMPORTED_MODULE_2__["withDefaultScheduler"])(new Reduce(f, initial, stream.source))
}

function Reduce (f, z, source) {
  this.source = source
  this.f = f
  this.value = z
}

Reduce.prototype.run = function (sink, scheduler) {
  return this.source.run(new ReduceSink(this.f, this.value, sink), scheduler)
}

function ReduceSink (f, z, sink) {
  this.f = f
  this.value = z
  this.sink = sink
}

ReduceSink.prototype.event = function (t, x) {
  var f = this.f
  this.value = f(this.value, x)
  this.sink.event(t, this.value)
}

ReduceSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

ReduceSink.prototype.end = function (t) {
  this.sink.end(t, this.value)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/applicative.js":
/*!*********************************************************!*\
  !*** ./node_modules/most/src/combinator/applicative.js ***!
  \*********************************************************/
/*! exports provided: ap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return ap; });
/* harmony import */ var _combine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./combine */ "./node_modules/most/src/combinator/combine.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Assume fs is a stream containing functions, and apply the latest function
 * in fs to the latest value in xs.
 * fs:         --f---------g--------h------>
 * xs:         -a-------b-------c-------d-->
 * ap(fs, xs): --fa-----fb-gb---gc--hc--hd->
 * @param {Stream} fs stream of functions to apply to the latest x
 * @param {Stream} xs stream of values to which to apply all the latest f
 * @returns {Stream} stream containing all the applications of fs to xs
 */
function ap (fs, xs) {
  return Object(_combine__WEBPACK_IMPORTED_MODULE_0__["combine"])(_most_prelude__WEBPACK_IMPORTED_MODULE_1__["apply"], fs, xs)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/build.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/combinator/build.js ***!
  \***************************************************/
/*! exports provided: cons, concat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cons", function() { return cons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return concat; });
/* harmony import */ var _source_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../source/core */ "./node_modules/most/src/source/core.js");
/* harmony import */ var _continueWith__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./continueWith */ "./node_modules/most/src/combinator/continueWith.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * @param {*} x value to prepend
 * @param {Stream} stream
 * @returns {Stream} new stream with x prepended
 */
function cons (x, stream) {
  return concat(Object(_source_core__WEBPACK_IMPORTED_MODULE_0__["of"])(x), stream)
}

/**
* @param {Stream} left
* @param {Stream} right
* @returns {Stream} new stream containing all events in left followed by all
*  events in right.  This *timeshifts* right to the end of left.
*/
function concat (left, right) {
  return Object(_continueWith__WEBPACK_IMPORTED_MODULE_1__["continueWith"])(function () {
    return right
  }, left)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/combine.js":
/*!*****************************************************!*\
  !*** ./node_modules/most/src/combinator/combine.js ***!
  \*****************************************************/
/*! exports provided: combine, combineArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return combine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineArray", function() { return combineArray; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ "./node_modules/most/src/combinator/transform.js");
/* harmony import */ var _source_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../source/core */ "./node_modules/most/src/source/core.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _sink_IndexSink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sink/IndexSink */ "./node_modules/most/src/sink/IndexSink.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/* harmony import */ var _invoke__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../invoke */ "./node_modules/most/src/invoke.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */










var map = _most_prelude__WEBPACK_IMPORTED_MODULE_6__["map"]
var tail = _most_prelude__WEBPACK_IMPORTED_MODULE_6__["tail"]

/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
function combine (f /*, ...streams */) {
  return combineArray(f, tail(arguments))
}

/**
* Combine latest events from all input streams
* @param {function(...events):*} f function to combine most recent events
* @param {[Stream]} streams most recent events
* @returns {Stream} stream containing the result of applying f to the most recent
*  event of each input stream, whenever a new event arrives on any stream.
*/
function combineArray (f, streams) {
  var l = streams.length
  return l === 0 ? _source_core__WEBPACK_IMPORTED_MODULE_2__["empty"]()
  : l === 1 ? _transform__WEBPACK_IMPORTED_MODULE_1__["map"](f, streams[0])
  : new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](combineSources(f, streams))
}

function combineSources (f, streams) {
  return new Combine(f, map(getSource, streams))
}

function getSource (stream) {
  return stream.source
}

function Combine (f, sources) {
  this.f = f
  this.sources = sources
}

Combine.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l)
  var sinks = new Array(l)

  var mergeSink = new CombineSink(disposables, sinks, sink, this.f)

  for (var indexSink, i = 0; i < l; ++i) {
    indexSink = sinks[i] = new _sink_IndexSink__WEBPACK_IMPORTED_MODULE_4__["default"](i, mergeSink)
    disposables[i] = this.sources[i].run(indexSink, scheduler)
  }

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_5__["all"](disposables)
}

function CombineSink (disposables, sinks, sink, f) {
  this.sink = sink
  this.disposables = disposables
  this.sinks = sinks
  this.f = f

  var l = sinks.length
  this.awaiting = l
  this.values = new Array(l)
  this.hasValue = new Array(l)
  for (var i = 0; i < l; ++i) {
    this.hasValue[i] = false
  }

  this.activeCount = sinks.length
}

CombineSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.error

CombineSink.prototype.event = function (t, indexedValue) {
  var i = indexedValue.index
  var awaiting = this._updateReady(i)

  this.values[i] = indexedValue.value
  if (awaiting === 0) {
    this.sink.event(t, Object(_invoke__WEBPACK_IMPORTED_MODULE_7__["default"])(this.f, this.values))
  }
}

CombineSink.prototype._updateReady = function (index) {
  if (this.awaiting > 0) {
    if (!this.hasValue[index]) {
      this.hasValue[index] = true
      this.awaiting -= 1
    }
  }
  return this.awaiting
}

CombineSink.prototype.end = function (t, indexedValue) {
  _disposable_dispose__WEBPACK_IMPORTED_MODULE_5__["tryDispose"](t, this.disposables[indexedValue.index], this.sink)
  if (--this.activeCount === 0) {
    this.sink.end(t, indexedValue.value)
  }
}


/***/ }),

/***/ "./node_modules/most/src/combinator/concatMap.js":
/*!*******************************************************!*\
  !*** ./node_modules/most/src/combinator/concatMap.js ***!
  \*******************************************************/
/*! exports provided: concatMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatMap", function() { return concatMap; });
/* harmony import */ var _mergeConcurrently__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeConcurrently */ "./node_modules/most/src/combinator/mergeConcurrently.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Map each value in stream to a new stream, and concatenate them all
 * stream:              -a---b---cX
 * f(a):                 1-1-1-1X
 * f(b):                        -2-2-2-2X
 * f(c):                                -3-3-3-3X
 * stream.concatMap(f): -1-1-1-1-2-2-2-2-3-3-3-3X
 * @param {function(x:*):Stream} f function to map each value to a stream
 * @param {Stream} stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
function concatMap (f, stream) {
  return Object(_mergeConcurrently__WEBPACK_IMPORTED_MODULE_0__["mergeMapConcurrently"])(f, 1, stream)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/continueWith.js":
/*!**********************************************************!*\
  !*** ./node_modules/most/src/combinator/continueWith.js ***!
  \**********************************************************/
/*! exports provided: continueWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "continueWith", function() { return continueWith; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function continueWith (f, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new ContinueWith(f, stream.source))
}

function ContinueWith (f, source) {
  this.f = f
  this.source = source
}

ContinueWith.prototype.run = function (sink, scheduler) {
  return new ContinueWithSink(this.f, this.source, sink, scheduler)
}

function ContinueWithSink (f, source, sink, scheduler) {
  this.f = f
  this.sink = sink
  this.scheduler = scheduler
  this.active = true
  this.disposable = _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__["once"](source.run(this, scheduler))
}

ContinueWithSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

ContinueWithSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }
  this.sink.event(t, x)
}

ContinueWithSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }

  _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__["tryDispose"](t, this.disposable, this.sink)
  this._startNext(t, x, this.sink)
}

ContinueWithSink.prototype._startNext = function (t, x, sink) {
  try {
    this.disposable = this._continue(this.f, x, sink)
  } catch (e) {
    sink.error(t, e)
  }
}

ContinueWithSink.prototype._continue = function (f, x, sink) {
  return f(x).source.run(sink, this.scheduler)
}

ContinueWithSink.prototype.dispose = function () {
  this.active = false
  return this.disposable.dispose()
}


/***/ }),

/***/ "./node_modules/most/src/combinator/delay.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/combinator/delay.js ***!
  \***************************************************/
/*! exports provided: delay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






/**
 * @param {Number} delayTime milliseconds to delay each item
 * @param {Stream} stream
 * @returns {Stream} new stream containing the same items, but delayed by ms
 */
function delay (delayTime, stream) {
  return delayTime <= 0 ? stream
    : new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Delay(delayTime, stream.source))
}

function Delay (dt, source) {
  this.dt = dt
  this.source = source
}

Delay.prototype.run = function (sink, scheduler) {
  var delaySink = new DelaySink(this.dt, sink, scheduler)
  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__["all"]([delaySink, this.source.run(delaySink, scheduler)])
}

function DelaySink (dt, sink, scheduler) {
  this.dt = dt
  this.sink = sink
  this.scheduler = scheduler
}

DelaySink.prototype.dispose = function () {
  var self = this
  this.scheduler.cancelAll(function (scheduledTask) {
    return scheduledTask.task.sink === self.sink
  })
}

DelaySink.prototype.event = function (t, x) {
  this.scheduler.delay(this.dt, _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_3__["default"].event(x, this.sink))
}

DelaySink.prototype.end = function (t, x) {
  this.scheduler.delay(this.dt, _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_3__["default"].end(x, this.sink))
}

DelaySink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error


/***/ }),

/***/ "./node_modules/most/src/combinator/errors.js":
/*!****************************************************!*\
  !*** ./node_modules/most/src/combinator/errors.js ***!
  \****************************************************/
/*! exports provided: recoverWith, flatMapError, throwError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recoverWith", function() { return recoverWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatMapError", function() { return flatMapError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return throwError; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_SafeSink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/SafeSink */ "./node_modules/most/src/sink/SafeSink.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _source_tryEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../source/tryEvent */ "./node_modules/most/src/source/tryEvent.js");
/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * If stream encounters an error, recover and continue with items from stream
 * returned by f.
 * @param {function(error:*):Stream} f function which returns a new stream
 * @param {Stream} stream
 * @returns {Stream} new stream which will recover from an error by calling f
 */
function recoverWith (f, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new RecoverWith(f, stream.source))
}

var flatMapError = recoverWith

/**
 * Create a stream containing only an error
 * @param {*} e error value, preferably an Error or Error subtype
 * @returns {Stream} new stream containing only an error
 */
function throwError (e) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new ErrorSource(e))
}

function ErrorSource (e) {
  this.value = e
}

ErrorSource.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_4__["default"](runError, this.value, sink))
}

function runError (t, e, sink) {
  sink.error(t, e)
}

function RecoverWith (f, source) {
  this.f = f
  this.source = source
}

RecoverWith.prototype.run = function (sink, scheduler) {
  return new RecoverWithSink(this.f, this.source, sink, scheduler)
}

function RecoverWithSink (f, source, sink, scheduler) {
  this.f = f
  this.sink = new _sink_SafeSink__WEBPACK_IMPORTED_MODULE_1__["default"](sink)
  this.scheduler = scheduler
  this.disposable = source.run(this, scheduler)
}

RecoverWithSink.prototype.event = function (t, x) {
  _source_tryEvent__WEBPACK_IMPORTED_MODULE_3__["tryEvent"](t, x, this.sink)
}

RecoverWithSink.prototype.end = function (t, x) {
  _source_tryEvent__WEBPACK_IMPORTED_MODULE_3__["tryEnd"](t, x, this.sink)
}

RecoverWithSink.prototype.error = function (t, e) {
  var nextSink = this.sink.disable()

  _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__["tryDispose"](t, this.disposable, this.sink)
  this._startNext(t, e, nextSink)
}

RecoverWithSink.prototype._startNext = function (t, x, sink) {
  try {
    this.disposable = this._continue(this.f, x, sink)
  } catch (e) {
    sink.error(t, e)
  }
}

RecoverWithSink.prototype._continue = function (f, x, sink) {
  var stream = f(x)
  return stream.source.run(sink, this.scheduler)
}

RecoverWithSink.prototype.dispose = function () {
  return this.disposable.dispose()
}


/***/ }),

/***/ "./node_modules/most/src/combinator/filter.js":
/*!****************************************************!*\
  !*** ./node_modules/most/src/combinator/filter.js ***!
  \****************************************************/
/*! exports provided: filter, skipRepeats, skipRepeatsWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipRepeats", function() { return skipRepeats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipRepeatsWith", function() { return skipRepeatsWith; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _fusion_Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fusion/Filter */ "./node_modules/most/src/fusion/Filter.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Retain only items matching a predicate
 * @param {function(x:*):boolean} p filtering predicate called for each item
 * @param {Stream} stream stream to filter
 * @returns {Stream} stream containing only items for which predicate returns truthy
 */
function filter (p, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](_fusion_Filter__WEBPACK_IMPORTED_MODULE_2__["default"].create(p, stream.source))
}

/**
 * Skip repeated events, using === to detect duplicates
 * @param {Stream} stream stream from which to omit repeated events
 * @returns {Stream} stream without repeated events
 */
function skipRepeats (stream) {
  return skipRepeatsWith(same, stream)
}

/**
 * Skip repeated events using the provided equals function to detect duplicates
 * @param {function(a:*, b:*):boolean} equals optional function to compare items
 * @param {Stream} stream stream from which to omit repeated events
 * @returns {Stream} stream without repeated events
 */
function skipRepeatsWith (equals, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new SkipRepeats(equals, stream.source))
}

function SkipRepeats (equals, source) {
  this.equals = equals
  this.source = source
}

SkipRepeats.prototype.run = function (sink, scheduler) {
  return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler)
}

function SkipRepeatsSink (equals, sink) {
  this.equals = equals
  this.sink = sink
  this.value = void 0
  this.init = true
}

SkipRepeatsSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end
SkipRepeatsSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

SkipRepeatsSink.prototype.event = function (t, x) {
  if (this.init) {
    this.init = false
    this.value = x
    this.sink.event(t, x)
  } else if (!this.equals(this.value, x)) {
    this.value = x
    this.sink.event(t, x)
  }
}

function same (a, b) {
  return a === b
}


/***/ }),

/***/ "./node_modules/most/src/combinator/flatMap.js":
/*!*****************************************************!*\
  !*** ./node_modules/most/src/combinator/flatMap.js ***!
  \*****************************************************/
/*! exports provided: flatMap, join */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatMap", function() { return flatMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return join; });
/* harmony import */ var _mergeConcurrently__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeConcurrently */ "./node_modules/most/src/combinator/mergeConcurrently.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Map each value in the stream to a new stream, and merge it into the
 * returned outer stream. Event arrival times are preserved.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @param {Stream} stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
function flatMap (f, stream) {
  return Object(_mergeConcurrently__WEBPACK_IMPORTED_MODULE_0__["mergeMapConcurrently"])(f, Infinity, stream)
}

/**
 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer. Event arrival times are preserved.
 * @param {Stream<Stream<X>>} stream stream of streams
 * @returns {Stream<X>} new stream containing all events of all inner streams
 */
function join (stream) {
  return Object(_mergeConcurrently__WEBPACK_IMPORTED_MODULE_0__["mergeConcurrently"])(Infinity, stream)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/limit.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/combinator/limit.js ***!
  \***************************************************/
/*! exports provided: throttle, debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _fusion_Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fusion/Map */ "./node_modules/most/src/fusion/Map.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Limit the rate of events by suppressing events that occur too often
 * @param {Number} period time to suppress events
 * @param {Stream} stream
 * @returns {Stream}
 */
function throttle (period, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](throttleSource(period, stream.source))
}

function throttleSource (period, source) {
  return source instanceof _fusion_Map__WEBPACK_IMPORTED_MODULE_2__["default"] ? commuteMapThrottle(period, source)
    : source instanceof Throttle ? fuseThrottle(period, source)
    : new Throttle(period, source)
}

function commuteMapThrottle (period, source) {
  return _fusion_Map__WEBPACK_IMPORTED_MODULE_2__["default"].create(source.f, throttleSource(period, source.source))
}

function fuseThrottle (period, source) {
  return new Throttle(Math.max(period, source.period), source.source)
}

function Throttle (period, source) {
  this.period = period
  this.source = source
}

Throttle.prototype.run = function (sink, scheduler) {
  return this.source.run(new ThrottleSink(this.period, sink), scheduler)
}

function ThrottleSink (period, sink) {
  this.time = 0
  this.period = period
  this.sink = sink
}

ThrottleSink.prototype.event = function (t, x) {
  if (t >= this.time) {
    this.time = t + this.period
    this.sink.event(t, x)
  }
}

ThrottleSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end

ThrottleSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

/**
 * Wait for a burst of events to subside and emit only the last event in the burst
 * @param {Number} period events occuring more frequently than this
 *  will be suppressed
 * @param {Stream} stream stream to debounce
 * @returns {Stream} new debounced stream
 */
function debounce (period, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Debounce(period, stream.source))
}

function Debounce (dt, source) {
  this.dt = dt
  this.source = source
}

Debounce.prototype.run = function (sink, scheduler) {
  return new DebounceSink(this.dt, this.source, sink, scheduler)
}

function DebounceSink (dt, source, sink, scheduler) {
  this.dt = dt
  this.sink = sink
  this.scheduler = scheduler
  this.value = void 0
  this.timer = null
  this.disposable = source.run(this, scheduler)
}

DebounceSink.prototype.event = function (t, x) {
  this._clearTimer()
  this.value = x
  this.timer = this.scheduler.delay(this.dt, new DebounceTask(this, x))
}

DebounceSink.prototype._event = function (t, x) {
  this._clearTimer()
  this.sink.event(t, x)
}

DebounceSink.prototype.end = function (t, x) {
  if (this._clearTimer()) {
    this.sink.event(t, this.value)
    this.value = void 0
  }
  this.sink.end(t, x)
}

DebounceSink.prototype.error = function (t, x) {
  this._clearTimer()
  this.sink.error(t, x)
}

DebounceSink.prototype.dispose = function () {
  this._clearTimer()
  return this.disposable.dispose()
}

DebounceSink.prototype._clearTimer = function () {
  if (this.timer === null) {
    return false
  }
  this.timer.dispose()
  this.timer = null
  return true
}

function DebounceTask (debounce, value) {
  this.debounce = debounce
  this.value = value
}

DebounceTask.prototype.run = function (t) {
  this.debounce._event(t, this.value)
}

DebounceTask.prototype.error = function (t, e) {
  this.debounce.error(t, e)
}

DebounceTask.prototype.dispose = function () {}


/***/ }),

/***/ "./node_modules/most/src/combinator/loop.js":
/*!**************************************************!*\
  !*** ./node_modules/most/src/combinator/loop.js ***!
  \**************************************************/
/*! exports provided: loop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return loop; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Generalized feedback loop. Call a stepper function for each event. The stepper
 * will be called with 2 params: the current seed and the an event value.  It must
 * return a new { seed, value } pair. The `seed` will be fed back into the next
 * invocation of stepper, and the `value` will be propagated as the event value.
 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
 * @param {*} seed initial seed value passed to first stepper call
 * @param {Stream} stream event stream
 * @returns {Stream} new stream whose values are the `value` field of the objects
 * returned by the stepper
 */
function loop (stepper, seed, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Loop(stepper, seed, stream.source))
}

function Loop (stepper, seed, source) {
  this.step = stepper
  this.seed = seed
  this.source = source
}

Loop.prototype.run = function (sink, scheduler) {
  return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler)
}

function LoopSink (stepper, seed, sink) {
  this.step = stepper
  this.seed = seed
  this.sink = sink
}

LoopSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

LoopSink.prototype.event = function (t, x) {
  var result = this.step(this.seed, x)
  this.seed = result.seed
  this.sink.event(t, result.value)
}

LoopSink.prototype.end = function (t) {
  this.sink.end(t, this.seed)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/merge.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/combinator/merge.js ***!
  \***************************************************/
/*! exports provided: merge, mergeArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeArray", function() { return mergeArray; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _sink_IndexSink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sink/IndexSink */ "./node_modules/most/src/sink/IndexSink.js");
/* harmony import */ var _source_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../source/core */ "./node_modules/most/src/source/core.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */








var copy = _most_prelude__WEBPACK_IMPORTED_MODULE_5__["copy"]
var reduce = _most_prelude__WEBPACK_IMPORTED_MODULE_5__["reduce"]

/**
 * @returns {Stream} stream containing events from all streams in the argument
 * list in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function merge (/* ...streams */) {
  return mergeArray(copy(arguments))
}

/**
 * @param {Array} streams array of stream to merge
 * @returns {Stream} stream containing events from all input observables
 * in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function mergeArray (streams) {
  var l = streams.length
  return l === 0 ? Object(_source_core__WEBPACK_IMPORTED_MODULE_3__["empty"])()
    : l === 1 ? streams[0]
    : new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](mergeSources(streams))
}

/**
 * This implements fusion/flattening for merge.  It will
 * fuse adjacent merge operations.  For example:
 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
 * It does this by concatenating the sources arrays of
 * any nested Merge sources, in effect "flattening" nested
 * merge operations into a single merge.
 */
function mergeSources (streams) {
  return new Merge(reduce(appendSources, [], streams))
}

function appendSources (sources, stream) {
  var source = stream.source
  return source instanceof Merge
    ? sources.concat(source.sources)
    : sources.concat(source)
}

function Merge (sources) {
  this.sources = sources
}

Merge.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l)
  var sinks = new Array(l)

  var mergeSink = new MergeSink(disposables, sinks, sink)

  for (var indexSink, i = 0; i < l; ++i) {
    indexSink = sinks[i] = new _sink_IndexSink__WEBPACK_IMPORTED_MODULE_2__["default"](i, mergeSink)
    disposables[i] = this.sources[i].run(indexSink, scheduler)
  }

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_4__["all"](disposables)
}

function MergeSink (disposables, sinks, sink) {
  this.sink = sink
  this.disposables = disposables
  this.activeCount = sinks.length
}

MergeSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

MergeSink.prototype.event = function (t, indexValue) {
  this.sink.event(t, indexValue.value)
}

MergeSink.prototype.end = function (t, indexedValue) {
  _disposable_dispose__WEBPACK_IMPORTED_MODULE_4__["tryDispose"](t, this.disposables[indexedValue.index], this.sink)
  if (--this.activeCount === 0) {
    this.sink.end(t, indexedValue.value)
  }
}


/***/ }),

/***/ "./node_modules/most/src/combinator/mergeConcurrently.js":
/*!***************************************************************!*\
  !*** ./node_modules/most/src/combinator/mergeConcurrently.js ***!
  \***************************************************************/
/*! exports provided: mergeConcurrently, mergeMapConcurrently */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeConcurrently", function() { return mergeConcurrently; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeMapConcurrently", function() { return mergeMapConcurrently; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _LinkedList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LinkedList */ "./node_modules/most/src/LinkedList.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






function mergeConcurrently (concurrency, stream) {
  return mergeMapConcurrently(_most_prelude__WEBPACK_IMPORTED_MODULE_3__["id"], concurrency, stream)
}

function mergeMapConcurrently (f, concurrency, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new MergeConcurrently(f, concurrency, stream.source))
}

function MergeConcurrently (f, concurrency, source) {
  this.f = f
  this.concurrency = concurrency
  this.source = source
}

MergeConcurrently.prototype.run = function (sink, scheduler) {
  return new Outer(this.f, this.concurrency, this.source, sink, scheduler)
}

function Outer (f, concurrency, source, sink, scheduler) {
  this.f = f
  this.concurrency = concurrency
  this.sink = sink
  this.scheduler = scheduler
  this.pending = []
  this.current = new _LinkedList__WEBPACK_IMPORTED_MODULE_2__["default"]()
  this.disposable = _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["once"](source.run(this, scheduler))
  this.active = true
}

Outer.prototype.event = function (t, x) {
  this._addInner(t, x)
}

Outer.prototype._addInner = function (t, x) {
  if (this.current.length < this.concurrency) {
    this._startInner(t, x)
  } else {
    this.pending.push(x)
  }
}

Outer.prototype._startInner = function (t, x) {
  try {
    this._initInner(t, x)
  } catch (e) {
    this.error(t, e)
  }
}

Outer.prototype._initInner = function (t, x) {
  var innerSink = new Inner(t, this, this.sink)
  innerSink.disposable = mapAndRun(this.f, x, innerSink, this.scheduler)
  this.current.add(innerSink)
}

function mapAndRun (f, x, sink, scheduler) {
  return f(x).source.run(sink, scheduler)
}

Outer.prototype.end = function (t, x) {
  this.active = false
  _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["tryDispose"](t, this.disposable, this.sink)
  this._checkEnd(t, x)
}

Outer.prototype.error = function (t, e) {
  this.active = false
  this.sink.error(t, e)
}

Outer.prototype.dispose = function () {
  this.active = false
  this.pending.length = 0
  return Promise.all([this.disposable.dispose(), this.current.dispose()])
}

Outer.prototype._endInner = function (t, x, inner) {
  this.current.remove(inner)
  _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["tryDispose"](t, inner, this)

  if (this.pending.length === 0) {
    this._checkEnd(t, x)
  } else {
    this._startInner(t, this.pending.shift())
  }
}

Outer.prototype._checkEnd = function (t, x) {
  if (!this.active && this.current.isEmpty()) {
    this.sink.end(t, x)
  }
}

function Inner (time, outer, sink) {
  this.prev = this.next = null
  this.time = time
  this.outer = outer
  this.sink = sink
  this.disposable = void 0
}

Inner.prototype.event = function (t, x) {
  this.sink.event(Math.max(t, this.time), x)
}

Inner.prototype.end = function (t, x) {
  this.outer._endInner(Math.max(t, this.time), x, this)
}

Inner.prototype.error = function (t, e) {
  this.outer.error(Math.max(t, this.time), e)
}

Inner.prototype.dispose = function () {
  return this.disposable.dispose()
}


/***/ }),

/***/ "./node_modules/most/src/combinator/observe.js":
/*!*****************************************************!*\
  !*** ./node_modules/most/src/combinator/observe.js ***!
  \*****************************************************/
/*! exports provided: observe, drain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return observe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drain", function() { return drain; });
/* harmony import */ var _runSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../runSource */ "./node_modules/most/src/runSource.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ "./node_modules/most/src/combinator/transform.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Observe all the event values in the stream in time order. The
 * provided function `f` will be called for each event value
 * @param {function(x:T):*} f function to call with each event value
 * @param {Stream<T>} stream stream to observe
 * @return {Promise} promise that fulfills after the stream ends without
 *  an error, or rejects if the stream ends with an error.
 */
function observe (f, stream) {
  return drain(Object(_transform__WEBPACK_IMPORTED_MODULE_1__["tap"])(f, stream))
}

/**
 * "Run" a stream by creating demand and consuming all events
 * @param {Stream<T>} stream stream to drain
 * @return {Promise} promise that fulfills after the stream ends without
 *  an error, or rejects if the stream ends with an error.
 */
function drain (stream) {
  return Object(_runSource__WEBPACK_IMPORTED_MODULE_0__["withDefaultScheduler"])(stream.source)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/promises.js":
/*!******************************************************!*\
  !*** ./node_modules/most/src/combinator/promises.js ***!
  \******************************************************/
/*! exports provided: fromPromise, awaitPromises */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return fromPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "awaitPromises", function() { return awaitPromises; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _fatalError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fatalError */ "./node_modules/most/src/fatalError.js");
/* harmony import */ var _source_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../source/core */ "./node_modules/most/src/source/core.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Create a stream containing only the promise's fulfillment
 * value at the time it fulfills.
 * @param {Promise<T>} p promise
 * @return {Stream<T>} stream containing promise's fulfillment value.
 *  If the promise rejects, the stream will error
 */
function fromPromise (p) {
  return awaitPromises(Object(_source_core__WEBPACK_IMPORTED_MODULE_2__["of"])(p))
}

/**
 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
 * Event order is preserved.
 * @param {Stream<Promise<T>>} stream
 * @return {Stream<T>} stream of fulfillment values.  The stream will
 * error if any promise rejects.
 */
function awaitPromises (stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Await(stream.source))
}

function Await (source) {
  this.source = source
}

Await.prototype.run = function (sink, scheduler) {
  return this.source.run(new AwaitSink(sink, scheduler), scheduler)
}

function AwaitSink (sink, scheduler) {
  this.sink = sink
  this.scheduler = scheduler
  this.queue = Promise.resolve()
  var self = this

  // Pre-create closures, to avoid creating them per event
  this._eventBound = function (x) {
    self.sink.event(self.scheduler.now(), x)
  }

  this._endBound = function (x) {
    self.sink.end(self.scheduler.now(), x)
  }

  this._errorBound = function (e) {
    self.sink.error(self.scheduler.now(), e)
  }
}

AwaitSink.prototype.event = function (t, promise) {
  var self = this
  this.queue = this.queue.then(function () {
    return self._event(promise)
  }).catch(this._errorBound)
}

AwaitSink.prototype.end = function (t, x) {
  var self = this
  this.queue = this.queue.then(function () {
    return self._end(x)
  }).catch(this._errorBound)
}

AwaitSink.prototype.error = function (t, e) {
  var self = this
  // Don't resolve error values, propagate directly
  this.queue = this.queue.then(function () {
    return self._errorBound(e)
  }).catch(_fatalError__WEBPACK_IMPORTED_MODULE_1__["default"])
}

AwaitSink.prototype._event = function (promise) {
  return promise.then(this._eventBound)
}

AwaitSink.prototype._end = function (x) {
  return Promise.resolve(x).then(this._endBound)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/sample.js":
/*!****************************************************!*\
  !*** ./node_modules/most/src/combinator/sample.js ***!
  \****************************************************/
/*! exports provided: sample, sampleWith, sampleArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return sample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sampleWith", function() { return sampleWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sampleArray", function() { return sampleArray; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/* harmony import */ var _invoke__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../invoke */ "./node_modules/most/src/invoke.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * When an event arrives on sampler, emit the result of calling f with the latest
 * values of all streams being sampled
 * @param {function(...values):*} f function to apply to each set of sampled values
 * @param {Stream} sampler streams will be sampled whenever an event arrives
 *  on sampler
 * @returns {Stream} stream of sampled and transformed values
 */
function sample (f, sampler /*, ...streams */) {
  return sampleArray(f, sampler, _most_prelude__WEBPACK_IMPORTED_MODULE_3__["drop"](2, arguments))
}

/**
 * When an event arrives on sampler, emit the latest event value from stream.
 * @param {Stream} sampler stream of events at whose arrival time
 *  stream's latest value will be propagated
 * @param {Stream} stream stream of values
 * @returns {Stream} sampled stream of values
 */
function sampleWith (sampler, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Sampler(_most_prelude__WEBPACK_IMPORTED_MODULE_3__["id"], sampler.source, [stream.source]))
}

function sampleArray (f, sampler, streams) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Sampler(f, sampler.source, _most_prelude__WEBPACK_IMPORTED_MODULE_3__["map"](getSource, streams)))
}

function getSource (stream) {
  return stream.source
}

function Sampler (f, sampler, sources) {
  this.f = f
  this.sampler = sampler
  this.sources = sources
}

Sampler.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l + 1)
  var sinks = new Array(l)

  var sampleSink = new SampleSink(this.f, sinks, sink)

  for (var hold, i = 0; i < l; ++i) {
    hold = sinks[i] = new Hold(sampleSink)
    disposables[i] = this.sources[i].run(hold, scheduler)
  }

  disposables[i] = this.sampler.run(sampleSink, scheduler)

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__["all"](disposables)
}

function Hold (sink) {
  this.sink = sink
  this.hasValue = false
}

Hold.prototype.event = function (t, x) {
  this.value = x
  this.hasValue = true
  this.sink._notify(this)
}

Hold.prototype.end = function () {}
Hold.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

function SampleSink (f, sinks, sink) {
  this.f = f
  this.sinks = sinks
  this.sink = sink
  this.active = false
}

SampleSink.prototype._notify = function () {
  if (!this.active) {
    this.active = this.sinks.every(hasValue)
  }
}

SampleSink.prototype.event = function (t) {
  if (this.active) {
    this.sink.event(t, Object(_invoke__WEBPACK_IMPORTED_MODULE_4__["default"])(this.f, _most_prelude__WEBPACK_IMPORTED_MODULE_3__["map"](getValue, this.sinks)))
  }
}

SampleSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end
SampleSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

function hasValue (hold) {
  return hold.hasValue
}

function getValue (hold) {
  return hold.value
}


/***/ }),

/***/ "./node_modules/most/src/combinator/slice.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/combinator/slice.js ***!
  \***************************************************/
/*! exports provided: take, skip, slice, takeWhile, skipWhile, skipAfter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return take; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skip", function() { return skip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return slice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return takeWhile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipWhile", function() { return skipWhile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipAfter", function() { return skipAfter; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _source_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../source/core */ "./node_modules/most/src/source/core.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _fusion_Map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fusion/Map */ "./node_modules/most/src/fusion/Map.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * @param {number} n
 * @param {Stream} stream
 * @returns {Stream} new stream containing only up to the first n items from stream
 */
function take (n, stream) {
  return slice(0, n, stream)
}

/**
 * @param {number} n
 * @param {Stream} stream
 * @returns {Stream} new stream with the first n items removed
 */
function skip (n, stream) {
  return slice(n, Infinity, stream)
}

/**
 * Slice a stream by index. Negative start/end indexes are not supported
 * @param {number} start
 * @param {number} end
 * @param {Stream} stream
 * @returns {Stream} stream containing items where start <= index < end
 */
function slice (start, end, stream) {
  return end <= start ? _source_core__WEBPACK_IMPORTED_MODULE_2__["empty"]()
    : new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](sliceSource(start, end, stream.source))
}

function sliceSource (start, end, source) {
  return source instanceof _fusion_Map__WEBPACK_IMPORTED_MODULE_4__["default"] ? commuteMapSlice(start, end, source)
    : source instanceof Slice ? fuseSlice(start, end, source)
    : new Slice(start, end, source)
}

function commuteMapSlice (start, end, source) {
  return _fusion_Map__WEBPACK_IMPORTED_MODULE_4__["default"].create(source.f, sliceSource(start, end, source.source))
}

function fuseSlice (start, end, source) {
  start += source.min
  end = Math.min(end + source.min, source.max)
  return new Slice(start, end, source.source)
}

function Slice (min, max, source) {
  this.source = source
  this.min = min
  this.max = max
}

Slice.prototype.run = function (sink, scheduler) {
  var disposable = _disposable_dispose__WEBPACK_IMPORTED_MODULE_3__["settable"]()
  var sliceSink = new SliceSink(this.min, this.max - this.min, sink, disposable)

  disposable.setDisposable(this.source.run(sliceSink, scheduler))
  return disposable
}

function SliceSink (skip, take, sink, disposable) {
  this.sink = sink
  this.skip = skip
  this.take = take
  this.disposable = disposable
}

SliceSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end
SliceSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

SliceSink.prototype.event = function (t, x) {
  /* eslint complexity: [1, 4] */
  if (this.skip > 0) {
    this.skip -= 1
    return
  }

  if (this.take === 0) {
    return
  }

  this.take -= 1
  this.sink.event(t, x)
  if (this.take === 0) {
    this.disposable.dispose()
    this.sink.end(t, x)
  }
}

function takeWhile (p, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new TakeWhile(p, stream.source))
}

function TakeWhile (p, source) {
  this.p = p
  this.source = source
}

TakeWhile.prototype.run = function (sink, scheduler) {
  var disposable = _disposable_dispose__WEBPACK_IMPORTED_MODULE_3__["settable"]()
  var takeWhileSink = new TakeWhileSink(this.p, sink, disposable)

  disposable.setDisposable(this.source.run(takeWhileSink, scheduler))
  return disposable
}

function TakeWhileSink (p, sink, disposable) {
  this.p = p
  this.sink = sink
  this.active = true
  this.disposable = disposable
}

TakeWhileSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end
TakeWhileSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

TakeWhileSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }

  var p = this.p
  this.active = p(x)
  if (this.active) {
    this.sink.event(t, x)
  } else {
    this.disposable.dispose()
    this.sink.end(t, x)
  }
}

function skipWhile (p, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new SkipWhile(p, stream.source))
}

function SkipWhile (p, source) {
  this.p = p
  this.source = source
}

SkipWhile.prototype.run = function (sink, scheduler) {
  return this.source.run(new SkipWhileSink(this.p, sink), scheduler)
}

function SkipWhileSink (p, sink) {
  this.p = p
  this.sink = sink
  this.skipping = true
}

SkipWhileSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end
SkipWhileSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

SkipWhileSink.prototype.event = function (t, x) {
  if (this.skipping) {
    var p = this.p
    this.skipping = p(x)
    if (this.skipping) {
      return
    }
  }

  this.sink.event(t, x)
}

function skipAfter (p, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new SkipAfter(p, stream.source))
}

function SkipAfter (p, source) {
  this.p = p
  this.source = source
}

SkipAfter.prototype.run = function run (sink, scheduler) {
  return this.source.run(new SkipAfterSink(this.p, sink), scheduler)
}

function SkipAfterSink (p, sink) {
  this.p = p
  this.sink = sink
  this.skipping = false
}

SkipAfterSink.prototype.event = function event (t, x) {
  if (this.skipping) {
    return
  }

  var p = this.p
  this.skipping = p(x)
  this.sink.event(t, x)

  if (this.skipping) {
    this.sink.end(t, x)
  }
}

SkipAfterSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end
SkipAfterSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error


/***/ }),

/***/ "./node_modules/most/src/combinator/switch.js":
/*!****************************************************!*\
  !*** ./node_modules/most/src/combinator/switch.js ***!
  \****************************************************/
/*! exports provided: switchLatest, switch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchLatest", function() { return switchLatest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switch", function() { return switchLatest; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Given a stream of streams, return a new stream that adopts the behavior
 * of the most recent inner stream.
 * @param {Stream} stream of streams on which to switch
 * @returns {Stream} switching stream
 */
function switchLatest (stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Switch(stream.source))
}



function Switch (source) {
  this.source = source
}

Switch.prototype.run = function (sink, scheduler) {
  var switchSink = new SwitchSink(sink, scheduler)
  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["all"]([switchSink, this.source.run(switchSink, scheduler)])
}

function SwitchSink (sink, scheduler) {
  this.sink = sink
  this.scheduler = scheduler
  this.current = null
  this.ended = false
}

SwitchSink.prototype.event = function (t, stream) {
  this._disposeCurrent(t) // TODO: capture the result of this dispose
  this.current = new Segment(t, Infinity, this, this.sink)
  this.current.disposable = stream.source.run(this.current, this.scheduler)
}

SwitchSink.prototype.end = function (t, x) {
  this.ended = true
  this._checkEnd(t, x)
}

SwitchSink.prototype.error = function (t, e) {
  this.ended = true
  this.sink.error(t, e)
}

SwitchSink.prototype.dispose = function () {
  return this._disposeCurrent(this.scheduler.now())
}

SwitchSink.prototype._disposeCurrent = function (t) {
  if (this.current !== null) {
    return this.current._dispose(t)
  }
}

SwitchSink.prototype._disposeInner = function (t, inner) {
  inner._dispose(t) // TODO: capture the result of this dispose
  if (inner === this.current) {
    this.current = null
  }
}

SwitchSink.prototype._checkEnd = function (t, x) {
  if (this.ended && this.current === null) {
    this.sink.end(t, x)
  }
}

SwitchSink.prototype._endInner = function (t, x, inner) {
  this._disposeInner(t, inner)
  this._checkEnd(t, x)
}

SwitchSink.prototype._errorInner = function (t, e, inner) {
  this._disposeInner(t, inner)
  this.sink.error(t, e)
}

function Segment (min, max, outer, sink) {
  this.min = min
  this.max = max
  this.outer = outer
  this.sink = sink
  this.disposable = _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["empty"]()
}

Segment.prototype.event = function (t, x) {
  if (t < this.max) {
    this.sink.event(Math.max(t, this.min), x)
  }
}

Segment.prototype.end = function (t, x) {
  this.outer._endInner(Math.max(t, this.min), x, this)
}

Segment.prototype.error = function (t, e) {
  this.outer._errorInner(Math.max(t, this.min), e, this)
}

Segment.prototype._dispose = function (t) {
  this.max = t
  _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["tryDispose"](t, this.disposable, this.sink)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/thru.js":
/*!**************************************************!*\
  !*** ./node_modules/most/src/combinator/thru.js ***!
  \**************************************************/
/*! exports provided: thru */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "thru", function() { return thru; });
/** @license MIT License (c) copyright 2010-2017 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function thru (f, stream) {
  return f(stream)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/timeslice.js":
/*!*******************************************************!*\
  !*** ./node_modules/most/src/combinator/timeslice.js ***!
  \*******************************************************/
/*! exports provided: takeUntil, skipUntil, during */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "takeUntil", function() { return takeUntil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipUntil", function() { return skipUntil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "during", function() { return during; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _combinator_flatMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../combinator/flatMap */ "./node_modules/most/src/combinator/flatMap.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






function takeUntil (signal, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Until(signal.source, stream.source))
}

function skipUntil (signal, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Since(signal.source, stream.source))
}

function during (timeWindow, stream) {
  return takeUntil(Object(_combinator_flatMap__WEBPACK_IMPORTED_MODULE_3__["join"])(timeWindow), skipUntil(timeWindow, stream))
}

function Until (maxSignal, source) {
  this.maxSignal = maxSignal
  this.source = source
}

Until.prototype.run = function (sink, scheduler) {
  var min = new Bound(-Infinity, sink)
  var max = new UpperBound(this.maxSignal, sink, scheduler)
  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler)

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__["all"]([min, max, disposable])
}

function Since (minSignal, source) {
  this.minSignal = minSignal
  this.source = source
}

Since.prototype.run = function (sink, scheduler) {
  var min = new LowerBound(this.minSignal, sink, scheduler)
  var max = new Bound(Infinity, sink)
  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler)

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_2__["all"]([min, max, disposable])
}

function Bound (value, sink) {
  this.value = value
  this.sink = sink
}

Bound.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error
Bound.prototype.event = noop
Bound.prototype.end = noop
Bound.prototype.dispose = noop

function TimeWindowSink (min, max, sink) {
  this.min = min
  this.max = max
  this.sink = sink
}

TimeWindowSink.prototype.event = function (t, x) {
  if (t >= this.min.value && t < this.max.value) {
    this.sink.event(t, x)
  }
}

TimeWindowSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error
TimeWindowSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end

function LowerBound (signal, sink, scheduler) {
  this.value = Infinity
  this.sink = sink
  this.disposable = signal.run(this, scheduler)
}

LowerBound.prototype.event = function (t /*, x */) {
  if (t < this.value) {
    this.value = t
  }
}

LowerBound.prototype.end = noop
LowerBound.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

LowerBound.prototype.dispose = function () {
  return this.disposable.dispose()
}

function UpperBound (signal, sink, scheduler) {
  this.value = Infinity
  this.sink = sink
  this.disposable = signal.run(this, scheduler)
}

UpperBound.prototype.event = function (t, x) {
  if (t < this.value) {
    this.value = t
    this.sink.end(t, x)
  }
}

UpperBound.prototype.end = noop
UpperBound.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

UpperBound.prototype.dispose = function () {
  return this.disposable.dispose()
}

function noop () {}


/***/ }),

/***/ "./node_modules/most/src/combinator/timestamp.js":
/*!*******************************************************!*\
  !*** ./node_modules/most/src/combinator/timestamp.js ***!
  \*******************************************************/
/*! exports provided: timestamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return timestamp; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function timestamp (stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Timestamp(stream.source))
}

function Timestamp (source) {
  this.source = source
}

Timestamp.prototype.run = function (sink, scheduler) {
  return this.source.run(new TimestampSink(sink), scheduler)
}

function TimestampSink (sink) {
  this.sink = sink
}

TimestampSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.end
TimestampSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.error

TimestampSink.prototype.event = function (t, x) {
  this.sink.event(t, { time: t, value: x })
}


/***/ }),

/***/ "./node_modules/most/src/combinator/transduce.js":
/*!*******************************************************!*\
  !*** ./node_modules/most/src/combinator/transduce.js ***!
  \*******************************************************/
/*! exports provided: transduce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transduce", function() { return transduce; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Transform a stream by passing its events through a transducer.
 * @param  {function} transducer transducer function
 * @param  {Stream} stream stream whose events will be passed through the
 *  transducer
 * @return {Stream} stream of events transformed by the transducer
 */
function transduce (transducer, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Transduce(transducer, stream.source))
}

function Transduce (transducer, source) {
  this.transducer = transducer
  this.source = source
}

Transduce.prototype.run = function (sink, scheduler) {
  var xf = this.transducer(new Transformer(sink))
  return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler)
}

function TransduceSink (adapter, sink) {
  this.xf = adapter
  this.sink = sink
}

TransduceSink.prototype.event = function (t, x) {
  var next = this.xf.step(t, x)

  return this.xf.isReduced(next)
    ? this.sink.end(t, this.xf.getResult(next))
    : next
}

TransduceSink.prototype.end = function (t, x) {
  return this.xf.result(x)
}

TransduceSink.prototype.error = function (t, e) {
  return this.sink.error(t, e)
}

function Transformer (sink) {
  this.time = -Infinity
  this.sink = sink
}

Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function () {}

Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function (t, x) {
  if (!isNaN(t)) {
    this.time = Math.max(t, this.time)
  }
  return this.sink.event(this.time, x)
}

Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function (x) {
  return this.sink.end(this.time, x)
}

/**
* Given an object supporting the new or legacy transducer protocol,
* create an adapter for it.
* @param {object} tx transform
* @returns {TxAdapter|LegacyTxAdapter}
*/
function getTxHandler (tx) {
  return typeof tx['@@transducer/step'] === 'function'
    ? new TxAdapter(tx)
    : new LegacyTxAdapter(tx)
}

/**
* Adapter for new official transducer protocol
* @param {object} tx transform
* @constructor
*/
function TxAdapter (tx) {
  this.tx = tx
}

TxAdapter.prototype.step = function (t, x) {
  return this.tx['@@transducer/step'](t, x)
}
TxAdapter.prototype.result = function (x) {
  return this.tx['@@transducer/result'](x)
}
TxAdapter.prototype.isReduced = function (x) {
  return x != null && x['@@transducer/reduced']
}
TxAdapter.prototype.getResult = function (x) {
  return x['@@transducer/value']
}

/**
* Adapter for older transducer protocol
* @param {object} tx transform
* @constructor
*/
function LegacyTxAdapter (tx) {
  this.tx = tx
}

LegacyTxAdapter.prototype.step = function (t, x) {
  return this.tx.step(t, x)
}
LegacyTxAdapter.prototype.result = function (x) {
  return this.tx.result(x)
}
LegacyTxAdapter.prototype.isReduced = function (x) {
  return x != null && x.__transducers_reduced__
}
LegacyTxAdapter.prototype.getResult = function (x) {
  return x.value
}


/***/ }),

/***/ "./node_modules/most/src/combinator/transform.js":
/*!*******************************************************!*\
  !*** ./node_modules/most/src/combinator/transform.js ***!
  \*******************************************************/
/*! exports provided: map, constant, tap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constant", function() { return constant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return tap; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _fusion_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fusion/Map */ "./node_modules/most/src/fusion/Map.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @param {Stream} stream stream to map
 * @returns {Stream} stream containing items transformed by f
 */
function map (f, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](_fusion_Map__WEBPACK_IMPORTED_MODULE_1__["default"].create(f, stream.source))
}

/**
* Replace each value in the stream with x
* @param {*} x
* @param {Stream} stream
* @returns {Stream} stream containing items replaced with x
*/
function constant (x, stream) {
  return map(function () {
    return x
  }, stream)
}

/**
* Perform a side effect for each item in the stream
* @param {function(x:*):*} f side effect to execute for each item. The
*  return value will be discarded.
* @param {Stream} stream stream to tap
* @returns {Stream} new stream containing the same items as this stream
*/
function tap (f, stream) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Tap(f, stream.source))
}

function Tap (f, source) {
  this.source = source
  this.f = f
}

Tap.prototype.run = function (sink, scheduler) {
  return this.source.run(new TapSink(this.f, sink), scheduler)
}

function TapSink (f, sink) {
  this.sink = sink
  this.f = f
}

TapSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.end
TapSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.error

TapSink.prototype.event = function (t, x) {
  var f = this.f
  f(x)
  this.sink.event(t, x)
}


/***/ }),

/***/ "./node_modules/most/src/combinator/zip.js":
/*!*************************************************!*\
  !*** ./node_modules/most/src/combinator/zip.js ***!
  \*************************************************/
/*! exports provided: zip, zipArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return zip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zipArray", function() { return zipArray; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ "./node_modules/most/src/combinator/transform.js");
/* harmony import */ var _source_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../source/core */ "./node_modules/most/src/source/core.js");
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _sink_IndexSink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sink/IndexSink */ "./node_modules/most/src/sink/IndexSink.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/* harmony import */ var _invoke__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../invoke */ "./node_modules/most/src/invoke.js");
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Queue */ "./node_modules/most/src/Queue.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */











var map = _most_prelude__WEBPACK_IMPORTED_MODULE_6__["map"]
var tail = _most_prelude__WEBPACK_IMPORTED_MODULE_6__["tail"]

/**
 * Combine streams pairwise (or tuple-wise) by index by applying f to values
 * at corresponding indices.  The returned stream ends when any of the input
 * streams ends.
 * @param {function} f function to combine values
 * @returns {Stream} new stream with items at corresponding indices combined
 *  using f
 */
function zip (f /*, ...streams */) {
  return zipArray(f, tail(arguments))
}

/**
* Combine streams pairwise (or tuple-wise) by index by applying f to values
* at corresponding indices.  The returned stream ends when any of the input
* streams ends.
* @param {function} f function to combine values
* @param {[Stream]} streams streams to zip using f
* @returns {Stream} new stream with items at corresponding indices combined
*  using f
*/
function zipArray (f, streams) {
  return streams.length === 0 ? _source_core__WEBPACK_IMPORTED_MODULE_2__["empty"]()
: streams.length === 1 ? _transform__WEBPACK_IMPORTED_MODULE_1__["map"](f, streams[0])
: new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Zip(f, map(getSource, streams)))
}

function getSource (stream) {
  return stream.source
}

function Zip (f, sources) {
  this.f = f
  this.sources = sources
}

Zip.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l)
  var sinks = new Array(l)
  var buffers = new Array(l)

  var zipSink = new ZipSink(this.f, buffers, sinks, sink)

  for (var indexSink, i = 0; i < l; ++i) {
    buffers[i] = new _Queue__WEBPACK_IMPORTED_MODULE_8__["default"]()
    indexSink = sinks[i] = new _sink_IndexSink__WEBPACK_IMPORTED_MODULE_4__["default"](i, zipSink)
    disposables[i] = this.sources[i].run(indexSink, scheduler)
  }

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_5__["all"](disposables)
}

function ZipSink (f, buffers, sinks, sink) {
  this.f = f
  this.sinks = sinks
  this.sink = sink
  this.buffers = buffers
}

ZipSink.prototype.event = function (t, indexedValue) { // eslint-disable-line complexity
  var buffers = this.buffers
  var buffer = buffers[indexedValue.index]

  buffer.push(indexedValue.value)

  if (buffer.length() === 1) {
    if (!ready(this.buffers)) {
      return
    }

    emitZipped(this.f, t, buffers, this.sink)

    if (ended(this.buffers, this.sinks)) {
      this.sink.end(t, void 0)
    }
  }
}

ZipSink.prototype.end = function (t, indexedValue) {
  var buffer = this.buffers[indexedValue.index]
  if (buffer.isEmpty()) {
    this.sink.end(t, indexedValue.value)
  }
}

ZipSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.error

function emitZipped (f, t, buffers, sink) {
  sink.event(t, Object(_invoke__WEBPACK_IMPORTED_MODULE_7__["default"])(f, map(head, buffers)))
}

function head (buffer) {
  return buffer.shift()
}

function ended (buffers, sinks) {
  for (var i = 0, l = buffers.length; i < l; ++i) {
    if (buffers[i].isEmpty() && !sinks[i].active) {
      return true
    }
  }
  return false
}

function ready (buffers) {
  for (var i = 0, l = buffers.length; i < l; ++i) {
    if (buffers[i].isEmpty()) {
      return false
    }
  }
  return true
}


/***/ }),

/***/ "./node_modules/most/src/disposable/Disposable.js":
/*!********************************************************!*\
  !*** ./node_modules/most/src/disposable/Disposable.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Disposable; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/**
 * Create a new Disposable which will dispose its underlying resource.
 * @param {function} dispose function
 * @param {*?} data any data to be passed to disposer function
 * @constructor
 */
function Disposable (dispose, data) {
  this._dispose = dispose
  this._data = data
}

Disposable.prototype.dispose = function () {
  return this._dispose(this._data)
}


/***/ }),

/***/ "./node_modules/most/src/disposable/SettableDisposable.js":
/*!****************************************************************!*\
  !*** ./node_modules/most/src/disposable/SettableDisposable.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettableDisposable; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function SettableDisposable () {
  this.disposable = void 0
  this.disposed = false
  this._resolve = void 0

  var self = this
  this.result = new Promise(function (resolve) {
    self._resolve = resolve
  })
}

SettableDisposable.prototype.setDisposable = function (disposable) {
  if (this.disposable !== void 0) {
    throw new Error('setDisposable called more than once')
  }

  this.disposable = disposable

  if (this.disposed) {
    this._resolve(disposable.dispose())
  }
}

SettableDisposable.prototype.dispose = function () {
  if (this.disposed) {
    return this.result
  }

  this.disposed = true

  if (this.disposable !== void 0) {
    this.result = this.disposable.dispose()
  }

  return this.result
}


/***/ }),

/***/ "./node_modules/most/src/disposable/dispose.js":
/*!*****************************************************!*\
  !*** ./node_modules/most/src/disposable/dispose.js ***!
  \*****************************************************/
/*! exports provided: tryDispose, create, empty, all, promised, settable, once */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryDispose", function() { return tryDispose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promised", function() { return promised; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settable", function() { return settable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony import */ var _Disposable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Disposable */ "./node_modules/most/src/disposable/Disposable.js");
/* harmony import */ var _SettableDisposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettableDisposable */ "./node_modules/most/src/disposable/SettableDisposable.js");
/* harmony import */ var _Promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Promise */ "./node_modules/most/src/Promise.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





var map = _most_prelude__WEBPACK_IMPORTED_MODULE_3__["map"]
var identity = _most_prelude__WEBPACK_IMPORTED_MODULE_3__["id"]

/**
 * Call disposable.dispose.  If it returns a promise, catch promise
 * error and forward it through the provided sink.
 * @param {number} t time
 * @param {{dispose: function}} disposable
 * @param {{error: function}} sink
 * @return {*} result of disposable.dispose
 */
function tryDispose (t, disposable, sink) {
  var result = disposeSafely(disposable)
  return Object(_Promise__WEBPACK_IMPORTED_MODULE_2__["isPromise"])(result)
    ? result.catch(function (e) {
      sink.error(t, e)
    })
    : result
}

/**
 * Create a new Disposable which will dispose its underlying resource
 * at most once.
 * @param {function} dispose function
 * @param {*?} data any data to be passed to disposer function
 * @return {Disposable}
 */
function create (dispose, data) {
  return once(new _Disposable__WEBPACK_IMPORTED_MODULE_0__["default"](dispose, data))
}

/**
 * Create a noop disposable. Can be used to satisfy a Disposable
 * requirement when no actual resource needs to be disposed.
 * @return {Disposable|exports|module.exports}
 */
function empty () {
  return new _Disposable__WEBPACK_IMPORTED_MODULE_0__["default"](identity, void 0)
}

/**
 * Create a disposable that will dispose all input disposables in parallel.
 * @param {Array<Disposable>} disposables
 * @return {Disposable}
 */
function all (disposables) {
  return create(disposeAll, disposables)
}

function disposeAll (disposables) {
  return Promise.all(map(disposeSafely, disposables))
}

function disposeSafely (disposable) {
  try {
    return disposable.dispose()
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * Create a disposable from a promise for another disposable
 * @param {Promise<Disposable>} disposablePromise
 * @return {Disposable}
 */
function promised (disposablePromise) {
  return create(disposePromise, disposablePromise)
}

function disposePromise (disposablePromise) {
  return disposablePromise.then(disposeOne)
}

function disposeOne (disposable) {
  return disposable.dispose()
}

/**
 * Create a disposable proxy that allows its underlying disposable to
 * be set later.
 * @return {SettableDisposable}
 */
function settable () {
  return new _SettableDisposable__WEBPACK_IMPORTED_MODULE_1__["default"]()
}

/**
 * Wrap an existing disposable (which may not already have been once()d)
 * so that it will only dispose its underlying resource at most once.
 * @param {{ dispose: function() }} disposable
 * @return {Disposable} wrapped disposable
 */
function once (disposable) {
  return new _Disposable__WEBPACK_IMPORTED_MODULE_0__["default"](disposeMemoized, memoized(disposable))
}

function disposeMemoized (memoized) {
  if (!memoized.disposed) {
    memoized.disposed = true
    memoized.value = disposeSafely(memoized.disposable)
    memoized.disposable = void 0
  }

  return memoized.value
}

function memoized (disposable) {
  return { disposed: false, disposable: disposable, value: void 0 }
}


/***/ }),

/***/ "./node_modules/most/src/fatalError.js":
/*!*********************************************!*\
  !*** ./node_modules/most/src/fatalError.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return fatalError; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function fatalError (e) {
  setTimeout(function () {
    throw e
  }, 0)
}


/***/ }),

/***/ "./node_modules/most/src/fusion/Filter.js":
/*!************************************************!*\
  !*** ./node_modules/most/src/fusion/Filter.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function Filter (p, source) {
  this.p = p
  this.source = source
}

/**
 * Create a filtered source, fusing adjacent filter.filter if possible
 * @param {function(x:*):boolean} p filtering predicate
 * @param {{run:function}} source source to filter
 * @returns {Filter} filtered source
 */
Filter.create = function createFilter (p, source) {
  if (source instanceof Filter) {
    return new Filter(and(source.p, p), source.source)
  }

  return new Filter(p, source)
}

Filter.prototype.run = function (sink, scheduler) {
  return this.source.run(new FilterSink(this.p, sink), scheduler)
}

function FilterSink (p, sink) {
  this.p = p
  this.sink = sink
}

FilterSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.end
FilterSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.error

FilterSink.prototype.event = function (t, x) {
  var p = this.p
  p(x) && this.sink.event(t, x)
}

function and (p, q) {
  return function (x) {
    return p(x) && q(x)
  }
}


/***/ }),

/***/ "./node_modules/most/src/fusion/FilterMap.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/fusion/FilterMap.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilterMap; });
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function FilterMap (p, f, source) {
  this.p = p
  this.f = f
  this.source = source
}

FilterMap.prototype.run = function (sink, scheduler) {
  return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler)
}

function FilterMapSink (p, f, sink) {
  this.p = p
  this.f = f
  this.sink = sink
}

FilterMapSink.prototype.event = function (t, x) {
  var f = this.f
  var p = this.p
  p(x) && this.sink.event(t, f(x))
}

FilterMapSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.end
FilterMapSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.error


/***/ }),

/***/ "./node_modules/most/src/fusion/Map.js":
/*!*********************************************!*\
  !*** ./node_modules/most/src/fusion/Map.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Map; });
/* harmony import */ var _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sink/Pipe */ "./node_modules/most/src/sink/Pipe.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filter */ "./node_modules/most/src/fusion/Filter.js");
/* harmony import */ var _FilterMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterMap */ "./node_modules/most/src/fusion/FilterMap.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






function Map (f, source) {
  this.f = f
  this.source = source
}

/**
 * Create a mapped source, fusing adjacent map.map, filter.map,
 * and filter.map.map if possible
 * @param {function(*):*} f mapping function
 * @param {{run:function}} source source to map
 * @returns {Map|FilterMap} mapped source, possibly fused
 */
Map.create = function createMap (f, source) {
  if (source instanceof Map) {
    return new Map(_most_prelude__WEBPACK_IMPORTED_MODULE_3__["compose"](f, source.f), source.source)
  }

  if (source instanceof _Filter__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    return new _FilterMap__WEBPACK_IMPORTED_MODULE_2__["default"](source.p, f, source.source)
  }

  return new Map(f, source)
}

Map.prototype.run = function (sink, scheduler) { // eslint-disable-line no-extend-native
  return this.source.run(new MapSink(this.f, sink), scheduler)
}

function MapSink (f, sink) {
  this.f = f
  this.sink = sink
}

MapSink.prototype.end = _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.end
MapSink.prototype.error = _sink_Pipe__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.error

MapSink.prototype.event = function (t, x) {
  var f = this.f
  this.sink.event(t, f(x))
}


/***/ }),

/***/ "./node_modules/most/src/index.js":
/*!****************************************!*\
  !*** ./node_modules/most/src/index.js ***!
  \****************************************/
/*! exports provided: Stream, of, just, empty, never, from, periodic, fromEvent, observe, forEach, drain, loop, scan, reduce, unfold, iterate, generate, concat, startWith, map, constant, tap, ap, transduce, flatMap, chain, join, continueWith, flatMapEnd, concatMap, mergeConcurrently, merge, mergeArray, combine, combineArray, sample, sampleArray, sampleWith, zip, zipArray, switchLatest, switch, filter, skipRepeats, distinct, skipRepeatsWith, distinctBy, take, skip, slice, takeWhile, skipWhile, skipAfter, takeUntil, until, skipUntil, since, during, delay, timestamp, throttle, debounce, fromPromise, awaitPromises, await, recoverWith, flatMapError, throwError, multicast, defaultScheduler, PropagateTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stream */ "./node_modules/most/src/Stream.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stream", function() { return _Stream__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/* harmony import */ var _source_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source/core */ "./node_modules/most/src/source/core.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "of", function() { return _source_core__WEBPACK_IMPORTED_MODULE_2__["of"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "just", function() { return _source_core__WEBPACK_IMPORTED_MODULE_2__["of"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return _source_core__WEBPACK_IMPORTED_MODULE_2__["empty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "never", function() { return _source_core__WEBPACK_IMPORTED_MODULE_2__["never"]; });

/* harmony import */ var _source_from__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./source/from */ "./node_modules/most/src/source/from.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "from", function() { return _source_from__WEBPACK_IMPORTED_MODULE_3__["from"]; });

/* harmony import */ var _source_periodic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./source/periodic */ "./node_modules/most/src/source/periodic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "periodic", function() { return _source_periodic__WEBPACK_IMPORTED_MODULE_4__["periodic"]; });

/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");
/* harmony import */ var _observable_subscribe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./observable/subscribe */ "./node_modules/most/src/observable/subscribe.js");
/* harmony import */ var _combinator_thru__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./combinator/thru */ "./node_modules/most/src/combinator/thru.js");
/* harmony import */ var _source_fromEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./source/fromEvent */ "./node_modules/most/src/source/fromEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _source_fromEvent__WEBPACK_IMPORTED_MODULE_8__["fromEvent"]; });

/* harmony import */ var _combinator_observe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./combinator/observe */ "./node_modules/most/src/combinator/observe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return _combinator_observe__WEBPACK_IMPORTED_MODULE_9__["observe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return _combinator_observe__WEBPACK_IMPORTED_MODULE_9__["observe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drain", function() { return _combinator_observe__WEBPACK_IMPORTED_MODULE_9__["drain"]; });

/* harmony import */ var _combinator_loop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./combinator/loop */ "./node_modules/most/src/combinator/loop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return _combinator_loop__WEBPACK_IMPORTED_MODULE_10__["loop"]; });

/* harmony import */ var _combinator_accumulate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./combinator/accumulate */ "./node_modules/most/src/combinator/accumulate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return _combinator_accumulate__WEBPACK_IMPORTED_MODULE_11__["scan"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return _combinator_accumulate__WEBPACK_IMPORTED_MODULE_11__["reduce"]; });

/* harmony import */ var _source_unfold__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./source/unfold */ "./node_modules/most/src/source/unfold.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unfold", function() { return _source_unfold__WEBPACK_IMPORTED_MODULE_12__["unfold"]; });

/* harmony import */ var _source_iterate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./source/iterate */ "./node_modules/most/src/source/iterate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "iterate", function() { return _source_iterate__WEBPACK_IMPORTED_MODULE_13__["iterate"]; });

/* harmony import */ var _source_generate__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./source/generate */ "./node_modules/most/src/source/generate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generate", function() { return _source_generate__WEBPACK_IMPORTED_MODULE_14__["generate"]; });

/* harmony import */ var _combinator_build__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./combinator/build */ "./node_modules/most/src/combinator/build.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return _combinator_build__WEBPACK_IMPORTED_MODULE_15__["concat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "startWith", function() { return _combinator_build__WEBPACK_IMPORTED_MODULE_15__["cons"]; });

/* harmony import */ var _combinator_transform__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./combinator/transform */ "./node_modules/most/src/combinator/transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "map", function() { return _combinator_transform__WEBPACK_IMPORTED_MODULE_16__["map"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "constant", function() { return _combinator_transform__WEBPACK_IMPORTED_MODULE_16__["constant"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return _combinator_transform__WEBPACK_IMPORTED_MODULE_16__["tap"]; });

/* harmony import */ var _combinator_applicative__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./combinator/applicative */ "./node_modules/most/src/combinator/applicative.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return _combinator_applicative__WEBPACK_IMPORTED_MODULE_17__["ap"]; });

/* harmony import */ var _combinator_transduce__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./combinator/transduce */ "./node_modules/most/src/combinator/transduce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transduce", function() { return _combinator_transduce__WEBPACK_IMPORTED_MODULE_18__["transduce"]; });

/* harmony import */ var _combinator_flatMap__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./combinator/flatMap */ "./node_modules/most/src/combinator/flatMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatMap", function() { return _combinator_flatMap__WEBPACK_IMPORTED_MODULE_19__["flatMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return _combinator_flatMap__WEBPACK_IMPORTED_MODULE_19__["flatMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "join", function() { return _combinator_flatMap__WEBPACK_IMPORTED_MODULE_19__["join"]; });

/* harmony import */ var _combinator_continueWith__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./combinator/continueWith */ "./node_modules/most/src/combinator/continueWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "continueWith", function() { return _combinator_continueWith__WEBPACK_IMPORTED_MODULE_20__["continueWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatMapEnd", function() { return _combinator_continueWith__WEBPACK_IMPORTED_MODULE_20__["continueWith"]; });

/* harmony import */ var _combinator_concatMap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./combinator/concatMap */ "./node_modules/most/src/combinator/concatMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concatMap", function() { return _combinator_concatMap__WEBPACK_IMPORTED_MODULE_21__["concatMap"]; });

/* harmony import */ var _combinator_mergeConcurrently__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./combinator/mergeConcurrently */ "./node_modules/most/src/combinator/mergeConcurrently.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeConcurrently", function() { return _combinator_mergeConcurrently__WEBPACK_IMPORTED_MODULE_22__["mergeConcurrently"]; });

/* harmony import */ var _combinator_merge__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./combinator/merge */ "./node_modules/most/src/combinator/merge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _combinator_merge__WEBPACK_IMPORTED_MODULE_23__["merge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeArray", function() { return _combinator_merge__WEBPACK_IMPORTED_MODULE_23__["mergeArray"]; });

/* harmony import */ var _combinator_combine__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./combinator/combine */ "./node_modules/most/src/combinator/combine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return _combinator_combine__WEBPACK_IMPORTED_MODULE_24__["combine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combineArray", function() { return _combinator_combine__WEBPACK_IMPORTED_MODULE_24__["combineArray"]; });

/* harmony import */ var _combinator_sample__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./combinator/sample */ "./node_modules/most/src/combinator/sample.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return _combinator_sample__WEBPACK_IMPORTED_MODULE_25__["sample"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sampleArray", function() { return _combinator_sample__WEBPACK_IMPORTED_MODULE_25__["sampleArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sampleWith", function() { return _combinator_sample__WEBPACK_IMPORTED_MODULE_25__["sampleWith"]; });

/* harmony import */ var _combinator_zip__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./combinator/zip */ "./node_modules/most/src/combinator/zip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return _combinator_zip__WEBPACK_IMPORTED_MODULE_26__["zip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zipArray", function() { return _combinator_zip__WEBPACK_IMPORTED_MODULE_26__["zipArray"]; });

/* harmony import */ var _combinator_switch__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./combinator/switch */ "./node_modules/most/src/combinator/switch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "switchLatest", function() { return _combinator_switch__WEBPACK_IMPORTED_MODULE_27__["switchLatest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "switch", function() { return _combinator_switch__WEBPACK_IMPORTED_MODULE_27__["switchLatest"]; });

/* harmony import */ var _combinator_filter__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./combinator/filter */ "./node_modules/most/src/combinator/filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return _combinator_filter__WEBPACK_IMPORTED_MODULE_28__["filter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipRepeats", function() { return _combinator_filter__WEBPACK_IMPORTED_MODULE_28__["skipRepeats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinct", function() { return _combinator_filter__WEBPACK_IMPORTED_MODULE_28__["skipRepeats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipRepeatsWith", function() { return _combinator_filter__WEBPACK_IMPORTED_MODULE_28__["skipRepeatsWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctBy", function() { return _combinator_filter__WEBPACK_IMPORTED_MODULE_28__["skipRepeatsWith"]; });

/* harmony import */ var _combinator_slice__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./combinator/slice */ "./node_modules/most/src/combinator/slice.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "take", function() { return _combinator_slice__WEBPACK_IMPORTED_MODULE_29__["take"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skip", function() { return _combinator_slice__WEBPACK_IMPORTED_MODULE_29__["skip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return _combinator_slice__WEBPACK_IMPORTED_MODULE_29__["slice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return _combinator_slice__WEBPACK_IMPORTED_MODULE_29__["takeWhile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipWhile", function() { return _combinator_slice__WEBPACK_IMPORTED_MODULE_29__["skipWhile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipAfter", function() { return _combinator_slice__WEBPACK_IMPORTED_MODULE_29__["skipAfter"]; });

/* harmony import */ var _combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./combinator/timeslice */ "./node_modules/most/src/combinator/timeslice.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeUntil", function() { return _combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["takeUntil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "until", function() { return _combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["takeUntil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "skipUntil", function() { return _combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["skipUntil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "since", function() { return _combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["skipUntil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "during", function() { return _combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["during"]; });

/* harmony import */ var _combinator_delay__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./combinator/delay */ "./node_modules/most/src/combinator/delay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return _combinator_delay__WEBPACK_IMPORTED_MODULE_31__["delay"]; });

/* harmony import */ var _combinator_timestamp__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./combinator/timestamp */ "./node_modules/most/src/combinator/timestamp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return _combinator_timestamp__WEBPACK_IMPORTED_MODULE_32__["timestamp"]; });

/* harmony import */ var _combinator_limit__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./combinator/limit */ "./node_modules/most/src/combinator/limit.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return _combinator_limit__WEBPACK_IMPORTED_MODULE_33__["throttle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _combinator_limit__WEBPACK_IMPORTED_MODULE_33__["debounce"]; });

/* harmony import */ var _combinator_promises__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./combinator/promises */ "./node_modules/most/src/combinator/promises.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return _combinator_promises__WEBPACK_IMPORTED_MODULE_34__["fromPromise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "awaitPromises", function() { return _combinator_promises__WEBPACK_IMPORTED_MODULE_34__["awaitPromises"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "await", function() { return _combinator_promises__WEBPACK_IMPORTED_MODULE_34__["awaitPromises"]; });

/* harmony import */ var _combinator_errors__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./combinator/errors */ "./node_modules/most/src/combinator/errors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recoverWith", function() { return _combinator_errors__WEBPACK_IMPORTED_MODULE_35__["recoverWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatMapError", function() { return _combinator_errors__WEBPACK_IMPORTED_MODULE_35__["flatMapError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return _combinator_errors__WEBPACK_IMPORTED_MODULE_35__["throwError"]; });

/* harmony import */ var _most_multicast__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @most/multicast */ "./node_modules/@most/multicast/dist/multicast.es.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "multicast", function() { return _most_multicast__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony import */ var _scheduler_defaultScheduler__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./scheduler/defaultScheduler */ "./node_modules/most/src/scheduler/defaultScheduler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultScheduler", function() { return _scheduler_defaultScheduler__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropagateTask", function() { return _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/* eslint import/first: 0 */








/**
 * Core stream type
 * @type {Stream}
 */


// Add of and empty to constructor for fantasy-land compat
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].of = _source_core__WEBPACK_IMPORTED_MODULE_2__["of"]
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].empty = _source_core__WEBPACK_IMPORTED_MODULE_2__["empty"]
// Add from to constructor for ES Observable compat
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].from = _source_from__WEBPACK_IMPORTED_MODULE_3__["from"]


// -----------------------------------------------------------------------
// Draft ES Observable proposal interop
// https://github.com/zenparsing/es-observable



_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.subscribe = function (subscriber) {
  return Object(_observable_subscribe__WEBPACK_IMPORTED_MODULE_6__["subscribe"])(subscriber, this)
}

_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype[symbol_observable__WEBPACK_IMPORTED_MODULE_5__["default"]] = function () {
  return this
}

// -----------------------------------------------------------------------
// Fluent adapter



/**
 * Adapt a functional stream transform to fluent style.
 * It applies f to the this stream object
 * @param  {function(s: Stream): Stream} f function that
 * receives the stream itself and must return a new stream
 * @return {Stream}
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.thru = function (f) {
  return Object(_combinator_thru__WEBPACK_IMPORTED_MODULE_7__["thru"])(f, this)
}

// -----------------------------------------------------------------------
// Adapting other sources

/**
 * Create a stream of events from the supplied EventTarget or EventEmitter
 * @param {String} event event name
 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter. The source
 *  must support either addEventListener/removeEventListener (w3c EventTarget:
 *  http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget),
 *  or addListener/removeListener (node EventEmitter: http://nodejs.org/api/events.html)
 * @returns {Stream} stream of events of the specified type from the source
 */


// -----------------------------------------------------------------------
// Observing





/**
 * Process all the events in the stream
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.observe = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.forEach = function (f) {
  return Object(_combinator_observe__WEBPACK_IMPORTED_MODULE_9__["observe"])(f, this)
}

/**
 * Consume all events in the stream, without providing a function to process each.
 * This causes a stream to become active and begin emitting events, and is useful
 * in cases where all processing has been setup upstream via other combinators, and
 * there is no need to process the terminal events.
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.drain = function () {
  return Object(_combinator_observe__WEBPACK_IMPORTED_MODULE_9__["drain"])(this)
}

// -------------------------------------------------------





/**
 * Generalized feedback loop. Call a stepper function for each event. The stepper
 * will be called with 2 params: the current seed and the an event value.  It must
 * return a new { seed, value } pair. The `seed` will be fed back into the next
 * invocation of stepper, and the `value` will be propagated as the event value.
 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
 * @param {*} seed initial seed value passed to first stepper call
 * @returns {Stream} new stream whose values are the `value` field of the objects
 * returned by the stepper
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.loop = function (stepper, seed) {
  return Object(_combinator_loop__WEBPACK_IMPORTED_MODULE_10__["loop"])(stepper, seed, this)
}

// -------------------------------------------------------





/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @returns {Stream} new stream containing successive reduce results
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.scan = function (f, initial) {
  return Object(_combinator_accumulate__WEBPACK_IMPORTED_MODULE_11__["scan"])(f, initial, this)
}

/**
 * Reduce the stream to produce a single result.  Note that reducing an infinite
 * stream will return a Promise that never fulfills, but that may reject if an error
 * occurs.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial optional initial value
 * @returns {Promise} promise for the file result of the reduce
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.reduce = function (f, initial) {
  return Object(_combinator_accumulate__WEBPACK_IMPORTED_MODULE_11__["reduce"])(f, initial, this)
}

// -----------------------------------------------------------------------
// Building and extending








/**
 * @param {Stream} tail
 * @returns {Stream} new stream containing all items in this followed by
 *  all items in tail
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.concat = function (tail) {
  return Object(_combinator_build__WEBPACK_IMPORTED_MODULE_15__["concat"])(this, tail)
}

/**
 * @param {*} x value to prepend
 * @returns {Stream} a new stream with x prepended
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.startWith = function (x) {
  return Object(_combinator_build__WEBPACK_IMPORTED_MODULE_15__["cons"])(x, this)
}

// -----------------------------------------------------------------------
// Transforming






/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @returns {Stream} stream containing items transformed by f
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.map = function (f) {
  return Object(_combinator_transform__WEBPACK_IMPORTED_MODULE_16__["map"])(f, this)
}

/**
 * Assume this stream contains functions, and apply each function to each item
 * in the provided stream.  This generates, in effect, a cross product.
 * @param {Stream} xs stream of items to which
 * @returns {Stream} stream containing the cross product of items
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.ap = function (xs) {
  return Object(_combinator_applicative__WEBPACK_IMPORTED_MODULE_17__["ap"])(this, xs)
}

/**
 * Replace each value in the stream with x
 * @param {*} x
 * @returns {Stream} stream containing items replaced with x
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.constant = function (x) {
  return Object(_combinator_transform__WEBPACK_IMPORTED_MODULE_16__["constant"])(x, this)
}

/**
 * Perform a side effect for each item in the stream
 * @param {function(x:*):*} f side effect to execute for each item. The
 *  return value will be discarded.
 * @returns {Stream} new stream containing the same items as this stream
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.tap = function (f) {
  return Object(_combinator_transform__WEBPACK_IMPORTED_MODULE_16__["tap"])(f, this)
}

// -----------------------------------------------------------------------
// Transducer support





/**
 * Transform this stream by passing its events through a transducer.
 * @param  {function} transducer transducer function
 * @return {Stream} stream of events transformed by the transducer
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.transduce = function (transducer) {
  return Object(_combinator_transduce__WEBPACK_IMPORTED_MODULE_18__["transduce"])(transducer, this)
}

// -----------------------------------------------------------------------
// FlatMapping



// @deprecated flatMap, use chain instead


/**
 * Map each value in the stream to a new stream, and merge it into the
 * returned outer stream. Event arrival times are preserved.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.chain = function (f) {
  return Object(_combinator_flatMap__WEBPACK_IMPORTED_MODULE_19__["flatMap"])(f, this)
}

// @deprecated use chain instead
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.flatMap = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.chain

  /**
 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer. Event arrival times are preserved.
 * @returns {Stream<X>} new stream containing all events of all inner streams
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.join = function () {
  return Object(_combinator_flatMap__WEBPACK_IMPORTED_MODULE_19__["join"])(this)
}



// @deprecated flatMapEnd, use continueWith instead


/**
 * Map the end event to a new stream, and begin emitting its values.
 * @param {function(x:*):Stream} f function that receives the end event value,
 * and *must* return a new Stream to continue with.
 * @returns {Stream} new stream that emits all events from the original stream,
 * followed by all events from the stream returned by f.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.continueWith = function (f) {
  return Object(_combinator_continueWith__WEBPACK_IMPORTED_MODULE_20__["continueWith"])(f, this)
}

// @deprecated use continueWith instead
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.flatMapEnd = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.continueWith





_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.concatMap = function (f) {
  return Object(_combinator_concatMap__WEBPACK_IMPORTED_MODULE_21__["concatMap"])(f, this)
}

// -----------------------------------------------------------------------
// Concurrent merging





/**
 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer, limiting the number of inner streams that may
 * be active concurrently.
 * @param {number} concurrency at most this many inner streams will be
 *  allowed to be active concurrently.
 * @return {Stream<X>} new stream containing all events of all inner
 *  streams, with limited concurrency.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.mergeConcurrently = function (concurrency) {
  return Object(_combinator_mergeConcurrently__WEBPACK_IMPORTED_MODULE_22__["mergeConcurrently"])(concurrency, this)
}

// -----------------------------------------------------------------------
// Merging





/**
 * Merge this stream and all the provided streams
 * @returns {Stream} stream containing items from this stream and s in time
 * order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.merge = function (/* ...streams */) {
  return Object(_combinator_merge__WEBPACK_IMPORTED_MODULE_23__["mergeArray"])(_most_prelude__WEBPACK_IMPORTED_MODULE_1__["cons"](this, arguments))
}

// -----------------------------------------------------------------------
// Combining





/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.combine = function (f /*, ...streams */) {
  return Object(_combinator_combine__WEBPACK_IMPORTED_MODULE_24__["combineArray"])(f, _most_prelude__WEBPACK_IMPORTED_MODULE_1__["replace"](this, 0, arguments))
}

// -----------------------------------------------------------------------
// Sampling





/**
 * When an event arrives on sampler, emit the latest event value from stream.
 * @param {Stream} sampler stream of events at whose arrival time
 *  signal's latest value will be propagated
 * @returns {Stream} sampled stream of values
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.sampleWith = function (sampler) {
  return Object(_combinator_sample__WEBPACK_IMPORTED_MODULE_25__["sampleWith"])(sampler, this)
}

/**
 * When an event arrives on this stream, emit the result of calling f with the latest
 * values of all streams being sampled
 * @param {function(...values):*} f function to apply to each set of sampled values
 * @returns {Stream} stream of sampled and transformed values
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.sample = function (f /* ...streams */) {
  return Object(_combinator_sample__WEBPACK_IMPORTED_MODULE_25__["sampleArray"])(f, this, _most_prelude__WEBPACK_IMPORTED_MODULE_1__["tail"](arguments))
}

// -----------------------------------------------------------------------
// Zipping





/**
 * Pair-wise combine items with those in s. Given 2 streams:
 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
 * Note: zip causes fast streams to buffer and wait for slow streams.
 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
 * @returns {Stream} new stream containing pairs
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.zip = function (f /*, ...streams */) {
  return Object(_combinator_zip__WEBPACK_IMPORTED_MODULE_26__["zipArray"])(f, _most_prelude__WEBPACK_IMPORTED_MODULE_1__["replace"](this, 0, arguments))
}

// -----------------------------------------------------------------------
// Switching



// @deprecated switch, use switchLatest instead


/**
 * Given a stream of streams, return a new stream that adopts the behavior
 * of the most recent inner stream.
 * @returns {Stream} switching stream
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.switchLatest = function () {
  return Object(_combinator_switch__WEBPACK_IMPORTED_MODULE_27__["switchLatest"])(this)
}

// @deprecated use switchLatest instead
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.switch = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.switchLatest

// -----------------------------------------------------------------------
// Filtering



// @deprecated distinct, use skipRepeats instead
// @deprecated distinctBy, use skipRepeatsWith instead


/**
 * Retain only items matching a predicate
 * stream:                           -12345678-
 * filter(x => x % 2 === 0, stream): --2-4-6-8-
 * @param {function(x:*):boolean} p filtering predicate called for each item
 * @returns {Stream} stream containing only items for which predicate returns truthy
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.filter = function (p) {
  return Object(_combinator_filter__WEBPACK_IMPORTED_MODULE_28__["filter"])(p, this)
}

/**
 * Skip repeated events, using === to compare items
 * stream:           -abbcd-
 * distinct(stream): -ab-cd-
 * @returns {Stream} stream with no repeated events
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.skipRepeats = function () {
  return Object(_combinator_filter__WEBPACK_IMPORTED_MODULE_28__["skipRepeats"])(this)
}

/**
 * Skip repeated events, using supplied equals function to compare items
 * @param {function(a:*, b:*):boolean} equals function to compare items
 * @returns {Stream} stream with no repeated events
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.skipRepeatsWith = function (equals) {
  return Object(_combinator_filter__WEBPACK_IMPORTED_MODULE_28__["skipRepeatsWith"])(equals, this)
}

// -----------------------------------------------------------------------
// Slicing





/**
 * stream:          -abcd-
 * take(2, stream): -ab|
 * @param {Number} n take up to this many events
 * @returns {Stream} stream containing at most the first n items from this stream
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.take = function (n) {
  return Object(_combinator_slice__WEBPACK_IMPORTED_MODULE_29__["take"])(n, this)
}

/**
 * stream:          -abcd->
 * skip(2, stream): ---cd->
 * @param {Number} n skip this many events
 * @returns {Stream} stream not containing the first n events
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.skip = function (n) {
  return Object(_combinator_slice__WEBPACK_IMPORTED_MODULE_29__["skip"])(n, this)
}

/**
 * Slice a stream by event index. Equivalent to, but more efficient than
 * stream.take(end).skip(start);
 * NOTE: Negative start and end are not supported
 * @param {Number} start skip all events before the start index
 * @param {Number} end allow all events from the start index to the end index
 * @returns {Stream} stream containing items where start <= index < end
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.slice = function (start, end) {
  return Object(_combinator_slice__WEBPACK_IMPORTED_MODULE_29__["slice"])(start, end, this)
}

/**
 * stream:                        -123451234->
 * takeWhile(x => x < 5, stream): -1234|
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items up to, but not including, the
 * first item for which p returns falsy.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.takeWhile = function (p) {
  return Object(_combinator_slice__WEBPACK_IMPORTED_MODULE_29__["takeWhile"])(p, this)
}

/**
 * stream:                        -123451234->
 * skipWhile(x => x < 5, stream): -----51234->
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items following *and including* the
 * first item for which p returns falsy.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.skipWhile = function (p) {
  return Object(_combinator_slice__WEBPACK_IMPORTED_MODULE_29__["skipWhile"])(p, this)
}

/**
 * stream:                         -123456789->
 * skipAfter(x => x === 5, stream):-12345|
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items up to, *and including*, the
 * first item for which p returns truthy.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.skipAfter = function (p) {
  return Object(_combinator_slice__WEBPACK_IMPORTED_MODULE_29__["skipAfter"])(p, this)
}

// -----------------------------------------------------------------------
// Time slicing



// @deprecated takeUntil, use until instead
// @deprecated skipUntil, use since instead


/**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -a-b-c-|
 * @param {Stream} signal retain only events in stream before the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur before
 * the first event in signal.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.until = function (signal) {
  return Object(_combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["takeUntil"])(signal, this)
}

// @deprecated use until instead
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.takeUntil = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.until

  /**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -------d-e-f-g->
 * @param {Stream} signal retain only events in stream at or after the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur after
 * the first event in signal.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.since = function (signal) {
  return Object(_combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["skipUntil"])(signal, this)
}

// @deprecated use since instead
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.skipUntil = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.since

  /**
 * stream:                    -a-b-c-d-e-f-g->
 * timeWindow:                -----s
 * s:                               -----t
 * stream.during(timeWindow): -----c-d-e-|
 * @param {Stream<Stream>} timeWindow a stream whose first event (s) represents
 *  the window start time.  That event (s) is itself a stream whose first event (t)
 *  represents the window end time
 * @returns {Stream} new stream containing only events within the provided timespan
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.during = function (timeWindow) {
  return Object(_combinator_timeslice__WEBPACK_IMPORTED_MODULE_30__["during"])(timeWindow, this)
}

// -----------------------------------------------------------------------
// Delaying





/**
 * @param {Number} delayTime milliseconds to delay each item
 * @returns {Stream} new stream containing the same items, but delayed by ms
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.delay = function (delayTime) {
  return Object(_combinator_delay__WEBPACK_IMPORTED_MODULE_31__["delay"])(delayTime, this)
}

// -----------------------------------------------------------------------
// Getting event timestamp




/**
 * Expose event timestamps into the stream. Turns a Stream<X> into
 * Stream<{time:t, value:X}>
 * @returns {Stream<{time:number, value:*}>}
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.timestamp = function () {
  return Object(_combinator_timestamp__WEBPACK_IMPORTED_MODULE_32__["timestamp"])(this)
}

// -----------------------------------------------------------------------
// Rate limiting





/**
 * Limit the rate of events
 * stream:              abcd----abcd----
 * throttle(2, stream): a-c-----a-c-----
 * @param {Number} period time to suppress events
 * @returns {Stream} new stream that skips events for throttle period
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.throttle = function (period) {
  return Object(_combinator_limit__WEBPACK_IMPORTED_MODULE_33__["throttle"])(period, this)
}

/**
 * Wait for a burst of events to subside and emit only the last event in the burst
 * stream:              abcd----abcd----
 * debounce(2, stream): -----d-------d--
 * @param {Number} period events occuring more frequently than this
 *  on the provided scheduler will be suppressed
 * @returns {Stream} new debounced stream
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.debounce = function (period) {
  return Object(_combinator_limit__WEBPACK_IMPORTED_MODULE_33__["debounce"])(period, this)
}

// -----------------------------------------------------------------------
// Awaiting Promises



// @deprecated await, use awaitPromises instead


/**
 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
 * event order, but timeshifts events based on promise resolution time.
 * @returns {Stream<X>} stream containing non-promise values
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.awaitPromises = function () {
  return Object(_combinator_promises__WEBPACK_IMPORTED_MODULE_34__["awaitPromises"])(this)
}

// @deprecated use awaitPromises instead
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.await = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.awaitPromises

// -----------------------------------------------------------------------
// Error handling



// @deprecated flatMapError, use recoverWith instead


/**
 * If this stream encounters an error, recover and continue with items from stream
 * returned by f.
 * stream:                  -a-b-c-X-
 * f(X):                           d-e-f-g-
 * flatMapError(f, stream): -a-b-c-d-e-f-g-
 * @param {function(error:*):Stream} f function which returns a new stream
 * @returns {Stream} new stream which will recover from an error by calling f
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.recoverWith = function (f) {
  return Object(_combinator_errors__WEBPACK_IMPORTED_MODULE_35__["flatMapError"])(f, this)
}

// @deprecated use recoverWith instead
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.flatMapError = _Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.recoverWith

// -----------------------------------------------------------------------
// Multicasting





/**
 * Transform the stream into multicast stream.  That means that many subscribers
 * to the stream will not cause multiple invocations of the internal machinery.
 * @returns {Stream} new stream which will multicast events to all observers.
 */
_Stream__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.multicast = function () {
  return Object(_most_multicast__WEBPACK_IMPORTED_MODULE_36__["default"])(this)
}

// export the instance of the defaultScheduler for third-party libraries




// export an implementation of Task used internally for third-party libraries





/***/ }),

/***/ "./node_modules/most/src/invoke.js":
/*!*****************************************!*\
  !*** ./node_modules/most/src/invoke.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return invoke; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function invoke (f, args) {
  /* eslint complexity: [2,7] */
  switch (args.length) {
    case 0: return f()
    case 1: return f(args[0])
    case 2: return f(args[0], args[1])
    case 3: return f(args[0], args[1], args[2])
    case 4: return f(args[0], args[1], args[2], args[3])
    case 5: return f(args[0], args[1], args[2], args[3], args[4])
    default:
      return f.apply(void 0, args)
  }
}


/***/ }),

/***/ "./node_modules/most/src/iterable.js":
/*!*******************************************!*\
  !*** ./node_modules/most/src/iterable.js ***!
  \*******************************************/
/*! exports provided: isIterable, getIterator, makeIterable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return isIterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIterator", function() { return getIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeIterable", function() { return makeIterable; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/* global Set, Symbol */
var iteratorSymbol
// Firefox ships a partial implementation using the name @@iterator.
// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
if (typeof Set === 'function' && typeof new Set()['@@iterator'] === 'function') {
  iteratorSymbol = '@@iterator'
} else {
  iteratorSymbol = typeof Symbol === 'function' ? Symbol.iterator
  : '_es6shim_iterator_'
}

function isIterable (o) {
  return typeof o[iteratorSymbol] === 'function'
}

function getIterator (o) {
  return o[iteratorSymbol]()
}

function makeIterable (f, o) {
  o[iteratorSymbol] = f
  return o
}


/***/ }),

/***/ "./node_modules/most/src/observable/fromObservable.js":
/*!************************************************************!*\
  !*** ./node_modules/most/src/observable/fromObservable.js ***!
  \************************************************************/
/*! exports provided: fromObservable, ObservableSource, SubscriberSink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromObservable", function() { return fromObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableSource", function() { return ObservableSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriberSink", function() { return SubscriberSink; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _source_tryEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../source/tryEvent */ "./node_modules/most/src/source/tryEvent.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function fromObservable (observable) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new ObservableSource(observable))
}

function ObservableSource (observable) {
  this.observable = observable
}

ObservableSource.prototype.run = function (sink, scheduler) {
  var sub = this.observable.subscribe(new SubscriberSink(sink, scheduler))
  if (typeof sub === 'function') {
    return _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["create"](sub)
  } else if (sub && typeof sub.unsubscribe === 'function') {
    return _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["create"](unsubscribe, sub)
  }

  throw new TypeError('Observable returned invalid subscription ' + String(sub))
}

function SubscriberSink (sink, scheduler) {
  this.sink = sink
  this.scheduler = scheduler
}

SubscriberSink.prototype.next = function (x) {
  Object(_source_tryEvent__WEBPACK_IMPORTED_MODULE_2__["tryEvent"])(this.scheduler.now(), x, this.sink)
}

SubscriberSink.prototype.complete = function (x) {
  Object(_source_tryEvent__WEBPACK_IMPORTED_MODULE_2__["tryEnd"])(this.scheduler.now(), x, this.sink)
}

SubscriberSink.prototype.error = function (e) {
  this.sink.error(this.scheduler.now(), e)
}

function unsubscribe (subscription) {
  return subscription.unsubscribe()
}


/***/ }),

/***/ "./node_modules/most/src/observable/getObservable.js":
/*!***********************************************************!*\
  !*** ./node_modules/most/src/observable/getObservable.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getObservable; });
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function getObservable (o) { // eslint-disable-line complexity
  var obs = null
  if (o) {
  // Access foreign method only once
    var method = o[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]]
    if (typeof method === 'function') {
      obs = method.call(o)
      if (!(obs && typeof obs.subscribe === 'function')) {
        throw new TypeError('invalid observable ' + obs)
      }
    }
  }

  return obs
}


/***/ }),

/***/ "./node_modules/most/src/observable/subscribe.js":
/*!*******************************************************!*\
  !*** ./node_modules/most/src/observable/subscribe.js ***!
  \*******************************************************/
/*! exports provided: subscribe, SubscribeObserver, Subscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscribeObserver", function() { return SubscribeObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return Subscription; });
/* harmony import */ var _scheduler_defaultScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/defaultScheduler */ "./node_modules/most/src/scheduler/defaultScheduler.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _fatalError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fatalError */ "./node_modules/most/src/fatalError.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function subscribe (subscriber, stream) {
  if (Object(subscriber) !== subscriber) {
    throw new TypeError('subscriber must be an object')
  }

  var disposable = _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["settable"]()
  var observer = new SubscribeObserver(_fatalError__WEBPACK_IMPORTED_MODULE_2__["default"], subscriber, disposable)

  disposable.setDisposable(stream.source.run(observer, _scheduler_defaultScheduler__WEBPACK_IMPORTED_MODULE_0__["default"]))

  return new Subscription(disposable)
}

function SubscribeObserver (fatalError, subscriber, disposable) {
  this.fatalError = fatalError
  this.subscriber = subscriber
  this.disposable = disposable
}

SubscribeObserver.prototype.event = function (t, x) {
  if (!this.disposable.disposed && typeof this.subscriber.next === 'function') {
    this.subscriber.next(x)
  }
}

SubscribeObserver.prototype.end = function (t, x) {
  if (!this.disposable.disposed) {
    var s = this.subscriber
    var fatalError = this.fatalError
    Promise.resolve(this.disposable.dispose()).then(function () {
      if (typeof s.complete === 'function') {
        s.complete(x)
      }
    }).catch(function (e) {
      throwError(e, s, fatalError)
    })
  }
}

SubscribeObserver.prototype.error = function (t, e) {
  var s = this.subscriber
  var fatalError = this.fatalError
  Promise.resolve(this.disposable.dispose()).then(function () {
    throwError(e, s, fatalError)
  })
}

function Subscription (disposable) {
  this.disposable = disposable
}

Subscription.prototype.unsubscribe = function () {
  this.disposable.dispose()
}

function throwError (e1, subscriber, throwError) {
  if (typeof subscriber.error === 'function') {
    try {
      subscriber.error(e1)
    } catch (e2) {
      throwError(e2)
    }
  } else {
    throwError(e1)
  }
}


/***/ }),

/***/ "./node_modules/most/src/runSource.js":
/*!********************************************!*\
  !*** ./node_modules/most/src/runSource.js ***!
  \********************************************/
/*! exports provided: withDefaultScheduler, withScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withDefaultScheduler", function() { return withDefaultScheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withScheduler", function() { return withScheduler; });
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _scheduler_defaultScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler/defaultScheduler */ "./node_modules/most/src/scheduler/defaultScheduler.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function withDefaultScheduler (source) {
  return withScheduler(source, _scheduler_defaultScheduler__WEBPACK_IMPORTED_MODULE_1__["default"])
}

function withScheduler (source, scheduler) {
  return new Promise(function (resolve, reject) {
    runSource(source, scheduler, resolve, reject)
  })
}

function runSource (source, scheduler, resolve, reject) {
  var disposable = _disposable_dispose__WEBPACK_IMPORTED_MODULE_0__["settable"]()
  var observer = new Drain(resolve, reject, disposable)

  disposable.setDisposable(source.run(observer, scheduler))
}

function Drain (end, error, disposable) {
  this._end = end
  this._error = error
  this._disposable = disposable
  this.active = true
}

Drain.prototype.event = function (t, x) {}

Drain.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }
  this.active = false
  disposeThen(this._end, this._error, this._disposable, x)
}

Drain.prototype.error = function (t, e) {
  this.active = false
  disposeThen(this._error, this._error, this._disposable, e)
}

function disposeThen (end, error, disposable, x) {
  Promise.resolve(disposable.dispose()).then(function () {
    end(x)
  }, error)
}


/***/ }),

/***/ "./node_modules/most/src/scheduler/ClockTimer.js":
/*!*******************************************************!*\
  !*** ./node_modules/most/src/scheduler/ClockTimer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClockTimer; });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../task */ "./node_modules/most/src/task.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/* global setTimeout, clearTimeout */

function ClockTimer () {}

ClockTimer.prototype.now = Date.now

ClockTimer.prototype.setTimer = function (f, dt) {
  return dt <= 0 ? runAsap(f) : setTimeout(f, dt)
}

ClockTimer.prototype.clearTimer = function (t) {
  return t instanceof Asap ? t.cancel() : clearTimeout(t)
}

function Asap (f) {
  this.f = f
  this.active = true
}

Asap.prototype.run = function () {
  return this.active && this.f()
}

Asap.prototype.error = function (e) {
  throw e
}

Asap.prototype.cancel = function () {
  this.active = false
}

function runAsap (f) {
  var task = new Asap(f)
  Object(_task__WEBPACK_IMPORTED_MODULE_0__["defer"])(task)
  return task
}


/***/ }),

/***/ "./node_modules/most/src/scheduler/PropagateTask.js":
/*!**********************************************************!*\
  !*** ./node_modules/most/src/scheduler/PropagateTask.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PropagateTask; });
/* harmony import */ var _fatalError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fatalError */ "./node_modules/most/src/fatalError.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function PropagateTask (run, value, sink) {
  this._run = run
  this.value = value
  this.sink = sink
  this.active = true
}

PropagateTask.event = function (value, sink) {
  return new PropagateTask(emit, value, sink)
}

PropagateTask.end = function (value, sink) {
  return new PropagateTask(end, value, sink)
}

PropagateTask.error = function (value, sink) {
  return new PropagateTask(error, value, sink)
}

PropagateTask.prototype.dispose = function () {
  this.active = false
}

PropagateTask.prototype.run = function (t) {
  if (!this.active) {
    return
  }
  this._run(t, this.value, this.sink)
}

PropagateTask.prototype.error = function (t, e) {
  if (!this.active) {
    return Object(_fatalError__WEBPACK_IMPORTED_MODULE_0__["default"])(e)
  }
  this.sink.error(t, e)
}

function error (t, e, sink) {
  sink.error(t, e)
}

function emit (t, x, sink) {
  sink.event(t, x)
}

function end (t, x, sink) {
  sink.end(t, x)
}


/***/ }),

/***/ "./node_modules/most/src/scheduler/ScheduledTask.js":
/*!**********************************************************!*\
  !*** ./node_modules/most/src/scheduler/ScheduledTask.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScheduledTask; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function ScheduledTask (delay, period, task, scheduler) {
  this.time = delay
  this.period = period
  this.task = task
  this.scheduler = scheduler
  this.active = true
}

ScheduledTask.prototype.run = function () {
  return this.task.run(this.time)
}

ScheduledTask.prototype.error = function (e) {
  return this.task.error(this.time, e)
}

ScheduledTask.prototype.dispose = function () {
  this.scheduler.cancel(this)
  return this.task.dispose()
}


/***/ }),

/***/ "./node_modules/most/src/scheduler/Scheduler.js":
/*!******************************************************!*\
  !*** ./node_modules/most/src/scheduler/Scheduler.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scheduler; });
/* harmony import */ var _ScheduledTask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScheduledTask */ "./node_modules/most/src/scheduler/ScheduledTask.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../task */ "./node_modules/most/src/task.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function Scheduler (timer, timeline) {
  this.timer = timer
  this.timeline = timeline

  this._timer = null
  this._nextArrival = Infinity

  var self = this
  this._runReadyTasksBound = function () {
    self._runReadyTasks(self.now())
  }
}

Scheduler.prototype.now = function () {
  return this.timer.now()
}

Scheduler.prototype.asap = function (task) {
  return this.schedule(0, -1, task)
}

Scheduler.prototype.delay = function (delay, task) {
  return this.schedule(delay, -1, task)
}

Scheduler.prototype.periodic = function (period, task) {
  return this.schedule(0, period, task)
}

Scheduler.prototype.schedule = function (delay, period, task) {
  var now = this.now()
  var st = new _ScheduledTask__WEBPACK_IMPORTED_MODULE_0__["default"](now + Math.max(0, delay), period, task, this)

  this.timeline.add(st)
  this._scheduleNextRun(now)
  return st
}

Scheduler.prototype.cancel = function (task) {
  task.active = false
  if (this.timeline.remove(task)) {
    this._reschedule()
  }
}

Scheduler.prototype.cancelAll = function (f) {
  this.timeline.removeAll(f)
  this._reschedule()
}

Scheduler.prototype._reschedule = function () {
  if (this.timeline.isEmpty()) {
    this._unschedule()
  } else {
    this._scheduleNextRun(this.now())
  }
}

Scheduler.prototype._unschedule = function () {
  this.timer.clearTimer(this._timer)
  this._timer = null
}

Scheduler.prototype._scheduleNextRun = function (now) { // eslint-disable-line complexity
  if (this.timeline.isEmpty()) {
    return
  }

  var nextArrival = this.timeline.nextArrival()

  if (this._timer === null) {
    this._scheduleNextArrival(nextArrival, now)
  } else if (nextArrival < this._nextArrival) {
    this._unschedule()
    this._scheduleNextArrival(nextArrival, now)
  }
}

Scheduler.prototype._scheduleNextArrival = function (nextArrival, now) {
  this._nextArrival = nextArrival
  var delay = Math.max(0, nextArrival - now)
  this._timer = this.timer.setTimer(this._runReadyTasksBound, delay)
}

Scheduler.prototype._runReadyTasks = function (now) {
  this._timer = null
  this.timeline.runTasks(now, _task__WEBPACK_IMPORTED_MODULE_1__["runTask"])
  this._scheduleNextRun(this.now())
}


/***/ }),

/***/ "./node_modules/most/src/scheduler/Timeline.js":
/*!*****************************************************!*\
  !*** ./node_modules/most/src/scheduler/Timeline.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timeline; });
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function Timeline () {
  this.tasks = []
}

Timeline.prototype.nextArrival = function () {
  return this.isEmpty() ? Infinity : this.tasks[0].time
}

Timeline.prototype.isEmpty = function () {
  return this.tasks.length === 0
}

Timeline.prototype.add = function (st) {
  insertByTime(st, this.tasks)
}

Timeline.prototype.remove = function (st) {
  var i = binarySearch(st.time, this.tasks)

  if (i >= 0 && i < this.tasks.length) {
    var at = _most_prelude__WEBPACK_IMPORTED_MODULE_0__["findIndex"](st, this.tasks[i].events)
    if (at >= 0) {
      this.tasks[i].events.splice(at, 1)
      return true
    }
  }

  return false
}

Timeline.prototype.removeAll = function (f) {
  for (var i = 0, l = this.tasks.length; i < l; ++i) {
    removeAllFrom(f, this.tasks[i])
  }
}

Timeline.prototype.runTasks = function (t, runTask) {
  var tasks = this.tasks
  var l = tasks.length
  var i = 0

  while (i < l && tasks[i].time <= t) {
    ++i
  }

  this.tasks = tasks.slice(i)

  // Run all ready tasks
  for (var j = 0; j < i; ++j) {
    this.tasks = runTasks(runTask, tasks[j], this.tasks)
  }
}

function runTasks (runTask, timeslot, tasks) { // eslint-disable-line complexity
  var events = timeslot.events
  for (var i = 0; i < events.length; ++i) {
    var task = events[i]

    if (task.active) {
      runTask(task)

      // Reschedule periodic repeating tasks
      // Check active again, since a task may have canceled itself
      if (task.period >= 0 && task.active) {
        task.time = task.time + task.period
        insertByTime(task, tasks)
      }
    }
  }

  return tasks
}

function insertByTime (task, timeslots) { // eslint-disable-line complexity
  var l = timeslots.length

  if (l === 0) {
    timeslots.push(newTimeslot(task.time, [task]))
    return
  }

  var i = binarySearch(task.time, timeslots)

  if (i >= l) {
    timeslots.push(newTimeslot(task.time, [task]))
  } else if (task.time === timeslots[i].time) {
    timeslots[i].events.push(task)
  } else {
    timeslots.splice(i, 0, newTimeslot(task.time, [task]))
  }
}

function removeAllFrom (f, timeslot) {
  timeslot.events = _most_prelude__WEBPACK_IMPORTED_MODULE_0__["removeAll"](f, timeslot.events)
}

function binarySearch (t, sortedArray) { // eslint-disable-line complexity
  var lo = 0
  var hi = sortedArray.length
  var mid, y

  while (lo < hi) {
    mid = Math.floor((lo + hi) / 2)
    y = sortedArray[mid]

    if (t === y.time) {
      return mid
    } else if (t < y.time) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  return hi
}

function newTimeslot (t, events) {
  return { time: t, events: events }
}


/***/ }),

/***/ "./node_modules/most/src/scheduler/defaultScheduler.js":
/*!*************************************************************!*\
  !*** ./node_modules/most/src/scheduler/defaultScheduler.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scheduler */ "./node_modules/most/src/scheduler/Scheduler.js");
/* harmony import */ var _ClockTimer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClockTimer */ "./node_modules/most/src/scheduler/ClockTimer.js");
/* harmony import */ var _Timeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Timeline */ "./node_modules/most/src/scheduler/Timeline.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





var defaultScheduler = new _Scheduler__WEBPACK_IMPORTED_MODULE_0__["default"](new _ClockTimer__WEBPACK_IMPORTED_MODULE_1__["default"](), new _Timeline__WEBPACK_IMPORTED_MODULE_2__["default"]())

/* harmony default export */ __webpack_exports__["default"] = (defaultScheduler);


/***/ }),

/***/ "./node_modules/most/src/sink/DeferredSink.js":
/*!****************************************************!*\
  !*** ./node_modules/most/src/sink/DeferredSink.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DeferredSink; });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../task */ "./node_modules/most/src/task.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function DeferredSink (sink) {
  this.sink = sink
  this.events = []
  this.active = true
}

DeferredSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }

  if (this.events.length === 0) {
    Object(_task__WEBPACK_IMPORTED_MODULE_0__["defer"])(new PropagateAllTask(this.sink, t, this.events))
  }

  this.events.push({ time: t, value: x })
}

DeferredSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }

  this._end(new EndTask(t, x, this.sink))
}

DeferredSink.prototype.error = function (t, e) {
  this._end(new ErrorTask(t, e, this.sink))
}

DeferredSink.prototype._end = function (task) {
  this.active = false
  Object(_task__WEBPACK_IMPORTED_MODULE_0__["defer"])(task)
}

function PropagateAllTask (sink, time, events) {
  this.sink = sink
  this.events = events
  this.time = time
}

PropagateAllTask.prototype.run = function () {
  var events = this.events
  var sink = this.sink
  var event

  for (var i = 0, l = events.length; i < l; ++i) {
    event = events[i]
    this.time = event.time
    sink.event(event.time, event.value)
  }

  events.length = 0
}

PropagateAllTask.prototype.error = function (e) {
  this.sink.error(this.time, e)
}

function EndTask (t, x, sink) {
  this.time = t
  this.value = x
  this.sink = sink
}

EndTask.prototype.run = function () {
  this.sink.end(this.time, this.value)
}

EndTask.prototype.error = function (e) {
  this.sink.error(this.time, e)
}

function ErrorTask (t, e, sink) {
  this.time = t
  this.value = e
  this.sink = sink
}

ErrorTask.prototype.run = function () {
  this.sink.error(this.time, this.value)
}

ErrorTask.prototype.error = function (e) {
  throw e
}


/***/ }),

/***/ "./node_modules/most/src/sink/IndexSink.js":
/*!*************************************************!*\
  !*** ./node_modules/most/src/sink/IndexSink.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IndexSink; });
/* harmony import */ var _Pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pipe */ "./node_modules/most/src/sink/Pipe.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function IndexSink (i, sink) {
  this.sink = sink
  this.index = i
  this.active = true
  this.value = void 0
}

IndexSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }
  this.value = x
  this.sink.event(t, this)
}

IndexSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }
  this.active = false
  this.sink.end(t, { index: this.index, value: x })
}

IndexSink.prototype.error = _Pipe__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.error


/***/ }),

/***/ "./node_modules/most/src/sink/Pipe.js":
/*!********************************************!*\
  !*** ./node_modules/most/src/sink/Pipe.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pipe; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/**
 * A sink mixin that simply forwards event, end, and error to
 * another sink.
 * @param sink
 * @constructor
 */
function Pipe (sink) {
  this.sink = sink
}

Pipe.prototype.event = function (t, x) {
  return this.sink.event(t, x)
}

Pipe.prototype.end = function (t, x) {
  return this.sink.end(t, x)
}

Pipe.prototype.error = function (t, e) {
  return this.sink.error(t, e)
}


/***/ }),

/***/ "./node_modules/most/src/sink/SafeSink.js":
/*!************************************************!*\
  !*** ./node_modules/most/src/sink/SafeSink.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SafeSink; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function SafeSink (sink) {
  this.sink = sink
  this.active = true
}

SafeSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }
  this.sink.event(t, x)
}

SafeSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }
  this.disable()
  this.sink.end(t, x)
}

SafeSink.prototype.error = function (t, e) {
  this.disable()
  this.sink.error(t, e)
}

SafeSink.prototype.disable = function () {
  this.active = false
  return this.sink
}


/***/ }),

/***/ "./node_modules/most/src/source/EventEmitterSource.js":
/*!************************************************************!*\
  !*** ./node_modules/most/src/source/EventEmitterSource.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEmitterSource; });
/* harmony import */ var _sink_DeferredSink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sink/DeferredSink */ "./node_modules/most/src/sink/DeferredSink.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _tryEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tryEvent */ "./node_modules/most/src/source/tryEvent.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function EventEmitterSource (event, source) {
  this.event = event
  this.source = source
}

EventEmitterSource.prototype.run = function (sink, scheduler) {
  // NOTE: Because EventEmitter allows events in the same call stack as
  // a listener is added, use a DeferredSink to buffer events
  // until the stack clears, then propagate.  This maintains most.js's
  // invariant that no event will be delivered in the same call stack
  // as an observer begins observing.
  var dsink = new _sink_DeferredSink__WEBPACK_IMPORTED_MODULE_0__["default"](sink)

  function addEventVariadic (a) {
    var l = arguments.length
    if (l > 1) {
      var arr = new Array(l)
      for (var i = 0; i < l; ++i) {
        arr[i] = arguments[i]
      }
      _tryEvent__WEBPACK_IMPORTED_MODULE_2__["tryEvent"](scheduler.now(), arr, dsink)
    } else {
      _tryEvent__WEBPACK_IMPORTED_MODULE_2__["tryEvent"](scheduler.now(), a, dsink)
    }
  }

  this.source.addListener(this.event, addEventVariadic)

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["create"](disposeEventEmitter, { target: this, addEvent: addEventVariadic })
}

function disposeEventEmitter (info) {
  var target = info.target
  target.source.removeListener(target.event, info.addEvent)
}


/***/ }),

/***/ "./node_modules/most/src/source/EventTargetSource.js":
/*!***********************************************************!*\
  !*** ./node_modules/most/src/source/EventTargetSource.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventTargetSource; });
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _tryEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tryEvent */ "./node_modules/most/src/source/tryEvent.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function EventTargetSource (event, source, capture) {
  this.event = event
  this.source = source
  this.capture = capture
}

EventTargetSource.prototype.run = function (sink, scheduler) {
  function addEvent (e) {
    _tryEvent__WEBPACK_IMPORTED_MODULE_1__["tryEvent"](scheduler.now(), e, sink)
  }

  this.source.addEventListener(this.event, addEvent, this.capture)

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_0__["create"](disposeEventTarget,
    { target: this, addEvent: addEvent })
}

function disposeEventTarget (info) {
  var target = info.target
  target.source.removeEventListener(target.event, info.addEvent, target.capture)
}


/***/ }),

/***/ "./node_modules/most/src/source/core.js":
/*!**********************************************!*\
  !*** ./node_modules/most/src/source/core.js ***!
  \**********************************************/
/*! exports provided: of, empty, never */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "of", function() { return of; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "never", function() { return never; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../disposable/dispose */ "./node_modules/most/src/disposable/dispose.js");
/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Stream containing only x
 * @param {*} x
 * @returns {Stream}
 */
function of (x) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Just(x))
}

function Just (x) {
  this.value = x
}

Just.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_2__["default"](runJust, this.value, sink))
}

function runJust (t, x, sink) {
  sink.event(t, x)
  sink.end(t, void 0)
}

/**
 * Stream containing no events and ends immediately
 * @returns {Stream}
 */
function empty () {
  return EMPTY
}

function EmptySource () {}

EmptySource.prototype.run = function (sink, scheduler) {
  var task = _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_2__["default"].end(void 0, sink)
  scheduler.asap(task)

  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["create"](disposeEmpty, task)
}

function disposeEmpty (task) {
  return task.dispose()
}

var EMPTY = new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new EmptySource())

/**
 * Stream containing no events and never ends
 * @returns {Stream}
 */
function never () {
  return NEVER
}

function NeverSource () {}

NeverSource.prototype.run = function () {
  return _disposable_dispose__WEBPACK_IMPORTED_MODULE_1__["empty"]()
}

var NEVER = new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new NeverSource())


/***/ }),

/***/ "./node_modules/most/src/source/from.js":
/*!**********************************************!*\
  !*** ./node_modules/most/src/source/from.js ***!
  \**********************************************/
/*! exports provided: from */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _fromArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fromArray */ "./node_modules/most/src/source/fromArray.js");
/* harmony import */ var _iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../iterable */ "./node_modules/most/src/iterable.js");
/* harmony import */ var _fromIterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fromIterable */ "./node_modules/most/src/source/fromIterable.js");
/* harmony import */ var _observable_getObservable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../observable/getObservable */ "./node_modules/most/src/observable/getObservable.js");
/* harmony import */ var _observable_fromObservable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../observable/fromObservable */ "./node_modules/most/src/observable/fromObservable.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */









function from (a) { // eslint-disable-line complexity
  if (a instanceof _Stream__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    return a
  }

  var observable = Object(_observable_getObservable__WEBPACK_IMPORTED_MODULE_4__["default"])(a)
  if (observable != null) {
    return Object(_observable_fromObservable__WEBPACK_IMPORTED_MODULE_5__["fromObservable"])(observable)
  }

  if (Array.isArray(a) || Object(_most_prelude__WEBPACK_IMPORTED_MODULE_6__["isArrayLike"])(a)) {
    return Object(_fromArray__WEBPACK_IMPORTED_MODULE_1__["fromArray"])(a)
  }

  if (Object(_iterable__WEBPACK_IMPORTED_MODULE_2__["isIterable"])(a)) {
    return Object(_fromIterable__WEBPACK_IMPORTED_MODULE_3__["fromIterable"])(a)
  }

  throw new TypeError('from(x) must be observable, iterable, or array-like: ' + a)
}


/***/ }),

/***/ "./node_modules/most/src/source/fromArray.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/source/fromArray.js ***!
  \***************************************************/
/*! exports provided: fromArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromArray", function() { return fromArray; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function fromArray (a) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new ArraySource(a))
}

function ArraySource (a) {
  this.array = a
}

ArraySource.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_1__["default"](runProducer, this.array, sink))
}

function runProducer (t, array, sink) {
  for (var i = 0, l = array.length; i < l && this.active; ++i) {
    sink.event(t, array[i])
  }

  this.active && sink.end(t)
}


/***/ }),

/***/ "./node_modules/most/src/source/fromEvent.js":
/*!***************************************************!*\
  !*** ./node_modules/most/src/source/fromEvent.js ***!
  \***************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return fromEvent; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _EventTargetSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventTargetSource */ "./node_modules/most/src/source/EventTargetSource.js");
/* harmony import */ var _EventEmitterSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventEmitterSource */ "./node_modules/most/src/source/EventEmitterSource.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
 * @param {String} event event type name, e.g. 'click'
 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
 * @param {*?} capture for DOM events, whether to use
 *  capturing--passed as 3rd parameter to addEventListener.
 * @returns {Stream} stream containing all events of the specified type
 * from the source.
 */
function fromEvent (event, source, capture) { // eslint-disable-line complexity
  var s

  if (typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
    if (arguments.length < 3) {
      capture = false
    }

    s = new _EventTargetSource__WEBPACK_IMPORTED_MODULE_1__["default"](event, source, capture)
  } else if (typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
    s = new _EventEmitterSource__WEBPACK_IMPORTED_MODULE_2__["default"](event, source)
  } else {
    throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener')
  }

  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](s)
}


/***/ }),

/***/ "./node_modules/most/src/source/fromIterable.js":
/*!******************************************************!*\
  !*** ./node_modules/most/src/source/fromIterable.js ***!
  \******************************************************/
/*! exports provided: fromIterable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromIterable", function() { return fromIterable; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../iterable */ "./node_modules/most/src/iterable.js");
/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function fromIterable (iterable) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new IterableSource(iterable))
}

function IterableSource (iterable) {
  this.iterable = iterable
}

IterableSource.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_2__["default"](runProducer, Object(_iterable__WEBPACK_IMPORTED_MODULE_1__["getIterator"])(this.iterable), sink))
}

function runProducer (t, iterator, sink) {
  var r = iterator.next()

  while (!r.done && this.active) {
    sink.event(t, r.value)
    r = iterator.next()
  }

  sink.end(t, r.value)
}


/***/ }),

/***/ "./node_modules/most/src/source/generate.js":
/*!**************************************************!*\
  !*** ./node_modules/most/src/source/generate.js ***!
  \**************************************************/
/*! exports provided: generate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generate", function() { return generate; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _most_prelude__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @most/prelude */ "./node_modules/@most/prelude/dist/index.es.js");
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Compute a stream using an *async* generator, which yields promises
 * to control event times.
 * @param f
 * @returns {Stream}
 */
function generate (f /*, ...args */) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new GenerateSource(f, _most_prelude__WEBPACK_IMPORTED_MODULE_1__["tail"](arguments)))
}

function GenerateSource (f, args) {
  this.f = f
  this.args = args
}

GenerateSource.prototype.run = function (sink, scheduler) {
  return new Generate(this.f.apply(void 0, this.args), sink, scheduler)
}

function Generate (iterator, sink, scheduler) {
  this.iterator = iterator
  this.sink = sink
  this.scheduler = scheduler
  this.active = true

  var self = this
  function err (e) {
    self.sink.error(self.scheduler.now(), e)
  }

  Promise.resolve(this).then(next).catch(err)
}

function next (generate, x) {
  return generate.active ? handle(generate, generate.iterator.next(x)) : x
}

function handle (generate, result) {
  if (result.done) {
    return generate.sink.end(generate.scheduler.now(), result.value)
  }

  return Promise.resolve(result.value).then(function (x) {
    return emit(generate, x)
  }, function (e) {
    return error(generate, e)
  })
}

function emit (generate, x) {
  generate.sink.event(generate.scheduler.now(), x)
  return next(generate, x)
}

function error (generate, e) {
  return handle(generate, generate.iterator.throw(e))
}

Generate.prototype.dispose = function () {
  this.active = false
}


/***/ }),

/***/ "./node_modules/most/src/source/iterate.js":
/*!*************************************************!*\
  !*** ./node_modules/most/src/source/iterate.js ***!
  \*************************************************/
/*! exports provided: iterate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iterate", function() { return iterate; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Compute a stream by iteratively calling f to produce values
 * Event times may be controlled by returning a Promise from f
 * @param {function(x:*):*|Promise<*>} f
 * @param {*} x initial value
 * @returns {Stream}
 */
function iterate (f, x) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new IterateSource(f, x))
}

function IterateSource (f, x) {
  this.f = f
  this.value = x
}

IterateSource.prototype.run = function (sink, scheduler) {
  return new Iterate(this.f, this.value, sink, scheduler)
}

function Iterate (f, initial, sink, scheduler) {
  this.f = f
  this.sink = sink
  this.scheduler = scheduler
  this.active = true

  var x = initial

  var self = this
  function err (e) {
    self.sink.error(self.scheduler.now(), e)
  }

  function start (iterate) {
    return stepIterate(iterate, x)
  }

  Promise.resolve(this).then(start).catch(err)
}

Iterate.prototype.dispose = function () {
  this.active = false
}

function stepIterate (iterate, x) {
  iterate.sink.event(iterate.scheduler.now(), x)

  if (!iterate.active) {
    return x
  }

  var f = iterate.f
  return Promise.resolve(f(x)).then(function (y) {
    return continueIterate(iterate, y)
  })
}

function continueIterate (iterate, x) {
  return !iterate.active ? iterate.value : stepIterate(iterate, x)
}


/***/ }),

/***/ "./node_modules/most/src/source/periodic.js":
/*!**************************************************!*\
  !*** ./node_modules/most/src/source/periodic.js ***!
  \**************************************************/
/*! exports provided: periodic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "periodic", function() { return periodic; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/* harmony import */ var _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/PropagateTask */ "./node_modules/most/src/scheduler/PropagateTask.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Create a stream that emits the current time periodically
 * @param {Number} period periodicity of events in millis
 * @param {*} deprecatedValue @deprecated value to emit each period
 * @returns {Stream} new stream that emits the current time every period
 */
function periodic (period, deprecatedValue) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new Periodic(period, deprecatedValue))
}

function Periodic (period, value) {
  this.period = period
  this.value = value
}

Periodic.prototype.run = function (sink, scheduler) {
  return scheduler.periodic(this.period, _scheduler_PropagateTask__WEBPACK_IMPORTED_MODULE_1__["default"].event(this.value, sink))
}


/***/ }),

/***/ "./node_modules/most/src/source/tryEvent.js":
/*!**************************************************!*\
  !*** ./node_modules/most/src/source/tryEvent.js ***!
  \**************************************************/
/*! exports provided: tryEvent, tryEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryEvent", function() { return tryEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryEnd", function() { return tryEnd; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function tryEvent (t, x, sink) {
  try {
    sink.event(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

function tryEnd (t, x, sink) {
  try {
    sink.end(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}


/***/ }),

/***/ "./node_modules/most/src/source/unfold.js":
/*!************************************************!*\
  !*** ./node_modules/most/src/source/unfold.js ***!
  \************************************************/
/*! exports provided: unfold */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unfold", function() { return unfold; });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Stream */ "./node_modules/most/src/Stream.js");
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Compute a stream by unfolding tuples of future values from a seed value
 * Event times may be controlled by returning a Promise from f
 * @param {function(seed:*):{value:*, seed:*, done:boolean}|Promise<{value:*, seed:*, done:boolean}>} f unfolding function accepts
 *  a seed and returns a new tuple with a value, new seed, and boolean done flag.
 *  If tuple.done is true, the stream will end.
 * @param {*} seed seed value
 * @returns {Stream} stream containing all value of all tuples produced by the
 *  unfolding function.
 */
function unfold (f, seed) {
  return new _Stream__WEBPACK_IMPORTED_MODULE_0__["default"](new UnfoldSource(f, seed))
}

function UnfoldSource (f, seed) {
  this.f = f
  this.value = seed
}

UnfoldSource.prototype.run = function (sink, scheduler) {
  return new Unfold(this.f, this.value, sink, scheduler)
}

function Unfold (f, x, sink, scheduler) {
  this.f = f
  this.sink = sink
  this.scheduler = scheduler
  this.active = true

  var self = this
  function err (e) {
    self.sink.error(self.scheduler.now(), e)
  }

  function start (unfold) {
    return stepUnfold(unfold, x)
  }

  Promise.resolve(this).then(start).catch(err)
}

Unfold.prototype.dispose = function () {
  this.active = false
}

function stepUnfold (unfold, x) {
  var f = unfold.f
  return Promise.resolve(f(x)).then(function (tuple) {
    return continueUnfold(unfold, tuple)
  })
}

function continueUnfold (unfold, tuple) {
  if (tuple.done) {
    unfold.sink.end(unfold.scheduler.now(), tuple.value)
    return tuple.value
  }

  unfold.sink.event(unfold.scheduler.now(), tuple.value)

  if (!unfold.active) {
    return tuple.value
  }
  return stepUnfold(unfold, tuple.seed)
}


/***/ }),

/***/ "./node_modules/most/src/task.js":
/*!***************************************!*\
  !*** ./node_modules/most/src/task.js ***!
  \***************************************/
/*! exports provided: defer, runTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defer", function() { return defer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runTask", function() { return runTask; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function defer (task) {
  return Promise.resolve(task).then(runTask)
}

function runTask (task) {
  try {
    return task.run()
  } catch (e) {
    return task.error(e)
  }
}


/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbW9zdC9tdWx0aWNhc3QvZGlzdC9tdWx0aWNhc3QuZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Btb3N0L3ByZWx1ZGUvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvTGlua2VkTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvUXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL1N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9hY2N1bXVsYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2FwcGxpY2F0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2J1aWxkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvY29uY2F0TWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2NvbnRpbnVlV2l0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9kZWxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2ZsYXRNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbG9vcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9tZXJnZUNvbmN1cnJlbnRseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9vYnNlcnZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3Byb21pc2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3NhbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9zbGljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9zd2l0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdGhydS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci90aW1lc2xpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdGltZXN0YW1wLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RyYW5zZHVjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci90cmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvemlwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9kaXNwb3NhYmxlL0Rpc3Bvc2FibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Rpc3Bvc2FibGUvU2V0dGFibGVEaXNwb3NhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9kaXNwb3NhYmxlL2Rpc3Bvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2ZhdGFsRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Z1c2lvbi9GaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Z1c2lvbi9GaWx0ZXJNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Z1c2lvbi9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2l0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9vYnNlcnZhYmxlL2Zyb21PYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9vYnNlcnZhYmxlL2dldE9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL29ic2VydmFibGUvc3Vic2NyaWJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9ydW5Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9DbG9ja1RpbWVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL1NjaGVkdWxlZFRhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9TY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9UaW1lbGluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL2RlZmF1bHRTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NpbmsvRGVmZXJyZWRTaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL0luZGV4U2luay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2luay9QaXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL1NhZmVTaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvRXZlbnRFbWl0dGVyU291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvRXZlbnRUYXJnZXRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb21BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb21FdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb21JdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2dlbmVyYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvaXRlcmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL3BlcmlvZGljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvdHJ5RXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS91bmZvbGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9oYXJtb255LW1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN6RUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQzRDO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVywwQkFBMEI7QUFDckMsV0FBVyxFQUFFO0FBQ2IsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDak5BO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFUTs7QUFFUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdHQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ2U7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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QUVROztBQUVSO0FBQ0E7O0FBRVE7Ozs7Ozs7Ozs7Ozs7O0FDbHNCUjtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUMyQjs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDbERBO0FBQUE7QUFDQTtBQUNBOztBQUVnQjs7QUFFaEI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7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TztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RFQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7c0RDZEE7QUFBQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDLFFBRUQ7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgZnJvbUV2ZW50LCBTdHJlYW0gfSBmcm9tICdtb3N0JztcblxuY29uc3QgbWVzc2FnZVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYXQtbWVzc2FnZScpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5jb25zdCBtZXNzYWdlc0RvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpO1xuY29uc3QgaW5wdXRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhdC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IHJlbW90ZU1lc3NhZ2UkID0gZnJvbUV2ZW50KCdtZXNzYWdlJywgd2luZG93KSBhcyBTdHJlYW08TWVzc2FnZUV2ZW50PjtcblxuY29uc3QgaW5wdXQkID0gZnJvbUV2ZW50KCdjaGFuZ2UnLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhdC1pbnB1dCcpKVxuICAubWFwKGUgPT4gKDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0KS52YWx1ZSk7XG5cbmNvbnN0IHNlbmRNZXNzYWdlJCA9IGZyb21FdmVudCgnc3VibWl0JywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYXQtZm9ybScpKVxuICAudGFwKGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcblxuY29uc3QgbG9jYWxNZXNzYWdlJCA9IGlucHV0JC5zYW1wbGVXaXRoKHNlbmRNZXNzYWdlJCk7XG5cbmZ1bmN0aW9uIGFwcGVuZE1lc3NhZ2UobWVzc2FnZSkge1xuICBjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUobWVzc2FnZVRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICBjbG9uZS5xdWVyeVNlbGVjdG9yKCcuc2VuZGVyJykudGV4dENvbnRlbnQgPSAnbWUnO1xuICBjbG9uZS5xdWVyeVNlbGVjdG9yKCcudGltZScpLnRleHRDb250ZW50ID0gbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgY2xvbmUucXVlcnlTZWxlY3RvcignLmJvZHknKS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIG1lc3NhZ2VzRG9tLmFwcGVuZENoaWxkKGNsb25lKTtcbiAgbWVzc2FnZXNEb20uc2Nyb2xsVG9wID0gbWVzc2FnZXNEb20uc2Nyb2xsSGVpZ2h0O1xufVxuXG5sb2NhbE1lc3NhZ2UkLm9ic2VydmUoZSA9PiB7XG4gIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoZSwgJyonKTtcbiAgYXBwZW5kTWVzc2FnZShlKTtcbiAgaW5wdXRCb3gudmFsdWUgPSBcIlwiO1xufSk7XG5cbnJlbW90ZU1lc3NhZ2UkLm9ic2VydmUoY29uc29sZS5sb2cpO1xuXG5yZW1vdGVNZXNzYWdlJFxuICAubWFwKGV2ID0+IGV2LmRhdGEpXG4gIC5vYnNlcnZlKGFwcGVuZE1lc3NhZ2UpO1xuIiwiaW1wb3J0IHsgYXBwZW5kLCByZW1vdmUsIGZpbmRJbmRleCB9IGZyb20gJ0Btb3N0L3ByZWx1ZGUnO1xuXG52YXIgTXVsdGljYXN0RGlzcG9zYWJsZSA9IGZ1bmN0aW9uIE11bHRpY2FzdERpc3Bvc2FibGUgKHNvdXJjZSwgc2luaykge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zZWQgPSBmYWxzZVxufTtcblxuTXVsdGljYXN0RGlzcG9zYWJsZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UgKCkge1xuICBpZiAodGhpcy5kaXNwb3NlZCkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuZGlzcG9zZWQgPSB0cnVlXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLnNvdXJjZS5yZW1vdmUodGhpcy5zaW5rKVxuICByZXR1cm4gcmVtYWluaW5nID09PSAwICYmIHRoaXMuc291cmNlLl9kaXNwb3NlKClcbn07XG5cbmZ1bmN0aW9uIHRyeUV2ZW50ICh0LCB4LCBzaW5rKSB7XG4gIHRyeSB7XG4gICAgc2luay5ldmVudCh0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyeUVuZCAodCwgeCwgc2luaykge1xuICB0cnkge1xuICAgIHNpbmsuZW5kKHQsIHgpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaW5rLmVycm9yKHQsIGUpXG4gIH1cbn1cblxudmFyIGRpc3Bvc2UgPSBmdW5jdGlvbiAoZGlzcG9zYWJsZSkgeyByZXR1cm4gZGlzcG9zYWJsZS5kaXNwb3NlKCk7IH1cblxudmFyIGVtcHR5RGlzcG9zYWJsZSA9IHtcbiAgZGlzcG9zZTogZnVuY3Rpb24gZGlzcG9zZSQxICgpIHt9XG59XG5cbnZhciBNdWx0aWNhc3RTb3VyY2UgPSBmdW5jdGlvbiBNdWx0aWNhc3RTb3VyY2UgKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLnNpbmtzID0gW11cbiAgdGhpcy5fZGlzcG9zYWJsZSA9IGVtcHR5RGlzcG9zYWJsZVxufTtcblxuTXVsdGljYXN0U291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiBydW4gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbiA9IHRoaXMuYWRkKHNpbmspXG4gIGlmIChuID09PSAxKSB7XG4gICAgdGhpcy5fZGlzcG9zYWJsZSA9IHRoaXMuc291cmNlLnJ1bih0aGlzLCBzY2hlZHVsZXIpXG4gIH1cbiAgcmV0dXJuIG5ldyBNdWx0aWNhc3REaXNwb3NhYmxlKHRoaXMsIHNpbmspXG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLl9kaXNwb3NlID0gZnVuY3Rpb24gX2Rpc3Bvc2UgKCkge1xuICB2YXIgZGlzcG9zYWJsZSA9IHRoaXMuX2Rpc3Bvc2FibGVcbiAgdGhpcy5fZGlzcG9zYWJsZSA9IGVtcHR5RGlzcG9zYWJsZVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRpc3Bvc2FibGUpLnRoZW4oZGlzcG9zZSlcbn07XG5cbk11bHRpY2FzdFNvdXJjZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkIChzaW5rKSB7XG4gIHRoaXMuc2lua3MgPSBhcHBlbmQoc2luaywgdGhpcy5zaW5rcylcbiAgcmV0dXJuIHRoaXMuc2lua3MubGVuZ3RoXG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSQxIChzaW5rKSB7XG4gIHZhciBpID0gZmluZEluZGV4KHNpbmssIHRoaXMuc2lua3MpXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gIGlmIChpID49IDApIHtcbiAgICB0aGlzLnNpbmtzID0gcmVtb3ZlKGksIHRoaXMuc2lua3MpXG4gIH1cblxuICByZXR1cm4gdGhpcy5zaW5rcy5sZW5ndGhcbn07XG5cbk11bHRpY2FzdFNvdXJjZS5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiBldmVudCAodGltZSwgdmFsdWUpIHtcbiAgdmFyIHMgPSB0aGlzLnNpbmtzXG4gIGlmIChzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBzWzBdLmV2ZW50KHRpbWUsIHZhbHVlKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgIHRyeUV2ZW50KHRpbWUsIHZhbHVlLCBzW2ldKVxuICB9XG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZCAodGltZSwgdmFsdWUpIHtcbiAgdmFyIHMgPSB0aGlzLnNpbmtzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgIHRyeUVuZCh0aW1lLCB2YWx1ZSwgc1tpXSlcbiAgfVxufTtcblxuTXVsdGljYXN0U291cmNlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIGVycm9yICh0aW1lLCBlcnIpIHtcbiAgdmFyIHMgPSB0aGlzLnNpbmtzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgIHNbaV0uZXJyb3IodGltZSwgZXJyKVxuICB9XG59O1xuXG5mdW5jdGlvbiBtdWx0aWNhc3QgKHN0cmVhbSkge1xuICB2YXIgc291cmNlID0gc3RyZWFtLnNvdXJjZVxuICByZXR1cm4gc291cmNlIGluc3RhbmNlb2YgTXVsdGljYXN0U291cmNlXG4gICAgPyBzdHJlYW1cbiAgICA6IG5ldyBzdHJlYW0uY29uc3RydWN0b3IobmV3IE11bHRpY2FzdFNvdXJjZShzb3VyY2UpKVxufVxuXG5leHBvcnQgeyBNdWx0aWNhc3RTb3VyY2UgfTtleHBvcnQgZGVmYXVsdCBtdWx0aWNhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aWNhc3QuZXMuanMubWFwXG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cblxuLy8gTm9uLW11dGF0aW5nIGFycmF5IG9wZXJhdGlvbnNcblxuLy8gY29ucyA6OiBhIC0+IFthXSAtPiBbYV1cbi8vIGEgd2l0aCB4IHByZXBlbmRlZFxuZnVuY3Rpb24gY29ucyh4LCBhKSB7XG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIHZhciBiID0gbmV3IEFycmF5KGwgKyAxKTtcbiAgYlswXSA9IHg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgYltpICsgMV0gPSBhW2ldO1xuICB9XG4gIHJldHVybiBiO1xufVxuXG4vLyBhcHBlbmQgOjogYSAtPiBbYV0gLT4gW2FdXG4vLyBhIHdpdGggeCBhcHBlbmRlZFxuZnVuY3Rpb24gYXBwZW5kKHgsIGEpIHtcbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCArIDEpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGJbaV0gPSBhW2ldO1xuICB9XG5cbiAgYltsXSA9IHg7XG4gIHJldHVybiBiO1xufVxuXG4vLyBkcm9wIDo6IEludCAtPiBbYV0gLT4gW2FdXG4vLyBkcm9wIGZpcnN0IG4gZWxlbWVudHNcbmZ1bmN0aW9uIGRyb3AobiwgYSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgaWYgKG4gPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbiBtdXN0IGJlID49IDAnKTtcbiAgfVxuXG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIGlmIChuID09PSAwIHx8IGwgPT09IDApIHtcbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIGlmIChuID49IGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gdW5zYWZlRHJvcChuLCBhLCBsIC0gbik7XG59XG5cbi8vIHVuc2FmZURyb3AgOjogSW50IC0+IFthXSAtPiBJbnQgLT4gW2FdXG4vLyBJbnRlcm5hbCBoZWxwZXIgZm9yIGRyb3BcbmZ1bmN0aW9uIHVuc2FmZURyb3AobiwgYSwgbCkge1xuICB2YXIgYiA9IG5ldyBBcnJheShsKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICBiW2ldID0gYVtuICsgaV07XG4gIH1cbiAgcmV0dXJuIGI7XG59XG5cbi8vIHRhaWwgOjogW2FdIC0+IFthXVxuLy8gZHJvcCBoZWFkIGVsZW1lbnRcbmZ1bmN0aW9uIHRhaWwoYSkge1xuICByZXR1cm4gZHJvcCgxLCBhKTtcbn1cblxuLy8gY29weSA6OiBbYV0gLT4gW2FdXG4vLyBkdXBsaWNhdGUgYSAoc2hhbGxvdyBkdXBsaWNhdGlvbilcbmZ1bmN0aW9uIGNvcHkoYSkge1xuICB2YXIgbCA9IGEubGVuZ3RoO1xuICB2YXIgYiA9IG5ldyBBcnJheShsKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICBiW2ldID0gYVtpXTtcbiAgfVxuICByZXR1cm4gYjtcbn1cblxuLy8gbWFwIDo6IChhIC0+IGIpIC0+IFthXSAtPiBbYl1cbi8vIHRyYW5zZm9ybSBlYWNoIGVsZW1lbnQgd2l0aCBmXG5mdW5jdGlvbiBtYXAoZiwgYSkge1xuICB2YXIgbCA9IGEubGVuZ3RoO1xuICB2YXIgYiA9IG5ldyBBcnJheShsKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICBiW2ldID0gZihhW2ldKTtcbiAgfVxuICByZXR1cm4gYjtcbn1cblxuLy8gcmVkdWNlIDo6IChhIC0+IGIgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuLy8gYWNjdW11bGF0ZSB2aWEgbGVmdC1mb2xkXG5mdW5jdGlvbiByZWR1Y2UoZiwgeiwgYSkge1xuICB2YXIgciA9IHo7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICByID0gZihyLCBhW2ldLCBpKTtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuLy8gcmVwbGFjZSA6OiBhIC0+IEludCAtPiBbYV1cbi8vIHJlcGxhY2UgZWxlbWVudCBhdCBpbmRleFxuZnVuY3Rpb24gcmVwbGFjZSh4LCBpLCBhKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICBpZiAoaSA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpIG11c3QgYmUgPj0gMCcpO1xuICB9XG5cbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCk7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgbDsgKytqKSB7XG4gICAgYltqXSA9IGkgPT09IGogPyB4IDogYVtqXTtcbiAgfVxuICByZXR1cm4gYjtcbn1cblxuLy8gcmVtb3ZlIDo6IEludCAtPiBbYV0gLT4gW2FdXG4vLyByZW1vdmUgZWxlbWVudCBhdCBpbmRleFxuZnVuY3Rpb24gcmVtb3ZlKGksIGEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIGlmIChpIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2kgbXVzdCBiZSA+PSAwJyk7XG4gIH1cblxuICB2YXIgbCA9IGEubGVuZ3RoO1xuICBpZiAobCA9PT0gMCB8fCBpID49IGwpIHtcbiAgICAvLyBleGl0IGVhcmx5IGlmIGluZGV4IGJleW9uZCBlbmQgb2YgYXJyYXlcbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIGlmIChsID09PSAxKSB7XG4gICAgLy8gZXhpdCBlYXJseSBpZiBpbmRleCBpbiBib3VuZHMgYW5kIGxlbmd0aCA9PT0gMVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVSZW1vdmUoaSwgYSwgbCAtIDEpO1xufVxuXG4vLyB1bnNhZmVSZW1vdmUgOjogSW50IC0+IFthXSAtPiBJbnQgLT4gW2FdXG4vLyBJbnRlcm5hbCBoZWxwZXIgdG8gcmVtb3ZlIGVsZW1lbnQgYXQgaW5kZXhcbmZ1bmN0aW9uIHVuc2FmZVJlbW92ZShpLCBhLCBsKSB7XG4gIHZhciBiID0gbmV3IEFycmF5KGwpO1xuICB2YXIgaiA9IHZvaWQgMDtcbiAgZm9yIChqID0gMDsgaiA8IGk7ICsraikge1xuICAgIGJbal0gPSBhW2pdO1xuICB9XG4gIGZvciAoaiA9IGk7IGogPCBsOyArK2opIHtcbiAgICBiW2pdID0gYVtqICsgMV07XG4gIH1cblxuICByZXR1cm4gYjtcbn1cblxuLy8gcmVtb3ZlQWxsIDo6IChhIC0+IGJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbi8vIHJlbW92ZSBhbGwgZWxlbWVudHMgbWF0Y2hpbmcgYSBwcmVkaWNhdGVcbmZ1bmN0aW9uIHJlbW92ZUFsbChmLCBhKSB7XG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIHZhciBiID0gbmV3IEFycmF5KGwpO1xuICB2YXIgaiA9IDA7XG4gIGZvciAodmFyIHgsIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgeCA9IGFbaV07XG4gICAgaWYgKCFmKHgpKSB7XG4gICAgICBiW2pdID0geDtcbiAgICAgICsrajtcbiAgICB9XG4gIH1cblxuICBiLmxlbmd0aCA9IGo7XG4gIHJldHVybiBiO1xufVxuXG4vLyBmaW5kSW5kZXggOjogYSAtPiBbYV0gLT4gSW50XG4vLyBmaW5kIGluZGV4IG9mIHggaW4gYSwgZnJvbSB0aGUgbGVmdFxuZnVuY3Rpb24gZmluZEluZGV4KHgsIGEpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmICh4ID09PSBhW2ldKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vLyBpc0FycmF5TGlrZSA6OiAqIC0+IGJvb2xlYW5cbi8vIFJldHVybiB0cnVlIGlmZiB4IGlzIGFycmF5LWxpa2VcbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB0eXBlb2YgeC5sZW5ndGggPT09ICdudW1iZXInICYmIHR5cGVvZiB4ICE9PSAnZnVuY3Rpb24nO1xufVxuXG4vKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cblxuLy8gaWQgOjogYSAtPiBhXG52YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG4gIHJldHVybiB4O1xufTtcblxuLy8gY29tcG9zZSA6OiAoYiAtPiBjKSAtPiAoYSAtPiBiKSAtPiAoYSAtPiBjKVxudmFyIGNvbXBvc2UgPSBmdW5jdGlvbiBjb21wb3NlKGYsIGcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIGYoZyh4KSk7XG4gIH07XG59O1xuXG4vLyBhcHBseSA6OiAoYSAtPiBiKSAtPiBhIC0+IGJcbnZhciBhcHBseSA9IGZ1bmN0aW9uIGFwcGx5KGYsIHgpIHtcbiAgcmV0dXJuIGYoeCk7XG59O1xuXG4vLyBjdXJyeTIgOjogKChhLCBiKSAtPiBjKSAtPiAoYSAtPiBiIC0+IGMpXG5mdW5jdGlvbiBjdXJyeTIoZikge1xuICBmdW5jdGlvbiBjdXJyaWVkKGEsIGIpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGN1cnJpZWQ7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYikge1xuICAgICAgICAgIHJldHVybiBmKGEsIGIpO1xuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGYoYSwgYik7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyaWVkO1xufVxuXG4vLyBjdXJyeTMgOjogKChhLCBiLCBjKSAtPiBkKSAtPiAoYSAtPiBiIC0+IGMgLT4gZClcbmZ1bmN0aW9uIGN1cnJ5MyhmKSB7XG4gIGZ1bmN0aW9uIGN1cnJpZWQoYSwgYiwgYykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gY3VycmllZDtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIGN1cnJ5MihmdW5jdGlvbiAoYiwgYykge1xuICAgICAgICAgIHJldHVybiBmKGEsIGIsIGMpO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSwgYiwgYyk7XG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZihhLCBiLCBjKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJpZWQ7XG59XG5cbi8vIGN1cnJ5NCA6OiAoKGEsIGIsIGMsIGQpIC0+IGUpIC0+IChhIC0+IGIgLT4gYyAtPiBkIC0+IGUpXG5mdW5jdGlvbiBjdXJyeTQoZikge1xuICBmdW5jdGlvbiBjdXJyaWVkKGEsIGIsIGMsIGQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGN1cnJpZWQ7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBjdXJyeTMoZnVuY3Rpb24gKGIsIGMsIGQpIHtcbiAgICAgICAgICByZXR1cm4gZihhLCBiLCBjLCBkKTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBjdXJyeTIoZnVuY3Rpb24gKGMsIGQpIHtcbiAgICAgICAgICByZXR1cm4gZihhLCBiLCBjLCBkKTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIHJldHVybiBmKGEsIGIsIGMsIGQpO1xuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGYoYSwgYiwgYywgZCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyaWVkO1xufVxuXG4vKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG5cbmV4cG9ydCB7IGNvbnMsIGFwcGVuZCwgZHJvcCwgdGFpbCwgY29weSwgbWFwLCByZWR1Y2UsIHJlcGxhY2UsIHJlbW92ZSwgcmVtb3ZlQWxsLCBmaW5kSW5kZXgsIGlzQXJyYXlMaWtlLCBpZCwgY29tcG9zZSwgYXBwbHksIGN1cnJ5MiwgY3VycnkzLCBjdXJyeTQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbi8qKlxuICogRG91Ymx5IGxpbmtlZCBsaXN0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlua2VkTGlzdCAoKSB7XG4gIHRoaXMuaGVhZCA9IG51bGxcbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogQWRkIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0XG4gKiBAcGFyYW0ge3twcmV2Ok9iamVjdHxudWxsLCBuZXh0Ok9iamVjdHxudWxsLCBkaXNwb3NlOmZ1bmN0aW9ufX0geCBub2RlIHRvIGFkZFxuICovXG5MaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoeCkge1xuICBpZiAodGhpcy5oZWFkICE9PSBudWxsKSB7XG4gICAgdGhpcy5oZWFkLnByZXYgPSB4XG4gICAgeC5uZXh0ID0gdGhpcy5oZWFkXG4gIH1cbiAgdGhpcy5oZWFkID0geFxuICArK3RoaXMubGVuZ3RoXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBwcm92aWRlZCBub2RlIGZyb20gdGhlIGxpc3RcbiAqIEBwYXJhbSB7e3ByZXY6T2JqZWN0fG51bGwsIG5leHQ6T2JqZWN0fG51bGwsIGRpc3Bvc2U6ZnVuY3Rpb259fSB4IG5vZGUgdG8gcmVtb3ZlXG4gKi9cbkxpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgIGNvbXBsZXhpdHlcbiAgLS10aGlzLmxlbmd0aFxuICBpZiAoeCA9PT0gdGhpcy5oZWFkKSB7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHRcbiAgfVxuICBpZiAoeC5uZXh0ICE9PSBudWxsKSB7XG4gICAgeC5uZXh0LnByZXYgPSB4LnByZXZcbiAgICB4Lm5leHQgPSBudWxsXG4gIH1cbiAgaWYgKHgucHJldiAhPT0gbnVsbCkge1xuICAgIHgucHJldi5uZXh0ID0geC5uZXh0XG4gICAgeC5wcmV2ID0gbnVsbFxuICB9XG59XG5cbi8qKlxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWZmIHRoZXJlIGFyZSBubyBub2RlcyBpbiB0aGUgbGlzdFxuICovXG5MaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5sZW5ndGggPT09IDBcbn1cblxuLyoqXG4gKiBEaXNwb3NlIGFsbCBub2Rlc1xuICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdGhhdCBmdWxmaWxscyB3aGVuIGFsbCBub2RlcyBoYXZlIGJlZW4gZGlzcG9zZWQsXG4gKiAgb3IgcmVqZWN0cyBpZiBhbiBlcnJvciBvY2N1cnMgd2hpbGUgZGlzcG9zaW5nXG4gKi9cbkxpbmtlZExpc3QucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICB9XG5cbiAgdmFyIHByb21pc2VzID0gW11cbiAgdmFyIHggPSB0aGlzLmhlYWRcbiAgdGhpcy5oZWFkID0gbnVsbFxuICB0aGlzLmxlbmd0aCA9IDBcblxuICB3aGlsZSAoeCAhPT0gbnVsbCkge1xuICAgIHByb21pc2VzLnB1c2goeC5kaXNwb3NlKCkpXG4gICAgeCA9IHgubmV4dFxuICB9XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2UgKHApIHtcbiAgcmV0dXJuIHAgIT09IG51bGwgJiYgdHlwZW9mIHAgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwLnRoZW4gPT09ICdmdW5jdGlvbidcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2RlcXVlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFF1ZXVlIChjYXBQb3cyKSB7XG4gIHRoaXMuX2NhcGFjaXR5ID0gY2FwUG93MiB8fCAzMlxuICB0aGlzLl9sZW5ndGggPSAwXG4gIHRoaXMuX2hlYWQgPSAwXG59XG5cblF1ZXVlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKHgpIHtcbiAgdmFyIGxlbiA9IHRoaXMuX2xlbmd0aFxuICB0aGlzLl9jaGVja0NhcGFjaXR5KGxlbiArIDEpXG5cbiAgdmFyIGkgPSAodGhpcy5faGVhZCArIGxlbikgJiAodGhpcy5fY2FwYWNpdHkgLSAxKVxuICB0aGlzW2ldID0geFxuICB0aGlzLl9sZW5ndGggPSBsZW4gKyAxXG59XG5cblF1ZXVlLnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkXG4gIHZhciB4ID0gdGhpc1toZWFkXVxuXG4gIHRoaXNbaGVhZF0gPSB2b2lkIDBcbiAgdGhpcy5faGVhZCA9IChoZWFkICsgMSkgJiAodGhpcy5fY2FwYWNpdHkgLSAxKVxuICB0aGlzLl9sZW5ndGgtLVxuICByZXR1cm4geFxufVxuXG5RdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX2xlbmd0aCA9PT0gMFxufVxuXG5RdWV1ZS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fbGVuZ3RoXG59XG5cblF1ZXVlLnByb3RvdHlwZS5fY2hlY2tDYXBhY2l0eSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0aGlzLl9jYXBhY2l0eSA8IHNpemUpIHtcbiAgICB0aGlzLl9lbnN1cmVDYXBhY2l0eSh0aGlzLl9jYXBhY2l0eSA8PCAxKVxuICB9XG59XG5cblF1ZXVlLnByb3RvdHlwZS5fZW5zdXJlQ2FwYWNpdHkgPSBmdW5jdGlvbiAoY2FwYWNpdHkpIHtcbiAgdmFyIG9sZENhcGFjaXR5ID0gdGhpcy5fY2FwYWNpdHlcbiAgdGhpcy5fY2FwYWNpdHkgPSBjYXBhY2l0eVxuXG4gIHZhciBsYXN0ID0gdGhpcy5faGVhZCArIHRoaXMuX2xlbmd0aFxuXG4gIGlmIChsYXN0ID4gb2xkQ2FwYWNpdHkpIHtcbiAgICBjb3B5KHRoaXMsIDAsIHRoaXMsIG9sZENhcGFjaXR5LCBsYXN0ICYgKG9sZENhcGFjaXR5IC0gMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY29weSAoc3JjLCBzcmNJbmRleCwgZHN0LCBkc3RJbmRleCwgbGVuKSB7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgbGVuOyArK2opIHtcbiAgICBkc3RbaiArIGRzdEluZGV4XSA9IHNyY1tqICsgc3JjSW5kZXhdXG4gICAgc3JjW2ogKyBzcmNJbmRleF0gPSB2b2lkIDBcbiAgfVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0cmVhbSAoc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblN0cmVhbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKHNpbmssIHNjaGVkdWxlcilcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCB7IHdpdGhEZWZhdWx0U2NoZWR1bGVyIGFzIHJ1blNvdXJjZSB9IGZyb20gJy4uL3J1blNvdXJjZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyZWFtIGNvbnRhaW5pbmcgc3VjY2Vzc2l2ZSByZWR1Y2UgcmVzdWx0cyBvZiBhcHBseWluZyBmIHRvXG4gKiB0aGUgcHJldmlvdXMgcmVkdWNlIHJlc3VsdCBhbmQgdGhlIGN1cnJlbnQgc3RyZWFtIGl0ZW0uXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHJlc3VsdDoqLCB4OiopOip9IGYgcmVkdWNlciBmdW5jdGlvblxuICogQHBhcmFtIHsqfSBpbml0aWFsIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIHNjYW5cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBzdWNjZXNzaXZlIHJlZHVjZSByZXN1bHRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FuIChmLCBpbml0aWFsLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFNjYW4oZiwgaW5pdGlhbCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFNjYW4gKGYsIHosIHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLmYgPSBmXG4gIHRoaXMudmFsdWUgPSB6XG59XG5cblNjYW4ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGQxID0gc2NoZWR1bGVyLmFzYXAoUHJvcGFnYXRlVGFzay5ldmVudCh0aGlzLnZhbHVlLCBzaW5rKSlcbiAgdmFyIGQyID0gdGhpcy5zb3VyY2UucnVuKG5ldyBTY2FuU2luayh0aGlzLmYsIHRoaXMudmFsdWUsIHNpbmspLCBzY2hlZHVsZXIpXG4gIHJldHVybiBkaXNwb3NlLmFsbChbZDEsIGQyXSlcbn1cblxuZnVuY3Rpb24gU2NhblNpbmsgKGYsIHosIHNpbmspIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnZhbHVlID0gelxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblNjYW5TaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBmID0gdGhpcy5mXG4gIHRoaXMudmFsdWUgPSBmKHRoaXMudmFsdWUsIHgpXG4gIHRoaXMuc2luay5ldmVudCh0LCB0aGlzLnZhbHVlKVxufVxuXG5TY2FuU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuU2NhblNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuXG4vKipcbiogUmVkdWNlIGEgc3RyZWFtIHRvIHByb2R1Y2UgYSBzaW5nbGUgcmVzdWx0LiAgTm90ZSB0aGF0IHJlZHVjaW5nIGFuIGluZmluaXRlXG4qIHN0cmVhbSB3aWxsIHJldHVybiBhIFByb21pc2UgdGhhdCBuZXZlciBmdWxmaWxscywgYnV0IHRoYXQgbWF5IHJlamVjdCBpZiBhbiBlcnJvclxuKiBvY2N1cnMuXG4qIEBwYXJhbSB7ZnVuY3Rpb24ocmVzdWx0OiosIHg6Kik6Kn0gZiByZWR1Y2VyIGZ1bmN0aW9uXG4qIEBwYXJhbSB7Kn0gaW5pdGlhbCBpbml0aWFsIHZhbHVlXG4qIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gdG8gcmVkdWNlXG4qIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIGZvciB0aGUgZmlsZSByZXN1bHQgb2YgdGhlIHJlZHVjZVxuKi9cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2UgKGYsIGluaXRpYWwsIHN0cmVhbSkge1xuICByZXR1cm4gcnVuU291cmNlKG5ldyBSZWR1Y2UoZiwgaW5pdGlhbCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFJlZHVjZSAoZiwgeiwgc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG4gIHRoaXMuZiA9IGZcbiAgdGhpcy52YWx1ZSA9IHpcbn1cblxuUmVkdWNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFJlZHVjZVNpbmsodGhpcy5mLCB0aGlzLnZhbHVlLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBSZWR1Y2VTaW5rIChmLCB6LCBzaW5rKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy52YWx1ZSA9IHpcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5SZWR1Y2VTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBmID0gdGhpcy5mXG4gIHRoaXMudmFsdWUgPSBmKHRoaXMudmFsdWUsIHgpXG4gIHRoaXMuc2luay5ldmVudCh0LCB0aGlzLnZhbHVlKVxufVxuXG5SZWR1Y2VTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cblJlZHVjZVNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0KSB7XG4gIHRoaXMuc2luay5lbmQodCwgdGhpcy52YWx1ZSlcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgeyBjb21iaW5lIH0gZnJvbSAnLi9jb21iaW5lJ1xuaW1wb3J0IHsgYXBwbHkgfSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG4vKipcbiAqIEFzc3VtZSBmcyBpcyBhIHN0cmVhbSBjb250YWluaW5nIGZ1bmN0aW9ucywgYW5kIGFwcGx5IHRoZSBsYXRlc3QgZnVuY3Rpb25cbiAqIGluIGZzIHRvIHRoZSBsYXRlc3QgdmFsdWUgaW4geHMuXG4gKiBmczogICAgICAgICAtLWYtLS0tLS0tLS1nLS0tLS0tLS1oLS0tLS0tPlxuICogeHM6ICAgICAgICAgLWEtLS0tLS0tYi0tLS0tLS1jLS0tLS0tLWQtLT5cbiAqIGFwKGZzLCB4cyk6IC0tZmEtLS0tLWZiLWdiLS0tZ2MtLWhjLS1oZC0+XG4gKiBAcGFyYW0ge1N0cmVhbX0gZnMgc3RyZWFtIG9mIGZ1bmN0aW9ucyB0byBhcHBseSB0byB0aGUgbGF0ZXN0IHhcbiAqIEBwYXJhbSB7U3RyZWFtfSB4cyBzdHJlYW0gb2YgdmFsdWVzIHRvIHdoaWNoIHRvIGFwcGx5IGFsbCB0aGUgbGF0ZXN0IGZcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGFsbCB0aGUgYXBwbGljYXRpb25zIG9mIGZzIHRvIHhzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcCAoZnMsIHhzKSB7XG4gIHJldHVybiBjb21iaW5lKGFwcGx5LCBmcywgeHMpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgb2YgYXMgc3RyZWFtT2YgfSBmcm9tICcuLi9zb3VyY2UvY29yZSdcbmltcG9ydCB7IGNvbnRpbnVlV2l0aCB9IGZyb20gJy4vY29udGludWVXaXRoJ1xuXG4vKipcbiAqIEBwYXJhbSB7Kn0geCB2YWx1ZSB0byBwcmVwZW5kXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdpdGggeCBwcmVwZW5kZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnMgKHgsIHN0cmVhbSkge1xuICByZXR1cm4gY29uY2F0KHN0cmVhbU9mKHgpLCBzdHJlYW0pXG59XG5cbi8qKlxuKiBAcGFyYW0ge1N0cmVhbX0gbGVmdFxuKiBAcGFyYW0ge1N0cmVhbX0gcmlnaHRcbiogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgaW4gbGVmdCBmb2xsb3dlZCBieSBhbGxcbiogIGV2ZW50cyBpbiByaWdodC4gIFRoaXMgKnRpbWVzaGlmdHMqIHJpZ2h0IHRvIHRoZSBlbmQgb2YgbGVmdC5cbiovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0IChsZWZ0LCByaWdodCkge1xuICByZXR1cm4gY29udGludWVXaXRoKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmlnaHRcbiAgfSwgbGVmdClcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCAqIGFzIHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSdcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi4vc291cmNlL2NvcmUnXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgSW5kZXhTaW5rIGZyb20gJy4uL3NpbmsvSW5kZXhTaW5rJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5pbXBvcnQgaW52b2tlIGZyb20gJy4uL2ludm9rZSdcblxudmFyIG1hcCA9IGJhc2UubWFwXG52YXIgdGFpbCA9IGJhc2UudGFpbFxuXG4vKipcbiAqIENvbWJpbmUgbGF0ZXN0IGV2ZW50cyBmcm9tIGFsbCBpbnB1dCBzdHJlYW1zXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLmV2ZW50cyk6Kn0gZiBmdW5jdGlvbiB0byBjb21iaW5lIG1vc3QgcmVjZW50IGV2ZW50c1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBmIHRvIHRoZSBtb3N0IHJlY2VudFxuICogIGV2ZW50IG9mIGVhY2ggaW5wdXQgc3RyZWFtLCB3aGVuZXZlciBhIG5ldyBldmVudCBhcnJpdmVzIG9uIGFueSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lIChmIC8qLCAuLi5zdHJlYW1zICovKSB7XG4gIHJldHVybiBjb21iaW5lQXJyYXkoZiwgdGFpbChhcmd1bWVudHMpKVxufVxuXG4vKipcbiogQ29tYmluZSBsYXRlc3QgZXZlbnRzIGZyb20gYWxsIGlucHV0IHN0cmVhbXNcbiogQHBhcmFtIHtmdW5jdGlvbiguLi5ldmVudHMpOip9IGYgZnVuY3Rpb24gdG8gY29tYmluZSBtb3N0IHJlY2VudCBldmVudHNcbiogQHBhcmFtIHtbU3RyZWFtXX0gc3RyZWFtcyBtb3N0IHJlY2VudCBldmVudHNcbiogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBmIHRvIHRoZSBtb3N0IHJlY2VudFxuKiAgZXZlbnQgb2YgZWFjaCBpbnB1dCBzdHJlYW0sIHdoZW5ldmVyIGEgbmV3IGV2ZW50IGFycml2ZXMgb24gYW55IHN0cmVhbS5cbiovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUFycmF5IChmLCBzdHJlYW1zKSB7XG4gIHZhciBsID0gc3RyZWFtcy5sZW5ndGhcbiAgcmV0dXJuIGwgPT09IDAgPyBjb3JlLmVtcHR5KClcbiAgOiBsID09PSAxID8gdHJhbnNmb3JtLm1hcChmLCBzdHJlYW1zWzBdKVxuICA6IG5ldyBTdHJlYW0oY29tYmluZVNvdXJjZXMoZiwgc3RyZWFtcykpXG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVTb3VyY2VzIChmLCBzdHJlYW1zKSB7XG4gIHJldHVybiBuZXcgQ29tYmluZShmLCBtYXAoZ2V0U291cmNlLCBzdHJlYW1zKSlcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlIChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5zb3VyY2Vcbn1cblxuZnVuY3Rpb24gQ29tYmluZSAoZiwgc291cmNlcykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc291cmNlcyA9IHNvdXJjZXNcbn1cblxuQ29tYmluZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbCA9IHRoaXMuc291cmNlcy5sZW5ndGhcbiAgdmFyIGRpc3Bvc2FibGVzID0gbmV3IEFycmF5KGwpXG4gIHZhciBzaW5rcyA9IG5ldyBBcnJheShsKVxuXG4gIHZhciBtZXJnZVNpbmsgPSBuZXcgQ29tYmluZVNpbmsoZGlzcG9zYWJsZXMsIHNpbmtzLCBzaW5rLCB0aGlzLmYpXG5cbiAgZm9yICh2YXIgaW5kZXhTaW5rLCBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGluZGV4U2luayA9IHNpbmtzW2ldID0gbmV3IEluZGV4U2luayhpLCBtZXJnZVNpbmspXG4gICAgZGlzcG9zYWJsZXNbaV0gPSB0aGlzLnNvdXJjZXNbaV0ucnVuKGluZGV4U2luaywgc2NoZWR1bGVyKVxuICB9XG5cbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKGRpc3Bvc2FibGVzKVxufVxuXG5mdW5jdGlvbiBDb21iaW5lU2luayAoZGlzcG9zYWJsZXMsIHNpbmtzLCBzaW5rLCBmKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5kaXNwb3NhYmxlcyA9IGRpc3Bvc2FibGVzXG4gIHRoaXMuc2lua3MgPSBzaW5rc1xuICB0aGlzLmYgPSBmXG5cbiAgdmFyIGwgPSBzaW5rcy5sZW5ndGhcbiAgdGhpcy5hd2FpdGluZyA9IGxcbiAgdGhpcy52YWx1ZXMgPSBuZXcgQXJyYXkobClcbiAgdGhpcy5oYXNWYWx1ZSA9IG5ldyBBcnJheShsKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIHRoaXMuaGFzVmFsdWVbaV0gPSBmYWxzZVxuICB9XG5cbiAgdGhpcy5hY3RpdmVDb3VudCA9IHNpbmtzLmxlbmd0aFxufVxuXG5Db21iaW5lU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5Db21iaW5lU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgaW5kZXhlZFZhbHVlKSB7XG4gIHZhciBpID0gaW5kZXhlZFZhbHVlLmluZGV4XG4gIHZhciBhd2FpdGluZyA9IHRoaXMuX3VwZGF0ZVJlYWR5KGkpXG5cbiAgdGhpcy52YWx1ZXNbaV0gPSBpbmRleGVkVmFsdWUudmFsdWVcbiAgaWYgKGF3YWl0aW5nID09PSAwKSB7XG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIGludm9rZSh0aGlzLmYsIHRoaXMudmFsdWVzKSlcbiAgfVxufVxuXG5Db21iaW5lU2luay5wcm90b3R5cGUuX3VwZGF0ZVJlYWR5ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmICh0aGlzLmF3YWl0aW5nID4gMCkge1xuICAgIGlmICghdGhpcy5oYXNWYWx1ZVtpbmRleF0pIHtcbiAgICAgIHRoaXMuaGFzVmFsdWVbaW5kZXhdID0gdHJ1ZVxuICAgICAgdGhpcy5hd2FpdGluZyAtPSAxXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzLmF3YWl0aW5nXG59XG5cbkNvbWJpbmVTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgaW5kZXhlZFZhbHVlKSB7XG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCB0aGlzLmRpc3Bvc2FibGVzW2luZGV4ZWRWYWx1ZS5pbmRleF0sIHRoaXMuc2luaylcbiAgaWYgKC0tdGhpcy5hY3RpdmVDb3VudCA9PT0gMCkge1xuICAgIHRoaXMuc2luay5lbmQodCwgaW5kZXhlZFZhbHVlLnZhbHVlKVxuICB9XG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgbWVyZ2VNYXBDb25jdXJyZW50bHkgfSBmcm9tICcuL21lcmdlQ29uY3VycmVudGx5J1xuXG4vKipcbiAqIE1hcCBlYWNoIHZhbHVlIGluIHN0cmVhbSB0byBhIG5ldyBzdHJlYW0sIGFuZCBjb25jYXRlbmF0ZSB0aGVtIGFsbFxuICogc3RyZWFtOiAgICAgICAgICAgICAgLWEtLS1iLS0tY1hcbiAqIGYoYSk6ICAgICAgICAgICAgICAgICAxLTEtMS0xWFxuICogZihiKTogICAgICAgICAgICAgICAgICAgICAgICAtMi0yLTItMlhcbiAqIGYoYyk6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMy0zLTMtM1hcbiAqIHN0cmVhbS5jb25jYXRNYXAoZik6IC0xLTEtMS0xLTItMi0yLTItMy0zLTMtM1hcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpTdHJlYW19IGYgZnVuY3Rpb24gdG8gbWFwIGVhY2ggdmFsdWUgdG8gYSBzdHJlYW1cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBhbGwgZXZlbnRzIGZyb20gZWFjaCBzdHJlYW0gcmV0dXJuZWQgYnkgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0TWFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG1lcmdlTWFwQ29uY3VycmVudGx5KGYsIDEsIHN0cmVhbSlcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGludWVXaXRoIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IENvbnRpbnVlV2l0aChmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gQ29udGludWVXaXRoIChmLCBzb3VyY2UpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Db250aW51ZVdpdGgucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBDb250aW51ZVdpdGhTaW5rKHRoaXMuZiwgdGhpcy5zb3VyY2UsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gQ29udGludWVXaXRoU2luayAoZiwgc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NlLm9uY2Uoc291cmNlLnJ1bih0aGlzLCBzY2hlZHVsZXIpKVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuc2luay5ldmVudCh0LCB4KVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBkaXNwb3NlLnRyeURpc3Bvc2UodCwgdGhpcy5kaXNwb3NhYmxlLCB0aGlzLnNpbmspXG4gIHRoaXMuX3N0YXJ0TmV4dCh0LCB4LCB0aGlzLnNpbmspXG59XG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLl9zdGFydE5leHQgPSBmdW5jdGlvbiAodCwgeCwgc2luaykge1xuICB0cnkge1xuICAgIHRoaXMuZGlzcG9zYWJsZSA9IHRoaXMuX2NvbnRpbnVlKHRoaXMuZiwgeCwgc2luaylcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNpbmsuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5fY29udGludWUgPSBmdW5jdGlvbiAoZiwgeCwgc2luaykge1xuICByZXR1cm4gZih4KS5zb3VyY2UucnVuKHNpbmssIHRoaXMuc2NoZWR1bGVyKVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHJldHVybiB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVRpbWUgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IGVhY2ggaXRlbVxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIHRoZSBzYW1lIGl0ZW1zLCBidXQgZGVsYXllZCBieSBtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXkgKGRlbGF5VGltZSwgc3RyZWFtKSB7XG4gIHJldHVybiBkZWxheVRpbWUgPD0gMCA/IHN0cmVhbVxuICAgIDogbmV3IFN0cmVhbShuZXcgRGVsYXkoZGVsYXlUaW1lLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gRGVsYXkgKGR0LCBzb3VyY2UpIHtcbiAgdGhpcy5kdCA9IGR0XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkRlbGF5LnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBkZWxheVNpbmsgPSBuZXcgRGVsYXlTaW5rKHRoaXMuZHQsIHNpbmssIHNjaGVkdWxlcilcbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKFtkZWxheVNpbmssIHRoaXMuc291cmNlLnJ1bihkZWxheVNpbmssIHNjaGVkdWxlcildKVxufVxuXG5mdW5jdGlvbiBEZWxheVNpbmsgKGR0LCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5kdCA9IGR0XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbn1cblxuRGVsYXlTaW5rLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5zY2hlZHVsZXIuY2FuY2VsQWxsKGZ1bmN0aW9uIChzY2hlZHVsZWRUYXNrKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlZFRhc2sudGFzay5zaW5rID09PSBzZWxmLnNpbmtcbiAgfSlcbn1cblxuRGVsYXlTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuc2NoZWR1bGVyLmRlbGF5KHRoaXMuZHQsIFByb3BhZ2F0ZVRhc2suZXZlbnQoeCwgdGhpcy5zaW5rKSlcbn1cblxuRGVsYXlTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLnNjaGVkdWxlci5kZWxheSh0aGlzLmR0LCBQcm9wYWdhdGVUYXNrLmVuZCh4LCB0aGlzLnNpbmspKVxufVxuXG5EZWxheVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBTYWZlU2luayBmcm9tICcuLi9zaW5rL1NhZmVTaW5rJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyB0cnlFdmVudCBmcm9tICcuLi9zb3VyY2UvdHJ5RXZlbnQnXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuLyoqXG4gKiBJZiBzdHJlYW0gZW5jb3VudGVycyBhbiBlcnJvciwgcmVjb3ZlciBhbmQgY29udGludWUgd2l0aCBpdGVtcyBmcm9tIHN0cmVhbVxuICogcmV0dXJuZWQgYnkgZi5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oZXJyb3I6Kik6U3RyZWFtfSBmIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBuZXcgc3RyZWFtXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdoaWNoIHdpbGwgcmVjb3ZlciBmcm9tIGFuIGVycm9yIGJ5IGNhbGxpbmcgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjb3ZlcldpdGggKGYsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgUmVjb3ZlcldpdGgoZiwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmV4cG9ydCB2YXIgZmxhdE1hcEVycm9yID0gcmVjb3ZlcldpdGhcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gY29udGFpbmluZyBvbmx5IGFuIGVycm9yXG4gKiBAcGFyYW0geyp9IGUgZXJyb3IgdmFsdWUsIHByZWZlcmFibHkgYW4gRXJyb3Igb3IgRXJyb3Igc3VidHlwZVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIG9ubHkgYW4gZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IgKGUpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEVycm9yU291cmNlKGUpKVxufVxuXG5mdW5jdGlvbiBFcnJvclNvdXJjZSAoZSkge1xuICB0aGlzLnZhbHVlID0gZVxufVxuXG5FcnJvclNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLmFzYXAobmV3IFByb3BhZ2F0ZVRhc2socnVuRXJyb3IsIHRoaXMudmFsdWUsIHNpbmspKVxufVxuXG5mdW5jdGlvbiBydW5FcnJvciAodCwgZSwgc2luaykge1xuICBzaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIFJlY292ZXJXaXRoIChmLCBzb3VyY2UpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5SZWNvdmVyV2l0aC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IFJlY292ZXJXaXRoU2luayh0aGlzLmYsIHRoaXMuc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFJlY292ZXJXaXRoU2luayAoZiwgc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmsgPSBuZXcgU2FmZVNpbmsoc2luaylcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5kaXNwb3NhYmxlID0gc291cmNlLnJ1bih0aGlzLCBzY2hlZHVsZXIpXG59XG5cblJlY292ZXJXaXRoU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0cnlFdmVudC50cnlFdmVudCh0LCB4LCB0aGlzLnNpbmspXG59XG5cblJlY292ZXJXaXRoU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdHJ5RXZlbnQudHJ5RW5kKHQsIHgsIHRoaXMuc2luaylcbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHZhciBuZXh0U2luayA9IHRoaXMuc2luay5kaXNhYmxlKClcblxuICBkaXNwb3NlLnRyeURpc3Bvc2UodCwgdGhpcy5kaXNwb3NhYmxlLCB0aGlzLnNpbmspXG4gIHRoaXMuX3N0YXJ0TmV4dCh0LCBlLCBuZXh0U2luaylcbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5fc3RhcnROZXh0ID0gZnVuY3Rpb24gKHQsIHgsIHNpbmspIHtcbiAgdHJ5IHtcbiAgICB0aGlzLmRpc3Bvc2FibGUgPSB0aGlzLl9jb250aW51ZSh0aGlzLmYsIHgsIHNpbmspXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaW5rLmVycm9yKHQsIGUpXG4gIH1cbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5fY29udGludWUgPSBmdW5jdGlvbiAoZiwgeCwgc2luaykge1xuICB2YXIgc3RyZWFtID0gZih4KVxuICByZXR1cm4gc3RyZWFtLnNvdXJjZS5ydW4oc2luaywgdGhpcy5zY2hlZHVsZXIpXG59XG5cblJlY292ZXJXaXRoU2luay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi4vZnVzaW9uL0ZpbHRlcidcblxuLyoqXG4gKiBSZXRhaW4gb25seSBpdGVtcyBtYXRjaGluZyBhIHByZWRpY2F0ZVxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOmJvb2xlYW59IHAgZmlsdGVyaW5nIHByZWRpY2F0ZSBjYWxsZWQgZm9yIGVhY2ggaXRlbVxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gdG8gZmlsdGVyXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBvbmx5IGl0ZW1zIGZvciB3aGljaCBwcmVkaWNhdGUgcmV0dXJucyB0cnV0aHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlciAocCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKEZpbHRlci5jcmVhdGUocCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbi8qKlxuICogU2tpcCByZXBlYXRlZCBldmVudHMsIHVzaW5nID09PSB0byBkZXRlY3QgZHVwbGljYXRlc1xuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gZnJvbSB3aGljaCB0byBvbWl0IHJlcGVhdGVkIGV2ZW50c1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIHdpdGhvdXQgcmVwZWF0ZWQgZXZlbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBza2lwUmVwZWF0cyAoc3RyZWFtKSB7XG4gIHJldHVybiBza2lwUmVwZWF0c1dpdGgoc2FtZSwgc3RyZWFtKVxufVxuXG4vKipcbiAqIFNraXAgcmVwZWF0ZWQgZXZlbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBlcXVhbHMgZnVuY3Rpb24gdG8gZGV0ZWN0IGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYToqLCBiOiopOmJvb2xlYW59IGVxdWFscyBvcHRpb25hbCBmdW5jdGlvbiB0byBjb21wYXJlIGl0ZW1zXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIHN0cmVhbSBmcm9tIHdoaWNoIHRvIG9taXQgcmVwZWF0ZWQgZXZlbnRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gd2l0aG91dCByZXBlYXRlZCBldmVudHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNraXBSZXBlYXRzV2l0aCAoZXF1YWxzLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFNraXBSZXBlYXRzKGVxdWFscywgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFNraXBSZXBlYXRzIChlcXVhbHMsIHNvdXJjZSkge1xuICB0aGlzLmVxdWFscyA9IGVxdWFsc1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Ta2lwUmVwZWF0cy5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBTa2lwUmVwZWF0c1NpbmsodGhpcy5lcXVhbHMsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFNraXBSZXBlYXRzU2luayAoZXF1YWxzLCBzaW5rKSB7XG4gIHRoaXMuZXF1YWxzID0gZXF1YWxzXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy52YWx1ZSA9IHZvaWQgMFxuICB0aGlzLmluaXQgPSB0cnVlXG59XG5cblNraXBSZXBlYXRzU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5Ta2lwUmVwZWF0c1NpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuU2tpcFJlcGVhdHNTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICh0aGlzLmluaXQpIHtcbiAgICB0aGlzLmluaXQgPSBmYWxzZVxuICAgIHRoaXMudmFsdWUgPSB4XG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIH0gZWxzZSBpZiAoIXRoaXMuZXF1YWxzKHRoaXMudmFsdWUsIHgpKSB7XG4gICAgdGhpcy52YWx1ZSA9IHhcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgeClcbiAgfVxufVxuXG5mdW5jdGlvbiBzYW1lIChhLCBiKSB7XG4gIHJldHVybiBhID09PSBiXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgbWVyZ2VDb25jdXJyZW50bHksIG1lcmdlTWFwQ29uY3VycmVudGx5IH0gZnJvbSAnLi9tZXJnZUNvbmN1cnJlbnRseSdcblxuLyoqXG4gKiBNYXAgZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIHRvIGEgbmV3IHN0cmVhbSwgYW5kIG1lcmdlIGl0IGludG8gdGhlXG4gKiByZXR1cm5lZCBvdXRlciBzdHJlYW0uIEV2ZW50IGFycml2YWwgdGltZXMgYXJlIHByZXNlcnZlZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpTdHJlYW19IGYgY2hhaW5pbmcgZnVuY3Rpb24sIG11c3QgcmV0dXJuIGEgU3RyZWFtXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBmcm9tIGVhY2ggc3RyZWFtIHJldHVybmVkIGJ5IGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXRNYXAgKGYsIHN0cmVhbSkge1xuICByZXR1cm4gbWVyZ2VNYXBDb25jdXJyZW50bHkoZiwgSW5maW5pdHksIHN0cmVhbSlcbn1cblxuLyoqXG4gKiBNb25hZGljIGpvaW4uIEZsYXR0ZW4gYSBTdHJlYW08U3RyZWFtPFg+PiB0byBTdHJlYW08WD4gYnkgbWVyZ2luZyBpbm5lclxuICogc3RyZWFtcyB0byB0aGUgb3V0ZXIuIEV2ZW50IGFycml2YWwgdGltZXMgYXJlIHByZXNlcnZlZC5cbiAqIEBwYXJhbSB7U3RyZWFtPFN0cmVhbTxYPj59IHN0cmVhbSBzdHJlYW0gb2Ygc3RyZWFtc1xuICogQHJldHVybnMge1N0cmVhbTxYPn0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgb2YgYWxsIGlubmVyIHN0cmVhbXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvaW4gKHN0cmVhbSkge1xuICByZXR1cm4gbWVyZ2VDb25jdXJyZW50bHkoSW5maW5pdHksIHN0cmVhbSlcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBNYXAgZnJvbSAnLi4vZnVzaW9uL01hcCdcblxuLyoqXG4gKiBMaW1pdCB0aGUgcmF0ZSBvZiBldmVudHMgYnkgc3VwcHJlc3NpbmcgZXZlbnRzIHRoYXQgb2NjdXIgdG9vIG9mdGVuXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kIHRpbWUgdG8gc3VwcHJlc3MgZXZlbnRzXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUgKHBlcmlvZCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKHRocm90dGxlU291cmNlKHBlcmlvZCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIHRocm90dGxlU291cmNlIChwZXJpb2QsIHNvdXJjZSkge1xuICByZXR1cm4gc291cmNlIGluc3RhbmNlb2YgTWFwID8gY29tbXV0ZU1hcFRocm90dGxlKHBlcmlvZCwgc291cmNlKVxuICAgIDogc291cmNlIGluc3RhbmNlb2YgVGhyb3R0bGUgPyBmdXNlVGhyb3R0bGUocGVyaW9kLCBzb3VyY2UpXG4gICAgOiBuZXcgVGhyb3R0bGUocGVyaW9kLCBzb3VyY2UpXG59XG5cbmZ1bmN0aW9uIGNvbW11dGVNYXBUaHJvdHRsZSAocGVyaW9kLCBzb3VyY2UpIHtcbiAgcmV0dXJuIE1hcC5jcmVhdGUoc291cmNlLmYsIHRocm90dGxlU291cmNlKHBlcmlvZCwgc291cmNlLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIGZ1c2VUaHJvdHRsZSAocGVyaW9kLCBzb3VyY2UpIHtcbiAgcmV0dXJuIG5ldyBUaHJvdHRsZShNYXRoLm1heChwZXJpb2QsIHNvdXJjZS5wZXJpb2QpLCBzb3VyY2Uuc291cmNlKVxufVxuXG5mdW5jdGlvbiBUaHJvdHRsZSAocGVyaW9kLCBzb3VyY2UpIHtcbiAgdGhpcy5wZXJpb2QgPSBwZXJpb2RcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuVGhyb3R0bGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgVGhyb3R0bGVTaW5rKHRoaXMucGVyaW9kLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBUaHJvdHRsZVNpbmsgKHBlcmlvZCwgc2luaykge1xuICB0aGlzLnRpbWUgPSAwXG4gIHRoaXMucGVyaW9kID0gcGVyaW9kXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuVGhyb3R0bGVTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICh0ID49IHRoaXMudGltZSkge1xuICAgIHRoaXMudGltZSA9IHQgKyB0aGlzLnBlcmlvZFxuICAgIHRoaXMuc2luay5ldmVudCh0LCB4KVxuICB9XG59XG5cblRocm90dGxlU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5cblRocm90dGxlU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG4vKipcbiAqIFdhaXQgZm9yIGEgYnVyc3Qgb2YgZXZlbnRzIHRvIHN1YnNpZGUgYW5kIGVtaXQgb25seSB0aGUgbGFzdCBldmVudCBpbiB0aGUgYnVyc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2QgZXZlbnRzIG9jY3VyaW5nIG1vcmUgZnJlcXVlbnRseSB0aGFuIHRoaXNcbiAqICB3aWxsIGJlIHN1cHByZXNzZWRcbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIGRlYm91bmNlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgZGVib3VuY2VkIHN0cmVhbVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UgKHBlcmlvZCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBEZWJvdW5jZShwZXJpb2QsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBEZWJvdW5jZSAoZHQsIHNvdXJjZSkge1xuICB0aGlzLmR0ID0gZHRcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuRGVib3VuY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBEZWJvdW5jZVNpbmsodGhpcy5kdCwgdGhpcy5zb3VyY2UsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gRGVib3VuY2VTaW5rIChkdCwgc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5kdCA9IGR0XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy52YWx1ZSA9IHZvaWQgMFxuICB0aGlzLnRpbWVyID0gbnVsbFxuICB0aGlzLmRpc3Bvc2FibGUgPSBzb3VyY2UucnVuKHRoaXMsIHNjaGVkdWxlcilcbn1cblxuRGVib3VuY2VTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuX2NsZWFyVGltZXIoKVxuICB0aGlzLnZhbHVlID0geFxuICB0aGlzLnRpbWVyID0gdGhpcy5zY2hlZHVsZXIuZGVsYXkodGhpcy5kdCwgbmV3IERlYm91bmNlVGFzayh0aGlzLCB4KSlcbn1cblxuRGVib3VuY2VTaW5rLnByb3RvdHlwZS5fZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLl9jbGVhclRpbWVyKClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuX2NsZWFyVGltZXIoKSkge1xuICAgIHRoaXMuc2luay5ldmVudCh0LCB0aGlzLnZhbHVlKVxuICAgIHRoaXMudmFsdWUgPSB2b2lkIDBcbiAgfVxuICB0aGlzLnNpbmsuZW5kKHQsIHgpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLl9jbGVhclRpbWVyKClcbiAgdGhpcy5zaW5rLmVycm9yKHQsIHgpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fY2xlYXJUaW1lcigpXG4gIHJldHVybiB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuX2NsZWFyVGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnRpbWVyID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgdGhpcy50aW1lci5kaXNwb3NlKClcbiAgdGhpcy50aW1lciA9IG51bGxcbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gRGVib3VuY2VUYXNrIChkZWJvdW5jZSwgdmFsdWUpIHtcbiAgdGhpcy5kZWJvdW5jZSA9IGRlYm91bmNlXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxufVxuXG5EZWJvdW5jZVRhc2sucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh0KSB7XG4gIHRoaXMuZGVib3VuY2UuX2V2ZW50KHQsIHRoaXMudmFsdWUpXG59XG5cbkRlYm91bmNlVGFzay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLmRlYm91bmNlLmVycm9yKHQsIGUpXG59XG5cbkRlYm91bmNlVGFzay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHt9XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5cbi8qKlxuICogR2VuZXJhbGl6ZWQgZmVlZGJhY2sgbG9vcC4gQ2FsbCBhIHN0ZXBwZXIgZnVuY3Rpb24gZm9yIGVhY2ggZXZlbnQuIFRoZSBzdGVwcGVyXG4gKiB3aWxsIGJlIGNhbGxlZCB3aXRoIDIgcGFyYW1zOiB0aGUgY3VycmVudCBzZWVkIGFuZCB0aGUgYW4gZXZlbnQgdmFsdWUuICBJdCBtdXN0XG4gKiByZXR1cm4gYSBuZXcgeyBzZWVkLCB2YWx1ZSB9IHBhaXIuIFRoZSBgc2VlZGAgd2lsbCBiZSBmZWQgYmFjayBpbnRvIHRoZSBuZXh0XG4gKiBpbnZvY2F0aW9uIG9mIHN0ZXBwZXIsIGFuZCB0aGUgYHZhbHVlYCB3aWxsIGJlIHByb3BhZ2F0ZWQgYXMgdGhlIGV2ZW50IHZhbHVlLlxuICogQHBhcmFtIHtmdW5jdGlvbihzZWVkOiosIHZhbHVlOiopOntzZWVkOiosIHZhbHVlOip9fSBzdGVwcGVyIGxvb3Agc3RlcCBmdW5jdGlvblxuICogQHBhcmFtIHsqfSBzZWVkIGluaXRpYWwgc2VlZCB2YWx1ZSBwYXNzZWQgdG8gZmlyc3Qgc3RlcHBlciBjYWxsXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIGV2ZW50IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB3aG9zZSB2YWx1ZXMgYXJlIHRoZSBgdmFsdWVgIGZpZWxkIG9mIHRoZSBvYmplY3RzXG4gKiByZXR1cm5lZCBieSB0aGUgc3RlcHBlclxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9vcCAoc3RlcHBlciwgc2VlZCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBMb29wKHN0ZXBwZXIsIHNlZWQsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBMb29wIChzdGVwcGVyLCBzZWVkLCBzb3VyY2UpIHtcbiAgdGhpcy5zdGVwID0gc3RlcHBlclxuICB0aGlzLnNlZWQgPSBzZWVkXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkxvb3AucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgTG9vcFNpbmsodGhpcy5zdGVwLCB0aGlzLnNlZWQsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIExvb3BTaW5rIChzdGVwcGVyLCBzZWVkLCBzaW5rKSB7XG4gIHRoaXMuc3RlcCA9IHN0ZXBwZXJcbiAgdGhpcy5zZWVkID0gc2VlZFxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cbkxvb3BTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbkxvb3BTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLnN0ZXAodGhpcy5zZWVkLCB4KVxuICB0aGlzLnNlZWQgPSByZXN1bHQuc2VlZFxuICB0aGlzLnNpbmsuZXZlbnQodCwgcmVzdWx0LnZhbHVlKVxufVxuXG5Mb29wU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQpIHtcbiAgdGhpcy5zaW5rLmVuZCh0LCB0aGlzLnNlZWQpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgSW5kZXhTaW5rIGZyb20gJy4uL3NpbmsvSW5kZXhTaW5rJ1xuaW1wb3J0IHsgZW1wdHkgfSBmcm9tICcuLi9zb3VyY2UvY29yZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG52YXIgY29weSA9IGJhc2UuY29weVxudmFyIHJlZHVjZSA9IGJhc2UucmVkdWNlXG5cbi8qKlxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgZXZlbnRzIGZyb20gYWxsIHN0cmVhbXMgaW4gdGhlIGFyZ3VtZW50XG4gKiBsaXN0IGluIHRpbWUgb3JkZXIuICBJZiB0d28gZXZlbnRzIGFyZSBzaW11bHRhbmVvdXMgdGhleSB3aWxsIGJlIG1lcmdlZCBpblxuICogYXJiaXRyYXJ5IG9yZGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UgKC8qIC4uLnN0cmVhbXMgKi8pIHtcbiAgcmV0dXJuIG1lcmdlQXJyYXkoY29weShhcmd1bWVudHMpKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmVhbXMgYXJyYXkgb2Ygc3RyZWFtIHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBldmVudHMgZnJvbSBhbGwgaW5wdXQgb2JzZXJ2YWJsZXNcbiAqIGluIHRpbWUgb3JkZXIuICBJZiB0d28gZXZlbnRzIGFyZSBzaW11bHRhbmVvdXMgdGhleSB3aWxsIGJlIG1lcmdlZCBpblxuICogYXJiaXRyYXJ5IG9yZGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBcnJheSAoc3RyZWFtcykge1xuICB2YXIgbCA9IHN0cmVhbXMubGVuZ3RoXG4gIHJldHVybiBsID09PSAwID8gZW1wdHkoKVxuICAgIDogbCA9PT0gMSA/IHN0cmVhbXNbMF1cbiAgICA6IG5ldyBTdHJlYW0obWVyZ2VTb3VyY2VzKHN0cmVhbXMpKVxufVxuXG4vKipcbiAqIFRoaXMgaW1wbGVtZW50cyBmdXNpb24vZmxhdHRlbmluZyBmb3IgbWVyZ2UuICBJdCB3aWxsXG4gKiBmdXNlIGFkamFjZW50IG1lcmdlIG9wZXJhdGlvbnMuICBGb3IgZXhhbXBsZTpcbiAqIC0gYS5tZXJnZShiKS5tZXJnZShjKSBlZmZlY3RpdmVseSBiZWNvbWVzIG1lcmdlKGEsIGIsIGMpXG4gKiAtIG1lcmdlKGEsIG1lcmdlKGIsIGMpKSBlZmZlY3RpdmVseSBiZWNvbWVzIG1lcmdlKGEsIGIsIGMpXG4gKiBJdCBkb2VzIHRoaXMgYnkgY29uY2F0ZW5hdGluZyB0aGUgc291cmNlcyBhcnJheXMgb2ZcbiAqIGFueSBuZXN0ZWQgTWVyZ2Ugc291cmNlcywgaW4gZWZmZWN0IFwiZmxhdHRlbmluZ1wiIG5lc3RlZFxuICogbWVyZ2Ugb3BlcmF0aW9ucyBpbnRvIGEgc2luZ2xlIG1lcmdlLlxuICovXG5mdW5jdGlvbiBtZXJnZVNvdXJjZXMgKHN0cmVhbXMpIHtcbiAgcmV0dXJuIG5ldyBNZXJnZShyZWR1Y2UoYXBwZW5kU291cmNlcywgW10sIHN0cmVhbXMpKVxufVxuXG5mdW5jdGlvbiBhcHBlbmRTb3VyY2VzIChzb3VyY2VzLCBzdHJlYW0pIHtcbiAgdmFyIHNvdXJjZSA9IHN0cmVhbS5zb3VyY2VcbiAgcmV0dXJuIHNvdXJjZSBpbnN0YW5jZW9mIE1lcmdlXG4gICAgPyBzb3VyY2VzLmNvbmNhdChzb3VyY2Uuc291cmNlcylcbiAgICA6IHNvdXJjZXMuY29uY2F0KHNvdXJjZSlcbn1cblxuZnVuY3Rpb24gTWVyZ2UgKHNvdXJjZXMpIHtcbiAgdGhpcy5zb3VyY2VzID0gc291cmNlc1xufVxuXG5NZXJnZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbCA9IHRoaXMuc291cmNlcy5sZW5ndGhcbiAgdmFyIGRpc3Bvc2FibGVzID0gbmV3IEFycmF5KGwpXG4gIHZhciBzaW5rcyA9IG5ldyBBcnJheShsKVxuXG4gIHZhciBtZXJnZVNpbmsgPSBuZXcgTWVyZ2VTaW5rKGRpc3Bvc2FibGVzLCBzaW5rcywgc2luaylcblxuICBmb3IgKHZhciBpbmRleFNpbmssIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgaW5kZXhTaW5rID0gc2lua3NbaV0gPSBuZXcgSW5kZXhTaW5rKGksIG1lcmdlU2luaylcbiAgICBkaXNwb3NhYmxlc1tpXSA9IHRoaXMuc291cmNlc1tpXS5ydW4oaW5kZXhTaW5rLCBzY2hlZHVsZXIpXG4gIH1cblxuICByZXR1cm4gZGlzcG9zZS5hbGwoZGlzcG9zYWJsZXMpXG59XG5cbmZ1bmN0aW9uIE1lcmdlU2luayAoZGlzcG9zYWJsZXMsIHNpbmtzLCBzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5kaXNwb3NhYmxlcyA9IGRpc3Bvc2FibGVzXG4gIHRoaXMuYWN0aXZlQ291bnQgPSBzaW5rcy5sZW5ndGhcbn1cblxuTWVyZ2VTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbk1lcmdlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgaW5kZXhWYWx1ZSkge1xuICB0aGlzLnNpbmsuZXZlbnQodCwgaW5kZXhWYWx1ZS52YWx1ZSlcbn1cblxuTWVyZ2VTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgaW5kZXhlZFZhbHVlKSB7XG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCB0aGlzLmRpc3Bvc2FibGVzW2luZGV4ZWRWYWx1ZS5pbmRleF0sIHRoaXMuc2luaylcbiAgaWYgKC0tdGhpcy5hY3RpdmVDb3VudCA9PT0gMCkge1xuICAgIHRoaXMuc2luay5lbmQodCwgaW5kZXhlZFZhbHVlLnZhbHVlKVxuICB9XG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBMaW5rZWRMaXN0IGZyb20gJy4uL0xpbmtlZExpc3QnXG5pbXBvcnQgeyBpZCBhcyBpZGVudGl0eSB9IGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUNvbmN1cnJlbnRseSAoY29uY3VycmVuY3ksIHN0cmVhbSkge1xuICByZXR1cm4gbWVyZ2VNYXBDb25jdXJyZW50bHkoaWRlbnRpdHksIGNvbmN1cnJlbmN5LCBzdHJlYW0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU1hcENvbmN1cnJlbnRseSAoZiwgY29uY3VycmVuY3ksIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgTWVyZ2VDb25jdXJyZW50bHkoZiwgY29uY3VycmVuY3ksIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBNZXJnZUNvbmN1cnJlbnRseSAoZiwgY29uY3VycmVuY3ksIHNvdXJjZSkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuY29uY3VycmVuY3kgPSBjb25jdXJyZW5jeVxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5NZXJnZUNvbmN1cnJlbnRseS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IE91dGVyKHRoaXMuZiwgdGhpcy5jb25jdXJyZW5jeSwgdGhpcy5zb3VyY2UsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gT3V0ZXIgKGYsIGNvbmN1cnJlbmN5LCBzb3VyY2UsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuY29uY3VycmVuY3kgPSBjb25jdXJyZW5jeVxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMucGVuZGluZyA9IFtdXG4gIHRoaXMuY3VycmVudCA9IG5ldyBMaW5rZWRMaXN0KClcbiAgdGhpcy5kaXNwb3NhYmxlID0gZGlzcG9zZS5vbmNlKHNvdXJjZS5ydW4odGhpcywgc2NoZWR1bGVyKSlcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG59XG5cbk91dGVyLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuX2FkZElubmVyKHQsIHgpXG59XG5cbk91dGVyLnByb3RvdHlwZS5fYWRkSW5uZXIgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodGhpcy5jdXJyZW50Lmxlbmd0aCA8IHRoaXMuY29uY3VycmVuY3kpIHtcbiAgICB0aGlzLl9zdGFydElubmVyKHQsIHgpXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wZW5kaW5nLnB1c2goeClcbiAgfVxufVxuXG5PdXRlci5wcm90b3R5cGUuX3N0YXJ0SW5uZXIgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0cnkge1xuICAgIHRoaXMuX2luaXRJbm5lcih0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5lcnJvcih0LCBlKVxuICB9XG59XG5cbk91dGVyLnByb3RvdHlwZS5faW5pdElubmVyID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIGlubmVyU2luayA9IG5ldyBJbm5lcih0LCB0aGlzLCB0aGlzLnNpbmspXG4gIGlubmVyU2luay5kaXNwb3NhYmxlID0gbWFwQW5kUnVuKHRoaXMuZiwgeCwgaW5uZXJTaW5rLCB0aGlzLnNjaGVkdWxlcilcbiAgdGhpcy5jdXJyZW50LmFkZChpbm5lclNpbmspXG59XG5cbmZ1bmN0aW9uIG1hcEFuZFJ1biAoZiwgeCwgc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBmKHgpLnNvdXJjZS5ydW4oc2luaywgc2NoZWR1bGVyKVxufVxuXG5PdXRlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICBkaXNwb3NlLnRyeURpc3Bvc2UodCwgdGhpcy5kaXNwb3NhYmxlLCB0aGlzLnNpbmspXG4gIHRoaXMuX2NoZWNrRW5kKHQsIHgpXG59XG5cbk91dGVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cbk91dGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHRoaXMucGVuZGluZy5sZW5ndGggPSAwXG4gIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKSwgdGhpcy5jdXJyZW50LmRpc3Bvc2UoKV0pXG59XG5cbk91dGVyLnByb3RvdHlwZS5fZW5kSW5uZXIgPSBmdW5jdGlvbiAodCwgeCwgaW5uZXIpIHtcbiAgdGhpcy5jdXJyZW50LnJlbW92ZShpbm5lcilcbiAgZGlzcG9zZS50cnlEaXNwb3NlKHQsIGlubmVyLCB0aGlzKVxuXG4gIGlmICh0aGlzLnBlbmRpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fY2hlY2tFbmQodCwgeClcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9zdGFydElubmVyKHQsIHRoaXMucGVuZGluZy5zaGlmdCgpKVxuICB9XG59XG5cbk91dGVyLnByb3RvdHlwZS5fY2hlY2tFbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlICYmIHRoaXMuY3VycmVudC5pc0VtcHR5KCkpIHtcbiAgICB0aGlzLnNpbmsuZW5kKHQsIHgpXG4gIH1cbn1cblxuZnVuY3Rpb24gSW5uZXIgKHRpbWUsIG91dGVyLCBzaW5rKSB7XG4gIHRoaXMucHJldiA9IHRoaXMubmV4dCA9IG51bGxcbiAgdGhpcy50aW1lID0gdGltZVxuICB0aGlzLm91dGVyID0gb3V0ZXJcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmRpc3Bvc2FibGUgPSB2b2lkIDBcbn1cblxuSW5uZXIucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy5zaW5rLmV2ZW50KE1hdGgubWF4KHQsIHRoaXMudGltZSksIHgpXG59XG5cbklubmVyLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLm91dGVyLl9lbmRJbm5lcihNYXRoLm1heCh0LCB0aGlzLnRpbWUpLCB4LCB0aGlzKVxufVxuXG5Jbm5lci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLm91dGVyLmVycm9yKE1hdGgubWF4KHQsIHRoaXMudGltZSksIGUpXG59XG5cbklubmVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IHdpdGhEZWZhdWx0U2NoZWR1bGVyIGFzIHJ1biB9IGZyb20gJy4uL3J1blNvdXJjZSdcbmltcG9ydCB7IHRhcCB9IGZyb20gJy4vdHJhbnNmb3JtJ1xuXG4vKipcbiAqIE9ic2VydmUgYWxsIHRoZSBldmVudCB2YWx1ZXMgaW4gdGhlIHN0cmVhbSBpbiB0aW1lIG9yZGVyLiBUaGVcbiAqIHByb3ZpZGVkIGZ1bmN0aW9uIGBmYCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBldmVudCB2YWx1ZVxuICogQHBhcmFtIHtmdW5jdGlvbih4OlQpOip9IGYgZnVuY3Rpb24gdG8gY2FsbCB3aXRoIGVhY2ggZXZlbnQgdmFsdWVcbiAqIEBwYXJhbSB7U3RyZWFtPFQ+fSBzdHJlYW0gc3RyZWFtIHRvIG9ic2VydmVcbiAqIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBmdWxmaWxscyBhZnRlciB0aGUgc3RyZWFtIGVuZHMgd2l0aG91dFxuICogIGFuIGVycm9yLCBvciByZWplY3RzIGlmIHRoZSBzdHJlYW0gZW5kcyB3aXRoIGFuIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZSAoZiwgc3RyZWFtKSB7XG4gIHJldHVybiBkcmFpbih0YXAoZiwgc3RyZWFtKSlcbn1cblxuLyoqXG4gKiBcIlJ1blwiIGEgc3RyZWFtIGJ5IGNyZWF0aW5nIGRlbWFuZCBhbmQgY29uc3VtaW5nIGFsbCBldmVudHNcbiAqIEBwYXJhbSB7U3RyZWFtPFQ+fSBzdHJlYW0gc3RyZWFtIHRvIGRyYWluXG4gKiBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgYWZ0ZXIgdGhlIHN0cmVhbSBlbmRzIHdpdGhvdXRcbiAqICBhbiBlcnJvciwgb3IgcmVqZWN0cyBpZiB0aGUgc3RyZWFtIGVuZHMgd2l0aCBhbiBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYWluIChzdHJlYW0pIHtcbiAgcmV0dXJuIHJ1bihzdHJlYW0uc291cmNlKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IGZhdGFsIGZyb20gJy4uL2ZhdGFsRXJyb3InXG5pbXBvcnQgeyBvZiBhcyBqdXN0IH0gZnJvbSAnLi4vc291cmNlL2NvcmUnXG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyZWFtIGNvbnRhaW5pbmcgb25seSB0aGUgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gKiB2YWx1ZSBhdCB0aGUgdGltZSBpdCBmdWxmaWxscy5cbiAqIEBwYXJhbSB7UHJvbWlzZTxUPn0gcCBwcm9taXNlXG4gKiBAcmV0dXJuIHtTdHJlYW08VD59IHN0cmVhbSBjb250YWluaW5nIHByb21pc2UncyBmdWxmaWxsbWVudCB2YWx1ZS5cbiAqICBJZiB0aGUgcHJvbWlzZSByZWplY3RzLCB0aGUgc3RyZWFtIHdpbGwgZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qcm9taXNlIChwKSB7XG4gIHJldHVybiBhd2FpdFByb21pc2VzKGp1c3QocCkpXG59XG5cbi8qKlxuICogVHVybiBhIFN0cmVhbTxQcm9taXNlPFQ+PiBpbnRvIFN0cmVhbTxUPiBieSBhd2FpdGluZyBlYWNoIHByb21pc2UuXG4gKiBFdmVudCBvcmRlciBpcyBwcmVzZXJ2ZWQuXG4gKiBAcGFyYW0ge1N0cmVhbTxQcm9taXNlPFQ+Pn0gc3RyZWFtXG4gKiBAcmV0dXJuIHtTdHJlYW08VD59IHN0cmVhbSBvZiBmdWxmaWxsbWVudCB2YWx1ZXMuICBUaGUgc3RyZWFtIHdpbGxcbiAqIGVycm9yIGlmIGFueSBwcm9taXNlIHJlamVjdHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhd2FpdFByb21pc2VzIChzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEF3YWl0KHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBBd2FpdCAoc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkF3YWl0LnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IEF3YWl0U2luayhzaW5rLCBzY2hlZHVsZXIpLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIEF3YWl0U2luayAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5xdWV1ZSA9IFByb21pc2UucmVzb2x2ZSgpXG4gIHZhciBzZWxmID0gdGhpc1xuXG4gIC8vIFByZS1jcmVhdGUgY2xvc3VyZXMsIHRvIGF2b2lkIGNyZWF0aW5nIHRoZW0gcGVyIGV2ZW50XG4gIHRoaXMuX2V2ZW50Qm91bmQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHNlbGYuc2luay5ldmVudChzZWxmLnNjaGVkdWxlci5ub3coKSwgeClcbiAgfVxuXG4gIHRoaXMuX2VuZEJvdW5kID0gZnVuY3Rpb24gKHgpIHtcbiAgICBzZWxmLnNpbmsuZW5kKHNlbGYuc2NoZWR1bGVyLm5vdygpLCB4KVxuICB9XG5cbiAgdGhpcy5fZXJyb3JCb3VuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5zaW5rLmVycm9yKHNlbGYuc2NoZWR1bGVyLm5vdygpLCBlKVxuICB9XG59XG5cbkF3YWl0U2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgcHJvbWlzZSkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNlbGYuX2V2ZW50KHByb21pc2UpXG4gIH0pLmNhdGNoKHRoaXMuX2Vycm9yQm91bmQpXG59XG5cbkF3YWl0U2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZWxmLl9lbmQoeClcbiAgfSkuY2F0Y2godGhpcy5fZXJyb3JCb3VuZClcbn1cblxuQXdhaXRTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICAvLyBEb24ndCByZXNvbHZlIGVycm9yIHZhbHVlcywgcHJvcGFnYXRlIGRpcmVjdGx5XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZWxmLl9lcnJvckJvdW5kKGUpXG4gIH0pLmNhdGNoKGZhdGFsKVxufVxuXG5Bd2FpdFNpbmsucHJvdG90eXBlLl9ldmVudCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5fZXZlbnRCb3VuZClcbn1cblxuQXdhaXRTaW5rLnByb3RvdHlwZS5fZW5kID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh4KS50aGVuKHRoaXMuX2VuZEJvdW5kKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5pbXBvcnQgaW52b2tlIGZyb20gJy4uL2ludm9rZSdcblxuLyoqXG4gKiBXaGVuIGFuIGV2ZW50IGFycml2ZXMgb24gc2FtcGxlciwgZW1pdCB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgZiB3aXRoIHRoZSBsYXRlc3RcbiAqIHZhbHVlcyBvZiBhbGwgc3RyZWFtcyBiZWluZyBzYW1wbGVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLnZhbHVlcyk6Kn0gZiBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHNldCBvZiBzYW1wbGVkIHZhbHVlc1xuICogQHBhcmFtIHtTdHJlYW19IHNhbXBsZXIgc3RyZWFtcyB3aWxsIGJlIHNhbXBsZWQgd2hlbmV2ZXIgYW4gZXZlbnQgYXJyaXZlc1xuICogIG9uIHNhbXBsZXJcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBvZiBzYW1wbGVkIGFuZCB0cmFuc2Zvcm1lZCB2YWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZSAoZiwgc2FtcGxlciAvKiwgLi4uc3RyZWFtcyAqLykge1xuICByZXR1cm4gc2FtcGxlQXJyYXkoZiwgc2FtcGxlciwgYmFzZS5kcm9wKDIsIGFyZ3VtZW50cykpXG59XG5cbi8qKlxuICogV2hlbiBhbiBldmVudCBhcnJpdmVzIG9uIHNhbXBsZXIsIGVtaXQgdGhlIGxhdGVzdCBldmVudCB2YWx1ZSBmcm9tIHN0cmVhbS5cbiAqIEBwYXJhbSB7U3RyZWFtfSBzYW1wbGVyIHN0cmVhbSBvZiBldmVudHMgYXQgd2hvc2UgYXJyaXZhbCB0aW1lXG4gKiAgc3RyZWFtJ3MgbGF0ZXN0IHZhbHVlIHdpbGwgYmUgcHJvcGFnYXRlZFxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gb2YgdmFsdWVzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzYW1wbGVkIHN0cmVhbSBvZiB2YWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZVdpdGggKHNhbXBsZXIsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2FtcGxlcihiYXNlLmlkLCBzYW1wbGVyLnNvdXJjZSwgW3N0cmVhbS5zb3VyY2VdKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZUFycmF5IChmLCBzYW1wbGVyLCBzdHJlYW1zKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTYW1wbGVyKGYsIHNhbXBsZXIuc291cmNlLCBiYXNlLm1hcChnZXRTb3VyY2UsIHN0cmVhbXMpKSlcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlIChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5zb3VyY2Vcbn1cblxuZnVuY3Rpb24gU2FtcGxlciAoZiwgc2FtcGxlciwgc291cmNlcykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2FtcGxlciA9IHNhbXBsZXJcbiAgdGhpcy5zb3VyY2VzID0gc291cmNlc1xufVxuXG5TYW1wbGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBsID0gdGhpcy5zb3VyY2VzLmxlbmd0aFxuICB2YXIgZGlzcG9zYWJsZXMgPSBuZXcgQXJyYXkobCArIDEpXG4gIHZhciBzaW5rcyA9IG5ldyBBcnJheShsKVxuXG4gIHZhciBzYW1wbGVTaW5rID0gbmV3IFNhbXBsZVNpbmsodGhpcy5mLCBzaW5rcywgc2luaylcblxuICBmb3IgKHZhciBob2xkLCBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGhvbGQgPSBzaW5rc1tpXSA9IG5ldyBIb2xkKHNhbXBsZVNpbmspXG4gICAgZGlzcG9zYWJsZXNbaV0gPSB0aGlzLnNvdXJjZXNbaV0ucnVuKGhvbGQsIHNjaGVkdWxlcilcbiAgfVxuXG4gIGRpc3Bvc2FibGVzW2ldID0gdGhpcy5zYW1wbGVyLnJ1bihzYW1wbGVTaW5rLCBzY2hlZHVsZXIpXG5cbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKGRpc3Bvc2FibGVzKVxufVxuXG5mdW5jdGlvbiBIb2xkIChzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5oYXNWYWx1ZSA9IGZhbHNlXG59XG5cbkhvbGQucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy52YWx1ZSA9IHhcbiAgdGhpcy5oYXNWYWx1ZSA9IHRydWVcbiAgdGhpcy5zaW5rLl9ub3RpZnkodGhpcylcbn1cblxuSG9sZC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge31cbkhvbGQucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuZnVuY3Rpb24gU2FtcGxlU2luayAoZiwgc2lua3MsIHNpbmspIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmtzID0gc2lua3NcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG59XG5cblNhbXBsZVNpbmsucHJvdG90eXBlLl9ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuc2lua3MuZXZlcnkoaGFzVmFsdWUpXG4gIH1cbn1cblxuU2FtcGxlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgaW52b2tlKHRoaXMuZiwgYmFzZS5tYXAoZ2V0VmFsdWUsIHRoaXMuc2lua3MpKSlcbiAgfVxufVxuXG5TYW1wbGVTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblNhbXBsZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuZnVuY3Rpb24gaGFzVmFsdWUgKGhvbGQpIHtcbiAgcmV0dXJuIGhvbGQuaGFzVmFsdWVcbn1cblxuZnVuY3Rpb24gZ2V0VmFsdWUgKGhvbGQpIHtcbiAgcmV0dXJuIGhvbGQudmFsdWVcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi4vc291cmNlL2NvcmUnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBNYXAgZnJvbSAnLi4vZnVzaW9uL01hcCdcblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gblxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIG9ubHkgdXAgdG8gdGhlIGZpcnN0IG4gaXRlbXMgZnJvbSBzdHJlYW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRha2UgKG4sIHN0cmVhbSkge1xuICByZXR1cm4gc2xpY2UoMCwgbiwgc3RyZWFtKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBuXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdpdGggdGhlIGZpcnN0IG4gaXRlbXMgcmVtb3ZlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2tpcCAobiwgc3RyZWFtKSB7XG4gIHJldHVybiBzbGljZShuLCBJbmZpbml0eSwgc3RyZWFtKVxufVxuXG4vKipcbiAqIFNsaWNlIGEgc3RyZWFtIGJ5IGluZGV4LiBOZWdhdGl2ZSBzdGFydC9lbmQgaW5kZXhlcyBhcmUgbm90IHN1cHBvcnRlZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gKiBAcGFyYW0ge251bWJlcn0gZW5kXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyB3aGVyZSBzdGFydCA8PSBpbmRleCA8IGVuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQsIHN0cmVhbSkge1xuICByZXR1cm4gZW5kIDw9IHN0YXJ0ID8gY29yZS5lbXB0eSgpXG4gICAgOiBuZXcgU3RyZWFtKHNsaWNlU291cmNlKHN0YXJ0LCBlbmQsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBzbGljZVNvdXJjZSAoc3RhcnQsIGVuZCwgc291cmNlKSB7XG4gIHJldHVybiBzb3VyY2UgaW5zdGFuY2VvZiBNYXAgPyBjb21tdXRlTWFwU2xpY2Uoc3RhcnQsIGVuZCwgc291cmNlKVxuICAgIDogc291cmNlIGluc3RhbmNlb2YgU2xpY2UgPyBmdXNlU2xpY2Uoc3RhcnQsIGVuZCwgc291cmNlKVxuICAgIDogbmV3IFNsaWNlKHN0YXJ0LCBlbmQsIHNvdXJjZSlcbn1cblxuZnVuY3Rpb24gY29tbXV0ZU1hcFNsaWNlIChzdGFydCwgZW5kLCBzb3VyY2UpIHtcbiAgcmV0dXJuIE1hcC5jcmVhdGUoc291cmNlLmYsIHNsaWNlU291cmNlKHN0YXJ0LCBlbmQsIHNvdXJjZS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBmdXNlU2xpY2UgKHN0YXJ0LCBlbmQsIHNvdXJjZSkge1xuICBzdGFydCArPSBzb3VyY2UubWluXG4gIGVuZCA9IE1hdGgubWluKGVuZCArIHNvdXJjZS5taW4sIHNvdXJjZS5tYXgpXG4gIHJldHVybiBuZXcgU2xpY2Uoc3RhcnQsIGVuZCwgc291cmNlLnNvdXJjZSlcbn1cblxuZnVuY3Rpb24gU2xpY2UgKG1pbiwgbWF4LCBzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5taW4gPSBtaW5cbiAgdGhpcy5tYXggPSBtYXhcbn1cblxuU2xpY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGRpc3Bvc2FibGUgPSBkaXNwb3NlLnNldHRhYmxlKClcbiAgdmFyIHNsaWNlU2luayA9IG5ldyBTbGljZVNpbmsodGhpcy5taW4sIHRoaXMubWF4IC0gdGhpcy5taW4sIHNpbmssIGRpc3Bvc2FibGUpXG5cbiAgZGlzcG9zYWJsZS5zZXREaXNwb3NhYmxlKHRoaXMuc291cmNlLnJ1bihzbGljZVNpbmssIHNjaGVkdWxlcikpXG4gIHJldHVybiBkaXNwb3NhYmxlXG59XG5cbmZ1bmN0aW9uIFNsaWNlU2luayAoc2tpcCwgdGFrZSwgc2luaywgZGlzcG9zYWJsZSkge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2tpcCA9IHNraXBcbiAgdGhpcy50YWtlID0gdGFrZVxuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG59XG5cblNsaWNlU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5TbGljZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuU2xpY2VTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIC8qIGVzbGludCBjb21wbGV4aXR5OiBbMSwgNF0gKi9cbiAgaWYgKHRoaXMuc2tpcCA+IDApIHtcbiAgICB0aGlzLnNraXAgLT0gMVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMudGFrZSA9PT0gMCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy50YWtlIC09IDFcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIGlmICh0aGlzLnRha2UgPT09IDApIHtcbiAgICB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0YWtlV2hpbGUgKHAsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgVGFrZVdoaWxlKHAsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBUYWtlV2hpbGUgKHAsIHNvdXJjZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblRha2VXaGlsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgZGlzcG9zYWJsZSA9IGRpc3Bvc2Uuc2V0dGFibGUoKVxuICB2YXIgdGFrZVdoaWxlU2luayA9IG5ldyBUYWtlV2hpbGVTaW5rKHRoaXMucCwgc2luaywgZGlzcG9zYWJsZSlcblxuICBkaXNwb3NhYmxlLnNldERpc3Bvc2FibGUodGhpcy5zb3VyY2UucnVuKHRha2VXaGlsZVNpbmssIHNjaGVkdWxlcikpXG4gIHJldHVybiBkaXNwb3NhYmxlXG59XG5cbmZ1bmN0aW9uIFRha2VXaGlsZVNpbmsgKHAsIHNpbmssIGRpc3Bvc2FibGUpIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG59XG5cblRha2VXaGlsZVNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuVGFrZVdoaWxlU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5UYWtlV2hpbGVTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBwID0gdGhpcy5wXG4gIHRoaXMuYWN0aXZlID0gcCh4KVxuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgeClcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBza2lwV2hpbGUgKHAsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2tpcFdoaWxlKHAsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBTa2lwV2hpbGUgKHAsIHNvdXJjZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblNraXBXaGlsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBTa2lwV2hpbGVTaW5rKHRoaXMucCwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gU2tpcFdoaWxlU2luayAocCwgc2luaykge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5za2lwcGluZyA9IHRydWVcbn1cblxuU2tpcFdoaWxlU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5Ta2lwV2hpbGVTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cblNraXBXaGlsZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuc2tpcHBpbmcpIHtcbiAgICB2YXIgcCA9IHRoaXMucFxuICAgIHRoaXMuc2tpcHBpbmcgPSBwKHgpXG4gICAgaWYgKHRoaXMuc2tpcHBpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIHRoaXMuc2luay5ldmVudCh0LCB4KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2tpcEFmdGVyIChwLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFNraXBBZnRlcihwLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gU2tpcEFmdGVyIChwLCBzb3VyY2UpIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Ta2lwQWZ0ZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIHJ1biAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFNraXBBZnRlclNpbmsodGhpcy5wLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBTa2lwQWZ0ZXJTaW5rIChwLCBzaW5rKSB7XG4gIHRoaXMucCA9IHBcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNraXBwaW5nID0gZmFsc2Vcbn1cblxuU2tpcEFmdGVyU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiBldmVudCAodCwgeCkge1xuICBpZiAodGhpcy5za2lwcGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHAgPSB0aGlzLnBcbiAgdGhpcy5za2lwcGluZyA9IHAoeClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG5cbiAgaWYgKHRoaXMuc2tpcHBpbmcpIHtcbiAgICB0aGlzLnNpbmsuZW5kKHQsIHgpXG4gIH1cbn1cblxuU2tpcEFmdGVyU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5Ta2lwQWZ0ZXJTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcblxuLyoqXG4gKiBHaXZlbiBhIHN0cmVhbSBvZiBzdHJlYW1zLCByZXR1cm4gYSBuZXcgc3RyZWFtIHRoYXQgYWRvcHRzIHRoZSBiZWhhdmlvclxuICogb2YgdGhlIG1vc3QgcmVjZW50IGlubmVyIHN0cmVhbS5cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gb2Ygc3RyZWFtcyBvbiB3aGljaCB0byBzd2l0Y2hcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN3aXRjaGluZyBzdHJlYW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaExhdGVzdCAoc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTd2l0Y2goc3RyZWFtLnNvdXJjZSkpXG59XG5cbmV4cG9ydCB7IHN3aXRjaExhdGVzdCBhcyBzd2l0Y2ggfVxuXG5mdW5jdGlvbiBTd2l0Y2ggKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Td2l0Y2gucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIHN3aXRjaFNpbmsgPSBuZXcgU3dpdGNoU2luayhzaW5rLCBzY2hlZHVsZXIpXG4gIHJldHVybiBkaXNwb3NlLmFsbChbc3dpdGNoU2luaywgdGhpcy5zb3VyY2UucnVuKHN3aXRjaFNpbmssIHNjaGVkdWxlcildKVxufVxuXG5mdW5jdGlvbiBTd2l0Y2hTaW5rIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIHRoaXMuZW5kZWQgPSBmYWxzZVxufVxuXG5Td2l0Y2hTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCBzdHJlYW0pIHtcbiAgdGhpcy5fZGlzcG9zZUN1cnJlbnQodCkgLy8gVE9ETzogY2FwdHVyZSB0aGUgcmVzdWx0IG9mIHRoaXMgZGlzcG9zZVxuICB0aGlzLmN1cnJlbnQgPSBuZXcgU2VnbWVudCh0LCBJbmZpbml0eSwgdGhpcywgdGhpcy5zaW5rKVxuICB0aGlzLmN1cnJlbnQuZGlzcG9zYWJsZSA9IHN0cmVhbS5zb3VyY2UucnVuKHRoaXMuY3VycmVudCwgdGhpcy5zY2hlZHVsZXIpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuZW5kZWQgPSB0cnVlXG4gIHRoaXMuX2NoZWNrRW5kKHQsIHgpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5lbmRlZCA9IHRydWVcbiAgdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9kaXNwb3NlQ3VycmVudCh0aGlzLnNjaGVkdWxlci5ub3coKSlcbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuX2Rpc3Bvc2VDdXJyZW50ID0gZnVuY3Rpb24gKHQpIHtcbiAgaWYgKHRoaXMuY3VycmVudCAhPT0gbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQuX2Rpc3Bvc2UodClcbiAgfVxufVxuXG5Td2l0Y2hTaW5rLnByb3RvdHlwZS5fZGlzcG9zZUlubmVyID0gZnVuY3Rpb24gKHQsIGlubmVyKSB7XG4gIGlubmVyLl9kaXNwb3NlKHQpIC8vIFRPRE86IGNhcHR1cmUgdGhlIHJlc3VsdCBvZiB0aGlzIGRpc3Bvc2VcbiAgaWYgKGlubmVyID09PSB0aGlzLmN1cnJlbnQpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuX2NoZWNrRW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuZW5kZWQgJiYgdGhpcy5jdXJyZW50ID09PSBudWxsKSB7XG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLl9lbmRJbm5lciA9IGZ1bmN0aW9uICh0LCB4LCBpbm5lcikge1xuICB0aGlzLl9kaXNwb3NlSW5uZXIodCwgaW5uZXIpXG4gIHRoaXMuX2NoZWNrRW5kKHQsIHgpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLl9lcnJvcklubmVyID0gZnVuY3Rpb24gKHQsIGUsIGlubmVyKSB7XG4gIHRoaXMuX2Rpc3Bvc2VJbm5lcih0LCBpbm5lcilcbiAgdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIFNlZ21lbnQgKG1pbiwgbWF4LCBvdXRlciwgc2luaykge1xuICB0aGlzLm1pbiA9IG1pblxuICB0aGlzLm1heCA9IG1heFxuICB0aGlzLm91dGVyID0gb3V0ZXJcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NlLmVtcHR5KClcbn1cblxuU2VnbWVudC5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodCA8IHRoaXMubWF4KSB7XG4gICAgdGhpcy5zaW5rLmV2ZW50KE1hdGgubWF4KHQsIHRoaXMubWluKSwgeClcbiAgfVxufVxuXG5TZWdtZW50LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLm91dGVyLl9lbmRJbm5lcihNYXRoLm1heCh0LCB0aGlzLm1pbiksIHgsIHRoaXMpXG59XG5cblNlZ21lbnQucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5vdXRlci5fZXJyb3JJbm5lcihNYXRoLm1heCh0LCB0aGlzLm1pbiksIGUsIHRoaXMpXG59XG5cblNlZ21lbnQucHJvdG90eXBlLl9kaXNwb3NlID0gZnVuY3Rpb24gKHQpIHtcbiAgdGhpcy5tYXggPSB0XG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCB0aGlzLmRpc3Bvc2FibGUsIHRoaXMuc2luaylcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNyBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdGhydSAoZiwgc3RyZWFtKSB7XG4gIHJldHVybiBmKHN0cmVhbSlcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJy4uL2NvbWJpbmF0b3IvZmxhdE1hcCdcblxuZXhwb3J0IGZ1bmN0aW9uIHRha2VVbnRpbCAoc2lnbmFsLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFVudGlsKHNpZ25hbC5zb3VyY2UsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2tpcFVudGlsIChzaWduYWwsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2luY2Uoc2lnbmFsLnNvdXJjZSwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkdXJpbmcgKHRpbWVXaW5kb3csIHN0cmVhbSkge1xuICByZXR1cm4gdGFrZVVudGlsKGpvaW4odGltZVdpbmRvdyksIHNraXBVbnRpbCh0aW1lV2luZG93LCBzdHJlYW0pKVxufVxuXG5mdW5jdGlvbiBVbnRpbCAobWF4U2lnbmFsLCBzb3VyY2UpIHtcbiAgdGhpcy5tYXhTaWduYWwgPSBtYXhTaWduYWxcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuVW50aWwucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIG1pbiA9IG5ldyBCb3VuZCgtSW5maW5pdHksIHNpbmspXG4gIHZhciBtYXggPSBuZXcgVXBwZXJCb3VuZCh0aGlzLm1heFNpZ25hbCwgc2luaywgc2NoZWR1bGVyKVxuICB2YXIgZGlzcG9zYWJsZSA9IHRoaXMuc291cmNlLnJ1bihuZXcgVGltZVdpbmRvd1NpbmsobWluLCBtYXgsIHNpbmspLCBzY2hlZHVsZXIpXG5cbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKFttaW4sIG1heCwgZGlzcG9zYWJsZV0pXG59XG5cbmZ1bmN0aW9uIFNpbmNlIChtaW5TaWduYWwsIHNvdXJjZSkge1xuICB0aGlzLm1pblNpZ25hbCA9IG1pblNpZ25hbFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5TaW5jZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbWluID0gbmV3IExvd2VyQm91bmQodGhpcy5taW5TaWduYWwsIHNpbmssIHNjaGVkdWxlcilcbiAgdmFyIG1heCA9IG5ldyBCb3VuZChJbmZpbml0eSwgc2luaylcbiAgdmFyIGRpc3Bvc2FibGUgPSB0aGlzLnNvdXJjZS5ydW4obmV3IFRpbWVXaW5kb3dTaW5rKG1pbiwgbWF4LCBzaW5rKSwgc2NoZWR1bGVyKVxuXG4gIHJldHVybiBkaXNwb3NlLmFsbChbbWluLCBtYXgsIGRpc3Bvc2FibGVdKVxufVxuXG5mdW5jdGlvbiBCb3VuZCAodmFsdWUsIHNpbmspIHtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuQm91bmQucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcbkJvdW5kLnByb3RvdHlwZS5ldmVudCA9IG5vb3BcbkJvdW5kLnByb3RvdHlwZS5lbmQgPSBub29wXG5Cb3VuZC5wcm90b3R5cGUuZGlzcG9zZSA9IG5vb3BcblxuZnVuY3Rpb24gVGltZVdpbmRvd1NpbmsgKG1pbiwgbWF4LCBzaW5rKSB7XG4gIHRoaXMubWluID0gbWluXG4gIHRoaXMubWF4ID0gbWF4XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuVGltZVdpbmRvd1NpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHQgPj0gdGhpcy5taW4udmFsdWUgJiYgdCA8IHRoaXMubWF4LnZhbHVlKSB7XG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIH1cbn1cblxuVGltZVdpbmRvd1NpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblRpbWVXaW5kb3dTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblxuZnVuY3Rpb24gTG93ZXJCb3VuZCAoc2lnbmFsLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy52YWx1ZSA9IEluZmluaXR5XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5kaXNwb3NhYmxlID0gc2lnbmFsLnJ1bih0aGlzLCBzY2hlZHVsZXIpXG59XG5cbkxvd2VyQm91bmQucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQgLyosIHggKi8pIHtcbiAgaWYgKHQgPCB0aGlzLnZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRcbiAgfVxufVxuXG5Mb3dlckJvdW5kLnByb3RvdHlwZS5lbmQgPSBub29wXG5Mb3dlckJvdW5kLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbkxvd2VyQm91bmQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG59XG5cbmZ1bmN0aW9uIFVwcGVyQm91bmQgKHNpZ25hbCwgc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMudmFsdWUgPSBJbmZpbml0eVxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zYWJsZSA9IHNpZ25hbC5ydW4odGhpcywgc2NoZWR1bGVyKVxufVxuXG5VcHBlckJvdW5kLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICh0IDwgdGhpcy52YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB0XG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cblVwcGVyQm91bmQucHJvdG90eXBlLmVuZCA9IG5vb3BcblVwcGVyQm91bmQucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuVXBwZXJCb3VuZC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXN0YW1wIChzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFRpbWVzdGFtcChzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gVGltZXN0YW1wIChzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuVGltZXN0YW1wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFRpbWVzdGFtcFNpbmsoc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gVGltZXN0YW1wU2luayAoc2luaykge1xuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblRpbWVzdGFtcFNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuVGltZXN0YW1wU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5UaW1lc3RhbXBTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuc2luay5ldmVudCh0LCB7IHRpbWU6IHQsIHZhbHVlOiB4IH0pXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5cbi8qKlxuICogVHJhbnNmb3JtIGEgc3RyZWFtIGJ5IHBhc3NpbmcgaXRzIGV2ZW50cyB0aHJvdWdoIGEgdHJhbnNkdWNlci5cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSB0cmFuc2R1Y2VyIHRyYW5zZHVjZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSAge1N0cmVhbX0gc3RyZWFtIHN0cmVhbSB3aG9zZSBldmVudHMgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqICB0cmFuc2R1Y2VyXG4gKiBAcmV0dXJuIHtTdHJlYW19IHN0cmVhbSBvZiBldmVudHMgdHJhbnNmb3JtZWQgYnkgdGhlIHRyYW5zZHVjZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZHVjZSAodHJhbnNkdWNlciwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBUcmFuc2R1Y2UodHJhbnNkdWNlciwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFRyYW5zZHVjZSAodHJhbnNkdWNlciwgc291cmNlKSB7XG4gIHRoaXMudHJhbnNkdWNlciA9IHRyYW5zZHVjZXJcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuVHJhbnNkdWNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciB4ZiA9IHRoaXMudHJhbnNkdWNlcihuZXcgVHJhbnNmb3JtZXIoc2luaykpXG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFRyYW5zZHVjZVNpbmsoZ2V0VHhIYW5kbGVyKHhmKSwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gVHJhbnNkdWNlU2luayAoYWRhcHRlciwgc2luaykge1xuICB0aGlzLnhmID0gYWRhcHRlclxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblRyYW5zZHVjZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIG5leHQgPSB0aGlzLnhmLnN0ZXAodCwgeClcblxuICByZXR1cm4gdGhpcy54Zi5pc1JlZHVjZWQobmV4dClcbiAgICA/IHRoaXMuc2luay5lbmQodCwgdGhpcy54Zi5nZXRSZXN1bHQobmV4dCkpXG4gICAgOiBuZXh0XG59XG5cblRyYW5zZHVjZVNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHJldHVybiB0aGlzLnhmLnJlc3VsdCh4KVxufVxuXG5UcmFuc2R1Y2VTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHJldHVybiB0aGlzLnNpbmsuZXJyb3IodCwgZSlcbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtZXIgKHNpbmspIHtcbiAgdGhpcy50aW1lID0gLUluZmluaXR5XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gVHJhbnNmb3JtZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7fVxuXG5UcmFuc2Zvcm1lci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBUcmFuc2Zvcm1lci5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghaXNOYU4odCkpIHtcbiAgICB0aGlzLnRpbWUgPSBNYXRoLm1heCh0LCB0aGlzLnRpbWUpXG4gIH1cbiAgcmV0dXJuIHRoaXMuc2luay5ldmVudCh0aGlzLnRpbWUsIHgpXG59XG5cblRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gVHJhbnNmb3JtZXIucHJvdG90eXBlLnJlc3VsdCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB0aGlzLnNpbmsuZW5kKHRoaXMudGltZSwgeClcbn1cblxuLyoqXG4qIEdpdmVuIGFuIG9iamVjdCBzdXBwb3J0aW5nIHRoZSBuZXcgb3IgbGVnYWN5IHRyYW5zZHVjZXIgcHJvdG9jb2wsXG4qIGNyZWF0ZSBhbiBhZGFwdGVyIGZvciBpdC5cbiogQHBhcmFtIHtvYmplY3R9IHR4IHRyYW5zZm9ybVxuKiBAcmV0dXJucyB7VHhBZGFwdGVyfExlZ2FjeVR4QWRhcHRlcn1cbiovXG5mdW5jdGlvbiBnZXRUeEhhbmRsZXIgKHR4KSB7XG4gIHJldHVybiB0eXBlb2YgdHhbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPT09ICdmdW5jdGlvbidcbiAgICA/IG5ldyBUeEFkYXB0ZXIodHgpXG4gICAgOiBuZXcgTGVnYWN5VHhBZGFwdGVyKHR4KVxufVxuXG4vKipcbiogQWRhcHRlciBmb3IgbmV3IG9mZmljaWFsIHRyYW5zZHVjZXIgcHJvdG9jb2xcbiogQHBhcmFtIHtvYmplY3R9IHR4IHRyYW5zZm9ybVxuKiBAY29uc3RydWN0b3JcbiovXG5mdW5jdGlvbiBUeEFkYXB0ZXIgKHR4KSB7XG4gIHRoaXMudHggPSB0eFxufVxuXG5UeEFkYXB0ZXIucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAodCwgeCkge1xuICByZXR1cm4gdGhpcy50eFsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSh0LCB4KVxufVxuVHhBZGFwdGVyLnByb3RvdHlwZS5yZXN1bHQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gdGhpcy50eFsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHgpXG59XG5UeEFkYXB0ZXIucHJvdG90eXBlLmlzUmVkdWNlZCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgeFsnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXVxufVxuVHhBZGFwdGVyLnByb3RvdHlwZS5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4geFsnQEB0cmFuc2R1Y2VyL3ZhbHVlJ11cbn1cblxuLyoqXG4qIEFkYXB0ZXIgZm9yIG9sZGVyIHRyYW5zZHVjZXIgcHJvdG9jb2xcbiogQHBhcmFtIHtvYmplY3R9IHR4IHRyYW5zZm9ybVxuKiBAY29uc3RydWN0b3JcbiovXG5mdW5jdGlvbiBMZWdhY3lUeEFkYXB0ZXIgKHR4KSB7XG4gIHRoaXMudHggPSB0eFxufVxuXG5MZWdhY3lUeEFkYXB0ZXIucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAodCwgeCkge1xuICByZXR1cm4gdGhpcy50eC5zdGVwKHQsIHgpXG59XG5MZWdhY3lUeEFkYXB0ZXIucHJvdG90eXBlLnJlc3VsdCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB0aGlzLnR4LnJlc3VsdCh4KVxufVxuTGVnYWN5VHhBZGFwdGVyLnByb3RvdHlwZS5pc1JlZHVjZWQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHguX190cmFuc2R1Y2Vyc19yZWR1Y2VkX19cbn1cbkxlZ2FjeVR4QWRhcHRlci5wcm90b3R5cGUuZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHgudmFsdWVcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBNYXAgZnJvbSAnLi4vZnVzaW9uL01hcCdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcblxuLyoqXG4gKiBUcmFuc2Zvcm0gZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIGJ5IGFwcGx5aW5nIGYgdG8gZWFjaFxuICogQHBhcmFtIHtmdW5jdGlvbigqKToqfSBmIG1hcHBpbmcgZnVuY3Rpb25cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIG1hcFxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgdHJhbnNmb3JtZWQgYnkgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0oTWFwLmNyZWF0ZShmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuLyoqXG4qIFJlcGxhY2UgZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIHdpdGggeFxuKiBAcGFyYW0geyp9IHhcbiogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyByZXBsYWNlZCB3aXRoIHhcbiovXG5leHBvcnQgZnVuY3Rpb24gY29uc3RhbnQgKHgsIHN0cmVhbSkge1xuICByZXR1cm4gbWFwKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4geFxuICB9LCBzdHJlYW0pXG59XG5cbi8qKlxuKiBQZXJmb3JtIGEgc2lkZSBlZmZlY3QgZm9yIGVhY2ggaXRlbSBpbiB0aGUgc3RyZWFtXG4qIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKToqfSBmIHNpZGUgZWZmZWN0IHRvIGV4ZWN1dGUgZm9yIGVhY2ggaXRlbS4gVGhlXG4qICByZXR1cm4gdmFsdWUgd2lsbCBiZSBkaXNjYXJkZWQuXG4qIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIHRhcFxuKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNhbWUgaXRlbXMgYXMgdGhpcyBzdHJlYW1cbiovXG5leHBvcnQgZnVuY3Rpb24gdGFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFRhcChmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gVGFwIChmLCBzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5mID0gZlxufVxuXG5UYXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgVGFwU2luayh0aGlzLmYsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFRhcFNpbmsgKGYsIHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmYgPSBmXG59XG5cblRhcFNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuVGFwU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5UYXBTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBmID0gdGhpcy5mXG4gIGYoeClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nXG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4uL3NvdXJjZS9jb3JlJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0IEluZGV4U2luayBmcm9tICcuLi9zaW5rL0luZGV4U2luaydcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuaW1wb3J0IGludm9rZSBmcm9tICcuLi9pbnZva2UnXG5pbXBvcnQgUXVldWUgZnJvbSAnLi4vUXVldWUnXG5cbnZhciBtYXAgPSBiYXNlLm1hcFxudmFyIHRhaWwgPSBiYXNlLnRhaWxcblxuLyoqXG4gKiBDb21iaW5lIHN0cmVhbXMgcGFpcndpc2UgKG9yIHR1cGxlLXdpc2UpIGJ5IGluZGV4IGJ5IGFwcGx5aW5nIGYgdG8gdmFsdWVzXG4gKiBhdCBjb3JyZXNwb25kaW5nIGluZGljZXMuICBUaGUgcmV0dXJuZWQgc3RyZWFtIGVuZHMgd2hlbiBhbnkgb2YgdGhlIGlucHV0XG4gKiBzdHJlYW1zIGVuZHMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgdmFsdWVzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdpdGggaXRlbXMgYXQgY29ycmVzcG9uZGluZyBpbmRpY2VzIGNvbWJpbmVkXG4gKiAgdXNpbmcgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gemlwIChmIC8qLCAuLi5zdHJlYW1zICovKSB7XG4gIHJldHVybiB6aXBBcnJheShmLCB0YWlsKGFyZ3VtZW50cykpXG59XG5cbi8qKlxuKiBDb21iaW5lIHN0cmVhbXMgcGFpcndpc2UgKG9yIHR1cGxlLXdpc2UpIGJ5IGluZGV4IGJ5IGFwcGx5aW5nIGYgdG8gdmFsdWVzXG4qIGF0IGNvcnJlc3BvbmRpbmcgaW5kaWNlcy4gIFRoZSByZXR1cm5lZCBzdHJlYW0gZW5kcyB3aGVuIGFueSBvZiB0aGUgaW5wdXRcbiogc3RyZWFtcyBlbmRzLlxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgdmFsdWVzXG4qIEBwYXJhbSB7W1N0cmVhbV19IHN0cmVhbXMgc3RyZWFtcyB0byB6aXAgdXNpbmcgZlxuKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdpdGggaXRlbXMgYXQgY29ycmVzcG9uZGluZyBpbmRpY2VzIGNvbWJpbmVkXG4qICB1c2luZyBmXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHppcEFycmF5IChmLCBzdHJlYW1zKSB7XG4gIHJldHVybiBzdHJlYW1zLmxlbmd0aCA9PT0gMCA/IGNvcmUuZW1wdHkoKVxuOiBzdHJlYW1zLmxlbmd0aCA9PT0gMSA/IHRyYW5zZm9ybS5tYXAoZiwgc3RyZWFtc1swXSlcbjogbmV3IFN0cmVhbShuZXcgWmlwKGYsIG1hcChnZXRTb3VyY2UsIHN0cmVhbXMpKSlcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlIChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5zb3VyY2Vcbn1cblxuZnVuY3Rpb24gWmlwIChmLCBzb3VyY2VzKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zb3VyY2VzID0gc291cmNlc1xufVxuXG5aaXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGwgPSB0aGlzLnNvdXJjZXMubGVuZ3RoXG4gIHZhciBkaXNwb3NhYmxlcyA9IG5ldyBBcnJheShsKVxuICB2YXIgc2lua3MgPSBuZXcgQXJyYXkobClcbiAgdmFyIGJ1ZmZlcnMgPSBuZXcgQXJyYXkobClcblxuICB2YXIgemlwU2luayA9IG5ldyBaaXBTaW5rKHRoaXMuZiwgYnVmZmVycywgc2lua3MsIHNpbmspXG5cbiAgZm9yICh2YXIgaW5kZXhTaW5rLCBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGJ1ZmZlcnNbaV0gPSBuZXcgUXVldWUoKVxuICAgIGluZGV4U2luayA9IHNpbmtzW2ldID0gbmV3IEluZGV4U2luayhpLCB6aXBTaW5rKVxuICAgIGRpc3Bvc2FibGVzW2ldID0gdGhpcy5zb3VyY2VzW2ldLnJ1bihpbmRleFNpbmssIHNjaGVkdWxlcilcbiAgfVxuXG4gIHJldHVybiBkaXNwb3NlLmFsbChkaXNwb3NhYmxlcylcbn1cblxuZnVuY3Rpb24gWmlwU2luayAoZiwgYnVmZmVycywgc2lua3MsIHNpbmspIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmtzID0gc2lua3NcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmJ1ZmZlcnMgPSBidWZmZXJzXG59XG5cblppcFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIGluZGV4ZWRWYWx1ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnNcbiAgdmFyIGJ1ZmZlciA9IGJ1ZmZlcnNbaW5kZXhlZFZhbHVlLmluZGV4XVxuXG4gIGJ1ZmZlci5wdXNoKGluZGV4ZWRWYWx1ZS52YWx1ZSlcblxuICBpZiAoYnVmZmVyLmxlbmd0aCgpID09PSAxKSB7XG4gICAgaWYgKCFyZWFkeSh0aGlzLmJ1ZmZlcnMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBlbWl0WmlwcGVkKHRoaXMuZiwgdCwgYnVmZmVycywgdGhpcy5zaW5rKVxuXG4gICAgaWYgKGVuZGVkKHRoaXMuYnVmZmVycywgdGhpcy5zaW5rcykpIHtcbiAgICAgIHRoaXMuc2luay5lbmQodCwgdm9pZCAwKVxuICAgIH1cbiAgfVxufVxuXG5aaXBTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgaW5kZXhlZFZhbHVlKSB7XG4gIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcnNbaW5kZXhlZFZhbHVlLmluZGV4XVxuICBpZiAoYnVmZmVyLmlzRW1wdHkoKSkge1xuICAgIHRoaXMuc2luay5lbmQodCwgaW5kZXhlZFZhbHVlLnZhbHVlKVxuICB9XG59XG5cblppcFNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuZnVuY3Rpb24gZW1pdFppcHBlZCAoZiwgdCwgYnVmZmVycywgc2luaykge1xuICBzaW5rLmV2ZW50KHQsIGludm9rZShmLCBtYXAoaGVhZCwgYnVmZmVycykpKVxufVxuXG5mdW5jdGlvbiBoZWFkIChidWZmZXIpIHtcbiAgcmV0dXJuIGJ1ZmZlci5zaGlmdCgpXG59XG5cbmZ1bmN0aW9uIGVuZGVkIChidWZmZXJzLCBzaW5rcykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGJ1ZmZlcnNbaV0uaXNFbXB0eSgpICYmICFzaW5rc1tpXS5hY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiByZWFkeSAoYnVmZmVycykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGJ1ZmZlcnNbaV0uaXNFbXB0eSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBEaXNwb3NhYmxlIHdoaWNoIHdpbGwgZGlzcG9zZSBpdHMgdW5kZXJseWluZyByZXNvdXJjZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpc3Bvc2UgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kj99IGRhdGEgYW55IGRhdGEgdG8gYmUgcGFzc2VkIHRvIGRpc3Bvc2VyIGZ1bmN0aW9uXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGlzcG9zYWJsZSAoZGlzcG9zZSwgZGF0YSkge1xuICB0aGlzLl9kaXNwb3NlID0gZGlzcG9zZVxuICB0aGlzLl9kYXRhID0gZGF0YVxufVxuXG5EaXNwb3NhYmxlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fZGlzcG9zZSh0aGlzLl9kYXRhKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNldHRhYmxlRGlzcG9zYWJsZSAoKSB7XG4gIHRoaXMuZGlzcG9zYWJsZSA9IHZvaWQgMFxuICB0aGlzLmRpc3Bvc2VkID0gZmFsc2VcbiAgdGhpcy5fcmVzb2x2ZSA9IHZvaWQgMFxuXG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLnJlc3VsdCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgc2VsZi5fcmVzb2x2ZSA9IHJlc29sdmVcbiAgfSlcbn1cblxuU2V0dGFibGVEaXNwb3NhYmxlLnByb3RvdHlwZS5zZXREaXNwb3NhYmxlID0gZnVuY3Rpb24gKGRpc3Bvc2FibGUpIHtcbiAgaWYgKHRoaXMuZGlzcG9zYWJsZSAhPT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXREaXNwb3NhYmxlIGNhbGxlZCBtb3JlIHRoYW4gb25jZScpXG4gIH1cblxuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG5cbiAgaWYgKHRoaXMuZGlzcG9zZWQpIHtcbiAgICB0aGlzLl9yZXNvbHZlKGRpc3Bvc2FibGUuZGlzcG9zZSgpKVxuICB9XG59XG5cblNldHRhYmxlRGlzcG9zYWJsZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuZGlzcG9zZWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRcbiAgfVxuXG4gIHRoaXMuZGlzcG9zZWQgPSB0cnVlXG5cbiAgaWYgKHRoaXMuZGlzcG9zYWJsZSAhPT0gdm9pZCAwKSB7XG4gICAgdGhpcy5yZXN1bHQgPSB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG4gIH1cblxuICByZXR1cm4gdGhpcy5yZXN1bHRcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuaW1wb3J0IERpc3Bvc2FibGUgZnJvbSAnLi9EaXNwb3NhYmxlJ1xuaW1wb3J0IFNldHRhYmxlRGlzcG9zYWJsZSBmcm9tICcuL1NldHRhYmxlRGlzcG9zYWJsZSdcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4uL1Byb21pc2UnXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5cbnZhciBtYXAgPSBiYXNlLm1hcFxudmFyIGlkZW50aXR5ID0gYmFzZS5pZFxuXG4vKipcbiAqIENhbGwgZGlzcG9zYWJsZS5kaXNwb3NlLiAgSWYgaXQgcmV0dXJucyBhIHByb21pc2UsIGNhdGNoIHByb21pc2VcbiAqIGVycm9yIGFuZCBmb3J3YXJkIGl0IHRocm91Z2ggdGhlIHByb3ZpZGVkIHNpbmsuXG4gKiBAcGFyYW0ge251bWJlcn0gdCB0aW1lXG4gKiBAcGFyYW0ge3tkaXNwb3NlOiBmdW5jdGlvbn19IGRpc3Bvc2FibGVcbiAqIEBwYXJhbSB7e2Vycm9yOiBmdW5jdGlvbn19IHNpbmtcbiAqIEByZXR1cm4geyp9IHJlc3VsdCBvZiBkaXNwb3NhYmxlLmRpc3Bvc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyeURpc3Bvc2UgKHQsIGRpc3Bvc2FibGUsIHNpbmspIHtcbiAgdmFyIHJlc3VsdCA9IGRpc3Bvc2VTYWZlbHkoZGlzcG9zYWJsZSlcbiAgcmV0dXJuIGlzUHJvbWlzZShyZXN1bHQpXG4gICAgPyByZXN1bHQuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNpbmsuZXJyb3IodCwgZSlcbiAgICB9KVxuICAgIDogcmVzdWx0XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IERpc3Bvc2FibGUgd2hpY2ggd2lsbCBkaXNwb3NlIGl0cyB1bmRlcmx5aW5nIHJlc291cmNlXG4gKiBhdCBtb3N0IG9uY2UuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaXNwb3NlIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyo/fSBkYXRhIGFueSBkYXRhIHRvIGJlIHBhc3NlZCB0byBkaXNwb3NlciBmdW5jdGlvblxuICogQHJldHVybiB7RGlzcG9zYWJsZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSAoZGlzcG9zZSwgZGF0YSkge1xuICByZXR1cm4gb25jZShuZXcgRGlzcG9zYWJsZShkaXNwb3NlLCBkYXRhKSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBub29wIGRpc3Bvc2FibGUuIENhbiBiZSB1c2VkIHRvIHNhdGlzZnkgYSBEaXNwb3NhYmxlXG4gKiByZXF1aXJlbWVudCB3aGVuIG5vIGFjdHVhbCByZXNvdXJjZSBuZWVkcyB0byBiZSBkaXNwb3NlZC5cbiAqIEByZXR1cm4ge0Rpc3Bvc2FibGV8ZXhwb3J0c3xtb2R1bGUuZXhwb3J0c31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5ICgpIHtcbiAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKGlkZW50aXR5LCB2b2lkIDApXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGlzcG9zYWJsZSB0aGF0IHdpbGwgZGlzcG9zZSBhbGwgaW5wdXQgZGlzcG9zYWJsZXMgaW4gcGFyYWxsZWwuXG4gKiBAcGFyYW0ge0FycmF5PERpc3Bvc2FibGU+fSBkaXNwb3NhYmxlc1xuICogQHJldHVybiB7RGlzcG9zYWJsZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFsbCAoZGlzcG9zYWJsZXMpIHtcbiAgcmV0dXJuIGNyZWF0ZShkaXNwb3NlQWxsLCBkaXNwb3NhYmxlcylcbn1cblxuZnVuY3Rpb24gZGlzcG9zZUFsbCAoZGlzcG9zYWJsZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKG1hcChkaXNwb3NlU2FmZWx5LCBkaXNwb3NhYmxlcykpXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VTYWZlbHkgKGRpc3Bvc2FibGUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGlzcG9zYWJsZS5kaXNwb3NlKClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKVxuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGlzcG9zYWJsZSBmcm9tIGEgcHJvbWlzZSBmb3IgYW5vdGhlciBkaXNwb3NhYmxlXG4gKiBAcGFyYW0ge1Byb21pc2U8RGlzcG9zYWJsZT59IGRpc3Bvc2FibGVQcm9taXNlXG4gKiBAcmV0dXJuIHtEaXNwb3NhYmxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvbWlzZWQgKGRpc3Bvc2FibGVQcm9taXNlKSB7XG4gIHJldHVybiBjcmVhdGUoZGlzcG9zZVByb21pc2UsIGRpc3Bvc2FibGVQcm9taXNlKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlUHJvbWlzZSAoZGlzcG9zYWJsZVByb21pc2UpIHtcbiAgcmV0dXJuIGRpc3Bvc2FibGVQcm9taXNlLnRoZW4oZGlzcG9zZU9uZSlcbn1cblxuZnVuY3Rpb24gZGlzcG9zZU9uZSAoZGlzcG9zYWJsZSkge1xuICByZXR1cm4gZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkaXNwb3NhYmxlIHByb3h5IHRoYXQgYWxsb3dzIGl0cyB1bmRlcmx5aW5nIGRpc3Bvc2FibGUgdG9cbiAqIGJlIHNldCBsYXRlci5cbiAqIEByZXR1cm4ge1NldHRhYmxlRGlzcG9zYWJsZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHRhYmxlICgpIHtcbiAgcmV0dXJuIG5ldyBTZXR0YWJsZURpc3Bvc2FibGUoKVxufVxuXG4vKipcbiAqIFdyYXAgYW4gZXhpc3RpbmcgZGlzcG9zYWJsZSAod2hpY2ggbWF5IG5vdCBhbHJlYWR5IGhhdmUgYmVlbiBvbmNlKClkKVxuICogc28gdGhhdCBpdCB3aWxsIG9ubHkgZGlzcG9zZSBpdHMgdW5kZXJseWluZyByZXNvdXJjZSBhdCBtb3N0IG9uY2UuXG4gKiBAcGFyYW0ge3sgZGlzcG9zZTogZnVuY3Rpb24oKSB9fSBkaXNwb3NhYmxlXG4gKiBAcmV0dXJuIHtEaXNwb3NhYmxlfSB3cmFwcGVkIGRpc3Bvc2FibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uY2UgKGRpc3Bvc2FibGUpIHtcbiAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKGRpc3Bvc2VNZW1vaXplZCwgbWVtb2l6ZWQoZGlzcG9zYWJsZSkpXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VNZW1vaXplZCAobWVtb2l6ZWQpIHtcbiAgaWYgKCFtZW1vaXplZC5kaXNwb3NlZCkge1xuICAgIG1lbW9pemVkLmRpc3Bvc2VkID0gdHJ1ZVxuICAgIG1lbW9pemVkLnZhbHVlID0gZGlzcG9zZVNhZmVseShtZW1vaXplZC5kaXNwb3NhYmxlKVxuICAgIG1lbW9pemVkLmRpc3Bvc2FibGUgPSB2b2lkIDBcbiAgfVxuXG4gIHJldHVybiBtZW1vaXplZC52YWx1ZVxufVxuXG5mdW5jdGlvbiBtZW1vaXplZCAoZGlzcG9zYWJsZSkge1xuICByZXR1cm4geyBkaXNwb3NlZDogZmFsc2UsIGRpc3Bvc2FibGU6IGRpc3Bvc2FibGUsIHZhbHVlOiB2b2lkIDAgfVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhdGFsRXJyb3IgKGUpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgZVxuICB9LCAwKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRmlsdGVyIChwLCBzb3VyY2UpIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZpbHRlcmVkIHNvdXJjZSwgZnVzaW5nIGFkamFjZW50IGZpbHRlci5maWx0ZXIgaWYgcG9zc2libGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpib29sZWFufSBwIGZpbHRlcmluZyBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7e3J1bjpmdW5jdGlvbn19IHNvdXJjZSBzb3VyY2UgdG8gZmlsdGVyXG4gKiBAcmV0dXJucyB7RmlsdGVyfSBmaWx0ZXJlZCBzb3VyY2VcbiAqL1xuRmlsdGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZUZpbHRlciAocCwgc291cmNlKSB7XG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBGaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IEZpbHRlcihhbmQoc291cmNlLnAsIHApLCBzb3VyY2Uuc291cmNlKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBGaWx0ZXIocCwgc291cmNlKVxufVxuXG5GaWx0ZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgRmlsdGVyU2luayh0aGlzLnAsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIEZpbHRlclNpbmsgKHAsIHNpbmspIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cbkZpbHRlclNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuRmlsdGVyU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5GaWx0ZXJTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBwID0gdGhpcy5wXG4gIHAoeCkgJiYgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cbmZ1bmN0aW9uIGFuZCAocCwgcSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gcCh4KSAmJiBxKHgpXG4gIH1cbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbHRlck1hcCAocCwgZiwgc291cmNlKSB7XG4gIHRoaXMucCA9IHBcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5GaWx0ZXJNYXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgRmlsdGVyTWFwU2luayh0aGlzLnAsIHRoaXMuZiwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gRmlsdGVyTWFwU2luayAocCwgZiwgc2luaykge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5GaWx0ZXJNYXBTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBmID0gdGhpcy5mXG4gIHZhciBwID0gdGhpcy5wXG4gIHAoeCkgJiYgdGhpcy5zaW5rLmV2ZW50KHQsIGYoeCkpXG59XG5cbkZpbHRlck1hcFNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuRmlsdGVyTWFwU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9GaWx0ZXInXG5pbXBvcnQgRmlsdGVyTWFwIGZyb20gJy4vRmlsdGVyTWFwJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYXAgKGYsIHNvdXJjZSkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbWFwcGVkIHNvdXJjZSwgZnVzaW5nIGFkamFjZW50IG1hcC5tYXAsIGZpbHRlci5tYXAsXG4gKiBhbmQgZmlsdGVyLm1hcC5tYXAgaWYgcG9zc2libGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6Kn0gZiBtYXBwaW5nIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3tydW46ZnVuY3Rpb259fSBzb3VyY2Ugc291cmNlIHRvIG1hcFxuICogQHJldHVybnMge01hcHxGaWx0ZXJNYXB9IG1hcHBlZCBzb3VyY2UsIHBvc3NpYmx5IGZ1c2VkXG4gKi9cbk1hcC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVNYXAgKGYsIHNvdXJjZSkge1xuICBpZiAoc291cmNlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAoYmFzZS5jb21wb3NlKGYsIHNvdXJjZS5mKSwgc291cmNlLnNvdXJjZSlcbiAgfVxuXG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBGaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IEZpbHRlck1hcChzb3VyY2UucCwgZiwgc291cmNlLnNvdXJjZSlcbiAgfVxuXG4gIHJldHVybiBuZXcgTWFwKGYsIHNvdXJjZSlcbn1cblxuTWFwLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZVxuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBNYXBTaW5rKHRoaXMuZiwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gTWFwU2luayAoZiwgc2luaykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuTWFwU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5NYXBTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbk1hcFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIGYgPSB0aGlzLmZcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIGYoeCkpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuLyogZXNsaW50IGltcG9ydC9maXJzdDogMCAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4vU3RyZWFtJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuaW1wb3J0IHsgb2YsIGVtcHR5LCBuZXZlciB9IGZyb20gJy4vc291cmNlL2NvcmUnXG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi9zb3VyY2UvZnJvbSdcbmltcG9ydCB7IHBlcmlvZGljIH0gZnJvbSAnLi9zb3VyY2UvcGVyaW9kaWMnXG5pbXBvcnQgc3ltYm9sT2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSdcblxuLyoqXG4gKiBDb3JlIHN0cmVhbSB0eXBlXG4gKiBAdHlwZSB7U3RyZWFtfVxuICovXG5leHBvcnQgeyBTdHJlYW0gfVxuXG4vLyBBZGQgb2YgYW5kIGVtcHR5IHRvIGNvbnN0cnVjdG9yIGZvciBmYW50YXN5LWxhbmQgY29tcGF0XG5TdHJlYW0ub2YgPSBvZlxuU3RyZWFtLmVtcHR5ID0gZW1wdHlcbi8vIEFkZCBmcm9tIHRvIGNvbnN0cnVjdG9yIGZvciBFUyBPYnNlcnZhYmxlIGNvbXBhdFxuU3RyZWFtLmZyb20gPSBmcm9tXG5leHBvcnQgeyBvZiwgb2YgYXMganVzdCwgZW1wdHksIG5ldmVyLCBmcm9tLCBwZXJpb2RpYyB9XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBEcmFmdCBFUyBPYnNlcnZhYmxlIHByb3Bvc2FsIGludGVyb3Bcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcblxuaW1wb3J0IHsgc3Vic2NyaWJlIH0gZnJvbSAnLi9vYnNlcnZhYmxlL3N1YnNjcmliZSdcblxuU3RyZWFtLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICByZXR1cm4gc3Vic2NyaWJlKHN1YnNjcmliZXIsIHRoaXMpXG59XG5cblN0cmVhbS5wcm90b3R5cGVbc3ltYm9sT2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGbHVlbnQgYWRhcHRlclxuXG5pbXBvcnQgeyB0aHJ1IH0gZnJvbSAnLi9jb21iaW5hdG9yL3RocnUnXG5cbi8qKlxuICogQWRhcHQgYSBmdW5jdGlvbmFsIHN0cmVhbSB0cmFuc2Zvcm0gdG8gZmx1ZW50IHN0eWxlLlxuICogSXQgYXBwbGllcyBmIHRvIHRoZSB0aGlzIHN0cmVhbSBvYmplY3RcbiAqIEBwYXJhbSAge2Z1bmN0aW9uKHM6IFN0cmVhbSk6IFN0cmVhbX0gZiBmdW5jdGlvbiB0aGF0XG4gKiByZWNlaXZlcyB0aGUgc3RyZWFtIGl0c2VsZiBhbmQgbXVzdCByZXR1cm4gYSBuZXcgc3RyZWFtXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cblN0cmVhbS5wcm90b3R5cGUudGhydSA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiB0aHJ1KGYsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBBZGFwdGluZyBvdGhlciBzb3VyY2VzXG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyZWFtIG9mIGV2ZW50cyBmcm9tIHRoZSBzdXBwbGllZCBFdmVudFRhcmdldCBvciBFdmVudEVtaXR0ZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBldmVudCBuYW1lXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEV2ZW50RW1pdHRlcn0gc291cmNlIEV2ZW50VGFyZ2V0IG9yIEV2ZW50RW1pdHRlci4gVGhlIHNvdXJjZVxuICogIG11c3Qgc3VwcG9ydCBlaXRoZXIgYWRkRXZlbnRMaXN0ZW5lci9yZW1vdmVFdmVudExpc3RlbmVyICh3M2MgRXZlbnRUYXJnZXQ6XG4gKiAgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItRXZlbnRzL2V2ZW50cy5odG1sI0V2ZW50cy1FdmVudFRhcmdldCksXG4gKiAgb3IgYWRkTGlzdGVuZXIvcmVtb3ZlTGlzdGVuZXIgKG5vZGUgRXZlbnRFbWl0dGVyOiBodHRwOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwpXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gb2YgZXZlbnRzIG9mIHRoZSBzcGVjaWZpZWQgdHlwZSBmcm9tIHRoZSBzb3VyY2VcbiAqL1xuZXhwb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAnLi9zb3VyY2UvZnJvbUV2ZW50J1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT2JzZXJ2aW5nXG5cbmltcG9ydCB7IG9ic2VydmUsIGRyYWluIH0gZnJvbSAnLi9jb21iaW5hdG9yL29ic2VydmUnXG5cbmV4cG9ydCB7IG9ic2VydmUsIG9ic2VydmUgYXMgZm9yRWFjaCwgZHJhaW4gfVxuXG4vKipcbiAqIFByb2Nlc3MgYWxsIHRoZSBldmVudHMgaW4gdGhlIHN0cmVhbVxuICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdGhhdCBmdWxmaWxscyB3aGVuIHRoZSBzdHJlYW0gZW5kcywgb3IgcmVqZWN0c1xuICogIGlmIHRoZSBzdHJlYW0gZmFpbHMgd2l0aCBhbiB1bmhhbmRsZWQgZXJyb3IuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUub2JzZXJ2ZSA9IFN0cmVhbS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBvYnNlcnZlKGYsIHRoaXMpXG59XG5cbi8qKlxuICogQ29uc3VtZSBhbGwgZXZlbnRzIGluIHRoZSBzdHJlYW0sIHdpdGhvdXQgcHJvdmlkaW5nIGEgZnVuY3Rpb24gdG8gcHJvY2VzcyBlYWNoLlxuICogVGhpcyBjYXVzZXMgYSBzdHJlYW0gdG8gYmVjb21lIGFjdGl2ZSBhbmQgYmVnaW4gZW1pdHRpbmcgZXZlbnRzLCBhbmQgaXMgdXNlZnVsXG4gKiBpbiBjYXNlcyB3aGVyZSBhbGwgcHJvY2Vzc2luZyBoYXMgYmVlbiBzZXR1cCB1cHN0cmVhbSB2aWEgb3RoZXIgY29tYmluYXRvcnMsIGFuZFxuICogdGhlcmUgaXMgbm8gbmVlZCB0byBwcm9jZXNzIHRoZSB0ZXJtaW5hbCBldmVudHMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdoZW4gdGhlIHN0cmVhbSBlbmRzLCBvciByZWplY3RzXG4gKiAgaWYgdGhlIHN0cmVhbSBmYWlscyB3aXRoIGFuIHVuaGFuZGxlZCBlcnJvci5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5kcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRyYWluKHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IHsgbG9vcCB9IGZyb20gJy4vY29tYmluYXRvci9sb29wJ1xuXG5leHBvcnQgeyBsb29wIH1cblxuLyoqXG4gKiBHZW5lcmFsaXplZCBmZWVkYmFjayBsb29wLiBDYWxsIGEgc3RlcHBlciBmdW5jdGlvbiBmb3IgZWFjaCBldmVudC4gVGhlIHN0ZXBwZXJcbiAqIHdpbGwgYmUgY2FsbGVkIHdpdGggMiBwYXJhbXM6IHRoZSBjdXJyZW50IHNlZWQgYW5kIHRoZSBhbiBldmVudCB2YWx1ZS4gIEl0IG11c3RcbiAqIHJldHVybiBhIG5ldyB7IHNlZWQsIHZhbHVlIH0gcGFpci4gVGhlIGBzZWVkYCB3aWxsIGJlIGZlZCBiYWNrIGludG8gdGhlIG5leHRcbiAqIGludm9jYXRpb24gb2Ygc3RlcHBlciwgYW5kIHRoZSBgdmFsdWVgIHdpbGwgYmUgcHJvcGFnYXRlZCBhcyB0aGUgZXZlbnQgdmFsdWUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHNlZWQ6KiwgdmFsdWU6Kik6e3NlZWQ6KiwgdmFsdWU6Kn19IHN0ZXBwZXIgbG9vcCBzdGVwIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IHNlZWQgaW5pdGlhbCBzZWVkIHZhbHVlIHBhc3NlZCB0byBmaXJzdCBzdGVwcGVyIGNhbGxcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2hvc2UgdmFsdWVzIGFyZSB0aGUgYHZhbHVlYCBmaWVsZCBvZiB0aGUgb2JqZWN0c1xuICogcmV0dXJuZWQgYnkgdGhlIHN0ZXBwZXJcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKHN0ZXBwZXIsIHNlZWQpIHtcbiAgcmV0dXJuIGxvb3Aoc3RlcHBlciwgc2VlZCwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgeyBzY2FuLCByZWR1Y2UgfSBmcm9tICcuL2NvbWJpbmF0b3IvYWNjdW11bGF0ZSdcblxuZXhwb3J0IHsgc2NhbiwgcmVkdWNlIH1cblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gY29udGFpbmluZyBzdWNjZXNzaXZlIHJlZHVjZSByZXN1bHRzIG9mIGFwcGx5aW5nIGYgdG9cbiAqIHRoZSBwcmV2aW91cyByZWR1Y2UgcmVzdWx0IGFuZCB0aGUgY3VycmVudCBzdHJlYW0gaXRlbS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ocmVzdWx0OiosIHg6Kik6Kn0gZiByZWR1Y2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IGluaXRpYWwgaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIHN1Y2Nlc3NpdmUgcmVkdWNlIHJlc3VsdHNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gKGYsIGluaXRpYWwpIHtcbiAgcmV0dXJuIHNjYW4oZiwgaW5pdGlhbCwgdGhpcylcbn1cblxuLyoqXG4gKiBSZWR1Y2UgdGhlIHN0cmVhbSB0byBwcm9kdWNlIGEgc2luZ2xlIHJlc3VsdC4gIE5vdGUgdGhhdCByZWR1Y2luZyBhbiBpbmZpbml0ZVxuICogc3RyZWFtIHdpbGwgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IG5ldmVyIGZ1bGZpbGxzLCBidXQgdGhhdCBtYXkgcmVqZWN0IGlmIGFuIGVycm9yXG4gKiBvY2N1cnMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHJlc3VsdDoqLCB4OiopOip9IGYgcmVkdWNlciBmdW5jdGlvblxuICogQHBhcmFtIHsqfSBpbml0aWFsIG9wdGlvbmFsIGluaXRpYWwgdmFsdWVcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIGZvciB0aGUgZmlsZSByZXN1bHQgb2YgdGhlIHJlZHVjZVxuICovXG5TdHJlYW0ucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uIChmLCBpbml0aWFsKSB7XG4gIHJldHVybiByZWR1Y2UoZiwgaW5pdGlhbCwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEJ1aWxkaW5nIGFuZCBleHRlbmRpbmdcblxuZXhwb3J0IHsgdW5mb2xkIH0gZnJvbSAnLi9zb3VyY2UvdW5mb2xkJ1xuZXhwb3J0IHsgaXRlcmF0ZSB9IGZyb20gJy4vc291cmNlL2l0ZXJhdGUnXG5leHBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gJy4vc291cmNlL2dlbmVyYXRlJ1xuaW1wb3J0IHsgY29uY2F0LCBjb25zIGFzIHN0YXJ0V2l0aCB9IGZyb20gJy4vY29tYmluYXRvci9idWlsZCdcblxuZXhwb3J0IHsgY29uY2F0LCBzdGFydFdpdGggfVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyZWFtfSB0YWlsXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGl0ZW1zIGluIHRoaXMgZm9sbG93ZWQgYnlcbiAqICBhbGwgaXRlbXMgaW4gdGFpbFxuICovXG5TdHJlYW0ucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uICh0YWlsKSB7XG4gIHJldHVybiBjb25jYXQodGhpcywgdGFpbClcbn1cblxuLyoqXG4gKiBAcGFyYW0geyp9IHggdmFsdWUgdG8gcHJlcGVuZFxuICogQHJldHVybnMge1N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggeCBwcmVwZW5kZWRcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5zdGFydFdpdGggPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gc3RhcnRXaXRoKHgsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUcmFuc2Zvcm1pbmdcblxuaW1wb3J0IHsgbWFwLCBjb25zdGFudCwgdGFwIH0gZnJvbSAnLi9jb21iaW5hdG9yL3RyYW5zZm9ybSdcbmltcG9ydCB7IGFwIH0gZnJvbSAnLi9jb21iaW5hdG9yL2FwcGxpY2F0aXZlJ1xuXG5leHBvcnQgeyBtYXAsIGNvbnN0YW50LCB0YXAsIGFwIH1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIGJ5IGFwcGx5aW5nIGYgdG8gZWFjaFxuICogQHBhcmFtIHtmdW5jdGlvbigqKToqfSBmIG1hcHBpbmcgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIHRyYW5zZm9ybWVkIGJ5IGZcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gbWFwKGYsIHRoaXMpXG59XG5cbi8qKlxuICogQXNzdW1lIHRoaXMgc3RyZWFtIGNvbnRhaW5zIGZ1bmN0aW9ucywgYW5kIGFwcGx5IGVhY2ggZnVuY3Rpb24gdG8gZWFjaCBpdGVtXG4gKiBpbiB0aGUgcHJvdmlkZWQgc3RyZWFtLiAgVGhpcyBnZW5lcmF0ZXMsIGluIGVmZmVjdCwgYSBjcm9zcyBwcm9kdWN0LlxuICogQHBhcmFtIHtTdHJlYW19IHhzIHN0cmVhbSBvZiBpdGVtcyB0byB3aGljaFxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgaXRlbXNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5hcCA9IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gYXAodGhpcywgeHMpXG59XG5cbi8qKlxuICogUmVwbGFjZSBlYWNoIHZhbHVlIGluIHRoZSBzdHJlYW0gd2l0aCB4XG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIHJlcGxhY2VkIHdpdGggeFxuICovXG5TdHJlYW0ucHJvdG90eXBlLmNvbnN0YW50ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIGNvbnN0YW50KHgsIHRoaXMpXG59XG5cbi8qKlxuICogUGVyZm9ybSBhIHNpZGUgZWZmZWN0IGZvciBlYWNoIGl0ZW0gaW4gdGhlIHN0cmVhbVxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOip9IGYgc2lkZSBlZmZlY3QgdG8gZXhlY3V0ZSBmb3IgZWFjaCBpdGVtLiBUaGVcbiAqICByZXR1cm4gdmFsdWUgd2lsbCBiZSBkaXNjYXJkZWQuXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNhbWUgaXRlbXMgYXMgdGhpcyBzdHJlYW1cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gdGFwKGYsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUcmFuc2R1Y2VyIHN1cHBvcnRcblxuaW1wb3J0IHsgdHJhbnNkdWNlIH0gZnJvbSAnLi9jb21iaW5hdG9yL3RyYW5zZHVjZSdcblxuZXhwb3J0IHsgdHJhbnNkdWNlIH1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhpcyBzdHJlYW0gYnkgcGFzc2luZyBpdHMgZXZlbnRzIHRocm91Z2ggYSB0cmFuc2R1Y2VyLlxuICogQHBhcmFtICB7ZnVuY3Rpb259IHRyYW5zZHVjZXIgdHJhbnNkdWNlciBmdW5jdGlvblxuICogQHJldHVybiB7U3RyZWFtfSBzdHJlYW0gb2YgZXZlbnRzIHRyYW5zZm9ybWVkIGJ5IHRoZSB0cmFuc2R1Y2VyXG4gKi9cblN0cmVhbS5wcm90b3R5cGUudHJhbnNkdWNlID0gZnVuY3Rpb24gKHRyYW5zZHVjZXIpIHtcbiAgcmV0dXJuIHRyYW5zZHVjZSh0cmFuc2R1Y2VyLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRmxhdE1hcHBpbmdcblxuaW1wb3J0IHsgZmxhdE1hcCwgam9pbiB9IGZyb20gJy4vY29tYmluYXRvci9mbGF0TWFwJ1xuXG4vLyBAZGVwcmVjYXRlZCBmbGF0TWFwLCB1c2UgY2hhaW4gaW5zdGVhZFxuZXhwb3J0IHsgZmxhdE1hcCwgZmxhdE1hcCBhcyBjaGFpbiwgam9pbiB9XG5cbi8qKlxuICogTWFwIGVhY2ggdmFsdWUgaW4gdGhlIHN0cmVhbSB0byBhIG5ldyBzdHJlYW0sIGFuZCBtZXJnZSBpdCBpbnRvIHRoZVxuICogcmV0dXJuZWQgb3V0ZXIgc3RyZWFtLiBFdmVudCBhcnJpdmFsIHRpbWVzIGFyZSBwcmVzZXJ2ZWQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6U3RyZWFtfSBmIGNoYWluaW5nIGZ1bmN0aW9uLCBtdXN0IHJldHVybiBhIFN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgZnJvbSBlYWNoIHN0cmVhbSByZXR1cm5lZCBieSBmXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuY2hhaW4gPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gZmxhdE1hcChmLCB0aGlzKVxufVxuXG4vLyBAZGVwcmVjYXRlZCB1c2UgY2hhaW4gaW5zdGVhZFxuU3RyZWFtLnByb3RvdHlwZS5mbGF0TWFwID0gU3RyZWFtLnByb3RvdHlwZS5jaGFpblxuXG4gIC8qKlxuICogTW9uYWRpYyBqb2luLiBGbGF0dGVuIGEgU3RyZWFtPFN0cmVhbTxYPj4gdG8gU3RyZWFtPFg+IGJ5IG1lcmdpbmcgaW5uZXJcbiAqIHN0cmVhbXMgdG8gdGhlIG91dGVyLiBFdmVudCBhcnJpdmFsIHRpbWVzIGFyZSBwcmVzZXJ2ZWQuXG4gKiBAcmV0dXJucyB7U3RyZWFtPFg+fSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBvZiBhbGwgaW5uZXIgc3RyZWFtc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBqb2luKHRoaXMpXG59XG5cbmltcG9ydCB7IGNvbnRpbnVlV2l0aCB9IGZyb20gJy4vY29tYmluYXRvci9jb250aW51ZVdpdGgnXG5cbi8vIEBkZXByZWNhdGVkIGZsYXRNYXBFbmQsIHVzZSBjb250aW51ZVdpdGggaW5zdGVhZFxuZXhwb3J0IHsgY29udGludWVXaXRoLCBjb250aW51ZVdpdGggYXMgZmxhdE1hcEVuZCB9XG5cbi8qKlxuICogTWFwIHRoZSBlbmQgZXZlbnQgdG8gYSBuZXcgc3RyZWFtLCBhbmQgYmVnaW4gZW1pdHRpbmcgaXRzIHZhbHVlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpTdHJlYW19IGYgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgZW5kIGV2ZW50IHZhbHVlLFxuICogYW5kICptdXN0KiByZXR1cm4gYSBuZXcgU3RyZWFtIHRvIGNvbnRpbnVlIHdpdGguXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHRoYXQgZW1pdHMgYWxsIGV2ZW50cyBmcm9tIHRoZSBvcmlnaW5hbCBzdHJlYW0sXG4gKiBmb2xsb3dlZCBieSBhbGwgZXZlbnRzIGZyb20gdGhlIHN0cmVhbSByZXR1cm5lZCBieSBmLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLmNvbnRpbnVlV2l0aCA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBjb250aW51ZVdpdGgoZiwgdGhpcylcbn1cblxuLy8gQGRlcHJlY2F0ZWQgdXNlIGNvbnRpbnVlV2l0aCBpbnN0ZWFkXG5TdHJlYW0ucHJvdG90eXBlLmZsYXRNYXBFbmQgPSBTdHJlYW0ucHJvdG90eXBlLmNvbnRpbnVlV2l0aFxuXG5pbXBvcnQgeyBjb25jYXRNYXAgfSBmcm9tICcuL2NvbWJpbmF0b3IvY29uY2F0TWFwJ1xuXG5leHBvcnQgeyBjb25jYXRNYXAgfVxuXG5TdHJlYW0ucHJvdG90eXBlLmNvbmNhdE1hcCA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBjb25jYXRNYXAoZiwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENvbmN1cnJlbnQgbWVyZ2luZ1xuXG5pbXBvcnQgeyBtZXJnZUNvbmN1cnJlbnRseSB9IGZyb20gJy4vY29tYmluYXRvci9tZXJnZUNvbmN1cnJlbnRseSdcblxuZXhwb3J0IHsgbWVyZ2VDb25jdXJyZW50bHkgfVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBTdHJlYW08U3RyZWFtPFg+PiB0byBTdHJlYW08WD4gYnkgbWVyZ2luZyBpbm5lclxuICogc3RyZWFtcyB0byB0aGUgb3V0ZXIsIGxpbWl0aW5nIHRoZSBudW1iZXIgb2YgaW5uZXIgc3RyZWFtcyB0aGF0IG1heVxuICogYmUgYWN0aXZlIGNvbmN1cnJlbnRseS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb25jdXJyZW5jeSBhdCBtb3N0IHRoaXMgbWFueSBpbm5lciBzdHJlYW1zIHdpbGwgYmVcbiAqICBhbGxvd2VkIHRvIGJlIGFjdGl2ZSBjb25jdXJyZW50bHkuXG4gKiBAcmV0dXJuIHtTdHJlYW08WD59IG5ldyBzdHJlYW0gY29udGFpbmluZyBhbGwgZXZlbnRzIG9mIGFsbCBpbm5lclxuICogIHN0cmVhbXMsIHdpdGggbGltaXRlZCBjb25jdXJyZW5jeS5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5tZXJnZUNvbmN1cnJlbnRseSA9IGZ1bmN0aW9uIChjb25jdXJyZW5jeSkge1xuICByZXR1cm4gbWVyZ2VDb25jdXJyZW50bHkoY29uY3VycmVuY3ksIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBNZXJnaW5nXG5cbmltcG9ydCB7IG1lcmdlLCBtZXJnZUFycmF5IH0gZnJvbSAnLi9jb21iaW5hdG9yL21lcmdlJ1xuXG5leHBvcnQgeyBtZXJnZSwgbWVyZ2VBcnJheSB9XG5cbi8qKlxuICogTWVyZ2UgdGhpcyBzdHJlYW0gYW5kIGFsbCB0aGUgcHJvdmlkZWQgc3RyZWFtc1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgZnJvbSB0aGlzIHN0cmVhbSBhbmQgcyBpbiB0aW1lXG4gKiBvcmRlci4gIElmIHR3byBldmVudHMgYXJlIHNpbXVsdGFuZW91cyB0aGV5IHdpbGwgYmUgbWVyZ2VkIGluXG4gKiBhcmJpdHJhcnkgb3JkZXIuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbiAoLyogLi4uc3RyZWFtcyAqLykge1xuICByZXR1cm4gbWVyZ2VBcnJheShiYXNlLmNvbnModGhpcywgYXJndW1lbnRzKSlcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENvbWJpbmluZ1xuXG5pbXBvcnQgeyBjb21iaW5lLCBjb21iaW5lQXJyYXkgfSBmcm9tICcuL2NvbWJpbmF0b3IvY29tYmluZSdcblxuZXhwb3J0IHsgY29tYmluZSwgY29tYmluZUFycmF5IH1cblxuLyoqXG4gKiBDb21iaW5lIGxhdGVzdCBldmVudHMgZnJvbSBhbGwgaW5wdXQgc3RyZWFtc1xuICogQHBhcmFtIHtmdW5jdGlvbiguLi5ldmVudHMpOip9IGYgZnVuY3Rpb24gdG8gY29tYmluZSBtb3N0IHJlY2VudCBldmVudHNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgZiB0byB0aGUgbW9zdCByZWNlbnRcbiAqICBldmVudCBvZiBlYWNoIGlucHV0IHN0cmVhbSwgd2hlbmV2ZXIgYSBuZXcgZXZlbnQgYXJyaXZlcyBvbiBhbnkgc3RyZWFtLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLmNvbWJpbmUgPSBmdW5jdGlvbiAoZiAvKiwgLi4uc3RyZWFtcyAqLykge1xuICByZXR1cm4gY29tYmluZUFycmF5KGYsIGJhc2UucmVwbGFjZSh0aGlzLCAwLCBhcmd1bWVudHMpKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2FtcGxpbmdcblxuaW1wb3J0IHsgc2FtcGxlLCBzYW1wbGVBcnJheSwgc2FtcGxlV2l0aCB9IGZyb20gJy4vY29tYmluYXRvci9zYW1wbGUnXG5cbmV4cG9ydCB7IHNhbXBsZSwgc2FtcGxlQXJyYXksIHNhbXBsZVdpdGggfVxuXG4vKipcbiAqIFdoZW4gYW4gZXZlbnQgYXJyaXZlcyBvbiBzYW1wbGVyLCBlbWl0IHRoZSBsYXRlc3QgZXZlbnQgdmFsdWUgZnJvbSBzdHJlYW0uXG4gKiBAcGFyYW0ge1N0cmVhbX0gc2FtcGxlciBzdHJlYW0gb2YgZXZlbnRzIGF0IHdob3NlIGFycml2YWwgdGltZVxuICogIHNpZ25hbCdzIGxhdGVzdCB2YWx1ZSB3aWxsIGJlIHByb3BhZ2F0ZWRcbiAqIEByZXR1cm5zIHtTdHJlYW19IHNhbXBsZWQgc3RyZWFtIG9mIHZhbHVlc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNhbXBsZVdpdGggPSBmdW5jdGlvbiAoc2FtcGxlcikge1xuICByZXR1cm4gc2FtcGxlV2l0aChzYW1wbGVyLCB0aGlzKVxufVxuXG4vKipcbiAqIFdoZW4gYW4gZXZlbnQgYXJyaXZlcyBvbiB0aGlzIHN0cmVhbSwgZW1pdCB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgZiB3aXRoIHRoZSBsYXRlc3RcbiAqIHZhbHVlcyBvZiBhbGwgc3RyZWFtcyBiZWluZyBzYW1wbGVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLnZhbHVlcyk6Kn0gZiBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHNldCBvZiBzYW1wbGVkIHZhbHVlc1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIG9mIHNhbXBsZWQgYW5kIHRyYW5zZm9ybWVkIHZhbHVlc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNhbXBsZSA9IGZ1bmN0aW9uIChmIC8qIC4uLnN0cmVhbXMgKi8pIHtcbiAgcmV0dXJuIHNhbXBsZUFycmF5KGYsIHRoaXMsIGJhc2UudGFpbChhcmd1bWVudHMpKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gWmlwcGluZ1xuXG5pbXBvcnQgeyB6aXAsIHppcEFycmF5IH0gZnJvbSAnLi9jb21iaW5hdG9yL3ppcCdcblxuZXhwb3J0IHsgemlwLCB6aXBBcnJheSB9XG5cbi8qKlxuICogUGFpci13aXNlIGNvbWJpbmUgaXRlbXMgd2l0aCB0aG9zZSBpbiBzLiBHaXZlbiAyIHN0cmVhbXM6XG4gKiBbMSwyLDNdIHppcFdpdGggZiBbNCw1LDZdIC0+IFtmKDEsNCksZigyLDUpLGYoMyw2KV1cbiAqIE5vdGU6IHppcCBjYXVzZXMgZmFzdCBzdHJlYW1zIHRvIGJ1ZmZlciBhbmQgd2FpdCBmb3Igc2xvdyBzdHJlYW1zLlxuICogQHBhcmFtIHtmdW5jdGlvbihhOlN0cmVhbSwgYjpTdHJlYW0sIC4uLik6Kn0gZiBmdW5jdGlvbiB0byBjb21iaW5lIGl0ZW1zXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgcGFpcnNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS56aXAgPSBmdW5jdGlvbiAoZiAvKiwgLi4uc3RyZWFtcyAqLykge1xuICByZXR1cm4gemlwQXJyYXkoZiwgYmFzZS5yZXBsYWNlKHRoaXMsIDAsIGFyZ3VtZW50cykpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTd2l0Y2hpbmdcblxuaW1wb3J0IHsgc3dpdGNoTGF0ZXN0IH0gZnJvbSAnLi9jb21iaW5hdG9yL3N3aXRjaCdcblxuLy8gQGRlcHJlY2F0ZWQgc3dpdGNoLCB1c2Ugc3dpdGNoTGF0ZXN0IGluc3RlYWRcbmV4cG9ydCB7IHN3aXRjaExhdGVzdCwgc3dpdGNoTGF0ZXN0IGFzIHN3aXRjaCB9XG5cbi8qKlxuICogR2l2ZW4gYSBzdHJlYW0gb2Ygc3RyZWFtcywgcmV0dXJuIGEgbmV3IHN0cmVhbSB0aGF0IGFkb3B0cyB0aGUgYmVoYXZpb3JcbiAqIG9mIHRoZSBtb3N0IHJlY2VudCBpbm5lciBzdHJlYW0uXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzd2l0Y2hpbmcgc3RyZWFtXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc3dpdGNoTGF0ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gc3dpdGNoTGF0ZXN0KHRoaXMpXG59XG5cbi8vIEBkZXByZWNhdGVkIHVzZSBzd2l0Y2hMYXRlc3QgaW5zdGVhZFxuU3RyZWFtLnByb3RvdHlwZS5zd2l0Y2ggPSBTdHJlYW0ucHJvdG90eXBlLnN3aXRjaExhdGVzdFxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRmlsdGVyaW5nXG5cbmltcG9ydCB7IGZpbHRlciwgc2tpcFJlcGVhdHMsIHNraXBSZXBlYXRzV2l0aCB9IGZyb20gJy4vY29tYmluYXRvci9maWx0ZXInXG5cbi8vIEBkZXByZWNhdGVkIGRpc3RpbmN0LCB1c2Ugc2tpcFJlcGVhdHMgaW5zdGVhZFxuLy8gQGRlcHJlY2F0ZWQgZGlzdGluY3RCeSwgdXNlIHNraXBSZXBlYXRzV2l0aCBpbnN0ZWFkXG5leHBvcnQgeyBmaWx0ZXIsIHNraXBSZXBlYXRzLCBza2lwUmVwZWF0cyBhcyBkaXN0aW5jdCwgc2tpcFJlcGVhdHNXaXRoLCBza2lwUmVwZWF0c1dpdGggYXMgZGlzdGluY3RCeSB9XG5cbi8qKlxuICogUmV0YWluIG9ubHkgaXRlbXMgbWF0Y2hpbmcgYSBwcmVkaWNhdGVcbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAgICAgICAgICAtMTIzNDU2NzgtXG4gKiBmaWx0ZXIoeCA9PiB4ICUgMiA9PT0gMCwgc3RyZWFtKTogLS0yLTQtNi04LVxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOmJvb2xlYW59IHAgZmlsdGVyaW5nIHByZWRpY2F0ZSBjYWxsZWQgZm9yIGVhY2ggaXRlbVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgb25seSBpdGVtcyBmb3Igd2hpY2ggcHJlZGljYXRlIHJldHVybnMgdHJ1dGh5XG4gKi9cblN0cmVhbS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKHApIHtcbiAgcmV0dXJuIGZpbHRlcihwLCB0aGlzKVxufVxuXG4vKipcbiAqIFNraXAgcmVwZWF0ZWQgZXZlbnRzLCB1c2luZyA9PT0gdG8gY29tcGFyZSBpdGVtc1xuICogc3RyZWFtOiAgICAgICAgICAgLWFiYmNkLVxuICogZGlzdGluY3Qoc3RyZWFtKTogLWFiLWNkLVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIHdpdGggbm8gcmVwZWF0ZWQgZXZlbnRzXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2tpcFJlcGVhdHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBza2lwUmVwZWF0cyh0aGlzKVxufVxuXG4vKipcbiAqIFNraXAgcmVwZWF0ZWQgZXZlbnRzLCB1c2luZyBzdXBwbGllZCBlcXVhbHMgZnVuY3Rpb24gdG8gY29tcGFyZSBpdGVtc1xuICogQHBhcmFtIHtmdW5jdGlvbihhOiosIGI6Kik6Ym9vbGVhbn0gZXF1YWxzIGZ1bmN0aW9uIHRvIGNvbXBhcmUgaXRlbXNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSB3aXRoIG5vIHJlcGVhdGVkIGV2ZW50c1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNraXBSZXBlYXRzV2l0aCA9IGZ1bmN0aW9uIChlcXVhbHMpIHtcbiAgcmV0dXJuIHNraXBSZXBlYXRzV2l0aChlcXVhbHMsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTbGljaW5nXG5cbmltcG9ydCB7IHRha2UsIHNraXAsIHNsaWNlLCB0YWtlV2hpbGUsIHNraXBXaGlsZSwgc2tpcEFmdGVyIH0gZnJvbSAnLi9jb21iaW5hdG9yL3NsaWNlJ1xuXG5leHBvcnQgeyB0YWtlLCBza2lwLCBzbGljZSwgdGFrZVdoaWxlLCBza2lwV2hpbGUsIHNraXBBZnRlciB9XG5cbi8qKlxuICogc3RyZWFtOiAgICAgICAgICAtYWJjZC1cbiAqIHRha2UoMiwgc3RyZWFtKTogLWFifFxuICogQHBhcmFtIHtOdW1iZXJ9IG4gdGFrZSB1cCB0byB0aGlzIG1hbnkgZXZlbnRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBhdCBtb3N0IHRoZSBmaXJzdCBuIGl0ZW1zIGZyb20gdGhpcyBzdHJlYW1cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS50YWtlID0gZnVuY3Rpb24gKG4pIHtcbiAgcmV0dXJuIHRha2UobiwgdGhpcylcbn1cblxuLyoqXG4gKiBzdHJlYW06ICAgICAgICAgIC1hYmNkLT5cbiAqIHNraXAoMiwgc3RyZWFtKTogLS0tY2QtPlxuICogQHBhcmFtIHtOdW1iZXJ9IG4gc2tpcCB0aGlzIG1hbnkgZXZlbnRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gbm90IGNvbnRhaW5pbmcgdGhlIGZpcnN0IG4gZXZlbnRzXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIChuKSB7XG4gIHJldHVybiBza2lwKG4sIHRoaXMpXG59XG5cbi8qKlxuICogU2xpY2UgYSBzdHJlYW0gYnkgZXZlbnQgaW5kZXguIEVxdWl2YWxlbnQgdG8sIGJ1dCBtb3JlIGVmZmljaWVudCB0aGFuXG4gKiBzdHJlYW0udGFrZShlbmQpLnNraXAoc3RhcnQpO1xuICogTk9URTogTmVnYXRpdmUgc3RhcnQgYW5kIGVuZCBhcmUgbm90IHN1cHBvcnRlZFxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0IHNraXAgYWxsIGV2ZW50cyBiZWZvcmUgdGhlIHN0YXJ0IGluZGV4XG4gKiBAcGFyYW0ge051bWJlcn0gZW5kIGFsbG93IGFsbCBldmVudHMgZnJvbSB0aGUgc3RhcnQgaW5kZXggdG8gdGhlIGVuZCBpbmRleFxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgd2hlcmUgc3RhcnQgPD0gaW5kZXggPCBlbmRcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHJldHVybiBzbGljZShzdGFydCwgZW5kLCB0aGlzKVxufVxuXG4vKipcbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAgICAgICAtMTIzNDUxMjM0LT5cbiAqIHRha2VXaGlsZSh4ID0+IHggPCA1LCBzdHJlYW0pOiAtMTIzNHxcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpib29sZWFufSBwIHByZWRpY2F0ZVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgdXAgdG8sIGJ1dCBub3QgaW5jbHVkaW5nLCB0aGVcbiAqIGZpcnN0IGl0ZW0gZm9yIHdoaWNoIHAgcmV0dXJucyBmYWxzeS5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS50YWtlV2hpbGUgPSBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gdGFrZVdoaWxlKHAsIHRoaXMpXG59XG5cbi8qKlxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgICAgICAgIC0xMjM0NTEyMzQtPlxuICogc2tpcFdoaWxlKHggPT4geCA8IDUsIHN0cmVhbSk6IC0tLS0tNTEyMzQtPlxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOmJvb2xlYW59IHAgcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyBmb2xsb3dpbmcgKmFuZCBpbmNsdWRpbmcqIHRoZVxuICogZmlyc3QgaXRlbSBmb3Igd2hpY2ggcCByZXR1cm5zIGZhbHN5LlxuICovXG5TdHJlYW0ucHJvdG90eXBlLnNraXBXaGlsZSA9IGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBza2lwV2hpbGUocCwgdGhpcylcbn1cblxuLyoqXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgICAgICAgIC0xMjM0NTY3ODktPlxuICogc2tpcEFmdGVyKHggPT4geCA9PT0gNSwgc3RyZWFtKTotMTIzNDV8XG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6Ym9vbGVhbn0gcCBwcmVkaWNhdGVcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIHVwIHRvLCAqYW5kIGluY2x1ZGluZyosIHRoZVxuICogZmlyc3QgaXRlbSBmb3Igd2hpY2ggcCByZXR1cm5zIHRydXRoeS5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5za2lwQWZ0ZXIgPSBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gc2tpcEFmdGVyKHAsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUaW1lIHNsaWNpbmdcblxuaW1wb3J0IHsgdGFrZVVudGlsLCBza2lwVW50aWwsIGR1cmluZyB9IGZyb20gJy4vY29tYmluYXRvci90aW1lc2xpY2UnXG5cbi8vIEBkZXByZWNhdGVkIHRha2VVbnRpbCwgdXNlIHVudGlsIGluc3RlYWRcbi8vIEBkZXByZWNhdGVkIHNraXBVbnRpbCwgdXNlIHNpbmNlIGluc3RlYWRcbmV4cG9ydCB7IHRha2VVbnRpbCwgdGFrZVVudGlsIGFzIHVudGlsLCBza2lwVW50aWwsIHNraXBVbnRpbCBhcyBzaW5jZSwgZHVyaW5nIH1cblxuLyoqXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgICAtYS1iLWMtZC1lLWYtZy0+XG4gKiBzaWduYWw6ICAgICAgICAgICAgICAgICAgICAtLS0tLS0teFxuICogdGFrZVVudGlsKHNpZ25hbCwgc3RyZWFtKTogLWEtYi1jLXxcbiAqIEBwYXJhbSB7U3RyZWFtfSBzaWduYWwgcmV0YWluIG9ubHkgZXZlbnRzIGluIHN0cmVhbSBiZWZvcmUgdGhlIGZpcnN0XG4gKiBldmVudCBpbiBzaWduYWxcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBvbmx5IGV2ZW50cyB0aGF0IG9jY3VyIGJlZm9yZVxuICogdGhlIGZpcnN0IGV2ZW50IGluIHNpZ25hbC5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS51bnRpbCA9IGZ1bmN0aW9uIChzaWduYWwpIHtcbiAgcmV0dXJuIHRha2VVbnRpbChzaWduYWwsIHRoaXMpXG59XG5cbi8vIEBkZXByZWNhdGVkIHVzZSB1bnRpbCBpbnN0ZWFkXG5TdHJlYW0ucHJvdG90eXBlLnRha2VVbnRpbCA9IFN0cmVhbS5wcm90b3R5cGUudW50aWxcblxuICAvKipcbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAgIC1hLWItYy1kLWUtZi1nLT5cbiAqIHNpZ25hbDogICAgICAgICAgICAgICAgICAgIC0tLS0tLS14XG4gKiB0YWtlVW50aWwoc2lnbmFsLCBzdHJlYW0pOiAtLS0tLS0tZC1lLWYtZy0+XG4gKiBAcGFyYW0ge1N0cmVhbX0gc2lnbmFsIHJldGFpbiBvbmx5IGV2ZW50cyBpbiBzdHJlYW0gYXQgb3IgYWZ0ZXIgdGhlIGZpcnN0XG4gKiBldmVudCBpbiBzaWduYWxcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBvbmx5IGV2ZW50cyB0aGF0IG9jY3VyIGFmdGVyXG4gKiB0aGUgZmlyc3QgZXZlbnQgaW4gc2lnbmFsLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLnNpbmNlID0gZnVuY3Rpb24gKHNpZ25hbCkge1xuICByZXR1cm4gc2tpcFVudGlsKHNpZ25hbCwgdGhpcylcbn1cblxuLy8gQGRlcHJlY2F0ZWQgdXNlIHNpbmNlIGluc3RlYWRcblN0cmVhbS5wcm90b3R5cGUuc2tpcFVudGlsID0gU3RyZWFtLnByb3RvdHlwZS5zaW5jZVxuXG4gIC8qKlxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgICAgLWEtYi1jLWQtZS1mLWctPlxuICogdGltZVdpbmRvdzogICAgICAgICAgICAgICAgLS0tLS1zXG4gKiBzOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLS0tLXRcbiAqIHN0cmVhbS5kdXJpbmcodGltZVdpbmRvdyk6IC0tLS0tYy1kLWUtfFxuICogQHBhcmFtIHtTdHJlYW08U3RyZWFtPn0gdGltZVdpbmRvdyBhIHN0cmVhbSB3aG9zZSBmaXJzdCBldmVudCAocykgcmVwcmVzZW50c1xuICogIHRoZSB3aW5kb3cgc3RhcnQgdGltZS4gIFRoYXQgZXZlbnQgKHMpIGlzIGl0c2VsZiBhIHN0cmVhbSB3aG9zZSBmaXJzdCBldmVudCAodClcbiAqICByZXByZXNlbnRzIHRoZSB3aW5kb3cgZW5kIHRpbWVcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBvbmx5IGV2ZW50cyB3aXRoaW4gdGhlIHByb3ZpZGVkIHRpbWVzcGFuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuZHVyaW5nID0gZnVuY3Rpb24gKHRpbWVXaW5kb3cpIHtcbiAgcmV0dXJuIGR1cmluZyh0aW1lV2luZG93LCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRGVsYXlpbmdcblxuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuL2NvbWJpbmF0b3IvZGVsYXknXG5cbmV4cG9ydCB7IGRlbGF5IH1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlUaW1lIG1pbGxpc2Vjb25kcyB0byBkZWxheSBlYWNoIGl0ZW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyB0aGUgc2FtZSBpdGVtcywgYnV0IGRlbGF5ZWQgYnkgbXNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIChkZWxheVRpbWUpIHtcbiAgcmV0dXJuIGRlbGF5KGRlbGF5VGltZSwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEdldHRpbmcgZXZlbnQgdGltZXN0YW1wXG5cbmltcG9ydCB7IHRpbWVzdGFtcCB9IGZyb20gJy4vY29tYmluYXRvci90aW1lc3RhbXAnXG5leHBvcnQgeyB0aW1lc3RhbXAgfVxuXG4vKipcbiAqIEV4cG9zZSBldmVudCB0aW1lc3RhbXBzIGludG8gdGhlIHN0cmVhbS4gVHVybnMgYSBTdHJlYW08WD4gaW50b1xuICogU3RyZWFtPHt0aW1lOnQsIHZhbHVlOlh9PlxuICogQHJldHVybnMge1N0cmVhbTx7dGltZTpudW1iZXIsIHZhbHVlOip9Pn1cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS50aW1lc3RhbXAgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aW1lc3RhbXAodGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJhdGUgbGltaXRpbmdcblxuaW1wb3J0IHsgdGhyb3R0bGUsIGRlYm91bmNlIH0gZnJvbSAnLi9jb21iaW5hdG9yL2xpbWl0J1xuXG5leHBvcnQgeyB0aHJvdHRsZSwgZGVib3VuY2UgfVxuXG4vKipcbiAqIExpbWl0IHRoZSByYXRlIG9mIGV2ZW50c1xuICogc3RyZWFtOiAgICAgICAgICAgICAgYWJjZC0tLS1hYmNkLS0tLVxuICogdGhyb3R0bGUoMiwgc3RyZWFtKTogYS1jLS0tLS1hLWMtLS0tLVxuICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZCB0aW1lIHRvIHN1cHByZXNzIGV2ZW50c1xuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB0aGF0IHNraXBzIGV2ZW50cyBmb3IgdGhyb3R0bGUgcGVyaW9kXG4gKi9cblN0cmVhbS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbiAocGVyaW9kKSB7XG4gIHJldHVybiB0aHJvdHRsZShwZXJpb2QsIHRoaXMpXG59XG5cbi8qKlxuICogV2FpdCBmb3IgYSBidXJzdCBvZiBldmVudHMgdG8gc3Vic2lkZSBhbmQgZW1pdCBvbmx5IHRoZSBsYXN0IGV2ZW50IGluIHRoZSBidXJzdFxuICogc3RyZWFtOiAgICAgICAgICAgICAgYWJjZC0tLS1hYmNkLS0tLVxuICogZGVib3VuY2UoMiwgc3RyZWFtKTogLS0tLS1kLS0tLS0tLWQtLVxuICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZCBldmVudHMgb2NjdXJpbmcgbW9yZSBmcmVxdWVudGx5IHRoYW4gdGhpc1xuICogIG9uIHRoZSBwcm92aWRlZCBzY2hlZHVsZXIgd2lsbCBiZSBzdXBwcmVzc2VkXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgZGVib3VuY2VkIHN0cmVhbVxuICovXG5TdHJlYW0ucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24gKHBlcmlvZCkge1xuICByZXR1cm4gZGVib3VuY2UocGVyaW9kLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQXdhaXRpbmcgUHJvbWlzZXNcblxuaW1wb3J0IHsgZnJvbVByb21pc2UsIGF3YWl0UHJvbWlzZXMgfSBmcm9tICcuL2NvbWJpbmF0b3IvcHJvbWlzZXMnXG5cbi8vIEBkZXByZWNhdGVkIGF3YWl0LCB1c2UgYXdhaXRQcm9taXNlcyBpbnN0ZWFkXG5leHBvcnQgeyBmcm9tUHJvbWlzZSwgYXdhaXRQcm9taXNlcywgYXdhaXRQcm9taXNlcyBhcyBhd2FpdCB9XG5cbi8qKlxuICogQXdhaXQgcHJvbWlzZXMsIHR1cm5pbmcgYSBTdHJlYW08UHJvbWlzZTxYPj4gaW50byBTdHJlYW08WD4uICBQcmVzZXJ2ZXNcbiAqIGV2ZW50IG9yZGVyLCBidXQgdGltZXNoaWZ0cyBldmVudHMgYmFzZWQgb24gcHJvbWlzZSByZXNvbHV0aW9uIHRpbWUuXG4gKiBAcmV0dXJucyB7U3RyZWFtPFg+fSBzdHJlYW0gY29udGFpbmluZyBub24tcHJvbWlzZSB2YWx1ZXNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5hd2FpdFByb21pc2VzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXRQcm9taXNlcyh0aGlzKVxufVxuXG4vLyBAZGVwcmVjYXRlZCB1c2UgYXdhaXRQcm9taXNlcyBpbnN0ZWFkXG5TdHJlYW0ucHJvdG90eXBlLmF3YWl0ID0gU3RyZWFtLnByb3RvdHlwZS5hd2FpdFByb21pc2VzXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFcnJvciBoYW5kbGluZ1xuXG5pbXBvcnQgeyByZWNvdmVyV2l0aCwgZmxhdE1hcEVycm9yLCB0aHJvd0Vycm9yIH0gZnJvbSAnLi9jb21iaW5hdG9yL2Vycm9ycydcblxuLy8gQGRlcHJlY2F0ZWQgZmxhdE1hcEVycm9yLCB1c2UgcmVjb3ZlcldpdGggaW5zdGVhZFxuZXhwb3J0IHsgcmVjb3ZlcldpdGgsIGZsYXRNYXBFcnJvciwgdGhyb3dFcnJvciB9XG5cbi8qKlxuICogSWYgdGhpcyBzdHJlYW0gZW5jb3VudGVycyBhbiBlcnJvciwgcmVjb3ZlciBhbmQgY29udGludWUgd2l0aCBpdGVtcyBmcm9tIHN0cmVhbVxuICogcmV0dXJuZWQgYnkgZi5cbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAtYS1iLWMtWC1cbiAqIGYoWCk6ICAgICAgICAgICAgICAgICAgICAgICAgICAgZC1lLWYtZy1cbiAqIGZsYXRNYXBFcnJvcihmLCBzdHJlYW0pOiAtYS1iLWMtZC1lLWYtZy1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oZXJyb3I6Kik6U3RyZWFtfSBmIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBuZXcgc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdoaWNoIHdpbGwgcmVjb3ZlciBmcm9tIGFuIGVycm9yIGJ5IGNhbGxpbmcgZlxuICovXG5TdHJlYW0ucHJvdG90eXBlLnJlY292ZXJXaXRoID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGZsYXRNYXBFcnJvcihmLCB0aGlzKVxufVxuXG4vLyBAZGVwcmVjYXRlZCB1c2UgcmVjb3ZlcldpdGggaW5zdGVhZFxuU3RyZWFtLnByb3RvdHlwZS5mbGF0TWFwRXJyb3IgPSBTdHJlYW0ucHJvdG90eXBlLnJlY292ZXJXaXRoXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBNdWx0aWNhc3RpbmdcblxuaW1wb3J0IG11bHRpY2FzdCBmcm9tICdAbW9zdC9tdWx0aWNhc3QnXG5cbmV4cG9ydCB7IG11bHRpY2FzdCB9XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBzdHJlYW0gaW50byBtdWx0aWNhc3Qgc3RyZWFtLiAgVGhhdCBtZWFucyB0aGF0IG1hbnkgc3Vic2NyaWJlcnNcbiAqIHRvIHRoZSBzdHJlYW0gd2lsbCBub3QgY2F1c2UgbXVsdGlwbGUgaW52b2NhdGlvbnMgb2YgdGhlIGludGVybmFsIG1hY2hpbmVyeS5cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2hpY2ggd2lsbCBtdWx0aWNhc3QgZXZlbnRzIHRvIGFsbCBvYnNlcnZlcnMuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUubXVsdGljYXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbXVsdGljYXN0KHRoaXMpXG59XG5cbi8vIGV4cG9ydCB0aGUgaW5zdGFuY2Ugb2YgdGhlIGRlZmF1bHRTY2hlZHVsZXIgZm9yIHRoaXJkLXBhcnR5IGxpYnJhcmllc1xuaW1wb3J0IGRlZmF1bHRTY2hlZHVsZXIgZnJvbSAnLi9zY2hlZHVsZXIvZGVmYXVsdFNjaGVkdWxlcidcblxuZXhwb3J0IHsgZGVmYXVsdFNjaGVkdWxlciB9XG5cbi8vIGV4cG9ydCBhbiBpbXBsZW1lbnRhdGlvbiBvZiBUYXNrIHVzZWQgaW50ZXJuYWxseSBmb3IgdGhpcmQtcGFydHkgbGlicmFyaWVzXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG5leHBvcnQgeyBQcm9wYWdhdGVUYXNrIH1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnZva2UgKGYsIGFyZ3MpIHtcbiAgLyogZXNsaW50IGNvbXBsZXhpdHk6IFsyLDddICovXG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmKClcbiAgICBjYXNlIDE6IHJldHVybiBmKGFyZ3NbMF0pXG4gICAgY2FzZSAyOiByZXR1cm4gZihhcmdzWzBdLCBhcmdzWzFdKVxuICAgIGNhc2UgMzogcmV0dXJuIGYoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICBjYXNlIDQ6IHJldHVybiBmKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgY2FzZSA1OiByZXR1cm4gZihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZi5hcHBseSh2b2lkIDAsIGFyZ3MpXG4gIH1cbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vKiBnbG9iYWwgU2V0LCBTeW1ib2wgKi9cbnZhciBpdGVyYXRvclN5bWJvbFxuLy8gRmlyZWZveCBzaGlwcyBhIHBhcnRpYWwgaW1wbGVtZW50YXRpb24gdXNpbmcgdGhlIG5hbWUgQEBpdGVyYXRvci5cbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkwNzA3NyNjMTRcbmlmICh0eXBlb2YgU2V0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBuZXcgU2V0KClbJ0BAaXRlcmF0b3InXSA9PT0gJ2Z1bmN0aW9uJykge1xuICBpdGVyYXRvclN5bWJvbCA9ICdAQGl0ZXJhdG9yJ1xufSBlbHNlIHtcbiAgaXRlcmF0b3JTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nID8gU3ltYm9sLml0ZXJhdG9yXG4gIDogJ19lczZzaGltX2l0ZXJhdG9yXydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUgKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvW2l0ZXJhdG9yU3ltYm9sXSA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlcmF0b3IgKG8pIHtcbiAgcmV0dXJuIG9baXRlcmF0b3JTeW1ib2xdKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VJdGVyYWJsZSAoZiwgbykge1xuICBvW2l0ZXJhdG9yU3ltYm9sXSA9IGZcbiAgcmV0dXJuIG9cbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IHsgdHJ5RW5kLCB0cnlFdmVudCB9IGZyb20gJy4uL3NvdXJjZS90cnlFdmVudCdcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21PYnNlcnZhYmxlIChvYnNlcnZhYmxlKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBPYnNlcnZhYmxlU291cmNlKG9ic2VydmFibGUpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gT2JzZXJ2YWJsZVNvdXJjZSAob2JzZXJ2YWJsZSkge1xuICB0aGlzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlXG59XG5cbk9ic2VydmFibGVTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIHN1YiA9IHRoaXMub2JzZXJ2YWJsZS5zdWJzY3JpYmUobmV3IFN1YnNjcmliZXJTaW5rKHNpbmssIHNjaGVkdWxlcikpXG4gIGlmICh0eXBlb2Ygc3ViID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRpc3Bvc2UuY3JlYXRlKHN1YilcbiAgfSBlbHNlIGlmIChzdWIgJiYgdHlwZW9mIHN1Yi51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkaXNwb3NlLmNyZWF0ZSh1bnN1YnNjcmliZSwgc3ViKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JzZXJ2YWJsZSByZXR1cm5lZCBpbnZhbGlkIHN1YnNjcmlwdGlvbiAnICsgU3RyaW5nKHN1YikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdWJzY3JpYmVyU2luayAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbn1cblxuU3Vic2NyaWJlclNpbmsucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoeCkge1xuICB0cnlFdmVudCh0aGlzLnNjaGVkdWxlci5ub3coKSwgeCwgdGhpcy5zaW5rKVxufVxuXG5TdWJzY3JpYmVyU2luay5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoeCkge1xuICB0cnlFbmQodGhpcy5zY2hlZHVsZXIubm93KCksIHgsIHRoaXMuc2luaylcbn1cblxuU3Vic2NyaWJlclNpbmsucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgdGhpcy5zaW5rLmVycm9yKHRoaXMuc2NoZWR1bGVyLm5vdygpLCBlKVxufVxuXG5mdW5jdGlvbiB1bnN1YnNjcmliZSAoc3Vic2NyaXB0aW9uKSB7XG4gIHJldHVybiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBzeW1ib2xPYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPYnNlcnZhYmxlIChvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICB2YXIgb2JzID0gbnVsbFxuICBpZiAobykge1xuICAvLyBBY2Nlc3MgZm9yZWlnbiBtZXRob2Qgb25seSBvbmNlXG4gICAgdmFyIG1ldGhvZCA9IG9bc3ltYm9sT2JzZXJ2YWJsZV1cbiAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb2JzID0gbWV0aG9kLmNhbGwobylcbiAgICAgIGlmICghKG9icyAmJiB0eXBlb2Ygb2JzLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBvYnNlcnZhYmxlICcgKyBvYnMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9ic1xufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBkZWZhdWx0U2NoZWR1bGVyIGZyb20gJy4uL3NjaGVkdWxlci9kZWZhdWx0U2NoZWR1bGVyJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgZmF0YWxFcnJvciBmcm9tICcuLi9mYXRhbEVycm9yJ1xuXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlIChzdWJzY3JpYmVyLCBzdHJlYW0pIHtcbiAgaWYgKE9iamVjdChzdWJzY3JpYmVyKSAhPT0gc3Vic2NyaWJlcikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N1YnNjcmliZXIgbXVzdCBiZSBhbiBvYmplY3QnKVxuICB9XG5cbiAgdmFyIGRpc3Bvc2FibGUgPSBkaXNwb3NlLnNldHRhYmxlKClcbiAgdmFyIG9ic2VydmVyID0gbmV3IFN1YnNjcmliZU9ic2VydmVyKGZhdGFsRXJyb3IsIHN1YnNjcmliZXIsIGRpc3Bvc2FibGUpXG5cbiAgZGlzcG9zYWJsZS5zZXREaXNwb3NhYmxlKHN0cmVhbS5zb3VyY2UucnVuKG9ic2VydmVyLCBkZWZhdWx0U2NoZWR1bGVyKSlcblxuICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbihkaXNwb3NhYmxlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Vic2NyaWJlT2JzZXJ2ZXIgKGZhdGFsRXJyb3IsIHN1YnNjcmliZXIsIGRpc3Bvc2FibGUpIHtcbiAgdGhpcy5mYXRhbEVycm9yID0gZmF0YWxFcnJvclxuICB0aGlzLnN1YnNjcmliZXIgPSBzdWJzY3JpYmVyXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2FibGVcbn1cblxuU3Vic2NyaWJlT2JzZXJ2ZXIucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZWQgJiYgdHlwZW9mIHRoaXMuc3Vic2NyaWJlci5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVyLm5leHQoeClcbiAgfVxufVxuXG5TdWJzY3JpYmVPYnNlcnZlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZWQpIHtcbiAgICB2YXIgcyA9IHRoaXMuc3Vic2NyaWJlclxuICAgIHZhciBmYXRhbEVycm9yID0gdGhpcy5mYXRhbEVycm9yXG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiBzLmNvbXBsZXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHMuY29tcGxldGUoeClcbiAgICAgIH1cbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgdGhyb3dFcnJvcihlLCBzLCBmYXRhbEVycm9yKVxuICAgIH0pXG4gIH1cbn1cblxuU3Vic2NyaWJlT2JzZXJ2ZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdmFyIHMgPSB0aGlzLnN1YnNjcmliZXJcbiAgdmFyIGZhdGFsRXJyb3IgPSB0aGlzLmZhdGFsRXJyb3JcbiAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHRocm93RXJyb3IoZSwgcywgZmF0YWxFcnJvcilcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN1YnNjcmlwdGlvbiAoZGlzcG9zYWJsZSkge1xuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG59XG5cblN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gdGhyb3dFcnJvciAoZTEsIHN1YnNjcmliZXIsIHRocm93RXJyb3IpIHtcbiAgaWYgKHR5cGVvZiBzdWJzY3JpYmVyLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIuZXJyb3IoZTEpXG4gICAgfSBjYXRjaCAoZTIpIHtcbiAgICAgIHRocm93RXJyb3IoZTIpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93RXJyb3IoZTEpXG4gIH1cbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IGRlZmF1bHRTY2hlZHVsZXIgZnJvbSAnLi9zY2hlZHVsZXIvZGVmYXVsdFNjaGVkdWxlcidcblxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhEZWZhdWx0U2NoZWR1bGVyIChzb3VyY2UpIHtcbiAgcmV0dXJuIHdpdGhTY2hlZHVsZXIoc291cmNlLCBkZWZhdWx0U2NoZWR1bGVyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2l0aFNjaGVkdWxlciAoc291cmNlLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBydW5Tb3VyY2Uoc291cmNlLCBzY2hlZHVsZXIsIHJlc29sdmUsIHJlamVjdClcbiAgfSlcbn1cblxuZnVuY3Rpb24gcnVuU291cmNlIChzb3VyY2UsIHNjaGVkdWxlciwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gIHZhciBkaXNwb3NhYmxlID0gZGlzcG9zZS5zZXR0YWJsZSgpXG4gIHZhciBvYnNlcnZlciA9IG5ldyBEcmFpbihyZXNvbHZlLCByZWplY3QsIGRpc3Bvc2FibGUpXG5cbiAgZGlzcG9zYWJsZS5zZXREaXNwb3NhYmxlKHNvdXJjZS5ydW4ob2JzZXJ2ZXIsIHNjaGVkdWxlcikpXG59XG5cbmZ1bmN0aW9uIERyYWluIChlbmQsIGVycm9yLCBkaXNwb3NhYmxlKSB7XG4gIHRoaXMuX2VuZCA9IGVuZFxuICB0aGlzLl9lcnJvciA9IGVycm9yXG4gIHRoaXMuX2Rpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5EcmFpbi5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge31cblxuRHJhaW4ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIGRpc3Bvc2VUaGVuKHRoaXMuX2VuZCwgdGhpcy5fZXJyb3IsIHRoaXMuX2Rpc3Bvc2FibGUsIHgpXG59XG5cbkRyYWluLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgZGlzcG9zZVRoZW4odGhpcy5fZXJyb3IsIHRoaXMuX2Vycm9yLCB0aGlzLl9kaXNwb3NhYmxlLCBlKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlVGhlbiAoZW5kLCBlcnJvciwgZGlzcG9zYWJsZSwgeCkge1xuICBQcm9taXNlLnJlc29sdmUoZGlzcG9zYWJsZS5kaXNwb3NlKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIGVuZCh4KVxuICB9LCBlcnJvcilcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgeyBkZWZlciB9IGZyb20gJy4uL3Rhc2snXG5cbi8qIGdsb2JhbCBzZXRUaW1lb3V0LCBjbGVhclRpbWVvdXQgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xvY2tUaW1lciAoKSB7fVxuXG5DbG9ja1RpbWVyLnByb3RvdHlwZS5ub3cgPSBEYXRlLm5vd1xuXG5DbG9ja1RpbWVyLnByb3RvdHlwZS5zZXRUaW1lciA9IGZ1bmN0aW9uIChmLCBkdCkge1xuICByZXR1cm4gZHQgPD0gMCA/IHJ1bkFzYXAoZikgOiBzZXRUaW1lb3V0KGYsIGR0KVxufVxuXG5DbG9ja1RpbWVyLnByb3RvdHlwZS5jbGVhclRpbWVyID0gZnVuY3Rpb24gKHQpIHtcbiAgcmV0dXJuIHQgaW5zdGFuY2VvZiBBc2FwID8gdC5jYW5jZWwoKSA6IGNsZWFyVGltZW91dCh0KVxufVxuXG5mdW5jdGlvbiBBc2FwIChmKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG59XG5cbkFzYXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuYWN0aXZlICYmIHRoaXMuZigpXG59XG5cbkFzYXAucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgdGhyb3cgZVxufVxuXG5Bc2FwLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gcnVuQXNhcCAoZikge1xuICB2YXIgdGFzayA9IG5ldyBBc2FwKGYpXG4gIGRlZmVyKHRhc2spXG4gIHJldHVybiB0YXNrXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IGZhdGFsIGZyb20gJy4uL2ZhdGFsRXJyb3InXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb3BhZ2F0ZVRhc2sgKHJ1biwgdmFsdWUsIHNpbmspIHtcbiAgdGhpcy5fcnVuID0gcnVuXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5Qcm9wYWdhdGVUYXNrLmV2ZW50ID0gZnVuY3Rpb24gKHZhbHVlLCBzaW5rKSB7XG4gIHJldHVybiBuZXcgUHJvcGFnYXRlVGFzayhlbWl0LCB2YWx1ZSwgc2luaylcbn1cblxuUHJvcGFnYXRlVGFzay5lbmQgPSBmdW5jdGlvbiAodmFsdWUsIHNpbmspIHtcbiAgcmV0dXJuIG5ldyBQcm9wYWdhdGVUYXNrKGVuZCwgdmFsdWUsIHNpbmspXG59XG5cblByb3BhZ2F0ZVRhc2suZXJyb3IgPSBmdW5jdGlvbiAodmFsdWUsIHNpbmspIHtcbiAgcmV0dXJuIG5ldyBQcm9wYWdhdGVUYXNrKGVycm9yLCB2YWx1ZSwgc2luaylcbn1cblxuUHJvcGFnYXRlVGFzay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxufVxuXG5Qcm9wYWdhdGVUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAodCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5fcnVuKHQsIHRoaXMudmFsdWUsIHRoaXMuc2luaylcbn1cblxuUHJvcGFnYXRlVGFzay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuIGZhdGFsKGUpXG4gIH1cbiAgdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIGVycm9yICh0LCBlLCBzaW5rKSB7XG4gIHNpbmsuZXJyb3IodCwgZSlcbn1cblxuZnVuY3Rpb24gZW1pdCAodCwgeCwgc2luaykge1xuICBzaW5rLmV2ZW50KHQsIHgpXG59XG5cbmZ1bmN0aW9uIGVuZCAodCwgeCwgc2luaykge1xuICBzaW5rLmVuZCh0LCB4KVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNjaGVkdWxlZFRhc2sgKGRlbGF5LCBwZXJpb2QsIHRhc2ssIHNjaGVkdWxlcikge1xuICB0aGlzLnRpbWUgPSBkZWxheVxuICB0aGlzLnBlcmlvZCA9IHBlcmlvZFxuICB0aGlzLnRhc2sgPSB0YXNrXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5TY2hlZHVsZWRUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRhc2sucnVuKHRoaXMudGltZSlcbn1cblxuU2NoZWR1bGVkVGFzay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICByZXR1cm4gdGhpcy50YXNrLmVycm9yKHRoaXMudGltZSwgZSlcbn1cblxuU2NoZWR1bGVkVGFzay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zY2hlZHVsZXIuY2FuY2VsKHRoaXMpXG4gIHJldHVybiB0aGlzLnRhc2suZGlzcG9zZSgpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFNjaGVkdWxlZFRhc2sgZnJvbSAnLi9TY2hlZHVsZWRUYXNrJ1xuaW1wb3J0IHsgcnVuVGFzayB9IGZyb20gJy4uL3Rhc2snXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNjaGVkdWxlciAodGltZXIsIHRpbWVsaW5lKSB7XG4gIHRoaXMudGltZXIgPSB0aW1lclxuICB0aGlzLnRpbWVsaW5lID0gdGltZWxpbmVcblxuICB0aGlzLl90aW1lciA9IG51bGxcbiAgdGhpcy5fbmV4dEFycml2YWwgPSBJbmZpbml0eVxuXG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLl9ydW5SZWFkeVRhc2tzQm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5fcnVuUmVhZHlUYXNrcyhzZWxmLm5vdygpKVxuICB9XG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUubm93ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50aW1lci5ub3coKVxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLmFzYXAgPSBmdW5jdGlvbiAodGFzaykge1xuICByZXR1cm4gdGhpcy5zY2hlZHVsZSgwLCAtMSwgdGFzaylcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIChkZWxheSwgdGFzaykge1xuICByZXR1cm4gdGhpcy5zY2hlZHVsZShkZWxheSwgLTEsIHRhc2spXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUucGVyaW9kaWMgPSBmdW5jdGlvbiAocGVyaW9kLCB0YXNrKSB7XG4gIHJldHVybiB0aGlzLnNjaGVkdWxlKDAsIHBlcmlvZCwgdGFzaylcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChkZWxheSwgcGVyaW9kLCB0YXNrKSB7XG4gIHZhciBub3cgPSB0aGlzLm5vdygpXG4gIHZhciBzdCA9IG5ldyBTY2hlZHVsZWRUYXNrKG5vdyArIE1hdGgubWF4KDAsIGRlbGF5KSwgcGVyaW9kLCB0YXNrLCB0aGlzKVxuXG4gIHRoaXMudGltZWxpbmUuYWRkKHN0KVxuICB0aGlzLl9zY2hlZHVsZU5leHRSdW4obm93KVxuICByZXR1cm4gc3Rcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAodGFzaykge1xuICB0YXNrLmFjdGl2ZSA9IGZhbHNlXG4gIGlmICh0aGlzLnRpbWVsaW5lLnJlbW92ZSh0YXNrKSkge1xuICAgIHRoaXMuX3Jlc2NoZWR1bGUoKVxuICB9XG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuY2FuY2VsQWxsID0gZnVuY3Rpb24gKGYpIHtcbiAgdGhpcy50aW1lbGluZS5yZW1vdmVBbGwoZilcbiAgdGhpcy5fcmVzY2hlZHVsZSgpXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuX3Jlc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnRpbWVsaW5lLmlzRW1wdHkoKSkge1xuICAgIHRoaXMuX3Vuc2NoZWR1bGUoKVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX3NjaGVkdWxlTmV4dFJ1bih0aGlzLm5vdygpKVxuICB9XG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuX3Vuc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZXIuY2xlYXJUaW1lcih0aGlzLl90aW1lcilcbiAgdGhpcy5fdGltZXIgPSBudWxsXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuX3NjaGVkdWxlTmV4dFJ1biA9IGZ1bmN0aW9uIChub3cpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIGlmICh0aGlzLnRpbWVsaW5lLmlzRW1wdHkoKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIG5leHRBcnJpdmFsID0gdGhpcy50aW1lbGluZS5uZXh0QXJyaXZhbCgpXG5cbiAgaWYgKHRoaXMuX3RpbWVyID09PSBudWxsKSB7XG4gICAgdGhpcy5fc2NoZWR1bGVOZXh0QXJyaXZhbChuZXh0QXJyaXZhbCwgbm93KVxuICB9IGVsc2UgaWYgKG5leHRBcnJpdmFsIDwgdGhpcy5fbmV4dEFycml2YWwpIHtcbiAgICB0aGlzLl91bnNjaGVkdWxlKClcbiAgICB0aGlzLl9zY2hlZHVsZU5leHRBcnJpdmFsKG5leHRBcnJpdmFsLCBub3cpXG4gIH1cbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5fc2NoZWR1bGVOZXh0QXJyaXZhbCA9IGZ1bmN0aW9uIChuZXh0QXJyaXZhbCwgbm93KSB7XG4gIHRoaXMuX25leHRBcnJpdmFsID0gbmV4dEFycml2YWxcbiAgdmFyIGRlbGF5ID0gTWF0aC5tYXgoMCwgbmV4dEFycml2YWwgLSBub3cpXG4gIHRoaXMuX3RpbWVyID0gdGhpcy50aW1lci5zZXRUaW1lcih0aGlzLl9ydW5SZWFkeVRhc2tzQm91bmQsIGRlbGF5KVxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLl9ydW5SZWFkeVRhc2tzID0gZnVuY3Rpb24gKG5vdykge1xuICB0aGlzLl90aW1lciA9IG51bGxcbiAgdGhpcy50aW1lbGluZS5ydW5UYXNrcyhub3csIHJ1blRhc2spXG4gIHRoaXMuX3NjaGVkdWxlTmV4dFJ1bih0aGlzLm5vdygpKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGltZWxpbmUgKCkge1xuICB0aGlzLnRhc2tzID0gW11cbn1cblxuVGltZWxpbmUucHJvdG90eXBlLm5leHRBcnJpdmFsID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5pc0VtcHR5KCkgPyBJbmZpbml0eSA6IHRoaXMudGFza3NbMF0udGltZVxufVxuXG5UaW1lbGluZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoID09PSAwXG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoc3QpIHtcbiAgaW5zZXJ0QnlUaW1lKHN0LCB0aGlzLnRhc2tzKVxufVxuXG5UaW1lbGluZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHN0KSB7XG4gIHZhciBpID0gYmluYXJ5U2VhcmNoKHN0LnRpbWUsIHRoaXMudGFza3MpXG5cbiAgaWYgKGkgPj0gMCAmJiBpIDwgdGhpcy50YXNrcy5sZW5ndGgpIHtcbiAgICB2YXIgYXQgPSBiYXNlLmZpbmRJbmRleChzdCwgdGhpcy50YXNrc1tpXS5ldmVudHMpXG4gICAgaWYgKGF0ID49IDApIHtcbiAgICAgIHRoaXMudGFza3NbaV0uZXZlbnRzLnNwbGljZShhdCwgMSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoZikge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMudGFza3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgcmVtb3ZlQWxsRnJvbShmLCB0aGlzLnRhc2tzW2ldKVxuICB9XG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5ydW5UYXNrcyA9IGZ1bmN0aW9uICh0LCBydW5UYXNrKSB7XG4gIHZhciB0YXNrcyA9IHRoaXMudGFza3NcbiAgdmFyIGwgPSB0YXNrcy5sZW5ndGhcbiAgdmFyIGkgPSAwXG5cbiAgd2hpbGUgKGkgPCBsICYmIHRhc2tzW2ldLnRpbWUgPD0gdCkge1xuICAgICsraVxuICB9XG5cbiAgdGhpcy50YXNrcyA9IHRhc2tzLnNsaWNlKGkpXG5cbiAgLy8gUnVuIGFsbCByZWFkeSB0YXNrc1xuICBmb3IgKHZhciBqID0gMDsgaiA8IGk7ICsraikge1xuICAgIHRoaXMudGFza3MgPSBydW5UYXNrcyhydW5UYXNrLCB0YXNrc1tqXSwgdGhpcy50YXNrcylcbiAgfVxufVxuXG5mdW5jdGlvbiBydW5UYXNrcyAocnVuVGFzaywgdGltZXNsb3QsIHRhc2tzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICB2YXIgZXZlbnRzID0gdGltZXNsb3QuZXZlbnRzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHRhc2sgPSBldmVudHNbaV1cblxuICAgIGlmICh0YXNrLmFjdGl2ZSkge1xuICAgICAgcnVuVGFzayh0YXNrKVxuXG4gICAgICAvLyBSZXNjaGVkdWxlIHBlcmlvZGljIHJlcGVhdGluZyB0YXNrc1xuICAgICAgLy8gQ2hlY2sgYWN0aXZlIGFnYWluLCBzaW5jZSBhIHRhc2sgbWF5IGhhdmUgY2FuY2VsZWQgaXRzZWxmXG4gICAgICBpZiAodGFzay5wZXJpb2QgPj0gMCAmJiB0YXNrLmFjdGl2ZSkge1xuICAgICAgICB0YXNrLnRpbWUgPSB0YXNrLnRpbWUgKyB0YXNrLnBlcmlvZFxuICAgICAgICBpbnNlcnRCeVRpbWUodGFzaywgdGFza3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhc2tzXG59XG5cbmZ1bmN0aW9uIGluc2VydEJ5VGltZSAodGFzaywgdGltZXNsb3RzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICB2YXIgbCA9IHRpbWVzbG90cy5sZW5ndGhcblxuICBpZiAobCA9PT0gMCkge1xuICAgIHRpbWVzbG90cy5wdXNoKG5ld1RpbWVzbG90KHRhc2sudGltZSwgW3Rhc2tdKSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBpID0gYmluYXJ5U2VhcmNoKHRhc2sudGltZSwgdGltZXNsb3RzKVxuXG4gIGlmIChpID49IGwpIHtcbiAgICB0aW1lc2xvdHMucHVzaChuZXdUaW1lc2xvdCh0YXNrLnRpbWUsIFt0YXNrXSkpXG4gIH0gZWxzZSBpZiAodGFzay50aW1lID09PSB0aW1lc2xvdHNbaV0udGltZSkge1xuICAgIHRpbWVzbG90c1tpXS5ldmVudHMucHVzaCh0YXNrKVxuICB9IGVsc2Uge1xuICAgIHRpbWVzbG90cy5zcGxpY2UoaSwgMCwgbmV3VGltZXNsb3QodGFzay50aW1lLCBbdGFza10pKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFsbEZyb20gKGYsIHRpbWVzbG90KSB7XG4gIHRpbWVzbG90LmV2ZW50cyA9IGJhc2UucmVtb3ZlQWxsKGYsIHRpbWVzbG90LmV2ZW50cylcbn1cblxuZnVuY3Rpb24gYmluYXJ5U2VhcmNoICh0LCBzb3J0ZWRBcnJheSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgdmFyIGxvID0gMFxuICB2YXIgaGkgPSBzb3J0ZWRBcnJheS5sZW5ndGhcbiAgdmFyIG1pZCwgeVxuXG4gIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgbWlkID0gTWF0aC5mbG9vcigobG8gKyBoaSkgLyAyKVxuICAgIHkgPSBzb3J0ZWRBcnJheVttaWRdXG5cbiAgICBpZiAodCA9PT0geS50aW1lKSB7XG4gICAgICByZXR1cm4gbWlkXG4gICAgfSBlbHNlIGlmICh0IDwgeS50aW1lKSB7XG4gICAgICBoaSA9IG1pZFxuICAgIH0gZWxzZSB7XG4gICAgICBsbyA9IG1pZCArIDFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGhpXG59XG5cbmZ1bmN0aW9uIG5ld1RpbWVzbG90ICh0LCBldmVudHMpIHtcbiAgcmV0dXJuIHsgdGltZTogdCwgZXZlbnRzOiBldmVudHMgfVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTY2hlZHVsZXIgZnJvbSAnLi9TY2hlZHVsZXInXG5pbXBvcnQgQ2xvY2tUaW1lciBmcm9tICcuL0Nsb2NrVGltZXInXG5pbXBvcnQgVGltZWxpbmUgZnJvbSAnLi9UaW1lbGluZSdcblxudmFyIGRlZmF1bHRTY2hlZHVsZXIgPSBuZXcgU2NoZWR1bGVyKG5ldyBDbG9ja1RpbWVyKCksIG5ldyBUaW1lbGluZSgpKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0U2NoZWR1bGVyXG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgZGVmZXIgfSBmcm9tICcuLi90YXNrJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZWZlcnJlZFNpbmsgKHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmV2ZW50cyA9IFtdXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5EZWZlcnJlZFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMuZXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlZmVyKG5ldyBQcm9wYWdhdGVBbGxUYXNrKHRoaXMuc2luaywgdCwgdGhpcy5ldmVudHMpKVxuICB9XG5cbiAgdGhpcy5ldmVudHMucHVzaCh7IHRpbWU6IHQsIHZhbHVlOiB4IH0pXG59XG5cbkRlZmVycmVkU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5fZW5kKG5ldyBFbmRUYXNrKHQsIHgsIHRoaXMuc2luaykpXG59XG5cbkRlZmVycmVkU2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLl9lbmQobmV3IEVycm9yVGFzayh0LCBlLCB0aGlzLnNpbmspKVxufVxuXG5EZWZlcnJlZFNpbmsucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbiAodGFzaykge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIGRlZmVyKHRhc2spXG59XG5cbmZ1bmN0aW9uIFByb3BhZ2F0ZUFsbFRhc2sgKHNpbmssIHRpbWUsIGV2ZW50cykge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZXZlbnRzID0gZXZlbnRzXG4gIHRoaXMudGltZSA9IHRpbWVcbn1cblxuUHJvcGFnYXRlQWxsVGFzay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudHNcbiAgdmFyIHNpbmsgPSB0aGlzLnNpbmtcbiAgdmFyIGV2ZW50XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgZXZlbnQgPSBldmVudHNbaV1cbiAgICB0aGlzLnRpbWUgPSBldmVudC50aW1lXG4gICAgc2luay5ldmVudChldmVudC50aW1lLCBldmVudC52YWx1ZSlcbiAgfVxuXG4gIGV2ZW50cy5sZW5ndGggPSAwXG59XG5cblByb3BhZ2F0ZUFsbFRhc2sucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgdGhpcy5zaW5rLmVycm9yKHRoaXMudGltZSwgZSlcbn1cblxuZnVuY3Rpb24gRW5kVGFzayAodCwgeCwgc2luaykge1xuICB0aGlzLnRpbWUgPSB0XG4gIHRoaXMudmFsdWUgPSB4XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuRW5kVGFzay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnNpbmsuZW5kKHRoaXMudGltZSwgdGhpcy52YWx1ZSlcbn1cblxuRW5kVGFzay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICB0aGlzLnNpbmsuZXJyb3IodGhpcy50aW1lLCBlKVxufVxuXG5mdW5jdGlvbiBFcnJvclRhc2sgKHQsIGUsIHNpbmspIHtcbiAgdGhpcy50aW1lID0gdFxuICB0aGlzLnZhbHVlID0gZVxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cbkVycm9yVGFzay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnNpbmsuZXJyb3IodGhpcy50aW1lLCB0aGlzLnZhbHVlKVxufVxuXG5FcnJvclRhc2sucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgdGhyb3cgZVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTaW5rIGZyb20gJy4vUGlwZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW5kZXhTaW5rIChpLCBzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5pbmRleCA9IGlcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG4gIHRoaXMudmFsdWUgPSB2b2lkIDBcbn1cblxuSW5kZXhTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLnZhbHVlID0geFxuICB0aGlzLnNpbmsuZXZlbnQodCwgdGhpcylcbn1cblxuSW5kZXhTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICB0aGlzLnNpbmsuZW5kKHQsIHsgaW5kZXg6IHRoaXMuaW5kZXgsIHZhbHVlOiB4IH0pXG59XG5cbkluZGV4U2luay5wcm90b3R5cGUuZXJyb3IgPSBTaW5rLnByb3RvdHlwZS5lcnJvclxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbi8qKlxuICogQSBzaW5rIG1peGluIHRoYXQgc2ltcGx5IGZvcndhcmRzIGV2ZW50LCBlbmQsIGFuZCBlcnJvciB0b1xuICogYW5vdGhlciBzaW5rLlxuICogQHBhcmFtIHNpbmtcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQaXBlIChzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuUGlwZS5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICByZXR1cm4gdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cblBpcGUucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHJldHVybiB0aGlzLnNpbmsuZW5kKHQsIHgpXG59XG5cblBpcGUucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgcmV0dXJuIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNhZmVTaW5rIChzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG59XG5cblNhZmVTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLnNpbmsuZXZlbnQodCwgeClcbn1cblxuU2FmZVNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmRpc2FibGUoKVxuICB0aGlzLnNpbmsuZW5kKHQsIHgpXG59XG5cblNhZmVTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHRoaXMuZGlzYWJsZSgpXG4gIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuXG5TYWZlU2luay5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICByZXR1cm4gdGhpcy5zaW5rXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IERlZmVycmVkU2luayBmcm9tICcuLi9zaW5rL0RlZmVycmVkU2luaydcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0ICogYXMgdHJ5RXZlbnQgZnJvbSAnLi90cnlFdmVudCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXZlbnRFbWl0dGVyU291cmNlIChldmVudCwgc291cmNlKSB7XG4gIHRoaXMuZXZlbnQgPSBldmVudFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5FdmVudEVtaXR0ZXJTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgLy8gTk9URTogQmVjYXVzZSBFdmVudEVtaXR0ZXIgYWxsb3dzIGV2ZW50cyBpbiB0aGUgc2FtZSBjYWxsIHN0YWNrIGFzXG4gIC8vIGEgbGlzdGVuZXIgaXMgYWRkZWQsIHVzZSBhIERlZmVycmVkU2luayB0byBidWZmZXIgZXZlbnRzXG4gIC8vIHVudGlsIHRoZSBzdGFjayBjbGVhcnMsIHRoZW4gcHJvcGFnYXRlLiAgVGhpcyBtYWludGFpbnMgbW9zdC5qcydzXG4gIC8vIGludmFyaWFudCB0aGF0IG5vIGV2ZW50IHdpbGwgYmUgZGVsaXZlcmVkIGluIHRoZSBzYW1lIGNhbGwgc3RhY2tcbiAgLy8gYXMgYW4gb2JzZXJ2ZXIgYmVnaW5zIG9ic2VydmluZy5cbiAgdmFyIGRzaW5rID0gbmV3IERlZmVycmVkU2luayhzaW5rKVxuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50VmFyaWFkaWMgKGEpIHtcbiAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICBpZiAobCA+IDEpIHtcbiAgICAgIHZhciBhcnIgPSBuZXcgQXJyYXkobClcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGFycltpXSA9IGFyZ3VtZW50c1tpXVxuICAgICAgfVxuICAgICAgdHJ5RXZlbnQudHJ5RXZlbnQoc2NoZWR1bGVyLm5vdygpLCBhcnIsIGRzaW5rKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnlFdmVudC50cnlFdmVudChzY2hlZHVsZXIubm93KCksIGEsIGRzaW5rKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuc291cmNlLmFkZExpc3RlbmVyKHRoaXMuZXZlbnQsIGFkZEV2ZW50VmFyaWFkaWMpXG5cbiAgcmV0dXJuIGRpc3Bvc2UuY3JlYXRlKGRpc3Bvc2VFdmVudEVtaXR0ZXIsIHsgdGFyZ2V0OiB0aGlzLCBhZGRFdmVudDogYWRkRXZlbnRWYXJpYWRpYyB9KVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlRXZlbnRFbWl0dGVyIChpbmZvKSB7XG4gIHZhciB0YXJnZXQgPSBpbmZvLnRhcmdldFxuICB0YXJnZXQuc291cmNlLnJlbW92ZUxpc3RlbmVyKHRhcmdldC5ldmVudCwgaW5mby5hZGRFdmVudClcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCAqIGFzIHRyeUV2ZW50IGZyb20gJy4vdHJ5RXZlbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50VGFyZ2V0U291cmNlIChldmVudCwgc291cmNlLCBjYXB0dXJlKSB7XG4gIHRoaXMuZXZlbnQgPSBldmVudFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLmNhcHR1cmUgPSBjYXB0dXJlXG59XG5cbkV2ZW50VGFyZ2V0U291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIGZ1bmN0aW9uIGFkZEV2ZW50IChlKSB7XG4gICAgdHJ5RXZlbnQudHJ5RXZlbnQoc2NoZWR1bGVyLm5vdygpLCBlLCBzaW5rKVxuICB9XG5cbiAgdGhpcy5zb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCBhZGRFdmVudCwgdGhpcy5jYXB0dXJlKVxuXG4gIHJldHVybiBkaXNwb3NlLmNyZWF0ZShkaXNwb3NlRXZlbnRUYXJnZXQsXG4gICAgeyB0YXJnZXQ6IHRoaXMsIGFkZEV2ZW50OiBhZGRFdmVudCB9KVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlRXZlbnRUYXJnZXQgKGluZm8pIHtcbiAgdmFyIHRhcmdldCA9IGluZm8udGFyZ2V0XG4gIHRhcmdldC5zb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQuZXZlbnQsIGluZm8uYWRkRXZlbnQsIHRhcmdldC5jYXB0dXJlKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuLyoqXG4gKiBTdHJlYW0gY29udGFpbmluZyBvbmx5IHhcbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9mICh4KSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBKdXN0KHgpKVxufVxuXG5mdW5jdGlvbiBKdXN0ICh4KSB7XG4gIHRoaXMudmFsdWUgPSB4XG59XG5cbkp1c3QucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHNjaGVkdWxlci5hc2FwKG5ldyBQcm9wYWdhdGVUYXNrKHJ1bkp1c3QsIHRoaXMudmFsdWUsIHNpbmspKVxufVxuXG5mdW5jdGlvbiBydW5KdXN0ICh0LCB4LCBzaW5rKSB7XG4gIHNpbmsuZXZlbnQodCwgeClcbiAgc2luay5lbmQodCwgdm9pZCAwKVxufVxuXG4vKipcbiAqIFN0cmVhbSBjb250YWluaW5nIG5vIGV2ZW50cyBhbmQgZW5kcyBpbW1lZGlhdGVseVxuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5ICgpIHtcbiAgcmV0dXJuIEVNUFRZXG59XG5cbmZ1bmN0aW9uIEVtcHR5U291cmNlICgpIHt9XG5cbkVtcHR5U291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciB0YXNrID0gUHJvcGFnYXRlVGFzay5lbmQodm9pZCAwLCBzaW5rKVxuICBzY2hlZHVsZXIuYXNhcCh0YXNrKVxuXG4gIHJldHVybiBkaXNwb3NlLmNyZWF0ZShkaXNwb3NlRW1wdHksIHRhc2spXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VFbXB0eSAodGFzaykge1xuICByZXR1cm4gdGFzay5kaXNwb3NlKClcbn1cblxudmFyIEVNUFRZID0gbmV3IFN0cmVhbShuZXcgRW1wdHlTb3VyY2UoKSlcblxuLyoqXG4gKiBTdHJlYW0gY29udGFpbmluZyBubyBldmVudHMgYW5kIG5ldmVyIGVuZHNcbiAqIEByZXR1cm5zIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAoKSB7XG4gIHJldHVybiBORVZFUlxufVxuXG5mdW5jdGlvbiBOZXZlclNvdXJjZSAoKSB7fVxuXG5OZXZlclNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZGlzcG9zZS5lbXB0eSgpXG59XG5cbnZhciBORVZFUiA9IG5ldyBTdHJlYW0obmV3IE5ldmVyU291cmNlKCkpXG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgeyBmcm9tQXJyYXkgfSBmcm9tICcuL2Zyb21BcnJheSdcbmltcG9ydCB7IGlzSXRlcmFibGUgfSBmcm9tICcuLi9pdGVyYWJsZSdcbmltcG9ydCB7IGZyb21JdGVyYWJsZSB9IGZyb20gJy4vZnJvbUl0ZXJhYmxlJ1xuaW1wb3J0IGdldE9ic2VydmFibGUgZnJvbSAnLi4vb2JzZXJ2YWJsZS9nZXRPYnNlcnZhYmxlJ1xuaW1wb3J0IHsgZnJvbU9ic2VydmFibGUgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21PYnNlcnZhYmxlJ1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbSAoYSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgaWYgKGEgaW5zdGFuY2VvZiBTdHJlYW0pIHtcbiAgICByZXR1cm4gYVxuICB9XG5cbiAgdmFyIG9ic2VydmFibGUgPSBnZXRPYnNlcnZhYmxlKGEpXG4gIGlmIChvYnNlcnZhYmxlICE9IG51bGwpIHtcbiAgICByZXR1cm4gZnJvbU9ic2VydmFibGUob2JzZXJ2YWJsZSlcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGEpIHx8IGlzQXJyYXlMaWtlKGEpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheShhKVxuICB9XG5cbiAgaWYgKGlzSXRlcmFibGUoYSkpIHtcbiAgICByZXR1cm4gZnJvbUl0ZXJhYmxlKGEpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdmcm9tKHgpIG11c3QgYmUgb2JzZXJ2YWJsZSwgaXRlcmFibGUsIG9yIGFycmF5LWxpa2U6ICcgKyBhKVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQXJyYXkgKGEpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEFycmF5U291cmNlKGEpKVxufVxuXG5mdW5jdGlvbiBBcnJheVNvdXJjZSAoYSkge1xuICB0aGlzLmFycmF5ID0gYVxufVxuXG5BcnJheVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLmFzYXAobmV3IFByb3BhZ2F0ZVRhc2socnVuUHJvZHVjZXIsIHRoaXMuYXJyYXksIHNpbmspKVxufVxuXG5mdW5jdGlvbiBydW5Qcm9kdWNlciAodCwgYXJyYXksIHNpbmspIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsICYmIHRoaXMuYWN0aXZlOyArK2kpIHtcbiAgICBzaW5rLmV2ZW50KHQsIGFycmF5W2ldKVxuICB9XG5cbiAgdGhpcy5hY3RpdmUgJiYgc2luay5lbmQodClcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBFdmVudFRhcmdldFNvdXJjZSBmcm9tICcuL0V2ZW50VGFyZ2V0U291cmNlJ1xuaW1wb3J0IEV2ZW50RW1pdHRlclNvdXJjZSBmcm9tICcuL0V2ZW50RW1pdHRlclNvdXJjZSdcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gZnJvbSBhbiBFdmVudFRhcmdldCwgc3VjaCBhcyBhIERPTSBOb2RlLCBvciBFdmVudEVtaXR0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgZXZlbnQgdHlwZSBuYW1lLCBlLmcuICdjbGljaydcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RXZlbnRFbWl0dGVyfSBzb3VyY2UgRXZlbnRUYXJnZXQgb3IgRXZlbnRFbWl0dGVyXG4gKiBAcGFyYW0geyo/fSBjYXB0dXJlIGZvciBET00gZXZlbnRzLCB3aGV0aGVyIHRvIHVzZVxuICogIGNhcHR1cmluZy0tcGFzc2VkIGFzIDNyZCBwYXJhbWV0ZXIgdG8gYWRkRXZlbnRMaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgb2YgdGhlIHNwZWNpZmllZCB0eXBlXG4gKiBmcm9tIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRXZlbnQgKGV2ZW50LCBzb3VyY2UsIGNhcHR1cmUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIHZhciBzXG5cbiAgaWYgKHR5cGVvZiBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZVxuICAgIH1cblxuICAgIHMgPSBuZXcgRXZlbnRUYXJnZXRTb3VyY2UoZXZlbnQsIHNvdXJjZSwgY2FwdHVyZSlcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc291cmNlLmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2UucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzID0gbmV3IEV2ZW50RW1pdHRlclNvdXJjZShldmVudCwgc291cmNlKVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignc291cmNlIG11c3Qgc3VwcG9ydCBhZGRFdmVudExpc3RlbmVyL3JlbW92ZUV2ZW50TGlzdGVuZXIgb3IgYWRkTGlzdGVuZXIvcmVtb3ZlTGlzdGVuZXInKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTdHJlYW0ocylcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCB7IGdldEl0ZXJhdG9yIH0gZnJvbSAnLi4vaXRlcmFibGUnXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JdGVyYWJsZSAoaXRlcmFibGUpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEl0ZXJhYmxlU291cmNlKGl0ZXJhYmxlKSlcbn1cblxuZnVuY3Rpb24gSXRlcmFibGVTb3VyY2UgKGl0ZXJhYmxlKSB7XG4gIHRoaXMuaXRlcmFibGUgPSBpdGVyYWJsZVxufVxuXG5JdGVyYWJsZVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLmFzYXAobmV3IFByb3BhZ2F0ZVRhc2socnVuUHJvZHVjZXIsIGdldEl0ZXJhdG9yKHRoaXMuaXRlcmFibGUpLCBzaW5rKSlcbn1cblxuZnVuY3Rpb24gcnVuUHJvZHVjZXIgKHQsIGl0ZXJhdG9yLCBzaW5rKSB7XG4gIHZhciByID0gaXRlcmF0b3IubmV4dCgpXG5cbiAgd2hpbGUgKCFyLmRvbmUgJiYgdGhpcy5hY3RpdmUpIHtcbiAgICBzaW5rLmV2ZW50KHQsIHIudmFsdWUpXG4gICAgciA9IGl0ZXJhdG9yLm5leHQoKVxuICB9XG5cbiAgc2luay5lbmQodCwgci52YWx1ZSlcbn1cbiIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxuLyoqXG4gKiBDb21wdXRlIGEgc3RyZWFtIHVzaW5nIGFuICphc3luYyogZ2VuZXJhdG9yLCB3aGljaCB5aWVsZHMgcHJvbWlzZXNcbiAqIHRvIGNvbnRyb2wgZXZlbnQgdGltZXMuXG4gKiBAcGFyYW0gZlxuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlIChmIC8qLCAuLi5hcmdzICovKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBHZW5lcmF0ZVNvdXJjZShmLCBiYXNlLnRhaWwoYXJndW1lbnRzKSkpXG59XG5cbmZ1bmN0aW9uIEdlbmVyYXRlU291cmNlIChmLCBhcmdzKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5hcmdzID0gYXJnc1xufVxuXG5HZW5lcmF0ZVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IEdlbmVyYXRlKHRoaXMuZi5hcHBseSh2b2lkIDAsIHRoaXMuYXJncyksIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gR2VuZXJhdGUgKGl0ZXJhdG9yLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5pdGVyYXRvciA9IGl0ZXJhdG9yXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGZ1bmN0aW9uIGVyciAoZSkge1xuICAgIHNlbGYuc2luay5lcnJvcihzZWxmLnNjaGVkdWxlci5ub3coKSwgZSlcbiAgfVxuXG4gIFByb21pc2UucmVzb2x2ZSh0aGlzKS50aGVuKG5leHQpLmNhdGNoKGVycilcbn1cblxuZnVuY3Rpb24gbmV4dCAoZ2VuZXJhdGUsIHgpIHtcbiAgcmV0dXJuIGdlbmVyYXRlLmFjdGl2ZSA/IGhhbmRsZShnZW5lcmF0ZSwgZ2VuZXJhdGUuaXRlcmF0b3IubmV4dCh4KSkgOiB4XG59XG5cbmZ1bmN0aW9uIGhhbmRsZSAoZ2VuZXJhdGUsIHJlc3VsdCkge1xuICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGUuc2luay5lbmQoZ2VuZXJhdGUuc2NoZWR1bGVyLm5vdygpLCByZXN1bHQudmFsdWUpXG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdC52YWx1ZSkudGhlbihmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBlbWl0KGdlbmVyYXRlLCB4KVxuICB9LCBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlcnJvcihnZW5lcmF0ZSwgZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gZW1pdCAoZ2VuZXJhdGUsIHgpIHtcbiAgZ2VuZXJhdGUuc2luay5ldmVudChnZW5lcmF0ZS5zY2hlZHVsZXIubm93KCksIHgpXG4gIHJldHVybiBuZXh0KGdlbmVyYXRlLCB4KVxufVxuXG5mdW5jdGlvbiBlcnJvciAoZ2VuZXJhdGUsIGUpIHtcbiAgcmV0dXJuIGhhbmRsZShnZW5lcmF0ZSwgZ2VuZXJhdGUuaXRlcmF0b3IudGhyb3coZSkpXG59XG5cbkdlbmVyYXRlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5cbi8qKlxuICogQ29tcHV0ZSBhIHN0cmVhbSBieSBpdGVyYXRpdmVseSBjYWxsaW5nIGYgdG8gcHJvZHVjZSB2YWx1ZXNcbiAqIEV2ZW50IHRpbWVzIG1heSBiZSBjb250cm9sbGVkIGJ5IHJldHVybmluZyBhIFByb21pc2UgZnJvbSBmXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6KnxQcm9taXNlPCo+fSBmXG4gKiBAcGFyYW0geyp9IHggaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGUgKGYsIHgpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEl0ZXJhdGVTb3VyY2UoZiwgeCkpXG59XG5cbmZ1bmN0aW9uIEl0ZXJhdGVTb3VyY2UgKGYsIHgpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnZhbHVlID0geFxufVxuXG5JdGVyYXRlU291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBuZXcgSXRlcmF0ZSh0aGlzLmYsIHRoaXMudmFsdWUsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gSXRlcmF0ZSAoZiwgaW5pdGlhbCwgc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLmFjdGl2ZSA9IHRydWVcblxuICB2YXIgeCA9IGluaXRpYWxcblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgZnVuY3Rpb24gZXJyIChlKSB7XG4gICAgc2VsZi5zaW5rLmVycm9yKHNlbGYuc2NoZWR1bGVyLm5vdygpLCBlKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQgKGl0ZXJhdGUpIHtcbiAgICByZXR1cm4gc3RlcEl0ZXJhdGUoaXRlcmF0ZSwgeClcbiAgfVxuXG4gIFByb21pc2UucmVzb2x2ZSh0aGlzKS50aGVuKHN0YXJ0KS5jYXRjaChlcnIpXG59XG5cbkl0ZXJhdGUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gc3RlcEl0ZXJhdGUgKGl0ZXJhdGUsIHgpIHtcbiAgaXRlcmF0ZS5zaW5rLmV2ZW50KGl0ZXJhdGUuc2NoZWR1bGVyLm5vdygpLCB4KVxuXG4gIGlmICghaXRlcmF0ZS5hY3RpdmUpIHtcbiAgICByZXR1cm4geFxuICB9XG5cbiAgdmFyIGYgPSBpdGVyYXRlLmZcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmKHgpKS50aGVuKGZ1bmN0aW9uICh5KSB7XG4gICAgcmV0dXJuIGNvbnRpbnVlSXRlcmF0ZShpdGVyYXRlLCB5KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjb250aW51ZUl0ZXJhdGUgKGl0ZXJhdGUsIHgpIHtcbiAgcmV0dXJuICFpdGVyYXRlLmFjdGl2ZSA/IGl0ZXJhdGUudmFsdWUgOiBzdGVwSXRlcmF0ZShpdGVyYXRlLCB4KVxufVxuIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyZWFtIHRoYXQgZW1pdHMgdGhlIGN1cnJlbnQgdGltZSBwZXJpb2RpY2FsbHlcbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2QgcGVyaW9kaWNpdHkgb2YgZXZlbnRzIGluIG1pbGxpc1xuICogQHBhcmFtIHsqfSBkZXByZWNhdGVkVmFsdWUgQGRlcHJlY2F0ZWQgdmFsdWUgdG8gZW1pdCBlYWNoIHBlcmlvZFxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB0aGF0IGVtaXRzIHRoZSBjdXJyZW50IHRpbWUgZXZlcnkgcGVyaW9kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwZXJpb2RpYyAocGVyaW9kLCBkZXByZWNhdGVkVmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFBlcmlvZGljKHBlcmlvZCwgZGVwcmVjYXRlZFZhbHVlKSlcbn1cblxuZnVuY3Rpb24gUGVyaW9kaWMgKHBlcmlvZCwgdmFsdWUpIHtcbiAgdGhpcy5wZXJpb2QgPSBwZXJpb2RcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG59XG5cblBlcmlvZGljLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBzY2hlZHVsZXIucGVyaW9kaWModGhpcy5wZXJpb2QsIFByb3BhZ2F0ZVRhc2suZXZlbnQodGhpcy52YWx1ZSwgc2luaykpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyeUV2ZW50ICh0LCB4LCBzaW5rKSB7XG4gIHRyeSB7XG4gICAgc2luay5ldmVudCh0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cnlFbmQgKHQsIHgsIHNpbmspIHtcbiAgdHJ5IHtcbiAgICBzaW5rLmVuZCh0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5cbi8qKlxuICogQ29tcHV0ZSBhIHN0cmVhbSBieSB1bmZvbGRpbmcgdHVwbGVzIG9mIGZ1dHVyZSB2YWx1ZXMgZnJvbSBhIHNlZWQgdmFsdWVcbiAqIEV2ZW50IHRpbWVzIG1heSBiZSBjb250cm9sbGVkIGJ5IHJldHVybmluZyBhIFByb21pc2UgZnJvbSBmXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHNlZWQ6Kik6e3ZhbHVlOiosIHNlZWQ6KiwgZG9uZTpib29sZWFufXxQcm9taXNlPHt2YWx1ZToqLCBzZWVkOiosIGRvbmU6Ym9vbGVhbn0+fSBmIHVuZm9sZGluZyBmdW5jdGlvbiBhY2NlcHRzXG4gKiAgYSBzZWVkIGFuZCByZXR1cm5zIGEgbmV3IHR1cGxlIHdpdGggYSB2YWx1ZSwgbmV3IHNlZWQsIGFuZCBib29sZWFuIGRvbmUgZmxhZy5cbiAqICBJZiB0dXBsZS5kb25lIGlzIHRydWUsIHRoZSBzdHJlYW0gd2lsbCBlbmQuXG4gKiBAcGFyYW0geyp9IHNlZWQgc2VlZCB2YWx1ZVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgYWxsIHZhbHVlIG9mIGFsbCB0dXBsZXMgcHJvZHVjZWQgYnkgdGhlXG4gKiAgdW5mb2xkaW5nIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5mb2xkIChmLCBzZWVkKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBVbmZvbGRTb3VyY2UoZiwgc2VlZCkpXG59XG5cbmZ1bmN0aW9uIFVuZm9sZFNvdXJjZSAoZiwgc2VlZCkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMudmFsdWUgPSBzZWVkXG59XG5cblVuZm9sZFNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IFVuZm9sZCh0aGlzLmYsIHRoaXMudmFsdWUsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gVW5mb2xkIChmLCB4LCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuXG4gIHZhciBzZWxmID0gdGhpc1xuICBmdW5jdGlvbiBlcnIgKGUpIHtcbiAgICBzZWxmLnNpbmsuZXJyb3Ioc2VsZi5zY2hlZHVsZXIubm93KCksIGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCAodW5mb2xkKSB7XG4gICAgcmV0dXJuIHN0ZXBVbmZvbGQodW5mb2xkLCB4KVxuICB9XG5cbiAgUHJvbWlzZS5yZXNvbHZlKHRoaXMpLnRoZW4oc3RhcnQpLmNhdGNoKGVycilcbn1cblxuVW5mb2xkLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG59XG5cbmZ1bmN0aW9uIHN0ZXBVbmZvbGQgKHVuZm9sZCwgeCkge1xuICB2YXIgZiA9IHVuZm9sZC5mXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoZih4KSkudGhlbihmdW5jdGlvbiAodHVwbGUpIHtcbiAgICByZXR1cm4gY29udGludWVVbmZvbGQodW5mb2xkLCB0dXBsZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY29udGludWVVbmZvbGQgKHVuZm9sZCwgdHVwbGUpIHtcbiAgaWYgKHR1cGxlLmRvbmUpIHtcbiAgICB1bmZvbGQuc2luay5lbmQodW5mb2xkLnNjaGVkdWxlci5ub3coKSwgdHVwbGUudmFsdWUpXG4gICAgcmV0dXJuIHR1cGxlLnZhbHVlXG4gIH1cblxuICB1bmZvbGQuc2luay5ldmVudCh1bmZvbGQuc2NoZWR1bGVyLm5vdygpLCB0dXBsZS52YWx1ZSlcblxuICBpZiAoIXVuZm9sZC5hY3RpdmUpIHtcbiAgICByZXR1cm4gdHVwbGUudmFsdWVcbiAgfVxuICByZXR1cm4gc3RlcFVuZm9sZCh1bmZvbGQsIHR1cGxlLnNlZWQpXG59XG4iLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmVyICh0YXNrKSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUodGFzaykudGhlbihydW5UYXNrKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuVGFzayAodGFzaykge1xuICB0cnkge1xuICAgIHJldHVybiB0YXNrLnJ1bigpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdGFzay5lcnJvcihlKVxuICB9XG59XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5pbXBvcnQgcG9ueWZpbGwgZnJvbSAnLi9wb255ZmlsbC5qcyc7XG5cbnZhciByb290O1xuXG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gbW9kdWxlO1xufSBlbHNlIHtcbiAgcm9vdCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG59XG5cbnZhciByZXN1bHQgPSBwb255ZmlsbChyb290KTtcbmV4cG9ydCBkZWZhdWx0IHJlc3VsdDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0U3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcclxuXHRpZiAoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0dmFyIG1vZHVsZSA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxNb2R1bGUpO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImV4cG9ydHNcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9
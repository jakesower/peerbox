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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/env.json":
/*!*************************!*\
  !*** ./config/env.json ***!
  \*************************/
/*! exports provided: port, signalerHttpUri, signalerWsUri, default */
/***/ (function(module) {

module.exports = {"port":3001,"signalerHttpUri":"http://localhost:3002/","signalerWsUri":"ws://localhost:3002/"};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Peerbox Architecture
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Peerbox mediates p2p communication among users by providing a uniform API to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * widgets, setting up signaling, and all the boring parts.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * modes:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - catalog: not connected to a room
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - connected: actively using a widget with zero or more peers
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - initiating: setting up a room
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - connecting: establishing connectionPool and getting the widget
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - empty: the user is in a room with no peers and no widget
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Widgets are run in iframes and use window.postMessage to communicate with
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * peerbox. A library will be written to smooth this process.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This file is meant to be inlined with `index.html`.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _webrtc = __webpack_require__(/*! ./webrtc */ "./src/webrtc/index.js");

var _webrtc2 = _interopRequireDefault(_webrtc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var catalogElt = document.querySelector('#catalog');
  var widgetElt = document.querySelector('#widget');

  var widgetApi = {
    send: function send(m) {
      widgetElt.contentWindow.postMessage(m, '*');
    }
  };

  var state = {
    connectionPool: null,
    mode: null,
    widget: null
  };

  function transitionToMode(newMode) {
    var enterArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var exit = modes[state.mode] && modes[state.mode].exit || function () {};
    var enter = modes[newMode] && modes[newMode].enter || function () {};

    state.mode = newMode;

    exit();
    enter(enterArgs);
  }

  var modes = {
    catalog: {
      enter: function enter() {
        catalogElt.style.display = 'block';
      },
      exit: function exit() {
        catalogElt.style.display = 'none';
      }
    },

    connected: {
      enter: function enter(_ref) {
        var connectionPool = _ref.connectionPool;

        state.connectionPool = connectionPool;
        widgetElt.style.display = 'block';

        // with everything ready, cradle starts coordinating message passing

        connectionPool.messagesEmitter.on(function (m) {
          widgetApi.send(m.body);
        });

        connectionPool.peerStatusesEmitter.on(console.log);

        window.addEventListener('message', function (m) {
          connectionPool.sendToAll(m.data);
        });
      },
      exit: function exit() {
        state.connectionPool.close();
        state.connectionPool = null;
        widgetElt.style.display = 'none';
        widgetElt.source = '';
      }
    },

    connecting: {
      enter: function enter(_ref2) {
        var channelId = _ref2.channelId;

        _webrtc2.default.joinChannel(channelId).then(function (connectionPool) {
          var widgetContentP = new Promise(function (resolve) {
            widgetElt.addEventListener('load', resolve, { passive: true }); // TODO: unregiter this on load
            widgetElt.src = connectionPool.widget;
          });

          widgetContentP.then(function () {
            return transitionToMode('connected', { connectionPool: connectionPool });
          });
        });
      }
    },

    initiating: {
      enter: function enter(_ref3) {
        var widgetUri = _ref3.widgetUri;

        var widgetContentP = new Promise(function (resolve) {
          widgetElt.addEventListener('load', resolve, { passive: true }); // TODO: unregiter this on load
          widgetElt.src = widgetUri;
        });

        var connectionPoolP = _webrtc2.default.createSignaler(widgetUri);

        Promise.all([widgetContentP, connectionPoolP]).then(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              _ = _ref5[0],
              connectionPool = _ref5[1];

          history.pushState({ channel: connectionPool.channelId }, '', '/c/' + connectionPool.channelId);
          state.widget = widgetUri;
          transitionToMode('connected', { connectionPool: connectionPool, widgetUri: widgetUri });
        });
      }
    }
  };

  function init() {
    document.querySelectorAll('.widget-launcher').forEach(function (elt) {
      elt.addEventListener('click', function () {
        return transitionToMode('initiating', { widgetUri: elt.dataset.location });
      });
    });

    setModeFromUri();
  }

  function setModeFromUri() {
    var channelPattern = /^\/c\/([a-f0-9]+)$/;
    var found = document.location.pathname.match(channelPattern);
    if (found && found[1]) {
      return transitionToMode('connecting', { channelId: found[1] });
    }

    return transitionToMode('catalog');
  }

  window.onpopstate = setModeFromUri;
  init();
})();

/***/ }),

/***/ "./src/lib/emitter.js":
/*!****************************!*\
  !*** ./src/lib/emitter.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = void 0; // this is unnecessary, but helpful for debugging
  var listeners = [];
  var oneListeners = [];

  return {
    update: function update(nextState) {
      state = nextState;
      listeners.forEach(function (l) {
        return l(state);
      });
      oneListeners.forEach(function (l) {
        return l(state);
      });
      oneListeners = [];
    },
    on: function on(listener) {
      return listeners.push(listener);
    },
    once: function once(listener) {
      return oneListeners.push(listener);
    },
    off: function off(listener) {
      return listeners.filter(function (l) {
        return l !== listener;
      });
    },
    clear: function clear() {
      return listeners = [];
    },
    state: state
  };
};

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;
exports.createDispatcher = createDispatcher;
function dispatch(dispatchKey, payloadKey, dispatchers, obj) {
  return dispatchers[obj[dispatchKey]](obj[payloadKey]);
}

function createDispatcher(dispatchKey, payloadKey, dispatchers) {
  return function (obj) {
    return dispatch(dispatchKey, payloadKey, dispatchers, obj);
  };
}

/***/ }),

/***/ "./src/webrtc/connection-pool.js":
/*!***************************************!*\
  !*** ./src/webrtc/connection-pool.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (channelId) {
  return new Promise(function (resolve, _reject) {
    var peerConnections = {};
    var signalEmitters = {};
    var peerStatuses = {};

    var _emitter = (0, _emitter5.default)(),
        updatePeerConnections = _emitter.update,
        peerConnectionsEmitter = _objectWithoutProperties(_emitter, ['update']);

    var _emitter2 = (0, _emitter5.default)(),
        updatePeerStatuses = _emitter2.update,
        peerStatusesEmitter = _objectWithoutProperties(_emitter2, ['update']);

    var _emitter3 = (0, _emitter5.default)(),
        updateMessages = _emitter3.update,
        messagesEmitter = _objectWithoutProperties(_emitter3, ['update']);

    var signaler = new WebSocket(_env2.default.signalerWsUri + '/' + channelId);

    var send = function send(to, body) {
      return signaler.send(JSON.stringify({ to: to, body: body }));
    };

    // side effects-r-us
    signaler.onmessage = function (message) {
      var data = JSON.parse(message.data);
      var from = data.from,
          body = data.body;


      console.log({ receivedMessage: data });

      if (from === 'server') {
        // helper
        var makeConnection = function makeConnection(peerId) {
          signalEmitters[peerId] = (0, _emitter5.default)();
          var c = (0, _peerConnection2.default)(function (m) {
            return send(peerId, m);
          }, // sendSignal (connection -> pool)
          signalEmitters[peerId] // signalEmitter (pool -> connection)
          );
          peerConnections[peerId] = c;
          console.log(c);
          peerStatuses[peerId] = 'disconnected';
          c.messageEmitter.on(function (body) {
            return updateMessages({ body: body, from: peerId });
          }); // TODO: (small) memory leak
          c.statusEmitter.on(function (status) {
            peerStatuses[peerId] = status;
            updatePeerStatuses(peerStatuses);
          });

          updatePeerStatuses(peerStatuses);
          return c;
        };

        if (body.type === 'manifest') {
          body.peers.forEach(function (peerId) {
            var c = makeConnection(peerId);
            c.initiate();
          });

          // TODO: add sendToPeer / sendToAll
          // THIS IS THE PROMISIFIED RETURN VALUE FOR THE OVERALL FUNCTION
          resolve({
            channelId: channelId,
            messagesEmitter: messagesEmitter,
            peerConnectionsEmitter: peerConnectionsEmitter,
            peerStatusesEmitter: peerStatusesEmitter,
            sendToAll: function sendToAll(message) {
              return Object.values(peerConnections).forEach(function (c) {
                return c.sendMessage(message);
              });
            },
            sendToPeer: function sendToPeer(peerId, message) {
              return peerConnections[peerId].sendMessage(message);
            },
            widget: body.widget,
            close: function close() {
              Object.values(peerConnections).forEach(function (c) {
                return c.close();
              });
              peerConnections = {};
              signaler.close();
            }
          });

          // will this work?
          updatePeerConnections(peerConnections);
        } else if (body.type === 'peerConnected') {
          makeConnection(body.id);
          updatePeerConnections(peerConnections);
        } else if (body.type === 'peerDisconnected') {
          delete signalEmitters[body.id];
          delete peerConnections[body.id];
          delete peerStatuses[body.id];
          updatePeerConnections(peerConnections);
          updatePeerStatuses(peerStatuses);
        }
      } else {
        // data not from the signal server itself (likely a peer RTC message)
        signalEmitters[from].update(body);
      }
    };
  });
};

var _peerConnection = __webpack_require__(/*! ./peer-connection */ "./src/webrtc/peer-connection.js");

var _peerConnection2 = _interopRequireDefault(_peerConnection);

var _env = __webpack_require__(/*! ../../config/env.json */ "./config/env.json");

var _env2 = _interopRequireDefault(_env);

var _emitter4 = __webpack_require__(/*! ../lib/emitter */ "./src/lib/emitter.js");

var _emitter5 = _interopRequireDefault(_emitter4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Connection Pool manages the RTC peer connections. It is given a signaler to
 * use to coordinate the task. It provides an API to dispatch messages across
 * the connections.
 *
 * The function returns a promise that is only resolved once some basic
 * information is known--that the signaler is indeed working, that there are
 * peers, and that a widget exists.
 */

/***/ }),

/***/ "./src/webrtc/index.js":
/*!*****************************!*\
  !*** ./src/webrtc/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectionPool = __webpack_require__(/*! ./connection-pool */ "./src/webrtc/connection-pool.js");

var _connectionPool2 = _interopRequireDefault(_connectionPool);

var _env = __webpack_require__(/*! ../../config/env.json */ "./config/env.json");

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // request a new room from the server and connect to it
  function createSignaler(widgetUri) {
    // FIXME: hope that URL holds up... investigate!
    return fetch(_env2.default.signalerHttpUri + '/request-channel?widget=' + widgetUri).then(function (r) {
      return r.text();
    }).then(joinChannel);
  }

  /**
   * Handles setting up the signaler, getting an initial payload, then
   * returning a promise of a connection pool. Behold, sausage. :(
   */
  function joinChannel(channelId) {
    return (0, _connectionPool2.default)(channelId);
  }

  return {
    createSignaler: createSignaler,
    joinChannel: joinChannel
  };
}();

/***/ }),

/***/ "./src/webrtc/peer-connection.js":
/*!***************************************!*\
  !*** ./src/webrtc/peer-connection.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sendSignal, signalsEmitter) {
  var peerConnection = new RTCPeerConnection({ iceServers: [{ url: "stun://stun.ucsb.edu:3478" }] });

  var _emitter = (0, _emitter4.default)(),
      updateStatus = _emitter.update,
      statusEmitter = _objectWithoutProperties(_emitter, ['update']);

  updateStatus('disconnected');

  peerConnection.onicecandidate = function (event) {
    if (event.candidate) {
      signal('iceCandidate', { iceCandidate: event.candidate });
    }
  };

  var widgetChannel = QueuedChannel('widget');

  signalsEmitter.on((0, _utils.createDispatcher)('type', 'payload', {
    answer: handleAnswer,
    offer: handleOffer,
    iceCandidate: handleIceCandidate
  }));

  return {
    statusEmitter: statusEmitter,
    sendMessage: widgetChannel.send,
    messageEmitter: widgetChannel.messageEmitter,
    initiate: createOffer,
    close: function close() {
      peerConnection.close();peerConnection = null;
    }
  };

  function signal(type, payload) {
    sendSignal({ type: type, payload: payload });
  }

  // RTC stuff
  function handleOffer(_ref) {
    var offer = _ref.offer;

    updateStatus('handling offer');
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.createAnswer(function (answer) {
      peerConnection.setLocalDescription(answer);
      signal('answer', { answer: answer });
    }, function (err) {
      alert('something went wrong');
    });
  }

  function handleAnswer(_ref2) {
    var answer = _ref2.answer;

    updateStatus('handling answer');
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  function handleIceCandidate(_ref3) {
    var iceCandidate = _ref3.iceCandidate;

    peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
  }

  function createOffer() {
    updateStatus('connecting');
    peerConnection.createOffer(function (offer) {
      signal('offer', { offer: offer });
      peerConnection.setLocalDescription(offer);
    }, function (_err) {
      alert('something went wrong');
    });
  }

  function QueuedChannel(name) {
    var queue = [];
    var connected = false;
    // let channel = peerConnection.createDataChannel(name, { reliable: false });
    var channel = peerConnection.createDataChannel(name, { reliable: false });
    console.log('oh hai');

    var _emitter2 = (0, _emitter4.default)(),
        update = _emitter2.update,
        messageEmitter = _objectWithoutProperties(_emitter2, ['update']);

    function send(message) {
      var data = JSON.stringify(message);
      connected ? channel.send(data) : queue.push(data);
    }

    peerConnection.ondatachannel = function (chan) {
      updateStatus('data channel connected');
      console.log({ chan: chan });
      chan.channel.onmessage = function (m) {
        // console.log('got message on chan');
        // console.log(m);
        update(JSON.parse(m.data));
      };
    };

    channel.onmessage = function (m) {
      // console.log('got message');
      // console.log(m);
      update(JSON.parse(m));
    };

    channel.onopen = function () {
      updateStatus('channel open');
      // console.log(channel);
      queue.forEach(function (m) {
        return channel.send(m);
      });
      queue = [];
      connected = true;
    };

    channel.onerror = console.error;

    return { messageEmitter: messageEmitter, send: send };
  }
};

var _emitter3 = __webpack_require__(/*! ../lib/emitter */ "./src/lib/emitter.js");

var _emitter4 = _interopRequireDefault(_emitter3);

var _utils = __webpack_require__(/*! ../lib/utils */ "./src/lib/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Linked closely to the connection pool. It's given a sendSignal function and
 * an emitter for messages relevant to it. The pool will take care of making
 * sure that the right messages get to the right connections.
 */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvY29ubmVjdGlvbi1wb29sLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9wZWVyLWNvbm5lY3Rpb24uanMiXSwibmFtZXMiOlsiY2F0YWxvZ0VsdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpZGdldEVsdCIsIndpZGdldEFwaSIsInNlbmQiLCJjb250ZW50V2luZG93IiwicG9zdE1lc3NhZ2UiLCJtIiwic3RhdGUiLCJjb25uZWN0aW9uUG9vbCIsIm1vZGUiLCJ3aWRnZXQiLCJ0cmFuc2l0aW9uVG9Nb2RlIiwibmV3TW9kZSIsImVudGVyQXJncyIsImV4aXQiLCJtb2RlcyIsImVudGVyIiwiY2F0YWxvZyIsInN0eWxlIiwiZGlzcGxheSIsImNvbm5lY3RlZCIsIm1lc3NhZ2VzRW1pdHRlciIsIm9uIiwiYm9keSIsInBlZXJTdGF0dXNlc0VtaXR0ZXIiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbmRUb0FsbCIsImRhdGEiLCJjbG9zZSIsInNvdXJjZSIsImNvbm5lY3RpbmciLCJjaGFubmVsSWQiLCJjbGllbnQiLCJqb2luQ2hhbm5lbCIsInRoZW4iLCJ3aWRnZXRDb250ZW50UCIsIlByb21pc2UiLCJyZXNvbHZlIiwicGFzc2l2ZSIsInNyYyIsImluaXRpYXRpbmciLCJ3aWRnZXRVcmkiLCJjb25uZWN0aW9uUG9vbFAiLCJjcmVhdGVTaWduYWxlciIsImFsbCIsIl8iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2hhbm5lbCIsImluaXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsdCIsImRhdGFzZXQiLCJsb2NhdGlvbiIsInNldE1vZGVGcm9tVXJpIiwiY2hhbm5lbFBhdHRlcm4iLCJmb3VuZCIsInBhdGhuYW1lIiwibWF0Y2giLCJvbnBvcHN0YXRlIiwibGlzdGVuZXJzIiwib25lTGlzdGVuZXJzIiwidXBkYXRlIiwibmV4dFN0YXRlIiwibCIsInB1c2giLCJsaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJmaWx0ZXIiLCJjbGVhciIsImRpc3BhdGNoIiwiY3JlYXRlRGlzcGF0Y2hlciIsImRpc3BhdGNoS2V5IiwicGF5bG9hZEtleSIsImRpc3BhdGNoZXJzIiwib2JqIiwiX3JlamVjdCIsInBlZXJDb25uZWN0aW9ucyIsInNpZ25hbEVtaXR0ZXJzIiwicGVlclN0YXR1c2VzIiwidXBkYXRlUGVlckNvbm5lY3Rpb25zIiwicGVlckNvbm5lY3Rpb25zRW1pdHRlciIsInVwZGF0ZVBlZXJTdGF0dXNlcyIsInVwZGF0ZU1lc3NhZ2VzIiwic2lnbmFsZXIiLCJXZWJTb2NrZXQiLCJjb25maWciLCJzaWduYWxlcldzVXJpIiwidG8iLCJKU09OIiwic3RyaW5naWZ5Iiwib25tZXNzYWdlIiwibWVzc2FnZSIsInBhcnNlIiwiZnJvbSIsInJlY2VpdmVkTWVzc2FnZSIsIm1ha2VDb25uZWN0aW9uIiwicGVlcklkIiwiYyIsIm1lc3NhZ2VFbWl0dGVyIiwic3RhdHVzRW1pdHRlciIsInN0YXR1cyIsInR5cGUiLCJwZWVycyIsImluaXRpYXRlIiwiT2JqZWN0IiwidmFsdWVzIiwic2VuZE1lc3NhZ2UiLCJzZW5kVG9QZWVyIiwiaWQiLCJmZXRjaCIsInNpZ25hbGVySHR0cFVyaSIsInIiLCJ0ZXh0Iiwic2VuZFNpZ25hbCIsInNpZ25hbHNFbWl0dGVyIiwicGVlckNvbm5lY3Rpb24iLCJSVENQZWVyQ29ubmVjdGlvbiIsImljZVNlcnZlcnMiLCJ1cmwiLCJ1cGRhdGVTdGF0dXMiLCJvbmljZWNhbmRpZGF0ZSIsImV2ZW50IiwiY2FuZGlkYXRlIiwic2lnbmFsIiwiaWNlQ2FuZGlkYXRlIiwid2lkZ2V0Q2hhbm5lbCIsIlF1ZXVlZENoYW5uZWwiLCJhbnN3ZXIiLCJoYW5kbGVBbnN3ZXIiLCJvZmZlciIsImhhbmRsZU9mZmVyIiwiaGFuZGxlSWNlQ2FuZGlkYXRlIiwiY3JlYXRlT2ZmZXIiLCJwYXlsb2FkIiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJjcmVhdGVBbnN3ZXIiLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwiZXJyIiwiYWxlcnQiLCJhZGRJY2VDYW5kaWRhdGUiLCJSVENJY2VDYW5kaWRhdGUiLCJfZXJyIiwibmFtZSIsInF1ZXVlIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJyZWxpYWJsZSIsIm9uZGF0YWNoYW5uZWwiLCJjaGFuIiwib25vcGVuIiwib25lcnJvciIsImVycm9yIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5cEJDbEZBOzs7Ozs7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QUVnSSxVQUFGLEVBQVo7QUFDQUEsV0FBS3ZHLE9BQUwsQ0FBYTZDLFNBQWIsR0FBeUIsYUFBSztBQUM1QjtBQUNBO0FBQ0E5QixlQUFPNEIsS0FBS0ksS0FBTCxDQUFXNUYsRUFBRXdCLElBQWIsQ0FBUDtBQUNELE9BSkQ7QUFLRCxLQVJEOztBQVVBcUIsWUFBUTZDLFNBQVIsR0FBb0IsYUFBSztBQUN2QjtBQUNBO0FBQ0E5QixhQUFPNEIsS0FBS0ksS0FBTCxDQUFXNUYsQ0FBWCxDQUFQO0FBQ0QsS0FKRDs7QUFNQTZDLFlBQVF3RyxNQUFSLEdBQWlCLFlBQU07QUFDckI5QixtQkFBYSxjQUFiO0FBQ0E7QUFDQXlCLFlBQU1oRyxPQUFOLENBQWM7QUFBQSxlQUFLSCxRQUFRaEQsSUFBUixDQUFhRyxDQUFiLENBQUw7QUFBQSxPQUFkO0FBQ0FnSixjQUFRLEVBQVI7QUFDQWxJLGtCQUFZLElBQVo7QUFDRCxLQU5EOztBQVFBK0IsWUFBUXlHLE9BQVIsR0FBa0JuSSxRQUFRb0ksS0FBMUI7O0FBRUEsV0FBTyxFQUFFckQsOEJBQUYsRUFBa0JyRyxVQUFsQixFQUFQO0FBQ0Q7QUFDRixDOztBQTdHRDs7OztBQUNBOzs7Ozs7QUFFQSIsImZpbGUiOiJzY3JpcHRzL3BlZXJib3gtY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBQZWVyYm94IEFyY2hpdGVjdHVyZVxuICpcbiAqIFBlZXJib3ggbWVkaWF0ZXMgcDJwIGNvbW11bmljYXRpb24gYW1vbmcgdXNlcnMgYnkgcHJvdmlkaW5nIGEgdW5pZm9ybSBBUEkgdG9cbiAqIHdpZGdldHMsIHNldHRpbmcgdXAgc2lnbmFsaW5nLCBhbmQgYWxsIHRoZSBib3JpbmcgcGFydHMuXG4gKlxuICogbW9kZXM6XG4gKiAtIGNhdGFsb2c6IG5vdCBjb25uZWN0ZWQgdG8gYSByb29tXG4gKiAtIGNvbm5lY3RlZDogYWN0aXZlbHkgdXNpbmcgYSB3aWRnZXQgd2l0aCB6ZXJvIG9yIG1vcmUgcGVlcnNcbiAqIC0gaW5pdGlhdGluZzogc2V0dGluZyB1cCBhIHJvb21cbiAqIC0gY29ubmVjdGluZzogZXN0YWJsaXNoaW5nIGNvbm5lY3Rpb25Qb29sIGFuZCBnZXR0aW5nIHRoZSB3aWRnZXRcbiAqIC0gZW1wdHk6IHRoZSB1c2VyIGlzIGluIGEgcm9vbSB3aXRoIG5vIHBlZXJzIGFuZCBubyB3aWRnZXRcbiAqXG4gKiBXaWRnZXRzIGFyZSBydW4gaW4gaWZyYW1lcyBhbmQgdXNlIHdpbmRvdy5wb3N0TWVzc2FnZSB0byBjb21tdW5pY2F0ZSB3aXRoXG4gKiBwZWVyYm94LiBBIGxpYnJhcnkgd2lsbCBiZSB3cml0dGVuIHRvIHNtb290aCB0aGlzIHByb2Nlc3MuXG4gKlxuICogVGhpcyBmaWxlIGlzIG1lYW50IHRvIGJlIGlubGluZWQgd2l0aCBgaW5kZXguaHRtbGAuXG4gKi9cblxuaW1wb3J0IGNsaWVudCBmcm9tICcuL3dlYnJ0Yyc7XG5cbihmdW5jdGlvbigpIHtcbiAgY29uc3QgY2F0YWxvZ0VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXRhbG9nJyk7XG4gIGNvbnN0IHdpZGdldEVsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aWRnZXQnKTtcblxuICBjb25zdCB3aWRnZXRBcGkgPSB7XG4gICAgc2VuZDogbSA9PiB7XG4gICAgICB3aWRnZXRFbHQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtLCAnKicpXG4gICAgfVxuICB9O1xuXG4gIGxldCBzdGF0ZSA9IHtcbiAgICBjb25uZWN0aW9uUG9vbDogbnVsbCxcbiAgICBtb2RlOiBudWxsLFxuICAgIHdpZGdldDogbnVsbCxcbiAgfTtcblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uVG9Nb2RlKG5ld01vZGUsIGVudGVyQXJncyA9IHt9KSB7XG4gICAgY29uc3QgZXhpdCA9IChtb2Rlc1tzdGF0ZS5tb2RlXSAmJiBtb2Rlc1tzdGF0ZS5tb2RlXS5leGl0KSB8fCAoKCkgPT4ge30pO1xuICAgIGNvbnN0IGVudGVyID0gKG1vZGVzW25ld01vZGVdICYmIG1vZGVzW25ld01vZGVdLmVudGVyKSB8fCAoKCkgPT4ge30pO1xuXG4gICAgc3RhdGUubW9kZSA9IG5ld01vZGU7XG5cbiAgICBleGl0KCk7XG4gICAgZW50ZXIoZW50ZXJBcmdzKTtcbiAgfVxuXG4gIGNvbnN0IG1vZGVzID0ge1xuICAgIGNhdGFsb2c6IHtcbiAgICAgIGVudGVyOiAoKSA9PiB7XG4gICAgICAgIGNhdGFsb2dFbHQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9LFxuICAgICAgZXhpdDogKCkgPT4ge1xuICAgICAgICBjYXRhbG9nRWx0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbm5lY3RlZDoge1xuICAgICAgZW50ZXI6ICh7IGNvbm5lY3Rpb25Qb29sIH0pID0+IHtcbiAgICAgICAgc3RhdGUuY29ubmVjdGlvblBvb2wgPSBjb25uZWN0aW9uUG9vbDtcbiAgICAgICAgd2lkZ2V0RWx0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIC8vIHdpdGggZXZlcnl0aGluZyByZWFkeSwgY3JhZGxlIHN0YXJ0cyBjb29yZGluYXRpbmcgbWVzc2FnZSBwYXNzaW5nXG5cbiAgICAgICAgY29ubmVjdGlvblBvb2wubWVzc2FnZXNFbWl0dGVyLm9uKG0gPT4ge1xuICAgICAgICAgIHdpZGdldEFwaS5zZW5kKG0uYm9keSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbm5lY3Rpb25Qb29sLnBlZXJTdGF0dXNlc0VtaXR0ZXIub24oY29uc29sZS5sb2cpXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtID0+IHtcbiAgICAgICAgICBjb25uZWN0aW9uUG9vbC5zZW5kVG9BbGwobS5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXhpdDogKCkgPT4ge1xuICAgICAgICBzdGF0ZS5jb25uZWN0aW9uUG9vbC5jbG9zZSgpO1xuICAgICAgICBzdGF0ZS5jb25uZWN0aW9uUG9vbCA9IG51bGw7XG4gICAgICAgIHdpZGdldEVsdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB3aWRnZXRFbHQuc291cmNlID0gJyc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbm5lY3Rpbmc6IHtcbiAgICAgIGVudGVyOiAoeyBjaGFubmVsSWQgfSkgPT4ge1xuICAgICAgICBjbGllbnQuam9pbkNoYW5uZWwoY2hhbm5lbElkKVxuICAgICAgICAgIC50aGVuKGNvbm5lY3Rpb25Qb29sID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldENvbnRlbnRQID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgIHdpZGdldEVsdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSwgeyBwYXNzaXZlOiB0cnVlIH0pOyAvLyBUT0RPOiB1bnJlZ2l0ZXIgdGhpcyBvbiBsb2FkXG4gICAgICAgICAgICAgIHdpZGdldEVsdC5zcmMgPSBjb25uZWN0aW9uUG9vbC53aWRnZXQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2lkZ2V0Q29udGVudFAudGhlbigoKSA9PiB0cmFuc2l0aW9uVG9Nb2RlKCdjb25uZWN0ZWQnLCB7IGNvbm5lY3Rpb25Qb29sIH0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdGlhdGluZzoge1xuICAgICAgZW50ZXI6ICh7IHdpZGdldFVyaSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHdpZGdldENvbnRlbnRQID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgd2lkZ2V0RWx0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlLCB7IHBhc3NpdmU6IHRydWUgfSk7IC8vIFRPRE86IHVucmVnaXRlciB0aGlzIG9uIGxvYWRcbiAgICAgICAgICB3aWRnZXRFbHQuc3JjID0gd2lkZ2V0VXJpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uUG9vbFAgPSBjbGllbnQuY3JlYXRlU2lnbmFsZXIod2lkZ2V0VXJpKTtcblxuICAgICAgICBQcm9taXNlLmFsbChbd2lkZ2V0Q29udGVudFAsIGNvbm5lY3Rpb25Qb29sUF0pLnRoZW4oKFtfLCBjb25uZWN0aW9uUG9vbF0pID0+IHtcbiAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IGNoYW5uZWw6IGNvbm5lY3Rpb25Qb29sLmNoYW5uZWxJZCB9LCAnJywgJy9jLycrY29ubmVjdGlvblBvb2wuY2hhbm5lbElkKTtcbiAgICAgICAgICBzdGF0ZS53aWRnZXQgPSB3aWRnZXRVcmk7XG4gICAgICAgICAgdHJhbnNpdGlvblRvTW9kZSgnY29ubmVjdGVkJywgeyBjb25uZWN0aW9uUG9vbCwgd2lkZ2V0VXJpIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53aWRnZXQtbGF1bmNoZXInKS5mb3JFYWNoKChlbHQpID0+IHtcbiAgICAgIGVsdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRyYW5zaXRpb25Ub01vZGUoJ2luaXRpYXRpbmcnLCB7IHdpZGdldFVyaTogZWx0LmRhdGFzZXQubG9jYXRpb24gfSkpXG4gICAgfSk7XG5cbiAgICBzZXRNb2RlRnJvbVVyaSgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBzZXRNb2RlRnJvbVVyaSgpIHtcbiAgICBjb25zdCBjaGFubmVsUGF0dGVybiA9IC9eXFwvY1xcLyhbYS1mMC05XSspJC87XG4gICAgY29uc3QgZm91bmQgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaChjaGFubmVsUGF0dGVybik7XG4gICAgaWYgKGZvdW5kICYmIGZvdW5kWzFdKSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvblRvTW9kZSgnY29ubmVjdGluZycsIHsgY2hhbm5lbElkOiBmb3VuZFsxXSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNpdGlvblRvTW9kZSgnY2F0YWxvZycpO1xuICB9XG5cbiAgd2luZG93Lm9ucG9wc3RhdGUgPSBzZXRNb2RlRnJvbVVyaTtcbiAgaW5pdCgpO1xuXG59KCkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgc3RhdGU7IC8vIHRoaXMgaXMgdW5uZWNlc3NhcnksIGJ1dCBoZWxwZnVsIGZvciBkZWJ1Z2dpbmdcbiAgbGV0IGxpc3RlbmVycyA9IFtdO1xuICBsZXQgb25lTGlzdGVuZXJzID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IG5leHRTdGF0ZSA9PiB7XG4gICAgICBzdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbChzdGF0ZSkpO1xuICAgICAgb25lTGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHN0YXRlKSk7XG4gICAgICBvbmVMaXN0ZW5lcnMgPSBbXTtcbiAgICB9LFxuICAgIG9uOiBsaXN0ZW5lciA9PiBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lciksXG4gICAgb25jZTogbGlzdGVuZXIgPT4gb25lTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpLFxuICAgIG9mZjogbGlzdGVuZXIgPT4gbGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKSxcbiAgICBjbGVhcjogKCkgPT4gbGlzdGVuZXJzID0gW10sXG4gICAgc3RhdGUsXG4gIH07XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goZGlzcGF0Y2hLZXksIHBheWxvYWRLZXksIGRpc3BhdGNoZXJzLCBvYmopIHtcbiAgcmV0dXJuIGRpc3BhdGNoZXJzW29ialtkaXNwYXRjaEtleV1dKG9ialtwYXlsb2FkS2V5XSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpc3BhdGNoZXIoZGlzcGF0Y2hLZXksIHBheWxvYWRLZXksIGRpc3BhdGNoZXJzKSB7XG4gIHJldHVybiBvYmogPT4gZGlzcGF0Y2goZGlzcGF0Y2hLZXksIHBheWxvYWRLZXksIGRpc3BhdGNoZXJzLCBvYmopO1xufVxuIiwiaW1wb3J0IFBlZXJDb25uZWN0aW9uIGZyb20gJy4vcGVlci1jb25uZWN0aW9uJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL2Vudi5qc29uJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2xpYi9lbWl0dGVyJztcblxuLyoqXG4gKiBDb25uZWN0aW9uIFBvb2wgbWFuYWdlcyB0aGUgUlRDIHBlZXIgY29ubmVjdGlvbnMuIEl0IGlzIGdpdmVuIGEgc2lnbmFsZXIgdG9cbiAqIHVzZSB0byBjb29yZGluYXRlIHRoZSB0YXNrLiBJdCBwcm92aWRlcyBhbiBBUEkgdG8gZGlzcGF0Y2ggbWVzc2FnZXMgYWNyb3NzXG4gKiB0aGUgY29ubmVjdGlvbnMuXG4gKlxuICogVGhlIGZ1bmN0aW9uIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgb25seSByZXNvbHZlZCBvbmNlIHNvbWUgYmFzaWNcbiAqIGluZm9ybWF0aW9uIGlzIGtub3duLS10aGF0IHRoZSBzaWduYWxlciBpcyBpbmRlZWQgd29ya2luZywgdGhhdCB0aGVyZSBhcmVcbiAqIHBlZXJzLCBhbmQgdGhhdCBhIHdpZGdldCBleGlzdHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjaGFubmVsSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgbGV0IHBlZXJDb25uZWN0aW9ucyA9IHt9O1xuICAgIGxldCBzaWduYWxFbWl0dGVycyA9IHt9O1xuICAgIGxldCBwZWVyU3RhdHVzZXMgPSB7fTtcbiAgICBsZXQgeyB1cGRhdGU6IHVwZGF0ZVBlZXJDb25uZWN0aW9ucywgLi4ucGVlckNvbm5lY3Rpb25zRW1pdHRlciB9ID0gZW1pdHRlcigpO1xuICAgIGxldCB7IHVwZGF0ZTogdXBkYXRlUGVlclN0YXR1c2VzLCAuLi5wZWVyU3RhdHVzZXNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gICAgbGV0IHsgdXBkYXRlOiB1cGRhdGVNZXNzYWdlcywgLi4ubWVzc2FnZXNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gICAgY29uc3Qgc2lnbmFsZXIgPSBuZXcgV2ViU29ja2V0KGNvbmZpZy5zaWduYWxlcldzVXJpICsgJy8nICsgY2hhbm5lbElkKTtcblxuICAgIGNvbnN0IHNlbmQgPSAodG8sIGJvZHkpID0+IHNpZ25hbGVyLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0bywgYm9keSB9KSk7XG5cbiAgICAvLyBzaWRlIGVmZmVjdHMtci11c1xuICAgIHNpZ25hbGVyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgICAgY29uc3QgeyBmcm9tLCBib2R5IH0gPSBkYXRhO1xuXG4gICAgICBjb25zb2xlLmxvZyh7IHJlY2VpdmVkTWVzc2FnZTogZGF0YSB9KTtcblxuICAgICAgaWYgKGZyb20gPT09ICdzZXJ2ZXInKSB7XG4gICAgICAgIC8vIGhlbHBlclxuICAgICAgICBjb25zdCBtYWtlQ29ubmVjdGlvbiA9IHBlZXJJZCA9PiB7XG4gICAgICAgICAgc2lnbmFsRW1pdHRlcnNbcGVlcklkXSA9IGVtaXR0ZXIoKTtcbiAgICAgICAgICBjb25zdCBjID0gUGVlckNvbm5lY3Rpb24oXG4gICAgICAgICAgICBtID0+IHNlbmQocGVlcklkLCBtKSwgICAvLyBzZW5kU2lnbmFsIChjb25uZWN0aW9uIC0+IHBvb2wpXG4gICAgICAgICAgICBzaWduYWxFbWl0dGVyc1twZWVySWRdLCAvLyBzaWduYWxFbWl0dGVyIChwb29sIC0+IGNvbm5lY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwZWVyQ29ubmVjdGlvbnNbcGVlcklkXSA9IGM7XG4gICAgICAgICAgY29uc29sZS5sb2coYylcbiAgICAgICAgICBwZWVyU3RhdHVzZXNbcGVlcklkXSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgICAgICAgIGMubWVzc2FnZUVtaXR0ZXIub24oYm9keSA9PiB1cGRhdGVNZXNzYWdlcyh7IGJvZHksIGZyb206IHBlZXJJZCB9KSk7IC8vIFRPRE86IChzbWFsbCkgbWVtb3J5IGxlYWtcbiAgICAgICAgICBjLnN0YXR1c0VtaXR0ZXIub24oc3RhdHVzID0+IHtcbiAgICAgICAgICAgIHBlZXJTdGF0dXNlc1twZWVySWRdID0gc3RhdHVzO1xuICAgICAgICAgICAgdXBkYXRlUGVlclN0YXR1c2VzKHBlZXJTdGF0dXNlcyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB1cGRhdGVQZWVyU3RhdHVzZXMocGVlclN0YXR1c2VzKTtcbiAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYm9keS50eXBlID09PSAnbWFuaWZlc3QnKSB7XG4gICAgICAgICAgYm9keS5wZWVycy5mb3JFYWNoKHBlZXJJZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjID0gbWFrZUNvbm5lY3Rpb24ocGVlcklkKTtcbiAgICAgICAgICAgIGMuaW5pdGlhdGUoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFRPRE86IGFkZCBzZW5kVG9QZWVyIC8gc2VuZFRvQWxsXG4gICAgICAgICAgLy8gVEhJUyBJUyBUSEUgUFJPTUlTSUZJRUQgUkVUVVJOIFZBTFVFIEZPUiBUSEUgT1ZFUkFMTCBGVU5DVElPTlxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbElkLFxuICAgICAgICAgICAgbWVzc2FnZXNFbWl0dGVyLFxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25zRW1pdHRlcixcbiAgICAgICAgICAgIHBlZXJTdGF0dXNlc0VtaXR0ZXIsXG4gICAgICAgICAgICBzZW5kVG9BbGw6IG1lc3NhZ2UgPT4gT2JqZWN0LnZhbHVlcyhwZWVyQ29ubmVjdGlvbnMpLmZvckVhY2goYyA9PiBjLnNlbmRNZXNzYWdlKG1lc3NhZ2UpKSxcbiAgICAgICAgICAgIHNlbmRUb1BlZXI6IChwZWVySWQsIG1lc3NhZ2UpID0+IHBlZXJDb25uZWN0aW9uc1twZWVySWRdLnNlbmRNZXNzYWdlKG1lc3NhZ2UpLFxuICAgICAgICAgICAgd2lkZ2V0OiBib2R5LndpZGdldCxcbiAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMocGVlckNvbm5lY3Rpb25zKS5mb3JFYWNoKGMgPT4gYy5jbG9zZSgpKTtcbiAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25zID0ge307XG4gICAgICAgICAgICAgIHNpZ25hbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gd2lsbCB0aGlzIHdvcms/XG4gICAgICAgICAgdXBkYXRlUGVlckNvbm5lY3Rpb25zKHBlZXJDb25uZWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9keS50eXBlID09PSAncGVlckNvbm5lY3RlZCcpIHtcbiAgICAgICAgICBtYWtlQ29ubmVjdGlvbihib2R5LmlkKTtcbiAgICAgICAgICB1cGRhdGVQZWVyQ29ubmVjdGlvbnMocGVlckNvbm5lY3Rpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2R5LnR5cGUgPT09ICdwZWVyRGlzY29ubmVjdGVkJykge1xuICAgICAgICAgIGRlbGV0ZSBzaWduYWxFbWl0dGVyc1tib2R5LmlkXTtcbiAgICAgICAgICBkZWxldGUgcGVlckNvbm5lY3Rpb25zW2JvZHkuaWRdO1xuICAgICAgICAgIGRlbGV0ZSBwZWVyU3RhdHVzZXNbYm9keS5pZF07XG4gICAgICAgICAgdXBkYXRlUGVlckNvbm5lY3Rpb25zKHBlZXJDb25uZWN0aW9ucyk7XG4gICAgICAgICAgdXBkYXRlUGVlclN0YXR1c2VzKHBlZXJTdGF0dXNlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgeyAvLyBkYXRhIG5vdCBmcm9tIHRoZSBzaWduYWwgc2VydmVyIGl0c2VsZiAobGlrZWx5IGEgcGVlciBSVEMgbWVzc2FnZSlcbiAgICAgICAgc2lnbmFsRW1pdHRlcnNbZnJvbV0udXBkYXRlKGJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgQ29ubmVjdGlvblBvb2wgZnJvbSAnLi9jb25uZWN0aW9uLXBvb2wnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvZW52Lmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XG4gIC8vIHJlcXVlc3QgYSBuZXcgcm9vbSBmcm9tIHRoZSBzZXJ2ZXIgYW5kIGNvbm5lY3QgdG8gaXRcbiAgZnVuY3Rpb24gY3JlYXRlU2lnbmFsZXIod2lkZ2V0VXJpKSB7XG4gICAgLy8gRklYTUU6IGhvcGUgdGhhdCBVUkwgaG9sZHMgdXAuLi4gaW52ZXN0aWdhdGUhXG4gICAgcmV0dXJuIGZldGNoKGNvbmZpZy5zaWduYWxlckh0dHBVcmkgKyAnL3JlcXVlc3QtY2hhbm5lbD93aWRnZXQ9JyArIHdpZGdldFVyaSlcbiAgICAgIC50aGVuKHIgPT4gci50ZXh0KCkpXG4gICAgICAudGhlbihqb2luQ2hhbm5lbCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBzZXR0aW5nIHVwIHRoZSBzaWduYWxlciwgZ2V0dGluZyBhbiBpbml0aWFsIHBheWxvYWQsIHRoZW5cbiAgICogcmV0dXJuaW5nIGEgcHJvbWlzZSBvZiBhIGNvbm5lY3Rpb24gcG9vbC4gQmVob2xkLCBzYXVzYWdlLiA6KFxuICAgKi9cbiAgZnVuY3Rpb24gam9pbkNoYW5uZWwoY2hhbm5lbElkKSB7XG4gICAgcmV0dXJuIENvbm5lY3Rpb25Qb29sKGNoYW5uZWxJZCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVNpZ25hbGVyLFxuICAgIGpvaW5DaGFubmVsLFxuICB9O1xufSgpKTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2xpYi9lbWl0dGVyJztcbmltcG9ydCB7IGNyZWF0ZURpc3BhdGNoZXIgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuXG4vKipcbiAqIExpbmtlZCBjbG9zZWx5IHRvIHRoZSBjb25uZWN0aW9uIHBvb2wuIEl0J3MgZ2l2ZW4gYSBzZW5kU2lnbmFsIGZ1bmN0aW9uIGFuZFxuICogYW4gZW1pdHRlciBmb3IgbWVzc2FnZXMgcmVsZXZhbnQgdG8gaXQuIFRoZSBwb29sIHdpbGwgdGFrZSBjYXJlIG9mIG1ha2luZ1xuICogc3VyZSB0aGF0IHRoZSByaWdodCBtZXNzYWdlcyBnZXQgdG8gdGhlIHJpZ2h0IGNvbm5lY3Rpb25zLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZW5kU2lnbmFsLCBzaWduYWxzRW1pdHRlcikge1xuICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oeyBpY2VTZXJ2ZXJzOiBbeyB1cmw6IFwic3R1bjovL3N0dW4udWNzYi5lZHU6MzQ3OFwiIH1dIH0pO1xuICBsZXQgeyB1cGRhdGU6IHVwZGF0ZVN0YXR1cywgLi4uc3RhdHVzRW1pdHRlciB9ID0gZW1pdHRlcigpO1xuICB1cGRhdGVTdGF0dXMoJ2Rpc2Nvbm5lY3RlZCcpO1xuXG4gIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7IGlmIChldmVudC5jYW5kaWRhdGUpIHsgc2lnbmFsKCdpY2VDYW5kaWRhdGUnLCB7IGljZUNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlIH0pOyB9fVxuXG4gIGNvbnN0IHdpZGdldENoYW5uZWwgPSBRdWV1ZWRDaGFubmVsKCd3aWRnZXQnKTtcblxuICBzaWduYWxzRW1pdHRlci5vbihjcmVhdGVEaXNwYXRjaGVyKCd0eXBlJywgJ3BheWxvYWQnLCB7XG4gICAgYW5zd2VyOiBoYW5kbGVBbnN3ZXIsXG4gICAgb2ZmZXI6IGhhbmRsZU9mZmVyLFxuICAgIGljZUNhbmRpZGF0ZTogaGFuZGxlSWNlQ2FuZGlkYXRlLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNFbWl0dGVyLFxuICAgIHNlbmRNZXNzYWdlOiB3aWRnZXRDaGFubmVsLnNlbmQsXG4gICAgbWVzc2FnZUVtaXR0ZXI6IHdpZGdldENoYW5uZWwubWVzc2FnZUVtaXR0ZXIsXG4gICAgaW5pdGlhdGU6IGNyZWF0ZU9mZmVyLFxuICAgIGNsb3NlOiAoKSA9PiB7IHBlZXJDb25uZWN0aW9uLmNsb3NlKCk7IHBlZXJDb25uZWN0aW9uID0gbnVsbDsgfVxuICB9O1xuXG5cbiAgZnVuY3Rpb24gc2lnbmFsKHR5cGUsIHBheWxvYWQpIHtcbiAgICBzZW5kU2lnbmFsKHsgdHlwZSwgcGF5bG9hZCB9KTtcbiAgfVxuXG4gIC8vIFJUQyBzdHVmZlxuICBmdW5jdGlvbiBoYW5kbGVPZmZlcih7IG9mZmVyIH0pIHtcbiAgICB1cGRhdGVTdGF0dXMoJ2hhbmRsaW5nIG9mZmVyJyk7XG4gICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihvZmZlcikpO1xuICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcihmdW5jdGlvbiAoYW5zd2VyKSB7XG4gICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGFuc3dlcik7XG4gICAgICBzaWduYWwoJ2Fuc3dlcicsIHsgYW5zd2VyOiBhbnN3ZXIgfSk7XG4gICAgfSwgZnVuY3Rpb24gKGVycikgeyBhbGVydCgnc29tZXRoaW5nIHdlbnQgd3JvbmcnKSB9KTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaGFuZGxlQW5zd2VyKHsgYW5zd2VyIH0pIHtcbiAgICB1cGRhdGVTdGF0dXMoJ2hhbmRsaW5nIGFuc3dlcicpO1xuICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oYW5zd2VyKSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGhhbmRsZUljZUNhbmRpZGF0ZSh7IGljZUNhbmRpZGF0ZSB9KSB7XG4gICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlKSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9mZmVyKCkge1xuICAgIHVwZGF0ZVN0YXR1cygnY29ubmVjdGluZycpO1xuICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKGZ1bmN0aW9uIChvZmZlcikge1xuICAgICAgc2lnbmFsKCdvZmZlcicsIHsgb2ZmZXI6IG9mZmVyIH0pO1xuICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XG4gICAgfSwgZnVuY3Rpb24gKF9lcnIpIHsgYWxlcnQoJ3NvbWV0aGluZyB3ZW50IHdyb25nJykgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBRdWV1ZWRDaGFubmVsKG5hbWUpIHtcbiAgICBsZXQgcXVldWUgPSBbXTtcbiAgICBsZXQgY29ubmVjdGVkID0gZmFsc2U7XG4gICAgLy8gbGV0IGNoYW5uZWwgPSBwZWVyQ29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbChuYW1lLCB7IHJlbGlhYmxlOiBmYWxzZSB9KTtcbiAgICBsZXQgY2hhbm5lbCA9IHBlZXJDb25uZWN0aW9uLmNyZWF0ZURhdGFDaGFubmVsKG5hbWUsIHsgcmVsaWFibGU6IGZhbHNlIH0pO1xuICAgIGNvbnNvbGUubG9nKCdvaCBoYWknKVxuXG4gICAgbGV0IHsgdXBkYXRlLCAuLi5tZXNzYWdlRW1pdHRlciB9ID0gZW1pdHRlcigpO1xuXG4gICAgZnVuY3Rpb24gc2VuZChtZXNzYWdlKSB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gICAgICBjb25uZWN0ZWQgPyBjaGFubmVsLnNlbmQoZGF0YSkgOiBxdWV1ZS5wdXNoKGRhdGEpO1xuICAgIH1cblxuICAgIHBlZXJDb25uZWN0aW9uLm9uZGF0YWNoYW5uZWwgPSBjaGFuID0+IHtcbiAgICAgIHVwZGF0ZVN0YXR1cygnZGF0YSBjaGFubmVsIGNvbm5lY3RlZCcpO1xuICAgICAgY29uc29sZS5sb2coeyBjaGFuIH0pXG4gICAgICBjaGFuLmNoYW5uZWwub25tZXNzYWdlID0gbSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdnb3QgbWVzc2FnZSBvbiBjaGFuJyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG0pO1xuICAgICAgICB1cGRhdGUoSlNPTi5wYXJzZShtLmRhdGEpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFubmVsLm9ubWVzc2FnZSA9IG0gPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2dvdCBtZXNzYWdlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhtKTtcbiAgICAgIHVwZGF0ZShKU09OLnBhcnNlKG0pKTtcbiAgICB9XG5cbiAgICBjaGFubmVsLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIHVwZGF0ZVN0YXR1cygnY2hhbm5lbCBvcGVuJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjaGFubmVsKTtcbiAgICAgIHF1ZXVlLmZvckVhY2gobSA9PiBjaGFubmVsLnNlbmQobSkpO1xuICAgICAgcXVldWUgPSBbXTtcbiAgICAgIGNvbm5lY3RlZCA9IHRydWU7XG4gICAgfTtcblxuICAgIGNoYW5uZWwub25lcnJvciA9IGNvbnNvbGUuZXJyb3I7XG5cbiAgICByZXR1cm4geyBtZXNzYWdlRW1pdHRlciwgc2VuZCB9O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
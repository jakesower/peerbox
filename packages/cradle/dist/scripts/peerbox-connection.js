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

module.exports = {"port":3001,"signalerHttpUri":"https://peerbox.jakesower.com/signaler","signalerWsUri":"wss://peerbox.jakesower.com/signaler/ws"};

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
  console.log('hhh');
  var widgetChannel = void 0;
  var peerConnection = new RTCPeerConnection({ iceServers: [{ url: "stun://stun.ucsb.edu:3478" }] });

  var _emitter = (0, _emitter4.default)(),
      updateStatus = _emitter.update,
      statusEmitter = _objectWithoutProperties(_emitter, ['update']);

  var _emitter2 = (0, _emitter4.default)(),
      updateMessage = _emitter2.update,
      messageEmitter = _objectWithoutProperties(_emitter2, ['update']);

  updateStatus('disconnected');

  peerConnection.onicecandidate = function (event) {
    if (event.candidate) {
      signal('iceCandidate', { iceCandidate: event.candidate });
    }
  };

  signalsEmitter.on((0, _utils.createDispatcher)('type', 'payload', {
    answer: handleAnswer,
    offer: handleOffer,
    iceCandidate: handleIceCandidate
  }));

  return {
    statusEmitter: statusEmitter,
    sendMessage: function sendMessage(m) {
      return widgetChannel.send(JSON.stringify(m));
    },
    messageEmitter: messageEmitter,
    initiate: createOffer,
    close: function close() {
      peerConnection.close();peerConnection = null;
    }
  };

  function signal(type, payload) {
    sendSignal({ type: type, payload: payload });
  }

  // RTC stuff

  /**
   * This means that this end is being contacted by a peer looking to set up a
   * new connection. Setup for the receiving end.
   */
  function handleOffer(_ref) {
    var offer = _ref.offer;

    updateStatus('handling offer');
    peerConnection.ondatachannel = function (ev) {
      return setChannel(ev.channel);
    };

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
    setChannel(peerConnection.createDataChannel('widget', { reliable: false }));
    peerConnection.createOffer(function (offer) {
      signal('offer', { offer: offer });
      peerConnection.setLocalDescription(offer);
    }, function (_err) {
      alert('something went wrong');
    });
  }

  function setChannel(ch) {
    widgetChannel = ch;

    widgetChannel.onmessage = function (m) {
      updateMessage(JSON.parse(m.data));
    };

    widgetChannel.onopen = function () {
      updateStatus('channel open');
      console.log('ay papi');
    };

    widgetChannel.onerror = console.error;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvY29ubmVjdGlvbi1wb29sLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9wZWVyLWNvbm5lY3Rpb24uanMiXSwibmFtZXMiOlsiY2F0YWxvZ0VsdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpZGdldEVsdCIsIndpZGdldEFwaSIsInNlbmQiLCJjb250ZW50V2luZG93IiwicG9zdE1lc3NhZ2UiLCJtIiwic3RhdGUiLCJjb25uZWN0aW9uUG9vbCIsIm1vZGUiLCJ3aWRnZXQiLCJ0cmFuc2l0aW9uVG9Nb2RlIiwibmV3TW9kZSIsImVudGVyQXJncyIsImV4aXQiLCJtb2RlcyIsImVudGVyIiwiY2F0YWxvZyIsInN0eWxlIiwiZGlzcGxheSIsImNvbm5lY3RlZCIsIm1lc3NhZ2VzRW1pdHRlciIsIm9uIiwiYm9keSIsInBlZXJTdGF0dXNlc0VtaXR0ZXIiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbmRUb0FsbCIsImRhdGEiLCJjbG9zZSIsInNvdXJjZSIsImNvbm5lY3RpbmciLCJjaGFubmVsSWQiLCJjbGllbnQiLCJqb2luQ2hhbm5lbCIsInRoZW4iLCJ3aWRnZXRDb250ZW50UCIsIlByb21pc2UiLCJyZXNvbHZlIiwicGFzc2l2ZSIsInNyYyIsImluaXRpYXRpbmciLCJ3aWRnZXRVcmkiLCJjb25uZWN0aW9uUG9vbFAiLCJjcmVhdGVTaWduYWxlciIsImFsbCIsIl8iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2hhbm5lbCIsImluaXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsdCIsImRhdGFzZXQiLCJsb2NhdGlvbiIsInNldE1vZGVGcm9tVXJpIiwiY2hhbm5lbFBhdHRlcm4iLCJmb3VuZCIsInBhdGhuYW1lIiwibWF0Y2giLCJvbnBvcHN0YXRlIiwibGlzdGVuZXJzIiwib25lTGlzdGVuZXJzIiwidXBkYXRlIiwibmV4dFN0YXRlIiwibCIsInB1c2giLCJsaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJmaWx0ZXIiLCJjbGVhciIsImRpc3BhdGNoIiwiY3JlYXRlRGlzcGF0Y2hlciIsImRpc3BhdGNoS2V5IiwicGF5bG9hZEtleSIsImRpc3BhdGNoZXJzIiwib2JqIiwiX3JlamVjdCIsInBlZXJDb25uZWN0aW9ucyIsInNpZ25hbEVtaXR0ZXJzIiwicGVlclN0YXR1c2VzIiwidXBkYXRlUGVlckNvbm5lY3Rpb25zIiwicGVlckNvbm5lY3Rpb25zRW1pdHRlciIsInVwZGF0ZVBlZXJTdGF0dXNlcyIsInVwZGF0ZU1lc3NhZ2VzIiwic2lnbmFsZXIiLCJXZWJTb2NrZXQiLCJjb25maWciLCJzaWduYWxlcldzVXJpIiwidG8iLCJKU09OIiwic3RyaW5naWZ5Iiwib25tZXNzYWdlIiwibWVzc2FnZSIsInBhcnNlIiwiZnJvbSIsInJlY2VpdmVkTWVzc2FnZSIsIm1ha2VDb25uZWN0aW9uIiwicGVlcklkIiwiYyIsIm1lc3NhZ2VFbWl0dGVyIiwic3RhdHVzRW1pdHRlciIsInN0YXR1cyIsInR5cGUiLCJwZWVycyIsImluaXRpYXRlIiwiT2JqZWN0IiwidmFsdWVzIiwic2VuZE1lc3NhZ2UiLCJzZW5kVG9QZWVyIiwiaWQiLCJmZXRjaCIsInNpZ25hbGVySHR0cFVyaSIsInIiLCJ0ZXh0Iiwic2VuZFNpZ25hbCIsInNpZ25hbHNFbWl0dGVyIiwid2lkZ2V0Q2hhbm5lbCIsInBlZXJDb25uZWN0aW9uIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJpY2VTZXJ2ZXJzIiwidXJsIiwidXBkYXRlU3RhdHVzIiwidXBkYXRlTWVzc2FnZSIsIm9uaWNlY2FuZGlkYXRlIiwiZXZlbnQiLCJjYW5kaWRhdGUiLCJzaWduYWwiLCJpY2VDYW5kaWRhdGUiLCJhbnN3ZXIiLCJoYW5kbGVBbnN3ZXIiLCJvZmZlciIsImhhbmRsZU9mZmVyIiwiaGFuZGxlSWNlQ2FuZGlkYXRlIiwiY3JlYXRlT2ZmZXIiLCJwYXlsb2FkIiwib25kYXRhY2hhbm5lbCIsInNldENoYW5uZWwiLCJldiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsImVyciIsImFsZXJ0IiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJyZWxpYWJsZSIsIl9lcnIiLCJjaCIsIm9ub3BlbiIsIm9uZXJyb3IiLCJlcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eXBCQ2xGQTs7Ozs7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QUFDRCxLQUhEOztBQUtBK0Ysa0JBQWNtQyxPQUFkLEdBQXdCbkksUUFBUW9JLEtBQWhDO0FBQ0Q7QUFDRixDOztBQTNGRDs7OztBQUNBOzs7Ozs7QUFFQSIsImZpbGUiOiJzY3JpcHRzL3BlZXJib3gtY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBQZWVyYm94IEFyY2hpdGVjdHVyZVxuICpcbiAqIFBlZXJib3ggbWVkaWF0ZXMgcDJwIGNvbW11bmljYXRpb24gYW1vbmcgdXNlcnMgYnkgcHJvdmlkaW5nIGEgdW5pZm9ybSBBUEkgdG9cbiAqIHdpZGdldHMsIHNldHRpbmcgdXAgc2lnbmFsaW5nLCBhbmQgYWxsIHRoZSBib3JpbmcgcGFydHMuXG4gKlxuICogbW9kZXM6XG4gKiAtIGNhdGFsb2c6IG5vdCBjb25uZWN0ZWQgdG8gYSByb29tXG4gKiAtIGNvbm5lY3RlZDogYWN0aXZlbHkgdXNpbmcgYSB3aWRnZXQgd2l0aCB6ZXJvIG9yIG1vcmUgcGVlcnNcbiAqIC0gaW5pdGlhdGluZzogc2V0dGluZyB1cCBhIHJvb21cbiAqIC0gY29ubmVjdGluZzogZXN0YWJsaXNoaW5nIGNvbm5lY3Rpb25Qb29sIGFuZCBnZXR0aW5nIHRoZSB3aWRnZXRcbiAqIC0gZW1wdHk6IHRoZSB1c2VyIGlzIGluIGEgcm9vbSB3aXRoIG5vIHBlZXJzIGFuZCBubyB3aWRnZXRcbiAqXG4gKiBXaWRnZXRzIGFyZSBydW4gaW4gaWZyYW1lcyBhbmQgdXNlIHdpbmRvdy5wb3N0TWVzc2FnZSB0byBjb21tdW5pY2F0ZSB3aXRoXG4gKiBwZWVyYm94LiBBIGxpYnJhcnkgd2lsbCBiZSB3cml0dGVuIHRvIHNtb290aCB0aGlzIHByb2Nlc3MuXG4gKlxuICogVGhpcyBmaWxlIGlzIG1lYW50IHRvIGJlIGlubGluZWQgd2l0aCBgaW5kZXguaHRtbGAuXG4gKi9cblxuaW1wb3J0IGNsaWVudCBmcm9tICcuL3dlYnJ0Yyc7XG5cbihmdW5jdGlvbigpIHtcbiAgY29uc3QgY2F0YWxvZ0VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXRhbG9nJyk7XG4gIGNvbnN0IHdpZGdldEVsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aWRnZXQnKTtcblxuICBjb25zdCB3aWRnZXRBcGkgPSB7XG4gICAgc2VuZDogbSA9PiB7XG4gICAgICB3aWRnZXRFbHQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtLCAnKicpXG4gICAgfVxuICB9O1xuXG4gIGxldCBzdGF0ZSA9IHtcbiAgICBjb25uZWN0aW9uUG9vbDogbnVsbCxcbiAgICBtb2RlOiBudWxsLFxuICAgIHdpZGdldDogbnVsbCxcbiAgfTtcblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uVG9Nb2RlKG5ld01vZGUsIGVudGVyQXJncyA9IHt9KSB7XG4gICAgY29uc3QgZXhpdCA9IChtb2Rlc1tzdGF0ZS5tb2RlXSAmJiBtb2Rlc1tzdGF0ZS5tb2RlXS5leGl0KSB8fCAoKCkgPT4ge30pO1xuICAgIGNvbnN0IGVudGVyID0gKG1vZGVzW25ld01vZGVdICYmIG1vZGVzW25ld01vZGVdLmVudGVyKSB8fCAoKCkgPT4ge30pO1xuXG4gICAgc3RhdGUubW9kZSA9IG5ld01vZGU7XG5cbiAgICBleGl0KCk7XG4gICAgZW50ZXIoZW50ZXJBcmdzKTtcbiAgfVxuXG4gIGNvbnN0IG1vZGVzID0ge1xuICAgIGNhdGFsb2c6IHtcbiAgICAgIGVudGVyOiAoKSA9PiB7XG4gICAgICAgIGNhdGFsb2dFbHQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9LFxuICAgICAgZXhpdDogKCkgPT4ge1xuICAgICAgICBjYXRhbG9nRWx0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbm5lY3RlZDoge1xuICAgICAgZW50ZXI6ICh7IGNvbm5lY3Rpb25Qb29sIH0pID0+IHtcbiAgICAgICAgc3RhdGUuY29ubmVjdGlvblBvb2wgPSBjb25uZWN0aW9uUG9vbDtcbiAgICAgICAgd2lkZ2V0RWx0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIC8vIHdpdGggZXZlcnl0aGluZyByZWFkeSwgY3JhZGxlIHN0YXJ0cyBjb29yZGluYXRpbmcgbWVzc2FnZSBwYXNzaW5nXG5cbiAgICAgICAgY29ubmVjdGlvblBvb2wubWVzc2FnZXNFbWl0dGVyLm9uKG0gPT4ge1xuICAgICAgICAgIHdpZGdldEFwaS5zZW5kKG0uYm9keSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbm5lY3Rpb25Qb29sLnBlZXJTdGF0dXNlc0VtaXR0ZXIub24oY29uc29sZS5sb2cpXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtID0+IHtcbiAgICAgICAgICBjb25uZWN0aW9uUG9vbC5zZW5kVG9BbGwobS5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXhpdDogKCkgPT4ge1xuICAgICAgICBzdGF0ZS5jb25uZWN0aW9uUG9vbC5jbG9zZSgpO1xuICAgICAgICBzdGF0ZS5jb25uZWN0aW9uUG9vbCA9IG51bGw7XG4gICAgICAgIHdpZGdldEVsdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB3aWRnZXRFbHQuc291cmNlID0gJyc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbm5lY3Rpbmc6IHtcbiAgICAgIGVudGVyOiAoeyBjaGFubmVsSWQgfSkgPT4ge1xuICAgICAgICBjbGllbnQuam9pbkNoYW5uZWwoY2hhbm5lbElkKVxuICAgICAgICAgIC50aGVuKGNvbm5lY3Rpb25Qb29sID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldENvbnRlbnRQID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgIHdpZGdldEVsdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSwgeyBwYXNzaXZlOiB0cnVlIH0pOyAvLyBUT0RPOiB1bnJlZ2l0ZXIgdGhpcyBvbiBsb2FkXG4gICAgICAgICAgICAgIHdpZGdldEVsdC5zcmMgPSBjb25uZWN0aW9uUG9vbC53aWRnZXQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2lkZ2V0Q29udGVudFAudGhlbigoKSA9PiB0cmFuc2l0aW9uVG9Nb2RlKCdjb25uZWN0ZWQnLCB7IGNvbm5lY3Rpb25Qb29sIH0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdGlhdGluZzoge1xuICAgICAgZW50ZXI6ICh7IHdpZGdldFVyaSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHdpZGdldENvbnRlbnRQID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgd2lkZ2V0RWx0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlLCB7IHBhc3NpdmU6IHRydWUgfSk7IC8vIFRPRE86IHVucmVnaXRlciB0aGlzIG9uIGxvYWRcbiAgICAgICAgICB3aWRnZXRFbHQuc3JjID0gd2lkZ2V0VXJpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uUG9vbFAgPSBjbGllbnQuY3JlYXRlU2lnbmFsZXIod2lkZ2V0VXJpKTtcblxuICAgICAgICBQcm9taXNlLmFsbChbd2lkZ2V0Q29udGVudFAsIGNvbm5lY3Rpb25Qb29sUF0pLnRoZW4oKFtfLCBjb25uZWN0aW9uUG9vbF0pID0+IHtcbiAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IGNoYW5uZWw6IGNvbm5lY3Rpb25Qb29sLmNoYW5uZWxJZCB9LCAnJywgJy9jLycrY29ubmVjdGlvblBvb2wuY2hhbm5lbElkKTtcbiAgICAgICAgICBzdGF0ZS53aWRnZXQgPSB3aWRnZXRVcmk7XG4gICAgICAgICAgdHJhbnNpdGlvblRvTW9kZSgnY29ubmVjdGVkJywgeyBjb25uZWN0aW9uUG9vbCwgd2lkZ2V0VXJpIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53aWRnZXQtbGF1bmNoZXInKS5mb3JFYWNoKChlbHQpID0+IHtcbiAgICAgIGVsdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRyYW5zaXRpb25Ub01vZGUoJ2luaXRpYXRpbmcnLCB7IHdpZGdldFVyaTogZWx0LmRhdGFzZXQubG9jYXRpb24gfSkpXG4gICAgfSk7XG5cbiAgICBzZXRNb2RlRnJvbVVyaSgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBzZXRNb2RlRnJvbVVyaSgpIHtcbiAgICBjb25zdCBjaGFubmVsUGF0dGVybiA9IC9eXFwvY1xcLyhbYS1mMC05XSspJC87XG4gICAgY29uc3QgZm91bmQgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaChjaGFubmVsUGF0dGVybik7XG4gICAgaWYgKGZvdW5kICYmIGZvdW5kWzFdKSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvblRvTW9kZSgnY29ubmVjdGluZycsIHsgY2hhbm5lbElkOiBmb3VuZFsxXSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNpdGlvblRvTW9kZSgnY2F0YWxvZycpO1xuICB9XG5cbiAgd2luZG93Lm9ucG9wc3RhdGUgPSBzZXRNb2RlRnJvbVVyaTtcbiAgaW5pdCgpO1xuXG59KCkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgc3RhdGU7IC8vIHRoaXMgaXMgdW5uZWNlc3NhcnksIGJ1dCBoZWxwZnVsIGZvciBkZWJ1Z2dpbmdcbiAgbGV0IGxpc3RlbmVycyA9IFtdO1xuICBsZXQgb25lTGlzdGVuZXJzID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IG5leHRTdGF0ZSA9PiB7XG4gICAgICBzdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbChzdGF0ZSkpO1xuICAgICAgb25lTGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHN0YXRlKSk7XG4gICAgICBvbmVMaXN0ZW5lcnMgPSBbXTtcbiAgICB9LFxuICAgIG9uOiBsaXN0ZW5lciA9PiBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lciksXG4gICAgb25jZTogbGlzdGVuZXIgPT4gb25lTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpLFxuICAgIG9mZjogbGlzdGVuZXIgPT4gbGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKSxcbiAgICBjbGVhcjogKCkgPT4gbGlzdGVuZXJzID0gW10sXG4gICAgc3RhdGUsXG4gIH07XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goZGlzcGF0Y2hLZXksIHBheWxvYWRLZXksIGRpc3BhdGNoZXJzLCBvYmopIHtcbiAgcmV0dXJuIGRpc3BhdGNoZXJzW29ialtkaXNwYXRjaEtleV1dKG9ialtwYXlsb2FkS2V5XSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpc3BhdGNoZXIoZGlzcGF0Y2hLZXksIHBheWxvYWRLZXksIGRpc3BhdGNoZXJzKSB7XG4gIHJldHVybiBvYmogPT4gZGlzcGF0Y2goZGlzcGF0Y2hLZXksIHBheWxvYWRLZXksIGRpc3BhdGNoZXJzLCBvYmopO1xufVxuIiwiaW1wb3J0IFBlZXJDb25uZWN0aW9uIGZyb20gJy4vcGVlci1jb25uZWN0aW9uJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL2Vudi5qc29uJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2xpYi9lbWl0dGVyJztcblxuLyoqXG4gKiBDb25uZWN0aW9uIFBvb2wgbWFuYWdlcyB0aGUgUlRDIHBlZXIgY29ubmVjdGlvbnMuIEl0IGlzIGdpdmVuIGEgc2lnbmFsZXIgdG9cbiAqIHVzZSB0byBjb29yZGluYXRlIHRoZSB0YXNrLiBJdCBwcm92aWRlcyBhbiBBUEkgdG8gZGlzcGF0Y2ggbWVzc2FnZXMgYWNyb3NzXG4gKiB0aGUgY29ubmVjdGlvbnMuXG4gKlxuICogVGhlIGZ1bmN0aW9uIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgb25seSByZXNvbHZlZCBvbmNlIHNvbWUgYmFzaWNcbiAqIGluZm9ybWF0aW9uIGlzIGtub3duLS10aGF0IHRoZSBzaWduYWxlciBpcyBpbmRlZWQgd29ya2luZywgdGhhdCB0aGVyZSBhcmVcbiAqIHBlZXJzLCBhbmQgdGhhdCBhIHdpZGdldCBleGlzdHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjaGFubmVsSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgbGV0IHBlZXJDb25uZWN0aW9ucyA9IHt9O1xuICAgIGxldCBzaWduYWxFbWl0dGVycyA9IHt9O1xuICAgIGxldCBwZWVyU3RhdHVzZXMgPSB7fTtcbiAgICBsZXQgeyB1cGRhdGU6IHVwZGF0ZVBlZXJDb25uZWN0aW9ucywgLi4ucGVlckNvbm5lY3Rpb25zRW1pdHRlciB9ID0gZW1pdHRlcigpO1xuICAgIGxldCB7IHVwZGF0ZTogdXBkYXRlUGVlclN0YXR1c2VzLCAuLi5wZWVyU3RhdHVzZXNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gICAgbGV0IHsgdXBkYXRlOiB1cGRhdGVNZXNzYWdlcywgLi4ubWVzc2FnZXNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gICAgY29uc3Qgc2lnbmFsZXIgPSBuZXcgV2ViU29ja2V0KGNvbmZpZy5zaWduYWxlcldzVXJpICsgJy8nICsgY2hhbm5lbElkKTtcblxuICAgIGNvbnN0IHNlbmQgPSAodG8sIGJvZHkpID0+IHNpZ25hbGVyLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0bywgYm9keSB9KSk7XG5cbiAgICAvLyBzaWRlIGVmZmVjdHMtci11c1xuICAgIHNpZ25hbGVyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgICAgY29uc3QgeyBmcm9tLCBib2R5IH0gPSBkYXRhO1xuXG4gICAgICBjb25zb2xlLmxvZyh7IHJlY2VpdmVkTWVzc2FnZTogZGF0YSB9KTtcblxuICAgICAgaWYgKGZyb20gPT09ICdzZXJ2ZXInKSB7XG4gICAgICAgIC8vIGhlbHBlclxuICAgICAgICBjb25zdCBtYWtlQ29ubmVjdGlvbiA9IHBlZXJJZCA9PiB7XG4gICAgICAgICAgc2lnbmFsRW1pdHRlcnNbcGVlcklkXSA9IGVtaXR0ZXIoKTtcbiAgICAgICAgICBjb25zdCBjID0gUGVlckNvbm5lY3Rpb24oXG4gICAgICAgICAgICBtID0+IHNlbmQocGVlcklkLCBtKSwgICAvLyBzZW5kU2lnbmFsIChjb25uZWN0aW9uIC0+IHBvb2wpXG4gICAgICAgICAgICBzaWduYWxFbWl0dGVyc1twZWVySWRdLCAvLyBzaWduYWxFbWl0dGVyIChwb29sIC0+IGNvbm5lY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwZWVyQ29ubmVjdGlvbnNbcGVlcklkXSA9IGM7XG4gICAgICAgICAgY29uc29sZS5sb2coYylcbiAgICAgICAgICBwZWVyU3RhdHVzZXNbcGVlcklkXSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgICAgICAgIGMubWVzc2FnZUVtaXR0ZXIub24oYm9keSA9PiB1cGRhdGVNZXNzYWdlcyh7IGJvZHksIGZyb206IHBlZXJJZCB9KSk7IC8vIFRPRE86IChzbWFsbCkgbWVtb3J5IGxlYWtcbiAgICAgICAgICBjLnN0YXR1c0VtaXR0ZXIub24oc3RhdHVzID0+IHtcbiAgICAgICAgICAgIHBlZXJTdGF0dXNlc1twZWVySWRdID0gc3RhdHVzO1xuICAgICAgICAgICAgdXBkYXRlUGVlclN0YXR1c2VzKHBlZXJTdGF0dXNlcyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB1cGRhdGVQZWVyU3RhdHVzZXMocGVlclN0YXR1c2VzKTtcbiAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYm9keS50eXBlID09PSAnbWFuaWZlc3QnKSB7XG4gICAgICAgICAgYm9keS5wZWVycy5mb3JFYWNoKHBlZXJJZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjID0gbWFrZUNvbm5lY3Rpb24ocGVlcklkKTtcbiAgICAgICAgICAgIGMuaW5pdGlhdGUoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFRPRE86IGFkZCBzZW5kVG9QZWVyIC8gc2VuZFRvQWxsXG4gICAgICAgICAgLy8gVEhJUyBJUyBUSEUgUFJPTUlTSUZJRUQgUkVUVVJOIFZBTFVFIEZPUiBUSEUgT1ZFUkFMTCBGVU5DVElPTlxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbElkLFxuICAgICAgICAgICAgbWVzc2FnZXNFbWl0dGVyLFxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25zRW1pdHRlcixcbiAgICAgICAgICAgIHBlZXJTdGF0dXNlc0VtaXR0ZXIsXG4gICAgICAgICAgICBzZW5kVG9BbGw6IG1lc3NhZ2UgPT4gT2JqZWN0LnZhbHVlcyhwZWVyQ29ubmVjdGlvbnMpLmZvckVhY2goYyA9PiBjLnNlbmRNZXNzYWdlKG1lc3NhZ2UpKSxcbiAgICAgICAgICAgIHNlbmRUb1BlZXI6IChwZWVySWQsIG1lc3NhZ2UpID0+IHBlZXJDb25uZWN0aW9uc1twZWVySWRdLnNlbmRNZXNzYWdlKG1lc3NhZ2UpLFxuICAgICAgICAgICAgd2lkZ2V0OiBib2R5LndpZGdldCxcbiAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMocGVlckNvbm5lY3Rpb25zKS5mb3JFYWNoKGMgPT4gYy5jbG9zZSgpKTtcbiAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25zID0ge307XG4gICAgICAgICAgICAgIHNpZ25hbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gd2lsbCB0aGlzIHdvcms/XG4gICAgICAgICAgdXBkYXRlUGVlckNvbm5lY3Rpb25zKHBlZXJDb25uZWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9keS50eXBlID09PSAncGVlckNvbm5lY3RlZCcpIHtcbiAgICAgICAgICBtYWtlQ29ubmVjdGlvbihib2R5LmlkKTtcbiAgICAgICAgICB1cGRhdGVQZWVyQ29ubmVjdGlvbnMocGVlckNvbm5lY3Rpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2R5LnR5cGUgPT09ICdwZWVyRGlzY29ubmVjdGVkJykge1xuICAgICAgICAgIGRlbGV0ZSBzaWduYWxFbWl0dGVyc1tib2R5LmlkXTtcbiAgICAgICAgICBkZWxldGUgcGVlckNvbm5lY3Rpb25zW2JvZHkuaWRdO1xuICAgICAgICAgIGRlbGV0ZSBwZWVyU3RhdHVzZXNbYm9keS5pZF07XG4gICAgICAgICAgdXBkYXRlUGVlckNvbm5lY3Rpb25zKHBlZXJDb25uZWN0aW9ucyk7XG4gICAgICAgICAgdXBkYXRlUGVlclN0YXR1c2VzKHBlZXJTdGF0dXNlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgeyAvLyBkYXRhIG5vdCBmcm9tIHRoZSBzaWduYWwgc2VydmVyIGl0c2VsZiAobGlrZWx5IGEgcGVlciBSVEMgbWVzc2FnZSlcbiAgICAgICAgc2lnbmFsRW1pdHRlcnNbZnJvbV0udXBkYXRlKGJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgQ29ubmVjdGlvblBvb2wgZnJvbSAnLi9jb25uZWN0aW9uLXBvb2wnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvZW52Lmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XG4gIC8vIHJlcXVlc3QgYSBuZXcgcm9vbSBmcm9tIHRoZSBzZXJ2ZXIgYW5kIGNvbm5lY3QgdG8gaXRcbiAgZnVuY3Rpb24gY3JlYXRlU2lnbmFsZXIod2lkZ2V0VXJpKSB7XG4gICAgLy8gRklYTUU6IGhvcGUgdGhhdCBVUkwgaG9sZHMgdXAuLi4gaW52ZXN0aWdhdGUhXG4gICAgcmV0dXJuIGZldGNoKGNvbmZpZy5zaWduYWxlckh0dHBVcmkgKyAnL3JlcXVlc3QtY2hhbm5lbD93aWRnZXQ9JyArIHdpZGdldFVyaSlcbiAgICAgIC50aGVuKHIgPT4gci50ZXh0KCkpXG4gICAgICAudGhlbihqb2luQ2hhbm5lbCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBzZXR0aW5nIHVwIHRoZSBzaWduYWxlciwgZ2V0dGluZyBhbiBpbml0aWFsIHBheWxvYWQsIHRoZW5cbiAgICogcmV0dXJuaW5nIGEgcHJvbWlzZSBvZiBhIGNvbm5lY3Rpb24gcG9vbC4gQmVob2xkLCBzYXVzYWdlLiA6KFxuICAgKi9cbiAgZnVuY3Rpb24gam9pbkNoYW5uZWwoY2hhbm5lbElkKSB7XG4gICAgcmV0dXJuIENvbm5lY3Rpb25Qb29sKGNoYW5uZWxJZCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVNpZ25hbGVyLFxuICAgIGpvaW5DaGFubmVsLFxuICB9O1xufSgpKTtcbiIsImltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2xpYi9lbWl0dGVyJztcbmltcG9ydCB7IGNyZWF0ZURpc3BhdGNoZXIgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuXG4vKipcbiAqIExpbmtlZCBjbG9zZWx5IHRvIHRoZSBjb25uZWN0aW9uIHBvb2wuIEl0J3MgZ2l2ZW4gYSBzZW5kU2lnbmFsIGZ1bmN0aW9uIGFuZFxuICogYW4gZW1pdHRlciBmb3IgbWVzc2FnZXMgcmVsZXZhbnQgdG8gaXQuIFRoZSBwb29sIHdpbGwgdGFrZSBjYXJlIG9mIG1ha2luZ1xuICogc3VyZSB0aGF0IHRoZSByaWdodCBtZXNzYWdlcyBnZXQgdG8gdGhlIHJpZ2h0IGNvbm5lY3Rpb25zLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZW5kU2lnbmFsLCBzaWduYWxzRW1pdHRlcikge1xuICBjb25zb2xlLmxvZygnaGhoJylcbiAgbGV0IHdpZGdldENoYW5uZWw7XG4gIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih7IGljZVNlcnZlcnM6IFt7IHVybDogXCJzdHVuOi8vc3R1bi51Y3NiLmVkdTozNDc4XCIgfV0gfSk7XG4gIGxldCB7IHVwZGF0ZTogdXBkYXRlU3RhdHVzLCAuLi5zdGF0dXNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gIGxldCB7IHVwZGF0ZTogdXBkYXRlTWVzc2FnZSwgLi4ubWVzc2FnZUVtaXR0ZXIgfSA9IGVtaXR0ZXIoKTtcbiAgdXBkYXRlU3RhdHVzKCdkaXNjb25uZWN0ZWQnKTtcblxuICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChldmVudCkgeyBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7IHNpZ25hbCgnaWNlQ2FuZGlkYXRlJywgeyBpY2VDYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZSB9KTsgfX1cblxuICBzaWduYWxzRW1pdHRlci5vbihjcmVhdGVEaXNwYXRjaGVyKCd0eXBlJywgJ3BheWxvYWQnLCB7XG4gICAgYW5zd2VyOiBoYW5kbGVBbnN3ZXIsXG4gICAgb2ZmZXI6IGhhbmRsZU9mZmVyLFxuICAgIGljZUNhbmRpZGF0ZTogaGFuZGxlSWNlQ2FuZGlkYXRlLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNFbWl0dGVyLFxuICAgIHNlbmRNZXNzYWdlOiBtID0+IHdpZGdldENoYW5uZWwuc2VuZChKU09OLnN0cmluZ2lmeShtKSksXG4gICAgbWVzc2FnZUVtaXR0ZXIsXG4gICAgaW5pdGlhdGU6IGNyZWF0ZU9mZmVyLFxuICAgIGNsb3NlOiAoKSA9PiB7IHBlZXJDb25uZWN0aW9uLmNsb3NlKCk7IHBlZXJDb25uZWN0aW9uID0gbnVsbDsgfVxuICB9O1xuXG5cbiAgZnVuY3Rpb24gc2lnbmFsKHR5cGUsIHBheWxvYWQpIHtcbiAgICBzZW5kU2lnbmFsKHsgdHlwZSwgcGF5bG9hZCB9KTtcbiAgfVxuXG4gIC8vIFJUQyBzdHVmZlxuXG4gIC8qKlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgdGhpcyBlbmQgaXMgYmVpbmcgY29udGFjdGVkIGJ5IGEgcGVlciBsb29raW5nIHRvIHNldCB1cCBhXG4gICAqIG5ldyBjb25uZWN0aW9uLiBTZXR1cCBmb3IgdGhlIHJlY2VpdmluZyBlbmQuXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVPZmZlcih7IG9mZmVyIH0pIHtcbiAgICB1cGRhdGVTdGF0dXMoJ2hhbmRsaW5nIG9mZmVyJyk7XG4gICAgcGVlckNvbm5lY3Rpb24ub25kYXRhY2hhbm5lbCA9IGV2ID0+IHNldENoYW5uZWwoZXYuY2hhbm5lbCk7XG5cbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG9mZmVyKSk7XG4gICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKGZ1bmN0aW9uIChhbnN3ZXIpIHtcbiAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICAgIHNpZ25hbCgnYW5zd2VyJywgeyBhbnN3ZXI6IGFuc3dlciB9KTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyKSB7IGFsZXJ0KCdzb21ldGhpbmcgd2VudCB3cm9uZycpIH0pO1xuICB9XG5cblxuICBmdW5jdGlvbiBoYW5kbGVBbnN3ZXIoeyBhbnN3ZXIgfSkge1xuICAgIHVwZGF0ZVN0YXR1cygnaGFuZGxpbmcgYW5zd2VyJyk7XG4gICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihhbnN3ZXIpKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaGFuZGxlSWNlQ2FuZGlkYXRlKHsgaWNlQ2FuZGlkYXRlIH0pIHtcbiAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShpY2VDYW5kaWRhdGUpKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlT2ZmZXIoKSB7XG4gICAgdXBkYXRlU3RhdHVzKCdjb25uZWN0aW5nJyk7XG4gICAgc2V0Q2hhbm5lbChwZWVyQ29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbCgnd2lkZ2V0JywgeyByZWxpYWJsZTogZmFsc2UgfSkpO1xuICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKGZ1bmN0aW9uIChvZmZlcikge1xuICAgICAgc2lnbmFsKCdvZmZlcicsIHsgb2ZmZXI6IG9mZmVyIH0pO1xuICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XG4gICAgfSwgZnVuY3Rpb24gKF9lcnIpIHsgYWxlcnQoJ3NvbWV0aGluZyB3ZW50IHdyb25nJykgfSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHNldENoYW5uZWwoY2gpIHtcbiAgICB3aWRnZXRDaGFubmVsID0gY2g7XG5cbiAgICB3aWRnZXRDaGFubmVsLm9ubWVzc2FnZSA9IG0gPT4ge1xuICAgICAgdXBkYXRlTWVzc2FnZShKU09OLnBhcnNlKG0uZGF0YSkpO1xuICAgIH1cblxuICAgIHdpZGdldENoYW5uZWwub25vcGVuID0gKCkgPT4ge1xuICAgICAgdXBkYXRlU3RhdHVzKCdjaGFubmVsIG9wZW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCdheSBwYXBpJyk7XG4gICAgfTtcblxuICAgIHdpZGdldENoYW5uZWwub25lcnJvciA9IGNvbnNvbGUuZXJyb3I7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
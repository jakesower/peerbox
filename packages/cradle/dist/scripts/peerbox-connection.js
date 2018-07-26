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
  var widgetChannel = void 0;
  var peerConnection = new RTCPeerConnection({ iceServers: [{ url: "stun:stun.stunprotocol.org:3478" }] });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvY29ubmVjdGlvbi1wb29sLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9wZWVyLWNvbm5lY3Rpb24uanMiXSwibmFtZXMiOlsiY2F0YWxvZ0VsdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpZGdldEVsdCIsIndpZGdldEFwaSIsInNlbmQiLCJjb250ZW50V2luZG93IiwicG9zdE1lc3NhZ2UiLCJtIiwic3RhdGUiLCJjb25uZWN0aW9uUG9vbCIsIm1vZGUiLCJ3aWRnZXQiLCJ0cmFuc2l0aW9uVG9Nb2RlIiwibmV3TW9kZSIsImVudGVyQXJncyIsImV4aXQiLCJtb2RlcyIsImVudGVyIiwiY2F0YWxvZyIsInN0eWxlIiwiZGlzcGxheSIsImNvbm5lY3RlZCIsIm1lc3NhZ2VzRW1pdHRlciIsIm9uIiwiYm9keSIsInBlZXJTdGF0dXNlc0VtaXR0ZXIiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbmRUb0FsbCIsImRhdGEiLCJjbG9zZSIsInNvdXJjZSIsImNvbm5lY3RpbmciLCJjaGFubmVsSWQiLCJjbGllbnQiLCJqb2luQ2hhbm5lbCIsInRoZW4iLCJ3aWRnZXRDb250ZW50UCIsIlByb21pc2UiLCJyZXNvbHZlIiwicGFzc2l2ZSIsInNyYyIsImluaXRpYXRpbmciLCJ3aWRnZXRVcmkiLCJjb25uZWN0aW9uUG9vbFAiLCJjcmVhdGVTaWduYWxlciIsImFsbCIsIl8iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2hhbm5lbCIsImluaXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsdCIsImRhdGFzZXQiLCJsb2NhdGlvbiIsInNldE1vZGVGcm9tVXJpIiwiY2hhbm5lbFBhdHRlcm4iLCJmb3VuZCIsInBhdGhuYW1lIiwibWF0Y2giLCJvbnBvcHN0YXRlIiwibGlzdGVuZXJzIiwib25lTGlzdGVuZXJzIiwidXBkYXRlIiwibmV4dFN0YXRlIiwibCIsInB1c2giLCJsaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJmaWx0ZXIiLCJjbGVhciIsImRpc3BhdGNoIiwiY3JlYXRlRGlzcGF0Y2hlciIsImRpc3BhdGNoS2V5IiwicGF5bG9hZEtleSIsImRpc3BhdGNoZXJzIiwib2JqIiwiX3JlamVjdCIsInBlZXJDb25uZWN0aW9ucyIsInNpZ25hbEVtaXR0ZXJzIiwicGVlclN0YXR1c2VzIiwidXBkYXRlUGVlckNvbm5lY3Rpb25zIiwicGVlckNvbm5lY3Rpb25zRW1pdHRlciIsInVwZGF0ZVBlZXJTdGF0dXNlcyIsInVwZGF0ZU1lc3NhZ2VzIiwic2lnbmFsZXIiLCJXZWJTb2NrZXQiLCJjb25maWciLCJzaWduYWxlcldzVXJpIiwidG8iLCJKU09OIiwic3RyaW5naWZ5Iiwib25tZXNzYWdlIiwibWVzc2FnZSIsInBhcnNlIiwiZnJvbSIsInJlY2VpdmVkTWVzc2FnZSIsIm1ha2VDb25uZWN0aW9uIiwicGVlcklkIiwiYyIsIm1lc3NhZ2VFbWl0dGVyIiwic3RhdHVzRW1pdHRlciIsInN0YXR1cyIsInR5cGUiLCJwZWVycyIsImluaXRpYXRlIiwiT2JqZWN0IiwidmFsdWVzIiwic2VuZE1lc3NhZ2UiLCJzZW5kVG9QZWVyIiwiaWQiLCJmZXRjaCIsInNpZ25hbGVySHR0cFVyaSIsInIiLCJ0ZXh0Iiwic2VuZFNpZ25hbCIsInNpZ25hbHNFbWl0dGVyIiwid2lkZ2V0Q2hhbm5lbCIsInBlZXJDb25uZWN0aW9uIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJpY2VTZXJ2ZXJzIiwidXJsIiwidXBkYXRlU3RhdHVzIiwidXBkYXRlTWVzc2FnZSIsIm9uaWNlY2FuZGlkYXRlIiwiZXZlbnQiLCJjYW5kaWRhdGUiLCJzaWduYWwiLCJpY2VDYW5kaWRhdGUiLCJhbnN3ZXIiLCJoYW5kbGVBbnN3ZXIiLCJvZmZlciIsImhhbmRsZU9mZmVyIiwiaGFuZGxlSWNlQ2FuZGlkYXRlIiwiY3JlYXRlT2ZmZXIiLCJwYXlsb2FkIiwib25kYXRhY2hhbm5lbCIsInNldENoYW5uZWwiLCJldiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsImVyciIsImFsZXJ0IiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJyZWxpYWJsZSIsIl9lcnIiLCJjaCIsIm9ub3BlbiIsIm9uZXJyb3IiLCJlcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eXBCQ2xGQTs7Ozs7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ZCxHQUF3Qm5JLFFBQVFvSSxLQUFoQztBQUNEO0FBQ0YsQzs7QUExRkQ7Ozs7QUFDQTs7Ozs7O0FBRUEiLCJmaWxlIjoic2NyaXB0cy9wZWVyYm94LWNvbm5lY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogUGVlcmJveCBBcmNoaXRlY3R1cmVcbiAqXG4gKiBQZWVyYm94IG1lZGlhdGVzIHAycCBjb21tdW5pY2F0aW9uIGFtb25nIHVzZXJzIGJ5IHByb3ZpZGluZyBhIHVuaWZvcm0gQVBJIHRvXG4gKiB3aWRnZXRzLCBzZXR0aW5nIHVwIHNpZ25hbGluZywgYW5kIGFsbCB0aGUgYm9yaW5nIHBhcnRzLlxuICpcbiAqIG1vZGVzOlxuICogLSBjYXRhbG9nOiBub3QgY29ubmVjdGVkIHRvIGEgcm9vbVxuICogLSBjb25uZWN0ZWQ6IGFjdGl2ZWx5IHVzaW5nIGEgd2lkZ2V0IHdpdGggemVybyBvciBtb3JlIHBlZXJzXG4gKiAtIGluaXRpYXRpbmc6IHNldHRpbmcgdXAgYSByb29tXG4gKiAtIGNvbm5lY3Rpbmc6IGVzdGFibGlzaGluZyBjb25uZWN0aW9uUG9vbCBhbmQgZ2V0dGluZyB0aGUgd2lkZ2V0XG4gKiAtIGVtcHR5OiB0aGUgdXNlciBpcyBpbiBhIHJvb20gd2l0aCBubyBwZWVycyBhbmQgbm8gd2lkZ2V0XG4gKlxuICogV2lkZ2V0cyBhcmUgcnVuIGluIGlmcmFtZXMgYW5kIHVzZSB3aW5kb3cucG9zdE1lc3NhZ2UgdG8gY29tbXVuaWNhdGUgd2l0aFxuICogcGVlcmJveC4gQSBsaWJyYXJ5IHdpbGwgYmUgd3JpdHRlbiB0byBzbW9vdGggdGhpcyBwcm9jZXNzLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBtZWFudCB0byBiZSBpbmxpbmVkIHdpdGggYGluZGV4Lmh0bWxgLlxuICovXG5cbmltcG9ydCBjbGllbnQgZnJvbSAnLi93ZWJydGMnO1xuXG4oZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGNhdGFsb2dFbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0YWxvZycpO1xuICBjb25zdCB3aWRnZXRFbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2lkZ2V0Jyk7XG5cbiAgY29uc3Qgd2lkZ2V0QXBpID0ge1xuICAgIHNlbmQ6IG0gPT4ge1xuICAgICAgd2lkZ2V0RWx0LmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobSwgJyonKVxuICAgIH1cbiAgfTtcblxuICBsZXQgc3RhdGUgPSB7XG4gICAgY29ubmVjdGlvblBvb2w6IG51bGwsXG4gICAgbW9kZTogbnVsbCxcbiAgICB3aWRnZXQ6IG51bGwsXG4gIH07XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvblRvTW9kZShuZXdNb2RlLCBlbnRlckFyZ3MgPSB7fSkge1xuICAgIGNvbnN0IGV4aXQgPSAobW9kZXNbc3RhdGUubW9kZV0gJiYgbW9kZXNbc3RhdGUubW9kZV0uZXhpdCkgfHwgKCgpID0+IHt9KTtcbiAgICBjb25zdCBlbnRlciA9IChtb2Rlc1tuZXdNb2RlXSAmJiBtb2Rlc1tuZXdNb2RlXS5lbnRlcikgfHwgKCgpID0+IHt9KTtcblxuICAgIHN0YXRlLm1vZGUgPSBuZXdNb2RlO1xuXG4gICAgZXhpdCgpO1xuICAgIGVudGVyKGVudGVyQXJncyk7XG4gIH1cblxuICBjb25zdCBtb2RlcyA9IHtcbiAgICBjYXRhbG9nOiB7XG4gICAgICBlbnRlcjogKCkgPT4ge1xuICAgICAgICBjYXRhbG9nRWx0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSxcbiAgICAgIGV4aXQ6ICgpID0+IHtcbiAgICAgICAgY2F0YWxvZ0VsdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb25uZWN0ZWQ6IHtcbiAgICAgIGVudGVyOiAoeyBjb25uZWN0aW9uUG9vbCB9KSA9PiB7XG4gICAgICAgIHN0YXRlLmNvbm5lY3Rpb25Qb29sID0gY29ubmVjdGlvblBvb2w7XG4gICAgICAgIHdpZGdldEVsdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAvLyB3aXRoIGV2ZXJ5dGhpbmcgcmVhZHksIGNyYWRsZSBzdGFydHMgY29vcmRpbmF0aW5nIG1lc3NhZ2UgcGFzc2luZ1xuXG4gICAgICAgIGNvbm5lY3Rpb25Qb29sLm1lc3NhZ2VzRW1pdHRlci5vbihtID0+IHtcbiAgICAgICAgICB3aWRnZXRBcGkuc2VuZChtLmJvZHkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25uZWN0aW9uUG9vbC5wZWVyU3RhdHVzZXNFbWl0dGVyLm9uKGNvbnNvbGUubG9nKVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbSA9PiB7XG4gICAgICAgICAgY29ubmVjdGlvblBvb2wuc2VuZFRvQWxsKG0uZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGV4aXQ6ICgpID0+IHtcbiAgICAgICAgc3RhdGUuY29ubmVjdGlvblBvb2wuY2xvc2UoKTtcbiAgICAgICAgc3RhdGUuY29ubmVjdGlvblBvb2wgPSBudWxsO1xuICAgICAgICB3aWRnZXRFbHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgd2lkZ2V0RWx0LnNvdXJjZSA9ICcnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb25uZWN0aW5nOiB7XG4gICAgICBlbnRlcjogKHsgY2hhbm5lbElkIH0pID0+IHtcbiAgICAgICAgY2xpZW50LmpvaW5DaGFubmVsKGNoYW5uZWxJZClcbiAgICAgICAgICAudGhlbihjb25uZWN0aW9uUG9vbCA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRDb250ZW50UCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICB3aWRnZXRFbHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTsgLy8gVE9ETzogdW5yZWdpdGVyIHRoaXMgb24gbG9hZFxuICAgICAgICAgICAgICB3aWRnZXRFbHQuc3JjID0gY29ubmVjdGlvblBvb2wud2lkZ2V0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHdpZGdldENvbnRlbnRQLnRoZW4oKCkgPT4gdHJhbnNpdGlvblRvTW9kZSgnY29ubmVjdGVkJywgeyBjb25uZWN0aW9uUG9vbCB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGluaXRpYXRpbmc6IHtcbiAgICAgIGVudGVyOiAoeyB3aWRnZXRVcmkgfSkgPT4ge1xuICAgICAgICBjb25zdCB3aWRnZXRDb250ZW50UCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgIHdpZGdldEVsdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSwgeyBwYXNzaXZlOiB0cnVlIH0pOyAvLyBUT0RPOiB1bnJlZ2l0ZXIgdGhpcyBvbiBsb2FkXG4gICAgICAgICAgd2lkZ2V0RWx0LnNyYyA9IHdpZGdldFVyaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29ubmVjdGlvblBvb2xQID0gY2xpZW50LmNyZWF0ZVNpZ25hbGVyKHdpZGdldFVyaSk7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoW3dpZGdldENvbnRlbnRQLCBjb25uZWN0aW9uUG9vbFBdKS50aGVuKChbXywgY29ubmVjdGlvblBvb2xdKSA9PiB7XG4gICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoeyBjaGFubmVsOiBjb25uZWN0aW9uUG9vbC5jaGFubmVsSWQgfSwgJycsICcvYy8nK2Nvbm5lY3Rpb25Qb29sLmNoYW5uZWxJZCk7XG4gICAgICAgICAgc3RhdGUud2lkZ2V0ID0gd2lkZ2V0VXJpO1xuICAgICAgICAgIHRyYW5zaXRpb25Ub01vZGUoJ2Nvbm5lY3RlZCcsIHsgY29ubmVjdGlvblBvb2wsIHdpZGdldFVyaSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud2lkZ2V0LWxhdW5jaGVyJykuZm9yRWFjaCgoZWx0KSA9PiB7XG4gICAgICBlbHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0cmFuc2l0aW9uVG9Nb2RlKCdpbml0aWF0aW5nJywgeyB3aWRnZXRVcmk6IGVsdC5kYXRhc2V0LmxvY2F0aW9uIH0pKVxuICAgIH0pO1xuXG4gICAgc2V0TW9kZUZyb21VcmkoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc2V0TW9kZUZyb21VcmkoKSB7XG4gICAgY29uc3QgY2hhbm5lbFBhdHRlcm4gPSAvXlxcL2NcXC8oW2EtZjAtOV0rKSQvO1xuICAgIGNvbnN0IGZvdW5kID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goY2hhbm5lbFBhdHRlcm4pO1xuICAgIGlmIChmb3VuZCAmJiBmb3VuZFsxXSkge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpb25Ub01vZGUoJ2Nvbm5lY3RpbmcnLCB7IGNoYW5uZWxJZDogZm91bmRbMV0gfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zaXRpb25Ub01vZGUoJ2NhdGFsb2cnKTtcbiAgfVxuXG4gIHdpbmRvdy5vbnBvcHN0YXRlID0gc2V0TW9kZUZyb21Vcmk7XG4gIGluaXQoKTtcblxufSgpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHN0YXRlOyAvLyB0aGlzIGlzIHVubmVjZXNzYXJ5LCBidXQgaGVscGZ1bCBmb3IgZGVidWdnaW5nXG4gIGxldCBsaXN0ZW5lcnMgPSBbXTtcbiAgbGV0IG9uZUxpc3RlbmVycyA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBuZXh0U3RhdGUgPT4ge1xuICAgICAgc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoc3RhdGUpKTtcbiAgICAgIG9uZUxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbChzdGF0ZSkpO1xuICAgICAgb25lTGlzdGVuZXJzID0gW107XG4gICAgfSxcbiAgICBvbjogbGlzdGVuZXIgPT4gbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpLFxuICAgIG9uY2U6IGxpc3RlbmVyID0+IG9uZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKSxcbiAgICBvZmY6IGxpc3RlbmVyID0+IGxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lciksXG4gICAgY2xlYXI6ICgpID0+IGxpc3RlbmVycyA9IFtdLFxuICAgIHN0YXRlLFxuICB9O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKGRpc3BhdGNoS2V5LCBwYXlsb2FkS2V5LCBkaXNwYXRjaGVycywgb2JqKSB7XG4gIHJldHVybiBkaXNwYXRjaGVyc1tvYmpbZGlzcGF0Y2hLZXldXShvYmpbcGF5bG9hZEtleV0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXNwYXRjaGVyKGRpc3BhdGNoS2V5LCBwYXlsb2FkS2V5LCBkaXNwYXRjaGVycykge1xuICByZXR1cm4gb2JqID0+IGRpc3BhdGNoKGRpc3BhdGNoS2V5LCBwYXlsb2FkS2V5LCBkaXNwYXRjaGVycywgb2JqKTtcbn1cbiIsImltcG9ydCBQZWVyQ29ubmVjdGlvbiBmcm9tICcuL3BlZXItY29ubmVjdGlvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy9lbnYuanNvbic7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuLi9saWIvZW1pdHRlcic7XG5cbi8qKlxuICogQ29ubmVjdGlvbiBQb29sIG1hbmFnZXMgdGhlIFJUQyBwZWVyIGNvbm5lY3Rpb25zLiBJdCBpcyBnaXZlbiBhIHNpZ25hbGVyIHRvXG4gKiB1c2UgdG8gY29vcmRpbmF0ZSB0aGUgdGFzay4gSXQgcHJvdmlkZXMgYW4gQVBJIHRvIGRpc3BhdGNoIG1lc3NhZ2VzIGFjcm9zc1xuICogdGhlIGNvbm5lY3Rpb25zLlxuICpcbiAqIFRoZSBmdW5jdGlvbiByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIG9ubHkgcmVzb2x2ZWQgb25jZSBzb21lIGJhc2ljXG4gKiBpbmZvcm1hdGlvbiBpcyBrbm93bi0tdGhhdCB0aGUgc2lnbmFsZXIgaXMgaW5kZWVkIHdvcmtpbmcsIHRoYXQgdGhlcmUgYXJlXG4gKiBwZWVycywgYW5kIHRoYXQgYSB3aWRnZXQgZXhpc3RzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2hhbm5lbElkKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgIGxldCBwZWVyQ29ubmVjdGlvbnMgPSB7fTtcbiAgICBsZXQgc2lnbmFsRW1pdHRlcnMgPSB7fTtcbiAgICBsZXQgcGVlclN0YXR1c2VzID0ge307XG4gICAgbGV0IHsgdXBkYXRlOiB1cGRhdGVQZWVyQ29ubmVjdGlvbnMsIC4uLnBlZXJDb25uZWN0aW9uc0VtaXR0ZXIgfSA9IGVtaXR0ZXIoKTtcbiAgICBsZXQgeyB1cGRhdGU6IHVwZGF0ZVBlZXJTdGF0dXNlcywgLi4ucGVlclN0YXR1c2VzRW1pdHRlciB9ID0gZW1pdHRlcigpO1xuICAgIGxldCB7IHVwZGF0ZTogdXBkYXRlTWVzc2FnZXMsIC4uLm1lc3NhZ2VzRW1pdHRlciB9ID0gZW1pdHRlcigpO1xuICAgIGNvbnN0IHNpZ25hbGVyID0gbmV3IFdlYlNvY2tldChjb25maWcuc2lnbmFsZXJXc1VyaSArICcvJyArIGNoYW5uZWxJZCk7XG5cbiAgICBjb25zdCBzZW5kID0gKHRvLCBib2R5KSA9PiBzaWduYWxlci5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdG8sIGJvZHkgfSkpO1xuXG4gICAgLy8gc2lkZSBlZmZlY3RzLXItdXNcbiAgICBzaWduYWxlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICAgIGNvbnN0IHsgZnJvbSwgYm9keSB9ID0gZGF0YTtcblxuICAgICAgY29uc29sZS5sb2coeyByZWNlaXZlZE1lc3NhZ2U6IGRhdGEgfSk7XG5cbiAgICAgIGlmIChmcm9tID09PSAnc2VydmVyJykge1xuICAgICAgICAvLyBoZWxwZXJcbiAgICAgICAgY29uc3QgbWFrZUNvbm5lY3Rpb24gPSBwZWVySWQgPT4ge1xuICAgICAgICAgIHNpZ25hbEVtaXR0ZXJzW3BlZXJJZF0gPSBlbWl0dGVyKCk7XG4gICAgICAgICAgY29uc3QgYyA9IFBlZXJDb25uZWN0aW9uKFxuICAgICAgICAgICAgbSA9PiBzZW5kKHBlZXJJZCwgbSksICAgLy8gc2VuZFNpZ25hbCAoY29ubmVjdGlvbiAtPiBwb29sKVxuICAgICAgICAgICAgc2lnbmFsRW1pdHRlcnNbcGVlcklkXSwgLy8gc2lnbmFsRW1pdHRlciAocG9vbCAtPiBjb25uZWN0aW9uKVxuICAgICAgICAgICk7XG4gICAgICAgICAgcGVlckNvbm5lY3Rpb25zW3BlZXJJZF0gPSBjO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGMpXG4gICAgICAgICAgcGVlclN0YXR1c2VzW3BlZXJJZF0gPSAnZGlzY29ubmVjdGVkJztcbiAgICAgICAgICBjLm1lc3NhZ2VFbWl0dGVyLm9uKGJvZHkgPT4gdXBkYXRlTWVzc2FnZXMoeyBib2R5LCBmcm9tOiBwZWVySWQgfSkpOyAvLyBUT0RPOiAoc21hbGwpIG1lbW9yeSBsZWFrXG4gICAgICAgICAgYy5zdGF0dXNFbWl0dGVyLm9uKHN0YXR1cyA9PiB7XG4gICAgICAgICAgICBwZWVyU3RhdHVzZXNbcGVlcklkXSA9IHN0YXR1cztcbiAgICAgICAgICAgIHVwZGF0ZVBlZXJTdGF0dXNlcyhwZWVyU3RhdHVzZXMpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlUGVlclN0YXR1c2VzKHBlZXJTdGF0dXNlcyk7XG4gICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGJvZHkudHlwZSA9PT0gJ21hbmlmZXN0Jykge1xuICAgICAgICAgIGJvZHkucGVlcnMuZm9yRWFjaChwZWVySWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgYyA9IG1ha2VDb25uZWN0aW9uKHBlZXJJZCk7XG4gICAgICAgICAgICBjLmluaXRpYXRlKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBUT0RPOiBhZGQgc2VuZFRvUGVlciAvIHNlbmRUb0FsbFxuICAgICAgICAgIC8vIFRISVMgSVMgVEhFIFBST01JU0lGSUVEIFJFVFVSTiBWQUxVRSBGT1IgVEhFIE9WRVJBTEwgRlVOQ1RJT05cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxJZCxcbiAgICAgICAgICAgIG1lc3NhZ2VzRW1pdHRlcixcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uc0VtaXR0ZXIsXG4gICAgICAgICAgICBwZWVyU3RhdHVzZXNFbWl0dGVyLFxuICAgICAgICAgICAgc2VuZFRvQWxsOiBtZXNzYWdlID0+IE9iamVjdC52YWx1ZXMocGVlckNvbm5lY3Rpb25zKS5mb3JFYWNoKGMgPT4gYy5zZW5kTWVzc2FnZShtZXNzYWdlKSksXG4gICAgICAgICAgICBzZW5kVG9QZWVyOiAocGVlcklkLCBtZXNzYWdlKSA9PiBwZWVyQ29ubmVjdGlvbnNbcGVlcklkXS5zZW5kTWVzc2FnZShtZXNzYWdlKSxcbiAgICAgICAgICAgIHdpZGdldDogYm9keS53aWRnZXQsXG4gICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICBPYmplY3QudmFsdWVzKHBlZXJDb25uZWN0aW9ucykuZm9yRWFjaChjID0+IGMuY2xvc2UoKSk7XG4gICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICBzaWduYWxlci5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHdpbGwgdGhpcyB3b3JrP1xuICAgICAgICAgIHVwZGF0ZVBlZXJDb25uZWN0aW9ucyhwZWVyQ29ubmVjdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGJvZHkudHlwZSA9PT0gJ3BlZXJDb25uZWN0ZWQnKSB7XG4gICAgICAgICAgbWFrZUNvbm5lY3Rpb24oYm9keS5pZCk7XG4gICAgICAgICAgdXBkYXRlUGVlckNvbm5lY3Rpb25zKHBlZXJDb25uZWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9keS50eXBlID09PSAncGVlckRpc2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICBkZWxldGUgc2lnbmFsRW1pdHRlcnNbYm9keS5pZF07XG4gICAgICAgICAgZGVsZXRlIHBlZXJDb25uZWN0aW9uc1tib2R5LmlkXTtcbiAgICAgICAgICBkZWxldGUgcGVlclN0YXR1c2VzW2JvZHkuaWRdO1xuICAgICAgICAgIHVwZGF0ZVBlZXJDb25uZWN0aW9ucyhwZWVyQ29ubmVjdGlvbnMpO1xuICAgICAgICAgIHVwZGF0ZVBlZXJTdGF0dXNlcyhwZWVyU3RhdHVzZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8gZGF0YSBub3QgZnJvbSB0aGUgc2lnbmFsIHNlcnZlciBpdHNlbGYgKGxpa2VseSBhIHBlZXIgUlRDIG1lc3NhZ2UpXG4gICAgICAgIHNpZ25hbEVtaXR0ZXJzW2Zyb21dLnVwZGF0ZShib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IENvbm5lY3Rpb25Qb29sIGZyb20gJy4vY29ubmVjdGlvbi1wb29sJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL2Vudi5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uKCkge1xuICAvLyByZXF1ZXN0IGEgbmV3IHJvb20gZnJvbSB0aGUgc2VydmVyIGFuZCBjb25uZWN0IHRvIGl0XG4gIGZ1bmN0aW9uIGNyZWF0ZVNpZ25hbGVyKHdpZGdldFVyaSkge1xuICAgIC8vIEZJWE1FOiBob3BlIHRoYXQgVVJMIGhvbGRzIHVwLi4uIGludmVzdGlnYXRlIVxuICAgIHJldHVybiBmZXRjaChjb25maWcuc2lnbmFsZXJIdHRwVXJpICsgJy9yZXF1ZXN0LWNoYW5uZWw/d2lkZ2V0PScgKyB3aWRnZXRVcmkpXG4gICAgICAudGhlbihyID0+IHIudGV4dCgpKVxuICAgICAgLnRoZW4oam9pbkNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgc2V0dGluZyB1cCB0aGUgc2lnbmFsZXIsIGdldHRpbmcgYW4gaW5pdGlhbCBwYXlsb2FkLCB0aGVuXG4gICAqIHJldHVybmluZyBhIHByb21pc2Ugb2YgYSBjb25uZWN0aW9uIHBvb2wuIEJlaG9sZCwgc2F1c2FnZS4gOihcbiAgICovXG4gIGZ1bmN0aW9uIGpvaW5DaGFubmVsKGNoYW5uZWxJZCkge1xuICAgIHJldHVybiBDb25uZWN0aW9uUG9vbChjaGFubmVsSWQpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVTaWduYWxlcixcbiAgICBqb2luQ2hhbm5lbCxcbiAgfTtcbn0oKSk7XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9saWIvZW1pdHRlcic7XG5pbXBvcnQgeyBjcmVhdGVEaXNwYXRjaGVyIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuLyoqXG4gKiBMaW5rZWQgY2xvc2VseSB0byB0aGUgY29ubmVjdGlvbiBwb29sLiBJdCdzIGdpdmVuIGEgc2VuZFNpZ25hbCBmdW5jdGlvbiBhbmRcbiAqIGFuIGVtaXR0ZXIgZm9yIG1lc3NhZ2VzIHJlbGV2YW50IHRvIGl0LiBUaGUgcG9vbCB3aWxsIHRha2UgY2FyZSBvZiBtYWtpbmdcbiAqIHN1cmUgdGhhdCB0aGUgcmlnaHQgbWVzc2FnZXMgZ2V0IHRvIHRoZSByaWdodCBjb25uZWN0aW9ucy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VuZFNpZ25hbCwgc2lnbmFsc0VtaXR0ZXIpIHtcbiAgbGV0IHdpZGdldENoYW5uZWw7XG4gIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih7IGljZVNlcnZlcnM6IFt7IHVybDogXCJzdHVuOnN0dW4uc3R1bnByb3RvY29sLm9yZzozNDc4XCIgfV0gfSk7XG4gIGxldCB7IHVwZGF0ZTogdXBkYXRlU3RhdHVzLCAuLi5zdGF0dXNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gIGxldCB7IHVwZGF0ZTogdXBkYXRlTWVzc2FnZSwgLi4ubWVzc2FnZUVtaXR0ZXIgfSA9IGVtaXR0ZXIoKTtcbiAgdXBkYXRlU3RhdHVzKCdkaXNjb25uZWN0ZWQnKTtcblxuICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChldmVudCkgeyBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7IHNpZ25hbCgnaWNlQ2FuZGlkYXRlJywgeyBpY2VDYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZSB9KTsgfX1cblxuICBzaWduYWxzRW1pdHRlci5vbihjcmVhdGVEaXNwYXRjaGVyKCd0eXBlJywgJ3BheWxvYWQnLCB7XG4gICAgYW5zd2VyOiBoYW5kbGVBbnN3ZXIsXG4gICAgb2ZmZXI6IGhhbmRsZU9mZmVyLFxuICAgIGljZUNhbmRpZGF0ZTogaGFuZGxlSWNlQ2FuZGlkYXRlLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNFbWl0dGVyLFxuICAgIHNlbmRNZXNzYWdlOiBtID0+IHdpZGdldENoYW5uZWwuc2VuZChKU09OLnN0cmluZ2lmeShtKSksXG4gICAgbWVzc2FnZUVtaXR0ZXIsXG4gICAgaW5pdGlhdGU6IGNyZWF0ZU9mZmVyLFxuICAgIGNsb3NlOiAoKSA9PiB7IHBlZXJDb25uZWN0aW9uLmNsb3NlKCk7IHBlZXJDb25uZWN0aW9uID0gbnVsbDsgfVxuICB9O1xuXG5cbiAgZnVuY3Rpb24gc2lnbmFsKHR5cGUsIHBheWxvYWQpIHtcbiAgICBzZW5kU2lnbmFsKHsgdHlwZSwgcGF5bG9hZCB9KTtcbiAgfVxuXG4gIC8vIFJUQyBzdHVmZlxuXG4gIC8qKlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgdGhpcyBlbmQgaXMgYmVpbmcgY29udGFjdGVkIGJ5IGEgcGVlciBsb29raW5nIHRvIHNldCB1cCBhXG4gICAqIG5ldyBjb25uZWN0aW9uLiBTZXR1cCBmb3IgdGhlIHJlY2VpdmluZyBlbmQuXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVPZmZlcih7IG9mZmVyIH0pIHtcbiAgICB1cGRhdGVTdGF0dXMoJ2hhbmRsaW5nIG9mZmVyJyk7XG4gICAgcGVlckNvbm5lY3Rpb24ub25kYXRhY2hhbm5lbCA9IGV2ID0+IHNldENoYW5uZWwoZXYuY2hhbm5lbCk7XG5cbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG9mZmVyKSk7XG4gICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKGZ1bmN0aW9uIChhbnN3ZXIpIHtcbiAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICAgIHNpZ25hbCgnYW5zd2VyJywgeyBhbnN3ZXI6IGFuc3dlciB9KTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyKSB7IGFsZXJ0KCdzb21ldGhpbmcgd2VudCB3cm9uZycpIH0pO1xuICB9XG5cblxuICBmdW5jdGlvbiBoYW5kbGVBbnN3ZXIoeyBhbnN3ZXIgfSkge1xuICAgIHVwZGF0ZVN0YXR1cygnaGFuZGxpbmcgYW5zd2VyJyk7XG4gICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihhbnN3ZXIpKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaGFuZGxlSWNlQ2FuZGlkYXRlKHsgaWNlQ2FuZGlkYXRlIH0pIHtcbiAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShpY2VDYW5kaWRhdGUpKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlT2ZmZXIoKSB7XG4gICAgdXBkYXRlU3RhdHVzKCdjb25uZWN0aW5nJyk7XG4gICAgc2V0Q2hhbm5lbChwZWVyQ29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbCgnd2lkZ2V0JywgeyByZWxpYWJsZTogZmFsc2UgfSkpO1xuICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKGZ1bmN0aW9uIChvZmZlcikge1xuICAgICAgc2lnbmFsKCdvZmZlcicsIHsgb2ZmZXI6IG9mZmVyIH0pO1xuICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XG4gICAgfSwgZnVuY3Rpb24gKF9lcnIpIHsgYWxlcnQoJ3NvbWV0aGluZyB3ZW50IHdyb25nJykgfSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHNldENoYW5uZWwoY2gpIHtcbiAgICB3aWRnZXRDaGFubmVsID0gY2g7XG5cbiAgICB3aWRnZXRDaGFubmVsLm9ubWVzc2FnZSA9IG0gPT4ge1xuICAgICAgdXBkYXRlTWVzc2FnZShKU09OLnBhcnNlKG0uZGF0YSkpO1xuICAgIH1cblxuICAgIHdpZGdldENoYW5uZWwub25vcGVuID0gKCkgPT4ge1xuICAgICAgdXBkYXRlU3RhdHVzKCdjaGFubmVsIG9wZW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCdheSBwYXBpJyk7XG4gICAgfTtcblxuICAgIHdpZGdldENoYW5uZWwub25lcnJvciA9IGNvbnNvbGUuZXJyb3I7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
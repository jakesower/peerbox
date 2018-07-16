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

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/*! exports provided: port, signalerHttpUri, signalerWsUri, default */
/***/ (function(module) {

module.exports = {"port":3001,"signalerHttpUri":"http://localhost:3002","signalerWsUri":"ws://localhost:3002/channels"};

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

var _config = __webpack_require__(/*! ../config.json */ "./config.json");

var _config2 = _interopRequireDefault(_config);

var _webrtc = __webpack_require__(/*! ./webrtc */ "./src/webrtc/index.js");

var _webrtc2 = _interopRequireDefault(_webrtc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var catalogElt = document.querySelector('#catalog');
  var widgetElt = document.querySelector('#widget');

  var widgetApi = {
    send: function send(m) {
      console.log('ding');
      console.log(m);
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
        history.pushState({ channel: connectionPool.channelId }, '', '/c/' + connectionPool.channelId);
        widgetElt.style.display = 'block';

        // with everything ready, cradle starts coordinating message passing

        connectionPool.messagesEmitter.on(function (m) {
          widgetApi.send(m.body);
        });

        window.addEventListener('message', function (m) {
          connectionPool.sendToAll(m.data);
        });
      },
      exit: function exit() {
        mode.signaler.close().then(function () {
          return mode.signaler = null;
        });
        widgetElt.style.display = 'none';
        widgetElt.source = '';
      }
    },

    connecting: {
      enter: function enter(_ref2) {
        var channelId = _ref2.channelId;

        _webrtc2.default.joinChannel(channelId).then(function (connectionPool) {
          var widgetContentP = new Promise(function (resolve) {
            console.log('oh hey');
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

    var _emitter = (0, _emitter4.default)(),
        updatePeerConnections = _emitter.update,
        peerConnectionsEmitter = _objectWithoutProperties(_emitter, ['update']);

    var _emitter2 = (0, _emitter4.default)(),
        updateMessages = _emitter2.update,
        messagesEmitter = _objectWithoutProperties(_emitter2, ['update']);

    var signaler = new WebSocket(_config2.default.signalerWsUri + '/' + channelId);

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
          signalEmitters[peerId] = (0, _emitter4.default)();
          var c = (0, _peerConnection2.default)(function (m) {
            return send(peerId, m);
          }, // sendSignal (connection -> pool)
          signalEmitters[peerId] // signalEmitter (pool -> connection)
          );
          peerConnections[peerId] = c;
          c.messageEmitter.on(function (body) {
            return updateMessages({ body: body, from: peerId });
          }); // TODO: (small) memory leak
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
            sendToAll: function sendToAll(message) {
              return Object.values(peerConnections).forEach(function (c) {
                return c.sendMessage(message);
              });
            },
            sendToPeer: function sendToPeer(peerId, message) {
              return peerConnections[peerId].sendMessage(message);
            },
            widget: body.widget
          });

          // will this work?
          updatePeerConnections(peerConnections);
        } else if (body.type === 'peerConnected') {
          makeConnection(body.id);
          updatePeerConnections(peerConnections);
        } else if (body.type === 'peerDisconnected') {
          delete signalEmitters[body.id];
          delete peerConnections[body.id];
          updatePeerConnections(peerConnections);
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

var _config = __webpack_require__(/*! ../../config.json */ "./config.json");

var _config2 = _interopRequireDefault(_config);

var _emitter3 = __webpack_require__(/*! ../lib/emitter */ "./src/lib/emitter.js");

var _emitter4 = _interopRequireDefault(_emitter3);

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

var _config = __webpack_require__(/*! ../../config.json */ "./config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // request a new room from the server and connect to it
  function createSignaler(widgetUri) {
    // FIXME: hope that URL holds up... investigate!
    return fetch(_config2.default.signalerHttpUri + '/request-channel?widget=' + widgetUri).then(function (r) {
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
    sendMessage: widgetChannel.send,
    messageEmitter: widgetChannel.messageEmitter,
    initiate: createOffer
  };

  function signal(type, payload) {
    sendSignal({ type: type, payload: payload });
  }

  // RTC stuff
  function handleOffer(_ref) {
    var offer = _ref.offer;

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

    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  function handleIceCandidate(_ref3) {
    var iceCandidate = _ref3.iceCandidate;

    peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
  }

  function createOffer() {
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
    var channel = peerConnection.createDataChannel(name, { reliable: false });

    var _emitter = (0, _emitter3.default)(),
        update = _emitter.update,
        messageEmitter = _objectWithoutProperties(_emitter, ['update']);

    function send(message) {
      var data = JSON.stringify(message);
      connected ? channel.send(data) : queue.push(data);
    }

    peerConnection.ondatachannel = function (chan) {
      console.log({ chan: chan });
      chan.channel.onmessage = function (m) {
        console.log('got message on chan');
        console.log(m);
        update(JSON.parse(m.data));
      };
    };

    channel.onmessage = function (m) {
      console.log('got message');
      console.log(m);
      update(JSON.parse(m));
    };
    channel.onopen = function () {
      console.log(channel);
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

var _emitter2 = __webpack_require__(/*! ../lib/emitter */ "./src/lib/emitter.js");

var _emitter3 = _interopRequireDefault(_emitter2);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvY29ubmVjdGlvbi1wb29sLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9wZWVyLWNvbm5lY3Rpb24uanMiXSwibmFtZXMiOlsiY2F0YWxvZ0VsdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpZGdldEVsdCIsIndpZGdldEFwaSIsInNlbmQiLCJjb25zb2xlIiwibG9nIiwibSIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsInN0YXRlIiwiY29ubmVjdGlvblBvb2wiLCJtb2RlIiwid2lkZ2V0IiwidHJhbnNpdGlvblRvTW9kZSIsIm5ld01vZGUiLCJlbnRlckFyZ3MiLCJleGl0IiwibW9kZXMiLCJlbnRlciIsImNhdGFsb2ciLCJzdHlsZSIsImRpc3BsYXkiLCJjb25uZWN0ZWQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2hhbm5lbCIsImNoYW5uZWxJZCIsIm1lc3NhZ2VzRW1pdHRlciIsIm9uIiwiYm9keSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZW5kVG9BbGwiLCJkYXRhIiwic2lnbmFsZXIiLCJjbG9zZSIsInRoZW4iLCJzb3VyY2UiLCJjb25uZWN0aW5nIiwiY2xpZW50Iiwiam9pbkNoYW5uZWwiLCJ3aWRnZXRDb250ZW50UCIsIlByb21pc2UiLCJyZXNvbHZlIiwicGFzc2l2ZSIsInNyYyIsImluaXRpYXRpbmciLCJ3aWRnZXRVcmkiLCJjb25uZWN0aW9uUG9vbFAiLCJjcmVhdGVTaWduYWxlciIsImFsbCIsIl8iLCJpbml0IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbHQiLCJkYXRhc2V0IiwibG9jYXRpb24iLCJzZXRNb2RlRnJvbVVyaSIsImNoYW5uZWxQYXR0ZXJuIiwiZm91bmQiLCJwYXRobmFtZSIsIm1hdGNoIiwibGlzdGVuZXJzIiwib25lTGlzdGVuZXJzIiwidXBkYXRlIiwibmV4dFN0YXRlIiwibCIsInB1c2giLCJsaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJmaWx0ZXIiLCJjbGVhciIsImRpc3BhdGNoIiwiY3JlYXRlRGlzcGF0Y2hlciIsImRpc3BhdGNoS2V5IiwicGF5bG9hZEtleSIsImRpc3BhdGNoZXJzIiwib2JqIiwiX3JlamVjdCIsInBlZXJDb25uZWN0aW9ucyIsInNpZ25hbEVtaXR0ZXJzIiwidXBkYXRlUGVlckNvbm5lY3Rpb25zIiwicGVlckNvbm5lY3Rpb25zRW1pdHRlciIsInVwZGF0ZU1lc3NhZ2VzIiwiV2ViU29ja2V0IiwiY29uZmlnIiwic2lnbmFsZXJXc1VyaSIsInRvIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9ubWVzc2FnZSIsIm1lc3NhZ2UiLCJwYXJzZSIsImZyb20iLCJyZWNlaXZlZE1lc3NhZ2UiLCJtYWtlQ29ubmVjdGlvbiIsInBlZXJJZCIsImMiLCJtZXNzYWdlRW1pdHRlciIsInR5cGUiLCJwZWVycyIsImluaXRpYXRlIiwiT2JqZWN0IiwidmFsdWVzIiwic2VuZE1lc3NhZ2UiLCJzZW5kVG9QZWVyIiwiaWQiLCJmZXRjaCIsInNpZ25hbGVySHR0cFVyaSIsInIiLCJ0ZXh0Iiwic2VuZFNpZ25hbCIsInNpZ25hbHNFbWl0dGVyIiwicGVlckNvbm5lY3Rpb24iLCJSVENQZWVyQ29ubmVjdGlvbiIsImljZVNlcnZlcnMiLCJ1cmwiLCJvbmljZWNhbmRpZGF0ZSIsImV2ZW50IiwiY2FuZGlkYXRlIiwic2lnbmFsIiwiaWNlQ2FuZGlkYXRlIiwid2lkZ2V0Q2hhbm5lbCIsIlF1ZXVlZENoYW5uZWwiLCJhbnN3ZXIiLCJoYW5kbGVBbnN3ZXIiLCJvZmZlciIsImhhbmRsZU9mZmVyIiwiaGFuZGxlSWNlQ2FuZGlkYXRlIiwiY3JlYXRlT2ZmZXIiLCJwYXlsb2FkIiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJjcmVhdGVBbnN3ZXIiLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwiZXJyIiwiYWxlcnQiLCJhZGRJY2VDYW5kaWRhdGUiLCJSVENJY2VDYW5kaWRhdGUiLCJfZXJyIiwibmFtZSIsInF1ZXVlIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJyZWxpYWJsZSIsIm9uZGF0YWNoYW5uZWwiLCJjaGFuIiwib25vcGVuIiwib25lcnJvciIsImVycm9yIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5cEJDbEZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7O0FBQ0E7Ozs7OztBQUVDLGFBQVc7QUFDVixNQUFNQSxhQUFhQyxTQUFTQyxhQUFULENBQXVCLFVBQXZCLENBQW5CO0FBQ0EsTUFBTUMsWUFBWUYsU0FBU0Ms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K0IsZ0JBQVE7QUFDckM5SSxjQUFRQyxHQUFSLENBQVksRUFBRThJLFVBQUYsRUFBWjtBQUNBQSxXQUFLMUgsT0FBTCxDQUFhbUUsU0FBYixHQUF5QixhQUFLO0FBQzVCeEYsZ0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBRCxnQkFBUUMsR0FBUixDQUFZQyxDQUFaO0FBQ0EyRCxlQUFPeUIsS0FBS0ksS0FBTCxDQUFXeEYsRUFBRTJCLElBQWIsQ0FBUDtBQUNELE9BSkQ7QUFLRCxLQVBEOztBQVNBUixZQUFRbUUsU0FBUixHQUFvQixhQUFLO0FBQ3ZCeEYsY0FBUUMsR0FBUixDQUFZLGFBQVo7QUFDQUQsY0FBUUMsR0FBUixDQUFZQyxDQUFaO0FBQ0EyRCxhQUFPeUIsS0FBS0ksS0FBTCxDQUFXeEYsQ0FBWCxDQUFQO0FBQ0QsS0FKRDtBQUtBbUIsWUFBUTJILE1BQVIsR0FBaUIsWUFBTTtBQUNyQmhKLGNBQVFDLEdBQVIsQ0FBWW9CLE9BQVo7QUFDQXNILFlBQU16RixPQUFOLENBQWM7QUFBQSxlQUFLN0IsUUFBUXRCLElBQVIsQ0FBYUcsQ0FBYixDQUFMO0FBQUEsT0FBZDtBQUNBeUksY0FBUSxFQUFSO0FBQ0F6SCxrQkFBWSxJQUFaO0FBQ0QsS0FMRDtBQU1BRyxZQUFRNEgsT0FBUixHQUFrQmpKLFFBQVFrSixLQUExQjs7QUFFQSxXQUFPLEVBQUVsRCw4QkFBRixFQUFrQmpHLFVBQWxCLEVBQVA7QUFDRDtBQUNGLEM7O0FBL0ZEOzs7O0FBQ0E7Ozs7OztBQUVBIiwiZmlsZSI6InNjcmlwdHMvcGVlcmJveC1jb25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIFBlZXJib3ggQXJjaGl0ZWN0dXJlXG4gKlxuICogUGVlcmJveCBtZWRpYXRlcyBwMnAgY29tbXVuaWNhdGlvbiBhbW9uZyB1c2VycyBieSBwcm92aWRpbmcgYSB1bmlmb3JtIEFQSSB0b1xuICogd2lkZ2V0cywgc2V0dGluZyB1cCBzaWduYWxpbmcsIGFuZCBhbGwgdGhlIGJvcmluZyBwYXJ0cy5cbiAqXG4gKiBtb2RlczpcbiAqIC0gY2F0YWxvZzogbm90IGNvbm5lY3RlZCB0byBhIHJvb21cbiAqIC0gY29ubmVjdGVkOiBhY3RpdmVseSB1c2luZyBhIHdpZGdldCB3aXRoIHplcm8gb3IgbW9yZSBwZWVyc1xuICogLSBpbml0aWF0aW5nOiBzZXR0aW5nIHVwIGEgcm9vbVxuICogLSBjb25uZWN0aW5nOiBlc3RhYmxpc2hpbmcgY29ubmVjdGlvblBvb2wgYW5kIGdldHRpbmcgdGhlIHdpZGdldFxuICogLSBlbXB0eTogdGhlIHVzZXIgaXMgaW4gYSByb29tIHdpdGggbm8gcGVlcnMgYW5kIG5vIHdpZGdldFxuICpcbiAqIFdpZGdldHMgYXJlIHJ1biBpbiBpZnJhbWVzIGFuZCB1c2Ugd2luZG93LnBvc3RNZXNzYWdlIHRvIGNvbW11bmljYXRlIHdpdGhcbiAqIHBlZXJib3guIEEgbGlicmFyeSB3aWxsIGJlIHdyaXR0ZW4gdG8gc21vb3RoIHRoaXMgcHJvY2Vzcy5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgbWVhbnQgdG8gYmUgaW5saW5lZCB3aXRoIGBpbmRleC5odG1sYC5cbiAqL1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy5qc29uJztcbmltcG9ydCBjbGllbnQgZnJvbSAnLi93ZWJydGMnO1xuXG4oZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGNhdGFsb2dFbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0YWxvZycpO1xuICBjb25zdCB3aWRnZXRFbHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2lkZ2V0Jyk7XG5cbiAgY29uc3Qgd2lkZ2V0QXBpID0ge1xuICAgIHNlbmQ6IG0gPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2RpbmcnKTtcbiAgICAgIGNvbnNvbGUubG9nKG0pO1xuICAgICAgd2lkZ2V0RWx0LmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobSwgJyonKVxuICAgIH1cbiAgfTtcblxuICBsZXQgc3RhdGUgPSB7XG4gICAgY29ubmVjdGlvblBvb2w6IG51bGwsXG4gICAgbW9kZTogbnVsbCxcbiAgICB3aWRnZXQ6IG51bGwsXG4gIH07XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvblRvTW9kZShuZXdNb2RlLCBlbnRlckFyZ3MgPSB7fSkge1xuICAgIGNvbnN0IGV4aXQgPSAobW9kZXNbc3RhdGUubW9kZV0gJiYgbW9kZXNbc3RhdGUubW9kZV0uZXhpdCkgfHwgKCgpID0+IHt9KTtcbiAgICBjb25zdCBlbnRlciA9IChtb2Rlc1tuZXdNb2RlXSAmJiBtb2Rlc1tuZXdNb2RlXS5lbnRlcikgfHwgKCgpID0+IHt9KTtcblxuICAgIHN0YXRlLm1vZGUgPSBuZXdNb2RlO1xuXG4gICAgZXhpdCgpO1xuICAgIGVudGVyKGVudGVyQXJncyk7XG4gIH1cblxuICBjb25zdCBtb2RlcyA9IHtcbiAgICBjYXRhbG9nOiB7XG4gICAgICBlbnRlcjogKCkgPT4ge1xuICAgICAgICBjYXRhbG9nRWx0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSxcbiAgICAgIGV4aXQ6ICgpID0+IHtcbiAgICAgICAgY2F0YWxvZ0VsdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb25uZWN0ZWQ6IHtcbiAgICAgIGVudGVyOiAoeyBjb25uZWN0aW9uUG9vbCB9KSA9PiB7XG4gICAgICAgIHN0YXRlLmNvbm5lY3Rpb25Qb29sID0gY29ubmVjdGlvblBvb2w7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgY2hhbm5lbDogY29ubmVjdGlvblBvb2wuY2hhbm5lbElkIH0sICcnLCAnL2MvJytjb25uZWN0aW9uUG9vbC5jaGFubmVsSWQpO1xuICAgICAgICB3aWRnZXRFbHQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgLy8gd2l0aCBldmVyeXRoaW5nIHJlYWR5LCBjcmFkbGUgc3RhcnRzIGNvb3JkaW5hdGluZyBtZXNzYWdlIHBhc3NpbmdcblxuICAgICAgICBjb25uZWN0aW9uUG9vbC5tZXNzYWdlc0VtaXR0ZXIub24obSA9PiB7XG4gICAgICAgICAgd2lkZ2V0QXBpLnNlbmQobS5ib2R5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtID0+IHtcbiAgICAgICAgICBjb25uZWN0aW9uUG9vbC5zZW5kVG9BbGwobS5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXhpdDogKCkgPT4ge1xuICAgICAgICBtb2RlLnNpZ25hbGVyLmNsb3NlKCkudGhlbigoKSA9PiBtb2RlLnNpZ25hbGVyID0gbnVsbCk7XG4gICAgICAgIHdpZGdldEVsdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB3aWRnZXRFbHQuc291cmNlID0gJyc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbm5lY3Rpbmc6IHtcbiAgICAgIGVudGVyOiAoeyBjaGFubmVsSWQgfSkgPT4ge1xuICAgICAgICBjbGllbnQuam9pbkNoYW5uZWwoY2hhbm5lbElkKVxuICAgICAgICAgIC50aGVuKGNvbm5lY3Rpb25Qb29sID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldENvbnRlbnRQID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvaCBoZXknKVxuICAgICAgICAgICAgICB3aWRnZXRFbHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTsgLy8gVE9ETzogdW5yZWdpdGVyIHRoaXMgb24gbG9hZFxuICAgICAgICAgICAgICB3aWRnZXRFbHQuc3JjID0gY29ubmVjdGlvblBvb2wud2lkZ2V0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHdpZGdldENvbnRlbnRQLnRoZW4oKCkgPT4gdHJhbnNpdGlvblRvTW9kZSgnY29ubmVjdGVkJywgeyBjb25uZWN0aW9uUG9vbCB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGluaXRpYXRpbmc6IHtcbiAgICAgIGVudGVyOiAoeyB3aWRnZXRVcmkgfSkgPT4ge1xuICAgICAgICBjb25zdCB3aWRnZXRDb250ZW50UCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgIHdpZGdldEVsdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSwgeyBwYXNzaXZlOiB0cnVlIH0pOyAvLyBUT0RPOiB1bnJlZ2l0ZXIgdGhpcyBvbiBsb2FkXG4gICAgICAgICAgd2lkZ2V0RWx0LnNyYyA9IHdpZGdldFVyaTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29ubmVjdGlvblBvb2xQID0gY2xpZW50LmNyZWF0ZVNpZ25hbGVyKHdpZGdldFVyaSk7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoW3dpZGdldENvbnRlbnRQLCBjb25uZWN0aW9uUG9vbFBdKS50aGVuKChbXywgY29ubmVjdGlvblBvb2xdKSA9PiB7XG4gICAgICAgICAgc3RhdGUud2lkZ2V0ID0gd2lkZ2V0VXJpO1xuICAgICAgICAgIHRyYW5zaXRpb25Ub01vZGUoJ2Nvbm5lY3RlZCcsIHsgY29ubmVjdGlvblBvb2wsIHdpZGdldFVyaSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud2lkZ2V0LWxhdW5jaGVyJykuZm9yRWFjaCgoZWx0KSA9PiB7XG4gICAgICBlbHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0cmFuc2l0aW9uVG9Nb2RlKCdpbml0aWF0aW5nJywgeyB3aWRnZXRVcmk6IGVsdC5kYXRhc2V0LmxvY2F0aW9uIH0pKVxuICAgIH0pO1xuXG4gICAgc2V0TW9kZUZyb21VcmkoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc2V0TW9kZUZyb21VcmkoKSB7XG4gICAgY29uc3QgY2hhbm5lbFBhdHRlcm4gPSAvXlxcL2NcXC8oW2EtZjAtOV0rKSQvO1xuICAgIGNvbnN0IGZvdW5kID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goY2hhbm5lbFBhdHRlcm4pO1xuICAgIGlmIChmb3VuZCAmJiBmb3VuZFsxXSkge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpb25Ub01vZGUoJ2Nvbm5lY3RpbmcnLCB7IGNoYW5uZWxJZDogZm91bmRbMV0gfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zaXRpb25Ub01vZGUoJ2NhdGFsb2cnKTtcbiAgfVxuXG4gIGluaXQoKTtcblxufSgpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHN0YXRlOyAvLyB0aGlzIGlzIHVubmVjZXNzYXJ5LCBidXQgaGVscGZ1bCBmb3IgZGVidWdnaW5nXG4gIGxldCBsaXN0ZW5lcnMgPSBbXTtcbiAgbGV0IG9uZUxpc3RlbmVycyA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBuZXh0U3RhdGUgPT4ge1xuICAgICAgc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoc3RhdGUpKTtcbiAgICAgIG9uZUxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbChzdGF0ZSkpO1xuICAgICAgb25lTGlzdGVuZXJzID0gW107XG4gICAgfSxcbiAgICBvbjogbGlzdGVuZXIgPT4gbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpLFxuICAgIG9uY2U6IGxpc3RlbmVyID0+IG9uZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKSxcbiAgICBvZmY6IGxpc3RlbmVyID0+IGxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lciksXG4gICAgY2xlYXI6ICgpID0+IGxpc3RlbmVycyA9IFtdLFxuICAgIHN0YXRlLFxuICB9O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKGRpc3BhdGNoS2V5LCBwYXlsb2FkS2V5LCBkaXNwYXRjaGVycywgb2JqKSB7XG4gIHJldHVybiBkaXNwYXRjaGVyc1tvYmpbZGlzcGF0Y2hLZXldXShvYmpbcGF5bG9hZEtleV0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXNwYXRjaGVyKGRpc3BhdGNoS2V5LCBwYXlsb2FkS2V5LCBkaXNwYXRjaGVycykge1xuICByZXR1cm4gb2JqID0+IGRpc3BhdGNoKGRpc3BhdGNoS2V5LCBwYXlsb2FkS2V5LCBkaXNwYXRjaGVycywgb2JqKTtcbn1cbiIsImltcG9ydCBQZWVyQ29ubmVjdGlvbiBmcm9tICcuL3BlZXItY29ubmVjdGlvbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy5qc29uJztcbmltcG9ydCBlbWl0dGVyIGZyb20gJy4uL2xpYi9lbWl0dGVyJztcblxuLyoqXG4gKiBDb25uZWN0aW9uIFBvb2wgbWFuYWdlcyB0aGUgUlRDIHBlZXIgY29ubmVjdGlvbnMuIEl0IGlzIGdpdmVuIGEgc2lnbmFsZXIgdG9cbiAqIHVzZSB0byBjb29yZGluYXRlIHRoZSB0YXNrLiBJdCBwcm92aWRlcyBhbiBBUEkgdG8gZGlzcGF0Y2ggbWVzc2FnZXMgYWNyb3NzXG4gKiB0aGUgY29ubmVjdGlvbnMuXG4gKlxuICogVGhlIGZ1bmN0aW9uIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgb25seSByZXNvbHZlZCBvbmNlIHNvbWUgYmFzaWNcbiAqIGluZm9ybWF0aW9uIGlzIGtub3duLS10aGF0IHRoZSBzaWduYWxlciBpcyBpbmRlZWQgd29ya2luZywgdGhhdCB0aGVyZSBhcmVcbiAqIHBlZXJzLCBhbmQgdGhhdCBhIHdpZGdldCBleGlzdHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjaGFubmVsSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgbGV0IHBlZXJDb25uZWN0aW9ucyA9IHt9O1xuICAgIGxldCBzaWduYWxFbWl0dGVycyA9IHt9O1xuICAgIGxldCB7IHVwZGF0ZTogdXBkYXRlUGVlckNvbm5lY3Rpb25zLCAuLi5wZWVyQ29ubmVjdGlvbnNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gICAgbGV0IHsgdXBkYXRlOiB1cGRhdGVNZXNzYWdlcywgLi4ubWVzc2FnZXNFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG4gICAgY29uc3Qgc2lnbmFsZXIgPSBuZXcgV2ViU29ja2V0KGNvbmZpZy5zaWduYWxlcldzVXJpICsgJy8nICsgY2hhbm5lbElkKTtcblxuICAgIGNvbnN0IHNlbmQgPSAodG8sIGJvZHkpID0+IHNpZ25hbGVyLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyB0bywgYm9keSB9KSk7XG5cbiAgICAvLyBzaWRlIGVmZmVjdHMtci11c1xuICAgIHNpZ25hbGVyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgICAgY29uc3QgeyBmcm9tLCBib2R5IH0gPSBkYXRhO1xuXG4gICAgICBjb25zb2xlLmxvZyh7IHJlY2VpdmVkTWVzc2FnZTogZGF0YSB9KTtcblxuICAgICAgaWYgKGZyb20gPT09ICdzZXJ2ZXInKSB7XG4gICAgICAgIC8vIGhlbHBlclxuICAgICAgICBjb25zdCBtYWtlQ29ubmVjdGlvbiA9IHBlZXJJZCA9PiB7XG4gICAgICAgICAgc2lnbmFsRW1pdHRlcnNbcGVlcklkXSA9IGVtaXR0ZXIoKTtcbiAgICAgICAgICBjb25zdCBjID0gUGVlckNvbm5lY3Rpb24oXG4gICAgICAgICAgICBtID0+IHNlbmQocGVlcklkLCBtKSwgICAvLyBzZW5kU2lnbmFsIChjb25uZWN0aW9uIC0+IHBvb2wpXG4gICAgICAgICAgICBzaWduYWxFbWl0dGVyc1twZWVySWRdLCAvLyBzaWduYWxFbWl0dGVyIChwb29sIC0+IGNvbm5lY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwZWVyQ29ubmVjdGlvbnNbcGVlcklkXSA9IGM7XG4gICAgICAgICAgYy5tZXNzYWdlRW1pdHRlci5vbihib2R5ID0+IHVwZGF0ZU1lc3NhZ2VzKHsgYm9keSwgZnJvbTogcGVlcklkIH0pKTsgLy8gVE9ETzogKHNtYWxsKSBtZW1vcnkgbGVha1xuICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChib2R5LnR5cGUgPT09ICdtYW5pZmVzdCcpIHtcbiAgICAgICAgICBib2R5LnBlZXJzLmZvckVhY2gocGVlcklkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBtYWtlQ29ubmVjdGlvbihwZWVySWQpO1xuICAgICAgICAgICAgYy5pbml0aWF0ZSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gVE9ETzogYWRkIHNlbmRUb1BlZXIgLyBzZW5kVG9BbGxcbiAgICAgICAgICAvLyBUSElTIElTIFRIRSBQUk9NSVNJRklFRCBSRVRVUk4gVkFMVUUgRk9SIFRIRSBPVkVSQUxMIEZVTkNUSU9OXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjaGFubmVsSWQsXG4gICAgICAgICAgICBtZXNzYWdlc0VtaXR0ZXIsXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbnNFbWl0dGVyLFxuICAgICAgICAgICAgc2VuZFRvQWxsOiBtZXNzYWdlID0+IE9iamVjdC52YWx1ZXMocGVlckNvbm5lY3Rpb25zKS5mb3JFYWNoKGMgPT4gYy5zZW5kTWVzc2FnZShtZXNzYWdlKSksXG4gICAgICAgICAgICBzZW5kVG9QZWVyOiAocGVlcklkLCBtZXNzYWdlKSA9PiBwZWVyQ29ubmVjdGlvbnNbcGVlcklkXS5zZW5kTWVzc2FnZShtZXNzYWdlKSxcbiAgICAgICAgICAgIHdpZGdldDogYm9keS53aWRnZXQsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyB3aWxsIHRoaXMgd29yaz9cbiAgICAgICAgICB1cGRhdGVQZWVyQ29ubmVjdGlvbnMocGVlckNvbm5lY3Rpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2R5LnR5cGUgPT09ICdwZWVyQ29ubmVjdGVkJykge1xuICAgICAgICAgIG1ha2VDb25uZWN0aW9uKGJvZHkuaWQpO1xuICAgICAgICAgIHVwZGF0ZVBlZXJDb25uZWN0aW9ucyhwZWVyQ29ubmVjdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGJvZHkudHlwZSA9PT0gJ3BlZXJEaXNjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgZGVsZXRlIHNpZ25hbEVtaXR0ZXJzW2JvZHkuaWRdO1xuICAgICAgICAgIGRlbGV0ZSBwZWVyQ29ubmVjdGlvbnNbYm9keS5pZF07XG4gICAgICAgICAgdXBkYXRlUGVlckNvbm5lY3Rpb25zKHBlZXJDb25uZWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgeyAvLyBkYXRhIG5vdCBmcm9tIHRoZSBzaWduYWwgc2VydmVyIGl0c2VsZiAobGlrZWx5IGEgcGVlciBSVEMgbWVzc2FnZSlcbiAgICAgICAgc2lnbmFsRW1pdHRlcnNbZnJvbV0udXBkYXRlKGJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgQ29ubmVjdGlvblBvb2wgZnJvbSAnLi9jb25uZWN0aW9uLXBvb2wnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcbiAgLy8gcmVxdWVzdCBhIG5ldyByb29tIGZyb20gdGhlIHNlcnZlciBhbmQgY29ubmVjdCB0byBpdFxuICBmdW5jdGlvbiBjcmVhdGVTaWduYWxlcih3aWRnZXRVcmkpIHtcbiAgICAvLyBGSVhNRTogaG9wZSB0aGF0IFVSTCBob2xkcyB1cC4uLiBpbnZlc3RpZ2F0ZSFcbiAgICByZXR1cm4gZmV0Y2goY29uZmlnLnNpZ25hbGVySHR0cFVyaSArICcvcmVxdWVzdC1jaGFubmVsP3dpZGdldD0nICsgd2lkZ2V0VXJpKVxuICAgICAgLnRoZW4ociA9PiByLnRleHQoKSlcbiAgICAgIC50aGVuKGpvaW5DaGFubmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHNldHRpbmcgdXAgdGhlIHNpZ25hbGVyLCBnZXR0aW5nIGFuIGluaXRpYWwgcGF5bG9hZCwgdGhlblxuICAgKiByZXR1cm5pbmcgYSBwcm9taXNlIG9mIGEgY29ubmVjdGlvbiBwb29sLiBCZWhvbGQsIHNhdXNhZ2UuIDooXG4gICAqL1xuICBmdW5jdGlvbiBqb2luQ2hhbm5lbChjaGFubmVsSWQpIHtcbiAgICByZXR1cm4gQ29ubmVjdGlvblBvb2woY2hhbm5lbElkKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlU2lnbmFsZXIsXG4gICAgam9pbkNoYW5uZWwsXG4gIH07XG59KCkpO1xuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vbGliL2VtaXR0ZXInO1xuaW1wb3J0IHsgY3JlYXRlRGlzcGF0Y2hlciB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbi8qKlxuICogTGlua2VkIGNsb3NlbHkgdG8gdGhlIGNvbm5lY3Rpb24gcG9vbC4gSXQncyBnaXZlbiBhIHNlbmRTaWduYWwgZnVuY3Rpb24gYW5kXG4gKiBhbiBlbWl0dGVyIGZvciBtZXNzYWdlcyByZWxldmFudCB0byBpdC4gVGhlIHBvb2wgd2lsbCB0YWtlIGNhcmUgb2YgbWFraW5nXG4gKiBzdXJlIHRoYXQgdGhlIHJpZ2h0IG1lc3NhZ2VzIGdldCB0byB0aGUgcmlnaHQgY29ubmVjdGlvbnMuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbmRTaWduYWwsIHNpZ25hbHNFbWl0dGVyKSB7XG4gIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih7IGljZVNlcnZlcnM6IFt7IHVybDogXCJzdHVuOi8vc3R1bi51Y3NiLmVkdTozNDc4XCIgfV0gfSk7XG5cbiAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHsgaWYgKGV2ZW50LmNhbmRpZGF0ZSkgeyBzaWduYWwoJ2ljZUNhbmRpZGF0ZScsIHsgaWNlQ2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUgfSk7IH19XG5cbiAgY29uc3Qgd2lkZ2V0Q2hhbm5lbCA9IFF1ZXVlZENoYW5uZWwoJ3dpZGdldCcpO1xuXG4gIHNpZ25hbHNFbWl0dGVyLm9uKGNyZWF0ZURpc3BhdGNoZXIoJ3R5cGUnLCAncGF5bG9hZCcsIHtcbiAgICBhbnN3ZXI6IGhhbmRsZUFuc3dlcixcbiAgICBvZmZlcjogaGFuZGxlT2ZmZXIsXG4gICAgaWNlQ2FuZGlkYXRlOiBoYW5kbGVJY2VDYW5kaWRhdGUsXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIHNlbmRNZXNzYWdlOiB3aWRnZXRDaGFubmVsLnNlbmQsXG4gICAgbWVzc2FnZUVtaXR0ZXI6IHdpZGdldENoYW5uZWwubWVzc2FnZUVtaXR0ZXIsXG4gICAgaW5pdGlhdGU6IGNyZWF0ZU9mZmVyLFxuICB9O1xuXG5cbiAgZnVuY3Rpb24gc2lnbmFsKHR5cGUsIHBheWxvYWQpIHtcbiAgICBzZW5kU2lnbmFsKHsgdHlwZSwgcGF5bG9hZCB9KTtcbiAgfVxuXG4gIC8vIFJUQyBzdHVmZlxuICBmdW5jdGlvbiBoYW5kbGVPZmZlcih7IG9mZmVyIH0pIHtcbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG9mZmVyKSk7XG4gICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKGZ1bmN0aW9uIChhbnN3ZXIpIHtcbiAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICAgIHNpZ25hbCgnYW5zd2VyJywgeyBhbnN3ZXI6IGFuc3dlciB9KTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyKSB7IGFsZXJ0KCdzb21ldGhpbmcgd2VudCB3cm9uZycpIH0pO1xuICB9XG5cblxuICBmdW5jdGlvbiBoYW5kbGVBbnN3ZXIoeyBhbnN3ZXIgfSkge1xuICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oYW5zd2VyKSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGhhbmRsZUljZUNhbmRpZGF0ZSh7IGljZUNhbmRpZGF0ZSB9KSB7XG4gICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlKSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9mZmVyKCkge1xuICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKGZ1bmN0aW9uIChvZmZlcikge1xuICAgICAgc2lnbmFsKCdvZmZlcicsIHsgb2ZmZXI6IG9mZmVyIH0pO1xuICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XG4gICAgfSwgZnVuY3Rpb24gKF9lcnIpIHsgYWxlcnQoJ3NvbWV0aGluZyB3ZW50IHdyb25nJykgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBRdWV1ZWRDaGFubmVsKG5hbWUpIHtcbiAgICBsZXQgcXVldWUgPSBbXTtcbiAgICBsZXQgY29ubmVjdGVkID0gZmFsc2U7XG4gICAgbGV0IGNoYW5uZWwgPSBwZWVyQ29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbChuYW1lLCB7IHJlbGlhYmxlOiBmYWxzZSB9KTtcbiAgICBsZXQgeyB1cGRhdGUsIC4uLm1lc3NhZ2VFbWl0dGVyIH0gPSBlbWl0dGVyKCk7XG5cbiAgICBmdW5jdGlvbiBzZW5kKG1lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcbiAgICAgIGNvbm5lY3RlZCA/IGNoYW5uZWwuc2VuZChkYXRhKSA6IHF1ZXVlLnB1c2goZGF0YSk7XG4gICAgfVxuXG4gICAgcGVlckNvbm5lY3Rpb24ub25kYXRhY2hhbm5lbCA9IGNoYW4gPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBjaGFuIH0pXG4gICAgICBjaGFuLmNoYW5uZWwub25tZXNzYWdlID0gbSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnb3QgbWVzc2FnZSBvbiBjaGFuJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG0pO1xuICAgICAgICB1cGRhdGUoSlNPTi5wYXJzZShtLmRhdGEpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFubmVsLm9ubWVzc2FnZSA9IG0gPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2dvdCBtZXNzYWdlJyk7XG4gICAgICBjb25zb2xlLmxvZyhtKTtcbiAgICAgIHVwZGF0ZShKU09OLnBhcnNlKG0pKTtcbiAgICB9XG4gICAgY2hhbm5lbC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhjaGFubmVsKTtcbiAgICAgIHF1ZXVlLmZvckVhY2gobSA9PiBjaGFubmVsLnNlbmQobSkpO1xuICAgICAgcXVldWUgPSBbXTtcbiAgICAgIGNvbm5lY3RlZCA9IHRydWU7XG4gICAgfTtcbiAgICBjaGFubmVsLm9uZXJyb3IgPSBjb25zb2xlLmVycm9yO1xuXG4gICAgcmV0dXJuIHsgbWVzc2FnZUVtaXR0ZXIsIHNlbmQgfTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
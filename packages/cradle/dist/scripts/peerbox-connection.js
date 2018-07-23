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

    var _emitter = (0, _emitter4.default)(),
        updatePeerConnections = _emitter.update,
        peerConnectionsEmitter = _objectWithoutProperties(_emitter, ['update']);

    var _emitter2 = (0, _emitter4.default)(),
        updateMessages = _emitter2.update,
        messagesEmitter = _objectWithoutProperties(_emitter2, ['update']);

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

var _env = __webpack_require__(/*! ../../config/env.json */ "./config/env.json");

var _env2 = _interopRequireDefault(_env);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvY29ubmVjdGlvbi1wb29sLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9wZWVyLWNvbm5lY3Rpb24uanMiXSwibmFtZXMiOlsiY2F0YWxvZ0VsdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpZGdldEVsdCIsIndpZGdldEFwaSIsInNlbmQiLCJjb25zb2xlIiwibG9nIiwibSIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsInN0YXRlIiwiY29ubmVjdGlvblBvb2wiLCJtb2RlIiwid2lkZ2V0IiwidHJhbnNpdGlvblRvTW9kZSIsIm5ld01vZGUiLCJlbnRlckFyZ3MiLCJleGl0IiwibW9kZXMiLCJlbnRlciIsImNhdGFsb2ciLCJzdHlsZSIsImRpc3BsYXkiLCJjb25uZWN0ZWQiLCJtZXNzYWdlc0VtaXR0ZXIiLCJvbiIsImJvZHkiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2VuZFRvQWxsIiwiZGF0YSIsImNsb3NlIiwic291cmNlIiwiY29ubmVjdGluZyIsImNoYW5uZWxJZCIsImNsaWVudCIsImpvaW5DaGFubmVsIiwidGhlbiIsIndpZGdldENvbnRlbnRQIiwiUHJvbWlzZSIsInJlc29sdmUiLCJwYXNzaXZlIiwic3JjIiwiaW5pdGlhdGluZyIsIndpZGdldFVyaSIsImNvbm5lY3Rpb25Qb29sUCIsImNyZWF0ZVNpZ25hbGVyIiwiYWxsIiwiXyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJjaGFubmVsIiwiaW5pdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWx0IiwiZGF0YXNldCIsImxvY2F0aW9uIiwic2V0TW9kZUZyb21VcmkiLCJjaGFubmVsUGF0dGVybiIsImZvdW5kIiwicGF0aG5hbWUiLCJtYXRjaCIsIm9ucG9wc3RhdGUiLCJsaXN0ZW5lcnMiLCJvbmVMaXN0ZW5lcnMiLCJ1cGRhdGUiLCJuZXh0U3RhdGUiLCJsIiwicHVzaCIsImxpc3RlbmVyIiwib25jZSIsIm9mZiIsImZpbHRlciIsImNsZWFyIiwiZGlzcGF0Y2giLCJjcmVhdGVEaXNwYXRjaGVyIiwiZGlzcGF0Y2hLZXkiLCJwYXlsb2FkS2V5IiwiZGlzcGF0Y2hlcnMiLCJvYmoiLCJfcmVqZWN0IiwicGVlckNvbm5lY3Rpb25zIiwic2lnbmFsRW1pdHRlcnMiLCJ1cGRhdGVQZWVyQ29ubmVjdGlvbnMiLCJwZWVyQ29ubmVjdGlvbnNFbWl0dGVyIiwidXBkYXRlTWVzc2FnZXMiLCJzaWduYWxlciIsIldlYlNvY2tldCIsImNvbmZpZyIsInNpZ25hbGVyV3NVcmkiLCJ0byIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwicGFyc2UiLCJmcm9tIiwicmVjZWl2ZWRNZXNzYWdlIiwibWFrZUNvbm5lY3Rpb24iLCJwZWVySWQiLCJjIiwibWVzc2FnZUVtaXR0ZXIiLCJ0eXBlIiwicGVlcnMiLCJpbml0aWF0ZSIsIk9iamVjdCIsInZhbHVlcyIsInNlbmRNZXNzYWdlIiwic2VuZFRvUGVlciIsImlkIiwiZmV0Y2giLCJzaWduYWxlckh0dHBVcmkiLCJyIiwidGV4dCIsInNlbmRTaWduYWwiLCJzaWduYWxzRW1pdHRlciIsInBlZXJDb25uZWN0aW9uIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJpY2VTZXJ2ZXJzIiwidXJsIiwib25pY2VjYW5kaWRhdGUiLCJldmVudCIsImNhbmRpZGF0ZSIsInNpZ25hbCIsImljZUNhbmRpZGF0ZSIsIndpZGdldENoYW5uZWwiLCJRdWV1ZWRDaGFubmVsIiwiYW5zd2VyIiwiaGFuZGxlQW5zd2VyIiwib2ZmZXIiLCJoYW5kbGVPZmZlciIsImhhbmRsZUljZUNhbmRpZGF0ZSIsImNyZWF0ZU9mZmVyIiwicGF5bG9hZCIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsImVyciIsImFsZXJ0IiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiX2VyciIsIm5hbWUiLCJxdWV1ZSIsImNyZWF0ZURhdGFDaGFubmVsIiwicmVsaWFibGUiLCJvbmRhdGFjaGFubmVsIiwiY2hhbiIsIm9ub3BlbiIsIm9uZXJyb3IiLCJlcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eXBCQ2xGQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7Ozs7O0FBRUMsYUFBVztBQUNWLE1BQU1BLGFBQWFDLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBbkI7QUFDQSxNQUFNQyxZQUFZRixT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L3BlZXJib3gtY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBQZWVyYm94IEFyY2hpdGVjdHVyZVxuICpcbiAqIFBlZXJib3ggbWVkaWF0ZXMgcDJwIGNvbW11bmljYXRpb24gYW1vbmcgdXNlcnMgYnkgcHJvdmlkaW5nIGEgdW5pZm9ybSBBUEkgdG9cbiAqIHdpZGdldHMsIHNldHRpbmcgdXAgc2lnbmFsaW5nLCBhbmQgYWxsIHRoZSBib3JpbmcgcGFydHMuXG4gKlxuICogbW9kZXM6XG4gKiAtIGNhdGFsb2c6IG5vdCBjb25uZWN0ZWQgdG8gYSByb29tXG4gKiAtIGNvbm5lY3RlZDogYWN0aXZlbHkgdXNpbmcgYSB3aWRnZXQgd2l0aCB6ZXJvIG9yIG1vcmUgcGVlcnNcbiAqIC0gaW5pdGlhdGluZzogc2V0dGluZyB1cCBhIHJvb21cbiAqIC0gY29ubmVjdGluZzogZXN0YWJsaXNoaW5nIGNvbm5lY3Rpb25Qb29sIGFuZCBnZXR0aW5nIHRoZSB3aWRnZXRcbiAqIC0gZW1wdHk6IHRoZSB1c2VyIGlzIGluIGEgcm9vbSB3aXRoIG5vIHBlZXJzIGFuZCBubyB3aWRnZXRcbiAqXG4gKiBXaWRnZXRzIGFyZSBydW4gaW4gaWZyYW1lcyBhbmQgdXNlIHdpbmRvdy5wb3N0TWVzc2FnZSB0byBjb21tdW5pY2F0ZSB3aXRoXG4gKiBwZWVyYm94LiBBIGxpYnJhcnkgd2lsbCBiZSB3cml0dGVuIHRvIHNtb290aCB0aGlzIHByb2Nlc3MuXG4gKlxuICogVGhpcyBmaWxlIGlzIG1lYW50IHRvIGJlIGlubGluZWQgd2l0aCBgaW5kZXguaHRtbGAuXG4gKi9cblxuaW1wb3J0IGNsaWVudCBmcm9tICcuL3dlYnJ0Yyc7XG5cbihmdW5jdGlvbigpIHtcbiAgY29uc3QgY2F0YWxvZ0VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXRhbG9nJyk7XG4gIGNvbnN0IHdpZGdldEVsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aWRnZXQnKTtcblxuICBjb25zdCB3aWRnZXRBcGkgPSB7XG4gICAgc2VuZDogbSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZGluZycpO1xuICAgICAgY29uc29sZS5sb2cobSk7XG4gICAgICB3aWRnZXRFbHQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtLCAnKicpXG4gICAgfVxuICB9O1xuXG4gIGxldCBzdGF0ZSA9IHtcbiAgICBjb25uZWN0aW9uUG9vbDogbnVsbCxcbiAgICBtb2RlOiBudWxsLFxuICAgIHdpZGdldDogbnVsbCxcbiAgfTtcblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uVG9Nb2RlKG5ld01vZGUsIGVudGVyQXJncyA9IHt9KSB7XG4gICAgY29uc3QgZXhpdCA9IChtb2Rlc1tzdGF0ZS5tb2RlXSAmJiBtb2Rlc1tzdGF0ZS5tb2RlXS5leGl0KSB8fCAoKCkgPT4ge30pO1xuICAgIGNvbnN0IGVudGVyID0gKG1vZGVzW25ld01vZGVdICYmIG1vZGVzW25ld01vZGVdLmVudGVyKSB8fCAoKCkgPT4ge30pO1xuXG4gICAgc3RhdGUubW9kZSA9IG5ld01vZGU7XG5cbiAgICBleGl0KCk7XG4gICAgZW50ZXIoZW50ZXJBcmdzKTtcbiAgfVxuXG4gIGNvbnN0IG1vZGVzID0ge1xuICAgIGNhdGFsb2c6IHtcbiAgICAgIGVudGVyOiAoKSA9PiB7XG4gICAgICAgIGNhdGFsb2dFbHQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9LFxuICAgICAgZXhpdDogKCkgPT4ge1xuICAgICAgICBjYXRhbG9nRWx0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbm5lY3RlZDoge1xuICAgICAgZW50ZXI6ICh7IGNvbm5lY3Rpb25Qb29sIH0pID0+IHtcbiAgICAgICAgc3RhdGUuY29ubmVjdGlvblBvb2wgPSBjb25uZWN0aW9uUG9vbDtcbiAgICAgICAgd2lkZ2V0RWx0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIC8vIHdpdGggZXZlcnl0aGluZyByZWFkeSwgY3JhZGxlIHN0YXJ0cyBjb29yZGluYXRpbmcgbWVzc2FnZSBwYXNzaW5nXG5cbiAgICAgICAgY29ubmVjdGlvblBvb2wubWVzc2FnZXNFbWl0dGVyLm9uKG0gPT4ge1xuICAgICAgICAgIHdpZGdldEFwaS5zZW5kKG0uYm9keSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbSA9PiB7XG4gICAgICAgICAgY29ubmVjdGlvblBvb2wuc2VuZFRvQWxsKG0uZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGV4aXQ6ICgpID0+IHtcbiAgICAgICAgc3RhdGUuY29ubmVjdGlvblBvb2wuY2xvc2UoKTtcbiAgICAgICAgc3RhdGUuY29ubmVjdGlvblBvb2wgPSBudWxsO1xuICAgICAgICB3aWRnZXRFbHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgd2lkZ2V0RWx0LnNvdXJjZSA9ICcnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb25uZWN0aW5nOiB7XG4gICAgICBlbnRlcjogKHsgY2hhbm5lbElkIH0pID0+IHtcbiAgICAgICAgY2xpZW50LmpvaW5DaGFubmVsKGNoYW5uZWxJZClcbiAgICAgICAgICAudGhlbihjb25uZWN0aW9uUG9vbCA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aWRnZXRDb250ZW50UCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb2ggaGV5JylcbiAgICAgICAgICAgICAgd2lkZ2V0RWx0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlLCB7IHBhc3NpdmU6IHRydWUgfSk7IC8vIFRPRE86IHVucmVnaXRlciB0aGlzIG9uIGxvYWRcbiAgICAgICAgICAgICAgd2lkZ2V0RWx0LnNyYyA9IGNvbm5lY3Rpb25Qb29sLndpZGdldDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3aWRnZXRDb250ZW50UC50aGVuKCgpID0+IHRyYW5zaXRpb25Ub01vZGUoJ2Nvbm5lY3RlZCcsIHsgY29ubmVjdGlvblBvb2wgfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0aWF0aW5nOiB7XG4gICAgICBlbnRlcjogKHsgd2lkZ2V0VXJpIH0pID0+IHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0Q29udGVudFAgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICB3aWRnZXRFbHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTsgLy8gVE9ETzogdW5yZWdpdGVyIHRoaXMgb24gbG9hZFxuICAgICAgICAgIHdpZGdldEVsdC5zcmMgPSB3aWRnZXRVcmk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb25Qb29sUCA9IGNsaWVudC5jcmVhdGVTaWduYWxlcih3aWRnZXRVcmkpO1xuXG4gICAgICAgIFByb21pc2UuYWxsKFt3aWRnZXRDb250ZW50UCwgY29ubmVjdGlvblBvb2xQXSkudGhlbigoW18sIGNvbm5lY3Rpb25Qb29sXSkgPT4ge1xuICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgY2hhbm5lbDogY29ubmVjdGlvblBvb2wuY2hhbm5lbElkIH0sICcnLCAnL2MvJytjb25uZWN0aW9uUG9vbC5jaGFubmVsSWQpO1xuICAgICAgICAgIHN0YXRlLndpZGdldCA9IHdpZGdldFVyaTtcbiAgICAgICAgICB0cmFuc2l0aW9uVG9Nb2RlKCdjb25uZWN0ZWQnLCB7IGNvbm5lY3Rpb25Qb29sLCB3aWRnZXRVcmkgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndpZGdldC1sYXVuY2hlcicpLmZvckVhY2goKGVsdCkgPT4ge1xuICAgICAgZWx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdHJhbnNpdGlvblRvTW9kZSgnaW5pdGlhdGluZycsIHsgd2lkZ2V0VXJpOiBlbHQuZGF0YXNldC5sb2NhdGlvbiB9KSlcbiAgICB9KTtcblxuICAgIHNldE1vZGVGcm9tVXJpKCk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHNldE1vZGVGcm9tVXJpKCkge1xuICAgIGNvbnN0IGNoYW5uZWxQYXR0ZXJuID0gL15cXC9jXFwvKFthLWYwLTldKykkLztcbiAgICBjb25zdCBmb3VuZCA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKGNoYW5uZWxQYXR0ZXJuKTtcbiAgICBpZiAoZm91bmQgJiYgZm91bmRbMV0pIHtcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uVG9Nb2RlKCdjb25uZWN0aW5nJywgeyBjaGFubmVsSWQ6IGZvdW5kWzFdIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2l0aW9uVG9Nb2RlKCdjYXRhbG9nJyk7XG4gIH1cblxuICB3aW5kb3cub25wb3BzdGF0ZSA9IHNldE1vZGVGcm9tVXJpO1xuICBpbml0KCk7XG5cbn0oKSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCBzdGF0ZTsgLy8gdGhpcyBpcyB1bm5lY2Vzc2FyeSwgYnV0IGhlbHBmdWwgZm9yIGRlYnVnZ2luZ1xuICBsZXQgbGlzdGVuZXJzID0gW107XG4gIGxldCBvbmVMaXN0ZW5lcnMgPSBbXTtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogbmV4dFN0YXRlID0+IHtcbiAgICAgIHN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHN0YXRlKSk7XG4gICAgICBvbmVMaXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoc3RhdGUpKTtcbiAgICAgIG9uZUxpc3RlbmVycyA9IFtdO1xuICAgIH0sXG4gICAgb246IGxpc3RlbmVyID0+IGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKSxcbiAgICBvbmNlOiBsaXN0ZW5lciA9PiBvbmVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lciksXG4gICAgb2ZmOiBsaXN0ZW5lciA9PiBsaXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpLFxuICAgIGNsZWFyOiAoKSA9PiBsaXN0ZW5lcnMgPSBbXSxcbiAgICBzdGF0ZSxcbiAgfTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaChkaXNwYXRjaEtleSwgcGF5bG9hZEtleSwgZGlzcGF0Y2hlcnMsIG9iaikge1xuICByZXR1cm4gZGlzcGF0Y2hlcnNbb2JqW2Rpc3BhdGNoS2V5XV0ob2JqW3BheWxvYWRLZXldKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2hlcihkaXNwYXRjaEtleSwgcGF5bG9hZEtleSwgZGlzcGF0Y2hlcnMpIHtcbiAgcmV0dXJuIG9iaiA9PiBkaXNwYXRjaChkaXNwYXRjaEtleSwgcGF5bG9hZEtleSwgZGlzcGF0Y2hlcnMsIG9iaik7XG59XG4iLCJpbXBvcnQgUGVlckNvbm5lY3Rpb24gZnJvbSAnLi9wZWVyLWNvbm5lY3Rpb24nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvZW52Lmpzb24nO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vbGliL2VtaXR0ZXInO1xuXG4vKipcbiAqIENvbm5lY3Rpb24gUG9vbCBtYW5hZ2VzIHRoZSBSVEMgcGVlciBjb25uZWN0aW9ucy4gSXQgaXMgZ2l2ZW4gYSBzaWduYWxlciB0b1xuICogdXNlIHRvIGNvb3JkaW5hdGUgdGhlIHRhc2suIEl0IHByb3ZpZGVzIGFuIEFQSSB0byBkaXNwYXRjaCBtZXNzYWdlcyBhY3Jvc3NcbiAqIHRoZSBjb25uZWN0aW9ucy5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gcmV0dXJucyBhIHByb21pc2UgdGhhdCBpcyBvbmx5IHJlc29sdmVkIG9uY2Ugc29tZSBiYXNpY1xuICogaW5mb3JtYXRpb24gaXMga25vd24tLXRoYXQgdGhlIHNpZ25hbGVyIGlzIGluZGVlZCB3b3JraW5nLCB0aGF0IHRoZXJlIGFyZVxuICogcGVlcnMsIGFuZCB0aGF0IGEgd2lkZ2V0IGV4aXN0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNoYW5uZWxJZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICBsZXQgcGVlckNvbm5lY3Rpb25zID0ge307XG4gICAgbGV0IHNpZ25hbEVtaXR0ZXJzID0ge307XG4gICAgbGV0IHsgdXBkYXRlOiB1cGRhdGVQZWVyQ29ubmVjdGlvbnMsIC4uLnBlZXJDb25uZWN0aW9uc0VtaXR0ZXIgfSA9IGVtaXR0ZXIoKTtcbiAgICBsZXQgeyB1cGRhdGU6IHVwZGF0ZU1lc3NhZ2VzLCAuLi5tZXNzYWdlc0VtaXR0ZXIgfSA9IGVtaXR0ZXIoKTtcbiAgICBjb25zdCBzaWduYWxlciA9IG5ldyBXZWJTb2NrZXQoY29uZmlnLnNpZ25hbGVyV3NVcmkgKyAnLycgKyBjaGFubmVsSWQpO1xuXG4gICAgY29uc3Qgc2VuZCA9ICh0bywgYm9keSkgPT4gc2lnbmFsZXIuc2VuZChKU09OLnN0cmluZ2lmeSh7IHRvLCBib2R5IH0pKTtcblxuICAgIC8vIHNpZGUgZWZmZWN0cy1yLXVzXG4gICAgc2lnbmFsZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gICAgICBjb25zdCB7IGZyb20sIGJvZHkgfSA9IGRhdGE7XG5cbiAgICAgIGNvbnNvbGUubG9nKHsgcmVjZWl2ZWRNZXNzYWdlOiBkYXRhIH0pO1xuXG4gICAgICBpZiAoZnJvbSA9PT0gJ3NlcnZlcicpIHtcbiAgICAgICAgLy8gaGVscGVyXG4gICAgICAgIGNvbnN0IG1ha2VDb25uZWN0aW9uID0gcGVlcklkID0+IHtcbiAgICAgICAgICBzaWduYWxFbWl0dGVyc1twZWVySWRdID0gZW1pdHRlcigpO1xuICAgICAgICAgIGNvbnN0IGMgPSBQZWVyQ29ubmVjdGlvbihcbiAgICAgICAgICAgIG0gPT4gc2VuZChwZWVySWQsIG0pLCAgIC8vIHNlbmRTaWduYWwgKGNvbm5lY3Rpb24gLT4gcG9vbClcbiAgICAgICAgICAgIHNpZ25hbEVtaXR0ZXJzW3BlZXJJZF0sIC8vIHNpZ25hbEVtaXR0ZXIgKHBvb2wgLT4gY29ubmVjdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICAgIHBlZXJDb25uZWN0aW9uc1twZWVySWRdID0gYztcbiAgICAgICAgICBjLm1lc3NhZ2VFbWl0dGVyLm9uKGJvZHkgPT4gdXBkYXRlTWVzc2FnZXMoeyBib2R5LCBmcm9tOiBwZWVySWQgfSkpOyAvLyBUT0RPOiAoc21hbGwpIG1lbW9yeSBsZWFrXG4gICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGJvZHkudHlwZSA9PT0gJ21hbmlmZXN0Jykge1xuICAgICAgICAgIGJvZHkucGVlcnMuZm9yRWFjaChwZWVySWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgYyA9IG1ha2VDb25uZWN0aW9uKHBlZXJJZCk7XG4gICAgICAgICAgICBjLmluaXRpYXRlKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBUT0RPOiBhZGQgc2VuZFRvUGVlciAvIHNlbmRUb0FsbFxuICAgICAgICAgIC8vIFRISVMgSVMgVEhFIFBST01JU0lGSUVEIFJFVFVSTiBWQUxVRSBGT1IgVEhFIE9WRVJBTEwgRlVOQ1RJT05cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxJZCxcbiAgICAgICAgICAgIG1lc3NhZ2VzRW1pdHRlcixcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uc0VtaXR0ZXIsXG4gICAgICAgICAgICBzZW5kVG9BbGw6IG1lc3NhZ2UgPT4gT2JqZWN0LnZhbHVlcyhwZWVyQ29ubmVjdGlvbnMpLmZvckVhY2goYyA9PiBjLnNlbmRNZXNzYWdlKG1lc3NhZ2UpKSxcbiAgICAgICAgICAgIHNlbmRUb1BlZXI6IChwZWVySWQsIG1lc3NhZ2UpID0+IHBlZXJDb25uZWN0aW9uc1twZWVySWRdLnNlbmRNZXNzYWdlKG1lc3NhZ2UpLFxuICAgICAgICAgICAgd2lkZ2V0OiBib2R5LndpZGdldCxcbiAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMocGVlckNvbm5lY3Rpb25zKS5mb3JFYWNoKGMgPT4gYy5jbG9zZSgpKTtcbiAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25zID0ge307XG4gICAgICAgICAgICAgIHNpZ25hbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gd2lsbCB0aGlzIHdvcms/XG4gICAgICAgICAgdXBkYXRlUGVlckNvbm5lY3Rpb25zKHBlZXJDb25uZWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9keS50eXBlID09PSAncGVlckNvbm5lY3RlZCcpIHtcbiAgICAgICAgICBtYWtlQ29ubmVjdGlvbihib2R5LmlkKTtcbiAgICAgICAgICB1cGRhdGVQZWVyQ29ubmVjdGlvbnMocGVlckNvbm5lY3Rpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2R5LnR5cGUgPT09ICdwZWVyRGlzY29ubmVjdGVkJykge1xuICAgICAgICAgIGRlbGV0ZSBzaWduYWxFbWl0dGVyc1tib2R5LmlkXTtcbiAgICAgICAgICBkZWxldGUgcGVlckNvbm5lY3Rpb25zW2JvZHkuaWRdO1xuICAgICAgICAgIHVwZGF0ZVBlZXJDb25uZWN0aW9ucyhwZWVyQ29ubmVjdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8gZGF0YSBub3QgZnJvbSB0aGUgc2lnbmFsIHNlcnZlciBpdHNlbGYgKGxpa2VseSBhIHBlZXIgUlRDIG1lc3NhZ2UpXG4gICAgICAgIHNpZ25hbEVtaXR0ZXJzW2Zyb21dLnVwZGF0ZShib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IENvbm5lY3Rpb25Qb29sIGZyb20gJy4vY29ubmVjdGlvbi1wb29sJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL2Vudi5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uKCkge1xuICAvLyByZXF1ZXN0IGEgbmV3IHJvb20gZnJvbSB0aGUgc2VydmVyIGFuZCBjb25uZWN0IHRvIGl0XG4gIGZ1bmN0aW9uIGNyZWF0ZVNpZ25hbGVyKHdpZGdldFVyaSkge1xuICAgIC8vIEZJWE1FOiBob3BlIHRoYXQgVVJMIGhvbGRzIHVwLi4uIGludmVzdGlnYXRlIVxuICAgIHJldHVybiBmZXRjaChjb25maWcuc2lnbmFsZXJIdHRwVXJpICsgJy9yZXF1ZXN0LWNoYW5uZWw/d2lkZ2V0PScgKyB3aWRnZXRVcmkpXG4gICAgICAudGhlbihyID0+IHIudGV4dCgpKVxuICAgICAgLnRoZW4oam9pbkNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgc2V0dGluZyB1cCB0aGUgc2lnbmFsZXIsIGdldHRpbmcgYW4gaW5pdGlhbCBwYXlsb2FkLCB0aGVuXG4gICAqIHJldHVybmluZyBhIHByb21pc2Ugb2YgYSBjb25uZWN0aW9uIHBvb2wuIEJlaG9sZCwgc2F1c2FnZS4gOihcbiAgICovXG4gIGZ1bmN0aW9uIGpvaW5DaGFubmVsKGNoYW5uZWxJZCkge1xuICAgIHJldHVybiBDb25uZWN0aW9uUG9vbChjaGFubmVsSWQpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVTaWduYWxlcixcbiAgICBqb2luQ2hhbm5lbCxcbiAgfTtcbn0oKSk7XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9saWIvZW1pdHRlcic7XG5pbXBvcnQgeyBjcmVhdGVEaXNwYXRjaGVyIH0gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuLyoqXG4gKiBMaW5rZWQgY2xvc2VseSB0byB0aGUgY29ubmVjdGlvbiBwb29sLiBJdCdzIGdpdmVuIGEgc2VuZFNpZ25hbCBmdW5jdGlvbiBhbmRcbiAqIGFuIGVtaXR0ZXIgZm9yIG1lc3NhZ2VzIHJlbGV2YW50IHRvIGl0LiBUaGUgcG9vbCB3aWxsIHRha2UgY2FyZSBvZiBtYWtpbmdcbiAqIHN1cmUgdGhhdCB0aGUgcmlnaHQgbWVzc2FnZXMgZ2V0IHRvIHRoZSByaWdodCBjb25uZWN0aW9ucy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VuZFNpZ25hbCwgc2lnbmFsc0VtaXR0ZXIpIHtcbiAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHsgaWNlU2VydmVyczogW3sgdXJsOiBcInN0dW46Ly9zdHVuLnVjc2IuZWR1OjM0NzhcIiB9XSB9KTtcblxuICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChldmVudCkgeyBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7IHNpZ25hbCgnaWNlQ2FuZGlkYXRlJywgeyBpY2VDYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZSB9KTsgfX1cblxuICBjb25zdCB3aWRnZXRDaGFubmVsID0gUXVldWVkQ2hhbm5lbCgnd2lkZ2V0Jyk7XG5cbiAgc2lnbmFsc0VtaXR0ZXIub24oY3JlYXRlRGlzcGF0Y2hlcigndHlwZScsICdwYXlsb2FkJywge1xuICAgIGFuc3dlcjogaGFuZGxlQW5zd2VyLFxuICAgIG9mZmVyOiBoYW5kbGVPZmZlcixcbiAgICBpY2VDYW5kaWRhdGU6IGhhbmRsZUljZUNhbmRpZGF0ZSxcbiAgfSkpO1xuXG4gIHJldHVybiB7XG4gICAgc2VuZE1lc3NhZ2U6IHdpZGdldENoYW5uZWwuc2VuZCxcbiAgICBtZXNzYWdlRW1pdHRlcjogd2lkZ2V0Q2hhbm5lbC5tZXNzYWdlRW1pdHRlcixcbiAgICBpbml0aWF0ZTogY3JlYXRlT2ZmZXIsXG4gICAgY2xvc2U6ICgpID0+IHsgcGVlckNvbm5lY3Rpb24uY2xvc2UoKTsgcGVlckNvbm5lY3Rpb24gPSBudWxsOyB9XG4gIH07XG5cblxuICBmdW5jdGlvbiBzaWduYWwodHlwZSwgcGF5bG9hZCkge1xuICAgIHNlbmRTaWduYWwoeyB0eXBlLCBwYXlsb2FkIH0pO1xuICB9XG5cbiAgLy8gUlRDIHN0dWZmXG4gIGZ1bmN0aW9uIGhhbmRsZU9mZmVyKHsgb2ZmZXIgfSkge1xuICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24ob2ZmZXIpKTtcbiAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoZnVuY3Rpb24gKGFuc3dlcikge1xuICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihhbnN3ZXIpO1xuICAgICAgc2lnbmFsKCdhbnN3ZXInLCB7IGFuc3dlcjogYW5zd2VyIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHsgYWxlcnQoJ3NvbWV0aGluZyB3ZW50IHdyb25nJykgfSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGhhbmRsZUFuc3dlcih7IGFuc3dlciB9KSB7XG4gICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihhbnN3ZXIpKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaGFuZGxlSWNlQ2FuZGlkYXRlKHsgaWNlQ2FuZGlkYXRlIH0pIHtcbiAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShpY2VDYW5kaWRhdGUpKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlT2ZmZXIoKSB7XG4gICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlT2ZmZXIoZnVuY3Rpb24gKG9mZmVyKSB7XG4gICAgICBzaWduYWwoJ29mZmVyJywgeyBvZmZlcjogb2ZmZXIgfSk7XG4gICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcbiAgICB9LCBmdW5jdGlvbiAoX2VycikgeyBhbGVydCgnc29tZXRoaW5nIHdlbnQgd3JvbmcnKSB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFF1ZXVlZENoYW5uZWwobmFtZSkge1xuICAgIGxldCBxdWV1ZSA9IFtdO1xuICAgIGxldCBjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICBsZXQgY2hhbm5lbCA9IHBlZXJDb25uZWN0aW9uLmNyZWF0ZURhdGFDaGFubmVsKG5hbWUsIHsgcmVsaWFibGU6IGZhbHNlIH0pO1xuICAgIGxldCB7IHVwZGF0ZSwgLi4ubWVzc2FnZUVtaXR0ZXIgfSA9IGVtaXR0ZXIoKTtcblxuICAgIGZ1bmN0aW9uIHNlbmQobWVzc2FnZSkge1xuICAgICAgY29uc3QgZGF0YSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xuICAgICAgY29ubmVjdGVkID8gY2hhbm5lbC5zZW5kKGRhdGEpIDogcXVldWUucHVzaChkYXRhKTtcbiAgICB9XG5cbiAgICBwZWVyQ29ubmVjdGlvbi5vbmRhdGFjaGFubmVsID0gY2hhbiA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IGNoYW4gfSlcbiAgICAgIGNoYW4uY2hhbm5lbC5vbm1lc3NhZ2UgPSBtID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdCBtZXNzYWdlIG9uIGNoYW4nKTtcbiAgICAgICAgY29uc29sZS5sb2cobSk7XG4gICAgICAgIHVwZGF0ZShKU09OLnBhcnNlKG0uZGF0YSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5uZWwub25tZXNzYWdlID0gbSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZ290IG1lc3NhZ2UnKTtcbiAgICAgIGNvbnNvbGUubG9nKG0pO1xuICAgICAgdXBkYXRlKEpTT04ucGFyc2UobSkpO1xuICAgIH1cbiAgICBjaGFubmVsLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGNoYW5uZWwpO1xuICAgICAgcXVldWUuZm9yRWFjaChtID0+IGNoYW5uZWwuc2VuZChtKSk7XG4gICAgICBxdWV1ZSA9IFtdO1xuICAgICAgY29ubmVjdGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIGNoYW5uZWwub25lcnJvciA9IGNvbnNvbGUuZXJyb3I7XG5cbiAgICByZXR1cm4geyBtZXNzYWdlRW1pdHRlciwgc2VuZCB9O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
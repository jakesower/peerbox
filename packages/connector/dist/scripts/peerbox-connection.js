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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/*! exports provided: port, signalerPath, default */
/***/ (function(module) {

module.exports = {"port":3001,"signalerPath":"ws://localhost:3002/"};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _webrtc = __webpack_require__(/*! ./webrtc */ "./src/webrtc/index.js");

var _webrtc2 = _interopRequireDefault(_webrtc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var qs = document.querySelector.bind(document);
  var state = void 0;

  function transitionToState(newState, enterArgs) {
    var exit = states[state] && states[state].exit || function () {};
    var enter = states[newState] && states[newState].enter || function () {};

    state = newState;

    exit();
    enter(enterArgs);
  }

  var states = {
    connected: {
      enter: function enter(_ref) {
        var widgetUri = _ref.widgetUri;

        qs('#widget').style.display = 'block';
        qs('#widget').src = widgetUri;
      },
      exit: function exit() {
        qs('#widget').style.display = 'none';
        qs('#widget').source = '';
      }
    },

    catalog: {
      enter: function enter() {
        qs('#catalog').style.display = 'block';
      },
      exit: function exit() {
        qs('#catalog').style.display = 'none';
      }
    }
  };

  function init() {
    transitionToState('catalog');

    document.querySelectorAll('.widget-launcher').forEach(function (elt) {
      elt.addEventListener('click', function () {
        return transitionToState('connected', { widgetUri: elt.dataset.location });
      });
    });
  }

  function joinRoom(room) {
    state = 'connecting';
    _webrtc2.default.join(room);
  }

  init();
})(); /**
       * Adhoc Architecture
       *
       * Adhoc mediates p2p communication among users by providing a uniform API to
       * widgets, setting up signaling, and all the boring parts.
       *
       * States:
       * - catalog: not connected to a room
       * - connected: actively using a widget with zero or more peers
       * - initiating: setting up a room
       * - connecting: establishing connections and getting the widget
       * - empty: the user is in a room with no peers and no widget
       *
       * Widgets are run in iframes and use window.postMessage to communicate with
       * adhoc. A library will be written to smooth this process.
       *
       * This file is meant to be inlined with `index.html`.
       */

/***/ }),

/***/ "./src/webrtc/index.js":
/*!*****************************!*\
  !*** ./src/webrtc/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _peerConnection = __webpack_require__(/*! ./peer-connection */ "./src/webrtc/peer-connection.js");

var _signalHandler = __webpack_require__(/*! ./signal-handler */ "./src/webrtc/signal-handler.js");

var _signalHandler2 = _interopRequireDefault(_signalHandler);

var _config = __webpack_require__(/*! ../../config.json */ "./config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  This is the api for an adhoc client that uses WebRTC as its primary
  communication channel. See: https://webrtc.org

  A signaling service is required to handle connection management and peer
  discovery. All content is sent directly from one peer to another. This client
  is comprised of three primary components:

  The *Connection Manager* combines communications among widgets, the signaler,
  and individual peer connections. This is ultimately what is returned by the
  client and what widgets interact with. It is responsible for shuttling
  messages around among components.

  A *Peer Connection* represents a connection between the local user and a
  single remote user. Messages originating locally are fanned out to each peer
  connection, and incoming remote messages are bundled together into a single
  message stream by the Connection Manager.

  A *Signaler* handles WebRTC signaling. See:
  https://www.webrtc-experiment.com/docs/WebRTC-Signaling-Concepts.html
  As of now, it's simply a WebSocket.
*/

window.adhoc = window.adhoc || {};
window.adhoc.createConnection = function (room, mode, initManifest) {
  var protocol = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + window.location.pathname;
  var uri = room ? _config2.default.signalerPath + room : _config2.default.signalerPath;
  var rtcSignaler = new WebSocket(protocol + uri);

  var manifest = initManifest || {};
  var peerConnections = {};
  var api = {
    send: function send(data) {}, // defined later in function
    signal: function signal(_signal, data) {}, // defined later in function
    onmessage: function onmessage(func) {}, // to be set externally
    onsignal: function onsignal(func) {}, // to be set externally

    manifest: manifest
  };

  // Helper for providing a minimal api to peer connections
  var peerInterface = function peerInterface(peerID) {
    return {
      // channel to communicate with the webrtc signaler
      rtcsignal: function rtcsignal(s, m) {
        return rtcSignaler.send(JSON.stringify(Object.assign(m, { to: peerID, type: s })));
      }
    };
  };

  // Fan out incoming message across each peer connection
  api.send = function (message) {
    return Object.keys(peerConnections).forEach(function (k) {
      // console.log( 'send to ' + k )
      peerConnections[k].send(message);
    });
  };

  api.signal = function (signal, data) {}; // maybe this will be useful later


  var rtcSignalHandler = (0, _signalHandler2.default)({
    // A full list of peers has been received--initiate connections with all.
    peers: function peers(_ref) {
      var _peers = _ref.peers;
      return _peers.forEach(function (id) {
        peerConnections[id] = (0, _peerConnection.createInitiator)(id, peerInterface(id));
        peerConnections[id].signal('manifest', manifest);
        peerConnections[id].onsignal = function (s, d) {
          return api.onsignal(s, d);
        };
        peerConnections[id].onmessage = function (m) {
          return api.onmessage(m);
        };
      });
    },

    // A single peer has connected, create a connection, but do not initiate.
    peerConnected: function peerConnected(_ref2) {
      var id = _ref2.id;

      if (!peerConnections[id]) {
        peerConnections[id] = (0, _peerConnection.createReceiver)(id, peerInterface(id));
        peerConnections[id].signal('manifest', manifest);
        peerConnections[id].onsignal = function (s, d) {
          return api.onsignal(s, d);
        };
        peerConnections[id].onmessage = function (m) {
          return api.onmessage(m);
        };
      }
    },

    // Peer disconnected. Close and remove the connection.
    peerDisconnected: function peerDisconnected(_ref3) {
      var id = _ref3.id;

      peerConnections[id].signal('close');
      delete peerConnections[id];
    }
  },

  // Catchall signal handler
  function (signal, data) {
    // A targeted signal was received. Have the connection handle it.
    if ('from' in data) {
      var pc = peerConnections[data.from];
      if (!pc) {
        pc = (0, _peerConnection.createReceiver)(data.from, peerInterface(id));
        pc.signal('manifest', manifest);
        pc.onsignal = function (s, d) {
          return api.onsignal(s, d);
        };
        peerConnections[data.from] = pc;
      }

      pc.rtcHandlers[signal](data);
    } else {
      console.warn("Unrecognized message received:");
      console.warn({ signal: signal, data: data });
    }
  }); // End signal handler

  rtcSignaler.onmessage = function (message) {
    var data = JSON.parse(message.data);
    rtcSignalHandler(data.type, data);
  };

  return api;
};

/***/ }),

/***/ "./src/webrtc/peer-connection.js":
/*!***************************************!*\
  !*** ./src/webrtc/peer-connection.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = {
  rtcConfig: {
    iceServers: [{ url: "stun:stun.1.google.com:19302" }]
  }
};

var rtc = __webpack_require__(/*! ./rtc */ "./src/webrtc/rtc.js");

/**
  @param {String} id - the peerID
  @param {Boolean} init - is this side initiating the connection?
  @param {Object} signaler - api with signaler (send only)
  @param {Object} widget - api to widget (send only)
  @param {Object} connection - api to main connection
*/
module.exports = {
  createInitiator: createInitiator,
  createReceiver: createReceiver

  /**
    Initiators are responsible for initiating the connection like so:
  
    1. Send an offer
    2. Receive an answer
  */
};function createInitiator(id, connection) {
  var peerConnection = createPeerConnection(connection);
  var opts = { reliable: false };

  var queues = { messages: createQueue(), signals: createQueue() };
  var channels = {
    messages: peerConnection.createDataChannel('messages', opts),
    signals: peerConnection.createDataChannel('signals', opts)
  };

  var api = {
    send: queues.messages.send,
    signal: queues.signals.send,
    onmessage: function onmessage() {},
    onsignal: function onsignal() {},

    rtcHandlers: {
      iceCandidate: function iceCandidate(s) {
        return rtc.handleIceCandidate(peerConnection, s);
      },
      answer: function answer(s) {
        return rtc.handleAnswer(peerConnection, s);
      },
      close: function close() {
        return peerConnection.close();
      }
    }
  };

  Object.keys(channels).forEach(function (c) {
    return channels[c].onopen = function () {
      return actualizeChannel(channels[c], api, queues.messages);
    };
  });

  rtc.createOffer(connection.rtcsignal, peerConnection);

  return api;
}

/**
  Receivers are responsible for receiving the connection like so:

  1. Receive an offer
  2. Send an answer
*/

function createReceiver(id, connection) {
  var peerConnection = createPeerConnection(connection);
  var queues = { messages: createQueue(), signals: createQueue() };

  var api = {
    send: queues.messages.send,
    signal: queues.signals.send,
    onmessage: function onmessage() {},
    onsignal: function onsignal() {},

    rtcHandlers: {
      iceCandidate: function iceCandidate(s) {
        return rtc.handleIceCandidate(peerConnection, s);
      },
      offer: function offer(s) {
        return rtc.handleOffer(connection.rtcsignal, peerConnection, s);
      },
      close: function close() {
        return peerConnection.close();
      }
    }
  };

  peerConnection.ondatachannel = function (ev) {
    actualizeChannel(ev.channel, api, queues[ev.channel.label]);
  };

  return api;
}

// Helpers

function actualizeChannel(channel, api, queue) {
  if (channel.label === 'messages') {
    api.send = function (message) {
      // console.log( 'sending message' );
      // console.log( message );
      channel.send(message);
    };
    channel.onmessage = function (message) {
      // console.log( 'got message' )
      // console.log( message.data )
      api.onmessage(message);
    };
    queue.drain(api.send);
  } else {
    api.signal = function (signal, data) {
      channel.send(JSON.stringify([signal, data]));
    };
    channel.onmessage = function (message) {
      var data = JSON.parse(message.data);
      api.onsignal(data[0], data[1]);
    };
    queue.drain(api.signal);
  }
}

function createPeerConnection(connection) {
  var pc = new RTCPeerConnection(config.rtcConfig);

  // ICE handlers
  pc.onicecandidate = function (event) {
    if (event.candidate) {
      connection.rtcsignal('iceCandidate', { iceCandidate: event.candidate });
    }
  };

  return pc;
}

// hold on to arguments until a function to call is sent
function createQueue() {
  var queue = [];

  return {
    send: function send() {
      queue.push(Array.from(arguments));
    },
    drain: function drain(drainFunc) {
      queue.forEach(function (args) {
        return drainFunc.apply(null, args);
      });
      calls = [];
    }
  };
}

/***/ }),

/***/ "./src/webrtc/rtc.js":
/*!***************************!*\
  !*** ./src/webrtc/rtc.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
  Functions that handle RTC boilerplate. Arguments used throughout module:

  @param {Function} signal - function to send signals to a signaler
  @param {RTCPeerConnection} peerConnection - connection to handle
  @param {Object} args - contextual arguments
*/

function handleOffer(signal, peerConnection, _ref) {
  var offer = _ref.offer;

  peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  peerConnection.createAnswer(function (answer) {
    peerConnection.setLocalDescription(answer);
    signal('answer', { answer: answer });
  }, function (err) {
    alert('something went wrong');
  });
}

function handleAnswer(peerConnection, _ref2) {
  var answer = _ref2.answer;

  peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

function handleIceCandidate(peerConnection, _ref3) {
  var iceCandidate = _ref3.iceCandidate;

  peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
}

function createOffer(signal, peerConnection) {
  peerConnection.createOffer(function (offer) {
    signal('offer', { offer: offer });
    peerConnection.setLocalDescription(offer);
  }, function (err) {
    alert('something went wrong');
  });
}

module.exports = {
  handleOffer: handleOffer,
  handleAnswer: handleAnswer,
  handleIceCandidate: handleIceCandidate,
  createOffer: createOffer
};

/***/ }),

/***/ "./src/webrtc/signal-handler.js":
/*!**************************************!*\
  !*** ./src/webrtc/signal-handler.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (handlers, uCatchall) {
  var catchall = uCatchall || function (s) {
    return console.warn(s);
  };

  return function (signal, sData) {
    return handlers[signal] ? handlers[signal](sData) : catchall(signal, sData);
  };
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJydGMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9wZWVyLWNvbm5lY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9ydGMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnJ0Yy9zaWduYWwtaGFuZGxlci5qcyJdLCJuYW1lcyI6WyJxcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJpbmQiLCJzdGF0ZSIsInRyYW5zaXRpb25Ub1N0YXRlIiwibmV3U3RhdGUiLCJlbnRlckFyZ3MiLCJleGl0Iiwic3RhdGVzIiwiZW50ZXIiLCJjb25uZWN0ZWQiLCJ3aWRnZXRVcmkiLCJzdHlsZSIsImRpc3BsYXkiLCJzcmMiLCJzb3VyY2UiLCJjYXRhbG9nIiwiaW5pdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWx0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRhdGFzZXQiLCJsb2NhdGlvbiIsImpvaW5Sb29tIiwicm9vbSIsImNsaWVudCIsImpvaW4iLCJ3aW5kb3ciLCJhZGhvYyIsImNyZWF0ZUNvbm5lY3Rpb24iLCJtb2RlIiwiaW5pdE1hbmlmZXN0IiwicHJvdG9jb2wiLCJob3N0IiwicGF0aG5hbWUiLCJ1cmkiLCJjb25maWciLCJzaWduYWxlclBhdGgiLCJydGNTaWduYWxlciIsIldlYlNvY2tldCIsIm1hbmlmZXN0IiwicGVlckNvbm5lY3Rpb25zIiwiYXBpIiwic2VuZCIsImRhdGEiLCJzaWduYWwiLCJvbm1lc3NhZ2UiLCJmdW5jIiwib25zaWduYWwiLCJwZWVySW50ZXJmYWNlIiwicGVlcklEIiwicnRjc2lnbmFsIiwicyIsIm0iLCJKU09OIiwic3RyaW5naWZ5IiwiT2JqZWN0IiwiYXNzaWduIiwidG8iLCJ0eXBlIiwibWVzc2FnZSIsImtleXMiLCJrIiwicnRjU2lnbmFsSGFuZGxlciIsInBlZXJzIiwiaWQiLCJkIiwicGVlckNvbm5lY3RlZCIsInBlZXJEaXNjb25uZWN0ZWQiLCJwYyIsImZyb20iLCJydGNIYW5kbGVycyIsImNvbnNvbGUiLCJ3YXJuIiwicGFyc2UiLCJydGNDb25maWciLCJpY2VTZXJ2ZXJzIiwidXJsIiwicnRjIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVJbml0aWF0b3IiLCJjcmVhdGVSZWNlaXZlciIsImNvbm5lY3Rpb24iLCJwZWVyQ29ubmVjdGlvbiIsImNyZWF0ZVBlZXJDb25uZWN0aW9uIiwib3B0cyIsInJlbGlhYmxlIiwicXVldWVzIiwibWVzc2FnZXMiLCJjcmVhdGVRdWV1ZSIsInNpZ25hbHMiLCJjaGFubmVscyIsImNyZWF0ZURhdGFDaGFubmVsIiwiaWNlQ2FuZGlkYXRlIiwiaGFuZGxlSWNlQ2FuZGlkYXRlIiwiYW5zd2VyIiwiaGFuZGxlQW5zd2VyIiwiY2xvc2UiLCJjIiwib25vcGVuIiwiYWN0dWFsaXplQ2hhbm5lbCIsImNyZWF0ZU9mZmVyIiwib2ZmZXIiLCJoYW5kbGVPZmZlciIsIm9uZGF0YWNoYW5uZWwiLCJldiIsImNoYW5uZWwiLCJsYWJlbCIsInF1ZXVlIiwiZHJhaW4iLCJSVENQZWVyQ29ubmVjdGlvbiIsIm9uaWNlY2FuZGlkYXRlIiwiZXZlbnQiLCJjYW5kaWRhdGUiLCJwdXNoIiwiQXJyYXkiLCJhcmd1bWVudHMiLCJkcmFpbkZ1bmMiLCJhcHBseSIsImFyZ3MiLCJjYWxscyIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsImVyciIsImFsZXJ0IiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiaGFuZGxlcnMiLCJ1Q2F0Y2hhbGwiLCJjYXRjaGFsbCIsInNEYXRhIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9EQTs7Ozs7O0FBRUMsYUFBVztBQUNWLE1BQU1BLEtBQUtDLFNBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLENBQTRCRixRQUE1QixDQUFYO0FBQ0EsTUFBSUcsY0FBSjs7QUFFQSxXQUFTQyxpQkFBVCxDQUEyQkMsUUFBM0IsRUFBcUNDLFNBQXJDLEVBQWdEO0FBQzlDLFFBQU1DLE9BQVFDLE9BQU9MLEtBQVAsS0FBaUJLLE9BQU9MLEtBQVAsRUFBY0ksSUFBaEMsSUFBMEMsWUFBTSxDQUFFLENBQS9EO0FBQ0EsUUFBTUUsUUFBU0QsT0FBT0gsUUFBUCxLQUFvQkcsT0FBT0gsUUFBUCxFQUFpQkksS0FBdEMsSUFBaUQsWUFBTSxDQUFFLENBQXZFOztBQUVBTixZQUFRRSxRQUFSOztBQUVBRTtBQUNBRSxVQUFNSCxTQUFOO0FBQ0Q7O0FBRUQsTUFBTUUsU0FBUztBQUNiRSxlQUFXO0FBQ1RELGFBQU8scUJBQW1CO0FBQUEsWUFBaEJFLFNBQWdCLFFBQWhCQSxTQUFnQjs7QUFDeEJaLFdBQUcsU0FBSCxFQUFjYSxLQUFkLENBQW9CQyxPQUFwQixHQUE4QixPQUE5QjtBQUNBZCxXQUFHLFNBQUgsRUFBY2UsR0FBZCxHQUFvQkgsU0FBcEI7QUFDRCxPQUpRO0FBS1RKLFlBQU0sZ0JBQU07QUFDVlIsV0FBRyxTQUFILEVBQWNhLEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCLE1BQTlCO0FBQ0FkLFdBQUcsU0FBSCxFQUFjZ0IsTUFBZCxHQUF1QixFQUF2QjtBQUNEO0FBUlEsS0FERTs7QUFZYkMsYUFBUztBQUNQUCxhQUFPLGlCQUFNO0FBQ1hWLFdBQUcsVUFBSCxFQUFlYSxLQUFmLENBQXFCQyxPQUFyQixHQUErQixPQUEvQjtBQUNELE9BSE07QUFJUE4sWUFBTSxnQkFBTTtBQUNWUixXQUFHLFVBQUgsRUFBZWEsS0FBZixDQUFxQkMsT0FBckIsR0FBK0IsTUFBL0I7QUFDRDtBQU5NO0FBWkksR0FBZjs7QUFzQkEsV0FBU0ksSUFBVCxHQUFnQjtBQUNkYixzQkFBa0IsU0FBbEI7O0FBRUFKLGFBQVNrQixnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENDLE9BQTlDLENBQXNELFVBQUNDLEdBQUQsRUFBUztBQUM3REEsVUFBSUMsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEI7QUFBQSxlQUFNakIsa0JBQWtCLFdBQWxCLEVBQStCLEVBQUVPLFdBQVdTLElBQUlFLE9BQUosQ0FBWUMsUUFBekIsRUFBL0IsQ0FBTjtBQUFBLE9BQTlCO0FBQ0QsS0FGRDtBQUdEOztBQUdELFdBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3RCdEIsWUFBUSxZQUFSO0FBQ0F1QixxQkFBT0MsSUFBUCxDQUFZRixJQUFaO0FBQ0Q7O0FBRURSO0FBRUQsQ0FwREEsR0FBRCxDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBVyxPQUFPQyxLQUFQLEdBQWVELE9BQU9DLEtBQVAsSUFBZ0IsRUFBL0I7QUFDQUQsT0FBT0MsS0FBUCxDQUFhQyxnQkFBYixHQUFnQyxVQUFVTCxJQUFWLEVBQWdCTSxJQUFoQixFQUFzQkMsWUFBdEIsRUFBb0M7QUFDbEUsTUFBTUMsV0FDSixDQUFDTCxPQUFPTCxRQUFQLENBQWdCVSxRQUFoQixLQUE2QixRQUE3QixHQUF3QyxRQUF4QyxHQUFtRCxPQUFwRCxJQUNBTCxPQUFPTCxRQUFQLENBQWdCVyxJQURoQixHQUVBTixPQUFPTCxRQUFQLENBQWdCWSxRQUhsQjtBQUlBLE1BQU1DLE1BQU1YLE9BQVFZLGlCQUFPQyxZQUFQLEdBQXNCYixJQUE5QixHQUFzQ1ksaUJBQU9DLFlBQXpEO0FBQ0EsTUFBTUMsY0FBYyxJQUFJQyxTQUFKLENBQWNQLFdBQVdHLEdBQXpCLENBQXBCOztBQUVBLE1BQUlLLFdBQVdULGdCQUFnQixFQUEvQjtBQUNBLE1BQUlVLGtCQUFrQixFQUF0QjtBQUNBLE1BQUlDLE1BQU07QUFDUkMsVUFBTSxjQUFDQyxJQUFELEVBQVUsQ0FBRyxDQURYLEVBQ3VCO0FBQy9CQyxZQUFRLGdCQUFDQSxPQUFELEVBQVNELElBQVQsRUFBa0IsQ0FBRyxDQUZyQixFQUV1QjtBQUMvQkUsZUFBVyxtQkFBQ0MsSUFBRCxFQUFVLENBQUcsQ0FIaEIsRUFHdUI7QUFDL0JDLGNBQVUsa0JBQUNELElBQUQsRUFBVSxDQUFHLENBSmYsRUFJdUI7O0FBRS9CUDtBQU5RLEdBQVY7O0FBU0E7QUFDQSxNQUFNUyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNDLE1BQUQ7QUFBQSxXQUFhO0FBQ2pDO0FBQ0FDLGlCQUFXLG1CQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxlQUFVZixZQUFZSyxJQUFaLENBQWlCVyxLQUFLQyxTQUFMLENBQ3BDQyxPQUFPQyxNQUFQLENBQWNKLENBQWQsRUFBaUIsRUFBRUssSUFBSVIsTUFBTixFQUFjUyxNQUFNUCxDQUFwQixFQUFqQixDQURvQyxDQUFqQixDQUFWO0FBQUE7QUFGc0IsS0FBYjtBQUFBLEdBQXRCOztBQU1BO0FBQ0FWLE1BQUlDLElBQUosR0FBVyxVQUFDaUIsT0FBRDtBQUFBLFdBQWFKLE9BQU9LLElBQVAsQ0FBWXBCLGVBQVosRUFBNkJ2QixPQUE3QixDQUFxQyxhQUFLO0FBQ2hFO0FBQ0F1QixzQkFBZ0JxQixDQUFoQixFQUFtQm5CLElBQW5CLENBQXdCaUIsT0FBeEI7QUFDRCxLQUh1QixDQUFiO0FBQUEsR0FBWDs7QUFLQWxCLE1BQUlHLE1BQUosR0FBYSxVQUFDQSxNQUFELEVBQVNELElBQVQsRUFBa0IsQ0FBRyxDQUFsQyxDQWhDa0UsQ0FnQzlCOzs7QUFHcEMsTUFBTW1CLG1CQUFtQiw2QkFBb0I7QUFDM0M7QUFDQUMsV0FBTztBQUFBLFVBQUdBLE1BQUgsUUFBR0EsS0FBSDtBQUFBLGFBQ0xBLE9BQU05QyxPQUFOLENBQWMsVUFBVStDLEVBQVYsRUFBYztBQUMxQnhCLHdCQUFnQndCLEVBQWhCLElBQXNCLHFDQUFnQkEsRUFBaEIsRUFBb0JoQixjQUFjZ0IsRUFBZCxDQUFwQixDQUF0QjtBQUNBeEIsd0JBQWdCd0IsRUFBaEIsRUFBb0JwQixNQUFwQixDQUEyQixVQUEzQixFQUF1Q0wsUUFBdkM7QUFDQUMsd0JBQWdCd0IsRUFBaEIsRUFBb0JqQixRQUFwQixHQUErQixVQUFDSSxDQUFELEVBQUljLENBQUo7QUFBQSxpQkFBVXhCLElBQUlNLFFBQUosQ0FBYUksQ0FBYixFQUFnQmMsQ0FBaEIsQ0FBVjtBQUFBLFNBQS9CO0FBQ0F6Qix3QkFBZ0J3QixFQUFoQixFQUFvQm5CLFNBQXBCLEdBQWdDO0FBQUEsaUJBQUtKLElBQUlJLFNBQUosQ0FBY08sQ0FBZCxDQUFMO0FBQUEsU0FBaEM7QUFDRCxPQUxELENBREs7QUFBQSxLQUZvQzs7QUFVM0M7QUFDQWMsbUJBQWUsOEJBQVk7QUFBQSxVQUFURixFQUFTLFNBQVRBLEVBQVM7O0FBQ3pCLFVBQUksQ0FBQ3hCLGdCQUFnQndCLEVBQWhCLENBQUwsRUFBMEI7QUFDeEJ4Qix3QkFBZ0J3QixFQUFoQixJQUFzQixvQ0FBZUEsRUFBZixFQUFtQmhCLGNBQWNnQixFQUFkLENBQW5CLENBQXRCO0FBQ0F4Qix3QkFBZ0J3QixFQUFoQixFQUFvQnBCLE1BQXBCLENBQTJCLFVBQTNCLEVBQXVDTCxRQUF2QztBQUNBQyx3QkFBZ0J3QixFQUFoQixFQUFvQmpCLFFBQXBCLEdBQStCLFVBQUNJLENBQUQsRUFBSWMsQ0FBSjtBQUFBLGlCQUFVeEIsSUFBSU0sUUFBSixDQUFhSSxDQUFiLEVBQWdCYyxDQUFoQixDQUFWO0FBQUEsU0FBL0I7QUFDQXpCLHdCQUFnQndCLEVBQWhCLEVBQW9CbkIsU0FBcEIsR0FBZ0M7QUFBQSxpQkFBS0osSUFBSUksU0FBSixDQUFjTyxDQUFkLENBQUw7QUFBQSxTQUFoQztBQUNEO0FBQ0YsS0FsQjBDOztBQW9CM0M7QUFDQWUsc0JBQWtCLGlDQUFZO0FBQUEsVUFBVEgsRUFBUyxTQUFUQSxFQUFTOztBQUM1QnhCLHNCQUFnQndCLEVBQWhCLEVBQW9CcEIsTUFBcEIsQ0FBMkIsT0FBM0I7QUFDQSxhQUFPSixnQkFBZ0J3QixFQUFoQixDQUFQO0FBQ0Q7QUF4QjBDLEdBQXBCOztBQTJCdkI7QUFDQSxZQUFDcEIsTUFBRCxFQUFTRCxJQUFULEVBQWtCO0FBQ2hCO0FBQ0EsUUFBSSxVQUFVQSxJQUFkLEVBQW9CO0FBQ2xCLFVBQUl5QixLQUFLNUIsZ0JBQWdCRyxLQUFLMEIsSUFBckIsQ0FBVDtBQUNBLFVBQUksQ0FBQ0QsRUFBTCxFQUFTO0FBQ1BBLGFBQUssb0NBQWV6QixLQUFLMEIsSUFBcEIsRUFBMEJyQixjQUFjZ0IsRUFBZCxDQUExQixDQUFMO0FBQ0FJLFdBQUd4QixNQUFILENBQVUsVUFBVixFQUFzQkwsUUFBdEI7QUFDQTZCLFdBQUdyQixRQUFILEdBQWMsVUFBQ0ksQ0FBRCxFQUFJYyxDQUFKO0FBQUEsaUJBQVV4QixJQUFJTSxRQUFKLENBQWFJLENBQWIsRUFBZ0JjLENBQWhCLENBQVY7QUFBQSxTQUFkO0FBQ0F6Qix3QkFBZ0JHLEtBQUswQixJQUFyQixJQUE2QkQsRUFBN0I7QUFDRDs7QUFFREEsU0FBR0UsV0FBSCxDQUFlMUIsTUFBZixFQUF1QkQsSUFBdkI7QUFDRCxLQVZELE1BWUs7QUFDSDRCLGNBQVFDLElBQVIsQ0FBYSxnQ0FBYjtBQUNBRCxjQUFRQyxJQUFSLENBQWEsRUFBRTVCLFFBQVFBLE1BQVYsRUFBa0JELE1BQU1BLElBQXhCLEVBQWI7QUFDRDtBQUNGLEdBOUNzQixDQUF6QixDQW5Da0UsQ0FrRi9EOztBQUVITixjQUFZUSxTQUFaLEdBQXdCLFVBQVVjLE9BQVYsRUFBbUI7QUFDekMsUUFBSWhCLE9BQU9VLEtBQUtvQixLQUFMLENBQVdkLFFBQVFoQixJQUFuQixDQUFYO0FBQ0FtQixxQkFBaUJuQixLQUFLZSxJQUF0QixFQUE0QmYsSUFBNUI7QUFDRCxHQUhEOztBQUtBLFNBQU9GLEdBQVA7QUFDRCxDQTFGRCxDOzs7Ozs7Ozs7Ozs7OztBQzVCQSxJQUFNTixTQUFTO0FBQ2J1QyxhQUFXO0FBQ1RDLGdCQUFZLENBQ1YsRUFBRUMsS0FBSyw4QkFBUCxFQURVO0FBREg7QUFERSxDQUFmOztBQVFBLElBQUlDLE1BQU0sbUJBQUFDLENBQVEsa0NBQVIsQ0FBVjs7QUFFQTs7Ozs7OztBQU9BQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLGtDQURlO0FBRWZDOztBQUdGOzs7Ozs7QUFMaUIsQ0FBakIsQ0FXQSxTQUFTRCxlQUFULENBQXlCakIsRUFBekIsRUFBNkJtQixVQUE3QixFQUF5QztBQUN2QyxNQUFNQyxpQkFBaUJDLHFCQUFxQkYsVUFBckIsQ0FBdkI7QUFDQSxNQUFNRyxPQUFPLEVBQUVDLFVBQVUsS0FBWixFQUFiOztBQUVBLE1BQU1DLFNBQVMsRUFBRUMsVUFBVUMsYUFBWixFQUEyQkMsU0FBU0QsYUFBcEMsRUFBZjtBQUNBLE1BQU1FLFdBQVc7QUFDZkgsY0FBVUwsZUFBZVMsaUJBQWYsQ0FBaUMsVUFBakMsRUFBNkNQLElBQTdDLENBREs7QUFFZkssYUFBU1AsZUFBZVMsaUJBQWYsQ0FBaUMsU0FBakMsRUFBNENQLElBQTVDO0FBRk0sR0FBakI7O0FBS0EsTUFBSTdDLE1BQU07QUFDUkMsVUFBTThDLE9BQU9DLFFBQVAsQ0FBZ0IvQyxJQURkO0FBRVJFLFlBQVE0QyxPQUFPRyxPQUFQLENBQWVqRCxJQUZmO0FBR1JHLGVBQVcscUJBQU0sQ0FBRyxDQUhaO0FBSVJFLGNBQVUsb0JBQU0sQ0FBRyxDQUpYOztBQU1SdUIsaUJBQWE7QUFDWHdCLG9CQUFjO0FBQUEsZUFBS2pCLElBQUlrQixrQkFBSixDQUF1QlgsY0FBdkIsRUFBdUNqQyxDQUF2QyxDQUFMO0FBQUEsT0FESDtBQUVYNkMsY0FBUTtBQUFBLGVBQUtuQixJQUFJb0IsWUFBSixDQUFpQmIsY0FBakIsRUFBaUNqQyxDQUFqQyxDQUFMO0FBQUEsT0FGRztBQUdYK0MsYUFBTztBQUFBLGVBQU1kLGVBQWVjLEtBQWYsRUFBTjtBQUFBO0FBSEk7QUFOTCxHQUFWOztBQWFBM0MsU0FBT0ssSUFBUCxDQUFZZ0MsUUFBWixFQUFzQjNFLE9BQXRCLENBQThCO0FBQUEsV0FDNUIyRSxTQUFTTyxDQUFULEVBQVlDLE1BQVosR0FBcUI7QUFBQSxhQUNuQkMsaUJBQWlCVCxTQUFTTyxDQUFULENBQWpCLEVBQThCMUQsR0FBOUIsRUFBbUMrQyxPQUFPQyxRQUExQyxDQURtQjtBQUFBLEtBRE87QUFBQSxHQUE5Qjs7QUFJQVosTUFBSXlCLFdBQUosQ0FBZ0JuQixXQUFXakMsU0FBM0IsRUFBc0NrQyxjQUF0Qzs7QUFFQSxTQUFPM0MsR0FBUDtBQUNEOztBQUVEOzs7Ozs7O0FBT0EsU0FBU3lDLGNBQVQsQ0FBd0JsQixFQUF4QixFQUE0Qm1CLFVBQTVCLEVBQXdDO0FBQ3RDLE1BQU1DLGlCQUFpQkMscUJBQXFCRixVQUFyQixDQUF2QjtBQUNBLE1BQU1LLFNBQVMsRUFBRUMsVUFBVUMsYUFBWixFQUEyQkMsU0FBU0QsYUFBcEMsRUFBZjs7QUFFQSxNQUFJakQsTUFBTTtBQUNSQyxVQUFNOEMsT0FBT0MsUUFBUCxDQUFnQi9DLElBRGQ7QUFFUkUsWUFBUTRDLE9BQU9HLE9BQVAsQ0FBZWpELElBRmY7QUFHUkcsZUFBVyxxQkFBTSxDQUFHLENBSFo7QUFJUkUsY0FBVSxvQkFBTSxDQUFHLENBSlg7O0FBTVJ1QixpQkFBYTtBQUNYd0Isb0JBQWM7QUFBQSxlQUFLakIsSUFBSWtCLGtCQUFKLENBQXVCWCxjQUF2QixFQUF1Q2pDLENBQXZDLENBQUw7QUFBQSxPQURIO0FBRVhvRCxhQUFPO0FBQUEsZUFBSzFCLElBQUkyQixXQUFKLENBQWdCckIsV0FBV2pDLFNBQTNCLEVBQXNDa0MsY0FBdEMsRUFBc0RqQyxDQUF0RCxDQUFMO0FBQUEsT0FGSTtBQUdYK0MsYUFBTztBQUFBLGVBQU1kLGVBQWVjLEtBQWYsRUFBTjtBQUFBO0FBSEk7QUFOTCxHQUFWOztBQWFBZCxpQkFBZXFCLGFBQWYsR0FBK0IsY0FBTTtBQUNuQ0oscUJBQWlCSyxHQUFHQyxPQUFwQixFQUE2QmxFLEdBQTdCLEVBQWtDK0MsT0FBT2tCLEdBQUdDLE9BQUgsQ0FBV0MsS0FBbEIsQ0FBbEM7QUFDRCxHQUZEOztBQUlBLFNBQU9uRSxHQUFQO0FBQ0Q7O0FBRUQ7O0FBRUEsU0FBUzRELGdCQUFULENBQTBCTSxPQUExQixFQUFtQ2xFLEdBQW5DLEVBQXdDb0UsS0FBeEMsRUFBK0M7QUFDN0MsTUFBSUYsUUFBUUMsS0FBUixLQUFrQixVQUF0QixFQUFrQztBQUNoQ25FLFFBQUlDLElBQUosR0FBVyxtQkFBVztBQUNwQjtBQUNBO0FBQ0FpRSxjQUFRakUsSUFBUixDQUFhaUIsT0FBYjtBQUNELEtBSkQ7QUFLQWdELFlBQVE5RCxTQUFSLEdBQW9CLG1CQUFXO0FBQzdCO0FBQ0E7QUFDQUosVUFBSUksU0FBSixDQUFjYyxPQUFkO0FBQ0QsS0FKRDtBQUtBa0QsVUFBTUMsS0FBTixDQUFZckUsSUFBSUMsSUFBaEI7QUFDRCxHQVpELE1BYUs7QUFDSEQsUUFBSUcsTUFBSixHQUFhLFVBQUNBLE1BQUQsRUFBU0QsSUFBVCxFQUFrQjtBQUM3QmdFLGNBQVFqRSxJQUFSLENBQWFXLEtBQUtDLFNBQUwsQ0FBZSxDQUFDVixNQUFELEVBQVNELElBQVQsQ0FBZixDQUFiO0FBQ0QsS0FGRDtBQUdBZ0UsWUFBUTlELFNBQVIsR0FBb0IsbUJBQVc7QUFDN0IsVUFBTUYsT0FBT1UsS0FBS29CLEtBQUwsQ0FBV2QsUUFBUWhCLElBQW5CLENBQWI7QUFDQUYsVUFBSU0sUUFBSixDQUFhSixLQUFLLENBQUwsQ0FBYixFQUFzQkEsS0FBSyxDQUFMLENBQXRCO0FBQ0QsS0FIRDtBQUlBa0UsVUFBTUMsS0FBTixDQUFZckUsSUFBSUcsTUFBaEI7QUFDRDtBQUNGOztBQUdELFNBQVN5QyxvQkFBVCxDQUE4QkYsVUFBOUIsRUFBMEM7QUFDeEMsTUFBSWYsS0FBSyxJQUFJMkMsaUJBQUosQ0FBc0I1RSxPQUFPdUMsU0FBN0IsQ0FBVDs7QUFFQTtBQUNBTixLQUFHNEMsY0FBSCxHQUFvQixVQUFVQyxLQUFWLEVBQWlCO0FBQ25DLFFBQUlBLE1BQU1DLFNBQVYsRUFBcUI7QUFDbkIvQixpQkFBV2pDLFNBQVgsQ0FDRSxjQURGLEVBRUUsRUFBRTRDLGNBQWNtQixNQUFNQyxTQUF0QixFQUZGO0FBSUQ7QUFDRixHQVBEOztBQVNBLFNBQU85QyxFQUFQO0FBQ0Q7O0FBR0Q7QUFDQSxTQUFTc0IsV0FBVCxHQUF1QjtBQUNyQixNQUFJbUIsUUFBUSxFQUFaOztBQUVBLFNBQU87QUFDTG5FLFVBQU0sZ0JBQVk7QUFDaEJtRSxZQUFNTSxJQUFOLENBQVdDLE1BQU0vQyxJQUFOLENBQVdnRCxTQUFYLENBQVg7QUFDRCxLQUhJO0FBSUxQLFdBQU8sZUFBVVEsU0FBVixFQUFxQjtBQUMxQlQsWUFBTTVGLE9BQU4sQ0FBYztBQUFBLGVBQVFxRyxVQUFVQyxLQUFWLENBQWdCLElBQWhCLEVBQXNCQyxJQUF0QixDQUFSO0FBQUEsT0FBZDtBQUNBQyxjQUFRLEVBQVI7QUFDRDtBQVBJLEdBQVA7QUFTRCxDOzs7Ozs7Ozs7Ozs7OztBQ3RKRDs7Ozs7Ozs7QUFTQSxTQUFTakIsV0FBVCxDQUFxQjVELE1BQXJCLEVBQTZCd0MsY0FBN0IsUUFBd0Q7QUFBQSxNQUFUbUIsS0FBUyxRQUFUQSxLQUFTOztBQUN0RG5CLGlCQUFlc0Msb0JBQWYsQ0FBb0MsSUFBSUMscUJBQUosQ0FBMEJwQixLQUExQixDQUFwQztBQUNBbkIsaUJBQWV3QyxZQUFmLENBQTRCLFVBQVU1QixNQUFWLEVBQWtCO0FBQzVDWixtQkFBZXlDLG1CQUFmLENBQW1DN0IsTUFBbkM7QUFDQXBELFdBQU8sUUFBUCxFQUFpQixFQUFFb0QsUUFBUUEsTUFBVixFQUFqQjtBQUNELEdBSEQsRUFHRyxVQUFVOEIsR0FBVixFQUFlO0FBQUVDLFVBQU0sc0JBQU47QUFBK0IsR0FIbkQ7QUFJRDs7QUFFRCxTQUFTOUIsWUFBVCxDQUFzQmIsY0FBdEIsU0FBa0Q7QUFBQSxNQUFWWSxNQUFVLFNBQVZBLE1BQVU7O0FBQ2hEWixpQkFBZXNDLG9CQUFmLENBQW9DLElBQUlDLHFCQUFKLENBQTBCM0IsTUFBMUIsQ0FBcEM7QUFDRDs7QUFFRCxTQUFTRCxrQkFBVCxDQUE0QlgsY0FBNUIsU0FBOEQ7QUFBQSxNQUFoQlUsWUFBZ0IsU0FBaEJBLFlBQWdCOztBQUM1RFYsaUJBQWU0QyxlQUFmLENBQStCLElBQUlDLGVBQUosQ0FBb0JuQyxZQUFwQixDQUEvQjtBQUNEOztBQUVELFNBQVNRLFdBQVQsQ0FBcUIxRCxNQUFyQixFQUE2QndDLGNBQTdCLEVBQTZDO0FBQzNDQSxpQkFBZWtCLFdBQWYsQ0FBMkIsVUFBVUMsS0FBVixFQUFpQjtBQUMxQzNELFdBQU8sT0FBUCxFQUFnQixFQUFFMkQsT0FBT0EsS0FBVCxFQUFoQjtBQUNBbkIsbUJBQWV5QyxtQkFBZixDQUFtQ3RCLEtBQW5DO0FBQ0QsR0FIRCxFQUdHLFVBQVV1QixHQUFWLEVBQWU7QUFBRUMsVUFBTSxzQkFBTjtBQUErQixHQUhuRDtBQUlEOztBQUVEaEQsT0FBT0MsT0FBUCxHQUFpQjtBQUNmd0IsMEJBRGU7QUFFZlAsNEJBRmU7QUFHZkYsd0NBSGU7QUFJZk87QUFKZSxDQUFqQixDOzs7Ozs7Ozs7Ozs7OztBQ2hDQXZCLE9BQU9DLE9BQVAsR0FBaUIsVUFBVWtELFFBQVYsRUFBb0JDLFNBQXBCLEVBQStCO0FBQzlDLE1BQU1DLFdBQVdELGFBQWM7QUFBQSxXQUFLNUQsUUFBUUMsSUFBUixDQUFhckIsQ0FBYixDQUFMO0FBQUEsR0FBL0I7O0FBRUEsU0FBTyxVQUFDUCxNQUFELEVBQVN5RixLQUFUO0FBQUEsV0FDTEgsU0FBU3RGLE1BQVQsSUFDRXNGLFNBQVN0RixNQUFULEVBQWlCeUYsS0FBakIsQ0FERixHQUVFRCxTQUFTeEYsTUFBVCxFQUFpQnlGLEtBQWpCLENBSEc7QUFBQSxHQUFQO0FBSUQsQ0FQRCxDIiwiZmlsZSI6InNjcmlwdHMvcGVlcmJveC1jb25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyoqXG4gKiBBZGhvYyBBcmNoaXRlY3R1cmVcbiAqXG4gKiBBZGhvYyBtZWRpYXRlcyBwMnAgY29tbXVuaWNhdGlvbiBhbW9uZyB1c2VycyBieSBwcm92aWRpbmcgYSB1bmlmb3JtIEFQSSB0b1xuICogd2lkZ2V0cywgc2V0dGluZyB1cCBzaWduYWxpbmcsIGFuZCBhbGwgdGhlIGJvcmluZyBwYXJ0cy5cbiAqXG4gKiBTdGF0ZXM6XG4gKiAtIGNhdGFsb2c6IG5vdCBjb25uZWN0ZWQgdG8gYSByb29tXG4gKiAtIGNvbm5lY3RlZDogYWN0aXZlbHkgdXNpbmcgYSB3aWRnZXQgd2l0aCB6ZXJvIG9yIG1vcmUgcGVlcnNcbiAqIC0gaW5pdGlhdGluZzogc2V0dGluZyB1cCBhIHJvb21cbiAqIC0gY29ubmVjdGluZzogZXN0YWJsaXNoaW5nIGNvbm5lY3Rpb25zIGFuZCBnZXR0aW5nIHRoZSB3aWRnZXRcbiAqIC0gZW1wdHk6IHRoZSB1c2VyIGlzIGluIGEgcm9vbSB3aXRoIG5vIHBlZXJzIGFuZCBubyB3aWRnZXRcbiAqXG4gKiBXaWRnZXRzIGFyZSBydW4gaW4gaWZyYW1lcyBhbmQgdXNlIHdpbmRvdy5wb3N0TWVzc2FnZSB0byBjb21tdW5pY2F0ZSB3aXRoXG4gKiBhZGhvYy4gQSBsaWJyYXJ5IHdpbGwgYmUgd3JpdHRlbiB0byBzbW9vdGggdGhpcyBwcm9jZXNzLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBtZWFudCB0byBiZSBpbmxpbmVkIHdpdGggYGluZGV4Lmh0bWxgLlxuICovXG5cbmltcG9ydCBjbGllbnQgZnJvbSAnLi93ZWJydGMnO1xuXG4oZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KTtcbiAgbGV0IHN0YXRlO1xuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25Ub1N0YXRlKG5ld1N0YXRlLCBlbnRlckFyZ3MpIHtcbiAgICBjb25zdCBleGl0ID0gKHN0YXRlc1tzdGF0ZV0gJiYgc3RhdGVzW3N0YXRlXS5leGl0KSB8fCAoKCkgPT4ge30pO1xuICAgIGNvbnN0IGVudGVyID0gKHN0YXRlc1tuZXdTdGF0ZV0gJiYgc3RhdGVzW25ld1N0YXRlXS5lbnRlcikgfHwgKCgpID0+IHt9KTtcblxuICAgIHN0YXRlID0gbmV3U3RhdGU7XG5cbiAgICBleGl0KCk7XG4gICAgZW50ZXIoZW50ZXJBcmdzKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlcyA9IHtcbiAgICBjb25uZWN0ZWQ6IHtcbiAgICAgIGVudGVyOiAoeyB3aWRnZXRVcmkgfSkgPT4ge1xuICAgICAgICBxcygnI3dpZGdldCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBxcygnI3dpZGdldCcpLnNyYyA9IHdpZGdldFVyaTtcbiAgICAgIH0sXG4gICAgICBleGl0OiAoKSA9PiB7XG4gICAgICAgIHFzKCcjd2lkZ2V0Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgcXMoJyN3aWRnZXQnKS5zb3VyY2UgPSAnJztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2F0YWxvZzoge1xuICAgICAgZW50ZXI6ICgpID0+IHtcbiAgICAgICAgcXMoJyNjYXRhbG9nJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9LFxuICAgICAgZXhpdDogKCkgPT4ge1xuICAgICAgICBxcygnI2NhdGFsb2cnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0sXG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRyYW5zaXRpb25Ub1N0YXRlKCdjYXRhbG9nJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud2lkZ2V0LWxhdW5jaGVyJykuZm9yRWFjaCgoZWx0KSA9PiB7XG4gICAgICBlbHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0cmFuc2l0aW9uVG9TdGF0ZSgnY29ubmVjdGVkJywgeyB3aWRnZXRVcmk6IGVsdC5kYXRhc2V0LmxvY2F0aW9uIH0pKVxuICAgIH0pXG4gIH1cblxuXG4gIGZ1bmN0aW9uIGpvaW5Sb29tKHJvb20pIHtcbiAgICBzdGF0ZSA9ICdjb25uZWN0aW5nJztcbiAgICBjbGllbnQuam9pbihyb29tKTtcbiAgfVxuXG4gIGluaXQoKTtcblxufSgpKTtcbiIsImltcG9ydCB7IGNyZWF0ZUluaXRpYXRvciwgY3JlYXRlUmVjZWl2ZXIgfSBmcm9tICcuL3BlZXItY29ubmVjdGlvbic7XG5pbXBvcnQgY3JlYXRlU2lnbmFsSGFuZGxlciBmcm9tICcuL3NpZ25hbC1oYW5kbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzb24nO1xuXG4vKipcbiAgVGhpcyBpcyB0aGUgYXBpIGZvciBhbiBhZGhvYyBjbGllbnQgdGhhdCB1c2VzIFdlYlJUQyBhcyBpdHMgcHJpbWFyeVxuICBjb21tdW5pY2F0aW9uIGNoYW5uZWwuIFNlZTogaHR0cHM6Ly93ZWJydGMub3JnXG5cbiAgQSBzaWduYWxpbmcgc2VydmljZSBpcyByZXF1aXJlZCB0byBoYW5kbGUgY29ubmVjdGlvbiBtYW5hZ2VtZW50IGFuZCBwZWVyXG4gIGRpc2NvdmVyeS4gQWxsIGNvbnRlbnQgaXMgc2VudCBkaXJlY3RseSBmcm9tIG9uZSBwZWVyIHRvIGFub3RoZXIuIFRoaXMgY2xpZW50XG4gIGlzIGNvbXByaXNlZCBvZiB0aHJlZSBwcmltYXJ5IGNvbXBvbmVudHM6XG5cbiAgVGhlICpDb25uZWN0aW9uIE1hbmFnZXIqIGNvbWJpbmVzIGNvbW11bmljYXRpb25zIGFtb25nIHdpZGdldHMsIHRoZSBzaWduYWxlcixcbiAgYW5kIGluZGl2aWR1YWwgcGVlciBjb25uZWN0aW9ucy4gVGhpcyBpcyB1bHRpbWF0ZWx5IHdoYXQgaXMgcmV0dXJuZWQgYnkgdGhlXG4gIGNsaWVudCBhbmQgd2hhdCB3aWRnZXRzIGludGVyYWN0IHdpdGguIEl0IGlzIHJlc3BvbnNpYmxlIGZvciBzaHV0dGxpbmdcbiAgbWVzc2FnZXMgYXJvdW5kIGFtb25nIGNvbXBvbmVudHMuXG5cbiAgQSAqUGVlciBDb25uZWN0aW9uKiByZXByZXNlbnRzIGEgY29ubmVjdGlvbiBiZXR3ZWVuIHRoZSBsb2NhbCB1c2VyIGFuZCBhXG4gIHNpbmdsZSByZW1vdGUgdXNlci4gTWVzc2FnZXMgb3JpZ2luYXRpbmcgbG9jYWxseSBhcmUgZmFubmVkIG91dCB0byBlYWNoIHBlZXJcbiAgY29ubmVjdGlvbiwgYW5kIGluY29taW5nIHJlbW90ZSBtZXNzYWdlcyBhcmUgYnVuZGxlZCB0b2dldGhlciBpbnRvIGEgc2luZ2xlXG4gIG1lc3NhZ2Ugc3RyZWFtIGJ5IHRoZSBDb25uZWN0aW9uIE1hbmFnZXIuXG5cbiAgQSAqU2lnbmFsZXIqIGhhbmRsZXMgV2ViUlRDIHNpZ25hbGluZy4gU2VlOlxuICBodHRwczovL3d3dy53ZWJydGMtZXhwZXJpbWVudC5jb20vZG9jcy9XZWJSVEMtU2lnbmFsaW5nLUNvbmNlcHRzLmh0bWxcbiAgQXMgb2Ygbm93LCBpdCdzIHNpbXBseSBhIFdlYlNvY2tldC5cbiovXG5cbndpbmRvdy5hZGhvYyA9IHdpbmRvdy5hZGhvYyB8fCB7fTtcbndpbmRvdy5hZGhvYy5jcmVhdGVDb25uZWN0aW9uID0gZnVuY3Rpb24gKHJvb20sIG1vZGUsIGluaXRNYW5pZmVzdCkge1xuICBjb25zdCBwcm90b2NvbCA9XG4gICAgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyAnd3NzOi8vJyA6ICd3czovLycpICtcbiAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBjb25zdCB1cmkgPSByb29tID8gKGNvbmZpZy5zaWduYWxlclBhdGggKyByb29tKSA6IGNvbmZpZy5zaWduYWxlclBhdGg7XG4gIGNvbnN0IHJ0Y1NpZ25hbGVyID0gbmV3IFdlYlNvY2tldChwcm90b2NvbCArIHVyaSk7XG5cbiAgbGV0IG1hbmlmZXN0ID0gaW5pdE1hbmlmZXN0IHx8IHt9O1xuICBsZXQgcGVlckNvbm5lY3Rpb25zID0ge307XG4gIGxldCBhcGkgPSB7XG4gICAgc2VuZDogKGRhdGEpID0+IHsgfSwgICAgICAgICAgIC8vIGRlZmluZWQgbGF0ZXIgaW4gZnVuY3Rpb25cbiAgICBzaWduYWw6IChzaWduYWwsIGRhdGEpID0+IHsgfSwgLy8gZGVmaW5lZCBsYXRlciBpbiBmdW5jdGlvblxuICAgIG9ubWVzc2FnZTogKGZ1bmMpID0+IHsgfSwgICAgICAvLyB0byBiZSBzZXQgZXh0ZXJuYWxseVxuICAgIG9uc2lnbmFsOiAoZnVuYykgPT4geyB9LCAgICAgICAvLyB0byBiZSBzZXQgZXh0ZXJuYWxseVxuXG4gICAgbWFuaWZlc3RcbiAgfTtcblxuICAvLyBIZWxwZXIgZm9yIHByb3ZpZGluZyBhIG1pbmltYWwgYXBpIHRvIHBlZXIgY29ubmVjdGlvbnNcbiAgY29uc3QgcGVlckludGVyZmFjZSA9IChwZWVySUQpID0+ICh7XG4gICAgLy8gY2hhbm5lbCB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSB3ZWJydGMgc2lnbmFsZXJcbiAgICBydGNzaWduYWw6IChzLCBtKSA9PiBydGNTaWduYWxlci5zZW5kKEpTT04uc3RyaW5naWZ5KFxuICAgICAgT2JqZWN0LmFzc2lnbihtLCB7IHRvOiBwZWVySUQsIHR5cGU6IHMgfSkpKSxcbiAgfSk7XG5cbiAgLy8gRmFuIG91dCBpbmNvbWluZyBtZXNzYWdlIGFjcm9zcyBlYWNoIHBlZXIgY29ubmVjdGlvblxuICBhcGkuc2VuZCA9IChtZXNzYWdlKSA9PiBPYmplY3Qua2V5cyhwZWVyQ29ubmVjdGlvbnMpLmZvckVhY2goayA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coICdzZW5kIHRvICcgKyBrIClcbiAgICBwZWVyQ29ubmVjdGlvbnNba10uc2VuZChtZXNzYWdlKVxuICB9KTtcblxuICBhcGkuc2lnbmFsID0gKHNpZ25hbCwgZGF0YSkgPT4geyB9OyAvLyBtYXliZSB0aGlzIHdpbGwgYmUgdXNlZnVsIGxhdGVyXG5cblxuICBjb25zdCBydGNTaWduYWxIYW5kbGVyID0gY3JlYXRlU2lnbmFsSGFuZGxlcih7XG4gICAgLy8gQSBmdWxsIGxpc3Qgb2YgcGVlcnMgaGFzIGJlZW4gcmVjZWl2ZWQtLWluaXRpYXRlIGNvbm5lY3Rpb25zIHdpdGggYWxsLlxuICAgIHBlZXJzOiAoeyBwZWVycyB9KSA9PlxuICAgICAgcGVlcnMuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcGVlckNvbm5lY3Rpb25zW2lkXSA9IGNyZWF0ZUluaXRpYXRvcihpZCwgcGVlckludGVyZmFjZShpZCkpO1xuICAgICAgICBwZWVyQ29ubmVjdGlvbnNbaWRdLnNpZ25hbCgnbWFuaWZlc3QnLCBtYW5pZmVzdCk7XG4gICAgICAgIHBlZXJDb25uZWN0aW9uc1tpZF0ub25zaWduYWwgPSAocywgZCkgPT4gYXBpLm9uc2lnbmFsKHMsIGQpO1xuICAgICAgICBwZWVyQ29ubmVjdGlvbnNbaWRdLm9ubWVzc2FnZSA9IG0gPT4gYXBpLm9ubWVzc2FnZShtKTtcbiAgICAgIH0pLFxuXG4gICAgLy8gQSBzaW5nbGUgcGVlciBoYXMgY29ubmVjdGVkLCBjcmVhdGUgYSBjb25uZWN0aW9uLCBidXQgZG8gbm90IGluaXRpYXRlLlxuICAgIHBlZXJDb25uZWN0ZWQ6ICh7IGlkIH0pID0+IHtcbiAgICAgIGlmICghcGVlckNvbm5lY3Rpb25zW2lkXSkge1xuICAgICAgICBwZWVyQ29ubmVjdGlvbnNbaWRdID0gY3JlYXRlUmVjZWl2ZXIoaWQsIHBlZXJJbnRlcmZhY2UoaWQpKTtcbiAgICAgICAgcGVlckNvbm5lY3Rpb25zW2lkXS5zaWduYWwoJ21hbmlmZXN0JywgbWFuaWZlc3QpO1xuICAgICAgICBwZWVyQ29ubmVjdGlvbnNbaWRdLm9uc2lnbmFsID0gKHMsIGQpID0+IGFwaS5vbnNpZ25hbChzLCBkKTtcbiAgICAgICAgcGVlckNvbm5lY3Rpb25zW2lkXS5vbm1lc3NhZ2UgPSBtID0+IGFwaS5vbm1lc3NhZ2UobSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIFBlZXIgZGlzY29ubmVjdGVkLiBDbG9zZSBhbmQgcmVtb3ZlIHRoZSBjb25uZWN0aW9uLlxuICAgIHBlZXJEaXNjb25uZWN0ZWQ6ICh7IGlkIH0pID0+IHtcbiAgICAgIHBlZXJDb25uZWN0aW9uc1tpZF0uc2lnbmFsKCdjbG9zZScpO1xuICAgICAgZGVsZXRlIHBlZXJDb25uZWN0aW9uc1tpZF07XG4gICAgfVxuICB9LFxuXG4gICAgLy8gQ2F0Y2hhbGwgc2lnbmFsIGhhbmRsZXJcbiAgICAoc2lnbmFsLCBkYXRhKSA9PiB7XG4gICAgICAvLyBBIHRhcmdldGVkIHNpZ25hbCB3YXMgcmVjZWl2ZWQuIEhhdmUgdGhlIGNvbm5lY3Rpb24gaGFuZGxlIGl0LlxuICAgICAgaWYgKCdmcm9tJyBpbiBkYXRhKSB7XG4gICAgICAgIGxldCBwYyA9IHBlZXJDb25uZWN0aW9uc1tkYXRhLmZyb21dO1xuICAgICAgICBpZiAoIXBjKSB7XG4gICAgICAgICAgcGMgPSBjcmVhdGVSZWNlaXZlcihkYXRhLmZyb20sIHBlZXJJbnRlcmZhY2UoaWQpKTtcbiAgICAgICAgICBwYy5zaWduYWwoJ21hbmlmZXN0JywgbWFuaWZlc3QpO1xuICAgICAgICAgIHBjLm9uc2lnbmFsID0gKHMsIGQpID0+IGFwaS5vbnNpZ25hbChzLCBkKTtcbiAgICAgICAgICBwZWVyQ29ubmVjdGlvbnNbZGF0YS5mcm9tXSA9IHBjO1xuICAgICAgICB9XG5cbiAgICAgICAgcGMucnRjSGFuZGxlcnNbc2lnbmFsXShkYXRhKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVucmVjb2duaXplZCBtZXNzYWdlIHJlY2VpdmVkOlwiKTtcbiAgICAgICAgY29uc29sZS53YXJuKHsgc2lnbmFsOiBzaWduYWwsIGRhdGE6IGRhdGEgfSk7XG4gICAgICB9XG4gICAgfVxuICApOyAvLyBFbmQgc2lnbmFsIGhhbmRsZXJcblxuICBydGNTaWduYWxlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgIHJ0Y1NpZ25hbEhhbmRsZXIoZGF0YS50eXBlLCBkYXRhKTtcbiAgfVxuXG4gIHJldHVybiBhcGk7XG59XG4iLCJjb25zdCBjb25maWcgPSB7XG4gIHJ0Y0NvbmZpZzoge1xuICAgIGljZVNlcnZlcnM6IFtcbiAgICAgIHsgdXJsOiBcInN0dW46c3R1bi4xLmdvb2dsZS5jb206MTkzMDJcIiB9XG4gICAgXVxuICB9XG59XG5cbnZhciBydGMgPSByZXF1aXJlKCcuL3J0YycpO1xuXG4vKipcbiAgQHBhcmFtIHtTdHJpbmd9IGlkIC0gdGhlIHBlZXJJRFxuICBAcGFyYW0ge0Jvb2xlYW59IGluaXQgLSBpcyB0aGlzIHNpZGUgaW5pdGlhdGluZyB0aGUgY29ubmVjdGlvbj9cbiAgQHBhcmFtIHtPYmplY3R9IHNpZ25hbGVyIC0gYXBpIHdpdGggc2lnbmFsZXIgKHNlbmQgb25seSlcbiAgQHBhcmFtIHtPYmplY3R9IHdpZGdldCAtIGFwaSB0byB3aWRnZXQgKHNlbmQgb25seSlcbiAgQHBhcmFtIHtPYmplY3R9IGNvbm5lY3Rpb24gLSBhcGkgdG8gbWFpbiBjb25uZWN0aW9uXG4qL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZUluaXRpYXRvcixcbiAgY3JlYXRlUmVjZWl2ZXJcbn1cblxuLyoqXG4gIEluaXRpYXRvcnMgYXJlIHJlc3BvbnNpYmxlIGZvciBpbml0aWF0aW5nIHRoZSBjb25uZWN0aW9uIGxpa2Ugc286XG5cbiAgMS4gU2VuZCBhbiBvZmZlclxuICAyLiBSZWNlaXZlIGFuIGFuc3dlclxuKi9cbmZ1bmN0aW9uIGNyZWF0ZUluaXRpYXRvcihpZCwgY29ubmVjdGlvbikge1xuICBjb25zdCBwZWVyQ29ubmVjdGlvbiA9IGNyZWF0ZVBlZXJDb25uZWN0aW9uKGNvbm5lY3Rpb24pO1xuICBjb25zdCBvcHRzID0geyByZWxpYWJsZTogZmFsc2UgfTtcblxuICBjb25zdCBxdWV1ZXMgPSB7IG1lc3NhZ2VzOiBjcmVhdGVRdWV1ZSgpLCBzaWduYWxzOiBjcmVhdGVRdWV1ZSgpIH07XG4gIGNvbnN0IGNoYW5uZWxzID0ge1xuICAgIG1lc3NhZ2VzOiBwZWVyQ29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbCgnbWVzc2FnZXMnLCBvcHRzKSxcbiAgICBzaWduYWxzOiBwZWVyQ29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbCgnc2lnbmFscycsIG9wdHMpXG4gIH1cblxuICBsZXQgYXBpID0ge1xuICAgIHNlbmQ6IHF1ZXVlcy5tZXNzYWdlcy5zZW5kLFxuICAgIHNpZ25hbDogcXVldWVzLnNpZ25hbHMuc2VuZCxcbiAgICBvbm1lc3NhZ2U6ICgpID0+IHsgfSxcbiAgICBvbnNpZ25hbDogKCkgPT4geyB9LFxuXG4gICAgcnRjSGFuZGxlcnM6IHtcbiAgICAgIGljZUNhbmRpZGF0ZTogcyA9PiBydGMuaGFuZGxlSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBzKSxcbiAgICAgIGFuc3dlcjogcyA9PiBydGMuaGFuZGxlQW5zd2VyKHBlZXJDb25uZWN0aW9uLCBzKSxcbiAgICAgIGNsb3NlOiAoKSA9PiBwZWVyQ29ubmVjdGlvbi5jbG9zZSgpXG4gICAgfVxuICB9O1xuXG4gIE9iamVjdC5rZXlzKGNoYW5uZWxzKS5mb3JFYWNoKGMgPT5cbiAgICBjaGFubmVsc1tjXS5vbm9wZW4gPSAoKSA9PlxuICAgICAgYWN0dWFsaXplQ2hhbm5lbChjaGFubmVsc1tjXSwgYXBpLCBxdWV1ZXMubWVzc2FnZXMpKTtcblxuICBydGMuY3JlYXRlT2ZmZXIoY29ubmVjdGlvbi5ydGNzaWduYWwsIHBlZXJDb25uZWN0aW9uKTtcblxuICByZXR1cm4gYXBpO1xufVxuXG4vKipcbiAgUmVjZWl2ZXJzIGFyZSByZXNwb25zaWJsZSBmb3IgcmVjZWl2aW5nIHRoZSBjb25uZWN0aW9uIGxpa2Ugc286XG5cbiAgMS4gUmVjZWl2ZSBhbiBvZmZlclxuICAyLiBTZW5kIGFuIGFuc3dlclxuKi9cblxuZnVuY3Rpb24gY3JlYXRlUmVjZWl2ZXIoaWQsIGNvbm5lY3Rpb24pIHtcbiAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSBjcmVhdGVQZWVyQ29ubmVjdGlvbihjb25uZWN0aW9uKTtcbiAgY29uc3QgcXVldWVzID0geyBtZXNzYWdlczogY3JlYXRlUXVldWUoKSwgc2lnbmFsczogY3JlYXRlUXVldWUoKSB9O1xuXG4gIGxldCBhcGkgPSB7XG4gICAgc2VuZDogcXVldWVzLm1lc3NhZ2VzLnNlbmQsXG4gICAgc2lnbmFsOiBxdWV1ZXMuc2lnbmFscy5zZW5kLFxuICAgIG9ubWVzc2FnZTogKCkgPT4geyB9LFxuICAgIG9uc2lnbmFsOiAoKSA9PiB7IH0sXG5cbiAgICBydGNIYW5kbGVyczoge1xuICAgICAgaWNlQ2FuZGlkYXRlOiBzID0+IHJ0Yy5oYW5kbGVJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIHMpLFxuICAgICAgb2ZmZXI6IHMgPT4gcnRjLmhhbmRsZU9mZmVyKGNvbm5lY3Rpb24ucnRjc2lnbmFsLCBwZWVyQ29ubmVjdGlvbiwgcyksXG4gICAgICBjbG9zZTogKCkgPT4gcGVlckNvbm5lY3Rpb24uY2xvc2UoKVxuICAgIH1cbiAgfTtcblxuICBwZWVyQ29ubmVjdGlvbi5vbmRhdGFjaGFubmVsID0gZXYgPT4ge1xuICAgIGFjdHVhbGl6ZUNoYW5uZWwoZXYuY2hhbm5lbCwgYXBpLCBxdWV1ZXNbZXYuY2hhbm5lbC5sYWJlbF0pO1xuICB9XG5cbiAgcmV0dXJuIGFwaTtcbn1cblxuLy8gSGVscGVyc1xuXG5mdW5jdGlvbiBhY3R1YWxpemVDaGFubmVsKGNoYW5uZWwsIGFwaSwgcXVldWUpIHtcbiAgaWYgKGNoYW5uZWwubGFiZWwgPT09ICdtZXNzYWdlcycpIHtcbiAgICBhcGkuc2VuZCA9IG1lc3NhZ2UgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdzZW5kaW5nIG1lc3NhZ2UnICk7XG4gICAgICAvLyBjb25zb2xlLmxvZyggbWVzc2FnZSApO1xuICAgICAgY2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cbiAgICBjaGFubmVsLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coICdnb3QgbWVzc2FnZScgKVxuICAgICAgLy8gY29uc29sZS5sb2coIG1lc3NhZ2UuZGF0YSApXG4gICAgICBhcGkub25tZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cbiAgICBxdWV1ZS5kcmFpbihhcGkuc2VuZCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYXBpLnNpZ25hbCA9IChzaWduYWwsIGRhdGEpID0+IHtcbiAgICAgIGNoYW5uZWwuc2VuZChKU09OLnN0cmluZ2lmeShbc2lnbmFsLCBkYXRhXSkpO1xuICAgIH1cbiAgICBjaGFubmVsLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICAgIGFwaS5vbnNpZ25hbChkYXRhWzBdLCBkYXRhWzFdKVxuICAgIH07XG4gICAgcXVldWUuZHJhaW4oYXBpLnNpZ25hbCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVQZWVyQ29ubmVjdGlvbihjb25uZWN0aW9uKSB7XG4gIGxldCBwYyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihjb25maWcucnRjQ29uZmlnKTtcblxuICAvLyBJQ0UgaGFuZGxlcnNcbiAgcGMub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XG4gICAgICBjb25uZWN0aW9uLnJ0Y3NpZ25hbChcbiAgICAgICAgJ2ljZUNhbmRpZGF0ZScsXG4gICAgICAgIHsgaWNlQ2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGM7XG59XG5cblxuLy8gaG9sZCBvbiB0byBhcmd1bWVudHMgdW50aWwgYSBmdW5jdGlvbiB0byBjYWxsIGlzIHNlbnRcbmZ1bmN0aW9uIGNyZWF0ZVF1ZXVlKCkge1xuICBsZXQgcXVldWUgPSBbXTtcblxuICByZXR1cm4ge1xuICAgIHNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHF1ZXVlLnB1c2goQXJyYXkuZnJvbShhcmd1bWVudHMpKVxuICAgIH0sXG4gICAgZHJhaW46IGZ1bmN0aW9uIChkcmFpbkZ1bmMpIHtcbiAgICAgIHF1ZXVlLmZvckVhY2goYXJncyA9PiBkcmFpbkZ1bmMuYXBwbHkobnVsbCwgYXJncykpO1xuICAgICAgY2FsbHMgPSBbXTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICBGdW5jdGlvbnMgdGhhdCBoYW5kbGUgUlRDIGJvaWxlcnBsYXRlLiBBcmd1bWVudHMgdXNlZCB0aHJvdWdob3V0IG1vZHVsZTpcblxuICBAcGFyYW0ge0Z1bmN0aW9ufSBzaWduYWwgLSBmdW5jdGlvbiB0byBzZW5kIHNpZ25hbHMgdG8gYSBzaWduYWxlclxuICBAcGFyYW0ge1JUQ1BlZXJDb25uZWN0aW9ufSBwZWVyQ29ubmVjdGlvbiAtIGNvbm5lY3Rpb24gdG8gaGFuZGxlXG4gIEBwYXJhbSB7T2JqZWN0fSBhcmdzIC0gY29udGV4dHVhbCBhcmd1bWVudHNcbiovXG5cblxuZnVuY3Rpb24gaGFuZGxlT2ZmZXIoc2lnbmFsLCBwZWVyQ29ubmVjdGlvbiwgeyBvZmZlciB9KSB7XG4gIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24ob2ZmZXIpKTtcbiAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKGZ1bmN0aW9uIChhbnN3ZXIpIHtcbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGFuc3dlcik7XG4gICAgc2lnbmFsKCdhbnN3ZXInLCB7IGFuc3dlcjogYW5zd2VyIH0pO1xuICB9LCBmdW5jdGlvbiAoZXJyKSB7IGFsZXJ0KCdzb21ldGhpbmcgd2VudCB3cm9uZycpIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVBbnN3ZXIocGVlckNvbm5lY3Rpb24sIHsgYW5zd2VyIH0pIHtcbiAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihhbnN3ZXIpKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCB7IGljZUNhbmRpZGF0ZSB9KSB7XG4gIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGljZUNhbmRpZGF0ZSkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPZmZlcihzaWduYWwsIHBlZXJDb25uZWN0aW9uKSB7XG4gIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKGZ1bmN0aW9uIChvZmZlcikge1xuICAgIHNpZ25hbCgnb2ZmZXInLCB7IG9mZmVyOiBvZmZlciB9KTtcbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcbiAgfSwgZnVuY3Rpb24gKGVycikgeyBhbGVydCgnc29tZXRoaW5nIHdlbnQgd3JvbmcnKSB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZU9mZmVyLFxuICBoYW5kbGVBbnN3ZXIsXG4gIGhhbmRsZUljZUNhbmRpZGF0ZSxcbiAgY3JlYXRlT2ZmZXJcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhhbmRsZXJzLCB1Q2F0Y2hhbGwpIHtcbiAgY29uc3QgY2F0Y2hhbGwgPSB1Q2F0Y2hhbGwgfHwgKHMgPT4gY29uc29sZS53YXJuKHMpKTtcblxuICByZXR1cm4gKHNpZ25hbCwgc0RhdGEpID0+XG4gICAgaGFuZGxlcnNbc2lnbmFsXSA/XG4gICAgICBoYW5kbGVyc1tzaWduYWxdKHNEYXRhKSA6XG4gICAgICBjYXRjaGFsbChzaWduYWwsIHNEYXRhKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
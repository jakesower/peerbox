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

eval("module.exports = {\"port\":3001,\"signalerPath\":\"ws://localhost:3001/\"};\n\n//# sourceURL=webpack:///./config.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _webrtc = __webpack_require__(/*! ./webrtc */ \"./src/webrtc/index.js\");\n\nvar _webrtc2 = _interopRequireDefault(_webrtc);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var qs = document.querySelector.bind(document);\n  var state = void 0;\n\n  function transitionToState(newState, enterArgs) {\n    var exit = states[state] && states[state].exit || function () {};\n    var enter = states[newState] && states[newState].enter || function () {};\n\n    state = newState;\n\n    exit();\n    enter(enterArgs);\n  }\n\n  var states = {\n    connected: {\n      enter: function enter(_ref) {\n        var widgetUri = _ref.widgetUri;\n\n        qs('#widget').style.display = 'block';\n        qs('#widget').src = widgetUri;\n      },\n      exit: function exit() {\n        qs('#widget').style.display = 'none';\n        qs('#widget').source = '';\n      }\n    },\n\n    catalog: {\n      enter: function enter() {\n        qs('#catalog').style.display = 'block';\n      },\n      exit: function exit() {\n        qs('#catalog').style.display = 'none';\n      }\n    }\n  };\n\n  function init() {\n    transitionToState('catalog');\n\n    document.querySelectorAll('.widget-launcher').forEach(function (elt) {\n      elt.addEventListener('click', function () {\n        return transitionToState('connected', { widgetUri: elt.dataset.location });\n      });\n    });\n  }\n\n  function joinRoom(room) {\n    state = 'connecting';\n    _webrtc2.default.join(room);\n  }\n\n  init();\n})(); /**\n       * Adhoc Architecture\n       *\n       * Adhoc mediates p2p communication among users by providing a uniform API to\n       * widgets, setting up signaling, and all the boring parts.\n       *\n       * States:\n       * - catalog: not connected to a room\n       * - connected: actively using a widget with zero or more peers\n       * - initiating: setting up a room\n       * - connecting: establishing connections and getting the widget\n       * - empty: the user is in a room with no peers and no widget\n       *\n       * Widgets are run in iframes and use window.postMessage to communicate with\n       * adhoc. A library will be written to smooth this process.\n       *\n       * This file is meant to be inlined with `index.html`.\n       */\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/webrtc/index.js":
/*!*****************************!*\
  !*** ./src/webrtc/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _peerConnection = __webpack_require__(/*! ./peer-connection */ \"./src/webrtc/peer-connection.js\");\n\nvar _signalHandler = __webpack_require__(/*! ./signal-handler */ \"./src/webrtc/signal-handler.js\");\n\nvar _signalHandler2 = _interopRequireDefault(_signalHandler);\n\nvar _config = __webpack_require__(/*! ../../config.json */ \"./config.json\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n  This is the api for an adhoc client that uses WebRTC as its primary\n  communication channel. See: https://webrtc.org\n\n  A signaling service is required to handle connection management and peer\n  discovery. All content is sent directly from one peer to another. This client\n  is comprised of three primary components:\n\n  The *Connection Manager* combines communications among widgets, the signaler,\n  and individual peer connections. This is ultimately what is returned by the\n  client and what widgets interact with. It is responsible for shuttling\n  messages around among components.\n\n  A *Peer Connection* represents a connection between the local user and a\n  single remote user. Messages originating locally are fanned out to each peer\n  connection, and incoming remote messages are bundled together into a single\n  message stream by the Connection Manager.\n\n  A *Signaler* handles WebRTC signaling. See:\n  https://www.webrtc-experiment.com/docs/WebRTC-Signaling-Concepts.html\n  As of now, it's simply a WebSocket.\n*/\n\nwindow.adhoc = window.adhoc || {};\nwindow.adhoc.createConnection = function (room, mode, initManifest) {\n  var protocol = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + window.location.pathname;\n  var uri = room ? _config2.default.signalerPath + room : _config2.default.signalerPath;\n  var rtcSignaler = new WebSocket(protocol + uri);\n\n  var manifest = initManifest || {};\n  var peerConnections = {};\n  var api = {\n    send: function send(data) {}, // defined later in function\n    signal: function signal(_signal, data) {}, // defined later in function\n    onmessage: function onmessage(func) {}, // to be set externally\n    onsignal: function onsignal(func) {}, // to be set externally\n\n    manifest: manifest\n  };\n\n  // Helper for providing a minimal api to peer connections\n  var peerInterface = function peerInterface(peerID) {\n    return {\n      // channel to communicate with the webrtc signaler\n      rtcsignal: function rtcsignal(s, m) {\n        return rtcSignaler.send(JSON.stringify(Object.assign(m, { to: peerID, type: s })));\n      }\n    };\n  };\n\n  // Fan out incoming message across each peer connection\n  api.send = function (message) {\n    return Object.keys(peerConnections).forEach(function (k) {\n      // console.log( 'send to ' + k )\n      peerConnections[k].send(message);\n    });\n  };\n\n  api.signal = function (signal, data) {}; // maybe this will be useful later\n\n\n  var rtcSignalHandler = (0, _signalHandler2.default)({\n    // A full list of peers has been received--initiate connections with all.\n    peers: function peers(_ref) {\n      var _peers = _ref.peers;\n      return _peers.forEach(function (id) {\n        peerConnections[id] = (0, _peerConnection.createInitiator)(id, peerInterface(id));\n        peerConnections[id].signal('manifest', manifest);\n        peerConnections[id].onsignal = function (s, d) {\n          return api.onsignal(s, d);\n        };\n        peerConnections[id].onmessage = function (m) {\n          return api.onmessage(m);\n        };\n      });\n    },\n\n    // A single peer has connected, create a connection, but do not initiate.\n    peerConnected: function peerConnected(_ref2) {\n      var id = _ref2.id;\n\n      if (!peerConnections[id]) {\n        peerConnections[id] = (0, _peerConnection.createReceiver)(id, peerInterface(id));\n        peerConnections[id].signal('manifest', manifest);\n        peerConnections[id].onsignal = function (s, d) {\n          return api.onsignal(s, d);\n        };\n        peerConnections[id].onmessage = function (m) {\n          return api.onmessage(m);\n        };\n      }\n    },\n\n    // Peer disconnected. Close and remove the connection.\n    peerDisconnected: function peerDisconnected(_ref3) {\n      var id = _ref3.id;\n\n      peerConnections[id].signal('close');\n      delete peerConnections[id];\n    }\n  },\n\n  // Catchall signal handler\n  function (signal, data) {\n    // A targeted signal was received. Have the connection handle it.\n    if ('from' in data) {\n      var pc = peerConnections[data.from];\n      if (!pc) {\n        pc = (0, _peerConnection.createReceiver)(data.from, peerInterface(id));\n        pc.signal('manifest', manifest);\n        pc.onsignal = function (s, d) {\n          return api.onsignal(s, d);\n        };\n        peerConnections[data.from] = pc;\n      }\n\n      pc.rtcHandlers[signal](data);\n    } else {\n      console.warn(\"Unrecognized message received:\");\n      console.warn({ signal: signal, data: data });\n    }\n  }); // End signal handler\n\n  rtcSignaler.onmessage = function (message) {\n    var data = JSON.parse(message.data);\n    rtcSignalHandler(data.type, data);\n  };\n\n  return api;\n};\n\n//# sourceURL=webpack:///./src/webrtc/index.js?");

/***/ }),

/***/ "./src/webrtc/peer-connection.js":
/*!***************************************!*\
  !*** ./src/webrtc/peer-connection.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar config = {\n  rtcConfig: {\n    iceServers: [{ url: \"stun:stun.1.google.com:19302\" }]\n  }\n};\n\nvar rtc = __webpack_require__(/*! ./rtc */ \"./src/webrtc/rtc.js\");\n\n/**\n  @param {String} id - the peerID\n  @param {Boolean} init - is this side initiating the connection?\n  @param {Object} signaler - api with signaler (send only)\n  @param {Object} widget - api to widget (send only)\n  @param {Object} connection - api to main connection\n*/\nmodule.exports = {\n  createInitiator: createInitiator,\n  createReceiver: createReceiver\n\n  /**\n    Initiators are responsible for initiating the connection like so:\n  \n    1. Send an offer\n    2. Receive an answer\n  */\n};function createInitiator(id, connection) {\n  var peerConnection = createPeerConnection(connection);\n  var opts = { reliable: false };\n\n  var queues = { messages: createQueue(), signals: createQueue() };\n  var channels = {\n    messages: peerConnection.createDataChannel('messages', opts),\n    signals: peerConnection.createDataChannel('signals', opts)\n  };\n\n  var api = {\n    send: queues.messages.send,\n    signal: queues.signals.send,\n    onmessage: function onmessage() {},\n    onsignal: function onsignal() {},\n\n    rtcHandlers: {\n      iceCandidate: function iceCandidate(s) {\n        return rtc.handleIceCandidate(peerConnection, s);\n      },\n      answer: function answer(s) {\n        return rtc.handleAnswer(peerConnection, s);\n      },\n      close: function close() {\n        return peerConnection.close();\n      }\n    }\n  };\n\n  Object.keys(channels).forEach(function (c) {\n    return channels[c].onopen = function () {\n      return actualizeChannel(channels[c], api, queues.messages);\n    };\n  });\n\n  rtc.createOffer(connection.rtcsignal, peerConnection);\n\n  return api;\n}\n\n/**\n  Receivers are responsible for receiving the connection like so:\n\n  1. Receive an offer\n  2. Send an answer\n*/\n\nfunction createReceiver(id, connection) {\n  var peerConnection = createPeerConnection(connection);\n  var queues = { messages: createQueue(), signals: createQueue() };\n\n  var api = {\n    send: queues.messages.send,\n    signal: queues.signals.send,\n    onmessage: function onmessage() {},\n    onsignal: function onsignal() {},\n\n    rtcHandlers: {\n      iceCandidate: function iceCandidate(s) {\n        return rtc.handleIceCandidate(peerConnection, s);\n      },\n      offer: function offer(s) {\n        return rtc.handleOffer(connection.rtcsignal, peerConnection, s);\n      },\n      close: function close() {\n        return peerConnection.close();\n      }\n    }\n  };\n\n  peerConnection.ondatachannel = function (ev) {\n    actualizeChannel(ev.channel, api, queues[ev.channel.label]);\n  };\n\n  return api;\n}\n\n// Helpers\n\nfunction actualizeChannel(channel, api, queue) {\n  if (channel.label === 'messages') {\n    api.send = function (message) {\n      // console.log( 'sending message' );\n      // console.log( message );\n      channel.send(message);\n    };\n    channel.onmessage = function (message) {\n      // console.log( 'got message' )\n      // console.log( message.data )\n      api.onmessage(message);\n    };\n    queue.drain(api.send);\n  } else {\n    api.signal = function (signal, data) {\n      channel.send(JSON.stringify([signal, data]));\n    };\n    channel.onmessage = function (message) {\n      var data = JSON.parse(message.data);\n      api.onsignal(data[0], data[1]);\n    };\n    queue.drain(api.signal);\n  }\n}\n\nfunction createPeerConnection(connection) {\n  var pc = new RTCPeerConnection(config.rtcConfig);\n\n  // ICE handlers\n  pc.onicecandidate = function (event) {\n    if (event.candidate) {\n      connection.rtcsignal('iceCandidate', { iceCandidate: event.candidate });\n    }\n  };\n\n  return pc;\n}\n\n// hold on to arguments until a function to call is sent\nfunction createQueue() {\n  var queue = [];\n\n  return {\n    send: function send() {\n      queue.push(Array.from(arguments));\n    },\n    drain: function drain(drainFunc) {\n      queue.forEach(function (args) {\n        return drainFunc.apply(null, args);\n      });\n      calls = [];\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/webrtc/peer-connection.js?");

/***/ }),

/***/ "./src/webrtc/rtc.js":
/*!***************************!*\
  !*** ./src/webrtc/rtc.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n  Functions that handle RTC boilerplate. Arguments used throughout module:\n\n  @param {Function} signal - function to send signals to a signaler\n  @param {RTCPeerConnection} peerConnection - connection to handle\n  @param {Object} args - contextual arguments\n*/\n\nfunction handleOffer(signal, peerConnection, _ref) {\n  var offer = _ref.offer;\n\n  peerConnection.setRemoteDescription(new RTCSessionDescription(offer));\n  peerConnection.createAnswer(function (answer) {\n    peerConnection.setLocalDescription(answer);\n    signal('answer', { answer: answer });\n  }, function (err) {\n    alert('something went wrong');\n  });\n}\n\nfunction handleAnswer(peerConnection, _ref2) {\n  var answer = _ref2.answer;\n\n  peerConnection.setRemoteDescription(new RTCSessionDescription(answer));\n}\n\nfunction handleIceCandidate(peerConnection, _ref3) {\n  var iceCandidate = _ref3.iceCandidate;\n\n  peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));\n}\n\nfunction createOffer(signal, peerConnection) {\n  peerConnection.createOffer(function (offer) {\n    signal('offer', { offer: offer });\n    peerConnection.setLocalDescription(offer);\n  }, function (err) {\n    alert('something went wrong');\n  });\n}\n\nmodule.exports = {\n  handleOffer: handleOffer,\n  handleAnswer: handleAnswer,\n  handleIceCandidate: handleIceCandidate,\n  createOffer: createOffer\n};\n\n//# sourceURL=webpack:///./src/webrtc/rtc.js?");

/***/ }),

/***/ "./src/webrtc/signal-handler.js":
/*!**************************************!*\
  !*** ./src/webrtc/signal-handler.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (handlers, uCatchall) {\n  var catchall = uCatchall || function (s) {\n    return console.warn(s);\n  };\n\n  return function (signal, sData) {\n    return handlers[signal] ? handlers[signal](sData) : catchall(signal, sData);\n  };\n};\n\n//# sourceURL=webpack:///./src/webrtc/signal-handler.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });
'use strict';

var _http = require('http');

var _crypto = require('crypto');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webrtc = require('./webrtc');

var _webrtc2 = _interopRequireDefault(_webrtc);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = _config2.default.port;
var server = (0, _http.createServer)();

// this holds all of the connections, it gets shared over a couple of files :C
var channels = {};

var app = (0, _express2.default)();
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

(0, _webrtc2.default)(server, channels);

server.on('request', app);

app.get('/request-channel', function (req, res) {
  var widget = req.query.widget;

  // TODO: likely security risk here
  if (!widget) {
    return res.send(400, 'widget must be specified');
  }
  (0, _crypto.randomBytes)(3, function (_, buf) {
    var channelId = buf.toString('hex');
    channels[channelId] = {
      widget: widget,
      connections: []
    };
    res.send(channelId);
  });
});

server.listen(port, function () {
  return console.log('http listening on port ' + port);
});
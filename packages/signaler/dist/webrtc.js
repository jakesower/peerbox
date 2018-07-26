'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (server, channels) {
  var wss = new _ws.Server({ server: server });

  function addConnectionToChannel(connection, channelId) {
    // FIXME: channels should always be requested
    if (!channels[channelId]) {
      channels[channelId] = {
        widget: '/widgets/chat',
        connections: []
      };
    }

    var channel = channels[channelId];

    console.log('id ' + connection.id + ' connected to channel ' + channelId);
    channel.connections.push(connection);

    broadcastTo({
      channel: channel,
      to: connection.id,
      from: 'server',
      body: {
        type: 'manifest',
        widget: channel.widget,
        peers: channel.connections.filter(function (c) {
          return c.id !== connection.id;
        }).map(function (c) {
          return c.id;
        })
      }
    });

    broadcastAll({
      channel: channel,
      body: {
        type: 'peerConnected',
        id: connection.id
      },
      from: 'server',
      exceptId: connection.id
    });

    return channel;
  }

  function removeConnectionFromChannel(connection, channelId) {
    if (channels[channelId]) {
      console.log('id ' + connection.id + ' disconnected from channel ' + channelId);
      channels[channelId].connections = channels[channelId].connections.filter(function (c) {
        return c !== connection;
      });

      broadcastAll({
        channel: channels[channelId],
        from: 'server',
        body: {
          type: 'peerDisconnected',
          id: connection.id
        }
      });
    } else {
      console.log('id ' + connection.id + ' tried disconnecting from channel ' + channelId);
    }
  }

  function createConnection(sock) {
    var buf = Buffer.alloc(16);
    var id = (0, _crypto.randomFillSync)(buf).toString('hex');

    return {
      id: id,
      send: function send(msg) {
        console.log("sending message to "+id);
        console.log(msg);
        sock.send(JSON.stringify(msg));
      }
    };
  }

  wss.on('connection', function (ws, req) {
    var urlParts = _url2.default.parse(req.url).path.split('/');
    var channelId = urlParts[urlParts.length - 1];
    var connection = createConnection(ws);

    // will broadcast appropriate messages to channel
    addConnectionToChannel(connection, channelId);

    ws.on('message', function incoming(rawMessage) {
      var channel = channels[channelId];

      try {
        var message = JSON.parse(rawMessage);
        broadcastTo({ channel: channel, body: message.body, to: message.to, from: connection.id });

        console.log(message);
      } catch (err) {
        console.warn("The message couldn't go through!");
        console.log(rawMessage);
        console.log(err);
      }
    });

    ws.on('close', function closing() {
      removeConnectionFromChannel(connection, channelId);
    });
  });

  function broadcastAll(_ref) {
    var body = _ref.body,
        channel = _ref.channel,
        from = _ref.from,
        exceptId = _ref.exceptId;

    channel.connections.forEach(function (sock) {
      if (sock.id !== exceptId) sock.send({ body: body, from: from });
    });
  }

  function broadcastTo(_ref2) {
    var body = _ref2.body,
        channel = _ref2.channel,
        from = _ref2.from,
        to = _ref2.to;

    var target = channel.connections.find(function (sock) {
      return sock.id === to;
    });
    if (!target) {
      throw "No such channel with ID " + targetId;
    }

    target.send({ body: body, from: from });
  }

  return wss;
};

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _ws = require('ws');

var _crypto = require('crypto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

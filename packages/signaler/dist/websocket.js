'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var port = _ref.port;

  var WebSocketServer = require('ws').Server;
  var wss = new WebSocketServer({ port: port });

  var channels = {};

  function addConnectionToChannel(connection, channelID) {
    if (!channels[channelID]) {
      channels[channelID] = [];
    }

    console.log('id ' + connection.id + ' connected to channel ' + channelID);
    channels[channelID].push(connection);
  }

  function removeConnectionFromChannel(connection, channelID) {
    if (channels[channelID]) {
      console.log('id ' + connection.id + ' disconnected from channel ' + channelID);
      channels[channelID] = channels[channelID].filter(function (c) {
        return c !== connection;
      });

      if (channels[channelID].length === 0) {
        delete channels[channelID];
      }
    } else {
      console.log('id ' + connection.id + ' TRIED disconnecting from channel ' + channelID);
    }
  }

  var createConnection = function () {
    var connID = -1;

    return function (sock) {
      connID = connID + 1;

      return {
        id: connID,
        send: function send(msg) {
          sock.send(JSON.stringify(msg));
        }
      };
    };
  }();

  wss.on('connection', function connection(ws) {
    var urlParts = ws.upgradeReq.url.split('/');
    var channelID = urlParts[urlParts.length - 1];
    var connection = createConnection(ws);

    addConnectionToChannel(connection, channelID);

    var channel = channels[channelID];

    ws.on('message', function incoming(rawMessage) {
      var message = JSON.parse(rawMessage);

      // special messages that the server must handle
      if (message.type === 'connect') {
        if (channel.length === 1) {
          ws.send(JSON.stringify({ type: "error", description: "room is empty" }));
        } else {
          broadcastRandom(channel, { type: "connect", peer: connection.id }, connection);
        }
      } else if (message.to) {
        broadcastTo(channel, message, message.to);
      } else {
        broadcastAll(channel, message, connection);
      }
    });

    ws.on('close', function closing() {
      removeConnectionFromChannel(connection, channelID);
    });
  });

  function broadcastAll(channel, msg) {
    var except = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    channel.forEach(function (sock) {
      if (sock.id !== except.id) sock.send(msg);
    });
  }

  function broadcastRandom(channel, msg) {
    var except = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (channel.length < 2) {
      throw "Must have at least two connections";
    }
    var rKey = Math.floor(Math.random() * channel.length),
        rKey2 = Math.ceil(Math.random() * (channel.length - 1));

    var target = channel[rKey].id === except.id ? channel[(rKey + rKey2) % channel.length] : channel[rKey];

    target.send(msg);
  }

  function broadcastTo(channel, msg, targetId) {
    var target = channel.find(function (sock) {
      return sock.id === targetId;
    });
    if (!target) {
      throw "No such channel with ID " + targetId;
    }

    target.send(msg);
  }

  return wss;
};
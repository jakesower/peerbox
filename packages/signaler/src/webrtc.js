/**
  A simple webrtc signalling server. It works similarly to:
  https://www.tutorialspoint.com/webrtc/webrtc_signaling.htm

  Typical connection workflow:

  - A connects to server
  - Server tells A it is alone in room
  - B connects to server
  - Server tells B that A is the only one in the room
  - Server tells A that B has connected
  - B sends offer to A via server
  - A sends answer to B via server
  - A and B negotiate ICE candidate via server
*/

import url from 'url';
import { Server as WebSocketServer } from 'ws';
import { randomFillSync } from 'crypto';

export default function (server, channels, connections) {
  const wss = new WebSocketServer({ server: server });

  function addConnectionToChannel(connection, channelId) {
    // FIXME: channels should always be requested
    if (!channels[channelId]) {
      channels[channelId] = {
        widget: '/widgets/chat',
        connections: [],
      };
    }

    const channel = channels[channelId];

    console.log('id ' + connection.id + ' connected to channel ' + channelId);
    channel.connections.push(connection);

    broadcastTo({
      channel,
      to: connection.id,
      from: 'server',
      body: {
        type: 'manifest',
        widget: channel.widget,
        peers: channel.connections.filter(c => c.id !== connection.id).map(c => c.id)
      },
    });

    broadcastAll({
      channel,
      body: {
        type: 'peerConnected',
        id: connection.id,
      },
      from: 'server',
      exceptId: connection.id
    });

    return channel;
  }

  function removeConnectionFromChannel(connection, channelId) {
    if (channels[channelId]) {
      console.log('id ' + connection.id + ' disconnected from channel ' + channelId);
      channels[channelId].connections = channels[channelId].connections.filter(c => c !== connection);

      broadcastAll({
        channel: channels[channelId],
        from: 'server',
        body: {
          type: 'peerDisconnected',
          id: connection.id,
        },
        exceptId: connection.id,
      });
    }
    else {
      console.log('id ' + connection.id + ' tried disconnecting from channel ' + channelId);
    }
  }

  function createConnection (sock) {
    const buf = Buffer.alloc(16);
    const id = randomFillSync(buf).toString('hex');

    return {
      id,
      send: function (msg) {
        sock.send(JSON.stringify(msg));
      }
    };
  }

  wss.on('connection', function (ws, req) {
    const urlParts = url.parse(req.url).path.split('/');
    const channelId = urlParts[urlParts.length - 1];
    const connection = createConnection(ws);
    connections[connection.id] = connection;

    // will broadcast appropriate messages to channel
    addConnectionToChannel(connection, channelId);

    ws.on('message', function incoming(rawMessage) {
      const channel = channels[channelId];

      try {
        var message = JSON.parse(rawMessage);
        broadcastTo({ channel, body: message.body, to: message.to, from: connection.id });
      }
      catch (err) {
        console.warn("The message couldn't go through!");
        console.log(rawMessage);
        console.log(err);
      }
    });

    ws.on('close', function closing() {
      removeConnectionFromChannel(connection, channelId);
      delete connections[connection.id];
    });
  });

  function broadcastAll({ body, channel, from, exceptId /* ok if undefined */ }) {
    // channel.connections.forEach(function (sock) {
    //   if (sock.id !== exceptId) sock.send({ body, from });
    // });
    channel.connections.forEach(conn => {
      conn.id === exceptId ? null : sendMessage({ body, from, to: conn.id });
    })
  }

  function broadcastTo({ body, channel, from, to }) {
    var target = channel.connections.find(sock => sock.id === to);
    if (!target) { throw ("No such channel with ID " + targetId); }

    sendMessage({ body, from, to });
  }

  function sendMessage({ body, from, to }) {
    console.log({ body, from, to });
    connections[to].send({ body, from });
  }

  return wss;
}

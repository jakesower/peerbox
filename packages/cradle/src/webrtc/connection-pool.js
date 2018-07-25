import PeerConnection from './peer-connection';
import config from '../../config/env.json';
import emitter from '../lib/emitter';

/**
 * Connection Pool manages the RTC peer connections. It is given a signaler to
 * use to coordinate the task. It provides an API to dispatch messages across
 * the connections.
 *
 * The function returns a promise that is only resolved once some basic
 * information is known--that the signaler is indeed working, that there are
 * peers, and that a widget exists.
 */
export default function (channelId) {
  return new Promise((resolve, _reject) => {
    let peerConnections = {};
    let signalEmitters = {};
    let peerStatuses = {};
    let { update: updatePeerConnections, ...peerConnectionsEmitter } = emitter();
    let { update: updatePeerStatuses, ...peerStatusesEmitter } = emitter();
    let { update: updateMessages, ...messagesEmitter } = emitter();
    const signaler = new WebSocket(config.signalerWsUri + '/' + channelId);

    const send = (to, body) => signaler.send(JSON.stringify({ to, body }));

    // side effects-r-us
    signaler.onmessage = function (message) {
      const data = JSON.parse(message.data);
      const { from, body } = data;

      console.log({ receivedMessage: data });

      if (from === 'server') {
        // helper
        const makeConnection = peerId => {
          signalEmitters[peerId] = emitter();
          const c = PeerConnection(
            m => send(peerId, m),   // sendSignal (connection -> pool)
            signalEmitters[peerId], // signalEmitter (pool -> connection)
          );
          peerConnections[peerId] = c;
          console.log(c)
          peerStatuses[peerId] = 'disconnected';
          c.messageEmitter.on(body => updateMessages({ body, from: peerId })); // TODO: (small) memory leak
          c.statusEmitter.on(status => {
            peerStatuses[peerId] = status;
            updatePeerStatuses(peerStatuses);
          });

          updatePeerStatuses(peerStatuses);
          return c;
        };

        if (body.type === 'manifest') {
          body.peers.forEach(peerId => {
            const c = makeConnection(peerId);
            c.initiate();
          });

          // TODO: add sendToPeer / sendToAll
          // THIS IS THE PROMISIFIED RETURN VALUE FOR THE OVERALL FUNCTION
          resolve({
            channelId,
            messagesEmitter,
            peerConnectionsEmitter,
            peerStatusesEmitter,
            sendToAll: message => Object.values(peerConnections).forEach(c => c.sendMessage(message)),
            sendToPeer: (peerId, message) => peerConnections[peerId].sendMessage(message),
            widget: body.widget,
            close: () => {
              Object.values(peerConnections).forEach(c => c.close());
              peerConnections = {};
              signaler.close();
            },
          });

          // will this work?
          updatePeerConnections(peerConnections);
        }
        else if (body.type === 'peerConnected') {
          makeConnection(body.id);
          updatePeerConnections(peerConnections);
        }
        else if (body.type === 'peerDisconnected') {
          delete signalEmitters[body.id];
          delete peerConnections[body.id];
          delete peerStatuses[body.id];
          updatePeerConnections(peerConnections);
          updatePeerStatuses(peerStatuses);
        }
      }
      else { // data not from the signal server itself (likely a peer RTC message)
        signalEmitters[from].update(body);
      }
    }
  });
}

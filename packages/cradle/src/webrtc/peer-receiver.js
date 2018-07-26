import emitter from '../lib/emitter';
import { createDispatcher } from '../lib/utils';

/**
 * Linked closely to the connection pool. It's given a sendSignal function and
 * an emitter for messages relevant to it. The pool will take care of making
 * sure that the right messages get to the right connections.
 */

export default function (sendSignal, signalsEmitter) {
  let peerConnection = new RTCPeerConnection({ iceServers: [{ url: "stun://stun.ucsb.edu:3478" }] });
  let channel;
  let { update: updateStatus, ...statusEmitter } = emitter();
  let { update: updateMessage, ...messageEmitter } = emitter();
  let messageQueue = [];

  updateStatus('disconnected');

  peerConnection.onicecandidate = function (event) { if (event.candidate) { signal('iceCandidate', { iceCandidate: event.candidate }); }}


  function sendMessage(message) {
    const data = JSON.stringify(message);
    channel.send(data);
  }

  peerConnection.ondatachannel = ev => {
    channel = ev.channel;

    channel.onmessage = m => {
      updateMessage(JSON.parse(m));
    }

    channel.onopen = () => {
      updateStatus('data channel open');
    };

    channel.onerror = console.error;
  };


  signalsEmitter.on(createDispatcher('type', 'payload', {
    offer: handleOffer,
    iceCandidate: handleIceCandidate,
  }));

  return {
    statusEmitter,
    sendMessage,
    messageEmitter,
    initiate: createOffer,
    close: () => { peerConnection.close(); peerConnection = null; }
  };


  function signal(type, payload) {
    sendSignal({ type, payload });
  }

  // RTC stuff

  function handleOffer({ offer }) {
    updateStatus('handling offer');
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.createAnswer(function (answer) {
      peerConnection.setLocalDescription(answer);
      signal('answer', { answer: answer });
    }, function (err) { alert('something went wrong') });
  }


  function handleIceCandidate({ iceCandidate }) {
    peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
  }
}

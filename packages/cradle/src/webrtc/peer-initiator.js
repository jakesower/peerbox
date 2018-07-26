import emitter from '../lib/emitter';
import { createDispatcher } from '../lib/utils';

/**
 * Linked closely to the connection pool. It's given a sendSignal function and
 * an emitter for messages relevant to it. The pool will take care of making
 * sure that the right messages get to the right connections.
 */

export default function (sendSignal, signalsEmitter) {
  let peerConnection = new RTCPeerConnection({ iceServers: [{ url: "stun://stun.ucsb.edu:3478" }] });
  let channel = peerConnection.createDataChannel(name, { reliable: false });
  let { update: updateStatus, ...statusEmitter } = emitter();
  let { update: updateMessage, ...messageEmitter } = emitter();
  let messageQueue = [];

  updateStatus('disconnected');

  peerConnection.onicecandidate = function (event) { if (event.candidate) { signal('iceCandidate', { iceCandidate: event.candidate }); }}


  function sendMessage(message) {
    const data = JSON.stringify(message);
    channel.send(data);
  }

  channel.onmessage = m => {
    // console.log('got message');
    // console.log(m);
    updateMessage(JSON.parse(m));
  }

  channel.onopen = () => {
    updateStatus('channel open');
    console.log('ay papi');
    // console.log(channel);
    queue.forEach(m => channel.send(m));
    queue = [];
    connected = true;
  };

  channel.onerror = console.error;


  signalsEmitter.on(createDispatcher('type', 'payload', {
    answer: handleAnswer,
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

  function handleAnswer({ answer }) {
    updateStatus('handling answer');
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }


  function handleIceCandidate({ iceCandidate }) {
    peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
  }


  function createOffer() {
    updateStatus('connecting');
    peerConnection.createOffer(function (offer) {
      signal('offer', { offer: offer });
      peerConnection.setLocalDescription(offer);
    }, function (_err) { alert('something went wrong') });
  }
}

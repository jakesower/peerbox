import emitter from '../lib/emitter';
import { createDispatcher } from '../lib/utils';

/**
 * Linked closely to the connection pool. It's given a sendSignal function and
 * an emitter for messages relevant to it. The pool will take care of making
 * sure that the right messages get to the right connections.
 */

export default function (sendSignal, signalsEmitter) {
  let widgetChannel;
  let peerConnection = new RTCPeerConnection({ iceServers: [{ url: "stun:stun.stunprotocol.org:3478" }] });
  let { update: updateStatus, ...statusEmitter } = emitter();
  let { update: updateMessage, ...messageEmitter } = emitter();
  updateStatus('disconnected');

  peerConnection.onicecandidate = function (event) { if (event.candidate) { signal('iceCandidate', { iceCandidate: event.candidate }); }}

  signalsEmitter.on(createDispatcher('type', 'payload', {
    answer: handleAnswer,
    offer: handleOffer,
    iceCandidate: handleIceCandidate,
  }));

  return {
    statusEmitter,
    sendMessage: m => widgetChannel.send(JSON.stringify(m)),
    messageEmitter,
    initiate: createOffer,
    close: () => { peerConnection.close(); peerConnection = null; }
  };


  function signal(type, payload) {
    sendSignal({ type, payload });
  }

  // RTC stuff

  /**
   * This means that this end is being contacted by a peer looking to set up a
   * new connection. Setup for the receiving end.
   */
  function handleOffer({ offer }) {
    updateStatus('handling offer');
    peerConnection.ondatachannel = ev => setChannel(ev.channel);

    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.createAnswer(function (answer) {
      peerConnection.setLocalDescription(answer);
      signal('answer', { answer: answer });
    }, function (err) { alert('something went wrong') });
  }


  function handleAnswer({ answer }) {
    updateStatus('handling answer');
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }


  function handleIceCandidate({ iceCandidate }) {
    peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
  }


  function createOffer() {
    updateStatus('connecting');
    setChannel(peerConnection.createDataChannel('widget', { reliable: false }));
    peerConnection.createOffer(function (offer) {
      signal('offer', { offer: offer });
      peerConnection.setLocalDescription(offer);
    }, function (_err) { alert('something went wrong') });
  }


  function setChannel(ch) {
    widgetChannel = ch;

    widgetChannel.onmessage = m => {
      updateMessage(JSON.parse(m.data));
    }

    widgetChannel.onopen = () => {
      updateStatus('channel open');
      console.log('ay papi');
    };

    widgetChannel.onerror = console.error;
  }
}

import emitter from '../lib/emitter';
import { createDispatcher } from '../lib/utils';

/**
 * Linked closely to the connection pool. It's given a sendSignal function and
 * an emitter for messages relevant to it. The pool will take care of making
 * sure that the right messages get to the right connections.
 */

export default function (sendSignal, signalsEmitter) {
  let peerConnection = new RTCPeerConnection({ iceServers: [{ url: "stun://stun.ucsb.edu:3478" }] });

  peerConnection.onicecandidate = function (event) { if (event.candidate) { signal('iceCandidate', { iceCandidate: event.candidate }); }}

  const widgetChannel = QueuedChannel('widget');

  signalsEmitter.on(createDispatcher('type', 'payload', {
    answer: handleAnswer,
    offer: handleOffer,
    iceCandidate: handleIceCandidate,
  }));

  return {
    sendMessage: widgetChannel.send,
    messageEmitter: widgetChannel.messageEmitter,
    initiate: createOffer,
    close: () => { peerConnection.close(); peerConnection = null; }
  };


  function signal(type, payload) {
    sendSignal({ type, payload });
  }

  // RTC stuff
  function handleOffer({ offer }) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.createAnswer(function (answer) {
      peerConnection.setLocalDescription(answer);
      signal('answer', { answer: answer });
    }, function (err) { alert('something went wrong') });
  }


  function handleAnswer({ answer }) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }


  function handleIceCandidate({ iceCandidate }) {
    peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
  }


  function createOffer() {
    peerConnection.createOffer(function (offer) {
      signal('offer', { offer: offer });
      peerConnection.setLocalDescription(offer);
    }, function (_err) { alert('something went wrong') });
  }

  function QueuedChannel(name) {
    let queue = [];
    let connected = false;
    let channel = peerConnection.createDataChannel(name, { reliable: false });
    let { update, ...messageEmitter } = emitter();

    function send(message) {
      const data = JSON.stringify(message);
      connected ? channel.send(data) : queue.push(data);
    }

    peerConnection.ondatachannel = chan => {
      console.log({ chan })
      chan.channel.onmessage = m => {
        console.log('got message on chan');
        console.log(m);
        update(JSON.parse(m.data));
      }
    }

    channel.onmessage = m => {
      console.log('got message');
      console.log(m);
      update(JSON.parse(m));
    }
    channel.onopen = () => {
      console.log(channel);
      queue.forEach(m => channel.send(m));
      queue = [];
      connected = true;
    };
    channel.onerror = console.error;

    return { messageEmitter, send };
  }
}

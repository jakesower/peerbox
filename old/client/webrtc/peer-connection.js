import { handleIceCandidate, handleAnswer, createOffer, handleOffer } from "./rtc";

// Config
var RTCPeerConnection = RTCPeerConnection || webkitRTCPeerConnection || mozRTCPeerConnection;

const config = {
  rtcConfig: {
    iceServers: [
      { url: "stun:stun.1.google.com:19302" }
    ]
  }
}

/**
  @param {String} id - the peerID
  @param {Boolean} init - is this side initiating the connection?
  @param {Object} signaler - api with signaler (send only)
  @param {Object} widget - api to widget (send only)
  @param {Object} connection - api to main connection
*/

/**
  Initiators are responsible for initiating the connection like so:

  1. Send an offer
  2. Receive an answer
*/
export function createInitiator(id, connection) {
  const peerConnection = createPeerConnection(connection);
  const opts = { reliable: false };

  const queues = { messages: createQueue(), signals: createQueue() };
  const channels = {
    messages: peerConnection.createDataChannel('messages', opts),
    signals: peerConnection.createDataChannel('signals', opts)
  }

  let api = {
    send: queues.messages.send,
    signal: queues.signals.send,
    onmessage: () => { },
    onsignal: () => { },

    rtcHandlers: {
      iceCandidate: s => handleIceCandidate(peerConnection, s),
      answer: s => handleAnswer(peerConnection, s),
      close: () => peerConnection.close()
    }
  };

  Object.keys(channels).forEach(c =>
    channels[c].onopen = () =>
      actualizeChannel(channels[c], api, queues.messages));

  createOffer(connection.rtcsignal, peerConnection);

  return api;
}

/**
  Receivers are responsible for receiving the connection like so:

  1. Receive an offer
  2. Send an answer
*/

export function createReceiver(id, connection) {
  const peerConnection = createPeerConnection(connection);
  const queues = { messages: createQueue(), signals: createQueue() };

  let api = {
    send: queues.messages.send,
    signal: queues.signals.send,
    onmessage: () => { },
    onsignal: () => { },

    rtcHandlers: {
      iceCandidate: s => handleIceCandidate(peerConnection, s),
      offer: s => handleOffer(connection.rtcsignal, peerConnection, s),
      close: () => peerConnection.close()
    }
  };

  peerConnection.ondatachannel = ev => {
    actualizeChannel(ev.channel, api, queues[ev.channel.label]);
  }

  return api;
}

// Helpers

function actualizeChannel(channel, api, queue) {
  if (channel.label === 'messages') {
    api.send = message => {
      // console.log( 'sending message' );
      // console.log( message );
      channel.send(message);
    }
    channel.onmessage = message => {
      // console.log( 'got message' )
      // console.log( message.data )
      api.onmessage(message);
    }
    queue.drain(api.send);
  }
  else {
    api.signal = (signal, data) => {
      channel.send(JSON.stringify([signal, data]));
    }
    channel.onmessage = message => {
      const data = JSON.parse(message.data);
      api.onsignal(data[0], data[1])
    };
    queue.drain(api.signal);
  }
}


function createPeerConnection(connection) {
  let pc = new RTCPeerConnection(config.rtcConfig);

  // ICE handlers
  pc.onicecandidate = function (event) {
    if (event.candidate) {
      connection.rtcsignal(
        'iceCandidate',
        { iceCandidate: event.candidate }
      );
    }
  }

  return pc;
}


// hold on to arguments until a function to call is sent
function createQueue() {
  let queue = [];

  return {
    send: function () {
      queue.push(Array.from(arguments))
    },
    drain: function (drainFunc) {
      queue.forEach(args => drainFunc.apply(null, args));
      calls = [];
    }
  }
}

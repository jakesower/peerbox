/**
  Functions that handle RTC boilerplate. Arguments used throughout module:

  @param {Function} signal - function to send signals to a signaler
  @param {RTCPeerConnection} peerConnection - connection to handle
  @param {Object} args - contextual arguments
*/


export function handleOffer(signal, peerConnection, { offer }) {
  peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  peerConnection.createAnswer(function (answer) {
    peerConnection.setLocalDescription(answer);
    signal('answer', { answer: answer });
  }, function (err) { alert('something went wrong') });
}


export function handleAnswer(peerConnection, { answer }) {
  peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}


export function handleIceCandidate(peerConnection, { iceCandidate }) {
  peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
}


export function createOffer(signal, peerConnection) {
  peerConnection.createOffer(function (offer) {
    signal('offer', { offer: offer });
    peerConnection.setLocalDescription(offer);
  }, function (err) { alert('something went wrong') });
}

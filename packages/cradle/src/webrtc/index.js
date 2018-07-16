import ConnectionPool from './connection-pool';
import config from '../../config.json';

export default (function() {
  // request a new room from the server and connect to it
  function createSignaler(widgetUri) {
    // FIXME: hope that URL holds up... investigate!
    return fetch(config.signalerHttpUri + '/request-channel?widget=' + widgetUri)
      .then(r => r.text())
      .then(joinChannel);
  }

  /**
   * Handles setting up the signaler, getting an initial payload, then
   * returning a promise of a connection pool. Behold, sausage. :(
   */
  function joinChannel(channelId) {
    return ConnectionPool(channelId);
  }

  return {
    createSignaler,
    joinChannel,
  };
}());

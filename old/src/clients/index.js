/**
 * Adhoc Architecture
 *
 * Adhoc mediates p2p communication among users by providing a uniform API to
 * widgets, setting up signaling, and all the boring parts.
 *
 * States:
 * - catalog: not connected to a room
 * - connected: actively using a widget with zero or more peers
 * - initiating: setting up a room
 * - connecting: establishing connections and getting the widget
 * - empty: the user is in a room with no peers and no widget
 *
 * Widgets are run in iframes and use window.postMessage to communicate with
 * adhoc.
 *
 * This file is meant to be inlined with `index.html`.
 */

import client from './webrtc';

(function() {
  console.log('hi');
  let state = init();

  function transitionToState(newState) {

  }

  function init() {
    if (window.location.pathname === '/') {
      return { mode: 'catalog' };
    }

    const pathParts = window.location.pathname.split("/");
    const room = pathParts[pathParts.length - 1];

    joinRoom(room);
  }


  function joinRoom(room) {
    let state = 'connecting';
    client.join(room);
  }

}());

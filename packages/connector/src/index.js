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
 * adhoc. A library will be written to smooth this process.
 *
 * This file is meant to be inlined with `index.html`.
 */

import client from './webrtc';

(function() {
  const qs = document.querySelector.bind(document);
  let state;

  function transitionToState(newState, enterArgs) {
    const exit = (states[state] && states[state].exit) || (() => {});
    const enter = (states[newState] && states[newState].enter) || (() => {});

    state = newState;

    exit();
    enter(enterArgs);
  }

  const states = {
    connected: {
      enter: ({ widgetUri }) => {
        qs('#widget').style.display = 'block';
        qs('#widget').src = widgetUri;
      },
      exit: () => {
        qs('#widget').style.display = 'none';
        qs('#widget').source = '';
      }
    },

    catalog: {
      enter: () => {
        qs('#catalog').style.display = 'block';
      },
      exit: () => {
        qs('#catalog').style.display = 'none';
      }
    },
  }

  function init() {
    transitionToState('catalog');

    document.querySelectorAll('.widget-launcher').forEach((elt) => {
      elt.addEventListener('click', () => transitionToState('connected', { widgetUri: elt.dataset.location }))
    })
  }


  function joinRoom(room) {
    state = 'connecting';
    client.join(room);
  }

  init();

}());

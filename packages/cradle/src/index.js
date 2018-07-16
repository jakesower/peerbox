/**
 * Peerbox Architecture
 *
 * Peerbox mediates p2p communication among users by providing a uniform API to
 * widgets, setting up signaling, and all the boring parts.
 *
 * modes:
 * - catalog: not connected to a room
 * - connected: actively using a widget with zero or more peers
 * - initiating: setting up a room
 * - connecting: establishing connectionPool and getting the widget
 * - empty: the user is in a room with no peers and no widget
 *
 * Widgets are run in iframes and use window.postMessage to communicate with
 * peerbox. A library will be written to smooth this process.
 *
 * This file is meant to be inlined with `index.html`.
 */

import config from '../config.json';
import client from './webrtc';

(function() {
  const catalogElt = document.querySelector('#catalog');
  const widgetElt = document.querySelector('#widget');

  const widgetApi = {
    send: m => {
      console.log('ding');
      console.log(m);
      widgetElt.contentWindow.postMessage(m, '*')
    }
  };

  let state = {
    connectionPool: null,
    mode: null,
    widget: null,
  };

  function transitionToMode(newMode, enterArgs = {}) {
    const exit = (modes[state.mode] && modes[state.mode].exit) || (() => {});
    const enter = (modes[newMode] && modes[newMode].enter) || (() => {});

    state.mode = newMode;

    exit();
    enter(enterArgs);
  }

  const modes = {
    catalog: {
      enter: () => {
        catalogElt.style.display = 'block';
      },
      exit: () => {
        catalogElt.style.display = 'none';
      }
    },

    connected: {
      enter: ({ connectionPool }) => {
        state.connectionPool = connectionPool;
        history.pushState({ channel: connectionPool.channelId }, '', '/c/'+connectionPool.channelId);
        widgetElt.style.display = 'block';

        // with everything ready, cradle starts coordinating message passing

        connectionPool.messagesEmitter.on(m => {
          widgetApi.send(m.body);
        });

        window.addEventListener('message', m => {
          connectionPool.sendToAll(m.data);
        });
      },
      exit: () => {
        mode.signaler.close().then(() => mode.signaler = null);
        widgetElt.style.display = 'none';
        widgetElt.source = '';
      }
    },

    connecting: {
      enter: ({ channelId }) => {
        client.joinChannel(channelId)
          .then(connectionPool => {
            const widgetContentP = new Promise(resolve => {
              console.log('oh hey')
              widgetElt.addEventListener('load', resolve, { passive: true }); // TODO: unregiter this on load
              widgetElt.src = connectionPool.widget;
            });

            widgetContentP.then(() => transitionToMode('connected', { connectionPool }));
          });
      }
    },

    initiating: {
      enter: ({ widgetUri }) => {
        const widgetContentP = new Promise(resolve => {
          widgetElt.addEventListener('load', resolve, { passive: true }); // TODO: unregiter this on load
          widgetElt.src = widgetUri;
        });

        const connectionPoolP = client.createSignaler(widgetUri);

        Promise.all([widgetContentP, connectionPoolP]).then(([_, connectionPool]) => {
          state.widget = widgetUri;
          transitionToMode('connected', { connectionPool, widgetUri });
        });
      }
    }
  }

  function init() {
    document.querySelectorAll('.widget-launcher').forEach((elt) => {
      elt.addEventListener('click', () => transitionToMode('initiating', { widgetUri: elt.dataset.location }))
    });

    setModeFromUri();
  }


  function setModeFromUri() {
    const channelPattern = /^\/c\/([a-f0-9]+)$/;
    const found = document.location.pathname.match(channelPattern);
    if (found && found[1]) {
      return transitionToMode('connecting', { channelId: found[1] });
    }

    return transitionToMode('catalog');
  }

  init();

}());

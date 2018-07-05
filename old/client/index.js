import createConnection from './webrtc';
import enterRoom from './enter-room';

const config = {
  widgetCatalog: "/widgets.json",
  widgetPath: "",
  domRoot: document.querySelector('main'),
};

/**
  ADHOC BOOTSTRAPPER

  This page is the gateway to the Adhoc system. It performs the following vital
  functions:

  - Connects to rooms via adhoc compliant connectors
  - Reads widget catalogs, displays them, and allows their selection
  - Initializes widgets and passes control to them

  - Config object uses the following parameters:
  @param {URI} widgetURI - the root path for widget source files
  @param {URI} widgetCatalog - the path to a widgets.json file
  @param {Element} domRoot - a DOM element for the widget to render into

  The bootstrapper expects window.adhoc.createConnection to be defined.
*/

(function () {
  let connection;
  const room = window.location.path.split('/')[0];

  if (/^[0-f]{40}$/.test(room)) {
    const connectionP = connectToRoom(room, ['main', 'signaler']);

    connectionP.then(connection => {
      c.channels.signaler.onmessage = function (msg) {

      }
      c.channels.signaler.send('manifest');
    });
  } else {
    presentWidgets();
  }

  function adhocInit() {
    const room = roomFromURI();

    room ?
      connectToRoom(room) :
      presentWidgets();
  }


  function connectToRoom(room) {
    const connection = createConnection(room, "join");
    connection.onsignal = function (signal, data) {
      if (signal === 'manifest' && data.widgetPath) {
        connection.onsignal = function () { };
        connection.manifest.widgetPath = data.widgetPath;
        loadWidget(data.widgetPath, function () {
          window.adhoc.widget(connection, config.domRoot);
        });
      }
    }
  }


  function presentWidgets() {
    const template = document.getElementById('catalog-item-template').content;

    function populateTemplate(parts) {
      const name = parts.name || "(no name)",
        description = parts.description || "(no description)";

      const newNode = document.importNode(template, true);

      Object.keys(parts).forEach(function (k) {
        const n = newNode.querySelector('.' + k);
        if (n) { n.textContent = parts[k]; }
      });

      newNode.querySelector('li').dataset.location = parts.location;

      return newNode;
    }

    // may wish to refactor to use XHR rather than fetch for compatibility
    // also, may wish to use callbacks rather than promises
    fetch(config.widgetCatalog)
      .then(function (d) { return d.json(); })
      .then(function (catalog) {
        const widgetList = document.createElement('ul');
        catalog.widgets.forEach(function (widget) {
          widgetList.appendChild(populateTemplate(widget));
        });

        widgetList.addEventListener('click', function (event) {
          const liNode = event.path.find(function (elt) {
            return elt.dataset.location;
          });
          const wPath = liNode.dataset.location;

          // FIXME
          loadWidget(
            wPath,
            function () {
              const room = randomSHA1();
              const connection = createConnection(room, { widgetPath: wPath });
              history.pushState({ room: connection.room }, "room", "/" + room);
              window.adhoc.widget(connection, config.domRoot);
            }
          );
        });

        document.querySelector('.adhoc-widget-menu').appendChild(widgetList);
      })
  }


  function loadWidget(path, callback) {
    const uri = config.widgetPath + path;

    (function (d, script) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.onload = function () {
        script.onload = null;
        if (callback) callback();
      };
      script.src = uri;
      document.getElementsByTagName('head')[0].appendChild(script);
    }(document));
  }


  function randomSHA1() {
    let buf = new Uint8Array(20);
    window.crypto.getRandomValues(buf);
    out = '';
    for (let i = 0; i < buf.length; i += 1) {
      const s = buf[i].toString(16);
      out = out + (s.length === 1 ? '0' : '') + s;
    }
    return out;
  }


  function roomFromURI() {
    const isSHA1 = function (str) { return /^[0-f]{40}$/.test(str); }

    // first try the path
    const pathname = window.location.pathname.split("/"),
      roomURICand = config.room || pathname[pathname.length - 1];

    if (isSHA1(roomURICand)) return roomURICand;

    // if that didn't work, try the query string
    let queryArgs = window.location.search.substring(1).split('&');
    let match = queryArgs.find(function (qa) {
      return qa.split('=')[0] === 'room';
    });

    if (match) {
      let cand = match.split('=')[1];
      if (isSHA1(cand)) return cand;
    }

    return null;
  }

  adhocInit();
}());


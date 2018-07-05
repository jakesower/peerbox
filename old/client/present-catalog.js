const config = {
  widgetCatalog: "/widgets.json",
  widgetPath: "",
  domRoot: document.querySelector('main'),
};

const fetchCatalog = function () {
  let p;

  return function () {
    if (!p) {
      p = fetch(config.widgetCatalog).then(JSON.parse);
    }
    return p;
  }
}

export default function presentWidgets() {
  const template = document.getElementById('catalog-item-template').content;

  function populateTemplate(parts) {
    const name = parts.name || "(no name)";
    const description = parts.description || "(no description)";
    const newNode = document.importNode(template, true);

    Object.keys(parts).forEach(function (k) {
      const n = newNode.querySelector('.' + k);
      if (n) { n.textContent = parts[k]; }
    });

    newNode.querySelector('li').dataset.location = parts.location;

    return newNode;
  }

  fetchCatalog()
    .then(function (catalog) {
      const widgetList = document.createElement('ul');
      catalog.widgets.forEach(function (widget) {
        widgetList.appendChild(populateTemplate(widget));
      });

      widgetList.addEventListener('click', function (event) {
        const liNode = event.path.find(function (elt) {
          return elt.dataset.location;
        });
        const widgetPath = liNode.dataset.location;

        // FIXME
        loadWidget(
          widgetPath,
          function () {
            const room = randomSHA1();
            const connection = createConnection(room, { widgetPath });
            history.pushState({ room: connection.room }, "room", "/" + room);
            window.adhoc.widget(connection, config.domRoot);
          }
        );
      });

      document.querySelector('.adhoc-widget-menu').appendChild(widgetList);
    });
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

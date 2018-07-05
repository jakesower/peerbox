export default function connectToRoom(connection, room) {
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

function loadWidget(path) {
  const uri = config.widgetPath + path;

  return new Promise((resolve, reject) => {
    (function (d, script) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      script.src = uri;
      document.getElementsByTagName('head')[0].appendChild(script);
    }(document));
  });
}

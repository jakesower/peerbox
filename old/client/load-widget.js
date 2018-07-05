export default function loadWidget(path) {
  (function (d, script) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = path;
    document.getElementsByTagName('head')[0].appendChild(script);

    return new Promise((res) => {
      script.onload = function () {
        script.onload = null;
        res(null);
      }
    });
  }(document));
}

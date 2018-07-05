var server = require('http').createServer();
var express = require('express');
var fs = require('fs');

var app = express();
app.set('view engine', 'ejs');

var { port } = require('./config');

var WebSocketServer = require('ws').Server;
var signalServer = require('./src/servers/webrtc');
var wss = signalServer(server);

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/widgets.json', function (req, res, next) {
  res.sendFile(__dirname + '/widgets.json')
});

app.get('/menu.css', function (req, res, next) {
  res.sendFile(__dirname + '/menu.css')
});

app.get('/bootstrapper.js', function (req, res, next) {
  res.sendFile(__dirname + '/bootstrapper.js')
});

app.get('/widgets/:widget(*)', function (req, res, next) {
  var file = req.params.widget;
  var path = fs.realpathSync(__dirname + '/widgets/' + file);

  res.sendFile(path);
});

app.get('/clients/:client(*)', function (req, res, next) {
  var file = req.params.client;
  var path = fs.realpathSync(__dirname + '/dist/clients/' + file);

  res.sendFile(path);
});

app.get('*', function (req, res, next) {
  res.sendFile(fs.realpathSync(__dirname + '/index.html'));
})

server.on('request', app);
server.listen(port, () => console.log('http listening on port ' + port));

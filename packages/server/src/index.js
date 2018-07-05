import { createServer } from 'http';
import express from 'express';
import signalServer from './webrtc';
import config from '../config.json';
import widgets from '../widgets.json';

const port = config.port;
const server = createServer();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

signalServer(server);

app.get('*', function (req, res, next) {
  // obvs needs to be different for prod ;)
  res.render('index', { widgets });
});

server.on('request', app);
server.listen(port, () => console.log('http listening on port ' + port));

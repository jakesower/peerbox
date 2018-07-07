import { createServer } from 'http';
import express from 'express';
import signalServer from './webrtc';
import config from '../config.json';

const port = config.port;
const server = createServer();

const app = express();
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

signalServer(server);

server.on('request', app);
server.listen(port, () => console.log('http listening on port ' + port));

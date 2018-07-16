import { createServer } from 'http';
import { randomBytes } from 'crypto';
import express from 'express';
import signalServer from './webrtc';
import config from '../config.json';

const port = config.port;
const server = createServer();

// this holds all of the connections, it gets shared over a couple of files :C
let channels = {};

const app = express();
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("X-Frame-Options", "ALLOW-FROM http://localhost:3001/");
  next();
});

signalServer(server, channels);

server.on('request', app);

app.get('/request-channel', (req, res) => {
  const widget = req.query.widget;

  // TODO: likely security risk here
  if (!widget) { return res.send(400, 'widget must be specified'); }
  randomBytes(16, (_, buf) => {
    const channelId = buf.toString('hex');
    channels[channelId] = {
      widget,
      connections: [],
    };
    res.send(channelId);
  });
})

server.listen(port, () => console.log('http listening on port ' + port));

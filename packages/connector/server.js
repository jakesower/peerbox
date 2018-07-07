import { createServer } from 'http';
import express from 'express';
import config from './config.json';

const port = config.port;
const server = createServer();

const app = express();
app.use(express.static('dist'));
app.use('/widgets', express.static('widgets'));

server.on('request', app);
server.listen(port, () => console.log('http listening on port ' + port));

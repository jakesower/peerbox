import { createServer } from 'http';
import express from 'express';
import config from './config.json';
import widgets from './config/widgets.json';

const port = config.port;
const server = createServer();

const app = express();
app.use(express.static('dist'));
app.use('/widgets', express.static('widgets'));
app.set('view engine', 'ejs');
app.set('views', __dirname);

server.on('request', app);

app.get('/', (_req, res) => {
  res.render('index.ejs', { widgets });
});

app.get('/c/*', (_req, res) => {
  console.log('hai')
  res.render('index.ejs', { widgets });
});

server.listen(port, () => console.log('http listening on port ' + port));

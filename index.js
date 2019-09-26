const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const environment = process.env.NODE_ENV;

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api', (req, res, next) => {
  res.send('Initial');
  next();
});

const port = 8080;
app.listen(port, () => {
  console.log("API running at " + port);
});

module.exports = app;
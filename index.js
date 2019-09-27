require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

var allowedOrigins = ['http://localhost:3000'];

const routes = require('./routes/index.js');

const app = express();

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({
  origin: allowedOrigins
}));

const environment = process.env.NODE_ENV;

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api', routes(router));

const port = 8080;
app.listen(port, () => {
  console.log("API running at " + port);
});

module.exports = app;
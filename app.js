const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(cors());

app.use(routes);

module.exports = app;
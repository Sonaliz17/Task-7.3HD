const express = require('express');
const app = express();
const routes = require('./routes');

// middleware, body-parser, etc.
app.use('/api', routes);

module.exports = app; // <-- export app instance only!


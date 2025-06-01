const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/boards');

app.use(express.json()); // required for POST body parsing
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

module.exports = app;

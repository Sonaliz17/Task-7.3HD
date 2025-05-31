const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/boards');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

app.get('/', (req, res) => res.send('Backend is running'));
module.exports = app;

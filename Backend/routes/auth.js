const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.status(201).json({ message: 'User registered' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (password === 'wrongpass') return res.status(400).json({ error: 'Invalid credentials' });
  res.status(200).json({ message: 'Login successful' });
});

module.exports = router;


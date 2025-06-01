const express = require('express');
const router = express.Router();

// Example default route
router.get('/', (req, res) => res.send('API Root'));

module.exports = router;

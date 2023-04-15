const express = require('express');
const knex = require('../config/database.config');
const router = express.Router();

router.get('/', async function (req, res) {
  res.status(200).send('Oladipo demo credit server is up and active 🚀');
});

module.exports = router;

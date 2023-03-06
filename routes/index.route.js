const express = require('express');
const knex = require('../config/database.config')
const router = express.Router();

router.get('/', async function(req, res) {
    // await knex('cards').del();
    // await knex('wallets').del();
    // await knex('users').del();
    res.status(200).send("Demo credit server is up and active 🚀")
})

module.exports = router;
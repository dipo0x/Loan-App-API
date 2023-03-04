const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    res.status(200).send("Demo credit server is up and active 🚀")
})

module.exports = router;
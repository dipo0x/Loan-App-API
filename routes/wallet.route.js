const express = require('express');
const controller = require('../controllers/wallet.controller');
const hasAuth = require('../utils/middleware/hasAuth');
const router = express.Router();

router.post('/addCard', hasAuth, controller.addCard)

module.exports = router;
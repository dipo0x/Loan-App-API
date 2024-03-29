const express = require('express');
const controller = require('../controllers/wallet.controller');
const hasAuth = require('../utils/middleware/hasAuth');
const router = express.Router();

router.post('/fundWallet', hasAuth, controller.fundAccount);
router.post('/transferFund', hasAuth, controller.transferFund);
router.get('/getTransactions', hasAuth, controller.getTransactions);
router.post('/withdrawFund', hasAuth, controller.withdrawFund);

module.exports = router;

const express = require('express');
const controller = require('../controllers/auth.controller')
const { userExists } = require('../utils/middleware/userExistsByEmail')
const router = express.Router();

router.post('/register', userExists, controller.register)

module.exports = router;
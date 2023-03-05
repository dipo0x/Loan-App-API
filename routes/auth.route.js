const express = require('express');
const controller = require('../controllers/auth.controller')
const userMiddleware = require('../utils/middleware/userExistsByEmail')
const router = express.Router();

router.post('/register', userMiddleware.userExists, controller.register)
router.post('/login', controller.login)

module.exports = router;
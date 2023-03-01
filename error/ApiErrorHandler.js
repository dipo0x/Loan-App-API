const ApiError = require('./ApiError')
const logger = require("../logger/logger");
const emailSender = require('../services/mail')
const seeders = require('../config/seeders.config')
const NodeEnv = process.env.NODE_ENV

function apiErrorHandler(err, req, res, next){
	if (err instanceof ApiError){
		res.status(err.code).json(err.message);
		return
	}
	emailSender.errorNotifier(seeders[NodeEnv].SERVER_ADMIN_EMAIL, err.err.stack)
	logger.info("The error is:", err.err.stack)
	res.status(500).json('Something went wrong')
}

module.exports = apiErrorHandler;
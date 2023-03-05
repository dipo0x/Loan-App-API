const ApiError = require('./ApiError')
const logger = require("../logger/logger");
const emailSender = require('../services/mail')
const seeders = require('../config/seeders.config')
const NodeEnv = process.env.NODE_ENV

function apiErrorHandler(err, req, res, next){
	if (err instanceof ApiError){
		res.status(err.code).json({ success: false, message: err.message});
		return
	}
	// emailSender.errorNotifier(seeders[NodeEnv].server_admin_email, err.err.stack)
	console.log(err)
	logger.info("The error is:", err.err)
	res.status(500).json('Something went wrong')
}

module.exports = apiErrorHandler;
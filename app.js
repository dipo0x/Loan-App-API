const express = require('express');
const cors = require('cors')
const toobusy_js = require("toobusy-js");

const apiErrorHandler = require('./error/ApiErrorHandler')
const apiError = require('./error/ApiError')
const indexRouter = require('./routes/index.route.js');
const authRouter = require('./routes/auth.route.js');

const { server, app } = require('./server')

require('dotenv').config()
require('./config/database.config')
require('./knexfile')
require('./config/redis.config')

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use(apiErrorHandler)

app.disable("x-powered-by");
if(toobusy_js){
	apiError.badRequest("Server is busy.")
}

app.use(function (req, res, next) {
	return res.status(404).json("Page not found")
})

///call and start the server
server()

module.exports = app;
var express = require('express');
var cors = require('cors')
var toobusy_js = require("toobusy-js");

var apiErrorHandler = require('./error/ApiErrorHandler')
var apiError = require('./error/ApiError')

require('./knexfile')
var authRouter = require('./routes/auth.route.js');

const { server } = require('./server')

var app = express();
require('./config/database')

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);

app.disable("x-powered-by");
if(toobusy_js){
	apiError.badRequest("Server is busy.")
}
app.use(apiErrorHandler)

app.use(function (req, res, next) {
	return res.status(404).json("Page not found")
})

app.use(function (err, req, res, next) {
	return res.status(500).json("Something went wrong")
});

///call and start the server
server()

module.exports = app;
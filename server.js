const http = require('http');
const express = require('express')
const NodeEnv = process.env.NODE_ENV
const seeders = require('./config/seeders.config');
require('dotenv').config()

const app = express();
const port = seeders[NodeEnv].PORT || "8080";
const httpServer = http.createServer(app);

const server = async function() {
	httpServer.listen(port, (err) => {
	  if (err) { console.log(err)}
	  else {
	    console.log(`Server is running on port ${port}`)
	  }
	});
}

module.exports = { app, server }
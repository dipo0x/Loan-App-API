const Redis = require("ioredis");
const NodeEnv = process.env.NODE_ENV
const seeders = require('./seeders.config');

const client = new Redis({
    host: seeders[NodeEnv].redis_endpoint_url,
    username: seeders[NodeEnv].redis_username,
    password: seeders[NodeEnv].redis_password,
    port: seeders[NodeEnv].redis_port,   
});

try{
    client.on("connect", function(){
      console.log("Connected to Redis Server")
    });
}
catch(err){}

module.exports = client
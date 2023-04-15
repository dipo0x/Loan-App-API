const NodeEnv = process.env.NODE_ENV;
const seeders = require('./seeders.config');

const options = {
  client: seeders[NodeEnv].database_client,
  connection: {
    host: seeders[NodeEnv].database_host,
    database: seeders[NodeEnv].database_name,
    user: seeders[NodeEnv].database_user,
    password: seeders[NodeEnv].database_password,
    port: seeders[NodeEnv].database_port,
  },
  useNullAsDefault: seeders[NodeEnv].database_nullAsDefault,
};

const knex = require('knex')(options);

knex
  .raw('SELECT 1')
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((e) => {
    console.log('MySQL not connected');
  });

module.exports = knex;

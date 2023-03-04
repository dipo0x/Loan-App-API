require('dotenv').config()

const NodeEnv = process.env.NODE_ENV
const seeders = require('./config/seeders.config');

module.exports = {
  development: {
    client: seeders[NodeEnv].database_client,
    connection: {
      host: seeders[NodeEnv].database_host,
      database: seeders[NodeEnv].database_name, 
      user: seeders[NodeEnv].database_user,
      password: seeders[NodeEnv].database_password,
      port: seeders[NodeEnv].database_port,
    },
    useNullAsDefault:  seeders[NodeEnv].database_nullAsDefault,
    migrations: {
      directory: './db/migrations'
    }
  },

  staging: {
    client: seeders[NodeEnv].database_client,
    connection: {
      host: seeders[NodeEnv].database_host,
      user: seeders[NodeEnv].database_user,
      password: seeders[NodeEnv].database_password,
      database: seeders[NodeEnv].database_name, 
      port: seeders[NodeEnv].database_port,
    },
    useNullAsDefault:  seeders[NodeEnv].database_nullAsDefault,
    migrations: {
      directory: './db/migrations'
    }
  },

  production: {
    client: seeders[NodeEnv].database_client,
    connection: {
      host: seeders[NodeEnv].database_host,
      user: seeders[NodeEnv].database_user,
      password: seeders[NodeEnv].database_password,
      database: seeders[NodeEnv].database_name, 
      port: seeders[NodeEnv].database_port,
    },
    useNullAsDefault:  seeders[NodeEnv].database_nullAsDefault,
    migrations: {
      directory: './db/migrations'
    }
  }

};
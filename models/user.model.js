const knex = require('../config/database')

const userSchema = knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.string('username').notNullable().unique();
  table.string('email').notNullable().unique();
  table.string('password').notNullable();
  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  table.timestamp('deleted_at').nullable();
});

module.exports = {
    userSchema
};
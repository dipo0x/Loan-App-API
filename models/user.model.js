const knex = require('../config/database')

const userSchema = knex.schema.createTable('users', (table) => {
  table.uuid('id').primary().notNullable().unique();
  table.string('username').notNullable().unique();
  table.string('email').notNullable().unique();
  table.string('password').notNullable();
  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('deletedAt').nullable();
});

module.exports = {
    userSchema
};
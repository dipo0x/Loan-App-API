const knex = require('../config/database.config');

const transactionSchema = knex.schema.createTable('transactions', (table) => {
  table.uuid('id').primary().notNullable().unique();
  table.string('transaction_id').notNullable().unique();
  table.string('user_id').notNullable().references('id').inTable('users');
  table.decimal('amount').notNullable();
  table.string('status').notNullable();
  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('deletedAt').nullable();
});

module.exports = {
  transactionSchema,
};

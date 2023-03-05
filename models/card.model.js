const knex = require('../config/database.config')

const cardSchema = knex.schema.createTable('card', (table) => {
  table.uuid('id').primary().notNullable().unique();
  table.string('user_id').notNullable().unique();
  table.integer('card_number').notNullable()
  table.integer('cvv').notNullable()
  table.integer('expiry_month').notNullable();
  table.integer('expiry_year').notNullable();
  table.string('currency').notNullable();
  table.integer('pin').notNullable();

  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('deletedAt').nullable();
});

module.exports = {
    cardSchema
};
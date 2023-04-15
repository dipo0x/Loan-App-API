const knex = require('../config/database.config');

const cardSchema = knex.schema.createTable('card', (table) => {
  table.uuid('id').primary().notNullable().unique();
  table.string('user_id').notNullable().unique();
  table.string('card_token').notNullable();
  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('deletedAt').nullable();
});

module.exports = {
  cardSchema,
};

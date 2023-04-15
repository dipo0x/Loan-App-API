/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('cards', function (table) {
    table.uuid('id').primary().notNullable().unique();
    table.string('user_id').notNullable().references('id').inTable('users');
    table.string('card_token').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cards');
};

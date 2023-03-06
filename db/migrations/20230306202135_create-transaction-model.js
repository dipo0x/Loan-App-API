/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table) {
        table.uuid('id').primary().notNullable().unique();
        table.string('transaction_id').notNullable().unique();
        table.string('user_id').notNullable().references('id').inTable('users');
        table.decimal('amount').notNullable();
        table.string('status').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('deletedAt').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
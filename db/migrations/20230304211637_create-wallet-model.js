/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('wallets', function(table) {
        table.uuid('id').primary().notNullable().unique();
        table.uuid('user_id').notNullable().references('id').inTable('users');
        table.string('account_number').notNullable().unique();
        table.string('account_name').notNullable().references('name').inTable('users');
        table.string('account_bank').notNullable();
        table.integer('balance').notNullable();
        table.boolean('is_active').defaultTo(false);
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
    return knex.schema.dropTable('wallets');
};

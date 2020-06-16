/* eslint-disable no-undef */
exports.up = knex => {
    return knex.schema.createTable('customer', t => {
        t.increments('id', 10).primary();
        t.string('name', 100).notNullable();
        t.string('regId', 20).notNullable();
        t.string('taxId', 20).notNullable();
        t.string('login', 20).notNullable();
        t.string('password', 20).notNullable();
        t.timestamp('created').notNullable().defaultTo(knex.fn.now());
        t.timestamp('updated').notNullable().defaultTo(knex.fn.now());
    })
}

exports.down = knex => {
    return knex.schema.dropTable('customer');
}
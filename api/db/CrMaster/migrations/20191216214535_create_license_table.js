/* eslint-disable no-undef */
exports.up = function (knex, Promise) {
    return knex.schema.createTable('license', function (table) {
        table.increments('id').primary();
        table.integer('idCustomer').unsigned();
        table.foreign('idCustomer').references('customer.id');
        table.string('licenseKey', 20).notNullable();
        table.string('licenseCode', 20).notNullable();
        table.timestamp('created').defaultTo(knex.fn.now())
        table.timestamp('updated').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('license');
}

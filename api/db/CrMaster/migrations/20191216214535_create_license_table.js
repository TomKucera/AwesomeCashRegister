/* eslint-disable no-undef */
exports.up = knex => {
    return knex.schema.createTable('license', t => {
        t.increments('id').primary();
        t.integer('idCustomer').unsigned().notNullable();
        t.foreign('idCustomer').references('customer.id');
        t.string('licenseKey', 20).notNullable();
        t.string('licenseCode', 20).notNullable();
        t.timestamp('created').notNullable().defaultTo(knex.fn.now())
        t.timestamp('updated').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = knex => {
    return knex.schema.dropTable('license');
}

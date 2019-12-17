
exports.up = function (knex, Promise) {
    return knex.schema.createTable('customer', function (table) {
        //table.increments();
        //table.increments('id').primary();
        //table.bigInteger('id');
        table.increments('id', 10).primary();
        table.string('name', 100).notNullable();
        table.string('regId', 20).notNullable();
        table.string('taxId', 20).notNullable();
        table.string('login', 20).notNullable();
        table.string('password', 20).notNullable();
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('customer');
}
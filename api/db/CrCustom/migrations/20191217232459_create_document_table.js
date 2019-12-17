exports.up = function (knex, Promise) {
    return knex.schema.createTable('document', function (table) {
        //table.increments();
        //table.increments('id').primary();
        //table.bigInteger('id');
        table.increments('id', 10).primary();
        table.string('number', 100).notNullable();
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('document');
}
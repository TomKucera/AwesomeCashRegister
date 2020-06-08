/* eslint-disable no-undef */
exports.up = function(knex) {
    return knex.schema.table('customer', function(t) {
        t.boolean('isDeleted').notNull().defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.table('products', function(t) {
        t.dropColumn('isDeleted');
    });
};
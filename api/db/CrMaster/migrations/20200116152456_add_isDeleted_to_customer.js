/* eslint-disable no-undef */
exports.up = knex => {
    return knex.schema.table('customer', t => {
        t.boolean('isDeleted').notNull().defaultTo(false);
    });
};

exports.down = knex => {
    return knex.schema.table('customer', t => {
        t.dropColumn('isDeleted');
    });
};
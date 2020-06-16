/* eslint-disable no-undef */
exports.up = knex => {
    return knex.schema.createTable('user', t => {
        t.increments('id').primary();
        t.string('email', 50).notNullable();
        t.string('firstName', 100).notNullable();
        t.string('lastName', 100).notNullable();
        t.specificType('picture', 'LONGBLOB');
        t.string('accessToken', 5000);
        t.string('refreshToken', 5000);
        t.timestamp('created').notNullable().defaultTo(knex.fn.now())
        t.timestamp('updated').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = knex => {
    return knex.schema.dropTable('user');
}
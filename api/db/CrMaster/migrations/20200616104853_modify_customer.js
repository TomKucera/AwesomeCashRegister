/* eslint-disable no-undef */
exports.up = knex => {
    return knex.schema.table('customer', t => {
        t.dropColumn('login');
        t.dropColumn('password');
        t.integer('idUser').unsigned();
        t.foreign('idUser').references('user.id');
    });
}

exports.down = knex => {
    return knex.schema.table('customer', t => {
        t.dropForeign('idUser');
        t.dropColumn('idUser');
        t.string('login', 20).notNullable();
        t.string('password', 20).notNullable();
    });
}
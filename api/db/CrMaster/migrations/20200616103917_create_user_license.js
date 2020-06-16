/* eslint-disable no-undef */
exports.up = knex => {
    return knex.schema.createTable('userLicense', t => {
        t.integer('idUser').unsigned().notNullable();
        t.foreign('idUser').references('user.id');
        t.integer('idLicense').unsigned().notNullable();
        t.foreign('idLicense').references('license.id');
        t.unique(['idUser', 'idLicense']);
    });
}

exports.down = knex => {
    return knex.schema.dropTable('userLicense');
}

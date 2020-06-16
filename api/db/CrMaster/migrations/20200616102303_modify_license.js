/* eslint-disable no-undef */
exports.up = knex => {
    return knex.schema.table('license', t => {
        t.dropColumn('licenseKey');
        t.dropColumn('licenseCode');
        t.string('name', 50).notNullable();
        t.string('description', 255).notNullable();
    })
}

exports.down = knex => {
    return knex.schema.table('license', t => {
        t.dropColumn('name');
        t.dropColumn('description');
        t.string('licenseKey', 20).notNullable();
        t.string('licenseCode', 20).notNullable();
    })
}
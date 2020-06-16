/* eslint-disable no-undef */

const user = { email: 'tom.kucera34@gmail.com', firstName: 'T', lastName: 'K' };
const customer = {name: 'Initial Company',regId: '00000000',taxId: '00000000'};
const license = { name: 'Initial License', description: 'Init license description'};

exports.seed = async knex => {

  await knex('userLicense').del();
  await knex('license').del();
  await knex('customer').del();
  await knex('user').del();

  const resultInsertUsers = await knex('user').insert([user]);
  const idUser = resultInsertUsers[0];

  const resultInsertCustomers = await knex('customer').insert([ { ...customer, idUser }]);
  const idCustomer = resultInsertCustomers[0];

  const resultInsertLicenses = await knex('license').insert([ { ...license, idCustomer }]);
  const idLicense = resultInsertLicenses[0];

  await knex('userLicense').insert([ { idUser, idLicense }]);

  console.log('seed [idUser, idCustomer, idLicense]', idUser, idCustomer, idLicense);

};

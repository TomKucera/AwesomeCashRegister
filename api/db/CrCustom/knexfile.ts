// Update with your config settings.
// tslint:disable: object-literal-sort-keys
module.exports = {

  development: {
    client: "mysql2",
    /*
    connection: {
      filename: "./dev.mysql2",
    },
    */
    connection: {
      database: "",
      user: "CashRegister",
      password: "CR01",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrationsKnex",
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "mysql2",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrationsKnex",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

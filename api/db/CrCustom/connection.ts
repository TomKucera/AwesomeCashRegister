import knex from "knex";

const params = {
    host: "127.0.0.1", // 'localhost',
    //    login: 'sa',
    //    pwd: 'tk1',
    login: "CashRegister",
    pwd: "CR01",
    // tslint:disable-next-line: object-literal-sort-keys
    // database: "crmaster",
};

const optionsKnex = {
    client: "mysql2",
    connection: {
        database: "",
        host: params.host,
        password: params.pwd,
        user: params.login,
    },
    migrations: {
        directory: process.cwd() + "/db/CrCustom/migrations",
        tableName: "version",
    },
};

const getOptionsKnex = (db: string) => {
    // ToDo: load options from knexFile
    // const config = require(process.cwd() + '/knexfile');

    const options = { ...optionsKnex };
    options.connection.database = db;
    return options;
};

const getConnection = (db: string) => {
    const options = getOptionsKnex(db);
    console.log("getConnection [db, options]: ", db, options);
    return knex(options);
};

const migrate = (dbName: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const connection = getConnection(dbName);
        console.log("migrate [dbName, connection]: ", dbName, connection);
        connection.migrate.latest().then((parsMigration) => {
            console.log("CrCustom migration finished [dbName, pars]: ", dbName, parsMigration);
            resolve();
        });
    });
};

const checkDb = (dbName: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const connection = getConnection("");
        const query = "CREATE DATABASE IF NOT EXISTS " + dbName;
        connection.raw(query).then(() => {
            connection.destroy();
            migrate(dbName).then(() => {
                resolve();
            });
        });
    });
};

const genDbName = (num: number): string => {
    let name = num.toString();
    while (name.length < 5) {
        name = "0" + name;
    }
    return "CrCustom_" + name;
};

// checkDb("crcustom_00002");

export default { checkDb, getConnection, genDbName };

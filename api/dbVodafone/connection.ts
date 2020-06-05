/*
import knex from "knex";

const params = {
    host: "127.0.0.1", // 'localhost',
    login: "sa",
    pwd: "RoTo3402",
    database: "VDF",
};

const optionsKnex = {
    client: "mysql2",
    connection: {
        database: params.database,
        host: params.host,
        password: params.pwd,
        user: params.login,
    },
};

export default knex(optionsKnex);
*/

import knex from "knex";

const params = {
    host: "127.0.0.1", // 'localhost',
//    login: 'sa',
//    pwd: 'tk1',
    login: "CashRegister",
    pwd: "CR01",
    // tslint:disable-next-line: object-literal-sort-keys
    database: "crmaster",
};

const optionsKnex = {
    client: "mysql2",
    connection: {
        database: params.database,
        host: params.host,
        password: params.pwd,
        user: params.login,
    },
};

// ToDo: load options from knexFile
// const config = require(process.cwd() + '/knexfile');

export default knex(optionsKnex);

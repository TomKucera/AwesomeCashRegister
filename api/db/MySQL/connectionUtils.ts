import mysql from "mysql";
const params = {
    host: "127.0.0.1", // 'localhost',
//    login: 'sa',
//    pwd: 'tk1',
    login: "CashRegister",
    pwd: "CR01",
    // tslint:disable-next-line: object-literal-sort-keys
    database: "CashRegister",
};

const getConnectionUri = (includeDbName: boolean = true): mysql.ConnectionConfig => {
    return {
        database: includeDbName ? params.database : undefined,
        host     : params.host,
        password : params.pwd,
        user     : params.login,
    };
};

const utils = { getConnectionUri, dbName: params.database };

export default utils;

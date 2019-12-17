import knex from "knex";
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

const optionsKnex = {
    client: "mysql2",
    connection: {
        database: params.database,
        host: params.host,
        password: params.pwd,
        user: params.login,
    },
};

/*
const knexConnection = knex(optionsKnex);

knexConnection.raw("SELECT VERSION()").then(
    (version) => {
        console.log("Version ", version);
        console.log("Version wrapped", version[0][0]);
    }).catch((err) => {
        console.log("Error: ", err);
        // throw err;
    }).finally(() => {
        knexConnection.destroy();
    });

const optionsKnexMigration = { ...optionsKnex };
optionsKnexMigration.connection.database = "CashRegisterMigration";

const knexConnectionMigration = knex(optionsKnexMigration);
const migrate = async () => knexConnectionMigration.migrate.latest();
migrate().then((parsMigration) => {
    console.log("Migration finished [pars]: ", parsMigration);
    console.log("Migration finished [options]: ", optionsKnexMigration);
    knexConnectionMigration.seed.run().then((parsSeed) => {
        console.log("Seed finished [pars]: ", parsSeed);
    });
});
*/
const getConnectionUri = (includeDbName: boolean = true): mysql.ConnectionConfig => {
    return {
        database: includeDbName ? params.database : undefined,
        host     : params.host,
        password : params.pwd,
        user     : params.login,
    };
};

class Connector {
    public static getServerConnection() {
        if (!Connector.serverConnection) {
            Connector.serverConnection = mysql.createConnection(getConnectionUri(false));
        }
        return Connector.serverConnection;
    }
    public static getDatabaseConnection() {
        if (!Connector.databaseConnection) {
            Connector.databaseConnection = mysql.createConnection(getConnectionUri(true));
        }
        return Connector.databaseConnection;
    }
    private static serverConnection: mysql.Connection;
    private static databaseConnection: mysql.Connection;
    private constructor() { }
}

export default Connector;

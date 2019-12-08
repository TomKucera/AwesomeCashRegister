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

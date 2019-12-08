import * as Collections from "typescript-collections";
import connector from "./connector";
import provider from "./provider";

const connection = connector.getDatabaseConnection();

// const queryCreateDB = "CREATE DATABASE IF NOT EXISTS " + conUtils.dbName;
// const queryUseDB = "USE " + conUtils.dbName;
const qTblCashRegiser = "CREATE TABLE IF NOT EXISTS CashRegister("
                      + "ID INT NOT NULL AUTO_INCREMENT,"
                      + "PRIMARY KEY(ID),"
                      + "Name VARCHAR(20),"
                      + "Description VARCHAR(100)"
                      + ")";

const queries = new Array<string>();
queries.push(qTblCashRegiser);

const init = new Promise((resolve, reject) => {
    const promises = queries.map((q: string) => {
        return provider.execQuery(q, connection);
    });
    Promise.all(promises).then((results: any[]) => {
        resolve(results);
    });
});

export default { init };

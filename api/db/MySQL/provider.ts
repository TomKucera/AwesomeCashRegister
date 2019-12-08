import mysql from "mysql";

function logQueryExecution(query: string, error: mysql.MysqlError | null) {
    if (error) {
        console.error("Query execution failure [" + query + "]", error);
    } else {
        console.log("Query execution success [" + query + "]");
    }
}

const execQuery = (query: string, connection: mysql.Connection): Promise<any> => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err) => {
            logQueryExecution(query, err);
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const provider = { execQuery };

export default provider;

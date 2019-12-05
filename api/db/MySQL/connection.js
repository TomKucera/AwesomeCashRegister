var mysql = require('mysql');

const conParams = {
    host: '127.0.0.1', //'localhost',
//    login: 'sa',
//    pwd: 'tk1',
    login: 'CashRegister',
    pwd: 'CR01',
    database: 'CashRegister',
};

//local mysql db connection
const connection = mysql.createConnection({
    host     : conParams.host,
    user     : conParams.login,
    password : conParams.pwd,
});

function logError(err) {
    if (err) {
        console.log('Error in DB layer occured!', err);
        //throw err;
    } 
};

const createDB = new Promise(function (resolve, reject) {
    connection.query('CREATE DATABASE IF NOT EXISTS ' + conParams.database, function(err) {
        if (err) {
            logError(err);
            reject(err);
        } else{
            resolve();
        }
    });
}); 

const useDB = new Promise(function (resolve, reject) {
    connection.query('USE ' + conParams.database, function(err) {
        if (err) {
            logError(err);
            reject(err);
        } else{
            resolve();
        }
    });
}); 

const createTable_CashRegister = new Promise(function (resolve, reject) {
    const query = 'CREATE TABLE IF NOT EXISTS CashRegister('
        + 'ID INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY(ID),'
        + 'Name VARCHAR(20),'
        + 'Description VARCHAR(100)'
        + ')';

    connection.query(query, function (err) {
        if (err) {
            logError(err);
            reject(err);
        } else {
            resolve();
        }
    });
});

createDB.then(() => {
    useDB.then(() => {
        console.log('finished: useDB')
        createTable_CashRegister.then(() => { 
            console.log('finished: createTable_CashRegister')
        });
    });
});

module.exports = connection;

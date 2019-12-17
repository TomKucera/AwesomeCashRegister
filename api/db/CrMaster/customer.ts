// import knex from "knex";
import mCustomer from "./../../data/model/customer";
import connection from "./connection";
import connectionCustom from "./../CrCustom/connection";
// tslint:disable: object-literal-sort-keys

class Customer {

    public static create(login: string, name: string, password: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            connection("customer").insert({
                name,
                regId: "",
                taxId: "",
                login,
                password,
            }).then((rows) => {
                if (rows.length === 1) {
                    const dbName = connectionCustom.genDbName(rows[0]);
                    connectionCustom.checkDb(dbName).then(() => {
                        resolve(rows[0]);
                    });
                } else {
                    reject(rows);
                }
            });
        });
    }

    public static getById(id: number): Promise<mCustomer> {
        return new Promise<mCustomer>((resolve, reject) => {
            connection("customer").where("id", id).then((rows) => {
                if (rows.length === 1) {
                    //resolve(rows[0]);
                    const dbName = connectionCustom.genDbName(id);
                    connectionCustom.checkDb(dbName).then(() => {
                        resolve(rows[0]);
                    });
                } else {
                    reject(rows);
                }
            });
        });
    }

    public static getList(): Promise<mCustomer[]> {
        return new Promise<mCustomer[]>((resolve, reject) => {
            connection("customer").then((rows) => {
                resolve(rows);
            });
        });
    }

}

export default Customer;

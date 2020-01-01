// import knex from "knex";
import mLicense from "./../../data/model/license";
import connection from "./connection";
// tslint:disable: object-literal-sort-keys

class License {

    public static create(license: mLicense): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            connection("license").insert({
                idCustomer: license.idCustomer,
                licenseCode: license.licenseCode,
                licenseKey: license.licenseKey,
            }).then((rows) => {
                console.log("Create license rows ", rows);
                if (rows.length === 1) {
                    resolve(rows[0]);
                } else {
                    reject(rows);
                }
            });
        });
    }

    public static getById(id: number): Promise<mLicense> {
        return new Promise<mLicense>((resolve, reject) => {
            connection("license").where("id", id).then((rows) => {
                if (rows.length === 1) {
                    resolve(rows[0]);
                } else {
                    reject(rows);
                }
            });
        });
    }

    public static getList(): Promise<mLicense[]> {
        return new Promise<mLicense[]>((resolve, reject) => {
            connection("license").then((rows) => {
                resolve(rows);
            });
        });
    }

    public static getByCustomerId(customerId: number): Promise<mLicense[]> {
        return new Promise<mLicense[]>((resolve, reject) => {
            connection("license").where("idCustomer", customerId).then((rows) => {
                console.log("getByCustomerId customerId, rows ", customerId, rows);
                resolve(rows);
            });
        });
    }

}

export default License;

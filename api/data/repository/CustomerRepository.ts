import dataSet from "./../../db/CrMaster/customer";
import { Customer } from "./../model/types";
import ICustomerRepository from "./interface/ICustomerRepository";

const CustomerRepository: ICustomerRepository = {

    GetById: (id: number): Promise<Customer> => {
        return new Promise<Customer>((resolve, reject) => {
            dataSet.getById(id).then((row) => {
                console.log("GetById row", row);
                resolve(row);
            });
        });
    },

    Create: (data: Customer): Promise<Customer> => {
        return new Promise<Customer>((resolve, reject) => {
            dataSet.create(data.login, data.name, data.password ).then((row) => {
                console.log("created row", row);
                resolve(row);
            });
        });
    },

    Update: (data: Customer): Promise<Customer> => {
        return new Promise<Customer>((resolve, reject) => {
            dataSet.edit(data).then((row) => {
                resolve(row);
            });
        });
    },

    Delete: (id: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dataSet.deleteById(id).then(() => {
                resolve();
            });
        });
    },

    GetList: (): Promise<Customer[]> => {
        return new Promise<Customer[]>((resolve, reject) => {
            dataSet.getList().then((rows) => {
                resolve(rows);
            });
        });
    },
};

export default CustomerRepository;

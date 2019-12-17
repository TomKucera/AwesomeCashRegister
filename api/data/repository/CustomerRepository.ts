import Customer from "./../model/customer";
import ICustomerRepository from "./interface/ICustomerRepository";
import dataSet from "./../../db/CrMaster/customer";

const CustomerRepository: ICustomerRepository = {

    GetById: (id: number): Promise<Customer> => {
        return new Promise<Customer>((resolve, reject) => {
            dataSet.getById(id).then((row) => {
                resolve(row);
            });
        });
    },

    Create: (data: Customer): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dataSet.create(data.login, data.name, data.password ).then((v) => {
                resolve();
            });
        });
    },

    Update: (data: Customer): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    },

    Delete: (id: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            resolve();
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

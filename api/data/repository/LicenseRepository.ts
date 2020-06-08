import dataSet from "./../../db/CrMaster/license";
import { License } from "./../model/types";
import ILicenseRepository from "./interface/ILicenseRepository";

const LicenseRepository: ILicenseRepository = {

    GetById: (id: number): Promise<License> => {
        return new Promise<License>((resolve, reject) => {
            dataSet.getById(id).then((row) => {
                resolve(row as License);
            });
        });
    },

    Create: (data: License): Promise<License> => {
        return new Promise<License>((resolve, reject) => {
            console.log("Create license ", data);
            dataSet.create(data).then((row) => {
                resolve(row  as License);
            });
        });
    },

    Update: (data: License): Promise<License> => {
        return new Promise<License>((resolve, reject) => {
            resolve();
        });
    },

    Delete: (id: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    },

    GetList: (): Promise<License[]> => {
        return new Promise<License[]>((resolve, reject) => {
            dataSet.getList().then((rows) => {
                resolve(rows as License[]);
            });
        });
    },

    GetByCustomerId: (customerId: number): Promise<License[]> => {
        return new Promise<License[]>((resolve, reject) => {
            dataSet.getByCustomerId(customerId).then((rows) => {
                resolve(rows as License[]);
            });
        });
    },
};

export default LicenseRepository;

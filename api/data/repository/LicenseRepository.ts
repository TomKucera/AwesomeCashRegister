import License from "./../model/license";
import ILicenseRepository from "./interface/ILicenseRepository";
import dataSet from "./../../db/CrMaster/license";

const LicenseRepository: ILicenseRepository = {

    GetById: (id: number): Promise<License> => {
        return new Promise<License>((resolve, reject) => {
            dataSet.getById(id).then((row) => {
                resolve(row);
            });
        });
    },

    Create: (data: License): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dataSet.create(data).then((v) => {
                resolve();
            });
        });
    },

    Update: (data: License): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
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
                resolve(rows);
            });
        });
    },
};

export default LicenseRepository;

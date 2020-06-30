import connection from "../connection";
import { License, User } from "../../../data/model/types";

class LicenseRepository {
    
    public create(license: License): Promise<License | undefined> {
        return new Promise<License>((resolve) => {
            connection("license").insert({
                idCustomer: license.idCustomer,
                name: license.name,
                description: license.description,
            }).then( (ids: Array<number>) => {
                if (ids.length === 1) {
                    this.getById(ids[0]).then(l=> resolve(l));
                }
                else{
                    resolve(undefined);
                }
            });
        });
    }

    public getById(id: number): Promise<License | undefined> {
        return new Promise<License|undefined>((resolve) => {
            connection("license").where("id", id).then((rows: Array<License>) => {
                resolve((rows.length === 1)?rows[0] : undefined);
            });
        });
    }

    public get(idUser?: number): Promise<Array<License> | undefined> {

        console.log("LicenseRepository.get idUser", idUser);
        return new Promise<Array<License>|undefined>((resolve) => {
            if (idUser){
                connection.select('*').from('license')
                .whereIn('id', function() {
                  this.select('idLicense').from('userLicense').where("idUser", idUser);
                }).then((rows: Array<License>) => {
                    resolve(rows);
                });
            }
            else {
                connection("license").then((rows: Array<License>) => {
                    resolve(rows);
                });
            }
        });
    }

    public getLicenseUsers(id: number): Promise<Array<User> | undefined> {
        return new Promise<Array<User>|undefined>((resolve) => {
            connection.select('*').from('user')
            .whereIn('id', function() {
              this.select('idUser').from('userLicense').where("idLicense", id);
            }).then((rows: Array<User>) => {
                resolve(rows);
            });
        });
    }

    public update(license: License): Promise<License | undefined> {
        return new Promise<License|undefined>((resolve) => {
            connection("license").where("id", license.id).update({
                name: license.name,
                description: license.description,
                updated: connection.fn.now(),
            }).then(() => {
                this.getById(license.id).then(l => {
                    resolve(l);
                });
            });
        });
    }

    public addUserToLicense(idLicense: number, idUser:number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            connection("userLicense").insert({
                idUser, idLicense
            }).then((ids: Array<number>) => {
                console.log("LicenseRepository.addUserToLicense ids", ids);
                resolve((ids.length === 1));
            });
        });
    }

    public removeUserFromLicense(idLicense: number, idUser:number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            connection("userLicense")
            .where('idUser', idUser)
            .andWhere('idLicense', idLicense)
            .del().then((count: number)=>{
                console.log("LicenseRepository.removeUserFromLicense count", count);
                resolve(count === 1);
            });
        });
    }
}

export default LicenseRepository;

// tslint:disable: ordered-imports
import connection from "./connection";
import { User as mUser } from "../../data/model/types";
import { IGoogleUserInfo } from "../../modules/auth/types";

class User {

    public static updateWithGoogleUserInfo(googleUserInfo: IGoogleUserInfo) : Promise<mUser> {
        return new Promise<mUser>((resolve, reject) => {
            console.log("user updateWithGoogleUserInfo [googleUserInfo] ", googleUserInfo);
            connection("user").where("email", googleUserInfo.email).update({
                firstName: googleUserInfo.firstName || '',
                lastName: googleUserInfo.lastName || '',
                picture: googleUserInfo.picture,
                updated: connection.fn.now(),
            }).then((count) => {
                console.log("user [updateWithGoogleUserInfo, rows] ", googleUserInfo, count);
                if (count === 1) {
                    this.getByEmail(googleUserInfo.email).then((row) => {
                        resolve(row);
                    });
                } else {
                    reject(count);
                }
            });
        });
    }

    public static getByEmail(email: string): Promise<mUser> {
        return new Promise<mUser>((resolve, reject) => {
            connection("user").where("email", email).then((rows) => {
                if (rows.length === 1) {
                    const user = rows[0]; 
                    delete user.picture;
                    resolve(user);
                } else {
                    reject(rows);
                }
            });
        });
    }

   
}

export default User;
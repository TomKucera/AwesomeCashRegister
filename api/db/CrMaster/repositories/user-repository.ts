import connection from "../connection";
import { User } from "../../../data/model/types";

class UserRepository {
    public getById(id: number): Promise<User | undefined> {
        return new Promise<User>((resolve) => {
            connection("user").where("id", id).then((rows: Array<User>) => {
                resolve((rows.length === 1)?rows[0] : undefined);
            });
        });
    }

    public getByEmail(email: string, createIfNotFound = false): Promise<User | undefined> {
        return new Promise<User>((resolve) => {
            connection("user").where("email", email).then(async (rows: Array<User>) => {
                if (rows.length === 1) {
                    resolve(rows[0]);
                }
                else if (rows.length === 0) {
                    if (createIfNotFound) {
                        const user = await this.create(email);
                        resolve(user);
                    }
                }
                resolve(undefined);
            });
        });
    }

    public create(email: string): Promise<User | undefined> {
        return new Promise<User>((resolve) => {
            connection("user").insert({
                email, firstName: '', lastName: ''
            }).then((ids: Array<number>) => {
                if (ids.length === 1) {
                    this.getById(ids[0]).then(l => resolve(l));
                }
                else {
                    resolve(undefined);
                }
            });
        });
    }
}

export default UserRepository;

import Auditable from "./auditable";
/*
export class User extends Auditable {
    public email!: string;
}
*/

export class User extends Auditable {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public accessToken?: string;
    public refreshToken?: string;
    public picture?: string;
}
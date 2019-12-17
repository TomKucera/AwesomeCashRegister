import Auditable from "./auditable";
export default class User extends Auditable {
    public email!: string;
}

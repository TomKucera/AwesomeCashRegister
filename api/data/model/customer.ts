import Auditable from "./auditable";
export default class Customer extends Auditable {
    public name!: string;
    public login!: string;
    public password!: string;
}

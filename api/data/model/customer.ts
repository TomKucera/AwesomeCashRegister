import Auditable from "./auditable";
export class Customer extends Auditable {
    public name!: string;
    public login!: string;
    public password!: string;
}

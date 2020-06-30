import Auditable from "./auditable";
export class Customer extends Auditable {
    public name!: string;
    public regId!: string;
    public taxId!: string;
    public idUser!: number;
    public isDeleted!: boolean;
}

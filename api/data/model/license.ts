import Auditable from "./auditable";
export class License extends Auditable {
    public idCustomer!: number;
    public name!: string;
    public description?: string;
}

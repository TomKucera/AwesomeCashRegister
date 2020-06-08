import Auditable from "./auditable";
export class License extends Auditable {
    public idCustomer!: number;
    public licenseKey!: string;
    public licenseCode!: string;
}

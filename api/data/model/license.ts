import Auditable from "./auditable";
export default class License extends Auditable {
    public idCustomer!: number;
    public licenseKey!: string;
    public licenseCode!: string;
}

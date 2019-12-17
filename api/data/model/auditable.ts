import Base from "./base";
export default abstract class Auditable extends Base {
    public created!: Date;
    public updated!: Date;
}

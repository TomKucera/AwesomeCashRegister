import IBase from "./IBase";
export default interface IAuditable extends IBase {
    created: Date;
    updated: Date;
}

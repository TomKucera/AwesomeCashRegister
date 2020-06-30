export interface IStringMap<TVal> { [key: string]: TVal; };

export enum layoutType {
    admin,
    license,
}

export * from "./common/SelectItem";
export * from "./common/notification";

export * from "./Customer";
export * from "./IUser";

export * from "./IVdfLocation";
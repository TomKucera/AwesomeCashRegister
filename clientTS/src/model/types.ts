import i_customer from "./ICustomer";
import i_SelectItem from "./common/ISelectItem";

export type ICustomer = i_customer;
export type ISelectItem = i_SelectItem;

export enum layoutType {
    admin,
    license,
}
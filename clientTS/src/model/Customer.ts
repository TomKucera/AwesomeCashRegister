import IAuditable from "./IAuditable";
export interface ICustomer extends IAuditable {
    name: string,
    login: string,
    password: string
}
import { ICustomer } from './../../../model/types';

export const CustomerActions = {
    START_LOAD_CUSTOMERS: 'START_LOAD_CUSTOMERS',
    FINISH_LOAD_CUSTOMERS: 'FINISH_LOAD_CUSTOMERS',

    START_LOAD_CUSTOMER: 'START_LOAD_CUSTOMER',
    FINISH_LOAD_CUSTOMER: 'FINISH_LOAD_CUSTOMER',

    START_EDIT: 'START_EDIT_CUSTOMER',
    FINISH_EDIT: 'FINISH_EDIT_CUSTOMER',
}

export interface IStartLoadCustomersAction {
    type: typeof CustomerActions.START_LOAD_CUSTOMERS,
}

export interface IFinishLoadCustomersAction {
    type: typeof CustomerActions.FINISH_LOAD_CUSTOMERS,
    customers?: Array<ICustomer>,
    serverError?: any,
}

export interface IFinishLoadCustomerAction {
    type: typeof CustomerActions.FINISH_LOAD_CUSTOMER,
    customer?: ICustomer,
    serverError?: any,
}

export interface IStartEditCustomerAction {
    type: typeof CustomerActions.START_EDIT,
}

export interface IFinishEditCustomerAction {
    type: typeof CustomerActions.START_EDIT,
    customer: ICustomer,
    serverError?: any,
}

export type ICustomerActionTypes =
IStartLoadCustomersAction |
IFinishLoadCustomersAction |
IStartEditCustomerAction |
IFinishEditCustomerAction
;

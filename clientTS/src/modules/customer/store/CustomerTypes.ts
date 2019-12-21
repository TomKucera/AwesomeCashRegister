import { ICustomer } from './../../../model/types';

export const CustomerActions = {
    START_LOAD: 'START_LOAD_CUSTOMERS',
    FINISH_LOAD: 'FINISH_LOAD_CUSTOMERS',
}

export interface IStartLoadCustomersAction {
    type: typeof CustomerActions.START_LOAD,
}

export interface IFinishLoadCustomersAction {
    type: typeof CustomerActions.FINISH_LOAD,
    customers?: Array<ICustomer>,
    serverError?: any,
}

export type ICustomerActionTypes = IStartLoadCustomersAction | IFinishLoadCustomersAction;

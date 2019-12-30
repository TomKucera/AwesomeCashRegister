import {
    CustomerActions,
    IFinishLoadCustomersAction,
    IFinishLoadCustomerAction,
    IFinishEditCustomerAction,
    ICustomerActionTypes
} from './CustomerTypes';

import { ICustomer } from './../../../model/types';

export interface IStoreCustomer {
    loading: boolean,
    editing: boolean,
    customers: Array<ICustomer>,
    customersData: { [id: number] : ICustomer; },
    serverError?: any,
}

export const INITIAL_STATE_CUSTOMER: IStoreCustomer = {
    loading: false,
    editing: false,
    customers: [],
    customersData: {},
}

function updateCustomer(source: { [id: number] : ICustomer; }, customer: ICustomer): { [id: number] : ICustomer; } {
    const result = { ...source };
    result[customer.id] = customer;
    return result;
};

export function customerReducer(prevState: IStoreCustomer = INITIAL_STATE_CUSTOMER, action: ICustomerActionTypes) {
    switch (action.type) {
        case CustomerActions.START_LOAD_CUSTOMERS:
            return {
                ...prevState,
                loading: true,
            };

        case CustomerActions.FINISH_LOAD_CUSTOMERS:
            return {
                ...prevState,
                loading: false,
                customers: (action as IFinishLoadCustomersAction).customers,
                serverError: (action as IFinishLoadCustomersAction).serverError,
            };

        case CustomerActions.START_LOAD_CUSTOMER:
            return {
                ...prevState,
                loading: true,
            };

        case CustomerActions.FINISH_LOAD_CUSTOMER:
            const customer = (action as IFinishLoadCustomerAction).customer;
            const customersData = {...prevState.customersData};
            if (customer){
                customersData[customer.id] = customer;
            }
            return {
                ...prevState,
                loading: false,
                customersData: customersData,
                serverError: (action as IFinishLoadCustomerAction).serverError,
            };

        case CustomerActions.START_EDIT:
            return {
                ...prevState,
                editing: true,
            };

        case CustomerActions.FINISH_EDIT:
            return {
                ...prevState,
                editing: false,
                customersData: updateCustomer(prevState.customersData, (action as IFinishEditCustomerAction).customer),
                serverError: (action as IFinishEditCustomerAction).serverError,
            };
        default:
            return prevState;
    }
}
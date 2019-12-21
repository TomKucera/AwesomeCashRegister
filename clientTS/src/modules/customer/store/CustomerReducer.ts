import {
    CustomerActions,
    IFinishLoadCustomersAction,
    ICustomerActionTypes
} from './CustomerTypes';

import { ICustomer } from './../../../model/types';

export interface IStoreCustomer {
    loading: boolean,
    customers: Array<ICustomer>,
    serverError?: any,
}

export const INITIAL_STATE_CUSTOMER: IStoreCustomer = {
    loading: false,
    customers: [],
}

export function customerReducer(prevState: IStoreCustomer = INITIAL_STATE_CUSTOMER, action: ICustomerActionTypes) {
    switch (action.type) {
        case CustomerActions.START_LOAD:
            return {
                ...prevState,
                loading: true,
            };

        case CustomerActions.FINISH_LOAD:
            return {
                ...prevState,
                loading: false,
                customers: (action as IFinishLoadCustomersAction).customers,
                serverError: (action as IFinishLoadCustomersAction).serverError,
            };

        default:
            return prevState;
    }
}
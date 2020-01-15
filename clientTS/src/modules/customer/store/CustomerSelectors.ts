import {
    IStoreCustomer,
} from './CustomerReducer';

import { ICustomer } from '../../../model/types';
/*
export const emptyCustomer: ICustomer = {
    id: 0, name: '', created: new Date(0), updated: new Date(0)
};
*/
export function getCustomers(store: IStoreCustomer): Array<ICustomer> | undefined {
    return store.customers;
};

export function getCustomerById(store: IStoreCustomer, customerId: number): ICustomer | undefined {
    console.log('getCustomerById store, id', store, customerId );
    return store.customersData[customerId];
};

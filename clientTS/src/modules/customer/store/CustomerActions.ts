import {
    CustomerActions,
    ICustomerActionTypes
} from './CustomerTypes';
import { ThunkDispatch } from 'redux-thunk';

import { ICustomer } from './../../../model/types';
//import { createDispatchHook } from 'react-redux';

export function getActionStartLoad(): ICustomerActionTypes {
    return {
        type: CustomerActions.START_LOAD,
    };
}

export function getActionFinishLoad(customers?: ICustomer[], serverError?: any): ICustomerActionTypes {
    return {
        type: CustomerActions.FINISH_LOAD,
        customers,
        serverError 
    };
}

export function loadCustomers() {
    return async (dispatch: ThunkDispatch<{}, {}, ICustomerActionTypes>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            dispatch(getActionStartLoad())
            try {

                console.log('loadCustomers');
                const url = 'http://localhost:9000/customer/';
                const response = await fetch(url, {
                    method: 'GET',
                });
                const customers = await response.json();
                dispatch(getActionFinishLoad(customers, undefined));
            } catch (error) {
                dispatch(getActionFinishLoad(undefined, error));
            }
        });
    };
};

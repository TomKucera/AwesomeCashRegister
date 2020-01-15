import {
    CustomerActions,
    ICustomerActionTypes
} from './CustomerTypes';
import { ThunkDispatch } from 'redux-thunk';

import { ICustomer } from './../../../model/types';
//import { createDispatchHook } from 'react-redux';

export function getActionStartLoadCustomers(): ICustomerActionTypes {
    return {
        type: CustomerActions.START_LOAD_CUSTOMERS,
    };
}

export function getActionFinishLoadCustomers(customers?: ICustomer[], serverError?: any): ICustomerActionTypes {
    return {
        type: CustomerActions.FINISH_LOAD_CUSTOMERS,
        customers,
        serverError 
    };
}

export function getActionStartLoadCustomer(): ICustomerActionTypes {
    return {
        type: CustomerActions.START_LOAD_CUSTOMER,
    };
}

export function getActionFinishLoadCustomer(customer?: ICustomer, serverError?: any): ICustomerActionTypes {
    return {
        type: CustomerActions.FINISH_LOAD_CUSTOMER,
        customer,
        serverError 
    };
}

export function getActionStartEdit(): ICustomerActionTypes {
    return {
        type: CustomerActions.START_EDIT,
    };
}

export function getActionFinishEdit(customer?: ICustomer, serverError?: any): ICustomerActionTypes {
    return {
        type: CustomerActions.FINISH_EDIT,
        customer,
        serverError 
    };
}

export function loadCustomers() {
    return async (dispatch: ThunkDispatch<{}, {}, ICustomerActionTypes>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            dispatch(getActionStartLoadCustomers())
            try {
                console.log('loadCustomers');
                const url = 'http://localhost:9000/customer/';
                const response = await fetch(url, {
                    method: 'GET',
                });
                const customers = await response.json();
                dispatch(getActionFinishLoadCustomers(customers, undefined));
            } catch (error) {
                dispatch(getActionFinishLoadCustomers(undefined, error));
            }
        });
    };
};

export function loadCustomer(customerId: number) {
    return async (dispatch: ThunkDispatch<{}, {}, ICustomerActionTypes>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            dispatch(getActionStartLoadCustomer())
            try {
                console.log('loadCustomer');
                const url = 'http://localhost:9000/customer/' + customerId.toString();
                const response = await fetch(url, { method: 'GET' });
                const customer = await response.json();
                dispatch(getActionFinishLoadCustomer(customer, undefined));
            } catch (error) {
                dispatch(getActionFinishLoadCustomer(undefined, error));
            }
        });
    };
};


/*
export function loadCustomer(customerId: number) {
    return async (dispatch: ThunkDispatch<{}, {}, ICustomerActionTypes>): Promise<ICustomerActionTypes> => {
        return new Promise<ICustomerActionTypes>(async (resolve, reject) => {
            await dispatch(getActionStartLoadCustomer())
            try {
                console.log('loadCustomer');
                const url = 'http://localhost:9000/customer/' + customerId.toString();
                const response = await fetch(url, { method: 'GET' });
                const customer = await response.json();
                const action = getActionFinishLoadCustomer(customer, undefined);
                resolve(await dispatch(action));
            } catch (error) {
                const action = await dispatch(getActionFinishLoadCustomer(undefined, error));
                reject(action);
            }
        });
    };
};

export function editCustomer(customer: ICustomer) {
    return async (dispatch: ThunkDispatch<{}, {}, ICustomerActionTypes>): Promise<ICustomer> => {
        return new Promise<ICustomer>(async (resolve) => {
            dispatch(getActionStartEdit())
            try {
                console.log('update customer ', customer);
                const url = 'http://localhost:9000/customer/' + customer.id.toString();
                const response = await fetch(url, { method: 'PUT' });
                const respCustomer: ICustomer = await response.json();
                dispatch(getActionFinishEdit(respCustomer, undefined));
            } catch (error) {
                dispatch(getActionFinishEdit(undefined, error));
            }
        });
    };
};
*/

/*
return fetch('http://api.symfony-3.dev/app_dev.php/posts/' + id, {
    method: 'PUT',
    mode: 'CORS',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
*/

export function saveCustomer(customer: ICustomer) {
    return async (dispatch: ThunkDispatch<{}, {}, ICustomerActionTypes>): Promise<boolean> => {
        dispatch(getActionStartEdit())
        try {
            console.log('update customer ', customer);
            const url = 'http://localhost:9000/customer/' + customer.id.toString();
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await fetch(url, { method: 'PUT', body: JSON.stringify(customer), headers });
            const respCustomer: ICustomer = await response.json();
            dispatch(getActionFinishEdit(respCustomer, undefined));
            return true;
        } catch (error) {
            dispatch(getActionFinishEdit(undefined, error));
            return false;
        }
    };
};

export function createCustomer(customer: ICustomer) {
    return async (dispatch: ThunkDispatch<{}, {}, ICustomerActionTypes>): Promise<boolean> => {
        dispatch(getActionStartEdit())
        try {
            console.log('create customer ', customer);
            const url = 'http://localhost:9000/customer/';
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await fetch(url, { method: 'POST', body: JSON.stringify(customer), headers });
            const respCustomer: ICustomer = await response.json();
            dispatch(getActionFinishEdit(respCustomer, undefined));
            return true;
        } catch (error) {
            dispatch(getActionFinishEdit(undefined, error));
            return false;
        }
    };
};
/*


export function saveContact(contact: Contact, options?: SaveContactOptions) {
	return async (dispatch: Dispatch<AddressBookAction>) => {
		dispatch({
			type: 'START_SAVE_CONTACT',
			contact,
		})
		try {
			if (contact.id) {
				const confirmedContact: Contact = await contactApi.put({ contactId: contact.id }, contact)
				return dispatch({
					type: 'FINISH_SAVE_CONTACT',
					contact: confirmedContact,
				})
			} else {
				return dispatch(createContact(contact, options))
			}
		} catch (serverError) {
			return dispatch({
				type: 'FINISH_SAVE_CONTACT',
				serverError,
			})
		}
	}
}
*/

import { combineReducers, Reducer } from 'redux';

import { IStoreUser, INITIAL_STATE_USER, userReducer } from './../modules/user/store/UserReducer';
import { IStoreCustomer,  INITIAL_STATE_CUSTOMER, customerReducer } from './../modules/customer/store/CustomerReducer'  //eslint-disable-line

export interface IAppState {
    user: IStoreUser,
    customer: IStoreCustomer,
}

export const INITIAL_STATE: IAppState = {
    user: INITIAL_STATE_USER,
	customer: INITIAL_STATE_CUSTOMER,
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
    user: userReducer,
    customer: customerReducer,
} as any);
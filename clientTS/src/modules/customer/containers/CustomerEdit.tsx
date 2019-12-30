import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IAppState } from '../../../store/RootReducer';
import { ICustomer } from '../../../model/types';
import { IComponentProps, CustomerEdit as component } from '../components/CustomerEdit';

import { getCustomerById, emptyCustomer }from './../store/CustomerSelectors';

import { loadCustomer, saveCustomer } from '../store/CustomerActions';
/*
import { ICustomerActionTypes } from '../store/CustomerTypes';
import { resolve } from 'q';

import {IFinishEditCustomerAction} from './../store/CustomerTypes';
*/
interface IOwnProps {
    
}

interface IStateProps {
    loading: boolean,
	editing: boolean,
	customer: ICustomer,
}

interface IDispatchProps {
    loadCustomer: () => void,
    saveCustomer: (customer: ICustomer) => Promise<boolean>,
}

const mapStateToProps: MapStateToProps<
    IStateProps,
    IOwnProps,
    IAppState
> = (state: IAppState, ownProps: IOwnProps): IStateProps => {
    const params = (ownProps as any).match.params;
    return {
        customer: getCustomerById(state.customer, params.customerId) || emptyCustomer,
        loading: state.customer.loading,
        editing: state.customer.editing,
        ...ownProps
    }
};

const mapDispatchToProps: MapDispatchToProps<
    IDispatchProps,
    IOwnProps
> = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: IOwnProps) => ({
    loadCustomer: () => {
        const params = (ownProps as any).match.params;
        dispatch(loadCustomer(params.customerId));
    },
    saveCustomer: (customer: ICustomer): Promise<boolean> => {
        return dispatch(saveCustomer(customer));
    },
});

export const CustomerEdit = connect<
    IStateProps,
    IDispatchProps,
    IOwnProps,
    IAppState
>(mapStateToProps, mapDispatchToProps)(component);

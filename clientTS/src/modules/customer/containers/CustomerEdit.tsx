import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IAppState } from '../../../store/RootReducer';
import { ICustomer } from '../../../model/types';
//import {CustomerEdit as component} from './../components/CustomerEdit';
import CustomerEditNext from './../components/CustomerEditNext';

import { getCustomerById }from './../store/CustomerSelectors';

import { loadCustomer, saveCustomer, createCustomer } from '../store/CustomerActions';
import {emptyCustomer} from 'src/model/empty';

let component = CustomerEditNext;


/*
import { ICustomerActionTypes } from '../store/CustomerTypes';
import { resolve } from 'q';

import {IFinishEditCustomerAction} from './../store/CustomerTypes';
*/
interface IOwnProps {
    customerId?: number
}

interface IStateProps {
    loading: boolean,
    editing: boolean,
    customerId?: number,
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

    
    return {
        customerId: ownProps.customerId,
        customer: ownProps.customerId ? getCustomerById(state.customer, ownProps.customerId) || emptyCustomer : emptyCustomer,
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
        console.log("mapDispatchToProps params.customerId", ownProps.customerId);
        if (ownProps.customerId){
            dispatch(loadCustomer(ownProps.customerId));
        }
    },
    saveCustomer: (customer: ICustomer): Promise<boolean> => {
        if (ownProps.customerId){
            return dispatch(saveCustomer(customer));
        }
        else{
            return dispatch(createCustomer(customer));
        }        
    },
});

export const CustomerEdit = connect<
    IStateProps,
    IDispatchProps,
    IOwnProps,
    IAppState
>(mapStateToProps, mapDispatchToProps)(component);

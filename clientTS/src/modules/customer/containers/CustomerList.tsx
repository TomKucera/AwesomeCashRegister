import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IAppState } from './../../../store/RootReducer';
import { ICustomer } from './../../../model/types';
import { CustomerList as component } from './../components/CustomerList';
import { getCustomers }from './../store/CustomerSelectors';

import { loadCustomers } from './../store/CustomerActions';

interface IOwnProps {

}

interface IStateProps {
    loading: boolean,
	customers: Array<ICustomer> | undefined,
}

interface IDispatchProps {
    loadData: () => void,
}

const mapStateToProps: MapStateToProps<
    IStateProps,
    IOwnProps,
    IAppState
> = (state: IAppState, ownProps: IOwnProps): IStateProps => ({
    customers: getCustomers(state.customer),
    loading: state.customer.loading,
    ...ownProps
});

const mapDispatchToProps: MapDispatchToProps<
    IDispatchProps,
    IOwnProps
> = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: IOwnProps) => ({
    loadData: async () => {
        dispatch(loadCustomers());
    }
});

export const CustomerList = connect<
    IStateProps,
    IDispatchProps,
    IOwnProps,
    IAppState
>(mapStateToProps, mapDispatchToProps)(component);

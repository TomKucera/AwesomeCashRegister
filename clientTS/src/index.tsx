import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, RouteComponentProps, Route, Switch } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { UserList } from './UserList';
import { CustomerList } from './modules/customer/containers/CustomerList';
import { CustomerEdit } from './modules/customer/containers/CustomerEdit';
import layout  from './layouts/layotAdmin';

import * as serviceWorker from './serviceWorker';

const customerList = (props: RouteComponentProps<any, any, any>) => layout(<CustomerList {...props} />);
const customerEdit = (props: RouteComponentProps<any, any, any>) => layout(<CustomerEdit customerId ={ props.match.params.customerId } />);
const customerCreate = (props: RouteComponentProps<any, any, any>) => layout(<CustomerEdit customerId ={ undefined } />);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={(props) => <App userType='admin' username='h4x0r' {...props} />}
                />
            </Switch>
            <Switch>
                <Route
                    exact
                    path='/userlist'
                    render={(props) => <UserList {...props} />}
                />
            </Switch>
            <Switch>
                <Route
                    exact
                    path='/customers'
                    //render={(props) => layout(<CustomerList {...props} />)}
                    render={customerList}
                />
            </Switch>
            <Switch>
                <Route
                    exact
                    path='/customers/edit/:customerId'
                    render={customerEdit}
                />
            </Switch>
            <Switch>
                <Route
                    exact
                    path='/customers/create'
                    render={customerCreate}
                />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
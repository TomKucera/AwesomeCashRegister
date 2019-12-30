import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
//import AppUnconnected from './App';
import { App } from './App';
import { UserList } from './UserList';
import { CustomerList } from './modules/customer/containers/CustomerList';
import { CustomerEdit } from './modules/customer/containers/CustomerEdit';

import * as serviceWorker from './serviceWorker';

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
                    render={(props) => <CustomerList {...props} />}
                />
            </Switch>
            <Switch>
                <Route
                    exact
                    path='/customers/:customerId'
                    render={(props) => <CustomerEdit {...props} />}
                />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
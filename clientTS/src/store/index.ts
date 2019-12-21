import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { INITIAL_STATE, rootReducer } from './RootReducer';

export const store = createStore(rootReducer, INITIAL_STATE, compose(
    applyMiddleware(thunk),
    ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) || compose
));

store.subscribe(() => {
    console.log(store.getState());
});

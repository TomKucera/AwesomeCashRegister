
import {
    UserActions,
    IFinishAuthenticate,
    IUserActionTypes
} from './UserTypes';

import { IAction } from './../../shared/store/SharedTypes';
import LocalStorage from './../../shared/store/LocalStorage';

import { IUser } from '../../../model/types';

export interface IStoreUser {
    loading: boolean,
    user: IUser | undefined,
}

export const INITIAL_STATE_USER: IStoreUser = {
    loading: false,
    user: undefined,
}

function startAuthenticate(prevState: IStoreUser, action: IAction): IStoreUser {
    return {
        ...prevState,
        loading: true,
    };
};

function finishAuthenticate(prevState: IStoreUser, action: IFinishAuthenticate): IStoreUser {
    const user = action.user;
    
    if (user) {
        LocalStorage.set(LocalStorage.getTokenKey('access'), user.accessToken);
        LocalStorage.set(LocalStorage.getTokenKey('refresh'), user.refreshToken);
    }

    return {
        ...prevState,
        loading: false,
        user: action.user,
    };
};

/*
function updateToken(prevState: IStoreUser, action: IUpdateToken): IStoreUser {
    const user = prevState.user || {};
    return {
        ...prevState,
        user: { ...user, athenticationToken: action.token, account: action.account, lastActivityTime: action.lastActivityTime },
    };
};

function startLoadAuthenticatedAccount(prevState: IStoreUser, action: IAction): IStoreUser {
    return {
        ...prevState,
        loading: true,
    };
};

function finishLoadAuthenticatedAccount(prevState: IStoreUser, action: IFinishLoadAuthenticatedAccount): IStoreUser {
    return {
        ...prevState,
        loading: false,
        user: { ...prevState.user, account: action.account },
    };
};

function clearUser(prevState: IStoreUser): IStoreUser {
    return {
        ...prevState,
        user: undefined,
    };
};

function apiActivity(prevState: IStoreUser, action: IApiActivity): IStoreUser {
    const user = prevState.user || {};
    return {
        ...prevState,
        user: { ...user, lastActivityTime: action.lastActivityTime },
    };
};
*/

export function userReducer(prevState: IStoreUser = INITIAL_STATE_USER, action: IUserActionTypes) {

    console.log("userReducer [action]: ", action);
    console.log("userReducer [prevState]: ", prevState);

    var nextState: IStoreUser = prevState;

    switch (action.type) {
        case UserActions.START_AUTHENTICATE:
            nextState = startAuthenticate(prevState, action); break;
        case UserActions.FINISH_AUTHENTICATE:
            console.log("userReducer.FINISH_AUTHENTICATE [prevState]: ", prevState);
            nextState = finishAuthenticate(prevState, action); 
            console.log("userReducer.FINISH_AUTHENTICATE [nextState]: ", nextState);
            break;
        /*    
        case userActions.API_ACTIVITY:
            nextState = apiActivity(prevState, action as IApiActivity); break;
        
        case userActions.UPDATE_TOKEN:
            nextState = updateToken(prevState, action); break;
        case userActions.START_LOAD_AUTHENTICATED_ACCOUNT:
            nextState = startLoadAuthenticatedAccount(prevState, action); break;
        case userActions.FINISH_LOAD_AUTHENTICATED_ACCOUNT:
            nextState = finishLoadAuthenticatedAccount(prevState, action); break;
        case userActions.CLEAR_USER:
            nextState = clearUser(prevState); break;
        */
        default:
            nextState = prevState;
    };

/*
const prevTime = prevState.user ? prevState.user.lastActivityTime?.toString() : "";
const nextTime = nextState.user ? nextState.user.lastActivityTime?.toString() : "";
const equals = prevTime === nextTime;

console.log("userReducer [equals, prevTime, nextTime, action.Type]: ", equals, prevTime, nextTime, action.type);

    console.log("userReducer [nextState]: ", nextState);
*/
    return nextState;
};



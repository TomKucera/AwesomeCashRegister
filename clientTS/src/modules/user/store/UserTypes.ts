import { IUser } from '../../../model/types';
import { IAction } from './../../shared/store/SharedTypes';

export const UserActions = {
    API_ACTIVITY: 'API_ACTIVITY',
    START_AUTHENTICATE: 'START_AUTHENTICATE',
    FINISH_AUTHENTICATE: 'FINISH_AUTHENTICATE',
    UPDATE_TOKEN: 'UPDATE_TOKEN',
    START_LOAD_AUTHENTICATED_ACCOUNT: 'START_LOAD_AUTHENTICATED_ACCOUNT',
    FINISH_LOAD_AUTHENTICATED_ACCOUNT: 'FINISH_LOAD_AUTHENTICATED_ACCOUNT',
    CLEAR_USER: 'CLEAR_USER',
}

export interface IFinishAuthenticate extends IAction {
    user?: IUser,
    serverError?: any,
}

/*
export interface IUpdateToken extends IAction {
    token?: IAuthenticationToken,
    account?: IAccount,
    lastActivityTime?: number,
}

export interface IApiActivity extends IAction {
    lastActivityTime: number,
}

export interface IFinishLoadAuthenticatedAccount extends IAction {
    account?: IAccount,
    serverError?: any,
}
*/

export type IUserActionTypes =
    IAction |
    IFinishAuthenticate
    //IUpdateToken |
    //IFinishLoadAuthenticatedAccount |
    //IApiActivity
    ;
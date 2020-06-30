import { ThunkDispatch } from 'redux-thunk';
import { UserActions, IUserActionTypes, IFinishAuthenticate } from './UserTypes';
import { IAction } from './../../shared/store/SharedTypes';
import { IUser } from './../../../model/types';
import apiUser from './../../../api/user';

const getActionStartAuthenticate = (): IAction => {
    return {
        type: UserActions.START_AUTHENTICATE,
    };
};

const getActionFinishAuthenticate = (user?: IUser, serverError?: any): IFinishAuthenticate => {
    return {
        type: UserActions.FINISH_AUTHENTICATE,
        user,
        serverError 
    };
}

export function googleLogin(authorizationCode: string) {
    return async (dispatch: ThunkDispatch<{}, {}, IUserActionTypes>): Promise<void> => {
        dispatch(getActionStartAuthenticate())
        try {
            const user = await apiUser.googleLogin(authorizationCode);
            console.log("UserActions.googleLogin user", user);
            dispatch(getActionFinishAuthenticate(user, undefined));
        } catch (error) {
            dispatch(getActionFinishAuthenticate(undefined, error));
        }
    };
};

export function logOUT(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        // TODO: logOut
        //await store.dispatch(getActionUpdateToken(undefined, undefined, undefined));
        //await store.dispatch({ type: userActions.CLEAR_USER });
        resolve();
    });
};
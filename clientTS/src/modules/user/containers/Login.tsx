import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IAppState } from '../../../store/RootReducer';

import { googleLogin } from './../store/UserActions';

import Login from './../components/Login';

let component = Login;

interface IOwnProps {

}

interface IStateProps {
     
}

interface IDispatchProps {
    loginGoogle: (authorizationCode: string) => Promise<boolean>,
}

const mapStateToProps: MapStateToProps<
    IStateProps,
    IOwnProps,
    IAppState
> = (state: IAppState, ownProps: IOwnProps): IStateProps => ({
    
    ...ownProps
});

const mapDispatchToProps: MapDispatchToProps<
    IDispatchProps,
    IOwnProps
> = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: IOwnProps) => ({
    /*
    loginGoogle: (authorizationCode: string):Promise<boolean> => {
        return new Promise<boolean>(async (resolve) => {
            const result = await googleLogin(authorizationCode);
            console.log("Login loginGoogle result", result);
            resolve(true);
        });
    }
    */
    loginGoogle: (authorizationCode: string):Promise<boolean> => {
        return new Promise<boolean>(async (resolve) => {
            const result = await dispatch(googleLogin(authorizationCode));
            console.log("Login loginGoogle result", result);
            resolve(true);
        });
    }
});

export default connect<
    IStateProps,
    IDispatchProps,
    IOwnProps,
    IAppState
>(mapStateToProps, mapDispatchToProps)(component);
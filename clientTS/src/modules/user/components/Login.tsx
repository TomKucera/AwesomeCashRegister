import React, { useEffect, useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

//const googleAuthClientId: string = '338878502547-l91fsgi9kt8clmfndpqmkdvt0iqnaht8.apps.googleusercontent.com';
const googleAuthClientId: string = '73065208792-69m1cj8rl07fpbn10rr06htmgjb9lk42.apps.googleusercontent.com';

interface iProps {
    loginGoogle: (authorizationCode: string) => Promise<boolean>,
}

export type IComponentProps = iProps;

const Login: React.FC<IComponentProps> = (props: IComponentProps): JSX.Element => {

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
        console.log("Login onSuccess [response]", response);

        const code: string | undefined = (response as GoogleLoginResponseOffline).code;

        if (!code){
            onFailure( new Error('GoogleLoginResponseOffline.code not provided.'));
            return;
        }

        props.loginGoogle(code).then( success => {
            console.log("loginGoogle [success]", success);
        });
    };

    const onFailure = (error: any): void => {
        console.log("Login onFailure [error]", error);
    };

    return (
        <>
            <h1>LOGIN</h1>
            <GoogleLogin
                render={(renderProps): JSX.Element => (
                    <Button
                        onClick={(event) => { renderProps.onClick() }}
                        disabled={renderProps.disabled}
                        size='large'
                    >
                        Přihlásit se přes Google
                    </Button>
                )}
                scope="email"
                accessType="offline"
                responseType="code"
                clientId={googleAuthClientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                //redirectUri="http://localhost:4444/login/callback"
                redirectUri="http://localhost:3000/login/callback"
                cookiePolicy={'single_host_origin'}
            />
        </>
    );
}

export default Login;

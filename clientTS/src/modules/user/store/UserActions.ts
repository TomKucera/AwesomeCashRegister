
// import { IVdfLocation } from '../../../model/types';
// import { createDispatchHook } from 'react-redux';

export function googleLogin(authorizationCode?: string) {
    return new Promise<string>(async (resolve) => {
        try {
            console.log('googleLogin');
            const url = 'http://localhost:9000/users/google/login';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = { authorizationCode };
            const response = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers });
            //const locations: IVdfLocation[] = await response.json();
            console.log('googleLogin response', response);
            resolve("");
        } catch (error) {
            console.log("googleLogin error", error);
        }
    });
};
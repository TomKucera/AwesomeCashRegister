import { google } from 'googleapis';
import Config from '../../../config';

import { IGoogleAuthCredentials, IGoogleUserInfo } from '../types';

export default class GoogleAuthService {
    private readonly oAuth2Client: typeof google.auth.OAuth2.prototype;

    constructor() {
        this.oAuth2Client = new google.auth.OAuth2(
            Config.GoogleAuth.clientId,
            Config.GoogleAuth.secret,
            Config.GoogleAuth.redirectUrl,
        );
    }
    
    async getTokens(code: string): Promise<IGoogleAuthCredentials> {
        return new Promise<IGoogleAuthCredentials>((resolve, reject) => {
            this.oAuth2Client.getToken(code)
                .then(response => {
                    //console.log("GoogleAuthService.getTokens response ", response);
                    resolve(response.tokens);
                })
                .catch(reason => {
                    console.log("GoogleAuthService.getToken error ", reason);
                    reject(reason)
                });
        });
    }

    async getUserBasicData(accessToken: string, refreshToken?: string): Promise<IGoogleUserInfo> {
        return new Promise<IGoogleUserInfo>((resolve, reject) => {

            this.oAuth2Client.setCredentials({ access_token: accessToken });

            const oauth2 = google.oauth2({
                auth: this.oAuth2Client,
                version: 'v2',
            });

            oauth2.userinfo.get()
                .then(response => {
                    //console.log("GoogleAuthService.getUserBasicData response ", response);
                    const userInfo = response.data;
                    resolve({
                        id: userInfo.id || '',
                        email: userInfo.email || '',
                        locale: userInfo.locale || '',
                        accessToken,
                        refreshToken,
                        firstName: userInfo.given_name || undefined,
                        lastName: userInfo.family_name || undefined,
                        picture: userInfo.picture || undefined,
                    });
                })
                .catch(reason => {
                    console.log("GoogleAuthService.getUserBasicData error ", reason);
                    reject(reason)
                });
        });
    }

    revokeAccessToken(accessToken: string): void {
        this.oAuth2Client.revokeToken(accessToken);
    }
}

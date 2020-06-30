import jwt from 'jsonwebtoken';

import userRepository from '../../../db/CrMaster/user';

import GoogleAuthService from './google-auth-service';
import { IGoogleAuthCredentials } from '../types';

import { User as mUser } from "../../../data/model/types";

const accessTokenExpiresIn: string | number = '3600s';
const refreshTokenExpiresIn: string | number = '7d';

const jwtSecret: jwt.Secret = 'SuperSecret'; // {key: privateKEY };

type JwtPayload = { userId: number };

export default class AuthService {

    private static unauthenticatedURLs = ['/user/googleLogin'];

    constructor(
        //private readonly jwtService: JwtService,
        private readonly googleAuthService: GoogleAuthService,
        //private readonly userModel: UserModel,
    ) {}

    static isUnauthenticatedURL = (url: string): boolean => {
        console.log('AuthService.isUnauthenticatedURL url', url);
        console.log('AuthService.isUnauthenticatedURL unauthenticatedURLs', AuthService.unauthenticatedURLs);
        const urlLower = url.toLowerCase();
        return AuthService.unauthenticatedURLs.some(u => urlLower.indexOf(u.toLowerCase()) >= 0);
    };

    authenticateJWT(req: any, res: any, next: any): void {
        if (AuthService.isUnauthenticatedURL(req.url)) {
            next();
            return;
        }

        const headerAuthorization: string | undefined = req.headers.authorization;

        if (headerAuthorization) {
            const token = headerAuthorization.replace('Bearer ', '');
            const payload = jwt.verify(token, jwtSecret);
            req.userId = (payload as JwtPayload).userId;
            console.log("authenticateJWT jwt.verify payload", payload);
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
    
    async loginUser(authorizationCode: string): Promise<mUser | undefined> {
        
        let tokens: IGoogleAuthCredentials | undefined = undefined;

        try {
            tokens = await this.googleAuthService.getTokens(authorizationCode);
            console.log('AuthService.loginUser tokens', tokens);
            const userInfo = await this.googleAuthService.getUserBasicData(tokens.access_token || '', tokens.refresh_token || undefined);
            console.log('AuthService.loginUser userInfo', userInfo);
            let user = await userRepository.updateWithGoogleUserInfo(userInfo);
            console.log('AuthService.loginUser user', user);
            
            if (user) {
                const accessToken = this.createToken(user.id, accessTokenExpiresIn);
                const refreshToken = this.createToken(user.id, refreshTokenExpiresIn);
                user = {...user, accessToken, refreshToken};
            }

            return user;
        } catch (e) {
            console.log('AuthService.loginUser e', e);
        }
        
    }

    createToken(userId: number, expiresIn: string | number): string {
        const payload: JwtPayload = { userId };
        return jwt.sign(payload, jwtSecret, { expiresIn });
    }

}
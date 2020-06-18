import jwt from 'jsonwebtoken';
import User from '../../../db/CrMaster/user';

import GoogleAuthService from './google-auth-service';
import { IGoogleAuthCredentials } from '../types';

import { User as mUser } from "../../../data/model/types";

const accessTokenExpiresIn: string | number = '3600s';
const refreshTokenExpiresIn: string | number = '7d';

const jwtOptions: jwt.SignOptions = { algorithm: 'HS256'};
const jwtSecret = 'MySuperSecretPassPhrase';

type JwtPayload = { userId: number };


export default class AuthService {

    private static unauthenticatedURLs = ['/users/google/login'];

    constructor(
        //private readonly jwtService: JwtService,
        private readonly googleAuthService: GoogleAuthService,
        //private readonly userModel: UserModel,
    ) {}

    static isUnauthenticatedURL = (url: string): boolean => {
        const urlLower = url.toLowerCase();
        return AuthService.unauthenticatedURLs.some(u => urlLower.indexOf(u) >= 0);
    };

    authenticateJWT(req: any, res: any, next: any): void {
        if (AuthService.isUnauthenticatedURL(req.url)){
            next();
            return;
        }

        const headerAuthorization: string | undefined = req.headers.authorization;
        if (headerAuthorization) {
            const token = headerAuthorization.replace('Bearer ', '');
            // eslint-disable-next-line @typescript-eslint/ban-types
            jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, payload: object | undefined) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.userId = (payload as JwtPayload).userId;
                next();
            });
        }
        else {
            res.sendStatus(401);
        }
    }

    isRequestValid(req: any): boolean {
        console.log('AuthService.isRequestValid request', req);
        try {
            const token = req.headers.authorization.replace('Bearer ', '');
            //const dbName = req.headers.dbname;
            const payload = jwt.verify(token, jwtSecret) as JwtPayload;

            
            console.log('AuthService.isRequestValid payload', payload);

            req.userId = payload.userId;

            return true;
        } catch (e) {
            return false;
        }
    }
    

    async loginUser(authorizationCode: string): Promise<mUser | undefined> {
        
        let tokens: IGoogleAuthCredentials | undefined = undefined;

        try {
            tokens = await this.googleAuthService.getTokens(authorizationCode);
            console.log('AuthService.loginUser tokens', tokens);
            const userInfo = await this.googleAuthService.getUserBasicData(tokens.access_token || '', tokens.refresh_token || undefined);
            console.log('AuthService.loginUser userInfo', userInfo);
            let user = await User.updateWithGoogleUserInfo(userInfo);
            console.log('AuthService.loginUser user', user);
            
            if (user) {
                const accessToken = this.createToken(user.id, accessTokenExpiresIn);
                const refreshToken = this.createToken(user.id, refreshTokenExpiresIn);
                user = {...user, accessToken, refreshToken};
            }
            
            return user;

        } catch (e) {

            console.log('AuthService.loginUser e', e);
            
            /*
            if (tokens) {
                this.googleAuthService.revokeAccessToken(tokens.access_token);
            }

            if (e instanceof AppModuleException) {
                throw e;
            } else {
                throw new AuthServiceException(e.message, HttpStatus.UNAUTHORIZED);
            }
            */
        }
        
    }

    /*
    async refreshToken(userId: string): Promise<TokenType> {
        try {
            const accessToken = this.createToken(new ObjectId(userId), accessTokenExpiresIn);
            const refreshToken = this.createToken(new ObjectId(userId), refreshTokenExpiresIn);
            return new TokenType(accessToken, refreshToken);
        } catch (e) {
            if (e instanceof AppModuleException) {
                throw e;
            } else {
                throw new AuthServiceException(e.message, HttpStatus.UNAUTHORIZED);
            }
        }
    }

    */
    createToken(userId: number, expiresIn: string | number): string {
        const payload: JwtPayload = { userId };
        return jwt.sign( payload, jwtSecret, {...jwtOptions, expiresIn});
    }
    
}
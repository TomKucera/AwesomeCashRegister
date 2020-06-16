//import { JwtService } from '@nestjs/jwt';
//import { HttpStatus, Injectable } from '@nestjs/common';
//import { ObjectId } from 'mongodb';
//import { AppModuleException } from '../../../app-module-exception';
//import { UserModel } from '../../user/models/user-model';
//import { GoogleAuthService } from './google-auth-service';
//import { LoginType } from '../types/login-type';
//import { TokenType } from '../types/token-type';
//import { GoogleAuthCredentials } from '../../../dtos/auth/google-auth-credentials-interface';
//import { AuthServiceException } from '../exceptions/auth-service-exception';

import GoogleAuthService from './google-auth-service';
import { IGoogleAuthCredentials, ILogin } from '../types';

const accessTokenExpiresIn: string | number = '3600s';
const refreshTokenExpiresIn: string | number = '7d';

export class AuthService {
    constructor(
        //private readonly jwtService: JwtService,
        private readonly googleAuthService: GoogleAuthService,
        //private readonly userModel: UserModel,
    ) {}


    /*
    async isRequestValid(req: any, doNotCheckDbName: boolean): Promise<boolean> {
        try {
            const token = req.headers.authorization.replace('Bearer ', '');
            const dbName = req.headers.dbname;
            const payload = this.jwtService.verify(token);

            req.userId = payload.userId;

            if (!doNotCheckDbName && !(await this.userModel.hasUserProject(payload.userId, dbName))) {
                return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }
    */

    async loginUser(authorizationCode: string): Promise<ILogin> {
        

        return {

            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            accessToken: '',
            refreshToken: '',
            picture: '',
        };
        /*

        let tokens: IGoogleAuthCredentials | undefined = undefined;

        try {
            tokens = await this.googleAuthService.getTokens(authorizationCode);
            const userInfo = await this.googleAuthService.getUserBasicData(tokens.access_token || '', tokens.refresh_token || undefined);
            const user = await this.userModel.updateUserWithGoogleUserInfo(userInfo, false);
            //const accessToken = this.createToken(user._id, accessTokenExpiresIn);
            //const refreshToken = this.createToken(user._id, refreshTokenExpiresIn);
            return new LoginType(user._id, user.firstName, user.lastName, user.email, accessToken, refreshToken);
        } catch (e) {
            if (tokens) {
                this.googleAuthService.revokeAccessToken(tokens.access_token);
            }

            if (e instanceof AppModuleException) {
                throw e;
            } else {
                throw new AuthServiceException(e.message, HttpStatus.UNAUTHORIZED);
            }
        }
        */
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

    createToken(userId: ObjectId, expiresIn: string | number): string {
        const payload = {
            userId,
        };
        return this.jwtService.sign(payload, { expiresIn });
    }
    */
}


// user entity in Budget:
/*
_id
:
5e4abea15b2041408b58e721
email
:
"radim@atreo.cz"
firstName
:
"Radim"
googleAccessToken
:
"ya29.a0Ae4lvC01rf40LM-D05mhHCECExb96SP09BVex748S7BkEg0sWqB6pSZA27dpsRE..."
googleRefreshToken
:
"1//0cd1Z60rFMFv5CgYIARAAGAwSNwF-L9Ir7BrNem3nWtoF_95pR8odWRohT8NxLM1II9..."
lastName
:
"Krkoška"
projects
:
Array
ifcLoaderToken
:
"no-access"
autodeskAccount
:
"bqGA7r1KQhYKkPKoWlj6DoBjjeLtiK2c"
autodeskDocumentId
:
"urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnFnYTdyMWtxaHlra3Brb3dsajZkb2..."
autodeskSecret
:
"RAfqBksNqgewMXAp"
autodeskToken
:
"eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJzY29wZSI6Wy..."
expireIn
:
3599
*/
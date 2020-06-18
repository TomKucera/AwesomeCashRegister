import GoogleAuthService from './modules/auth/services/google-auth-service';
import AuthService from './modules/auth/services/auth-service';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';

const authService = new AuthService(new GoogleAuthService());

authService.authenticateJWT({url: 'dfad'}, undefined, undefined);
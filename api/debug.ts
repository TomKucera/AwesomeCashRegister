import GoogleAuthService from './modules/auth/services/google-auth-service';
import {GoogleAuth} from 'google-auth-library';
import AuthService from './modules/auth/services/auth-service';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';

const authService = new AuthService(new GoogleAuthService());

//authService.authenticateJWT({url: 'dfad'}, undefined, undefined);



const main = async ():Promise<any> => {
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
    const res = await client.request({ url });
    //console.log(res.data);
    return res;
  }

main().then(res =>{
    console.log(res);

})
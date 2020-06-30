import { AxiosRequestConfig } from 'axios';
import config from '../config';
import { process } from './axs';
import { IUser } from '../model/types';

const url = `${config.apiURL}/user`;
const urlGoogleLogin = `${url}/googleLogin`;

const googleLogin = async (authorizationCode: string): Promise<IUser | undefined> => {
  let user:IUser | undefined = undefined;
    try {
      const response  = await process('POST', urlGoogleLogin, { authorizationCode });
      user = await response.json();
      //console.log("user.googleLogin response, user", response, user);
    } catch (e) {
      // TODO: log
      console.log("user.googleLogin error", e);
    }
    return user;
};

export default { googleLogin };
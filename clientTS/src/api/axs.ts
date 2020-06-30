import { IStringMap } from '../model/types';
import LocalStorage from '../modules/shared/store/LocalStorage';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const getHeaders = (inclAuthorization: boolean = true): IStringMap<string> => {
  const headers: IStringMap<string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (inclAuthorization) {
    headers['Authorization'] = `Bearer ${LocalStorage.get(LocalStorage.getTokenKey('access')) ?? ''}`;
  }
  return headers;
};

export const process = ( method: HttpMethod, url: string, body?: any): Promise<Response> =>{

  const inclAuthorization = (url.toLowerCase().indexOf('login') < 0);

  const options: RequestInit = {
    method: method.toString(),
    headers: getHeaders(inclAuthorization),
    body: body ? JSON.stringify(body) : undefined,
  };

  console.log('axs.process inclAuthorization', inclAuthorization);
  console.log('axs.process method', method);
  console.log('axs.process url', url);
  console.log('axs.process body', body);

  return fetch(url,options);
};
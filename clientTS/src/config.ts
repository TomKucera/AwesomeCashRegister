//import { IUserCredentialsEntry, ITwitchIdentity, IAwsMqConfig, IChatStorageConfig } from './model/types';

const urlApi = {
    local: 'http://localhost:9000',
    public: '',
};

enum UrlApiType { local, public};

const urlApiType: UrlApiType = UrlApiType.local;

const config = {
    apiURL: urlApiType as UrlApiType === UrlApiType.public ? urlApi.public : urlApi.local,
};

export default config;
const TEST_KEY = 'test'

const localStorageAvailable: boolean = isLocalStorageAvailable();

const keyRequiredPathname = 'RequiredPathname';

type TokenType = 'access' | 'refresh';

const getTokenKey = (tokenType: TokenType): string => {
    return tokenType === 'refresh' ? "AUTH_REFRESH_TOKEN_KEY" : "AUTH_ACCESS_TOKEN_KEY";
}

function isLocalStorageAvailable(): boolean {
    const s = window.localStorage
    if (!s) {
        return false;
    }
    try {
        s.setItem(TEST_KEY, '1');
        s.removeItem(TEST_KEY);
        return true;
    } catch (error) {
        return false;
    }
};

function set(key: string, value: any) {

    console.log('LocalStorage.set key, value', key, value);
    if (localStorageAvailable) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

function get<T>(key: string): T | undefined {
    if (!localStorageAvailable) {
        return undefined;
    }

    const json = localStorage.getItem(key)
    try {
        return json ? JSON.parse(json) : undefined;
    } catch (e) {
        return undefined;
    }
};

function update(key: string, updater: (value: any) => any) {
    if (localStorageAvailable) {
        set(key, updater(get(key)));
    }
};

function remove(key: string) {
    if (localStorageAvailable) {
        localStorage.removeItem(key);
    }
};

export default {
    get,
    set,
    update,
    remove,
    keyRequiredPathname,
    getTokenKey,
};
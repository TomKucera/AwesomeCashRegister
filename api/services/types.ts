export interface IGoogleAuthCredentials {
    refresh_token?: string | null;
    expiry_date?: number | null;
    access_token?: string | null;
    token_type?: string | null;
    id_token?: string | null;
}

export interface IGoogleUserInfo {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    locale: string;
    accessToken: string;
    refreshToken?: string;
}
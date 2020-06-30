export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    accessToken?: string,
    refreshToken?: string,
    picture?: string,
};
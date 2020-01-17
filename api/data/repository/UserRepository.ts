import User from "./../model/user";
import IUserRepository from "./interface/IUserRepository";

const UserRepository: IUserRepository = {

    GetById: (id: number): Promise<User> => {
        return new Promise<User>((resolve, reject) => {
            resolve({ id, email: "", created: new Date(), updated: new Date() });
        });
    },

    Create: (data: User): Promise<User> => {
        return new Promise<User>((resolve, reject) => {
            resolve();
        });
    },

    Update: (data: User): Promise<User> => {
        return new Promise<User>((resolve, reject) => {
            resolve();
        });
    },

    Delete: (id: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    },

    GetList: (): Promise<User[]> => {
        return new Promise<User[]>((resolve, reject) => {
            resolve();
        });
    },
};

export default UserRepository;

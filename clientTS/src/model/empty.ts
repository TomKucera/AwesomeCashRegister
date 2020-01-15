import { ICustomer, ISelectItem } from 'src/model/types';

export const emptyCustomer: ICustomer = {
    id: 0, name: '', login: '', password: '', created: new Date(0), updated: new Date(0)
};
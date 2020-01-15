import { ICustomer, ISelectItem } from './../types';

export function customerToSelectItem(customer: ICustomer): ISelectItem  {
     return { value: customer.id, title: customer.name };
};

import config from '../config';
import { process } from './axs';
import { ICustomer } from '../model/types';

const urlCustomer = `${config.apiURL}/customer`;

const getList = async (): Promise<Array<ICustomer> | undefined> => {
  let customers: Array<ICustomer> | undefined = undefined;
  try {
    const response = await process('GET', urlCustomer);
    customers = await response.json();
    console.log("api.customer.getList response, customers", response, customers);
  } catch (e) {
    // TODO: log
    console.log("api.customer.getList error", e);
  }
  return customers;
};

export default { getList };
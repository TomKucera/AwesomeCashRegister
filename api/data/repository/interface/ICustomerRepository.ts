import Customer from "./../../model/customer";
import ITableRepository from "./ITableRepository";

export default interface ICustomerRepository extends ITableRepository<Customer, number> {}

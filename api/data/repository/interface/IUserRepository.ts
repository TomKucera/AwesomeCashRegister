import User from "./../../model/user";
import ITableRepository from "./ITableRepository";

export default interface IUserRepository extends ITableRepository<User, number> {}

import { User } from "./../../model/types";
import ITableRepository from "./ITableRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface IUserRepository extends ITableRepository<User, number> {}

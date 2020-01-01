import License from "./../../model/license";
import ITableRepository from "./ITableRepository";

export default interface ILicenseRepository extends ITableRepository<License, number> {
    /// <summary>
    /// Returns list of licenses by customer
    /// </summary>
    /// <returns>List data</returns>
    GetByCustomerId(customerId: number): Promise<License[]>;
}

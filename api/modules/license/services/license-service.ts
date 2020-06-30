import CustomerRepository from '../../../db/CrMaster/repositories/customer-repository';
import LicenseRepository from '../../../db/CrMaster/repositories/license-repository';
import UserRepository from '../../../db/CrMaster/repositories/user-repository';

import { License, User, ServerError } from "../../../data/model/types";

export default class LicenseService {

    constructor(
        private readonly licenseRepository: LicenseRepository = new LicenseRepository(),
        private readonly customerRepository: CustomerRepository = new CustomerRepository(),
        private readonly userRepository: UserRepository = new UserRepository(),
    ) {}

    public create = async(idUser: number, data: License): Promise<License | ServerError> => {
        const customer = await this.customerRepository.getById(data.idCustomer);
        if (!customer) {
            return { statusCode: 404, description: 'Customer not found' };
        }

        if (customer.isDeleted){
            return { statusCode: 403, description: 'Customer was deleted' };
        }

        if (customer.idUser != idUser){
            return { statusCode: 403, description: 'Unsufficient privileges' };
        }

        const license = await this.licenseRepository.create(data);

        return license ?? { statusCode: 500, description: 'Server Error' };
    };

    public update = async(idUser: number, data: License): Promise<License | ServerError> => {

        let license = await this.licenseRepository.getById(data.id);

        if (!license) {
            return { statusCode: 404, description: 'License not found' };
        }

        /*
        if (license.isDeleted){
            return { statusCode: 403, description: 'License was deleted' };
        }
        */

        const customer = await this.customerRepository.getById(license.idCustomer);
        if (!customer) {
            return { statusCode: 404, description: 'Customer not found' };
        }

        if (customer.isDeleted){
            return { statusCode: 403, description: 'Customer was deleted' };
        }

        if (customer.idUser != idUser){
            return { statusCode: 403, description: 'Unsufficient privileges' };
        }

        license = await this.licenseRepository.update(data);

        return license ?? { statusCode: 500, description: 'Server Error' };
    };

    public get = async(idUser: number, idLicense: number): Promise<License | ServerError> => {

        const license = await this.licenseRepository.getById(idLicense);

        if (!license) {
            return { statusCode: 404, description: 'License not found' };
        }

        /*
        if (license.isDeleted){
            return { statusCode: 403, description: 'License was deleted' };
        }
        */

        const licenseUsers = await this.licenseRepository.getLicenseUsers(idLicense);

        if (!licenseUsers?.some(u=> u.id == idUser)){
            return { statusCode: 403, description: 'Unsufficient privileges' };
        }

        return license;
    };

    public addUser = async(idUser: number, idLicense: number, data: User): Promise<User | ServerError> => {

        const license = await this.licenseRepository.getById(idLicense);

        if (!license) {
            return { statusCode: 404, description: 'License not found' };
        }

        /*
        if (license.isDeleted){
            return { statusCode: 403, description: 'License was deleted' };
        }
        */

        // check users privileges

        const licenseUsers = await this.licenseRepository.getLicenseUsers(idLicense);

        if (licenseUsers?.some(u=> u.email == data.email)){
            return { statusCode: 400, description: 'License already contains given user' };
        }

        const user = await this.userRepository.getByEmail(data.email, true);

        if (!user) {
            return { statusCode: 500, description: 'Server Error' };
        }

        const userLicense = await this.licenseRepository.addUserToLicense(idLicense, user.id);

        if (!userLicense) {
            return { statusCode: 500, description: 'Server Error' };
        }

        return user;
    };

    public removeUser = async(idUser: number, idLicense: number, email: string): Promise<boolean | ServerError> => {

        const license = await this.licenseRepository.getById(idLicense);

        if (!license) {
            return { statusCode: 404, description: 'License not found' };
        }

        /*
        if (license.isDeleted){
            return { statusCode: 403, description: 'License was deleted' };
        }
        */

        // check users privileges

        const licenseUsers = await this.licenseRepository.getLicenseUsers(idLicense);

        if (!licenseUsers?.some(u=> u.email == email)){
            return { statusCode: 400, description: 'License doesn¨t contain given user' };
        }

        const user = await this.userRepository.getByEmail(email, true);

        if (!user) {
            return { statusCode: 404, description: 'User not found' };
        }

        const removed = await this.licenseRepository.removeUserFromLicense(idLicense, user.id);

        if (!removed) {
            return { statusCode: 500, description: 'Server Error' };
        }

        return removed;
    };

    public getAll = async(idUser: number): Promise<Array<License> | ServerError> => {
        // add filter (exclude deleted licenses)
        const licenses = await this.licenseRepository.get(idUser);
        return licenses ?? { statusCode: 500, description: 'Server Error' };
    };

}
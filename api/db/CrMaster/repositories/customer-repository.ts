import connection from "./../connection";
import { Customer } from "./../../../data/model/types";

class CustomerRepository {
    public getById(id: number): Promise<Customer | undefined> {
        return new Promise<Customer>((resolve) => {
            connection("customer").where("id", id).then((rows: Array<Customer>) => {
                resolve((rows.length === 1)?rows[0] : undefined);
            });
        });
    }
}

export default CustomerRepository;

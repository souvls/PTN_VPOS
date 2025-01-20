import { countCustomer, findAllCustomer, findCustomerByID, insertNewCustomer, updateCustomerPoint } from "@/repo/CustomerRepo";

interface CTM {
    customer_id: string,
    customer_name: string,
    customer_phone: string,
    customer_address: string,
    customer_point: 0
}

export async function getCustomer(id: string) {
    const customer = await findCustomerByID(id)
    return customer;
}
export async function getAllCustomer() {
    const customers = await findAllCustomer();
    return customers;
}
export async function addNewCustomer(customer: CTM) {
    const count = await countCustomer();
    customer.customer_id = "PTN00" + (count + 1).toString();
    const newcustomer = await insertNewCustomer(customer);
    return newcustomer;
}
export async function updatePoint(id:string,point:number){
    const update = await updateCustomerPoint(id,point);
    return update;
}
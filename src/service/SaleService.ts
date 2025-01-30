import { createBill, createBillWholesale, findBillByID } from '@/repo/BillRepo'
import { updateCustomerPoint } from '@/repo/CustomerRepo';
import { updateManyQTYProduct } from '@/repo/ProductRepo';

export async function saleRetail(user_id: string, customer_id: string, total_lak: number, total_thb: number, exchange_rate: number, total_point: number, cart: string, money: number, change: number) {
    const sale_type = 0
    const jcart = JSON.parse(cart);
    await updateManyQTYProduct(jcart);
    const createbill = await  createBill(user_id, customer_id, sale_type, total_lak, total_thb, exchange_rate, total_point, cart, money, change);
    //update qty
    //update point customer
    // console.log("service" + customer_id + " " + total_point)
    // await updateCustomerPoint(customer_id, total_point);
    const bill = await findBillByID(createbill.bill_id)
    return bill;
}
export async function saleWholesale(user_id: string, customer_id: string, total_lak: number, total_thb: number, exchange_rate: number, cart: any[]) {
    const sale_type = 1;
    const total_point = 0;
    const change = 0;
    const money = 0;
    await updateManyQTYProduct(cart);
    const createbill = await createBillWholesale(user_id, customer_id, sale_type, total_lak, total_thb, exchange_rate, total_point,cart , money, change);
    return createbill;
}

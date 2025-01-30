import Bill from "@/models/Bill";
import Customer from "@/models/Customer";
import User from "@/models/User";
// import { updateManyQTYProduct } from "./ProductRepo";
// import { updateCustomerPoint } from "./CustomerRepo";

Customer
User

export function displayLaoDate() {
    const daysLao = [
        "ວັນອາທິດ",
        "ວັນຈັນ",
        "ວັນອັງຄານ",
        "ວັນພຸດ",
        "ວັນພະຫັດ",
        "ວັນ​ສຸກ",
        "ວັນເສົາ"
    ];
    const currentDate = new Date();;
    const dayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const todayLao = daysLao[dayIndex];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adjust month index for Lao calendar (0-based vs. 1-based)
    const year = currentDate.getFullYear();
    const laoDate = `${todayLao},${day}/${month}/${year} ${currentDate.toLocaleTimeString()}`;
    return laoDate;
}
export async function createBill(user_id: string, customer_id: string, sale_type: number, total_lak: number, total_thb: number, exchange_rate: number, total_point: number, cart: string, money: number, change: number) {
    try {

        const countBill = await Bill.countDocuments();
        const jcart = JSON.parse(cart);

        //create bill
        const newBill = new Bill({
            bill_id: (countBill + 1).toString(),
            bill_user_id: user_id,
            bill_customer_id: customer_id,
            bill_exchange_rate: exchange_rate,
            bill_total_lak: total_lak,
            bill_total_thb: total_thb,
            bill_date_string: displayLaoDate(),
            bill_date: new Date().getTime(),
            bill_type: sale_type,
            bill_total_point: total_point,
            bill_item: jcart,
            bill_money: money,
            bill_change: change
        });
        // //update qty
        // await updateManyQTYProduct(jcart);
        // //update point customer
        // await updateCustomerPoint(customer_id, total_point);
        //savebill
        const bill = await newBill.save();
        //return bill;
        return bill;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function createBillWholesale(user_id: string, customer_id: string, sale_type: number, total_lak: number, total_thb: number, exchange_rate: number, total_point: number, cart: any[], money: number, change: number) {
    try {

        const countBill = await Bill.countDocuments();
        //create bill
        const newBill = new Bill({
            bill_id: (countBill + 1).toString(),
            bill_user_id: user_id,
            bill_customer_id: customer_id,
            bill_exchange_rate: exchange_rate,
            bill_total_lak: total_lak,
            bill_total_thb: total_thb,
            bill_date_string: displayLaoDate(),
            bill_date: new Date().getTime(),
            bill_type: sale_type,
            bill_total_point: total_point,
            bill_item: cart,
            bill_money: money,
            bill_change: change
        });
        // //update qty
        // await updateManyQTYProduct(jcart);
        // //update point customer
        // await updateCustomerPoint(customer_id, total_point);
        //savebill
        const bill = await newBill.save();
        //return bill;
        return bill;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function findBillByID(id: string) {
    const bill = await Bill.findOne({ bill_id: id })
        .populate({
            path: 'bill_customer_id',
        })
        .populate({
            path: 'bill_user_id',
        });
    return bill
}
export async function findBillBetweenDate(date_start: string, date_end: string) {
    const date_S = new Date(date_start);
    const date_E = new Date(date_end);
    const startOfDay = new Date(date_S.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date_E.setHours(23, 59, 59, 999));
    try {
        const bill = await Bill.find({
            bill_date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })
            .populate({
                path: 'bill_customer_id',
            })
            .populate({
                path: 'bill_user_id',
            })
        return bill;
    } catch (error) {
        console.error(error);
    }
}
export async function updateStatus(id: string, bill_id: string) {
    const update = await Bill.findOneAndUpdate(
        { bill_id: bill_id },
        { $set: { bill_status: "cancel", user_cancelBill: id } },
    )
    return update;
}
import { findBillBetweenDate, findBillByID, updateStatus } from '@/repo/BillRepo'

export async function getBill(id: string) {
    const bill = findBillByID(id);
    return bill;
}
export async function getBillWithDate(date_start: string, date_end: string) {
    const bills = await findBillBetweenDate(date_start, date_end);
    return bills;
}
export async function deleteBill(id:string,bill_id:string) {
    const update= await updateStatus(id,bill_id);
    return update
}
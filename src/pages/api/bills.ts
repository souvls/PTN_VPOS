import { deleteBill, getBill, getBillWithDate } from "@/service/BillService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET": {
                const { id, date_start, date_end } = req.query
                if (date_start && date_end) {
                    const bills = await getBillWithDate(date_start.toString(), date_end.toString());
                    res.status(200).json({ code: 999, result: bills, date_start: date_start, date_end: date_end });
                }
                if (id) {
                    const bill = await getBill(id.toString());
                    if (bill) {
                        res.status(200).json({ code: 999, result: bill });
                    } else {
                        res.status(200).json({ code: 0, result: [] });
                    }
                }
                break;
            }
            case "POST":
                break;
            case "PUT":
                break;
            case "DELETE": {
                const { id, bill_id } = req.query;
                if (id && bill_id) {
                    const update = await deleteBill(id?.toString(), bill_id.toString());
                    if (update) {
                        res.status(200).json({ code: 999, result: update });
                    } else {
                        res.status(200).json({ code: 0, result: [] });
                    }
                }
                break;
            }
            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
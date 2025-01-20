import { saleRetail } from "@/service/SaleService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                break;
            case "POST":
                const { user_id, customer_id, total_lak, total_thb, exchange_rate, total_point, cart, money, change } = req.body;
                //create bill
                const bill = await saleRetail(user_id, customer_id, total_lak, total_thb, exchange_rate, total_point, cart, money, change);
                res.status(201).json(bill);
                break;
            case "PUT":
                break;
            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
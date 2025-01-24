
import { saleWholesale } from "@/service/SaleService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                break;
            case "POST":
                const { user_id, customer_id, total_lak,total_thb, exchange_rate, total_point, cart, money, change } = req.body;
                console.log(req.body);
                const x = JSON.stringify(cart);
                //create bill
                const bill = await saleWholesale(user_id, customer_id, total_lak,total_thb, exchange_rate, total_point, x, money, change);
                console.log(bill);
                res.status(201).json  (bill);
                break;
            case "PUT":
            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
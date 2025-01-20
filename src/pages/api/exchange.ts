import { Exchange_rate } from "@/service/ExchangeService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const result = await Exchange_rate();
                res.status(200).json(result)
                break;
            default:
                res.status(500).json({ status: 'no', message: "no" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}

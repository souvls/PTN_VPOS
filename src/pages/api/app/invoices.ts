
import { updateStatus2 } from "@/repo/BillRepo";
import { Bills } from "@/service/BillService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const bills = await Bills();
                res.status(200).json(bills);
                break;
            case "DELETE":
                const { id } = req.query
                if (id) {
                    await updateStatus2(id?.toString());
                    res.status(200);
                }
                break
            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
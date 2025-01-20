import { getQtyProduct } from "@/service/ProductService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const { num } = req.query
                if (num) {
                    const qty = parseInt(num.toString())
                    const products = await getQtyProduct(qty)
                    res.status(200).json({ code: 999, result: products });
                }
                break;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
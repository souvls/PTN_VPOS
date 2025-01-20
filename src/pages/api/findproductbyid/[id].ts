import { NextApiRequest, NextApiResponse } from "next";
import { getProductByID, getProductBykEY, getProducts } from "@/service/ProductService";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const { id } = req.query
                if (id) {
                    const product = await getProductByID(id.toString());
                    if (product) {
                        res.status(200).json({ code: 999, result: product });
                    } else {
                        res.status(200).json({ code: 0, message: "ບໍ່ມີສິນຄ້ານີ້", result: product });
                    }
                }
                break;
            case "POST":
                break;
            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
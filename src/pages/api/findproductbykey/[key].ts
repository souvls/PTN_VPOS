import { NextApiRequest, NextApiResponse } from "next";
import { getProductByID, getProductBykEY, getProducts } from "@/service/ProductService";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const { key } = req.query
                if (key) {
                    const product = await getProductByID(key.toString());
                    if (product) {
                        var pd = [];
                        pd.push(product)
                        res.status(200).json({ code: 999, result: pd });
                    } else {
                        const products = await getProductBykEY(key.toString());
                        res.status(200).json({ code: 999, result: products });
                    }
                } else {
                    res.status(200).json({ code: 999, result: [] });
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
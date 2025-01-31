import { NextApiRequest, NextApiResponse } from "next";
import { updateOneProduct} from "@/service/ProductService";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "PUT":
                {
                    const { newProduct } = req.body
                    const updatePRoduct = await updateOneProduct(newProduct);
                    res.status(200).json({ code: 999, result: updatePRoduct });
                }
            default:
                res.status(401).json({});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
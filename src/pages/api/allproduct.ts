import { NextApiRequest, NextApiResponse } from "next";
import Product from '@/models/Products'
import Category from '@/models/Category'
import Unit from '@/models/Unit'

Category
Unit
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const product = await Product.find()
                    .populate({
                        path: 'product_category',
                    })
                    .populate({
                        path: 'product_unit',
                    });
                res.status(200).json({ result: product });
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
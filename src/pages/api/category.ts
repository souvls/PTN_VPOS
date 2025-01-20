import Category from "@/models/Category";
import Products from "@/models/Products";
import { getAllCategory } from "@/service/CategoryService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const categorys = await getAllCategory()
                res.status(200).json({ code: 999, result: categorys });
                break;
            case "POST": {
                const { category_name } = req.body

                const newCGR = new Category({
                    category_name: category_name
                })
                await newCGR.save();
                res.status(201).json(newCGR);
                break;
            }
            case "PUT": {
                const { id, category_name } = req.body
                const updateCGR = await Category.findByIdAndUpdate(id, { category_name: category_name }, { new: true });
                res.status(200).json(updateCGR);
                break;
            }
            case "DELETE":
                const { id } = req.query
                const checkUse = await Products.find({ product_category: id })
                if (checkUse.length === 0) {
                    await Category.findByIdAndDelete(id)
                    res.status(200).json({});
                } else {
                    res.status(400).json({});
                }
                break
            default:
                res.status(500).json({ status: 'no', message: "" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
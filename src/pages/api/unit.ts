import Products from "@/models/Products";
import Unit from "@/models/Unit";
import { getAllUnit } from "@/service/UniteService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const units = await getAllUnit();
                res.status(200).json({ code: 999, result: units });
                break;
            case "POST": {
                const { unit_name } = req.body
                const newUnit = new Unit({
                    unit_name: unit_name
                })
                await newUnit.save();
                res.status(201).json(unit_name);
                break;
            }
            case "PUT": {
                const { id, unit_name } = req.body
                const updateUnit = await Unit.findByIdAndUpdate(id, { unit_name: unit_name }, { new: true });
                res.status(200).json(updateUnit);
                break;
            }
            case "DELETE":
                const { id } = req.query
                const checkUse = await Products.find({ product_unit: id })
                if (checkUse.length === 0) {
                    await Unit.findByIdAndDelete(id)
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
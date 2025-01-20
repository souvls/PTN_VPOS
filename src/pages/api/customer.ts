import { addNewCustomer, getAllCustomer, getCustomer, updatePoint } from "@/service/CustomerService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const { id } = req.query
                if (id) {
                    const result = await getCustomer(id.toString())
                    if (result) {
                        res.status(200).json({ code: 999, result: result });
                    } else {
                        res.status(200).json({ code: 0, message: "ບໍ່ມີພົບສະມາຊິກນີ້", result: result });
                    }
                } else {
                    const customers = await getAllCustomer();
                    res.status(200).json({ code: 999, result: customers });

                }
                res.status(200).json({ status: 'no' });
                break;
            case "POST":
                const { customer } = req.body;
                const result = await addNewCustomer(customer);
                if (result === true) {
                    res.status(200).json({ code: 999, result: result });
                } else {
                    res.status(200).json({ code: 0, result: result });
                }
                break;
            case "PUT": {
                const { id, point } = req.body;
                if (id && point) {
                    const result = await updatePoint(id, point);
                    if (result) {
                        res.status(200).json({ code: 999, result: result });
                    } else {
                        res.status(200).json({ code: 0, result: result });
                    }
                }
                break;
            }
            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
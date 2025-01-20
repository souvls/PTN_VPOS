import { Login } from "@/service/UserService";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                break;
            case "POST":
                const { Username, Password } = req.body
                const result = await Login(Username, Password);
                if (result === 1) {
                    res.status(200).json({ code: 1, message: "ລະຫັດຜີດ" })
                }
                if (result === 0) {
                    res.status(200).json({ code: 0, message: "ບໍ່ພົບຜູ້ໃຊ້" })
                }
                res.status(200).json({ code: 999, message: "ສຳເລັດ", result: result })
                break;
            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}

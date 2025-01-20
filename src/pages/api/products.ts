import { NextApiRequest, NextApiResponse } from "next";
import { addNewProduct, deleteProduct, getProductByID, getProductPaginate, getProducts, updateOneProduct, updateQty } from "@/service/ProductService";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET": {
                const { id, pages, limit } = req.query
                if (id) {
                    const product = await getProductByID(id.toString());
                    if (product) {
                        res.status(200).json({ code: 999, result: product });
                    } else {
                        res.status(200).json({ code: 0, message: "ບໍ່ມີສິນຄ້ານີ້", result: product });
                    }
                }
                if (pages && limit) {
                    // console.log(pages)
                    // console.log(limit)
                    const products = await getProductPaginate(parseInt(pages.toString()), parseInt(limit.toString()));
                    res.status(200).json({ code: 999, result: products });
                }
                else {
                    const products = await getProducts();
                    res.status(200).json({ code: 999, result: products });
                }
                break;
            }
            case "POST": {
                const { newProduct } = req.body
                const newproduct = await addNewProduct(newProduct)
                res.status(200).json({ code: 999, result: newproduct });
            }
                break;
            case "PUT":
                {
                    const { newProduct } = req.body
                    const updatePRoduct = await updateOneProduct(newProduct);
                    res.status(200).json({ code: 999, result: updatePRoduct });
                }
            case "PATCH":
                {
                    const { product_id, product_qty } = req.body
                    const update = await updateQty(product_id, product_qty);
                    if (update) {
                        res.status(200).json({ code: 999, result: update });
                    } else {
                        res.status(200).json({ code: 0, message: "ບໍ່ມີສິນຄ້ານີ້", result: [] });
                    }

                }

            case "DELETE": {
                const { id } = req.query
                if (id) {
                    console.log(id);
                    const result = await deleteProduct(id.toString())
                    res.status(200).json({ code: 999, result: result });
                }
            }

            default:
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'no', message: err });
    }
}
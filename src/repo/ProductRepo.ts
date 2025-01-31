import Product from "@/models/Products";
import Category from "@/models/Category";
import Unit from "@/models/Unit";
const moment = require('moment');
Category
Unit
interface PD {
    _id: string;
    product_id: string;
    product_name: string;
    product_size: string;
    product_qty: number;
    product_category: { _id: string, category_name: string };
    product_unit: { _id: string, unit_name: string };
    product_price_buy_THB: number;
    product_price_sale1_THB: number;
    product_price_sale2_THB: number;
    product_price_buy_LAK: number;
    product_price_sale1_LAK: number;
    product_price_sale2_LAK: number;
    product_point: number;
    product_discount: number;
    product_exp: string;
    product_mfd: string;
    product_address: string
}
export async function saveProduct(product: PD) {
    try {
        const newProduct = new Product(product)
        newProduct.save();
        return true
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function ProductPaginate(page: number, limit: number) {
    try {
        const skip = (page - 1) * limit;
        const count = await Product.countDocuments()
        const length = Math.ceil(count/limit);
        const paginate = await Product.find()
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'product_category',
            })
            .populate({
                path: 'product_unit',
            })
            .sort({ updatedAt: -1 });
        return { length: length, result: paginate };
    } catch (err) {
        console.log(err);
        throw err
    }

}
export async function findProducts() {
    try {
        const products = await Product.find()
            .populate({
                path: 'product_category',
            })
            .populate({
                path: 'product_unit',
            })
        return products;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function findProductById(id: string) {
    try {
        const product = await Product.findOne({ product_id: id })
            .populate({
                path: 'product_category',
            })
            .populate({
                path: 'product_unit',
            });
        return product
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function findProductByKey(key: string) {
    try {
        const products = await Product.find({
            product_name: { $regex: key, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
        })
            .populate({
                path: 'product_category',
            })
            .populate({
                path: 'product_unit',
            })
        return products
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function updateManyQTYProduct(cart: { product_id: string, product_qty: number }[]) {
    try {
        for (const { product_id, product_qty } of cart) {
            await Product.findOneAndUpdate(
                { product_id: product_id },
                { $inc: { product_qty: -product_qty } }
            );
        }
        return true;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function updateQtyOneProduct(id: string, qty: number) {
    try {
        const updateProduct = await Product.findOneAndUpdate(
            { product_id: id },
            { $inc: { product_qty: qty } },
            { new: true }
        )
        return updateProduct;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function findProductExpiringSoon() {
    try {
        const now = moment();
        const MonthsLater = now.add(6, 'months').toDate();
        const products = await Product.find({
            product_exp: { $lte: MonthsLater }
        })
            .populate({
                path: 'product_category',
            })
            .populate({
                path: 'product_unit',
            })
            .sort({ product_exp: 1 });
        return products;
    } catch (err) {
        console.log(err);
        throw err
    }

}
export async function findQtyProduct(num: number) {
    try {
        const product = await Product.find({ product_qty: num })
            .populate({
                path: 'product_category',
            })
            .populate({
                path: 'product_unit',
            })
            .sort({ updatedAt: -1 });
        return product;
    } catch (err) {
        console.log(err);
        throw err
    }

}
export async function putProduct(product: PD) {
    try {
        const update = await Product.findByIdAndUpdate(
            product._id,
            {
                $set: {
                    product_name: product.product_name,
                    product_size: product.product_size,
                    product_qty: product.product_qty,
                    product_category: product.product_category,
                    product_unit: product.product_unit,
                    product_discount: product.product_discount,
                    product_point: product.product_point,
                    product_price_buy_THB: product.product_price_buy_THB ? product.product_price_buy_THB : 0,
                    product_price_sale1_THB: product.product_price_sale1_THB ? product.product_price_sale1_THB : 0,
                    product_price_sale2_THB: product.product_price_sale2_THB ? product.product_price_sale2_THB : 0,
                    product_price_buy_LAK: product.product_price_buy_LAK ? product.product_price_buy_LAK : 0,
                    product_price_sale1_LAK: product.product_price_sale1_LAK ? product.product_price_sale1_LAK : 0,
                    product_price_sale2_LAK: product.product_price_sale2_LAK ? product.product_price_sale2_LAK : 0,
                    product_exp: product.product_exp,
                    product_mfd: product.product_mfd,
                    product_address: product.product_address
                }
            },
            { new: true }
        )
        return update
    } catch (err) {
        console.log("Error Repo update product"+err);
        throw err
    }


}
export async function findByIdAndDelete(id: string) {
    try {
        const result = await Product.findByIdAndDelete(id);
        return result;
    }
    catch (err) {
        console.log(err);
        throw err
    }

}
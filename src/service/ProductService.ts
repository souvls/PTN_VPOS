import { findByIdAndDelete, findProductById, findProductByKey, findProductExpiringSoon, findProducts, findQtyProduct, ProductPaginate, putProduct, saveProduct, updateQtyOneProduct } from "@/repo/ProductRepo";

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
export async function getProductPaginate(page: number, limit: number) {
    const result = await ProductPaginate(page,limit);
    return result;
}
export async function addNewProduct(product: PD) {
    const result = await saveProduct(product);
    return result
}
// export async function getAllProduct(page: number, limit: number) {
//     const products = await findAllProduct(page, limit);
//     return products
// }
export async function getProducts() {
    const products = await findProducts();
    return products;
}
export async function getProductByID(id: string) {
    const product = await findProductById(id);
    return product
}
export async function getProductBykEY(id: string) {
    const product = await findProductByKey(id);
    return product
}
export async function getProductExpiringSoon() {
    const product = await findProductExpiringSoon();
    return product;
}
export async function getQtyProduct(num: number) {
    const product = await findQtyProduct(num);
    return product;
}
export async function updateOneProduct(product: PD) {
    const update = await putProduct(product);
    return update;
}
export async function updateQty(id: string, qty: number) {
    const updateQty = await updateQtyOneProduct(id, qty);
    return updateQty;
}
export async function deleteProduct(id: string) {
    const result = await findByIdAndDelete(id);
    return result;

}
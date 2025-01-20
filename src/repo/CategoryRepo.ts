import Category from "@/models/Category";

export async function findAllCategory() {
    const categorys = await Category.find();
    return categorys;
}
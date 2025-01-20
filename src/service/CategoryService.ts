import { findAllCategory } from "@/repo/CategoryRepo";

export async function getAllCategory() {
    const categorys = await findAllCategory();
    return categorys;
}
import { findAllUnit } from "@/repo/UnitRepo";

export async function getAllUnit() {
    const unit = await findAllUnit();
    return unit;
}
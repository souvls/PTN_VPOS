import Unit from "@/models/Unit";

export async function findAllUnit() {
    const unit = await Unit.find();
    return unit
}
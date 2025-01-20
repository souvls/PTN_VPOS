import Exchange from "@/models/Exchange";

export async function getExchange() {
    try {
        const exchange = await Exchange.find();
        return exchange;
    } catch (err) {
        console.log(err);
        throw err
    }
}
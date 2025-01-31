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
export async function changeExchange(newrate:number) {
    try {
        await Exchange.updateMany({$set:{exchange_rate:newrate}});
        return true;
    } catch (err) {
        console.log(err);
        throw err
    }
}
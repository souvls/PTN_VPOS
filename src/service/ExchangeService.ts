import { getExchange } from "@/repo/ExchangeRepo";

export async function Exchange_rate() {
    const rate = await getExchange();
    return rate[0].exchange_rate  
}
export async function Change_Exchange_rate(newRate:number) {
    
}
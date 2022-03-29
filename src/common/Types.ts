export interface InputTypes {
    quantity: number,
    buyPrice: number,
    sellPrice: number,
    type: string,
    commodityValue?: number
}

export interface Charges {
    turnOver: number,
    brokerage : number,
    transactionCharges: number,
    sebiCharges: number,
    GSTCharges: number,
    stampCharges: number,
    totalCharges: number,
    pointBreakeven: number,
    netProfit: number,
    CTT?: number,
    pipsBreakeven?: number,
    STTCharges?: number
}

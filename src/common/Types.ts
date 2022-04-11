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

export interface ConfigData {
    brokeragePercentage: number,
        brokerageBuy: number,
        brokerageSell: number,
        stt: number,
        transactionCharges: number,
        sebi: number,
        gstPercentage: number,
        stampCharge: number
}

export interface ChargesItem {
    name: string,
    value: string
}

export interface Category {
    categorySelection: string
} 

export interface appSetingsType {
    publicURL: string,
    baseURL: string,
    appVersion: string,
    serviceURL: string,
    apiEncryptionEnabled: boolean,
    localStorageEncryptionEnabled: boolean
}

export interface ErrorType {
    name: string;
    message: string;
    stack?: string;
}

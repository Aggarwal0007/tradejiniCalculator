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

export interface PORTAL_MENU_TYPE {
    label: string,
    path: string
}

export interface WEBSITE_CONTACTS {
    id: number,
    name: string,
    phone: string,
    email: string,
    subject: string,
    message: string,
    status: number,
    date: string,
    remarks: string | null,
    assignto: string | null
}
export interface LEAD_REPORT {
    id: number,
    name: string,
    contactno: string,
    email: string,
    city: string,
    message: string,
    status: number,
    date: string,
    remarks: string | null,
    assignto: string | null
}


export interface DATE_RANGE {
    startDate: string,
    endDate: string
}

export interface MESSAGE_SUCCESS_RESPONSE {
    status: string,
     d: { 
         message: string; 
        }; 
    }

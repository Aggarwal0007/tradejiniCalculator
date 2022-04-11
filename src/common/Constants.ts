import { getSellPrice } from "./Utils";

export const SCREENS = {
    BASE:"/",
    BROKERAGE_CALCULATOR:"/brokerage-calculator",
    MARGIN_CALCULATOR:"/margin-calculator",
    REFERRAL_CALCULATOR:"/referral-calculator",
    LOGIN:"/portal/login",
    CONTACTUS: "/portal/contactus"
};

export const SEGMENT_LIST = [
    { name:"EQUITES", value: "Equites & FNO" },
    { name:"CURRENCY", value: "Currency" },
    { name:"COMMODITY", value: "Commodities" }
];

export const SEGMENT_TITLE = "Brokerage Calculator";

export const EQUITES_CATEGORY = [
    { name: "EQUITY_INTRADAY", value: "Equity Intraday" },
    { name: "EQUITY_DELIVERY", value: "Equity Delivery" },
    { name: "EQUITY_FUTURES", value: "Futures" },
    { name: "EQUITY_OPTIONS", value: "Options" }
];

export const CURRENCY_CATEGORY = [
    { name: "CURRENCY_FUTURES", value: "Currency Futures" },
    { name: "CURRENCY_OPTIONS", value: "Currency Options" }
];

export const COMMODITY_CATEGORY = [
    { name: "COMMODITY", value: "Commodity" }
];

export const COMMODITY_SELECT_LIST = [
    { name: "ALUMINIUM", value: "ALUMINIUM-5000", buyPrice: 119.6, sellPrice: getSellPrice(119.6) },
    { name: "COPPER", value: "COPPER-2500", buyPrice: 119.6, sellPrice: getSellPrice(119.6) },
    { name: "CRUDEOIL", value: "CRUDEOIL-100", buyPrice: 7073, sellPrice: getSellPrice(7073) },
    { name: "GOLD", value: "GOLD-100", buyPrice: 767.8, sellPrice: getSellPrice(767.8) },
    { name: "GOLDGUINEA", value: "GOLDGUINEA-1", buyPrice: 468.6, sellPrice: getSellPrice(468.6) },
    { name: "GOLDM", value: "GOLDM-10", buyPrice: 468.6, sellPrice: getSellPrice(468.6) },
    { name: "GOLDPETAL", value: "GOLDPETAL-1", buyPrice: 22730, sellPrice: getSellPrice(22730) },
    { name: "LEAD", value: "LEAD-5000", buyPrice: 531.9, sellPrice: getSellPrice(531.9) },
    { name: "NATURALGAS", value: "NATURALGAS-1250", buyPrice: 6822, sellPrice: getSellPrice(6822) },
    { name: "NICKEL", value: "NICKEL-1500", buyPrice: 6822, sellPrice: getSellPrice(6822) },
    { name: "SILVER", value: "SILVER-30", buyPrice: 31165, sellPrice: getSellPrice(31165) },
    { name: "SILVERM", value: "SILVERM-5", buyPrice: 25374, sellPrice: getSellPrice(25374) },
    { name: "SILVERMIC", value: "SILVERMIC-1", buyPrice: 31585, sellPrice: getSellPrice(31585) },
    { name: "ZINC", value: "ZINC-5000", buyPrice: 3160, sellPrice: getSellPrice(3160) },
];

export const CHARGE_LIST: Record<string, any> = {
    EQUITY_INTRADAY: [
        { name: "Charges", value: "Equity Intraday" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    EQUITY_DELIVERY: [
        { name: "Charges", value: "Equity Delivery" },
        { name: "STT/CTT", value: "0.1% on the Buy and Sell" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.015% on Buyer - Rs.1500 per Cr" },
    ],
    EQUITY_FUTURES: [
        { name: "Charges", value: "Equity Futures" },
        { name: "STT/CTT", value: "0.01% on Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 200/Crore BSE: 200/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.002% on Buyer - Rs.200 per Cr" },
    ],
    EQUITY_OPTIONS: [
        { name: "Charges", value: "Equity Options" },
        { name: "STT/CTT", value: "0.05% on Sell Side(on Premium)" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 5300/Crore BSE: 2500/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    CURRENCY_FUTURES: [
        { name: "Charges", value: "Currency Futures" },
        { name: "STT/CTT", value: "No STT" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 90/Crore MCS-SX: 125/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.0001% on Buyer - Rs. 10 Per Cr" },
    ],
    CURRENCY_OPTIONS: [
        { name: "Charges", value: "Currency Options" },
        { name: "STT/CTT", value: "No STT" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 3500/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.0001% on Buyer - Rs. 10 Per Cr" },
    ],
    COMMODITY_CATEGORY: [
        { name: "Charges", value: "Commodity" },
        { name: "CTT", value: "0.01% on Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "MCX: 350/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.002% on Buyer - Rs.200 per Cr" },
    ],
};

export const IMAGES = {
    LOGO:"assets/login_logo.png",
    USER_ICON:"assets/user_icon.png",
};

export const WINDOW_STORAGE = {
    USER_NAME:"USER_NAME",
    LOGIN_STATUS: "LOGIN_STATUS",
    APP_LANG: "APP_LANG",
    APP_THEME: "APP_THEME",

};

export const THEME = {
    LIGHT: "light",
    DARK: "dark"
};

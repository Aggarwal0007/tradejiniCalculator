export const SCREENS = {
    BASE:"/",
    BROKERAGE_CALCULATOR:"/brokerage-calculator",
    MARGIN_CALCULATOR:"/referral-calculator",
    REFERRAL_CALCULATOR:"/margin-calculator"
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
    { name: "COMMODITY_CATEGORY", value: "Commodity" }
];

export const COMMODITY_SELECT_LIST = [
    { name: "ALUMINIUM", value: 5000 },
    { name: "COPPER", value: 2500 },
    { name: "CRUDEOIL", value: 100 },
    { name: "GOLD", value: 100 },
    { name: "GOLDGUINEA", value: 1 },
    { name: "GOLDM", value: 10 },
    { name: "GOLDPETAL", value: 1 },
    { name: "LEAD", value: 5000 },
    { name: "NATURALGAS", value: 1250 },
    { name: "NICKEL", value: 1500 },
    { name: "SILVER", value: 30 },
    { name: "SILVERM", value: 5 },
    { name: "SILVERMIC", value: 1 },
    { name: "ZINC", value: 5000 },
];

export const CHARGE_LIST: Record<string, any> = {
    EQUITY_INTRADAY: [
        { name: "Charges", value: "Equity Intraday" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    EQUITY_DELIVERY: [
        { name: "Charges", value: "Equity Delivery" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    EQUITY_FUTURES: [
        { name: "Charges", value: "Equity Futures" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    EQUITY_OPTIONS: [
        { name: "Charges", value: "Equity Options" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    CURRENCY_FUTURES: [
        { name: "Charges", value: "Currency Futures" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    CURRENCY_OPTIONS: [
        { name: "Charges", value: "Currency Options" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
    COMMODITY_CATEGORY: [
        { name: "Charges", value: "Commodity" },
        { name: "STT/CTT", value: "0.025% on the Sell Side" },
        { name: "Transaction/ Turnover Charges", value: "NSE: 345/Crore & BSE: 275/Crore" },
        { name: "SEBI Charges", value: "Rs 10/- Per Crore Turnover" },
        { name: "GST", value: "18% on Brokerage & Transaction Charges" },
        { name: "Stamp duty(w.e.f 01st Jul 2020)", value: "0.003% on Buyer - Rs.300 Per Cr" },
    ],
};

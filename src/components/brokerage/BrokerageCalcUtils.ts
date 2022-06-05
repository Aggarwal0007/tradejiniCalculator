import { ConfigData } from "../../common/Types";
import { configDetails } from "../../common/Dataconfig";
import { EQUITES_CATEGORY } from "../../common/Constants";

const getConfigData = (category: string) => {
    const dataResponse:Record<string, ConfigData> = configDetails.getBrokerageDetails();
    return dataResponse[ category ];
};


// const BROKERAGE_CONFIG_VALUES: Record<string, ConfigData> = {
//     EQUITY_INTRADAY: {
//         brokeragePercentage: 0.05,
//         brokerageBuy: 20,
//         brokerageSell: 20,
//         stt: 0.00025,
//         transactionCharges: 345,
//         sebi: 10,
//         gstPercentage: 0.18,
//         stampCharge: 0.00003
//     },
//     EQUITY_DELIVERY: {
//         brokeragePercentage: 0.1,
//         brokerageBuy: 20,
//         brokerageSell: 20,
//         stt: 0.001,
//         transactionCharges: 345,
//         sebi: 10,
//         gstPercentage: 0.18,
//         stampCharge: 0.00015
//     },
//     EQUITY_FUTURES: {
//         brokeragePercentage: 0.05,
//         brokerageBuy: 20,
//         brokerageSell: 20,
//         stt: 0.0001,
//         transactionCharges: 200,
//         sebi: 10,
//         gstPercentage: 0.18,
//         stampCharge: 0.00002
//     },
//     EQUITY_OPTIONS: {
//         brokeragePercentage: 0.1,
//         brokerageBuy: 20,
//         brokerageSell: 20,
//         stt: 0.0005,
//         transactionCharges: 5300,
//         sebi: 10,
//         gstPercentage: 0.18,
//         stampCharge: 0.00003
//     },
//     COMMODITY_CATEGORY: {
//         brokeragePercentage: 0.05,
//         brokerageBuy: 20,
//         brokerageSell: 20,
//         stt: 0.0001,
//         transactionCharges: 350,
//         sebi: 10,
//         gstPercentage: 0.18,
//         stampCharge: 0.00002
//     }, 
//     CURRENCY_FUTURES: {
//         brokeragePercentage: 0.05,
//         brokerageBuy: 20,
//         brokerageSell: 20,
//         stt: 0,
//         transactionCharges: 90,
//         sebi: 10,
//         gstPercentage: 0.18,
//         stampCharge: 0.001
//     },
//     CURRENCY_OPTIONS: {
//         brokeragePercentage: 0.1,
//         brokerageBuy: 20,
//         brokerageSell: 20,
//         stt: 0,
//         transactionCharges: 3500,
//         sebi: 10,
//         gstPercentage: 0.18,
//         stampCharge: 0.001
//     }
// };

// const BROKERAGE_CONFIG_VALUES = BROKERAGE_CONFIG_DETAILS;
// console.log("BROKERAGE_CONFIG_VALUES:", BROKERAGE_CONFIG_VALUES);

const decimalConversion = (value: number, decimalPoints: number = 2) => {
    const covertedValue = value.toFixed(decimalPoints);
    return Number(covertedValue);
};

export const getTurnOver = (qty: number, buyPrice: number, sellPrice: number) => {
    return ( qty * buyPrice ) + ( qty * sellPrice );
};

// export const getBrokerage = (turnOver: number, configData: ConfigData) => {
   
//     const brokerage1 = ( (turnOver) * ( configData.brokeragePercentage * ( 1 / 100 ) ) );

//     const brokerageBuy = configData.brokerageBuy > 0 ? 20 : 0;
//     const brokerageSell = configData.brokerageSell > 0 ? 20 : 0;
//     const brokerage2 = brokerageBuy + brokerageSell;
//     const brokerage = brokerage2 < brokerage1 ? brokerage2 : brokerage1;
//     return brokerage;
// };

//For getting buyprice and sell price

export const getBrokerage = (turnOver: number, configData: ConfigData, buyPrice: number, sellPrc:number) => {
   
    const brokerage1 = ( (turnOver) * ( configData.brokeragePercentage * ( 1 / 100 ) ) );
    const brokerageBuy = buyPrice > 0 ? 20 : 0;
    const brokerageSell = sellPrc > 0 ? 20 : 0;
    const brokerage2 = brokerageBuy + brokerageSell;
    const brokerage = brokerage2 < brokerage1 ? brokerage2 : brokerage1;
    return brokerage;
};

export const getSTT = (
    qty: number, 
    sellPrice: number, 
    configData: ConfigData, 
    category: string, 
    turnover: number
) => {
    let sttValue:number = 0;
    if (category === EQUITES_CATEGORY[ 1 ].name) {
        const sttVal = ((0.1*(1/100) )*(turnover)); 
        sttValue = Math.round(sttVal);
    } else {
        sttValue = Math.round( configData.stt * qty * sellPrice );       
    }
    return sttValue;
};

export const getTransactionCharges = (turnOver: number, configData:ConfigData) => {
    let transCharges = ( ( configData.transactionCharges ) * ( ( turnOver / 10000000 ) ) );
    transCharges = Number(transCharges.toFixed(1));
    
    return transCharges;
};

export const getSEBICharges = (turnOver: number, configData:ConfigData) => {
    const sebiCharges = ( ( configData.sebi ) * ( turnOver / 10000000 ) );
    return sebiCharges;
};

export const getGSTCharges = (
    transactionCharges: number, 
    brokerage:number, 
    configData:ConfigData 
) => {
    const GSTCharges = ( (configData.gstPercentage ) * ( brokerage + transactionCharges ) );
    return GSTCharges;
};

export const getStampCharges = (qty: number, buyPrice: number, configData:ConfigData) => {
    const stampCharges = configData.stampCharge * qty * buyPrice ; 
    return stampCharges;
};

export const calculateEquityBrokerage = (
    qty: number, 
    buyPrice: number, 
    sellPrice: number, 
    category: string
) => {

    const configData = getConfigData(category);

    let turnOver = getTurnOver(qty, buyPrice, sellPrice );

    // const brokerage = getBrokerage(turnOver, configData);

    // Passing buyprice and sell price

    let brokerage = getBrokerage(turnOver, configData, buyPrice, sellPrice);

    let STTCharges = getSTT(qty, sellPrice, configData, category, turnOver);

    let transactionCharges = getTransactionCharges(turnOver, configData);

    let sebiCharges = getSEBICharges(turnOver, configData);

    let GSTCharges = getGSTCharges(transactionCharges, brokerage, configData);

    let stampCharges = getStampCharges(qty, buyPrice, configData);

    let totalCharges: number = Number(brokerage) + Number(STTCharges.toFixed(1)) + transactionCharges +
    GSTCharges + sebiCharges + stampCharges;

    const totalSellValue: number = ( qty * sellPrice ) - ( qty * buyPrice );

    let netProfit = totalSellValue - totalCharges;
    
    let pointBreakeven:number = 0;
    if (category === EQUITES_CATEGORY [ 0 ].name) {
        pointBreakeven = ( ( buyPrice *qty ) + ( totalCharges / qty ) ) - ( qty * buyPrice );
    } else {
        pointBreakeven = (totalCharges/qty);
    }
        
    brokerage = Number(decimalConversion(brokerage));
    turnOver = Number(decimalConversion(turnOver));
    STTCharges = Number(decimalConversion(STTCharges, 0));
    transactionCharges = Number(decimalConversion(transactionCharges, 1));
    GSTCharges = Number(decimalConversion(GSTCharges));
    sebiCharges = Number(decimalConversion(sebiCharges));
    stampCharges = Number(decimalConversion(stampCharges));
    totalCharges = Number(decimalConversion(totalCharges));
    netProfit = Number(decimalConversion(netProfit));
    pointBreakeven = Number(decimalConversion(pointBreakeven));

    return {
        turnOver,
        brokerage,
        STTCharges,
        transactionCharges,
        GSTCharges,
        sebiCharges,
        stampCharges,
        totalCharges,
        netProfit,
        pointBreakeven
    };
   
};

export const calculateCommodityBrokerage = (
    qty: number, 
    buyPrc: number, 
    sellPrc: number,
    comValue: number, 
    category: string
) => {

    const configData = getConfigData(category);

    const quantity = qty * comValue;

    let CTT = quantity * sellPrc * (0.01*1/100);

    CTT = Number((CTT).toFixed(2)); 

    let turnOver = ( quantity * buyPrc ) + ( quantity * sellPrc );

    // const brokerage = getBrokerage(turnOver, configData);

    // Passing buyprice and sell price

    let brokerage = getBrokerage(turnOver, configData, buyPrc, sellPrc);

    let STTCharges = getSTT(quantity, sellPrc, configData, category, turnOver);

    let transactionCharges = getTransactionCharges(turnOver, configData);

    let sebiCharges = getSEBICharges(turnOver, configData);

    let GSTCharges = ( configData.gstPercentage ) * ( brokerage + transactionCharges + sebiCharges );

    let stampCharges = getStampCharges(quantity, buyPrc, configData);

    // const swach = ((0.05*(1/100))*(brokerage + transactionCharges)); 

    let totalCharges = brokerage + transactionCharges + GSTCharges + CTT + sebiCharges + stampCharges;

    let pointBreakeven = ( totalCharges / quantity );
    
    let netProfit = ((quantity * sellPrc ) - (quantity *buyPrc ) - totalCharges );
       
    STTCharges = Number(STTCharges.toFixed(0));
    sebiCharges = decimalConversion(sebiCharges);
    totalCharges = decimalConversion(totalCharges);
    stampCharges = decimalConversion(stampCharges);
    GSTCharges = decimalConversion(GSTCharges);
    transactionCharges = decimalConversion(transactionCharges);
    netProfit = Number(decimalConversion(netProfit));
    pointBreakeven = Number(decimalConversion(pointBreakeven));
    brokerage = Number(decimalConversion(brokerage));
    turnOver = Number(decimalConversion(turnOver));

    return {
        turnOver,
        brokerage,
        transactionCharges,
        sebiCharges,
        GSTCharges,
        stampCharges,
        totalCharges,
        pointBreakeven,
        netProfit,
        CTT, 
        STTCharges
    };
};

export const calculateCurrencyBrokerage = (
    qty: number, 
    buyPrc: number, 
    sellPrc: number,
    category: string
) => {
    
    const configData = getConfigData(category);

    let turnOver = ( ( qty * buyPrc ) + ( qty * sellPrc ) ) * 1000;

    // const brokerage = getBrokerage(turnOver, configData);
    
    // Passing buyprice and sell price

    let brokerage = getBrokerage(turnOver, configData, buyPrc, sellPrc);

    let transactionCharges = getTransactionCharges(turnOver, configData);

    let sebiCharges = getSEBICharges(turnOver, configData);

    let GSTCharges = ( configData.gstPercentage ) * ( brokerage + transactionCharges );

    let stampCharges = getStampCharges(qty, buyPrc, configData);

    // const swach = ((0.05*(1/100))*(brokerage + transactionCharges)); 

    let totalCharges = brokerage + transactionCharges + GSTCharges + sebiCharges + stampCharges;

    let pointBreakeven = ( totalCharges / ( qty * 1000 ) );

    let pipsBreakeven = pointBreakeven/0.0025;
    pipsBreakeven = Number(pipsBreakeven.toFixed(0));
    
    let netProfit = ( ( ( ( qty * sellPrc ) - ( qty * buyPrc ) ) * 1000 ) - totalCharges );

    transactionCharges = decimalConversion(transactionCharges);
    transactionCharges = Number(transactionCharges.toFixed(2));
    pointBreakeven = decimalConversion(pointBreakeven);
    pointBreakeven = Number(pointBreakeven.toFixed(4));
    netProfit = Number(decimalConversion(netProfit));
    GSTCharges = decimalConversion(GSTCharges);
    GSTCharges = Number(GSTCharges.toFixed(2));
    sebiCharges = decimalConversion(sebiCharges);
    sebiCharges = Number(sebiCharges.toFixed(2));
    stampCharges = decimalConversion(stampCharges);
    stampCharges = Number(stampCharges.toFixed(2));
    totalCharges = decimalConversion(totalCharges);
    totalCharges = Number(totalCharges.toFixed(2));
    brokerage = Number(decimalConversion(brokerage));
    turnOver = Number(decimalConversion(turnOver));

    return {

        turnOver,
        brokerage,
        transactionCharges,
        sebiCharges,
        GSTCharges,
        stampCharges,
        totalCharges,
        pointBreakeven,
        netProfit,
        pipsBreakeven
    };
	
};

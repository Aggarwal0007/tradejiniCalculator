import { SEARCH_SYMBOL, SymbolStoreResponse } from "../../../common/Types";
import { splitId, splitResponse } from "./SearchUtils";

export default class SymbolParser {


    private static allSymbols: Array<SEARCH_SYMBOL> = [
    ];

    // public static addSymbols(symbols: string) {
    //     const parsedData = this.parseSymbols(symbols);
    //     this.allSymbols = this.allSymbols.concat(parsedData);
    // }

    public static addSymbols(resData: SymbolStoreResponse) {
        console.log("resData", resData);
        const parsedData = this.parseSymbols(resData);
        this.allSymbols = this.allSymbols.concat(parsedData);
    }

    public static searchSymbols(query = "") {
        let regexStr = `${query.replaceAll(" ", ".*")}`;
        if (!isNaN(Number(query))) {
            regexStr = `.*${regexStr}`;
        }
        const result: Array<SEARCH_SYMBOL> = [
        ];

        const regex = new RegExp(`^${regexStr}`, "i");

        this.allSymbols.forEach((sym: SEARCH_SYMBOL) => {
            if (regex.test(`${sym.dispName} ${sym.weekly} ${sym.exchange}`)) {
                result.push(sym);
            }
        });

        return result;
    }

    // private static parseSymbols(symbols: string) {

    //     const symArrayData: Array<Array<string>> = splitResponse(symbols, "~", "|");

    //     const [
    //         keys, ...values
    //     ] = symArrayData;

    //     const parsedSymArrayData: Array<SEARCH_SYMBOL> = values.map((value: Array<string>) => {

    //         const unMapSymResp = keys.reduce((obj: { [key: string]: string }, key: string, inx: number) => {
    //             obj[ key ] = value[ inx ];
    //             return obj;
    //         }, {});

    //         const unMapSymId = splitId(unMapSymResp.id);
    //         const unMapSym = Object.assign({}, unMapSymResp, unMapSymId);

    //         const dispName = unMapSym.dispName ? unMapSym.dispName : "";
    //         const excToken = unMapSym.excToken ? unMapSym.excToken : "";
    //         const lot = unMapSym.lot ? unMapSym.lot : "";
    //         const tick = unMapSym.tick ? unMapSym.tick : "";
    //         const asset = unMapSym.asset ? unMapSym.asset : "";
    //         const expiry = unMapSym.expiry ? unMapSym.expiry : "";
    //         const strike = unMapSym.strike ? unMapSym.strike : "";
    //         const optType = unMapSym.optType ? unMapSym.optType : "";
    //         const weekly = unMapSym.weekly ? unMapSym.weekly : "";
    //         const instrument = unMapSym.instrument ? unMapSym.instrument : "";
    //         const symbol = unMapSym.symbol ? unMapSym.symbol : "";
    //         const exchange = unMapSym.exchange ? unMapSym.exchange : "";

    //         const symObj = {
    //             dispName: dispName,
    //             excToken: excToken,
    //             lot: lot,
    //             tick: tick,
    //             asset: asset,
    //             expiry: expiry,
    //             strike: strike,
    //             optType: optType,
    //             weekly: weekly,
    //             instrument: instrument,
    //             symbol: symbol,
    //             exchange: exchange
    //         };
            
    //         return symObj;
    //     });
    //     return parsedSymArrayData;

    // }

    private static parseSymbols(resp: SymbolStoreResponse) {

        const symArrayData: Array<Array<string>> = splitResponse(resp.data, "~", "|");

        const [
            keys, ...values
        ] = symArrayData;

        const parsedSymArrayData: Array<SEARCH_SYMBOL> = values.map((value: Array<string>) => {

            const unMapSymResp = keys.reduce((obj: { [key: string]: string }, key: string, inx: number) => {
                obj[ key ] = value[ inx ];
                return obj;
            }, {});

            const unMapSymId = splitId(unMapSymResp.id, resp.idFormat);
            const unMapSym = Object.assign({}, unMapSymResp, unMapSymId);

            const dispName = unMapSym.dispName ? unMapSym.dispName : "";
            const excToken = unMapSym.excToken ? unMapSym.excToken : "";
            const lot = unMapSym.lot ? unMapSym.lot : "";
            const tick = unMapSym.tick ? unMapSym.tick : "";
            const asset = unMapSym.asset ? unMapSym.asset : "";
            const expiry = unMapSym.expiry ? unMapSym.expiry : "";
            const strike = unMapSym.strike ? unMapSym.strike : "";
            const optType = unMapSym.optType ? unMapSym.optType : "";
            const weekly = unMapSym.weekly ? unMapSym.weekly : "";
            const instrument = unMapSym.instrument ? unMapSym.instrument : "";
            const symbol = unMapSym.symbol ? unMapSym.symbol : "";
            const exchange = unMapSym.exchange ? unMapSym.exchange : "";

            const symObj = {
                dispName: dispName,
                excToken: excToken,
                lot: lot,
                tick: tick,
                asset: asset,
                expiry: expiry,
                strike: strike,
                optType: optType,
                weekly: weekly,
                instrument: instrument,
                symbol: symbol,
                exchange: exchange
            };
            
            return symObj;
        });
        return parsedSymArrayData;

    }
}

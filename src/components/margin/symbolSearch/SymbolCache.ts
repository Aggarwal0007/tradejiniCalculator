import { AppSettings } from "../../../common/AppSettings";
import { SPAN_CALCULATOR } from "../../../communicator/ServiceUrls";
import { storage } from "index";
import SymbolParser from "./SymbolParser";
import { SymbolStoreResponse } from "common/Types";


export default class SymbolCache {

    static async getSymbolStore() {

        let apiVersion = storage.getFromLocalStorage("search_version");

        if (!apiVersion) apiVersion = 0;

        const apiURL = `${AppSettings.serviceURL}${SPAN_CALCULATOR.SYMBOL_SEARCH}?version=${apiVersion}`;

        return await fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            return res.json();
        })
            .then((res) => {
                return res;
            })
            .catch((eror) => {
                return console.log("err", eror);
            });
    }

    static async loadSymbolStore() {

        const symbolStore = await this.getSymbolStore();

        // if (symbolStore && symbolStore.d && symbolStore.d.updated) {
        //     storage.storeToLocalStorage("search_version", symbolStore.d.version);
        //     if (symbolStore.d.data) {
        //         console.log("stoargae update");
        //         storage.storeToLocalStorage("search_results_one", symbolStore.d.data[ 0 ]);
        //         storage.storeToLocalStorage("search_results_two", JSON.stringify(symbolStore.d.data[ 1 ]));
        //     }   
        // } else {
        //     const searchResults = storage.getFromLocalStorage("search_results");
        //     console.log("searchResults test", searchResults);
        // }
        // if (symbolStore && symbolStore.d && symbolStore.d.updated) {
        //     storage.storeToLocalStorage("search_version", symbolStore.d.version);
        //     storage.storeToLocalStorage("search_values", )
        //     SymbolParser.addSymbols(symbolStore.d.future && symbolStore.d.future);
        // }

        // console.log("symbolStore new", symbolStore);
        // if (symbolStore && symbolStore.d) {
        //     SymbolParser.addSymbols(symbolStore.d.future);
        // }

        if (symbolStore && symbolStore.d && symbolStore.d.data) {
            symbolStore.d.data.map((item: SymbolStoreResponse) => {
                return SymbolParser.addSymbols(item);
            });
        }
    }
}

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
        if (symbolStore && symbolStore.d && symbolStore.d.data) {
            symbolStore.d.data.map((item: SymbolStoreResponse) => {
                return SymbolParser.addSymbols(item);
            });
        }
    }
}

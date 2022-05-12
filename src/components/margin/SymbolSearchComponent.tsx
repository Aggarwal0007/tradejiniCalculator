import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { SEARCH_SYMBOL } from "../../common/Types";
import SymbolParser from "./symbolSearch/SymbolParser";

const SymbolSearch = (props: 
    { 
        parentCBQuery: (arg0: string) => void;
         parentCB: (arg0: SEARCH_SYMBOL) => void; 
    }) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const [
        searchQuery, setSearchQuery
    ] = useState<string>("");

    const [
        searchResults, setSearchResults
    ] = useState<SEARCH_SYMBOL[]>();

    const [
        showResultWindow, setShowResultWindow
    ] = useState<boolean>(false);

    const [
        isSymbolSelected, setIsSymbolSelected
    ] = useState(false);

    useEffect(() => {
        if (searchQuery && searchQuery.length >= 3) {
            console.log("search Result", SymbolParser.searchSymbols(searchQuery));
            setShowResultWindow(true);
            setSearchResults(SymbolParser.searchSymbols(searchQuery));
        } else {
            setShowResultWindow(false);
            setSearchResults([
            ]);
        }
    }, [
        searchQuery
    ]);

    const onChangeSearch = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        const value = evt.target.value;
        const regexAlphaNumeric = /^[a-z0-9 &.\\-]+$/i;
        setIsSymbolSelected(false);
        setSearchQuery(value);
        props.parentCBQuery(value);
        if (value && (!regexAlphaNumeric.test(value) ||
          (value.length === 1 && value.trim() === "")))            
            return;

        
        if (value.length )
            setSearchQuery(value);
    
    };

    const onClickSearchRow = (symbol: SEARCH_SYMBOL) => {
        console.log("symbol", symbol);
        setSearchQuery(symbol.dispName);
        setShowResultWindow(false);
        setIsSymbolSelected(true);
        props.parentCB(symbol);
    };

    const exitSearchWindow = () => {
        setShowResultWindow(false);
        setSearchQuery("");
    };

    useEffect(() => {
        const handleClickOutside = (evt: { target: any }) => {
            if (modalRef.current && !modalRef.current.contains(evt.target)) {
                exitSearchWindow();
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [
        showResultWindow 
    ]);

    
    return (
        <Box>
            
            <div className="symbol-search-block">
                <div className="symbol-label">
                Symbol:
                </div>
                <div className="symbol-input">
                    <input 
                        className="search-input"
                        placeholder="search TCS or TCS 26MAY or 26MAY FUT"
                        onChange={(evt) => {
                            return onChangeSearch(evt); 
                        }}
                        value={searchQuery}
                    />
                    {
                        showResultWindow && !isSymbolSelected?
                            <div 
                                ref = {modalRef}
                                className="search-results-window"
                            >
                                {
                                    searchResults && searchResults.length ?
                                        searchResults.map((item, idx) => {
                                            return (
                                                <div 
                                                    className="search-result-row"
                                                    key= {idx}
                                                    onClick={() => {
                                                        return onClickSearchRow(item); 
                                                    }}
                                                >
                                                    <div className="symbol-display">
                                                        {item.dispName}
                                                    </div>
                                                    <div className="symbol-exchange">
                                                        {item.exchange}
                                                    </div>
                                                </div>
                                            );
                                        })
                                        :
                                        <div className="error-search-message">
                                        No data available
                                        </div>
                                }
                            </div>
                            :
                            null
                    }
                </div>
                
            </div>
              
        </Box>

    );
};

export default SymbolSearch;

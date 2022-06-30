import { Box, Button, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ErrorType, RequestSymbol, SEARCH_SYMBOL } from "common/Types";
import { hideLoader, showLoader, showSnackBar } from "../../state/AppConfigReducer";
import React, { useEffect, useRef, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import MarginResultsTable from "./symbolSearch/MarginResultsTable";
import SelectedSymbolListTable from "./symbolSearch/SelectedSymbolListTable";
import { SPAN_CALCULATOR } from "communicator/ServiceUrls";
import SymbolSearch from "./SymbolSearchComponent";
import { useDispatch } from "react-redux";

type MarginResults = {
    expo: string,
    expo_trade: string,
    request_time: string,
    span: string,
    span_trade: string,
    stat: string
}

type ListedSyms = {
    dispQty: string,
    dispSymbol: string,
    exc_id: string,
    exch: string,
    exd: string,
    expo: string,
    expo_trade: string,
    instname: string,
    lotSize: string,
    netqty: string,
    prd: string,
    request_time: string,
    span: string,
    span_trade: String,
    stat: string,
    symname: string
}

function MarginCalculator() {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();

    const [
        symbolList, setSymbolList
    ] = useState<RequestSymbol[]>();

    const [
        action, setAction
    ] = useState<string>("buy");

    const [
        selectedLotSize, setSelectedLotSize
    ] = useState<string>("");

    const [
        netQty, setNetQty
    ] = useState<string>("");

    const [
        selectedSymbol, setSelectedSymbol
    ] = useState<SEARCH_SYMBOL>();

    const [
        marginResults, setMarginResults
    ] = useState<MarginResults>({
        "expo": "",
        "expo_trade": "",
        "request_time": "",
        "span": "",
        "span_trade": "",
        "stat": ""
    });

    const [
        listedSyms, setListedSyms
    ] = useState<ListedSyms[]>([
    ]);

    const [
        marginBenefit, setMarginBenefit
    ] = useState<number>(0);

    const symbolListRef = useRef<RequestSymbol[]>([
    ]);

    const listedScrips = useRef<ListedSyms[]>([
    ]);

    const handleChange = (
        evt: React.MouseEvent<HTMLElement>,
        newAction: string,
    ) => {
        setAction(newAction);
    };


    const onchangeQty = (evt: React.ChangeEvent<HTMLInputElement>) => {

        const regExp = /^[0-9\b]+$/;
        const value = evt.target.value;
        if (value === "" || regExp.test(value))
            setNetQty(value);

    };

    function getMonthName(month: string) {
        const monthNumber = Number(month);
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString("default", { month: "short" });
    }

    const convertExpDate = (date?: string) => {
        if (date) {
            const splitDate = date.split("-");
            const monthName = getMonthName(splitDate[ 1 ]);
            return `${splitDate[ 2 ]}-${monthName.toUpperCase()}-${splitDate[ 0 ]}`;
        }
        return "";
    };

    const showErrorMessage = (message: string, isSuccess = false) => {
        dispatch(showSnackBar({
            message: message,
            status: isSuccess ? "success" : "error"
        }));
    };

    const successCB = (response: any, symData: RequestSymbol[]) => {
        setSymbolList(Object.assign([
        ], symData));
        dispatch(hideLoader());
        console.log("symbolList Res", symData);
        console.log("getResponse", response);
        setMarginResults(response.d);
    };

    const errorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("error");
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const getMarginResults = (isDelete = false, symsArr = [
    ]) => {

        const syms: RequestSymbol[] = Object.assign([
        ], symsArr);

        if (!isDelete) {
            const netQuantity: number = Number(selectedSymbol?.lot) * Number(netQty);

            const totalQty: string = netQuantity as unknown as string;

            const selectedSym: RequestSymbol = {
                "prd": "M",
                "exch": selectedSymbol?.exchange,
                "symname": selectedSymbol?.symbol,
                "instname": selectedSymbol?.instrument,
                "exd": convertExpDate(selectedSymbol?.expiry),
                "netqty": action === "buy" ? `${totalQty}` : `-${totalQty}`,
                "exc_id": selectedSymbol?.excToken,
                "dispSymbol": selectedSymbol?.dispName,
                "lotSize": selectedSymbol?.lot,
                "dispQty": netQty
            };

            if (selectedSymbol?.asset === "option") {
                selectedSym.optt = selectedSymbol?.optType;
                selectedSym.strprc = selectedSymbol?.strike;
            }
            syms.push(selectedSym);

        } else if (!symsArr.length) {
            setMarginResults({
                "expo": "",
                "expo_trade": "",
                "request_time": "",
                "span": "",
                "span_trade": "",
                "stat": ""
            });
            setListedSyms([
            ]);
            return;
        }

        dispatch(showLoader());
        const request = new ServiceRequest();
        request.addData({
            actid: "DUMMY",
            pos: JSON.stringify(isDelete ? symsArr : syms)
        });

        symbolListRef.current = syms;

        fetchAPI.placePOSTRequest(
            SPAN_CALCULATOR.GET_SPAN_CALC_RESULTS,
            request,
            (resp) => {
                return successCB(resp, syms);
            },
            errorCB
        );
    };

    const deleteSymbolRow = (selectedRow: RequestSymbol) => {

        const existingSymbolList = Object.assign([
        ], symbolList);

        const index = existingSymbolList.findIndex((item: RequestSymbol) => {
            return item.exc_id === selectedRow.exc_id;
        });

        if (index !== -1) {
            existingSymbolList.splice(index, 1);
            showErrorMessage("Symbol Deleted!!", true);

            setSymbolList(Object.assign([
            ], existingSymbolList));


            getMarginResults(true, existingSymbolList);
        }

    };

    const onClickAddBtn = () => {

        if (selectedSymbol && selectedSymbol.exchange && netQty && action) {

            const existingSymbolList = Object.assign([
            ], symbolList);

            const found = existingSymbolList.some((item: RequestSymbol) => {
                return item.exc_id === selectedSymbol?.excToken;
            });

            found ? showErrorMessage("Symbol Exists!!") : getMarginResults(false, existingSymbolList);

        } else {
            showErrorMessage("Please select any script");
        }

    };

    const getSymbolInfo = (symDetails: SEARCH_SYMBOL) => {
        if (symDetails) {
            setSelectedLotSize(symDetails.lot);
            setSelectedSymbol(symDetails);
        }

    };

    const clearfields = (searchQuery: string) => {
        if (!searchQuery) {
            setSelectedLotSize("");
        }
    };


    const eachScripSuccessCB = (response: any, symData: RequestSymbol) => {


        const exisselectedScrips = Object.assign([
        ], listedScrips.current);

        dispatch(hideLoader());
        if (response && response.status === "ok" && response.d) {
            const symResultsInfo = { ...symData, ...response.d };
            exisselectedScrips.push(symResultsInfo);
            listedScrips.current = exisselectedScrips;
            setListedSyms(exisselectedScrips);
            console.log("symbolListRefsymbolListRef eachScripSuccessCB", exisselectedScrips);

        }
    };

    const eachScripErrorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("error");
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const callRequestToEachScrip = (selectedSymList: RequestSymbol[]) => {
        console.log("symbolListRefsymbolListRef callRequestToEachScrip", selectedSymList);
        if (selectedSymList && selectedSymList.length) {
            selectedSymList.map((item: RequestSymbol) => {
                const netQuantity: number = Number(item?.lot) * Number(netQty);

                const totalQty: string = netQuantity as unknown as string;

                const selectedSym: RequestSymbol = {
                    "prd": "M",
                    "exch": item?.exchange,
                    "symname": item?.symbol,
                    "instname": item?.instrument,
                    "exd": convertExpDate(item?.expiry),
                    "netqty": action === "buy" ? `${totalQty}` : `-${totalQty}`,
                    "exc_id": item?.excToken,
                    "dispSymbol": item?.dispName,
                    "lotSize": item?.lot,
                    "dispQty": netQty
                };

                if (item?.asset === "option") {
                    selectedSym.optt = item?.optType;
                    selectedSym.strprc = item?.strike;
                }
                dispatch(showLoader());
                const request = new ServiceRequest();
                request.addData({
                    actid: "DUMMY",
                    pos: JSON.stringify([
                        item
                    ])
                });


                fetchAPI.placePOSTRequest(
                    SPAN_CALCULATOR.GET_SPAN_CALC_RESULTS,
                    request,
                    (resp) => {
                        return eachScripSuccessCB(resp, item);
                    },
                    eachScripErrorCB
                );

                return null;
            });


        }
    };

    useEffect(() => {
        listedScrips.current = [
        ];
        callRequestToEachScrip(symbolListRef.current);
    }, [
        symbolListRef.current
    ]);

    useEffect(() => {
        let totalMargin = 0;
        console.log(" listedSyms", listedSyms);
        if (listedSyms && listedSyms.length) {
            listedSyms.map((item: ListedSyms) => {
                totalMargin = totalMargin + Number(item.expo) + Number(item.span);
                return totalMargin;
            });
        }

        const scripMarignTotal = Number(totalMargin.toFixed(2));
        const multiScripMarginTotal = Number(marginResults.expo) + Number(marginResults.span);

        const MarginBenefit = scripMarignTotal - multiScripMarginTotal;

        setMarginBenefit(MarginBenefit);
    }, [
        listedSyms
    ]);
    return (
        <Grid container className="margin-calculator-root">
            <Grid item xs={12} className="margin-header">
                <div className="margin-header-title">
                    Margin Calculator
                </div>
            </Grid>
            <Grid item xs={12} className="margin-input-section">
                <Grid container className="margin-input-container" spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>

                        <SymbolSearch
                            parentCB={getSymbolInfo}
                            parentCBQuery={clearfields}
                        />

                        <div className="lots-block">
                            <div className="lots-label">
                                Lots:
                            </div>
                            <div className="lots-input">
                                <input
                                    type="text"
                                    className="margin-calc-lotsize common-input"
                                    onChange={onchangeQty}
                                    value={netQty}
                                    placeholder="No of Lots"
                                />
                                {
                                    selectedLotSize ?
                                        <div className="lot-size-info">

                                            Lot Size: {selectedLotSize}
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>

                        <div className="toggle-btn-blk">
                            <div className="toggle-blk">
                                <ToggleButtonGroup
                                    color={action === "buy" ? "success" : "error"}
                                    value={action}
                                    exclusive
                                    onChange={handleChange}
                                    className="action-selector"
                                    size="small"
                                >
                                    <ToggleButton
                                        value="buy"
                                        className="action-selector"
                                    >
                                        BUY
                                    </ToggleButton>
                                    <ToggleButton
                                        value="sell"
                                        className="action-selector"
                                    >
                                        SELL
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="margin-action-btn"
                                    onClick={onClickAddBtn}
                                >
                                    ADD
                                </Button>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <MarginResultsTable
                            marginResponse={marginResults}
                            marginBenefit={marginBenefit}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box className="margin-selected-symbol">
                <SelectedSymbolListTable
                    symbolList={listedSyms}
                    CbtoDeleteRow={deleteSymbolRow}
                />
            </Box>
        </Grid>
    );
}

export default MarginCalculator;

import { Box, Button, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { hideLoader, showLoader, showSnackBar } from "../../state/AppConfigReducer";
import React, { useState } from "react";
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

 type SymbolObj = {
    asset: string,
    dispName: string,
    excToken: string,
    exchange: string,
    expiry: string
    instrument: string
    lot: string
    optType: string
    strike: string
    symbol: string
    tick: string
    weekly: string
 }

function MarginCalculator() {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();


    // const symbolListRef = useRef(new Array());

    const [
        symbolList, setSymbolList
    ] = useState<[]>();

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
    ] = useState<SymbolObj>();

    const [
        marginResults, setMarginResults
    ] = useState<MarginResults>();

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
        date.setMonth(monthNumber-1);
        return date.toLocaleString("default", { month: "short" });
    }
      
    const convertExpDate = (date?: string ) => {
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

    const deleteSymbolRow = (selectedRow: any) => {

        const existingSymbolList = Object.assign([
        ], symbolList);

        const index = existingSymbolList.findIndex((item: any) => {
            return item.exc_id === selectedRow.exc_id; 
        });

        if (index !== -1) {
            existingSymbolList.splice(index, 1);
            showErrorMessage("Symbol Deleted!!", true);
    
            setSymbolList(Object.assign([
            ], existingSymbolList));
        }
        

    };

    const successCB = (response: any, symData: any) => {
        setSymbolList(Object.assign([
        ], symData));
        dispatch(hideLoader());
        console.log("getResponse", response);  
        setMarginResults(response.d);   
    };

    const errorCB = (error: any) => {
        dispatch(hideLoader());
        console.log("error");
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const onClickAddBtn = () => {

        if (selectedSymbol && selectedSymbol.exchange && netQty && action) {

            const existingSymbolList = Object.assign([
            ], symbolList);

            const found = existingSymbolList.some((item: any) => {
                return item.exc_id === selectedSymbol?.excToken; 
            });

            if (found) {
                showErrorMessage("Symbol Exists!!");
                return;
            }

            const netQuantity: number = Number(selectedSymbol?.lot) * Number(netQty);

            const totalQty: string = netQuantity as unknown as string;

            dispatch(showLoader());
            const request = new ServiceRequest();
            const selectedSym = {
                "prd": "M",
                "exch": selectedSymbol?.exchange,
                "symname": selectedSymbol?.symbol,
                "instname": selectedSymbol?.instrument,
                "exd": convertExpDate(selectedSymbol?.expiry),
                "netqty": action === "buy" ? `${totalQty}` : `-${totalQty}`,
                "exc_id":selectedSymbol?.excToken,
                "dispSymbol": selectedSymbol?.dispName,
                "lotSize":selectedSymbol?.lot,
                "dispQty": netQty
            };
           
            
            const syms: any = Object.assign([
            ], symbolList);

            syms.push(selectedSym);

            // setSymbolList(Object.assign([
            // ], syms));
            
            request.addData({
                actid: "DUMMY",
                pos: JSON.stringify(syms)
            });
            
            fetchAPI.placePOSTRequest(
                SPAN_CALCULATOR.GET_SPAN_CALC_RESULTS,
                request, 
                (resp) => {
                    return successCB(resp, syms); 
                }, 
                errorCB
            );
        } else {
            showErrorMessage("Please select any script"); 
        }

    };

    const getSymbolInfo = (symDetails: any) => {
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

    return (
        <Grid container className="margin-calculator-root">
            <Grid item xs={12} className="margin-header">
                <div className="margin-header-title">
                    Margin Calculator
                </div>
            </Grid>
            <Grid item xs={12} className="margin-input-section">
                <Grid 
                    container
                    className="margin-input-container"
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={5}
                        lg={5}
                        display="flex"
                        alignItems="center"
                        justifyContent={"center"}
                        
                    >
                        <SymbolSearch 
                            parentCB = {getSymbolInfo}
                            parentCBQuery = {clearfields}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}>

                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={12} md={6} lg={6}
                                display="flex"
                                alignItems="center"
                                justifyContent={"flexStart"}
                                className="margin-qty-section"
                            >
                                <div className="lots-block">
                                    <div className="lots-label">
                                        No. of Lots:
                                    </div>
                                    <div className="lots-input">
                                        <input 
                                            type= "text"
                                            className="margin-calc-lotsize common-input"
                                            onChange={onchangeQty}
                                            value= {netQty}
                                            placeholder= "Net Quantity"
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
                              
                                
                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={3}
                                display="flex"
                                alignItems="center"
                                justifyContent={"center"}
                            >
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
                                    >
                                    BUY
                                    </ToggleButton>
                                    <ToggleButton
                                        value="sell"
                                    >
                                    SELL
                                    </ToggleButton>
                                </ToggleButtonGroup>

                            </Grid>

                            <Grid item xs={12} sm={12} md={3} lg={3}
                                display="flex"
                                alignItems="center"
                                justifyContent={"center"}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="action-btn"
                                    onClick={onClickAddBtn}
                                >
                                ADD
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Box className="margin-results-box">
                <MarginResultsTable 
                    marginResponse = {marginResults}
                />
            </Box>
            <Box className="margin-selected-symbol">
                <SelectedSymbolListTable 
                    symbolList = {symbolList}
                    CbtoDeleteRow = {deleteSymbolRow}
                />
            </Box>
        </Grid>
    );
}

export default MarginCalculator;

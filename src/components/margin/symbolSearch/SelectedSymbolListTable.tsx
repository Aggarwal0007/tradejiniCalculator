import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IMAGES } from "../../../common/Constants";
import React from "react";
import { RequestSymbol } from "common/Types";

type PropsType = {
    CbtoDeleteRow: (arg0: RequestSymbol) => void;
    symbolList: any;
}

const SelectedSymbolListTable = (props: PropsType) => {

    const onDeleteRow = (selectedRow: RequestSymbol) => {
        console.log("selectedRow", selectedRow);
        props.CbtoDeleteRow(selectedRow);
    };
    
    const columns: GridColumns = [
        
        {
            field: "dispSymbol",
            headerName: "Symbol",
            flex: 1.0,
            minWidth: 250,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false
        },
        {
            field: "exch",
            headerName: "Exchange",
            minWidth: 80,
            headerClassName:"custom-header",
            disableColumnMenu: true,
            sortable: false
        },
        {
            field: "dispQty",
            headerName: "No of lots",
            minWidth: 80,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header"
        },
        {
            field: "lotSize",
            headerName: "Lot Size",
            minWidth: 80,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header"
        },
        {
            field: "Buy",
            headerName: "Buy/Sell",
            minWidth: 80,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className="buy-label">
                        {params.row.netqty > 1 ? "Buy" : "Sell" }
                    </div>
                );
            }
        },
        {
            field: "instname",
            headerName: "Instrument",
            minWidth: 80,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false,
        },
        {
            field: "span",
            headerName: "Span",
            minWidth: 80,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false,
        },
        {
            field: "expo",
            headerName: "Exposure",
            minWidth: 80,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false,
        },
        {
            field: "Total",
            headerName: "Total",
            minWidth: 80,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return Number(params.row.expo) + Number(params.row.span);
            }
            
        },
        {
            field: "Actions",
            headerName: "Actions",
            minWidth: 80,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className= "">
                        <Button
                            onClick={() => {
                                return onDeleteRow(params.row); 
                            }}
                        >
                            <img className="symbol-delete"
                                src={IMAGES.DELETE_ICON} />
                        </Button>
                    </div>
                );
            }
            
        }
       
    ];

    return (
        <>
            {
                props && props.symbolList && props.symbolList.length ?
                    
                    <DataGrid
                        getRowId={(row) => {
                            return row.exc_id; 
                        }}
                        rows={props.symbolList}
                        columns={columns}
                        headerHeight = {40}
                        hideFooter={true}   
                           
                    />
                    :
                    null
                    
            }
        </>
    );
};

export default SelectedSymbolListTable;

import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IMAGES } from "../../../common/Constants";
import React from "react";

const SelectedSymbolListTable = (props: { CbtoDeleteRow: (arg0: any) => void; symbolList: any; }) => {

    const onDeleteRow = (selectedRow: any) => {
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
            headerClassName: "custom-header"
        },
        {
            field: "exch",
            flex: 1.0,
            headerName: "Exchange",
            minWidth: 50,
            headerClassName:"custom-header",
            disableColumnMenu: true
        },
        {
            field: "dispQty",
            headerName: "No of lots",
            flex: 1.0,
            minWidth: 50,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header"
        },
        {
            field: "lotSize",
            headerName: "Lot Size",
            flex: 1.0,
            minWidth: 50,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header"
        },
        {
            field: "Buy",
            headerName: "Buy/Sell",
            flex: 1.0,
            minWidth: 50,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <>
                        {params.row.netqty > 1 ? "Buy" : "Sell" }
                    </>
                );
            }
        },
        {
            field: "instname",
            headerName: "Instrument",
            flex: 1.0,
            minWidth: 80,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false,
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

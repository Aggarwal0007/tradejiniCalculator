import { Button, TextField } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import { CONTACT_US } from "communicator/ServiceUrls";
// import ContactUsHeader from "./ContactusHeader";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            {/* <ContactUsHeader /> */}
            <Button 
                size="small"
                variant="text"
                className="custom-btn"
            >
                         Recycle Bin
            </Button>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const ContactusTable = () => {

    const fetchAPI = useFetch();
    
    const [
        availbleContacts, setAvailableContacts
    ] = useState<any>([
    ]);

    const [
        selectedRows, setSelectedRows
    ] = useState([
    ]);

    const onClickDelete = (selectedItem: any) => {
        console.log("selectedItem", selectedItem);
    };

    const onClickUpdate = (selectedItem: any) => {
        console.log("selectedItem", selectedItem);
    };

    const successCB = (response: { d: []; }) => {
        console.log("getResponse", response);
        setAvailableContacts(response.d);
    };

    const errorCB = () => {
        console.log("error");
    };

    const getData=() => {
        const request = new ServiceRequest();
        request.addData({});
        fetchAPI.placeGETRequest(CONTACT_US.GET_CONTACTS, request, successCB, errorCB );
    };
      
    useEffect(() => {
        getData();
    }, [
    ]);

    const cols = [
        {
            field: "date",
            headerName: "Date",
            flex: 1.0,
            type: "dateTime",
            editable: true,
            disableColumnMenu: true
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1.0,
            editable: true,
            disableColumnMenu: true
        },
        {
            field: "phone",
            headerName: "Phone No",
            flex: 1.0,
            editable: true,
            disableColumnMenu: true,
            sortable: false
        },
        {
            field: "email",
            headerName: "Email Id",
            flex: 1.0,
            editable: true,
            disableColumnMenu: true,
            sortable: false
        },
        {
            field: "subject",
            headerName: "Subject",
            flex: 1.0,
            editable: true,
            disableColumnMenu: true,
            sortable: false
        },
        {
            field: "assignto",
            headerName: "Assign To",
            flex: 1.0,
            disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params: any) => {
                return (
                    <TextField
                        type="text"
                        defaultValue={params.row.assignto}
                        InputLabelProps={{ shrink: true }}
                        onChange={(evt) => {
                            return params.api.updateRows([
                                { ...params.row, assignto: evt.target.value }
                            ]); 
                        }
                        }
                    />
                );
            }
        },
        {
            field: "remarks",
            headerName: "Remarks",
            flex: 1.0,
            disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params: any) => {
                return (
                    <TextField
                        type="text"
                        defaultValue={params.row.remarks}
                        InputLabelProps={{ shrink: true }}
                        onChange={(evt) => {
                            return params.api.updateRows([
                                { ...params.row, remarks: evt.target.value }
                            ]); 
                        }
                        }
                    />
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.0,
            editable: true,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => {
                                return onClickUpdate(params.row); 
                            }}
                        >
                          Update
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => {
                                return onClickDelete(params.row); 
                            }}
                        >
                          Delete
                        </Button>
                    </>
                    
                );
            }
        },
    ];

    const getselectedRows = (ids: any) => {
        const selectedIDs = new Set(ids);
        const selectedItems = availbleContacts.filter((row: any) => {
            return selectedIDs.has(row.id); 
        },);
        setSelectedRows(selectedItems);
        console.log("selectedRows", selectedItems);
        console.log("selectedRows", selectedRows);
    };
    return (

        <div style={{ height: "100vh", width: "100%" }}>

            {
                availbleContacts && availbleContacts.length ?
         
                    <DataGrid
                        rows={availbleContacts}
                        columns={cols}
                        pageSize={10}
                        rowsPerPageOptions={[
                            10
                        ]}
                        checkboxSelection
                        disableSelectionOnClick
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        onSelectionModelChange={(ids) => {
                            return getselectedRows(ids); 
                        }}
                    />

                    :
                    null
            }            
        </div>
    );
};

export default ContactusTable;

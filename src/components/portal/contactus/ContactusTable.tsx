import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { hideLoader, showLoader, showSnackBar } from "../../../state/AppConfigReducer";
import { Paper, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import { CONTACT_US } from "communicator/ServiceUrls";
import CustomToolbar from "./CustomToolbarContacts";
import DateRange from "./DateRange";
import DeleteRecords from "./DeleteRecords";
import { ErrorType } from "common/Types";
import UpdateRecord from "./UpdateRecord";
import { useDispatch } from "react-redux";

const ContactusTable = (props: any) => {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();

    const [
        availbleContacts, setAvailableContacts
    ] = useState<any>([
    ]);

    const [
        selectedRows, setSelectedRows
    ] = useState([
    ]);

    const [
        errormsg, setErrorMsg
    ] = useState<string | null>("");

    const successCB = (response: { d: []; }) => {
        dispatch(hideLoader());
        console.log("getResponse", response);
        if (response && response.d.length === 0) {
            setErrorMsg("No data available");
        } else {
            setErrorMsg("");
        }
        setAvailableContacts(response.d);
    };

    const errorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("error");
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const getData = (startDate = "", endDate = "") => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        if (startDate && endDate) {
            request.addData({
                startDate: startDate,
                endDate: endDate
            });
        } else {
            request.addData({});
        }

        fetchAPI.placeGETRequest(CONTACT_US.GET_CONTACTS, request, successCB, errorCB);
    };

    useEffect(() => {
        getData();
    }, [
    ]);


    const updateDateRangeValues = (dateValue: any) => {
        console.log("dateValue", dateValue);
        getData(dateValue.startDate, dateValue.endDate);
    };

    const animateRecord = (records: any) => {
        console.log("records", records);
        getData();
    };

    const columns: GridColumns = [
        {
            field: "date",
            headerName: "Date",
            flex: 1.0,
            minWidth: 180,
            type: "dateTime",
            editable: true,
            headerClassName: "custom-header",
            disableColumnMenu: true
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1.0,
            minWidth: 150,
            editable: true,
            disableColumnMenu: true,
            headerClassName: "custom-header"
        },
        {
            field: "phone",
            headerName: "Phone No",
            flex: 1.0,
            minWidth: 80,
            editable: true,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header"
        },
        {
            field: "email",
            headerName: "Email Id",
            flex: 1.0,
            minWidth: 150,
            editable: true,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header"
        },
        {
            field: "subject",
            headerName: "Subject",
            flex: 1.0,
            minWidth: 150,
            editable: true,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false
        },
        {
            field: "assignto",
            headerName: "Assign To",
            // flex: 1.0,
            minWidth: 150,
            // disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
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
            // flex: 1.0,
            minWidth: 200,
            // disableClickEventBubbling: true,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params: any) => {
                return (
                    <TextField
                        type="text"
                        className="assignto-input"
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
            // flex: 1.0,
            minWidth: 100,
            editable: true,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params: any) => {
                return (
                    <>

                        <UpdateRecord
                            customClass="update_icon"
                            rowsSelected={[
                                params.row
                            ]}
                            name="Update"
                            variant="text"
                            updateRowSuccess={animateRecord}
                        />

                        <DeleteRecords
                            customClass="delete-icon"
                            rowsSelected={[
                                params.row
                            ]}
                            name="Delete"
                            variant="text"
                            deleteRowSuccess={animateRecord}
                            from="WebsiteContacts"
                        />
                    </>

                );
            }
        },
    ];

    const getselectedRows = (ids: any) => {
        const selectedIDs = new Set(ids);
        const selectedItems = availbleContacts.filter((row: any) => {
            return selectedIDs.has(row.id);
        });
        setSelectedRows(selectedItems);
    };

    return (

        <Paper>
            <div
                className="contactus-table-container"
                style={{ height: "92vh", width: "100%" }}
                id="dataGridWrapper"
            >

                {
                    availbleContacts && availbleContacts.length ?

                        <DataGrid
                            rows={availbleContacts}
                            columns={columns}
                            // pageSize={30}
                            // autoHeight
                            // rowsPerPageOptions={[
                            //     30
                            // ]}
                            hideFooter={true}

                            checkboxSelection
                            disableSelectionOnClick
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            componentsProps={{
                                toolbar: {
                                    deleteRows: selectedRows,
                                    goToAnimation: animateRecord,
                                    setDateRangeValues: updateDateRangeValues,
                                    recycleBinModel: props.showRecycleContent
                                }
                            }}
                            onSelectionModelChange={(ids) => {
                                return getselectedRows(ids);
                            }}
                        />

                        :
                        <>
                            {
                                errormsg && errormsg.length ?

                                    <div className="no-data-container">
                                        <DateRange
                                            dateRangeValues={updateDateRangeValues}
                                        />
                                        <div className="error-message">
                                            {errormsg}
                                        </div>
                                    </div>
                                    :
                                    null

                            }
                        </>


                }
            </div>
        </Paper>

    );
};

export default ContactusTable;
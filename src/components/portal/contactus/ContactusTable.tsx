import { DataGrid, GridColumns, GridRowParams } from "@mui/x-data-grid";
import { DATE_RANGE, ErrorType, WEBSITE_CONTACTS } from "common/Types";
import { hideLoader, showLoader, showSnackBar } from "../../../state/AppConfigReducer";
import { Paper, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import { CONTACT_US } from "communicator/ServiceUrls";
import CustomToolbar from "./CustomToolbarContacts";
import DateRange from "./DateRange";
import DeleteRecords from "./DeleteRecords";
import UpdateRecord from "./UpdateRecord";
import { useDispatch } from "react-redux";

const ContactusTable = (props: { showRecycleContent: Function; }) => {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();

    const [
        availbleContacts, setAvailableContacts
    ] = useState<Array<WEBSITE_CONTACTS>>([
    ]);

    const [
        selectedRows, setSelectedRows
    ] = useState<Array<WEBSITE_CONTACTS>>([
    ]);

    const [
        errormsg, setErrorMsg
    ] = useState<string>("");

    const successCB = (response: { d: Array<WEBSITE_CONTACTS> }) => {
        dispatch(hideLoader());
        console.log("getResponse", response, response.d.length);
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

    const getData = (startDate: string = "", endDate: string = "") => {
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


    const updateDateRangeValues = (dateValue: DATE_RANGE) => {
        console.log("dateValue", dateValue);
        getData(dateValue.startDate, dateValue.endDate);
    };

    const animateRecord = (records: number[]) => {
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
            headerClassName: "custom-header",
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.date}
                    </div>
                );
            }
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1.0,
            minWidth: 150,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.name}
                    </div>
                );
            }
        },
        {
            field: "phone",
            headerName: "Phone No",
            flex: 1.0,
            minWidth: 80,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.phone}
                    </div>
                );
            }
        },
        {
            field: "email",
            headerName: "Email Id",
            flex: 1.0,
            minWidth: 150,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.email}
                    </div>
                );
            }
        },
        {
            field: "subject",
            headerName: "Subject",
            flex: 1.0,
            minWidth: 150,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.subject}
                    </div>
                );
            }
        },
        {
            field: "assignto",
            headerName: "Assign To",
            minWidth: 150,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
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
                    </div>
                );
            }
        },
        {
            field: "remarks",
            headerName: "Remarks",
            minWidth: 200,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
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
                    </div>
                );
            }

        },
        {
            field: "actions",
            headerName: "Actions",
            // flex: 1.0,
            minWidth: 100,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        <>

                            <UpdateRecord
                                customClass="update_icon"
                                rowsSelected={[
                                    params.row
                                ]}
                                name="Update"
                                variant="text"
                                updateRowSuccess={animateRecord}
                                url={CONTACT_US.UPDATE_CONTACTS}
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
                                url={CONTACT_US.DELETE_CONTACTS}
                            />
                        </>
                    </div>
                );
            }
        },
    ];

    const getselectedRows = (ids: Iterable<unknown>) => {
        const selectedIDs = new Set(ids);
        const selectedItems = availbleContacts.filter((row: WEBSITE_CONTACTS) => {
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
                            isRowSelectable={(params: GridRowParams) => {
                                return !params.row.assignto || params.row.status === 1;
                            }}
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

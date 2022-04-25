import { DataGrid, GridColumns, GridRowParams } from "@mui/x-data-grid";
import { DATE_RANGE, ErrorType, LEAD_REPORT } from "common/Types";
import { hideLoader, showLoader, showSnackBar } from "../../../state/AppConfigReducer";
import { Paper, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import CustomToolbar from "../contactus/CustomToolbarContacts";
import DateRange from "../contactus/DateRange";
import DeleteRecords from "../contactus/DeleteRecords";

import { LEADFORM } from "communicator/ServiceUrls";
import UpdateRecord from "../contactus/UpdateRecord";
import { useDispatch } from "react-redux";

const LeadReportTable = (props: { showRecycleContent: Function; }) => {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();

    const [
        availbleReports, setAvailableReports
    ] = useState<Array<LEAD_REPORT>>([
    ]);

    const [
        selectedRows, setSelectedRows
    ] = useState<Array<LEAD_REPORT>>([
    ]);

    const [
        errormsg, setErrorMsg
    ] = useState<string | null>("");

    const successCB = (response: { d: Array<LEAD_REPORT> }) => {
        dispatch(hideLoader());
        console.log("getResponse", response);
        if (response && response.d.length === 0) {
            setErrorMsg("No data available");
        } else {
            setErrorMsg("");
        }
        setAvailableReports(response.d);
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

        fetchAPI.placeGETRequest(LEADFORM.GET_LEADFORM, request, successCB, errorCB);
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
            editable: true,
            headerClassName:"custom-header",
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <div className= {`${params.row.assignto || params.row.status === 1 ?
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
            minWidth: 50,
            editable: true,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className= {`${params.row.assignto || params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.name}
                    </div>
                );
            }
        },
        {
            field: "contactno",
            headerName: "Contact",
            flex: 1.0,
            minWidth: 100,
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
            field: "city",
            headerName: "City",
            flex: 1.0,
            minWidth: 150,
            editable: true,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false
        },
        {
            field: "partner_id",
            headerName: "Partner Id",
            flex: 1.0,
            minWidth: 50,
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
            renderCell: (params) => {
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
            renderCell: (params) => {
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
            renderCell: (params) => {
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
                            url={LEADFORM.UPDATE_LEADFORM}
                        />

                        <DeleteRecords
                            customClass="delete-icon"
                            rowsSelected={[
                                params.row
                            ]}
                            name="Delete"
                            variant="text"
                            deleteRowSuccess={animateRecord}
                            from="LeadReports"
                            url={LEADFORM.DELETE_LEADFORM}
                        />
                    </>

                );
            }
        },
    ];

    const getselectedRows = (ids: Iterable<unknown>) => {
        const selectedIDs = new Set(ids);
        const selectedItems = availbleReports.filter((row: LEAD_REPORT) => {
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
                    availbleReports && availbleReports.length ?

                        <DataGrid
                            rows={availbleReports}
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
                                    recycleBinModel: props.showRecycleContent,
                                    url: LEADFORM.DELETE_LEADFORM
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

export default LeadReportTable;

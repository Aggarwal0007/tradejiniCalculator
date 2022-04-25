import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { DATE_RANGE, ErrorType, LEAD_REPORT } from "common/Types";
import { hideLoader, showLoader, showSnackBar } from "state/AppConfigReducer";
import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import DateRange from "../../contactus/DateRange";
import DeleteRecords from "../../contactus/DeleteRecords";
import { LEADFORM } from "communicator/ServiceUrls";
import LeadToolbarRecyclebin from "./LeadToolbarRecyclebin";
import { Paper } from "@mui/material";
import RestoreLeadReport from "./RestoreLeadReports";
import { useDispatch } from "react-redux";

const RecycleBinLeadReports = ( props: { hideRecycleContent: Function; }) => {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();

    const [
        availbleReports, setAvailableReports
    ] = useState<LEAD_REPORT[]>([
    ]);

    const [
        errormsg, setErrorMsg
    ] = useState<string | null>("");

    const [
        selectedRows, setSelectedRows
    ] = useState<LEAD_REPORT[]>([
    ]);

    const successCB = (response: { d: []; }) => {
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

        fetchAPI.placeGETRequest(LEADFORM.GET_RECYCLE_LEADFORM, request, successCB, errorCB);
    };

    useEffect(() => {
        getData();
    }, [
    ]);

    const animateRecord = (records: number[]) => {
        console.log("records", records);
        getData();
    };

    const updateDateRangeValues = (dateValue: DATE_RANGE) => {
        console.log("dateValue", dateValue);
        getData(dateValue.startDate, dateValue.endDate);
    };

    const getselectedRows = (ids: Iterable<unknown>) => {
        const selectedIDs = new Set(ids);
        const selectedItems = availbleReports.filter((row: LEAD_REPORT) => {
            return selectedIDs.has(row.id);
        });
        setSelectedRows(selectedItems);
    };

    const getRemarks = (params: {row: LEAD_REPORT}) => {
        return params.row.remarks ? params.row.remarks : "-";
    };

    const getAssignTo = (params: {row: LEAD_REPORT}) => {
        return params.row.assignto ? params.row.assignto : "-";
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
            minWidth: 50,
            editable: true,
            disableColumnMenu: true,
            headerClassName: "custom-header"
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
            valueGetter: getAssignTo
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
            valueGetter: getRemarks
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

                        <DeleteRecords
                            customClass="delete-icon"
                            rowsSelected={[
                                params.row
                            ]}
                            name="Delete"
                            variant="text"
                            deleteRowSuccess={animateRecord}
                            from="Recycle"
                            url={LEADFORM.DELETE_RECYCLE_LEADFORM}
                        />
                        <RestoreLeadReport
                            customClass="restore_icon"
                            rowsSelected={[
                                params.row
                            ]}
                            name="Restore"
                            variant="text"
                            restoreRowSuccess={animateRecord}
                        />
                    </>

                );
            }
        },
    ];
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

                            checkboxSelection
                            disableSelectionOnClick
                            components={{
                                Toolbar: LeadToolbarRecyclebin,
                            }}
                            componentsProps={{
                                toolbar: {
                                    recordsSelected: selectedRows,
                                    goToAnimation: animateRecord,
                                    setDateRangeValues: updateDateRangeValues,
                                    showLeadReportModel: props.hideRecycleContent,
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

export default RecycleBinLeadReports;

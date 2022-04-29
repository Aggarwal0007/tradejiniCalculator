import { DataGrid, GridColumns, GridRowParams } from "@mui/x-data-grid";
import { DATE_RANGE, ErrorType, LEAD_REPORT } from "common/Types";
import { hideLoader, showLoader, showSnackBar } from "state/AppConfigReducer";
import { Pagination, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import DateRange from "../../contactus/DateRange";
import DeleteRecords from "../../contactus/DeleteRecords";
import { LEADFORM } from "communicator/ServiceUrls";
import LeadToolbarRecyclebin from "./LeadToolbarRecyclebin";
import RestoreLeadReport from "./RestoreLeadReports";
import { useDispatch } from "react-redux";

const RecycleBinLeadReports = (props: { hideRecycleContent: Function; }) => {

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

    const [
        totalRecords, setTotalRecords
    ] = useState<number>(0);

    const successCB = (response: { d: [], count:number }) => {
        dispatch(hideLoader());
        console.log("getResponse", response);
        if (response && response.d && response.d.length>0) {
            setAvailableReports(response.d);
            setTotalRecords(Math.ceil(response.count/10));
            setErrorMsg("");
        } else {
            setAvailableReports([
            ]);
            setErrorMsg("No data available");
        }
    };

    const errorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("error");
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const getData = (pageNo:number = 1) => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        if (pageNo) {
            request.addData({
                pageNo: pageNo
            });
        } else {
            request.addData({ pageNo:1 });
        }

        fetchAPI.placeGETRequest(LEADFORM.GET_RECYCLE_LEADFORM, request, successCB, errorCB);
    };

    useEffect(() => {
        getData();
    }, [
    ]);

    const handleChange = (evt: any, value:number) => {
        getData(value);
    };

    const animateRecord = (records: number[]) => {
        console.log("records", records);
        getData();
    };

    const updateDateRangeValues = (dateValue: DATE_RANGE) => {
        console.log("dateValue", dateValue);
        getData();
    };

    const getselectedRows = (ids: Iterable<unknown>) => {
        const selectedIDs = new Set(ids);
        const selectedItems = availbleReports.filter((row: LEAD_REPORT) => {
            return selectedIDs.has(row.id);
        });
        setSelectedRows(selectedItems);
    };

    // const getRemarks = (params: { row: LEAD_REPORT }) => {
    //     return params.row.remarks ? params.row.remarks : "-";
    // };

    // const getAssignTo = (params: { row: LEAD_REPORT }) => {
    //     return params.row.assignto ? params.row.assignto : "-";
    // };

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
                    <div className={`${params.row.status === 1 ?
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
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.status === 1 ?
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
            disableColumnMenu: true,
            sortable: false,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.contactno}
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
                    <div className={`${params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.email}
                    </div>
                );
            }
        },
        {
            field: "city",
            headerName: "City",
            flex: 1.0,
            minWidth: 150,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className={`${params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.city}
                    </div>
                );
            }
        },
        {
            field: "partner_id",
            headerName: "Partner Id",
            flex: 1.0,
            minWidth: 50,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className={`${params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.partner_id}
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
                    <div className={`${params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.assignto}
                    </div>
                );
            }
            // valueGetter: getAssignTo
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
                    <div className={`${params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
                        {params.row.remarks}
                    </div>
                );
            }
            // valueGetter: getRemarks
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <div className={`${params.row.status === 1 ?
                        "actions-disable"
                        : " actions-enable"}`}>
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
                    </div>
                );
            }

        },
    ];
    return (
        <Paper>
            <div
                className="contactus-table-container"
                style={{ height: "83vh", width: "100%" }}
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
                                return params.row.status !== 1;
                            }}
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
                {setAvailableReports && setAvailableReports.length && totalRecords>1
                    ? <Pagination
                        className="pagination"
                        count={totalRecords}
                        color="primary"
                        onChange={handleChange}
                    />
                    :""}
            </div>
        </Paper>

    );
};

export default RecycleBinLeadReports;

import { DataGrid, GridColumns, GridRowParams } from "@mui/x-data-grid";
import { DATE_RANGE, ErrorType, WEBSITE_CONTACTS } from "common/Types";
import { hideLoader, showLoader, showSnackBar } from "../../../../state/AppConfigReducer";
import { Pagination, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import { CONTACT_US } from "communicator/ServiceUrls";
import CustomToolbar from "./CustomToolbarRecyclebin";
import DateRange from "../DateRange";
import DeleteRecords from "../DeleteRecords";
import RestoreRecords from "./RestoreRecords";
import { useDispatch } from "react-redux";

const RecycleBinContacts = (props: { hideRecycleContent: Function; }) => {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();

    const [
        availbleContacts, setAvailableContacts
    ] = useState<WEBSITE_CONTACTS[]>([
    ]);

    const [
        selectedRows, setSelectedRows
    ] = useState<WEBSITE_CONTACTS[]>([
    ]);

    const [
        errormsg, setErrorMsg
    ] = useState<string | null>("");

    const [
        totalRecords, setTotalRecords
    ] = useState<number>(0);

    const successCB = (response: {d:[], count: number}) => {
        dispatch(hideLoader());
        if (response && response.d && response.d.length>0) {
            setAvailableContacts(response.d);
            setTotalRecords(Math.ceil(response.count/10));
            setErrorMsg("");
        } else {
            setAvailableContacts([
            ]);
            setErrorMsg("No data available");
        }
    };

    const errorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("error", error.message);
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

        fetchAPI.placeGETRequest(CONTACT_US.GET_RECYCLE_CONTACTS, request, successCB, errorCB);
    };

    useEffect(() => {
        getData();
    }, [
    ]);

    const handleChange = (evt: any, value:number) => {
        getData(value);
    };

    const updateDateRangeValues = (dateValue: DATE_RANGE) => {
        console.log("dateValue", dateValue);
        getData();
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
                    <div className={`${params.row.status === 1 ?
                        "actions-enable"
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
                    <div className={`${params.row.status === 1 ?
                        "actions-enable"
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
                    <div className={`${params.row.status === 1 ?
                        "actions-enable"
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
                    <div className={`${params.row.status === 1 ?
                        "actions-enable"
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
                    <div className={`${params.row.status === 1 ?
                        "actions-enable"
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
                    <div className={`${params.row.status === 1 ?
                        "actions-enable"
                        : " actions-enable"}`}>
                        {params.row.assignto}
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
                    <div className={`${params.row.status === 1 ?
                        "actions-enable"
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
                        "actions-enable"
                        : " actions-enable"}`}>
                        <>

                            <RestoreRecords
                                customClass="restore_icon"
                                rowsSelected={[
                                    params.row
                                ]}
                                name="Restore"
                                variant="text"
                                restoreRowSuccess={animateRecord}
                            />

                            <DeleteRecords
                                customClass="delete-icon"
                                rowsSelected={[
                                    params.row
                                ]}
                                name="Delete"
                                variant="text"
                                deleteRowSuccess={animateRecord}
                                from="Recycle"
                                url={CONTACT_US.DELETE_RECYCLE_CONTACTS}
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
                style={{ height: "83vh", width: "100%" }}
                id="dataGridWrapper"
            >
                {
                    availbleContacts && availbleContacts.length ?

                        <DataGrid
                            rows={availbleContacts}
                            columns={columns}
                            hideFooter={true}
                            isRowSelectable={(params: GridRowParams) => {
                                return params.row.status !== 1;
                            }}
                            checkboxSelection
                            disableSelectionOnClick
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            componentsProps={{
                                toolbar: {
                                    recordsSelected: selectedRows,
                                    goToAnimation: animateRecord,
                                    setDateRangeValues: updateDateRangeValues,
                                    showContactUsModel: props.hideRecycleContent,
                                    url: CONTACT_US.GET_RECYCLE_CONTACTS
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
              
                {availbleContacts && availbleContacts.length && totalRecords > 1 
                    ? <Pagination
                        count={totalRecords}
                        color="primary"
                        onChange={handleChange}
                    />
                    :""}
            </div>
        </Paper>

    );
};

export default RecycleBinContacts;

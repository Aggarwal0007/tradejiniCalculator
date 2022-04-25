import { ErrorType, LEAD_REPORT, MESSAGE_SUCCESS_RESPONSE } from "common/Types";
import { hideLoader, showAPPDialog, 
    showLoader, showSnackBar } from "state/AppConfigReducer";
import { ServiceRequest, useFetch } from "index";
import { getText } from "common/Text";
import { IconButton } from "@mui/material";
import { IMAGES } from "common/Constants";
import { LEADFORM } from "communicator/ServiceUrls";
import React from "react";
import { useDispatch } from "react-redux";

type propsTypes = {
    customClass: string;
    rowsSelected: LEAD_REPORT[]; 
    name: string; 
    variant: string;
    restoreRowSuccess: (arg0: number[]) => void;
}

const RestoreLeadReport = (props: propsTypes) => {
    const dispatch = useDispatch();

    const getRestoredIds = (rowlist: Array<LEAD_REPORT>) => {
        const idList: number[]= [
        ];
        rowlist.map((item: LEAD_REPORT) => {
            return idList.push(item.id);
        });
        return idList;
    };

    const successCB = (
        response: MESSAGE_SUCCESS_RESPONSE,
        restoredRows: number[]
    ) => {
        dispatch(hideLoader());
        console.log("RestoredRecords response", response, restoredRows);
        dispatch(showSnackBar({
            message: "LeadReport restored successfully!!",
            status: "success"
        }));
        props.restoreRowSuccess(restoredRows);
    };

    const errorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("RestoredRecords Error", error.message); 
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const restoreRecords = (itemlist: Array<LEAD_REPORT>) => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        request.addData({
            idList: JSON.stringify(getRestoredIds(itemlist))
        });
        useFetch().placePOSTRequest(
            LEADFORM.RESTORE_RECYCLE_LEADFORM, 
            request, 
            (resp) => {
                return successCB(resp, getRestoredIds(itemlist)); 
            }, 
            errorCB 
        );
    };

    const onClickRestore = (restoredRow: Array<LEAD_REPORT>) => {
        if (restoredRow.length) {
            dispatch(showAPPDialog({
                title: getText("RESTORE_TITLE", "CONFIRMATION"),
                message: `${getText("RESTORE_MSG", "CONFIRMATION")} 
                ${restoredRow.length} Record${restoredRow.length as unknown as number > 1 ? "s" : ""}?`,
                buttons: [
                    { name: getText("CANCEL", "BUTTON"), className: "cancel-btn" },
                    { name: getText("OK", "BUTTON"), action: () => {
                        return restoreRecords(restoredRow); 
                    }, className: "ok-btn" }
                ]
            }));
        } else {
            dispatch(showSnackBar({
                message: "No records selected.",
                status: "error"
            }));
        }
        

    };

    return (
        <>
            <IconButton onClick={() => {
                return onClickRestore(props.rowsSelected); 
            }}
            >
                <img 
                    src={
                        props.name === "Restore" ? IMAGES.RESTORE_ICON : IMAGES.RESTORE_ALL_ICON} 
                    className={props.customClass}
                    title={props.name}
                />
            </IconButton>                
        </>
    );
};

export default RestoreLeadReport;

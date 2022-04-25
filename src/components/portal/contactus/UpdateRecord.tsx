import { ErrorType, LEAD_REPORT, MESSAGE_SUCCESS_RESPONSE, WEBSITE_CONTACTS } from "common/Types";
import { hideLoader, showAPPDialog, 
    showLoader, showSnackBar } from "../../../state/AppConfigReducer";
import { ServiceRequest, useFetch } from "index";
import { getText } from "common/Text";
import { IconButton } from "@mui/material";
import { IMAGES } from "../../../common/Constants";
import React from "react";
import { useDispatch } from "react-redux";

type propsTypes = {
    updateRowSuccess: Function;
    rowsSelected: WEBSITE_CONTACTS[] |LEAD_REPORT[]; 
    name: string | undefined; 
    customClass: string;
    variant: string;
    url: string;
}

const UpdateRecord = (props: propsTypes) => {

    const dispatch = useDispatch();

    const successCB = (response: MESSAGE_SUCCESS_RESPONSE) => {
        dispatch(hideLoader());
        dispatch(showSnackBar({
            message: response.d.message,
            status: "success"
        }));
        props.updateRowSuccess();
    };

    const errorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("updateRecords Error", error.message); 
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const updateRecords = (itemlist: Array<WEBSITE_CONTACTS | LEAD_REPORT>) => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        const credentials = {
            id: itemlist[ 0 ].id,
            remarks: itemlist[ 0 ].remarks ? itemlist[ 0 ].remarks : "",
            assignTo: itemlist[ 0 ].assignto ? itemlist[ 0 ].assignto : ""
        };
        request.addData(credentials);
        useFetch().placePOSTRequest(
            props.url, 
            request, 
            successCB, 
            errorCB 
        );
    };

    
    const onClickUpdate = (selectedRecord: Array<WEBSITE_CONTACTS | LEAD_REPORT>) => {
        
        if (selectedRecord.length) {
            dispatch(showAPPDialog({
                title: getText("UPDATE_TITLE", "CONFIRMATION"),
                message: getText("UPDATE_MSG", "CONFIRMATION"),
                buttons: [
                    { name: getText("CANCEL", "BUTTON"), className: "cancel-btn" },
                    { name: getText("OK", "BUTTON"), action: () => {
                        return updateRecords(selectedRecord); 
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
            <IconButton
                onClick={() => {
                    return onClickUpdate(props.rowsSelected); 
                }}
            >
                <img 
                    src={IMAGES.UPDATE_ICON} 
                    className="update-icon"
                    title={props.name}
                />
            </IconButton>
        </>
    );
};

export default UpdateRecord;

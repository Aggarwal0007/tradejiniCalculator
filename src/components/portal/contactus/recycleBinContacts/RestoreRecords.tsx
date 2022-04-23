import { ErrorType, MESSAGE_SUCCESS_RESPONSE, WEBSITE_CONTACTS } from "common/Types";
import { hideLoader, showAPPDialog, 
    showLoader, showSnackBar } from "../../../../state/AppConfigReducer";
import { ServiceRequest, useFetch } from "index";
import { CONTACT_US } from "communicator/ServiceUrls";
import { getText } from "common/Text";
import { IconButton } from "@mui/material";
import { IMAGES } from "../../../../common/Constants";
import React from "react";
import { useDispatch } from "react-redux";

type propsTypes = {
    customClass: string;
    rowsSelected: WEBSITE_CONTACTS[]; 
    name: string; 
    variant: string;
    restoreRowSuccess: (arg0: number[]) => void;
}

const RestoreRecords = (props: propsTypes) => {

    const dispatch = useDispatch();

    const getRestoredIds = (rowlist: Array<WEBSITE_CONTACTS>) => {
        const idList: number[]= [
        ];
        rowlist.map((item: WEBSITE_CONTACTS) => {
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
            message: "Contact restored successfully!!",
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

    const restoreRecords = (itemlist: Array<WEBSITE_CONTACTS>) => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        request.addData({
            idList: JSON.stringify(getRestoredIds(itemlist))
        });
        useFetch().placePOSTRequest(
            CONTACT_US.RESTORE_RECYCLE_CONTACTS, 
            request, 
            (resp) => {
                return successCB(resp, getRestoredIds(itemlist)); 
            }, 
            errorCB 
        );
    };

    
    const onClickRestore = (restoredRow: Array<WEBSITE_CONTACTS>) => {
        
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
            <IconButton
                onClick={() => {
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

export default RestoreRecords;

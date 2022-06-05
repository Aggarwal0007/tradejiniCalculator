import { ErrorType, LEAD_REPORT, MESSAGE_SUCCESS_RESPONSE, WEBSITE_CONTACTS } from "common/Types";
import { hideLoader, showAPPDialog, showLoader, showSnackBar } from "../../../state/AppConfigReducer";
import { ServiceRequest, useFetch } from "index";
import { getText } from "common/Text";
import { IconButton } from "@mui/material";
import { IMAGES } from "../../../common/Constants";
import React from "react";
import { useDispatch } from "react-redux";

type PropsTypes = {
    deleteRowSuccess: (arg0: number[]) => void;
    from: string; rowsSelected: (WEBSITE_CONTACTS[] | LEAD_REPORT[]); 
    name: string;
    customClass: string;
    customBtnClass?: string;
    variant: string;
    url:string
}
const DeleteRecords = (props: PropsTypes) => {

    const dispatch = useDispatch();

    const getURL = (urlSelected :string) => {
        return urlSelected;
    };

    const getDeletedIds = (rowlist: LEAD_REPORT[] | WEBSITE_CONTACTS[]) => {
        const idList: number[] = [
        ];
        rowlist.map((item: (LEAD_REPORT | WEBSITE_CONTACTS)) => {
            return idList.push(item.id);
        });
        return idList;
    };

    const successCB = (response: MESSAGE_SUCCESS_RESPONSE, deletedRows: number[]) => {
        dispatch(hideLoader());
        console.log("DeleteContacts response", response, deletedRows);
        dispatch(showSnackBar({
            message: response.d.message,
            status: "success"
        }));
        props.deleteRowSuccess(deletedRows);
    };

    const errorCB = (error: ErrorType) => {
        dispatch(hideLoader());
        console.log("DeleteContacts Error", error.message); 
        dispatch(showSnackBar({
            message: error.message,
            status: "error"
        }));
    };

    const deleteRecords = (itemlist: LEAD_REPORT[] | WEBSITE_CONTACTS[]) => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        request.addData({
            idList:JSON.stringify(getDeletedIds(itemlist))
        });
        useFetch().placePOSTRequest(
            getURL(props.url), 
            request, 
            (resp) => {
                return successCB(resp, getDeletedIds(itemlist)); 
            }, 
            errorCB 
        );
    };

    
    const onClickDelete = (deletedRow: LEAD_REPORT[] | WEBSITE_CONTACTS[]) => {

        if (deletedRow.length) {
            
            dispatch(showAPPDialog({
                title: getText("DELETE_TITLE", "CONFIRMATION"),
                message: `${getText("DELETE_MSG", "CONFIRMATION")} ${deletedRow.length} Records ?`,
                buttons: [
                    { name: getText("CANCEL", "BUTTON"), className: "cancel-btn" },
                    { name: getText("OK", "BUTTON"), action: () => {
                        return deleteRecords(deletedRow); 
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
                className={props.customBtnClass}
                onClick={() => {
                    return onClickDelete(props.rowsSelected); 
                }}
            >
                <img 
                    src={
                        props.name === "Delete" ? IMAGES.DELETE_ICON : IMAGES.DELETE_ALL_ICON} 
                    className={props.customClass}
                    title={props.name}
                />
            </IconButton>

        </>
    );
};

export default DeleteRecords;

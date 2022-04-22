import { hideLoader, showAPPDialog, showLoader, showSnackBar } from "../../../state/AppConfigReducer";
import { ServiceRequest, useFetch } from "index";
import { CONTACT_US } from "communicator/ServiceUrls";
import { ErrorType } from "common/Types";
import { getText } from "common/Text";
import { IconButton } from "@mui/material";
import { IMAGES } from "../../../common/Constants";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteRecords = (props: any) => {

    const dispatch = useDispatch();
    // const fetchAPI = useFetch();

    const getDeletedIds = (rowlist: any) => {
        const idList: any = [
        ];
        rowlist.map((item: any) => {
            return idList.push(item.id);
        });
        return idList;
    };

    const successCB = (response: any, deletedRows: any) => {
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

    const deleteRecords = (itemlist: any) => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        request.addData({
            idList: JSON.stringify(getDeletedIds(itemlist))
        });
        useFetch().placePOSTRequest(
            CONTACT_US.DELETE_CONTACTS, 
            request, 
            (resp) => {
                return successCB(resp, getDeletedIds(itemlist)); 
            }, 
            errorCB 
        );
    };

    
    const onClickDelete = (deletedRow: any) => {
        
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
            {/* <Button
                variant= {props.variant}
                size="small"
                color = {props.color}
                className= {props.customClass}
                onClick={() => {
                    return onClickDelete(props.rowsSelected); 
                }}
            > */}

            <IconButton
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
                
            {/* </Button> */}
        </>
    );
};

export default DeleteRecords;

import { hideLoader, showAPPDialog, showLoader, showSnackBar } from "../../../state/AppConfigReducer";
import { ServiceRequest, useFetch } from "index";
import { CONTACT_US } from "communicator/ServiceUrls";
import { ErrorType } from "common/Types";
import { getText } from "common/Text";
import { IconButton } from "@mui/material";
import { IMAGES } from "../../../common/Constants";
import React from "react";
import { useDispatch } from "react-redux";


const UpdateRecord = (props: any) => {

    const dispatch = useDispatch();
    // const fetchAPI = useFetch();

    const successCB = (response: any) => {
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

    const updateRecords = (itemlist: any) => {
        dispatch(showLoader());
        const request = new ServiceRequest();
        const credentials = {
            id: itemlist[ 0 ].id,
            remarks: itemlist[ 0 ].remarks ? itemlist[ 0 ].remarks : "",
            assignTo: itemlist[ 0 ].assignto ? itemlist[ 0 ].assignto : ""
        };
        request.addData(credentials);
        useFetch().placePOSTRequest(
            CONTACT_US.UPDATE_CONTACTS, 
            request, 
            successCB, 
            errorCB 
        );
    };

    
    const onClickUpdate = (selectedRecord: any) => {
        
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
            {/* <Button
                variant= {props.variant}
                size="small"
                // color = {props.color}
                className= {props.customClass}
                
            > */}
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

import AppText, { getText } from "common/Text";
import { Box, Button } from "@mui/material";
import { ErrorType, MESSAGE_SUCCESS_RESPONSE } from "common/Types";
import { ServiceRequest, useFetch } from "index";
import { AUTH } from "communicator/ServiceUrls";
import { handleLogout } from "common/Bridge";
import React from "react";
import { SCREENS } from "common/Constants";
import { showAPPDialog } from "../../../state/AppConfigReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type PropsTypes = { 
    closePopOver: (arg0: boolean) => void;
 }

const LogOut = (props: PropsTypes) => {

    const fetchAPI = useFetch();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const successCB = (response: MESSAGE_SUCCESS_RESPONSE) => {
        console.log("logout response", response);
        handleLogout();
        navigate(SCREENS.LOGIN);
    };

    const errorCB = (error: ErrorType) => {
        console.log("logout Error", error.message); 
    };

    const logout = () => {
        const request = new ServiceRequest();
        fetchAPI.placeGETRequest(AUTH.PORTAL_LOGOUT, request, successCB, errorCB );
    };


    const confirmLogOut = () => {
        props.closePopOver(true);
        dispatch(showAPPDialog({
            title: getText("LOGOUT_TITLE", "CONFIRMATION"),
            message: getText("LOGOUT_MSG", "CONFIRMATION"),
            buttons: [
                { name: getText("CANCEL", "BUTTON"), className: "cancel-btn" },
                { name: getText("OK", "BUTTON"), action: logout, className: "ok-btn" }
            ]
        }));
    };

    return (
        <>
            <Box px={"40px"} py={"10px"}>
                <Button variant="outlined"
                    className="logout-button"
                    onClick={confirmLogOut}
                >
                    <AppText textName="LOGOUT" /></Button>
            </Box>
        </>
    );
};

export default LogOut;

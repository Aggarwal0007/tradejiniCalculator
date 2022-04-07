import { Box, Button, Grid, Modal, Paper, Typography } from "@mui/material";
import { IMAGES, SCREENS } from "../../common/Constants";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFullURL } from "common/AppSettings";
import { handleLogout } from "common/Bridge";
import { logoutURL } from "communicator/ServiceUrls";
import ServiceRequest from "communicator/Request";
// import { storeLoginDetails } from "common/Bridge";
// import { storeToSessionStorage } from "services/Storage";
import useFetch from "communicator/UseFetch";


const Contactus = () => {
    const fetchAPI = useFetch();
    const navigate = useNavigate();
    const locate = useLocation();
    const user = locate.state as string;

    const [
        openDiv, setOpenDiv
    ] = useState<boolean>(false);

    const [
        openModal, setOpenModal
    ] = useState<boolean>(false);

    const toggleBox =() => {
        setOpenDiv(!openDiv);
    };

    const successCB = () => {
        handleLogout();
        navigate(SCREENS.LOGIN);
    };

    const errorCB = (error:Error) => {
        console.log("error", error); 
    };

    const handleClose = () => {
        setOpenModal(!openModal);
    };


    const logout =() => {
        setOpenModal(!openModal); 
    };

    const confirmLogout =() => {
        const request = new ServiceRequest();
        fetchAPI.placeGETRequest(getFullURL(logoutURL), request, successCB, errorCB );
        setOpenModal(!openModal);   
    };
    
    const cancel = () => {
        setOpenModal(!openModal);
    };

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Grid container spacing={2} className="dashboard-header">
            <Grid item xs={6} lg={9} md={9}>
                <img src={IMAGES.LOGO} className="dashboard-logo" />
            </Grid>
            <Grid item xs={6} lg={3} md={3}>
                <Box sx={{ m: 2, textAlign: "right" }}>
                    <img src={IMAGES.USER_ICON} className="user-icon" onClick={toggleBox}/> 
                    <Box>  {openDiv===true &&
                            <Paper className="logout-popup">
                                <Box sx={{ borderBottom: 1 }}>
                                    <Typography component="h6" align="left" color="#1976d2" pt={3} m={2}>
                                        {user}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 1, p:3 }}>
                                    <Button variant="outlined" fullWidth sx={{ mb:2 }}
                                        className="logout-button" onClick={logout}>LOGOUT</Button>
                                </Box>
                            </Paper>
                    }  
                    </Box>   
                </Box>
            </Grid>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" component="h1" variant="h5" sx={{ mb:2 }}>
                    Confirm Logout!
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to logout now?
                    </Typography>
                    <Box className="modal-btns" sx={{ m: 2, justifyContent: "right" }}>
                        <Button onClick={cancel}>Cancel</Button>
                        <Button onClick={confirmLogout}>OK</Button>
                    </Box>
                </Box>
            </Modal>
        </Grid>    
    );

};

export default Contactus;

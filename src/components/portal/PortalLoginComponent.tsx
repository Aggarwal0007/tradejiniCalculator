import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { IMAGES, SCREENS } from "../../common/Constants";
import React, { useState } from "react";

import { ServiceRequest, useFetch } from "index";

import AppText from "common/Text";
import { AUTH } from "communicator/ServiceUrls";
import { ErrorType } from "common/Types";
import { storeLoginDetails } from "common/Bridge";
import { useNavigate } from "react-router-dom";

const PortalLogin = () => {
    const fetchAPI = useFetch();
    const navigate = useNavigate();
    
    /*
       Credentials 

       username: admin
       password: tradejini@admin

       */
    
    const [
        user, setUser
    ] = useState<string>("");

    const [
        password, setPassword
    ] = useState<string>("");

    const onChangeUser = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setUser(evt.target.value);
    };

    const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value);
    };

    const successCB = (response: {status: string, d: {message: string}}) => {
        console.log("response login", response);
        storeLoginDetails({ 
            username: user 
        });
        navigate(SCREENS.CONTACTUS, { state: user });
    };

    const errorCB = (error: ErrorType) => {
        console.log("login Error:", error.message);
        navigate(SCREENS.LOGIN);
    };

    const login=(evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const credentials = {
            username: user,
            password: password
        };
        const request = new ServiceRequest();
        request.addData(credentials);
        fetchAPI.placePOSTRequest(AUTH.PORTAL_LOGIN, request, successCB, errorCB );
    };

    return (
        <>
            <div className="login-content" id="login-body">  
                <img src={IMAGES.LOGO} className="app-logo" />
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5" align="center">
                       Admin Portal Login
                    </Typography>
                    <Box component="form" onSubmit={login}>
                        <TextField
                            autoFocus
                            margin="normal"
                            fullWidth
                            required
                            name="Username"
                            label="Username"
                            value={user}
                            onChange={onChangeUser}
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                        />
                        <Button type="submit" className="login-btn"
                            sx={{ mt:3, backgroundColor: "#00cd97" }} fullWidth><AppText textName="LOGIN" /></Button>
                    </Box>
                </Container>
            </div> 
        </>
    );
};

export default PortalLogin;

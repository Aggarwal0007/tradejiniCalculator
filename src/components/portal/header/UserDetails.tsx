import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { storage } from "index";
import { WINDOW_STORAGE } from "common/Constants";

const UserDetails = () => {

    const [
        loggedUser
    ] = useState(storage.getFromSessionStorage(WINDOW_STORAGE.USER_NAME));
    return (
        <Box px={"40px"} py={"10px"}>
            <Typography component="h6" align="left" color="#1976d2">
                {loggedUser}
            </Typography>
        </Box>
    );

};

export default UserDetails;

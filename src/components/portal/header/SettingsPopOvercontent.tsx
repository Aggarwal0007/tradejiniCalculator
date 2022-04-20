import { Box } from "@mui/material";
import LogOut from "./LogOut";
import React from "react";
import UserDetails from "./UserDetails";


const SettingsPopOverContent = (props: { closePopOver: (arg0: boolean) => void; }) => {
    
    const closePopOver = (isClose: boolean) => {
        props.closePopOver(isClose);
    };
    return (
        <>
            <Box width={"200px"}>
                <UserDetails />
                <LogOut
                    closePopOver = {closePopOver}
                />  
            </Box>
        </>
    );

};

export default SettingsPopOverContent;

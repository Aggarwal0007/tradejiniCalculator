import { Box, Button, Popover } from "@mui/material";
import { IMAGES } from "../../../common/Constants";
import React from "react";
import SettingsPopOverContent from "./SettingsPopOvercontent";

const SettingsPopOver = () => {

    const [
        anchorEl, setAnchorEl
    ] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (evt: { currentTarget: React.SetStateAction<HTMLButtonElement | null>; }) => {
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openDiv = Boolean(anchorEl);
    const ids = openDiv ? "simple-popover" : "no-popover";
  
    const closePopOver = (isClose: boolean) => {
        
        isClose ? setAnchorEl(null) : null; 
    };

    return (
        <>
            <Box p={0}>
                <Button 
                    aria-describedby={ids}
                    variant="text"
                    onClick={handleClick}
                    className="settings-avatar-btn"
                >
                    <img src={IMAGES.USER_ICON} className="portal-user-icon"/>
                </Button>
            </Box>
           
            <Popover
                id={ids}
                open={openDiv}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{ 
                    vertical: "top", 
                    horizontal: "right" 
                }}
            >
               
                <SettingsPopOverContent 
                    closePopOver = {closePopOver}
                />
            </Popover>
        </>
    );
};

export default SettingsPopOver;

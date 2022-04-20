import { IMAGES, SCREENS } from "../../../common/Constants";
import { Grid } from "@mui/material";
import PortalMenu from "./PortalMenuComponent";
import React from "react";
import SettingsPopOver from "./SettingsPopOver";
import { useNavigate } from "react-router-dom";

const PortalHeader = () => {

    const navigate = useNavigate();

    const onClickLogo = () => {
        navigate(SCREENS.CONTACTUS);
    };

    return (
        <Grid container>
            <Grid item xs={2} sm={2} md={1} lg= {1}>
                <img 
                    src={IMAGES.LOGO}
                    className="portal-logo"
                    onClick={() => {
                        return onClickLogo(); 
                    }}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={11} lg= {11} className="portal-menu-list">
                
                <PortalMenu />
                <SettingsPopOver />
            </Grid>
           
        </Grid>
        
    );
};

export default PortalHeader;

import { Box, Button, FormControl, FormControlLabel, Grid, MenuItem, Modal, 
    Popover, Select, SelectChangeEvent, styled, Switch, Typography } from "@mui/material";
import { IMAGES, SCREENS, THEME } from "../../common/Constants";
import React, { useState } from "react";

import { ServiceRequest, useFetch } from "index";

import { updateLanguage, updateTheme, useConfigStore } from "state/AppConfigReducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AppText from "common/Text";
import { AUTH } from "communicator/ServiceUrls";
import ContactusTable from "./ContactusTable";
import { handleLogout } from "common/Bridge";
import { languageOptions } from "common/language";

const Contactus = () => {
    const fetchAPI = useFetch();
    const navigate = useNavigate();
    const locate = useLocation();
    const dispatch = useDispatch();
    const user = locate.state as string;
    const language = useSelector(useConfigStore).language;
    const themeSeleceted = useSelector(useConfigStore).theme;
    const menustyle = { display: "flex", alignItems: "center", justifyContent: "space-between" };
    const [
        anchorEl, setAnchorEl
    ] = React.useState<HTMLButtonElement | null>(null);
  
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const [
    //     openDiv, setOpenDiv
    // ] = useState<boolean>(anchorEl);

    const [
        openModal, setOpenModal
    ] = useState<boolean>(false);

    const [
        lang, setLang
    ] = useState(language);

    const [
        selecetedtheme, setSelecetedtheme
    ] = useState<boolean>(themeSeleceted===THEME.DARK);

    const handleChange = (evt: SelectChangeEvent) => {
        setLang(evt.target.value);
        const selectedLang = languageOptions.find((item) => {
            return item === evt.target.value; 
        });
        console.log(selectedLang);
        dispatch(updateLanguage(selectedLang));
    };

    // const toggleBox =() => {
    //     setOpenDiv(!openDiv);
    // };

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(evt.currentTarget);
    };

    const successCB = () => {
        handleLogout();
        navigate(SCREENS.LOGIN);
    };

    const errorCB = (error:Error) => {
        console.log("error", error); 
    };

    const handleCloseModal = () => {
        setOpenModal(!openModal);
    };


    const logout =() => {
        setOpenModal(!openModal); 
    };

    const confirmLogout =() => {
        const request = new ServiceRequest();
        fetchAPI.placeGETRequest(AUTH.PORTAL_LOGOUT, request, successCB, errorCB );
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

    const openDiv = Boolean(anchorEl);
    const ids = openDiv ? "simple-popover" : "undefined";
    const MaterialUISwitch = styled(Switch)(({ theme }) => {
        return {
            width: 62,
            height: 34,
            padding: 7,
            "& .MuiSwitch-switchBase": {
                margin: 1,
                padding: 0,
                transform: "translateX(6px)",
                "&.Mui-checked": {
                    color: "#fff",
                    transform: "translateX(22px)",
                    "& .MuiSwitch-thumb:before": {
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent("#fff",)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                    },
                    "& + .MuiSwitch-track": {
                        opacity: 1,
                        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                    },
                },
            },
            "& .MuiSwitch-thumb": {
                backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
                width: 32,
                height: 32,
                "&:before": {
                    content: "''",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent("#fff",)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
                },
            },
            "& .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                borderRadius: 20 / 2,
            },
        }; 
    });

    const handleTheme = () => {
        setSelecetedtheme(!selecetedtheme);       
        dispatch(updateTheme(!selecetedtheme ? THEME.DARK : THEME.LIGHT));
    };
      
    return (
        <>
            <Grid container spacing={2} className="dashboard-header">
                <Grid item xs={6} lg={9} md={9}>
                    <img src={IMAGES.LOGO} className="dashboard-logo" />
                </Grid>
                <Grid item xs={6} lg={3} md={3}>
                    <Box sx={{ m: 1, textAlign: "right" }}>
                        <Button aria-describedby={ids} variant="text" onClick={handleClick}>
                            <img src={IMAGES.USER_ICON} className="user-icon"/>
                        </Button>
                        <Popover
                            className="logout-popup"
                            id={ids}
                            open={openDiv}
                            onClose={handleClose}
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            PaperProps={{
                                sx: {
                                    mt: 1.5,
                                    ml: 0.5,
                                    overflow: "inherit",
                                    width: 300,
                                }
                            }}
                        > <Box>
                                <Box sx={{ borderBottom: 1 }}>
                                    <Typography component="h6" align="left" color="#1976d2" pt={3} m={2}>
                                        {user}
                                    </Typography>
                                    <Box sx={{ px: 2, py: 1 }}>
                                        <FormControlLabel
                                            control={<MaterialUISwitch sx={{ mx: 0 }} />}
                                            label={<AppText textName="THEME" />}
                                            labelPlacement="start"
                                            checked={selecetedtheme}
                                            onChange={handleTheme}
                                            sx={{ m: 0, ...menustyle }}
                                        />
                                    </Box>
                                    <Box>
                                        <Grid xs={12} sx={{ m:2, ...menustyle }} >
                                            <AppText textName="LANGUAGE"/>
                                            <FormControl sx={{ }}>

                                                <Select
                                                    value={lang}
                                                    className="lang-select"
                                                    onChange={handleChange}
                                                    displayEmpty
                                                    inputProps={{ "aria-label": "Without label" }}
                                                >  {languageOptions.map((item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item}
                                                                value={item}
                                                            >
                                                                <AppText textName={item} />
                                                            </MenuItem>
                                                        ); 
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Box sx={{ mb: 1, p:3 }}>
                                    <Button variant="outlined" fullWidth sx={{ mb:2 }}
                                        className="logout-button" onClick={logout}>
                                        <AppText textName="LOGOUT" /></Button>
                                </Box>
                            </Box> </Popover> 
                    </Box>
              
                </Grid>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" component="h1" variant="h5" sx={{ mb:2 }}>
                            <AppText textModule="CONFIRMATION" textName="LOGOUT_TITLE" />
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <AppText textModule="CONFIRMATION" textName="LOGOUT_MSG" />
                        </Typography>
                        <Box className="modal-btns" sx={{ m: 2, justifyContent: "right" }}>
                            <Button onClick={cancel}><AppText textModule="BUTTON" textName="CANCEL" />
                            </Button>
                            <Button onClick={confirmLogout}><AppText textModule="BUTTON" textName="OK" />
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Grid>   
            <ContactusTable />
        </>
    );

};

export default Contactus;

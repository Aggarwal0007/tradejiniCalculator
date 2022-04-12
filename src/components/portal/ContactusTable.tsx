import { Box, Button, Checkbox, Grid, Modal, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { DateRange, DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AppText from "common/Text";
import { CONTACT_US } from "communicator/ServiceUrls";

const ContactusTable = () => {
    const fetchAPI = useFetch();
    const request = new ServiceRequest();

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    type contentType ={
        id:number,
        name:string,
        phone:string,
        email:string,
        subject:string,
        assignto:string,
        remarks:string
    }

    const [
        value, setValue
    ] = useState<DateRange<Date>>([
        null, null
    ]);

    const [
        idSelecetd, setIdSeleceted
    ] = useState<number | string>( );

    const [
        content, setContent
    ] = useState<any>([
    ]);

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const [
    //     openDiv, setOpenDiv
    // ] = useState<boolean>(anchorEl);
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };

    const [
        openModal, setOpenModal
    ] = useState<boolean>(false);

    const successCB = (response: { d: []; }) => {
        console.log(response.d);
        setContent(response.d);
    };

    const errorCB = () => {
        console.log("error");
    };

    const getData=() => {
        fetchAPI.placeGETRequest(CONTACT_US.GET_CONTACTS, request, successCB, errorCB );
    };
      
    useEffect(() => {
        getData();
    }, [
    ]);

    const successDelete=() => {
        getData();
    };
    
    const errorDelete =() => {
        console.log("error");
    };

    const handleCloseModal = () => {
        setOpenModal(!openModal);
    };


    const cancel =() => {
        setOpenModal(!openModal); 
    };

    const confirmDelete =() => {
        request.addData(
            { idList:JSON.stringify([
                idSelecetd
            ]) }
        );
        fetchAPI.placePOSTRequest(CONTACT_US.DELETE_CONTACTS, request, successDelete, errorDelete );
        setOpenModal(!openModal);
        console.log(idSelecetd);
        const abc=idSelecetd;
        if (abc)
            document.getElementById(abc.toString())?.classList.add("deletion-animation");
    };

    const deleteContent =(ids:number) => {
        setIdSeleceted(ids);
        setOpenModal(!openModal);
    };

    return (
        <>
          
            <div className="contactus-table" id="login-body">  
                <Grid sx={{ display:{ xs: "grid", md: "grid", lg: "inline-flex" }, 
                    justifyContent:{ xs:"space-around", lg:"space-between" } }}>
                    <Box className="contactusTable-btns" sx={{ display:"inline-flex", width:{ xs:"100%" }, 
                        justifyContent:{ xs:"space-between", lg:"left" } }}>
                        <Button size="medium" sx={{ m:2 }}>Recycle</Button>
                        <Button size="medium" sx={{ m:2 }}>Export</Button>
                    </Box>
                    <LocalizationProvider dateAdapter= {AdapterDateFns}>
                        <DateRangePicker
                            startText="From"
                            endText="To"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => {
                                return (
                                    <React.Fragment>
                                        <TextField {...startProps} size="small" sx={{ width:"50%", m:2 }}/>
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} size="small" sx={{ width:"50%", m:2 }}/>
                                    </React.Fragment>
                                ); 
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className="contactsTable-head">
                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Phone No</TableCell>
                                    <TableCell align="right">Email id</TableCell>
                                    <TableCell align="right">Subject</TableCell>
                                    <TableCell align="right">Assign to</TableCell>
                                    <TableCell align="right">Remarks</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {content && (content).map((row:contentType, index:number) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            id={row.id.toString()}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Checkbox {...label} />
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.subject}</TableCell>
                                            <TableCell align="right"> <TextField
                                                className="assignto-field"
                                                margin="normal"
                                                name="assignto"
                                                value={row.assignto}
                                                sx={{ width:"100px" }}
                                                size="small"
                                            // onChange={onChangeAssignto}
                                            /></TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    className="remarks-field"
                                                    margin="normal"
                                                    name="assignto"
                                                    value={row.remarks}
                                                    fullWidth
                                                    size="small"
                                                    // onChange={onChangeUser}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button className="update-btn" 
                                                    size="small" sx={{ m:3 }} >Update</Button>
                                                <Button size="small" className="delete-btn" 
                                                    onClick={() => {
                                                        return deleteContent(row.id); 
                                                    }} >Delete</Button>
                                            </TableCell>

                                        </TableRow>
                                    ); 
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ ...style }}>
                            <Typography id="modal-modal-title" component="h1" variant="h5" sx={{ mb:2 }}>
                                <AppText textModule="CONFIRMATION" textName="DELETE_TITLE" />
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <AppText textModule="CONFIRMATION" textName="DELETE_MSG" />
                            </Typography>
                            <Box className="modal-btns" sx={{ m: 2, justifyContent: "right" }}>
                                <Button onClick={cancel}><AppText textModule="BUTTON" textName="CANCEL" />
                                </Button>
                                <Button onClick={confirmDelete}><AppText textModule="BUTTON" textName="OK" />
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Paper>
            </div>
        </>
    );

};
export default ContactusTable;

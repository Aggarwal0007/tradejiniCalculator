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

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    type contentType ={
        status:number,
        id:number,
        date: string,
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
    ] = useState([
    ] as any);

    const [
        content, setContent
    ] = useState([
    ] as any);

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
        setContent(response.d);
    };

    const errorCB = () => {
        console.log("error");
    };

    const getData=() => {
        const request = new ServiceRequest();
        if (value[ 0 ] && value[ 1 ] !==null) {
            const month =Number(value[ 0 ]?.getMonth())+1;
            const fromDate = (`${value[ 0 ]?.getFullYear()}-0${month}-0${value[ 0 ]?.getDate()}`);
            const month1 =Number(value[ 1 ]?.getMonth())+1;
            const toDate = (`${value[ 1 ]?.getFullYear()}-0${month1}-0${value[ 1 ]?.getDate()}`);
            const credentials = {
                startDate: fromDate,
                endDate: toDate
            };
            request.addData(credentials);
        }
        fetchAPI.placeGETRequest(CONTACT_US.GET_CONTACTS, request, successCB, errorCB );
    };
      
    useEffect(() => {
        getData();
    }, [
    ]);

    const onChangeAssignto = (inx:number, evt: string) => {
        content[ inx ].assignto=evt;
        setContent([
            ...content
        ]);
        
    };

    const onChangeRemarks = (idVal:number, evt: string) => {
        content[ idVal ].remarks=evt;
        setContent([
            ...content
        ]);
    };

    const successUpdate=() => {
        getData();
    };
    
    const errorUpdate=() => {
        console.log("error");
    };

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
        if (idSelecetd) {
            document.getElementById(idSelecetd.toString())?.classList.add("deletion-animation");
        }
        const request = new ServiceRequest();
        request.addData(
            { idList:JSON.stringify(
                idSelecetd
            ) }
        );
        fetchAPI.placePOSTRequest(CONTACT_US.DELETE_CONTACTS, request, successDelete, errorDelete );
        setOpenModal(!openModal);

    };

    const deleteContent =(ids:number) => {
        setIdSeleceted([
            ids
        ]);
        setOpenModal(!openModal);
    };

    const updateContent = (selectedId:number, inx:number) => {
        const request = new ServiceRequest();
        const credentials = {
            id: selectedId,
            remarks: content[ inx ].remarks?content[ inx ].remarks:"",
            assignTo: content [ inx ].assignto?content [ inx ].assignto:""
        };
        request.addData(credentials);
        fetchAPI.placePOSTRequest(CONTACT_US.UPDATE_CONTACTS, request, successUpdate, errorUpdate );
    };

    const selecetdRow=(inx:number) => {
        content[ inx ].status=content[ inx ].status===0?1:0;
        setContent([
            ...content
        ]);
    };

    const deleteAll =() => {
        const allId = [
        ] as any;

        const all = content.filter((item:contentType) => {
            if (item.status===1) 
                return item;
            return null;
        });
        for (let val=0;val<all.length;val++) {
            allId.push(all[ val ].id);
        }
        setIdSeleceted(allId);
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
                            className="date-field"
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => {
                                return (
                                    <React.Fragment>
                                        <TextField {...startProps} size="small"
                                            sx={{ width:"50%", m:2 }}/>
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} size="small" 
                                            sx={{ width:"50%", m:2 }}/>
                                        <Button sx={{ backgroundColor:"#00cd97", color:"white",
                                            textTransform:"capitalize", mr:3 }} onClick={getData}>update</Button>
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
                                    <TableCell></TableCell>
                                    <TableCell><AppText textModule="HEADER" textName="DATE"/></TableCell>
                                    <TableCell align="right">
                                        <AppText textModule="HEADER" textName="NAME"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <AppText textModule="HEADER" textName="PHONE_NO"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <AppText textModule="HEADER" textName="EMAIL_ID"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <AppText textModule="HEADER" textName="SUBJECT"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <AppText textModule="HEADER" textName="ASSIGN_TO"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <AppText textModule="HEADER" textName="REMARKS"/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <AppText textModule="HEADER" textName="ACTIONS"/>
                                    </TableCell>
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
                                                <Checkbox {...label}
                                                    onClick={() => {
                                                        return selecetdRow(index); 
                                                    }} checked={ row.status===0?!true:true} />
                                            </TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
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
                                                onChange={(evt) => {
                                                    return onChangeAssignto(index, evt.target.value); 
                                                }}
                                            /></TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    className="remarks-field"
                                                    margin="normal"
                                                    name="remarks"
                                                    defaultValue={row.remarks}
                                                    fullWidth
                                                    size="small"
                                                    onChange={(evt) => {
                                                        return onChangeRemarks(index, evt.target.value); 
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button className="update-btn" 
                                                    size="small" sx={{ m:3 }} onClick={() => {
                                                        return updateContent(row.id, index); 
                                                    }}><AppText textModule="BUTTON" textName="UPDATE" />
                                                </Button>
                                                <Button size="small" className="delete-btn" 
                                                    onClick={() => {
                                                        return deleteContent(row.id); 
                                                    }} ><AppText textModule="BUTTON" textName="DELETE" />
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ); 
                                })}
                            </TableBody>
                        </Table>
                        <Button className="delete-btn" sx={{ m:3 }} onClick={deleteAll}>
                            <AppText textModule="BUTTON" textName="DELETE_ALL" /></Button>
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
                                {idSelecetd.length} {"item?"}
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

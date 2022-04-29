import { DATE_RANGE, WEBSITE_CONTACTS } from "common/Types";
import { Grid, IconButton } from "@mui/material";
import { CONTACT_US } from "communicator/ServiceUrls";
// import DateRange from "../DateRange";
import DeleteRecords from "../DeleteRecords";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { IMAGES } from "../../../../common/Constants";
import React from "react";
import RestoreRecords from "./RestoreRecords";

type PropsTypes = { 
    showContactUsModel: React.MouseEventHandler<HTMLButtonElement>; 
    recordsSelected: WEBSITE_CONTACTS[]; 
    goToAnimation: { 
        (arg0: number[]): void; 
        (arg0: number[]): void;
     };
      setDateRangeValues: (arg0: DATE_RANGE) => void;
    }
    
function CustomToolbarRecycleBin(props: PropsTypes) { 
    return (
        <GridToolbarContainer>
            <Grid container>
                <Grid item
                    xs={12} sm={6} md={6} lg= {6}
                >

                    <IconButton
                        onClick={props.showContactUsModel}
                    >
                        <img 
                            src={IMAGES.BACK_ICON} 
                            className="back-to-contacts-icon"
                            title={"Back to Contacts"}
                        />
                    </IconButton>

                    <DeleteRecords 
                        rowsSelected = {props.recordsSelected}
                        customClass = "delete-all-icon"
                        name = "Delete All"
                        variant = "text"
                        deleteRowSuccess = {props.goToAnimation}
                        from="Recycle"
                        url= {CONTACT_US.DELETE_RECYCLE_CONTACTS}
                    />

                    <RestoreRecords 
                        rowsSelected = {props.recordsSelected}
                        customClass = "restore-all-icon"
                        name = "Restore All"
                        variant = "text"
                        restoreRowSuccess = {props.goToAnimation}
                    />
                </Grid>

                <Grid item 
                    xs={12} sm={6} md={6} lg= {6} 
                    className="date-range-selector"
                    sx={
                        {  
                            display: { xs:"flex" },
                            justifyContent:{ xs:"center", sm:"flex-end" }
                        }
                    }
                >
                    {/* <DateRange
                        dateRangeValues = {props.setDateRangeValues}
                    /> */}
                    
                </Grid>
                
            </Grid>
           
        </GridToolbarContainer>
    );
}

export default CustomToolbarRecycleBin;

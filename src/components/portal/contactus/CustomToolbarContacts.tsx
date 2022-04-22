import { Grid, IconButton } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import DateRange from "./DateRange";
import DeleteRecords from "./DeleteRecords";
import { IMAGES } from "../../../common/Constants";
import React from "react";

function CustomToolbarContacts(props: any) { 

    return (
        <GridToolbarContainer>
            <Grid container>
                <Grid item
                    xs={12} sm={6} md={6} lg= {6}
                >
                    <DeleteRecords 
                        rowsSelected = {props.deleteRows}
                        customClass = "delete-all-icon"
                        name = "Delete All"
                        variant = "text"
                        deleteRowSuccess = {props.goToAnimation}
                        from="WebsiteContacts"
                    />

                    <IconButton
                        onClick={props.recycleBinModel}
                    >
                        <img 
                            src={IMAGES.RECYCLE_BIN_ICON} 
                            className="recycle-bin-icon"
                            title={"Recycle Bin"}
                        />
                    </IconButton>
                       
                    <GridToolbarExport 
                        printOptions={{ disableToolbarButton: true }}
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
                    <DateRange
                        dateRangeValues = {props.setDateRangeValues}
                    />
                    
                </Grid>
                
            </Grid>
           
        </GridToolbarContainer>
    );
}

export default CustomToolbarContacts;

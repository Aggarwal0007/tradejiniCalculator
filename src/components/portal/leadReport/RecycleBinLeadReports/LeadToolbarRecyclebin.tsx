import { DATE_RANGE, LEAD_REPORT } from "common/Types";
import { Grid, IconButton } from "@mui/material";
import DateRange from "../../contactus/DateRange";
import DeleteRecords from "../../contactus/DeleteRecords";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { IMAGES } from "common/Constants";
import { LEADFORM } from "communicator/ServiceUrls";
import React from "react";
import RestoreLeadReport from "./RestoreLeadReports";

type PropsTypes = { 
    showLeadReportModel: React.MouseEventHandler<HTMLButtonElement>; 
    recordsSelected: LEAD_REPORT[]; 
    goToAnimation: { 
        (arg0: number[]): void; 
     };
      setDateRangeValues: (arg0: DATE_RANGE) => void;
    }

function LeadToolbarRecyclebin(props: PropsTypes) { 

    
    return (
        <GridToolbarContainer>
            <Grid container>
                <Grid item
                    xs={12} sm={6} md={6} lg= {6}
                >

                    <IconButton
                        onClick={props.showLeadReportModel}
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
                        url= {LEADFORM.DELETE_RECYCLE_LEADFORM}
                    />
                    <RestoreLeadReport 
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
                    <DateRange
                        dateRangeValues = {props.setDateRangeValues}
                    />
                
                </Grid>
            
            </Grid>
       
        </GridToolbarContainer>
    );
}
export default LeadToolbarRecyclebin;

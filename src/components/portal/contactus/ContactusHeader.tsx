import { Box, Button, Grid } from "@mui/material";
import DateRangeSelector from "./DateRangePicker";
import React from "react";

const ContactUsHeader = () => {

    return (
        <Grid container className="contact-header">
            <Grid item 
                xs={12} sm={6} md={6} lg= {6}
                sx={
                    {  
                        display: { xs:"flex" },
                        justifyContent:{ xs:"center", sm:"flex-start", md:"flex-start" }
                    }
                }
            >
                <Box>
                    <Button 
                        size="small"
                        variant="contained"
                        className="custom-btn"
                    >
                         Recycle Bin
                    </Button>
                </Box>
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
                <DateRangeSelector />
            </Grid>
            
        </Grid>
    );
};

export default ContactUsHeader;

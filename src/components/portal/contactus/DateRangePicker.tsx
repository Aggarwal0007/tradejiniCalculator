import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";

const DateRangeSelector = () => {
    const [
        value, setValue
    ] = useState<any>([
        null, null
    ]);
  
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        ); 
                    }}
                />
            </LocalizationProvider>
            <Button>
                Go
            </Button>
        </>
        
    );
};

export default DateRangeSelector;

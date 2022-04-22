import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";

const DateRangeSelector = (props: any) => {
    const [
        value, setValue
    ] = useState<any>([
        null, null
    ]);
  
    const getDateRangeValue = () => {
        if (value[ 0 ] && value[ 1 ] !==null) {
            const month =Number(value[ 0 ]?.getMonth())+1;
            const fromDate = (`${value[ 0 ]?.getFullYear()}-0${month}-0${value[ 0 ]?.getDate()}`);
            const month1 =Number(value[ 1 ]?.getMonth())+1;
            const toDate = (`${value[ 1 ]?.getFullYear()}-0${month1}-0${value[ 1 ]?.getDate()}`);
            const dateRange = {
                startDate: fromDate,
                endDate: toDate
            };
            console.log("dateRange values", dateRange, props);
            props && props.dateRangeValues && props.dateRangeValues(dateRange);
        }
        
    };
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
            <Button
                onClick={() => {
                    return getDateRangeValue(); 
                }}
            >
                Go
            </Button>
        </>
        
    );
};

export default DateRangeSelector;

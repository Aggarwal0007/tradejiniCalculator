import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import React from "react";
import TextField from "@mui/material/TextField";

const DatePicker = (props: { 
    parentCB: (arg0: Date | null) => void; 
    labelString: boolean | React.ReactChild | React.ReactFragment | 
    React.ReactPortal | null | undefined; }) => {

    const [
        selectedDate, setSelectedDate
    ] = React.useState<Date | null>(null);

    const onChangeDate = (date: Date | null) => {
        setSelectedDate(date);
        props.parentCB(date);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    label= {props.labelString}
                    value={selectedDate}
                    maxDate={new Date()}
                    onChange= {(newValue: Date | null) => {
                        return onChangeDate(newValue); 
                    }}
                    renderInput={(params) => {
                        return <TextField {...params} />; 
                    }}
                />
            </LocalizationProvider>
        </>
    );
};

export default DatePicker;

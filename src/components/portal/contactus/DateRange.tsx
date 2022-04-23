import React, { useState } from "react";
import { Button } from "@mui/material";
import { DATE_RANGE } from "common/Types";
import DatePicker from "../../common/DatePicker";

type PropsTypes = {
    dateRangeValues: (arg0: DATE_RANGE) => void;
}
const DateRange = (props: PropsTypes) => {

    const [
        startDate, setStartDate
    ] = useState<Date | null>();

    const [
        endDate, setEndDate
    ] = useState<Date | null>();

    const setStartDateFromCb = (val: Date | null) => {
        setStartDate(val);
    };

    const setEndDateFromCb = (endVal: Date | null) => {
        setEndDate(endVal);
    };

    const getDateRangeValue = () => {
        if (startDate && endDate !==null) {
            const month =Number(startDate?.getMonth())+1;
            const fromDate = (`${startDate?.getFullYear()}-0${month}-0${startDate?.getDate()}`);
            const month1 =Number(endDate?.getMonth())+1;
            const toDate = (`${endDate?.getFullYear()}-0${month1}-0${endDate?.getDate()}`);

            const dateRange = {
                startDate: fromDate,
                endDate: toDate
            };
            console.log("dateRange values", dateRange);
            props && props.dateRangeValues && props.dateRangeValues(dateRange);
        }
        
    };

    return (
        <div className="date-range-container">
            <DatePicker 
                labelString = "From"
                parentCB = {setStartDateFromCb}
            />
            <DatePicker 
                labelString = "To"
                parentCB = {setEndDateFromCb}
            />
            <Button
                className="date-go-btn"
                onClick={() => {
                    return getDateRangeValue(); 
                }}
            >
                Go
            </Button>
        </div>
    );
};

export default DateRange;

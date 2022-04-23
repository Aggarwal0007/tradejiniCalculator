import { Charges, InputTypes } from "common/Types";
import ChargeListTable from "./ChargeListTableComponent";
import { Grid } from "@mui/material";
import React from "react";
import TotalChargesTable from "./TotalChargesTableComponent";

type PropsTypes = {
    chargesList: Charges;
     inputKeys: InputTypes;
}

const SeeAllCharges = (props: PropsTypes) => {

    const chargeProps = {
        chargeList: props.chargesList,
        inputKeys: props.inputKeys
    };

    return (
        <Grid container spacing={4} justifyContent="center" className="see-all-charges-container row">
            <Grid item xs={10} lg={5} sm={5}>
                <TotalChargesTable
                    {...chargeProps}
                />
            </Grid>
            <Grid item xs={10} lg={5} sm={5}>
                <ChargeListTable 
                    {...chargeProps}
                />
            </Grid>
        </Grid>
    );
};

export default SeeAllCharges;

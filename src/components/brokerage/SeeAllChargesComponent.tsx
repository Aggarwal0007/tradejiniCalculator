import ChargeListTable from "./ChargeListTableComponent";
import React from "react";
import TotalChargesTable from "./TotalChargesTableComponent";

const SeeAllCharges = (props: { chargesList: any; inputKeys: any }) => {

    console.log("props charges", props);
    const chargeProps = {
        chargeList: props.chargesList,
        inputKeys: props.inputKeys
    };
    return (
        <div className="see-all-charges-container row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <TotalChargesTable
                    {...chargeProps}
                />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <ChargeListTable 
                    {...chargeProps}
                />
            </div>
        </div>
    );
};

export default SeeAllCharges;

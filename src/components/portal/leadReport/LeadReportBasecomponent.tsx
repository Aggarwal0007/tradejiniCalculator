import React, { useState } from "react";
import LeadReportTable from "./LeadReportTable";
import RecycleBinLeadReports from "./RecycleBinLeadReports/RecycleBinLeadReports";

const LeadReportBase = () => {

    const [
        openRecycle, setOpenRecycle
    ] = useState<boolean>(false);

    return (
        <>
            { openRecycle ? 
                <RecycleBinLeadReports 
                    hideRecycleContent = {() => {
                        setOpenRecycle(false); 
                    }}
                />
                :
                <LeadReportTable showRecycleContent = {() => {
                    setOpenRecycle(true); 
                }}/>
            }
        </>
    );
};

export default LeadReportBase;

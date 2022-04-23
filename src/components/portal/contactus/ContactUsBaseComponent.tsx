import React, { useState } from "react";
import ContactusTable from "./ContactusTable";
import RecycleBin from "./recycleBinContacts/RecycleBinContacts";

const ContactUsBase = () => {

    const [
        openRecycle, setOpenRecycle
    ] = useState<boolean>(false);

    return (
        <>
            {
                openRecycle ? 
                    <RecycleBin 
                        hideRecycleContent = {() => {
                            setOpenRecycle(false); 
                        }}
                    />
                    :
                    <ContactusTable 
                        showRecycleContent = {() => {
                            setOpenRecycle(true); 
                        }}
                    />
            }
            
        </>
    );
};

export default ContactUsBase;

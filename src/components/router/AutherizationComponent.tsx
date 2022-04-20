import { getSession } from "common/Bridge";
import { Navigate } from "react-router-dom";
import PortalHomePage from "../portal/PortalHomePage";
import React from "react";
import { SCREENS } from "common/Constants";

const AutherizationComponent = () => {

    const state = getSession();

    if (!state) {
        return <Navigate to ={SCREENS.LOGIN} replace/>;
    }

    return (
        <PortalHomePage/>
    );

};
export default AutherizationComponent;

import { Outlet } from "react-router-dom";
import PortalHeader from "./header/PortalHeaderComponent";
import React from "react";

const PortalHomePage = () => {

    return (
        <div className="portal-home-page">
            <div className="portal-header">
                <PortalHeader />
            </div>
            <div className="portal-content">
                <Outlet />
            </div>
        </div>
    );
};

export default PortalHomePage;

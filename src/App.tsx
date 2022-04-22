import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import AppDialog from "./components/common/AppDialog";
import { AppSettings } from "./common/AppSettings";
import AutherizationComponent from "components/router/AutherizationComponent";
import BrokerageCalculator from "./components/brokerage/BrokerageComponent";
import Contactus from "components/portal/contactus/ContactUsBaseComponent";
import LeadReport from "components/portal/leadReport/LeadReportBasecomponent";
import LoaderBackdrop from "components/common/Loader";
import MarginCalculator from "./components/margin/MarginComponent";
import PortalLogin from "./components/portal/PortalLoginComponent";
import ReferralCalculator from "./components/referral/ReferralComponent";
import { SCREENS } from "./common/Constants";
import { ServiceConfig } from "index";
import SnackBar from "./components/common/SnackBar";
import { useConfigStore } from "state/AppConfigReducer";
import { useSelector } from "react-redux";


const ApiCommunicator = () => {
    ServiceConfig.setServiceURL(AppSettings.serviceURL);
    ServiceConfig.setApiEncryptionEnabled(AppSettings.apiEncryptionEnabled);
    ServiceConfig.setStorageEncryptionEnabled(AppSettings.localStorageEncryptionEnabled);
    
    return <></>;
};

function App() {

    const appTheme = useSelector(useConfigStore).theme;

    useEffect(() => {
        document.body.setAttribute("data-theme", appTheme);
    }, [
        appTheme
    ]);

    return (
        <div className="app">
            <ApiCommunicator />
            <AppDialog />
            <SnackBar />
            <LoaderBackdrop />
            <HashRouter basename={AppSettings.baseURL}>
                <Routes>
                    <Route path={SCREENS.BROKERAGE_CALCULATOR} element={<BrokerageCalculator />} />
                    <Route path={SCREENS.REFERRAL_CALCULATOR} element={<ReferralCalculator />} />
                    <Route path={SCREENS.MARGIN_CALCULATOR} element={<MarginCalculator />} />
                    <Route path={SCREENS.BASE} element={<Navigate replace to={SCREENS.BROKERAGE_CALCULATOR} />} />
                    <Route path={SCREENS.LOGIN} element={<PortalLogin />} />
                    <Route path={`${SCREENS.PORTAL}`} element={
                        <AutherizationComponent />
                    }>
                        
                        <Route path={SCREENS.CONTACTUS} element={<Contactus />} />
                        <Route path={SCREENS.LEADREPORT} element={<LeadReport />} />
                        <Route path={`${SCREENS.PORTAL}/*`} element={<Navigate to={SCREENS.LOGIN} />} />


                    </Route>
                </Routes>  
            </HashRouter>        
        </div>
    );
}

export default App;

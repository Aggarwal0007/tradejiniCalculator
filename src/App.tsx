import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppSettings } from "./common/AppSettings";
import BrokerageCalculator from "./components/brokerage/BrokerageComponent";
import MarginCalculator from "./components/margin/MarginComponent";
import React from "react";
import ReferralCalculator from "./components/referral/ReferralComponent";
import { SCREENS } from "./common/Constants";

function App() {
    return (
        <div className="app">
            <HashRouter basename={AppSettings.baseURL}>
                <Routes>
                    <Route path={SCREENS.BROKERAGE_CALCULATOR} element={<BrokerageCalculator />} />
                    <Route path={SCREENS.REFERRAL_CALCULATOR} element={<ReferralCalculator />} />
                    <Route path={SCREENS.MARGIN_CALCULATOR} element={<MarginCalculator />} />
                    <Route path={SCREENS.BASE} element={<Navigate replace to={SCREENS.BROKERAGE_CALCULATOR} />} />
                </Routes>  
            </HashRouter>        
        </div>
    );
}

export default App;

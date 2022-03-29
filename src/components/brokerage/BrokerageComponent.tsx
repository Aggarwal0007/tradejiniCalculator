import { Charges, InputTypes } from "../../common/Types";
import React, { useState } from "react";
import { SEGMENT_LIST, SEGMENT_TITLE } from "../../common/Constants";
import CommoditiesCalculator from "./commodities/CommoditiesComponent";
import CurrenciesCalculator from "./currencies/CurrenciesCalculator";
import EquitesCalculator from "./equites/EquitesCalculator";
import KnowBrokerageSavings from "./KnowBrokerageSavingsComponent";
import SeeAllCharges from "./SeeAllChargesComponent";

function BrokerageCalculator() {

    const [
        selectedSegment, setSelectedSegment
    ] = useState<string>(SEGMENT_LIST[ 0 ].name);

    const [
        allCharges, setAllCharges
    ] = useState<Charges>();

    const [
        showTable, setShowTable
    ] = useState(0);

    const [
        equititesInputs, setEquitesInput
    ] = useState<InputTypes>();

    const onSegmentSelect = (selectedItem: string) => {
        setSelectedSegment(selectedItem);
    };

    const knowBrokerageSavings = () => {
        showTable === 1 ? setShowTable(0) : setShowTable(1);
    };

    const seeAllCharges = () => {
        showTable === 2 ? setShowTable(0) : setShowTable(2);
    };

    const getCharges = (charges: Charges) => {
        setAllCharges(charges);
    };

    const getEquitesInput = (equitesIp: InputTypes) => {
        setEquitesInput(equitesIp);
    };
    
    const brokerageProps = {
        inputKeys: equititesInputs,
        chargesList: allCharges
    };

    return (
        <div className="brokerage-base container">
            <div className="col-xs-12">
                <div className="segment-selection">
                    {
                        SEGMENT_LIST && SEGMENT_LIST.length ?
                            SEGMENT_LIST.map((item, index) => {
                                return (
                                    <div 
                                        className={`${selectedSegment === item.name ? 
                                            "active-segment"
                                            : "" } segment-item`}
                                        key={index}
                                        onClick={() => {
                                            return onSegmentSelect(item.name); 
                                        }}
                                    >
                                        {item.value} 
                                    </div>
                                );
                            })
                            :
                            null
                    }
                </div>
                <div className="segment-detail">
                    <div className="detail-header">
                        <div className="section-title">{SEGMENT_TITLE}</div>
                    </div>
                    <div className="calculator-details">
                        {
                             
                            selectedSegment && selectedSegment === 
                            SEGMENT_LIST[ 0 ].name ?
                                <EquitesCalculator 
                                    parentCBAllCharges={getCharges}
                                    equitiesInput = {getEquitesInput}
                                /> :
                                selectedSegment && selectedSegment === 
                                SEGMENT_LIST[ 1 ].name ?
                                    <CurrenciesCalculator 
                                        parentCBAllCharges={getCharges}
                                        equitiesInput = {getEquitesInput}
                                    /> :
                                    selectedSegment && selectedSegment === 
                                    SEGMENT_LIST[ 2 ].name ?
                                        <CommoditiesCalculator 
                                            parentCBAllCharges={getCharges}
                                            equitiesInput = {getEquitesInput}

                                        /> :
                                        null
                        }
                    </div>
                    <div className="actions-calc row">
                        <div className="action-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div 
                                className={`${showTable === 1 ? "active" : "" } brokerage-savings`}
                                onClick={() => {
                                    return knowBrokerageSavings(); 
                                }}
                            >
                            KNOW BROKERAGE SAVINGS
                            </div>
                        </div>
                        
                        <div className="action-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div 
                                className={`${showTable === 2 ? "active" : "" } see-all-charges`}
                                onClick={ () => {
                                    return seeAllCharges(); 
                                }}
                            >
                            SEE ALL CHARGES
                            </div>
                        </div>
                        
                    </div>
                    <div className="charge-details-section">
                        {
                            showTable === 1 ?
                                <KnowBrokerageSavings 
                                    {... brokerageProps}
                                />
                                :
                                showTable === 2 ?
                                    <SeeAllCharges 
                                        {... brokerageProps}
                                    />
                                    :
                                    null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrokerageCalculator;

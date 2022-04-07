import { Category, Charges, InputTypes } from "../../common/Types";
import React, { useEffect, useState } from "react";
import { SEGMENT_LIST, SEGMENT_TITLE } from "../../common/Constants";
import { brokerageURL } from "../../communicator/ServiceUrls";
import CommoditiesCalculator from "./commodities/CommoditiesComponent";
import { configDetails } from "../../common/Dataconfig";
import CurrenciesCalculator from "./currencies/CurrenciesCalculator";
import EquitesCalculator from "./equites/EquitesCalculator";
import { getFullURL } from "../../common/AppSettings";
import KnowBrokerageSavings from "./KnowBrokerageSavingsComponent";
import SeeAllCharges from "./SeeAllChargesComponent";
import ServiceRequest from "../../communicator/Request";
import useFetch from "../../communicator/UseFetch";

function BrokerageCalculator() {

    const fetchAPI = useFetch();

    const [
       
        isConfigData, setIsConfigData
    ] = useState<boolean>(false);

    const successCB = (response: { d: Charges; }) => {
        console.log("configSuccess", response);
        configDetails.setBrokerageDetails(response.d);
        setIsConfigData(true);
    };

    const errorCB = (error: string) => {
        console.log("configError", error);
    };

    const fetchBrokerageConfigDetails = () => {
        const request = new ServiceRequest();
        request.addData({});
        fetchAPI.placeGETRequest(getFullURL(brokerageURL), request, successCB, errorCB );
    };

    useEffect(() => {
        fetchBrokerageConfigDetails();
    }, [
    ]);

    const [
        selectedSegment, setSelectedSegment
    ] = useState<string>(SEGMENT_LIST[ 0 ].name);

    const [
        allCharges, setAllCharges
    ] = useState<Charges>();

    const [
        categorySelected, setCategorySelected
    ] = useState<Category>();

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
    
    const getCategorySelected = (category: Category) => {
        setCategorySelected(category);
    };

    const brokerageProps = {
        inputKeys: equititesInputs as InputTypes,
        chargesList: allCharges as Charges,
        categorySelected: categorySelected as Category
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
                             
                            isConfigData && selectedSegment && selectedSegment === 
                            SEGMENT_LIST[ 0 ].name ?
                                <EquitesCalculator 
                                    parentCBAllCharges={getCharges}
                                    equitiesInput = {getEquitesInput}
                                    categorySelected = {getCategorySelected}
                                /> :
                                isConfigData && selectedSegment && selectedSegment === 
                                SEGMENT_LIST[ 1 ].name ?
                                    <CurrenciesCalculator 
                                        parentCBAllCharges={getCharges}
                                        equitiesInput = {getEquitesInput}
                                        categorySelected = {getCategorySelected}
                                    /> :
                                    isConfigData && selectedSegment && selectedSegment === 
                                    SEGMENT_LIST[ 2 ].name ?
                                        <CommoditiesCalculator 
                                            parentCBAllCharges={getCharges}
                                            equitiesInput = {getEquitesInput}
                                            categorySelected = {getCategorySelected}
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

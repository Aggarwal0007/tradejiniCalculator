import React, { useState } from "react";
import { SEGMENT_LIST, SEGMENT_TITLE } from "../../common/Constants";
import CommoditiesCalculator from "./commodities/CommoditiesComponent";
import CurrenciesCalculator from "./currencies/CurrenciesCalculator";
import EquitesCalculator from "./equites/EquitesCalculator";


function BrokerageCalculator() {

    const [
        selectedSegment, setSelectedSegment
    ] = useState<string>(SEGMENT_LIST[ 0 ].name);

    const onSegmentSelect = (selectedItem: string) => {
        setSelectedSegment(selectedItem);
        console.log("selectedItem", selectedItem);
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
                             
                            selectedSegment && selectedSegment === SEGMENT_LIST[ 0 ].name ?
                                <EquitesCalculator /> :
                                selectedSegment && selectedSegment === SEGMENT_LIST[ 1 ].name ?
                                    <CurrenciesCalculator /> :
                                    selectedSegment && selectedSegment === SEGMENT_LIST[ 2 ].name ?
                                        <CommoditiesCalculator /> :
                                        null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrokerageCalculator;

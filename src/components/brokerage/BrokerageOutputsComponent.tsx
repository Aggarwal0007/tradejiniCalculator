import React, { useEffect, useState } from "react";
import { Charges } from "../../common/Types";

const BrokerageOutputs = (props: { chargesBreakDown: Charges; }) => {

    const { chargesBreakDown } = props;

    const [
        brokerageValue, setBrokerageValue
    ] = useState<string | number>(40);

    const [
        turnover, setTurnover
    ] = useState<string | number>(1010);

    const [
        bep, setBEP
    ] = useState<string | number>(1010);

    const [
        profit, setProfit
    ] = useState<string | number>(1010);

    useEffect(() => {
        if (chargesBreakDown && chargesBreakDown.brokerage) {
            setBrokerageValue(chargesBreakDown.brokerage);
            setBEP(chargesBreakDown.pointBreakeven);
            setProfit(chargesBreakDown.netProfit);
            setTurnover(chargesBreakDown.turnOver);
        }
        
    }, [
        chargesBreakDown
    ]);

    return (
        <div className="details-output">
            <div className="top-output-container">
                <div className="brokerage-input-section input-container">
                    <div className="brokerage-label">Brokerage</div>
                    <div className="brokerage-input output-bg">
                        {brokerageValue}
                    </div>
                </div>
                <div className="turnover-input-section input-container">
                    <div className="turnover-label">Turnover</div>
                    <div className="turnover-input output-bg">
                        {turnover}
                    </div>
                </div>
            </div>

            <div className="top-output-container">
                <div className="bep-input-section input-container">
                    <div className="bep-label">BEP</div>
                    <div className="bep-input output-bg">
                        {bep}
                    </div>
                </div>
                <div className="profit-input-section input-container">
                    <div className="profit-label">Profit</div>
                    <div className="profit-input output-bg">
                        {profit}
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default BrokerageOutputs;

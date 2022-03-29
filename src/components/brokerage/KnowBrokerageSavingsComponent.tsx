import { COMMODITY_CATEGORY, CURRENCY_CATEGORY, EQUITES_CATEGORY } from "common/Constants";
import React, { useEffect, useState } from "react";

const KnowBrokerageSavings = (props: { inputKeys: any; chargesList: any; }) => {

    const { inputKeys, chargesList } = props;
    const [
        currentBrokerage, setCurrentBrokerage
    ] = useState<number>(40);

    const [
        savingsOutput, setSavingsOutput
    ] = useState<number>();

    const calculateYourSavings = (brokeragePersent: number) => {

        console.log("inputKeys", inputKeys);

        const { sellPrice, quantity, buyPrice, type } = inputKeys;

        let totalSavings = 0;

        if ((type === EQUITES_CATEGORY[ 0 ].name) || (type === EQUITES_CATEGORY[ 1 ].name) ||
             (type === EQUITES_CATEGORY[ 2 ].name) || type === (EQUITES_CATEGORY[ 3 ].name) ) {
            totalSavings = ( ( ( ( sellPrice * quantity ) +
            (buyPrice * quantity ) ) * ( brokeragePersent ) ) / 100 ) - chargesList.brokerage;

        } else if (type === CURRENCY_CATEGORY[ 0 ].name ) {

            totalSavings = ( ( ( ( sellPrice * quantity ) +
        ( buyPrice * quantity ) ) * 1000 * ( brokeragePersent ) ) / 100 ) - chargesList.brokerage;

        } else if (type === CURRENCY_CATEGORY[ 1 ].name || (type === COMMODITY_CATEGORY[ 0 ].name)) {

            totalSavings = (( sellPrice * quantity ) + ( buyPrice * quantity )) * brokeragePersent;
            // totalSavings = ( sellPrice * quantity ) + ( buyPrice * quantity ) * brokeragePersent;

        } else {
            totalSavings = 0;
        }

        setSavingsOutput(totalSavings);
    };

    useEffect(() => {
        // setCurrentBrokerage(40);
        calculateYourSavings(currentBrokerage);            
    }, [
        props.inputKeys.type
    ]);
    
    const onChangebrokerageValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBrokerage(Number(evt.target.value));
        setSavingsOutput(98);
        calculateYourSavings(Number(evt.target.value));
    };
    

    return (
        <div className="know-brokerage-savings-container">
            <div className="present-brok-tag">
                WHAT IS YOUR PRESENT BROKERAGE?
            </div>
            <div className="brokerage-present-input">
                <input 
                    type="text"
                    value={currentBrokerage}
                    onChange={(evt) => {
                        return onChangebrokerageValue(evt); 
                    }}
                />
                <span className="or-text">OR</span>
            </div>
            <div className="your-savings">
                <div className="your-savings-text">
                    Your Savings
                </div>
                <div className="your-savings-output">
                    {savingsOutput}
                </div>
            </div>
        </div>
    );
};

export default KnowBrokerageSavings;

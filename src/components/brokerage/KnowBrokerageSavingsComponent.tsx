import { Charges, InputTypes } from "common/Types";
import { COMMODITY_CATEGORY, CURRENCY_CATEGORY, EQUITES_CATEGORY } from "common/Constants";
import React, { useEffect, useState } from "react";
import InputText from "components/common/InputTextComponent";

type PropsTypes = { 
    inputKeys: InputTypes;
     chargesList: Charges; 
    }

const KnowBrokerageSavings = (props: PropsTypes) => {

    const { inputKeys, chargesList } = props;
    const [
        currentBrokerage, setCurrentBrokerage
    ] = useState<number>(40);

    const [
        savingsOutput, setSavingsOutput
    ] = useState<number>();

    const [
        savingsArr, setSavingsArr
    ] = useState<string[]>();

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

            totalSavings = (( sellPrice * quantity ) + ( buyPrice * quantity ) ) * brokeragePersent;
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

    
    const onChangebrokerageValue = (brokValue: number) => {
        setCurrentBrokerage(brokValue);
        // setSavingsOutput(98);
        calculateYourSavings(brokValue);
    };
    
    useEffect(() => {
        document.querySelectorAll(".counter-inputs").forEach((item) => {
            item.removeAttribute("class");
            item.classList.add("counter-inputs");
            item.classList.add("digit-default");
        }); 
        const arr = [

        ];
        if (savingsOutput) {
            for (let val: number = 0; val <= savingsOutput.toString().length; val++) {
                arr.push(savingsOutput.toString()[ val ]);
            }
        }
        setSavingsArr(arr);
        console.log("savings Array", arr);
    }, [
        savingsOutput
    ]);

    useEffect(() => {
        document.querySelectorAll(".counter-inputs").forEach((item) => {
            item.removeAttribute("class");
            item.classList.add("counter-inputs");
            if (item.innerHTML === "0") {
                item.classList.add("digitnone");
            } else if (item.innerHTML === "1") {
                item.classList.add("digit-1");
            } else if (item.innerHTML === "2") {
                item.classList.add("digit-2");
            } else if (item.innerHTML === "3") {
                item.classList.add("digit-3");
            } else if (item.innerHTML === "4") {
                item.classList.add("digit-4");
            } else if (item.innerHTML === "5") {
                item.classList.add("digit-5");
            } else if (item.innerHTML === "6") {
                item.classList.add("digit-6");
            } else if (item.innerHTML === "7") {
                item.classList.add("digit-7");
            } else if (item.innerHTML === "8") {
                item.classList.add("digit-8");
            } else if (item.innerHTML === "9") {
                item.classList.add("digit-9");
            } else if (item.innerHTML === "-") {
                item.classList.add("digit-hyphen");
            } else if (item.innerHTML === ".") {
                item.classList.add("digit-point");
            }
        });
    }, [
        savingsArr
    ]);

    return (
        <div className="know-brokerage-savings-container">
            <div className="present-brok-tag">
                WHAT IS YOUR PRESENT BROKERAGE?
            </div>
            <div className="brokerage-present-input">
               
                <InputText 
                    parentCallBack={(val) => {
                        return onChangebrokerageValue(Number(val)); 
                    }}
                    ipValue={currentBrokerage}
                    numbersOnly = {true}
                />
                
                <span className="or-text">OR</span>
            </div>
            <div className="your-savings">
                <div className="your-savings-text">
                    Your Savings
                </div>
                <div className="your-savings-output">
                    <span className="icon-rupee"></span>
                    {savingsArr && savingsArr.map((item: string, key: number) => {
                        return (
                            <span className="counter-inputs" id={item} key={key}>
                                {item}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default KnowBrokerageSavings;

import React, { useEffect, useState } from "react";
import { Charges } from "../../common/Types";

const BrokerageOutputs = (props: { chargesBreakDown: Charges; }) => {

    const { chargesBreakDown } = props;

    const [
        turnoverArr, setTurnoverArr
    ] = useState<any>();

    const [
        brokerageArr, setBrokerageArr
    ] = useState<any>();

    const [
        bepArr, setBepArr
    ] = useState<any>();

    const [
        profitArr, setProfitArr
    ] = useState<any>();

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

    const decimal = (item: any, field: string) => {
        if (item.toString().includes(".")) {
            switch (field) {
                case "turnover":
                    setTurnover(Number(item).toFixed(2));
                    break;

                case "brokerage":
                    setBrokerageValue(Number(item).toFixed(2));
                    break;
                
                case "bep":
                    setBEP(Number(item).toFixed(2));
                    break;

                case "profit":
                    setProfit(Number(item).toFixed(2));
                    break;
                default:
                    break;
            }
        }      
    };

    useEffect(() => {
        if (chargesBreakDown && chargesBreakDown.brokerage) {
            setBrokerageValue(chargesBreakDown.brokerage);
            setBEP(chargesBreakDown.pointBreakeven);
            setProfit(chargesBreakDown.netProfit);
            setTurnover(chargesBreakDown.turnOver);
            console.log(chargesBreakDown);
        } else {
            setTurnover("0");
            setBrokerageValue("0");
            setBEP("0");  
            setProfit("0");  
        }
        document.querySelectorAll(".field-inputs").forEach((item) => {
            console.log(item);
            item.removeAttribute("class");
            item.classList.add("digit-default");
            item.classList.add("field-inputs");
        });
    }, [
        chargesBreakDown
    ]);

    useEffect(() => {
        decimal(turnover, "turnoverVal");
        const arr = [

        ];
        for (let val: any = 0; val <= turnover.toString().length; val++) {
            arr.push(turnover.toString()[ val ]);
        }
        decimal(Number(arr), "turnover");
        setTurnoverArr(arr);
    }, [
        turnover
    ]);

    useEffect(() => {
        decimal(brokerageValue, "brokerage");
        const arr = [

        ];
        for (let val: any = 0; val <= brokerageValue.toString().length; val++) {
            arr.push(brokerageValue.toString()[ val ]);
        }
        decimal(Number(arr), "brokerage");
        setBrokerageArr(arr);
    }, [
        brokerageValue
    ]);

    useEffect(() => {
        const arr = [

        ];
        for (let val: any = 0; val <= bep.toString().length; val++) {
            arr.push(bep.toString()[ val ]);
        }
        decimal(Number(arr), "bep");
        setBepArr(arr);
    }, [
        bep
    ]);

    useEffect(() => {
        const arr = [

        ];
        for (let val: any = 0; val <= profit.toString().length; val++) {
            arr.push(profit.toString()[ val ]);
        }
        decimal(Number(arr), "profit");
        setProfitArr(arr);
    }, [
        profit
    ]);

    useEffect(() => {
        document.querySelectorAll(".field-inputs").forEach((item) => {
            item.removeAttribute("class");
            item.classList.add("field-inputs");
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
        turnoverArr, brokerageArr, bepArr, profitArr
    ]);

    return (
        <div className="details-output">
            <div className="top-output-container">
                <div className="brokerage-input-section input-container">
                    <div className="brokerage-label">Brokerage</div>
                    <div className="brokerage-input output-bg" id="value-0">
                        <span className="icon-rupee"></span>
                        {brokerageArr && brokerageArr.map((item: any, key: number) => {
                            return (
                                <span className="field-inputs" id={item} key={key}>
                                    {item}
                                </span>
                            );
                        })}              
                    </div>
                </div>
                <div className="turnover-input-section input-container">
                    <div className="turnover-label">Turnover</div>
                    <div className="output-bg" id="turnover-digit-0">
                        {turnoverArr && turnoverArr.map((item: any, key: number) => {
                            return (
                                <span className="field-inputs" id={item} key={key}>
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="top-output-container">
                <div className="bep-input-section input-container">
                    <div className="bep-label">BEP</div>
                    <div className="bep-input output-bg">
                        {bepArr && bepArr.map((item: any, key: number) => {
                            return (
                                <span className="field-inputs" id={item} key={key}>
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="profit-input-section input-container">
                    <div className="profit-label">Profit</div>
                    <div className="profit-input output-bg">
                        <span className="icon-rupee"></span>
                        {profitArr && profitArr.map((item: any, key: number) => {
                            return (
                                <span className="field-inputs" id={item} key={key}>
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BrokerageOutputs;

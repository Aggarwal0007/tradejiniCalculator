import React, { useEffect, useState } from "react";
import { Charges } from "../../common/Types";
import { Grid } from "@mui/material";


const BrokerageOutputs = (props: { chargesBreakDown: Charges; categorySelected: string }) => {

    const { chargesBreakDown, categorySelected } = props;

    const [
        turnoverArr, setTurnoverArr
    ] = useState<string[]>();

    const [
        brokerageArr, setBrokerageArr
    ] = useState<string[]>();

    const [
        bepArr, setBepArr
    ] = useState<string[]>();

    const [
        profitArr, setProfitArr
    ] = useState<string[]>();

    const [
        brokerageValue, setBrokerageValue
    ] = useState<number>(40);

    const [
        turnover, setTurnover
    ] = useState<number>(1010);

    const [
        bep, setBEP
    ] = useState<number>(1010);

    const [
        profit, setProfit
    ] = useState<number>(1010);


    useEffect(() => {
        
        if (chargesBreakDown && chargesBreakDown.brokerage) {
            if (categorySelected.toString() !== "CURRENCY_FUTURES" &&
             categorySelected.toString() !== "CURRENCY_OPTIONS") {
                setBrokerageValue(Number(chargesBreakDown.brokerage.toFixed(2)));
                setBEP(Number(chargesBreakDown.pointBreakeven.toFixed(2)));
                setProfit(Number(chargesBreakDown.netProfit.toFixed(2)));
                setTurnover(Number(chargesBreakDown.turnOver.toFixed(2)));
            } else {
                
                setBrokerageValue(Number(chargesBreakDown.brokerage.toFixed(4)));
                setBEP(Number(chargesBreakDown.pointBreakeven.toFixed(4)));
                setProfit(Number(chargesBreakDown.netProfit.toFixed(4)));
                setTurnover(Number(chargesBreakDown.turnOver.toFixed(4)));
            }
        } else {
            setTurnover(0);
            setBrokerageValue(0);
            setBEP(0);  
            setProfit(0);  
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
        const arr = [
        ];
        for (let val: number = 0; val <= turnover.toString().length; val++) {
            arr.push(turnover.toString()[ val ]);
        }
        setTurnoverArr(arr);
    }, [
        turnover
    ]);

    useEffect(() => {
        const arr = [
        ];
        for (let val: number = 0; val <= brokerageValue.toString().length; val++) {
            arr.push(brokerageValue.toString()[ val ]);
        }
        setBrokerageArr(arr);
    }, [
        brokerageValue
    ]);

    useEffect(() => {
        const arr = [
        ];
        for (let val: number = 0; val <= bep.toString().length; val++) {
            arr.push(bep.toString()[ val ]);
        }
        setBepArr(arr);
    }, [
        bep
    ]);

    useEffect(() => {
        const arr = [
        ];
        for (let val: number = 0; val <= profit.toString().length; val++) {
            arr.push(profit.toString()[ val ]);
        }
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
            <Grid container justifyContent="center"
                className="brokerage-input-section input-container top-output-container">
                <Grid item lg={4} sm={4} className="brokerage-label">Brokerage</Grid>
                <Grid item lg={8} sm={4} className="brokerage-input output-bg" id="value-0">
                    <span className="icon-rupee"></span>
                    {brokerageArr && brokerageArr.map((item: string, key: number) => {
                        return (
                            <span className="field-inputs" id={item} key={key}>
                                {item}
                            </span>
                        );
                    })}              
                </Grid>
            </Grid>
            <Grid container justifyContent="center"
                className="bep-input-section input-container top-output-container">
                <Grid item lg={4} sm={4} className="bep-label">BEP</Grid>
                <Grid item lg={8} sm={4} className="brokerage-input-section">
                    <div className="bep-input output-bg">
                        {bepArr && bepArr.map((item: string, key: number) => {
                            return (
                                <span className="field-inputs" id={item} key={key}>
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" 
                className="turnover-input-section input-container top-output-container">
                <Grid item lg={4} sm={4} className="turnover-label">Turnover</Grid>
                <Grid item lg={8} sm={4} className="output-bg" id="turnover-digit-0">
                    {turnoverArr && turnoverArr.map((item: string, key: number) => {
                        return (
                            <span className="field-inputs" id={item} key={key}>
                                {item}
                            </span>
                        );
                    })}
                </Grid>
            </Grid>

            <Grid container justifyContent="center"
                className="profit-input-section input-container top-output-container">
                <Grid item lg={4} sm={4} className="profit-label">Profit</Grid>
                <Grid item lg={8} sm={4} className="profit-input output-bg">
                    <span className="icon-rupee"></span>
                    {profitArr && profitArr.map((item: string, key: number) => {
                        return (
                            <span className="field-inputs" id={item} key={key}>
                                {item}
                            </span>
                        );
                    })}
                </Grid>
            </Grid>
        </div>
    );
};

export default BrokerageOutputs;

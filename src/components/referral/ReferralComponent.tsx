import React, { useState } from "react";

function ReferralCalculator() {

    const [
        activeClients, setActiveClients
    ] = useState<number>(25);

    const [
        dailyTrades, setDailyTrades
    ] = useState<number>(10);

    const [
        tradePerMonth, setTradePerMonth
    ] = useState<number>(activeClients * dailyTrades * 20);

    const [
        monthlyCommission, setMonthlyCommission
    ] = useState<number>(( 10 * 1 / 100 ) * (tradePerMonth * 20 ));

    const [
        yearlyCommission, setYearlyCommission
    ] = useState<number>(monthlyCommission * 12);

    const calculateYearlyCommission = (result:number) => {
        const value= result * 12;
        setYearlyCommission(value);
    };

    const calculateMonthlyCommission = (result:number) => {
        const value= (( 10 * 1 / 100 ) * ( result * 20 ));
        setMonthlyCommission(value);
        calculateYearlyCommission(value);
    };


    const calculateTradePerMonth = (activeValue:number, tradeValue:number) => {
        const value= activeValue * tradeValue * 20;
        setTradePerMonth(value);
        calculateMonthlyCommission(value);
    };

    const onChangeqty = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const reg = new RegExp("^[0-9]*$");
        const numCheck=(reg.test(evt.target.value));
        if (evt && evt.target && numCheck === true) {
            setActiveClients(Number(evt.target.value));
            calculateTradePerMonth(Number(evt.target.value), dailyTrades);
        }
    };

    const onChangetrade = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const reg = new RegExp("^[0-9]*$");
        const numCheck=(reg.test(evt.target.value));
        if (evt && evt.target && numCheck === true) {
            setDailyTrades(Number(evt.target.value));
            calculateTradePerMonth(activeClients, Number(evt.target.value));
        }
    };

    return (
        <div className="referral-calculator">
            <h1 className="referral-title">REFERRAL CALCULATOR</h1>
            <h3 className="referral-para">To know exactly how much</h3>
            <div className="referral-box flex-container">
                <div className="referral-single-box ">
                    <div className="referral-content">
                        <p> Active Clients <br></br> Referred </p>
                        <div className="referral-inputs ml-0">
                            <input type="text"
                                className="referral-input"
                                value={activeClients}
                                onChange={(evt) => {
                                    return onChangeqty(evt);
                                }} />
                        </div>
                    </div>
                </div>
                <div className="referral-single-box">
                    <div className="referral-content">
                        <p> Average Daily <br></br> Trades </p>
                        <div className="referral-inputs ml-0">
                            <input type="text"
                                className="referral-input"
                                value={dailyTrades}
                                onChange={(evt) => {
                                    return onChangetrade(evt);
                                }} />
                        </div>
                    </div>
                </div>
                <div className="referral-single-box">
                    <div className="referral-content">
                        <p> Total Trades <br></br> per month</p>
                        <div className="referral-inputs ml-0">
                            <input type="text"
                                className="referral-input referral-input-readonly"
                                value={tradePerMonth}
                                readOnly />
                        </div>
                    </div>
                </div>
                <div className="referral-single-box">
                    <div className="referral-content">
                        <p> Commission <br></br> earned per month </p>
                        <div className="referral-inputs ml-0">
                            <input type="text"
                                className="referral-input referral-input-readonly"
                                value={monthlyCommission}
                                readOnly />
                        </div>
                    </div>
                </div>
                <div className="referral-single-box">
                    <div className="referral-content">
                        <p> Commission <br></br> earned per annum </p>
                        <div className="referral-inputs ml-0">
                            <input type="text"
                                className="referral-input referral-input-readonly"
                                value={yearlyCommission}
                                readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferralCalculator;

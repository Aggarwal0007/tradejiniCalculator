import React, { useState } from "react";
import { EQUITES_CATEGORY } from "../../../common/Constants";

const EquitesCalculator = () => {

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(EQUITES_CATEGORY[ 0 ].name);

    const [
        quantity, setQuantity
    ] = useState<number>(500);

    const [
        buyPrice, setBuyPrice
    ] = useState<number>(1000);

    const [
        sellPrice, setSellPrice
    ] = useState<number>(1010);

    const [
        brokerageValue
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

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
    };

    const calculateBrokerageValues = (qty: number, buyPrc: number, sellPrc: number) => {
        const turnoverResult = ((qty * buyPrc)+ (qty*sellPrc));
        console.log("result", turnoverResult);
        setTurnover(turnoverResult);
        setBEP(turnoverResult);
        setProfit(turnoverResult);
    };

    const onChangeQuantity = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt && evt.target)
            setQuantity(Number(evt.target.value));
        calculateBrokerageValues(Number(evt.target.value), buyPrice, sellPrice);
    };

    const onChangeBuyPrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt && evt.target)
            setBuyPrice(Number(evt.target.value));
        calculateBrokerageValues(quantity, Number(evt.target.value), sellPrice);
    };

    const onChangeSellPrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt && evt.target)
            setSellPrice(Number(evt.target.value));
        calculateBrokerageValues(quantity, buyPrice, Number(evt.target.value));
    };

    return (
        <>
            <div className="category-list">
                {
                    EQUITES_CATEGORY && EQUITES_CATEGORY.length ?
                        EQUITES_CATEGORY.map((item, index) => {
                            return (
                                <div 
                                    className={`${selectedCategory === item.name ?
                                        "category-active"
                                        : ""} category-item`}
                                    key= {index}
                                    onClick={() => {
                                        return onSelectedCategory(item.name); 
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
            <div className="category-details">
                <div className="detail-input-section">

                    <div className="quantity-input-section">
                        <div className="qty-label">Quantity</div>
                        <div className="qty-input">
                            <input 
                                type="text"
                                value={quantity}
                                onChange = {(evt) => {
                                    return onChangeQuantity(evt); 
                                }}
                                className="common-input"
                            />
                        </div>
                    </div>

                    <div className="quantity-input-section">
                        <div className="qty-label">Buy Price(INR)</div>
                        <div className="qty-input">
                            <input 
                                type="text"
                                value={buyPrice}
                                onChange = {(evt) => {
                                    return onChangeBuyPrice(evt); 
                                }}
                                className="common-input"
                            />
                        </div>
                    </div>

                    <div className="quantity-input-section">
                        <div className="qty-label">Sell Price(INR)</div>
                        <div className="qty-input">
                            <input 
                                type="text"
                                value={sellPrice}
                                onChange = {(evt) => {
                                    return onChangeSellPrice(evt); 
                                }}
                                className="common-input"
                            />
                        </div>
                    </div>
                </div>

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
            </div>
        </>
    );
};

export default EquitesCalculator;

import { Charges, InputTypes } from "../../../common/Types";
import React, { useEffect, useState } from "react";
import BrokerageOutputs from "../BrokerageOutputsComponent";
import { calculateCurrencyBrokerage } from "common/BrokerageCalcUtils";
import { CURRENCY_CATEGORY } from "../../../common/Constants";
import InputText from "components/common/InputTextComponent";


const CurrenciesCalculator = (props: { parentCBAllCharges: (arg0: Charges) => void;
    equitiesInput: (arg0: InputTypes) => void; }) => {

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(CURRENCY_CATEGORY[ 0 ].name);

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
    };

    const [
        quantity, setQuantity
    ] = useState<number>(10);

    const [
        buyPrice, setBuyPrice
    ] = useState<number>(60.00);

    const [
        sellPrice, setSellPrice
    ] = useState<number>(60.10);

    const [
        strikePrice, setStrikePrice
    ] = useState<number>(0);

    const [
        viewResult, setViewResults
    ] = useState<any>();

    
    const calculateBrokerageValues = (qty: number, buyPrc: number, sellPrc: number, strikePrc: number) => {
        setQuantity(qty);
        setBuyPrice(buyPrc);
        setSellPrice(sellPrc);
        setStrikePrice(strikePrc);
        const result = calculateCurrencyBrokerage(qty, buyPrc, sellPrc, selectedCategory);
        setViewResults(result);
        console.log("result", result);
        props.parentCBAllCharges(result);
        props.equitiesInput({
            quantity: qty,
            buyPrice: buyPrc,
            sellPrice:sellPrc,
            type: selectedCategory
        });
    };

    useEffect(() => {
        if (selectedCategory === CURRENCY_CATEGORY[ 0 ].name) {
            calculateBrokerageValues(10, 60.00, 60.10, 0);
        } else if (selectedCategory === CURRENCY_CATEGORY[ 1 ].name) {
            calculateBrokerageValues(10, 0.5000, 0.7000, 60);
        } 
        
    }, [
        selectedCategory
    ]);

    const onChangeQuantity = (qty: number) => {
        setQuantity(qty);        
        calculateBrokerageValues(qty, buyPrice, sellPrice, strikePrice);
    };

    const onChangeBuyPrice = (buyPrc: number) => {
        setBuyPrice(buyPrc);
        calculateBrokerageValues(quantity, buyPrc, sellPrice, strikePrice);

    };

    const onChangeSellPrice = (sellPrc: number) => {
        setSellPrice(sellPrc);
        calculateBrokerageValues(quantity, buyPrice, sellPrc, strikePrice);

    };

    const onChangeStrikePrice = (strikePrc: number) => {
        setStrikePrice(strikePrc);
        calculateBrokerageValues(quantity, buyPrice, sellPrice, strikePrc);

    };

    // const onChangeQuantity = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     if (evt && evt.target)
    //         setQuantity(Number(evt.target.value));
    //     calculateBrokerageValues(Number(evt.target.value), buyPrice, sellPrice, strikePrice);
    // };

    // const onChangeBuyPrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     if (evt && evt.target)
    //         setBuyPrice(Number(evt.target.value));
    //     calculateBrokerageValues(quantity, Number(evt.target.value), sellPrice, strikePrice);
    // };

    // const onChangeSellPrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     if (evt && evt.target)
    //         setSellPrice(Number(evt.target.value));
    //     calculateBrokerageValues(quantity, buyPrice, Number(evt.target.value), strikePrice);
    // };

    // const onChangeStrikePrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     if (evt && evt.target)
    //         setStrikePrice(Number(evt.target.value));
    //     calculateBrokerageValues(quantity, buyPrice, sellPrice, Number(evt.target.value));
    // };

    return (
        <>
            <div className="category-list">
                {
                    CURRENCY_CATEGORY && CURRENCY_CATEGORY.length ?
                        CURRENCY_CATEGORY.map((item, index) => {
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
                    {
                        selectedCategory === CURRENCY_CATEGORY[ 1 ].name ?

                            <div className="quantity-input-section">
                                <div className="qty-label">Strike Price</div>
                                <div className="qty-input">
                                    {/* <input 
                                        type="text"
                                        value={strikePrice}
                                        onChange = {(evt) => {
                                            return onChangeStrikePrice(evt); 
                                        }}
                                        className="common-input"
                                    /> */}
                                    <InputText 
                                        parentCallBack={(evt) => {
                                            return onChangeStrikePrice(evt); 
                                        }}
                                        ipValue={strikePrice}
                                        numbersOnly = {true}
                                    />
                                </div>
                            </div>
                            :
                            null
                    }
                    
                    <div className="quantity-input-section">
                        <div className="qty-label">Quantity</div>
                        <div className="qty-input">
                            {/* <input 
                                type="text"
                                value={quantity}
                                onChange = {(evt) => {
                                    return onChangeQuantity(evt); 
                                }}
                                className="common-input"
                            /> */}
                            <InputText 
                                parentCallBack={(evt) => {
                                    return onChangeQuantity(evt); 
                                }}
                                ipValue={quantity}
                                numbersOnly = {true}
                            />
                        </div>
                    </div>

                    <div className="quantity-input-section">
                        <div className="qty-label">Buy Price(INR)</div>
                        <div className="qty-input">
                            {/* <input 
                                type="text"
                                value={buyPrice}
                                onChange = {(evt) => {
                                    return onChangeBuyPrice(evt); 
                                }}
                                className="common-input"
                            /> */}
                            <InputText 
                                parentCallBack={(evt) => {
                                    return onChangeBuyPrice(evt); 
                                }}
                                ipValue={buyPrice}
                                numbersOnly = {true}
                            />
                        </div>
                    </div>

                    <div className="quantity-input-section">
                        <div className="qty-label">Sell Price(INR)</div>
                        <div className="qty-input">
                            {/* <input 
                                type="text"
                                value={sellPrice}
                                onChange = {(evt) => {
                                    return onChangeSellPrice(evt); 
                                }}
                                className="common-input"
                            /> */}
                            <InputText 
                                parentCallBack={(evt) => {
                                    return onChangeSellPrice(evt); 
                                }}
                                ipValue={sellPrice}
                                numbersOnly = {true}
                            />
                        </div>
                    </div>
                </div>
                <>
                    <BrokerageOutputs
                        chargesBreakDown = {viewResult}
                    />
                </>
            </div>
        </>
    );
};

export default CurrenciesCalculator;

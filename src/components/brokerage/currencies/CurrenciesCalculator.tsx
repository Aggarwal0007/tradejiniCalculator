import { Charges, InputTypes } from "../../../common/Types";
import React, { useEffect, useState } from "react";
import BrokerageOutputs from "../BrokerageOutputsComponent";
import { calculateCurrencyBrokerage } from "components/brokerage/BrokerageCalcUtils";
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
    ] = useState<Charges>();

    
    const calculateBrokerageValues = (qty: number, buyPrc: number, sellPrc: number, strikePrc: number) => {
        setQuantity(qty);
        setBuyPrice(buyPrc);
        setSellPrice(sellPrc);
        setStrikePrice(strikePrc);
        const result = calculateCurrencyBrokerage(qty, buyPrc, sellPrc, selectedCategory);
        setViewResults(result);
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
                                    <InputText 
                                        parentCallBack={(val) => {
                                            return onChangeStrikePrice(Number(val)); 
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
                            <InputText 
                                parentCallBack={(val) => {
                                    return onChangeQuantity(Number(val)); 
                                }}
                                ipValue={quantity}
                                numbersOnly = {true}
                            />
                        </div>
                    </div>

                    <div className="quantity-input-section">
                        <div className="qty-label">Buy Price(INR)</div>
                        <div className="qty-input">
                            <InputText 
                                parentCallBack={(val) => {
                                    return onChangeBuyPrice(Number(val)); 
                                }}
                                ipValue={buyPrice}
                                numbersOnly = {true}
                            />
                        </div>
                    </div>

                    <div className="quantity-input-section">
                        <div className="qty-label">Sell Price(INR)</div>
                        <div className="qty-input">
                            <InputText 
                                parentCallBack={(val) => {
                                    return onChangeSellPrice(Number(val)); 
                                }}
                                ipValue={sellPrice}
                                numbersOnly = {true}
                            />
                        </div>
                    </div>
                </div>
                <>
                    <BrokerageOutputs
                        chargesBreakDown = {viewResult as Charges}
                    />
                </>
            </div>
        </>
    );
};

export default CurrenciesCalculator;

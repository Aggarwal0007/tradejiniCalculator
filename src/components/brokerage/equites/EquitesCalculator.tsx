import { Charges, InputTypes } from "../../../common/Types";
import React, { useEffect, useState } from "react";
import BrokerageOutputs from "../BrokerageOutputsComponent";
import { calculateEquityBrokerage } from "../../../common/BrokerageCalcUtils";
import { EQUITES_CATEGORY } from "../../../common/Constants";
import InputText from "components/common/InputTextComponent";


const EquitesCalculator = (props: { parentCBAllCharges: (arg0: Charges) => void;
     equitiesInput: (arg0: InputTypes) => void; }) => {

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(EQUITES_CATEGORY[ 0 ].name);

    const [
        quantity, setQuantity
    ] = useState<number>(0);

    const [
        buyPrice, setBuyPrice
    ] = useState<number>(0);

    const [
        sellPrice, setSellPrice
    ] = useState<number>(0);

    const [
        viewResult, setViewResults
    ] = useState<any>();

    const calculateBrokerageValues = (qty: number, buyPrc: number, sellPrc: number) => {
        setQuantity(qty);
        setBuyPrice(buyPrc);
        setSellPrice(sellPrc);
        const result = calculateEquityBrokerage(qty, buyPrc, sellPrc, selectedCategory);
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
        if (selectedCategory === EQUITES_CATEGORY[ 0 ].name) {
            calculateBrokerageValues(500, 1000, 1010);
        } else if (selectedCategory === EQUITES_CATEGORY[ 1 ].name) {
            calculateBrokerageValues(500, 1000, 1010);
        } else if (selectedCategory === EQUITES_CATEGORY[ 2 ].name) {
            calculateBrokerageValues(500, 5000, 5010);
        } else {
            calculateBrokerageValues(500, 50, 55);
        }
        
    }, [
        selectedCategory
    ]);

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
        calculateBrokerageValues(quantity, buyPrice, sellPrice);
    };

    const onChangeQuantity = (qty: number) => {
        setQuantity(qty);        
        calculateBrokerageValues(qty, buyPrice, sellPrice);
    };

    const onChangeBuyPrice = (buyPrc: number) => {
        setBuyPrice(buyPrc);
        calculateBrokerageValues(quantity, buyPrc, sellPrice);

    };

    const onChangeSellPrice = (sellPrc: number) => {
        setSellPrice(sellPrc);
        calculateBrokerageValues(quantity, buyPrice, sellPrc);

    };

    // const onChangeQuantity = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     if (evt && evt.target)
    //         setQuantity(Number(evt.target.value));
    //     calculateBrokerageValues(Number(evt.target.value), buyPrice, sellPrice);
    // };

    // const onChangeBuyPrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     if (evt && evt.target)
    //         setBuyPrice(Number(evt.target.value));
    //     calculateBrokerageValues(quantity, Number(evt.target.value), sellPrice);
    // };

    // const onChangeSellPrice = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     if (evt && evt.target)
    //         setSellPrice(Number(evt.target.value));
    //     calculateBrokerageValues(quantity, buyPrice, Number(evt.target.value));
    // };

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

export default EquitesCalculator;

import { Category, Charges, InputTypes } from "../../../common/Types";
import React, { useEffect, useState } from "react";
import BrokerageOutputs from "../BrokerageOutputsComponent";
import { calculateEquityBrokerage } from "../BrokerageCalcUtils";
import { EQUITES_CATEGORY } from "../../../common/Constants";
import InputText from "components/common/InputTextComponent";

type PropsTypes = { 
    parentCBAllCharges: (arg0: Charges) => void;
    equitiesInput: (arg0: InputTypes) => void; 
    categorySelected: (arg0: Category) => void; 
}
const EquitesCalculator = (props: PropsTypes) => {

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
    ] = useState<Charges>();

    const [
        categorySelected, setCategorySelected
    ] = useState<string>(selectedCategory);

    const calculateBrokerageValues = (qty: number, buyPrc: number, sellPrc: number) => {
        setQuantity(qty);
        setBuyPrice(buyPrc);
        setSellPrice(sellPrc);
        const result = calculateEquityBrokerage(qty, buyPrc, sellPrc, selectedCategory);
        setViewResults(result);
        props.parentCBAllCharges(result);
        props.equitiesInput({
            quantity: qty,
            buyPrice: buyPrc,
            sellPrice:sellPrc,
            type: selectedCategory
        });
        setCategorySelected(selectedCategory);        
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
        if (qty !== quantity)    
            calculateBrokerageValues(qty, buyPrice, sellPrice);
    };

    const onChangeBuyPrice = (buyPrc: number) => {
        console.log("buyPrc", buyPrc);
        setBuyPrice(buyPrc);
        if (buyPrc !== buyPrice)
            calculateBrokerageValues(quantity, buyPrc, sellPrice);
    };

    const onChangeSellPrice = (sellPrc: number) => {
        setSellPrice(sellPrc);
        if (sellPrc !== sellPrice)
            calculateBrokerageValues(quantity, buyPrice, sellPrc);

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
                            <InputText 
                                parentCallBack={(val) => {
                                    return onChangeQuantity(Number(val)); 
                                }}
                                ipValue={quantity}
                                numbersOnly = {true}
                                isDecimal = {false}
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
                                numbersOnly = {false}
                                isDecimal = {true}
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
                                numbersOnly = {false}
                                isDecimal = {true}
                            />
                        </div>
                    </div>
                </div>
                <>
                    <BrokerageOutputs 
                        chargesBreakDown = {viewResult as Charges} 
                        categorySelected = {categorySelected}
                    />
                </>
            </div>
        </>
    );
};

export default EquitesCalculator;

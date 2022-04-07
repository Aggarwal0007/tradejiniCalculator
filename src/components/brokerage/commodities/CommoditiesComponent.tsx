import { Category, Charges, InputTypes } from "common/Types";
import { COMMODITY_CATEGORY, COMMODITY_SELECT_LIST } from "../../../common/Constants";
import React, { useEffect, useState } from "react";
import BrokerageOutputs from "../BrokerageOutputsComponent";
import { calculateCommodityBrokerage } from "../BrokerageCalcUtils";
import InputText from "components/common/InputTextComponent";

const getCommodityValue = (commodity: string) => {
    const value = commodity.split("-").pop();
    return Number(value);
};

const CommoditiesCalculator = (props: { parentCBAllCharges: (arg0: Charges) => void;
    equitiesInput: (arg0: InputTypes) => void; categorySelected: (arg0: Category) => void; } ) => {

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(COMMODITY_CATEGORY[ 0 ].name);

    const [
        quantity, setQuantity
    ] = useState<number>(1);

    const [
        buyPrice, setBuyPrice
    ] = useState<number>(119.6);

    const [
        sellPrice, setSellPrice
    ] = useState<number>(121.6);

    const [
        commodityValue, setCommodityValue
    ] = useState<number>(getCommodityValue(COMMODITY_SELECT_LIST[ 0 ].value));

    const [
        viewResult, setViewResults
    ] = useState<Charges | null>();

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
    };

    const [
        categorySelected, setCategorySelected
    ] = useState<any>(selectedCategory);

    const calculateBrokerageValues = (qty: number, buyPrc: number, sellPrc: number, comValue: number) => {
        setQuantity(qty);
        setBuyPrice(buyPrc);
        setSellPrice(sellPrc);
        setCommodityValue(comValue);
        const result = calculateCommodityBrokerage(qty, buyPrc, sellPrc, comValue, selectedCategory);
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
        if (selectedCategory === COMMODITY_CATEGORY[ 0 ].name) {
            calculateBrokerageValues(1, 119.6, 121.6, getCommodityValue(COMMODITY_SELECT_LIST[ 0 ].value));
        }
        
    }, [
        selectedCategory
    ]);

    const onChangeQuantity = (qty: number) => {
        setQuantity(qty);        
        calculateBrokerageValues(qty, buyPrice, sellPrice, commodityValue);
    };

    const onChangeBuyPrice = (buyPrc: number) => {
        setBuyPrice(buyPrc);
        calculateBrokerageValues(quantity, buyPrc, sellPrice, commodityValue);

    };

    const onChangeSellPrice = (sellPrc: number) => {
        setSellPrice(sellPrc);
        calculateBrokerageValues(quantity, buyPrice, sellPrc, commodityValue);

    };

    const onChangeCommodity = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setCommodityValue(getCommodityValue(evt.target.value));
        calculateBrokerageValues(quantity, buyPrice, sellPrice, getCommodityValue(evt.target.value));
        
    };

    return (
        <>
            <div className="category-list">
                {
                    COMMODITY_CATEGORY && COMMODITY_CATEGORY.length ?
                        COMMODITY_CATEGORY.map((item, index) => {
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
                        <div className="qty-label">Commodity</div>
                        <div className="qty-input">
                            <select 
                                value = {commodityValue}
                                onChange = { (evt) => {
                                    return onChangeCommodity(evt); 
                                }}
                            >
                                {
                                    COMMODITY_SELECT_LIST && COMMODITY_SELECT_LIST.length ?

                                        COMMODITY_SELECT_LIST.map((item, idx) => {
                                            return (
                                                <option key={idx} value= { getCommodityValue(item.value)}>
                                                    {item.name}
                                                </option>
                                            );
                                        })
                                        :
                                        null
                                }
                            </select>
                            
                        </div>
                    </div>

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
                        chargesBreakDown = {viewResult as Charges} categorySelected = {categorySelected as Category}
                    />
                </>
            </div>
        </>
    );
};

export default CommoditiesCalculator;

import { Category, Charges, InputTypes } from "common/Types";
import { COMMODITY_CATEGORY, COMMODITY_SELECT_LIST } from "../../../common/Constants";
import React, { useEffect, useState } from "react";
import BrokerageOutputs from "../BrokerageOutputsComponent";
import { calculateCommodityBrokerage } from "../BrokerageCalcUtils";
import InputText from "components/common/InputTextComponent";

const getCommodityInput = (commodity: string) => {
    const value = commodity.split("-");
    const values = {
        dispValue: commodity,
        comValue: value[ 1 ],
        buyPrice: value[ 2 ],
        sellPrice: value[ 3 ]
    };
    
    console.log("commodityValuecommodityValue", values);
    return values;
};

type PropsTypes = { 
    parentCBAllCharges: (arg0: Charges) => void;
    equitiesInput: (arg0: InputTypes) => void; 
    categorySelected: (arg0: Category) => void; 
}

const CommoditiesCalculator = (props: PropsTypes) => {

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(COMMODITY_CATEGORY[ 0 ].name);

    const [
        quantity, setQuantity
    ] = useState<number>(1);

    const [
        dispCommodity, setDispCommodity
    ] = useState<string>(getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).dispValue);

    const [
        buyPrice, setBuyPrice
    ] = useState<number>(Number(getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).buyPrice));

    const [
        sellPrice, setSellPrice
    ] = useState<number>(Number(getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).sellPrice));

    const [
        commodityValue, setCommodityValue
    ] = useState<number>(Number(getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).comValue));

    const [
        viewResult, setViewResults
    ] = useState<Charges>();

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
    };

    const [
        categorySelected, setCategorySelected
    ] = useState<string>(selectedCategory);

    const calculateBrokerageValues = (
        qty: number, 
        buyPrc: number, 
        sellPrc: number, 
        comValue: number, 
        showCommodity: string
    ) => {
        setQuantity(qty);
        setBuyPrice(buyPrc);
        setSellPrice(sellPrc);
        setCommodityValue(comValue);
        setDispCommodity(showCommodity);
        const result: Charges = calculateCommodityBrokerage(
            qty, 
            buyPrc, 
            sellPrc, 
            comValue, 
            selectedCategory
        );
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
            calculateBrokerageValues(
                1, 
                Number(getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).buyPrice),
                Number(getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).sellPrice),
                Number(getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).comValue),
                getCommodityInput(COMMODITY_SELECT_LIST[ 0 ].value).dispValue
            );
        }
        
    }, [
        selectedCategory
    ]);

    const onChangeQuantity = (qty: number) => {
        setQuantity(qty);        
        calculateBrokerageValues(qty, buyPrice, sellPrice, commodityValue, dispCommodity);
    };

    const onChangeBuyPrice = (buyPrc: number) => {
        setBuyPrice(buyPrc);
        calculateBrokerageValues(quantity, buyPrc, sellPrice, commodityValue, dispCommodity);

    };

    const onChangeSellPrice = (sellPrc: number) => {
        setSellPrice(sellPrc);
        calculateBrokerageValues(quantity, buyPrice, sellPrc, commodityValue, dispCommodity);

    };

    const onChangeCommodity = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(":::", evt.target.value);
        setCommodityValue(Number(getCommodityInput(evt.target.value).comValue));
        setBuyPrice(Number(getCommodityInput(evt.target.value).buyPrice));
        setSellPrice(Number(getCommodityInput(evt.target.value).sellPrice));
        setDispCommodity(getCommodityInput(evt.target.value).dispValue);

        calculateBrokerageValues(
            quantity, 
            Number(getCommodityInput(evt.target.value).buyPrice),
            Number(getCommodityInput(evt.target.value).sellPrice),
            Number(getCommodityInput(evt.target.value).comValue),
            getCommodityInput(evt.target.value).dispValue
        );
        
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
                                value = {dispCommodity}
                                onChange = { (evt) => {
                                    return onChangeCommodity(evt); 
                                }}
                            >
                                {
                                    COMMODITY_SELECT_LIST && COMMODITY_SELECT_LIST.length ?

                                        COMMODITY_SELECT_LIST.map((item, idx) => {
                                            return (
                                                <option 
                                                    key={idx} 
                                                    value= { item.value}
                                                >
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
                        chargesBreakDown = {viewResult as Charges} 
                        categorySelected = {categorySelected}
                    />
                </>
            </div>
        </>
    );
};

export default CommoditiesCalculator;

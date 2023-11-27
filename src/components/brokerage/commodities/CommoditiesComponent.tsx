import { Category, Charges, ErrorType, InputTypes } from "common/Types";
import React, { useEffect, useState } from "react";
import { ServiceRequest, useFetch } from "index";

import BrokerageOutputs from "../BrokerageOutputsComponent";
import { calculateCommodityBrokerage } from "../BrokerageCalcUtils";
import { COMMODITY_CATEGORY } from "../../../common/Constants";
import { CONFIG } from "communicator/ServiceUrls";
import { getSellPrice } from "../../../common/Utils";
import InputText from "components/common/InputTextComponent";

type PropsTypes = {
    parentCBAllCharges: (arg0: Charges) => void;
    equitiesInput: (arg0: InputTypes) => void;
    categorySelected: (arg0: Category) => void;
}

type CommodityType = {
    name: string,
    buyPrice: number,
    sellPrice: number,
    lotsize: number
}

const CommoditiesCalculator = (props: PropsTypes) => {

    const fetchAPI = useFetch();

    const [
        commodityList, setCommodityList
    ] = useState<CommodityType[]>([
    ]);

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(COMMODITY_CATEGORY[ 0 ].name);

    const [
        quantity, setQuantity
    ] = useState<number>(1);

    const [
        dispCommodity, setDispCommodity
    ] = useState<string>("");

    const [
        buyPrice, setBuyPrice
    ] = useState<number>(0);

    const [
        sellPrice, setSellPrice
    ] = useState<number>(0);

    const [
        commodityValue, setCommodityValue
    ] = useState<number>(0);

    const [
        viewResult, setViewResults
    ] = useState<Charges>();

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
    };

    const successCB = (response: { d: CommodityType[]; }) => {
        const result = [

        ];

        if (response && response.d) {
            const jsonData = response.d;

            for (const idx in jsonData) {
                result.push(
                    {
                        name: idx,
                        buyPrice: jsonData[ idx ].buyPrice,
                        sellPrice: getSellPrice(jsonData[ idx ].buyPrice),
                        lotsize: jsonData[ idx ].lotsize
                    }
                );
            }
        }

        setCommodityList(result);

    };

    const errorCB = (error: ErrorType) => {
        console.log("configError", error);
    };

    const fetchCommodityConfigDetails = () => {
        const request = new ServiceRequest();
        request.addData({});
        fetchAPI.placeGETRequest(CONFIG.COMMODITY_CONFIG, request, successCB, errorCB);
    };

    useEffect(() => {
        fetchCommodityConfigDetails();
    }, [
    ]);

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
            sellPrice: sellPrc,
            type: selectedCategory
        });
    };

    function initialCalculation() {
        if (commodityList && commodityList.length) {
            setDispCommodity(commodityList[ 0 ].name);
            setBuyPrice(commodityList[ 0 ].buyPrice);
            setSellPrice(commodityList[ 0 ].sellPrice);
            setCommodityValue(commodityList[ 0 ].lotsize);

            calculateBrokerageValues(
                1,
                commodityList[ 0 ].buyPrice,
                commodityList[ 0 ].sellPrice,
                commodityList[ 0 ].lotsize,
                commodityList[ 0 ].name
            );
        }
    }
    useEffect(() => {

        initialCalculation();

    }, [
        commodityList, selectedCategory
    ]);

    const onChangeQuantity = (qty: number) => {
        setQuantity(qty);
        if (qty !== quantity)
            calculateBrokerageValues(qty, buyPrice, sellPrice, commodityValue, dispCommodity);
    };

    const onChangeBuyPrice = (buyPrc: number) => {
        setBuyPrice(buyPrc);
        if (buyPrc !== buyPrice)
            calculateBrokerageValues(quantity, buyPrc, sellPrice, commodityValue, dispCommodity);

    };

    const onChangeSellPrice = (sellPrc: number) => {
        setSellPrice(sellPrc);
        if (sellPrc !== sellPrice)
            calculateBrokerageValues(quantity, buyPrice, sellPrc, commodityValue, dispCommodity);

    };

    const onChangeCommodity = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedItem = commodityList.filter((item: CommodityType) => {
            return item.name === evt.target.value;
        });

        if (selectedItem && selectedItem.length) {
            setCommodityValue(selectedItem[ 0 ].lotsize);
            setBuyPrice(selectedItem[ 0 ].buyPrice);
            setSellPrice(selectedItem[ 0 ].sellPrice);
            setDispCommodity(selectedItem[ 0 ].name);
        }

        calculateBrokerageValues(
            quantity,
            selectedItem[ 0 ].buyPrice,
            selectedItem[ 0 ].sellPrice,
            selectedItem[ 0 ].lotsize,
            selectedItem[ 0 ].name
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
                                    key={index}
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
                                value={dispCommodity}
                                onChange={(evt) => {
                                    return onChangeCommodity(evt);
                                }}
                            >
                                {
                                    commodityList && commodityList.length ?

                                        commodityList.map((item: CommodityType, idx: number) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={item.name}
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
                                numbersOnly={true}
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
                        chargesBreakDown={viewResult as Charges}
                        categorySelected={selectedCategory}
                    />
                </>
            </div>
        </>
    );
};

export default CommoditiesCalculator;

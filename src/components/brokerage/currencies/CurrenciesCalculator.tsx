import React, { useState } from "react";
import { CURRENCY_CATEGORY } from "../../../common/Constants";

const CurrenciesCalculator = () => {

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(CURRENCY_CATEGORY[ 0 ].name);

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
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
        </>
    );
};

export default CurrenciesCalculator;

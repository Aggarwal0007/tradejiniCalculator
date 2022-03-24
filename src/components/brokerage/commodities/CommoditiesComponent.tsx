import React, { useState } from "react";
import { COMMODITY_CATEGORY } from "../../../common/Constants";

const CommoditiesCalculator = () => {

    const [
        selectedCategory, setSelectedCategory
    ] = useState<string>(COMMODITY_CATEGORY[ 0 ].name);

    const onSelectedCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
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
        </>
    );
};

export default CommoditiesCalculator;

import { Charges } from "common/Types";
import React from "react";

type PropsTypes = {
    chargeList: Charges;
}

const TotalChargesTable = (props: PropsTypes) => {
    const { chargeList } = props;

    const chargesDispList = [
        { label: "Turnover", value: chargeList.turnOver, isShow: !!chargeList.turnOver },
        { label: "Brokerage", value: chargeList.brokerage, isShow: !!chargeList.brokerage },
        { label: "STTCharges", value: chargeList.STTCharges, isShow: !!chargeList.STTCharges },
        { label: "Total Trans Charge", value: chargeList.transactionCharges, isShow: !!chargeList.transactionCharges },
        { label: "GST", value: chargeList.GSTCharges, isShow: !!chargeList.GSTCharges },
        { label: "SEBI Charges", value: chargeList.sebiCharges, isShow: !!chargeList.sebiCharges },
        { label: "IPFT Charges", value: chargeList.ipftCharges, isShow: !!chargeList.ipftCharges },
        { label: "STAMP Charges", value: chargeList.stampCharges, isShow: !!chargeList.stampCharges },
        { label: "Total Charges", value: chargeList.totalCharges, isShow: !!chargeList.totalCharges },
        { label: "CTT", value: chargeList.CTT, isShow: !!chargeList.CTT },
        { label: "Net Profit", value: chargeList.netProfit, isShow: !!chargeList.netProfit },
        { label: "Points to Breakeven(BEP)", value: chargeList.pointBreakeven, isShow: !!chargeList.pointBreakeven },
        { label: "Pips to Breakeven(BEP)", value: chargeList.pipsBreakeven, isShow: !!chargeList.pipsBreakeven },
    ];

    return (
        <div className="total-charges-table">
            <div className="table-heading">
                Total Charges
            </div>
            <div className="charges-list">
                { chargesDispList && chargesDispList.length ?
                    chargesDispList.map((item, inx) => {
                        return (
                            <div className={`${item.isShow ? "visible" : "hide"} list-item`} key={inx}>
                                <div className="item-name">
                                    {item.label}
                                </div>
                                < div className="item-value">
                                    {item.value}
                                </div>
                            </div>
                        );
                    })
                    :
                    <></> }
            </div>
        </div>
    );
};

export default TotalChargesTable;

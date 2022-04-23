import { Charges } from "common/Types";
import React from "react";

type PropsTypes = { 
    chargeList: Charges; 
}

const TotalChargesTable = (props: PropsTypes) => {
    const { chargeList } = props;
    return (
        <div className="total-charges-table">
            <div className="table-heading">
                Total Charges
            </div>
            <div className="charges-list">

                <div className="list-item">
                    <div className="item-name">
                       Turnover
                    </div>
                    < div className="item-value">
                        {chargeList.turnOver}
                    </div>
                </div>

                <div className="list-item">
                    <div className="item-name">
                       Brokerage
                    </div>
                    < div className="item-value">
                        {chargeList.brokerage}
                    </div>
                </div>

                {
                    chargeList.STTCharges ?
                        <div className="list-item">
                            <div className="item-name">
                      Stt Total
                            </div>
                            < div className="item-value">
                                {chargeList.STTCharges}
                            </div>
                        </div>
                        :
                        null
                }
               

                <div className="list-item">
                    <div className="item-name">
                       Total Trans Charge
                    </div>
                    < div className="item-value">
                        {chargeList.transactionCharges}
                    </div>
                </div>

                <div className="list-item">
                    <div className="item-name">
                       GST
                    </div>
                    < div className="item-value">
                        {chargeList.GSTCharges}
                    </div>
                </div>

                <div className="list-item">
                    <div className="item-name">
                       SEBI Charges
                    </div>
                    < div className="item-value">
                        {chargeList.sebiCharges}
                    </div>
                </div>

                <div className="list-item">
                    <div className="item-name">
                       STAMP Charges
                    </div>
                    < div className="item-value">
                        {chargeList.stampCharges}
                    </div>
                </div>

                <div className="list-item">
                    <div className="item-name">
                       Total Charges
                    </div>
                    < div className="item-value">
                        {chargeList.totalCharges}
                    </div>
                </div>

                {
                    chargeList.CTT ?

                        <div className="list-item">
                            <div className="item-name">
                       CTT
                            </div>
                            < div className="item-value">
                                {chargeList.CTT}
                            </div>
                        </div>
                        :
                        null
                }

                <div className="list-item">
                    <div className="item-name">
                       Net Profit
                    </div>
                    < div className="item-value">
                        {chargeList.netProfit}
                    </div>
                </div>

                <div className="list-item">
                    <div className="item-name">
                       Points to Breakeven(BEP)
                    </div>
                    < div className="item-value">
                        {chargeList.pointBreakeven}
                    </div>
                </div>

                {
                    chargeList.pipsBreakeven ?

                        <div className="list-item">
                            <div className="item-name">
                       Pips to Breakeven(BEP)
                            </div>
                            < div className="item-value">
                                {chargeList.pointBreakeven}
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        </div>
    );
};

export default TotalChargesTable;

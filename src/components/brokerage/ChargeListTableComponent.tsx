import React, { useEffect, useState } from "react";
import { CHARGE_LIST } from "../../common/Constants";

const ChargeListTable = (props: { inputKeys: any; }) => {

    const { inputKeys } = props;

    const [
        chargesList, setChargesList
    ] = useState(CHARGE_LIST[ inputKeys.type ]);

    useEffect(() => {
        setChargesList(CHARGE_LIST[ inputKeys.type ]);
    }, [
        inputKeys.type
    ]);

    return (
        <div className="charges-table">
            <div className="table-heading">
                Charge List
            </div>
            <table className="table table-bordered table-striped">
                {/* <thead>
                    <tr>
                        <th>Charges </th>
                        <th>Equity Intraday
                        </th>
                    </tr>
                </thead> */}
                {/* <tbody>
                    <tr>
                        <td>STT/CTT	</td>
                        <td>0.025% on the Sell Side</td>
                    </tr>
                    <tr>
                        <td>Transaction/ Turnover Charges	</td>
                        <td>NSE: 345/Crore
BSE: 275/Crore</td>
                        
                    </tr>
                    <tr>
                        <td>SEBI Charges	</td>
                        <td>Rs 10/- Per Crore Turnover
                        </td>
                        
                    </tr>
                    <tr>
                        <td>GST</td>
                        <td>18% on Brokerage & Transaction Charges
                        </td>
                        
                    </tr>
                    <tr>
                        <td>Stamp duty
(w.e.f 01st Jul 2020)	</td>
                        <td>0.003% on Buyer - Rs.300 Per Cr</td>
                        
                    </tr>
                </tbody>  */}

                <tbody>
                    {
                        chargesList && chargesList.length ?

                            chargesList.map((item: any, idx: any) => {

                                if (idx === 0) {
                                    return (
                                        <tr key={idx}>
                                            <th>{item.name}</th>
                                            <th>{item.value}</th>
                                        </tr>
                                    );
                                }
                                return (
                                    <tr key={idx}>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                );
                                
                                
                            })
                            :
                            null
                    }
                </tbody> 
                
            </table>
        </div>
    );
};

export default ChargeListTable;

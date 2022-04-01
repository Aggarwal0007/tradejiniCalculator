import { ChargesItem, InputTypes } from "common/Types";
import React, { useEffect, useState } from "react";
import { CHARGE_LIST } from "../../common/Constants";

const ChargeListTable = (props: { inputKeys: InputTypes; }) => {

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

                <tbody>
                    {
                        chargesList && chargesList.length ?

                            chargesList.map((item: ChargesItem, idx: number) => {

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

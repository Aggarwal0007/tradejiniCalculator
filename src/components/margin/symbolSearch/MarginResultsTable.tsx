import React, { useEffect, useState } from "react";

type MarginResults = {
    expo: string,
    expo_trade: string,
    request_time: string,
    span: string,
    span_trade: string,
    stat: string
}

const MarginResultsTable = (props: { marginResponse: React.SetStateAction<MarginResults | undefined>; }) => {

    const [
        marginResults, setMarginResults
    ] = useState<MarginResults>();

    useEffect(() => {

        if (props && props.marginResponse) {
            setMarginResults(props.marginResponse);
        }
    }, [
        props.marginResponse
    ]);

    const getTotalmargin = (results: MarginResults | undefined) => {
        let totalMargin = 0;
        if (results && results.expo && results.span)
            totalMargin = Number(results.expo) + Number(results.span);

        return totalMargin;
    };

    const convertToCommaSeparator = (number: string) => {
        return Number(parseFloat(number).toFixed(2)).toLocaleString("en-IN", {
            minimumFractionDigits: 2
        });
    };

    return (
        <div className="margin-results-table">
            <div className="margin-result-title">
                Required Margin
            </div>
            <div className="margin-results-display">
                <div className="margin-results-row">
                    <div className="">
                        Span Margin
                    </div>
                    <div className="">
                        {(marginResults && marginResults.span) ? 
                            convertToCommaSeparator(marginResults.span)
                            : 0 }
                    </div>
                </div>
                <div className="margin-results-row">
                    <div className="">
                        Exposure Margin
                    </div>
                    <div className="">
                        {(marginResults && marginResults.expo) ? 
                            convertToCommaSeparator(marginResults.expo)
                            : 0 }
                    </div>
                </div>
                <div className="margin-results-row">
                    <div className="">
                        Total Margin
                    </div>
                    <div className="">
                        {convertToCommaSeparator(getTotalmargin(marginResults) as unknown as string) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarginResultsTable;

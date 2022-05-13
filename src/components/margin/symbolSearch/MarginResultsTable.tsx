import React from "react";

type MarginResults = {
    expo: string,
    expo_trade: string,
    request_time: string,
    span: string,
    span_trade: string,
    stat: string
}

const MarginResultsTable = (props: { marginResponse: MarginResults }) => {

    const getTotalmargin = (results: MarginResults) => {
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
                        {(props.marginResponse && props.marginResponse.span) ? 
                            convertToCommaSeparator(props.marginResponse.span)
                            : 0 }
                    </div>
                </div>
                <div className="margin-results-row">
                    <div className="">
                        Exposure Margin
                    </div>
                    <div className="">
                        {(props.marginResponse && props.marginResponse.expo) ? 
                            convertToCommaSeparator(props.marginResponse.expo)
                            : 0 }
                    </div>
                </div>
                <div className="margin-results-row">
                    <div className="">
                        Total Margin
                    </div>
                    <div className="">
                        {convertToCommaSeparator(getTotalmargin(props.marginResponse) as unknown as string) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarginResultsTable;

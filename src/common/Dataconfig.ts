import { Charges } from "./Types";

export const configDetails = {
    brokerageDetails: {},

    getBrokerageDetails: function() {
        return this.brokerageDetails;
    },

    setBrokerageDetails: function(details: Charges) {
        this.brokerageDetails = details;
    }
};

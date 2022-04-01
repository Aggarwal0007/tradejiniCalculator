class ServiceConfig {
    static serviceURL: string;

    static encryptionKey: string;

    static apiEncryptionEnabled: boolean = false;

    static storageEncryptionEnabled: boolean = false;

    static STATUS: Record<string, string> = {
        SUCCESS: "ok",
        ERROR: "error",
        NO_DATA: "no-data"
    };

    static NetworkErrorMessages: Record<string, string> = {
        INVALID_SESSION: "Invalid Session",
        INVALID_REQUEST: "Invalid Request",
        API_SERVICE_UNAVAILABLE: "API Service is not available.",
        NO_CONNECTIVITY: "Not able to Connect.",
        API_TIMEOUT: "Unable to process the request right now. Please try again."
    };

    // static getAppID: () => {};

    static handleInvalidSession: (evt: any) => {};

    static fetchTimeout: number = 15;


    static setServiceURL(_url: string) {
        this.serviceURL = _url;
    }
    
    static getServiceURL() {
        return this.serviceURL;
    }

    static setEncryptionKey(_key: string) {
        this.encryptionKey = _key;
    }

    static setApiEncryptionEnabled(_flag: boolean) {
        this.apiEncryptionEnabled = _flag;
    }

    static setStorageEncryptionEnabled(_flag: boolean) {
        this.storageEncryptionEnabled = _flag;
    }

    static setHandleCallback(_callBack: () => {}) {
        this.handleInvalidSession = _callBack;
    }

    static setApiTimeout(_time: number) {
        this.fetchTimeout = _time;
    }
}

export default ServiceConfig;

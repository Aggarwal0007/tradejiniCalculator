export type echoType = null | string | number
export type methodType = "POST" | "GET" | "PUT"


class ServiceRequest {
    private reqData: Record<string, any>;

    private echo: echoType;

    private appID: null | string;

    private method: methodType;

    private headers: Record<string, string>;

    private encrypt: boolean;

    private isJSONData: boolean;

    constructor() {
        this.reqData = {};
        this.echo = null;
        this.appID = null;
        this.method = "POST";
        this.headers = { "Content-Type": "application/x-www-form-urlencoded" };
        this.encrypt = false;
        this.isJSONData = false;
    }

    addToData = (key:string, value:any) => {
        this.reqData[ key ] = value;
    };

    addData = (_obj: Record<string, any>) => {
        this.reqData = _obj;
    };

    clearData = () => {
        this.reqData = {};
    };
    
    setEcho = (_echo: echoType) => {
        this.echo = _echo;
    };
    
    getEcho = () => {
        return this.echo;
    };
    
    setAppID = (_appID: string) => {
        this.appID = _appID;
    };

    hasAppID = () => {
        return this.appID !== null;
    };

    setMethod = (_method: methodType) => {
        this.method = _method;
    };
    
    getMethod = () => {
        return this.method;
    };

    setHeader = (_obj: Record<string, any>) => {
        Object.keys(_obj).forEach((key) => {
            this.headers[ key ] = _obj[ key ];
        });
    };

    getHeader = () => {
        return this.headers;
    };
    
    setReqAsJSON = () => {
        this.isJSONData = true;
        
        this.setHeader({ "Content-Type": "application/json" });
    };
    
    isJSON = () => {
        return this.isJSONData;
    };

    setEncrypt = (_encrypt: boolean) => {
        this.encrypt = _encrypt;
    };

    formReq = () => {
        // configure based on project
        const request = { ...this.reqData };

        return request;
    };

    toS = () => {
        return JSON.stringify(this.formReq());
    };

    getFormDataReq = () => {
        const formData = new URLSearchParams();
        const reqParam = this.formReq();

        for (const key in reqParam) {
            formData.set(key, reqParam[ key ]);
        }

        return formData;
    };
}

export default ServiceRequest;

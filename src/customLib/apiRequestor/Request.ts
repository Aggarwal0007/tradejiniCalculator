import { EchoType, Methods } from "./Modal";

export default class ServiceRequest {
    private reqData: Record<string, any>;

    private echo: EchoType;

    private method: Methods;

    private headers: Record<string, string>;

    private encrypt: boolean;

    private isJSONData: boolean;

    private isQueryParam: boolean;

    private isFormDataReq: boolean;

    constructor() {
        this.reqData = {};
        this.echo = null;
        this.method = "POST";
        this.headers = { "Content-Type": "application/x-www-form-urlencoded" };
        this.encrypt = false;
        this.isJSONData = false;
        this.isQueryParam = false;
        this.isFormDataReq = false;
    }

    addToData = (key: string, value: any) => {
        this.reqData[ key ] = value;
    };

    addData = (_obj: Record<string, any>) => {
        this.reqData = _obj;
    };

    clearData = () => {
        this.reqData = {};
    };

    setEcho = (_echo: EchoType) => {
        this.echo = _echo;
    };

    getEcho = () => {
        return this.echo;
    };

    setMethod = (_method: Methods) => {
        this.method = _method;
    };

    getMethod = () => {
        return this.method;
    };

    setHeader = (_obj: Record<string, string>) => {
        for (const key in _obj) {
            this.headers[ key ] = _obj[ key ];
        }
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

    setReqAsQueryParam = () => {
        this.isQueryParam = true;
    };

    isQueryParams = () => {
        return this.isQueryParam;
    };

    setReqAsFormData = () => {
        this.isFormDataReq = true;
        delete this.headers[ "Content-Type" ];
    };

    isFormData = () => {
        return this.isFormDataReq;
    };

    setEncrypt = () => {
        this.encrypt = true;
    };

    isEncrypt = () => {
        return this.encrypt;
    };

    formReq = () => {
        // configure based on project
        const request = this.reqData;

        return request;
    };

    getJSONReq = () => {
        return JSON.stringify(this.formReq());
    };

    getFormDataReq = () => {
        const formData = new URLSearchParams();
        const reqParam = this.formReq();

        for (const key in reqParam) {
            formData.set(key, reqParam[ key ] ? reqParam[ key ].toString() : reqParam[ key ]);
        }

        return formData;
    };
}

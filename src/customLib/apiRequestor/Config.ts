import { StringDictionary, StringNumberDictionary } from "./Modal";

import CommonError from "./Error";
import { isNonEmpty } from "./Helpers";

export default class ServiceConfig {
    private static serviceURL: string;

    private static headers: Record<string, string> = {};

    private static encryptionKey: string;

    private static apiEncryptionEnabled: boolean = false;

    private static storageEncryptionEnabled: boolean = false;

    private static storageKeyEncryptionEnabled: boolean = false;

    private static storageKeyPrefix: string = "";

    private static STATUS: StringDictionary = {
        SUCCESS: "ok",
        ERROR: "error",
        NO_DATA: "no-data"
    };

    private static ERROR_CODE: StringNumberDictionary = {
        ERROR_400: "ERROR_400",
        ERROR_401: "ERROR_401",
        ERROR_429: "ERROR_429",
        ERROR_500: "ERROR_500",
        ERROR_502: "ERROR_502",
        INVALID_REQUEST: "INVALID_REQUEST",
        API_TIMEOUT: "API_TIMEOUT",
        SUCCESS: "200"
    };

    private static NetworkErrorMessages: StringDictionary = {
        ERROR_400: "Bad Request.",
        ERROR_401: "Unauthorized Access",
        ERROR_429: "Too many request",
        ERROR_500: "Internal server error",
        ERROR_502: "API Service is not available.",
        INVALID_REQUEST: "Invalid Request",
        API_TIMEOUT: "Unable to process the request right now. Please try again.",
        NO_CONNECTIVITY: "Not able to Connect.",
    };

    private static fetchTimeout: number = 15;

    public static handleInvalidSession: (error: CommonError) => void;


    public static setServiceURL(_url: string) {
        this.serviceURL = _url;
    }

    public static getServiceURL() {
        return this.serviceURL;
    }

    public static setHeader(_obj: Record<string, string>) {
        for (const key in _obj) {
            this.headers[ key ] = _obj[ key ];
        }
    }

    public static getHeader() {
        return this.headers;
    }

    public static removeHeader(key: string) {
        delete this.headers[ key ];
    }

    public static setEncryptionKey(_key: string) {
        this.encryptionKey = _key;
    }

    public static getEncryptionKey() {
        return this.encryptionKey;
    }

    public static setApiEncryptionEnabled(_flag: boolean) {
        this.apiEncryptionEnabled = _flag;
    }

    public static isApiEncryptionEnabled() {
        return this.apiEncryptionEnabled;
    }

    public static setStorageEncryptionEnabled(_flag: boolean) {
        this.storageEncryptionEnabled = _flag;
    }

    public static isStorageEncryptionEnabled() {
        return this.storageEncryptionEnabled;
    }

    public static setStorageKeyEncryptionEnabled(_flag: boolean) {
        this.storageKeyEncryptionEnabled = _flag;
    }

    public static isStorageKeyEncryptionEnabled() {
        return this.storageKeyEncryptionEnabled;
    }

    public static setStorageKeyPrefix(_key: string) {
        this.storageKeyPrefix = _key;
    }

    public static getStorageKeyPrefix() {
        return isNonEmpty(this.storageKeyPrefix) ? `${this.storageKeyPrefix}_` : this.storageKeyPrefix;
    }

    public static setStatus(_obj: StringDictionary) {
        this.STATUS = { ...this.STATUS, ..._obj };
    }

    public static getStatus() {
        return this.STATUS;
    }

    public static setErrorCode(_obj: StringNumberDictionary) {
        this.ERROR_CODE = { ...this.ERROR_CODE, ..._obj };
    }

    public static getErrorCode() {
        return this.ERROR_CODE;
    }

    public static setErrorMessages(_obj: StringDictionary) {
        this.NetworkErrorMessages = { ...this.NetworkErrorMessages, ..._obj };
    }

    public static getErrorMessages() {
        return this.NetworkErrorMessages;
    }

    public static setApiTimeout(_time: number) {
        this.fetchTimeout = _time;
    }

    public static getApiTimeout() {
        return this.fetchTimeout;
    }

    public static setHandleCallback(_callBack: (error: CommonError) => void) {
        this.handleInvalidSession = _callBack;
    }
}

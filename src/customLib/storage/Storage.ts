import { decrypt, encrypt } from "./Encryption";

import ServiceConfig from "../apiRequestor/Config";

// ========================= window.localStorage =========================
export const storeToLocalStorage = (keyName: string, value: any) => {
    const key = ServiceConfig.getStorageKeyPrefix() + keyName;

    const strValue = JSON.stringify(value);
    if (ServiceConfig.isStorageEncryptionEnabled()) {
        if (ServiceConfig.isStorageKeyEncryptionEnabled())
            window.localStorage && window.localStorage.setItem(encrypt(key), encrypt(strValue));
        else
            window.localStorage && window.localStorage.setItem(key, encrypt(strValue));
    } else {
        window.localStorage && window.localStorage.setItem(key, strValue);
    }
};

export const getFromLocalStorage = (keyName: string) => {
    const key = ServiceConfig.getStorageKeyPrefix() + keyName;

    if (ServiceConfig.isStorageEncryptionEnabled()) {
        if (window.localStorage) {
            let val = null;
            if (ServiceConfig.isStorageKeyEncryptionEnabled())
                val = window.localStorage.getItem(encrypt(key));
            else
                val = window.localStorage.getItem(key);

            if (!val) return val;
            try {
                return JSON.parse(decrypt(val));
            } catch (error) {
                return decrypt(val);
            }
        }
    } else if (window.localStorage) {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : value;
    }
    return null;
};

export const removeFromLocalStorage = (keyName: string) => {
    const key = ServiceConfig.getStorageKeyPrefix() + keyName;

    if (ServiceConfig.isStorageKeyEncryptionEnabled()) {
        window.localStorage.removeItem(encrypt(key));
    } else {
        window.localStorage.removeItem(key);
    }
};

export const clearLocalStorage = () => {
    window.localStorage.clear();
};
// ========================= window.localStorage =========================


// ========================= window.sessionStorage =========================
export const storeToSessionStorage = (keyName: string, value: any) => {
    const key = ServiceConfig.getStorageKeyPrefix() + keyName;

    const strValue = JSON.stringify(value);
    if (ServiceConfig.isStorageEncryptionEnabled()) {
        if (ServiceConfig.isStorageKeyEncryptionEnabled())
            window.sessionStorage && window.sessionStorage.setItem(encrypt(key), encrypt(strValue));
        else
            window.sessionStorage && window.sessionStorage.setItem(key, encrypt(strValue));
    } else {
        window.sessionStorage && window.sessionStorage.setItem(key, strValue);
    }
};

export const getFromSessionStorage = (keyName: string) => {
    const key = ServiceConfig.getStorageKeyPrefix() + keyName;

    if (ServiceConfig.isStorageEncryptionEnabled()) {
        if (window.sessionStorage) {
            let val = null;
            if (ServiceConfig.isStorageKeyEncryptionEnabled())
                val = window.sessionStorage.getItem(encrypt(key));
            else
                val = window.sessionStorage.getItem(key);
            if (!val) return val;

            try {
                return JSON.parse(decrypt(val));
            } catch (error) {
                return decrypt(val);
            }
        }
    } else if (window.sessionStorage) {
        const value = window.sessionStorage.getItem(key);
        return value ? JSON.parse(value) : value;
    }
    return null;
};

export const removeFromSessionStorage = (keyName: string) => {
    const key = ServiceConfig.getStorageKeyPrefix() + keyName;

    if (ServiceConfig.isStorageKeyEncryptionEnabled()) {
        window.sessionStorage.removeItem(encrypt(key));
    } else {
        window.sessionStorage.removeItem(key);
    }
};

export const clearSessionStorage = () => {
    window.sessionStorage.clear();
};
// ========================= window.sessionStorage =========================

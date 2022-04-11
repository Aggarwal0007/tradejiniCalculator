import { appSetingsType } from "./Types";

const getBool = (val: string | undefined) => {
    if (val && val !== null)
        return val === "true";
    
    return false;
};

export const AppSettings: appSetingsType = {
    publicURL: process.env.PUBLIC_URL??"",
    baseURL: process.env.REACT_APP_BASE_URL??"",
    appVersion:process.env.REACT_APP_VERSION??"",
    serviceURL: process.env.REACT_APP_SERVICE_URL??"",
    apiEncryptionEnabled: getBool(process.env.REACT_APP_API_ENCRYPTION_ENABLED),
    localStorageEncryptionEnabled: getBool(process.env.REACT_APP_LOCALSTORAGE_ENCRYPTION_ENABLED)
};

export const getFullURL = (url: string) => {
    // return AppSettings.serviceURL + url;
    return url;
};

export const AppSettings = {
    publicURL: process.env.PUBLIC_URL,
    baseURL: process.env.REACT_APP_BASE_URL,
    appVersion:process.env.REACT_APP_VERSION,
    serviceURL: process.env.REACT_APP_SERVICE_URL
};

export const getFullURL = (url: string) => {
    return AppSettings.serviceURL + url;
};

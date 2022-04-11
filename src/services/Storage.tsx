const storeToSessionStorage = (key: string, value: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};

const getFromSessionStorage = (key: string) => {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : value;
};

const storeToLocalStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string) => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
};

const clearSessionStorage = () => {
    window.sessionStorage.clear();
};

export { storeToSessionStorage, getFromSessionStorage, storeToLocalStorage, getFromLocalStorage, clearSessionStorage } ;

const CryptoJS = require("crypto-js");

import ServiceConfig from "../apiRequestor/Config";

export const encrypt = (value: any) => {
    const secretKey = ServiceConfig.getEncryptionKey();

    const ciphertext = CryptoJS.AES.encrypt(value, secretKey).toString();
    return ciphertext;
};

export const decrypt = (value: any) => {
    const secretKey = ServiceConfig.getEncryptionKey();

    const bytes = CryptoJS.AES.decrypt(value, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

// import { handleInvalidSession } from "utils/Bridge";
import ServiceConfig from "./Config";
import ServiceRequest from "./Request";
// import { decrypt, encrypt } from "./Encryption";     FIX ME

class ApiError extends Error {
    errorID: string;

    constructor(message: string) {
        super(message);
        this.name = "ApiError";
        this.errorID = "IO_400";
    }
}

const useFetch = () => {

    // const {
    //     NetworkErrorMessages,
    //     // apiEncryptionEnabled,
    //     fetchTimeout,
    //     serviceURL
    // } = ServiceConfig;       FIX ME
    // console.log("ServiceConfig :", ServiceConfig.serviceURL);
    // console.log("ServiceConfig :", ServiceConfig.getServiceURL());

    // const handleInvalidSession = ServiceConfig.handleInvalidSession;
    const NetworkErrorMessages = ServiceConfig.NetworkErrorMessages;

    const checkStatus = (response: any) => {
        console.log("response :", response);
        
        if (response.status === 200) {
            return response;
        } else if (response.status === 401) {
            const error = new ApiError(NetworkErrorMessages.INVALID_SESSION);
            error.errorID = "401";
            throw error;
        } else {
            const error = new ApiError(NetworkErrorMessages.API_SERVICE_UNAVAILABLE);
            error.errorID = "IO_400";
            throw error;
        }
    };

    const getBody = (response: { text: () => any; }) => {
        return response.text();
    };

    const parseBody = (response: string) => {
        return JSON.parse(response);
    };

    const parseJson = (response: any) => {
        if (response.status === ServiceConfig.STATUS.ERROR) {
            const error = new ApiError(response.msg);
            error.errorID = "IO_400";
            throw error;
        }

        return response;
    };

    // const promiseTimeout = (promise: Promise<any>, controller: AbortController) => {
    const promiseTimeout = (promise: Promise<any>) => {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                // controller.abort();
                const error = new ApiError(NetworkErrorMessages.API_TIMEOUT);
                error.errorID = "IO_400";
                reject(error);
            }, ServiceConfig.fetchTimeout * 1000);

            promise.then(
                (res) => {
                    console.log("res :", res);
                    clearTimeout(timeoutId);
                    resolve(res);
                },
                (error) => {
                    console.log("error :", error);
                    clearTimeout(timeoutId);
                    reject(error);
                }
            );
        });
    };


    const httpPost = (url: string, request: ServiceRequest) => {
        const fullUrl = ServiceConfig.serviceURL ? new URL(ServiceConfig.serviceURL + url) : new URL(url);
        // const controller = new AbortController();
        // const signal = controller.signal;

        // if (request.encrypt === false)
        //     request.headers[ "X-ENCRYPT" ] = request.encrypt ? "true" : "false";

        // if (apiEncryptionEnabled && request.encrypt !== false) {
        //     reqData = request.toS();
        //     reqData = encrypt(reqData);
        // } else {
        //     reqData = request.toS();
        // }

        const param: RequestInit = {
            method: request.getMethod(),
            credentials: "include",
            headers: request.getHeader(),
            // signal: signal
        };
        console.log("request :", request);

        if (request.isJSON()) {
            if (request.getMethod() === "GET") {
                const queryParam = request.formReq();
                
                for (const key in queryParam) {
                    fullUrl.searchParams.append(key, queryParam[ key ].toString());
                }
            } else if (request.getMethod() === "POST") {
                param.body = request.toS() ? request.toS() : JSON.stringify({});
            } 
        } else if (!request.isJSON()) {
            if (request.getMethod() === "POST" || request.getMethod() === "PUT") {
                param.body = request.getFormDataReq();
            }
        } else {
            const error = new ApiError(NetworkErrorMessages.INVALID_REQUEST);
            error.errorID = "IO_400";
            throw error;
        }
        
        return promiseTimeout(
            fetch(fullUrl.href, param)
                .then(checkStatus)
                .then(getBody)
                .then(parseBody)
                .then(parseJson)
                .catch((error) => {
                    console.log("catch error :", error);
                    console.log("catch error :", error.errorID);
                    
                    // errorID available means the above promises are resolved
                    if (!error.errorID)
                        error = new ApiError(NetworkErrorMessages.NO_CONNECTIVITY);
                    throw error;
                }),
            // controller
        );
    };

    const placeRequest = async (
        url: string,
        request: ServiceRequest,
        successCallback: (obj: any) => void,
        errorCallback: (obj: any) => void
    ) => {
        try {
            const response: any = await httpPost(url, request);

            if (request.getEcho())
                response.echo = request.getEcho();

            if (successCallback)
                successCallback(response);
        } catch (error: any) {
            if (request.getEcho())
                error.echo = request.getEcho();

            console.log("error :", error.message);
            
            // if (error.errorID === "401") {
            //     handleInvalidSession && handleInvalidSession(error);
            //     return;
            // }

            if (errorCallback)
                errorCallback(error);
        }
    };
    
    const placeGETRequest = async (
        url: string,
        request: ServiceRequest,
        successCallback: (obj: any) => void,
        errorCallback: (obj: any) => void
    ) => {
        request.setMethod("GET");
        placeRequest(url, request, successCallback, errorCallback);
    };
    
    const placePOSTRequest = placeRequest;

    const placePUTRequest = async (
        url: string,
        request: ServiceRequest,
        successCallback: (obj: any) => void,
        errorCallback: (obj: any) => void
    ) => {
        request.setMethod("PUT");
        placeRequest(url, request, successCallback, errorCallback);
    };
    
    return (
        {
            placeGETRequest,
            placePOSTRequest,
            placePUTRequest
        }
    );

};

export default useFetch;

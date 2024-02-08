import { isEmpty, isNonEmpty } from "./Helpers";

import CommonError from "./Error";
import ServiceConfig from "./Config";
import ServiceRequest from "./Request";

const useFetch = () => {

    const serviceURL = ServiceConfig.getServiceURL();
    const PREDEFINED_HEADER = ServiceConfig.getHeader();
    const fetchTimeout = ServiceConfig.getApiTimeout();
    const STATUS = ServiceConfig.getStatus();
    const ERROR_CODE = ServiceConfig.getErrorCode();
    const NetworkErrorMessages = ServiceConfig.getErrorMessages();

    const { handleInvalidSession } = ServiceConfig;

    const checkStatus = (response: Response) => {
        console.log("response :", response);

        if (response.status === 200) {
            return response;
        } else if (response.status === 400) {
            const error = new CommonError(NetworkErrorMessages.ERROR_400);
            error.errorID = ERROR_CODE.ERROR_400;
            throw error;
        } else if (response.status === 401) {
            const error = new CommonError(NetworkErrorMessages.ERROR_401);
            error.errorID = ERROR_CODE.ERROR_401;
            throw error;
        } else if (response.status === 429) {
            const error = new CommonError(NetworkErrorMessages.ERROR_429);
            error.errorID = ERROR_CODE.ERROR_429;
            throw error;
        } else if (response.status === 500) {
            const error = new CommonError(NetworkErrorMessages.ERROR_500);
            error.errorID = ERROR_CODE.ERROR_500;
            throw error;
        } else if (response.status === 502) {
            const error = new CommonError(NetworkErrorMessages.ERROR_502);
            error.errorID = ERROR_CODE.ERROR_502;
            throw error;
        } else {
            const error = new CommonError(NetworkErrorMessages.NO_CONNECTIVITY);
            error.errorID = response.status.toString();
            throw error;
        }
    };

    const getBody = (response: Response) => {
        return response.text();
    };

    const parseBody = (response: string) => {
        return JSON.parse(response);
    };

    const parseJson = (response: any) => {
        console.log("response :", response);
        if (response.s === STATUS.ERROR) {
            const error = new CommonError(response.msg);
            error.errorID = ERROR_CODE.SUCCESS;
            throw error;
        }

        return response;
    };

    const promiseTimeout = (promise: Promise<any>) => {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                const error = new CommonError(NetworkErrorMessages.API_TIMEOUT);
                error.errorID = ERROR_CODE.ERROR_API_TIMEOUT;
                reject(error);
            }, fetchTimeout * 1000);

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


    const httpPost = (url: string, request: ServiceRequest, isURL: boolean = false) => {
        const fullUrl = (isURL || !serviceURL) ? new URL(url) : new URL(serviceURL + url);

        const param: RequestInit = {
            method: request.getMethod(),
            headers: { ...PREDEFINED_HEADER, ...request.getHeader() },
            credentials: "include"
        };

        if (request.getMethod() === "GET" || (request.getMethod() === "DELETE" && request.isQueryParams())) {
            const queryParam = request.formReq();

            for (const key in queryParam) {
                fullUrl.searchParams.append(key, queryParam[ key ].toString());
            }
        } else if (request.isFormData()) {
            if (request.getMethod() === "POST") {
                const formData = new FormData();
                const queryParam = request.formReq();

                for (const key in queryParam) {
                    formData.append(key, queryParam[ key ]);
                }
                param.body = formData;
            }
        } else if (request.isJSON()) {
            if (request.getMethod() === "POST" || request.getMethod() === "PUT") {
                param.body = request.getJSONReq();
            }
        } else if (!request.isJSON()) {
            if (request.getMethod() === "POST" || request.getMethod() === "PUT" || request.getMethod() === "DELETE") {
                param.body = request.getFormDataReq();
            }
        } else {
            const error = new CommonError(NetworkErrorMessages.INVALID_REQUEST);
            error.errorID = ERROR_CODE.INVALID_REQUEST;
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

                    // errorID available means the above promises are resolved
                    if (isEmpty(error.errorID))
                        error = new CommonError(NetworkErrorMessages.NO_CONNECTIVITY);
                    throw error;
                })
        );
    };

    const placeRequest = async (
        url: string,
        request: ServiceRequest,
        successCallback: (obj: any) => void,
        errorCallback: (obj: CommonError) => void,
        isURL?: boolean
    ) => {
        try {
            const response: any = await httpPost(url, request, isURL);

            if (isNonEmpty(request.getEcho()))
                response.echo = request.getEcho();

            if (successCallback)
                successCallback(response);
        } catch (error: any) {
            if (isNonEmpty(request.getEcho()))
                error.echo = request.getEcho();

            if (error.errorID && error.errorID === ERROR_CODE.ERROR_401) {
                handleInvalidSession && handleInvalidSession(error);
                return;
            }

            if (errorCallback) {
                if (error.errorID && error.errorID !== ERROR_CODE.SUCCESS)
                    error.message = `${error.message} [${error.errorID}]`;
                errorCallback(error);
            }
        }
    };

    const placeGETRequest = (
        url: string,
        request: ServiceRequest,
        successCallback: (obj: any) => void,
        errorCallback: (obj: CommonError) => void,
        isURL?: boolean
    ) => {
        request.setMethod("GET");
        placeRequest(url, request, successCallback, errorCallback, isURL);
    };

    const placePOSTRequest = placeRequest;

    const placePUTRequest = (
        url: string,
        request: ServiceRequest,
        successCallback: (obj: any) => void,
        errorCallback: (obj: CommonError) => void,
        isURL?: boolean
    ) => {
        request.setMethod("PUT");
        placeRequest(url, request, successCallback, errorCallback, isURL);
    };

    const placeDELETERequest = (
        url: string,
        request: ServiceRequest,
        successCallback: (obj: any) => void,
        errorCallback: (obj: CommonError) => void,
        isURL?: boolean
    ) => {
        request.setMethod("DELETE");
        placeRequest(url, request, successCallback, errorCallback, isURL);
    };

    return (
        {
            placeGETRequest,
            placePOSTRequest,
            placePUTRequest,
            placeDELETERequest
        }
    );

};

export default useFetch;

import "./assets/css/_index.scss";

import { ServiceConfig, ServiceRequest, storage, useFetch } from "@iouring/reactjs-lib";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "state/Store";

export {
    ServiceConfig, 
    ServiceRequest, 
    storage, 
    useFetch
};


console.log = () => {
    return null;
};
   

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

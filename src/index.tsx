
import "./assets/css/_index.scss";
import "bootstrap/dist/css/bootstrap.css";
// import * as storage from "services/Storage";
import { ServiceConfig, ServiceRequest, storage, useFetch } from "@iouring/reactjs-lib";
import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "state/Store";

// export { storage };

export {
    ServiceConfig, 
    ServiceRequest, 
    storage, 
    useFetch
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

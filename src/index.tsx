import "bootstrap/dist/css/bootstrap.css";
import "../src/assets/css/Global.css";
import * as storage from "services/Storage";
import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "state/Store";

export { storage };

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

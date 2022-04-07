import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";

const combinedReducer = combineReducers({
    LoginReducer
});

const rootReducer = (state: any, action: any) => {
    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
});
export default store;

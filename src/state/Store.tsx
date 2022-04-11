import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./AppConfigReducer";
import loginReducer from "./LoginReducer";

const combinedReducer = combineReducers({
    loginReducer,
    appConfigReducer,
});

const rootReducer = (state: any, action: any) => {
    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
});
export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

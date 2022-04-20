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
    middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        }); 
    },
});
export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

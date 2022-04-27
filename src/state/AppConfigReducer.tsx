import { THEME, WINDOW_STORAGE } from "common/Constants";
import { createSlice } from "@reduxjs/toolkit";
import { languageOptions } from "common/language";
import { storage } from "index";

const language = storage.getFromLocalStorage(WINDOW_STORAGE.APP_LANG) || languageOptions[ 0 ];
const theme = storage.getFromLocalStorage(WINDOW_STORAGE.APP_THEME) || THEME.LIGHT;

interface snackBarPropType {
    show: boolean 
    message: string
    status: "success" | "error" | "warning" | "info"
}

interface AppConfigPropType {
    language:string;
    theme:string,
    snackBar: snackBarPropType,
    appDialog: {
        show: boolean
        title: string
        message: string
        buttons: Record<string, any>[]
        isAllowEsc: boolean
    },
    showLoader: boolean
}

const initialSnackBar: snackBarPropType = {
    show: false,
    message: "",
    status: "info"
};

const initialDialog = {
    show: false,
    title: "",
    message: "",
    buttons: [
    ],
    isAllowEsc: true
};

const initialState: AppConfigPropType = {
    language: language,
    theme:theme,
    snackBar: initialSnackBar,
    appDialog: initialDialog,
    showLoader: false
};

export const appConfigSlice = createSlice ({
    name: "appConfigReducer",
    initialState,
    reducers: {
        updateLanguage:(state, action) => {
            storage.storeToLocalStorage(WINDOW_STORAGE.APP_LANG, action.payload);
            state.language = action.payload;
        },
        updateTheme:(state, action) => {
            storage.storeToLocalStorage(WINDOW_STORAGE.APP_THEME, action.payload);
            state.theme = action.payload;
        },
        showAPPDialog: (state, action) => {
            return Object.assign({}, state, { appDialog: {
                ...initialDialog,
                ...action.payload,
                show: true
            } });
        },
        closeAPPDialog: (state) => {
            return Object.assign({}, state, { appDialog: {
                ...state.appDialog,
                show: false
            } });
        },
        showSnackBar: (state, action) => {
            return Object.assign({}, state, { snackBar: {
                show: true,
                message: action.payload.message,
                status: action.payload.status ? action.payload.status : initialSnackBar.status
            } });
        },
        hideSnackBar: (state) => {
            return Object.assign({}, state, { snackBar: Object.assign({}, state.snackBar, { 
                show: false
            }) });
        },
        showLoader: (state) => {
            state.showLoader = true;
        },
        hideLoader: (state) => {
            state.showLoader = false;
        }
    },
});

export const { updateTheme, updateLanguage, showAPPDialog,
    showSnackBar, hideSnackBar, closeAPPDialog,
    showLoader, hideLoader
} = appConfigSlice.actions;

export const useConfigStore = (state:{appConfigReducer:AppConfigPropType}) => {
    return state.appConfigReducer;
};

export const useAppDialog = (state: { appConfigReducer: AppConfigPropType }) => {
    return state.appConfigReducer.appDialog;
};

export const useSnackBar = (state: { appConfigReducer: AppConfigPropType }) => {
    return state.appConfigReducer.snackBar;
};

export const useLoader = (state: { appConfigReducer: AppConfigPropType }) => {
    return state.appConfigReducer.showLoader;
};

export default appConfigSlice.reducer;

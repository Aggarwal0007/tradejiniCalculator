import { THEME, WINDOW_STORAGE } from "common/Constants";
import { createSlice } from "@reduxjs/toolkit";
import { languageOptions } from "common/language";
import { storage } from "index";

const language = storage.getFromLocalStorage(WINDOW_STORAGE.APP_LANG) || languageOptions[ 0 ];
const theme = storage.getFromLocalStorage(WINDOW_STORAGE.APP_THEME) || THEME.LIGHT;

interface AppConfigPropType {
    language:string;
    theme:string,
    appDialog: {
        show: boolean
        title: string
        message: string
        buttons: Record<string, any>[]
        isAllowEsc: boolean
    }
}

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
    appDialog: initialDialog
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
    },
});

export const { updateTheme, updateLanguage, showAPPDialog, closeAPPDialog } = appConfigSlice.actions;

export const useConfigStore = (state:{appConfigReducer:AppConfigPropType}) => {
    return state.appConfigReducer;
};

export const useAppDialog = (state: { appConfigReducer: AppConfigPropType }) => {
    return state.appConfigReducer.appDialog;
};

export default appConfigSlice.reducer;

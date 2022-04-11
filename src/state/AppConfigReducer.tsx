import { THEME, WINDOW_STORAGE } from "common/Constants";
import { createSlice } from "@reduxjs/toolkit";
import { languageOptions } from "common/language";
import { storage } from "index";

const language = storage.getFromLocalStorage(WINDOW_STORAGE.APP_LANG) || languageOptions[ 0 ];
const theme = storage.getFromLocalStorage(WINDOW_STORAGE.APP_THEME) || THEME.LIGHT;

console.log(language);
interface AppConfigPropType {
    language:string;
    theme:string
}

const initialState: AppConfigPropType = {
    language: language,
    theme:theme
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
        }
    },
});

export const { updateTheme, updateLanguage } = appConfigSlice.actions;

export const useConfigStore = (state:{appConfigReducer:AppConfigPropType}) => {
    return state.appConfigReducer;
};

export default appConfigSlice.reducer;

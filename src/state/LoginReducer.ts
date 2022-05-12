import { createSlice } from "@reduxjs/toolkit";
import { getFromSessionStorage } from "services/Storage";
import { WINDOW_STORAGE } from "../common/Constants";

interface LoginProps {
    loginSatus: boolean;
    username: string
}

const initialState: LoginProps = {
    loginSatus: getFromSessionStorage(WINDOW_STORAGE.LOGIN_STATUS) || false,
    username: getFromSessionStorage(WINDOW_STORAGE.USER_NAME) || ""
};

export const loginSlice = createSlice({
    name: "loginReducer",
    initialState,
    reducers: {
        storeLoginStatus: (state, action) => {
            return Object.assign({}, state, { ...action.payload });
        }
    }
});

export const { storeLoginStatus } = loginSlice.actions;

export const useLoginStore = (state: { loginReducer: LoginProps }) => {
    return state.loginReducer;
};

export default loginSlice.reducer;

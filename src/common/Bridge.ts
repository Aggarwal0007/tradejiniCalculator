import { storage } from "index";
import store from "state/Store";
import { storeLoginStatus } from "state/LoginReducer";
import { WINDOW_STORAGE } from "./Constants";

type UserDetailsPropType = {
    username: string;
}

export const storeLoginDetails = (userDetails: UserDetailsPropType) => {
    store.dispatch(storeLoginStatus({ 
        loginStatus: true,
        username: userDetails.username
    }));

    storage.storeToSessionStorage(WINDOW_STORAGE.LOGIN_STATUS, true);
    storage.storeToSessionStorage(WINDOW_STORAGE.USER_NAME, userDetails.username);
};

export const getSession = () => {
    const state = store.getState();
    
    if (!state.loginReducer.loginSatus) {
        const loginStatus = !!storage.getFromSessionStorage(WINDOW_STORAGE.LOGIN_STATUS);
        
        if (loginStatus)
            store.dispatch(storeLoginStatus({ loginStatus: loginStatus }));

        return loginStatus;
    }

    return state.loginReducer.loginSatus;
};

export const clearClientData = () => {
    storage.clearSessionStorage();
};

export function reloadApp() {
    console.log("reloadApp");
    window.location.reload();
}

export function handleLogout() {
    Promise.all([
        clearClientData()
    ]).then(reloadApp);
}

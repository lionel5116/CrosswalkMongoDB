import { LOGIN_DATA } from "./types";

export const setLoginData = (userName,password) => dispatch => {
    dispatch( {
        type: LOGIN_DATA,
        payload:{userName,password}
    });
};



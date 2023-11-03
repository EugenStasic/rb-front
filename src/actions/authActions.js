import { registerService, loginService, logoutService } from "../services/auth/authService";
import { getErrorMessage } from "../utils/utils";
import * as types from "./authTypes";

// REGISTRACIJA

export function registerRequest() {
    return { type: types.REGISTER_REQUEST };
}

export function registerSuccess(data) {
    return { type: types.REGISTER_SUCCESS };
}

export function registerError(error) {
    return { type: types.REGISTER_ERROR, payload: getErrorMessage(error) };
}

export function register(userData) {
    return async function (dispatch) {
        dispatch(registerRequest());

        try{
            const response = await registerService(userData);
            dispatch(registerSuccess(response));
        } catch (error) {
            dispatch(registerError(error));
        }
    }
}

// LOGIN

export function login (email, password) {
    return async function (dispatch) {
        try {
            const response = await loginService(email, password);
            dispatch({ type: types.LOGIN_SUCCESS, payload: response.data, isAuthenticated: true });
        } catch (error) {
            dispatch({ type: types.LOGIN_ERROR, payload: error.response.data });
        }
    }
}

// LOGOUT 

export function logout() {
    return async function (dispatch) {
        try {
            await logoutService();
            dispatch({ type: types.LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({ type: types.LOGOUT_ERROR, payload: error.response.data });
        }
    }
}

// MISC

export const clearMessages = () => {
    return {
        type: types.CLEAR_MESSAGES
    }
}
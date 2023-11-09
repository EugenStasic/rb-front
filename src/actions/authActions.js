import { registerService, loginService, logoutService } from "../services/auth/authService";
import { getErrorMessage } from "../utils/utils";
import * as types from "./authTypes";

// REGISTRACIJA

export function register(userData) {
    return async function (dispatch) {
        dispatch({
            type: types.REGISTER_REQUEST
        });

        try{
            await registerService(userData);
            dispatch({
                type: types.REGISTER_SUCCESS,
                successMessage: "Registration successful! Please log in to continue."
            });
        } catch (error) {
            dispatch({
                type: types.REGISTER_ERROR,
                payload: getErrorMessage(error)
            });
        }
    }
}

// LOGIN

export function login (email, password) {
    return async function (dispatch) {
        try {
            const response = await loginService(email, password);
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: { token: response.data.token },
                successMessage: "Log in successfull!"
            });
        } catch (error) {
            dispatch({
                type: types.LOGIN_ERROR,
                payload: getErrorMessage(error)
            });
        }
    }
}

// LOGOUT 

export function logout() {
    return async function (dispatch) {
        try {
            await logoutService();
            dispatch({
                type: types.LOGOUT_SUCCESS,
                successMessage: 'You have been logged out'
            });
        } catch (error) {
            dispatch({
                type: types.LOGOUT_ERROR,
                payload: getErrorMessage(error)
            });
        }
    }
}
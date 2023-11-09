import * as types from '../actions/authTypes';
import { CLEAR_MESSAGES } from '../actions/globalTypes';

const initialState = {
    token: null,
    isAuthenticated: false,
    error: null,
    successMessage: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                successMessage: action.successMessage
            };

        case types.LOGIN_ERROR:
            return {
                ...state,
                error: action.payload.message,
            };

        case types.LOGOUT_SUCCESS:
            return {
                ...initialState,
                successMessage: action.successMessage
            };

        case types.LOGOUT_ERROR:
            return {
                ...state,
                error: action.payload.message,
            };

        case types.REGISTER_REQUEST:
            return {
                ...state,
                error: null,
                successMessage: null,
            };

        case types.REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
                successMessage: action.successMessage
            };

        case types.REGISTER_ERROR:
            return {
                ...state,
                error: action.payload.message,
            };

        case CLEAR_MESSAGES:
            return { 
                    ...state,
                    error: null,
                    successMessage: null
                };

        default:
            return state;
    }
};

export default authReducer;
import * as types from '../actions/authTypes';

const initialState = {
    token: null,
    userId: null,
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
                userId: action.payload.userId,
                isAuthenticated: true,
                error: null,
            };

        case types.LOGIN_ERROR:
            return {
                ...state,
                error: action.payload.message,
            };

        case types.LOGOUT_SUCCESS:
            return initialState;

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
                successMessage: "Registration successful! Please log in to continue.",
            };

        case types.REGISTER_ERROR:
            return {
                ...state,
                error: action.payload.message,
            };

        case types.CLEAR_MESSAGES:
            return { ...state, successMessage: null, error: null };

        default:
            return state;
    }
};

export default authReducer;
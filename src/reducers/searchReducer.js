import * as types from '../actions/searchTypes';
import { CLEAR_MESSAGES } from '../actions/globalTypes';

const initialState = {
    items: [],
    loading: false,
    successMessage: null,
    error: null
};

export default function searchReducer(state = initialState, action) {
    switch(action.type) {
        case types.FETCH_BOATS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case types.FETCH_BOATS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                successMessage: action.successMessage,
                loading: false
            };
        
        case types.FETCH_BOATS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        
        case CLEAR_MESSAGES:
            return {
                ...state,
                successMessage: null,
                error: null
            };
        
        default:
            return state;

    }
};
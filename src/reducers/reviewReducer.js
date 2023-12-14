import * as types from '../actions/reviewTypes';
import { CLEAR_MESSAGES } from '../actions/globalTypes';

const initialState = {
    loading: false,
    reviews: [],
    successMessage: null,
    error: null
};

const reviewReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case types.FETCH_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };

        case types.FETCH_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
                successMessage: action.successMessage
            };

        case types.FETCH_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                reviews: [],
                error: action.payload
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

export default reviewReducer;
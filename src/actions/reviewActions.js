import * as types from '../actions/reviewTypes';
import { fetchReviewsService, submitReviewService } from '../services/review/reviewService';
import { getErrorMessage } from '../utils/utils';

export const submitReview = (boatId, rating, comment) => {
    return async (dispatch) => {
        dispatch({ 
            type: types.SUBMIT_REVIEW_REQUEST
        });
        try {
            const response = await submitReviewService(boatId, rating, comment);
            dispatch({ 
                type: types.SUBMIT_REVIEW_SUCCESS, 
                payload: response,
                successMessage: "Review submtted successfully!"
            });
        } catch (error) {
            dispatch({ 
                type: types.SUBMIT_REVIEW_FAILURE, 
                error: getErrorMessage(error)
            });
        }
    };
};

export const fetchReview = (boatId) => {
    return async (dispatch) => {
        dispatch({
            type: types.FETCH_REVIEW_REQUEST
        });
    
    try {
        const reviews = await fetchReviewsService(boatId);
        dispatch({
            type: types.FETCH_REVIEW_SUCCESS,
            payload: reviews,
            successMessage: "Reviews fetched successfully!"
        });
    } catch (error) {
        dispatch({
            type: types.FETCH_REVIEW_FAILURE,
            error: getErrorMessage(error)
        });
    }
    }
}
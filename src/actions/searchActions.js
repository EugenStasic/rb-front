import { fetchBoatsService } from '../services/search/searchService';
import { getErrorMessage } from '../utils/utils';
import * as types from './searchTypes';

export function fetchBoats(filters) {
    return async function (dispatch) {
        dispatch({
            type: types.FETCH_BOATS_REQUEST
        })

        try {
            const response = await fetchBoatsService(filters);
            dispatch({
                type: types.FETCH_BOATS_SUCCESS,
                payload: response,
                successMesssage: "Boats fetched successfully!"
            })
        } catch (error) {
            dispatch({
                type: types.FETCH_BOATS_FAILURE,
                payload: getErrorMessage(error)
            })
        }
    }
};
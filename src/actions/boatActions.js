import { registerBoatService } from '../services/boat/boatService';
import { getErrorMessage } from '../utils/utils';
import * as types from './boatTypes';

export function registerBoatRequest() {
    return { type: types.BOAT_REGISTER_REQUEST };
}

export function registerBoatSuccess() {
    return { type: types.BOAT_REGISTER_SUCCESS };
}

export function registerBoatError(error) {
    return { type: types.BOAT_REGISTER_FAILURE, payload: getErrorMessage(error) };
}

export function registerBoat(userId, boatData) {
    return async function (dispatch) {
        dispatch(registerBoatRequest());

        try {
            const response = await registerBoatService(userId, boatData);
            dispatch(registerBoatSuccess(response));
        } catch (error) {
            dispatch(registerBoatError(error));
        }
    }
}
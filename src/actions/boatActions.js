import { fetchUsersBoatsService, registerBoatService, deleteBoatListingService, updateBoatInformationService, fetchBoatService } from '../services/boat/boatService';
import { getErrorMessage } from '../utils/utils';
import * as types from './boatTypes';

export function registerBoat(boatData) {
    return async function (dispatch) {
        dispatch({
            type: types.BOAT_REGISTER_REQUEST
        });

        try {
            const newBoat = await registerBoatService(boatData);
            dispatch({
                type: types.BOAT_REGISTER_SUCCESS,
                payload: {
                    boat: newBoat, successMessage: 'Boat Registered Successfully!',
                    loading: false
                } 
            });
        } catch (error) {
            dispatch({
                type: types.BOAT_REGISTER_FAILURE,
                payload: getErrorMessage(error)
            });
        }
    }
}

export function getBoatInfo(boatId) {
    return async function (dispatch) {
        dispatch({
            type: types.GET_BOAT_DETAILS_REQUEST
        });

        try {
            const boat = await fetchBoatService(boatId);
            dispatch({
                type: types.GET_BOAT_DETAILS_SUCCESS,
                payload: boat
            })
        } catch (error) {
            dispatch({
                type: types.GET_BOAT_DETAILS_FAILURE,
                payload: getErrorMessage(error)
            })
        }
    }
}

export function getUserBoatsInfo() {
    return async function (dispatch) {
        dispatch({
            type: types.GET_ALL_BOAT_DETAILS_REQUEST
        });
    
        try {
            const userBoats = await fetchUsersBoatsService();
            dispatch({
                type: types.GET_ALL_BOAT_DETAILS_SUCCESS,
                payload: userBoats
            });
        } catch (error) {
            dispatch({
                type: types.GET_ALL_BOAT_DETAILS_FAILURE,
                payload: getErrorMessage(error)
            });
        }
    }

}

export function updateBoatInformation(boatId, updateData) {
    return async function (dispatch) {
        dispatch({
            type: types.EDIT_BOAT_LISTING_REQUEST,
        })

        try {
            const updatedBoat = await updateBoatInformationService(boatId, updateData);
            dispatch({
                type: types.EDIT_BOAT_LISTING_SUCCESS,
                payload: updatedBoat
            })
        } catch (error) {
            dispatch({
                type: types.EDIT_BOAT_LISTING_FAILURE,
                payload: getErrorMessage(error),
            })
        }
    }
}

export function deleteBoatListing(boatId) {
    return async function (dispatch) {
        dispatch({
            type: types.DELETE_BOAT_LISTING_REQUEST
        });

        try {
            await deleteBoatListingService(boatId);
            dispatch({
                type: types.DELETE_BOAT_LISTING_SUCCESS,
                payload: boatId
            });
        } catch (error) {
            dispatch({
                type: types.DELETE_BOAT_LISTING_FAILURE,
                payload: getErrorMessage(error)
            });
        }
    }
}
import { fetchUsersBoatsService, registerBoatService, deleteBoatListingService, updateBoatInformationService, fetchBoatService, updateBoatImagesService, deleteBoatImageService } from '../services/boat/boatService';
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
                payload: newBoat,
                successMessage: 'Boat registered successfully'
            });
        } catch (error) {
            dispatch({
                type: types.BOAT_REGISTER_FAILURE,
                payload: getErrorMessage(error)
            });
        }
    }
};

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
};

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

};

export function updateBoatInformation(boatId, updateData) {
    return async function (dispatch) {
        dispatch({
            type: types.EDIT_BOAT_LISTING_REQUEST,
        })

        try {
            const updatedBoat = await updateBoatInformationService(boatId, updateData);
            dispatch({
                type: types.EDIT_BOAT_LISTING_SUCCESS,
                payload: updatedBoat,
                successMessage: "Boat information updated successfully!"
            });
        } catch (error) {
            dispatch({
                type: types.EDIT_BOAT_LISTING_FAILURE,
                payload: getErrorMessage(error),
            })
        }
    }
};

export function updateBoatImages(boatId, formData) {
    return async function (dispatch) {
        dispatch({
            type: types.ADD_BOAT_IMAGES_REQUEST,
        })

        try {
            const updatedBoatImages = await updateBoatImagesService(boatId, formData);
            dispatch({
                type: types.ADD_BOAT_IMAGES_SUCCESS,
                payload: updatedBoatImages,
                successMessage: "Boat images updated successfully!"
            });
        } catch (error) {
            dispatch({
                type: types.ADD_BOAT_IMAGES_FAILURE,
                payload: getErrorMessage(error)
            });
        }
    }
};

export function deleteBoatImages(boatId, imageIndex) {
    return async function (dispatch) {
        dispatch({
            type: types.DELETE_BOAT_IMAGES_REQUEST
        })
        try {
            await deleteBoatImageService(boatId, imageIndex)
            dispatch({
                type: types.DELETE_BOAT_IMAGES_SUCCESS,
                payload: { boatId, imageIndex},
                successMessage: "Image deleted successfully!"
            })
        } catch (error) {
            dispatch({
                type: types.DELETE_BOAT_IMAGES_FAILURE,
                payload: getErrorMessage(error)
            })
        }
    }
};

export function deleteBoatListing(boatId) {
    return async function (dispatch) {
        dispatch({
            type: types.DELETE_BOAT_LISTING_REQUEST
        });

        try {
            await deleteBoatListingService(boatId);
            dispatch({
                type: types.DELETE_BOAT_LISTING_SUCCESS,
                payload: boatId,
                successMessage: 'Boat listing deleted'
            });
        } catch (error) {
            dispatch({
                type: types.DELETE_BOAT_LISTING_FAILURE,
                payload: getErrorMessage(error)
            });
        }
    }
};
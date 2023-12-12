import * as types from '../actions/bookingTypes';
import { cancelBookingService, createBookingService, getUserBoatsBookingsService, getUserBookingsService } from '../services/booking/bookingService';
import { getErrorMessage } from '../utils/utils';

export const createBooking = (bookingData) => {
    return async function (dispatch) {
        dispatch({
            type: types.CREATE_BOOKING_REQUEST
        });
        try {
            const response = await createBookingService(bookingData);
            dispatch({
                type: types.CREATE_BOOKING_SUCCESS,
                payload: response.booking,
                successMessage: "Booking created successfully!"
            });
        } catch (error) {
            dispatch({
                type: types.CREATE_BOOKING_FAILURE,
                error: getErrorMessage(error)
            });
        }
    }
};

export const fetchUserBookings = () => {
    return async function (dispatch) {
        dispatch({
            type: types.FETCH_USER_BOOKINGS_REQUEST
        });
        try {
            const response = await getUserBookingsService();
            dispatch({
                type: types.FETCH_USER_BOOKINGS_SUCCESS,
                payload: response,
                successMessage: "User Bookings fetched successfully!"
            });
        } catch (error) {
            dispatch({
                type: types.FETCH_USER_BOOKINGS_FAILURE,
                error: getErrorMessage(error)
            });
        }
    }
};

export const fetchUserBoatsBookings = () => {
    return async function (dispatch) {
        dispatch({
            type: types.FETCH_USER_BOAT_BOOKINGS_REQUEST
        });
        try {
            const response = await getUserBoatsBookingsService();
            dispatch({
                type: types.FETCH_USER_BOAT_BOOKINGS_SUCCESS,
                payload: response,
                successMessage: "User's Boat Bookings fetched successfully!"
            });
        } catch (error) {
            dispatch({
                type: types.FETCH_USER_BOAT_BOOKINGS_FAILURE,
                error: getErrorMessage(error)
            });
        }
    }
};

export const cancelBooking = (bookingId) => {
    return async function (dispatch) {
        dispatch({
            type: types.CANCEL_BOOKING_REQUEST
        });
        try {
            const response = await cancelBookingService(bookingId);
            dispatch({
                type: types.CANCEL_BOOKING_SUCCESS,
                payload: response,
                successMessage: "Booking cancelled successfully!"
            });
        } catch (error) {
            dispatch({
                type: types.CANCEL_BOOKING_FAILURE,
                error: getErrorMessage(error)
            });
        }
    }
};
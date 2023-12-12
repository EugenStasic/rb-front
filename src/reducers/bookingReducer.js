import * as types from '../actions/bookingTypes';
import { CLEAR_MESSAGES } from '../actions/globalTypes';

const initialState = {
    userRentals: [],
    userBoatsBookings: [],
    currentBooking: null,
    loading: false,
    successMessage: null,
    error: null
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_BOOKING_REQUEST:
            return {
                ...state,
                loading: true
            };

        case types.CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: [...state.bookings, action.payload],
                currentBooking: action.payload,
                successMessage: action.successMessage,
                loading: false
            };

        case types.CREATE_BOOKING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case types.FETCH_USER_BOOKINGS_REQUEST:
            return {
                ...state,
                loading: true
            };
        
        case types.FETCH_USER_BOOKINGS_SUCCESS:
            return {
                ...state,
                userRentals: action.payload,
                successMessage: action.successMessage,
                loading: false
            };

        case types.FETCH_USER_BOOKINGS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case types.FETCH_USER_BOAT_BOOKINGS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case types.FETCH_USER_BOAT_BOOKINGS_SUCCESS:
            return {
                ...state,
                userBoatsBookings: action.payload,
                successMessage: action.successMessage,
                loading: false
            };
        
        case types.FETCH_USER_BOAT_BOOKINGS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case types.CANCEL_BOOKING_REQUEST:
            return {
                ...state,
                loading: true
            };

        case types.CANCEL_BOOKING_SUCCESS:
            const updatedBookings = state.userBoatsBookings.map(booking => {
                if (booking._id === action.payload._id) {
                    return action.payload;
                }
                return booking;
            });

            return {
                ...state,
                userBoatsBookings: updatedBookings,
                successMessage: action.successMessage,
                loading: false
            };

        case types.CANCEL_BOOKING_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
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

export default bookingReducer;
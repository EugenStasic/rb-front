import api from '../api';

export const createBookingService = async (bookingData) => {
    try {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserBookingsService = async () => {
    try {
        const response = await api.get('/bookings/my-rentals');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserBoatsBookingsService = async () => {
    try {
        const response = await api.get('/bookings/my-boats');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancelBookingService = async (bookingId) => {
    try {
        const response = await api.patch(`/bookings/cancel/${bookingId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
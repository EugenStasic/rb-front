import api from '../api';

export const submitReviewService = async (boatId, rating, comment) => {
    try {
        const reviewData = {
            rating,
            comment
        };

        const response = await api.post(`/review/submit-review/${boatId}`, reviewData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkIfReviewedService = async (boatId) => {
    try {
        const response = await api.get(`/review/check-review/${boatId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
import api from "../api";

export const registerBoatService = async (boatData) => {
    try {
        const response = await api.post(`/boat/register`, boatData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchBoatService = async (boatId) => {
    try {
        const response = await api.get(`/boat/${boatId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchUsersBoatsService = async () => {
    try {
        const response = await api.get(`/boat/user-boats`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBoatInformationService = async (boatId, updateData) => {
    try {
        const response = await api.patch(`/boat/user-boats/${boatId}`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBoatListingService = async (boatId) => {
    try {
        const response = await api.delete(`/boat/user-boats/${boatId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
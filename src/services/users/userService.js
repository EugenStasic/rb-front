import api from "../api";

export const fetchUserDetails = async () => {
    try {
        const response = await api.get(`/user/me`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUserInformation = async (updateData) => {
    try {
        const response = await api.patch(`/user/me`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
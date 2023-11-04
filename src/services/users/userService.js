import axios from "axios";

const BASE_URL = 'http://localhost:5000';

export const fetchUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUserInformation = async (userId, updateData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/user/${userId}`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
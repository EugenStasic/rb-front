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